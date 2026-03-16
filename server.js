const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const StellarSdk = require('stellar-sdk');
const http = require('http');
const WebSocket = require('ws');
const crypto = require('crypto');

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

function generateSecureTicketNumber(pi_uid) {
    const ts = Date.now().toString();
    const rand = crypto.randomBytes(8).toString('hex').toUpperCase();
    const base = `${pi_uid}|${ts}|${rand}`;
    const secret = process.env.TICKET_SECRET || PI_API_KEY || 'FALLBACK_TICKET_SECRET';
    const sig = crypto.createHmac('sha256', secret).update(base).digest('hex').slice(0, 16).toUpperCase();
    return `TKT-${rand}-${ts}-${sig}`;
}

function orderedPair(u1, u2) {
    return [String(u1).toLowerCase(), String(u2).toLowerCase()].sort();
}

// ==================================================================
// MIDDLEWARE
// ==================================================================
app.use(cors({ origin: '*' }));
app.use(express.json());

// ==================================================================
// DATENBANK INITIALISIEREN
// ==================================================================
const dbFileName = (Number(port) === 3001) ? './leaderboard_testnet.db' : './leaderboard.db';
const db = new sqlite3.Database(dbFileName, (err) => {
    if (err) {
        console.error("❌ Datenbank-Fehler:", err.message);
    } else {
        console.log("✅ SQLite-Datenbank bereit.");

        // Serielles Setup: Alle Tabellen und Migrationen nacheinander ausführen
        db.serialize(() => {
            // 1. Users Tabelle
            db.run(`CREATE TABLE IF NOT EXISTS users (
                pi_uid TEXT PRIMARY KEY,
                username TEXT,
                coins INTEGER DEFAULT 0,
                upgrades TEXT DEFAULT '{}',      
                cosmetics TEXT DEFAULT '{}',     
                collectibles TEXT DEFAULT '{"unlocked_collectibles":[],"equipped_collectible":null}',  
                settings TEXT DEFAULT '{}',
                settings_updated_at INTEGER DEFAULT 0,
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
                has_premium_license INTEGER DEFAULT 0,
                display_name TEXT DEFAULT NULL,
                bio TEXT DEFAULT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                last_seen TEXT DEFAULT NULL,
                profile_visibility TEXT DEFAULT 'public',
                is_vip INTEGER DEFAULT 0,
                jackpot_tickets INTEGER DEFAULT 0,
                pi_balance REAL DEFAULT 0.0,
                auto_claimer_active INTEGER DEFAULT 0
            )`);

            // Spalten-Migration für bestehende DBs
            const columns = [
                { n: 'welcome_bonus_claimed', t: 'INTEGER', d: '0' },
                { n: 'trophies', t: 'TEXT', d: "'{}'" },
                { n: 'last_free_spin', t: 'INTEGER', d: '0' },
                { n: 'ad_spins_today', t: 'INTEGER', d: '0' },
                { n: 'last_ad_reset', t: 'INTEGER', d: '0' },
                { n: 'has_premium_license', t: 'INTEGER', d: '0' },
                { n: 'settings', t: 'TEXT', d: "'{}'" },
                { n: 'settings_updated_at', t: 'INTEGER', d: '0' },
                { n: 'display_name', t: 'TEXT', d: 'NULL' },
                { n: 'bio', t: 'TEXT', d: 'NULL' },
                { n: 'created_at', t: 'TEXT', d: "'2026-03-11 00:00:00'" },
                { n: 'last_seen', t: 'TEXT', d: 'NULL' },
                { n: 'profile_visibility', t: 'TEXT', d: "'public'" },
                { n: 'is_vip', t: 'INTEGER', d: '0' },
                { n: 'jackpot_tickets', t: 'INTEGER', d: '0' },
                { n: 'pi_balance', t: 'REAL', d: '0.0' },
                { n: 'auto_claimer_active', t: 'INTEGER', d: '0' }
            ];
            columns.forEach(col => {
                db.run(`ALTER TABLE users ADD COLUMN ${col.n} ${col.t} DEFAULT ${col.d}`, (err) => {
                    // Fehler "duplicate column name" ignorieren wir einfach
                });
            });

            // 2. Highscores Tabelle
            db.run(`CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pi_uid TEXT NOT NULL,
                username TEXT NOT NULL,
                score INTEGER NOT NULL,
                waves INTEGER NOT NULL,
                mode TEXT NOT NULL,
                UNIQUE(pi_uid, mode)
            )`);

            // 3. Payments Tabelle
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

            // 4. Social Tabellen
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

            db.run(`CREATE TABLE IF NOT EXISTS friends (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                uid_a TEXT NOT NULL,
                uid_b TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                UNIQUE(uid_a, uid_b)
            )`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_friends_a ON friends (uid_a)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_friends_b ON friends (uid_b)`);

            // 5. Messages Tabelle
            db.run(`CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                from_uid TEXT NOT NULL,
                to_uid TEXT NOT NULL,
                content TEXT NOT NULL,
                is_read INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now'))
            )`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_msg_to ON messages (to_uid, is_read)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_msg_conv ON messages (from_uid, to_uid)`);

            // 6. Feed Tabelle
            db.run(`CREATE TABLE IF NOT EXISTS feed (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pi_uid TEXT NOT NULL,
                type TEXT NOT NULL,
                content TEXT,
                metadata TEXT,
                likes_count INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now'))
            )`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_feed_pi_uid ON feed (pi_uid)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_feed_time ON feed (created_at DESC)`);

            // 7. Jackpots Tabelle & Initialer Status
            db.run(`CREATE TABLE IF NOT EXISTS jackpots (
                type TEXT PRIMARY KEY,
                current_pot REAL DEFAULT 0,
                end_time TEXT,
                last_winner_uid TEXT,
                last_winner_name TEXT
            )`);
            
            // 8. Tickets Tabelle für fälschungssichere Speicherung
            db.run(`CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pi_uid TEXT NOT NULL,
                ticket_number TEXT NOT NULL UNIQUE,
                created_at TEXT DEFAULT (datetime('now'))
            )`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_tickets_uid ON tickets (pi_uid)`);
            
            // Default Jackpots anlegen (Mini entfernt)
            db.run(`INSERT OR IGNORE INTO jackpots (type, current_pot, end_time) VALUES ('daily', 100.00, datetime('now', '+120 seconds'))`);
            db.run(`INSERT OR IGNORE INTO jackpots (type, current_pot, end_time) VALUES ('gfc_pot', 0, datetime('now', '+120 seconds'))`);
            
            // Radikale Bereinigung der alten Mock-Daten
            db.run(`UPDATE jackpots SET current_pot = 100.00 WHERE type = 'daily' AND current_pot >= 50000`);
            db.run(`DELETE FROM jackpots WHERE type = 'mini'`);
            
            console.log("✅ [JACKPOT] Status-Werte wurden auf App-Wallet Balance (Real) synchronisiert.");

            // 7. Migrationen / Cleanup
            if (Number(port) === 3001) {
                // Delete orphaned/duplicate records that would block migration
                db.run(`DELETE FROM users WHERE pi_uid NOT LIKE 'test_%' AND 'test_' || pi_uid IN (SELECT pi_uid FROM users)`, (err) => {
                    if (err) console.error("Migration Delete Users Error:", err.message);
                });
                db.run(`UPDATE users SET pi_uid = 'test_' || pi_uid WHERE pi_uid NOT LIKE 'test_%'`, (err) => {
                    if (err) console.error("Migration Update Users Error:", err.message);
                });

                db.run(`DELETE FROM scores WHERE pi_uid NOT LIKE 'test_%' AND EXISTS (SELECT 1 FROM scores s2 WHERE s2.pi_uid = 'test_' || scores.pi_uid AND s2.mode = scores.mode)`, (err) => {
                    if (err) console.error("Migration Delete Scores Error:", err.message);
                });
                db.run(`UPDATE scores SET pi_uid = 'test_' || pi_uid WHERE pi_uid NOT LIKE 'test_%'`, (err) => {
                    if (err) console.error("Migration Update Scores Error:", err.message);
                });

                db.run(`UPDATE OR IGNORE payments SET pi_uid = 'test_' || pi_uid WHERE pi_uid NOT LIKE 'test_%'`, (err) => {
                    if (err) console.error("Migration Update Payments Error:", err.message);
                });

                console.log("🛠️  [TESTNET] UID Migration check complete.");
            } else {
                db.run(`DELETE FROM users WHERE pi_uid LIKE 'test_%'`);
                db.run(`DELETE FROM scores WHERE pi_uid LIKE 'test_%'`);
                console.log("🧹 [MAINNET] Datenbank bereinigt (Test-Einträge entfernt).");
            }
        });
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

// Precheck: verhindert doppelte Collectible-Käufe und illegales Minting (ohne Kauf / ohne Premium / doppelt).
app.get('/api/can-purchase', (req, res) => {
    const rawUid = req.query.pi_uid;
    const bundleId = req.query.bundle_id;

    if (!rawUid || !bundleId) {
        return res.status(400).json({ allowed: false, reason: "missing_params" });
    }

    const pi_uid = normalizeUid(String(rawUid));
    const id = String(bundleId);

    db.get("SELECT collectibles, has_premium_license FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
        if (err) return res.status(500).json({ allowed: false, reason: "db_error" });

        let collectibles = { unlocked_collectibles: [], equipped_collectible: null, minted_collectibles: [], minted_metadata: {} };
        if (row && row.collectibles) {
            try {
                const parsed = JSON.parse(row.collectibles);
                collectibles.unlocked_collectibles = parsed.unlocked_collectibles || [];
                collectibles.equipped_collectible = parsed.equipped_collectible || null;
                collectibles.minted_collectibles = parsed.minted_collectibles || [];
                collectibles.minted_metadata = parsed.minted_metadata || {};
            } catch { }
        }

        if (id === 'premium_license') {
            const hasPremium = row && row.has_premium_license === 1;
            return res.status(200).json({ allowed: !hasPremium, reason: hasPremium ? "already_premium" : "ok" });
        }
        if (id.startsWith('collectible_')) {
            const alreadyOwned = collectibles.unlocked_collectibles.includes(id);
            return res.status(200).json({ allowed: !alreadyOwned, reason: alreadyOwned ? "already_owned" : "ok" });
        }

        if (id.startsWith('mint_')) {
            const collId = id.replace('mint_', '');
            const owns = collectibles.unlocked_collectibles.includes(collId);
            const alreadyMinted = collectibles.minted_collectibles.includes(collId);
            const hasPremium = row && row.has_premium_license === 1;

            if (!owns) return res.status(200).json({ allowed: false, reason: "not_owned" });
            if (!hasPremium) return res.status(200).json({ allowed: false, reason: "license_required" });
            if (alreadyMinted) return res.status(200).json({ allowed: false, reason: "already_minted" });
            return res.status(200).json({ allowed: true, reason: "ok" });
        }

        return res.status(200).json({ allowed: true, reason: "ok" });
    });
});
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
            db.get("SELECT collectibles, has_premium_license FROM users WHERE pi_uid = ?", [finalUid], (err, row) => {
                if (err) {
                    console.error("❌ DB Fehler beim Laden:", err.message);
                    return res.status(500).json({ error: "Internal DB Error" });
                }

                let collectiblesObj = { unlocked_collectibles: [], equipped_collectible: null, minted_collectibles: [], minted_metadata: {} };
                if (row && row.collectibles) {
                    try {
                        const parsed = JSON.parse(row.collectibles);
                        collectiblesObj.unlocked_collectibles = parsed.unlocked_collectibles || [];
                        collectiblesObj.equipped_collectible = parsed.equipped_collectible || null;
                        collectiblesObj.minted_collectibles = parsed.minted_collectibles || [];
                        collectiblesObj.minted_metadata = parsed.minted_metadata || {};
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
                    const hasPremium = row && row.has_premium_license === 1;
                    const owns = collectiblesObj.unlocked_collectibles.includes(collId);
                    const alreadyMinted = collectiblesObj.minted_collectibles.includes(collId);

                    if (!owns) {
                        console.warn('[MINT] Refused: collectible not owned (uid=' + finalUid + ', coll=' + collId + ')');
                    } else if (!hasPremium) {
                        console.warn('[MINT] Refused: premium license required (uid=' + finalUid + ')');
                    } else if (!alreadyMinted) {
                        collectiblesObj.minted_collectibles.push(collId);
                        collectiblesObj.minted_metadata[collId] = {
                            txid: txid,
                            minted_at: new Date().toISOString(),
                            network: mode,
                            paymentId: paymentId
                        };
                    }
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
                    bundleId: paymentObj.metadata?.bundleId || "Unbekannt",
                    has_premium_license: finalRow ? finalRow.has_premium_license === 1 : false
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
            // Log moved to end of function
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
    console.log(`✅ [API] /node-stats | Block: #${stats.block_height} | Wallet: ${stats.app_balance || 'N/A'}`);
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
        console.log(`✅ [API] /fee-stats | Capacity: ${result.ledger_capacity_usage} | Base: ${result.last_ledger_base_fee}`);
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
        console.log(`✅ [API] /network-feed | ${ops.length} Operations`);
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
            `INSERT OR IGNORE INTO users (pi_uid, username, last_seen, coins) VALUES (?, 'Pilot', datetime('now'), 0)`,
            [pi_uid]
        );
        db.run(`UPDATE users SET last_seen = datetime('now') WHERE pi_uid = ?`, [pi_uid]);

        db.get("SELECT * FROM users WHERE pi_uid = ?", [pi_uid], (err, row) => {
            if (err || !row) return res.status(500).json({ error: "DB Fehler beim Laden" });

            // Auch Highscore laden
            db.get("SELECT MAX(score) as highscore FROM scores WHERE pi_uid = ?", [pi_uid], (err, scoreRow) => {
                const highscore = (scoreRow && scoreRow.highscore) || 0;

                let upgrades = {}, cosmetics = {}, collectibles = { unlocked_collectibles: [], equipped_collectible: null }, trophies = {}, settings = {};
                try { upgrades = JSON.parse(row.upgrades || '{}'); } catch (e) { }
                try { cosmetics = JSON.parse(row.cosmetics || '{}'); } catch (e) { }
                try { collectibles = JSON.parse(row.collectibles || '{"unlocked_collectibles":[],"equipped_collectible":null}'); } catch (e) { }
                try { trophies = JSON.parse(row.trophies || '{}'); } catch (e) { }
                try { settings = JSON.parse(row.settings || '{}'); } catch (e) { }

                res.json({
                    coins: row.coins,
                    highscore: highscore,
                    upgrades,
                    cosmetics,
                    collectibles,
                    trophies,
                    settings,
                    settings_updated_at: row.settings_updated_at || 0,
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
});

// ==================================================================
// SETTINGS SYNC (Server canonical across devices)
// ==================================================================
app.post('/api/save-settings', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    const username = (req.body.username || 'Pilot').toString().slice(0, 32);
    const incoming = req.body.settings;
    const incomingUpdatedAt = Number(req.body.settings_updated_at) || Date.now();

    if (!pi_uid) return res.status(400).json({ error: "UID fehlt" });
    if (!incoming || typeof incoming !== 'object') return res.status(400).json({ error: "settings_invalid" });

    // Whitelist + sanitize to avoid storing arbitrary junk.
    const cleaned = {};
    try {
        if (typeof incoming.masterVolume === 'number') cleaned.masterVolume = Math.max(0, Math.min(1, incoming.masterVolume));
        if (typeof incoming.music === 'boolean') cleaned.music = incoming.music;
        if (typeof incoming.sfx === 'boolean') cleaned.sfx = incoming.sfx;
        if (typeof incoming.particles === 'number') cleaned.particles = Math.max(0, Math.min(2, Math.floor(incoming.particles)));
        if (typeof incoming.screenShake === 'boolean') cleaned.screenShake = incoming.screenShake;
        if (typeof incoming.crt === 'boolean') cleaned.crt = incoming.crt;
        if (typeof incoming.vibration === 'boolean') cleaned.vibration = incoming.vibration;
        if (typeof incoming.autoFire === 'string' && ['always', 'move', 'off'].includes(incoming.autoFire)) cleaned.autoFire = incoming.autoFire;
        if (typeof incoming.autoFire === 'boolean') cleaned.autoFire = incoming.autoFire ? 'always' : 'off';
    } catch { }

    // Hard cap (just in case)
    const json = JSON.stringify(cleaned);
    if (json.length > 2000) return res.status(400).json({ error: "settings_too_large" });

    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, ?, 0)`, [pi_uid, username]);

        db.get(`SELECT settings_updated_at FROM users WHERE pi_uid = ?`, [pi_uid], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            const currentTs = row?.settings_updated_at || 0;
            if (currentTs > incomingUpdatedAt) {
                return res.status(409).json({ error: "stale_settings", settings_updated_at: currentTs });
            }

            db.run(
                `UPDATE users SET settings = ?, settings_updated_at = ? WHERE pi_uid = ?`,
                [json, incomingUpdatedAt, pi_uid],
                function (err2) {
                    if (err2) return res.status(500).json({ error: err2.message });
                    res.json({ success: true, settings_updated_at: incomingUpdatedAt });
                }
            );
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
                language = COALESCE(?, language),
                last_seen = datetime('now')
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
    const pi_uid = normalizeUid(req.body.pi_uid);
    const { username, score, waves, mode } = req.body;
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.get(`SELECT score FROM scores WHERE pi_uid = ? AND mode = ?`, [pi_uid, mode], (err, row) => {
        if (!row || score > row.score) {
            const sql = `INSERT INTO scores (pi_uid, username, score, waves, mode) 
                VALUES (?, ?, ?, ?, ?) ON CONFLICT(pi_uid, mode) DO UPDATE SET 
                score = excluded.score, waves = excluded.waves, username = excluded.username`;
            db.run(sql, [pi_uid, username, score, waves, mode], function(err) {
                if (err) return res.status(500).json({ error: err.message });

                // Post to Social Feed
                const feedMsg = mode === 'endless'
                    ? `erreichte eine neue Bestleistung: Welle ${waves} mit ${score.toLocaleString()} Punkten im Endlos-Modus!`
                    : `erzielte ein neues Rekordergebnis von ${score.toLocaleString()} Punkten in der Kampagne!`;

                db.run(`INSERT INTO feed (pi_uid, type, content, metadata) VALUES (?, 'highscore', ?, ?)`,
                    [pi_uid, feedMsg, JSON.stringify({ score, waves, mode })]);

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
    const pi_uid = normalizeUid(req.query.pi_uid).toLowerCase();
    const viewer_uid = normalizeUid(req.query.viewer_uid)?.toLowerCase();
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    // Ensure user exists for consistent response shape
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, 'Pilot', 0)`, [pi_uid]);
        db.run(`UPDATE users SET last_seen = datetime('now') WHERE pi_uid = ?`, [pi_uid]);

        db.get(`SELECT pi_uid, username, display_name, bio, total_kills, total_coins_collected, playtime_seconds,
                       missions_completed, trophies, cosmetics, collectibles, has_premium_license, created_at, last_seen,
                       (SELECT COALESCE(SUM(likes_count), 0) FROM feed WHERE pi_uid = users.pi_uid) as reputation
                FROM users WHERE pi_uid = ?`, [pi_uid], (err, u) => {
            if (err) {
                console.error("❌ DB SELECT Error:", err);
                return res.status(500).json({ error: 'Database query error' });
            }
            if (!u) {
                console.warn("⚠️ User not found after registration Attempt:", pi_uid);
                return res.status(404).json({ error: 'User registration failed or not found' });
            }

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
                        reputation: u.reputation || 0,
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
// OWN PROFILE (Editor)
// ==================================================================
app.get('/api/profile', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.get(
        `SELECT pi_uid, username, display_name, bio, profile_visibility,
                has_premium_license, created_at, last_seen,
                total_kills, total_coins_collected, playtime_seconds, missions_completed,
                trophies, cosmetics, collectibles
         FROM users WHERE pi_uid = ?`,
        [pi_uid],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'User not found' });

            let trophies = {}, cosmetics = {}, collectibles = {};
            try { trophies = JSON.parse(row.trophies || '{}'); } catch { }
            try { cosmetics = JSON.parse(row.cosmetics || '{}'); } catch { }
            try { collectibles = JSON.parse(row.collectibles || '{}'); } catch { }

            res.json({
                pi_uid: row.pi_uid,
                username: row.username,
                display_name: row.display_name,
                bio: row.bio,
                profile_visibility: row.profile_visibility || 'public',
                has_premium_license: row.has_premium_license === 1,
                created_at: row.created_at,
                last_seen: row.last_seen,
                stats: {
                    total_kills: row.total_kills || 0,
                    total_coins_collected: row.total_coins_collected || 0,
                    playtime_seconds: row.playtime_seconds || 0,
                    missions_completed: row.missions_completed || 0
                },
                trophies,
                loadout: { cosmetics, collectibles }
            });
        }
    );
});

app.post('/api/profile', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    let { display_name, bio, profile_visibility } = req.body;
    display_name = (display_name || '').toString().trim().slice(0, 24);
    bio = (bio || '').toString().trim().slice(0, 500);
    profile_visibility = ['public', 'friends', 'private'].includes(profile_visibility)
        ? profile_visibility
        : 'public';

    db.run(
        `UPDATE users SET display_name = ?, bio = ?, profile_visibility = ? WHERE pi_uid = ?`,
        [display_name || null, bio || null, profile_visibility, pi_uid],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
            res.json({ success: true });
        }
    );
});

// ==================================================================
// PI FORTUNE JACKPOT API
// ==================================================================

// Sync/Get User Status for Jackpot
app.post('/api/user/sync', (req, res) => {
    const rawUid = req.body.id || req.body.pi_uid;
    const pi_uid = normalizeUid(rawUid);
    const username = req.body.username || 'Pilot';

    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.serialize(() => {
        // Register if not exists
        db.run(`INSERT OR IGNORE INTO users (pi_uid, username, coins) VALUES (?, ?, 0)`, [pi_uid, username]);
        
        db.get(
            `SELECT pi_uid, username, jackpot_tickets as tickets, is_vip, pi_balance as balance, auto_claimer_active 
             FROM users WHERE pi_uid = ?`, 
            [pi_uid], 
            (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(row);
            }
        );
    });
});

// Add Ticket (Free or VIP)
app.post('/api/user/add-ticket', (req, res) => {
    const rawUid = req.body.userId || req.body.pi_uid;
    const pi_uid = normalizeUid(rawUid);

    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.run(
        `UPDATE users SET jackpot_tickets = jackpot_tickets + 1 WHERE pi_uid = ?`,
        [pi_uid],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });

            // Pots erhöhen (Werbeeinnahmen simulieren)
            db.run(`UPDATE jackpots SET current_pot = current_pot + 0.10 WHERE type = 'daily'`);
            
            // Kryptographisch signiertes Ticket erstellen
            const ticketNumber = generateSecureTicketNumber(pi_uid);
            db.run(`INSERT INTO tickets (pi_uid, ticket_number) VALUES (?, ?)`, [pi_uid, ticketNumber]);
            
            db.get(`SELECT jackpot_tickets FROM users WHERE pi_uid = ?`, [pi_uid], (err2, row) => {
                if (err2) return res.status(500).json({ error: 'Failed to fetch tickets' });
                res.json({ success: true, newBalance: row.jackpot_tickets });
            });
        }
    );
});

