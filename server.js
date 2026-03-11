const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const StellarSdk = require('stellar-sdk');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// ==================================================================
// KONFIGURATION (Automatische Wahl nach Prozess-Name)
// ==================================================================
// Wir schauen direkt auf den Namen den wir in PM2 vergeben haben
const instanceName = process.env.name || '';
let port;

if (instanceName === 'testnet') {
    port = 3001;
} else if (instanceName === 'mainnet') {
    port = 3000;
} else {
    // Falls man es manuell startet ohne PM2
    port = process.env.PORT || 3000;
}

const PI_API_KEY = (Number(port) === 3001)
    ? process.env.PI_API_KEY_TEST
    : process.env.PI_API_KEY_MAIN;

const mode = (Number(port) === 3001) ? "TESTNET" : "MAINNET";
console.log(`🚀 [${instanceName.toUpperCase()}] Startet auf Port ${port} (${mode})`);

if (!PI_API_KEY) {
    console.error(`❌ FEHLER: API-Key für ${mode} fehlt in der .env!`);
}

// Pi Horizon API
const HORIZON_URL = process.env.HORIZON_URL || (mode === 'TESTNET' ? 'https://api.testnet.minepi.com' : 'https://api.mainnet.minepi.com');

// Pi Node Public Key (für Display/Verification, kein Tx-Wallet)
const NODE_PUBLIC_KEY = process.env.NODE_PUBLIC_KEY || 'GB6SHWUZR6AII5FZ5N7D6VS34HEJHZU7MLZAVDVB6PGWZMQTIT43TAD7';

// App Wallet: Testnet vs. Mainnet separat!
const APP_WALLET_PUBLIC_KEY = mode === 'TESTNET'
    ? (process.env.APP_WALLET_TESTNET || 'GAQ37IIBSPWSDQTKEYKJHRJ5V2RIACZXNJH5YAIVRMJIG6D7JVSZM5G2')
    : (process.env.APP_WALLET_MAINNET || process.env.APP_WALLET_PUBLIC_KEY || 'GCG2TSYQQEGZGEIAYQAMRLRURU3ASFZPWIDHU4B3M2KNCI3OLG4JP7ML');


console.log(`🌐 Horizon URL: ${HORIZON_URL}`);
console.log(`🔑 Node Key: ${NODE_PUBLIC_KEY}`);
console.log(`💼 App Wallet [${mode}]: ${APP_WALLET_PUBLIC_KEY}`);

// ==================================================================
// HILFSFUNKTIONEN
// ==================================================================
function normalizeUid(uid) {
    if (!uid) return uid;
    // Wenn wir auf Port 3001 sind und das Präfix fehlt => hinzufügen
    if (Number(port) === 3001 && !uid.startsWith('test_')) {
        return 'test_' + uid;
    }
    return uid;
}

// ==================================================================
// MIDDLEWARE
// ==================================================================
app.use(cors({ origin: '*' }));
app.use(express.json());

