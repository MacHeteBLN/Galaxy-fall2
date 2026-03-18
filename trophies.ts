// ==============================================================================
// GALAXY FALL – TROPHY DEFINITIONS
// Alle 20 Trophäen mit Schwierigkeits-Score.
// Die Coins werden proportional verteilt: Gesamtsumme = 100.000 GFC.
// ==============================================================================

export interface TrophyDef {
    id: string;
    nameKey: string;
    descKey: string;
    icon: string;          // emoji oder asset-path
    difficulty: number;    // relativ – höher = mehr Coins
    unlockHint: string;    // fallback english
    hintKey: string;      // key for translations.ts
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const TROPHY_DEFINITIONS: TrophyDef[] = [
    // ── COMMON (leicht) ───────────────────────────────────────────────────────
    {
        id: 'first_flight',
        nameKey: 'ach_first_flight_name',
        descKey: 'ach_first_flight_desc',
        icon: '🛸',
        difficulty: 2,
        unlockHint: 'Start your very first mission.',
        hintKey: 'ach_first_flight_hint',
        rarity: 'common'
    },
    {
        id: 'first_upgrade',
        nameKey: 'ach_first_upgrade_name',
        descKey: 'ach_first_upgrade_desc',
        icon: '🔩',
        difficulty: 2,
        unlockHint: 'Purchase your first upgrade in the shop.',
        hintKey: 'ach_first_upgrade_hint',
        rarity: 'common'
    },
    {
        id: 'high_score_hero',
        nameKey: 'ach_high_score_hero_name',
        descKey: 'ach_high_score_hero_desc',
        icon: '📡',
        difficulty: 3,
        unlockHint: 'Reach a score of 100,000 in a single run.',
        hintKey: 'ach_high_score_hero_hint',
        rarity: 'common'
    },
    {
        id: 'coin_collector',
        nameKey: 'ach_coin_collector_name',
        descKey: 'ach_coin_collector_desc',
        icon: '💎',
        difficulty: 3,
        unlockHint: 'Hold 10,000 coins at once during a game.',
        hintKey: 'ach_coin_collector_hint',
        rarity: 'common'
    },

    // ── RARE (mittel) ─────────────────────────────────────────────────────────
    {
        id: 'sentinel_scrapper',
        nameKey: 'ach_sentinel_scrapper_name',
        descKey: 'ach_sentinel_scrapper_desc',
        icon: '🦾',
        difficulty: 5,
        unlockHint: 'Defeat Boss: Sentinel Prime (Wave 10).',
        hintKey: 'ach_sentinel_scrapper_hint',
        rarity: 'rare'
    },
    {
        id: 'fully_loaded',
        nameKey: 'ach_fully_loaded_name',
        descKey: 'ach_fully_loaded_desc',
        icon: '⚙️',
        difficulty: 5,
        unlockHint: 'Reach Weapon Tier 4 in a single run.',
        hintKey: 'ach_fully_loaded_hint',
        rarity: 'rare'
    },
    {
        id: 'close_call',
        nameKey: 'ach_close_call_name',
        descKey: 'ach_close_call_desc',
        icon: '🩻',
        difficulty: 6,
        unlockHint: 'Get hit while at 1 Life and below 10% Energy.',
        hintKey: 'ach_close_call_hint',
        rarity: 'rare'
    },
    {
        id: 'untouchable',
        nameKey: 'ach_untouchable_name',
        descKey: 'ach_untouchable_desc',
        icon: '🔰',
        difficulty: 7,
        unlockHint: 'Clear an entire wave without taking damage.',
        hintKey: 'ach_untouchable_hint',
        rarity: 'rare'
    },
    {
        id: 'nukem',
        nameKey: 'ach_nukem_name',
        descKey: 'ach_nukem_desc',
        icon: '☢️',
        difficulty: 6,
        unlockHint: 'Destroy 10+ enemies with a single Nuke.',
        hintKey: 'ach_nukem_hint',
        rarity: 'rare'
    },
    {
        id: 'deep_diver',
        nameKey: 'ach_deep_diver_name',
        descKey: 'ach_deep_diver_desc',
        icon: '🌀',
        difficulty: 7,
        unlockHint: 'Reach Wave 25 in any mode.',
        hintKey: 'ach_deep_diver_hint',
        rarity: 'rare'
    },

    // ── EPIC (schwer) ─────────────────────────────────────────────────────────
    {
        id: 'serpent_slayer',
        nameKey: 'ach_serpent_slayer_name',
        descKey: 'ach_serpent_slayer_desc',
        icon: '🧬',
        difficulty: 10,
        unlockHint: 'Defeat Boss: Void Serpent (Wave 20).',
        hintKey: 'ach_serpent_slayer_hint',
        rarity: 'epic'
    },
    {
        id: 'nexus_nemesis',
        nameKey: 'ach_nexus_nemesis_name',
        descKey: 'ach_nexus_nemesis_desc',
        icon: '🔮',
        difficulty: 10,
        unlockHint: 'Defeat Boss: Omega Nexus (Wave 30).',
        hintKey: 'ach_nexus_nemesis_hint',
        rarity: 'epic'
    },
    {
        id: 'fashionista',
        nameKey: 'ach_fashionista_name',
        descKey: 'ach_fashionista_desc',
        icon: '🪬',
        difficulty: 8,
        unlockHint: 'Unlock 5 or more player skins.',
        hintKey: 'ach_fashionista_hint',
        rarity: 'epic'
    },
    {
        id: 'arsenal_ace',
        nameKey: 'ach_arsenal_ace_name',
        descKey: 'ach_arsenal_ace_desc',
        icon: '🎖️',
        difficulty: 8,
        unlockHint: 'Unlock 3 or more projectile styles.',
        hintKey: 'ach_arsenal_ace_hint',
        rarity: 'epic'
    },
    {
        id: 'millionaire_pilot',
        nameKey: 'ach_millionaire_pilot_name',
        descKey: 'ach_millionaire_pilot_desc',
        icon: '🏦',
        difficulty: 10,
        unlockHint: 'Reach a score of 1,000,000 in a single run.',
        hintKey: 'ach_millionaire_pilot_hint',
        rarity: 'epic'
    },
    {
        id: 'ultra_instinct',
        nameKey: 'ach_ultra_instinct_name',
        descKey: 'ach_ultra_instinct_desc',
        icon: '🌐',
        difficulty: 9,
        unlockHint: 'Collect and activate an Ultra Weapon.',
        hintKey: 'ach_ultra_instinct_hint',
        rarity: 'epic'
    },
    {
        id: 'phoenix_protocol',
        nameKey: 'ach_phoenix_protocol_name',
        descKey: 'ach_phoenix_protocol_desc',
        icon: '🔥',
        difficulty: 8,
        unlockHint: 'Be revived by a Phoenix Core crystal.',
        hintKey: 'ach_phoenix_protocol_hint',
        rarity: 'epic'
    },

    // ── LEGENDARY (extrem schwer) ─────────────────────────────────────────────
    {
        id: 'prime_punisher',
        nameKey: 'ach_prime_punisher_name',
        descKey: 'ach_prime_punisher_desc',
        icon: '⚡',
        difficulty: 14,
        unlockHint: 'Defeat Boss: Nexus Prime – the final guardian (Wave 40/50).',
        hintKey: 'ach_prime_punisher_hint',
        rarity: 'legendary'
    },
    {
        id: 'galaxy_savior',
        nameKey: 'ach_galaxy_savior_name',
        descKey: 'ach_galaxy_savior_desc',
        icon: '🌌',
        difficulty: 16,
        unlockHint: 'Complete the Campaign and achieve the WIN state.',
        hintKey: 'ach_galaxy_savior_hint',
        rarity: 'legendary'
    },
    {
        id: 'maxed_out',
        nameKey: 'ach_maxed_out_name',
        descKey: 'ach_maxed_out_desc',
        icon: '🏴‍☠️',
        difficulty: 20,
        unlockHint: 'Max out any upgrade to its highest tier.',
        hintKey: 'ach_maxed_out_hint',
        rarity: 'legendary'
    },
];

// ==============================================================================
// COIN REWARD CALCULATION – proportional auf 100.000 GFC
// ==============================================================================
const TOTAL_COIN_POOL = 1_000_000;
const TOTAL_DIFFICULTY = TROPHY_DEFINITIONS.reduce((s, t) => s + t.difficulty, 0);

export const TROPHY_REWARDS: Record<string, number> = {};
let allocated = 0;

// Runde alle Werte und stelle sicher, dass die Summe exakt 100.000 beträgt.
TROPHY_DEFINITIONS.forEach((t, i) => {
    const isLast = i === TROPHY_DEFINITIONS.length - 1;
    const raw = (t.difficulty / TOTAL_DIFFICULTY) * TOTAL_COIN_POOL;
    const rounded = isLast
        ? TOTAL_COIN_POOL - allocated   // letztes Element füllt auf exakt 100k auf
        : Math.round(raw);
    TROPHY_REWARDS[t.id] = Math.max(50, Math.round(rounded));
    allocated += TROPHY_REWARDS[t.id];
});

// Hilfsfunktion: Client-Cache initialisieren / mit bekannten Trophäen auffüllen
export interface TrophyState {
    earned: boolean;
    claimed: boolean;
    reward: number;
}
export type TrophyMap = Record<string, TrophyState>;

export function ensureAllTrophiesExist(existing: TrophyMap): TrophyMap {
    const result: TrophyMap = { ...existing };
    for (const def of TROPHY_DEFINITIONS) {
        if (!result[def.id]) {
            result[def.id] = { earned: false, claimed: false, reward: TROPHY_REWARDS[def.id] };
        } else {
            // reward-Wert stets aktuell halten (alte Saves haben ggf. 0)
            result[def.id].reward = TROPHY_REWARDS[def.id];
        }
    }
    return result;
}

export function getTrophyDef(id: string): TrophyDef | undefined {
    return TROPHY_DEFINITIONS.find(t => t.id === id);
}