// Buy VIP
app.post('/api/user/buy-vip', (req, res) => {
    const rawUid = req.body.userId || req.body.pi_uid;
    const pi_uid = normalizeUid(rawUid);

    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    // Mockup: VIP Status einfach aktivieren
    db.run(`UPDATE users SET is_vip = 1 WHERE pi_uid = ?`, [pi_uid], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Exchange GFC for Ticket
app.post('/api/user/exchange-gfc-ticket', (req, res) => {
    const rawUid = req.body.userId || req.body.pi_uid;
    const pi_uid = normalizeUid(rawUid);
    const quantity = parseInt(req.body.quantity) || 1;
    const costPerTicket = 10000;
    const totalCost = costPerTicket * quantity;

    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });
    if (quantity <= 0) return res.status(400).json({ error: 'Ungültige Anzahl' });

    db.get(`SELECT coins, jackpot_tickets FROM users WHERE pi_uid = ?`, [pi_uid], (err, row) => {
        if (err || !row) return res.status(404).json({ error: 'User nicht gefunden' });
        if (row.coins < totalCost) return res.status(400).json({ error: 'Nicht genügend GFC' });

        db.serialize(() => {
            db.run(`UPDATE users SET coins = coins - ?, jackpot_tickets = jackpot_tickets + ? WHERE pi_uid = ?`, [totalCost, quantity, pi_uid]);
            db.run(`UPDATE jackpots SET current_pot = current_pot + ? WHERE type = 'gfc_pot'`, [totalCost]);

            // Mehrere kryptographisch signierte Tickets in der neuen Tabelle speichern
            const stmt = db.prepare(`INSERT INTO tickets (pi_uid, ticket_number) VALUES (?, ?)`);
            for (let i = 0; i < quantity; i++) {
                const ticketNumber = generateSecureTicketNumber(pi_uid);
                stmt.run([pi_uid, ticketNumber]);
            }
            stmt.finalize();
            
            db.get(`SELECT coins, jackpot_tickets FROM users WHERE pi_uid = ?`, [pi_uid], (err2, row2) => {
                res.json({ 
                    success: true, 
                    newGfcBalance: row2.coins, 
                    newTicketBalance: row2.jackpot_tickets,
                    quantity: quantity
                });
            });
        });
    });
});

// Withdraw Winnings
app.post('/api/user/withdraw', (req, res) => {
    const rawUid = req.body.userId || req.body.pi_uid;
    const pi_uid = normalizeUid(rawUid);
    const amount = parseFloat(req.body.amount);

    if (!pi_uid || isNaN(amount) || amount < 10) return res.status(400).json({ error: 'Ungültiger Betrag' });

    db.get(`SELECT pi_balance FROM users WHERE pi_uid = ?`, [pi_uid], (err, row) => {
        if (err || !row) return res.status(500).json({ error: 'User nicht gefunden' });
        if (row.pi_balance < amount) return res.status(400).json({ error: 'Nicht genügend Pi balance' });

        db.run(
            `UPDATE users SET pi_balance = pi_balance - ? WHERE pi_uid = ?`,
            [amount, pi_uid],
            function(err2) {
                if (err2) return res.status(500).json({ error: 'Auszahlung fehlgeschlagen' });
                res.json({ success: true, newBalance: row.pi_balance - amount });
            }
        );
    });
});

// Jackpot Status
app.get('/api/jackpot/status', async (req, res) => {
    try {
        let realWalletBalance = 0;
        if (APP_WALLET_PUBLIC_KEY) {
            try {
                const { data } = await horizonGet(`/accounts/${APP_WALLET_PUBLIC_KEY}`);
                const nativeBal = (data.balances || []).find(b => b.asset_type === 'native');
                if (nativeBal) {
                    realWalletBalance = parseFloat(nativeBal.balance);
                    console.log(`💰 [JACKPOT] Real Wallet Balance fetched: ${realWalletBalance} Pi`);
                }
            } catch (e) {
                if (e.response?.status === 404) {
                    realWalletBalance = 0;
                } else {
                    console.warn("⚠️ Jackpot Wallet Fetch Error:", e.message);
                }
            }
        }

        db.get(`SELECT COUNT(*) as active_count FROM users WHERE jackpot_tickets > 0`, (err, countRow) => {
            db.all(`SELECT * FROM jackpots`, (err2, rows) => {
                if (err2) return res.status(500).json({ error: err2.message });

                const updatedRows = rows.map(j => {
                    // Ausschüttungs-Topf bleibt immer j.current_pot.
                    // Die reale Wallet-Balance wird nicht mehr in den Pot gespiegelt,
                    // damit nur das ausgezahlt werden kann, was dafür zurückgelegt wurde.
                    let potValue = j.current_pot;
                    
                    // Return end_time as ISO 8601 UTC string if it exists
                    let isoEndTime = j.end_time;
                    if (j.end_time && !j.end_time.includes('T')) {
                        // SQLite datetime('now') is like 'YYYY-MM-DD HH:MM:SS'
                        isoEndTime = j.end_time.replace(' ', 'T') + 'Z';
                    }

                    return { ...j, current_pot: potValue, end_time: isoEndTime };
                });

                res.json({
                    jackpots: updatedRows,
                    online_pilots: global.connectedClients ? global.connectedClients.size : 0,
                    wallet_balance_pi: realWalletBalance,
                    active_ticket_pilots: countRow ? countRow.active_count : 0
                });
            });
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Jackpot Ranking (Top Ticket Holders)
app.get('/api/jackpot/leaderboard', (req, res) => {
    db.all(`SELECT username, jackpot_tickets as tickets FROM users WHERE jackpot_tickets > 0 ORDER BY jackpot_tickets DESC LIMIT 50`, (err, rows) => {
        if (err) return res.status(500).json([]);
        res.json(rows || []);
    });
});

// --- JACKPOT DRAW LOGIC (BACKGROUND) ---
async function runJackpotDraw() {
    // Aktuelle Balance abholen
    let realWalletBalance = 0;
    if (APP_WALLET_PUBLIC_KEY) {
        try {
            const { data } = await horizonGet(`/accounts/${APP_WALLET_PUBLIC_KEY}`);
            const nativeBal = (data.balances || []).find(b => b.asset_type === 'native');
            if (nativeBal) realWalletBalance = parseFloat(nativeBal.balance);
        } catch (e) {
            if (e.response?.status === 404) {
                realWalletBalance = 0;
            } else {
                console.warn("⚠️ Draw Wallet Fetch Error:", e.message);
            }
        }
    }

    db.all(`SELECT * FROM jackpots WHERE type = 'daily' AND end_time <= datetime('now')`, (err, rows) => {
        if (err) return;
        if (!rows || rows.length === 0) return; // nichts fällig, kein Log-Spam

        console.log("🎲 [JACKPOT] Prüfe auf fällige Ziehungen (fällige Jackpots gefunden)...");
        
        rows.forEach(jackpot => {
            // Ausschüttungs-Topf: nur das, was explizit in current_pot gesammelt wurde
            const currentPot = jackpot.current_pot;

            console.log(`🎰 [JACKPOT] Ziehung für Typ: ${jackpot.type}`);
            
            // Ziehung: bis zu 10 unterschiedliche Gewinner, gewichtet nach Tickets
            db.all(`SELECT t.pi_uid, u.username FROM tickets t JOIN users u ON t.pi_uid = u.pi_uid ORDER BY RANDOM()`, (err2, rowsTickets) => {
                if (err2) return;

                if (rowsTickets && rowsTickets.length > 0) {
                    const winners = [];
                    const seen = new Set();
                    for (const row of rowsTickets) {
                        if (!seen.has(row.pi_uid)) {
                            winners.push(row);
                            seen.add(row.pi_uid);
                            if (winners.length >= 10) break;
                        }
                    }

                    if (winners.length === 0) {
                        console.log(`⚠️ [JACKPOT] Keine eindeutigen Gewinner-Einträge für ${jackpot.type}.`);
                        const nextTime = "+120 seconds";
                        db.run(`UPDATE jackpots SET end_time = datetime('now', ?) WHERE type = ?`, [nextTime, jackpot.type]);
                        db.run(`UPDATE jackpots SET end_time = datetime('now', ?) WHERE type = 'gfc_pot'`, [nextTime]);
                        return;
                    }

                    // Shares von 1 bis N (oder 10), höchster Rang bekommt die meisten Anteile
                    const maxRanks = winners.length;
                    let totalShares = 0;
                    for (let rank = 1; rank <= maxRanks; rank++) {
                        totalShares += rank;
                    }

                    db.get(`SELECT current_pot FROM jackpots WHERE type = 'gfc_pot'`, (errG, gfcRow) => {
                        const gfcAmountTotal = (gfcRow && gfcRow.current_pot) ? gfcRow.current_pot : 0;

                        winners.forEach((winner, index) => {
                            const rank = maxRanks - index; // Erster Gewinner = höchster Rang
                            const share = rank / totalShares;

                            const piWinRaw = currentPot * share;
                            const gfcWinRaw = gfcAmountTotal * share;

                            const piWin = Math.round(piWinRaw * 100) / 100; // 2 Nachkommastellen
                            const gfcWin = Math.round(gfcWinRaw); // ganze GFC

                            if (piWin > 0) {
                                db.run(`UPDATE users SET pi_balance = pi_balance + ? WHERE pi_uid = ?`, [piWin, winner.pi_uid]);
                            }
                            if (gfcWin > 0) {
                                db.run(`UPDATE users SET coins = coins + ? WHERE pi_uid = ?`, [gfcWin, winner.pi_uid]);
                            }

                            const label = 'MEGA';
                            let feedContent = `Hat den ${label} Jackpot-Anteil (Rang ${rank}) von ${piWin.toFixed(2)} Pi gewonnen! 🏆`;
                            if (gfcWin > 0) feedContent += ` (+ ${gfcWin.toLocaleString()} GFC Bonus!)`;
                            db.run(`INSERT INTO feed (pi_uid, type, content) VALUES (?, 'win', ?)`, [winner.pi_uid, feedContent]);
                        });

                        // GFC-Pot leeren
                        if (gfcAmountTotal > 0) {
                            db.run(`UPDATE jackpots SET current_pot = 0 WHERE type = 'gfc_pot'`);
                        }

                        const topWinner = winners[0];
                        const nextTime = "+120 seconds";
                        const nextPot = 0;

                        db.run(
                            `UPDATE jackpots SET 
                                current_pot = ?, 
                                end_time = datetime('now', ?), 
                                last_winner_uid = ?, 
                                last_winner_name = ?
                             WHERE type = ?`,
                            [nextPot, nextTime, topWinner.pi_uid, topWinner.username, jackpot.type]
                        );

                        // GFC-Pot-Timer synchron mitziehen
                        db.run(`UPDATE jackpots SET end_time = datetime('now', ?) WHERE type = 'gfc_pot'`, [nextTime]);

                        // Tickets entladen (alle Tickets aus der tickets Tabelle löschen)
                        db.run(`DELETE FROM tickets`);
                        db.run(`UPDATE users SET jackpot_tickets = 0`);

                        // Broadcast an alle verbundenen Clients (mit allen Gewinnern)
                        if (global.connectedClients) {
                            const winMsg = JSON.stringify({
                                type: 'jackpot_win',
                                jackpot_type: jackpot.type,
                                winners: winners.map((w, index) => ({
                                    pi_uid: w.pi_uid,
                                    username: w.username,
                                    rank: maxRanks - index
                                }))
                            });
                            global.connectedClients.forEach(ws => {
                                if (ws.readyState === WebSocket.OPEN) ws.send(winMsg);
                            });
                        }
                    });
                } else {
                    console.log(`⚠️ [JACKPOT] Keine Teilnehmer für ${jackpot.type}. Verlängere Jackpot.`);
                    const nextTime = "+120 seconds";
                    db.run(`UPDATE jackpots SET end_time = datetime('now', ?) WHERE type = ?`, [nextTime, jackpot.type]);
                    db.run(`UPDATE jackpots SET end_time = datetime('now', ?) WHERE type = 'gfc_pot'`, [nextTime]);
                }
            });
        });
    });
}

// Alle 5 Sekunden prüfen
setInterval(runJackpotDraw, 5000);
setTimeout(runJackpotDraw, 2000); // Initialer Check nach Start


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
        `SELECT u.pi_uid, u.username, u.display_name, u.last_seen, r.created_at 
         FROM friend_requests r
         JOIN users u ON r.from_uid = u.pi_uid
         WHERE r.to_uid = ? AND r.status = 'pending' 
         ORDER BY r.created_at DESC LIMIT 50`,
        [pi_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows || []);
        }
    );
});

app.get('/api/friends/list', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid).toLowerCase();
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });
    console.log(`[social] Loading friends for: ${pi_uid}`);
    db.all(
        `SELECT u.pi_uid, u.username, u.display_name, u.last_seen, u.cosmetics 
         FROM friends f
         JOIN users u ON (f.uid_a = ? AND u.pi_uid = f.uid_b) OR (f.uid_b = ? AND u.pi_uid = f.uid_a)
         ORDER BY f.created_at DESC LIMIT 200`,
        [pi_uid, pi_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Add is_online flag based on last_seen (last 5 minutes)
            const now = Date.now();
            const list = (rows || []).map(u => ({
                ...u,
                is_online: u.last_seen ? (now - new Date(u.last_seen).getTime() < 300000) : false
            }));
            res.json(list);
        }
    );
});