// ==================================================================
// DATENBANK INITIALISIEREN
// ==================================================================
const db = new sqlite3.Database('./leaderboard.db', (err) => {
    if (err) {
        console.error("❌ Datenbank-Fehler:", err.message);
    } else {
        console.log("✅ SQLite-Datenbank bereit.");

        // Tabelle für User-Fortschritt (Collectibles als Objekt für index.tsx)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            pi_uid TEXT PRIMARY KEY,
            username TEXT,
            coins INTEGER DEFAULT 0,
            upgrades TEXT DEFAULT '{}',      
            cosmetics TEXT DEFAULT '{}',     
            collectibles TEXT DEFAULT '{"unlocked_collectibles":[],"equipped_collectible":null}',  
            total_kills INTEGER DEFAULT 0,
            total_coins_collected INTEGER DEFAULT 0,
            playtime_seconds INTEGER DEFAULT 0,
            missions_completed INTEGER DEFAULT 0,
            language TEXT DEFAULT NULL,
            welcome_bonus_claimed INTEGER DEFAULT 0,
            trophies TEXT DEFAULT '{}',
            last_free_spin INTEGER DEFAULT 0,
            ad_spins_today INTEGER DEFAULT 0,
            last_ad_reset INTEGER DEFAULT 0,
            has_premium_license INTEGER DEFAULT 0
        )`);

        // Rückwärtskompatibel: Spalten nachrüsten falls DB schon existiert
        db.run(`ALTER TABLE users ADD COLUMN welcome_bonus_claimed INTEGER DEFAULT 0`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN trophies TEXT DEFAULT '{}'`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN last_free_spin INTEGER DEFAULT 0`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN ad_spins_today INTEGER DEFAULT 0`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN last_ad_reset INTEGER DEFAULT 0`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN has_premium_license INTEGER DEFAULT 0`, () => { });

        // Tabelle für Highscores
        db.run(`CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pi_uid TEXT NOT NULL,
            username TEXT NOT NULL,
            score INTEGER NOT NULL,
            waves INTEGER NOT NULL,
            mode TEXT NOT NULL,
            UNIQUE(pi_uid, mode)
        )`);

        // Tabelle für Blockchain-Transaktionen (TXIDs)
        db.run(`CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pi_uid TEXT NOT NULL,
            payment_id TEXT,
            txid TEXT NOT NULL,
            bundle_id TEXT,
            amount_coins INTEGER DEFAULT 0,
            network TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            explorer_url TEXT
        )`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_payments_pi_uid ON payments (pi_uid)`);

        // ── Profile / Social (Public Profiles + Friend Requests) ─────────────
        // Add optional profile fields (safe if columns already exist)
        db.run(`ALTER TABLE users ADD COLUMN display_name TEXT DEFAULT NULL`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN bio TEXT DEFAULT NULL`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT (datetime('now'))`, () => { });
        db.run(`ALTER TABLE users ADD COLUMN last_seen TEXT DEFAULT NULL`, () => { });

        // Friend requests: minimal workflow (pending -> accepted/declined/cancelled)
        db.run(`CREATE TABLE IF NOT EXISTS friend_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            from_uid TEXT NOT NULL,
            to_uid TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now')),
            UNIQUE(from_uid, to_uid)
        )`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_friendreq_to ON friend_requests (to_uid, status)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_friendreq_from ON friend_requests (from_uid, status)`);

        // Friends table: store undirected relationship (uid_a < uid_b)
        db.run(`CREATE TABLE IF NOT EXISTS friends (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid_a TEXT NOT NULL,
            uid_b TEXT NOT NULL,
            created_at TEXT DEFAULT (datetime('now')),
            UNIQUE(uid_a, uid_b)
        )`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_friends_a ON friends (uid_a)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_friends_b ON friends (uid_b)`);
    }
});

// ==================================================================
// PI NETWORK API KONFIGURATION
// ==================================================================
const piApi = axios.create({
    baseURL: 'https://api.minepi.com',
    headers: { 'Authorization': `Key ${PI_API_KEY}` }
});

// ==================================================================
// PAYMENT ROUTEN
// ==================================================================

// 1. APPROVE
app.post('/api/approve-payment', async (req, res) => {
    const { paymentId } = req.body;
    const mode = (Number(port) === 3001) ? "TESTNET" : "MAINNET";
    console.log(`🔍 [STEP 1] Approval für ID: ${paymentId} | Modus: ${mode} | Key-Ende: ...${PI_API_KEY ? PI_API_KEY.slice(-6) : 'KEIN KEY!'}`);
    if (!paymentId) return res.status(400).json({ error: "Keine ID" });

    try {
        await piApi.post(`/v2/payments/${paymentId}/approve`);
        console.log(`✅ [STEP 2] Approved: ${paymentId}`);
        res.status(200).json({ message: "Approved" });
    } catch (error) {
        const errData = error.response?.data || {};
        const errCode = errData.error || 'unknown';

        if (errCode === 'payment_not_found') {
            console.warn(`⚠️ Payment nicht gefunden (Sandbox/abgelaufen?): ${paymentId}`);
            // Return 400 so the frontend fetch catches it as an error
            res.status(400).json({ error: "payment_not_found", message: "Payment not in this environment", backendMode: mode, port: port });
        } else if (errCode === 'payment_already_approved') {
            console.warn(`⚠️ Payment bereits approved: ${paymentId}`);
            res.status(200).json({ message: "Already approved" });
        } else {
            console.error(`❌ Approve fehlgeschlagen [${errCode}]:`, errData);
            res.status(500).json({ error: "Approval failed", details: errData, backendMode: mode });
        }
    }
});

// 2. COMPLETE (Inklusive NFT & Testnet Logik)
app.post('/api/complete-payment', async (req, res) => {
    const { paymentId, txid } = req.body;

    console.log(`🔍 [STEP 3] Completion für TX: ${txid}`);
    if (!paymentId || !txid) return res.status(400).json({ error: "Daten fehlen" });

    try {
        const response = await piApi.post(`/v2/payments/${paymentId}/complete`, { txid });

        // Pi v2 API liefert oft das Objekt in "payment" verpackt. Wir checken beides!
        const paymentObj = response.data.payment || response.data;
        const uid = paymentObj.user_uid || paymentObj.uid;

        let finalUid = normalizeUid(uid);

        const metadata = paymentObj.metadata || {};
        const coinsToAdd = parseInt(metadata.coins) || 0;
        const bundleId = metadata.bundleId || "Unbekannt";

        console.log(`💰 [STEP 4] Zahlung von ${finalUid} für ${bundleId} (${coinsToAdd} Coins) abgeschlossen. Aktualisiere Datenbank...`);

        db.serialize(() => {
            db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`, [finalUid]);
            db.get("SELECT collectibles FROM users WHERE pi_uid = ?", [finalUid], (err, row) => {
                if (err) {
                    console.error("❌ DB Fehler beim Laden:", err.message);
                    return res.status(500).json({ error: "Internal DB Error" });
                }

                let collectiblesObj = { unlocked_collectibles: [], equipped_collectible: null, minted_collectibles: [] };
                if (row && row.collectibles) {
                    try {
                        const parsed = JSON.parse(row.collectibles);
                        collectiblesObj.unlocked_collectibles = parsed.unlocked_collectibles || [];
                        collectiblesObj.equipped_collectible = parsed.equipped_collectible || null;
                        collectiblesObj.minted_collectibles = parsed.minted_collectibles || [];
                    } catch (e) { }
                }

                let isPremiumPurchase = 0;
                if (bundleId === 'premium_license') {
                    isPremiumPurchase = 1;
                } else if (bundleId && bundleId.startsWith('collectible_')) {
                    if (!collectiblesObj.unlocked_collectibles.includes(bundleId)) {
                        collectiblesObj.unlocked_collectibles.push(bundleId);
                    }
                } else if (bundleId && bundleId.startsWith('mint_')) {
                    const collId = bundleId.replace('mint_', '');
                    // Ensure the new structure exists
                    if (!collectiblesObj.minted_metadata) {
                        collectiblesObj.minted_metadata = {};
                    }
                    if (!collectiblesObj.minted_collectibles.includes(collId)) {
                        collectiblesObj.minted_collectibles.push(collId);
                    }
                    // Save blockchain proof
                    collectiblesObj.minted_metadata[collId] = {
                        txid: txid,
                        minted_at: new Date().toISOString(),
                        network: mode,
                        paymentId: paymentId
                    };
                }

                const updateSql = `
                    UPDATE users SET 
                        coins = coins + ?, 
                        collectibles = ?,
                        has_premium_license = CASE WHEN ? = 1 THEN 1 ELSE has_premium_license END
                    WHERE pi_uid = ?`;

                db.run(updateSql, [coinsToAdd, JSON.stringify(collectiblesObj), isPremiumPurchase, finalUid], function (err) {
                    if (err) {
                        console.error("❌ DB Fehler beim Speichern:", err.message);
                        return res.status(500).json({ error: "Failed to update user data" });
                    }

                    db.get("SELECT coins, has_premium_license FROM users WHERE pi_uid = ?", [finalUid], (err, finalRow) => {
                        if (err) {
                            return res.status(500).json({ error: "Failed to fetch new balance" });
                        }

                        console.log(`✅ DB Erfolg! Neuer Stand für ${finalUid}: ${finalRow.coins} Coins | Premium: ${finalRow.has_premium_license}`);

                        // ── TXID dauerhaft speichern ────────────────────────
                        const explorerNetwork = mode === 'MAINNET' ? 'mainnet' : 'testnet';
                        const explorerUrl = `https://explorer.minepi.com/transactions/${txid}`;
                        db.run(
                            `INSERT INTO payments (pi_uid, payment_id, txid, bundle_id, amount_coins, network, explorer_url)
                             VALUES (?, ?, ?, ?, ?, ?, ?)`,
                            [finalUid, paymentId, txid, bundleId, coinsToAdd, explorerNetwork, explorerUrl],
                            (e) => { if (e) console.warn('⚠️ TXID-Speicherung fehlgeschlagen:', e.message); else console.log(`🔗 TXID gespeichert: ${txid}`); }
                        );

                        res.status(200).json({
                            message: "Completed",
                            newBalance: finalRow.coins,
                            addedCoins: coinsToAdd,
                            bundleId: bundleId,
                            txid: txid,
                            explorer_url: explorerUrl,
                            has_premium_license: finalRow.has_premium_license === 1
                        });
                    });
                });
            });
        });
    } catch (error) {
        const errData = error.response?.data || {};

        if (errData.error === 'already_completed' && errData.payment) {
            console.warn(`⚠️ Zahlung ${paymentId} war bereits abgeschlossen (already_completed). Syncing balance...`);
            const paymentObj = errData.payment;
            const finalUid = normalizeUid(paymentObj.user_uid || paymentObj.uid);

            db.get("SELECT coins FROM users WHERE pi_uid = ?", [finalUid], (err, finalRow) => {
                if (err) return res.status(500).json({ error: "DB Error" });
                res.status(200).json({
                    message: "Already completed",
                    newBalance: finalRow ? finalRow.coins : 0,
                    addedCoins: 0,
                    bundleId: paymentObj.metadata?.bundleId || "Unbekannt"
                });
            });
            return;
        }

        console.error("❌ Completion fehlgeschlagen:", errData || error.message);
        res.status(500).json({ error: "Completion failed" });
    }
});

