const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');
const StellarSdk = require('stellar-sdk');
const axios = require('axios');

// Load .env variables
dotenv.config({ path: path.join(__dirname, '.env') });

const mode = process.argv.includes('--testnet') ? 'TESTNET' : 'MAINNET';
const PI_API_KEY = (mode === 'TESTNET') ? process.env.PI_API_KEY_TEST : process.env.PI_API_KEY_MAIN;
const WALLET_SEED = process.env.PI_WALLET_PRIVATE_SEED;
const HORIZON_URL = process.env.HORIZON_URL || (mode === 'TESTNET' ? 'https://api.testnet.minepi.com' : 'https://api.mainnet.minepi.com');

console.log(`\n==============================================`);
console.log(`🌌 GALAXY FALL - WEEKLY PRIZE PAYOUT SCRIPT`);
console.log(`==============================================`);
console.log(`Mode: ${mode}`);
console.log(`Horizon URL: ${HORIZON_URL}`);

if (!WALLET_SEED || !PI_API_KEY) {
    console.error("❌ ERROR: Missing PI_WALLET_PRIVATE_SEED or PI_API_KEY in .env");
    process.exit(1);
}

const piApi = axios.create({
    baseURL: 'https://api.minepi.com',
    headers: { 'Authorization': `Key ${PI_API_KEY}` }
});

const server = new StellarSdk.Horizon.Server(HORIZON_URL);
const sourceKeypair = StellarSdk.Keypair.fromSecret(WALLET_SEED);
const sourcePublicKey = sourceKeypair.publicKey();

console.log(`App Wallet Public Key: ${sourcePublicKey}\n`);