// User Search (by username, display_name or UID)
app.get('/api/users/search', (req, res) => {
    const query = req.query.query;
    if (!query || query.length < 2) return res.json({ users: [] });
    
    const searchPattern = `%${query}%`;
    db.all(
        `SELECT pi_uid, username, display_name, last_seen 
         FROM users 
         WHERE (username LIKE ? OR display_name LIKE ? OR pi_uid LIKE ?)
         LIMIT 20`,
        [searchPattern, searchPattern, searchPattern],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows || []);
        }
    );
});

// GFC Transfer between friends
app.post('/api/friends/send-gfc', (req, res) => {
    const from_uid = normalizeUid(req.body.from_uid);
    const to_uid = normalizeUid(req.body.to_uid);
    const amount = parseInt(req.body.amount);

    if (!from_uid || !to_uid || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    db.serialize(() => {
        // Verify friendship
        const [uid_a, uid_b] = orderedPair(from_uid, to_uid);
        db.get(`SELECT 1 FROM friends WHERE uid_a = ? AND uid_b = ?`, [uid_a, uid_b], (err, isFriend) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isFriend) return res.status(403).json({ error: 'Only friends can send GFC' });

            db.get(`SELECT coins FROM users WHERE pi_uid = ?`, [from_uid], (err2, row) => {
                if (err2 || !row) return res.status(500).json({ error: 'Sender not found' });
                if (row.coins < amount) return res.status(400).json({ error: 'not_enough_gfc' });

                // Perform transfer
                db.run(`BEGIN TRANSACTION`);
                db.run(`UPDATE users SET coins = coins - ? WHERE pi_uid = ?`, [amount, from_uid]);
                db.run(`UPDATE users SET coins = coins + ? WHERE pi_uid = ?`, [amount, to_uid], (err3) => {
                    if (err3) {
                        db.run(`ROLLBACK`);
                        return res.status(500).json({ error: 'Transfer failed' });
                    }
                    db.run(`COMMIT`, () => {
                        console.log(`💸 GFC Transfer: ${from_uid} sent ${amount} to ${to_uid}`);
                        res.json({ success: true, newBalance: row.coins - amount });
                    });
                });
            });
        });
    });
});