// ==================================================================
// APP TO USER (A2U) TESTNET PAYMENT
// ==================================================================
app.post('/api/send-test-pi', async (req, res) => {
    // SECURITY: Nur auf Testnet-Port 3001 erlauben! Mainnet wird geschützt.
    if (Number(port) !== 3001) {
        return res.status(403).json({ error: "Feature nur im Testnet verfuegbar!" });
    }

    const rawUid = req.body.pi_uid;
    const pi_uid = normalizeUid(rawUid);
    if (!rawUid || !pi_uid) return res.status(400).json({ error: "UID fehlt" });

    // WICHTIG: Wallet-Seed der App muss konfiguriert sein
    const walletSeed = process.env.PI_WALLET_PRIVATE_SEED;
    if (!walletSeed) {
        return res.status(500).json({ error: "Wallet-Seed fehlt!", details: "PI_WALLET_PRIVATE_SEED in .env ist nicht gesetzt." });
    }

    try {
        const paymentData = {
            payment: {
                amount: 1,
                memo: "Beta-Tester Belohnung: Hol dir 1 Test-Pi",
                metadata: { "type": "beta_a2u_reward" },
                uid: rawUid // Hier die ROHE UID nutzen, die Pi API kennt kein "test_" Präfix
            }
        };

        console.log(`🎁 [A2U - STEP 1] Erstelle Payment (1 Pi) für UID: ${pi_uid}...`);

        let paymentId, toAddress;

        // 1. Payment erstellen (oder unvollständiges Payment abfangen)
        try {
            const createResponse = await piApi.post('/v2/payments', paymentData);

            const returnedData = createResponse.data;
            const paymentObj = returnedData.payment || {};
            // v2 A2U creates typically use `identifier` for ID.
            paymentId = returnedData.identifier;

            // Versuchen, die to_address sicher zu extrahieren. API v2 gibt oft recipient oder recipient_address zurück.
            toAddress = returnedData.recipient ||
                returnedData.recipient_address ||
                returnedData.to_address ||
                paymentObj.to_address ||
                paymentObj.recipient_address ||
                paymentObj.recipient;

            if (!toAddress) {
                throw new Error(`Die API lieferte keine Zieladresse zurück. Antwort: ${JSON.stringify(returnedData)}`);
            }
        } catch (apiError) {
            if (apiError.response && apiError.response.data && apiError.response.data.error === "ongoing_payment_found") {
                const ongoingPayment = apiError.response.data.payment;
                console.warn(`⚠️ [A2U] Defekte/Unvollständige Zahlung gefunden (${ongoingPayment.identifier}). Breche diese ab...`);

                try {
                    // Alte feststeckende Zahlung beim Pi Server stornieren
                    await piApi.post(`/v2/payments/${ongoingPayment.identifier}/cancel`);
                    console.log(`✅ [A2U] Feststeckende Zahlung abgebrochen. Erstelle neue Zahlung...`);
                } catch (cancelError) {
                    console.warn(`Fehler beim Abbrechen der alten Zahlung:`, cancelError.message);
                }

                // 1b. Neuen sauberen Payment Request starten
                const retryResponse = await piApi.post('/v2/payments', paymentData);
                const retryData = retryResponse.data;
                const retryPaymentObj = retryData.payment || {};

                paymentId = retryData.identifier;
                toAddress = retryData.recipient || retryData.recipient_address || retryData.to_address || retryPaymentObj.to_address || retryPaymentObj.recipient_address || retryPaymentObj.recipient;

                if (!toAddress) {
                    throw new Error(`Die API lieferte beim 2. Versuch keine Zieladresse zurück. Antwort: ${JSON.stringify(retryData)}`);
                }
            } else {
                throw apiError;
            }
        }

        console.log(`✅ [A2U - STEP 1b] Ziel-Adresse erhalten: ${toAddress}. Erstelle Stellar-Transaktion...`);

        // 2. Stellar-Transaktion bauen
        // Wir nutzen die konfigurierte Horizon URL (z.B. der lokalen Pi Node)
        const horizonUrl = HORIZON_URL;

        // Kompatibilität mit neueren Stellar SDK Versionen (>= 12.x) - benutze Horizon.Server
        const server = new StellarSdk.Horizon.Server(horizonUrl);
        const sourceKeypair = StellarSdk.Keypair.fromSecret(walletSeed);

        // Account des Absenders (App-Wallet) laden
        const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

        const transactionBuilder = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: "100000", // Die Pi-Netzwerk Mindest-Transaktionsgebühr beträgt 0.01 Pi = 100000 stroops
            networkPassphrase: 'Pi Testnet' // Für Mainnet: "Pi Network"
        });

        try {
            await server.loadAccount(toAddress);
            // Account existiert => Sende Payment
            transactionBuilder.addOperation(StellarSdk.Operation.payment({
                destination: toAddress,
                asset: StellarSdk.Asset.native(),
                amount: "1.0000000" // 1 Pi
            }));
        } catch (accountError) {
            // Account existiert nicht (op_no_destination) => Account Erstellen
            if (accountError.response && accountError.response.status === 404) {
                console.log(`ℹ️ [A2U] Account existiert noch nicht im Testnet. Erstelle Account (CreateAccount) und sende Payment...`);

                // 1. Erstelle das leere Wallet (Reserve)
                transactionBuilder.addOperation(StellarSdk.Operation.createAccount({
                    destination: toAddress,
                    startingBalance: "1.0000000" // Pi Wallet Reserve 
                }));

                // 2. Das tatsächliche Payment-Objekt hinzufügen, nach dem das Pi Server Backend sucht!
                transactionBuilder.addOperation(StellarSdk.Operation.payment({
                    destination: toAddress,
                    asset: StellarSdk.Asset.native(),
                    amount: "1.0000000" // 1 Pi Reward (Hier prüft der Pi Server auf 'invalid_amount')
                }));
            } else {
                throw accountError;
            }
        }

        const transaction = transactionBuilder
            .addMemo(StellarSdk.Memo.text(paymentId))
            .setTimeout(30)
            .build();

        // 3. Transaktion signieren mit dem Developer Seed
        transaction.sign(sourceKeypair);

        console.log(`🔄 [A2U - STEP 2] Sende Transaktion an Pi Testnet Blockchain...`);

        // 4. An Blockchain übermitteln
        const txResult = await server.submitTransaction(transaction);
        const txid = txResult.hash;

        console.log(`✅ [A2U - STEP 2b] Transaktion auf Blockchain bestätigt! TXID: ${txid}. Melde an Pi Server...`);

        // 5. Payment bei Pi abschicken (Submit)
        const submitResponse = await piApi.post(`/v2/payments/${paymentId}/complete`, { txid: txid });

        console.log(`🚀 [A2U - STEP 3] Payment vollständig abgeschlossen!`);
        res.status(200).json({ success: true, txid: txid });

    } catch (error) {
        let errDetails = error.message;
        if (error.response && error.response.data) {
            errDetails = JSON.stringify(error.response.data);
        } else if (error.response && error.response.status === 400 && error.response.data.extras) {
            // Stellar Horizon Fehler
            errDetails = JSON.stringify(error.response.data.extras.result_codes);
        }
        console.error("❌ A2U Testnet Payment fehlgeschlagen:", errDetails);
        res.status(500).json({ error: "A2U Payment fehlgeschlagen", details: errDetails });
    }
});

// ==================================================================
// BLOCKCHAIN DATA — Hybrid: Local Pi Node → Public API → Cache
// ==================================================================

// Wir nutzen direkt die offizielle (oder in .env konfigurierte) Pi Horizon API
const PRIMARY_HORIZON = HORIZON_URL;
const FALLBACK_HORIZON = HORIZON_URL;

// ── Cache-Stores ────────────────────────────────────────────────────
const caches = {
    nodeStats: { data: null, ts: 0, ttl: 20000 },   // 20s
    localStatus: { data: null, ts: 0, ttl: 15000 },   // 15s
    feeStats: { data: null, ts: 0, ttl: 15000 },   // 15s
    networkFeed: { data: null, ts: 0, ttl: 10000 },   // 10s
    nodeValidator: { data: null, ts: 0, ttl: 60000 },   // 60s
};

function getCache(key) {
    const c = caches[key];
    if (c.data && (Date.now() - c.ts) < c.ttl) return c.data;
    return null;
}
function setCache(key, data) {
    caches[key].data = data;
    caches[key].ts = Date.now();
}

// ── Helper: fetch with primary→fallback ─────────────────────────────
async function horizonGet(path, { timeout = 8000 } = {}) {
    // Wir nutzen immer direkt die offizielle API, da eine Standard-Pi-Node keine Horizon API anbietet
    const r = await axios.get(`${HORIZON_URL}${path}`, { timeout });
    return { data: r.data, source: 'public' };
}