// 1. Connect to DB
const db = new sqlite3.Database('./leaderboard.db', sqlite3.OPEN_READWRITE, async (err) => {
    if (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
    console.log("✅ Attached to leaderboard.db");

    try {
        await runWeeklyPayout();
    } catch (error) {
        console.error("💥 Critical Failure during Payout:", error);
    } finally {
        // Optional: Reset Leaderboard after payout? 
        // We will leave resetting as a manual/separate process just in case, but usually:
        // db.run("DELETE FROM scores WHERE mode = 'ENDLESS'");
        db.close();
    }
});

async function runWeeklyPayout() {
    // 2. Query the App Wallet Balance from Horizon
    let appBalance = 0;
    try {
        const account = await server.loadAccount(sourcePublicKey);
        const nativeBalance = account.balances.find(b => b.asset_type === 'native');
        if (nativeBalance) {
            appBalance = parseFloat(nativeBalance.balance);
        }
    } catch (e) {
        console.error(`❌ Could not fetch account balance from Horizon:`, e.response?.data || e.message);
        return;
    }

    console.log(`🏦 Current App Wallet Balance: ${appBalance} Pi`);

    // We need at least the base reserve (typically 1 Pi) to exist, so only payout if > 5 Pi
    if (appBalance < 5) {
        console.log(`⚠️ Balance too low to run a meaningful tournament payout. Aborting.`);
        return;
    }

    // 3. Calculate Prize Pool (30% of Wallet Balance)
    const prizePool = appBalance * 0.30;
    console.log(`🏆 Designated Prize Pool (30%): ${prizePool.toFixed(5)} Pi`);

    // 4. Fetch Top 10 from the Database (ENDLESS mode is Ranked)
    // Only fetch users who HAVE a premium license
    const query = `
        SELECT s.pi_uid, s.username, s.score 
        FROM scores s
        JOIN users u ON s.pi_uid = u.pi_uid
        WHERE s.mode = 'ENDLESS' 
          AND u.has_premium_license = 1
        ORDER BY s.score DESC 
        LIMIT 10
    `;

    db.all(query, [], async (err, winners) => {
        if (err) {
            console.error("❌ DB Query Error:", err.message);
            return;
        }

        if (winners.length === 0) {
            console.log(`ℹ️ No premium players found in the ENDLESS leaderboard this week.`);
            return;
        }

        console.log(`🥇 Found ${winners.length} eligible premium winners!`);

        // 5. Distribution Strategy
        // Example logic:
        // Top 1: 50% of the prize pool
        // Top 2: 20%
        // Top 3: 10%
        // Top 4-10: Sharing the remaining 20%

        const distribution = [0.50, 0.20, 0.10, 0.05, 0.04, 0.03, 0.03, 0.03, 0.01, 0.01];

        // Ensure we load account sequence once and keep track to fire sequentially
        let sourceAccount = await server.loadAccount(sourcePublicKey);

        for (let i = 0; i < winners.length; i++) {
            const winner = winners[i];
            const percent = distribution[i];
            const payoutAmount = (prizePool * percent).toFixed(5);

            if (parseFloat(payoutAmount) < 0.01) {
                console.log(`⚠️ Skipping # ${i + 1} (${winner.username}): Amount ${payoutAmount} is below Pi Network minimum limits.`);
                continue;
            }

            console.log(`💸 Processing Rank ${i + 1}: ${winner.username} | Score: ${winner.score} | Reward: ${payoutAmount} Pi`);

            try {
                // IMPORTANT: The official Pi Network "App-to-User" requires us to FIRST create the payment 
                // in the Pi Backend, THEN submit it to stellar, THEN complete it on Pi Backend.

                // STEP 1: Create A2U payment
                const paymentData = {
                    payment: {
                        amount: parseFloat(payoutAmount),
                        memo: `Galaxy Fall Weekly Tournament - Rank ${i + 1}`,
                        metadata: { "type": "tournament_payout", "rank": i + 1 },
                        uid: winner.pi_uid
                    }
                };

                const createResponse = await piApi.post('/v2/payments', paymentData);
                const paymentId = createResponse.data.identifier;
                const toAddress = createResponse.data.recipient || createResponse.data.recipient_address || createResponse.data.to_address || createResponse.data.payment?.to_address;

                if (!toAddress) {
                    console.error(`❌ Pi Server didn't return a wallet address for user ${winner.pi_uid}.`);
                    continue;
                }

                // STEP 2: Stellar Transaction
                const transactionBuilder = new StellarSdk.TransactionBuilder(sourceAccount, {
                    fee: "100000",
                    networkPassphrase: mode === 'TESTNET' ? 'Pi Testnet' : 'Pi Network'
                });

                transactionBuilder.addOperation(StellarSdk.Operation.payment({
                    destination: toAddress,
                    asset: StellarSdk.Asset.native(),
                    amount: payoutAmount.toString()
                }));

                const transaction = transactionBuilder
                    .addMemo(StellarSdk.Memo.text(paymentId))
                    .setTimeout(30)
                    .build();

                transaction.sign(sourceKeypair);

                // STEP 3: Submit to Blockchain
                const txResult = await server.submitTransaction(transaction);

                // Update Sequence for next iter
                sourceAccount = await server.loadAccount(sourcePublicKey);

                // STEP 4: Complete on Pi Server
                await piApi.post(`/v2/payments/${paymentId}/complete`, { txid: txResult.hash });

                console.log(`✅ Success for ${winner.username} (Tx: ${txResult.hash})`);

            } catch (err) {
                console.error(`❌ Failed to payout to ${winner.username}:`, err.response?.data || err.message);
                if (err.response?.data?.error === "ongoing_payment_found") {
                    console.log(`⚠️ User has an incomplete ongoing payment. You might need to cancel it manually via API.`);
                }
            }
        }

        console.log(`\n🎉 WEEKLY PAYOUT COMPLETE!`);

        // OPTIONAL: Reset ENDLESS scores for the new week automatically
        // console.log("🔄 Resetting Leaderboard...");
        // db.run("DELETE FROM scores WHERE mode = 'ENDLESS'");
    });
}