// Send Message
app.post('/api/messages/send', (req, res) => {
    const from_uid = normalizeUid(req.body.from_uid);
    const to_uid = normalizeUid(req.body.to_uid);
    const content = String(req.body.content || '').trim().slice(0, 1000);

    if (!from_uid || !to_uid || !content) return res.status(400).json({ error: 'Invalid message' });

    // Optional: Verify friendship
    const [uid_a, uid_b] = orderedPair(from_uid, to_uid);
    db.get(`SELECT 1 FROM friends WHERE uid_a = ? AND uid_b = ?`, [uid_a, uid_b], (err, isFriend) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!isFriend) return res.status(403).json({ error: 'Only friends can message each other' });

        db.run(
            `INSERT INTO messages (from_uid, to_uid, content) VALUES (?, ?, ?)`,
            [from_uid, to_uid, content],
            function(err2) {
                if (err2) return res.status(500).json({ error: err2.message });
                const messageId = this.lastID;

                // Echtzeit-Übermittlung via WebSocket
                if (global.connectedClients) {
                    const targetWs = global.connectedClients.get(to_uid);
                    if (targetWs && targetWs.readyState === WebSocket.OPEN) {
                        targetWs.send(JSON.stringify({
                            type: 'new_message',
                            message: {
                                id: messageId,
                                from_uid,
                                to_uid,
                                content,
                                created_at: new Date().toISOString()
                            }
                        }));
                    }
                }

                res.json({ success: true, messageId: messageId });
            }
        );
    });
});