// ==================================================================
// 1. NODE STATS (Ledger + App Wallet) — bisheriger Haupt-Endpoint
// ==================================================================
app.get('/api/node-stats', async (req, res) => {
    const bustCache = req.query.t != null;
    if (!bustCache) {
        const cached = getCache('nodeStats');
        if (cached) return res.json(cached);
    }

    let latestLedger = null;
    let dataSource = 'unknown';
    try {
        const { data, source } = await horizonGet('/ledgers?order=desc&limit=1');
        latestLedger = data._embedded?.records?.[0] || data?.records?.[0] || null;
        dataSource = source;
        if (latestLedger) {
            console.log(`✅ [node-stats] Ledger #${latestLedger.sequence} via ${source}`);
        }
    } catch (e) {
        console.error(`❌ [node-stats] Ledger fehlgeschlagen:`, e.message);
    }

    let piBalance = null, walletExists = false, recentTxs = [];
    if (APP_WALLET_PUBLIC_KEY) {
        try {
            const { data } = await horizonGet(`/accounts/${APP_WALLET_PUBLIC_KEY}`);
            const nativeBal = (data.balances || []).find(b => b.asset_type === 'native');
            if (nativeBal) {
                piBalance = parseFloat(nativeBal.balance).toFixed(4) + ' PI';
                walletExists = true;
                console.log(`✅ [node-stats] Wallet: ${piBalance}`);
            }
        } catch (e) {
            if (e.response?.status === 404) console.warn(`⚠️ Wallet nicht on-chain: ${APP_WALLET_PUBLIC_KEY}`);
            else console.warn(`⚠️ Wallet-Fehler:`, e.message);
        }

        if (walletExists) {
            try {
                const { data } = await horizonGet(`/accounts/${APP_WALLET_PUBLIC_KEY}/transactions?order=desc&limit=5`);
                const txList = data._embedded?.records || data?.records || [];
                recentTxs = txList.map(tx => ({
                    id: (tx.id || tx.hash || '').substring(0, 16) + '...',
                    created_at: tx.created_at,
                    operation_count: tx.operation_count,
                    fee_charged: tx.fee_charged || tx.fee_paid
                }));
            } catch (e) { console.warn(`⚠️ TX-Fehler:`, e.message); }
        }
    }

    const stats = {
        network: mode, data_source: dataSource,
        horizon_url: HORIZON_URL, node_key: NODE_PUBLIC_KEY,
        block_height: latestLedger?.sequence ?? null,
        close_time: latestLedger?.closed_at ?? null,
        tx_count: latestLedger?.transaction_count ?? null,
        op_count: latestLedger?.operation_count ?? null,
        base_fee: latestLedger?.base_fee_in_stroops ?? null,
        app_wallet: APP_WALLET_PUBLIC_KEY,
        app_wallet_exists: walletExists,
        app_balance: piBalance,
        recent_txs: recentTxs,
        fetched_at: new Date().toISOString()
    };
    setCache('nodeStats', stats);
    console.log(`✅ [node-stats] Block: #${stats.block_height} | Source: ${dataSource} | Balance: ${stats.app_balance}`);
    res.json(stats);
});

// ==================================================================
// 2. LOCAL NODE STATUS (Horizon Root + Sync Info)
// ==================================================================
// Endpoint entfernt, da lokale Node nicht unterstützt wird


// ==================================================================
// 3. FEE STATS (Netzwerk-Gebührenstatistik)
// ==================================================================
app.get('/api/fee-stats', async (req, res) => {
    const cached = getCache('feeStats');
    if (cached) return res.json(cached);

    try {
        const { data, source } = await horizonGet('/fee_stats');
        const result = {
            source,
            last_ledger: data.last_ledger,
            last_ledger_base_fee: data.last_ledger_base_fee,
            ledger_capacity_usage: data.ledger_capacity_usage,
            min_accepted_fee: data.fee_charged?.min ?? data.min_accepted_fee,
            mode_accepted_fee: data.fee_charged?.mode ?? data.mode_accepted_fee,
            p50_fee: data.fee_charged?.p50 ?? data.p50_accepted_fee,
            p99_fee: data.fee_charged?.p99 ?? data.p99_accepted_fee,
            max_fee_p99: data.max_fee?.p99 ?? null,
            fetched_at: new Date().toISOString()
        };
        setCache('feeStats', result);
        console.log(`✅ [fee-stats] Capacity: ${result.ledger_capacity_usage} | Base: ${result.last_ledger_base_fee}`);
        res.json(result);
    } catch (e) {
        console.error(`❌ [fee-stats]:`, e.message);
        const cached = getCache('feeStats');
        if (cached) return res.json({ ...cached, stale: true });
        res.status(503).json({ error: 'Fee-Stats nicht verfügbar', details: e.message });
    }
});

// ==================================================================
// 4. NETWORK FEED (Letzte 15 Operationen auf der Chain)
// ==================================================================
app.get('/api/network-feed', async (req, res) => {
    const cached = getCache('networkFeed');
    if (cached) return res.json(cached);

    try {
        const { data, source } = await horizonGet('/operations?order=desc&limit=15&include_failed=false');
        const records = data._embedded?.records || data?.records || [];
        const ops = records.map(op => ({
            id: op.id,
            type: op.type,
            created_at: op.created_at,
            transaction_hash: (op.transaction_hash || '').substring(0, 12) + '...',
            source_account: op.source_account
                ? op.source_account.substring(0, 6) + '...' + op.source_account.slice(-4)
                : '—',
            amount: op.amount ? parseFloat(op.amount).toFixed(2) + ' PI' : null,
            to: op.to ? op.to.substring(0, 6) + '...' + op.to.slice(-4) : null,
            asset_type: op.asset_type || null,
        }));
        const result = { source, ops, fetched_at: new Date().toISOString() };
        setCache('networkFeed', result);
        console.log(`✅ [network-feed] ${ops.length} Ops via ${source}`);
        res.json(result);
    } catch (e) {
        console.error(`❌ [network-feed]:`, e.message);
        const cached = getCache('networkFeed');
        if (cached) return res.json({ ...cached, stale: true });
        res.status(503).json({ error: 'Network-Feed nicht verfügbar' });
    }
});

// ==================================================================
// 5. NODE VALIDATOR INFO (Node Public Key als Validator-Account)
// ==================================================================
app.get('/api/node-validator', async (req, res) => {
    const cached = getCache('nodeValidator');
    if (cached) return res.json(cached);

    try {
        const { data, source } = await horizonGet(`/accounts/${NODE_PUBLIC_KEY}`);
        const result = {
            source,
            account_id: data.id,
            sequence: data.sequence,
            subentry_count: data.subentry_count,
            home_domain: data.home_domain || null,
            flags: data.flags,
            thresholds: data.thresholds,
            signers: (data.signers || []).map(s => ({
                key: s.key.substring(0, 6) + '...' + s.key.slice(-4),
                weight: s.weight,
                type: s.type
            })),
            balances: (data.balances || []).map(b => ({
                asset_type: b.asset_type,
                balance: b.balance
            })),
            fetched_at: new Date().toISOString()
        };
        setCache('nodeValidator', result);
        console.log(`✅ [node-validator] Account: ${result.account_id.substring(0, 8)}... | Seq: ${result.sequence}`);
        res.json(result);
    } catch (e) {
        if (e.response?.status === 404) {
            const result = { account_id: NODE_PUBLIC_KEY, not_found: true, fetched_at: new Date().toISOString() };
            setCache('nodeValidator', result);
            return res.json(result);
        }
        console.error(`❌ [node-validator]:`, e.message);
        res.status(503).json({ error: 'Validator-Info nicht verfügbar' });
    }
});



// ==================================================================
// PLAYER PAYMENTS (Coins, Premium-Status + vollständige TXID-Historie)
// ==================================================================
app.get('/api/player-payments', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.get('SELECT coins, has_premium_license FROM users WHERE pi_uid = ?', [pi_uid], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.json({ coins: 0, has_premium: false, payments: [] });

        // Lade alle Blockchain-Transaktionen des Players
        db.all(
            `SELECT txid, bundle_id, amount_coins, network, created_at, explorer_url, payment_id
             FROM payments WHERE pi_uid = ? ORDER BY created_at DESC LIMIT 20`,
            [pi_uid],
            (err2, txRows) => {
                const payments = (txRows || []).map(p => ({
                    txid: p.txid,
                    txid_short: p.txid ? p.txid.substring(0, 10) + '...' + p.txid.slice(-6) : '—',
                    bundle_id: p.bundle_id,
                    amount_coins: p.amount_coins,
                    network: p.network,
                    created_at: p.created_at,
                    explorer_url: p.explorer_url || `https://explorer.minepi.com/transactions/${p.txid}`
                }));

                res.json({
                    coins: row.coins,
                    has_premium: row.has_premium_license === 1,
                    payments: payments,
                    total_txs: payments.length
                });
            }
        );
    });
});