// Get Messages (Conversation)
app.get('/api/messages/list', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    const friend_uid = normalizeUid(req.query.friend_uid);
    if (!pi_uid || !friend_uid) return res.status(400).json({ error: 'Missing parameters' });

    db.all(
        `SELECT * FROM messages 
         WHERE (from_uid = ? AND to_uid = ?) OR (from_uid = ? AND to_uid = ?)
         ORDER BY created_at ASC LIMIT 100`,
        [pi_uid, friend_uid, friend_uid, pi_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Mark as read
            db.run(`UPDATE messages SET is_read = 1 WHERE from_uid = ? AND to_uid = ?`, [friend_uid, pi_uid]);
            
            res.json(rows || []);
        }
    );
});

// Get unread counts
app.get('/api/messages/unread', (req, res) => {
    const pi_uid = normalizeUid(req.query.pi_uid);
    if (!pi_uid) return res.status(400).json({ error: 'UID fehlt' });

    db.all(
        `SELECT from_uid, COUNT(*) as count 
         FROM messages 
         WHERE to_uid = ? AND is_read = 0 
         GROUP BY from_uid`,
        [pi_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ unread: rows || [] });
        }
    );
});

// Social Feed
app.get('/api/feed', (req, res) => {
    db.all(
        `SELECT f.*, u.username, u.display_name, u.cosmetics
         FROM feed f
         JOIN users u ON f.pi_uid = u.pi_uid
         ORDER BY f.created_at DESC LIMIT 50`,
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows || []);
        }
    );
});