// ==================================================================
// WELCOME BONUS
// ==================================================================
const WELCOME_BONUS_AMOUNT = 31415;

app.get('/api/check-welcome-bonus', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.get("SELECT welcome_bonus_claimed FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        const claimed = row ? row.welcome_bonus_claimed === 1 : false;
        res.json({ eligible: !claimed, amount: WELCOME_BONUS_AMOUNT });
    });
});

app.post('/api/claim-welcome-bonus', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { username } = req.body;
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins, welcome_bonus_claimed) VALUES (?, ?, 0, 0)`,
            [pi_uid, username || 'Pilot']);

        db.run(`UPDATE users SET coins = coins + ?, welcome_bonus_claimed = 1
             WHERE pi_uid = ? AND welcome_bonus_claimed = 0`,
            [WELCOME_BONUS_AMOUNT, pi_uid],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                if (this.changes === 0) return res.status(409).json({ error: 'already_claimed' });

                db.get("SELECT coins FROM users WHERE pi_uid = ?", [pi_uid], (err2, row) => {
                    if (err2) return res.status(500).json({ error: err2.message });
                    console.log(`🎁 Welcome Bonus von ${WELCOME_BONUS_AMOUNT} GFC an ${username} (${pi_uid}) ausgezahlt. Neuer Stand: ${row.coins}`);
                    res.json({ success: true, newBalance: row.coins, amount: WELCOME_BONUS_AMOUNT });
                });
            }
        );
    });
});

// ==================================================================
// DATEN LADEN & SPEICHERN
// ==================================================================
app.get('/api/load-data', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: "UID fehlt" });

    // IMPORTANT: Load must never 404 for known identities.
    // Create a default row on first contact so the client can always bootstrap from DB.
    db.serialize(() => {
        db.run(
            `INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`,
            [pi_uid]
        );

        db.get("SELECT * FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
            if (err || !row) return res.status(500).json({ error: "DB Fehler beim Laden" });

            let upgrades = {}, cosmetics = {}, collectibles = { unlocked_collectibles: [], equipped_collectible: null }, trophies = {};
            try { upgrades = JSON.parse(row.upgrades || '{}'); } catch (e) { }
            try { cosmetics = JSON.parse(row.cosmetics || '{}'); } catch (e) { }
            try { collectibles = JSON.parse(row.collectibles || '{"unlocked_collectibles":[],"equipped_collectible":null}'); } catch (e) { }
            try { trophies = JSON.parse(row.trophies || '{}'); } catch (e) { }

            res.json({
                coins: row.coins,
                upgrades,
                cosmetics,
                collectibles,
                trophies,
                total_kills: row.total_kills,
                total_coins_collected: row.total_coins_collected,
                playtime_seconds: row.playtime_seconds,
                missions_completed: row.missions_completed,
                language: row.language,
                has_premium_license: row.has_premium_license === 1
            });
        });
    });
});

// ==================================================================
// TROPHY CLAIM
// ==================================================================
app.post('/api/claim-trophy', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { trophyId } = req.body;
    if (!pi_uid || !trophyId) return res.status(400).json({ error: 'Missing parameters' });

    db.get("SELECT coins, trophies FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'User not found' });

        let trophies = {};
        try { trophies = JSON.parse(row.trophies || '{}'); } catch (e) { }

        const trophy = trophies[trophyId];
        if (!trophy || !trophy.earned) {
            return res.status(403).json({ success: false, error: 'Trophy not earned yet' });
        }
        if (trophy.claimed) {
            return res.status(409).json({ success: false, error: 'already_claimed' });
        }

        const reward = trophy.reward || 0;
        trophy.claimed = true;

        const newCoins = (row.coins || 0) + reward;
        const newTrophiesJson = JSON.stringify(trophies);

        db.run(
            "UPDATE users SET coins = ?, trophies = ? WHERE pi_uid = ?",
            [newCoins, newTrophiesJson, pi_uid],
            function (err2) {
                if (err2) return res.status(500).json({ error: err2.message });
                console.log(`🏆 Trophy '${trophyId}' claimed by ${pi_uid}. Reward: +${reward} GFC. New balance: ${newCoins}`);
                res.json({ success: true, newCoins, reward, trophyId });
            }
        );
    });
});

// Trophy earned – called from client after achievement unlock
app.post('/api/award-trophy', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { trophyId, reward } = req.body;
    if (!pi_uid || !trophyId) return res.status(400).json({ error: 'Missing parameters' });
    const rewardInt = Math.round(reward || 0); // immer ganzzahlig speichern

    // Hilfsfunktion: Trophy speichern (User muss existieren)
    function saveTrophy() {
        db.get("SELECT trophies FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ success: false, error: 'User not found after insert' });

            let trophies = {};
            try { trophies = JSON.parse(row.trophies || '{}'); } catch (e) { }

            if (trophies[trophyId] && trophies[trophyId].earned) {
                return res.json({ success: true, alreadyEarned: true });
            }

            trophies[trophyId] = { earned: true, claimed: false, reward: rewardInt };

            db.run(
                "UPDATE users SET trophies = ? WHERE pi_uid = ?",
                [JSON.stringify(trophies), pi_uid],
                function (err2) {
                    if (err2) return res.status(500).json({ error: err2.message });
                    console.log(`🏆 Trophy '${trophyId}' awarded to ${pi_uid}. Reward ready: ${rewardInt} GFC`);
                    res.json({ success: true });
                }
            );
        });
    }

    // Prüfen ob User existiert – falls nicht, erst anlegen, DANN Trophy speichern
    db.get("SELECT pi_uid FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) {
            // Nutzer anlegen und in Callback-Chain Trophy speichern
            db.run(
                `INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`,
                [pi_uid],
                function (insertErr) {
                    if (insertErr) return res.status(500).json({ error: insertErr.message });
                    saveTrophy(); // Erst NACH dem INSERT aufrufen!
                }
            );
        } else {
            saveTrophy(); // User existiert bereits
        }
    });
});


app.post('/api/save-data', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { kills_added, playtime_added, coins_collected_added, missions_completed_added, language } = req.body;
    if (!pi_uid) return res.status(400).json({ error: "UID fehlt" });

    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, ?, 0)`, [pi_uid, req.body.username || 'Pilot']);
        const sql = `
            UPDATE users SET 
                coins = coins + ?, 
                total_kills = total_kills + ?,
                playtime_seconds = playtime_seconds + ?,
                total_coins_collected = total_coins_collected + ?,
                missions_completed = missions_completed + ?,
                language = COALESCE(?, language)
            WHERE pi_uid = ?`;

        db.run(sql, [
            Number(coins_collected_added) || 0,
            Number(kills_added) || 0,
            Number(playtime_added) || 0,
            Number(coins_collected_added) || 0,
            Number(missions_completed_added) || 0,
            language || null,
            pi_uid
        ], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            db.get("SELECT coins FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
                res.json({ message: "Erfolgreich synchronisiert", updatedBalance: row ? row.coins : null });
            });
        });
    });
});


// ==================================================================
// DAILY DEAL (Rotating Skins: 50% Discount)
// ==================================================================
const DAILY_SKINS_ROTATION = [
    { id: 'skin_goliath', originalPrice: 60000 },
    { id: 'skin_sentinel', originalPrice: 10000 },
    { id: 'skin_renegade', originalPrice: 15000 },
    { id: 'skin_avenger', originalPrice: 20000 },
    { id: 'skin_spectre', originalPrice: 40000 }, // Phantom/Spectre
    { id: 'skin_gold', originalPrice: 50000 },
    { id: 'skin_void', originalPrice: 25000 }
];