app.post('/api/feed', (req, res) => {
    const pi_uid = normalizeUid(req.body.pi_uid);
    let { type, content, metadata } = req.body;
    if (!pi_uid || !type) return res.status(400).json({ error: 'Missing data' });

    // Anti-Spam: No links allowed in public feed
    if (content && typeof content === 'string') {
        const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
        if (urlRegex.test(content)) {
            return res.status(400).json({ error: 'Links are not allowed in the public chat' });
        }
    }

    db.run(
        `INSERT INTO feed (pi_uid, type, content, metadata) VALUES (?, ?, ?, ?)`,
        [pi_uid, type, content, metadata ? JSON.stringify(metadata) : null],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            
            // Limit to last 50 entries for public chat efficiency
            db.run(`DELETE FROM feed WHERE id NOT IN (SELECT id FROM feed ORDER BY created_at DESC LIMIT 50)`);
            
            res.json({ success: true, id: this.lastID });
        }
    );
});

app.post('/api/feed/like', (req, res) => {
    const { feedId } = req.body;
    if (!feedId) return res.status(400).json({ error: 'Missing ID' });

    db.run(`UPDATE feed SET likes_count = likes_count + 1 WHERE id = ?`, [feedId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/api/ws' });
global.connectedClients = new Map();

wss.on('connection', (ws, req) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pi_uid = normalizeUid(url.searchParams.get('uid'));

        if (pi_uid) {
            global.connectedClients.set(pi_uid, ws);
            // Letzten Online-Status aktualisieren
            db.run(`UPDATE users SET last_seen = ? WHERE pi_uid = ?`, [Date.now(), pi_uid]);
        }

        ws.on('message', (msg) => {
            try {
                const data = JSON.parse(msg.toString());
                if (data.type === 'ping') ws.send(JSON.stringify({ type: 'pong' }));
            } catch (e) {}
        });

        ws.on('close', () => {
            if (pi_uid && global.connectedClients.get(pi_uid) === ws) {
                global.connectedClients.delete(pi_uid);
            }
        });
    } catch (err) {
        console.error("WS Connection Error:", err);
    }
});

server.listen(port, () => { 
    console.log(`🚀 Galaxy Fall Backend aktiv auf Port ${port} (${mode})`); 
});