function getCurrentDailyDeal() {
    const now = new Date();
    // Use a fixed shift to determine the day in a consistent way if needed, 
    // but usually UTC day is fine. Staying consistent with existing logic.
    const shiftedTime = new Date(now.getTime() + (59 * 60 * 1000));
    const daySinceEpoch = Math.floor(shiftedTime.getTime() / (1000 * 60 * 60 * 24));
    const skinIndex = daySinceEpoch % DAILY_SKINS_ROTATION.length;
    const currentDeal = DAILY_SKINS_ROTATION[skinIndex];

    const nextRollover = new Date(shiftedTime);
    nextRollover.setUTCHours(0, 0, 0, 0);
    nextRollover.setTime(nextRollover.getTime() + (24 * 60 * 60 * 1000));
    const nextDealTimeUtc = nextRollover.getTime() - (59 * 60 * 1000);
    const msLeft = nextDealTimeUtc - now.getTime();

    return {
        skinId: currentDeal.id,
        originalPrice: currentDeal.originalPrice,
        discountedPrice: Math.floor(currentDeal.originalPrice * 0.5),
        msRemaining: msLeft,
        endTime: now.getTime() + msLeft
    };
}

app.get('/api/daily-deal', (req, res) => {
    res.json(getCurrentDailyDeal());
});

app.get('/api/wheel-status', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    db.get("SELECT last_free_spin, ad_spins_today, last_ad_reset FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (err || !row) {
            const now = Date.now();
            return res.json({
                lastFreeSpin: 0,
                adSpinsToday: 0,
                lastAdReset: now,
                nextFreeSpinAt: 0,       // 0 = already free
                msUntilFree: 0,
                serverTime: now
            });
        }

        let adsToday = row.ad_spins_today;
        let lastReset = row.last_ad_reset;
        const now = Date.now();
        if (now - lastReset > 6 * 60 * 60 * 1000) {
            adsToday = 0;
            lastReset = now;
            db.run("UPDATE users SET ad_spins_today = 0, last_ad_reset = ? WHERE pi_uid = ?", [lastReset, pi_uid]);
        }

        const COOLDOWN_MS = 6 * 60 * 60 * 1000;
        const nextFreeSpinAt = (row.last_free_spin || 0) + COOLDOWN_MS;
        const msUntilFree = Math.max(0, nextFreeSpinAt - now);

        res.json({
            lastFreeSpin: row.last_free_spin,
            adSpinsToday: adsToday,
            lastAdReset: lastReset,
            nextFreeSpinAt,   // <-- canonical server timestamp
            msUntilFree,      // <-- ms remaining (server-computed)
            serverTime: now   // <-- so client can detect clock skew
        });
    });
});

const WHEEL_REWARDS_POOL = [
    // 32 REWARDS defined specifically as requested
    // CATEGORY: LEGEND FUND / APEX LOOT (COINS) - 12 Items
    { id: 0, type: 'COINS', value: 150000, label: 'LEGEND FUND', rarity: 'LEGENDARY' },
    { id: 1, type: 'COINS', value: 100000, label: 'LEGEND FUND', rarity: 'LEGENDARY' },
    { id: 2, type: 'COINS', value: 75000, label: 'APEX LOOT', rarity: 'EPIC' },
    { id: 3, type: 'COINS', value: 50000, label: 'APEX LOOT', rarity: 'EPIC' },
    { id: 4, type: 'COINS', value: 35000, label: 'APEX LOOT', rarity: 'RARE' },
    { id: 5, type: 'COINS', value: 25000, label: 'APEX LOOT', rarity: 'RARE' },
    { id: 6, type: 'COINS', value: 15000, label: 'PIONEER FUND', rarity: 'COMMON' },
    { id: 7, type: 'COINS', value: 10000, label: 'PIONEER FUND', rarity: 'COMMON' },
    { id: 8, type: 'COINS', value: 7500, label: 'STARTER KIT', rarity: 'COMMON' },
    { id: 9, type: 'COINS', value: 5000, label: 'STARTER KIT', rarity: 'COMMON' },
    { id: 10, type: 'COINS', value: 2500, label: 'PITTANCE', rarity: 'COMMON' },
    { id: 11, type: 'COINS', value: 1000, label: 'PITTANCE', rarity: 'COMMON' },

    // CATEGORY: IMMORTALITY PROTOCOL (PHOENIX) - 4 Items
    { id: 12, type: 'PHOENIX', value: 3, label: 'IMMORTALITY PROTOCOL', rarity: 'LEGENDARY' },
    { id: 13, type: 'PHOENIX', value: 2, label: 'IMMORTALITY PROTOCOL', rarity: 'EPIC' },
    { id: 14, type: 'PHOENIX', value: 1, label: 'IMMORTALITY PROTOCOL', rarity: 'RARE' },
    { id: 15, type: 'PHOENIX', value: 1, label: 'REBIRTH CORE', rarity: 'COMMON' },

    // CATEGORY: CORE OVERLOAD (SPECIALS) - 6 Items
    { id: 16, type: 'SPECIAL', value: 'BLACK_HOLE', label: 'CORE OVERLOAD', rarity: 'EPIC' },
    { id: 17, type: 'SPECIAL', value: 'NUKE', label: 'CORE OVERLOAD', rarity: 'EPIC' },
    { id: 18, type: 'SPECIAL', value: 'SCORE_BOOST', label: 'CORE OVERLOAD', rarity: 'RARE' },
    { id: 19, type: 'SPECIAL', value: 'BLACK_HOLE', label: 'SINGULARITY DRIVE', rarity: 'RARE' },
    { id: 20, type: 'SPECIAL', value: 'NUKE', label: 'OMEGA CHARGE', rarity: 'RARE' },
    { id: 21, type: 'SPECIAL', value: 'SCORE_BOOST', label: 'DATA OVERDRIVE', rarity: 'COMMON' },

    // CATEGORY: WAR-MACHINE (ULTRAS) - 4 Items
    { id: 22, type: 'ULTRA', value: 'LASER_BEAM', label: 'WAR-MACHINE', rarity: 'LEGENDARY' },
    { id: 23, type: 'ULTRA', value: 'HOMING_MISSILES', label: 'WAR-MACHINE', rarity: 'LEGENDARY' },
    { id: 24, type: 'ULTRA', value: 'LASER_BEAM', label: 'ORBITAL STRIKE', rarity: 'EPIC' },
    { id: 25, type: 'ULTRA', value: 'HOMING_MISSILES', label: 'SWARM PROTOCOL', rarity: 'EPIC' },

    // CATEGORY: PIONEER SHIPS (SKINS) - 6 Items
    { id: 26, type: 'SKIN', value: 'skin_gold', label: 'ROYAL PIONEER', rarity: 'LEGENDARY' },
    { id: 27, type: 'SKIN', value: 'skin_leviathan', label: 'VOID LEVIATHAN', rarity: 'LEGENDARY' },
    { id: 28, type: 'SKIN', value: 'skin_spectre', label: 'GHOST PIONEER', rarity: 'EPIC' },
    { id: 29, type: 'SKIN', value: 'skin_paladin', label: 'PALADIN SHIP', rarity: 'EPIC' },
    { id: 30, type: 'SKIN', value: 'skin_marauder', label: 'MARAUDER SHIP', rarity: 'RARE' },
    { id: 31, type: 'SKIN', value: 'skin_void', label: 'VOID STALKER', rarity: 'RARE' },
];

app.post('/api/spin-wheel', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { isFree } = req.body;
    if (!pi_uid) return res.status(400).json({ error: "UID fehlt" });

    db.get("SELECT coins, cosmetics, last_free_spin, ad_spins_today, last_ad_reset FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (!row) return res.status(404).json({ error: "User nicht gefunden" });

        const now = Date.now();
        let adsToday = row.ad_spins_today;
        let lastReset = row.last_ad_reset;
        if (now - lastReset > 6 * 60 * 60 * 1000) {
            adsToday = 0;
            lastReset = now;
        }

        if (isFree) {
            if (now - row.last_free_spin < 6 * 60 * 60 * 1000) return res.status(400).json({ error: "Free spin on cooldown" });
        } else {
            if (adsToday >= 10) return res.status(400).json({ error: "Ad spins limit reached" });
        }

        // --- DYNAMIC SLOT SELECTION ---
        // We pick 8 rewards randomly for this specific spin visual from the pool of 32
        const spinPoolIndices = [];
        while (spinPoolIndices.length < 8) {
            const r = Math.floor(Math.random() * 32);
            if (!spinPoolIndices.includes(r)) spinPoolIndices.push(r);
        }

        // The winning index is one of these 8 (server-side determined)
        const winningLocalIndex = Math.floor(Math.random() * 8);
        const winningGlobalId = spinPoolIndices[winningLocalIndex];
        const reward = WHEEL_REWARDS_POOL.find(r => r.id === winningGlobalId);

        // Map reward to spin pool for front-end
        const spinPool = spinPoolIndices.map(gid => WHEEL_REWARDS_POOL.find(r => r.id === gid));

        // APPLY REWARD SERVER-SIDE
        let newCoins = row.coins;
        let cosmetics = JSON.parse(row.cosmetics || '{}');
        if (reward.type === 'COINS') {
            newCoins += reward.value;
        } else if (reward.type === 'SKIN') {
            if (!cosmetics.unlocked_skins) cosmetics.unlocked_skins = [];
            if (!cosmetics.unlocked_skins.includes(reward.value)) {
                cosmetics.unlocked_skins.push(reward.value);
            } else {
                // If already has skin, give credits instead
                newCoins += 25000;
                reward.fallback = true;
            }
        }

        const nextFree = isFree ? now : row.last_free_spin;
        const nextAds = isFree ? adsToday : adsToday + 1;
        const COOLDOWN_MS = 6 * 60 * 60 * 1000;
        const nextFreeSpinAt = nextFree + COOLDOWN_MS;
        const msUntilFree = Math.max(0, nextFreeSpinAt - now);

        db.run(`UPDATE users SET 
            coins = ?, 
            cosmetics = ?, 
            last_free_spin = ?, 
            ad_spins_today = ?, 
            last_ad_reset = ? 
            WHERE pi_uid = ?`,
            [newCoins, JSON.stringify(cosmetics), nextFree, nextAds, lastReset, pi_uid],
            (err) => {
                if (err) return res.status(500).json({ error: "Update failed" });
                res.json({
                    success: true,
                    winningIndex: winningLocalIndex,
                    reward: reward,
                    spinPool: spinPool,
                    newBalance: newCoins,
                    lastFreeSpin: nextFree,
                    adSpinsToday: nextAds,
                    nextFreeSpinAt,   // <-- canonical server timestamp
                    msUntilFree,      // <-- ms remaining
                    serverTime: now
                });
            }
        );
    });
});

app.post('/api/buy-item', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { itemId, itemType, cosmeticType, cost, maxLevel } = req.body;

    // Ensure user exists before trying to buy
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`, [pi_uid]);

        db.get("SELECT coins, upgrades, cosmetics FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
            if (!row) return res.status(404).json({ error: "User nicht gefunden." });

            // Server-Side Verification of the Daily Deal (50% Discount)
            let finalCost = Number(cost) || 0;
            const currentDeal = getCurrentDailyDeal();
            if (itemId === currentDeal.skinId) {
                finalCost = Math.floor(currentDeal.originalPrice * 0.5);
                console.log(`🏷️ Applying Daily Deal Discount for ${itemId}. New price: ${finalCost}`);
            }

            const userCoins = Number(row.coins) || 0;
            if (userCoins < finalCost) return res.status(400).json({ error: "Nicht genug Coins!" });

            let newCoins = userCoins - finalCost;
            let upgrades = JSON.parse(row.upgrades || '{}');
            let cosmetics = JSON.parse(row.cosmetics || '{}');
            let success = false;

            if (itemType === 'PERMANENT' || itemType === 'ULTIMATE') {
                let current = upgrades[itemId] || 0;
                if (maxLevel && current >= maxLevel) return res.status(400).json({ error: "Max Level!" });
                upgrades[itemId] = current + 1;
                success = true;
            } else if (itemType === 'COSMETIC' || itemType === 'SKIN') {
                if (!cosmetics.unlocked_skins) cosmetics.unlocked_skins = [];
                if (!cosmetics.unlocked_projectiles) cosmetics.unlocked_projectiles = [];
                if (!cosmetics.unlocked_trails) cosmetics.unlocked_trails = [];
                if (cosmeticType === 'player_skin' && !cosmetics.unlocked_skins.includes(itemId)) cosmetics.unlocked_skins.push(itemId);
                if (cosmeticType === 'projectile_style' && !cosmetics.unlocked_projectiles.includes(itemId)) cosmetics.unlocked_projectiles.push(itemId);
                if (cosmeticType === 'engine_trail' && !cosmetics.unlocked_trails.includes(itemId)) cosmetics.unlocked_trails.push(itemId);
                success = true;
            } else if (itemType === 'CONSUMABLE') {
                success = true;
            }

            if (success) {
                db.run("UPDATE users SET coins = ?, upgrades = ?, cosmetics = ? WHERE pi_uid = ?",
                    [newCoins, JSON.stringify(upgrades), JSON.stringify(cosmetics), pi_uid],
                    (err) => {
                        if (err) return res.status(500).json({ error: "Kauf gescheitert" });
                        res.json({ success: true, newBalance: newCoins, upgrades, cosmetics });
                    }
                );
            } else {
                res.status(400).json({ error: "Invalid Item Type" });
            }
        });
    });
});

app.post('/api/equip-item', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { itemId, equipCategory } = req.body;
    db.get("SELECT cosmetics, collectibles FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (!row) return res.status(404).json({ error: "User not found" });
        let cosmetics = JSON.parse(row.cosmetics || '{}');
        let collectibles = JSON.parse(row.collectibles || '{"unlocked_collectibles":[],"equipped_collectible":null}');
        if (equipCategory === 'player_skin') cosmetics.equipped_skin = itemId;
        else if (equipCategory === 'projectile_style') cosmetics.equipped_projectile = itemId;
        else if (equipCategory === 'engine_trail') cosmetics.equipped_trail = itemId;
        else if (equipCategory === 'collectible') collectibles.equipped_collectible = itemId;
        db.run("UPDATE users SET cosmetics = ?, collectibles = ? WHERE pi_uid = ?",
            [JSON.stringify(cosmetics), JSON.stringify(collectibles), pi_uid],
            (err) => {
                if (err) return res.status(500).json({ error: "Equip failed" });
                res.json({ success: true });
            });
    });
});

app.post('/api/submit-score', (req, res) => {
    const { pi_uid, username, score, waves, mode } = req.body;
    db.get(`SELECT score FROM scores WHERE pi_uid = ? AND mode = ?`, [pi_uid, mode], (err, row) => {
        if (!row || score > row.score) {
            const sql = `INSERT INTO scores (pi_uid, username, score, waves, mode) 
                VALUES (?, ?, ?, ?, ?) ON CONFLICT(pi_uid, mode) DO UPDATE SET 
                score = excluded.score, waves = excluded.waves, username = excluded.username`;
            db.run(sql, [pi_uid, username, score, waves, mode], () => {
                db.get(`SELECT COUNT(*) + 1 as rank FROM scores WHERE mode = ? AND score > ?`, [mode, score], (err, r) => {
                    res.json({ rank: r ? r.rank : 1, score: score });
                });
            });
        } else { res.json({ message: "Kein neuer Highscore", score: row.score }); }
    });
});

app.get('/api/leaderboard', (req, res) => {
    const { mode = 'campaign', type = 'mainnet' } = req.query;
    let typeCondition = type === 'guest' ? "AND pi_uid LIKE 'guest_%'" : (type === 'testnet' ? "AND pi_uid LIKE 'test_%'" : "AND pi_uid NOT LIKE 'guest_%' AND pi_uid NOT LIKE 'test_%'");
    const sql = `SELECT pi_uid, username, score, waves, DENSE_RANK() OVER (ORDER BY score DESC) as rank FROM scores WHERE mode = ? ${typeCondition} ORDER BY score DESC LIMIT 100`;
    db.all(sql, [mode], (err, rows) => {
        if (err) return res.status(500).json([]);
        res.status(200).json(rows || []);
    });
});

// ==================================================================
// PUBLIC PROFILE (View other pilots)
// ==================================================================
app.get('/api/public-profile', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    const viewer_uid = normalizeUid(req.query.viewer_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    // Ensure user exists for consistent response shape
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`, [pi_uid]);
        db.run(`UPDATE users SET last_seen = datetime('now') WHERE pi_uid = ?`, [pi_uid]);

        db.get(`SELECT pi_uid, username, display_name, bio, total_kills, total_coins_collected, playtime_seconds,
                       missions_completed, trophies, cosmetics, collectibles, has_premium_license, created_at, last_seen
                FROM users WHERE pi_uid = ?`, [pi_uid], (err, u) => {
            if (err || !u) return res.status(500).json({ error: 'DB error' });

            let trophies = {}, cosmetics = {}, collectibles = { unlocked_collectibles: [], equipped_collectible: null };
            try { trophies = JSON.parse(u.trophies || '{}'); } catch (e) { }
            try { cosmetics = JSON.parse(u.cosmetics || '{}'); } catch (e) { }
            try { collectibles = JSON.parse(u.collectibles || '{"unlocked_collectibles":[],"equipped_collectible":null}'); } catch (e) { }

            // Best scores (both modes)
            db.all(
                `SELECT mode, score, waves
                 FROM scores
                 WHERE pi_uid = ?
                 ORDER BY CASE mode WHEN 'campaign' THEN 0 ELSE 1 END`,
                [pi_uid],
                (err2, scores) => {
                    if (err2) scores = [];

                    // Relationship status (optional)
                    const base = {
                        pi_uid: u.pi_uid,
                        username: u.username,
                        display_name: u.display_name,
                        bio: u.bio,
                        created_at: u.created_at,
                        last_seen: u.last_seen,
                        stats: {
                            total_kills: u.total_kills || 0,
                            total_coins_collected: u.total_coins_collected || 0,
                            playtime_seconds: u.playtime_seconds || 0,
                            missions_completed: u.missions_completed || 0
                        },
                        scores: scores || [],
                        trophies,
                        loadout: {
                            cosmetics,
                            collectibles
                        },
                        has_premium_license: u.has_premium_license === 1
                    };

                    if (!viewer_uid) return res.json(base);
                    if (viewer_uid === pi_uid) {
                        return res.json({
                            ...base,
                            relationship: { is_self: true, is_friend: false, outgoing_request_pending: false, incoming_request_pending: false }
                        });
                    }

                    const [uid_a, uid_b] = orderedPair(viewer_uid, pi_uid);
                    db.get(`SELECT 1 FROM friends WHERE uid_a = ? AND uid_b = ?`, [uid_a, uid_b], (e3, frRow) => {
                        if (e3) {
                            return res.json({
                                ...base,
                                relationship: { is_self: false, is_friend: false, outgoing_request_pending: false, incoming_request_pending: false }
                            });
                        }
                        if (frRow) {
                            return res.json({
                                ...base,
                                relationship: { is_self: false, is_friend: true, outgoing_request_pending: false, incoming_request_pending: false }
                            });
                        }

                        db.get(
                            `SELECT status FROM friend_requests WHERE from_uid = ? AND to_uid = ?`,
                            [viewer_uid, pi_uid],
                            (e4, outReq) => {
                                const outgoingPending = !!outReq && outReq.status === 'pending';
                                db.get(
                                    `SELECT status FROM friend_requests WHERE from_uid = ? AND to_uid = ?`,
                                    [pi_uid, viewer_uid],
                                    (e5, inReq) => {
                                        const incomingPending = !!inReq && inReq.status === 'pending';
                                        res.json({
                                            ...base,
                                            relationship: {
                                                is_self: false,
                                                is_friend: false,
                                                outgoing_request_pending: outgoingPending,
                                                incoming_request_pending: incomingPending
                                            }
                                        });
                                    }
                                );
                            }
                        );
                    });
                }
            );
        });
    });
});

// ==================================================================
// FRIENDS API (minimal)
// ==================================================================
function orderedPair(a, b) {
    return a < b ? [a, b] : [b, a];
}

app.post('/api/friends/request', (req, res) => {
    const from_uid = normalizeUid(req.body.from_uid);
    const to_uid = normalizeUid(req.body.to_uid);
    if (!from_uid || !to_uid) return res.status(400).json({ error: 'Missing parameters' });
    if (from_uid === to_uid) return res.status(400).json({ error: 'cannot_friend_self' });

    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`, [from_uid]);
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`, [to_uid]);

        const [uid_a, uid_b] = orderedPair(from_uid, to_uid);
        db.get(`SELECT 1 FROM friends WHERE uid_a = ? AND uid_b = ?`, [uid_a, uid_b], (e0, fr) => {
            if (fr) return res.status(200).json({ success: true, alreadyFriends: true });

            db.run(
                `INSERT INTO friend_requests (from_uid, to_uid, status) VALUES (?, ?, 'pending')
                 ON CONFLICT(from_uid, to_uid) DO UPDATE SET status='pending', updated_at=datetime('now')`,
                [from_uid, to_uid],
                function (e1) {
                    if (e1) return res.status(500).json({ error: e1.message });
                    res.json({ success: true });
                }
            );
        });
    });
});

app.post('/api/friends/respond', (req, res) => {
    const to_uid = normalizeUid(req.body.to_uid);
    const from_uid = normalizeUid(req.body.from_uid);
    const action = String(req.body.action || '').toLowerCase(); // accept | decline
    if (!to_uid || !from_uid || !['accept', 'decline'].includes(action)) return res.status(400).json({ error: 'Invalid parameters' });

    db.get(
        `SELECT id, status FROM friend_requests WHERE from_uid = ? AND to_uid = ?`,
        [from_uid, to_uid],
        (e0, row) => {
            if (e0) return res.status(500).json({ error: e0.message });
            if (!row) return res.status(404).json({ error: 'request_not_found' });

            const newStatus = action === 'accept' ? 'accepted' : 'declined';
            db.run(
                `UPDATE friend_requests SET status = ?, updated_at=datetime('now') WHERE id = ?`,
                [newStatus, row.id],
                function (e1) {
                    if (e1) return res.status(500).json({ error: e1.message });

                    if (newStatus !== 'accepted') return res.json({ success: true, status: newStatus });

                    const [uid_a, uid_b] = orderedPair(from_uid, to_uid);
                    db.run(
                        `INSERT OR IGNORE INTO friends (uid_a, uid_b) VALUES (?, ?)`,
                        [uid_a, uid_b],
                        (e2) => {
                            if (e2) return res.status(500).json({ error: e2.message });
                            res.json({ success: true, status: newStatus });
                        }
                    );
                }
            );
        }
    );
});

app.get('/api/friends/incoming', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });
    db.all(
        `SELECT from_uid, created_at FROM friend_requests WHERE to_uid = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 50`,
        [pi_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ incoming: rows || [] });
        }
    );
});

app.get('/api/friends/list', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });
    db.all(
        `SELECT uid_a, uid_b, created_at FROM friends
         WHERE uid_a = ? OR uid_b = ?
         ORDER BY created_at DESC LIMIT 200`,
        [pi_uid, pi_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            const list = (rows || []).map(r => (r.uid_a === pi_uid ? r.uid_b : r.uid_a));
            res.json({ friends: list });
        }
    );
});

app.listen(port, () => { console.log(`🚀 Galaxy Fall Backend aktiv auf Port ${port}`); });

