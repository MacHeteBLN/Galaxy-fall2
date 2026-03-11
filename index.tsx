import { translations } from './translations';
import { TROPHY_DEFINITIONS, TROPHY_REWARDS, ensureAllTrophiesExist, TrophyMap, TrophyState } from './trophies';
import playerImgSrc1 from './assets/images/player_tier1.png';
import playerImgSrc2 from './assets/images/player_tier2.png';
import playerImgSrc3 from './assets/images/player_tier3.png';
import playerImgSrc4 from './assets/images/player_tier4.png';
import playerImgSrcVoid from './assets/images/player_skin_void.png';
import playerImgSrcGold from './assets/images/player_skin_gold.png';
import playerImgSrcMarauder from './assets/images/player_skin_marauder.png';
import playerImgSrcPaladin from './assets/images/player_skin_paladin.png';
import playerImgSrcSpectre from './assets/images/player_skin_spectre.png';
import playerImgSrcGoliath from './assets/images/player_skin_goliath.png';
import playerImgSrcJuggernaut from './assets/images/player_skin_juggernaut.png';
import playerImgSrcLeviathan from './assets/images/player_skin_leviathan.png';
import gruntImgSrc from './assets/images/enemy_grunt.png';
import tankImgSrc from './assets/images/enemy_tank.png';
import weaverImgSrc from './assets/images/enemy_weaver.png';
import shooterImgSrc from './assets/images/enemy_shooter.png';
import teleporterImgSrc from './assets/images/enemy_teleporter.png';
import bossSentinelPrimeSrc from './assets/images/boss_sentinel_prime.png';
import bossVoidSerpentSrc from './assets/images/boss_void_serpent.png';
import bossOmegaNexusBaseSrc from './assets/images/boss_omega_nexus_base.png';
import bossOmegaNexusRingSrc from './assets/images/boss_omega_nexus_ring.png';
import bossNexusPrimeSrc from './assets/images/boss_nexus_prime.png';
import powerupWeaponUpSrc from './assets/images/powerups/powerup_weapon_up.png';
import powerupRapidFireSrc from './assets/images/powerups/powerup_rapid_fire.png';
import powerupSideShotsSrc from './assets/images/powerups/powerup_side_shots.png';
import powerupLaserBeamSrc from './assets/images/powerups/powerup_laser_beam.png';
import powerupHomingMissilesSrc from './assets/images/powerups/powerup_homing_missiles.png';
import powerupShieldSrc from './assets/images/powerups/powerup_shield.png';
import powerupRepairKitSrc from './assets/images/powerups/powerup_repair_kit.png';
import powerupExtraLifeSrc from './assets/images/powerups/powerup_extra_life.png';
import powerupGhostProtocolSrc from './assets/images/powerups/powerup_ghost_protocol.png';
import powerupOrbitalDroneSrc from './assets/images/powerups/powerup_orbital_drone.png';
import powerupNukeSrc from './assets/images/powerups/powerup_nuke.png';
import powerupBlackHoleSrc from './assets/images/powerups/powerup_black_hole.png';
import powerupScoreBoostSrc from './assets/images/powerups/powerup_score_boost.png';
import iconCoinMagnetSrc from './assets/images/icons/icon_coin_magnet.png';
import iconReviveChanceSrc from './assets/images/icons/icon_revive_chance.png';
import iconInventorySizeSrc from './assets/images/icons/icon_inventory_size.png';
import iconCoinValueSrc from './assets/images/icons/icon_coin_value.png';
import iconPowerupDurationSrc from './assets/images/icons/icon_powerup_duration.png';
import iconLuckChanceSrc from './assets/images/icons/icon_luck_chance.png';
import iconSpecialChargeSrc from './assets/images/icons/icon_special_charge.png';
import iconSpecialStackSrc from './assets/images/icons/icon_special_stack.png';
import iconBossSlayerSrc from './assets/images/icons/icon_boss_slayer.png';
import iconProjGreenSrc from './assets/images/icons/icon_proj_green.png';
import iconProjFireballSrc from './assets/images/icons/icon_proj_fireball.png';
import iconProjVoidSrc from './assets/images/icons/icon_proj_void.png';
import iconProjRainbowSrc from './assets/images/icons/icon_proj_rainbow.png';
import iconWeaponPrestigeSrc from './assets/images/icons/icon_weapon_prestige.png';
import iconTrailRainbowSrc from './assets/images/icons/icon_trail_rainbow.png';
import phoenixCoreBlueSrc from './assets/images/crystal_blue.png';
import phoenixCoreYellowSrc from './assets/images/crystal_yellow.png';
import phoenixCorePurpleSrc from './assets/images/crystal_purple.png';
import orbitalDrone1ImgSrc from './assets/images/orbital_drone_1.png';
import orbitalDrone2ImgSrc from './assets/images/orbital_drone_2.png';
import orbitalDrone3ImgSrc from './assets/images/orbital_drone_3.png';
import piCoinImgSrc from './assets/images/pi_coin.png';
import piCoin2ImgSrc from './assets/images/pi_coin2.png';
import shootTier1Src from './assets/audio/shoot_tier1.mp3';
import shootTier2Src from './assets/audio/shoot_tier2.mp3';
import shootTier3Src from './assets/audio/shoot_tier3.mp3';
import shootTier4Src from './assets/audio/shoot_tier4.mp3';
import blackHoleSrc from './assets/audio/black_hole.mp3';
import laserSoundSrc from './assets/audio/laser.mp3';
import droneTier1SoundSrc from './assets/audio/drone_tier1.mp3';
import droneTier2SoundSrc from './assets/audio/drone_tier2.mp3';
import droneTier3SoundSrc from './assets/audio/drone_tier3.mp3';
import coinCollectSoundSrc from './assets/audio/coin_collect.mp3';
import powerupCollectSoundSrc from './assets/audio/powerup_collect.mp3';
import enemyExplosionSoundSrc from './assets/audio/enemy_explosion.mp3';
import nukeSoundSrc from './assets/audio/nuke.mp3';
import missileLaunchSoundSrc from './assets/audio/missile_launch.mp3';
import menuMusicSrc from './assets/audio/menu_music.mp3';
import collectibleParadiseSrc from './assets/images/collectible_paradise.png';
import collectibleSporestrikeSrc from './assets/images/collectible_sporestrike.png';
import collectiblePotassiumSrc from './assets/images/collectible_potassium.png';
import collectibleRetrogamerSrc from './assets/images/collectible_retrogamer.png';
import collectibleMazeRunnerSrc from './assets/images/collectible_maze_runner.png';
import collectibleKoopaKingSrc from './assets/images/collectible_koopa_king.png';

let updateHubUI: () => void = () => { };

//================================[ GFC-SYNC-MANAGER ]================================//
// Zentrale Synchronisation fÃ¼r das GFC-Guthaben (MÃ¼nzen).
// Stellt sicher, dass Hub, Shop und Spiel immer denselben Stand anzeigen.
const syncGlobalGFC = (amount: number, source?: any) => {
    const coins = Math.max(0, Math.floor(amount));
    localStorage.setItem('galaxyFallCoins', coins.toString());

    // 1. Hub-UI aktualisieren (Hangar-Anzeige etc.)
    if (typeof updateHubUI === 'function') updateHubUI();

    // 2. Shop-Anzeige aktualisieren (falls offen)
    const shopCoinsEl = document.getElementById('shop-coins');
    if (shopCoinsEl) shopCoinsEl.textContent = coins.toLocaleString();

    // 3. Aktive Spielinstanz synchronisieren (ohne Endlosschleife)
    if (window.game && window.game !== source) {
        (window.game as any)._coins = coins;
    }
    // 4. Fallback fÃ¼r Hub-Kontext
    if ((window as any).dummyGameContext && (window as any).dummyGameContext !== source) {
        (window as any).dummyGameContext.coins = coins;
    }
};


class LocalizationManager {
    private currentLanguage: string = 'en';
    private translations: { [lang: string]: { [key: string]: string } } = translations;
    constructor() {
        const savedLang = localStorage.getItem('galaxyFallLanguage');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
    }
    public get language(): string { return this.currentLanguage; }
    setLanguage(lang: string): void {
        this.currentLanguage = this.translations[lang] ? lang : 'en';
        localStorage.setItem('galaxyFallLanguage', this.currentLanguage);
    }
    translate(key: string, replacements?: { [key: string]: string }): string {
        let text = this.translations[this.currentLanguage]?.[key] || this.translations['en']?.[key] || key;
        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                text = text.replace(`{${rKey}}`, replacements[rKey]!);
            });
        }
        return text;
    }
    applyTranslationsToUI(): void {
        document.querySelectorAll<HTMLElement>('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (key) {
                const translated = this.translate(key);
                if (el.dataset.useHtml !== undefined) {
                    el.innerHTML = translated;
                } else {
                    el.textContent = translated;
                }
                if (el.dataset.text !== undefined) el.dataset.text = translated;
            }
        });
    }
}
const globalLocalizationManager = new LocalizationManager();


declare global {
    interface Window {
        game: Game | null;
        Pi: any;
        galleryImageMap: any;
        updateHubUI: () => void;
        dummyGameContext: any;
    }
}



//================================[ STATISTIK-MANAGER (UPDATED) ]================================//
interface ICareerStats {
    total_kills: number;
    total_coins_collected: number;
    playtime_seconds: number;
    missions_completed: number;
}

class StatsManager {
    public stats: ICareerStats;
    public sessionStats: {
        kills: number;
        coins: number;
        playtime: number;
        missions: number;
    };
    public roundStats: {
        kills: number;
        coins: number;
        playtime: number;
        missions: number;
    };

    constructor() {
        this.stats = { total_kills: 0, total_coins_collected: 0, playtime_seconds: 0, missions_completed: 0 };
        this.sessionStats = { kills: 0, coins: 0, playtime: 0, missions: 0 };
        this.roundStats = { kills: 0, coins: 0, playtime: 0, missions: 0 };
    }

    // LÃ¤dt initial aus LocalStorage (NUR FÃœR GÃ„STE)
    public loadStats(): void {
        const gid = localStorage.getItem('galaxy_fall_guest_id');
        const piUid = (window as any).piManagerInstance?.uid;

        // Wenn wir eingeloggt sind, ignorieren wir den LocalStorage-Cache
        if (piUid && piUid !== 'UNREGISTERED') {
            this.stats = { total_kills: 0, total_coins_collected: 0, playtime_seconds: 0, missions_completed: 0 };
            return;
        }

        const saved = localStorage.getItem('galaxyFallCareerStats');
        if (saved && saved !== 'undefined' && saved !== 'null') {
            try { this.stats = JSON.parse(saved); } catch (e) { console.warn('Corrupted stats', e); }
        }
    }

    public saveStats(): void {
        localStorage.setItem('galaxyFallCareerStats', JSON.stringify(this.stats));
    }

    public resetSession(): void {
        this.sessionStats = { kills: 0, coins: 0, playtime: 0, missions: 0 };
        this.roundStats = { kills: 0, coins: 0, playtime: 0, missions: 0 };
    }

    // NEW: Substantielle Verbesserung fÃ¼r Finanz-Sync
    // Zieht nur das ab, was wir gerade erfolgreich an den Server gemeldet haben.
    // Verhindert Race Conditions, wenn wÃ¤hrend des Fetch-Requests neue MÃ¼nzen gesammelt wurden.
    public subtractFromSession(delta: any): void {
        if (!delta) return;
        this.sessionStats.kills = Math.max(0, this.sessionStats.kills - (delta.kills_added || 0));
        this.sessionStats.coins = Math.max(0, this.sessionStats.coins - (delta.coins_collected_added || 0));
        this.sessionStats.playtime = Math.max(0, this.sessionStats.playtime - (delta.playtime_added || 0));
        this.sessionStats.missions = Math.max(0, this.sessionStats.missions - (delta.missions_completed_added || 0));
    }

    // WICHTIG: Daten vom Server Ã¼bernehmen
    public updateFromServer(serverData: any): void {
        this.stats.total_kills = serverData.total_kills || 0;
        this.stats.total_coins_collected = serverData.total_coins_collected || 0;
        this.stats.playtime_seconds = serverData.playtime_seconds || 0;
        this.stats.missions_completed = serverData.missions_completed || 0;
        this.saveStats();
        // Update auch im Hub triggern, falls wir gerade nicht spielen
        if ((window as any).updateHubUI) (window as any).updateHubUI();
    }

    public incrementKill(): void { this.sessionStats.kills++; this.roundStats.kills++; }
    public addCollectedCoins(amount: number): void { this.sessionStats.coins += amount; this.roundStats.coins += amount; }
    public addPlaytime(seconds: number): void { this.sessionStats.playtime += seconds; this.roundStats.playtime += seconds; }
    public incrementMissions(): void { this.sessionStats.missions++; this.roundStats.missions++; }

    public getSessionDelta() {
        return {
            kills_added: this.sessionStats.kills,
            playtime_added: Math.round(this.sessionStats.playtime),
            coins_collected_added: this.sessionStats.coins,
            missions_completed_added: this.sessionStats.missions,
        };
    }

    // Client-seitige Addition fÃ¼r Offline-Support oder sofortiges Feedback
    public applySessionToTotal(): void {
        this.stats.total_kills += this.sessionStats.kills;
        this.stats.total_coins_collected += this.sessionStats.coins;
        this.stats.playtime_seconds += Math.round(this.sessionStats.playtime);
        this.stats.missions_completed += this.sessionStats.missions;
        this.saveStats();
    }
}

//================================[ ACHIEVEMENT-MANAGER ]================================//
interface IAchievement {
    id: string;
    nameKey: string;
    descKey: string;
    icon: string;
    evaluate: (game: Game, eventName: string, value?: any) => boolean;
}

class AchievementManager {
    public achievements: IAchievement[];
    public unlockedAchievements: Set<string>;
    private game: Game | null = null;

    constructor() {
        this.unlockedAchievements = new Set();
        this.achievements = [
            // Spielstart & Progression
            { id: 'first_flight', nameKey: 'ach_first_flight_name', descKey: 'ach_first_flight_desc', icon: playerImgSrc1, evaluate: (g, e) => e === 'game_start' },
            { id: 'sentinel_scrapper', nameKey: 'ach_sentinel_scrapper_name', descKey: 'ach_sentinel_scrapper_desc', icon: bossSentinelPrimeSrc, evaluate: (g, e, v) => e === 'boss_defeated' && v === 'BOSS_SENTINEL_PRIME' },
            { id: 'serpent_slayer', nameKey: 'ach_serpent_slayer_name', descKey: 'ach_serpent_slayer_desc', icon: bossVoidSerpentSrc, evaluate: (g, e, v) => e === 'boss_defeated' && v === 'BOSS_VOID_SERPENT' },
            { id: 'nexus_nemesis', nameKey: 'ach_nexus_nemesis_name', descKey: 'ach_nexus_nemesis_desc', icon: bossOmegaNexusBaseSrc, evaluate: (g, e, v) => e === 'boss_defeated' && v === 'BOSS_OMEGA_NEXUS' },
            { id: 'prime_punisher', nameKey: 'ach_prime_punisher_name', descKey: 'ach_prime_punisher_desc', icon: bossNexusPrimeSrc, evaluate: (g, e, v) => e === 'boss_defeated' && v === 'BOSS_NEXUS_PRIME' },
            { id: 'galaxy_savior', nameKey: 'ach_galaxy_savior_name', descKey: 'ach_galaxy_savior_desc', icon: playerImgSrcGold, evaluate: (g, e) => e === 'state_change' && g.gameState === 'WIN' },
            { id: 'deep_diver', nameKey: 'ach_deep_diver_name', descKey: 'ach_deep_diver_desc', icon: iconProjRainbowSrc, evaluate: (g, e) => (e === 'level_start' || e === 'level_cleared') && g.level >= 25 },

            // Score & WÃ¤hrung
            { id: 'high_score_hero', nameKey: 'ach_high_score_hero_name', descKey: 'ach_high_score_hero_desc', icon: powerupScoreBoostSrc, evaluate: (g, e) => e === 'score_update' && g.score >= 100000 },
            { id: 'millionaire_pilot', nameKey: 'ach_millionaire_pilot_name', descKey: 'ach_millionaire_pilot_desc', icon: piCoin2ImgSrc, evaluate: (g, e) => e === 'score_update' && g.score >= 1000000 },
            { id: 'coin_collector', nameKey: 'ach_coin_collector_name', descKey: 'ach_coin_collector_desc', icon: piCoinImgSrc, evaluate: (g, e) => (e === 'coin_update' || e === 'game_over') && g.coins >= 10000 },

            // Kampf & Power-Ups
            { id: 'fully_loaded', nameKey: 'ach_fully_loaded_name', descKey: 'ach_fully_loaded_desc', icon: powerupWeaponUpSrc, evaluate: (g, e) => e === 'powerup_collect' && !!g.player && g.player.powerUpManager.weaponTier === 4 },
            { id: 'untouchable', nameKey: 'ach_untouchable_name', descKey: 'ach_untouchable_desc', icon: powerupShieldSrc, evaluate: (g, e, v) => e === 'level_cleared' && v === 'no_hit' },
            { id: 'nukem', nameKey: 'ach_nukem_name', descKey: 'ach_nukem_desc', icon: powerupNukeSrc, evaluate: (g, e, v) => e === 'special_activated' && v.type === 'NUKE' && v.kills >= 10 },
            { id: 'ultra_instinct', nameKey: 'ach_ultra_instinct_name', descKey: 'ach_ultra_instinct_desc', icon: powerupLaserBeamSrc, evaluate: (g, e) => e === 'powerup_collect' && !!g.player?.powerUpManager.ultraWeapon },

            // Shop & Sammlung
            { id: 'first_upgrade', nameKey: 'ach_first_upgrade_name', descKey: 'ach_first_upgrade_desc', icon: iconCoinValueSrc, evaluate: (g, e) => e === 'item_purchased' && Object.keys(g.shopManager.playerUpgrades).length > 0 },
            { id: 'maxed_out', nameKey: 'ach_maxed_out_name', descKey: 'ach_maxed_out_desc', icon: iconWeaponPrestigeSrc, evaluate: (g, e, v) => e === 'item_purchased' && v === 'max_level_reached' },
            { id: 'fashionista', nameKey: 'ach_fashionista_name', descKey: 'ach_fashionista_desc', icon: playerImgSrcSpectre, evaluate: (g, e) => e === 'item_purchased' && g.shopManager.playerCosmetics.unlocked_skins.length >= 5 },
            { id: 'arsenal_ace', nameKey: 'ach_arsenal_ace_name', descKey: 'ach_arsenal_ace_desc', icon: iconProjGreenSrc, evaluate: (g, e) => e === 'item_purchased' && g.shopManager.playerCosmetics.unlocked_projectiles.length >= 3 },

            // Kreative & Schwierige
            { id: 'close_call', nameKey: 'ach_close_call_name', descKey: 'ach_close_call_desc', icon: powerupRepairKitSrc, evaluate: (g, e) => e === 'player_hit' && !!g.player && g.player.lives === 1 && g.player.energy < 10 },
            { id: 'phoenix_protocol', nameKey: 'ach_phoenix_protocol_name', descKey: 'ach_phoenix_protocol_desc', icon: phoenixCorePurpleSrc, evaluate: (g, e) => e === 'player_revived' }
        ];
    }

    public setGame(game: Game) {
        this.game = game;
    }

    public check(eventName: string, value?: any) {
        if (!this.game) return;

        this.achievements.forEach(ach => {
            if (!this.unlockedAchievements.has(ach.id)) {
                if (ach.evaluate(this.game!, eventName, value)) {
                    this.unlock(ach);
                }
            }
        });
    }

    private unlock(achievement: IAchievement, skipNotification: boolean = false) {
        if (!this.game) return;
        const alreadyInSet = this.unlockedAchievements.has(achievement.id);
        this.unlockedAchievements.add(achievement.id);
        // Persistenz erfolgt nur noch serverseitig Ã¼ber awardTrophy

        if (!skipNotification && !alreadyInSet) {
            this.game.uiManager.showAchievementToast(achievement);
        }
        // Trophy-System: Achievement = Trophy, sofort als "earned" markieren
        if ((window as any).awardTrophy) {
            (window as any).awardTrophy(achievement.id);
        }
    }

    public isUnlocked(id: string): boolean {
        return this.unlockedAchievements.has(id);
    }

    public syncFromServer(serverTrophies: any) {
        if (!serverTrophies) return;
        Object.keys(serverTrophies).forEach(id => {
            // WICHTIG: Server nutzt den Key 'earned', nicht 'unlocked'
            if (serverTrophies[id] && serverTrophies[id].earned) {
                this.unlockedAchievements.add(id);
            }
        });
    }

}
//====================

const API_BASE_URL = '/api';

let playerImg1: HTMLImageElement, playerImg2: HTMLImageElement, playerImg3: HTMLImageElement, playerImg4: HTMLImageElement;
let collectibleParadiseImg: HTMLImageElement, collectibleSporestrikeImg: HTMLImageElement,
    collectiblePotassiumImg: HTMLImageElement, collectibleRetrogamerImg: HTMLImageElement,
    collectibleMazeRunnerImg: HTMLImageElement, collectibleKoopaKingImg: HTMLImageElement;
let playerImgVoid: HTMLImageElement, playerImgGold: HTMLImageElement, playerImgMarauder: HTMLImageElement, playerImgPaladin: HTMLImageElement;
let playerImgSpectre: HTMLImageElement, playerImgGoliath: HTMLImageElement, playerImgJuggernaut: HTMLImageElement, playerImgLeviathan: HTMLImageElement;
let gruntImg: HTMLImageElement, tankImg: HTMLImageElement, weaverImg: HTMLImageElement, shooterImg: HTMLImageElement, teleporterImg: HTMLImageElement;
let bossSentinelPrimeImg: HTMLImageElement, bossVoidSerpentImg: HTMLImageElement, bossOmegaNexusBaseImg: HTMLImageElement, bossNexusPrimeImg: HTMLImageElement;
let orbitalDroneImages: HTMLImageElement[];
let piCoinImg: HTMLImageElement;
let powerUpImages: { [key: string]: HTMLImageElement };
const powerUpImageSources: { [key: string]: string } = { 'WEAPON_UP': powerupWeaponUpSrc, 'RAPID_FIRE': powerupRapidFireSrc, 'SIDE_SHOTS': powerupSideShotsSrc, 'LASER_BEAM': powerupLaserBeamSrc, 'HOMING_MISSILES': powerupHomingMissilesSrc, 'SHIELD': powerupShieldSrc, 'REPAIR_KIT': powerupRepairKitSrc, 'EXTRA_LIFE': powerupExtraLifeSrc, 'GHOST_PROTOCOL': powerupGhostProtocolSrc, 'ORBITAL_DRONE': powerupOrbitalDroneSrc, 'NUKE': powerupNukeSrc, 'BLACK_HOLE': powerupBlackHoleSrc, 'SCORE_BOOST': powerupScoreBoostSrc, };
let phoenixCoreImages: { [key: string]: HTMLImageElement };
let playerImageMap: { [key: string]: HTMLImageElement };

const createFallbackImage = (width: number, height: number, color: string, text: string): string => {
    const cvs = document.createElement('canvas');
    cvs.width = width;
    cvs.height = height;
    const ctx = cvs.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Rahmen
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // Text (optional)
    if (width > 20) {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
    }

    return cvs.toDataURL();
};

// 2. Dann createImage (nutzt createFallbackImage)
const createImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => {
            console.warn(`Bild fehlt: ${src}`);
            const placeholder = new Image();
            // WICHTIG: Auf onload warten, auch beim Platzhalter
            placeholder.onload = () => resolve(placeholder);
            placeholder.src = createFallbackImage(64, 64, 'rgba(255, 0, 0, 0.3)', 'X');
        };
        img.src = src;
    });
};

// 3. Dann createScaledImage
const createScaledImage = (src: string, targetWidth: number, targetHeight: number): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const originalImg = new Image();
        originalImg.crossOrigin = "Anonymous";

        const handleError = () => {
            console.warn(`Skalierung fehlgeschlagen: ${src}`);
            const placeholder = new Image();
            placeholder.onload = () => resolve(placeholder);
            placeholder.src = createFallbackImage(targetWidth, targetHeight, 'rgba(0, 255, 255, 0.3)', '!');
        };

        originalImg.onload = () => {
            try {
                let w = originalImg.width;
                let h = originalImg.height;
                const oc = document.createElement('canvas');
                const octx = oc.getContext('2d')!;
                oc.width = w; oc.height = h;
                octx.drawImage(originalImg, 0, 0);
                while (w * 0.5 > targetWidth) {
                    w *= 0.5; h *= 0.5;
                    octx.drawImage(oc, 0, 0, w * 2, h * 2, 0, 0, w, h);
                }
                oc.width = targetWidth; oc.height = targetHeight;
                octx.drawImage(originalImg, 0, 0, originalImg.width, originalImg.height, 0, 0, targetWidth, targetHeight);
                const scaledImg = new Image();
                scaledImg.onload = () => resolve(scaledImg);
                scaledImg.onerror = handleError;
                scaledImg.src = oc.toDataURL();
            } catch (e) { handleError(); }
        };
        originalImg.onerror = handleError;
        originalImg.src = src;
    });
};



const initializeImages = async () => {
    const iconSize = 80;

    const imagePromises = [
        createImage(playerImgSrc1), createImage(playerImgSrc2), createImage(playerImgSrc3), createImage(playerImgSrc4),
        createImage(playerImgSrcVoid), createImage(playerImgSrcGold), createImage(playerImgSrcMarauder), createImage(playerImgSrcPaladin),
        createImage(playerImgSrcSpectre), createImage(playerImgSrcGoliath), createImage(playerImgSrcJuggernaut), createImage(playerImgSrcLeviathan),
        createImage(collectibleParadiseSrc), createImage(collectibleSporestrikeSrc), createImage(collectiblePotassiumSrc),
        createImage(collectibleRetrogamerSrc), createImage(collectibleMazeRunnerSrc), createImage(collectibleKoopaKingSrc),

        createImage(gruntImgSrc), createImage(tankImgSrc), createImage(weaverImgSrc),
        createImage(shooterImgSrc), createImage(teleporterImgSrc),

        createImage(bossSentinelPrimeSrc), createImage(bossVoidSerpentSrc), createImage(bossOmegaNexusBaseSrc), createImage(bossOmegaNexusRingSrc),

        createImage(orbitalDrone1ImgSrc), createImage(orbitalDrone2ImgSrc), createImage(orbitalDrone3ImgSrc),
        createImage(piCoinImgSrc),
        createImage(phoenixCoreBlueSrc), createImage(phoenixCoreYellowSrc), createImage(phoenixCorePurpleSrc),

        createScaledImage(powerUpImageSources['WEAPON_UP']!, iconSize, iconSize),
        createScaledImage(powerupRapidFireSrc, iconSize, iconSize),
        createScaledImage(powerupBlackHoleSrc, iconSize, iconSize),
        createScaledImage(iconTrailRainbowSrc, iconSize, iconSize)
    ];

    const powerUpImagePromises = Object.entries(powerUpImageSources).map(async ([key, src]) => {
        const img = await createImage(src);
        return [key, img] as [string, HTMLImageElement];
    });

    const [
        pImg1, pImg2, pImg3, pImg4, pImgVoid, pImgGold, pImgMarauder, pImgPaladin,
        pImgSpectre, pImgGoliath, pImgJuggernaut, pImgLeviathan,
        coll1, coll2, coll3, coll4, coll5, coll6,
        gImg, tImg, wImg, sImg, telImg,
        bossSPImg, bossVSImg, bossONBImg, bossONRImg,
        drone1, drone2, drone3, piCoin, phxBlue, phxYellow, phxPurple,
        scaledIcon1, scaledIcon2, scaledIcon3, scaledIcon4
    ] = await Promise.all(imagePromises);

    playerImg1 = pImg1; playerImg2 = pImg2; playerImg3 = pImg3; playerImg4 = pImg4;
    playerImgVoid = pImgVoid; playerImgGold = pImgGold; playerImgMarauder = pImgMarauder; playerImgPaladin = pImgPaladin;
    playerImgSpectre = pImgSpectre; playerImgGoliath = pImgGoliath; playerImgJuggernaut = pImgJuggernaut; playerImgLeviathan = pImgLeviathan;

    collectibleParadiseImg = coll1; collectibleSporestrikeImg = coll2; collectiblePotassiumImg = coll3;
    collectibleRetrogamerImg = coll4; collectibleMazeRunnerImg = coll5; collectibleKoopaKingImg = coll6;

    gruntImg = gImg; tankImg = tImg; weaverImg = wImg; shooterImg = sImg; teleporterImg = telImg;

    bossSentinelPrimeImg = bossSPImg; bossVoidSerpentImg = bossVSImg;
    bossOmegaNexusBaseImg = bossONBImg; bossNexusPrimeImg = bossONRImg;

    orbitalDroneImages = [drone1, drone2, drone3];
    piCoinImg = piCoin;
    phoenixCoreImages = { 'BLUE': phxBlue, 'YELLOW': phxYellow, 'PURPLE': phxPurple };

    const powerUpEntries = await Promise.all(powerUpImagePromises);
    powerUpImages = Object.fromEntries(powerUpEntries);

    playerImageMap = {
        'skin_default': playerImg1, 'skin_sentinel': playerImg2, 'skin_renegade': playerImg3, 'skin_avenger': playerImg4,
        'skin_void': playerImgVoid, 'skin_gold': playerImgGold, 'skin_marauder': playerImgMarauder, 'skin_paladin': playerImgPaladin,
        'skin_spectre': playerImgSpectre, 'skin_goliath': playerImgGoliath, 'skin_juggernaut': playerImgJuggernaut, 'skin_leviathan': playerImgLeviathan,
        'collectible_paradise': collectibleParadiseImg, 'collectible_sporestrike': collectibleSporestrikeImg,
        'collectible_potassium': collectiblePotassiumImg, 'collectible_retrogamer': collectibleRetrogamerImg,
        'collectible_mazerunner': collectibleMazeRunnerImg, 'collectible_koopaking': collectibleKoopaKingImg,
    };

    const galleryImageMap = {
        'proj_default_name': scaledIcon1,
        'shop_proj_green_name': scaledIcon1,
        'shop_proj_fireball_name': scaledIcon2,
        'shop_proj_purple_name': scaledIcon3,
        'shop_proj_rainbow_name': scaledIcon4,
        'trail_default_name': playerImg1,
        'shop_trail_rainbow_name': scaledIcon4
    };

    (window as any).galleryImageMap = galleryImageMap;
};

interface IKeyMap { [key: string]: boolean; }
interface IStar { pos: Vector2D; s: number; v: number; a: number; }
interface ILevelDefinition { wave: number; scoreToEarn: number; enemies: string[]; boss?: string; formation?: string; msgKey: string; s: number; m: number; h?: number; isMultiFormation?: boolean; }
interface IUIElements { score: HTMLElement; coins: HTMLElement; level: HTMLElement; highscore: HTMLElement; specialInventory: HTMLElement; ultraInventory: HTMLElement; livesDisplay: HTMLElement; weaponStatus: HTMLElement; energyBar: HTMLElement; weaponTierDisplay: HTMLElement; levelDisplay: HTMLElement; }
interface IParticle { pos: Vector2D; vel: Vector2D; size: number; life: number; color: string; }
interface IInventoryItem { type: string; count: number; }

interface IShopItem {
    id: string;
    type: 'PERMANENT' | 'CONSUMABLE' | 'COSMETIC' | 'PI_BUNDLE' | 'ULTIMATE' | 'SKIN' | 'COLLECTIBLE';
    nameKey: string;
    descKey: string;
    iconSrc: string;
    maxLevel?: number;
    cost?: number[];
    pi_cost?: number;
    coin_reward?: number;
    applyEffect?: (game: Game) => void;
    cosmeticType?: 'player_skin' | 'projectile_style' | 'engine_trail';
    storyKey?: string;
    bonusKey?: string;
}

interface IPlayerUpgrades { [key: string]: number; }

interface IPlayerCosmetics {
    unlocked_skins: string[];
    unlocked_projectiles: string[];
    unlocked_trails: string[];
    equipped_skin: string;
    equipped_projectile: string;
    equipped_trail: string;
}

interface IMintMetadata {
    txid: string;
    minted_at: string;
    network: string;
    paymentId: string;
}

interface IPlayerCollectibles {
    unlocked_collectibles: string[];
    equipped_collectible: string | null;
    minted_collectibles: string[];
    minted_metadata?: { [id: string]: IMintMetadata };
}


interface IWheelData {
    lastFreeSpin: number;
    adSpinsToday: number;
    lastAdReset: number;
    nextFreeSpinAt: number;  // canonical: set by server, NOT computed client-side
    inventory: {
        specials: string[];
        ultras: string[];
        extraRevives: number;
    }
}

interface IWheelReward {
    id: number;
    type: 'COINS' | 'SPECIAL' | 'ULTRA' | 'PHOENIX' | 'SKIN' | 'COLLECTIBLE';
    value: any;
    label: string;
    rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
    fallback?: boolean;
}

interface ILeaderboardEntry { pi_uid?: string; rank: number; username: string; score: number; waves: number; }

class PiManager {
    private game: Game | null = null;
    public isAuthenticated: boolean = false;
    public username: string = '';
    public uid: string = '';
    public isSandbox: boolean = false;
    private localizationManager = globalLocalizationManager;

    private _authPromise: Promise<any> | null = null;

    constructor() {
        const piSdk = (window as any).Pi;
        const productionDomain = "galaxyfall.space";
        const currentHostname = window.location.hostname;

        // Sandbox-Modus fÃ¼r alle Domains AUÃŸER der Haupt-Domain und www Subdomain.
        this.isSandbox = !["galaxyfall.space", "www.galaxyfall.space"].includes(currentHostname);

        console.log(`ðŸ›  PI MANAGER geladen. Modus: ${this.isSandbox ? "SANDBOX" : "MAINNET"} | Domain: ${currentHostname}`);
    }

    private get sdk() {
        return (window as any).Pi;
    }

    public setGame(game: Game | null) { this.game = game; }

    public async authenticate(silent: boolean = false) {
        if (!this.sdk) {
            console.error("Pi SDK nicht gefunden.");
            if (!silent) throw new Error(this.localizationManager.translate('msg_pi_sdk_missing'));
            return null;
        }

        if (this._authPromise) {
            console.log("ðŸ” Authentication already in progress, returning existing promise...");
            return this._authPromise;
        }

        this._authPromise = (async () => {
            try {
                const scopes = ['username', 'payments'];
                console.log(`ðŸ” Starting ${silent ? 'silent ' : ''}authentication...`);

                const authPromise = this.sdk.authenticate(scopes, this.onIncompletePaymentFound.bind(this));
                const timeoutPromise = new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error(
                        `Timeout nach 15 Sekunden.\n\nDomain: "${window.location.hostname}"\nPrÃ¼fen: App-Einstellungen -> Development URL.`
                    )), 15000)
                );

                const authResult = await Promise.race([authPromise, timeoutPromise]);

                this.isAuthenticated = true;
                this.username = authResult.user.username;
                this.uid = authResult.user.uid;

                console.log(`âœ… Login erfolgreich: ${this.username}`);

                if (this.game) {
                    await this.game.loadPlayerDataFromServer();
                    this.game.uiManager.updatePiUserDisplay();
                }

                if (typeof updateHubUI === 'function') updateHubUI();

                return authResult.user;
            } catch (err: any) {
                console.error(`âŒ Pi Auth ERROR:`, err);
                this.isAuthenticated = false;
                if (!silent) throw err;
                return null;
            } finally {
                this._authPromise = null;
            }
        })();

        return this._authPromise;
    }

    // WICHTIG: Erforderlich fÃ¼r Pi SDK v2.0
    private async onIncompletePaymentFound(payment: any) {
        console.warn("UnvollstÃ¤ndige Zahlung entdeckt:", payment.identifier);
        // Wenn keine Transaktion existiert, muss zuerst approved werden
        if (!payment.transaction) {
            console.warn("Zahlung hat noch keine Blockchain-Transaktion â€“ ignoriere.");
            return;
        }
        // Sende die ID an deinen Server, um sie dort per /api/complete-payment zu beenden
        try {
            await fetch("/api/complete-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
            });
        } catch (e) {
            console.error("Konnte unvollstÃ¤ndige Zahlung nicht bereinigen.");
        }
    }

    public createPayment(item: any) {
        if (!this.isAuthenticated) {
            alert(this.localizationManager.translate('msg_login_required'));
            return;
        }

        // WICHTIG: Metadata Werte mÃ¼ssen immer Strings oder Zahlen sein (flach)
        const paymentData = {
            amount: item.pi_cost,
            memo: `Galaxy Fall: ${item.id}`,
            metadata: {
                bundleId: item.id,
                coins: item.coin_reward || 0
            },
        };

        // Track pending status
        if (this.game && this.game.shopManager) {
            this.game.shopManager.pendingPiPurchase = item.id;
        }

        const callbacks = {
            onReadyForServerApproval: async (paymentId: string) => {
                console.log("Server wird zur Genehmigung aufgerufen...");
                try {
                    const response = await fetch("/api/approve-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ paymentId })
                    });
                    if (!response.ok) throw new Error("Server Approval fehlgeschlagen");
                    console.log("Zahlung vom eigenen Server genehmigt.");
                } catch (err) {
                    console.error(err);
                    // Hier keine Fehlermeldung an User, Pi SDK merkt das Timeout selbst
                }
            },
            onReadyForServerCompletion: async (paymentId: string, txid: string) => {
                console.log("âœ… Blockchain-Transaktion erkannt. Finalisiere Kauf...");
                try {
                    const response = await fetch("/api/complete-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ paymentId, txid })
                    });

                    const data = await response.json();

                    if (response.ok || data.error === 'already_completed') {
                        console.log("ðŸ’° Kauf erfolgreich verbucht. Premium:", data.has_premium_license);

                        // Direkt aus Server-Antwort: Premium-Status setzen (absolute Wahrheit vom Server)
                        const serverPremium = !!data.has_premium_license;

                        if (this.game) {
                            // â”€â”€ GAME AKTIV PATH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
                            if (this.game.shopManager) this.game.shopManager.pendingPiPurchase = null;

                            // Premium sofort aus Server-Response setzen, VOR loadPlayerDataFromServer
                            this.game.hasPremiumLicense = serverPremium;
                            if (data.newBalance !== undefined) {
                                this.game.coins = data.newBalance;
                                syncGlobalGFC(data.newBalance, null);
                            }

                            // Dann vollstÃ¤ndigen Server-Reload fÃ¼r NFTs/Collectibles
                            await this.game.loadPlayerDataFromServer();

                            // Shop UI sofort aktualisieren
                            const ui = (this.game as any).uiManager;
                            if (ui) {
                                if (typeof ui.renderShop === 'function') ui.renderShop();
                                if (typeof ui.populateGalerie === 'function') ui.populateGalerie();
                            }
                        } else {
                            // â”€â”€ HUB FALLBACK PATH â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
                            const ctx = (window as any).dummyGameContext;
                            const hsm = (window as any).hubShopManager;

                            if (hsm) hsm.pendingPiPurchase = null;

                            // Premium sofort aus Server-Response setzen
                            if (ctx) ctx.hasPremiumLicense = serverPremium;
                            if (data.newBalance !== undefined) {
                                syncGlobalGFC(data.newBalance, null);
                            }

                            // VollstÃ¤ndiger Server-Reload fÃ¼r alle Daten
                            if (ctx && typeof ctx.loadPlayerDataFromServer === 'function') {
                                await ctx.loadPlayerDataFromServer();
                            } else if (hsm) {
                                try {
                                    const r = await fetch(`/api/load-data?pi_uid=${this.uid}`);
                                    if (r.ok) {
                                        const hubData = await r.json();
                                        hsm.playerUpgrades = hubData.upgrades || {};
                                        hsm.playerCosmetics = hubData.cosmetics || {};
                                        hsm.playerCollectibles = hubData.collectibles || {};
                                        hsm.saveUpgrades();
                                        hsm.saveCosmetics();
                                        hsm.saveCollectibles();
                                        if (ctx) ctx.hasPremiumLicense = !!hubData.has_premium_license;
                                    }
                                } catch (e) { console.warn("Hub Sync Error:", e); }
                            }

                            if (typeof (window as any).refreshAllSelections === 'function') {
                                (window as any).refreshAllSelections();
                            }
                        }

                        // Beide FÃ¤lle: Hub UI updaten
                        if (typeof updateHubUI === 'function') updateHubUI();
                        alert(this.localizationManager.translate('msg_purchase_success'));
                    } else {
                        console.error("âŒ Server Error:", data);
                        alert(this.localizationManager.translate('err_purchase_finalize') + " " + (data.error || this.localizationManager.translate('msg_unknown_err')));
                    }
                } catch (err) {
                    console.error("âŒ Completion Fetch Fehler:", err);
                    alert(this.localizationManager.translate('msg_network_err'));
                }
            },
            onCancel: (paymentId: string) => {
                console.log("Zahlung vom User abgebrochen:", paymentId);
                if (this.game && this.game.shopManager) this.game.shopManager.pendingPiPurchase = null;
                if (this.game && this.game.uiManager) this.game.uiManager.renderShop();
            },
            onError: (error: any, payment?: any) => {
                console.error("Kritischer Pi-Fehler:", error);
                if (this.game && this.game.shopManager) this.game.shopManager.pendingPiPurchase = null;
                if (this.game && this.game.uiManager) this.game.uiManager.renderShop();
                if (payment) console.log("Payment Daten zum Fehler:", payment);
                alert(this.localizationManager.translate('msg_fatal_err'));
            },
        };

        // Aufruf des SDKs
        try {
            this.sdk.createPayment(paymentData, callbacks);
        } catch (e) {
            console.error("SDK Call fehlgeschlagen:", e);
        }
    }

    public async showAd(type: 'interstitial' | 'rewarded' = 'interstitial') {
        if (type === 'interstitial') await this.showInterstitial();
        else if (type === 'rewarded') await this.showRewardedAd(() => { });
    }

    public async showInterstitial() {
        try {
            console.log("Showing interstitial ad...");
            if (this.game && this.game.uiManager) this.game.uiManager.soundManager.muteAll();
            const ads = this.sdk?.Ads || this.sdk?.ads;
            if (ads && typeof ads.showAd === 'function') {
                await ads.showAd("interstitial");
            } else if (ads && typeof ads.showInterstitial === 'function') {
                await ads.showInterstitial();
            }
        } catch (e) {
            console.error("Error showing interstitial ad:", e);
        } finally {
            if (this.game && this.game.uiManager) this.game.uiManager.soundManager.unmuteAll();
        }
    }

    public async showRewardedAd(onReward: () => void) {
        try {
            console.log("Showing rewarded ad...");
            if (this.game && this.game.uiManager) this.game.uiManager.soundManager.muteAll();
            const ads = this.sdk?.Ads || this.sdk?.ads;

            // FALLBACK FOR LOCAL TESTING: Skip ad if on localhost or 127.0.0.1
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

            if (ads && typeof ads.showAd === 'function') {
                // Set a timeout for the ad to resolve, just in case
                const adPromise = ads.showAd("rewarded");
                const timeoutPromise = new Promise(resolve => setTimeout(() => resolve("TIMEOUT"), 8000));

                const adResult: any = await Promise.race([adPromise, timeoutPromise]);

                if (adResult === "TIMEOUT") {
                    console.warn("Ad timed out. Granting reward anyway.");
                    onReward();
                    return;
                }

                const resultStatus = typeof adResult === 'string' ? adResult : (adResult?.result || null);
                if (resultStatus === "AD_REWARDED") {
                    console.log("Ad Reward received!");
                    onReward();
                } else {
                    console.warn("Ad not rewarded or cancelled:", resultStatus);
                    // On Localhost we might want to reward anyway even if cancelled
                    if (isLocal) {
                        console.log("Local testing: granting reward despite cancellation.");
                        onReward();
                    }
                }
            } else if (ads && typeof ads.showRewardedAd === 'function') {
                await ads.showRewardedAd((res: any) => {
                    const status = res.result || res;
                    if (status === "AD_REWARDED") {
                        onReward();
                    } else if (isLocal) {
                        onReward();
                    }
                });
            } else if (isLocal) {
                console.log("Pi SDK (Ads) not found, Local testing: granting reward bypass.");
                onReward();
            }
        } catch (e) {
            console.error("Error showing rewarded ad:", e);
        } finally {
            if (this.game && this.game.uiManager) {
                if (!(this.game as any).isWaitingForResumeInput) {
                    this.game.uiManager.soundManager.unmuteAll();
                }
            }
        }
    }

    public async renderBanner(containerId: string) {
        try {
            const container = document.getElementById(containerId);
            if (!container) return;

            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (isLocal) {
                // Local Sandbox Fallback - zeige stattdessen ein visuelles Mock-Ad
                container.innerHTML = `<div style="width: 100%; height: 100%; background: #0a0a0a; color: #00FFFF; display: flex; align-items: center; justify-content: center; font-size: 10px; border: 1px solid #00FFFF;">MOCK BANNER AD (TESTNET)</div>`;
                return;
            }

            // Wenn in Produktion: Leere zuerst den Container (entferne "AD_RESERVED_320x50")
            container.innerHTML = "";

            const ads = this.sdk?.Ads || this.sdk?.ads;
            if (ads) {
                if (typeof ads.showAd === 'function') {
                    await ads.showAd("banner", containerId);
                } else if (typeof ads.requestAd === 'function') {
                    await ads.requestAd("banner", containerId);
                } else if (typeof ads.renderBanner === 'function') {
                    await ads.renderBanner(containerId);
                } else {
                    console.warn("No suitable banner ad method found in Pi SDK.");
                }
            }
        } catch (e) {
            console.error("Error rendering banner ad:", e);
        }
    }
}

class Vector2D { public x: number; public y: number; constructor(x: number, y: number) { this.x = x; this.y = y; } }
class Entity { public game: Game; public pos: Vector2D; public width: number; public height: number; public family: string = 'none'; public type: string = 'NONE'; protected _isGarbage: boolean = false; public inFormation: boolean = false; constructor(game: Game, x: number, y: number, w: number, h: number) { this.game = game; this.pos = new Vector2D(x, y); this.width = w; this.height = h; } update(dt: number): void { } draw(ctx: CanvasRenderingContext2D): void { } isAlive(): boolean { return !this._isGarbage; } destroy(): void { this._isGarbage = true; } }
class EntityFamily extends Entity { constructor(game: Game, x: number, y: number, w: number, h: number, family: string, type: string) { super(game, x, y, w, h); this.family = family; this.type = type; } }

class Particle extends Entity { private vel: Vector2D; private size: number; private life: number; private color: string; private initialLife: number; constructor(game: Game, x: number, y: number, color: string, life: number = 0.5, size: number = 2, vel?: Vector2D) { super(game, x, y, 0, 0); this.family = 'effect'; this.type = 'PARTICLE'; if (vel) { this.vel = vel; } else { this.vel = new Vector2D((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50); } this.size = Math.random() * size + 1; this.life = Math.random() * life; this.initialLife = this.life; this.color = color; } update(dt: number): void { const dt_s = dt / 1000; this.pos.x += this.vel.x * dt_s; this.pos.y += this.vel.y * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.life / this.initialLife; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class Explosion extends EntityFamily { private particles: IParticle[] = []; constructor(game: Game, x: number, y: number, color: string = '#FFA500', countMultiplier: number = 1) { super(game, x, y, 0, 0, 'effect', 'EXPLOSION'); const count = (this.game.uiManager.settings.particles === 2 ? 20 : (this.game.uiManager.settings.particles === 1 ? 10 : 0)) * countMultiplier; for (let i = 0; i < count; i++) { this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.random() * 360 - 180, Math.random() * 360 - 180), size: Math.random() * 4 + 1, life: 0.7, color: color }); } } update(dt: number): void { const dt_s = dt / 1000; this.particles.forEach(p => { p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); if (this.particles.length === 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.life / 0.7; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); } }
class ImpactEffect extends EntityFamily {
    private particles: IParticle[] = [];
    private flashLife: number = 0.05;
    constructor(game: Game, x: number, y: number, color: string = '#FFF') {
        super(game, x, y, 0, 0, 'effect', 'IMPACT');
        const count = this.game.uiManager.settings.particles > 0 ? 12 : 0;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 150;
            this.particles.push({
                pos: new Vector2D(x, y),
                vel: new Vector2D(Math.cos(angle) * speed, Math.sin(angle) * speed),
                size: Math.random() * 3 + 1,
                life: 0.2 + Math.random() * 0.3,
                color: Math.random() > 0.5 ? color : '#FFFFFF'
            });
        }
    }
    update(dt: number): void {
        const dt_s = dt / 1000;
        this.flashLife -= dt_s;
        this.particles.forEach(p => {
            p.pos.x += p.vel.x * dt_s;
            p.pos.y += p.vel.y * dt_s;
            p.vel.x *= 0.95;
            p.vel.y *= 0.95;
            p.life -= dt_s;
        });
        this.particles = this.particles.filter(p => p.life > 0);
        if (this.particles.length === 0 && this.flashLife <= 0) this.destroy();
    }
    draw(ctx: CanvasRenderingContext2D): void {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / 0.5;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
}
class GreenSizzleEffect extends EntityFamily { private particles: IParticle[] = []; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0, 'effect', 'GREEN_SIZZLE'); const count = this.game.uiManager.settings.particles > 0 ? 12 : 0; for (let i = 0; i < count; i++) { const life = 0.2 + Math.random() * 0.2; this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.random() * 180 - 90, Math.random() * 180 - 90), size: Math.random() * 2.5 + 1, life: life, color: Math.random() > 0.3 ? '#39FF14' : '#E8FFED' }); } } update(dt: number): void { const dt_s = dt / 1000; this.particles.forEach(p => { p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); if (this.particles.length === 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.life / 0.4; ctx.fillStyle = p.color; ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 5; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); } }
class GreenMuzzleFlash extends Entity { private life: number = 0.1; private initialLife: number = 0.1; private player: Player; constructor(game: Game, player: Player) { super(game, player.pos.x, player.pos.y, 0, 0); this.family = 'effect'; this.player = player; } update(dt: number): void { const dt_s = dt / 1000; this.life -= dt_s; if (this.life <= 0) this.destroy(); this.pos.x = this.player.pos.x; this.pos.y = this.player.pos.y; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = (this.life / this.initialLife) * 0.8; const tier = this.player.powerUpManager.weaponTier; const radius = 10 + tier * 5 + Math.random() * 5; const flashX = this.pos.x + this.player.width / 2; const flashY = this.pos.y + this.player.height * 0.2; const gradient = ctx.createRadialGradient(flashX, flashY, 0, flashX, flashY, radius); gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); gradient.addColorStop(0.4, 'rgba(57, 255, 20, 0.8)'); gradient.addColorStop(1, 'rgba(57, 255, 20, 0)'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(flashX, flashY, radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class RainbowImpactEffect extends EntityFamily { private particles: IParticle[] = []; private colors: string[] = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#EE82EE']; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0, 'effect', 'RAINBOW_IMPACT'); const count = this.game.uiManager.settings.particles > 0 ? 15 : 0; for (let i = 0; i < count; i++) { this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.random() * 200 - 100, Math.random() * 200 - 100), size: Math.random() * 2.5 + 1, life: 0.3 + Math.random() * 0.2, color: this.colors[Math.floor(Math.random() * this.colors.length)]! }); } } update(dt: number): void { const dt_s = dt / 1000; this.particles.forEach(p => { p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); if (this.particles.length === 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.life / 0.5; ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); } }
class VoidImpactEffect extends EntityFamily { private particles: IParticle[] = []; private life: number = 0.4; private initialLife: number = 0.4; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0, 'effect', 'VOID_IMPACT'); const count = this.game.uiManager.settings.particles > 0 ? 18 : 0; for (let i = 0; i < count; i++) { const angle = Math.random() * Math.PI * 2; const speed = 50 + Math.random() * 50; this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.cos(angle) * speed, Math.sin(angle) * speed), size: Math.random() * 2 + 1, life: this.initialLife, color: Math.random() > 0.3 ? '#9400D3' : '#2C003E' }); } } update(dt: number): void { const dt_s = dt / 1000; this.life -= dt_s; const pullFactor = Math.max(0, (this.initialLife / 2) - this.life) * 800; this.particles.forEach(p => { const angleToCenter = Math.atan2(this.pos.y - p.pos.y, this.pos.x - p.pos.x); p.vel.x += Math.cos(angleToCenter) * pullFactor * dt_s; p.vel.y += Math.sin(angleToCenter) * pullFactor * dt_s; p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.life / this.initialLife; ctx.fillStyle = p.color; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); } }
class NukeEffect extends Entity { private radius: number = 0; private life: number = 1; constructor(game: Game) { super(game, game.width / 2, game.height / 2, 0, 0); this.type = 'EFFECT'; } update(dt: number): void { const dt_s = dt / 1000; this.radius += 1200 * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = `rgba(255,255,255,${this.life})`; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class ShockwaveEffect extends Entity { private radius: number = 0; private life: number = 0.5; private initialLife: number = 0.5; private color: string; constructor(game: Game, x: number, y: number, color: string = '#F0F') { super(game, x, y, 0, 0); this.family = 'effect'; this.type = 'SHOCKWAVE'; this.color = color; } update(dt: number): void { const dt_s = dt / 1000; this.radius += 800 * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.life / this.initialLife; ctx.strokeStyle = this.color; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); } }
class TeleportEffect extends Entity { private life: number = 0.4; private radius: number = 0; private isOpening: boolean; private maxRadius: number = 40; constructor(game: Game, x: number, y: number, isOpening: boolean) { super(game, x, y, 0, 0); this.family = 'effect'; this.isOpening = isOpening; this.radius = isOpening ? 0 : this.maxRadius; } update(dt: number): void { const dt_s = dt / 1000; this.life -= dt_s; this.radius += (this.isOpening ? 1 : -1) * (this.maxRadius / 0.4) * dt_s; if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { if (this.radius < 0) return; ctx.save(); const alpha = this.life / 0.4; ctx.globalAlpha = alpha; ctx.strokeStyle = '#EE82EE'; ctx.lineWidth = 4; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); } }
class ReviveEffect extends Entity { private radius: number = 0; private life: number = 0.8; private initialLife: number = 0.8; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0); this.family = 'effect'; this.type = 'REVIVE_EFFECT'; } update(dt: number): void { const dt_s = dt / 1000; this.radius += 600 * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.life / this.initialLife; ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 8; ctx.shadowColor = '#FFFFFF'; ctx.shadowBlur = 25; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); } }
class FinalBossExplosion extends EntityFamily { private particles: IParticle[] = []; private shockwaves: { radius: number, life: number }[] = []; private life: number = 4000; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0, 'effect', 'FINAL_BOSS_EXPLOSION'); const count = 500; for (let i = 0; i < count; i++) { const angle = Math.random() * Math.PI * 2; const speed = Math.random() * 800 + 200; this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.cos(angle) * speed, Math.sin(angle) * speed), size: Math.random() * 5 + 2, life: 2 + Math.random() * 2, color: Math.random() > 0.3 ? '#FFD700' : '#FFFFFF' }); } this.shockwaves.push({ radius: 0, life: 1.5 }); setTimeout(() => this.shockwaves.push({ radius: 0, life: 1.2 }), 500); setTimeout(() => this.shockwaves.push({ radius: 0, life: 1.0 }), 1000); } update(dt: number): void { const dt_s = dt / 1000; this.life -= dt; if (this.life <= 0 && this.particles.length === 0) { this.destroy(); return; } this.particles.forEach(p => { p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.vel.x *= 0.98; p.vel.y *= 0.98; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); this.shockwaves.forEach(sw => { sw.radius += 1000 * dt_s; sw.life -= dt_s; }); this.shockwaves = this.shockwaves.filter(sw => sw.life > 0); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalCompositeOperation = 'lighter'; this.particles.forEach(p => { ctx.globalAlpha = Math.min(1, p.life); ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); }); this.shockwaves.forEach(sw => { ctx.globalAlpha = sw.life; ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, sw.radius, 0, Math.PI * 2); ctx.stroke(); }); ctx.restore(); } }
class LightRay extends Entity { private angle: number; private length: number; private life: number = 3000; private fadeInTime: number = 1000; private rotationSpeed: number; constructor(game: Game) { super(game, game.width / 2, game.height / 2, 0, 0); this.family = 'effect'; this.angle = Math.random() * Math.PI * 2; this.length = game.height * 1.5; this.rotationSpeed = (Math.random() - 0.5) * 0.1; } update(dt: number): void { this.life -= dt; if (this.life <= 0) this.destroy(); this.angle += this.rotationSpeed * (dt / 1000); } draw(ctx: CanvasRenderingContext2D): void { const alpha = Math.min(1, (3000 - this.life) / this.fadeInTime) * 0.3; ctx.save(); ctx.globalAlpha = alpha; ctx.translate(this.pos.x, this.pos.y); ctx.rotate(this.angle); const gradient = ctx.createLinearGradient(0, -this.length / 2, 0, this.length / 2); gradient.addColorStop(0, 'rgba(255, 223, 186, 0)'); gradient.addColorStop(0.5, 'rgba(255, 223, 186, 0.5)'); gradient.addColorStop(1, 'rgba(255, 223, 186, 0)'); ctx.fillStyle = gradient; ctx.fillRect(-50, -this.length / 2, 100, this.length); ctx.restore(); } }
class PhoenixCoreUI extends Entity { private pulseTimer: number = 0; constructor(game: Game) { super(game, game.width - 150, 10, 140, 40); } update(dt: number): void { this.pulseTimer += dt / 1000; this.pos.x = this.game.width - 160; } draw(ctx: CanvasRenderingContext2D): void { if (!this.game.player || this.game.gameState === 'REVIVING') return; const crystals = this.game.player.availableReviveCrystals; if (crystals.length === 0) return; const scalePulse = 1.0 + Math.sin(this.pulseTimer * 3) * 0.05; const alphaPulse = 0.8 + Math.sin(this.pulseTimer * 3) * 0.2; ctx.save(); ctx.globalAlpha = alphaPulse; crystals.forEach((crystalType, index) => { const img = phoenixCoreImages[crystalType]; if (!img) return; const w = 40 * scalePulse; const h = 40 * scalePulse; const x = this.pos.x + (index * 45); const y = this.pos.y; ctx.drawImage(img, x, y, w, h); }); ctx.restore(); } }
class ReviveCrystalAnimation extends Entity { private target: Player; private image: HTMLImageElement; private rotationAngle: number = 0; private rotationSpeed: number = 3; private speed: number = 800; constructor(game: Game, startX: number, startY: number, target: Player, crystalType: 'BLUE' | 'YELLOW' | 'PURPLE') { super(game, startX, startY, 40, 40); this.family = 'effect'; this.target = target; this.image = phoenixCoreImages[crystalType]; } update(dt: number): void { const dt_s = dt / 1000; this.rotationSpeed += 20 * dt_s; this.rotationAngle += this.rotationSpeed * dt_s; const targetX = this.target.pos.x + this.target.width / 2; const targetY = this.target.pos.y + this.target.height / 2; const angle = Math.atan2(targetY - this.pos.y, targetX - this.pos.x); this.pos.x += Math.cos(angle) * this.speed * dt_s; this.pos.y += Math.sin(angle) * this.speed * dt_s; const dist = Math.hypot(targetX - this.pos.x, targetY - this.pos.y); if (dist < 20) { this.target.finalizeRevive(); this.destroy(); } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.translate(this.pos.x, this.pos.y); ctx.rotate(this.rotationAngle); ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); ctx.restore(); } }
class Coin extends EntityFamily {
    public value: number; public velocity: Vector2D = new Vector2D(0, 180); private image: HTMLImageElement; private angle: number = 0; private rotationSpeed: number = 7; private particleSpawnTimer: number = 0; private readonly PARTICLE_SPAWN_INTERVAL: number = 25; private readonly PARTICLES_PER_SPAWN: number = 2; private readonly CONE_SPREAD_FACTOR: number = 80; private gravity: number = 350; private drag: number = 0.98; constructor(game: Game, x: number, y: number, value: number, initialVel?: Vector2D) { super(game, x, y, 45, 45, 'pickup', 'COIN'); this.value = value; this.image = piCoinImg; if (initialVel) this.velocity = initialVel; } update(dt: number): void { const dt_s = dt / 1000; const oldX = this.pos.x; const oldY = this.pos.y; const magnetLevel = this.game.shopManager.getUpgradeLevel('coin_magnet'); const player = this.game.player; if (magnetLevel > 0 && player && player.isAlive() && Math.abs(this.velocity.y) < 250) { const magnetSpeed = 700; const targetX = player.pos.x + player.width / 2; const targetY = player.pos.y + player.height / 2; const angleToPlayer = Math.atan2(targetY - this.pos.y, targetX - this.pos.x); this.pos.x += Math.cos(angleToPlayer) * magnetSpeed * dt_s; this.pos.y += Math.sin(angleToPlayer) * magnetSpeed * dt_s; } else { this.velocity.y += this.gravity * dt_s; this.velocity.x *= Math.pow(this.drag, dt_s * 60); this.velocity.y *= Math.pow(this.drag, dt_s * 60); this.pos.x += this.velocity.x * dt_s; this.pos.y += this.velocity.y * dt_s; } this.particleSpawnTimer -= dt; if (this.particleSpawnTimer <= 0) { this.particleSpawnTimer = this.PARTICLE_SPAWN_INTERVAL; const dx = this.pos.x - oldX; const dy = this.pos.y - oldY; const mag = Math.hypot(dx, dy); if (mag > 0.1) { const moveVecX = dx / mag; const moveVecY = dy / mag; const perpendicularX = -moveVecY; const perpendicularY = moveVecX; for (let i = 0; i < this.PARTICLES_PER_SPAWN; i++) { const randomSpread = (Math.random() - 0.5) * 2; const baseVelX = -moveVecX * 40; const baseVelY = -moveVecY * 40; const finalVelX = baseVelX + perpendicularX * randomSpread * this.CONE_SPREAD_FACTOR; const finalVelY = baseVelY + perpendicularY * randomSpread * this.CONE_SPREAD_FACTOR; const trailVel = new Vector2D(finalVelX, finalVelY); const spawnX = oldX + this.width / 2; const spawnY = oldY + this.height / 2; this.game.addEntity(new Particle(this.game, spawnX, spawnY, '#FFD700', 0.6, 3, trailVel)); } } } this.angle += this.rotationSpeed * dt_s; if (this.pos.y > this.game.height) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { const scaleX = Math.cos(this.angle); ctx.save(); ctx.imageSmoothingEnabled = true; ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2); ctx.scale(scaleX, 1); ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); ctx.restore(); }
    public onCollect(): void { if (this.game.player) { this.game.uiManager.soundManager.play('coinCollect'); const coinBonusUpgrade = this.game.shopManager.getUpgradeLevel('coin_value'); let totalValue = 1 + coinBonusUpgrade; if (this.game.shopManager.getEquippedCollectibleBonus() === 'COIN_BOOST') { totalValue += 1; } this.game.coins += totalValue; this.game.statsManager.addCollectedCoins(totalValue); this.game.saveGameData(); } this.destroy(); }
}
class PowerUp extends EntityFamily { public speed: number = 150; public powerUpType: string; constructor(game: Game, x: number, y: number) { super(game, x, y, 38, 38, 'pickup', 'POWERUP'); const allTypes = ['WEAPON_UP', 'SIDE_SHOTS', 'RAPID_FIRE', 'SHIELD', 'REPAIR_KIT', 'EXTRA_LIFE', 'GHOST_PROTOCOL', 'ORBITAL_DRONE', 'NUKE', 'BLACK_HOLE', 'SCORE_BOOST', 'LASER_BEAM', 'HOMING_MISSILES']; this.powerUpType = allTypes[Math.floor(Math.random() * allTypes.length)]!; } update(dt: number): void { this.pos.y += this.speed * (dt / 1000); if (this.pos.y > this.game.height) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { const image = powerUpImages[this.powerUpType]; if (image) { ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(image, this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } } public onCollect(): void { if (this.game.player) { const SPECIALS = ['NUKE', 'BLACK_HOLE', 'SCORE_BOOST']; const ULTRAS = ['LASER_BEAM', 'HOMING_MISSILES']; if (SPECIALS.includes(this.powerUpType)) this.game.player.powerUpManager.collectSpecial(this.powerUpType); else if (ULTRAS.includes(this.powerUpType)) this.game.player.powerUpManager.collectUltra(this.powerUpType); else this.game.player.powerUpManager.activate(this.powerUpType); } this.destroy(); } }
class Enemy extends EntityFamily {
    public baseHealth: number; public health: number; public maxHealth: number; public pointsValue: number; public stunTimer: number = 0; public speed: number = 90; public isBoss: boolean = false; public collisionDamage: number = 35; public isBossAdd: boolean = false; public isElite: boolean = false; constructor(game: Game, x: number, y: number, w: number, h: number, health: number, points: number, type: string) { super(game, x, y, w, h, 'enemy', type); this.baseHealth = health; this.health = this.baseHealth * game.enemyHealthMultiplier; this.maxHealth = this.health; this.pointsValue = points; }
    getEliteColor(): string {
        switch (this.type) {
            case 'GRUNT': return '#2ecc71';
            case 'TANK': return '#e74c3c';
            case 'WEAVER': return '#9b59b6';
            case 'SHOOTER': return '#3498db';
            case 'TELEPORTER': return '#1abc9c';
            case 'NEXUS_FRAGMENT': return '#e67e22';
            default: return '#FFD700';
        }
    }
    takeHit(damage: number): void {
        if (!this.isAlive()) return; this.health -= damage; if (this.health <= 0) {
            this.destroy();
            // **NEU: Karrierestatistik erhÃ¶hen**
            this.game.statsManager.sessionStats.kills++;
            this.game.statsManager.incrementKill();
            let scoreToAdd = this.pointsValue * this.game.level;
            if (this.isElite) scoreToAdd *= 3; // Triple points for elites
            if (this.game.player && this.game.player.isScoreBoosted()) scoreToAdd *= 2;
            this.game.score += scoreToAdd;
            this.game.achievementManager.check('score_update');
            this.game.scoreEarnedThisLevel += scoreToAdd;
            if (this.isBoss) {
                this.game.achievementManager.check('boss_defeated', this.type);
                if (this.game.isFinalBattleActive) {
                    this.game.isBossActive = false;
                } else {
                    this.game.isBossActive = false;
                    setTimeout(() => this.game.changeState('LEVEL_START'), 3000);
                }
            }
            if (this.game.uiManager.settings.particles > 0) this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2));

            // ELITE REWARDS or RNG REWARDS
            const luckLevel = this.game.shopManager.getUpgradeLevel('luck_chance');
            let luckMultiplier = 1 + (luckLevel * 0.10);
            if (this.game.shopManager.getEquippedCollectibleBonus() === 'LUCK_BOOST') {
                luckMultiplier += 0.25;
            }

            if (this.isElite) {
                // Coin Fountain for Elite Enemies
                for (let i = 0; i < 20; i++) {
                    const angle = (Math.random() * Math.PI) + Math.PI; // Upwards semi-circle
                    const power = 300 + Math.random() * 400;
                    const vel = new Vector2D(Math.cos(angle) * power, Math.sin(angle) * power);
                    this.game.addEntity(new Coin(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.pointsValue / 10, vel));
                }
                if (Math.random() < 0.4) this.game.addEntity(new PowerUp(this.game, this.pos.x, this.pos.y));
            } else {
                const finalCoinChance = 0.15 * luckMultiplier;
                const finalPowerUpChance = 0.05 * luckMultiplier;
                if (Math.random() < finalCoinChance) {
                    this.game.addEntity(new Coin(this.game, this.pos.x, this.pos.y, this.pointsValue));
                }
                if (Math.random() < finalPowerUpChance) {
                    this.game.addEntity(new PowerUp(this.game, this.pos.x, this.pos.y));
                }
            }
            this.game.uiManager.soundManager.play('enemyExplosion');
        }
    } update(dt: number): void { if (this.stunTimer > 0) { this.stunTimer -= dt; return; } if (this.inFormation) return; const dt_s = dt / 1000; this.pos.y += this.speed * dt_s; if (this.pos.y > this.game.height) this.destroy(); } stun(duration: number): void { this.stunTimer = duration; } drawHealthBar(ctx: CanvasRenderingContext2D): void { if (this.health < this.maxHealth && !this.isBoss) { ctx.save(); ctx.fillStyle = '#500'; ctx.fillRect(this.pos.x, this.pos.y - 10, this.width, 5); ctx.fillStyle = '#f00'; ctx.fillRect(this.pos.x, this.pos.y - 10, this.width * (this.health / this.maxHealth), 5); ctx.restore(); } }
    protected render(ctx: CanvasRenderingContext2D): void { }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        if (this.isElite) {
            ctx.shadowColor = this.getEliteColor();
            ctx.shadowBlur = 12;
            ctx.globalAlpha = 0.9;
        } else if (this.isBossAdd) {
            ctx.shadowColor = '#EE82EE';
            ctx.shadowBlur = 15;
        }
        this.render(ctx);
        ctx.restore();
        this.drawHealthBar(ctx);
    }
}
class Grunt extends Enemy { private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 60), -54, 60, 54, 1, 10, 'GRUNT'); this.speed = 100 * game.enemySpeedMultiplier; this.collisionDamage = 35; this.image = gruntImg; } protected render(ctx: CanvasRenderingContext2D): void { ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); } }
class Tank extends Enemy { private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 100), -96, 100, 96, 3, 30, 'TANK'); this.speed = 60 * game.enemySpeedMultiplier; this.collisionDamage = 50; this.image = tankImg; } protected render(ctx: CanvasRenderingContext2D): void { ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); } }
class Weaver extends Enemy { private angle: number; private hSpeed: number; private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 55), -46, 55, 46, 1, 20, 'WEAVER'); this.speed = 80 * game.enemySpeedMultiplier; this.angle = Math.random() * Math.PI * 2; this.hSpeed = (Math.random() * 2 + 1) * 60; this.collisionDamage = 35; this.image = weaverImg; } update(dt: number): void { const dt_s = dt / 1000; super.update(dt); if (this.inFormation) return; this.angle += 3 * dt_s; this.pos.x += Math.sin(this.angle) * this.hSpeed * dt_s; if (this.pos.x < 0 || this.pos.x > this.game.width - this.width) { this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width)); this.hSpeed *= -1; } } protected render(ctx: CanvasRenderingContext2D): void { ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); } }
class Shooter extends Enemy { private fireCooldown: number; private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 52), -52, 52, 52, 2, 50, 'SHOOTER'); this.speed = 70 * game.enemySpeedMultiplier; this.fireCooldown = Math.random() * 1000 + 1500; this.collisionDamage = 50; this.image = shooterImg; } update(dt: number): void { super.update(dt); this.fireCooldown -= dt; if (this.fireCooldown <= 0 && this.pos.y > 0) { this.game.addEntity(new WaveProjectile(this.game, this.pos.x + this.width / 2, this.pos.y + this.height, 0, 380)); this.game.uiManager.soundManager.play('enemyShoot'); this.fireCooldown = this.inFormation ? 2000 + Math.random() * 1500 : 2000; } } protected render(ctx: CanvasRenderingContext2D): void { ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); } }
class Teleporter extends Enemy { private teleportCooldown: number = 4000; private isVisible: boolean = true; private visibleTimer: number = 3000; private image: HTMLImageElement; private fireCooldown: number; constructor(game: Game) { super(game, Math.random() * (game.width - 60), 50 + Math.random() * (game.height / 3), 60, 60, 2, 80, 'TELEPORTER'); this.speed = 0; this.image = teleporterImg; this.fireCooldown = 2500 + Math.random() * 2000; } update(dt: number): void { if (this.inFormation) return; this.teleportCooldown -= dt; if (this.isVisible) { this.visibleTimer -= dt; if (this.visibleTimer <= 0) { this.isVisible = false; this.game.addEntity(new TeleportEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, false)); this.teleportCooldown = 1000; } this.fireCooldown -= dt; if (this.fireCooldown <= 0 && this.pos.y > 0 && this.game.player) { this.shoot(); this.fireCooldown = 3000; } } else if (this.teleportCooldown <= 0) { this.teleport(); this.isVisible = true; this.visibleTimer = 3000; } } shoot(): void { if (!this.game.player) return; const player = this.game.player; const projectileSpeed = 400; const spawnX = this.pos.x + this.width / 2; const spawnY = this.pos.y + this.height / 2; const targetX = player.pos.x + player.width / 2; const targetY = player.pos.y + player.height / 2; const angle = Math.atan2(targetY - spawnY, targetX - spawnX); const velX = Math.cos(angle) * projectileSpeed; const velY = Math.sin(angle) * projectileSpeed; this.game.addEntity(new TeleporterProjectile(this.game, spawnX, spawnY, velX, velY)); this.game.uiManager.soundManager.play('enemyShoot'); } teleport(): void { this.pos.x = Math.random() * (this.game.width - this.width); this.pos.y = 50 + Math.random() * (this.game.height / 3); this.game.addEntity(new TeleportEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, true)); } protected render(ctx: CanvasRenderingContext2D): void { if (this.isVisible) { ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); } } }
class BlackHole extends Entity { private life: number = 10000; private pullRadius: number = 300; private killRadius: number = 20; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0); this.type = 'EFFECT'; } update(dt: number): void { const dt_s = dt / 1000; this.life -= dt; if (this.life <= 0) { this.game.entities.forEach(e => { const dist = Math.hypot(this.pos.x - (e.pos.x + e.width / 2), this.pos.y - (e.pos.y + e.height / 2)); if (dist < this.pullRadius && e instanceof Enemy && !e.isBoss) e.takeHit(9999); }); this.destroy(); this.game.addEntity(new ShockwaveEffect(this.game, this.pos.x, this.pos.y, '#EE82EE')); return; } this.game.entities.forEach(e => { if (e.family === 'enemy' || e.family === 'pickup') { const dist = Math.hypot(this.pos.x - (e.pos.x + e.width / 2), this.pos.y - (e.pos.y + e.height / 2)); if (dist < this.pullRadius) { const isBoss = e instanceof Enemy && e.isBoss; if (!isBoss) { if (e instanceof Enemy) e.stun(50); const angle = Math.atan2(this.pos.y - e.pos.y, this.pos.x - e.pos.x); const pullSpeed = 180 * (1 - dist / this.pullRadius); e.pos.x += Math.cos(angle) * pullSpeed * dt_s; e.pos.y += Math.sin(angle) * pullSpeed * dt_s; if (dist < this.killRadius) { if (e instanceof Enemy) e.takeHit(9999); else e.destroy(); } } } } }); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.killRadius, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#f0f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.pullRadius * (this.life / 8000), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); } }
class Projectile extends EntityFamily { public vel: Vector2D; public damage: number = 1; protected color: string; private particleSpawnTimer: number = 0; public isDroneTier1Projectile: boolean; constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -600, color: string = '#00FFFF', isDroneTier1: boolean = false) { super(game, x - 2.5, y, 5, 20, 'projectile', 'PROJECTILE'); this.vel = new Vector2D(velX, velY); this.color = color; this.isDroneTier1Projectile = isDroneTier1; if (this.game.shopManager.playerCosmetics.equipped_projectile === 'proj_fireball' && !this.isDroneTier1Projectile) { this.width = 12; this.height = 12; this.pos.x = x - this.width / 2; this.pos.y = y - this.height / 2; } } update(dt: number): void { const dt_s = dt / 1000; this.pos.x += this.vel.x * dt_s; this.pos.y += this.vel.y * dt_s; this.particleSpawnTimer -= dt; if (this.particleSpawnTimer <= 0) { const equipped = this.game.shopManager.playerCosmetics.equipped_projectile; if (!this.isDroneTier1Projectile && equipped === 'proj_green' && this.type === 'PROJECTILE') { this.particleSpawnTimer = 40; const trailVel = new Vector2D((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10 + 20); this.game.addEntity(new Particle(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, '#39FF14', 0.25, 1.5, trailVel)); } else if (!this.isDroneTier1Projectile && equipped === 'proj_rainbow' && this.type === 'PROJECTILE') { this.particleSpawnTimer = 30; const colors = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#EE82EE']; const trailColor = colors[Math.floor(Math.random() * colors.length)]!; const trailVel = new Vector2D((Math.random() - 0.5) * 15, 20 + (Math.random() - 0.5) * 15); this.game.addEntity(new Particle(this.game, this.pos.x + this.width / 2, this.pos.y + this.height, trailColor, 0.2, 1.2, trailVel)); } else if (!this.isDroneTier1Projectile && equipped === 'proj_fireball' && this.type === 'PROJECTILE') { this.particleSpawnTimer = 35; const fireColors = ['#FFA500', '#FF4500', '#FFD700']; const trailColor = fireColors[Math.floor(Math.random() * fireColors.length)]!; const trailVel = new Vector2D((Math.random() - 0.5) * 10, 15 + (Math.random() - 0.5) * 10); this.game.addEntity(new Particle(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, trailColor, 0.25, 1.8, trailVel)); } else if (!this.isDroneTier1Projectile && equipped === 'proj_purple' && this.type === 'PROJECTILE') { this.particleSpawnTimer = 40; const trailColor = Math.random() > 0.3 ? '#9400D3' : '#2C003E'; const trailVel = new Vector2D((Math.random() - 0.5) * 12, 18 + (Math.random() - 0.5) * 12); this.game.addEntity(new Particle(this.game, this.pos.x + this.width / 2, this.pos.y + this.height, trailColor, 0.3, 1.5, trailVel)); } } if (this.pos.y < -this.height || this.pos.y > this.game.height || this.pos.x < -this.width || this.pos.x > this.game.width) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { const cosmetics = this.game.shopManager.playerCosmetics; if (!this.isDroneTier1Projectile && this.game.player && cosmetics.equipped_projectile === 'proj_green') { const tier = this.game.player.powerUpManager.weaponTier; ctx.save(); switch (tier) { case 1: ctx.fillStyle = '#39FF14'; ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 10; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); break; case 2: ctx.fillStyle = '#AAFFAA'; ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 15; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.fillStyle = 'white'; ctx.fillRect(this.pos.x + this.width * 0.25, this.pos.y, this.width * 0.5, this.height); break; case 3: ctx.fillStyle = '#39FF14'; ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 20; ctx.globalAlpha = 0.5; ctx.fillRect(this.pos.x - 2, this.pos.y, this.width + 4, this.height); ctx.globalAlpha = 1; ctx.fillStyle = 'white'; ctx.fillRect(this.pos.x + this.width * 0.1, this.pos.y, this.width * 0.8, this.height); break; case 4: const coreX = this.pos.x + this.width / 2; const coreY = this.pos.y + this.height / 2; const auraRadius = this.width * 1.5 + Math.random() * 4; const gradientAura = ctx.createRadialGradient(coreX, coreY, this.width * 0.5, coreX, coreY, auraRadius); gradientAura.addColorStop(0, 'rgba(57, 255, 20, 0.6)'); gradientAura.addColorStop(1, 'rgba(57, 255, 20, 0)'); ctx.fillStyle = gradientAura; ctx.fillRect(coreX - auraRadius, coreY - this.height / 2 - 10, auraRadius * 2, this.height + 20); ctx.fillStyle = 'white'; ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 25; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); break; } ctx.restore(); } else if (!this.isDroneTier1Projectile && this.game.player && cosmetics.equipped_projectile === 'proj_rainbow') { ctx.save(); const gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.height); gradient.addColorStop(0, '#FF0000'); gradient.addColorStop(0.2, '#FFFF00'); gradient.addColorStop(0.4, '#00FF00'); gradient.addColorStop(0.6, '#00FFFF'); gradient.addColorStop(0.8, '#0000FF'); gradient.addColorStop(1, '#FF00FF'); ctx.fillStyle = gradient; ctx.shadowColor = 'white'; ctx.shadowBlur = 15; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } else if (!this.isDroneTier1Projectile && this.game.player && cosmetics.equipped_projectile === 'proj_fireball') { ctx.save(); const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const radius = this.width * 0.8; const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius); gradient.addColorStop(0, 'rgba(255, 255, 200, 1)'); gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.8)'); gradient.addColorStop(1, 'rgba(255, 69, 0, 0)'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } else if (!this.isDroneTier1Projectile && this.game.player && cosmetics.equipped_projectile === 'proj_purple') { ctx.save(); const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const auraRadius = this.width * 2 + Math.random() * 3; const gradientAura = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, auraRadius); gradientAura.addColorStop(0, 'rgba(238, 130, 238, 0.6)'); gradientAura.addColorStop(1, 'rgba(148, 0, 211, 0)'); ctx.fillStyle = gradientAura; ctx.fillRect(centerX - auraRadius, this.pos.y - 10, auraRadius * 2, this.height + 20); ctx.fillStyle = '#1A001A'; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } else { ctx.save(); const gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, this.pos.x + this.width, this.pos.y); const semiTransparentColor = `${this.color}80`; gradient.addColorStop(0, semiTransparentColor); gradient.addColorStop(0.5, '#FFFFFF'); gradient.addColorStop(1, semiTransparentColor); ctx.fillStyle = gradient; ctx.shadowColor = this.color; ctx.shadowBlur = 8; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } } onHit(e: Enemy): void { const equipped = this.game.shopManager.playerCosmetics.equipped_projectile; if (!this.isDroneTier1Projectile && equipped === 'proj_green') { this.game.addEntity(new GreenSizzleEffect(this.game, this.pos.x + this.width / 2, this.pos.y)); } else if (!this.isDroneTier1Projectile && equipped === 'proj_rainbow') { this.game.addEntity(new RainbowImpactEffect(this.game, this.pos.x + this.width / 2, this.pos.y)); } else if (!this.isDroneTier1Projectile && equipped === 'proj_fireball') { this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, '#FFA500', 0.8)); } else if (!this.isDroneTier1Projectile && equipped === 'proj_purple') { this.game.addEntity(new VoidImpactEffect(this.game, this.pos.x + this.width / 2, this.pos.y)); } else { this.game.addEntity(new ImpactEffect(this.game, this.pos.x + this.width / 2, this.pos.y, this.color)); } this.destroy(); } }
class HeavyProjectile extends Projectile { constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -600) { super(game, x, y, velX, velY); this.pos.x = x - 4; this.width = 8; this.height = 22; this.damage = 1.5; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, this.pos.x + this.width, this.pos.y); const semiTransparentColor = '#FFD70080'; gradient.addColorStop(0, semiTransparentColor); gradient.addColorStop(0.5, '#FFFFFF'); gradient.addColorStop(1, semiTransparentColor); ctx.fillStyle = gradient; ctx.shadowColor = '#FFA500'; ctx.shadowBlur = 10; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } }
class PiercingProjectile extends Projectile { private hitEnemies: Enemy[] = []; constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -700) { super(game, x, y, velX, velY); this.pos.x = x - 3; this.width = 6; this.height = 25; this.damage = 0.8; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, this.pos.x + this.width, this.pos.y); const semiTransparentColor = '#9400D380'; gradient.addColorStop(0, semiTransparentColor); gradient.addColorStop(0.5, '#FFFFFF'); gradient.addColorStop(1, semiTransparentColor); ctx.fillStyle = gradient; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 12; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } onHit(e: Enemy): void { this.hitEnemies.push(e); } hasHit(e: Enemy): boolean { return this.hitEnemies.includes(e); } }
class BlackHoleProjectile extends Projectile { constructor(game: Game, x: number, y: number, velX: number, velY: number) { super(game, x - 10, y - 10, velX, velY); this.width = 20; this.height = 20; this.type = 'BLACK_HOLE_PROJECTILE'; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#9400D3'; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.width / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } onHit(e: Enemy): void { this.game.addEntity(new BlackHole(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2)); this.game.uiManager.soundManager.play('blackHole'); this.destroy(); } }
class LaserBeam extends EntityFamily { public player: Player; public damage: number = 0.2; private phase: number = 0; private amplitude: number = 30; private frequency: number = 0.02; constructor(game: Game, player: Player) { super(game, 0, 0, 60, game.height, 'projectile', 'LASER_BEAM'); this.player = player; } update(dt: number): void { if (!this.player.isAlive() || !this.player.powerUpManager.isActive('LASER_BEAM')) { this.destroy(); return; } this.pos.x = this.player.pos.x + this.player.width / 2 - this.amplitude; this.pos.y = 0; this.height = this.player.pos.y; this.phase += (dt / 1000) * 15; } destroy(): void { if (this.isAlive()) { this.game.uiManager.soundManager.stopLoop('laser'); } super.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const centerX = this.player.pos.x + this.player.width / 2; const beamHeight = this.player.pos.y; ctx.beginPath(); ctx.moveTo(centerX + Math.sin(this.phase) * this.amplitude, beamHeight); for (let y = beamHeight; y > 0; y--) { const xOffset = Math.sin(y * this.frequency + this.phase) * this.amplitude; ctx.lineTo(centerX + xOffset, y); } ctx.strokeStyle = '#9400D3'; ctx.lineWidth = 15; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 20; ctx.stroke(); ctx.beginPath(); ctx.moveTo(centerX + Math.sin(this.phase) * this.amplitude, beamHeight); for (let y = beamHeight; y > 0; y--) { const xOffset = Math.sin(y * this.frequency + this.phase) * this.amplitude; ctx.lineTo(centerX + xOffset, y); } ctx.strokeStyle = '#EE82EE'; ctx.lineWidth = 8; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.stroke(); ctx.beginPath(); ctx.moveTo(centerX + Math.sin(this.phase) * this.amplitude, beamHeight); for (let y = beamHeight; y > 0; y--) { const xOffset = Math.sin(y * this.frequency + this.phase) * this.amplitude; ctx.lineTo(centerX + xOffset, y); } ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } }
class HomingMissile extends Projectile { private target: Enemy | null = null; private searchCooldown: number = 0; private lifetime: number = 5000; constructor(game: Game, x: number, y: number, damage: number = 15) { super(game, x, y, (Math.random() - 0.5) * 200, -300); this.type = 'HOMING_MISSILE'; this.damage = damage; this.width = 8; this.height = 16; } findTarget(): void { const enemies = this.game.entities.filter(e => e.family === 'enemy' && e.isAlive()) as Enemy[]; if (enemies.length === 0) { this.target = null; return; } let closestEnemy: Enemy | null = null; let minDistance = Infinity; enemies.forEach(enemy => { const dist = Math.hypot(this.pos.x - (enemy.pos.x + enemy.width / 2), this.pos.y - (enemy.pos.y + enemy.height / 2)); if (dist < minDistance) { minDistance = dist; closestEnemy = enemy; } }); this.target = closestEnemy; } update(dt: number): void { this.lifetime -= dt; this.searchCooldown -= dt; if (this.searchCooldown <= 0) { this.findTarget(); this.searchCooldown = 500; } if (this.target && this.target.isAlive()) { const speed = 400; const turnFactor = 5; const dt_s = dt / 1000; const targetX = this.target.pos.x + this.target.width / 2; const targetY = this.target.pos.y + this.target.height / 2; const desiredVelX = targetX - this.pos.x; const desiredVelY = targetY - this.pos.y; const mag = Math.hypot(desiredVelX, desiredVelY); const normalizedDesiredVelX = mag > 0 ? (desiredVelX / mag) * speed : 0; const normalizedDesiredVelY = mag > 0 ? (desiredVelY / mag) * speed : 0; this.vel.x += (normalizedDesiredVelX - this.vel.x) * turnFactor * dt_s; this.vel.y += (normalizedDesiredVelY - this.vel.y) * turnFactor * dt_s; } super.update(dt); if (this.lifetime <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2); const angle = Math.atan2(this.vel.y, this.vel.x) + Math.PI / 2; ctx.rotate(angle); const gradient = ctx.createLinearGradient(-this.width / 2, 0, this.width / 2, 0); gradient.addColorStop(0, '#ff990080'); gradient.addColorStop(0.5, '#FFFFFF'); gradient.addColorStop(1, '#ff990080'); ctx.fillStyle = gradient; ctx.shadowColor = '#ff5722'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.moveTo(0, -this.height / 2); ctx.lineTo(-this.width / 2, this.height / 2); ctx.lineTo(this.width / 2, this.height / 2); ctx.closePath(); ctx.fill(); const flameSize = Math.random() * 8 + 4; ctx.fillStyle = '#ff5722'; ctx.beginPath(); ctx.moveTo(0, this.height / 2); ctx.lineTo(-this.width / 2 + 2, this.height / 2 + flameSize / 2); ctx.lineTo(0, this.height / 2 + flameSize); ctx.lineTo(this.width / 2 - 2, this.height / 2 + flameSize / 2); ctx.closePath(); ctx.fill(); ctx.restore(); } }
class SideProjectile extends Projectile { constructor(game: Game, x: number, y: number, velX: number, velY: number) { super(game, x, y, velX, velY, '#FFA500'); this.width = 20; this.height = 5; this.pos.x = x - this.width / 2; this.pos.y = y - this.height / 2; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.height); const semiTransparentColor = '#FFA50080'; gradient.addColorStop(0, semiTransparentColor); gradient.addColorStop(0.5, '#FFFFFF'); gradient.addColorStop(1, semiTransparentColor); ctx.fillStyle = gradient; ctx.shadowColor = this.color; ctx.shadowBlur = 8; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } }
class EnemyProjectile extends Projectile { public playerDamage: number; constructor(game: Game, x: number, y: number, vX: number = 0, vY: number = 360, playerDamage: number = 25) { super(game, x - 2.5, y, vX, vY); this.family = 'projectile'; this.type = 'ENEMY_PROJECTILE'; this.playerDamage = playerDamage; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#FF4136'; ctx.shadowColor = '#FF4136'; ctx.shadowBlur = 5; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } }
class FireballProjectile extends EnemyProjectile { constructor(game: Game, x: number, y: number, vX: number, vY: number, playerDamage: number) { super(game, x, y, vX, vY, playerDamage); this.width = 16; this.height = 16; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this.width / 2); gradient.addColorStop(0, 'rgba(255, 255, 150, 1)'); gradient.addColorStop(0.6, 'rgba(255, 165, 0, 1)'); gradient.addColorStop(1, 'rgba(255, 69, 0, 0.5)'); ctx.fillStyle = gradient; ctx.shadowColor = '#FFA500'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class PlasmaBallProjectile extends EnemyProjectile { constructor(game: Game, x: number, y: number, vX: number, vY: number, playerDamage: number) { super(game, x, y, vX, vY, playerDamage); this.width = 12; this.height = 12; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this.width / 2); gradient.addColorStop(0, 'rgba(255, 180, 180, 1)'); gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1)'); gradient.addColorStop(1, 'rgba(139, 0, 0, 0.5)'); ctx.fillStyle = gradient; ctx.shadowColor = '#FF4136'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class TeleporterProjectile extends EnemyProjectile { constructor(game: Game, x: number, y: number, vX: number, vY: number) { super(game, x, y, vX, vY, 20); this.width = 22; this.height = 22; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const pulse = 1 + Math.sin(Date.now() / 100) * 0.15; const radius = (this.width / 2) * pulse; const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius); gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); gradient.addColorStop(0.5, 'rgba(238, 130, 238, 0.7)'); gradient.addColorStop(1, 'rgba(148, 0, 211, 0)'); ctx.fillStyle = gradient; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class WaveProjectile extends EnemyProjectile { private originX: number; private waveAngle: number = 0; private waveFrequency: number = 5; private waveAmplitude: number = 30; constructor(game: Game, x: number, y: number, vX: number, vY: number) { super(game, x, y, vX, vY, 25); this.width = 14; this.height = 14; this.originX = x - this.width / 2; } update(dt: number): void { const dt_s = dt / 1000; this.pos.y += this.vel.y * dt_s; this.waveAngle += this.waveFrequency * dt_s; this.pos.x = this.originX + Math.sin(this.waveAngle) * this.waveAmplitude; if (this.pos.y > this.game.height) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const radius = this.width / 2; const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius); gradient.addColorStop(0, 'rgba(255, 255, 220, 1)'); gradient.addColorStop(0.6, 'rgba(255, 165, 0, 0.8)'); gradient.addColorStop(1, 'rgba(255, 69, 0, 0)'); ctx.fillStyle = gradient; ctx.shadowColor = '#FFA500'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class Drone extends EntityFamily { private tier: number; private index: number; private orbitRadius: number = 75; private fireCooldown: number = 0; private image: HTMLImageElement; constructor(game: Game, tier: number, index: number) { super(game, 0, 0, 36, 36, 'player', 'DRONE'); this.tier = tier; this.index = index; this.image = orbitalDroneImages[this.tier - 1]!; } updateIndex(newIndex: number) { this.index = newIndex; } update(dt: number): void { if (!this.game.player || !this.game.player.isAlive() || !this.game.player.powerUpManager.isActive('ORBITAL_DRONE')) { this.destroy(); return; } const totalDrones = this.game.player.drones.length; const angleOffset = (2 * Math.PI / totalDrones) * this.index; const currentAngle = this.game.player.droneAngle + angleOffset; const playerPos = this.game.player.pos; this.pos.x = playerPos.x + this.game.player.width / 2 + Math.cos(currentAngle) * this.orbitRadius; this.pos.y = playerPos.y + this.game.player.height / 2 + Math.sin(currentAngle) * this.orbitRadius; this.fireCooldown -= dt; if (this.fireCooldown <= 0) this.shoot(); } shoot(): void { switch (this.tier) { case 1: this.game.addEntity(new Projectile(this.game, this.pos.x, this.pos.y, 0, -600, '#00FFFF', true)); this.fireCooldown = 600; this.game.uiManager.soundManager.play('droneTier1'); break; case 2: this.game.addEntity(new HeavyProjectile(this.game, this.pos.x, this.pos.y)); this.fireCooldown = 500; this.game.uiManager.soundManager.play('droneTier2'); break; case 3: this.game.addEntity(new HomingMissile(this.game, this.pos.x, this.pos.y, 1.875)); this.fireCooldown = 400; this.game.uiManager.soundManager.play('droneTier3'); break; } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height); ctx.restore(); } }
class PowerUpManager {
    public player: Player;
    public game: Game;
    public weaponTier: number = 1;
    public weaponTierTimer: number = 0;
    public ultraWeapon: string | null = null;
    public timers: { [key: string]: number } = {};
    public specialInventory: IInventoryItem[] = [];
    public ultraInventory: IInventoryItem[] = [];

    public get prestigeMinTier(): number {
        return this.game.shopManager.getUpgradeLevel('ultimate_weapon_prestige') > 0 ? 2 : 1;
    }

    constructor(player: Player) {
        this.player = player;
        this.game = player.game;
        // Start-Tier basierend auf Prestige setzen
        this.weaponTier = this.prestigeMinTier;
        if (this.weaponTier > 1) {
            console.log("ðŸ’Ž Weapon Prestige active: Level starts with Tier", this.weaponTier);
        }
    }
    update(dt: number): void {
        for (const key in this.timers) {
            // Pixel Pioneer: Session Power-Up has no timer
            if (this.game.sessionPowerUp === key && this.game.shopManager.getEquippedCollectibleBonus() === 'START_POWERUP') {
                continue;
            }
            this.timers[key] -= dt;
            if (this.timers[key] <= 0) this.deactivate(key);
        }
        if (this.weaponTierTimer > 0) {
            this.weaponTierTimer -= dt;
            if (this.weaponTierTimer <= 0) {
                this.weaponTier = Math.max(this.prestigeMinTier, this.weaponTier - 1);
                this.setWeaponTierTimer();
            }
        }
    }
    setWeaponTierTimer(): void { if (this.weaponTier <= this.prestigeMinTier) { this.weaponTier = this.prestigeMinTier; this.weaponTierTimer = 0; return; } switch (this.weaponTier) { case 4: this.weaponTierTimer = 30000; break; case 3: this.weaponTierTimer = 60000; break; case 2: this.weaponTierTimer = 90000; break; } } deactivate(key: string): void { delete this.timers[key]; if (this.ultraWeapon === key) { this.ultraWeapon = null; if (this.player.laser) { this.player.laser.destroy(); this.player.laser = null; } } else if (key === 'ORBITAL_DRONE') { this.player.drones.forEach(d => d.destroy()); this.player.drones = []; } } resetTemporaryPowerUps(): void {
        Object.keys(this.timers).forEach(timerKey => {
            // Prevent clearing the permanent Pioneer power-up if it's currently active
            if (this.game.sessionPowerUp === timerKey && this.game.shopManager.getEquippedCollectibleBonus() === 'START_POWERUP') return;
            this.deactivate(timerKey);
        }); this.ultraWeapon = null;
    } isActive(type: string): boolean { return this.timers[type] > 0 || (this.game.sessionPowerUp === type && this.game.shopManager.getEquippedCollectibleBonus() === 'START_POWERUP'); } onPlayerHit(): void { if (this.weaponTier > this.prestigeMinTier) { this.weaponTier--; this.setWeaponTierTimer(); } } collectSpecial(type: string): void { this.collectToInventory(type, this.specialInventory, 3); } collectUltra(type: string): void { this.collectToInventory(type, this.ultraInventory, 2); }
    private collectToInventory(type: string, inventory: IInventoryItem[], maxSlots: number): void { const stackSizeLevels = [5, 10, 25]; let currentMaxStackSize = 5; if (inventory === this.specialInventory) { const upgradeLevel = this.game.shopManager.getUpgradeLevel('special_stack_size'); currentMaxStackSize = stackSizeLevels[upgradeLevel] || 5; } const existing = inventory.find(item => item.type === type); if (existing) { if (existing.count < currentMaxStackSize) { existing.count++; this.game.uiManager.soundManager.play('powerup'); } } else if (inventory.length < maxSlots) { inventory.push({ type, count: 1 }); this.game.uiManager.soundManager.play('powerup'); } }
    activateSpecial(slotIndex: number): void { const special = this.specialInventory[slotIndex]; if (!special) return; if (special.type === 'BLACK_HOLE') { const p = this.game.player!; this.game.addEntity(new BlackHoleProjectile(this.game, p.pos.x + p.width / 2, p.pos.y, 0, -600)); this.game.uiManager.soundManager.play('missileLaunch'); } else { this.activate(special.type); } special.count--; if (special.count <= 0) this.specialInventory.splice(slotIndex, 1); } activateUltra(slotIndex: number): void { const ultra = this.ultraInventory[slotIndex]; if (!ultra) return; if (this.ultraWeapon) this.deactivate(this.ultraWeapon); this.activate(ultra.type); ultra.count--; if (ultra.count <= 0) this.ultraInventory.splice(slotIndex, 1); }
    activate(type: string, duration?: number): void {
        const durationUpgradeLevel = this.game.shopManager.getUpgradeLevel('powerup_duration');
        let durationMultiplier = 1 + (durationUpgradeLevel * 0.1);
        if (this.game.shopManager.getEquippedCollectibleBonus() === 'DURATION_BOOST') {
            durationMultiplier += 0.20;
        }
        const W_ULTRA_DURATIONS: { [key: string]: number } = { 'LASER_BEAM': 7750, 'HOMING_MISSILES': 15000 };
        const W_TEMP_DURATIONS: { [key: string]: number } = { 'SIDE_SHOTS': 15000, 'RAPID_FIRE': 30000 };
        const DEFENSE_TYPES = ['SHIELD', 'REPAIR_KIT', 'EXTRA_LIFE', 'GHOST_PROTOCOL'];
        const SPECIAL_TYPES = ['NUKE', 'SCORE_BOOST'];

        this.game.achievementManager.check('powerup_collect', { type });

        this.game.achievementManager.check('powerup_collect', { type });

        if (type === 'ORBITAL_DRONE') {
            if (this.player.drones.length < 3) {
                const droneTier = this.player.drones.length + 1;
                this.player.drones.push(new Drone(this.game, droneTier, this.player.drones.length));
                this.player.drones.forEach((drone, index) => drone.updateIndex(index));
            }
            this.timers['ORBITAL_DRONE'] = 30000 * durationMultiplier;
        } else if (type === 'WEAPON_UP') {
            if (this.weaponTier < 4) this.weaponTier++;
            this.setWeaponTierTimer();
        } else if (Object.keys(W_TEMP_DURATIONS).includes(type)) {
            const baseDuration = duration ?? W_TEMP_DURATIONS[type]!;
            this.timers[type] = baseDuration * durationMultiplier;
        } else if (Object.keys(W_ULTRA_DURATIONS).includes(type)) {
            this.ultraWeapon = type;
            this.timers[type] = (duration ?? W_ULTRA_DURATIONS[type]!) * durationMultiplier;
        } else if (DEFENSE_TYPES.includes(type)) {
            if (type === 'EXTRA_LIFE') {
                if (this.player.lives < this.player.maxLives) this.player.lives++;
            } else if (type === 'REPAIR_KIT') {
                this.player.energy = this.player.maxEnergy;
            } else if (type === 'SHIELD') {
                this.timers[type] = Infinity;
            } else {
                const baseGhostDuration = duration ?? 15000;
                this.timers[type] = duration ? baseGhostDuration : baseGhostDuration * durationMultiplier;
            }
        } else if (SPECIAL_TYPES.includes(type)) {
            if (type === 'NUKE') {
                const enemiesKilled = this.game.entities.filter(e => e.family === 'enemy' && !(e as Enemy).isBoss);
                enemiesKilled.forEach(e => (e as Enemy).takeHit(9999));
                this.game.achievementManager.check('special_activated', { type: 'NUKE', kills: enemiesKilled.length });
                this.game.addEntity(new NukeEffect(this.game));
                this.game.uiManager.soundManager.play('nuke');
            } else if (type === 'SCORE_BOOST') {
                this.timers[type] = 20000 * durationMultiplier;
            }
        }
        this.game.uiManager.soundManager.play('powerup');
    }
    shoot(fireTier1_4: boolean = true): void {
        const p = this.player;
        let actuallyFired = false;
        let blockStandardShots = false;

        // --- SPECIALS / SPECIAL WEAPONS ---
        // These fire REGARDLESS of the Auto-Fire settings (OFF/MOVE/AUTO)

        // 1. Ultra Weapons
        if (this.ultraWeapon === 'LASER_BEAM') {
            if (!p.laser || !p.laser.isAlive()) {
                p.laser = new LaserBeam(this.game, p);
                this.game.addEntity(p.laser);
                this.game.uiManager.soundManager.playLoop('laser');
            }
            p.fireCooldown = 0;
            blockStandardShots = true; // REQUEST: Only laser fires, no projectiles Tier 1-4
        } else if (this.ultraWeapon === 'HOMING_MISSILES') {
            if (p.homingCooldown <= 0) {
                this.game.addEntity(new HomingMissile(this.game, p.pos.x + p.width / 2, p.pos.y));
                p.homingCooldown = 400;
                this.game.uiManager.soundManager.play('missileLaunch');
                actuallyFired = true;
            }
        }

        // 2. Side Shots & Tier 1-4 Projectiles (Share cooldown, fire parallel)
        if (p.fireCooldown <= 0) {
            const x = p.pos.x, y = p.pos.y, w = p.width, h = p.height;
            let firedThisFrame = false;

            // Side Shots fire parallel to anything, regardless of Auto-Fire logic
            if (this.isActive('SIDE_SHOTS')) {
                actuallyFired = true;
                firedThisFrame = true;
                this.game.addEntity(new SideProjectile(this.game, x, y + h / 2, -300, 0));
                this.game.addEntity(new SideProjectile(this.game, x + w, y + h / 2, 300, 0));
            }

            // Tier 1-4 only fire if fireTier1_4 is true AND Laser is not active (blocking them)
            if (fireTier1_4 && !blockStandardShots) {
                actuallyFired = true;
                firedThisFrame = true;
                const velY = -600;
                const angle15 = 15 * (Math.PI / 180);
                let projectileColor = '#00FFFF';

                if (this.game.shopManager.playerCosmetics.equipped_projectile === 'proj_green') {
                    projectileColor = '#39FF14';
                } else {
                    switch (this.weaponTier) {
                        case 2: projectileColor = '#B10DC9'; break;
                        case 3: projectileColor = '#FFFF00'; break;
                        case 4: projectileColor = '#FF4136'; break;
                    }
                }

                switch (this.weaponTier) {
                    case 1: this.game.addEntity(new Projectile(this.game, x + w / 2, y, 0, velY, projectileColor)); break;
                    case 2: this.game.addEntity(new Projectile(this.game, x + w * 0.2, y, 0, velY, projectileColor)); this.game.addEntity(new Projectile(this.game, x + w * 0.8, y, 0, velY, projectileColor)); break;
                    case 3: this.game.addEntity(new Projectile(this.game, x + w / 2, y, 0, velY, projectileColor)); this.game.addEntity(new Projectile(this.game, x + w / 2, y, Math.sin(-angle15) * Math.abs(velY), Math.cos(-angle15) * velY, projectileColor)); this.game.addEntity(new Projectile(this.game, x + w / 2, y, Math.sin(angle15) * Math.abs(velY), Math.cos(angle15) * velY, projectileColor)); break;
                    case 4: this.game.addEntity(new Projectile(this.game, x + w * 0.1, y, -150, velY, projectileColor)); this.game.addEntity(new Projectile(this.game, x + w * 0.9, y, 150, velY, projectileColor)); this.game.addEntity(new Projectile(this.game, x + w * 0.3, y, 0, velY, projectileColor)); this.game.addEntity(new Projectile(this.game, x + w * 0.7, y, 0, velY, projectileColor)); break;
                }
            }

            if (firedThisFrame) {
                p.fireCooldown = this.isActive('RAPID_FIRE') ? 75 : 150;
            }
        }

        if (actuallyFired) {
            this.game.uiManager.soundManager.play('shoot');
            if (this.game.shopManager.playerCosmetics.equipped_projectile === 'proj_green') {
                this.game.addEntity(new GreenMuzzleFlash(this.game, p));
            }
        }
    }
}
class Player extends EntityFamily {
    public speed: number; public lives: number; public maxLives: number; public energy: number; public maxEnergy: number; public fireCooldown: number = 0; public homingCooldown: number = 0; public powerUpManager: PowerUpManager; public drones: Drone[] = []; public laser: LaserBeam | null = null; public droneAngle: number = 0; public isChargingBlackHole: boolean = false; public blackHoleChargeSlot: number | null = null; public availableReviveCrystals: ('BLUE' | 'YELLOW' | 'PURPLE')[] = []; private particleSpawnTimer: number = 0; private readonly PARTICLE_SPAWN_INTERVAL: number = 35; private steeringDirection: number = 0; public isShooting: boolean = false;
    constructor(game: Game, initialStats: { lives: number, energy: number, speed: number, maxEnergy: number }) { super(game, game.width / 2 - 25, game.height - (game.isMobile ? 180 : 80), 50, 40, 'player', 'PLAYER'); this.lives = initialStats.lives; this.maxLives = 3 + game.shopManager.getUpgradeLevel('start_lives'); this.energy = initialStats.energy; this.maxEnergy = initialStats.maxEnergy; this.speed = initialStats.speed; this.powerUpManager = new PowerUpManager(this); this.initializeReviveCrystals(); }
    public initializeReviveCrystals(): void { this.availableReviveCrystals = []; const reviveLevel = this.game.shopManager.getUpgradeLevel('revive_chance'); if (reviveLevel >= 1) this.availableReviveCrystals.push('BLUE'); if (reviveLevel >= 2) this.availableReviveCrystals.push('YELLOW'); if (reviveLevel >= 3) this.availableReviveCrystals.push('PURPLE'); }
    update(dt: number): void {
        const dt_s = dt / 1000; const oldX = this.pos.x; const oldY = this.pos.y;

        let isMoving = false;

        if (this.game.isMobile) {
            isMoving = this.game.touchX !== null && this.game.touchY !== null;
            let targetX = this.pos.x;
            if (isMoving) {
                targetX = this.game.touchX! - this.width / 2;
                const targetY = this.game.touchY! - this.height / 2;
                this.pos.x += (targetX - this.pos.x) * 0.2;
                this.pos.y += (targetY - this.pos.y) * 0.2;
            }
            const steerDelta = targetX - this.pos.x;
            this.steeringDirection = Math.max(-1, Math.min(1, steerDelta / 20));
        } else {
            const move = new Vector2D(0, 0);
            if (this.game.keys['ArrowLeft'] || this.game.keys['KeyA']) move.x = -1;
            if (this.game.keys['ArrowRight'] || this.game.keys['KeyD']) move.x = 1;
            if (this.game.keys['ArrowUp'] || this.game.keys['KeyW']) move.y = -1;
            if (this.game.keys['ArrowDown'] || this.game.keys['KeyS']) move.y = 1;
            this.steeringDirection = move.x;
            const mag = Math.hypot(move.x, move.y);
            if (mag > 0) {
                isMoving = true;
                this.pos.x += (move.x / mag) * this.speed * dt_s;
                this.pos.y += (move.y / mag) * this.speed * dt_s;
            }
        }
        this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width));
        this.pos.y = Math.max(0, Math.min(this.pos.y, this.game.height - this.height - (this.game.isMobile ? 120 : 0)));

        this.particleSpawnTimer -= dt;
        if (this.particleSpawnTimer <= 0) { this.particleSpawnTimer = this.PARTICLE_SPAWN_INTERVAL; const dx = this.pos.x - oldX; const dy = this.pos.y - oldY; const mag = Math.hypot(dx, dy); if (mag > 1) { const PARTICLE_SPEED = 80; const SPREAD = 20; const baseVelX = -(dx / mag) * PARTICLE_SPEED; const baseVelY = -(dy / mag) * PARTICLE_SPEED; const spawnLeftX = this.pos.x + this.width * 0.1; const spawnRightX = this.pos.x + this.width * 0.9; const engineBaseY = this.pos.y + this.height * 0.9; const spawnY = engineBaseY + 20; const velLeft = new Vector2D(baseVelX + (Math.random() - 0.5) * SPREAD, baseVelY + (Math.random() - 0.5) * SPREAD); const velRight = new Vector2D(baseVelX + (Math.random() - 0.5) * SPREAD, baseVelY + (Math.random() - 0.5) * SPREAD); const equippedTrail = this.game.shopManager.playerCosmetics.equipped_trail; if (equippedTrail === 'trail_rainbow') { const colors = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#EE82EE']; const colorLeft = colors[Math.floor(Math.random() * colors.length)]!; const colorRight = colors[Math.floor(Math.random() * colors.length)]!; this.game.addEntity(new Particle(this.game, spawnLeftX, spawnY, colorLeft, 0.4, 3.5, velLeft)); this.game.addEntity(new Particle(this.game, spawnRightX, spawnY, colorRight, 0.4, 3.5, velRight)); } else { this.game.addEntity(new Particle(this.game, spawnLeftX, spawnY, '#00FFFF', 0.3, 3, velLeft)); this.game.addEntity(new Particle(this.game, spawnRightX, spawnY, '#00FFFF', 0.3, 3, velRight)); } } }

        const autoSetting = typeof this.game.uiManager.settings.autoFire === 'string' ? this.game.uiManager.settings.autoFire : (this.game.uiManager.settings.autoFire ? 'always' : 'off');
        const manualFire = this.game.keys['Space'] === true;

        const wantTier1_4 = autoSetting === 'always' || (autoSetting === 'move' && isMoving) || manualFire;

        // Player.isShooting is mostly for animation/status, kept for now
        this.isShooting = wantTier1_4 || this.powerUpManager.ultraWeapon !== null || this.powerUpManager.isActive('SIDE_SHOTS');

        if (!this.isChargingBlackHole) {
            this.shoot(wantTier1_4);
        } else if (this.laser && this.laser.isAlive()) {
            // If charging black hole, we might want to keep the laser visible or stop it? 
            // Usually Specials keep firing, but Black Hole charging is a special state.
        }

        if (this.fireCooldown > 0) this.fireCooldown -= dt;
        if (this.homingCooldown > 0) this.homingCooldown -= dt;
        this.droneAngle += 3 * dt_s; this.powerUpManager.update(dt); this.drones.forEach(d => d.update(dt));
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.globalAlpha = this.isGhosted() ? 0.5 : 1;

        const equippedSkinId = this.game.shopManager.playerCosmetics.equipped_skin;
        const equippedCollId = this.game.shopManager.playerCollectibles.equipped_collectible;
        const activeId = equippedCollId || equippedSkinId || 'skin_default';
        const currentImage = playerImageMap[activeId] || playerImageMap['skin_default'];

        const visualWidth = 120;
        const visualHeight = 120;
        const drawX = (this.pos.x + this.width / 2) - (visualWidth / 2);
        const drawY = (this.pos.y + this.height / 2) - (visualHeight / 2);

        const engineLeftX = this.pos.x + this.width * 0.1;
        const engineRightX = this.pos.x + this.width * 0.9;
        const engineY = drawY + visualHeight * 0.75;

        const drawFlame = (x: number, y: number) => {
            ctx.save();
            const baseLength = 25, baseWidth = 9, swayAmount = 8;
            const STEERING_FLAME_OFFSET = 15;
            for (let i = 0; i < 3; i++) {
                const currentLength = baseLength + Math.random() * 10;
                const currentWidth = baseWidth + Math.random() * 4;
                const tipSway = (Math.random() - 0.5) * swayAmount;
                const nozzleX = x, nozzleY = y;
                const steeringOffset = -this.steeringDirection * STEERING_FLAME_OFFSET;
                const tipX = x + tipSway + steeringOffset;
                const tipY = y + currentLength;
                const controlX1 = x - currentWidth + steeringOffset * 0.5;
                const controlY1 = y + currentLength * 0.5;
                const controlX2 = x + currentWidth + steeringOffset * 0.5;
                const controlY2 = y + currentLength * 0.5;
                const gradient = ctx.createLinearGradient(nozzleX, nozzleY, nozzleX, tipY);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.7)');
                gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.moveTo(nozzleX, nozzleY);
                ctx.quadraticCurveTo(controlX1, controlY1, tipX, tipY);
                ctx.quadraticCurveTo(controlX2, controlY2, nozzleX, nozzleY);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        };

        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 20;
        drawFlame(engineLeftX, engineY);
        drawFlame(engineRightX, engineY);
        ctx.shadowBlur = 0;

        // --- SHIP DRAWN LAST (OVER FLAMES) ---
        if (this.isShielded()) {
            const pulse = Math.sin(Date.now() / 200) * 0.5 + 0.5;
            const glowSize = 10 + pulse * 15;
            const glowAlpha = 0.7 + pulse * 0.3;
            ctx.shadowColor = `rgba(11, 255, 255, ${glowAlpha})`;
            ctx.shadowBlur = glowSize;
        }

        ctx.drawImage(currentImage, drawX, drawY, visualWidth, visualHeight);
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        this.drones.forEach(d => d.draw(ctx));
        ctx.restore();
    }
    shoot(fireTier1_4: boolean = true): void { this.powerUpManager.shoot(fireTier1_4); } takeHit(damagePercentage: number): void {
        if (this.isGhosted()) return; if (this.isShielded()) { this.powerUpManager.deactivate('SHIELD'); this.game.uiManager.soundManager.play('shieldDown'); return; }

        if (this.game.shopManager.getEquippedCollectibleBonus() === 'GHOST_CHANCE' && Math.random() < 0.25) {
            this.powerUpManager.activate('GHOST_PROTOCOL'); // No duration = normal duration (default)
            return;
        }
        this.powerUpManager.onPlayerHit();
        this.energy -= damagePercentage;
        // Add a short invincibility period to prevent rapid energy loss from multiple hits/collisions
        this.powerUpManager.activate('GHOST_PROTOCOL', 1000);
        this.game.playerWasHitThisLevel = true;
        this.game.achievementManager.check('player_hit');
        this.game.achievementManager.check('player_hit');
        this.game.uiManager.soundManager.play('playerHit');
        this.game.uiManager.vibrate(200); // Haptic feedback logic
        if (this.energy <= 0) { this.lives--; if (this.lives <= 0) { if (this.availableReviveCrystals.length > 0) { const crystalToUse = this.availableReviveCrystals.shift()!; this.game.startReviveSequence(this, crystalToUse); return; } this.destroy(); this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, '#FFFFFF', 2)); this.game.uiManager.soundManager.play('playerExplosion'); } else { this.energy = this.maxEnergy; this.pos.x = this.game.width / 2 - this.width / 2; this.pos.y = this.game.height - 80; this.powerUpManager.activate('GHOST_PROTOCOL', 5000); } }
    } public finalizeRevive(): void {
        this.lives = 1;
        this.energy = this.maxEnergy * 0.5;
        this.game.achievementManager.check('player_revived');
        this.game.addEntity(new ReviveEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2));
        this.game.uiManager.soundManager.play('revive');
        this.powerUpManager.activate('GHOST_PROTOCOL', 3000);
        this.game.changeState('PLAYING');
    } isShielded(): boolean { return this.powerUpManager.isActive('SHIELD'); } isGhosted(): boolean { return this.powerUpManager.isActive('GHOST_PROTOCOL'); } isScoreBoosted(): boolean { return this.powerUpManager.isActive('SCORE_BOOST'); }
}
class VoidPool extends EntityFamily { private life: number = 8000; private radius: number = 0; private maxRadius: number = 80; private damageCooldown: number = 500; private damageTimer: number = 0; constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0, 'effect', 'VOID_POOL'); } update(dt: number): void { this.life -= dt; if (this.life <= 0) { this.destroy(); return; } this.radius = Math.min(this.maxRadius, this.radius + 30 * (dt / 1000)); this.damageTimer -= dt; if (this.damageTimer <= 0 && this.game.player && !this.game.player.isGhosted()) { const dist = Math.hypot(this.pos.x - (this.game.player.pos.x + this.game.player.width / 2), this.pos.y - (this.game.player.pos.y + this.game.player.height / 2)); if (dist < this.radius) { this.game.player.takeHit(15); this.damageTimer = this.damageCooldown; } } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const alpha = Math.min(1, this.life / 2000); const pulse = 1 + Math.sin(Date.now() / 300) * 0.1; ctx.globalAlpha = alpha * 0.7; const gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.radius * pulse); gradient.addColorStop(0, 'rgba(148, 0, 211, 0.8)'); gradient.addColorStop(0.7, 'rgba(75, 0, 130, 0.5)'); gradient.addColorStop(1, 'rgba(44, 0, 62, 0)'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius * pulse, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
class BossSentinelPrime extends Enemy {
    private attackPattern: number = 0; private attackTimer: number = 5000; private movementPattern: string = 'ENTER'; private hSpeed: number; private image: HTMLImageElement; private patrolY: number = 50; private isPreparingCharge: boolean = false; private chargePreparationTimer: number = 0; private isPreparingLineAttack: boolean = false; private lineAttackPreparationTimer: number = 0; private chargeTargetPos: Vector2D | null = null; private chargeOriginPos: Vector2D | null = null; private visualOffsetY: number; private isFinalBattleVersion: boolean; constructor(game: Game, health: number, speedMultiplier: number, isFinalBattleVersion: boolean = false) { const visualHeight = 150; const hitboxHeight = 100; super(game, game.width / 2 - 112.5, -visualHeight, 225, hitboxHeight, health, 5000, 'BOSS_SENTINEL_PRIME'); this.visualOffsetY = (visualHeight - hitboxHeight) / 2; this.isBoss = true; this.hSpeed = 100 * speedMultiplier; this.image = bossSentinelPrimeImg; this.collisionDamage = 50; this.isFinalBattleVersion = isFinalBattleVersion; if (this.isFinalBattleVersion) { this.attackTimer = 3500; } } update(dt: number): void { const dt_s = dt / 1000; if (this.isPreparingCharge) { this.chargePreparationTimer -= dt; if (this.chargePreparationTimer <= 0) this.executeAttack(); return; } if (this.isPreparingLineAttack) { this.lineAttackPreparationTimer -= dt; if (this.lineAttackPreparationTimer <= 0) this.executeAttack(); return; } if (this.movementPattern === 'DASH_TO_PLAYER' && this.chargeTargetPos) { const chargeSpeed = 800; const targetX = this.chargeTargetPos.x - (this.width / 2); const targetY = this.chargeTargetPos.y - (this.height / 2); const angle = Math.atan2(targetY - this.pos.y, targetX - this.pos.x); this.pos.x += Math.cos(angle) * chargeSpeed * dt_s; this.pos.y += Math.sin(angle) * chargeSpeed * dt_s; const dist = Math.hypot(targetX - this.pos.x, targetY - this.pos.y); if (dist < 20) this.movementPattern = 'RETURN_TO_ORIGIN'; } else if (this.movementPattern === 'RETURN_TO_ORIGIN' && this.chargeOriginPos) { const returnSpeed = 400; const targetX = this.chargeOriginPos.x; const targetY = this.chargeOriginPos.y; const angle = Math.atan2(targetY - this.pos.y, targetX - this.pos.x); this.pos.x += Math.cos(angle) * returnSpeed * dt_s; this.pos.y += Math.sin(angle) * returnSpeed * dt_s; const dist = Math.hypot(targetX - this.pos.x, targetY - this.pos.y); if (dist < 20) { this.movementPattern = 'PATROL'; this.chargeOriginPos = null; this.chargeTargetPos = null; this.pos.x = targetX; this.pos.y = targetY; } } else if (this.movementPattern === 'ENTER') { this.pos.y += 100 * dt_s; if (this.pos.y >= this.patrolY) { this.pos.y = this.patrolY; this.movementPattern = 'PATROL'; } } else if (this.movementPattern === 'PATROL') { this.pos.x += this.hSpeed * dt_s; if (this.pos.x <= 0 || this.pos.x >= this.game.width - this.width) { this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width)); this.hSpeed *= -1; } } this.attackTimer -= dt; if (this.attackTimer <= 0) { this.prepareAttack(); this.attackTimer = this.isFinalBattleVersion ? 3500 : 5000; } } prepareAttack(): void { this.attackPattern = Math.floor(Math.random() * 3); switch (this.attackPattern) { case 0: this.isPreparingLineAttack = true; this.lineAttackPreparationTimer = 1500; break; case 1: this.executeAttack(); break; case 2: if (this.game.player) { this.isPreparingCharge = true; this.chargePreparationTimer = 1500; this.chargeOriginPos = new Vector2D(this.pos.x, this.pos.y); this.chargeTargetPos = new Vector2D(this.game.player.pos.x + this.game.player.width / 2, this.game.player.pos.y + this.game.player.height / 2); this.movementPattern = 'PREPARE_CHARGE'; } break; } } executeAttack(): void { const { x, y } = this.pos; const { width: w, height: h } = this; const projectileType = this.isFinalBattleVersion ? FireballProjectile : PlasmaBallProjectile; switch (this.attackPattern) { case 0: this.game.uiManager.soundManager.play('enemyPlasmaShoot'); const attackWidth = this.width * 0.7; const startX = x + (this.width * 0.15); for (let i = 0; i < 7; i++) { this.game.addEntity(new projectileType(this.game, startX + (i * attackWidth / 6), y + this.height, 0, 360, this.collisionDamage)); } break; case 1: this.game.uiManager.soundManager.play('enemyPlasmaShoot'); for (let i = 0; i < 12; i++) { const angle = i * Math.PI / 6; this.game.addEntity(new projectileType(this.game, x + this.width / 2, y + this.height / 2, Math.cos(angle) * 240, Math.sin(angle) * 240, this.collisionDamage)); } break; case 2: this.movementPattern = 'DASH_TO_PLAYER'; break; } this.isPreparingCharge = false; this.isPreparingLineAttack = false; } protected render(ctx: CanvasRenderingContext2D): void {
        if (!this.image || !this.image.complete) return;
        if (this.isPreparingLineAttack) {
            const glow = (1 - this.lineAttackPreparationTimer / 1500) * 0.8;
            ctx.shadowColor = `rgba(255, 0, 0, ${glow})`;
            ctx.shadowBlur = 30;
        } else if (this.isPreparingCharge) {
            const pulse = 1 + Math.sin(Date.now() / 100);
            ctx.shadowColor = `rgba(255, 215, 0, 0.8)`;
            ctx.shadowBlur = 20 + pulse * 10;
        }
        ctx.drawImage(this.image, this.pos.x, this.pos.y - this.visualOffsetY, this.width, 150);
    }
}
class BossVoidSerpent extends Enemy {
    private image: HTMLImageElement; private attackTimer: number = 4000; private angle: number = 0; private verticalTargetY: number = 80; private waveSpeed: number = 1.2; private waveAmplitude: number; private isPreparingToAttack: boolean = false; private attackPreparationTimer: number = 0; private readonly attackPreparationDuration: number = 1000; private visualOffsetY: number; private isFinalBattleVersion: boolean; constructor(game: Game, health: number, speedMultiplier: number, isFinalBattleVersion: boolean = false) {
        const hitboxHeight = 100;
        const visualHeight = 240;
        super(game, game.width / 2 - 90, -visualHeight, 180, hitboxHeight, health * 0.7, 7500, 'BOSS_VOID_SERPENT');
        this.visualOffsetY = (visualHeight - hitboxHeight) / 2;
        this.isBoss = true;
        this.image = bossVoidSerpentSrc;
        this.collisionDamage = 90;
        this.speed = 40 * speedMultiplier;
        this.waveAmplitude = (this.game.width / 2) - (this.width / 2) - 20;
        this.isFinalBattleVersion = isFinalBattleVersion;
    } update(dt: number): void { if (this.isPreparingToAttack) { this.attackPreparationTimer -= dt; if (this.attackPreparationTimer <= 0) { this.isPreparingToAttack = false; this.executeAttack(); } return; } const dt_s = dt / 1000; if (this.pos.y < this.verticalTargetY) { this.pos.y += this.speed * dt_s; } else { this.angle += this.waveSpeed * dt_s; this.pos.x = (this.game.width / 2 - this.width / 2) + Math.sin(this.angle) * this.waveAmplitude; this.verticalTargetY = 80 + Math.cos(this.angle * 0.5) * 40; this.pos.y += (this.verticalTargetY - this.pos.y) * 0.1; } this.attackTimer -= dt; if (this.attackTimer <= 0 && this.pos.y >= 60) { this.isPreparingToAttack = true; this.attackPreparationTimer = this.attackPreparationDuration; const baseCooldown = Math.max(2000, 3500 - this.game.level * 100); this.attackTimer = baseCooldown * (1 + Math.random() * 0.5); } } private executeAttack(): void { const x = this.pos.x, y = this.pos.y, w = this.width; const attackType = Math.random() > 0.5 ? 'SPREAD' : 'WHIP'; if (this.isFinalBattleVersion) { this.game.addEntity(new VoidPool(this.game, x + w / 2, y + this.height / 2)); } if (attackType === 'SPREAD') { this.game.uiManager.soundManager.play('enemyPlasmaShoot'); const spawnX = x + w / 2; const spawnY = y + this.height / 2; for (let i = 0; i < 4; i++) { const angle = (Math.PI / 2.5) / 3 * (i - 1.5) + Math.PI / 2; this.game.addEntity(new FireballProjectile(this.game, spawnX, spawnY, Math.cos(angle) * 180, Math.sin(angle) * 180, this.collisionDamage)); } } else { if (this.game.player) { for (let i = 0; i < 3; i++) { setTimeout(() => { if (!this.isAlive()) return; const p = this.game.player!; const angle = Math.atan2(p.pos.y - this.pos.y, p.pos.x - this.pos.x); this.game.addEntity(new PlasmaBallProjectile(this.game, this.pos.x + w / 2, this.pos.y + this.height, Math.cos(angle) * 600, Math.sin(angle) * 600, this.collisionDamage)); this.game.uiManager.soundManager.play('enemyShoot'); }, i * 150); } } } } protected render(ctx: CanvasRenderingContext2D): void {
        if (!this.image || !this.image.complete) return;
        const pulse = 1 + Math.sin(Date.now() / 500) * 0.1;
        ctx.globalAlpha = 0.85;
        ctx.shadowColor = `rgba(148, 0, 211, 0.7)`;
        ctx.shadowBlur = 25 * pulse;
        if (this.isPreparingToAttack) {
            const glow = (1 - this.attackPreparationTimer / this.attackPreparationDuration) * 0.9;
            ctx.shadowColor = `rgba(148, 0, 211, ${glow})`;
            ctx.shadowBlur = 20 + glow * 15;
        }
        ctx.drawImage(this.image, this.pos.x, this.pos.y - this.visualOffsetY, this.width, 240);
    }
}
class BossOmegaNexus extends Enemy {
    private baseImage: HTMLImageElement; private ringAngle1: number = 0; private plasmaFlicker: number = 0; private ringRotationSpeed: number = 0.4; private phase: number = 1; private attackTimer: number = 5000; private movementPattern: 'ENTERING' | 'SWOOPING' | 'DRIFTING' = 'ENTERING'; private movementTarget: Vector2D; private isInvulnerable: boolean = false; private visualOffsetY: number; private isPreparingAttack: boolean = false; private preparationTimer: number = 0; private currentAttack: 'CROSSFIRE' | 'LASER_FAN' | 'NEXUS_CANNON' | 'NONE' = 'NONE'; private laserFanActive: boolean = false; private laserFanDuration: number = 3500; private laserFanAngle: number = 0; private laserFanSweepSpeed: number = 0.4; private energyOrbs: { pos: Vector2D, fireCooldown: number, speed: number }[] = []; private isChargingCannon: boolean = false; private cannonChargeTimer: number = 4000; private isFiringCannon: boolean = false; private cannonDurationTimer: number = 3000; private isFinalBattleVersion: boolean; constructor(game: Game, health: number, speedMultiplier: number, isFinalBattleVersion: boolean = false) { const visualWidth = 240; const visualHeight = 184; const hitboxHeight = 110; super(game, game.width / 2 - visualWidth / 2, -visualHeight, visualWidth, hitboxHeight, health, 20000, 'BOSS_OMEGA_NEXUS'); this.visualOffsetY = (visualHeight - hitboxHeight) / 2; this.isBoss = true; this.baseImage = bossOmegaNexusBaseImg; this.collisionDamage = 150; this.movementTarget = new Vector2D(game.width / 2, 80); this.isFinalBattleVersion = isFinalBattleVersion; } takeHit(damage: number): void { if (this.isInvulnerable) return; super.takeHit(damage); if (!this.isAlive()) return; const healthPercentage = this.health / this.maxHealth; if (this.phase === 1 && healthPercentage <= 0.70) this.startPhaseTransition(2); else if (this.phase === 2 && healthPercentage <= 0.35) this.startPhaseTransition(3); } private startPhaseTransition(newPhase: number): void { this.phase = newPhase; this.isInvulnerable = true; this.attackTimer = 2000; this.game.addEntity(new ShockwaveEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.visualOffsetY, '#FFFFFF')); this.game.uiManager.soundManager.play('nuke'); this.ringRotationSpeed += 0.3; if (newPhase === 3) this.spawnEnergyOrbs(); setTimeout(() => { this.isInvulnerable = false; }, this.isFinalBattleVersion ? 1500 : 2500); } update(dt: number): void { const dt_s = dt / 1000; this.ringAngle1 += (this.ringRotationSpeed * 1.0) * dt_s; this.plasmaFlicker = Math.random(); this.handleMovement(dt_s); if (this.movementPattern !== 'SWOOPING') this.attackTimer -= dt; if (this.isPreparingAttack) { this.preparationTimer -= dt; if (this.preparationTimer <= 0) { this.isPreparingAttack = false; this.executeAttack(); } return; } if (this.laserFanActive) { this.updateLaserFan(dt_s); this.laserFanDuration -= dt; if (this.laserFanDuration <= 0) { this.laserFanActive = false; this.movementPattern = 'SWOOPING'; this.selectNewDriftTarget(); } } if (this.isChargingCannon) { this.cannonChargeTimer -= dt; if (this.cannonChargeTimer <= 0) { this.isChargingCannon = false; this.isFiringCannon = true; this.cannonDurationTimer = 3000; this.game.uiManager.soundManager.playLoop('laser'); } } if (this.isFiringCannon) { this.cannonDurationTimer -= dt; if (this.cannonDurationTimer <= 0) { this.isFiringCannon = false; this.movementPattern = 'SWOOPING'; this.selectNewDriftTarget(); this.game.uiManager.soundManager.stopLoop('laser'); } } if (this.phase === 3) this.updateEnergyOrbs(dt_s); if (this.attackTimer <= 0 && this.movementPattern === 'DRIFTING' && !this.isPreparingAttack && !this.laserFanActive && !this.isChargingCannon) this.prepareNextAttack(); } private handleMovement(dt_s: number): void { const speed = this.movementPattern === 'SWOOPING' ? 4 : 1.2; this.pos.x += (this.movementTarget.x - (this.pos.x + this.width / 2)) * speed * dt_s; this.pos.y += (this.movementTarget.y - this.pos.y) * speed * dt_s; this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width)); const dist = Math.hypot(this.movementTarget.x - (this.pos.x + this.width / 2), this.movementTarget.y - this.pos.y); if (dist < 15 && this.movementPattern !== 'DRIFTING') { this.movementPattern = 'DRIFTING'; this.selectNewDriftTarget(); } if (this.movementPattern === 'DRIFTING' && dist < 20) this.selectNewDriftTarget(); } private selectNewDriftTarget(): void { const margin = this.width / 2; const newX = Math.random() * (this.game.width - margin * 2) + margin; this.movementTarget = new Vector2D(newX, 60 + Math.random() * 40); } prepareNextAttack(): void { this.isPreparingAttack = true; this.movementPattern = 'SWOOPING'; const margin = this.width / 2; const newX = this.pos.x > this.game.width / 2 ? margin : this.game.width - margin; switch (this.phase) { case 1: this.currentAttack = 'CROSSFIRE'; this.preparationTimer = 1200; this.attackTimer = 4000; this.movementTarget = new Vector2D(this.game.width / 2, 80); break; case 2: if (Math.random() > 0.4) { this.currentAttack = 'LASER_FAN'; this.preparationTimer = 2000; this.attackTimer = 7000; this.movementTarget = new Vector2D(newX, 80); } else { this.currentAttack = 'CROSSFIRE'; this.preparationTimer = 1200; this.attackTimer = 5000; this.movementTarget = new Vector2D(this.game.width / 2, 80); } break; case 3: const roll = Math.random(); if (roll > 0.65) { this.currentAttack = 'NEXUS_CANNON'; this.preparationTimer = 1500; this.attackTimer = 12000; this.movementTarget = new Vector2D(this.game.width / 2, 60); } else if (roll > 0.3) { this.currentAttack = 'LASER_FAN'; this.preparationTimer = 1800; this.attackTimer = 6000; this.movementTarget = new Vector2D(newX, 80); } else { this.currentAttack = 'CROSSFIRE'; this.preparationTimer = 1000; this.attackTimer = 4000; this.movementPattern = 'DRIFTING'; } break; } } executeAttack(): void { switch (this.currentAttack) { case 'CROSSFIRE': this.fireCrossfirePulse(); if (this.phase < 3) this.movementPattern = 'DRIFTING'; break; case 'LASER_FAN': this.laserFanActive = true; this.laserFanDuration = 3500; this.laserFanAngle = 0; this.laserFanSweepSpeed = (this.pos.x > this.game.width / 2 ? -1 : 1) * 0.3; break; case 'NEXUS_CANNON': this.isChargingCannon = true; this.cannonChargeTimer = 4000; break; } this.currentAttack = 'NONE'; } fireCrossfirePulse(): void { this.game.uiManager.soundManager.play('enemyPlasmaShoot'); const spawnPointLeft = new Vector2D(this.pos.x + 40, this.pos.y + this.height * 0.5 + this.visualOffsetY); const spawnPointRight = new Vector2D(this.pos.x + this.width - 40, this.pos.y + this.height * 0.5 + this.visualOffsetY); const speed = 500; for (let i = 0; i < 5; i++) { const angleLeft = (Math.PI / 4) + (i * (Math.PI / 7)) - ((Math.PI / 7) * 2); const angleRight = (3 * Math.PI / 4) - (i * (Math.PI / 7)) + ((Math.PI / 7) * 2); setTimeout(() => { if (!this.isAlive()) return; this.game.addEntity(new PlasmaBallProjectile(this.game, spawnPointLeft.x, spawnPointLeft.y, Math.cos(angleLeft) * speed, Math.sin(angleLeft) * speed, 35)); this.game.addEntity(new PlasmaBallProjectile(this.game, spawnPointRight.x, spawnPointRight.y, Math.cos(angleRight) * speed, Math.sin(angleRight) * speed, 35)); }, i * 80); } } updateLaserFan(dt_s: number): void { this.laserFanAngle += this.laserFanSweepSpeed * dt_s; const maxAngle = Math.PI / 4; if (Math.abs(this.laserFanAngle) > maxAngle) { this.laserFanSweepSpeed *= -1; this.laserFanAngle = Math.sign(this.laserFanAngle) * maxAngle; } } spawnEnergyOrbs(): void { const orbY = this.pos.y + this.visualOffsetY; this.energyOrbs.push({ pos: new Vector2D(this.pos.x, orbY), fireCooldown: 1500, speed: 120 }, { pos: new Vector2D(this.pos.x + this.width, orbY), fireCooldown: 1500, speed: 120 }); } updateEnergyOrbs(dt_s: number): void { if (!this.game.player) return; const p = this.game.player; this.energyOrbs.forEach(orb => { const targetY = p.pos.y - 100; const angleToTarget = Math.atan2(targetY - orb.pos.y, p.pos.x - orb.pos.x); orb.pos.x += Math.cos(angleToTarget) * orb.speed * dt_s; orb.pos.y += Math.sin(angleToTarget) * orb.speed * dt_s; orb.fireCooldown -= dt_s * 1000; if (orb.fireCooldown <= 0) { this.game.uiManager.soundManager.play('enemyShoot'); const angleToPlayer = Math.atan2(p.pos.y + p.height / 2 - orb.pos.y, p.pos.x + p.width / 2 - orb.pos.x); this.game.addEntity(new PlasmaBallProjectile(this.game, orb.pos.x, orb.pos.y, Math.cos(angleToPlayer) * 400, Math.sin(angleToPlayer) * 400, 30)); orb.fireCooldown = (this.isFinalBattleVersion ? 1000 : 1500) + Math.random() * 800; } }); } private drawNexusRings(ctx: CanvasRenderingContext2D, centerX: number, centerY: number): void { let primaryColor = this.phase === 1 ? '#00FFFF' : this.phase === 2 ? '#EE82EE' : '#FF4136'; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.save(); const corePulse = 1 + Math.sin(Date.now() / 200) * 0.15; const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40 * corePulse); coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)'); coreGrad.addColorStop(0.6, primaryColor); coreGrad.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = coreGrad; ctx.beginPath(); ctx.arc(centerX, centerY, 40 * corePulse, 0, Math.PI * 2); ctx.fill(); ctx.restore(); ctx.save(); ctx.translate(centerX, centerY); ctx.rotate(this.ringAngle1); ctx.lineWidth = 2 + this.plasmaFlicker * 3; ctx.strokeStyle = primaryColor; ctx.globalAlpha = 0.4 + this.plasmaFlicker * 0.4; for (let i = 0; i < 30; i++) { const angle = (i / 30) * Math.PI * 2; const startRadius = 80; const endRadius = 100 + Math.sin(i * 5 + Date.now() / 100) * 20; ctx.beginPath(); ctx.moveTo(Math.cos(angle) * startRadius, Math.sin(angle) * startRadius); ctx.lineTo(Math.cos(angle) * endRadius, Math.sin(angle) * endRadius); ctx.stroke(); } ctx.restore(); ctx.restore(); }
    protected render(ctx: CanvasRenderingContext2D): void {
        if (!this.baseImage || !this.baseImage.complete) return;
        const visualX = this.pos.x;
        const visualY = this.pos.y - this.visualOffsetY;
        const centerX = visualX + this.width / 2;
        const centerY = visualY + this.height / 2 + this.visualOffsetY;

        if (this.isInvulnerable) {
            ctx.save();
            const pulse = 1 + Math.sin(Date.now() / 100) * 0.05;
            ctx.globalAlpha = 0.8;
            ctx.shadowColor = '#FFFFFF';
            ctx.shadowBlur = 40;
            ctx.translate(centerX, centerY);
            ctx.scale(pulse, pulse);
            ctx.translate(-centerX, -centerY);
        }
        ctx.drawImage(this.baseImage, visualX, visualY, this.width, this.height + this.visualOffsetY * 2);
        this.drawNexusRings(ctx, centerX, centerY);
        if (this.isInvulnerable) ctx.restore();

        if (this.isChargingCannon) {
            const chargeRatio = 1 - (this.cannonChargeTimer / 4000);
            const radius = (this.width * 0.4) * chargeRatio;
            if (Math.random() > 0.5) {
                this.game.addEntity(new Particle(this.game, centerX + (Math.random() - 0.5) * 800, centerY + (Math.random() - 0.5) * 800, '#FF4136', 0.3, 4));
            }
            ctx.save();
            const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            grad.addColorStop(0, `rgba(255, 255, 255, ${chargeRatio})`);
            grad.addColorStop(0.8, `rgba(255, 65, 54, ${chargeRatio * 0.7})`);
            grad.addColorStop(1, `rgba(255, 140, 0, 0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        if (this.isFiringCannon) {
            const beamWidth = this.game.width * 1.2;
            const beamX = centerX - beamWidth / 2;
            ctx.save();
            ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + Math.sin(Date.now() / 50) * 0.2})`;
            ctx.fillRect(beamX, visualY, beamWidth, this.game.height);
            const grad = ctx.createLinearGradient(centerX - 150, 0, centerX + 150, 0);
            grad.addColorStop(0, 'rgba(255, 65, 54, 0)');
            grad.addColorStop(0.5, 'rgba(255, 65, 54, 0.6)');
            grad.addColorStop(1, 'rgba(255, 65, 54, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(centerX - 150, visualY, 300, this.game.height);
            ctx.restore();
        }

        if (this.laserFanActive) {
            const laserOriginX = this.pos.x > this.game.width / 2 ? visualX + 40 : visualX + this.width - 40;
            const laserOriginY = centerY;
            for (let i = 0; i < 7; i++) {
                const angle = this.laserFanAngle + (i - 3) * (Math.PI / 2 / 6);
                const endX = laserOriginX + Math.sin(angle) * this.game.height * 1.5;
                const endY = laserOriginY + Math.cos(angle) * this.game.height * 1.5;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(laserOriginX, laserOriginY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = `rgba(255, 0, 255, 0.6)`;
                ctx.lineWidth = 10;
                ctx.shadowColor = '#EE82EE';
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.restore();
            }
        }
        this.energyOrbs.forEach(orb => {
            ctx.save();
            const pulse = Math.sin(Date.now() / 200);
            const radius = 25 + pulse * 5;
            const gradient = ctx.createRadialGradient(orb.pos.x, orb.pos.y, 0, orb.pos.x, orb.pos.y, radius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 100, 100, 1)');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.shadowColor = '#FF4136';
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(orb.pos.x, orb.pos.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
}
class NexusLanceProjectile extends EnemyProjectile { constructor(game: Game, x: number, y: number, vX: number, vY: number) { super(game, x, y, vX, vY, 40); this.width = 6; this.height = 30; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const gradient = ctx.createLinearGradient(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.height); gradient.addColorStop(0, '#FFFFFF'); gradient.addColorStop(0.5, '#FF4136'); gradient.addColorStop(1, '#B10DC9'); ctx.fillStyle = gradient; ctx.shadowColor = '#FF00FF'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.moveTo(this.pos.x + this.width / 2, this.pos.y); ctx.lineTo(this.pos.x, this.pos.y + this.height); ctx.lineTo(this.pos.x + this.width, this.pos.y + this.height); ctx.closePath(); ctx.fill(); ctx.restore(); } }
class BossNexusPrime extends Enemy {
    private phase: number = 1; private attackTimer: number = 4000; private isPreparingAttack: boolean = false; private preparationTimer: number = 0; private currentAttack: 'LANCE' | 'PLASMA_BURST' | 'ORB' | 'SCYTHE' | 'SWEEP' | 'HORIZON' | 'NONE' = 'NONE'; private phaseTransitionTimer: number = 0; private movementPattern: 'ENTERING' | 'DRIFTING' | 'REPOSITIONING' = 'ENTERING'; private movementTarget: Vector2D; private corePulse: number = 0; private scythes: { angle: number, radius: number, speed: number }[] = []; private plasmaSweepProgress: number = -1; private eventHorizonCharge: number = 0; private isFinalBattleVersion: boolean; constructor(game: Game, health: number, speedMultiplier: number, isFinalBattleVersion: boolean = false) { super(game, game.width / 2 - 100, -200, 200, 120, health * (isFinalBattleVersion ? 2.0 : 1.7), 60000, 'BOSS_NEXUS_PRIME'); this.isBoss = true; this.collisionDamage = 300; this.movementTarget = new Vector2D(this.game.width / 2, 120); this.isFinalBattleVersion = isFinalBattleVersion; } takeHit(damage: number): void { if (this.phaseTransitionTimer > 0) return; super.takeHit(damage); if (!this.isAlive()) { if (this.game.gameMode === 'CAMPAIGN' && this.game.level === 50) { this.game.addEntity(new FinalBossExplosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2)); this.game.uiManager.soundManager.play('nuke'); } return; } const healthPercentage = this.health / this.maxHealth; if (this.phase === 1 && healthPercentage <= 0.66) this.transitionToPhase(2); else if (this.phase === 2 && healthPercentage <= 0.33) this.transitionToPhase(3); } private transitionToPhase(newPhase: number): void { this.phase = newPhase; this.phaseTransitionTimer = 3000; this.isPreparingAttack = false; this.currentAttack = 'NONE'; this.attackTimer = 4000; this.scythes = []; this.game.entities.filter(e => e instanceof NexusFragment).forEach(e => e.destroy()); this.game.addEntity(new ShockwaveEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, '#FF4136')); this.game.uiManager.soundManager.play('nuke'); if (newPhase === 2) { for (let i = 0; i < 6; i++) { this.scythes.push({ angle: (i / 6) * Math.PI * 2, radius: 150, speed: (Math.random() - 0.5) * 2 }); } } } private handleMovement(dt_s: number): void { const speed = this.movementPattern === 'REPOSITIONING' ? 3.5 : 0.8; this.pos.x += (this.movementTarget.x - (this.pos.x + this.width / 2)) * speed * dt_s; this.pos.y += (this.movementTarget.y - (this.pos.y + this.height / 2)) * speed * dt_s; const dist = Math.hypot(this.movementTarget.x - (this.pos.x + this.width / 2), this.movementTarget.y - (this.pos.y + this.height / 2)); if (dist < 15) { if (this.movementPattern === 'ENTERING' || this.movementPattern === 'REPOSITIONING') { this.movementPattern = 'DRIFTING'; this.selectNewDriftTarget(); } else if (this.movementPattern === 'DRIFTING') { this.selectNewDriftTarget(); } } } private selectNewDriftTarget(): void { const marginX = this.width / 2 + 50; const marginY = 50; const newX = Math.random() * (this.game.width - marginX * 2) + marginX; const newY = Math.random() * (this.game.height / 3.5 - marginY) + marginY; this.movementTarget = new Vector2D(newX, newY); } update(dt: number): void { const dt_s = dt / 1000; this.corePulse += dt_s * 5; this.handleMovement(dt_s); if (this.phaseTransitionTimer > 0) { this.phaseTransitionTimer -= dt; return; } if (this.isPreparingAttack) { this.preparationTimer -= dt; if (this.preparationTimer <= 0) { this.isPreparingAttack = false; this.executeAttack(); } } else if (this.attackTimer > 0) { this.attackTimer -= dt; } else if (this.plasmaSweepProgress < 0 && this.eventHorizonCharge <= 0) { this.prepareNextAttack(); } this.updateActiveMechanics(dt, dt_s); } private prepareNextAttack(): void { this.isPreparingAttack = true; this.movementPattern = 'REPOSITIONING'; switch (this.phase) { case 1: this.currentAttack = Math.random() > 0.5 ? 'LANCE' : 'ORB'; this.movementTarget = new Vector2D(this.game.width / 2, 100); this.preparationTimer = 2000; this.attackTimer = 6000; break; case 2: const attackChoices = ['SCYTHE', 'SWEEP', 'PLASMA_BURST']; this.currentAttack = attackChoices[Math.floor(Math.random() * attackChoices.length)] as any; if (this.currentAttack === 'SWEEP') { const targetX = this.game.player && this.game.player.pos.x < this.game.width / 2 ? this.game.width - 150 : 150; this.movementTarget = new Vector2D(targetX, this.game.height / 3); } else { this.movementTarget = new Vector2D(this.game.width / 2, 120); } this.preparationTimer = 2500; this.attackTimer = 7000; break; case 3: const finalAttacks = this.isFinalBattleVersion ? ['HORIZON', 'SWEEP', 'LANCE', 'PLASMA_BURST', 'SCYTHE'] : ['HORIZON']; this.currentAttack = finalAttacks[Math.floor(Math.random() * finalAttacks.length)] as any; this.movementTarget = new Vector2D(this.game.width / 2, this.game.height / 2 - 50); this.preparationTimer = this.currentAttack === 'HORIZON' ? 9000 : 2000; this.attackTimer = this.isFinalBattleVersion ? 5000 : 15000; break; } } private executeAttack(): void { const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; switch (this.currentAttack) { case 'LANCE': this.game.uiManager.soundManager.play('bossLanceShoot'); for (let i = 0; i < 8; i++) { const angle = (i / 8) * Math.PI * 2; this.game.addEntity(new NexusLanceProjectile(this.game, centerX, centerY, Math.cos(angle) * 700, Math.sin(angle) * 700)); } break; case 'ORB': if (this.game.entities.filter(e => e instanceof NexusFragment).length < 2) { this.game.addEntity(new NexusFragment(this.game, centerX, centerY)); } break; case 'PLASMA_BURST': if (this.game.player) { const p = this.game.player; const projectileCount = this.isFinalBattleVersion ? 8 : 5; for (let i = 0; i < projectileCount; i++) { setTimeout(() => { if (!this.isAlive()) return; const angle = Math.atan2(p.pos.y - (this.pos.y + this.height / 2), p.pos.x - (this.pos.x + this.width / 2)); const projType = this.isFinalBattleVersion && i % 2 === 0 ? FireballProjectile : PlasmaBallProjectile; this.game.addEntity(new projType(this.game, centerX, centerY, Math.cos(angle) * 600, Math.sin(angle) * 600, 30)); this.game.uiManager.soundManager.play('enemyShoot'); }, i * 150); } } break; case 'SCYTHE': this.scythes.forEach(s => s.speed = (Math.random() > 0.5 ? 1 : -1) * 2.5); setTimeout(() => this.scythes.forEach(s => s.speed = (Math.random() - 0.5) * 2), 2000); break; case 'SWEEP': this.plasmaSweepProgress = 0; this.game.uiManager.soundManager.playLoop('laser'); break; case 'HORIZON': this.eventHorizonCharge = 1; break; } } private updateActiveMechanics(dt: number, dt_s: number): void { this.scythes.forEach(s => s.angle += s.speed * dt_s); if (this.plasmaSweepProgress >= 0) { this.plasmaSweepProgress += dt_s / 5; if (this.plasmaSweepProgress >= 1) { this.plasmaSweepProgress = -1; this.game.uiManager.soundManager.stopLoop('laser'); } } if (this.eventHorizonCharge > 0) { this.eventHorizonCharge = Math.max(0, this.eventHorizonCharge - dt_s / 6); if (this.game.player) { const p = this.game.player; const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const chargeRatio = 1 - (this.preparationTimer > 0 ? this.preparationTimer / 9000 : 0); const safeRadius = (1 - chargeRatio) * this.game.width; const dist = Math.hypot(centerX - (p.pos.x + p.width / 2), centerY - (p.pos.y + p.height / 2)); if (dist > safeRadius) { const angle = Math.atan2(centerY - p.pos.y, centerX - p.pos.x); p.pos.x += Math.cos(angle) * 350 * dt_s; p.pos.y += Math.sin(angle) * 350 * dt_s; } } } } protected render(ctx: CanvasRenderingContext2D): void {
        const centerX = this.pos.x + this.width / 2;
        const centerY = this.pos.y + this.height / 2;
        this.drawCoreWithWhips(ctx, centerX, centerY);
    }
    private drawCoreWithWhips(ctx: CanvasRenderingContext2D, cx: number, cy: number): void { if (!bossNexusPrimeImg || !bossNexusPrimeImg.complete) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const coreColor = this.phase === 1 ? '#00FFFF' : (this.phase === 2 ? '#FF851B' : '#FF4136'); ctx.save(); const pulseValue = 1 + Math.sin(this.corePulse) * 0.05; ctx.globalAlpha = 0.7; ctx.translate(cx, cy); ctx.scale(pulseValue, pulseValue); const ringSize = 180 + this.phase * 20; ctx.drawImage(bossNexusPrimeImg, -ringSize / 2, -ringSize / 2, ringSize, ringSize); ctx.restore(); for (let i = 0; i < 8; i++) { ctx.beginPath(); const baseAngle = (i / 8) * Math.PI * 2; const len = 120 + this.phase * 20 + Math.sin(this.corePulse * 1.5 + i) * 40; const wave = Math.sin(this.corePulse * 3 + i) * 0.6; ctx.moveTo(cx, cy); ctx.quadraticCurveTo(cx + Math.cos(baseAngle + wave) * len * 0.6, cy + Math.sin(baseAngle + wave) * len * 0.6, cx + Math.cos(baseAngle) * len, cy + Math.sin(baseAngle) * len); ctx.strokeStyle = coreColor; ctx.lineWidth = 3 + Math.sin(this.corePulse + i * 2) * 2; ctx.globalAlpha = 0.6 + Math.sin(this.corePulse * 4 + i) * 0.2; ctx.shadowColor = coreColor; ctx.shadowBlur = 15; ctx.stroke(); } const radius = (this.phase === 3 ? 60 : 40) + Math.sin(this.corePulse) * 10; const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius); grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); grad.addColorStop(0.7, coreColor); grad.addColorStop(1, 'rgba(255, 255, 255, 0)'); ctx.fillStyle = grad; ctx.shadowColor = coreColor; ctx.shadowBlur = 30; ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}

class NexusFragment extends Enemy { private fireCooldown: number = 3500; private pulse: number = 0; constructor(game: Game, x: number, y: number) { super(game, x, y, 40, 40, 80, 500, 'NEXUS_FRAGMENT'); } update(dt: number): void { const dt_s = dt / 1000; this.pulse += dt_s * 4; this.fireCooldown -= dt; if (this.fireCooldown <= 0 && this.game.player) { const p = this.game.player; const pAngle = Math.atan2(p.pos.y - (this.pos.y + this.height / 2), p.pos.x - (this.pos.x + this.width / 2)); this.game.uiManager.soundManager.play('enemyPlasmaShoot'); this.game.addEntity(new PlasmaBallProjectile(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, Math.cos(pAngle) * 450, Math.sin(pAngle) * 450, 25)); this.fireCooldown = 4000 + Math.random() * 1500; } } protected render(ctx: CanvasRenderingContext2D): void { const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; const scale = 1 + Math.sin(this.pulse) * 0.1; const radius = (this.width / 2) * scale; const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius); gradient.addColorStop(0, 'rgba(255, 180, 180, 0.9)'); gradient.addColorStop(0.6, 'rgba(255, 0, 0, 0.7)'); gradient.addColorStop(1, 'rgba(139, 0, 0, 0.1)'); ctx.fillStyle = gradient; ctx.shadowColor = '#FF4136'; ctx.shadowBlur = 25; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.fill(); } }

class ShopManager {
    public game: Game;
    public playerUpgrades: IPlayerUpgrades;
    public playerCosmetics: IPlayerCosmetics;
    public playerCollectibles: IPlayerCollectibles;
    public wheelData: IWheelData;
    public pendingPiPurchase: string | null = null;
    public readonly shopItems: IShopItem[];

    public setGame(game: Game) { this.game = game; }

    constructor(game: Game) {
        this.game = game;
        this.playerUpgrades = this.loadUpgrades();
        this.playerCosmetics = this.loadCosmetics();
        this.playerCollectibles = this.loadCollectibles();
        this.wheelData = this.loadWheelData();

        this.shopItems = [
            // --- PERMANENT UPGRADES ---
            { id: 'start_lives', type: 'PERMANENT', nameKey: 'shop_start_lives_name', descKey: 'shop_start_lives_desc', iconSrc: powerupExtraLifeSrc, maxLevel: 5, cost: [150, 450, 1000, 2500, 5000] },
            { id: 'start_energy', type: 'PERMANENT', nameKey: 'shop_start_energy_name', descKey: 'shop_start_energy_desc', iconSrc: powerupRepairKitSrc, maxLevel: 10, cost: [100, 200, 400, 800, 1600, 3200, 5000, 7500, 10000, 15000] },
            { id: 'coin_value', type: 'PERMANENT', nameKey: 'shop_coin_value_name', descKey: 'shop_coin_value_desc', iconSrc: iconCoinValueSrc, maxLevel: 10, cost: [250, 500, 1250, 3000, 7500, 15000, 25000, 40000, 60000, 90000] },
            { id: 'powerup_duration', type: 'PERMANENT', nameKey: 'shop_powerup_duration_name', descKey: 'shop_powerup_duration_desc', iconSrc: iconPowerupDurationSrc, maxLevel: 10, cost: [500, 1000, 2000, 4000, 8000, 12000, 18000, 25000, 35000, 50000] },
            { id: 'luck_chance', type: 'PERMANENT', nameKey: 'shop_luck_chance_name', descKey: 'shop_luck_chance_desc', iconSrc: iconLuckChanceSrc, maxLevel: 5, cost: [1000, 2500, 5000, 10000, 20000] },
            { id: 'special_charge', type: 'PERMANENT', nameKey: 'shop_special_charge_name', descKey: 'shop_special_charge_desc', iconSrc: iconSpecialChargeSrc, maxLevel: 3, cost: [25000, 50000, 75000] },
            { id: 'coin_magnet', type: 'PERMANENT', nameKey: 'shop_coin_magnet_name', descKey: 'shop_coin_magnet_desc', iconSrc: iconCoinMagnetSrc, maxLevel: 1, cost: [10000] },
            { id: 'revive_chance', type: 'PERMANENT', nameKey: 'shop_revive_chance_name', descKey: 'shop_revive_chance_desc', iconSrc: iconReviveChanceSrc, maxLevel: 3, cost: [15000, 30000, 75000] },
            { id: 'special_stack_size', type: 'PERMANENT', nameKey: 'shop_special_stack_name', descKey: 'shop_special_stack_desc', iconSrc: iconSpecialStackSrc, maxLevel: 2, cost: [20000, 50000] },
            { id: 'ultimate_drone_mastery', type: 'ULTIMATE', nameKey: 'shop_ultimate_drone_mastery_name', descKey: 'shop_ultimate_drone_mastery_desc', iconSrc: orbitalDrone1ImgSrc, maxLevel: 1, cost: [75000] },
            { id: 'ultimate_weapon_prestige', type: 'ULTIMATE', nameKey: 'shop_ultimate_weapon_prestige_name', descKey: 'shop_ultimate_weapon_prestige_desc', iconSrc: iconWeaponPrestigeSrc, maxLevel: 1, cost: [125000] },

            // --- CONSUMABLES ---
            { id: 'consume_shield', type: 'CONSUMABLE', nameKey: 'shop_consume_shield_name', descKey: 'shop_consume_shield_desc', iconSrc: powerupShieldSrc, cost: [400], applyEffect: (game) => { game.player?.powerUpManager.activate('SHIELD'); } },
            { id: 'consume_nuke', type: 'CONSUMABLE', nameKey: 'shop_consume_nuke_name', descKey: 'shop_consume_nuke_desc', iconSrc: powerupNukeSrc, cost: [1000], applyEffect: (game) => { game.player?.powerUpManager.collectSpecial('NUKE'); } },
            { id: 'consume_extralife', type: 'CONSUMABLE', nameKey: 'shop_consume_extralife_name', descKey: 'shop_consume_extralife_desc', iconSrc: powerupExtraLifeSrc, cost: [2500], applyEffect: (game) => { if (game.player && game.player.lives < game.player.maxLives) game.player.lives++; } },
            { id: 'consume_ghost', type: 'CONSUMABLE', nameKey: 'shop_consume_ghost_name', descKey: 'shop_consume_ghost_desc', iconSrc: powerupGhostProtocolSrc, cost: [1500], applyEffect: (game) => { game.player?.powerUpManager.activate('GHOST_PROTOCOL', 30000); } },
            { id: 'consume_boss_slayer', type: 'CONSUMABLE', nameKey: 'shop_consume_boss_slayer_name', descKey: 'shop_consume_boss_slayer_desc', iconSrc: iconBossSlayerSrc, cost: [5000], applyEffect: (game) => { game.isBossSlayerActive = true; } },
            { id: 'consume_black_hole', type: 'CONSUMABLE', nameKey: 'shop_consume_black_hole_name', descKey: 'shop_consume_black_hole_desc', iconSrc: powerupBlackHoleSrc, cost: [1200], applyEffect: (game) => { game.player?.powerUpManager.collectSpecial('BLACK_HOLE'); } },
            { id: 'consume_score_boost', type: 'CONSUMABLE', nameKey: 'shop_consume_score_boost_name', descKey: 'shop_consume_score_boost_desc', iconSrc: powerupScoreBoostSrc, cost: [800], applyEffect: (game) => { game.player?.powerUpManager.collectSpecial('SCORE_BOOST'); } },
            { id: 'consume_laser_beam', type: 'CONSUMABLE', nameKey: 'shop_consume_laser_beam_name', descKey: 'shop_consume_laser_beam_desc', iconSrc: powerupLaserBeamSrc, cost: [1750], applyEffect: (game) => { game.player?.powerUpManager.collectUltra('LASER_BEAM'); } },
            { id: 'consume_homing_missiles', type: 'CONSUMABLE', nameKey: 'shop_consume_homing_missiles_name', descKey: 'shop_consume_homing_missiles_desc', iconSrc: powerupHomingMissilesSrc, cost: [1750], applyEffect: (game) => { game.player?.powerUpManager.collectUltra('HOMING_MISSILES'); } },
            { id: 'consume_rapid_fire', type: 'CONSUMABLE', nameKey: 'shop_consume_rapid_fire_name', descKey: 'shop_consume_rapid_fire_desc', iconSrc: powerupRapidFireSrc, cost: [1000], applyEffect: (game) => { game.player?.powerUpManager.activate('RAPID_FIRE'); } },
            { id: 'consume_side_shots', type: 'CONSUMABLE', nameKey: 'shop_consume_side_shots_name', descKey: 'shop_consume_side_shots_desc', iconSrc: powerupSideShotsSrc, cost: [1000], applyEffect: (game) => { game.player?.powerUpManager.activate('SIDE_SHOTS'); } },
            { id: 'consume_orbital_drone', type: 'CONSUMABLE', nameKey: 'shop_consume_orbital_drone_name', descKey: 'shop_consume_orbital_drone_desc', iconSrc: powerupOrbitalDroneSrc, cost: [2000], applyEffect: (game) => { game.player?.powerUpManager.activate('ORBITAL_DRONE'); } },

            // --- SKINS & COSMETICS ---
            { id: 'skin_sentinel', type: 'SKIN', nameKey: 'shop_skin_sentinel_name', descKey: 'shop_skin_sentinel_desc', iconSrc: playerImgSrc2, cost: [10000], cosmeticType: 'player_skin' },
            { id: 'skin_renegade', type: 'SKIN', nameKey: 'shop_skin_renegade_name', descKey: 'shop_skin_renegade_desc', iconSrc: playerImgSrc3, cost: [15000], cosmeticType: 'player_skin' },
            { id: 'skin_avenger', type: 'SKIN', nameKey: 'shop_skin_avenger_name', descKey: 'shop_skin_avenger_desc', iconSrc: playerImgSrc4, cost: [20000], cosmeticType: 'player_skin' },
            { id: 'skin_void', type: 'SKIN', nameKey: 'shop_skin_void_name', descKey: 'shop_skin_void_desc', iconSrc: playerImgSrcVoid, cost: [25000], cosmeticType: 'player_skin' },
            { id: 'skin_marauder', type: 'SKIN', nameKey: 'shop_skin_marauder_name', descKey: 'shop_skin_marauder_desc', iconSrc: playerImgSrcMarauder, cost: [30000], cosmeticType: 'player_skin' },
            { id: 'skin_paladin', type: 'SKIN', nameKey: 'shop_skin_paladin_name', descKey: 'shop_skin_paladin_desc', iconSrc: playerImgSrcPaladin, cost: [30000], cosmeticType: 'player_skin' },
            { id: 'skin_spectre', type: 'SKIN', nameKey: 'shop_skin_spectre_name', descKey: 'shop_skin_spectre_desc', iconSrc: playerImgSrcSpectre, cost: [40000], cosmeticType: 'player_skin' },
            { id: 'skin_gold', type: 'SKIN', nameKey: 'shop_skin_gold_name', descKey: 'shop_skin_gold_desc', iconSrc: playerImgSrcGold, cost: [50000], cosmeticType: 'player_skin' },
            { id: 'skin_goliath', type: 'SKIN', nameKey: 'shop_skin_goliath_name', descKey: 'shop_skin_goliath_desc', iconSrc: playerImgSrcGoliath, cost: [60000], cosmeticType: 'player_skin' },
            { id: 'skin_juggernaut', type: 'SKIN', nameKey: 'shop_skin_juggernaut_name', descKey: 'shop_skin_juggernaut_desc', iconSrc: playerImgSrcJuggernaut, cost: [75000], cosmeticType: 'player_skin' },
            { id: 'skin_leviathan', type: 'SKIN', nameKey: 'shop_skin_leviathan_name', descKey: 'shop_skin_leviathan_desc', iconSrc: playerImgSrcLeviathan, cost: [100000], cosmeticType: 'player_skin' },
            { id: 'proj_green', type: 'COSMETIC', nameKey: 'shop_proj_green_name', descKey: 'shop_proj_green_desc', iconSrc: iconProjGreenSrc, cost: [5000], cosmeticType: 'projectile_style' },
            { id: 'proj_fireball', type: 'COSMETIC', nameKey: 'shop_proj_fireball_name', descKey: 'shop_proj_fireball_desc', iconSrc: iconProjFireballSrc, cost: [7500], cosmeticType: 'projectile_style' },
            { id: 'proj_purple', type: 'COSMETIC', nameKey: 'shop_proj_purple_name', descKey: 'shop_proj_purple_desc', iconSrc: iconProjVoidSrc, cost: [7500], cosmeticType: 'projectile_style' },
            { id: 'proj_rainbow', type: 'COSMETIC', nameKey: 'shop_proj_rainbow_name', descKey: 'shop_proj_rainbow_desc', iconSrc: iconProjRainbowSrc, cost: [15000], cosmeticType: 'projectile_style' },
            { id: 'trail_rainbow', type: 'COSMETIC', nameKey: 'shop_trail_rainbow_name', descKey: 'shop_trail_rainbow_desc', iconSrc: iconTrailRainbowSrc, cost: [12000], cosmeticType: 'engine_trail' },

            // --- PI BUNDLES & LICENSES ---
            { id: 'premium_license', type: 'PI_BUNDLE', nameKey: 'shop_premium_license_name', descKey: 'shop_premium_license_desc', iconSrc: piCoin2ImgSrc, pi_cost: 2.0, coin_reward: 0 },
            { id: 'pi_bundle_1', type: 'PI_BUNDLE', nameKey: 'shop_pi_bundle_1_name', descKey: 'shop_pi_bundle_1_desc', iconSrc: piCoin2ImgSrc, pi_cost: 0.1, coin_reward: 1000 },
            { id: 'pi_bundle_2', type: 'PI_BUNDLE', nameKey: 'shop_pi_bundle_2_name', descKey: 'shop_pi_bundle_2_desc', iconSrc: piCoin2ImgSrc, pi_cost: 0.5, coin_reward: 5500 },
            { id: 'pi_bundle_3', type: 'PI_BUNDLE', nameKey: 'shop_pi_bundle_3_name', descKey: 'shop_pi_bundle_3_desc', iconSrc: piCoin2ImgSrc, pi_cost: 1.0, coin_reward: 12000 },
            { id: 'pi_bundle_4', type: 'PI_BUNDLE', nameKey: 'shop_pi_bundle_4_name', descKey: 'shop_pi_bundle_4_desc', iconSrc: piCoin2ImgSrc, pi_cost: 5.0, coin_reward: 65000 },
            { id: 'pi_bundle_5', type: 'PI_BUNDLE', nameKey: 'shop_pi_bundle_5_name', descKey: 'shop_pi_bundle_5_desc', iconSrc: piCoin2ImgSrc, pi_cost: 10.0, coin_reward: 150000 },

            // --- COLLECTIBLES (PREISE AKTUALISIERT) ---
            {
                id: 'collectible_paradise', type: 'COLLECTIBLE',
                nameKey: 'collectible_paradise_name', descKey: 'collectible_paradise_bonus_desc',
                storyKey: 'collectible_paradise_story', iconSrc: collectibleParadiseSrc,
                pi_cost: 10, bonusKey: 'COIN_BOOST'
            },
            {
                id: 'collectible_sporestrike', type: 'COLLECTIBLE',
                nameKey: 'collectible_sporestrike_name', descKey: 'collectible_sporestrike_bonus_desc',
                storyKey: 'collectible_sporestrike_story', iconSrc: collectibleSporestrikeSrc,
                pi_cost: 10, bonusKey: 'LUCK_BOOST'
            },
            {
                id: 'collectible_potassium', type: 'COLLECTIBLE',
                nameKey: 'collectible_potassium_name', descKey: 'collectible_potassium_bonus_desc',
                storyKey: 'collectible_potassium_story', iconSrc: collectiblePotassiumSrc,
                pi_cost: 10, bonusKey: 'DURATION_BOOST'
            },
            {
                id: 'collectible_retrogamer', type: 'COLLECTIBLE',
                nameKey: 'collectible_retrogamer_name', descKey: 'collectible_retrogamer_bonus_desc',
                storyKey: 'collectible_retrogamer_story', iconSrc: collectibleRetrogamerSrc,
                pi_cost: 10, bonusKey: 'START_POWERUP'
            },
            {
                id: 'collectible_mazerunner', type: 'COLLECTIBLE',
                nameKey: 'collectible_mazerunner_name', descKey: 'collectible_mazerunner_bonus_desc',
                storyKey: 'collectible_mazerunner_story', iconSrc: collectibleMazeRunnerSrc,
                pi_cost: 10, bonusKey: 'GHOST_CHANCE'
            },
            {
                id: 'collectible_koopaking', type: 'COLLECTIBLE',
                nameKey: 'collectible_koopaking_name', descKey: 'collectible_koopaking_bonus_desc',
                storyKey: 'collectible_koopaking_story', iconSrc: collectibleKoopaKingSrc,
                pi_cost: 10, bonusKey: 'MAX_ENERGY_BOOST'
            }
        ];
    }

    public loadUpgrades = (): IPlayerUpgrades => {
        const piUid = this.game.piManager?.uid || (window as any).piManagerInstance?.uid;
        // if (piUid && piUid !== 'UNREGISTERED') return {}; // Server-Load abwarten

        try {
            const d = localStorage.getItem('galaxyFallUpgrades');
            return (d && d !== 'undefined' && d !== 'null') ? JSON.parse(d) : {};
        } catch (e) { return {}; }
    };
    public saveUpgrades = (): void => { localStorage.setItem('galaxyFallUpgrades', JSON.stringify(this.playerUpgrades)); this.game.saveGameData(); };

    public loadCosmetics = (): IPlayerCosmetics => {
        const fallBack = {
            unlocked_skins: ['skin_default'],
            unlocked_projectiles: ['default'],
            unlocked_trails: ['default'],
            equipped_skin: 'skin_default',
            equipped_projectile: 'default',
            equipped_trail: 'default',
        };
        const piUid = this.game.piManager?.uid || (window as any).piManagerInstance?.uid;
        // if (piUid && piUid !== 'UNREGISTERED') return fallBack; // Server-Load abwarten

        try {
            const d = localStorage.getItem('galaxyFallCosmetics');
            const data = (d && d !== 'undefined' && d !== 'null') ? JSON.parse(d) : fallBack;
            // Ensure array properties exist (Firefox Fix / Versioning)
            return {
                ...fallBack,
                ...data,
                unlocked_skins: data.unlocked_skins || fallBack.unlocked_skins,
                unlocked_projectiles: data.unlocked_projectiles || fallBack.unlocked_projectiles,
                unlocked_trails: data.unlocked_trails || fallBack.unlocked_trails
            };
        } catch (e) { return fallBack; }
    };
    public saveCosmetics = (): void => {
        localStorage.setItem('galaxyFallCosmetics', JSON.stringify(this.playerCosmetics));
        this.game.saveGameData();
        if (typeof (window as any).refreshAllSelections === 'function') (window as any).refreshAllSelections();
    };

    public loadCollectibles = (): IPlayerCollectibles => {
        const fallBack: IPlayerCollectibles = { unlocked_collectibles: [], equipped_collectible: null, minted_collectibles: [] };
        const piUid = this.game.piManager?.uid || (window as any).piManagerInstance?.uid;
        // if (piUid && piUid !== 'UNREGISTERED') return fallBack; // Server-Load abwarten

        try {
            const d = localStorage.getItem('galaxyFallCollectibles');
            if (d && d !== 'undefined' && d !== 'null') {
                const parsed = JSON.parse(d);
                // Ensure minted_collectibles exists even if loading old save
                if (!parsed.minted_collectibles) parsed.minted_collectibles = [];
                if (!parsed.minted_metadata) parsed.minted_metadata = {};
                return parsed;
            }
            return fallBack;
        } catch (e) { return fallBack; }
    };
    public saveCollectibles = (): void => {
        localStorage.setItem('galaxyFallCollectibles', JSON.stringify(this.playerCollectibles));
        this.game.saveGameData();
        if (typeof (window as any).refreshAllSelections === 'function') (window as any).refreshAllSelections();
    };

    public loadWheelData = (): IWheelData => {
        const data = localStorage.getItem('galaxyFallWheel');
        const defaultData: IWheelData = {
            lastFreeSpin: 0,
            adSpinsToday: 0,
            lastAdReset: Date.now(),
            nextFreeSpinAt: 0,  // 0 = available immediately
            inventory: { specials: [], ultras: [], extraRevives: 0 }
        };

        if (!data) return defaultData;

        try {
            const parsed = JSON.parse(data);
            // Reset ad spins every 6 hours (synced with user request)
            const now = Date.now();
            if (now - parsed.lastAdReset > 6 * 60 * 60 * 1000) {
                parsed.adSpinsToday = 0;
                parsed.lastAdReset = now;
            }
            // Ensure inventory exists
            if (!parsed.inventory) parsed.inventory = defaultData.inventory;
            return { ...defaultData, ...parsed };
        } catch (e) {
            return defaultData;
        }
    }
    public saveWheelData = (): void => {
        localStorage.setItem('galaxyFallWheel', JSON.stringify(this.wheelData));
    };

    public getUpgradeLevel = (itemId: string): number => this.playerUpgrades[itemId] || 0;

    public getCost(item: IShopItem): number | null {
        if (item.pi_cost) return item.pi_cost;
        if (!item.cost) return null;
        if (item.type === 'PERMANENT' || item.type === 'ULTIMATE') {
            if (!item.maxLevel) return null;
            const currentLevel = this.getUpgradeLevel(item.id);
            if (currentLevel >= item.maxLevel) return null;
            return item.cost[currentLevel]!;
        }
        if (item.type === 'CONSUMABLE' || item.type === 'COSMETIC' || item.type === 'SKIN') {
            return item.cost[0]!;
        }
        return null;
    }

    public async purchaseItem(itemId: string): Promise<boolean> {
        const item = this.shopItems.find(i => i.id === itemId);
        if (!item) return false;

        // Pi-Zahlungen werden durch ihre eigene Route gespeichert
        if (item.type === 'PI_BUNDLE' || item.type === 'COLLECTIBLE') {
            // Check if already being purchased or already unlocked
            const isUnlockedCollectible = item.type === 'COLLECTIBLE' && (this.playerCollectibles.unlocked_collectibles || []).includes(item.id);
            if (isUnlockedCollectible) return false;
            if (item.id === 'premium_license' && this.game.hasPremiumLicense) return false;

            if (this.pendingPiPurchase === item.id) return false;

            this.game.piManager.createPayment(item);
            // We tell UI it started. Re-render shop happens via createPayment's callbacks or immediate call
            this.game.uiManager.renderShop();
            return true;
        }

        const cost = this.getCost(item);
        if (cost === null || this.game.coins < cost) {
            this.game.uiManager.soundManager.play('uiError');
            return false;
        }

        const { uid } = this.game.getPlayerIdentity();
        if (!uid || uid === 'UNREGISTERED') return false;

        try {
            const res = await fetch(`${API_BASE_URL}/buy-item`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pi_uid: uid,
                    itemId: item.id,
                    itemType: item.type,
                    cosmeticType: item.cosmeticType,
                    cost: cost,
                    maxLevel: item.maxLevel
                })
            });

            if (!res.ok) throw new Error("Kauf abgelehnt");
            const data = await res.json();

            // Server-BestÃ¤tigung: Kontostand vom Server als absolute Wahrheit Ã¼bernehmen
            this.game.coins = data.newBalance;
            // syncGlobalGFC wurde bereits Ã¼ber den Setter aufgerufen

            // Der Server hat den Kauf bereits atomar verbucht.
            // Wir lassen die Session-Coins unverÃ¤ndert, da sie beim nÃ¤chsten Sync
            // ohnehin addiert werden. Ein Reset hier wÃ¼rde sie lÃ¶schen.

            if (item.type === 'PERMANENT' || item.type === 'ULTIMATE') {
                this.playerUpgrades = data.upgrades;
                // saveUpgrades() triggert saveGameData() -> aber Session-Coins sind jetzt 0, also sicher
                this.saveUpgrades();
            } else if (item.type === 'CONSUMABLE' && item.applyEffect) {
                item.applyEffect(this.game);
            } else if (item.type === 'COSMETIC' || item.type === 'SKIN') {
                this.playerCosmetics = data.cosmetics;
                this.saveCosmetics();
                this.equipCosmetic(item.id, item.cosmeticType as any);
            }

            // UI sofort aktualisieren
            if (this.game.uiManager.update) this.game.uiManager.update();
            this.game.uiManager.renderShop(); // Real-time sync for shop items
            if ((window as any).updateHubUI) (window as any).updateHubUI();

            // Sync with Hub context if active (to avoid old data overwrite on return)
            if ((window as any).dummyGameContext) {
                const dummy = (window as any).dummyGameContext;
                if (dummy.shopManager) {
                    dummy.shopManager.playerUpgrades = JSON.parse(JSON.stringify(this.playerUpgrades));
                    dummy.shopManager.playerCosmetics = JSON.parse(JSON.stringify(this.playerCosmetics));
                    dummy.shopManager.playerCollectibles = JSON.parse(JSON.stringify(this.playerCollectibles));
                    dummy.shopManager.saveUpgrades();
                    dummy.shopManager.saveCosmetics();
                    dummy.shopManager.saveCollectibles();
                }
            }

            let maxLevelReached = false;
            if ((item.type === 'PERMANENT' || item.type === 'ULTIMATE') && item.maxLevel && this.playerUpgrades[item.id] >= item.maxLevel) {
                maxLevelReached = true;
            }
            this.game.achievementManager.check('item_purchased', maxLevelReached ? 'max_level_reached' : undefined);

            return true;
        } catch (e) {
            console.error("Purchase failed", e);
            this.game.uiManager.soundManager.play('uiError');
            return false;
        }
    }

    public equipCosmetic(itemId: string, type: 'player_skin' | 'projectile_style' | 'engine_trail') {
        if (type === 'player_skin') { this.playerCosmetics.equipped_skin = itemId; }
        else if (type === 'projectile_style') { this.playerCosmetics.equipped_projectile = itemId; }
        else if (type === 'engine_trail') { this.playerCosmetics.equipped_trail = itemId; }
        this.saveCosmetics();

        const { uid } = this.game.getPlayerIdentity();
        if (uid && uid !== 'UNREGISTERED') {
            fetch(`${API_BASE_URL}/equip-item`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pi_uid: uid, itemId, equipCategory: type })
            }).catch(e => console.error(e));
        }
    }

    public isCosmeticUnlocked(itemId: string, type: 'player_skin' | 'projectile_style' | 'engine_trail'): boolean {
        if (!this.playerCosmetics) return false;
        if (itemId === 'skin_default' || itemId === 'default') return true; // Default is always free
        if (type === 'player_skin') { return (this.playerCosmetics.unlocked_skins || []).includes(itemId); }
        else if (type === 'projectile_style') { return (this.playerCosmetics.unlocked_projectiles || []).includes(itemId); }
        else if (type === 'engine_trail') { return (this.playerCosmetics.unlocked_trails || []).includes(itemId); }
        return false;
    }

    public equipCollectible(itemId: string | null) {
        if (!this.playerCollectibles.unlocked_collectibles) {
            this.playerCollectibles.unlocked_collectibles = [];
        }

        if (!itemId || this.playerCollectibles.unlocked_collectibles.includes(itemId)) {
            this.playerCollectibles.equipped_collectible = itemId;
            this.saveCollectibles();
            this.game.updateCollectibleBonus();

            const { uid } = this.game.getPlayerIdentity();
            if (uid && uid !== 'UNREGISTERED') {
                fetch(`${API_BASE_URL}/equip-item`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pi_uid: uid, itemId: itemId, equipCategory: 'collectible' })
                }).catch(e => console.error(e));
            }
        }
    }

    public getEquippedCollectibleBonus(): string | null {
        const equippedId = this.playerCollectibles.equipped_collectible;
        if (!equippedId) return null;
        const item = this.shopItems.find(i => i.id === equippedId);
        return item?.bonusKey || null;
    }

    public unlockSkin(skinId: string) {
        if (!this.playerCosmetics.unlocked_skins) this.playerCosmetics.unlocked_skins = [];
        if (!this.playerCosmetics.unlocked_skins.includes(skinId)) {
            this.playerCosmetics.unlocked_skins.push(skinId);
            this.saveCosmetics();
            const { uid } = this.game.getPlayerIdentity();
            if (uid && uid !== 'UNREGISTERED') {
                fetch(`${API_BASE_URL}/unlock-reward`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pi_uid: uid, itemId: skinId, type: 'skin' })
                }).catch(e => console.error(e));
            }
        }
    }

    public unlockCollectible(collId: string) {
        if (!this.playerCollectibles.unlocked_collectibles) this.playerCollectibles.unlocked_collectibles = [];
        if (!this.playerCollectibles.unlocked_collectibles.includes(collId)) {
            this.playerCollectibles.unlocked_collectibles.push(collId);
            this.saveCollectibles();
            const { uid } = this.game.getPlayerIdentity();
            if (uid && uid !== 'UNREGISTERED') {
                fetch(`${API_BASE_URL}/unlock-reward`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pi_uid: uid, itemId: collId, type: 'collectible' })
                }).catch(e => console.error(e));
            }
        }
    }

    public getInitialPlayerStats(): { lives: number, energy: number, speed: number, maxEnergy: number } {
        const baseLives = 3;
        const baseEnergy = 100;
        const baseSpeed = 560;
        const bonusLives = this.getUpgradeLevel('start_lives');
        const bonusEnergy = this.getUpgradeLevel('start_energy') * 10;
        let totalEnergy = baseEnergy + bonusEnergy;

        // Apply +100% Energy Bonus if Koopa King is equipped
        if (this.getEquippedCollectibleBonus() === 'MAX_ENERGY_BOOST') {
            totalEnergy *= 2;
        }

        return { lives: baseLives + bonusLives, energy: totalEnergy, maxEnergy: totalEnergy, speed: baseSpeed, };
    }
}

class SoundManager {
    public audioCtx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    public uiManager: UIManager;
    private musicPlaying: boolean = false;
    private musicScheduler: number | null = null;
    private currentStep: number = 0;
    private readonly bpm: number = 160;
    private readonly stepsPerBeat: number = 4;
    private readonly totalSteps: number = 64;
    private stepDuration: number;
    private scheduleAheadTime: number = 0.1;
    private nextNoteTime: number = 0.0;
    private currentTrack: 'normal' | 'boss' | 'menu' = 'menu';
    private leadMelody: number[] = [];
    private bassLine: number[] = [];
    private arpeggioMelody: number[] = [];
    private kickPattern: boolean[] = [];
    private snarePattern: boolean[] = [];
    private hihatPattern: boolean[] = [];
    private bossLeadMelody: number[] = [];
    private bossBassLine: number[] = [];
    private bossArpeggioMelody: number[] = [];
    private bossKickPattern: boolean[] = [];
    private bossSnarePattern: boolean[] = [];
    private bossHihatPattern: boolean[] = [];
    private shootTier1Buffer: AudioBuffer | null = null;
    private shootTier2Buffer: AudioBuffer | null = null;
    private shootTier3Buffer: AudioBuffer | null = null;
    private shootTier4Buffer: AudioBuffer | null = null;
    private blackHoleBuffer: AudioBuffer | null = null;
    private laserBuffer: AudioBuffer | null = null;
    private droneTier1Buffer: AudioBuffer | null = null;
    private droneTier2Buffer: AudioBuffer | null = null;
    private droneTier3Buffer: AudioBuffer | null = null;
    private coinCollectBuffer: AudioBuffer | null = null;
    private powerupCollectBuffer: AudioBuffer | null = null;
    private enemyExplosionBuffer: AudioBuffer | null = null;
    private nukeBuffer: AudioBuffer | null = null;
    private missileLaunchBuffer: AudioBuffer | null = null;
    private menuMusicBuffer: AudioBuffer | null = null;
    private menuMusicSource: AudioBufferSourceNode | null = null;
    private continuousSounds: { [key: string]: AudioBufferSourceNode } = {};

    constructor(uiManager: UIManager) {
        this.uiManager = uiManager;
        this.stepDuration = 60.0 / this.bpm / this.stepsPerBeat;
        this.defineMusicPatterns();
        this.defineBossMusicPatterns();
    }

    private async loadAudioFile(url: string): Promise<AudioBuffer | null> { if (!this.audioCtx) return null; try { const response = await fetch(url); const arrayBuffer = await response.arrayBuffer(); return await this.audioCtx.decodeAudioData(arrayBuffer); } catch (e) { console.error(`Fehler beim Laden der Audiodatei: ${url}`, e); return null; } }
    public async loadSounds() { this.shootTier1Buffer = await this.loadAudioFile(shootTier1Src); this.shootTier2Buffer = await this.loadAudioFile(shootTier2Src); this.shootTier3Buffer = await this.loadAudioFile(shootTier3Src); this.shootTier4Buffer = await this.loadAudioFile(shootTier4Src); this.blackHoleBuffer = await this.loadAudioFile(blackHoleSrc); this.laserBuffer = await this.loadAudioFile(laserSoundSrc); this.droneTier1Buffer = await this.loadAudioFile(droneTier1SoundSrc); this.droneTier2Buffer = await this.loadAudioFile(droneTier2SoundSrc); this.droneTier3Buffer = await this.loadAudioFile(droneTier3SoundSrc); this.coinCollectBuffer = await this.loadAudioFile(coinCollectSoundSrc); this.powerupCollectBuffer = await this.loadAudioFile(powerupCollectSoundSrc); this.enemyExplosionBuffer = await this.loadAudioFile(enemyExplosionSoundSrc); this.nukeBuffer = await this.loadAudioFile(nukeSoundSrc); this.missileLaunchBuffer = await this.loadAudioFile(missileLaunchSoundSrc); this.menuMusicBuffer = await this.loadAudioFile(menuMusicSrc); }
    public initAudio(): void { if (this.audioCtx && this.audioCtx.state === 'running') { return; } try { if (!this.audioCtx || this.audioCtx.state === 'closed') { this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)(); this.audioCtx.onstatechange = () => { if (this.audioCtx?.state === 'running') { this.recoveryCheck(); } }; this.masterGain = this.audioCtx.createGain(); this.masterGain.connect(this.audioCtx.destination); this.loadSounds(); this.continuousSounds = {}; } if (this.audioCtx.state !== 'running') { this.audioCtx.resume().then(() => this.recoveryCheck()).catch(() => { }); } this.setVolume(this.uiManager.settings.masterVolume); this.toggleMusic(this.uiManager.settings.music); } catch (e) { console.error("Web Audio API is not supported or failed to initialize", e); } }
    public recoveryCheck(): void { if (!this.audioCtx || !this.uiManager.settings.music) return; if (this.currentTrack === 'menu') { this.stopMenuMusic(); if (this.audioCtx.state === 'running') this.playMenuMusic(); } else if (this.currentTrack === 'normal' || this.currentTrack === 'boss') { this.stopProceduralMusic(); if (this.audioCtx.state === 'running') this.startProceduralMusic(); } }
    defineMusicPatterns() { const N = { C2: 65.41, G2: 98, Ab2: 103.83, Eb2: 77.78, C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196, Ab3: 207.65, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392, Ab4: 415.3, Bb4: 466.16 }; const R = 0; this.leadMelody = [N.G4, R, N.Eb4, R, N.G4, R, N.F4, R, N.Eb4, R, N.D4, R, N.C4, R, R, R, N.G4, R, N.Eb4, R, N.G4, R, N.F4, R, N.G4, N.Ab4, N.G4, N.F4, N.Eb4, R, R, R, N.Ab4, R, N.F4, R, N.Ab4, R, N.G4, R, N.F4, R, N.Eb4, R, N.C4, R, N.Eb4, R, N.G4, N.F4, N.Eb4, R, N.D4, R, N.C4, R, N.C4, R, R, R, R, R, R, R]; this.bassLine = [...Array(16).fill(N.C2), ...Array(16).fill(N.G2), ...Array(16).fill(N.Ab2), ...Array(16).fill(N.Eb2)]; const A_C = [N.C4, N.Eb4, N.G4, N.Eb4], A_G = [N.G3, N.Bb3, N.D4, N.Bb3], A_A = [N.Ab3, N.C4, N.Eb4, N.C4], A_E = [N.Eb3, N.G3, N.Bb3, N.G3]; this.arpeggioMelody = [...A_C, ...A_C, ...A_C, ...A_C, ...A_G, ...A_G, ...A_G, ...A_G, ...A_A, ...A_A, ...A_A, ...A_A, ...A_E, ...A_E, ...A_E, ...A_E]; const K = true, S = true, H = true, o = false; this.kickPattern = [K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, o, o, K, o, K, o, K, o, o, o]; this.snarePattern = [o, o, o, o, S, o, o, o, o, o, o, o, S, o, o, o, o, o, o, o, S, o, o, o, o, o, o, o, S, o, o, o, o, o, o, o, S, o, o, o, o, o, o, o, S, o, o, o, o, o, o, o, S, o, o, o, o, o, S, o, S, o, S, o]; this.hihatPattern = [H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, o, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, o, H, o, H, o, H, o, H, H, H, o, H, H, H, o]; }
    defineBossMusicPatterns() { const N = { A2: 110, E2: 82.41, F2: 87.31, G2: 98, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, Gs4: 415.3, A4: 440 }; const R = 0; this.bossLeadMelody = [N.A4, N.A4, R, N.Gs4, R, N.A4, R, N.E4, N.F4, N.F4, R, N.E4, R, N.D4, R, N.C4, N.A4, N.A4, R, N.Gs4, R, N.A4, R, N.E4, N.F4, R, N.E4, R, N.D4, R, N.C4, R, N.A4, N.A4, R, N.Gs4, R, N.A4, R, N.E4, N.F4, N.F4, R, N.E4, R, N.D4, R, N.C4, N.B3, N.C4, N.D4, N.E4, N.F4, N.E4, N.D4, N.C4, N.B3, R, R, R, R, R, R, R]; this.bossBassLine = [...Array(16).fill(N.A2), ...Array(16).fill(N.G2), ...Array(16).fill(N.F2), ...Array(16).fill(N.E2)]; const A_A = [N.A3, N.C4, N.E4, N.C4], A_G = [N.G2, N.B3, N.D4, N.B3], A_F = [N.F2, N.A3, N.C4, N.A3], A_E = [N.E2, N.Gs4, N.B3, N.Gs4]; this.bossArpeggioMelody = [...A_A, ...A_A, ...A_A, ...A_A, ...A_G, ...A_G, ...A_G, ...A_G, ...A_F, ...A_F, ...A_F, ...A_F, ...A_E, ...A_E, ...A_E, ...A_E]; const K = true, S = true, H = true, o = false; const r = (p: boolean[], t: number) => Array(t).fill(p).flat(); this.bossKickPattern = r([K, K, o, o, K, o, o, o, K, K, o, o, K, o, o, K], 4); this.bossSnarePattern = r([o, o, o, o, S, o, o, o, o, o, o, o, S, o, S, o], 4); this.bossHihatPattern = r([H, H, H, H, H, H, H, H, H, H, H, H, H, H, H, H], 4); }
    setTrack(trackName: 'normal' | 'boss' | 'menu') { if (!this.audioCtx || this.currentTrack === trackName) return; this.currentTrack = trackName; this.stopProceduralMusic(); this.stopMenuMusic(); if (!this.uiManager.settings.music) return; if (trackName === 'menu') { this.playMenuMusic(); } else { this.startProceduralMusic(); } }
    private playMenuMusic() { if (!this.audioCtx || !this.masterGain || !this.menuMusicBuffer || this.menuMusicSource) return; const menuMusicGain = this.audioCtx.createGain(); menuMusicGain.gain.value = 0.2; this.menuMusicSource = this.audioCtx.createBufferSource(); this.menuMusicSource.buffer = this.menuMusicBuffer; this.menuMusicSource.loop = true; this.menuMusicSource.connect(menuMusicGain); menuMusicGain.connect(this.masterGain); this.menuMusicSource.start(); }
    private stopMenuMusic() { if (this.menuMusicSource) { this.menuMusicSource.stop(); this.menuMusicSource.disconnect(); this.menuMusicSource = null; } }
    private startProceduralMusic() { if (!this.audioCtx || this.musicScheduler !== null) return; this.currentStep = 0; this.nextNoteTime = this.audioCtx.currentTime; this.musicScheduler = window.setInterval(() => this.scheduler(), 25); }
    private stopProceduralMusic() { if (this.musicScheduler !== null) { clearInterval(this.musicScheduler); this.musicScheduler = null; } }
    playNote(freq: number, time: number, duration: number, type: OscillatorType, volMultiplier: number = 1) { if (!this.audioCtx || !this.masterGain || freq === 0) return; const osc = this.audioCtx.createOscillator(); const gain = this.audioCtx.createGain(); osc.connect(gain); gain.connect(this.masterGain); osc.type = type; osc.frequency.setValueAtTime(freq, time); const noteVol = volMultiplier * this.uiManager.settings.masterVolume; gain.gain.setValueAtTime(noteVol, time); gain.gain.exponentialRampToValueAtTime(0.0001, time + duration); osc.start(time); osc.stop(time + duration); }
    playDrum(type: 'kick' | 'snare' | 'hihat', time: number) { if (!this.audioCtx || !this.masterGain) return; const noiseSource = this.audioCtx.createBufferSource(); const bufferSize = this.audioCtx.sampleRate * 0.2; const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; } noiseSource.buffer = buffer; const filter = this.audioCtx.createBiquadFilter(); const gain = this.audioCtx.createGain(); noiseSource.connect(filter); filter.connect(gain); gain.connect(this.masterGain); const drumVol = this.uiManager.settings.masterVolume; let duration = 0.1, vol = drumVol; switch (type) { case 'kick': filter.type = 'lowpass'; filter.frequency.setValueAtTime(120, time); vol *= 1; duration = 0.15; break; case 'snare': filter.type = 'highpass'; filter.frequency.setValueAtTime(1500, time); vol *= 0.8; duration = 0.1; break; case 'hihat': filter.type = 'highpass'; filter.frequency.setValueAtTime(8000, time); vol *= 0.4; duration = 0.05; break; } gain.gain.setValueAtTime(vol, time); gain.gain.exponentialRampToValueAtTime(0.001, time + duration); noiseSource.start(time); noiseSource.stop(time + duration); }
    scheduler() { if (!this.audioCtx || !this.musicPlaying || this.currentTrack === 'menu') return; while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) { let l, a, b, k, s, h; if (this.currentTrack === 'boss') { [l, a, b, k, s, h] = [this.bossLeadMelody, this.bossArpeggioMelody, this.bossBassLine, this.bossKickPattern, this.bossSnarePattern, this.bossHihatPattern]; } else { [l, a, b, k, s, h] = [this.leadMelody, this.arpeggioMelody, this.bassLine, this.kickPattern, this.snarePattern, this.hihatPattern]; } this.playNote(l[this.currentStep]!, this.nextNoteTime, this.stepDuration * 0.9, 'square', 0.15); this.playNote(a[this.currentStep]!, this.nextNoteTime, this.stepDuration, 'square', 0.07); if (this.currentStep % 2 === 0) this.playNote(b[this.currentStep]!, this.nextNoteTime, this.stepDuration * 1.8, 'triangle', 0.3); if (k[this.currentStep]) this.playDrum('kick', this.nextNoteTime); if (s[this.currentStep]) this.playDrum('snare', this.nextNoteTime); if (h[this.currentStep]) this.playDrum('hihat', this.nextNoteTime); this.nextNoteTime += this.stepDuration; this.currentStep = (this.currentStep + 1) % this.totalSteps; } }
    toggleMusic(shouldPlay: boolean): void { this.musicPlaying = shouldPlay; if (shouldPlay) { this.setTrack(this.currentTrack); } else { this.stopProceduralMusic(); this.stopMenuMusic(); } }
    public suspendAudio() { if (this.audioCtx && this.audioCtx.state === 'running') { this.audioCtx.suspend().catch(() => { }); } }
    setVolume(volume: number) { if (this.masterGain && this.audioCtx) { this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime); this.masterGain.gain.value = volume; this.masterGain.gain.setValueAtTime(volume, this.audioCtx.currentTime); } }
    public muteAll() { if (this.masterGain && this.audioCtx) { this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime); this.masterGain.gain.value = 0; this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime); } }
    public unmuteAll() { if (this.masterGain && this.audioCtx) { this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime); this.masterGain.gain.value = this.uiManager.settings.masterVolume; this.masterGain.gain.setValueAtTime(this.uiManager.settings.masterVolume, this.audioCtx.currentTime); } }
    public playLoop(soundName: string) { if (!this.audioCtx || !this.masterGain || !this.uiManager.settings.sfx || this.continuousSounds[soundName]) { return; } let buffer: AudioBuffer | null = null; let volume = 1.3; switch (soundName) { case 'laser': buffer = this.laserBuffer; volume = 0.1; break; } if (buffer) { const source = this.audioCtx.createBufferSource(); source.buffer = buffer; source.loop = true; const gainNode = this.audioCtx.createGain(); gainNode.gain.setValueAtTime(volume * this.uiManager.settings.masterVolume, this.audioCtx.currentTime); source.connect(gainNode); gainNode.connect(this.masterGain); source.start(this.audioCtx.currentTime); this.continuousSounds[soundName] = source; } }
    public stopLoop(soundName: string) { if (this.continuousSounds[soundName]) { this.continuousSounds[soundName]!.stop(); delete this.continuousSounds[soundName]; } }
    play(soundName: string) {
        if (!this.audioCtx || !this.masterGain || !this.uiManager.settings.sfx) return; const player = this.uiManager.game.player; let bufferToPlay: AudioBuffer | null = null; let volume = 1.0; let isHandled = false; switch (soundName) {
            case 'shoot':
                if (player) {
                    switch (player.powerUpManager.weaponTier) {
                        case 1: bufferToPlay = this.shootTier1Buffer; volume = 0.1; break;
                        case 2: bufferToPlay = this.shootTier2Buffer; volume = 0.1; break;
                        case 3: bufferToPlay = this.shootTier3Buffer; volume = 0.08; break;
                        case 4: bufferToPlay = this.shootTier4Buffer; volume = 0.06; break;
                    }
                }
                isHandled = true;
                break; case 'blackHole': bufferToPlay = this.blackHoleBuffer; volume = 0.6; isHandled = true; break; case 'droneTier1': bufferToPlay = this.droneTier1Buffer; volume = 0.1; isHandled = true; break; case 'droneTier2': bufferToPlay = this.droneTier2Buffer; volume = 0.1; isHandled = true; break; case 'droneTier3': bufferToPlay = this.droneTier3Buffer; volume = 0.1; isHandled = true; break; case 'coinCollect': bufferToPlay = this.coinCollectBuffer; volume = 0.1; isHandled = true; break; case 'powerup': bufferToPlay = this.powerupCollectBuffer; volume = 0.1; isHandled = true; break; case 'enemyExplosion': bufferToPlay = this.enemyExplosionBuffer; volume = 0.4; isHandled = true; break; case 'nuke': bufferToPlay = this.nukeBuffer; volume = 0.7; isHandled = true; break; case 'missileLaunch': bufferToPlay = this.missileLaunchBuffer; volume = 0.1; isHandled = true; break;
        } if (bufferToPlay) { const source = this.audioCtx.createBufferSource(); source.buffer = bufferToPlay; const gainNode = this.audioCtx.createGain(); gainNode.gain.setValueAtTime(volume * this.uiManager.settings.masterVolume, this.audioCtx.currentTime); source.connect(gainNode); gainNode.connect(this.masterGain); source.start(this.audioCtx.currentTime); return; } if (isHandled) return; let freq = 440, duration = 0.1, type: OscillatorType = 'sine', vol = 1, freqEnd = freq; switch (soundName) { case 'playerHit': freq = 200; duration = 0.2; type = 'square'; break; case 'playerExplosion': freq = 100; duration = 0.5; type = 'sawtooth'; break; case 'shieldDown': freq = 300; duration = 0.2; type = 'square'; break; case 'uiClick': freq = 1200; duration = 0.05; type = 'triangle'; vol = 0.4; break; case 'purchaseSuccess': freq = 1500; duration = 0.1; type = 'sine'; vol = 0.5; break; case 'uiError': freq = 200; duration = 0.15; type = 'sawtooth'; vol = 0.4; break; case 'enemyShoot': freq = 800; freqEnd = 400; duration = 0.1; type = 'triangle'; vol = 0.15; break; case 'enemyPlasmaShoot': freq = 400; duration = 0.2; type = 'sawtooth'; vol = 0.2; break; case 'bossLanceShoot': freq = 1500; duration = 0.15; type = 'square'; vol = 0.3; break; case 'revive': freq = 400; duration = 0.8; type = 'triangle'; vol = 0.7; const oscRevive = this.audioCtx.createOscillator(); const gainRevive = this.audioCtx.createGain(); oscRevive.connect(gainRevive); gainRevive.connect(this.masterGain); oscRevive.type = type; oscRevive.frequency.setValueAtTime(freq, this.audioCtx.currentTime); oscRevive.frequency.linearRampToValueAtTime(freq * 3, this.audioCtx.currentTime + duration * 0.9); gainRevive.gain.setValueAtTime(vol * this.uiManager.settings.masterVolume, this.audioCtx.currentTime); gainRevive.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration); oscRevive.start(this.audioCtx.currentTime); oscRevive.stop(this.audioCtx.currentTime + duration); return; } const osc = this.audioCtx.createOscillator(); const gN = this.audioCtx.createGain(); osc.connect(gN); gN.connect(this.masterGain); osc.type = type; osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime); if (freqEnd !== freq) { osc.frequency.exponentialRampToValueAtTime(freqEnd, this.audioCtx.currentTime + duration); } gN.gain.setValueAtTime(vol * this.uiManager.settings.masterVolume, this.audioCtx.currentTime); gN.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration); osc.start(this.audioCtx.currentTime); osc.stop(this.audioCtx.currentTime + duration);
    }
}

// Redundant definition moved to top

class UIManager {
    public game: Game; private ctx: CanvasRenderingContext2D; private scoreEl: HTMLElement; private coinsEl: HTMLElement; private levelEl: HTMLElement; private highscoreEl: HTMLElement; public specialInventoryEl: HTMLElement; public ultraInventoryEl: HTMLElement; private livesDisplay: HTMLElement; private weaponStatusEl: HTMLElement; private energyBarEl: HTMLElement; private weaponTierDisplayEl: HTMLElement; private menuContainer: HTMLElement;
    private levelDisplayContainer: HTMLElement;
    private gameOverContainer: HTMLElement;
    private modeSelectContainer: HTMLElement;
    private langSelectScreen: HTMLElement; private langBackButton: HTMLElement; private tabButtons: { [key: string]: HTMLButtonElement }; private tabPanes: { [key: string]: HTMLElement }; public settings: { masterVolume: number; music: boolean; sfx: boolean; particles: number; screenShake: boolean; crt: boolean; autoFire: string; vibration: boolean; }; public soundManager: SoundManager; public localizationManager: LocalizationManager; private langSelectSource: 'startup' | 'settings' = 'startup'; private mainMenuElements: { resume: HTMLElement, restart: HTMLElement, quit: HTMLElement, header: HTMLElement };
    private bombTimerInterval: ReturnType<typeof setInterval> | null = null;
    private hubBombTimerInterval: ReturnType<typeof setInterval> | null = null;
    private shopContainer: HTMLElement;
    private shopCoinsEl: HTMLElement;
    private shopContentEl: HTMLElement;
    private shopTabsContainerEl: HTMLElement;
    private currentShopTabId: string = 'permanent';

    // LEADERBOARD ELEMENTS
    private leaderboardContainer: HTMLElement;
    private leaderboardContent: HTMLElement;
    private leaderboardBackBtn: HTMLElement;
    private currentLeaderboardMode: 'campaign' | 'endless' = 'campaign';

    private collectibleModalEl: HTMLElement;
    private modalImgEl: HTMLImageElement;
    private modalTitleEl: HTMLElement;
    private modalStoryEl: HTMLElement;
    private modalBonusEl: HTMLElement;

    // SKIN MODAL ELEMENTS
    private skinModalEl: HTMLElement;
    private skinModalImg: HTMLImageElement;
    private skinModalTitle: HTMLElement;
    private skinModalDesc: HTMLElement;
    private skinModalStats: HTMLElement;
    private skinModalActionBtn: HTMLButtonElement;

    // TROPHY MODAL ELEMENTS
    private trophyModalEl: HTMLElement;
    private trophyModalImg: HTMLImageElement;
    private trophyModalTitle: HTMLElement;
    private trophyModalDesc: HTMLElement;
    private trophyModalTier: HTMLElement;

    // NEW SETTINGS ELEMENTS
    private settingsContainer: HTMLElement;
    private masterVolumeSlider: HTMLInputElement;
    private musicToggle: HTMLInputElement;
    private sfxToggle: HTMLInputElement;
    private particlesSlider: HTMLInputElement;
    private languageSelect: HTMLSelectElement;
    public dailyDeal: { skinId: string, discountedPrice: number, originalPrice: number, msRemaining: number, endTime?: number } | null = null;
    public dailyDealInterval: any = null;

    constructor(game: Game, ui: IUIElements) {
        this.game = game;
        this.ctx = game.ctx;
        this.scoreEl = ui.score;
        this.coinsEl = ui.coins;
        this.levelEl = ui.level;
        this.highscoreEl = ui.highscore;
        this.specialInventoryEl = ui.specialInventory;
        this.ultraInventoryEl = ui.ultraInventory;
        this.livesDisplay = ui.livesDisplay;
        this.weaponStatusEl = ui.weaponStatus;
        this.energyBarEl = ui.energyBar;
        this.weaponTierDisplayEl = ui.weaponTierDisplay;
        this.levelDisplayContainer = ui.levelDisplay;
        this.menuContainer = document.getElementById('menu-container')!;
        this.gameOverContainer = document.getElementById('game-over-container')!;
        this.modeSelectContainer = document.getElementById('mode-select-container')!;
        this.langSelectScreen = document.getElementById('language-select-screen')!;
        this.langBackButton = document.getElementById('lang-back-button')!;
        // Tab-System entfernt â€“ jetzt Launcher mit eigenen Overlays
        this.tabButtons = {} as any;
        this.tabPanes = {} as any;
        this.mainMenuElements = { resume: document.getElementById('resume-button')!, restart: document.getElementById('restart-button')!, quit: document.getElementById('quit-button')!, header: null as any };
        this.settings = this.loadSettings();
        this.localizationManager = new LocalizationManager();
        this.soundManager = new SoundManager(this);
        (document.getElementById('coin-icon') as HTMLImageElement).src = piCoin2ImgSrc;
        this.shopContainer = document.getElementById('shop-container')!;
        this.shopCoinsEl = document.getElementById('shop-coins')!;
        this.shopContentEl = document.getElementById('shop-content')!;
        this.shopTabsContainerEl = document.getElementById('shop-tabs')!;

        // LEADERBOARD ELEMENTS
        this.leaderboardContainer = document.getElementById('leaderboard-container')!;
        this.leaderboardContent = document.getElementById('epic-leaderboard-content')!;
        this.leaderboardBackBtn = document.getElementById('leaderboard-back-button')!;

        // SETTINGS ELEMENTS
        this.settingsContainer = document.getElementById('settings-container')!;

        // Icons sicher setzen (verhindert Absturz bei fehlender ID)
        const shopCoinIcon = document.getElementById('shop-coin-icon') as HTMLImageElement;
        if (shopCoinIcon) {
            shopCoinIcon.src = piCoin2ImgSrc;
        }

        const mainCoinIcon = document.getElementById('coin-icon') as HTMLImageElement;
        if (mainCoinIcon) {
            mainCoinIcon.src = piCoin2ImgSrc;
        }

        // --- MODAL FÃœR COLLECTIBLES ---
        this.collectibleModalEl = document.getElementById('collectible-modal')!;
        this.modalImgEl = document.getElementById('modal-img') as HTMLImageElement;
        this.modalTitleEl = document.getElementById('modal-title')!;
        this.modalStoryEl = document.getElementById('modal-story')!;
        this.modalBonusEl = document.getElementById('modal-bonus')!;

        // --- SKIN MODAL INIT ---
        this.skinModalEl = document.getElementById('skin-detail-modal')!;
        this.skinModalImg = document.getElementById('skin-modal-img') as HTMLImageElement;
        this.skinModalTitle = document.getElementById('skin-modal-title')!;
        this.skinModalDesc = document.getElementById('skin-modal-desc')!;
        this.skinModalStats = document.getElementById('skin-modal-stats')!;
        this.skinModalActionBtn = document.getElementById('skin-modal-action-btn') as HTMLButtonElement;

        // --- TROPHY MODAL INIT ---
        this.trophyModalEl = document.getElementById('trophy-detail-modal')!;
        this.trophyModalImg = document.getElementById('trophy-modal-img') as HTMLImageElement;
        this.trophyModalTitle = document.getElementById('trophy-modal-title')!;
        this.trophyModalDesc = document.getElementById('trophy-modal-desc')!;
        this.trophyModalTier = document.getElementById('trophy-modal-tier')!;
        const trophyClose = document.getElementById('trophy-modal-close');
        if (trophyClose) trophyClose.onclick = () => { this.trophyModalEl.style.display = 'none'; };

        // --- METHODEN BINDING ---
        this.toggleMainMenu = this.toggleMainMenu.bind(this);
        this.togglePauseMenu = this.togglePauseMenu.bind(this);
        this.showTab = this.showTab.bind(this);
        this.drawLevelMessage = this.drawLevelMessage.bind(this);
        this.drawGameOver = this.drawGameOver.bind(this);
        this.drawWinScreen = this.drawWinScreen.bind(this);
        this.toggleLeaderboardScreen = this.toggleLeaderboardScreen.bind(this);

        // Starte Event-Listener
        this.initButtons();
        this.initDailyDeal();
    } // Ende des Constructors

    public async initDailyDeal() {
        if ((window as any).globalDailyDeal) {
            this.dailyDeal = (window as any).globalDailyDeal;
            this.updateDailyDealUI();
            this.startDailyDealTimer();
            return;
        }
        try {
            const resp = await fetch('/api/daily-deal');
            if (resp.ok) {
                this.dailyDeal = await resp.json();
                this.updateDailyDealUI();
                this.startDailyDealTimer();
            }
        } catch (e) { console.error("Daily Deal Load Error:", e); }
    }

    public updateDailyDealUI() {
        if (!this.dailyDeal) return;
        const dealTimerEl = document.getElementById('daily-deal-timer');
        const dealWrapper = document.querySelector('.daily-deal-wrapper');
        if (!dealWrapper) return;

        const skinId = this.dailyDeal.skinId;
        const skinMap: any = {
            'skin_goliath': { name: 'shop_skin_goliath_name', desc: 'shop_skin_goliath_desc', img: playerImgSrcGoliath },
            'skin_sentinel': { name: 'shop_skin_sentinel_name', desc: 'shop_skin_sentinel_desc', img: playerImgSrc2 },
            'skin_renegade': { name: 'shop_skin_renegade_name', desc: 'shop_skin_renegade_desc', img: playerImgSrc3 },
            'skin_avenger': { name: 'shop_skin_avenger_name', desc: 'shop_skin_avenger_desc', img: playerImgSrc4 },
            'skin_spectre': { name: 'shop_skin_spectre_name', desc: 'shop_skin_spectre_desc', img: playerImgSrcSpectre },
            'skin_gold': { name: 'shop_skin_gold_name', desc: 'shop_skin_gold_desc', img: playerImgSrcGold },
            'skin_void': { name: 'shop_skin_void_name', desc: 'shop_skin_void_desc', img: playerImgSrcVoid }
        };

        const data = skinMap[skinId];
        if (!data) return;

        const t = (k: string) => this.localizationManager.translate(k);

        // Update elements in index.html
        const imgEl = dealWrapper.querySelector('.deal-img') as HTMLImageElement;
        const nameEl = dealWrapper.querySelector('.deal-name');
        const descEl = dealWrapper.querySelector('.deal-desc');
        const buyBtn = dealWrapper.querySelector('.retro-btn') as HTMLButtonElement;

        if (imgEl) imgEl.src = data.img;
        if (nameEl) {
            nameEl.setAttribute('data-translate-key', data.name);
            nameEl.textContent = t(data.name);
        }
        if (descEl) {
            descEl.innerHTML = `${t(data.desc)}<br><br><span style="color:#ffcc00; font-weight:bold;">SPECIAL OFFER: ${this.dailyDeal.discountedPrice} <img src="${piCoin2ImgSrc}" style="width:12px; vertical-align:middle;"></span> <span style="text-decoration:line-through; font-size:0.4rem; opacity:0.6;">${this.dailyDeal.originalPrice}</span>`;
        }

        if (buyBtn) {
            buyBtn.textContent = `PURCHASE (-50%)`;
            buyBtn.onclick = async () => {
                this.soundManager.play('uiClick');
                // Open shop and select skin tab, or buy directly? 
                // Let's open the details for this skin
                const shopItem = this.game.shopManager.shopItems.find(i => i.id === skinId);
                if (shopItem) {
                    this.toggleShopScreen(true);
                    this.showShopTab('skin');
                    this.showSkinDetails(shopItem);
                }
            };
        }
    }

    private startDailyDealTimer() {
        if (this.dailyDealInterval) clearInterval(this.dailyDealInterval);

        const updateTimer = () => {
            if (!this.dailyDeal) return;
            this.dailyDeal.msRemaining -= 1000;
            if (this.dailyDeal.msRemaining <= 0) {
                this.initDailyDeal(); // Refresh deal
                return;
            }

            const seconds = Math.floor((this.dailyDeal.msRemaining / 1000) % 60);
            const minutes = Math.floor((this.dailyDeal.msRemaining / (1000 * 60)) % 60);
            const hours = Math.floor((this.dailyDeal.msRemaining / (1000 * 60 * 60)) % 24);

            const timerEl = document.getElementById('daily-deal-timer');
            if (timerEl) {
                timerEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        };

        this.dailyDealInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    /**
     * Aktualisiert die Anzeige des Pi-Benutzernamens im Shop/Hub
     */
    public updatePiUserDisplay(): void {
        const piManager = this.game.piManager;
        const piUserDisplay = document.getElementById('pi-user-display');

        // Nur fortfahren, wenn das Element im HTML existiert
        if (!piUserDisplay) return;

        if (piManager.isAuthenticated) {
            const usernameEl = piUserDisplay.querySelector('#pi-username');
            if (usernameEl) {
                usernameEl.textContent = piManager.username;
            }
            piUserDisplay.style.display = 'flex'; // Sichtbar machen
        } else {
            piUserDisplay.style.display = 'none'; // Verstecken, wenn nicht eingeloggt
        }
    }
    update(): void {
        if (this.scoreEl) this.scoreEl.textContent = this.game.score.toString();
        if (this.coinsEl) this.coinsEl.textContent = this.game.coins.toString();

        // FIX: Hier stÃ¼rzte es vorher ab, jetzt prÃ¼fen wir ob levelEl existiert
        if (this.levelEl) this.levelEl.textContent = this.game.level.toString();

        if (this.game.isPaused || ['MENU', 'GAME_OVER', 'WIN', 'MODE_SELECT'].includes(this.game.gameState)) {
            if (this.highscoreEl) this.highscoreEl.textContent = this.game.highscore.toString();
        }

        if (!this.game.player || !this.game.player.isAlive()) {
            if (this.specialInventoryEl) this.specialInventoryEl.innerHTML = '';
            if (this.ultraInventoryEl) this.ultraInventoryEl.innerHTML = '';
            if (this.livesDisplay) this.livesDisplay.innerHTML = '';
            if (this.weaponStatusEl) this.weaponStatusEl.innerHTML = '';
            if (this.energyBarEl) this.energyBarEl.style.width = '0%';
            if (this.weaponTierDisplayEl) this.weaponTierDisplayEl.innerHTML = '';
            if (this.levelDisplayContainer) this.levelDisplayContainer.style.display = 'none';
            return;
        }

        if (this.levelDisplayContainer) this.levelDisplayContainer.style.display = 'block';
        if (this.livesDisplay) this.livesDisplay.innerHTML = `<img src="${powerupExtraLifeSrc}" alt="Leben" class="ui-icon" />: ${this.game.player.lives}`;

        const energyPercentage = (this.game.player.energy / this.game.player.maxEnergy) * 100;
        if (this.energyBarEl) this.energyBarEl.style.width = `${energyPercentage}%`;

        if (this.specialInventoryEl) this.updateInventoryUI(this.specialInventoryEl, this.game.player.powerUpManager.specialInventory, 3, 1);
        if (this.ultraInventoryEl) this.updateInventoryUI(this.ultraInventoryEl, this.game.player.powerUpManager.ultraInventory, 2, 4);
        this.updateWeaponStatusUI();
    }

    updateInventoryUI(element: HTMLElement, inventory: IInventoryItem[], maxSize: number, keyStart: number): void { let html = ''; const type = element.id === 'special-inventory' ? 'special' : 'ultra'; for (let i = 0; i < maxSize; i++) { const item = inventory[i]; const key = keyStart + i; if (item) { const imageSrc = powerUpImageSources[item.type]; html += `<div class="inventory-slot" data-slot-index="${i}" data-inventory-type="${type}"><div class="slot-key">${key}</div><img src="${imageSrc}" class="slot-image" alt="${item.type}" />${item.count > 1 ? `<div class="slot-count">x${item.count}</div>` : ''}</div>`; } else { html += `<div class="inventory-slot"><div class="slot-key">${key}</div></div>`; } } element.innerHTML = html; }
    updateWeaponStatusUI(): void {
        if (!this.game.player) {
            this.weaponTierDisplayEl.innerHTML = '';
            this.weaponStatusEl.innerHTML = '';
            this.weaponStatusEl.style.display = 'none';
            return;
        }
        const pm = this.game.player.powerUpManager;
        const tierImageSrc = powerUpImageSources['WEAPON_UP'];

        // Ã„NDERUNG HIER: style="width: 24px; height: 24px;" hinzugefÃ¼gt
        let tierHTML = `<img src="${tierImageSrc}" alt="Waffenstufe" class="ui-icon" style="width: 24px; height: 24px; vertical-align: middle; object-fit: contain;" />: ${pm.weaponTier}`;

        let tierTimer = pm.weaponTierTimer;
        if (tierTimer > 0 && pm.weaponTier > 1) {
            const seconds = Math.ceil(tierTimer / 1000);
            tierHTML += ` <span class="${seconds <= 5 ? 'timer-warning' : ''}">(${seconds}s)</span>`;
        }
        this.weaponTierDisplayEl.innerHTML = tierHTML;

        const buffsToShow = ['RAPID_FIRE', 'GHOST_PROTOCOL', 'ORBITAL_DRONE', 'LASER_BEAM', 'HOMING_MISSILES', 'SCORE_BOOST', 'SIDE_SHOTS'];
        let activeBuffsHTML = '';
        for (const buffType of buffsToShow) {
            if (pm.isActive(buffType)) {
                const imageSrc = powerUpImageSources[buffType];
                const seconds = Math.ceil(pm.timers[buffType]! / 1000);
                activeBuffsHTML += `<div style="display: flex; align-items: center; gap: 5px;"><img src="${imageSrc}" alt="${buffType}" style="width: 24px; height: 24px; object-fit: contain;" /><span>${seconds}s</span></div>`;
            }
        }
        if (activeBuffsHTML !== '') {
            this.weaponStatusEl.innerHTML = activeBuffsHTML;
            this.weaponStatusEl.style.display = 'flex';
            this.weaponStatusEl.style.gap = '15px';
            this.weaponStatusEl.style.alignItems = 'center';
        } else {
            this.weaponStatusEl.innerHTML = '';
            this.weaponStatusEl.style.display = 'none';
        }
    }
    // --- NEW OVERLAY TOGGLES ---
    public toggleProfileScreen(show: boolean): void {
        const el = document.getElementById('profile-container');
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show) {
                this.populateProfile();
                this.populateProfileMonitor();
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Hilfsfunktion um den Pilot-Monitor (Links) zu fÃ¼llen
    private populateProfileMonitor(): void {
        (window as any).updateCockpitDisplays(null);
    }
    public toggleGalleryScreen(show: boolean): void {
        const el = document.getElementById('gallery-container');
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show) {
                this.game.loadPlayerDataFromServer().then(() => {
                    this.populateGalerie();
                });
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }
    public toggleArsenalScreen(show: boolean): void { const el = document.getElementById('arsenal-container'); if (el) { el.style.display = show ? 'flex' : 'none'; if (show) { this.populateArsenal(); document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'auto'; } } }
    public toggleIntelScreen(show: boolean): void { const el = document.getElementById('intel-container'); if (el) { el.style.display = show ? 'flex' : 'none'; if (show) { this.populateGegner(); document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'auto'; } } }
    public toggleTrophiesScreen(show: boolean): void {
        const el = document.getElementById('trophies-container');
        if (el) {
            if (show) {
                if (typeof (window as any).showHallOfFameOverlay === 'function') {
                    (window as any).showHallOfFameOverlay();
                } else {
                    this.populateTrophies();
                    el.style.display = 'flex';
                }
                document.body.style.overflow = 'hidden';
            } else {
                el.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    private populateTrophies(): void {
        const container = document.getElementById('trophies-list');
        if (!container) return;
        container.innerHTML = '<div class="trophy-room-grid"></div>';
        const grid = container.querySelector('.trophy-room-grid')!;

        const am = this.game.achievementManager;
        const achievements = (am as any).achievements as IAchievement[];
        if (!achievements) return;

        achievements.forEach(ach => {
            const isUnlocked = am.isUnlocked(ach.id);
            const card = document.createElement('div');
            card.className = `trophy-pedestal ${isUnlocked ? 'unlocked' : 'locked'}`;

            // Logical Tier Mapping
            let tier = 'bronze';
            const voidTier = ['galaxy_savior', 'deep_diver', 'millionaire_pilot', 'prime_punisher'];
            const goldTier = ['high_score_hero', 'nexus_nemesis', 'serpent_slayer', 'maxed_out', 'untouchable'];
            const silverTier = ['sentinel_scrapper', 'coin_collector', 'fully_loaded', 'nukem', 'ultra_instinct', 'fashionista', 'arsenal_ace', 'phoenix_protocol', 'close_call'];

            if (voidTier.includes(ach.id)) tier = 'void';
            else if (goldTier.includes(ach.id)) tier = 'gold';
            else if (silverTier.includes(ach.id)) tier = 'silver';

            const iconHtml = (ach.icon && (ach.icon.startsWith('data:image') || ach.icon.startsWith('./') || ach.icon.startsWith('blob:')))
                ? `<img src="${ach.icon}" alt="Trophy" style="width:100%; height:100%; object-fit:contain; filter: ${isUnlocked ? 'none' : 'brightness(0) invert(0.2)'}">`
                : ach.icon;

            const t = (k: string) => this.localizationManager.translate(k);

            card.innerHTML = `
                <div class="tier-badge tier-${tier}">${tier.toUpperCase()}</div>
                <div class="trophy-visual">
                    ${iconHtml}
                    ${!isUnlocked ? '<div class="lock-overlay">ðŸ”’</div>' : ''}
                </div>
                <div class="trophy-info">
                    <div class="trophy-status-tag">${isUnlocked ? t('trophy_unlocked_hint') : t('trophy_locked_hint')}</div>
                    <div class="trophy-name">${t(ach.nameKey)}</div>
                    <div class="trophy-desc">${t(ach.descKey)}</div>
                </div>
            `;

            // Click to show details
            card.style.cursor = 'pointer';
            card.onclick = () => {
                this.soundManager.play('uiClick');
                this.showTrophyDetails(ach.id, isUnlocked, tier);
            };

            grid.appendChild(card);
        });
    }

    public showTrophyDetails(trophyId: string, isUnlocked: boolean, tier: string): void {
        const t = (k: string) => this.localizationManager.translate(k);
        // Look up either in achievements or TROPHY_DEFINITIONS
        const ach = (this.game.achievementManager.achievements as any[]).find(a => a.id === trophyId);
        const trophyDef = TROPHY_DEFINITIONS.find(td => td.id === trophyId);
        const icon = trophyDef?.icon || ach?.icon || 'ðŸ†';
        const isPath = icon.startsWith('data:image') || icon.startsWith('./') || icon.startsWith('http');

        if (this.trophyModalImg) {
            if (isPath) {
                this.trophyModalImg.src = icon;
                this.trophyModalImg.style.display = 'block';
                const parent = this.trophyModalImg.parentElement;
                const emo = parent?.querySelector('.emoji-fallback');
                if (emo) emo.remove();
            } else {
                this.trophyModalImg.src = '';
                this.trophyModalImg.style.display = 'none';
                const parent = this.trophyModalImg.parentElement;
                if (parent) {
                    let emo = parent.querySelector('.emoji-fallback') as HTMLElement;
                    if (!emo) {
                        emo = document.createElement('div');
                        emo.className = 'emoji-fallback';
                        emo.style.fontSize = '5rem';
                        emo.style.textAlign = 'center';
                        parent.appendChild(emo);
                    }
                    emo.textContent = icon;
                    emo.style.filter = isUnlocked ? 'drop-shadow(0 0 15px gold)' : 'grayscale(1) brightness(0.5)';
                }
            }
            this.trophyModalImg.style.filter = isUnlocked ? 'none' : 'brightness(0) invert(0.2)';
        }
        if (this.trophyModalTitle) {
            this.trophyModalTitle.textContent = t(ach?.nameKey || trophyDef?.nameKey || trophyId).toUpperCase();
            const colors: any = { 'bronze': '#cd7f32', 'silver': '#c0c0c0', 'gold': '#ffd700', 'void': '#a060ff', 'legendary': '#ff4444', 'rare': '#3498db', 'epic': '#9b59b6', 'common': '#2ecc71' };
            this.trophyModalTitle.style.color = colors[tier] || 'white';
        }
        if (this.trophyModalDesc) {
            // Show both the flavor text and the condition (unlockHint/hintKey)
            const flavor = t(ach?.descKey || trophyDef?.descKey || '');
            const condition = trophyDef?.hintKey ? t(trophyDef.hintKey) : (trophyDef?.unlockHint || '');
            this.trophyModalDesc.innerHTML = `<div style="margin-bottom:10px">${flavor}</div><div style="color:var(--pi-yellow); font-size:0.45rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;">${t('msg_mission')}: ${condition}</div>`;
        }
        if (this.trophyModalTier) {
            this.trophyModalTier.textContent = tier.toUpperCase();
            const tierColors: any = { 'void': '#a060ff', 'legendary': '#ff4444', 'gold': '#ffd700', 'silver': '#c0c0c0', 'bronze': '#cd7f32', 'epic': '#9b59b6', 'rare': '#3498db', 'common': '#2ecc71' };
            this.trophyModalTier.style.color = tierColors[tier] || '#ccc';
        }

        const dateEl = document.getElementById('trophy-modal-date');
        if (dateEl) {
            dateEl.style.display = isUnlocked ? 'block' : 'none';
        }

        if (this.trophyModalEl) {
            this.trophyModalEl.style.display = 'flex';
        }
    }

    public showAchievementToast(achievement: IAchievement): void {
        const toast = document.createElement('div');
        toast.className = 'subtle-trophy-toast';

        // Use a glowing trophy icon (emoji or image)
        const iconSource = (achievement.icon && (achievement.icon.startsWith('data:image') || achievement.icon.startsWith('./')))
            ? `<img src="${achievement.icon}" style="width:100%; height:100%; object-fit:contain;">`
            : `<span style="font-size: 3rem;">ðŸ†</span>`;

        toast.innerHTML = `<div class="trophy-icon-glow">${iconSource}</div>`;
        document.body.appendChild(toast);

        // Procedural Achievement Sound (Epic Jingle)
        const sm = this.soundManager;
        if (sm.audioCtx && sm.audioCtx.state === 'running') {
            const now = sm.audioCtx.currentTime;
            sm.playNote(523.25, now, 0.1, 'square', 0.1); // C5
            sm.playNote(659.25, now + 0.1, 0.1, 'square', 0.1); // E5
            sm.playNote(783.99, now + 0.2, 0.1, 'square', 0.1); // G5
            sm.playNote(1046.50, now + 0.3, 0.4, 'square', 0.15); // C6
        }

        // The CSS animation handles the rest (pop, hold, vanish)
        setTimeout(() => toast.remove(), 2600);
    }

    public toggleMainMenu(show: boolean, initialTab: string = 'spiel'): void {
        this.menuContainer.style.display = show ? 'flex' : 'none';
        const exitButton = document.getElementById('exit-button');
        if (show) {
            // Main Menu / Launcher Logic
            if (this.mainMenuElements.resume) this.mainMenuElements.resume.style.display = 'none'; // Intro mode
            if (this.mainMenuElements.quit) this.mainMenuElements.quit.style.display = 'none';
            // Render Pi Ad Banner
            this.game.piManager.renderBanner('pi-ad-banner-container');
        }
    }
    public togglePauseMenu(isPaused: boolean): void {
        this.menuContainer.style.display = isPaused ? 'flex' : 'none';
        const exitButton = document.getElementById('exit-button');

        if (isPaused) {
            // Launcher Logic for Pause
            if (this.mainMenuElements.resume) this.mainMenuElements.resume.style.display = 'flex';
            if (this.mainMenuElements.quit) this.mainMenuElements.quit.style.display = 'flex';
            if (exitButton) exitButton.style.display = 'flex';

            // Populate content for sub-screens in background
            this.populateAllTranslatedContent();
        }
    }
    public async toggleGameOverScreen(show: boolean): Promise<void> {
        if (show) {
            // Update score
            const finalScoreEl = document.getElementById('final-score')!;
            finalScoreEl.textContent = this.game.score.toString();
            finalScoreEl.setAttribute('data-text', this.game.score.toString());

            // Populate stats
            if (this.game.statsManager && this.game.statsManager.roundStats) {
                const roundStats = this.game.statsManager.roundStats;
                const killsEl = document.getElementById('final-kills');
                if (killsEl) killsEl.textContent = roundStats.kills.toString();

                const coinsEl = document.getElementById('final-coins');
                if (coinsEl) coinsEl.textContent = roundStats.coins.toString();

                const timeEl = document.getElementById('final-time');
                if (timeEl) {
                    const totalSec = Math.floor(roundStats.playtime);
                    const mm = Math.floor(totalSec / 60);
                    const ss = totalSec % 60;
                    timeEl.textContent = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
                }
            }

            const rankDisplayEl = document.getElementById('final-rank-display')!;
            rankDisplayEl.textContent = this.localizationManager.translate('leaderboard_fetching_rank');
            rankDisplayEl.classList.remove('error');

            // Verstecke die Buttons initial
            const btnRetry = document.getElementById('restart-from-gameover-button');
            const btnContinue = document.getElementById('rewarded-ad-button');
            const btnExit = document.getElementById('quit-from-gameover-button');

            if (btnRetry) btnRetry.style.visibility = 'hidden';
            if (btnExit) btnExit.style.visibility = 'hidden';
            if (btnContinue) {
                btnContinue.style.display = 'block';
                btnContinue.style.visibility = 'hidden';
            }

            this.gameOverContainer.style.display = 'flex';

            // Show Interstitial Ad (await until it finishes)
            await this.game.piManager.showInterstitial();

            // Zeige die Buttons nachdem die Ads vorbei sind
            if (btnRetry) btnRetry.style.visibility = 'visible';
            if (btnExit) btnExit.style.visibility = 'visible';

            if (btnContinue) {
                btnContinue.style.visibility = 'visible';
                if (this.game.hasUsedReviveAd) {
                    btnContinue.style.opacity = '0.5';
                    btnContinue.style.pointerEvents = 'none';
                    btnContinue.innerHTML = `<s>${this.localizationManager.translate('hub_continue_ad')}</s>`;
                } else {
                    btnContinue.style.opacity = '1';
                    btnContinue.style.pointerEvents = 'auto';
                    btnContinue.innerHTML = this.localizationManager.translate('hub_continue_ad');
                }
            }
        } else {
            this.gameOverContainer.style.display = 'none';
        }
    } public displayFinalRank(result: ILeaderboardEntry | null, error: boolean = false): void {
        const rankDisplayEl = document.getElementById('final-rank-display');
        if (!rankDisplayEl) return;
        if (error) {
            rankDisplayEl.textContent = this.localizationManager.translate('leaderboard_error');
            rankDisplayEl.classList.add('error');
        } else if (result && result.rank !== undefined) {
            rankDisplayEl.textContent = `${this.localizationManager.translate('leaderboard_rank_label')}: #${result.rank}`;
            rankDisplayEl.classList.remove('error');
        } else {
            rankDisplayEl.textContent = this.localizationManager.translate('hub_status_online');
            rankDisplayEl.classList.remove('error');
        }
    }
    public toggleModeSelectScreen(show: boolean): void {
        if (this.modeSelectContainer) this.modeSelectContainer.style.display = show ? 'flex' : 'none';
    }
    public toggleShopScreen(show: boolean): void {
        if (show) {
            this.renderShop();
            this.localizationManager.applyTranslationsToUI();
            this.shopContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            this.shopContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    public toggleLeaderboardScreen(show: boolean): void {
        if (!this.leaderboardContainer) this.leaderboardContainer = document.getElementById('leaderboard-container')!;
        if (!this.leaderboardContent) this.leaderboardContent = document.getElementById('epic-leaderboard-content')!;

        if (show) {
            this.populateLeaderboard(this.currentLeaderboardMode);
            this.leaderboardContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            this.leaderboardContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    public toggleSettingsScreen(show: boolean): void {
        if (!this.settingsContainer) this.settingsContainer = document.getElementById('settings-container')!;

        if (show) {
            this.initSettingsEvents(); // Ensure events are bound
            this.localizationManager.applyTranslationsToUI();
            this.settingsContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            this.settingsContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    private settingsInitialized = false;
    private initSettingsEvents(): void {
        if (this.settingsInitialized) return;
        this.settingsInitialized = true;

        // Tabs
        const tabs = document.querySelectorAll('#settings-tabs .shop-tab-btn');
        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                tabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = (btn as HTMLElement).dataset.tab;
                document.querySelectorAll('.settings-tab-content').forEach(c => (c as HTMLElement).style.display = 'none');
                document.getElementById(`settings-tab-${target}`)!.style.display = 'flex';
            });
        });

        // Audio Sliders
        const masterSlider = document.getElementById('epic-volume-master') as HTMLInputElement;
        const masterVal = document.getElementById('val-master')!;
        if (masterSlider) {
            masterSlider.value = this.settings.masterVolume.toString();
            masterVal.textContent = Math.round(this.settings.masterVolume * 100) + '%';

            masterSlider.addEventListener('input', () => {
                const val = parseFloat(masterSlider.value);
                masterVal.textContent = Math.round(val * 100) + '%';
                this.settings.masterVolume = val;
                this.soundManager.setVolume(val);
                this.saveSettings();
            });
        }

        const musicSlider = document.getElementById('epic-volume-music') as HTMLInputElement;
        const musicVal = document.getElementById('val-music')!;
        if (musicSlider && musicVal) {
            musicSlider.value = this.settings.music ? "0.5" : "0";
            musicVal.textContent = this.settings.music ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');

            musicSlider.addEventListener('input', () => {
                const val = parseFloat(musicSlider.value);
                const isOn = val > 0;
                this.settings.music = isOn;
                this.soundManager.toggleMusic(isOn);
                musicVal.textContent = isOn ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
                this.saveSettings();
            });
        }

        const sfxSlider = document.getElementById('epic-volume-sfx') as HTMLInputElement;
        const sfxVal = document.getElementById('val-sfx')!;
        if (sfxSlider && sfxVal) {
            sfxSlider.value = this.settings.sfx ? "0.8" : "0";
            sfxVal.textContent = this.settings.sfx ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');

            sfxSlider.addEventListener('input', () => {
                const val = parseFloat(sfxSlider.value);
                const isOn = val > 0;
                this.settings.sfx = isOn;
                sfxVal.textContent = isOn ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
                this.saveSettings();
            });
        }

        // Toggles (CRT)
        const crtToggle = document.getElementById('epic-toggle-crt');
        if (crtToggle) {
            const updateCrtView = (on: boolean) => {
                document.body.classList.toggle('crt-enabled', on);
                crtToggle.classList.toggle('active', on);
                crtToggle.textContent = on ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
            };
            updateCrtView(this.settings.crt);

            crtToggle.addEventListener('click', () => {
                this.settings.crt = !this.settings.crt;
                updateCrtView(this.settings.crt);
                this.saveSettings();
            });
        }

        // Bloom Toggle
        const bloomToggle = document.getElementById('epic-toggle-bloom');
        if (bloomToggle) {
            const updateBloomView = (on: boolean) => {
                bloomToggle.classList.toggle('active', on);
                bloomToggle.textContent = on ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
                document.body.style.textShadow = on ? '' : 'none';
            };
            updateBloomView(true); // Default or from settings if added

            bloomToggle.addEventListener('click', () => {
                const on = !bloomToggle.classList.contains('active');
                updateBloomView(on);
            });
        }

        // Language Select
        document.querySelectorAll('.mt-btn[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = (btn as HTMLElement).dataset.lang!;
                this.localizationManager.setLanguage(lang);
                this.populateAllTranslatedContent();
                if (typeof (window as any).updateHubUI === 'function') (window as any).updateHubUI();
                document.querySelectorAll('.mt-btn[data-lang]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Multi-Toggles (Particles/Shake)
        document.querySelectorAll('.mt-btn[data-val]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const parent = target.parentElement;
                if (!parent) return;
                Array.from(parent.children).forEach(c => c.classList.remove('active'));
                target.classList.add('active');
                const val = target.dataset.val;
                const group = parent.closest('.setting-group-epic');
                const label = group?.querySelector('label')?.textContent || '';
                if (label.includes('PARTICLE')) {
                    this.settings.particles = val === 'extreme' ? 2 : (val === 'high' ? 1 : 0);
                } else if (label.includes('SHAKE')) {
                    this.settings.screenShake = val !== 'off';
                } else if (group?.getAttribute('data-setting-id') === 'autofire' || label.includes('AUTO-FIRE')) {
                    this.settings.autoFire = val || 'always';
                }
                this.saveSettings();
            });
        });

        // Auto-Fire logic removed (handled by multi-toggle now)

        // Vibration
        const vibrationToggle = document.getElementById('epic-toggle-vibration');
        if (vibrationToggle) {
            vibrationToggle.textContent = this.settings.vibration ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
            vibrationToggle.addEventListener('click', () => {
                this.settings.vibration = !this.settings.vibration;
                vibrationToggle.classList.toggle('active', this.settings.vibration);
                vibrationToggle.textContent = this.settings.vibration ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
                this.saveSettings();
                if (this.settings.vibration) this.vibrate(50);
            });
        }

        // Back Button
        const backBtn = document.getElementById('settings-back-button');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.soundManager.play('uiClick');
                this.toggleSettingsScreen(false);
                this.saveSettings();
                window.dispatchEvent(new CustomEvent('returnToHubRequested'));
            });
        }

        // Reset Save
        const resetBtn = document.getElementById('epic-btn-reset-save');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                const msg = this.localizationManager.translate('hub_settings_reset_confirm');
                if (confirm(msg)) {
                    localStorage.clear();
                    location.reload();
                }
            });
        }
    }
    private createNftInfoBoxHTML(): string {
        const t = (key: string) => this.localizationManager.translate(key);
        return `
        <div class="nft-info-box">
            <h3>${t('nft_info_title')}</h3>
            <div class="nft-timeline">
                <div class="timeline-step">
                    <div class="icon" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill='%23F8B230'%3E%3Cpath d=%22M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25zm.094 16.516a.75.75 0 01-1.061-1.06L14.439 12 11.03 8.59a.75.75 0 011.06-1.061l4.256 4.25a.75.75 0 010 1.061l-4.25 4.25zM8.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z%22/%3E%3C/svg%3E')"></div>
                    <h4>${t('nft_phase1_title')}</h4>
                    <p>${t('nft_phase1_desc')}</p>
                </div>
                <div class="timeline-step">
                    <div class="icon" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill='%23B10DC9'%3E%3Cpath fill-rule=%22evenodd%22 d=%22M12.96 6.09a.75.75 0 01.939-.506l6.25 2.5a.75.75 0 010 .832l-6.25 2.5a.75.75 0 01-.939-.506V6.09zm-2.015 0a.75.75 0 01.37.052l6.25 2.5a.75.75 0 010 .832l-6.25 2.5a.75.75 0 01-1.03-.616V6.142a.75.75 0 01.66-.552zm-2.16 7.625a.75.75 0 01.547.721v.058l-.001 2.474a.75.75 0 01-1.498.058l.001-2.474a.75.75 0 01.951-.779zm9.023-.058a.75.75 0 00-1.498.058l.001 2.474a.75.75 0 00.547.721l.06.01a.75.75 0 00.832-.832l-.001-2.474a.75.75 0 00-.058-.499zM12 2.25A.75.75 0 0112.75 3v1.522a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm-4.125 1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm8.25 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.06 7.18a.75.75 0 01.53 1.28L3.06 9.988a.75.75 0 01-1.06-1.06l1.53-1.53a.75.75 0 01.53-.217zm15.88 0a.75.75 0 01.53.217l1.53 1.53a.75.75 0 01-1.06 1.06l-1.53-1.528a.75.75 0 01.53-1.28z%22 clip-rule=%22evenodd%22/%3E%3C/svg%3E')"></div>
                    <h4>${t('nft_phase2_title')}</h4>
                    <p>${t('nft_phase2_desc')}</p>
                </div>
            </div>
        </div>
    `;
    }

    public showSkinDetails(targetItem: IShopItem): void {
        const sm = this.game.shopManager;
        const t = (k: string) => this.localizationManager.translate(k);
        const currentLevel = sm.getUpgradeLevel(targetItem.id);
        const maxLevel = targetItem.maxLevel || 1;
        const cost = sm.getCost(targetItem);

        if (this.skinModalImg) this.skinModalImg.src = targetItem.iconSrc;
        if (this.skinModalTitle) this.skinModalTitle.textContent = t(targetItem.nameKey);
        if (this.skinModalDesc) this.skinModalDesc.textContent = t(targetItem.descKey);

        // --- NEW: NFT MINTING UI AREA ---
        const mintArea = this.skinModalEl.querySelector('.nft-minting-area') as HTMLElement;
        if (mintArea) {
            const isCollectible = targetItem.type === 'COLLECTIBLE';
            mintArea.style.display = isCollectible ? 'block' : 'none';

            if (isCollectible) {
                const hasLicense = this.game.hasPremiumLicense;
                const isMinted = (sm.playerCollectibles.minted_collectibles || []).includes(targetItem.id);

                if (isMinted) {
                    const meta = sm.playerCollectibles.minted_metadata?.[targetItem.id];
                    const dateStr = meta ? new Date(meta.minted_at).toLocaleDateString() : '---';
                    const txid = meta ? meta.txid : '---';
                    const shortTxid = txid !== '---' ? `${txid.substring(0, 8)}...${txid.substring(txid.length - 8)}` : 'UNKNOWN';
                    const network = (meta?.network || 'pi_testnet').toUpperCase();
                    const explorerUrl = network.includes('MAINNET')
                        ? `https://minepi.com/blockexplorer/tx/${txid}`
                        : `https://minepi.com/blockexplorer/testnet/tx/${txid}`;

                    mintArea.innerHTML = `
                        <div class="cyber-divider"></div>
                        <div class="nft-certificate-box" style="margin-top:15px; padding:12px; border:1px solid #ffea00; background:rgba(255,234,0,0.05); border-radius:8px;">
                            <div style="font-family:'Press Start 2P'; font-size:0.4rem; color:#ffea00; margin-bottom:10px; display:flex; justify-content:space-between;">
                                <span>CERTIFICATE</span>
                                <span style="color:#0f0;">MINTED</span>
                            </div>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.4rem; color:#aaa;">
                                <div>DATE: <span style="color:#fff;">${dateStr}</span></div>
                                <div>NET: <span style="color:${network.includes('MAINNET') ? '#0f0' : '#ffea00'};">${network}</span></div>
                                <div style="grid-column: span 2;">TX HASH: <span style="color:#0ff; font-family:monospace;">${shortTxid}</span></div>
                            </div>
                            <a href="${explorerUrl}" target="_blank" class="retro-btn mini" style="width:100%; margin-top:10px; font-size:0.35rem; border-color:#0ff; color:#0ff; text-align:center; display:block; text-decoration:none;">
                                VIEW ON EXPLORER
                            </a>
                        </div>
                    `;
                } else {
                    mintArea.innerHTML = `
                        <div class="cyber-divider"></div>
                        <div style="margin-top:15px; background:rgba(255,215,0,0.05); border:1px solid var(--pi-yellow); padding:10px; border-radius:10px; display:flex; flex-direction:column; gap:8px;">
                            <div style="font-size:0.5rem; color:var(--pi-yellow); font-family:'Orbitron', sans-serif; display:flex; justify-content:space-between;">
                                <span>${t('nft_mint_title')}</span>
                                <span style="color:#0f0;">0.50 Ï€ FEE</span>
                            </div>
                            <p style="font-size:0.35rem; color:#aaa; line-height:1.2; margin:0;">${t('nft_mint_desc')}</p>
                            
                            <button id="btn-mint-blockchain" class="retro-btn big" style="width:100%; border-color:var(--pi-yellow); color:var(--pi-yellow); margin-top:5px;" ${!hasLicense ? 'disabled' : ''}>
                                ${t('btn_mint_nft')}
                            </button>
                            ${!hasLicense ? `<div style="color:#ff4444; font-size:0.3rem; text-align:center;">${t('err_license_required_mint')}</div>` : ''}
                        </div>
                    `;
                }

                const mintBtn = mintArea.querySelector('#btn-mint-blockchain');
                if (mintBtn) {
                    mintBtn.addEventListener('click', () => {
                        this.soundManager.play('uiClick');
                        this.game.piManager.createPayment({
                            id: `mint_${targetItem.id}`,
                            pi_cost: 0.50,
                            nameKey: `Mint: ${t(targetItem.nameKey)}`,
                            type: 'NFT_MINT'
                        } as any);
                    });
                }
            }
        }

        // --- INFO BOX FOR COLLECTIBLES ---
        const infoBoxArea = this.skinModalEl.querySelector('.nft-info-area') as HTMLElement;
        if (infoBoxArea) {
            infoBoxArea.style.display = targetItem.type === 'COLLECTIBLE' ? 'block' : 'none';
            if (targetItem.type === 'COLLECTIBLE') {
                infoBoxArea.innerHTML = this.createNftInfoBoxHTML();
            }
        }

        // Show Stats / Bonus Info
        if (this.skinModalStats) {
            let statsHtml = '';
            if (targetItem.type === 'SKIN') statsHtml = `<div class="stat-row"><span>CLASS:</span> <span style="color:var(--cyan-glow)">INTERCEPTOR</span></div>`;
            else if (targetItem.cosmeticType === 'projectile_style') statsHtml = `<div class="stat-row"><span>TYPE:</span> <span style="color:#f0f">PLASMA</span></div>`;
            else if (targetItem.type === 'PERMANENT' || targetItem.type === 'ULTIMATE') {
                statsHtml = `<div class="stat-row"><span>LEVEL:</span> <span style="color:#0f0">${currentLevel} / ${maxLevel}</span></div>`;
            }
            this.skinModalStats.innerHTML = statsHtml;
        }

        // Logic for Action Button
        const actionBtn = this.skinModalActionBtn;
        if (actionBtn) {
            // Clone to remove old listeners
            const newBtn = actionBtn.cloneNode(true) as HTMLButtonElement;
            actionBtn.parentNode?.replaceChild(newBtn, actionBtn);
            this.skinModalActionBtn = newBtn;

            const isCosmetic = ['SKIN', 'COSMETIC', 'COLLECTIBLE'].includes(targetItem.type);

            if (isCosmetic) {
                const unlocked = sm.playerCollectibles.unlocked_collectibles || [];
                const isUnlocked = (targetItem.type === 'SKIN' || targetItem.type === 'COSMETIC' || targetItem.type === 'COLLECTIBLE')
                    ? (targetItem.type === 'COLLECTIBLE' ? unlocked.includes(targetItem.id) : sm.isCosmeticUnlocked(targetItem.id, targetItem.cosmeticType as any))
                    : false;

                const isEquipped = (targetItem.type === 'COLLECTIBLE' && sm.playerCollectibles.equipped_collectible === targetItem.id) ||
                    (targetItem.type !== 'COLLECTIBLE' && (sm.playerCosmetics.equipped_skin === targetItem.id || sm.playerCosmetics.equipped_projectile === targetItem.id || sm.playerCosmetics.equipped_trail === targetItem.id));

                if (isUnlocked) {
                    if (isEquipped) {
                        newBtn.textContent = globalLocalizationManager.translate('btn_equipped');
                        newBtn.disabled = true;
                        newBtn.className = "retro-btn big equipped";
                    } else {
                        newBtn.textContent = globalLocalizationManager.translate('btn_equip');
                        newBtn.disabled = false;
                        newBtn.className = "retro-btn big";
                        newBtn.onclick = (e) => {
                            e.stopPropagation();
                            if (targetItem.type === 'COLLECTIBLE') sm.equipCollectible(targetItem.id);
                            else if (targetItem.cosmeticType) sm.equipCosmetic(targetItem.id, targetItem.cosmeticType);
                            this.soundManager.play('uiClick');
                            this.showSkinDetails(targetItem); // Refresh modal state
                            this.renderShop(); // Refresh background shop

                            // SYNC: Update Hub/Hangar if they exist
                            if (typeof (window as any).refreshAllSelections === 'function') (window as any).refreshAllSelections();
                        };
                    }
                } else if (sm.pendingPiPurchase === targetItem.id) {
                    newBtn.textContent = "...";
                    newBtn.disabled = true;
                    newBtn.className = "retro-btn big disabled";
                } else {
                    const isDailyDeal = this.dailyDeal && this.dailyDeal.skinId === targetItem.id;
                    const finalCost = (isDailyDeal && this.dailyDeal) ? this.dailyDeal.discountedPrice : cost;
                    const canAfford = finalCost !== null && this.game.coins >= finalCost;

                    newBtn.textContent = `BUY ${finalCost} ${isDailyDeal ? '(-50%)' : ''}`;
                    newBtn.disabled = !canAfford;
                    newBtn.className = canAfford ? "retro-btn big" : "retro-btn big disabled";

                    newBtn.onclick = async () => {
                        newBtn.disabled = true;
                        if (await sm.purchaseItem(targetItem.id)) {
                            this.soundManager.play('purchaseSuccess');
                            this.showSkinDetails(targetItem);
                            this.renderShop();
                        } else {
                            newBtn.disabled = false;
                        }
                    };
                }
            } else {
                // PERMANENT, CONSUMABLE, PI_BUNDLE
                const isMaxed = (targetItem.type === 'PERMANENT' || targetItem.type === 'ULTIMATE') && currentLevel >= maxLevel;

                if (isMaxed) {
                    newBtn.textContent = globalLocalizationManager.translate('btn_max_level');
                    newBtn.disabled = true;
                    newBtn.className = "retro-btn big equipped";
                } else {
                    const canAfford = cost !== null && this.game.coins >= cost;
                    const isPi = !!targetItem.pi_cost;

                    if (isPi) {
                        newBtn.textContent = `BUY ${targetItem.pi_cost} Ï€`;
                        newBtn.disabled = !this.game.piManager.isAuthenticated;
                    } else {
                        newBtn.textContent = (targetItem.type === 'PERMANENT' || targetItem.type === 'ULTIMATE') ? `UPGRADE ${cost}` : `BUY ${cost}`;
                        newBtn.disabled = !canAfford;
                    }
                    newBtn.className = (!newBtn.disabled) ? "retro-btn big" : "retro-btn big disabled";

                    newBtn.onclick = async () => {
                        newBtn.disabled = true;
                        if (await sm.purchaseItem(targetItem.id)) {
                            this.soundManager.play('purchaseSuccess');
                            this.showSkinDetails(targetItem);
                            this.renderShop();
                        } else {
                            newBtn.disabled = false;
                        }
                    };
                }
            }
        }

        this.skinModalEl.style.display = 'flex';
    }


    public renderShop(): void {
        if (!this.shopContentEl) return;

        const sm = this.game.shopManager;
        this.shopCoinsEl.textContent = this.game.coins.toLocaleString();
        this.shopContentEl.innerHTML = '';

        // Dynamisches Layout: Upgrades & Items = Liste | Skins, VFX, Bank, NFT = Gitter
        const isGridView = ['skin', 'cosmetic', 'collectible', 'pi_bundle'].includes(this.currentShopTabId);

        const container = document.createElement('div');
        container.className = isGridView ? 'shop-grid-view' : 'shop-list-view';

        const items = sm.shopItems.filter(item => {
            let cat = item.type.toLowerCase();
            if (item.type === 'PERMANENT' || item.type === 'ULTIMATE') cat = 'permanent';
            if (item.type === 'CONSUMABLE') cat = 'consumable';
            if (item.type === 'PI_BUNDLE') cat = 'pi_bundle';
            return cat === this.currentShopTabId;
        });

        items.forEach(item => {
            container.appendChild(this.createShopItemElement(item, isGridView));
        });

        this.shopContentEl.appendChild(container);
    }

    private createShopItemElement(item: IShopItem, isGrid: boolean): HTMLElement {
        const sm = this.game.shopManager;
        const t = (k: string) => this.localizationManager.translate(k);
        const itemEl = document.createElement('div');

        const cost = sm.getCost(item);
        const currentLevel = sm.getUpgradeLevel(item.id);
        const maxLevel = item.maxLevel || 1;
        const isMaxed = (item.type === 'PERMANENT' || item.type === 'ULTIMATE') && currentLevel >= maxLevel;

        let btnText = t('btn_buy');
        let btnClass = 'btn-shop-action';
        let isDisabled = false;
        let isPiPrice = !!item.pi_cost;

        const unlockedArray = sm.playerCollectibles.unlocked_collectibles || [];
        const isUnlocked = (item.type === 'SKIN' || item.type === 'COSMETIC' || item.type === 'COLLECTIBLE')
            ? (item.type === 'COLLECTIBLE' ? unlockedArray.includes(item.id) : sm.isCosmeticUnlocked(item.id, item.cosmeticType as any))
            : (item.id === 'premium_license' ? this.game.hasPremiumLicense : false);

        if (isUnlocked) {
            let isEquipped = false;
            if (item.id === 'premium_license') {
                isEquipped = true;
            } else if (item.type === 'COLLECTIBLE') {
                isEquipped = sm.playerCollectibles.equipped_collectible === item.id;
            } else {
                isEquipped = (sm.playerCosmetics.equipped_skin === item.id || sm.playerCosmetics.equipped_projectile === item.id || sm.playerCosmetics.equipped_trail === item.id);
            }

            if (isEquipped) {
                btnText = t('btn_equipped');
                btnClass += ' equipped';
                isDisabled = true;
            } else {
                btnText = t('btn_equip');
            }
        } else if (isMaxed) {
            btnText = t('btn_max_level');
            isDisabled = true;
        } else {
            if (sm.pendingPiPurchase === item.id) {
                btnText = "...";
                isDisabled = true;
            } else if (cost !== null && this.game.coins < cost && !isPiPrice) {
                isDisabled = true;
            }
            if (isPiPrice && !this.game.piManager.isAuthenticated) isDisabled = true;
        }

        const isDailyDeal = this.dailyDeal && this.dailyDeal.skinId === item.id;
        const displayCost = isDailyDeal ? this.dailyDeal.discountedPrice : cost;

        const priceHtml = (!isUnlocked && !isMaxed) ? `
        <div class="price-tag">
            ${isPiPrice ? `<span style="color:var(--pi-yellow)">Ï€</span> ${item.pi_cost}` :
                (isDailyDeal ?
                    `<span style="color:#ff4444; font-size:0.4rem; text-decoration:line-through; margin-right:5px;">${cost}</span> <img src="${piCoin2ImgSrc}"> ${displayCost?.toLocaleString()}` :
                    `<img src="${piCoin2ImgSrc}"> ${cost?.toLocaleString()}`)}
        </div>` : '';

        if (isGrid) {
            itemEl.className = 'shop-card-grid';
            itemEl.innerHTML = `
            <div class="grid-preview-box">
                <img src="${item.iconSrc}" alt="${t(item.nameKey)}">
            </div>
            <div class="card-name" style="font-size:0.5rem; color:#fff; margin-bottom:5px;">${t(item.nameKey)}</div>
            <button class="${btnClass}" id="btn-${item.id}" ${isDisabled ? 'disabled' : ''}>
                <span>${btnText}</span>
                ${priceHtml}
            </button>
        `;
        } else {
            itemEl.className = 'shop-card-list';
            const progress = (currentLevel / maxLevel) * 100;
            itemEl.innerHTML = `
            <div class="card-icon-frame">
                <img src="${item.iconSrc}" alt="Icon">
            </div>
            <div class="card-info">
                <div class="card-title" style="font-size:0.6rem; color:#fff;">${t(item.nameKey)}</div>
                <div class="card-desc">${t(item.descKey)}</div>
                ${item.maxLevel ? `
                    <div class="card-progress-container"><div class="card-progress-bar" style="width: ${progress}%"></div></div>
                ` : ''}
            </div>
            <div class="shop-item-purchase">
                <button class="${btnClass}" id="btn-${item.id}" ${isDisabled ? 'disabled' : ''}>
                    <span>${btnText}</span>
                    ${priceHtml}
                </button>
            </div>
        `;
        }

        // NEW: Click on entire card opens details for ALL items
        itemEl.style.cursor = 'pointer';
        itemEl.addEventListener('click', () => {
            this.showSkinDetails(item);
            this.soundManager.play('uiClick');
        });

        const btn = itemEl.querySelector(`#btn-${item.id}`) as HTMLButtonElement;
        if (btn) {
            btn.onclick = async (e) => {
                e.stopPropagation();

                // 1. Wenn der Button "EQUIP" sagt: Sofort ausrÃ¼sten
                if (btnText === t('btn_equip')) {
                    if (item.type === 'COLLECTIBLE') sm.equipCollectible(item.id);
                    else if (item.cosmeticType) sm.equipCosmetic(item.id, item.cosmeticType);
                    this.soundManager.play('uiClick');
                    this.renderShop();
                    return;
                }

                // 2. Wenn der Button "BUY" sagt (oder Upgrade): Direkt kaufen
                if (!isDisabled) {
                    btn.disabled = true;
                    const success = await sm.purchaseItem(item.id);
                    if (success) {
                        this.soundManager.play('purchaseSuccess');
                        // UI Refresh passiert via renderShop() am Ende oder hier manuell
                        this.renderShop();
                    } else {
                        btn.disabled = false;
                    }
                }
            };
        }

        return itemEl;
    }

    public showShopTab(tabId: string): void {
        this.currentShopTabId = tabId;

        // Buttons visuell umschalten (Typed for TS)
        if (this.shopTabsContainerEl) {
            this.shopTabsContainerEl.querySelectorAll<HTMLElement>('.shop-tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabId);
            });
        }

        // Ganzen Shop neu rendern
        this.renderShop();

        // WICHTIG: Den Scroll-Bereich zurÃ¼ck nach oben setzen
        if (this.shopContentEl) {
            this.shopContentEl.scrollTop = 0;
        }
    }
    public showTab(tabName: string): void { /* Tab-System deaktiviert â€“ Launcher mit Overlays */ }

    public initButtons(): void {
        // --- GLOBALE BUTTONS ---

        // Resume (Pause MenÃ¼)
        const resumeBtn = document.getElementById('resume-button');
        if (resumeBtn) resumeBtn.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            this.game.togglePause();
        });

        // Shop (Pause MenÃ¼)
        const shopBtn = document.getElementById('shop-button');
        if (shopBtn) shopBtn.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            this.toggleShopScreen(true);
        });

        // Restart (Pause & Game Over)
        const restartBtns = ['restart-button', 'restart-from-gameover-button'];
        restartBtns.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', () => {
                this.soundManager.play('uiClick');
                this.game.changeState('MODE_SELECT');
            });
        });

        // Quit / Exit
        const exitBtn = document.getElementById('exit-button');
        if (exitBtn) exitBtn.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            document.getElementById('exit-screen')!.style.display = 'flex';
        });

        const quitBtns = ['quit-button', 'quit-from-gameover-button'];
        quitBtns.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener('click', () => {
                this.soundManager.play('uiClick');
                // Signal an window senden um zum Hub zurÃ¼ckzukehren
                window.dispatchEvent(new CustomEvent('returnToHubRequested'));
            });
        });

        // Rewarded Ad Button (Revive)
        const rewardedAdBtn = document.getElementById('rewarded-ad-button');
        if (rewardedAdBtn) {
            rewardedAdBtn.addEventListener('click', async () => {
                const originalText = rewardedAdBtn.textContent;
                rewardedAdBtn.textContent = globalLocalizationManager.translate('wheel_wait');
                rewardedAdBtn.style.opacity = '0.5';
                rewardedAdBtn.style.pointerEvents = 'none';

                this.soundManager.play('uiClick');
                try {
                    await this.game.piManager.showRewardedAd(() => {
                        this.game.continueAfterAd();
                    });
                } finally {
                    rewardedAdBtn.textContent = originalText;
                    rewardedAdBtn.style.opacity = '1';
                    rewardedAdBtn.style.pointerEvents = 'auto';
                }
            });
        }

        // Mode Select
        document.getElementById('select-campaign-button')!.addEventListener('click', () => { this.soundManager.play('uiClick'); this.game.gameMode = 'CAMPAIGN'; this.game.changeState('LEVEL_START', true); });
        document.getElementById('select-endless-button')!.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            if (!this.game.hasPremiumLicense) {
                alert(this.localizationManager.translate('err_license_required') || 'Premium License Required!');
                return;
            }
            if (this.game.coins < 2500) {
                alert(this.localizationManager.translate('err_not_enough_gfc') || '2500 GFC required!');
                return;
            }
            // Deduct cost and save immediately
            this.game.coins -= 2500;
            this.game.saveGameData();

            this.game.gameMode = 'ENDLESS';
            this.game.changeState('LEVEL_START', true);
        });

        // --- NEU: Back Button im Mode-Select Screen (KORRIGIERT) ---
        const modeBackBtn = document.getElementById('mode-select-back-button');
        if (modeBackBtn) {
            modeBackBtn.addEventListener('click', () => {
                this.soundManager.play('uiClick');

                // PrÃ¼fen, ob wir gerade in einem Spiel sind (Spieler existiert und lebt)
                if (this.game.player && this.game.player.isAlive() && this.game.level > 0) {
                    // Wir kommen aus dem Pause-MenÃ¼ -> ZurÃ¼ck zu Pause
                    this.game.changeState('PAUSED');
                } else {
                    // Wir kommen frisch aus dem Hub -> ZurÃ¼ck zum Hub
                    window.dispatchEvent(new CustomEvent('returnToHubRequested'));
                }
            });
        }

        // Mobile Pause
        const mobPause = document.getElementById('mobile-pause-button');
        if (mobPause) mobPause.addEventListener('click', () => { this.game.togglePause(); });



        // --- NEW LAUNCHER BUTTONS ---

        // Open Overlays from Launcher
        document.getElementById('btn-open-profile')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleProfileScreen(true); });
        document.getElementById('btn-open-gallery')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleGalleryScreen(true); });
        document.getElementById('btn-open-arsenal')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleArsenalScreen(true); });
        document.getElementById('btn-open-intel')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleIntelScreen(true); });
        document.getElementById('btn-open-trophies')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleTrophiesScreen(true); });

        document.getElementById('btn-open-league')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleLeaderboardScreen(true); });
        document.getElementById('btn-open-settings')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.toggleSettingsScreen(true); });
        document.getElementById('btn-open-lucky-wheel')?.addEventListener('click', () => { if (!(window as any).requireLogin()) return; this.soundManager.play('uiClick'); this.showLuckyWheel(); });

        // GENERIC BACK BUTTON LOGIC FOR NEW OVERLAYS
        const closeOverlayGeneric = () => {
            this.soundManager.play('uiClick');
            this.toggleProfileScreen(false);
            this.toggleGalleryScreen(false);
            this.toggleArsenalScreen(false);
            this.toggleIntelScreen(false);
            this.toggleLeaderboardScreen(false);
            this.toggleSettingsScreen(false);
            this.toggleShopScreen(false);
            this.toggleTrophiesScreen(false);

            // ZurÃ¼ck zum korrekten Screen
            const fromHub = document.getElementById('game-wrapper')?.dataset.fromHub === 'true';

            if (fromHub) {
                // Von Hub geÃ¶ffnet -> ZurÃ¼ck zum Hub (Cockpit)
                document.getElementById('game-wrapper')!.dataset.fromHub = 'false';
                window.dispatchEvent(new CustomEvent('returnToHubRequested'));
            } else if (this.game.isPaused || this.game.gameState === 'PAUSED') {
                // Spieler war im Pause-MenÃ¼ (Mission Control) â†’ zurÃ¼ck zu Mission Control
                this.togglePauseMenu(true);
            } else if (this.game.gameState === 'MENU') {
                // Im HauptmenÃ¼ (Launcher) â†’ zeige Launcher
                this.toggleMainMenu(true);
            } else {
                // Fallback -> zurÃ¼ck zum Hub
                window.dispatchEvent(new CustomEvent('returnToHubRequested'));
            }
        };

        document.getElementById('profile-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('gallery-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('arsenal-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('intel-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('trophies-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('leaderboard-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('shop-back-button')?.addEventListener('click', closeOverlayGeneric);
        document.getElementById('settings-back-button')?.addEventListener('click', closeOverlayGeneric);

        // --- OLD SHOP LOGIK ---
        // (nav-leaderboard, nav-shop, nav-settings Listener sind bereits
        //  in der Hub-Initialisierung gebunden â€” keine Duplikate hier!)

        // Top Close Button (Redundant safety)
        const shopCloseTop = document.getElementById('shop-close-top');
        if (shopCloseTop) shopCloseTop.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            this.toggleShopScreen(false);
            if (this.game.isPaused && this.game.gameState === 'PAUSED') {
                this.togglePauseMenu(true);
            } else {
                const menuVisible = document.getElementById('menu-container')?.style.display !== 'none';
                if (!menuVisible) {
                    window.dispatchEvent(new CustomEvent('returnToHubRequested'));
                }
            }
        });

        // Shop Tabs
        this.shopTabsContainerEl.querySelectorAll('.shop-tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = (button as HTMLElement).dataset.tab;
                if (tabId) {
                    this.soundManager.play('uiClick'); // Feedback-Sound
                    this.showShopTab(tabId);
                }
            });
        });

        // --- IN-GAME MENÃœ TABS (deaktiviert â€“ Launcher-System aktiv) ---

        // Settings Slider/Toggles
        // Settings: sichere Element-Zugriffe (Elemente sind jetzt im epic settings overlay)
        const volSlider = document.getElementById('volume-master') as HTMLInputElement;
        if (volSlider) { volSlider.addEventListener('input', (e: any) => { this.settings.masterVolume = parseFloat(e.target.value); this.applySettings(); this.saveSettings(); }); volSlider.value = this.settings.masterVolume.toString(); }
        document.getElementById('toggle-music')?.addEventListener('click', () => { this.soundManager.play('uiClick'); this.settings.music = !this.settings.music; this.applySettings(); this.saveSettings(); });
        document.getElementById('toggle-sfx')?.addEventListener('click', () => { this.soundManager.play('uiClick'); this.settings.sfx = !this.settings.sfx; this.applySettings(); this.saveSettings(); });
        document.getElementById('toggle-particles')?.addEventListener('click', () => { this.soundManager.play('uiClick'); this.settings.particles = (this.settings.particles + 1) % 3; this.applySettings(); this.saveSettings(); });
        document.getElementById('toggle-shake')?.addEventListener('click', () => { this.soundManager.play('uiClick'); this.settings.screenShake = !this.settings.screenShake; this.applySettings(); this.saveSettings(); });
        const toggleCrt = document.getElementById('toggle-crt');
        if (toggleCrt) toggleCrt.addEventListener('click', () => { this.soundManager.play('uiClick'); this.settings.crt = !this.settings.crt; this.applySettings(); this.saveSettings(); });

        // Language Toggle
        const toggleLang = document.getElementById('toggle-language');
        if (toggleLang) toggleLang.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            this.langSelectSource = 'settings';
            this.langSelectScreen.style.display = 'flex';
            this.langBackButton.style.display = 'block';
        });

        // Language Selection Buttons
        this.langSelectScreen.querySelectorAll('.lang-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = (btn as HTMLElement).dataset.lang;
                if (lang) {
                    this.soundManager.play('uiClick');
                    this.localizationManager.setLanguage(lang);
                    this.populateAllTranslatedContent();
                    this.langSelectScreen.style.display = 'none';
                    if (this.langBackButton) this.langBackButton.style.display = 'none';

                    // Sync with server immediately
                    this.game.savePlayerDataToServer();
                }
            });
        });

        // Language Back Button logic
        if (this.langBackButton) {
            this.langBackButton.addEventListener('click', () => {
                this.soundManager.play('uiClick');
                this.langSelectScreen.style.display = 'none';
                this.langBackButton.style.display = 'none';
            });
        }

        // Skin Modal Events
        const skinModalClose = document.getElementById('skin-modal-close');
        if (skinModalClose) skinModalClose.addEventListener('click', () => { this.soundManager.play('uiClick'); this.skinModalEl.style.display = 'none'; });
        if (this.skinModalEl) this.skinModalEl.addEventListener('click', (e) => { if (e.target === this.skinModalEl) { this.skinModalEl.style.display = 'none'; } });

        // In-Game "Back to Hub"
        const backHubBtn = document.getElementById('back-to-hub-button');
        if (backHubBtn) backHubBtn.addEventListener('click', () => {
            this.soundManager.play('uiClick');
            window.dispatchEvent(new CustomEvent('returnToHubRequested'));
        });

        // Modal close
        this.collectibleModalEl.addEventListener('click', () => this.hideCollectibleModal());
        const collectibleModalClose = document.getElementById('collectible-modal-close');
        if (collectibleModalClose) collectibleModalClose.addEventListener('click', () => this.hideCollectibleModal());
        const modalContent = this.collectibleModalEl.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => e.stopPropagation());
        }
    }

    public applySettings(): void {
        const t = (k: string) => this.localizationManager.translate(k); const setButtonText = (id: string, text: string) => { const el = document.getElementById(id); if (el) el.textContent = text; }; const setButtonActive = (id: string, isActive: boolean) => { const el = document.getElementById(id) as HTMLButtonElement; if (el) el.classList.toggle('active', isActive); }; setButtonText('toggle-language', t('lang_native_name')); setButtonText('toggle-music', this.settings.music ? t('on') : t('off')); setButtonText('toggle-sfx', this.settings.sfx ? t('on') : t('off')); setButtonText('toggle-particles', [t('off'), t('low'), t('high')][this.settings.particles]!); setButtonText('toggle-shake', this.settings.screenShake ? t('on') : t('off')); setButtonActive('toggle-music', this.settings.music); setButtonActive('toggle-sfx', this.settings.sfx); setButtonActive('toggle-shake', this.settings.screenShake);

        // CRT Settings
        setButtonText('toggle-crt', this.settings.crt ? t('on') : t('off'));
        setButtonActive('toggle-crt', this.settings.crt);
        if (this.settings.crt) document.getElementById('epic-toggle-crt')?.classList.add('active');
        else document.getElementById('epic-toggle-crt')?.classList.remove('active');

        // New Settings
        // New Settings
        const afGroup = document.querySelector('.setting-group-epic[data-setting-id="autofire"] .multi-toggle');
        if (afGroup) {
            Array.from(afGroup.children).forEach(c => c.classList.remove('active'));
            const activeBtn = afGroup.querySelector(`.mt-btn[data-val="${this.settings.autoFire}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }
        const vibBtn = document.getElementById('epic-toggle-vibration');
        if (vibBtn) {
            vibBtn.classList.toggle('active', this.settings.vibration);
            vibBtn.textContent = this.settings.vibration ? this.localizationManager.translate('hub_on') : this.localizationManager.translate('hub_off');
        }
        if (this.settings.crt) document.body.classList.add('crt-enabled'); else document.body.classList.remove('crt-enabled');

        this.soundManager.setVolume(this.settings.masterVolume); this.soundManager.toggleMusic(this.settings.music);
    }
    public saveSettings(): void {
        localStorage.setItem('galaxyFallSettings', JSON.stringify(this.settings));
        this.applySettings();
    }

    public vibrate(ms: number): void {
        if (this.settings.vibration && navigator.vibrate) {
            navigator.vibrate(ms);
        }
    }
    public loadSettings() {
        // Default settings
        const defaultSettings = {
            masterVolume: 0.5, music: true, sfx: true, particles: 1,
            screenShake: true, crt: false, autoFire: 'always', vibration: true
        };

        const saved = localStorage.getItem('galaxyFallSettings');
        if (!saved || saved === 'undefined') {
            this.settings = { ...defaultSettings };
            return this.settings;
        }

        try {
            const parsed = JSON.parse(saved);

            // Migration / Sanity Check: Default to 'always' if missing or old boolean format
            if (typeof parsed.autoFire === 'boolean') {
                parsed.autoFire = parsed.autoFire ? 'always' : 'off';
            }
            if (!parsed.autoFire || (parsed.autoFire !== 'always' && parsed.autoFire !== 'move' && parsed.autoFire !== 'off')) {
                parsed.autoFire = 'always';
            }

            this.settings = { ...defaultSettings, ...parsed };
        } catch (e) {
            this.settings = { ...defaultSettings };
        }

        return this.settings;
    }
    public populateAllTranslatedContent() { this.populateProfile(); this.populateGalerie(); this.populateArsenal(); this.populateGegner(); this.localizationManager.applyTranslationsToUI(); this.applySettings(); if (this.wheelModalActive) this.drawWheel(); }

    private wheelModalActive = false;
    private isWheelSpinning = false;
    private currentSpinPool: IWheelReward[] = [];
    private winningReward: IWheelReward | null = null;
    private serverWinningIndex: number = -1;
    public showLuckyWheel(): void {
        const modal = document.getElementById('lucky-wheel-modal');
        if (!modal) return;
        modal.style.display = 'flex';
        this.wheelModalActive = true;
        if (this.currentSpinPool.length === 0) this.populateDefaultWheelPool();
        this.drawWheel();
        this.updateWheelUI();
        this.startBombTimerTick(); // Live countdown

        // Optional: Fetch fresh status from server
        const { uid } = this.game.getPlayerIdentity();
        if (uid && uid !== 'UNREGISTERED') {
            fetch(`${API_BASE_URL}/wheel-status?pi_uid=${uid}`)
                .then(r => r.json())
                .then(data => {
                    this.game.shopManager.wheelData = { ...this.game.shopManager.wheelData, ...data };
                    this.updateWheelUI();
                }).catch(e => console.error(e));
        }
    }

    public hideLuckyWheel(): void {
        const modal = document.getElementById('lucky-wheel-modal');
        if (modal) modal.style.display = 'none';
        this.wheelModalActive = false;
        this.stopBombTimerTick(); // Stop live countdown
    }

    public updateWheelUI(): void {
        const sm = this.game.shopManager;
        const btn = document.getElementById('wheel-spin-btn') as HTMLButtonElement;
        const teaserBtn = document.getElementById('hub-wheel-teaser-btn');
        const teaserTimer = document.getElementById('hub-wheel-timer');
        const t = (k: string) => this.localizationManager.translate(k);

        const now = Date.now();
        const nextFree = sm.wheelData.nextFreeSpinAt || 0;
        const canFree = now >= nextFree;
        const adsLeft = 10 - sm.wheelData.adSpinsToday;

        this.drawMiniWheel();

        // --- Update teaser timer in Hub ---
        if (teaserTimer) {
            if (canFree) {
                teaserTimer.textContent = t('wheel_ready') || 'READY!';
                teaserTimer.style.color = '#00ff88';
            } else {
                const diff = nextFree - now;
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                teaserTimer.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
                teaserTimer.style.color = '#ff3300';
            }
        }
        if (teaserBtn) teaserBtn.onclick = () => this.showLuckyWheel();

        // --- Update bomb timer display ---
        this.refreshBombTimer();

        if (!btn) return;

        if (this.isWheelSpinning) {
            btn.textContent = t('wheel_wait');
            btn.disabled = true;
            return;
        }

        if (canFree) {
            btn.textContent = t('wheel_spin_free');
            btn.className = 'retro-btn big glow-cyan';
            btn.disabled = false;
            btn.onclick = () => this.startWheelSpin(true);
        } else if (adsLeft > 0) {
            btn.textContent = `${t('wheel_spin_ad')} (${adsLeft}/10)`;
            btn.className = 'retro-btn big glow-purple';
            btn.disabled = false;
            btn.onclick = () => this.startWheelSpin(false);
        } else {
            btn.textContent = t('wheel_cooldown');
            btn.disabled = true;
            btn.className = 'retro-btn big disabled';
        }
    }


    public refreshBombTimer(): void {
        const sm = this.game.shopManager;
        const t = (k: string) => this.localizationManager.translate(k);

        const now = Date.now();
        const nextFree = sm.wheelData.nextFreeSpinAt || 0;
        const canFree = now >= nextFree;
        const adsLeft = 10 - sm.wheelData.adSpinsToday;

        const diff = Math.max(0, nextFree - now);
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const urgent = diff < 60000;

        // Helper: set a digit cell by id; supports hub- and modal- prefix
        const setDigit = (id: string, val: number, extraClass = '') => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = String(val);
                el.className = 'bomb-digit' + extraClass + (urgent ? ' urgent' : '');
            }
        };

        // â”€â”€ Modal bomb timer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const bombTimer = document.getElementById('wheel-bomb-timer');
        const readyDisplay = document.getElementById('wheel-ready-display');
        const adsLeftDisplay = document.getElementById('wheel-ads-left-display');

        if (bombTimer) {
            if (canFree) {
                bombTimer.style.display = 'none';
                if (readyDisplay) {
                    readyDisplay.style.display = 'block';
                    readyDisplay.textContent = 'âœ¦ ' + (t('wheel_ready') || 'READY!') + ' âœ¦';
                }
            } else {
                bombTimer.style.display = 'flex';
                if (readyDisplay) readyDisplay.style.display = 'none';

                setDigit('bt-h1', Math.floor(h / 10));
                setDigit('bt-h2', h % 10);
                setDigit('bt-m1', Math.floor(m / 10));
                setDigit('bt-m2', m % 10);
                setDigit('bt-s1', Math.floor(s / 10));
                setDigit('bt-s2', s % 10);

                const labelEl = document.getElementById('wheel-timer-label');
                if (labelEl) labelEl.textContent = t('wheel_next_free') || 'NEXT FREE SPIN';

                if (adsLeftDisplay) {
                    adsLeftDisplay.textContent = adsLeft > 0
                        ? `${t('wheel_ads_left') || 'SCANS LEFT:'} ${adsLeft}/10`
                        : (t('wheel_cooldown') || 'COOLDOWN');
                }
            }
        }

        // â”€â”€ Hub mini bomb timer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const hubBombEl = document.getElementById('hub-bomb-timer');
        const hubReadyEl = document.getElementById('hub-wheel-timer');

        if (hubBombEl && hubReadyEl) {
            if (canFree) {
                hubBombEl.style.display = 'none';
                hubReadyEl.style.display = 'inline';
                hubReadyEl.textContent = t('wheel_ready') || 'READY!';
                hubReadyEl.style.color = '#00ff88';
            } else {
                hubBombEl.style.display = 'flex';
                hubReadyEl.style.display = 'none';

                setDigit('hub-bt-h1', Math.floor(h / 10), ' hub-digit');
                setDigit('hub-bt-h2', h % 10, ' hub-digit');
                setDigit('hub-bt-m1', Math.floor(m / 10), ' hub-digit');
                setDigit('hub-bt-m2', m % 10, ' hub-digit');
                setDigit('hub-bt-s1', Math.floor(s / 10), ' hub-digit');
                setDigit('hub-bt-s2', s % 10, ' hub-digit');
            }
        }

        // If timer just expired, refresh full UI
        if (!canFree && diff === 0) this.updateWheelUI();
    }


    public startBombTimerTick(): void {
        this.stopBombTimerTick();
        this.refreshBombTimer();
        this.bombTimerInterval = setInterval(() => this.refreshBombTimer(), 1000);
    }

    public stopBombTimerTick(): void {
        if (this.bombTimerInterval !== null) {
            clearInterval(this.bombTimerInterval);
            this.bombTimerInterval = null;
        }
    }

    /** Always-on ticker for the Hub teaser â€” started once after init */
    public startHubBombTick(): void {
        if (this.hubBombTimerInterval) return; // already running
        this.refreshBombTimer();
        this.hubBombTimerInterval = setInterval(() => this.refreshBombTimer(), 1000);
    }

    private drawMiniWheel(): void {
        const canvas = document.getElementById('hub-wheel-mini-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, 100, 100);
        const centerX = 50, centerY = 50, radius = 45;
        const rewards = [
            { c: '#00ffff' }, { c: '#5555ff' }, { c: '#ff00ff' }, { c: '#00ff00' },
            { c: '#ffaa00' }, { c: '#ff5555' }, { c: '#ffff00' }, { c: '#ffffff' }
        ];
        const sliceAngle = (Math.PI * 2) / 8;
        rewards.forEach((r, i) => {
            const angle = i * sliceAngle + this.wheelRotation;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
            ctx.fillStyle = r.c;
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#222';
        ctx.fill();
    }

    private wheelRotation = 0;
    private wheelImages: { [key: string]: HTMLImageElement } = {};
    private preloadWheelImages(): void {
        const sources: { [key: string]: any } = {
            'COINS': piCoin2ImgSrc,
            'SPECIAL': powerupRepairKitSrc,
            'ULTRA': powerupShieldSrc,
            'PHOENIX': phoenixCorePurpleSrc,
            'skin_sentinel': playerImgSrc2,
            'skin_renegade': playerImgSrc3,
            'skin_avenger': playerImgSrc4,
            'skin_void': playerImgSrcVoid,
            'skin_marauder': playerImgSrcMarauder,
            'skin_paladin': playerImgSrcPaladin,
            'skin_spectre': playerImgSrcSpectre,
            'skin_gold': playerImgSrcGold,
            'skin_goliath': playerImgSrcGoliath,
            'skin_juggernaut': playerImgSrcJuggernaut,
            'skin_leviathan': playerImgSrcLeviathan,
        };
        for (const [k, s] of Object.entries(sources)) {
            const img = new Image();
            img.src = s;
            this.wheelImages[k] = img;
        }
    }

    private populateDefaultWheelPool(): void {
        this.currentSpinPool = [
            { id: 1, type: 'COINS', value: 1000, label: 'PITTANCE', rarity: 'COMMON' },
            { id: 2, type: 'COINS', value: 5000, label: 'STARTER KIT', rarity: 'COMMON' },
            { id: 3, type: 'COINS', value: 10000, label: 'PIONEER FUND', rarity: 'COMMON' },
            { id: 4, type: 'COINS', value: 25000, label: 'MERCENARY PAY', rarity: 'COMMON' },
            { id: 5, type: 'COINS', value: 50000, label: "COMMANDER'S CUT", rarity: 'RARE' },
            { id: 6, type: 'COINS', value: 100000, label: 'ELITE HOARD', rarity: 'RARE' },
            { id: 7, type: 'COINS', value: 250000, label: 'APEX LOOT', rarity: 'EPIC' },
            { id: 8, type: 'COINS', value: 500000, label: 'LEGEND FUND', rarity: 'LEGENDARY' },
            { id: 9, type: 'PHOENIX', value: 1, label: 'REBIRTH CORE', rarity: 'COMMON' },
            { id: 10, type: 'PHOENIX', value: 3, label: 'IMMORTALITY PROTOCOL', rarity: 'RARE' },
            { id: 11, type: 'SPECIAL', value: 'SCORE_BOOST', label: 'DATA OVERDRIVE', rarity: 'COMMON' },
            { id: 12, type: 'SPECIAL', value: 'NUKE', label: 'CORE OVERLOAD', rarity: 'RARE' },
            { id: 13, type: 'SPECIAL', value: 'BLACK_HOLE', label: 'VOID SINGULARITY', rarity: 'RARE' },
            { id: 14, type: 'ULTRA', value: 'LASER_BEAM', label: 'BEAM OF JUDGMENT', rarity: 'EPIC' },
            { id: 15, type: 'ULTRA', value: 'HOMING_MISSILES', label: 'WAR-MACHINE', rarity: 'EPIC' },
            { id: 16, type: 'SKIN', value: 'skin_marauder', label: 'MARAUDER SHIP', rarity: 'RARE' },
            { id: 17, type: 'SKIN', value: 'skin_spectre', label: 'SPECTRE SHIP', rarity: 'RARE' },
            { id: 18, type: 'SKIN', value: 'skin_paladin', label: 'PALADIN SHIP', rarity: 'RARE' },
            { id: 19, type: 'SKIN', value: 'skin_avenger', label: 'AVENGER SHIP', rarity: 'EPIC' },
            { id: 20, type: 'SKIN', value: 'skin_void', label: 'VOID SHIP', rarity: 'EPIC' },
            { id: 21, type: 'SKIN', value: 'skin_gold', label: 'GOLDEN VANGUARD', rarity: 'LEGENDARY' },
            { id: 22, type: 'SKIN', value: 'skin_sentinel', label: 'SENTINEL PRIME', rarity: 'LEGENDARY' },
            { id: 23, type: 'COLLECTIBLE', value: 'collectible_paradise', label: 'PARADISE ORB', rarity: 'RARE' },
            { id: 24, type: 'COLLECTIBLE', value: 'collectible_sporestrike', label: 'SPORE STRIKE', rarity: 'RARE' },
            { id: 25, type: 'COLLECTIBLE', value: 'collectible_potassium', label: 'POTASSIUM CORE', rarity: 'RARE' },
            { id: 26, type: 'COLLECTIBLE', value: 'collectible_retrogamer', label: 'RETRO GAMER', rarity: 'EPIC' },
            { id: 27, type: 'COLLECTIBLE', value: 'collectible_mazerunner', label: 'MAZE RUNNER', rarity: 'EPIC' },
            { id: 28, type: 'COLLECTIBLE', value: 'collectible_koopaking', label: 'KOOPA KING', rarity: 'LEGENDARY' },
            { id: 29, type: 'COINS', value: 2500, label: 'SCOUT EARNINGS', rarity: 'COMMON' },
            { id: 30, type: 'SPECIAL', value: 'SCORE_BOOST', label: 'AEGIS LINK', rarity: 'COMMON' },
            { id: 31, type: 'PHOENIX', value: 5, label: 'ETERNAL FLAME', rarity: 'EPIC' },
            { id: 32, type: 'COINS', value: 75000, label: 'VANGUARD BONUS', rarity: 'RARE' },
        ];
    }

    private drawWheel(): void {
        if (Object.keys(this.wheelImages).length === 0) this.preloadWheelImages();
        if (this.currentSpinPool.length === 0) this.populateDefaultWheelPool();

        const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;

        // --- ULTRA-SHARP HIGH-DPI RENDERING ---
        // Increase internal resolution to 4x the display size
        const displayWidth = 300;
        const displayHeight = 300;
        const renderScale = 4;

        if (canvas.width !== displayWidth * renderScale) {
            canvas.width = displayWidth * renderScale;
            canvas.height = displayHeight * renderScale;
            // Map the CSS size to the display size
            canvas.style.width = `${displayWidth}px`;
            canvas.style.height = `${displayHeight}px`;
        }

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 145 * renderScale;
        const innerRadius = 35 * renderScale;

        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const RARITY_COLORS: { [key: string]: { c1: string, c2: string } } = {
            COMMON: { c1: '#001111', c2: '#00ffff' },
            RARE: { c1: '#000822', c2: '#3366ff' },
            EPIC: { c1: '#110022', c2: '#ff00ff' },
            LEGENDARY: { c1: '#111100', c2: '#ffa500' }
        };

        const sliceAngle = (Math.PI * 2) / 8;

        // Draw outer tech ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5 * renderScale, 0, Math.PI * 2);
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 1 * renderScale;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.restore();

        this.currentSpinPool.forEach((reward, i) => {
            const angle = i * sliceAngle + this.wheelRotation - Math.PI / 2;
            const colors = RARITY_COLORS[reward.rarity] || RARITY_COLORS.COMMON;

            // --- SLICE BACKGROUND ---
            ctx.save();
            const grad = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius);
            grad.addColorStop(0, colors.c1);
            grad.addColorStop(0.7, '#000');
            grad.addColorStop(1, colors.c1);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
            ctx.fillStyle = grad;
            ctx.fill();

            // Slice border
            ctx.strokeStyle = colors.c2;
            ctx.lineWidth = 1 * renderScale;
            ctx.globalAlpha = 0.3;
            ctx.stroke();
            ctx.restore();

            // --- CONTENT ---
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + sliceAngle / 2);

            // Icon "Pod" - Decorative high-end background for icon
            const podX = radius * 0.77;
            const podSize = 22 * renderScale;

            ctx.beginPath();
            ctx.arc(podX, 0, podSize, 0, Math.PI * 2);
            const podGrad = ctx.createRadialGradient(podX, 0, 0, podX, 0, podSize);
            podGrad.addColorStop(0, 'rgba(0,0,0,0.8)');
            podGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = podGrad;
            ctx.fill();

            ctx.strokeStyle = colors.c2;
            ctx.lineWidth = 0.5 * renderScale;
            ctx.globalAlpha = 0.5;
            ctx.stroke();

            // Icon Rendering
            const iconKey = reward.type === 'SKIN' ? reward.value : reward.type;
            const icon = this.wheelImages[iconKey];
            if (icon && icon.complete) {
                const iconSize = 38 * renderScale; // Increased size
                ctx.shadowBlur = 15 * renderScale;
                ctx.shadowColor = colors.c2;
                ctx.drawImage(icon, podX - iconSize / 2, -iconSize / 2, iconSize, iconSize);
            }

            // Text Rendering
            ctx.textAlign = 'left';
            ctx.shadowBlur = 8 * renderScale;
            ctx.shadowColor = colors.c2;

            // Label
            const textStartX = radius * 0.28; // Start just outside the hub
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${5 * renderScale}px 'Press Start 2P', cursive`;
            ctx.fillText(reward.label, textStartX, -4 * renderScale);

            // Value / Rarity
            ctx.fillStyle = colors.c2;
            ctx.font = `900 ${6 * renderScale}px Arial`;
            let sub: string = reward.rarity;
            if (reward.type === 'COINS') sub = `+${reward.value.toLocaleString()}`;
            else if (reward.type === 'SKIN' || reward.type === 'COLLECTIBLE') sub = 'PERMANENT';
            ctx.fillText(sub, textStartX, 10 * renderScale);

            ctx.restore();
        });

        // --- HUB ---
        ctx.save();
        ctx.translate(centerX, centerY);
        const hubGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, innerRadius);
        hubGrad.addColorStop(0, '#fff');
        hubGrad.addColorStop(0.3, '#0ff');
        hubGrad.addColorStop(1, '#001122');
        ctx.beginPath();
        ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
        ctx.fillStyle = hubGrad;
        ctx.fill();
        ctx.restore();
    }

    private async startWheelSpin(isFree: boolean): Promise<void> {
        if (this.isWheelSpinning) return;
        const sm = this.game.shopManager;
        const { uid } = this.game.getPlayerIdentity();
        if (!uid || uid === 'UNREGISTERED') return;

        if (!isFree) {
            try {
                const statusText = document.getElementById('wheel-status-text');
                statusText!.textContent = this.localizationManager.translate('wheel_wait');
                const PiSDK = (window as any).Pi;
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

                if (PiSDK && (PiSDK.Ads || PiSDK.ads)) {
                    const ads = PiSDK.Ads || PiSDK.ads;
                    const adPromise = ads.showAd("rewarded");
                    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve("TIMEOUT"), 8000));
                    const adResult: any = await Promise.race([adPromise, timeoutPromise]);

                    if (adResult === "TIMEOUT") {
                        console.warn("Ad timeout in wheel");
                    } else {
                        const resultStatus = typeof adResult === 'string' ? adResult : (adResult?.result || null);
                        if (resultStatus !== "AD_REWARDED" && !isLocal) {
                            statusText!.textContent = this.localizationManager.translate('wheel_ad_error');
                            return;
                        }
                    }
                } else if (!isLocal) {
                    statusText!.textContent = globalLocalizationManager.translate('msg_pi_sdk_missing');
                    return;
                }
            } catch (e) {
                console.error("Ad error", e);
                const statusText = document.getElementById('wheel-status-text');
                statusText!.textContent = this.localizationManager.translate('wheel_ad_error');
                return;
            }
        }

        this.isWheelSpinning = true;
        document.getElementById('wheel-status-text')!.textContent = globalLocalizationManager.translate('msg_loading_network');
        this.updateWheelUI();

        // --- FETCH SPIN RESULT FROM SERVER ---
        try {
            const res = await fetch(`${API_BASE_URL}/spin-wheel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pi_uid: uid, isFree })
            });

            if (!res.ok) throw new Error("Spin rejected by server");
            const data = await res.json();

            // Server determines the pool and the winner
            this.currentSpinPool = data.spinPool;
            this.serverWinningIndex = data.winningIndex;
            this.winningReward = data.reward;

            // Sync local state
            this.game.coins = data.newBalance;
            sm.wheelData.lastFreeSpin = data.lastFreeSpin;
            sm.wheelData.adSpinsToday = data.adSpinsToday;
            if (data.nextFreeSpinAt) sm.wheelData.nextFreeSpinAt = data.nextFreeSpinAt;
            sm.saveWheelData();

        } catch (e) {
            console.error(e);
            this.isWheelSpinning = false;
            document.getElementById('wheel-status-text')!.textContent = globalLocalizationManager.translate('msg_network_err');
            this.updateWheelUI();
            return;
        }

        const spinTime = 6000 + Math.random() * 2000;
        const startRotation = this.wheelRotation % (Math.PI * 2);
        const extraSpins = 12 + Math.random() * 4;

        // Winning slice calculation: pointer is at 1.5 * PI (top)
        const sliceWidth = (Math.PI * 2) / 8;
        const targetSliceRotation = (1.5 * Math.PI - (this.serverWinningIndex * sliceWidth) - (sliceWidth / 2));
        const finalRotation = startRotation + (Math.PI * 2 * extraSpins) + (targetSliceRotation - startRotation);

        let startTime: number | null = null;
        let lastTickIndex = -1;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / spinTime, 1);
            const easeOut = 1 - Math.pow(1 - progress, 5);
            this.wheelRotation = startRotation + (finalRotation - startRotation) * easeOut;

            const currentTickIndex = Math.floor(((this.wheelRotation % (Math.PI * 2)) / (Math.PI * 2)) * 8);
            if (currentTickIndex !== lastTickIndex) {
                this.soundManager.play('uiClick');
                lastTickIndex = currentTickIndex;
            }

            this.drawWheel();
            if (progress < 1) requestAnimationFrame(animate);
            else this.completeSpin();
        };

        requestAnimationFrame(animate);
    }

    private completeSpin(): void {
        this.isWheelSpinning = false;
        const statusText = document.getElementById('wheel-status-text');
        const win = this.winningReward;
        if (!win) return;
        const t = (k: string, rep?: any) => this.localizationManager.translate(k, rep);

        // Visual feedback
        const canvas = document.getElementById('wheel-canvas');
        if (canvas) {
            canvas.classList.add('win-flash-animation');
            setTimeout(() => canvas.classList.remove('win-flash-animation'), 1000);
        }
        this.soundManager.play('purchaseSuccess');

        if (win.type === 'COINS') {
            statusText!.textContent = `>>> ${t('wheel_win_coins', { amount: win.value.toLocaleString() })} <<<`;
            if (win.fallback) statusText!.textContent += ` ${t('wheel_win_coins_converted')}`;
        } else if (win.type === 'SPECIAL') {
            this.game.shopManager.wheelData.inventory.specials.push(win.value);
            statusText!.textContent = `>>> ${t('wheel_win_special', { item: win.value })} <<<`;
        } else if (win.type === 'ULTRA') {
            this.game.shopManager.wheelData.inventory.ultras.push(win.value);
            statusText!.textContent = `>>> ${t('wheel_win_ultra', { item: win.value })} <<<`;
        } else if (win.type === 'PHOENIX') {
            this.game.shopManager.wheelData.inventory.extraRevives += win.value;
            statusText!.textContent = `>>> ${t('wheel_win_phoenix', { amount: String(win.value) })} <<<`;
        } else if (win.type === 'SKIN') {
            statusText!.textContent = `>>> ${t('wheel_win_skin', { label: win.label })} <<<`;
        } else if (win.type === 'COLLECTIBLE') {
            statusText!.textContent = `>>> ${t('wheel_win_collectible', { label: win.label })} <<<`;
        }

        this.game.saveGameData();
        this.updateWheelUI();
        if ((window as any).updateHubUI) (window as any).updateHubUI();
    }

    private applyWheelReward(win: any): void {
        const sm = this.game.shopManager;
        const statusText = document.getElementById('wheel-status-text');
        const t = (k: string, rep?: any) => this.localizationManager.translate(k, rep);

        // PIONEER GRADE REWARD LOGIC
        if (win.t === 'COINS') {
            this.game.coins += win.v;
            if (statusText) statusText.textContent = `>>> ${t('wheel_win_coins', { amount: win.v.toLocaleString() })} <<<`;
            this.game.saveGameData();
            if (typeof (window as any).syncCoinsWithServer === 'function') (window as any).syncCoinsWithServer(this.game.coins);
        } else if (win.t === 'SPECIAL') {
            const item = typeof win.v === 'string' ? win.v : ['NUKE', 'BLACK_HOLE', 'SCORE_BOOST'][Math.floor(Math.random() * 3)];
            sm.wheelData.inventory.specials.push(item);
            if (statusText) statusText.textContent = `>>> ${t('wheel_win_special', { item })} <<<`;
        } else if (win.t === 'ULTRA') {
            const item = typeof win.v === 'string' ? win.v : ['LASER_BEAM', 'HOMING_MISSILES'][Math.floor(Math.random() * 2)];
            sm.wheelData.inventory.ultras.push(item);
            if (statusText) statusText.textContent = `>>> ${t('wheel_win_ultra', { item })} <<<`;
        } else if (win.t === 'PHOENIX') {
            sm.wheelData.inventory.extraRevives += win.v;
            if (statusText) statusText.textContent = `>>> ${t('wheel_win_phoenix', { amount: String(win.v) })} <<<`;
        } else if (win.t === 'SKIN') {
            sm.unlockSkin(win.v);
            if (statusText) statusText.textContent = `>>> ${t('wheel_win_skin', { label: win.label })} <<<`;
        } else if (win.t === 'COLLECTIBLE') {
            sm.unlockCollectible(win.v);
            if (statusText) statusText.textContent = `>>> ${t('wheel_win_collectible', { label: win.label })} <<<`;
        }

        sm.saveWheelData();

        if ((window as any).syncGlobalGFC) (window as any).syncGlobalGFC(this.game.coins, this.game);
        if ((window as any).updateHubUI) (window as any).updateHubUI();
    }

    public populateProfile(): void {
        const listEl = document.getElementById('spiel-view');
        if (!listEl) return;

        const statsMgr = this.game.statsManager;
        const am = this.game.achievementManager;

        const highscore = this.game.highscore;
        // @ts-ignore
        const totalCoins = statsMgr ? statsMgr.stats.total_coins_collected : this.game.coins;
        const gamesPlayed = statsMgr ? statsMgr.stats.missions_completed : 0;
        const enemiesDestroyed = statsMgr ? statsMgr.stats.total_kills : 0;
        const playtimeSeconds = statsMgr ? statsMgr.stats.playtime_seconds : 0;

        const sessionsKills = statsMgr ? statsMgr.sessionStats.kills : 0;
        const totalKills = enemiesDestroyed + sessionsKills;

        const hours = Math.floor(playtimeSeconds / 3600);
        const minutes = Math.floor((playtimeSeconds % 3600) / 60);

        const t = (k: string) => this.localizationManager.translate(k);

        // Define Rank
        let r = "hub_rookie";
        if (highscore > 25000) r = "hub_cadet";
        if (highscore > 100000) r = "hub_ace";
        if (highscore > 500000) r = "hub_commander";
        if (highscore > 1000000) r = "hub_legend";
        const rankTitle = t(r);

        // XP Calculation (same logic as Hub)
        const nextThresholds = [5000, 15000, 50000, 150000, 500000, 1000000, 2500000, 5000000];
        let level = 1;
        let currentLevelScore = 0;
        let nextLevelScore = nextThresholds[0];

        for (let i = 0; i < nextThresholds.length; i++) {
            if (highscore >= nextThresholds[i]) {
                level = i + 2;
                currentLevelScore = nextThresholds[i];
                nextLevelScore = nextThresholds[i + 1] || nextThresholds[i] * 2;
            } else { break; }
        }
        const xpProgress = Math.min(100, Math.floor(((highscore - currentLevelScore) / (nextLevelScore - currentLevelScore)) * 100));

        // Get equipped skin/collectible for avatar
        const sm = this.game.shopManager;
        const equippedSkinId = sm.playerCosmetics.equipped_skin || 'skin_default';
        const equippedCollectibleId = sm.playerCollectibles.equipped_collectible;

        let avatarSrc = playerImgSrc1;
        const skinItem = sm.shopItems.find(i => i.id === equippedSkinId);
        if (skinItem) avatarSrc = skinItem.iconSrc;
        else if (equippedSkinId === 'skin_default') avatarSrc = playerImgSrc1;

        const isMinted = equippedCollectibleId ? (sm.playerCollectibles.minted_collectibles || []).includes(equippedCollectibleId) : false;

        let html = `
            <div class="profile-dashboard">
                <div class="pilot-identity-header">
                    <div class="pilot-avatar-frame ${isMinted ? 'minted-frame' : ''}">
                        <img src="${avatarSrc}" alt="Avatar">
                        ${isMinted ? '<div class="minted-badge-mini">NFT</div>' : ''}
                    </div>
                    <div class="pilot-header-info">
                        <div class="pilot-name-display">${this.game.piManager.username || 'GUEST PILOT'}</div>
                        <div class="pilot-rank-display">${rankTitle} <span class="lvl-tag">LVL ${level}</span></div>
                        <div class="xp-bar-container">
                            <div class="xp-bar-fill" style="width: ${xpProgress}%"></div>
                            <span class="xp-label">${xpProgress}% TO NEXT LEVEL</span>
                        </div>
                    </div>
                </div>

                <div class="profile-stats-grid">
                    <div class="stat-card-epic">
                        <div class="card-icon">ðŸ†</div>
                        <div class="card-content">
                            <div class="card-label">${t("hub_highscore")}</div>
                            <div class="card-value">${highscore.toLocaleString()}</div>
                        </div>
                    </div>
                    <div class="stat-card-epic">
                        <div class="card-icon">ðŸ’°</div>
                        <div class="card-content">
                            <div class="card-label">${t("hub_wallet")}</div>
                            <div class="card-value">${totalCoins.toLocaleString()}</div>
                        </div>
                    </div>
                    <div class="stat-card-epic">
                        <div class="card-icon">â˜ ï¸</div>
                        <div class="card-content">
                            <div class="card-label">${t("hub_kills")}</div>
                            <div class="card-value">${totalKills.toLocaleString()}</div>
                        </div>
                    </div>
                    <div class="stat-card-epic">
                        <div class="card-icon">â±ï¸</div>
                        <div class="card-content">
                            <div class="card-label">${t("hub_playtime")}</div>
                            <div class="card-value">${hours}h ${minutes}m</div>
                        </div>
                    </div>
                    <div class="stat-card-epic">
                        <div class="card-icon">ðŸš€</div>
                        <div class="card-content">
                            <div class="card-label">${t("hub_missions")}</div>
                            <div class="card-value">${gamesPlayed}</div>
                        </div>
                    </div>
                    <div class="stat-card-epic">
                        <div class="card-icon">ðŸŽ–ï¸</div>
                        <div class="card-content">
                            <div class="card-label">${t("hub_trophies")}</div>
                            <div class="card-value">${am ? am.unlockedAchievements.size : 0}</div>
                        </div>
                    </div>
                </div>
                <div class="wheel-promo-card" style="margin-top:20px; background:rgba(0,255,255,0.05); border:1px solid rgba(0,255,255,0.2); border-radius:10px; padding:15px; text-align:center;">
                    <div style="font-family:'Press Start 2P'; font-size:0.55rem; color:var(--cyan-glow); margin-bottom:12px;">ðŸŽ¡ ${t('wheel_title')}</div>
                    <button id="hub-open-wheel-btn" class="retro-btn glow-cyan" style="width:100%; font-size:0.5rem; padding:10px;">OPEN WHEEL</button>
                </div>
            `;

        // Dynamic Pilot Systems Monitor
        const shieldLevel = sm.getUpgradeLevel('start_energy');
        const weaponLevel = sm.getUpgradeLevel('powerup_duration');
        const droneLevel = sm.getUpgradeLevel('ultimate_drone_mastery');

        const shieldPerc = Math.min(100, Math.floor((shieldLevel / 10) * 100));
        const weaponPerc = Math.min(100, Math.floor((weaponLevel / 10) * 100));
        const dronePerc = droneLevel > 0 ? 100 : 0;

        html += `
            <div class="profile-systems-visual">
                    <h3 class="section-title">- SHIP SYSTEMS STATUS -</h3>
                    <div class="system-monitor-grid">
                        <div class="monitor-item">
                            <div class="monitor-label">SHIELD CORE</div>
                            <div class="monitor-bar-wrap"><div class="monitor-bar shield" style="width: ${shieldPerc}%"></div></div>
                        </div>
                        <div class="monitor-item">
                            <div class="monitor-label">WEAPON CALIB</div>
                            <div class="monitor-bar-wrap"><div class="monitor-bar weapon" style="width: ${weaponPerc}%"></div></div>
                        </div>
                        <div class="monitor-item">
                            <div class="monitor-label">DRONE SYNC</div>
                            <div class="monitor-bar-wrap"><div class="monitor-bar drone" style="width: ${dronePerc}%"></div></div>
                        </div>
                    </div>
                </div>

            <div class="profile-nft-ledger">
                <h3 class="section-title">- ${t('hub_nft_vault')} -</h3>
                <div class="ledger-container">
                    ${this.renderNftLedger()}
                </div>
            </div>

            <div class="profile-footer-meta">
                <span>UPLINK ID: ${this.game.piManager.uid || 'GUEST-USER'}</span>
                <span>GALACTIC VERSION: 3.5.0-EPIC-EDITION</span>
            </div>
            </div>
            `;

        listEl.innerHTML = html;

        // Wheel Button Handler
        const openBtn = document.getElementById('hub-open-wheel-btn');
        if (openBtn) openBtn.onclick = () => this.showLuckyWheel();

        // Modal Close Handler (Check if already set once?)
        const closeBtn = document.getElementById('wheel-modal-close');
        if (closeBtn) closeBtn.onclick = () => this.hideLuckyWheel();
    }

    private renderNftLedger(): string {
        const sm = this.game.shopManager;
        const collectibles = sm.playerCollectibles;
        const mintedIds = collectibles.minted_collectibles || [];
        const metadata = collectibles.minted_metadata || {};
        const t = (k: string) => this.localizationManager.translate(k);

        if (mintedIds.length === 0) {
            return `<div class="no-ledger-data">${t('no_nfts_yet')}</div>`;
        }

        return mintedIds.map(id => {
            const item = sm.shopItems.find(i => i.id === id);
            if (!item) return '';
            const meta = metadata[id];
            const dateStr = meta ? new Date(meta.minted_at).toLocaleDateString() : '---';
            const txid = meta ? meta.txid : '---';
            const shortTxid = txid !== '---' ? `${txid.substring(0, 10)}...${txid.substring(txid.length - 10)}` : 'UNKNOWN';
            const network = (meta?.network || 'pi_testnet').toUpperCase();

            // Pi Explorer URL (Testnet / Mainnet)
            const explorerUrl = network.includes('MAINNET')
                ? `https://pinetwork-explorer.com/tx/${txid}`
                : `https://pinetwork-explorer.com/testnet/tx/${txid}`;

            return `
                <div class="ledger-item-card">
                    <div class="ledger-item-header">
                        <div class="ledger-icon-wrap">
                            <img src="${item.iconSrc}" class="ledger-icon" alt="NFT">
                        </div>
                        <div class="ledger-item-title">
                            <div class="nft-name-text">${t(item.nameKey)}</div>
                            <div class="nft-id-tag">#${id.toUpperCase().replace('COLLECTIBLE_', '')}</div>
                        </div>
                        <div class="minted-seal">VERIFIED</div>
                    </div>
                    <div class="ledger-details-grid">
                        <div class="ledger-detail-row">
                            <span class="label">${t('vault_date')}</span>
                            <span class="value">${dateStr}</span>
                        </div>
                        <div class="ledger-detail-row">
                            <span class="label">${t('vault_txid')}</span>
                            <span class="value-hash" title="${txid}">${shortTxid}</span>
                        </div>
                        <div class="ledger-detail-row">
                            <span class="label">${t('vault_network')}</span>
                            <span class="value" style="color:${network.includes('MAINNET') ? '#0f0' : '#ffea00'}">${network}</span>
                        </div>
                    </div>
                    <a href="${explorerUrl}" target="_blank" class="ledger-explorer-link">
                         ${t('btn_view_on_blockexplorer')} <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `;
        }).join('');
    }

    public createEnemyIcon(enemyType: string, image: HTMLImageElement): string { const canvas = document.createElement('canvas'); const visualWidth = 120; const visualHeight = 120; canvas.width = visualWidth; canvas.height = visualHeight; const ctx = canvas.getContext('2d')!; if (image && image.complete) { const scale = Math.min(canvas.width / image.width, canvas.height / image.height); const w = image.height * scale; const h = image.height * scale; const x = (canvas.width - w) / 2; const y = (canvas.height - h) / 2; ctx.drawImage(image, x, y, w, h); } return canvas.toDataURL(); }

    public populateArsenal(): void {
        const pL = [{ c: "arsenal_cat_weapon_upgrade", n: "powerup_wup_name", d: 'powerup_wup_desc', t: 'WEAPON_UP' }, { c: "arsenal_cat_weapon_mod", n: "powerup_rapid_fire_name", d: 'powerup_rapid_fire_desc', t: 'RAPID_FIRE' }, { c: "arsenal_cat_weapon_mod", n: "powerup_side_shots_name", d: 'powerup_side_shots_desc', t: 'SIDE_SHOTS' }, { c: "arsenal_cat_ultra_weapon", n: "powerup_laser_name", d: 'powerup_laser_desc', t: 'LASER_BEAM' }, { c: "arsenal_cat_ultra_weapon", n: "powerup_homing_missiles_name", d: 'powerup_homing_missiles_desc', t: 'HOMING_MISSILES' }, { c: "arsenal_cat_defense", n: "powerup_shield_name", d: 'powerup_shield_desc', t: 'SHIELD' }, { c: "arsenal_cat_defense", n: "powerup_repair_kit_name", d: 'powerup_repair_kit_desc', t: 'REPAIR_KIT' }, { c: "arsenal_cat_defense", n: "powerup_extra_life_name", d: 'powerup_extra_life_desc', t: 'EXTRA_LIFE' }, { c: "arsenal_cat_defense", n: "powerup_ghost_protocol_name", d: 'powerup_ghost_protocol_desc', t: 'GHOST_PROTOCOL' }, { c: "arsenal_cat_defense", n: "powerup_orbital_drone_name", d: 'powerup_orbital_drone_desc', t: 'ORBITAL_DRONE' }, { c: "arsenal_cat_special", n: "powerup_nuke_name", d: 'powerup_nuke_desc', t: 'NUKE' }, { c: "arsenal_cat_special", n: "powerup_black_hole_name", d: 'powerup_black_hole_desc', t: 'BLACK_HOLE' }, { c: "arsenal_cat_special", n: "powerup_score_boost_name", d: 'powerup_score_boost_desc', t: 'SCORE_BOOST' }];
        const lE = document.getElementById('arsenal-list');
        if (lE) {
            lE.innerHTML = `<div style="text-align:center; padding:10px; opacity:0.8; font-size:0.7rem; border-bottom:1px solid rgba(255,255,255,0.1); margin-bottom:15px;" data-translate-key="hub_armory_info_text">${this.localizationManager.translate('hub_armory')} - Tactical Overview</div>`;
            let cC = '';
            pL.forEach(p => {
                const cN = this.localizationManager.translate(p.c);
                if (cN !== cC) { cC = cN; lE.innerHTML += `<h3>- ${cN} -</h3>`; }
                const iS = powerUpImageSources[p.t];
                lE.innerHTML += `<div class="powerup-entry"><img src="${iS}" class="arsenal-icon" alt="${this.localizationManager.translate(p.n)}"/><div class="powerup-info"><div class="powerup-title">${this.localizationManager.translate(p.n)}</div><div class="powerup-desc">${this.localizationManager.translate(p.d)}</div></div></div>`;
            });
        }
    }

    public populateGalerie(targetId: string = 'galerie-list'): void {
        const t = (key: string) => this.localizationManager.translate(key);
        const galleryEl = document.getElementById(targetId);
        if (!galleryEl) return;
        galleryEl.innerHTML = '';

        const createItemElement = (item: IShopItem, type: 'player_skin' | 'projectile_style' | 'engine_trail' | 'collectible') => {
            let isUnlocked = false;
            let equippedItem: string | null = null;
            const itemEl = document.createElement('div');
            itemEl.className = 'gallery-item';

            if (type === 'collectible') {
                isUnlocked = (this.game.shopManager.playerCollectibles.unlocked_collectibles || []).includes(item.id);
                equippedItem = this.game.shopManager.playerCollectibles.equipped_collectible;
                if (isUnlocked) {
                    const isMinted = (this.game.shopManager.playerCollectibles.minted_collectibles || []).includes(item.id);
                    const badge = document.createElement('div');
                    badge.className = isMinted ? 'nft-badge minted' : 'nft-badge';
                    badge.textContent = isMinted ? 'MINTED' : 'COLL.';
                    itemEl.appendChild(badge);
                }
            } else {
                isUnlocked = this.game.shopManager.isCosmeticUnlocked(item.id, type);
                equippedItem = type === 'player_skin' ? this.game.shopManager.playerCosmetics.equipped_skin :
                    type === 'projectile_style' ? this.game.shopManager.playerCosmetics.equipped_projectile :
                        this.game.shopManager.playerCosmetics.equipped_trail;
            }

            if (isUnlocked) {
                if (item.id === equippedItem) { itemEl.classList.add('selected'); }
                itemEl.addEventListener('click', (e) => {
                    if ((e.target as HTMLElement).closest('.gallery-item-preview') && type === 'collectible') return;

                    if (type === 'collectible') {
                        this.game.shopManager.equipCollectible(item.id);
                        this.game.shopManager.equipCosmetic('skin_default', 'player_skin');
                    } else if (type === 'player_skin') {
                        this.game.shopManager.equipCosmetic(item.id, 'player_skin');
                        this.game.shopManager.equipCollectible(null);
                    } else {
                        this.game.shopManager.equipCosmetic(item.id, type as 'player_skin' | 'projectile_style' | 'engine_trail');
                    }
                    this.soundManager.play('uiClick');

                    const galleryList = document.getElementById(targetId);
                    const scrollPos = galleryList ? galleryList.scrollTop : 0;
                    this.populateGalerie(targetId);
                    const newGalleryList = document.getElementById(targetId);
                    if (newGalleryList) newGalleryList.scrollTop = scrollPos;
                });
            } else {
                itemEl.classList.add('locked');
            }

            let innerHTML = `<div class="gallery-item-preview"><img src="${item.iconSrc}" alt="${t(item.nameKey)}"></div><div class="gallery-item-name">${t(item.nameKey)}</div>`;
            if (!isUnlocked) { innerHTML += `<div class="locked-icon"></div>`; }
            itemEl.innerHTML += innerHTML;

            const previewEl = itemEl.querySelector('.gallery-item-preview');
            if (previewEl && isUnlocked && type === 'collectible') {
                previewEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showCollectibleModal(item);
                });
            }
            return itemEl;
        };

        const createSection = (titleKey: string, items: IShopItem[], type: 'player_skin' | 'projectile_style' | 'engine_trail' | 'collectible') => {
            const section = document.createElement('div');
            section.className = 'gallery-section';
            const title = document.createElement('h3');
            title.textContent = `- ${t(titleKey)} -`;
            const grid = document.createElement('div');
            grid.className = 'gallery-grid';
            items.forEach(item => { grid.appendChild(createItemElement(item, type)); });
            section.appendChild(title);
            section.appendChild(grid);
            galleryEl.appendChild(section);
        };

        const allSkins = this.game.shopManager.shopItems.filter(item => item.type === 'SKIN');
        const defaultSkin = { id: 'skin_default', nameKey: 'shop_skin_default_name', iconSrc: playerImgSrc1, type: 'SKIN' } as IShopItem;
        allSkins.unshift(defaultSkin);

        const allProjectiles = this.game.shopManager.shopItems.filter(item => item.cosmeticType === 'projectile_style');
        const defaultProj = { id: 'default', nameKey: 'proj_default_name', iconSrc: powerUpImageSources['WEAPON_UP'], type: 'COSMETIC', cosmeticType: 'projectile_style' } as IShopItem;
        allProjectiles.unshift(defaultProj);

        const allTrails = this.game.shopManager.shopItems.filter(item => item.cosmeticType === 'engine_trail');
        const defaultTrail = { id: 'default', nameKey: 'trail_default_name', iconSrc: playerImgSrc1, type: 'COSMETIC', cosmeticType: 'engine_trail' } as IShopItem;
        allTrails.unshift(defaultTrail);

        const allCollectibles = this.game.shopManager.shopItems.filter(item => item.type === 'COLLECTIBLE');

        if (allCollectibles.length > 0) {
            createSection('gallery_collectibles_header', allCollectibles, 'collectible');
        }
        createSection('gallery_skins_header', allSkins, 'player_skin');
        createSection('gallery_projectiles_header', allProjectiles, 'projectile_style');
        createSection('gallery_trails_header', allTrails, 'engine_trail');
    }

    public async populateNetwork(targetId: string = 'pilot-network-root', bustCache = false): Promise<void> {
        const t = (key: string) => this.localizationManager.translate(key);
        const networkEl = document.getElementById(targetId);
        if (!networkEl) return;

        const hasPremium = this.game.hasPremiumLicense;
        const uid = this.game.getPlayerIdentity().uid;

        // Loading
        networkEl.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:100px;color:#0ff;padding:20px;">
                <div style="font-size:1.4rem;animation:pulse-green 0.8s alternate infinite;">â›“</div>
                <div style="font-size:0.5rem;letter-spacing:3px;">CONNECTING TO PI NODE...</div>
            </div>`;

        // â”€â”€ Parallel fetch aller Endpoints â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const qs = bustCache ? `?t=${Date.now()}` : '';
        const safeJson = async (res: Response) => res.ok ? res.json() : null;
        let [stats, feeStats, networkFeed, validatorInfo, playerData] = await Promise.all([
            fetch(`/api/node-stats${qs}`).then(safeJson).catch(() => null),
            fetch('/api/fee-stats').then(safeJson).catch(() => null),
            fetch('/api/network-feed').then(safeJson).catch(() => null),
            fetch('/api/node-validator').then(safeJson).catch(() => null),
            (uid && uid !== 'UNREGISTERED') ? fetch(`/api/player-payments?pi_uid=${uid}`).then(safeJson).catch(() => null) : Promise.resolve(null)
        ]);

        networkEl.innerHTML = '';

        // â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const timeAgo = (iso: string) => {
            if (!iso) return 'â€”';
            const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
            if (s < 60) return `${s}s ago`;
            if (s < 3600) return `${Math.floor(s / 60)}m ago`;
            return `${Math.floor(s / 3600)}h ago`;
        };
        const fmt = (v: any, suf = '') => (v !== null && v !== undefined) ? `${v}${suf}` : 'â€”';
        const mk = (cls: string, html = '') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; };
        const row = (label: string, value: string) =>
            `<div class="network-stat-row"><span class="label">${label}</span><span class="value">${value}</span></div>`;

        // â”€â”€ Refresh + Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const hdr = document.createElement('div');
        hdr.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
        const srcLabel = stats?.data_source === 'local'
            ? '<span style="color:#00ff88;font-size:0.38rem;">â¬¢ LOCAL NODE</span>'
            : '<span style="color:#facc15;font-size:0.38rem;">â˜ PUBLIC API</span>';
        hdr.innerHTML = `<div style="font-size:0.38rem;color:#444;">${srcLabel}</div>`;
        const refreshBtn = document.createElement('button');
        refreshBtn.style.cssText = 'font-size:0.38rem;background:transparent;border:1px solid #333;color:#666;padding:2px 8px;cursor:pointer;font-family:monospace;';
        refreshBtn.textContent = 'âŸ³ REFRESH';
        refreshBtn.onclick = () => this.populateNetwork(targetId, true);
        hdr.appendChild(refreshBtn);
        networkEl.appendChild(hdr);

        // â”€â”€ SECTION 1: NODE STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const nodeSection = mk('network-section');
        nodeSection.innerHTML = `
            <h3>PI NETWORK STATUS <span class="status-indicator ${stats?.block_height ? 'online' : 'offline'}"></span></h3>
            ${row('DATA.SOURCE', stats?.data_source === 'local' ? '<span style="color:#00ff88;">LOCAL NODE</span>' : '<span style="color:#facc15;">PUBLIC API</span>')}
            ${row('NETWORK', `<span style="color:${stats?.network === 'MAINNET' ? '#0f0' : '#facc15'}">${fmt(stats?.network)}</span>`)}
        `;
        networkEl.appendChild(nodeSection);

        // â”€â”€ SECTION 2: BLOCKCHAIN STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const isOnline = !!(stats?.block_height);
        const chainSection = mk('network-section');
        chainSection.innerHTML = `
            <h3>${t('net_blockchain_status')} <span class="status-indicator ${isOnline ? 'online' : 'offline'}"></span></h3>
            ${row(t('net_block_height'), isOnline ? `<span style="color:#0ff;font-family:monospace;">#${Number(stats.block_height).toLocaleString()}</span>` : 'â€”')}
            ${row('LAST.BLOCK', stats?.close_time ? timeAgo(stats.close_time) : 'â€”')}
            ${row('TXS/LEDGER', fmt(stats?.tx_count))}
            ${row('OPS/LEDGER', fmt(stats?.op_count))}
            ${row('BASE.FEE', stats?.base_fee ? (Number(stats.base_fee) / 1e7).toFixed(5) + ' PI' : 'â€”')}
            ${row('NETWORK', `<span style="color:${stats?.network === 'MAINNET' ? '#0f0' : '#facc15'}">${fmt(stats?.network)}</span>`)}
            ${!isOnline ? '<div style="margin-top:8px;font-size:0.4rem;color:#ff6666;text-align:center;">âš  HORIZON NICHT ERREICHBAR</div>' : ''}
        `;
        networkEl.appendChild(chainSection);

        // â”€â”€ SECTION 3: FEE MARKET â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const feeSection = mk('network-section');
        const capacity = feeStats?.ledger_capacity_usage ? parseFloat(feeStats.ledger_capacity_usage) : 0;
        const capPercent = Math.round(capacity * 100);
        const capColor = capacity < 0.5 ? '#00ff88' : capacity < 0.8 ? '#facc15' : '#ff4444';
        feeSection.innerHTML = `
            <h3>FEE MARKET</h3>
            <div style="margin-bottom:8px;">
                <div style="font-size:0.38rem;color:#666;margin-bottom:3px;">NETWORK LOAD: <span style="color:${capColor}">${capPercent}%</span></div>
                <div style="width:100%;height:4px;background:#111;border-radius:2px;overflow:hidden;">
                    <div style="width:${capPercent}%;height:100%;background:${capColor};transition:width 0.5s;"></div>
                </div>
            </div>
            ${row('BASE.FEE', feeStats?.last_ledger_base_fee ? (Number(feeStats.last_ledger_base_fee) / 1e7).toFixed(5) + ' PI' : 'â€”')}
            ${row('MIN.FEE', feeStats?.min_accepted_fee ? (Number(feeStats.min_accepted_fee) / 1e7).toFixed(5) + ' PI' : 'â€”')}
            ${row('AVG.FEE (p50)', feeStats?.p50_fee ? (Number(feeStats.p50_fee) / 1e7).toFixed(5) + ' PI' : 'â€”')}
            ${row('PEAK.FEE (p99)', feeStats?.p99_fee ? (Number(feeStats.p99_fee) / 1e7).toFixed(5) + ' PI' : 'â€”')}
            ${feeStats?.source ? `<div style="margin-top:4px;font-size:0.35rem;color:#333;">SRC: ${feeStats.source.toUpperCase()}</div>` : ''}
        `;
        networkEl.appendChild(feeSection);

        // â”€â”€ SECTION 4: LIVE OPERATIONS FEED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const feedSection = mk('network-section');
        const ops = networkFeed?.ops || [];
        const opTypeColor: Record<string, string> = {
            payment: '#0ff', create_account: '#00ff88', change_trust: '#facc15',
            manage_sell_offer: '#ff88ff', manage_buy_offer: '#ff88ff',
            path_payment_strict_send: '#0ff', path_payment_strict_receive: '#0ff',
            set_options: '#888', account_merge: '#ff6666', default: '#666'
        };
        const opsHtml = ops.length > 0
            ? ops.map((op: any) => {
                const color = opTypeColor[op.type] || opTypeColor.default;
                return `<li style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.38rem;">
                    <span style="color:${color}">${op.type.replace(/_/g, ' ').toUpperCase()}</span>
                    <span style="color:#555;font-family:monospace;">${timeAgo(op.created_at)}</span>
                </li>`;
            }).join('')
            : '<li style="font-size:0.4rem;color:#444;text-align:center;padding:8px 0;">NO DATA</li>';
        feedSection.innerHTML = `
            <h3>LIVE OPS FEED ${networkFeed?.source === 'local' ? '<span style="color:#00ff88;font-size:0.38rem;">â¬¢ LOCAL</span>' : ''}</h3>
            <ul style="list-style:none;padding:0;margin:0;max-height:120px;overflow-y:auto;">${opsHtml}</ul>
            ${networkFeed?.fetched_at ? `<div style="margin-top:4px;font-size:0.35rem;color:#333;">SYNC: ${new Date(networkFeed.fetched_at).toLocaleTimeString()}</div>` : ''}
        `;
        networkEl.appendChild(feedSection);

        // â”€â”€ SECTION 5: VALIDATOR IDENTITY (Premium locked) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const validatorSection = mk('network-section');
        validatorSection.style.position = 'relative';
        const nodeKey = stats?.node_key || '';
        const shortNodeKey = nodeKey ? nodeKey.substring(0, 6) + '...' + nodeKey.slice(-4) : 'â€”';
        validatorSection.innerHTML = `<h3>VALIDATOR IDENTITY</h3>`;

        const validatorContent = document.createElement('div');
        const vNotFound = validatorInfo?.not_found;
        validatorContent.innerHTML = `
            <div style="font-size:0.38rem;color:#555;margin-bottom:6px;letter-spacing:1px;">â–¸ PI NODE KEY</div>
            ${row('NODE.KEY', `<span style="font-family:monospace;font-size:0.36rem;">${shortNodeKey}</span>`)}
            ${!vNotFound && validatorInfo?.sequence ? row('SEQUENCE', validatorInfo.sequence) : ''}
            ${!vNotFound && validatorInfo?.subentry_count !== undefined ? row('ENTRIES', validatorInfo.subentry_count) : ''}
            ${!vNotFound && validatorInfo?.home_domain ? row('DOMAIN', validatorInfo.home_domain) : ''}
            ${vNotFound ? '<div style="font-size:0.4rem;color:#555;text-align:center;margin-top:6px;">NODE KEY: NOT AN ACCOUNT</div>' : ''}
            <div style="margin-top:8px;">
                <a href="https://explorer.minepi.com/accounts/${nodeKey}" target="_blank" rel="noopener" class="ledger-explorer-link" style="width:100%;display:block;text-align:center;padding:6px 0;box-sizing:border-box;">
                    ðŸ”‘ VIEW NODE ON EXPLORER
                </a>
            </div>
        `;

        if (!hasPremium) {
            const lock = mk('premium-lock-overlay', `
                <div style="font-size:1.5rem;margin-bottom:8px;">ðŸ”’</div>
                <div style="font-size:0.5rem;font-weight:bold;color:#0ff;margin-bottom:6px;">PREMIUM REQUIRED</div>
                <p>${t('net_premium_lock_msg')}</p>
            `);
            validatorSection.appendChild(lock);
        }
        validatorSection.appendChild(validatorContent);
        networkEl.appendChild(validatorSection);

        // â”€â”€ SECTION 6: APP WALLET + PILOT STATS (Premium locked) â”€â”€â”€â”€â”€â”€
        const walletSection = mk('network-section');
        walletSection.style.position = 'relative';
        const appWalletKey = stats?.app_wallet || '';
        const shortWallet = appWalletKey ? appWalletKey.substring(0, 6) + '...' + appWalletKey.slice(-4) : 'â€”';
        const walletExists = stats?.app_wallet_exists === true;
        const balanceText = stats?.app_balance ?? (walletExists ? '0.0000 PI' : 'NOT ON-CHAIN');
        const gfcCoins = playerData?.coins ?? this.game.coins ?? 0;
        const isPrem = playerData?.has_premium !== undefined ? playerData.has_premium : hasPremium;

        const txsHtml = stats?.recent_txs?.length > 0
            ? `<div style="margin-top:8px;">
                <div style="font-size:0.38rem;color:#888;margin-bottom:4px;letter-spacing:1px;">APP TRANSACTIONS</div>
                <ul class="tx-list">
                    ${stats.recent_txs.map((tx: any) => `
                    <li class="tx-item">
                        <span class="type" style="font-family:monospace;">${tx.id}</span>
                        <span class="amount">${timeAgo(tx.created_at)}</span>
                    </li>`).join('')}
                </ul>
            </div>`
            : `<div style="margin-top:6px;font-size:0.38rem;color:#444;text-align:center;">${walletExists ? 'NO TXS FOUND' : 'WALLET NOT ON-CHAIN'}</div>`;

        walletSection.innerHTML = `<h3>${t('net_wallet_neural_link')}</h3>`;
        const walletContent = document.createElement('div');
        walletContent.className = 'neural-link-card';

        // App-Wallet Chain-TXs (von Horizon — letzten 5 TXs der App Wallet)
        const chainTxsHtml = stats?.recent_txs?.length > 0
            ? `<div style="margin-top:8px;">
                <div style="font-size:0.38rem;color:#888;margin-bottom:4px;letter-spacing:1px;">APP WALLET TXS (CHAIN)</div>
                <ul class="tx-list">
                    ${stats.recent_txs.map((tx: any) => `
                    <li class="tx-item">
                        <span class="type" style="font-family:monospace;font-size:0.33rem;">${tx.id}</span>
                        <span class="amount">${timeAgo(tx.created_at)}</span>
                    </li>`).join('')}
                </ul>
            </div>`
            : `<div style="margin-top:6px;font-size:0.38rem;color:#444;text-align:center;">${walletExists ? 'NO TXS ON CHAIN' : 'WALLET NOT ON-CHAIN'}</div>`;

        // Spieler eigene TX-Historie aus DB (mit TXIDs von Blockchain-Käufen)
        const playerTxs = playerData?.payments || [];
        const playerTxsHtml = playerTxs.length > 0
            ? `<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(0,255,255,0.1);">
                <div style="font-size:0.38rem;color:#0ff;margin-bottom:4px;letter-spacing:1px;">⛓ DEINE TX-HISTORIE</div>
                <ul style="list-style:none;padding:0;margin:0;">
                    ${playerTxs.map((p: any) => `
                    <li style="padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                        <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
                            <span style="font-size:0.38rem;color:#facc15;">${(p.bundle_id || 'TX').replace(/_/g, ' ').toUpperCase()}</span>
                            <span style="font-size:0.35rem;color:#555;">${p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <a href="${p.explorer_url}" target="_blank" rel="noopener" style="font-family:monospace;font-size:0.33rem;color:#0ff;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:140px;" title="${p.txid}">🔗 ${p.txid_short || p.txid}</a>
                            <span style="font-size:0.33rem;color:#555;text-transform:uppercase;">[${p.network || '?'}]</span>
                        </div>
                    </li>`).join('')}
                </ul>
            </div>`
            : `<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(0,255,255,0.1);font-size:0.38rem;color:#444;text-align:center;">KEINE TXS — NOCH KEIN KAUF</div>`;

        walletContent.innerHTML = `
            <div style="font-size:0.38rem;color:#555;margin-bottom:6px;letter-spacing:1px;">▸ APP WALLET</div>
            ${row('WALLET', `<span style="font-family:monospace;font-size:0.38rem;">${shortWallet}</span>`)}
            ${row('BALANCE', `<span style="color:${walletExists ? 'var(--pi-yellow)' : '#555'};font-weight:bold;">${balanceText}</span>`)}
            ${chainTxsHtml}
            <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(0,255,255,0.1);font-size:0.38rem;color:#555;margin-bottom:6px;letter-spacing:1px;">▸ PILOT STATS</div>
            ${row('MY.UID', `<span style="font-size:0.36rem;max-width:110px;overflow:hidden;text-overflow:ellipsis;">${uid || 'GUEST'}</span>`)}
            ${row('GFC COINS', `<span style="color:var(--pi-yellow);font-weight:bold;">${gfcCoins.toLocaleString()}</span>`)}
            ${row('PREMIUM', `<span style="color:${isPrem ? '#00ff88' : '#ff4444'};">${isPrem ? '✓ ACTIVE' : '✗ NOT ACTIVE'}</span>`)}
            ${row('TOTAL TXS', `<span style="color:#0ff;">${playerData?.total_txs ?? 0}</span>`)}
            ${playerTxsHtml}
        `;

        if (!isPrem) {
            const lock = mk('premium-lock-overlay', `
                <div style="font-size:1.5rem;margin-bottom:8px;">🔒</div>
                <div style="font-size:0.5rem;font-weight:bold;color:#0ff;margin-bottom:6px;">PREMIUM ACCESS REQUIRED</div>
                <p>${t('net_premium_lock_msg')}</p>
            `);
            walletSection.appendChild(lock);
        }

        walletSection.appendChild(walletContent);
        networkEl.appendChild(walletSection);

        // ── Explorer Links ─────────────────────────────────────────────
        if (appWalletKey) {
            const explorerSection = mk('network-section');
            explorerSection.innerHTML = `
                <h3>${t('net_nft_verifier')}</h3>
                <a href="https://explorer.minepi.com/accounts/${appWalletKey}" target="_blank" rel="noopener" class="ledger-explorer-link" style="width:100%;display:block;text-align:center;padding:8px 0;box-sizing:border-box;margin-bottom:6px;">
                    💼 APP WALLET — PI EXPLORER
                </a>
                <div style="font-size:0.35rem;color:#333;text-align:center;word-break:break-all;">${appWalletKey.substring(0, 30)}...</div>
            `;
            networkEl.appendChild(explorerSection);
        }
    }
    public showCollectibleModal(item: IShopItem): void {
        this.modalImgEl.src = item.iconSrc;
        this.modalTitleEl.textContent = this.localizationManager.translate(item.nameKey);

        const story = this.localizationManager.translate(item.storyKey!);
        this.modalStoryEl.textContent = story;

        const bonusLabel = this.localizationManager.translate('hub_bonus') || 'BONUS';
        const bonusText = this.localizationManager.translate(item.descKey);

        // Minted status (if available in player collectibles)
        const sm = this.game?.shopManager;
        const minted = !!sm && (sm.playerCollectibles?.minted_collectibles || []).includes(item.id);
        const meta = minted ? sm?.playerCollectibles?.minted_metadata?.[item.id] : null;
        const txid = meta?.txid ? String(meta.txid) : '';
        const shortTxid = txid ? `${txid.substring(0, 8)}...${txid.substring(txid.length - 8)}` : '';

        this.modalBonusEl.innerHTML = `
            <div class="collectible-bonus-box">
                <div class="collectible-bonus-header">
                    <span class="cb-title">${bonusLabel}</span>
                    ${minted ? `<span class="cb-status minted">NFT</span>` : `<span class="cb-status">OFF-CHAIN</span>`}
                </div>
                <div class="collectible-bonus-text">${bonusText}</div>
                ${minted && shortTxid ? `
                    <div class="collectible-mint-meta">
                        <span class="cb-meta-label">TX</span>
                        <span class="cb-meta-val">${shortTxid}</span>
                    </div>
                ` : ''}
            </div>
        `;

        this.collectibleModalEl.classList.add('active');
    }
    public hideCollectibleModal(): void { this.collectibleModalEl.classList.remove('active'); }

    public populateGegner(): void { const enemyList = [{ nameKey: "gegner_grunt_name", descKey: "gegner_grunt_desc", type: 'GRUNT', strengthKey: 'strength_low', image: gruntImg }, { nameKey: "gegner_weaver_name", descKey: "gegner_weaver_desc", type: 'WEAVER', strengthKey: 'strength_low', image: weaverImg }, { nameKey: "gegner_tank_name", descKey: "gegner_tank_desc", type: 'TANK', strengthKey: 'strength_medium', image: tankImg }, { nameKey: "gegner_shooter_name", descKey: "gegner_shooter_desc", type: 'SHOOTER', strengthKey: 'strength_medium', image: shooterImg }, { nameKey: "gegner_teleporter_name", descKey: "gegner_teleporter_desc", type: 'TELEPORTER', strengthKey: 'strength_high', image: teleporterImg }, { nameKey: "gegner_sentinel_prime_name", descKey: "gegner_sentinel_prime_desc", type: 'BOSS_SENTINEL_PRIME', strengthKey: 'strength_high', image: bossSentinelPrimeImg }, { nameKey: "gegner_void_serpent_name", descKey: "gegner_void_serpent_desc", type: 'BOSS_VOID_SERPENT', strengthKey: 'strength_extreme', image: bossVoidSerpentSrc }, { nameKey: "gegner_omega_nexus_name", descKey: "gegner_omega_nexus_desc", type: 'BOSS_OMEGA_NEXUS', strengthKey: 'strength_apocalyptic', image: bossOmegaNexusBaseImg }, { nameKey: "gegner_nexus_prime_name", descKey: "gegner_nexus_prime_desc", type: 'BOSS_NEXUS_PRIME', strengthKey: 'strength_final', image: bossNexusPrimeImg },]; const t = (key: string) => this.localizationManager.translate(key); const listEl = document.getElementById('gegner-list')!; listEl.innerHTML = `< h3 > - ${ t('tab_gegner') } -</h3 > `; enemyList.forEach(e => { const iconSrc = this.createEnemyIcon(e.type, e.image); const strengthClass = e.strengthKey.split('_')[1]; listEl.innerHTML += ` < div class="powerup-entry" ><img src="${iconSrc}" class="arsenal-icon" alt="${t(e.nameKey)} icon"/><div class="powerup-info"><div class="powerup-title"><span>${t(e.nameKey)}</span> <span class="strength-indicator strength-${strengthClass}">${t(e.strengthKey)}</span> </div> <div class="powerup-desc">${t(e.descKey)}</div> </div> </div > `; }); }
    public async populateLeaderboard(mode: 'campaign' | 'endless'): Promise < void> {
    const t = (key: string) => this.localizationManager.translate(key);
    // Ensure content element is correct
    if(!this.leaderboardContent) this.leaderboardContent = document.getElementById('epic-leaderboard-content')!;
    const contentEl = this.leaderboardContent;

    // 1. Determine Environment
    let type = 'mainnet';
    let badgeClass = 'badge-mainnet';
    let badgeText = t('hub_mainnet');

    if(!this.game.piManager.isAuthenticated) {
    type = 'guest';
    badgeClass = 'badge-guest';
    badgeText = t('hub_guest_zone');
} else if (this.game.piManager.isSandbox) {
    type = 'testnet';
    badgeClass = 'badge-testnet';
    badgeText = t('hub_testnet');
}

// 2. Build Epic UI Skeleton
contentEl.innerHTML = `
    < div class="leaderboard-epic-container" >
                <div class="network-indicator-badge ${badgeClass}">${badgeText}</div>
                
                <div class="header-section">
                    <h2 class="pixel-subtitle" style="margin:0; font-size:1rem; color:#fff;">LEADERBOARD</h2>
                    <div class="epic-tabs">
                        <button class="epic-tab-btn ${mode === 'campaign' ? 'active' : ''}" id="lb-btn-campaign">${t('btn_campaign')}</button>
                        <button class="epic-tab-btn ${mode === 'endless' ? 'active' : ''}" id="lb-btn-endless">${t('btn_endless')}</button>
                    </div>
                </div>

                <div id="leaderboard-status" style="margin-top:20px; text-align:center;">
                    <p class="blink-text">${t('leaderboard_loading')}...</p>
                </div>
                
                <div id="leaderboard-list-area" class="epic-rank-list"></div>
            </div >
    `;

this.attachLeaderboardControlEvents();
const statusEl = document.getElementById('leaderboard-status')!;
const listArea = document.getElementById('leaderboard-list-area')!;

try {
    const response = await fetch(`${ API_BASE_URL }/leaderboard?mode=${mode}&type=${type}`);
if (!response.ok) throw new Error(`HTTP ${response.status}`);

const data: ILeaderboardEntry[] = await response.json();

if (!data || data.length === 0) {
    statusEl.innerHTML = `<p style="color:#888;">${t('leaderboard_no_entries')}</p>`;
    return;
}

statusEl.style.display = 'none';
let listHTML = '';

data.forEach((entry, index) => {
    const rank = index + 1;
    let cardClass = 'epic-rank-card';
    if (rank === 1) cardClass += ' top-1';
    if (rank === 2) cardClass += ' top-2';
    if (rank === 3) cardClass += ' top-3';

    // Highlight Local User
    if (this.game.lastGameResult &&
        entry.username === this.game.lastGameResult.username &&
        entry.score === this.game.lastGameResult.score) {
        cardClass += ' is-me';
    }

    const uidAttr = (entry as any).pi_uid ? `data-uid="${(entry as any).pi_uid}"` : '';
    listHTML += `
                    <div class="${cardClass}" ${uidAttr}>
                        <div class="rank-pos">#${rank}</div>
                        <div class="player-info">
                            <div class="player-name" style="cursor:pointer; text-decoration:underline;">${entry.username}</div>
                            <div class="player-details">PILOT RANK ${Math.ceil(entry.score / 5000)}</div>
                        </div>
                        <div class="score-display">
                            <div class="score-val">${entry.score.toLocaleString()}</div>
                            <div class="wave-val">WAVES: ${entry.waves}</div>
                        </div>
                    </div>
                `;
});

listArea.innerHTML = listHTML;

// Attach click-to-profile
listArea.querySelectorAll('.epic-rank-card[data-uid]').forEach(card => {
    card.addEventListener('click', async () => {
        const uid = (card as HTMLElement).getAttribute('data-uid');
        if (!uid) return;
        if (typeof (window as any).openPublicProfile === 'function') {
            (window as any).openPublicProfile(uid);
        }
    });
});

} catch (error) {
    console.error("Leaderboard Error:", error);
    statusEl.innerHTML = `<p style="color:#ff4444;">${t('leaderboard_error')}</p>`;
}
    }

    private attachLeaderboardControlEvents(): void {
    document.getElementById('lb-btn-campaign')?.addEventListener('click', () => this.populateLeaderboard('campaign'));
    document.getElementById('lb-btn-endless')?.addEventListener('click', () => this.populateLeaderboard('endless'));
}
    public drawLevelMessage(): void { const ctx = this.ctx; const scaleFactor = this.game.width / this.game.baseWidth; const fontSize = Math.max(16, 30 * scaleFactor); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, this.game.height / 2 - 50, this.game.width, 100); ctx.fillStyle = '#FFFF00'; ctx.font = `${fontSize}px 'Press Start 2P'`; ctx.fillText(this.game.levelMessage, this.game.width / 2, this.game.height / 2 + 10, this.game.width * 0.95); }
    public drawGameOver(): void { const ctx = this.ctx; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, this.game.width, this.game.height); }
    public drawWinScreen(): void {
    const ctx = this.ctx;
    const t = (key: string) => this.localizationManager.translate(key);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.game.width, this.game.height);

    const scaleFactor = this.game.width / this.game.baseWidth;
    const titleSize = Math.max(24, 50 * scaleFactor);
    const scoreSize = Math.max(16, 28 * scaleFactor);
    const rankSize = Math.max(14, 24 * scaleFactor);
    const promptSize = Math.max(12, 20 * scaleFactor);
    const yOffset = this.game.height * 0.1;
    const maxWidth = this.game.width * 0.9;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#FFD700';
    ctx.font = `${titleSize}px 'Press Start 2P'`;
    ctx.shadowColor = '#FFA500';
    ctx.shadowBlur = 15;
    ctx.fillText(t('victory_title_epic'), this.game.width / 2, this.game.height / 2 - yOffset * 2.5, maxWidth);

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFF';
    ctx.font = `${scoreSize}px 'Press Start 2P'`;
    ctx.fillText(`${t('victory_final_score')}: ${this.game.score.toLocaleString()}`, this.game.width / 2, this.game.height / 2 - yOffset, maxWidth);

    ctx.font = `${rankSize}px 'Press Start 2P'`;
    switch(this.game.rankStatus) {
            case 'success':
    ctx.fillStyle = '#00FFFF';
    if (this.game.lastGameResult) {
        ctx.fillText(`${t('leaderboard_rank_label')}: #${this.game.lastGameResult.rank}`, this.game.width / 2, this.game.height / 2 + yOffset * 0.5, maxWidth);
    }
    break;
            case 'error':
    ctx.fillStyle = '#FF4136';
    ctx.fillText(t('leaderboard_error'), this.game.width / 2, this.game.height / 2 + yOffset * 0.5, maxWidth);
    break;
            case 'fetching':
            default:
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(t('leaderboard_fetching_rank'), this.game.width / 2, this.game.height / 2 + yOffset * 0.5, maxWidth);
    break;
}

ctx.fillStyle = '#FFF';
ctx.font = `${promptSize}px 'Press Start 2P'`;
const promptKey = this.game.isMobile ? 'intro_prompt_mobile' : 'intro_prompt';
ctx.fillText(t(promptKey), this.game.width / 2, this.game.height / 2 + yOffset * 2.5, maxWidth);
    }
    public drawOverlay(): void { if(this.game.isBossActive) { const boss = this.game.entities.find(e => (e as Enemy).isBoss) as Enemy; if (boss) { const barY = 55; this.ctx.fillStyle = 'red'; this.ctx.fillRect(10, barY, this.game.width - 20, 15); this.ctx.fillStyle = 'green'; this.ctx.fillRect(10, barY, (this.game.width - 20) * (boss.health / boss.maxHealth), 15); } } }
}

const LEVELS: ILevelDefinition[] = [
    { wave: 1, scoreToEarn: 1000, enemies: ['GRUNT'], msgKey: 'wave_msg_1_invasion', s: 1200, m: 1.00 },
    { wave: 2, scoreToEarn: 2000, enemies: ['GRUNT', 'WEAVER'], msgKey: 'wave_msg_2_sighting', s: 1150, m: 1.05 },
    { wave: 3, scoreToEarn: 3500, enemies: ['GRUNT', 'WEAVER', 'TANK'], msgKey: 'wave_msg_3_heavy', s: 1100, m: 1.10 },
    { wave: 4, scoreToEarn: 6000, enemies: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER'], msgKey: 'wave_msg_4_returnfire', s: 1050, m: 1.15 },
    { wave: 5, scoreToEarn: 0, enemies: [], isMultiFormation: true, msgKey: 'wave_msg_5_multi_formation', s: 0, m: 1.20, h: 5.0 },
    { wave: 6, scoreToEarn: 12500, enemies: ['SHOOTER', 'WEAVER', 'WEAVER'], msgKey: 'wave_msg_6_weaverrain', s: 1000, m: 1.25 },
    { wave: 7, scoreToEarn: 17500, enemies: ['SHOOTER', 'TANK', 'GRUNT'], msgKey: 'wave_msg_7_skirmish', s: 950, m: 1.30 },
    { wave: 8, scoreToEarn: 22500, enemies: ['GRUNT', 'SHOOTER'], msgKey: 'wave_msg_8_surge', s: 900, m: 1.35 },
    { wave: 9, scoreToEarn: 27500, enemies: ['WEAVER', 'TANK', 'WEAVER'], msgKey: 'wave_msg_9_pressure', s: 850, m: 1.40 },
    { wave: 10, scoreToEarn: 0, enemies: [], boss: 'BOSS_SENTINEL_PRIME', msgKey: 'wave_msg_10_sentinel_prime', s: 0, m: 1.50, h: 12.0 },
    { wave: 11, scoreToEarn: 34000, enemies: ['TELEPORTER', 'GRUNT'], msgKey: 'wave_msg_11_reinforcements', s: 800, m: 1.45 },
    { wave: 12, scoreToEarn: 40000, enemies: ['SHOOTER', 'SHOOTER', 'TANK'], msgKey: 'wave_msg_12_crossfire', s: 780, m: 1.50 },
    { wave: 13, scoreToEarn: 47500, enemies: ['WEAVER', 'WEAVER', 'TELEPORTER'], msgKey: 'wave_msg_13_swarm', s: 760, m: 1.55 },
    { wave: 14, scoreToEarn: 55000, enemies: ['TELEPORTER', 'SHOOTER'], msgKey: 'wave_msg_14_ambush', s: 740, m: 1.60 },
    { wave: 15, scoreToEarn: 0, enemies: [], isMultiFormation: true, msgKey: 'wave_msg_15_multi_formation', s: 0, m: 1.70, h: 6.0 },
    { wave: 16, scoreToEarn: 75000, enemies: ['SHOOTER', 'TELEPORTER', 'WEAVER'], msgKey: 'wave_msg_16_flank', s: 720, m: 1.65 },
    { wave: 17, scoreToEarn: 87500, enemies: ['TANK', 'SHOOTER', 'WEAVER', 'GRUNT'], msgKey: 'wave_msg_17_composite', s: 700, m: 1.70 },
    { wave: 18, scoreToEarn: 95000, enemies: ['GRUNT', 'TELEPORTER', 'SHOOTER'], msgKey: 'wave_msg_18_turbulence', s: 680, m: 1.75 },
    { wave: 19, scoreToEarn: 105000, enemies: ['WEAVER', 'TANK', 'SHOOTER'], msgKey: 'wave_msg_19_heatup', s: 660, m: 1.80 },
    { wave: 20, scoreToEarn: 0, enemies: [], boss: 'BOSS_VOID_SERPENT', msgKey: 'wave_msg_20_void_serpent', s: 0, m: 1.90, h: 20.0 },
    { wave: 21, scoreToEarn: 120000, enemies: ['WEAVER', 'TELEPORTER', 'WEAVER'], msgKey: 'wave_msg_21_surge', s: 640, m: 1.85 },
    { wave: 22, scoreToEarn: 135000, enemies: ['TANK', 'TANK', 'SHOOTER'], msgKey: 'wave_msg_22_ironwall', s: 620, m: 1.90 },
    { wave: 23, scoreToEarn: 150000, enemies: ['GRUNT', 'SHOOTER', 'TANK'], msgKey: 'wave_msg_23_press', s: 600, m: 1.95 },
    { wave: 24, scoreToEarn: 170000, enemies: ['SHOOTER', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_24_crosslines', s: 580, m: 2.00 },
    { wave: 25, scoreToEarn: 0, enemies: [], isMultiFormation: true, msgKey: 'wave_msg_25_multi_formation', s: 0, m: 2.10, h: 7.0 },
    { wave: 26, scoreToEarn: 215000, enemies: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER'], msgKey: 'wave_msg_1_invasion', s: 560, m: 2.05 },
    { wave: 27, scoreToEarn: 240000, enemies: ['TELEPORTER', 'TANK', 'SHOOTER'], msgKey: 'wave_msg_2_sighting', s: 540, m: 2.10 },
    { wave: 28, scoreToEarn: 260000, enemies: ['GRUNT', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_3_heavy', s: 520, m: 2.15 },
    { wave: 29, scoreToEarn: 280000, enemies: ['WEAVER', 'TANK', 'WEAVER', 'TELEPORTER'], msgKey: 'wave_msg_4_returnfire', s: 500, m: 2.20 },
    { wave: 30, scoreToEarn: 0, enemies: [], boss: 'BOSS_OMEGA_NEXUS', msgKey: 'wave_msg_30_omega_nexus', s: 0, m: 2.30, h: 30.0 },
    { wave: 31, scoreToEarn: 310000, enemies: ['TELEPORTER', 'TELEPORTER'], msgKey: 'wave_msg_31_phase_shift', s: 480, m: 2.25 },
    { wave: 32, scoreToEarn: 340000, enemies: ['SHOOTER', 'TANK', 'SHOOTER', 'TANK'], msgKey: 'wave_msg_32_crossarmor', s: 460, m: 2.30 },
    { wave: 33, scoreToEarn: 375000, enemies: ['WEAVER', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_33_circle_assault', s: 440, m: 2.35 },
    { wave: 34, scoreToEarn: 415000, enemies: ['TELEPORTER', 'SHOOTER', 'TANK'], msgKey: 'wave_msg_34_pulse', s: 420, m: 2.40 },
    { wave: 35, scoreToEarn: 0, enemies: [], isMultiFormation: true, msgKey: 'wave_msg_35_multi_formation', s: 0, m: 2.50, h: 8.0 },
    { wave: 36, scoreToEarn: 510000, enemies: ['SHOOTER', 'SHOOTER', 'TELEPORTER', 'TELEPORTER'], msgKey: 'wave_msg_36_barrage', s: 400, m: 2.45 },
    { wave: 37, scoreToEarn: 570000, enemies: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_37_matrix', s: 380, m: 2.50 },
    { wave: 38, scoreToEarn: 640000, enemies: ['WEAVER', 'SHOOTER', 'TANK', 'TELEPORTER'], msgKey: 'wave_msg_38_overload', s: 360, m: 2.55 },
    { wave: 39, scoreToEarn: 720000, enemies: ['GRUNT', 'GRUNT', 'SHOOTER', 'TANK', 'TELEPORTER'], msgKey: 'wave_msg_39_last_stand', s: 340, m: 2.60 },
    { wave: 40, scoreToEarn: 0, enemies: [], boss: 'BOSS_NEXUS_PRIME', msgKey: 'wave_msg_40_nexus_prime', s: 0, m: 2.80, h: 40.0 },
    { wave: 41, scoreToEarn: 825000, enemies: ['SHOOTER', 'TELEPORTER', 'WEAVER'], msgKey: 'wave_msg_41_countercharge', s: 320, m: 2.65 },
    { wave: 42, scoreToEarn: 950000, enemies: ['TANK', 'SHOOTER', 'TANK', 'WEAVER'], msgKey: 'wave_msg_42_heavy_push', s: 300, m: 2.70 },
    { wave: 43, scoreToEarn: 1100000, enemies: ['GRUNT', 'SHOOTER', 'TANK'], msgKey: 'wave_msg_43_v_shape', s: 280, m: 2.75 },
    { wave: 44, scoreToEarn: 1275000, enemies: ['TELEPORTER', 'TELEPORTER', 'SHOOTER'], msgKey: 'wave_msg_44_phase_storm', s: 260, m: 2.80 },
    { wave: 45, scoreToEarn: 0, enemies: [], isMultiFormation: true, msgKey: 'wave_msg_45_multi_formation_final', s: 0, m: 3.00, h: 10.0 },
    { wave: 46, scoreToEarn: 1700000, enemies: ['TANK', 'TANK', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_46_anvil', s: 350, m: 3.20 },
    { wave: 47, scoreToEarn: 1950000, enemies: ['WEAVER', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_47_circle_strike', s: 340, m: 3.40 },
    { wave: 48, scoreToEarn: 2225000, enemies: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER', 'TELEPORTER'], msgKey: 'wave_msg_48_maelstrom', s: 330, m: 3.60 },
    { wave: 49, scoreToEarn: 2525000, enemies: ['TANK', 'SHOOTER', 'TELEPORTER', 'TELEPORTER'], msgKey: 'wave_msg_49_critical_mass', s: 320, m: 3.80 },
    { wave: 50, scoreToEarn: 0, enemies: [], boss: 'BOSS_NEXUS_PRIME', msgKey: 'wave_msg_50_final', s: 0, m: 4.50, h: 60.0 },
];

class Game {
    public canvas: HTMLCanvasElement; public ctx: CanvasRenderingContext2D; public readonly baseWidth: number = 800; public readonly baseHeight: number = 800; public width: number; public height: number; public keys: IKeyMap = {}; public gameState: string = 'LANGUAGE_SELECT'; public isPaused: boolean = false; public entities: Entity[] = []; public player: Player | null = null; public score: number = 0;

    private _coins: number = 0;
    public get coins(): number { return this._coins; }
    public set coins(v: number) {
        this._coins = v;
        syncGlobalGFC(v, this);
    }

    public sessionPowerUp: string | null = null;
    public scoreEarnedThisLevel: number = 0; public level: number = 1; public highscore: number = 0; public isBossActive: boolean = false; public uiManager: UIManager; public shopManager: ShopManager; public piManager: PiManager; public achievementManager: AchievementManager; public statsManager: StatsManager; public stars: IStar[] = []; public enemySpawnTypes: string[] = []; public enemySpawnInterval: number = 1200; private enemySpawnTimer: number = 0; public enemySpeedMultiplier: number = 1.0; public enemyHealthMultiplier: number = 1; public levelMessage: string = ''; public levelScoreToEarn: number = 0; public phoenixCoreUI: PhoenixCoreUI; public isBossSlayerActive: boolean = false; public gameMode: 'CAMPAIGN' | 'ENDLESS' = 'CAMPAIGN'; public isMobile: boolean = false; public touchX: number | null = null; public touchY: number | null = null; private container: HTMLElement; public scale: number = 1; public audioNeedsUnlock: boolean = false; public isFormationActive: boolean = false; private activeFormationEnemies: Enemy[] = []; private formationMovementDirection: number = 1; private formationMoveTimer: number = 0; private formationMoveInterval: number = 1000; private formationVerticalStep: number = 20; public isMultiFormationWaveActive: boolean = false; private multiFormationStage: number = 0; private introAnimationTimer: number = 0; public isFinalBattleActive: boolean = false; private finalBattleStage: number = 0; private finalBattleBoss: Enemy | null = null; private victoryTimer: number = 0;
    private isSpawningNextStage: boolean = false;
    public lastGameResult: ILeaderboardEntry | null = null;
    public rankStatus: 'fetching' | 'success' | 'error' = 'fetching';
    public playerWasHitThisLevel: boolean = false;
    public isSessionDataProcessed: boolean = false;
    public hasUsedReviveAd: boolean = false;
    public isWaitingForResumeInput: boolean = false;
    public hasPremiumLicense: boolean = false;

    constructor(canvas: HTMLCanvasElement, ui: IUIElements, achievementManager: AchievementManager, statsManager: StatsManager, piManager: PiManager) {
        this.achievementManager = achievementManager;
        this.achievementManager.setGame(this);
        this.statsManager = statsManager;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.width = this.baseWidth;
        this.height = this.baseHeight;
        this.container = document.getElementById('gameContainer')!;
        this.isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const handleResize = () => { this.container.style.height = '100%'; this.resizeGame(); };
        handleResize();
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
        } else {
            window.addEventListener('resize', handleResize);
        }

        // --- NEW: ORIENTATION LOCK (MANDATED FOR MOBILE) ---
        if (this.isMobile && (screen as any).orientation && (screen as any).orientation.lock) {
            try {
                (screen as any).orientation.lock('portrait').catch(() => { });
            } catch (e) { }
        }
        const existingShopManager = (window as any).dummyGameContext?.shopManager;
        this.shopManager = existingShopManager || new ShopManager(this);
        this.shopManager.setGame(this);
        this.uiManager = new UIManager(this, ui);
        this.piManager = piManager;
        this.piManager.setGame(this);
        this.phoenixCoreUI = new PhoenixCoreUI(this);
        this.loadGameData();
        this.initEventListeners();
        this.createParallaxStarfield();
        this.uiManager.populateAllTranslatedContent();

        if (!localStorage.getItem('galaxyFallLanguage')) {
            localStorage.setItem('galaxyFallLanguage', 'en');
            this.uiManager.localizationManager.setLanguage('en');
        }
        this.changeState('MODE_SELECT');
    }
    public async loadPlayerDataFromServer(): Promise<void> {
        const { uid } = this.getPlayerIdentity();
        if (!uid || uid === 'UNREGISTERED') return;
        try {
            const response = await fetch(`${API_BASE_URL}/load-data?pi_uid=${uid}`);
            if (response.ok) {
                const data = await response.json();

                // 1. Absoluten Kontostand, Highscore und Lizenz vom Server Ã¼bernehmen
                this.coins = data.coins || 0;
                this.highscore = data.highscore || 0;
                this.hasPremiumLicense = !!data.has_premium_license;
                localStorage.setItem('galaxyFallHasPremium', this.hasPremiumLicense ? '1' : '0');

                // 2. WICHTIGSTER FIX: Session-Coins resetten!
                // Da wir gerade den echten Stand vom Server geladen haben, 
                // mÃ¼ssen wir das lokale "Delta" nullen, damit diese Coins 
                // beim nÃ¤chsten Speichern nicht doppelt addiert werden.
                this.statsManager.sessionStats.coins = 0;

                // 3. Shop-Daten synchronisieren
                this.shopManager.playerUpgrades = data.upgrades;
                this.shopManager.playerCosmetics = data.cosmetics;
                this.shopManager.playerCollectibles = data.collectibles;

                // Achievement-Manager mit Server-TrophÃ¤en synchronisieren!
                if (data.trophies) {
                    this.achievementManager.syncFromServer(data.trophies);
                }

                // 4. Statistiken aktualisieren
                this.statsManager.updateFromServer(data);

                // 4b. Sprache vom Server Ã¼bernehmen (falls vorhanden)
                if (data.language) {
                    this.uiManager.localizationManager.setLanguage(data.language);
                    this.uiManager.populateAllTranslatedContent();
                }

                // 5. Lokal im Browser sichern
                localStorage.setItem('galaxyFallCoins', this.coins.toString());
                this.shopManager.saveUpgrades();
                this.shopManager.saveCosmetics();
                this.shopManager.saveCollectibles();

                console.log("âœ… Server-Daten geladen. Aktueller Kontostand:", this.coins);

                // 6. UI Ã¼berall aktualisieren
                this.uiManager.update();
                if (this.uiManager.renderShop) this.uiManager.renderShop();
                if ((window as any).updateHubUI) (window as any).updateHubUI();
            }
        } catch (error) {
            console.error("âŒ Fehler beim Synchronisieren mit dem Server:", error);
        }
    }

    private _isSavingToServer = false;
    public async savePlayerDataToServer(): Promise<void> {
        const { uid, username } = this.getPlayerIdentity();
        if (!uid || uid === 'UNREGISTERED' || this._isSavingToServer) return;

        // Wir holen die Deltas (was seit dem letzten Sync passiert ist)
        const sessionData = this.statsManager.getSessionDelta();

        // Wenn nichts passiert ist, Sync Ã¼berspringen
        if (sessionData.kills_added === 0 &&
            sessionData.coins_collected_added === 0 &&
            sessionData.playtime_added === 0 &&
            sessionData.missions_completed_added === 0) {
            return;
        }

        this._isSavingToServer = true;

        const playerData = {
            pi_uid: uid,
            username: username,
            language: this.uiManager.localizationManager.language,
            ...sessionData
        };

        try {
            const response = await fetch(`${API_BASE_URL}/save-data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(playerData)
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.updatedBalance !== undefined && data.updatedBalance !== null) {
                    // Wir nehmen den Server-Stand als absolute Wahrheit!
                    this.coins = data.updatedBalance;
                    // syncGlobalGFC wurde bereits Ã¼ber den Setter aufgerufen
                    this.achievementManager.check('coin_update');
                }

                // WICHTIGSTER FIX: Nur das abziehen, was wirklich gesendet wurde!
                // Verhindert, dass MÃ¼nzen, die WÃ„HREND des Fetch-Requests gesammelt wurden, gelÃ¶scht werden.
                this.statsManager.subtractFromSession(sessionData);
                this.statsManager.saveStats();

                this.uiManager.update();
                if ((window as any).updateHubUI) (window as any).updateHubUI();
            }
            this.statsManager.applySessionToTotal(); // Gesamtsumme lokal nachfÃ¼hren (Fallback)
        } catch (err) {
            console.error("Critical Sync Error:", err);
        } finally {
            this._isSavingToServer = false;
            // Falls wÃ¤hrend des Speicherns neue Daten reinkamen, nochmal triggern
            const finalCheck = this.statsManager.getSessionDelta();
            if (finalCheck.coins_collected_added > 0) {
                setTimeout(() => this.savePlayerDataToServer(), 1000);
            }
        }
    }


    public updateCollectibleBonus(): void {
        const bonus = this.shopManager.getEquippedCollectibleBonus();
        console.log("ðŸ”„ Updating Hub & Game Collectible Bonus:", bonus);

        if (this.player) {
            // 1. Pixel Pioneer Check
            if (bonus !== 'START_POWERUP' && this.sessionPowerUp) {
                console.log("ðŸ›‘ Pioneer Bonus deactivated mid-session.");
                this.player.powerUpManager.deactivate(this.sessionPowerUp);
                this.sessionPowerUp = null;
            }
            if (bonus === 'START_POWERUP' && !this.sessionPowerUp) {
                const startingPowerups = ['SIDE_SHOTS', 'RAPID_FIRE', 'ORBITAL_DRONE'];
                this.sessionPowerUp = startingPowerups[Math.floor(Math.random() * startingPowerups.length)]!;
                console.log("âœ¨ Pioneer Bonus activated mid-session:", this.sessionPowerUp);
                this.player.powerUpManager.activate(this.sessionPowerUp, Infinity);
            }

            // 2. Refresh Health/Stats (Koopa King, etc.)
            const initialStats = this.shopManager.getInitialPlayerStats();
            const energyRatio = this.player.energy / this.player.maxEnergy;
            this.player.maxEnergy = initialStats.maxEnergy;
            this.player.energy = initialStats.maxEnergy * energyRatio;
        }

        // Always update Hub UI
        if ((window as any).updateHubUI) (window as any).updateHubUI();
    }

    public updateContainerSize(): void {
        // Diese Methode wird Ã¼berflÃ¼ssig, da CSS jetzt die GrÃ¶ÃŸe steuert (100% / 100vh).
        // Wir lassen sie leer oder entfernen sie, um Konflikte zu vermeiden.
    }

    public resizeGame(): void {
        const container = document.getElementById('gameContainer');
        if (!container) return;

        // 1. Hole die EXAKTE GrÃ¶ÃŸe des Containers
        const rect = container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        // Sicherheits-Fallback
        if (this.width === 0 || this.height === 0) {
            const parent = container.parentElement;
            if (parent) {
                this.width = parent.clientWidth || 350;
                this.height = parent.clientHeight || 600;
            }
        }

        const ratio = window.devicePixelRatio || 1;

        // 2. Canvas anpassen
        this.canvas.width = this.width * ratio;
        this.canvas.height = this.height * ratio;

        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(ratio, ratio);

        if (this.player) {
            this.player.pos.x = Math.max(0, Math.min(this.player.pos.x, this.width - this.player.width));
            this.player.pos.y = Math.max(0, Math.min(this.player.pos.y, this.height - this.player.height));
        }

        this.createParallaxStarfield();

        // Orientation Blocker logic (Mandated by US-PROTOCOL-9)
        const blocker = document.getElementById('orientation-warning');
        if (this.isMobile && this.width > this.height) {
            if (blocker) blocker.style.display = 'flex';
            if (this.gameState === 'PLAYING' && !this.isPaused) this.togglePause();
        } else {
            if (blocker) blocker.style.display = 'none';
        }

        console.log(`Game Resized to: ${this.width}x${this.height} (Ratio: ${ratio})`);
    }
    initEventListeners(): void {
        const resizeHandler = () => {
            this.updateContainerSize();
            this.resizeGame();
        };
        window.addEventListener('resize', resizeHandler);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', resizeHandler);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                if (this.gameState === 'PLAYING' && !this.isPaused && !this.isWaitingForResumeInput) {
                    this.togglePause();
                }
                this.uiManager.soundManager.suspendAudio();
            } else if (document.visibilityState === 'visible') {
                if (this.uiManager.soundManager.audioCtx) {
                    if (this.uiManager.soundManager.audioCtx.state !== 'running') {
                        this.audioNeedsUnlock = true;
                        this.uiManager.soundManager.audioCtx.resume().then(() => {
                            this.audioNeedsUnlock = false;
                            this.uiManager.soundManager.recoveryCheck();
                        }).catch(() => {
                            // Requires user interaction
                        });
                    } else {
                        this.uiManager.soundManager.recoveryCheck();
                    }
                }
            }
        });

        window.addEventListener('pointerdown', () => {
            if (this.audioNeedsUnlock) {
                this.uiManager.soundManager.initAudio();
                this.uiManager.soundManager.recoveryCheck();
                this.audioNeedsUnlock = false;
            }
        }, { capture: true });

        const tapToStartHandler = (e: Event) => {
            this.uiManager.soundManager.initAudio();

            if (this.gameState === 'INTRO' || this.gameState === 'MENU' || this.gameState === 'WIN') {
                e.preventDefault();
                if (this.gameState === 'INTRO') {
                    this.changeState('MODE_SELECT');
                } else if (this.gameState === 'MENU' && e.target === this.canvas) {
                    this.changeState('MODE_SELECT');
                } else if (this.gameState === 'WIN') {
                    this.changeState('MENU');
                }
            }
        };

        const inventoryTapHandler = (e: MouseEvent | TouchEvent) => {
            if (!this.player || this.gameState !== 'PLAYING' || this.isPaused) return;

            const target = e.target as HTMLElement;
            const slot = target.closest('.inventory-slot');
            if (!slot) return;

            e.preventDefault();
            this.uiManager.soundManager.initAudio();

            const type = slot.getAttribute('data-inventory-type');
            const indexStr = slot.getAttribute('data-slot-index');

            if (type && indexStr) {
                const index = parseInt(indexStr, 10);
                if (type === 'special') {
                    const item = this.player.powerUpManager.specialInventory[index];
                    if (item && item.type === 'BLACK_HOLE') {
                        this.player.powerUpManager.activateSpecial(index);
                    } else if (item) {
                        this.player.powerUpManager.activateSpecial(index);
                    }
                } else if (type === 'ultra') {
                    this.player.powerUpManager.activateUltra(index);
                }
            }
        };

        // --- Mobile: touchstart fÃ¼r Inventory Slots (verhindert Doppeltap-Zoom) ---
        const inventoryTouchHandler = (e: TouchEvent) => {
            if (!this.player || this.gameState !== 'PLAYING' || this.isPaused) return;
            // Immer preventDefault um Doppeltap-Zoom zu verhindern
            e.preventDefault();
            e.stopPropagation();

            const touch = e.changedTouches[0];
            if (!touch) return;

            const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
            if (!target) return;
            const slot = target.closest('.inventory-slot') as HTMLElement;
            if (!slot) return;

            this.uiManager.soundManager.initAudio();
            const type = slot.getAttribute('data-inventory-type');
            const indexStr = slot.getAttribute('data-slot-index');

            if (type && indexStr) {
                const index = parseInt(indexStr, 10);
                if (type === 'special') {
                    const item = this.player.powerUpManager.specialInventory[index];
                    if (item) this.player.powerUpManager.activateSpecial(index);
                } else if (type === 'ultra') {
                    this.player.powerUpManager.activateUltra(index);
                }
            }
        };

        // Desktop: click, Mobile: touchstart mit passive:false (verhindert Zoom)
        if (this.uiManager.specialInventoryEl) {
            this.uiManager.specialInventoryEl.addEventListener('click', inventoryTapHandler);
            if (this.isMobile) {
                this.uiManager.specialInventoryEl.addEventListener('touchstart', inventoryTouchHandler, { passive: false });
            }
        }
        if (this.uiManager.ultraInventoryEl) {
            this.uiManager.ultraInventoryEl.addEventListener('click', inventoryTapHandler);
            if (this.isMobile) {
                this.uiManager.ultraInventoryEl.addEventListener('touchstart', inventoryTouchHandler, { passive: false });
            }
        }

        if (this.isMobile) {
            this.initMobileControls();
            if (this.canvas) {
                this.canvas.addEventListener('touchstart', tapToStartHandler, { passive: false });
            }
        } else {
            this.initDesktopControls();
            window.addEventListener('click', () => this.uiManager.soundManager.initAudio());
        }
    }

    public saveGameData(): void {
        localStorage.setItem('galaxyFallSave', JSON.stringify({ coins: this.coins, highscore: this.highscore }));
        // Setter von this.coins kÃ¼mmert sich um localStorage 'galaxyFallCoins'
        this.achievementManager.check('coin_update');
        this.savePlayerDataToServer();
    }
    public loadGameData(): void {
        const piUid = this.piManager?.uid || (window as any).piManagerInstance?.uid;
        const premiumFlag = localStorage.getItem('galaxyFallHasPremium');
        if (premiumFlag !== null) {
            this.hasPremiumLicense = premiumFlag === '1';
        }

        // 1. Wir laden den dedizierten, gesicherten GFC-Speicher (synchronisiert vom Server)
        const savedCoins = localStorage.getItem('galaxyFallCoins');
        if (savedCoins) {
            const amount = parseInt(savedCoins) || 0;
            // Wir nehmen den hÃ¶heren Wert (entweder schon im Speicher oder aus dem Cache)
            if (amount > this._coins) {
                this._coins = amount;
            }
        }

        // 2. Wenn ein PI User da ist, ignorieren wir den manipulierbaren 'galaxyFallSave' Speicher komplett
        if (piUid && piUid !== 'UNREGISTERED') {
            return;
        }

        const savedStats = localStorage.getItem('galaxyFallSave');

        // 2. PrioritÃ¤t: Der dedizierte GFC-Speicher
        if (savedCoins) {
            this._coins = parseInt(savedCoins) || 0;
        }

        // 2. SekundÃ¤r: Highscore und Fallback-Coins aus dem Save-Objekt
        if (savedStats && savedStats !== 'undefined' && savedStats !== 'null') {
            try {
                const data = JSON.parse(savedStats);
                if (data.highscore) this.highscore = data.highscore;
                // Falls galaxyFallCoins leer war, nehmen wir den Stand von hier
                if (this._coins === 0 && data.coins) {
                    this._coins = data.coins;
                }
            } catch (e) {
                console.warn("Failed to parse galaxyFallSave", e);
            }
        }

        // 3. Alle Systeme Ã¼ber den geladenen Stand informieren
        syncGlobalGFC(this._coins, this);
    }
    public awardPiCoinBundle(bundle: IShopItem) { if (bundle.coin_reward) { this.coins += bundle.coin_reward; this.saveGameData(); this.uiManager.renderShop(); } }

    initMobileControls(): void {
        const getTouchPos = (e: TouchEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.changedTouches[0];
            if (!touch) return null;
            return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
        };
        this.canvas.addEventListener('touchstart', (e) => {
            this.uiManager.soundManager.initAudio();

            // Wenn wir im Wait-State sind (nach Continue-Ad), nur Audio entsperren.
            // touchX/touchY werden NICHT gesetzt â€“ der Touch wird in update() ausgelesen
            // nachdem die Ãœberschrift "TAP TO CONTINUE" erschienen ist.
            if (this.isWaitingForResumeInput) {
                e.preventDefault();
                // Wir setzen touchX/touchY direkt, damit update() es beim nÃ¤chsten Frame
                // als Signal erkennt. Das drawOverlay lÃ¤uft bereits â€“ kein sofortiger Kill.
                const pos = getTouchPos(e);
                if (pos) {
                    this.touchX = pos.x;
                    this.touchY = pos.y;
                }
                return;
            }

            if (this.gameState !== 'PLAYING' || this.isPaused) return;
            const touch = e.changedTouches[0];
            if (!touch) return;

            e.preventDefault();
            const pos = getTouchPos(e);
            if (pos) {
                this.touchX = pos.x;
                this.touchY = pos.y;
            }

        }, { passive: false });
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.gameState !== 'PLAYING' || this.isPaused) return;
            if (this.touchX !== null && this.touchY !== null) {
                e.preventDefault();
                const pos = getTouchPos(e);
                if (pos) {
                    this.touchX = pos.x;
                    this.touchY = pos.y;
                }
            }
        }, { passive: false });
        this.canvas.addEventListener('touchend', (e) => {
            const stillOnCanvas = Array.from(e.touches).some(t => (t.target as HTMLElement) === this.canvas);
            if (!stillOnCanvas) {
                this.touchX = null;
                this.touchY = null;
            }
        });
    }

    initDesktopControls(): void {
        const keyMap: { [key: string]: { type: 'special' | 'ultra', index: number } } = {
            'Digit1': { type: 'special', index: 0 },
            'Digit2': { type: 'special', index: 1 },
            'Digit3': { type: 'special', index: 2 },
            'Digit4': { type: 'ultra', index: 0 },
            'Digit5': { type: 'ultra', index: 1 },
        };
        window.addEventListener('keydown', (e) => {
            this.uiManager.soundManager.initAudio();

            this.keys[e.code] = true;
            if (e.code === 'Escape' && (this.gameState === 'PLAYING' || this.isPaused)) this.togglePause();
            if (e.code === 'Enter') {
                e.preventDefault();
                if (this.gameState === 'INTRO') {
                    this.uiManager.soundManager.initAudio();
                    this.changeState('MODE_SELECT');
                } else if (this.gameState === 'MENU') {
                    this.uiManager.soundManager.initAudio();
                    this.changeState('MODE_SELECT');
                } else if (['WIN'].includes(this.gameState)) this.changeState('MENU');
            }
            if (this.gameState === 'PLAYING' && this.player && !this.isPaused && !this.player.isChargingBlackHole) {
                const mapping = keyMap[e.code];
                if (mapping && mapping.type === 'special') {
                    const item = this.player.powerUpManager.specialInventory[mapping.index];
                    if (item && item.type === 'BLACK_HOLE') {
                        e.preventDefault();
                        this.player.isChargingBlackHole = true;
                        this.player.blackHoleChargeSlot = mapping.index;
                    }
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            if (this.gameState === 'PLAYING' && this.player && !this.isPaused) {
                const mapping = keyMap[e.code];
                if (this.player.isChargingBlackHole && this.player.blackHoleChargeSlot !== null) {
                    const chargedMapping = Object.values(keyMap).find(m => m.index === this.player.blackHoleChargeSlot && m.type === 'special');
                    const chargedKey = Object.keys(keyMap).find(key => keyMap[key] === chargedMapping);
                    if (e.code === chargedKey) {
                        e.preventDefault();
                        this.player.powerUpManager.activateSpecial(this.player.blackHoleChargeSlot);
                        this.player.isChargingBlackHole = false;
                        this.player.blackHoleChargeSlot = null;
                    }
                } else if (mapping) {
                    e.preventDefault();
                    if (mapping.type === 'special') {
                        const item = this.player.powerUpManager.specialInventory[mapping.index];
                        if (item && item.type !== 'BLACK_HOLE') {
                            this.player.powerUpManager.activateSpecial(mapping.index);
                        }
                    } else if (mapping.type === 'ultra') {
                        this.player.powerUpManager.activateUltra(mapping.index);
                    }
                }
            }
        });
    }
    togglePause(): void { this.isPaused = !this.isPaused; this.changeState(this.isPaused ? 'PAUSED' : 'PLAYING'); }

    public startReviveSequence(player: Player, crystalType: 'BLUE' | 'YELLOW' | 'PURPLE'): void {
        this.changeState('REVIVING');
        const level = this.shopManager.getUpgradeLevel('revive_chance');
        let index = 0;
        if (crystalType === 'BLUE') index = 0;
        if (crystalType === 'YELLOW') index = level > 1 ? 1 : 0;
        if (crystalType === 'PURPLE') index = level > 2 ? 2 : (level > 1 ? 1 : 0);
        const startX = this.width - 160 + (index * 45) + 20;
        const startY = 10 + 20;
        this.addEntity(new ReviveCrystalAnimation(this, startX, startY, player, crystalType));
    }

    changeState(newState: string, forceReset: boolean = false): void {
        if (newState === this.gameState && !forceReset) return;
        try {
            const mobilePauseButton = document.getElementById('mobile-pause-button');
            if (this.isMobile && mobilePauseButton) { mobilePauseButton.style.display = newState === 'PLAYING' ? 'block' : 'none'; }

            this.uiManager.toggleMainMenu(false);
            this.uiManager.togglePauseMenu(false);
            this.uiManager.toggleGameOverScreen(false);
            this.uiManager.toggleShopScreen(false);
            this.uiManager.toggleModeSelectScreen(false);

            if (newState === 'PAUSED') this.isPaused = true;
            else if (this.gameState === 'PAUSED') this.isPaused = false;

            const oldState = this.gameState;
            this.gameState = newState;

            if (this.achievementManager) this.achievementManager.check('state_change');

            switch (newState) {
                case 'INTRO':
                    this.introAnimationTimer = 0;
                    break;
                case 'MENU':
                    this.entities = [];
                    this.player = null;
                    this.uiManager.toggleMainMenu(true);
                    this.uiManager.soundManager.setTrack('menu');
                    break;
                case 'MODE_SELECT':
                    this.uiManager.toggleModeSelectScreen(true);
                    break;
                case 'PAUSED':
                    this.uiManager.soundManager.setTrack('menu');
                    this.uiManager.togglePauseMenu(true);
                    break;
                case 'PLAYING':
                    if (oldState === 'PAUSED' || oldState === 'REVIVING') {
                        if (this.isBossActive) this.uiManager.soundManager.setTrack('boss');
                        else this.uiManager.soundManager.setTrack('normal');
                    }
                    break;
                case 'LEVEL_START':
                    const isNewGame = forceReset || !this.player;
                    if (isNewGame) {
                        this.isSessionDataProcessed = false;
                        this.hasUsedReviveAd = false;
                        this.achievementManager.check('game_start');
                        // **NEU: Sitzungsstatistiken zurÃ¼cksetzen**
                        this.statsManager.resetSession();
                        this.level = 1;
                        this.score = 0;
                        this.entities = [];
                        this.isBossSlayerActive = false;
                        this.lastGameResult = null;
                        this.keys = {}; // Clear keys to prevent sticky input from menus
                        this.touchX = null;
                        this.touchY = null;
                        const initialStats = this.shopManager.getInitialPlayerStats();
                        this.player = new Player(this, initialStats);
                        this.addEntity(this.player);
                        if (this.shopManager.getEquippedCollectibleBonus() === 'START_POWERUP') {
                            const startingPowerups = ['SIDE_SHOTS', 'RAPID_FIRE', 'ORBITAL_DRONE'];
                            if (!this.sessionPowerUp) {
                                this.sessionPowerUp = startingPowerups[Math.floor(Math.random() * startingPowerups.length)]!;
                            }
                            this.player.powerUpManager.activate(this.sessionPowerUp, Infinity);
                        } else {
                            this.sessionPowerUp = null;
                        }
                        const specialChargeLevel = this.shopManager.getUpgradeLevel('special_charge');
                        if (specialChargeLevel > 0) {
                            const availablePowerUps = ['NUKE', 'BLACK_HOLE', 'SCORE_BOOST'];
                            for (let i = 0; i < specialChargeLevel; i++) {
                                if (availablePowerUps.length === 0) break;
                                const randomIndex = Math.floor(Math.random() * availablePowerUps.length);
                                const chosenPowerUp = availablePowerUps.splice(randomIndex, 1)[0]!;
                                this.player.powerUpManager.collectSpecial(chosenPowerUp);
                            }
                        }

                        // --- APPLY HUB (LUCKY WHEEL) INVENTORY ---
                        const wheelInv = this.shopManager.wheelData.inventory;
                        if (wheelInv.specials.length > 0) {
                            wheelInv.specials.forEach(it => this.player?.powerUpManager.collectSpecial(it));
                            wheelInv.specials = [];
                        }
                        if (wheelInv.ultras.length > 0) {
                            wheelInv.ultras.forEach(it => this.player?.powerUpManager.collectUltra(it));
                            wheelInv.ultras = [];
                        }
                        if (wheelInv.extraRevives > 0) {
                            // Convert into extra crystals for the session
                            for (let r = 0; r < wheelInv.extraRevives; r++) {
                                this.player?.availableReviveCrystals.push('PURPLE');
                            }
                            wheelInv.extraRevives = 0;
                        }
                        this.shopManager.saveWheelData();
                    } else {
                        this.level++;
                        this.entities = this.entities.filter(e => e.family === 'player' || e.family === 'pickup' || e.type === 'LASER_BEAM');
                    }

                    this.achievementManager.check('level_start');

                    if (this.gameMode === 'CAMPAIGN' && this.level > LEVELS.length) {
                        this.changeState('WIN');
                        return;
                    }
                    this.isBossActive = false;
                    this.isFinalBattleActive = false;
                    this.isFormationActive = false;
                    this.isMultiFormationWaveActive = false;
                    this.activeFormationEnemies = [];
                    this.scoreEarnedThisLevel = 0;
                    this.playerWasHitThisLevel = false;
                    this.configureLevel();
                    // Ensure session power-up persists across levels
                    if (this.player && this.sessionPowerUp) {
                        this.player.powerUpManager.activate(this.sessionPowerUp, Infinity);
                    }
                    this.changeState('PLAYING_TRANSITION');
                    break;
                case 'PLAYING_TRANSITION':
                    setTimeout(() => this.changeState('PLAYING'), 3000);
                    break;
                case 'GAME_OVER':
                    if (this.score > this.highscore) this.highscore = this.score;
                    this.statsManager.incrementMissions();
                    this.saveGameData(); // Ruft die korrigierte savePlayerDataToServer auf
                    this.rankStatus = 'fetching';
                    this.submitScoreToServer();
                    this.uiManager.soundManager.setTrack('menu');
                    this.uiManager.toggleGameOverScreen(true);
                    break;
                case 'VICTORY_SEQUENCE':
                    this.victoryTimer = 0;
                    this.entities = this.entities.filter(e => e.family === 'player' || e.family === 'effect');
                    this.uiManager.soundManager.setTrack('menu');
                    break;
                case 'WIN':
                    if (this.score > this.highscore) this.highscore = this.score;
                    this.statsManager.incrementMissions(); // **NEU**
                    this.saveGameData();
                    this.rankStatus = 'fetching';
                    this.submitScoreToServer();
                    this.uiManager.soundManager.setTrack('menu');
                    this.piManager.showAd(); // NEU: Optionale Werbung beim Gewinnen
                    break;
            }
        } catch (e) {
            console.error(`[Game] Error in changeState:`, e);
        }
    }

    public continueAfterAd(): void {
        if (this.player) {
            this.hasUsedReviveAd = true;

            // ===== ECHTER FIX: Spieler wurde durch destroy() als garbage markiert =====
            // _isGarbage muss zurÃ¼ckgesetzt werden, sonst gibt isAlive() false zurÃ¼ck
            // und das Spiel geht sofort wieder in den GAME_OVER Zustand.
            (this.player as any)._isGarbage = false;

            // Spieler zurÃ¼ck in die mitte setzen und neu zur entities-Liste hinzufÃ¼gen,
            // falls er durch cleanupEntities() bereits entfernt wurde.
            this.player.pos.x = this.width / 2 - this.player.width / 2;
            this.player.pos.y = this.height - (this.isMobile ? 200 : 120);
            if (!this.entities.includes(this.player)) {
                this.entities.push(this.player);
            }

            // Energie und Leben wiederherstellen + 5 Sekunden Ghost Protocol
            this.player.lives = 1;
            this.player.energy = this.player.maxEnergy;
            this.player.powerUpManager.activate('GHOST_PROTOCOL', 5000);

            // Alle Feinde-Projektile entfernen damit der Spieler nicht sofort wieder getroffen wird
            this.entities = this.entities.filter(e => e.family !== 'projectile' || e.type !== 'ENEMY_PROJECTILE');

            // WICHTIG: isWaitingForResumeInput VOR changeState setzen,
            // und touchX/touchY/keys leeren damit der vorherige Button-Touch
            // den Wait-State nicht sofort aufhebt.
            this.isWaitingForResumeInput = true;
            this.touchX = null;
            this.touchY = null;
            this.keys = {};
            this.uiManager.toggleGameOverScreen(false);
            this.changeState('PLAYING');
            if (this.isBossActive) this.uiManager.soundManager.setTrack('boss');
            else this.uiManager.soundManager.setTrack('normal');
        } else {
            this.changeState('LEVEL_START', true);
        }
    }

    public resumeFromAdWait(): void {
        if (this.isWaitingForResumeInput) {
            this.isWaitingForResumeInput = false;
            if (this.uiManager && this.uiManager.soundManager) {
                this.uiManager.soundManager.initAudio();
                this.uiManager.soundManager.recoveryCheck();
                this.uiManager.soundManager.unmuteAll();
            }
        }
    }

    // NEU: Erstellt oder lÃ¤dt eine IdentitÃ¤t fÃ¼r Gastspieler
    public getPlayerIdentity(): { uid: string, username: string } {
        // 1. Wenn Pi-User eingeloggt ist, nimm dessen Daten
        if (this.piManager.isAuthenticated && this.piManager.uid) {
            return {
                uid: this.piManager.uid,
                username: this.piManager.username
            };
        }

        // 2. Wenn kein Pi-User, prÃ¼fe ob wir schon eine Gast-ID haben
        let guestId = localStorage.getItem('galaxy_fall_guest_id');
        let guestName = localStorage.getItem('galaxy_fall_guest_name');

        // 3. Wenn nicht, erstelle eine neue
        if (!guestId) {
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            guestId = `guest_${randomSuffix}`;
            guestName = `Gast-Pilot ${randomSuffix.substring(0, 3).toUpperCase()}`;

            localStorage.setItem('galaxy_fall_guest_id', guestId);
            localStorage.setItem('galaxy_fall_guest_name', guestName);
        }

        return { uid: guestId!, username: guestName! };
    }

    private async submitScoreToServer(): Promise<void> {
        // HIER GEÃ„NDERT: IdentitÃ¤t dynamisch holen (Pi oder Gast)
        const identity = this.getPlayerIdentity();

        if (!identity.uid) {
            this.rankStatus = 'error';
            return;
        }

        const scoreData = {
            pi_uid: identity.uid,
            username: identity.username,
            score: this.score,
            waves: this.gameMode === 'CAMPAIGN' && this.level > LEVELS.length ? LEVELS.length : this.level,
            mode: this.gameMode.toLowerCase()
        };

        try {
            const response = await fetch(`${API_BASE_URL}/submit-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scoreData)
            });

            if (response.ok) {
                const result: ILeaderboardEntry = await response.json();
                this.lastGameResult = result;
                this.rankStatus = 'success';

                if (this.gameState === 'GAME_OVER') {
                    this.uiManager.displayFinalRank(result);
                }
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (error) {
            console.error("Fehler beim Ãœbermitteln des Scores:", error);
            this.rankStatus = 'error';
            if (this.gameState === 'GAME_OVER') {
                this.uiManager.displayFinalRank(null, true);
            }
        }
    }

    update(deltaTime: number): void {
        if (this.isWaitingForResumeInput) {
            this.updateParallaxStarfield(deltaTime);
            const hasInput = (this.touchX !== null && this.touchY !== null) || Object.values(this.keys).some(k => k);
            if (hasInput) {
                this.resumeFromAdWait();
                // WICHTIG: Nach dem Aufheben des Wait-States EINEN Frame Ã¼berspringen,
                // damit der Spieler nicht sofort stirbt (Ghost-Protocol muss erst greifen)
                // und damit kein sofortiger Kollisionscheck im gleichen Frame stattfindet.
                return;
            } else {
                return;
            }
        }

        if (this.gameState === 'REVIVING') {
            this.updateParallaxStarfield(deltaTime);
            this.entities.forEach(e => {
                if (e.family === 'effect' || e instanceof Player) e.update(deltaTime);
            });
            this.cleanupEntities();
            return;
        }

        if (this.isPaused || !['PLAYING', 'VICTORY_SEQUENCE'].includes(this.gameState)) {
            if (this.gameState !== 'LANGUAGE_SELECT' && this.gameState !== 'PLAYING') {
                this.updateParallaxStarfield(deltaTime);
            }
            if (this.gameState === 'INTRO') {
                this.introAnimationTimer += deltaTime;
            }
            return;
        }

        // **NEU: Spielzeit verfolgen**
        this.statsManager.addPlaytime(deltaTime / 1000);

        if (this.gameState === 'VICTORY_SEQUENCE') {
            this.updateVictorySequence(deltaTime);
            return;
        }

        this.updateParallaxStarfield(deltaTime);
        this.entities.forEach(e => e.update(deltaTime));
        this.phoenixCoreUI.update(deltaTime);
        if (this.isFormationActive || this.isMultiFormationWaveActive) {
            this.updateActiveFormation(deltaTime);
        }

        this.handleCollisions();
        this.cleanupEntities();

        if (!this.player || !this.player.isAlive()) {
            this.changeState('GAME_OVER');
            return;
        }

        let levelObjectiveMet = false;
        if (this.isFinalBattleActive) {
            if (this.finalBattleBoss && !this.finalBattleBoss.isAlive()) {
                this.advanceFinalBattle();
            }
        } else if (this.isMultiFormationWaveActive && !this.isSpawningNextStage) {
            if (this.activeFormationEnemies.every(e => !e.isAlive())) {

                this.isSpawningNextStage = true;

                this.multiFormationStage++;
                this.activeFormationEnemies = [];

                if (this.multiFormationStage > 3) {
                    levelObjectiveMet = true;
                    this.isSpawningNextStage = false;
                } else {
                    this.spawnNextFormationStage();
                }
            }
        }

        else if (this.isFormationActive) {
            if (this.activeFormationEnemies.every(e => !e.isAlive())) {
                levelObjectiveMet = true;
            }
        } else if (this.isBossActive) {
            // No automatic level change for bosses
        } else {
            if (this.levelScoreToEarn > 0 && this.scoreEarnedThisLevel >= this.levelScoreToEarn) {
                levelObjectiveMet = true;
            }
        }

        if (levelObjectiveMet) {
            this.achievementManager.check('level_cleared', this.playerWasHitThisLevel ? 'hit' : 'no_hit');
            this.changeState('LEVEL_START');
            return;
        }

        this.enemySpawnTimer += deltaTime;
        if (this.isBossActive) {
            const boss = this.entities.find(e => (e as Enemy).isBoss) as Enemy;
            if (boss) {
                const healthPercentage = boss.health / boss.maxHealth;
                const spawnInterval = 1000 + (4000 * healthPercentage);
                if (this.enemySpawnTimer > spawnInterval) {
                    this.spawnEnemy(true);
                    this.enemySpawnTimer = 0;
                }
            }
        } else if (!this.isFormationActive && !this.isMultiFormationWaveActive) {
            if (this.enemySpawnTimer > this.enemySpawnInterval) {
                this.spawnEnemy();
                this.enemySpawnTimer = 0;
            }
        }

        this.uiManager.update();
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawParallaxStarfield();
        if (['PLAYING', 'PLAYING_TRANSITION', 'PAUSED', 'REVIVING', 'VICTORY_SEQUENCE'].includes(this.gameState)) {
            this.entities.forEach(e => {
                if (e.family === 'projectile') e.draw(this.ctx);
            });
            this.entities.forEach(e => {
                if (e.family !== 'player' && e.family !== 'effect' && e.family !== 'projectile') e.draw(this.ctx);
            });
            this.entities.forEach(e => {
                if (e.family === 'player') e.draw(this.ctx);
            });
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'lighter';
            this.entities.forEach(e => {
                if (e.family === 'effect') e.draw(this.ctx);
            });
            this.ctx.restore();
            this.phoenixCoreUI.draw(this.ctx);
        }
        this.uiManager.drawOverlay();

        if (this.isWaitingForResumeInput) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.font = '20px "Press Start 2P"';
            this.ctx.fillStyle = '#00FFFF';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowColor = '#000000';
            this.ctx.shadowBlur = 10;
            this.ctx.fillText("TAP OR MOVE TO CONTINUE", this.width / 2, this.height / 2);
            this.ctx.restore();
        }

        switch (this.gameState) {
            case 'INTRO':
            case 'MENU':
                this.drawProfessionalIntro();
                break;
            case 'PLAYING_TRANSITION':
                this.uiManager.drawLevelMessage();
                break;
            case 'GAME_OVER':
                this.uiManager.drawGameOver();
                break;
            case 'VICTORY_SEQUENCE':
                this.drawVictorySequence();
                break;
            case 'WIN':
                this.uiManager.drawWinScreen();
                break;
        }
    }

    updateVictorySequence(deltaTime: number): void {
        this.victoryTimer += deltaTime;
        if (this.victoryTimer < 4000) {
            const slowMoFactor = 0.1;
            this.updateParallaxStarfield(deltaTime * slowMoFactor);
            this.entities.forEach(e => {
                if (e.family === 'effect' || e.family === 'player') {
                    e.update(deltaTime * slowMoFactor);
                }
            });
        } else if (this.victoryTimer >= 4000 && this.victoryTimer < 7000) {
            if (this.player) {
                this.player.pos.y -= 1200 * (deltaTime / 1000);
            }
            this.updateParallaxStarfield(deltaTime * 8);
        } else if (this.victoryTimer < 12000) {
            this.updateParallaxStarfield(deltaTime * 0.5);
            if (Math.random() < 0.05) {
                this.addEntity(new LightRay(this));
            }
        } else {
            this.changeState('WIN');
        }
        this.entities.forEach(e => {
            if (e.family === 'effect') e.update(deltaTime);
        });
        this.cleanupEntities();
    }
    drawVictorySequence(): void {
        const t = (key: string) => this.uiManager.localizationManager.translate(key);
        const timer = this.victoryTimer;

        this.drawParallaxStarfield();
        if (this.player) this.player.draw(this.ctx);
        this.entities.forEach(e => e.draw(this.ctx));

        if (timer > 800 && timer < 1500) {
            const flashAlpha = 1 - Math.abs(1150 - timer) / 350;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        const scaleFactor = this.width / this.baseWidth;
        const maxWidth = this.width * 0.9;

        if (timer > 7500) {
            const titleTime = timer - 7500;
            const titleAlpha = Math.min(1, titleTime / 2000);
            const titleScale = 1 + Math.max(0, 1 - titleTime / 500) * 0.1;
            const titleSize = Math.max(32, 80 * scaleFactor);

            this.ctx.save();
            this.ctx.globalAlpha = titleAlpha;
            this.ctx.font = `${titleSize}px 'Press Start 2P'`;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.shadowColor = '#FFA500';
            this.ctx.shadowBlur = 30;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.translate(this.width / 2, this.height / 2 - 80);
            this.ctx.scale(titleScale, titleScale);
            this.ctx.fillText(t('victory_title_epic'), 0, 0, maxWidth / titleScale);
            this.ctx.restore();
        }

        if (timer > 9000) {
            const scoreTime = timer - 9000;
            const scoreAlpha = Math.min(1, scoreTime / 1000);
            const scoreSize = Math.max(18, 32 * scaleFactor);

            this.ctx.globalAlpha = scoreAlpha;
            this.ctx.font = `${scoreSize}px 'Press Start 2P'`;
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(`${t('victory_final_score')}: ${this.score}`, this.width / 2, this.height / 2 + 20, maxWidth);
        }

        if (timer > 10000) {
            const subTime = timer - 10000;
            const subAlpha = Math.min(1, subTime / 1000);
            const subSize = Math.max(14, 24 * scaleFactor);

            this.ctx.globalAlpha = subAlpha;
            this.ctx.font = `${subSize}px 'Press Start 2P'`;
            this.ctx.fillStyle = '#00FFFF';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(t('victory_subtitle_campaign'), this.width / 2, this.height / 2 + 80, maxWidth);
        }
    }
    private generateEndlessWave(waveNumber: number): ILevelDefinition { const t = (key: string) => this.uiManager.localizationManager.translate(key); const isBreatherWave = (waveNumber > 0 && waveNumber % 4 === 0); let healthMultiplier = 1 + (waveNumber * 0.02); let speedMultiplier = 1 + (waveNumber * 0.015); let budget = 8 + Math.pow(waveNumber, 1.25); if (isBreatherWave) budget *= 0.6; const enemyCosts = { 'GRUNT': 1, 'WEAVER': 2, 'TANK': 3, 'SHOOTER': 4, 'TELEPORTER': 6 }; const weightedEnemyTypes = [{ type: 'GRUNT', weight: 5 }, { type: 'WEAVER', weight: 4 }, { type: 'TANK', weight: 3 }, { type: 'SHOOTER', weight: 3 }, { type: 'TELEPORTER', weight: 2 },]; const enemyPool: string[] = []; let totalPointsInPool = 0; let tempBudget = budget; while (tempBudget > 0) { const totalWeight = weightedEnemyTypes.reduce((sum, e) => sum + e.weight, 0); let randomWeight = Math.random() * totalWeight; let chosenEnemyType = 'GRUNT'; for (const enemy of weightedEnemyTypes) { randomWeight -= enemy.weight; if (randomWeight <= 0) { chosenEnemyType = enemy.type; break; } } const cost = enemyCosts[chosenEnemyType as keyof typeof enemyCosts]; if (tempBudget - cost >= 0) { enemyPool.push(chosenEnemyType); tempBudget -= cost; totalPointsInPool += (this.createEnemyByType(chosenEnemyType)?.pointsValue || 10); } else { if (tempBudget - enemyCosts['GRUNT'] >= 0) { enemyPool.push('GRUNT'); tempBudget -= enemyCosts['GRUNT']; totalPointsInPool += (this.createEnemyByType('GRUNT')?.pointsValue || 10); } else break; } } if (enemyPool.length === 0) enemyPool.push('GRUNT'); let spawnInterval = Math.max(200, 800 - waveNumber * 10); if (isBreatherWave) spawnInterval *= 1.5; let msgKey = isBreatherWave ? t('endless_wave_breather') : `${t('endless_wave')} ${waveNumber}`; if (!isBreatherWave && Math.random() < 0.25) { const affix = ['Frenzy', 'Thick Skins', 'Bullet Hell', 'Blink Storm'][Math.floor(Math.random() * 4)]!; switch (affix) { case 'Frenzy': speedMultiplier *= 1.3; spawnInterval *= 0.7; msgKey = `${t('endless_wave')} ${waveNumber}: ${t('affix_frenzy')}`; break; case 'Thick Skins': healthMultiplier *= 1.5; for (let i = 0; i < Math.ceil(enemyPool.length / 4); i++) enemyPool[Math.floor(Math.random() * enemyPool.length)] = 'TANK'; msgKey = `${t('endless_wave')} ${waveNumber}: ${t('affix_thick_skins')}`; break; case 'Bullet Hell': for (let i = 0; i < Math.ceil(enemyPool.length / 2); i++) enemyPool[Math.floor(Math.random() * enemyPool.length)] = 'SHOOTER'; msgKey = `${t('endless_wave')} ${waveNumber}: ${t('affix_bullet_hell')}`; break; case 'Blink Storm': for (let i = 0; i < Math.ceil(enemyPool.length / 2); i++) enemyPool[Math.floor(Math.random() * enemyPool.length)] = 'TELEPORTER'; msgKey = `${t('endless_wave')} ${waveNumber}: ${t('affix_blink_storm')}`; break; } } const expectedSpawns = (35 * 1000) / spawnInterval; const avgPoints = totalPointsInPool / enemyPool.length; const scoreToEarn = Math.floor(expectedSpawns * avgPoints * waveNumber * 0.8); return { wave: waveNumber, scoreToEarn, enemies: enemyPool, msgKey, s: spawnInterval, m: speedMultiplier, h: healthMultiplier }; }
    configureLevel(): void { let levelData: ILevelDefinition; if (this.gameMode === 'CAMPAIGN') { if (this.level > LEVELS.length) { this.changeState('WIN'); return; } levelData = LEVELS[this.level - 1]!; } else { levelData = this.generateEndlessWave(this.level); } if (this.gameMode === 'CAMPAIGN' && this.level === 50) { this.isFinalBattleActive = true; this.finalBattleStage = 0; this.advanceFinalBattle(); return; } this.enemySpawnTypes = levelData.enemies; this.enemySpawnInterval = levelData.s; this.enemySpeedMultiplier = levelData.m; this.enemyHealthMultiplier = levelData.h ?? 1; this.levelMessage = this.uiManager.localizationManager.translate(levelData.msgKey) || levelData.msgKey; this.levelScoreToEarn = levelData.scoreToEarn; this.enemySpawnTimer = 0; this.uiManager.update(); if (levelData.isMultiFormation) { this.isMultiFormationWaveActive = true; this.multiFormationStage = 1; this.spawnNextFormationStage(); if (this.gameState !== 'MENU') this.uiManager.soundManager.setTrack('normal'); } else if (levelData.boss) { this.isBossActive = true; this.spawnEnemy(false, levelData.boss); this.uiManager.soundManager.setTrack('boss'); } else { if (this.gameState !== 'MENU') this.uiManager.soundManager.setTrack('normal'); } }
    private advanceFinalBattle(): void { this.finalBattleStage++; this.finalBattleBoss = null; this.entities.filter(e => e.family === 'enemy').forEach(e => e.destroy()); let bossToSpawn: Enemy | null = null; let messageKey: string = ''; switch (this.finalBattleStage) { case 1: messageKey = 'final_battle_msg_1'; bossToSpawn = new BossSentinelPrime(this, 10 * (1 + this.level / 5), 1.2 + this.level / 10, true); break; case 2: messageKey = 'final_battle_msg_2'; bossToSpawn = new BossVoidSerpent(this, 11 * (1 + this.level / 5), 1.3 + this.level / 10, true); break; case 3: messageKey = 'final_battle_msg_3'; bossToSpawn = new BossOmegaNexus(this, 12 * (1 + this.level / 5), 1.4 + this.level / 10, true); break; case 4: messageKey = 'final_battle_msg_4'; bossToSpawn = new BossNexusPrime(this, 15 * (1 + this.level / 5), 1.5 + this.level / 10, true); break; case 5: this.changeState('VICTORY_SEQUENCE'); return; } if (bossToSpawn) { this.isBossActive = true; this.levelMessage = this.uiManager.localizationManager.translate(messageKey); this.finalBattleBoss = bossToSpawn; this.addEntity(this.finalBattleBoss); this.uiManager.soundManager.setTrack('boss'); this.addEntity(new ShockwaveEffect(this, this.width / 2, this.height / 2, '#FFD700')); } }
    private spawnNextFormationStage(): void {
        const levelData = LEVELS[this.level - 1]!;
        this.levelMessage = this.uiManager.localizationManager.translate(levelData.msgKey) + ` (${this.multiFormationStage}/3)`;
        this.uiManager.update();

        setTimeout(() => {
            if (this.level === 5) {
                switch (this.multiFormationStage) {
                    case 1: this.spawnFormation_Wave5_Stage1(); break;
                    case 2: this.spawnFormation_Wave5_Stage2(); break;
                    case 3: this.spawnFormation_Wave5_Stage3(); break;
                }
            } else if (this.level === 15) {
                switch (this.multiFormationStage) {
                    case 1: this.spawnFormation_Wave15_Stage1(); break;
                    case 2: this.spawnFormation_Wave15_Stage2(); break;
                    case 3: this.spawnFormation_Wave15_Stage3(); break;
                }
            } else if (this.level === 25) {
                switch (this.multiFormationStage) {
                    case 1: this.spawnFormation_Wave25_Stage1(); break;
                    case 2: this.spawnFormation_Wave25_Stage2(); break;
                    case 3: this.spawnFormation_Wave25_Stage3(); break;
                }
            } else if (this.level === 35) {
                switch (this.multiFormationStage) {
                    case 1: this.spawnFormation_Wave35_Stage1(); break;
                    case 2: this.spawnFormation_Wave35_Stage2(); break;
                    case 3: this.spawnFormation_Wave35_Stage3(); break;
                }
            } else if (this.level === 45) {
                switch (this.multiFormationStage) {
                    case 1: this.spawnFormation_Wave45_Stage1(); break;
                    case 2: this.spawnFormation_Wave45_Stage2(); break;
                    case 3: this.spawnFormation_Wave45_Stage3(); break;
                }
            }
            this.isSpawningNextStage = false;
        }, 2000);
    }
    updateActiveFormation(dt: number): void { const dt_s = dt / 1000; const livingEnemies = this.activeFormationEnemies.filter(e => e.isAlive()); if (livingEnemies.length === 0) return; let highestY = this.height; livingEnemies.forEach(e => { highestY = Math.min(highestY, e.pos.y); }); if (highestY < 50) { livingEnemies.forEach(e => { e.pos.y += 120 * dt_s; }); return; } this.formationMoveTimer += dt; if (this.formationMoveTimer < this.formationMoveInterval) return; this.formationMoveTimer = 0; let minX = this.width, maxX = 0; livingEnemies.forEach(e => { minX = Math.min(minX, e.pos.x); maxX = Math.max(maxX, e.pos.x + e.width); }); const stepX = 15; let wallHit = (this.formationMovementDirection > 0 && maxX + stepX > this.width) || (this.formationMovementDirection < 0 && minX - stepX < 0); if (wallHit) { this.formationMovementDirection *= -1; let lowestY = 0; livingEnemies.forEach(e => { e.pos.y += this.formationVerticalStep; lowestY = Math.max(lowestY, e.pos.y); }); if (lowestY > this.height) { livingEnemies.forEach(e => e.destroy()); return; } } else { livingEnemies.forEach(e => { e.pos.x += stepX * this.formationMovementDirection; }); } }
    private addEnemyToFormation(enemy: Enemy | null, x: number, y: number) { if (enemy) { enemy.pos.x = x; enemy.pos.y = y; enemy.speed = 0; enemy.inFormation = true; this.activeFormationEnemies.push(enemy); this.addEntity(enemy); } }
    spawnFormation_Wave5_Stage1(): void { const rows = 4; const cols = 5; const hSpacing = Math.min(100, (this.width - 40) / cols); const vSpacing = 80; const startX = (this.width - (cols - 1) * hSpacing) / 2; const startY = -300; for (let r = 0; r < rows; r++) { for (let c = 0; c < cols; c++) { const type = r < 2 ? 'GRUNT' : 'WEAVER'; const enemy = this.createEnemyByType(type); if (enemy) { this.addEnemyToFormation(enemy, startX + c * hSpacing - (enemy.width / 2), startY + r * vSpacing); } } } }
    spawnFormation_Wave5_Stage2(): void { const size = 4; const hSpacing = 80; const vSpacing = 80; const startY = -250; for (let i = 0; i < size; i++) { const type = 'GRUNT'; const y = startY + i * vSpacing; if (i === 0) { const enemy = this.createEnemyByType(type); if (enemy) this.addEnemyToFormation(enemy, this.width / 2 - (enemy.width / 2), y); } else { const enemyL = this.createEnemyByType(type); if (enemyL) this.addEnemyToFormation(enemyL, this.width / 2 - (i * hSpacing), y); const enemyR = this.createEnemyByType(type); if (enemyR) this.addEnemyToFormation(enemyR, this.width / 2 + (i * hSpacing), y); } } }
    spawnFormation_Wave5_Stage3(): void { const rows = 5; const vSpacing = 90; const startY = -300; const xPosLeft = this.width * 0.25; const xPosRight = this.width * 0.75; for (let r = 0; r < rows; r++) { const type = r === 0 ? 'WEAVER' : 'GRUNT'; const enemyLeft = this.createEnemyByType(type); if (enemyLeft) this.addEnemyToFormation(enemyLeft, xPosLeft - (enemyLeft.width / 2), startY + r * vSpacing); const enemyRight = this.createEnemyByType(type); if (enemyRight) this.addEnemyToFormation(enemyRight, xPosRight - (enemyRight.width / 2), startY + r * vSpacing); } }
    spawnFormation_Wave15_Stage1(): void { const enemyTypes = ['SHOOTER', 'WEAVER', 'TANK', 'WEAVER', 'SHOOTER']; const numEnemies = enemyTypes.length; const hSpacing = Math.min(120, (this.width - 40) / numEnemies); const startX = (this.width - (numEnemies - 1) * hSpacing) / 2; const startY = -200; for (let i = 0; i < numEnemies; i++) { const enemy = this.createEnemyByType(enemyTypes[i]!); if (enemy) { this.addEnemyToFormation(enemy, startX + i * hSpacing - (enemy.width / 2), startY); } } }
    spawnFormation_Wave15_Stage2(): void { const rows = 5; const vSpacing = 110; const startY = -300; const xPosLeft = this.width * 0.2; const xPosRight = this.width * 0.8; for (let r = 0; r < rows; r++) { const type = r === 0 ? 'TANK' : 'SHOOTER'; const enemyLeft = this.createEnemyByType(type); if (enemyLeft) this.addEnemyToFormation(enemyLeft, xPosLeft - (enemyLeft.width / 2), startY + r * vSpacing); const enemyRight = this.createEnemyByType(type); if (enemyRight) this.addEnemyToFormation(enemyRight, xPosRight - (enemyRight.width / 2), startY + r * vSpacing); } }
    spawnFormation_Wave15_Stage3(): void { const size = 4; const hSpacing = 100; const vSpacing = 90; const startY = -250; for (let i = 0; i < size; i++) { const type = i < 2 ? 'TANK' : 'SHOOTER'; const y = startY + i * vSpacing; if (i === 0) { const enemy = this.createEnemyByType(type); if (enemy) this.addEnemyToFormation(enemy, this.width / 2 - (enemy.width / 2), y); } else { const enemyL = this.createEnemyByType(type); if (enemyL) this.addEnemyToFormation(enemyL, this.width / 2 - (i * hSpacing / 2) - (enemyL.width / 2), y); const enemyR = this.createEnemyByType(type); if (enemyR) this.addEnemyToFormation(enemyR, this.width / 2 + (i * hSpacing / 2) - (enemyR.width / 2), y); } } }
    spawnFormation_Wave25_Stage1(): void { const rows = 4; const vSpacing = 100; const startY = -400; for (let r = 0; r < rows; r++) { const type = r < 2 ? 'WEAVER' : 'SHOOTER'; this.addEnemyToFormation(this.createEnemyByType(type), this.width * 0.15, startY + r * vSpacing); this.addEnemyToFormation(this.createEnemyByType(type), this.width * 0.30, startY + r * vSpacing); this.addEnemyToFormation(this.createEnemyByType(type), this.width * 0.70, startY + r * vSpacing); this.addEnemyToFormation(this.createEnemyByType(type), this.width * 0.85, startY + r * vSpacing); } }
    spawnFormation_Wave25_Stage2(): void { const length = 5; const hSpacing = 100; const vSpacing = 100; const centerX = this.width / 2; const centerY = -250; for (let i = 0; i < length; i++) { const type = i === 2 ? 'TANK' : 'SHOOTER'; const enemyH = this.createEnemyByType(type); if (enemyH) this.addEnemyToFormation(enemyH, centerX + (i - 2) * hSpacing - (enemyH.width / 2), centerY); if (i !== 2) { const enemyV = this.createEnemyByType('WEAVER'); if (enemyV) this.addEnemyToFormation(enemyV, centerX - (enemyV.width / 2), centerY + (i - 2) * vSpacing); } } }
    spawnFormation_Wave25_Stage3(): void { const frontTypes = ['TANK', 'WEAVER', 'TANK', 'WEAVER', 'TANK']; const numFront = frontTypes.length; const hSpacing = Math.min(130, (this.width - 40) / numFront); const startX = (this.width - (numFront - 1) * hSpacing) / 2; for (let i = 0; i < numFront; i++) { const enemy = this.createEnemyByType(frontTypes[i]!); if (enemy) this.addEnemyToFormation(enemy, startX + i * hSpacing - (enemy.width / 2), -200); } setTimeout(() => { if (!this.isFormationActive) return; const enemyL = this.createEnemyByType('TELEPORTER'); if (enemyL) this.addEnemyToFormation(enemyL, this.width * 0.2, -100); const enemyR = this.createEnemyByType('TELEPORTER'); if (enemyR) this.addEnemyToFormation(enemyR, this.width * 0.8, -100); }, 2500); }
    spawnFormation_Wave35_Stage1(): void { const rows = 3; const vSpacing = 120; const startY = -300; for (let r = 0; r < rows; r++) { const isTankRow = r === 0; const numEnemies = isTankRow ? 4 : 5; const hSpacing = this.width / (numEnemies + 1); for (let c = 0; c < numEnemies; c++) { const enemy = this.createEnemyByType(isTankRow ? 'TANK' : 'SHOOTER'); if (enemy) this.addEnemyToFormation(enemy, (c + 1) * hSpacing, startY + r * vSpacing); } } }
    spawnFormation_Wave35_Stage2(): void { const rows = 4; const cols = 7; const hSpacing = Math.min(100, (this.width - 40) / cols); const vSpacing = 100; const startX = (this.width - (cols - 1) * hSpacing) / 2; const startY = -400; for (let r = 0; r < rows; r++) { for (let c = 0; c < cols; c++) { if (c === 3) continue; const type = (c === 0 || c === cols - 1) ? 'WEAVER' : 'SHOOTER'; const enemy = this.createEnemyByType(type); if (enemy) this.addEnemyToFormation(enemy, startX + c * hSpacing - (enemy.width / 2), startY + r * vSpacing); } } }
    spawnFormation_Wave35_Stage3(): void { const enemyTypes = ['TELEPORTER', 'TANK', 'SHOOTER', 'TANK', 'TELEPORTER']; const numEnemies = enemyTypes.length; const hSpacing = Math.min(150, (this.width - 40) / numEnemies); const startX = (this.width - (numEnemies - 1) * hSpacing) / 2; for (let i = 0; i < numEnemies; i++) { const enemy = this.createEnemyByType(enemyTypes[i]!); const yPos = -200 - (2 - Math.abs(2 - i)) * 40; if (enemy) this.addEnemyToFormation(enemy, startX + i * hSpacing - (enemy.width / 2), yPos); } }
    spawnFormation_Wave45_Stage1(): void { const rows = 4; const cols = 8; const hSpacing = Math.min(100, (this.width - 40) / cols); const vSpacing = 90; const startX = (this.width - (cols - 1) * hSpacing) / 2; const startY = -450; for (let r = 0; r < rows; r++) { for (let c = 0; c < cols; c++) { if (r > 1 && c % 2 !== 0) continue; const type = r === 0 ? 'TANK' : (c % 2 === 0 ? 'SHOOTER' : 'TELEPORTER'); const enemy = this.createEnemyByType(type); if (enemy) this.addEnemyToFormation(enemy, startX + c * hSpacing - (enemy.width / 2), startY + r * vSpacing); } } }
    spawnFormation_Wave45_Stage2(): void { const rows = 6; const cols = 10; const hSpacing = Math.min(80, (this.width - 40) / cols); const vSpacing = 70; const startX = (this.width - (cols - 1) * hSpacing) / 2; const startY = -500; for (let r = 0; r < rows; r++) { for (let c = 0; c < cols; c++) { if ((r + c) % 2 !== 0) continue; const type = r < 3 ? 'GRUNT' : 'WEAVER'; const enemy = this.createEnemyByType(type); if (enemy) this.addEnemyToFormation(enemy, startX + c * hSpacing - (enemy.width / 2), startY + r * vSpacing); } } }
    spawnFormation_Wave45_Stage3(): void { const enemyTypes = ['TELEPORTER', 'TANK', 'SHOOTER', 'TANK', 'SHOOTER', 'TANK', 'TELEPORTER']; const numEnemies = enemyTypes.length; const hSpacing = Math.min(110, (this.width - 40) / numEnemies); const startX = (this.width - (numEnemies - 1) * hSpacing) / 2; const startY = -200; for (let i = 0; i < numEnemies; i++) { const enemy = this.createEnemyByType(enemyTypes[i]!); if (enemy) { enemy.health *= 1.5; enemy.maxHealth *= 1.5; this.addEnemyToFormation(enemy, startX + i * hSpacing - (enemy.width / 2), startY); } } }
    createParallaxStarfield(): void { this.stars = []; for (let i = 0; i < 300; i++) { const l = i < 100 ? 1 : (i < 200 ? 2 : 3); this.stars.push({ pos: new Vector2D(Math.random() * this.width, Math.random() * this.height), s: (4 - l) * 0.8, v: (4 - l) * 24, a: 1 - (l / 4) }); } }
    updateParallaxStarfield(dt: number): void { this.stars.forEach(s => { s.pos.y += s.v * (dt / 1000); if (s.pos.y > this.height) { s.pos.y = -(Math.random() * 50); s.pos.x = Math.random() * this.width; } }); }
    drawParallaxStarfield(): void { this.stars.forEach(s => { this.ctx.fillStyle = `rgba(255,255,255,${s.a})`; this.ctx.beginPath(); this.ctx.arc(s.pos.x, s.pos.y, s.s, 0, Math.PI * 2); this.ctx.fill(); }); }
    createEnemyByType(type: string): Enemy | null { switch (type) { case 'GRUNT': return new Grunt(this); case 'TANK': return new Tank(this); case 'WEAVER': return new Weaver(this); case 'SHOOTER': return new Shooter(this); case 'TELEPORTER': return new Teleporter(this); case 'BOSS_SENTINEL_PRIME': return new BossSentinelPrime(this, 8 * (1 + this.level / 5), 1 + this.level / 10); case 'BOSS_VOID_SERPENT': return new BossVoidSerpent(this, 9 * (1 + this.level / 5), 1.1 + this.level / 10); case 'BOSS_OMEGA_NEXUS': return new BossOmegaNexus(this, 10 * (1 + this.level / 5), 1.2 + this.level / 10); case 'BOSS_NEXUS_PRIME': return new BossNexusPrime(this, 12 * (1 + this.level / 5), 1.3 + this.level / 10); default: return null; } }
    spawnEnemy(isBossAdd: boolean = false, fixedType?: string): void {
        let type: string;
        if (fixedType) {
            type = fixedType;
        } else if (isBossAdd) {
            const addTypes = ['GRUNT', 'WEAVER'];
            type = addTypes[Math.floor(Math.random() * addTypes.length)]!;
        } else {
            type = this.enemySpawnTypes[Math.floor(Math.random() * this.enemySpawnTypes.length)]!;
        }

        const enemy = this.createEnemyByType(type);
        if (enemy) {
            if (isBossAdd) {
                enemy.isBossAdd = true;
                enemy.health *= 0.5;
                enemy.maxHealth *= 0.5;
            } else if (!this.isFormationActive && Math.random() < 0.10) {
                enemy.isElite = true;
                enemy.maxHealth *= 3.5;
                enemy.health = enemy.maxHealth;
                enemy.width *= 1.25;
                enemy.height *= 1.25;
                enemy.collisionDamage *= 1.5;
            }
            this.addEntity(enemy);
        }
    }
    drawProfessionalIntro(): void { const t = this.introAnimationTimer; const w = this.width; const h = this.height; const ctx = this.ctx; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.globalAlpha = 1; const scaleFactor = Math.min(1.0, w / this.baseWidth); const titleSize = Math.max(28, 60 * scaleFactor); const subtitleSize = Math.max(32, 80 * scaleFactor); const promptSize = Math.max(14, 20 * scaleFactor); const alpha1 = Math.min(1, t / 2000); ctx.globalAlpha = alpha1; ctx.font = `${titleSize}px 'Press Start 2P'`; ctx.fillStyle = '#00FFFF'; const pulse = Math.sin(t / 400) * 5 + 15; ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = pulse; ctx.fillText("GALAXY FALL", w / 2, h / 2 - (subtitleSize / 2)); ctx.shadowBlur = 0; if (t > 1500) { const t2 = t - 1500; const alpha2 = Math.min(1, t2 / 2000); const scale = 1 + Math.max(0, 1 - t2 / 500) * 0.2; ctx.save(); ctx.globalAlpha = alpha2; ctx.font = `${subtitleSize}px 'Press Start 2P'`; ctx.fillStyle = '#FFD700'; ctx.shadowColor = '#FFA500'; ctx.shadowBlur = 20; ctx.translate(w / 2, h / 2 + (titleSize / 1.5)); ctx.scale(scale, scale); ctx.fillText("PI EDITION", 0, 0); ctx.restore(); } if (this.gameState === 'INTRO' && t > 3500) { const t3 = t - 3500; const alpha3 = Math.sin(t3 / 500) * 0.4 + 0.6; ctx.globalAlpha = alpha3; ctx.fillStyle = `rgba(255, 255, 255, ${alpha3})`; ctx.font = `${promptSize}px 'Press Start 2P'`; const promptKey = this.isMobile ? 'intro_prompt_mobile' : 'intro_prompt'; ctx.fillText(this.uiManager.localizationManager.translate(promptKey), w / 2, h / 2 + 180); } ctx.globalAlpha = 1; }
    isColliding(a: Entity, b: Entity): boolean { return a.pos.x < b.pos.x + b.width && a.pos.x + a.width > b.pos.x && a.pos.y < b.pos.y + b.height && a.pos.y + a.height > b.pos.y; }
    addEntity(entity: Entity): void { this.entities.push(entity); }
    cleanupEntities(): void { this.entities = this.entities.filter(e => e.isAlive()); }
    handleCollisions(): void {
        const projectiles = this.entities.filter(e => e.family === 'projectile'); const enemies = this.entities.filter(e => e.family === 'enemy') as Enemy[]; const player = this.player; if (!player || !player.isAlive()) return; if (player.laser && player.laser.isAlive()) { for (const enemy of enemies) { if (!player.laser) break; if (this.isColliding(player.laser, enemy)) { let damage = player.laser.damage; if (this.isBossSlayerActive && enemy.isBoss) damage *= 1.5; enemy.takeHit(damage); if (this.uiManager.settings.particles > 0 && player.laser) this.addEntity(new Particle(this, player.laser.pos.x + player.laser.width / 2, enemy.pos.y, '#FF8C00')); } } } projectiles.forEach(p => { if (p instanceof Projectile && p.type !== 'ENEMY_PROJECTILE') { for (const e of enemies) { if (p.isAlive() && e.isAlive() && this.isColliding(p, e)) { if (p instanceof PiercingProjectile) { if (!p.hasHit(e)) { p.onHit(e); let damage = p.damage; if (this.isBossSlayerActive && e.isBoss) damage *= 1.5; e.takeHit(damage); } continue; } p.onHit(e); let damage = p.damage; if (this.isBossSlayerActive && e.isBoss) damage *= 1.5; if (!(p instanceof BlackHoleProjectile)) e.takeHit(damage); break; } } } }); const pickups = this.entities.filter(e => e.family === 'pickup'); pickups.forEach(p => { if (p.isAlive() && this.isColliding(player, p)) { (p as PowerUp | Coin).onCollect(); } }); if (!player.isGhosted()) {
            enemies.forEach(e => {
                if (e.isAlive() && this.isColliding(player, e)) {
                    e.takeHit(e.isBoss ? 10 : 999); player.takeHit(e.collisionDamage);
                }
            }); this.entities.filter(e => e.type === 'ENEMY_PROJECTILE').forEach(p => { const proj = p as EnemyProjectile; if (proj.isAlive() && this.isColliding(player, proj)) { proj.destroy(); player.takeHit(proj.playerDamage); } });
        }
    }
}

window.addEventListener('load', async function () {
    // 1. Assets
    try { await initializeImages(); } catch (e) { console.warn("Assets:", e); }

    // 2. Elemente
    const hubContainer = document.getElementById('hub-container')!;
    const gameWrapper = document.getElementById('game-wrapper')!;
    const cockpitWrapper = document.getElementById('cockpit-wrapper');

    // Globale Manager
    (window as any).piManagerInstance = new PiManager();
    const piManagerInstance = (window as any).piManagerInstance;
    const globalLocalizationManager = new LocalizationManager();
    (window as any).globalLocalizationManager = globalLocalizationManager;
    const achievementManager = new AchievementManager();
    const statsManager = new StatsManager();

    statsManager.loadStats();

    // --- DAILY DEAL (GLOBAL) ---
    let globalDailyDeal: any = null;
    let dailyDealTimerInterval: any = null;

    const fetchDailyDeal = async () => {
        try {
            // Fetch the daily deal from the server
            const resp = await fetch(`${API_BASE_URL}/daily-deal`);
            if (resp.ok) {
                globalDailyDeal = await resp.json();

                // Calculate local end time based on servers msRemaining to avoid clock sync issues
                globalDailyDeal.localEndTime = Date.now() + globalDailyDeal.msRemaining;

                console.log("ðŸ›’ Global Daily Deal geladen:", globalDailyDeal.skinId);

                // Update Hub components
                updateHubDailyDealUI();

                // If a game is currently running, sync its UI manager too
                if (gameInstance && gameInstance.uiManager) {
                    gameInstance.uiManager.dailyDeal = globalDailyDeal;
                    gameInstance.uiManager.updateDailyDealUI();
                }

                // Expose to window for UIManager constructor fallback
                (window as any).globalDailyDeal = globalDailyDeal;
            }
        } catch (e) {
            console.error("âŒ Daily Deal Fetch Error:", e);
        }
    };

    const updateHubDailyDealUI = () => {
        if (!globalDailyDeal) return;
        const dealWrapper = document.querySelector('.daily-deal-wrapper');
        if (!dealWrapper) return;

        const skinId = globalDailyDeal.skinId;
        const skinMap: any = {
            'skin_goliath': { name: 'shop_skin_goliath_name', desc: 'shop_skin_goliath_desc', img: playerImgSrcGoliath },
            'skin_sentinel': { name: 'shop_skin_sentinel_name', desc: 'shop_skin_sentinel_desc', img: playerImgSrc2 },
            'skin_renegade': { name: 'shop_skin_renegade_name', desc: 'shop_skin_renegade_desc', img: playerImgSrc3 },
            'skin_avenger': { name: 'shop_skin_avenger_name', desc: 'shop_skin_avenger_desc', img: playerImgSrc4 },
            'skin_spectre': { name: 'shop_skin_spectre_name', desc: 'shop_skin_spectre_desc', img: playerImgSrcSpectre },
            'skin_gold': { name: 'shop_skin_gold_name', desc: 'shop_skin_gold_desc', img: playerImgSrcGold },
            'skin_void': { name: 'shop_skin_void_name', desc: 'shop_skin_void_desc', img: playerImgSrcVoid }
        };

        const data = skinMap[skinId];
        if (!data) return;

        const t = (k: string) => globalLocalizationManager.translate(k);

        const imgEl = dealWrapper.querySelector('.deal-img') as HTMLImageElement;
        const nameEl = dealWrapper.querySelector('.deal-name');
        const descEl = dealWrapper.querySelector('.deal-desc');
        const timerEl = document.getElementById('daily-deal-timer');

        if (imgEl) imgEl.src = data.img;
        if (nameEl) {
            nameEl.setAttribute('data-translate-key', data.name);
            nameEl.textContent = t(data.name);
        }
        if (descEl) {
            descEl.innerHTML = `
                <span class="status-offline" style="font-size:0.6rem; opacity:0.8;">${t(data.desc)}</span><br><br>
                <div style="background:rgba(255,180,0,0.1); border:1px solid #ffcc00; padding:5px; border-radius:4px; margin-top:5px;">
                    <span style="color:#ffcc00; font-weight:bold; font-size:0.75rem;">FLASH OFFER: ${globalDailyDeal.discountedPrice.toLocaleString()} <img src="${piCoin2ImgSrc}" style="width:14px; vertical-align:middle;"></span>
                    <span style="text-decoration:line-through; font-size:0.6rem; opacity:0.6; margin-left:10px;">${globalDailyDeal.originalPrice.toLocaleString()}</span>
                </div>
            `;
        }

        if (timerEl) {
            if (dailyDealTimerInterval) clearInterval(dailyDealTimerInterval);
            const refreshTimer = () => {
                const now = Date.now();
                const diff = (globalDailyDeal.localEndTime || 0) - now;
                if (diff <= 0) {
                    timerEl.textContent = "00:00:00";
                    fetchDailyDeal(); // Auto-refresh next deal
                    return;
                }
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                timerEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            };
            refreshTimer();
            dailyDealTimerInterval = setInterval(refreshTimer, 1000);
        }

        // Update Button behavior in the Hub too
        const buyBtn = dealWrapper.querySelector('.retro-btn') as HTMLButtonElement;
        if (buyBtn) {
            buyBtn.innerHTML = `<span data-translate-key="btn_buy_now">BUY NOW</span> (-50%)`;
            buyBtn.onclick = () => {
                // Flash attention to shop button
                const shopBtn = document.getElementById('nav-shop');
                if (shopBtn) {
                    shopBtn.click();
                    // Give it a small delay for shop to open, then switch to skin tab
                    setTimeout(() => {
                        if (window.game && window.game.uiManager) {
                            window.game.uiManager.showShopTab('skin');
                            const item = window.game.shopManager.shopItems.find(i => i.id === skinId);
                            if (item) window.game.uiManager.showSkinDetails(item);
                        }
                    }, 300);
                }
            };
        }
    };

    let gameInstance: Game | null = null;

    let gameLoopId: number | null = null;

    const getRealUI = (): IUIElements => {
        const d = document.createElement('div');
        const getEl = (id: string) => document.getElementById(id) || d;
        return {
            score: getEl('score'),
            coins: getEl('coins'),
            level: getEl('level'),
            highscore: getEl('highscore'), // Assuming this id might not exist physically in the same way, but handled safely
            specialInventory: getEl('special-inventory'),
            ultraInventory: getEl('ultra-inventory'),
            livesDisplay: getEl('lives-display'),
            weaponStatus: getEl('weapon-status'),
            energyBar: getEl('energy-bar'),
            weaponTierDisplay: getEl('weapon-tier-display'),
            levelDisplay: getEl('level-display')
        };
    };

    // =========================================================================
    // FIX: GLOBAL AUDIO UNLOCKER (FÃœR MOBILE SOUND)
    // =========================================================================
    // Versucht bei JEDER BerÃ¼hrung, den AudioContext aufzuwecken, falls er schlÃ¤ft
    const unlockMobileAudio = () => {
        if (gameInstance && gameInstance.uiManager && gameInstance.uiManager.soundManager) {
            const ctx = gameInstance.uiManager.soundManager.audioCtx;
            if (ctx && ctx.state === 'suspended') {
                ctx.resume().then(() => {
                    console.log("AudioContext resumed via Interaction");
                });
            }
        }
        // Auch fÃ¼r den globalen Context, falls vorhanden
        const WinAudio = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (WinAudio && (window as any).tempAudioCtx && (window as any).tempAudioCtx.state === 'suspended') {
            (window as any).tempAudioCtx.resume();
        }
    };
    document.addEventListener('touchstart', unlockMobileAudio, { passive: true });
    document.addEventListener('click', unlockMobileAudio);

    // === GLOBAL: Doppeltap-Zoom verhindern (iOS Safari) ===
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e: TouchEvent) => {
        const now = Date.now();
        const target = e.target as HTMLElement;
        // Nur auf Spielelementen blocken, nicht auf Inputs/Textfeldern
        const tag = target?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
            if (now - lastTouchEnd < 300) {
                e.preventDefault();
            }
        }
        lastTouchEnd = now;
    }, { passive: false });


    // =========================================================================
    // UPDATE COCKPIT DISPLAYS
    // =========================================================================
    (window as any).updateCockpitDisplays = function (game: Game | null, frameCount: number = 0) {
        // Performance-Check: Nur alle 30 Frames aktualisieren
        if (frameCount % 30 !== 0) return;

        // 1. Manager-Referenzen sicherstellen
        // Wir nehmen entweder die Daten aus dem laufenden Spiel oder die globalen Instanzen (im Hub)
        const piMgr = game ? game.piManager : piManagerInstance;
        const statsMgr = game ? game.statsManager : statsManager;

        // 2. IdentitÃ¤t & Footer (UID / Username)
        // WICHTIG: Wenn piMgr nicht authentifiziert ist, wird nach einer Gast-ID gesucht
        const isAuth = piMgr.isAuthenticated;
        const username = isAuth ? piMgr.username : (localStorage.getItem('galaxy_fall_guest_name') || "PILOT: GUEST");
        const uid = isAuth ? piMgr.uid : (localStorage.getItem('galaxy_fall_guest_id') || "UNREGISTERED");

        const elUsername = document.getElementById('ext-username');
        const elUid = document.getElementById('pilot-uid-footer');
        if (elUsername) elUsername.textContent = username.toUpperCase();
        if (elUid) elUid.textContent = uid;

        // 3. Rang & Highscore Logik
        const elRank = document.getElementById('ext-rank');
        // Wir laden den Highscore immer frisch aus dem localStorage oder dem Spiel
        let savedData = { highscore: 0 };
        try {
            const savedStr = localStorage.getItem('galaxyFallSave');
            if (savedStr && savedStr !== 'undefined' && savedStr !== 'null') savedData = JSON.parse(savedStr);
        } catch (e) { }
        const currentHighscore = game ? game.highscore : (savedData.highscore || 0);

        if (elRank) {
            if (game && game.gameState === 'PLAYING') {
                // WÃ¤hrend des Spiels: Aktueller Score in Cyan
                elRank.textContent = game.score.toLocaleString();
                elRank.className = 'value cyan';
            } else {
                // Im Hub: Rang-Titel basierend auf Highscore
                let r = "hub_rookie";
                if (currentHighscore > 25000) r = "hub_cadet";
                if (currentHighscore > 100000) r = "hub_ace";
                if (currentHighscore > 500000) r = "hub_commander";
                if (currentHighscore > 1000000) r = "hub_legend";
                elRank.textContent = globalLocalizationManager.translate(r);
                elRank.className = 'value yellow';
            }
        }

        // 4. KARRIERE-STATISTIK LOGIK (Der wichtigste Fix)
        // Wir addieren die permanenten Server-Stats + die Erfolge der aktuellen Session
        const sessionKills = statsMgr.sessionStats.kills;
        const sessionTime = statsMgr.sessionStats.playtime;
        const sessionMissions = statsMgr.sessionStats.missions;

        const totalKills = statsMgr.stats.total_kills + sessionKills;
        const totalTimeSeconds = statsMgr.stats.playtime_seconds + sessionTime;
        const totalMissions = statsMgr.stats.missions_completed + sessionMissions;

        // Coins: Immer den aktuellen Stand (Wallet) anzeigen
        const currentCoins = game ? game.coins : (parseInt(localStorage.getItem('galaxyFallCoins') || '0'));

        // 5. DOM-Elemente befÃ¼llen (Tabelle)
        const elTableKills = document.getElementById('table-kills');
        const elTableHs = document.getElementById('table-highscore');
        const elTableTime = document.getElementById('table-time');
        const elTableGames = document.getElementById('table-games');
        const elTableCoins = document.getElementById('table-coins');

        if (elTableKills) elTableKills.textContent = totalKills.toLocaleString();
        if (elTableHs) elTableHs.textContent = currentHighscore.toLocaleString();
        if (elTableGames) elTableGames.textContent = totalMissions.toLocaleString();
        if (elTableCoins) elTableCoins.textContent = currentCoins.toLocaleString();

        // Zeit-Formatierung: HH:MM
        if (elTableTime) {
            const h = Math.floor(totalTimeSeconds / 3600);
            const m = Math.floor((totalTimeSeconds % 3600) / 60);
            elTableTime.textContent = `${h}h ${m}m`;
        }

        // 6. Pilot Level & Progress (Based on Highscore)
        const xpBar = document.getElementById('bar-xp');
        const xpText = document.getElementById('val-xp');
        if (xpBar && xpText) {
            const nextThresholds = [5000, 15000, 50000, 150000, 500000, 1000000, 2500000, 5000000];
            let level = 1;
            let currentLevelScore = 0;
            let nextLevelScore = nextThresholds[0];

            for (let i = 0; i < nextThresholds.length; i++) {
                if (currentHighscore >= nextThresholds[i]) {
                    level = i + 2;
                    currentLevelScore = nextThresholds[i];
                    nextLevelScore = nextThresholds[i + 1] || nextThresholds[i] * 2;
                } else {
                    break;
                }
            }

            const range = nextLevelScore - currentLevelScore;
            const progress = Math.min(100, Math.floor(((currentHighscore - currentLevelScore) / (nextLevelScore - currentLevelScore)) * 100));
            xpBar.style.width = `${progress}%`;
            xpText.textContent = `${globalLocalizationManager.translate('hub_lvl')} ${level} - ${progress}%`;
        }

        // 7. Ship Preview in Holo-Avatar
        const shipPreview = document.getElementById('pilot-ship-preview') as HTMLImageElement;
        if (shipPreview) {
            const sm = game ? game.shopManager : hubShopManager;
            const equippedSkin = sm.playerCosmetics.equipped_skin;
            const equippedColl = sm.playerCollectibles.equipped_collectible;
            const activeId = equippedColl || equippedSkin || 'skin_default';

            const activeImg = playerImageMap[activeId] || playerImageMap['skin_default'];
            if (activeImg && activeImg.src) shipPreview.src = activeImg.src;
        }

        // Trophies / Hall of Fame
        const am = game ? game.achievementManager : achievementManager;
        const unlockedCount = am.unlockedAchievements.size;
        const totalCount = (am as any).achievements.length;
        const valStats = document.getElementById('val-stats');
        if (valStats) {
            valStats.innerHTML = `<span style="color:var(--pi-yellow)">ðŸ¥‡ ${unlockedCount}/${totalCount}</span> TROPHIES`;
        }

        const barShield = document.getElementById('bar-shield');
        const barWeapon = document.getElementById('bar-weapon');
        const valShield = document.getElementById('val-shield');
        const valWeapon = document.getElementById('val-weapon');

        if (game && game.player && game.player.isAlive()) {
            // Live-Werte aus der Engine wÃ¤hrend des Spiels
            const hpPct = Math.round((game.player.energy / game.player.maxEnergy) * 100);
            const wpTier = game.player.powerUpManager.weaponTier;
            const wpPct = (wpTier / 4) * 100;

            if (barShield) {
                barShield.style.width = `${hpPct}%`;
                barShield.style.backgroundColor = hpPct < 30 ? 'var(--neon-red)' : 'var(--neon-cyan)';
            }
            if (valShield) valShield.textContent = `${hpPct}%`;

            if (barWeapon) barWeapon.style.width = `${wpPct}%`;
            if (valWeapon) valWeapon.textContent = `TIER ${wpTier}`;

            // Log-System (Nachrichten oben links im Cockpit)
            if (game.levelMessage) {
                const logList = document.getElementById('pilot-log-list');
                if (logList) {
                    const lastMsg = logList.firstElementChild?.textContent;
                    const newMsg = `âž¤ ${game.levelMessage.toUpperCase()}`;
                    if (lastMsg !== newMsg) {
                        const li = document.createElement('li');
                        li.textContent = newMsg;
                        logList.insertBefore(li, logList.firstChild);
                        if (logList.children.length > 6) logList.lastElementChild?.remove();
                    }
                }
            }
        } else {
            // Standby-Modus (Hub): Permanente Upgrades anzeigen
            let upg: any = {};
            try {
                const s = localStorage.getItem('galaxyFallUpgrades');
                if (s && s !== 'undefined' && s !== 'null') upg = JSON.parse(s);
            } catch (e) { }

            // 1. Schild KapazitÃ¤t (Permanent)
            const hpLvl = upg['start_energy'] || 0;
            let hpTotal = 100 + (hpLvl * 10);

            // Add Collectible Bonus to Cockpit Display if equipped
            try {
                const c = localStorage.getItem('galaxyFallCollectibles');
                if (c && c !== 'undefined' && c !== 'null') {
                    const collData = JSON.parse(c);
                    if (collData.equipped_collectible === 'collectible_koopaking') {
                        hpTotal *= 2;
                    }
                }
            } catch (e) { }

            const hpMaxBase = 200 + (8 * 10); // Adjust visualization max for higher HP
            const hpVisualPct = Math.min(100, (hpTotal / hpMaxBase) * 100);

            if (barShield) {
                barShield.style.width = `${hpVisualPct}%`;
                barShield.style.backgroundColor = 'var(--neon-cyan)';
            }
            if (valShield) valShield.textContent = `${hpTotal} HP`;

            // 2. Waffen Kali (Permanent Start Tier)
            const wpPrestige = upg['ultimate_weapon_prestige'] || 0;
            const startTier = wpPrestige > 0 ? 2 : 1;
            const wpVisualPct = (startTier / 4) * 100;

            if (barWeapon) barWeapon.style.width = `${wpVisualPct}%`;
            if (valWeapon) valWeapon.textContent = `TIER ${startTier}`;
        }

        // Coins an allen Stellen im Hub/Cockpit aktualisieren
        document.querySelectorAll('.coin-value-display').forEach(el => {
            el.textContent = currentCoins.toLocaleString();
        });

        // Marktdaten-Simulation (Pi-Rate)
        const rateEl = document.getElementById('pi-rate');
        if (rateEl) {
            const rate = (1.2 + Math.sin(Date.now() / 8000)).toFixed(2);
            rateEl.textContent = `${rate}%`;
            rateEl.className = parseFloat(rate) > 0 ? "value green" : "value red";
        }
    }

    // --- SPIEL STARTEN / FORTSETZEN ---
    const ensureGameInstance = (canvas: HTMLCanvasElement): Game => {
        if (!window.game) {
            window.game = new Game(canvas, getRealUI(), achievementManager, statsManager, piManagerInstance);
            gameInstance = window.game;
        }
        // Always sync global managers to the current instance
        window.game.piManager = piManagerInstance;
        window.game.uiManager.localizationManager = globalLocalizationManager;
        return window.game;
    };

    const startGame = async () => {
        hubContainer.style.display = 'none';
        gameWrapper.style.display = 'block';
        gameWrapper.dataset.fromHub = 'false';
        document.body.classList.remove('hub-active');
        document.body.classList.add('game-active');

        unlockMobileAudio();

        const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        const game = ensureGameInstance(canvas);

        let isResuming = false;
        if (game.player && game.player.isAlive() && game.gameState !== 'GAME_OVER' && game.gameState !== 'WIN') {
            isResuming = true;
        }

        if (!isResuming) {
            // Setup fresh shop data from Hub
            game.shopManager.playerUpgrades = hubShopManager.loadUpgrades();
            game.shopManager.playerCosmetics = hubShopManager.loadCosmetics();
            game.shopManager.playerCollectibles = hubShopManager.loadCollectibles();
            game.hasPremiumLicense = !!(window as any).dummyGameContext?.hasPremiumLicense;
            game.loadGameData();
        }

        game.resizeGame();
        game.uiManager.soundManager.initAudio();

        // Start/Restart Loop
        if (gameLoopId) cancelAnimationFrame(gameLoopId);
        let lastTime = 0;
        const loop = (timestamp: number) => {
            if (!window.game) return;
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            window.game.update(Math.min(deltaTime, 50));
            window.game.draw();
            gameLoopId = requestAnimationFrame(loop);
        };
        gameLoopId = requestAnimationFrame(loop);

        if (isResuming) {
            game.isPaused = false;
            game.changeState('PLAYING');
            game.uiManager.togglePauseMenu(false);
        } else {
            game.isPaused = false;
            game.changeState('MODE_SELECT', true);
        }
    };
    // --- ZURÃœCK ZUM HUB (SPIEL PAUSIEREN STATT LÃ–SCHEN) ---
    const returnToHub = async () => {
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
            gameLoopId = null;
        }

        gameWrapper.style.display = 'none';
        hubContainer.style.display = 'flex';

        const menu = document.getElementById('menu-container'); if (menu) menu.style.display = 'none';
        const shop = document.getElementById('shop-container'); if (shop) shop.style.display = 'none';
        const gov = document.getElementById('game-over-container'); if (gov) gov.style.display = 'none';
        const lang = document.getElementById('language-select-screen'); if (lang) lang.style.display = 'none';

        if (gameInstance) {
            // Erst speichern was im Spiel passiert ist
            await gameInstance.savePlayerDataToServer();
            // syncGlobalGFC wird bei Bedarf Ã¼ber loadPlayerDataFromServer aufgerufen

            // Dann den Hub-Kontext vom Server updaten
            if (dummyGameContext) await (dummyGameContext as any).loadPlayerDataFromServer();

            if (gameInstance.gameState === 'GAME_OVER' || gameInstance.gameState === 'WIN') {
                gameInstance = null;
            } else {
                if (gameInstance.gameState === 'PLAYING') {
                    gameInstance.gameState = 'PAUSED';
                    gameInstance.isPaused = true;
                    gameInstance.uiManager.togglePauseMenu(true);
                }
            }
        }

        piManagerInstance.setGame(null);

        updateHubUI();
        updateHangarDisplay();

        document.body.classList.remove('game-active');
        document.body.classList.add('hub-active');
        (window as any).updateCockpitDisplays(null);
    };

    window.addEventListener('returnToHubRequested', returnToHub);

    // --- HANGAR & SHOP (HUB) ---
    const getHubPlayerIdentity = () => {
        if (piManagerInstance.isAuthenticated && piManagerInstance.uid) {
            return { uid: piManagerInstance.uid, username: piManagerInstance.username };
        }
        let gid = localStorage.getItem('galaxy_fall_guest_id');
        let gname = localStorage.getItem('galaxy_fall_guest_name');
        if (!gid) {
            gid = `guest_${Math.random().toString(36).substring(2, 8)}`;
            gname = `Gast-Pilot ${gid.substring(6, 9).toUpperCase()}`;
            localStorage.setItem('galaxy_fall_guest_id', gid);
            localStorage.setItem('galaxy_fall_guest_name', gname);
        }
        return { uid: gid, username: gname! };
    };

    const dummyGameContext: any = {
        get coins() { return parseInt(localStorage.getItem('galaxyFallCoins') || '0'); },
        set coins(v) { syncGlobalGFC(v, this); },
        hasPremiumLicense: localStorage.getItem('galaxyFallHasPremium') === '1',
        shopManager: null as any,
        piManager: piManagerInstance,
        achievementManager: achievementManager,
        getPlayerIdentity: getHubPlayerIdentity,
        saveGameData: function () {
            let hs = 0;
            try {
                const s = localStorage.getItem('galaxyFallSave');
                if (s && s !== 'undefined' && s !== 'null') hs = parseInt(JSON.parse(s).highscore) || 0;
            } catch (e) { }
            localStorage.setItem('galaxyFallSave', JSON.stringify({ coins: this.coins, highscore: hs }));
            this.savePlayerDataToServer();
        },
        savePlayerDataToServer: async function () {
            const { uid, username } = this.getPlayerIdentity();
            if (!uid || uid === 'UNREGISTERED') return;
            const data = {
                pi_uid: uid,
                username: username,
                language: globalLocalizationManager.language,
                coins_collected_added: 0
            };
            try {
                await fetch(`${API_BASE_URL}/save-data`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                console.log("âœ… Hub Cloud-Save erfolgreich.");
            } catch (e) { console.error("âŒ Hub Cloud-Save fehlgeschlagen:", e); }
        },
        loadPlayerDataFromServer: async function () {
            const { uid } = this.getPlayerIdentity();
            if (!uid || uid === 'UNREGISTERED') return;
            try {
                const res = await fetch(`${API_BASE_URL}/load-data?pi_uid=${uid}`);
                if (res.ok) {
                    const data = await res.json();
                    this.coins = data.coins || 0;
                    (this as any).highscore = data.highscore || 0;
                    this.hasPremiumLicense = !!data.has_premium_license;
                    localStorage.setItem('galaxyFallHasPremium', this.hasPremiumLicense ? '1' : '0');
                    this.shopManager.playerUpgrades = data.upgrades || {};
                    this.shopManager.playerCosmetics = data.cosmetics || {};
                    this.shopManager.playerCollectibles = data.collectibles || {};
                    this.shopManager.saveUpgrades();
                    this.shopManager.saveCosmetics();
                    this.shopManager.saveCollectibles();
                    const serverTrophies: TrophyMap = data.trophies || {};
                    (window as any).trophyData = ensureAllTrophiesExist(serverTrophies);
                    achievementManager.syncFromServer(serverTrophies);
                    console.log("âœ… Hub Cloud-Load erfolgreich.");
                    if (typeof updateHubUI === 'function') updateHubUI();
                    if (typeof updateHangarDisplay === 'function') updateHangarDisplay();
                }
            } catch (e) { console.error("âŒ Hub Cloud-Load fehlgeschlagen:", e); }
        }
    } as unknown as Game;

    const hubShopManager = new ShopManager(dummyGameContext);
    dummyGameContext.shopManager = hubShopManager;
    dummyGameContext.uiManager = new UIManager(dummyGameContext, getRealUI());
    (dummyGameContext.uiManager as any).localizationManager = globalLocalizationManager;
    (window as any).dummyGameContext = dummyGameContext;
    (window as any).hubShopManager = hubShopManager;

    // --- AUTO-BOOTSTRAP: Load full DB state on reload ---
    (async () => {
        try { await piManagerInstance.authenticate(true); } catch { }
        try { await dummyGameContext.loadPlayerDataFromServer(); } catch { }
    })();

    // =========================================================================
    // PUBLIC PROFILE VIEWER (Pilot Dossier)
    // =========================================================================
    function ensurePublicProfileOverlay() {
        let overlay = document.getElementById('public-profile-overlay') as HTMLElement | null;
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.id = 'public-profile-overlay';
        overlay.className = 'modal-overlay';
        overlay.style.display = 'none';
        overlay.innerHTML = `
            <div class="pixel-modal public-profile-modal">
                <button class="modal-close" id="public-profile-close">X</button>
                <div class="modal-body" style="display:block;">
                    <h2 class="pixel-title" id="public-profile-title" style="margin-top:0;"></h2>
                    <div id="public-profile-content" class="pixel-text" style="font-size:0.5rem;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('#public-profile-close')?.addEventListener('click', () => {
            overlay!.style.display = 'none';
        });

        // Click outside closes
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay!.style.display = 'none';
        });

        return overlay;
    }

    (window as any).openPublicProfile = async (pi_uid: string) => {
        const overlay = ensurePublicProfileOverlay();
        const titleEl = document.getElementById('public-profile-title')!;
        const contentEl = document.getElementById('public-profile-content')!;
        const t = (k: string, rep?: any) => globalLocalizationManager.translate(k, rep);
        const me = getCurrentUid();

        overlay.style.display = 'flex';
        titleEl.textContent = t('profile_public_title') || 'PILOT DOSSIER';
        contentEl.innerHTML = `<div style="text-align:center; opacity:0.8;">${t('msg_syncing')}...</div>`;

        try {
            const viewerParam = me && me !== 'UNREGISTERED' ? `&viewer_uid=${encodeURIComponent(me)}` : '';
            const res = await fetch(`${API_BASE_URL}/public-profile?pi_uid=${encodeURIComponent(pi_uid)}${viewerParam}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

            const name = data.display_name || data.username || 'PILOT';
            const bio = data.bio ? String(data.bio) : '';
            const stats = data.stats || {};
            const trophies = data.trophies || {};
            const trophyCount = Object.values(trophies).filter((v: any) => v && v.earned).length;
            const scores = Array.isArray(data.scores) ? data.scores : [];
            const bestCampaign = scores.find((s: any) => s.mode === 'campaign');
            const bestEndless = scores.find((s: any) => s.mode === 'endless');

            const hours = Math.floor((stats.playtime_seconds || 0) / 3600);
            const minutes = Math.floor(((stats.playtime_seconds || 0) % 3600) / 60);

            const rel = data.relationship || {};
            const canRequest = !!me && me !== 'UNREGISTERED' && me !== pi_uid && !rel.is_self;

            // Loadout snapshot
            const loadout = data.loadout || {};
            const cosmetics = loadout.cosmetics || {};
            const collectibles = loadout.collectibles || {};
            const equippedSkinId = cosmetics.equipped_skin || 'skin_default';
            const equippedProjectileId = cosmetics.equipped_projectile || 'default';
            const equippedTrailId = cosmetics.equipped_trail || 'default';
            const equippedCollectibleId = collectibles.equipped_collectible || null;

            // Avatar from equipped skin (best effort)
            let avatarSrc = playerImgSrc1;
            if (equippedSkinId) {
                const skinItem = (window as any).hubShopManager?.shopItems?.find?.((i: any) => i.id === equippedSkinId)
                    || (window as any).game?.shopManager?.shopItems?.find?.((i: any) => i.id === equippedSkinId);
                if (skinItem?.iconSrc) avatarSrc = skinItem.iconSrc;
            }

            const minted = equippedCollectibleId
                ? (collectibles.minted_collectibles || []).includes(equippedCollectibleId)
                : false;

            // Trophy grid (earned first, then locked)
            const trophyDefs = (TROPHY_DEFINITIONS || []) as any[];
            const earnedDefs = trophyDefs.filter(d => trophies?.[d.id]?.earned);
            const lockedDefs = trophyDefs.filter(d => !trophies?.[d.id]?.earned);
            const renderTrophyCard = (def: any, unlocked: boolean) => `
                <div class="pp-trophy-card ${unlocked ? 'unlocked' : 'locked'}" title="${t(def.nameKey)}">
                    <div class="pp-trophy-icon">${def.icon || '🏆'}</div>
                    <div class="pp-trophy-name">${t(def.nameKey)}</div>
                </div>
            `;

            titleEl.textContent = `${t('profile_public_title') || 'PILOT DOSSIER'}: ${name}`;

            contentEl.innerHTML = `
                <div class="pp-header tech-border">
                    <div class="pp-avatar ${minted ? 'minted' : ''}">
                        <img src="${avatarSrc}" alt="Avatar">
                        ${minted ? `<div class="pp-nft-badge">NFT</div>` : ``}
                    </div>
                    <div class="pp-ident">
                        <div class="pp-name">${name}</div>
                        <div class="pp-uid">UID: <span class="pp-uid-val">${data.pi_uid}</span></div>
                        ${bio ? `<div class="pp-bio">${bio}</div>` : `<div class="pp-bio pp-bio-empty">${t('profile_no_bio')}</div>`}
                    </div>
                </div>

                <div class="profile-stats-grid" style="padding:0; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));">
                    <div class="stat-card-epic"><div class="card-icon">💥</div><div class="card-content"><div class="card-label">${t('hub_kills')}</div><div class="card-value">${Number(stats.total_kills || 0).toLocaleString()}</div></div></div>
                    <div class="stat-card-epic"><div class="card-icon">💰</div><div class="card-content"><div class="card-label">${t('hub_wallet')}</div><div class="card-value">${Number(stats.total_coins_collected || 0).toLocaleString()}</div></div></div>
                    <div class="stat-card-epic"><div class="card-icon">⏱️</div><div class="card-content"><div class="card-label">${t('hub_playtime')}</div><div class="card-value">${hours}h ${minutes}m</div></div></div>
                    <div class="stat-card-epic"><div class="card-icon">🚀</div><div class="card-content"><div class="card-label">${t('hub_missions')}</div><div class="card-value">${Number(stats.missions_completed || 0).toLocaleString()}</div></div></div>
                    <div class="stat-card-epic"><div class="card-icon">🏆</div><div class="card-content"><div class="card-label">${t('hub_trophies')}</div><div class="card-value">${trophyCount}</div></div></div>
                    <div class="stat-card-epic"><div class="card-icon">⭐</div><div class="card-content"><div class="card-label">${t('profile_premium')}</div><div class="card-value">${data.has_premium_license ? t('hub_on') : t('hub_off')}</div></div></div>
                </div>

                <div class="tech-border pp-section">
                    <div style="font-family:'Press Start 2P'; font-size:0.55rem; color:#0ff; margin-bottom:10px;">${t('profile_best_scores')}</div>
                    <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
                        <div style="flex:1; min-width:180px; opacity:0.9;">${t('btn_campaign')}: <span style="color:#fff;">${bestCampaign ? Number(bestCampaign.score || 0).toLocaleString() : '—'}</span></div>
                        <div style="flex:1; min-width:180px; opacity:0.9;">${t('btn_endless')}: <span style="color:#fff;">${bestEndless ? Number(bestEndless.score || 0).toLocaleString() : '—'}</span></div>
                    </div>
                </div>

                <div class="tech-border pp-section">
                    <div style="font-family:'Press Start 2P'; font-size:0.55rem; color:#0ff; margin-bottom:10px;">${t('profile_loadout')}</div>
                    <div class="pp-loadout-grid">
                        <div class="pp-loadout-item"><div class="pp-loadout-label">${t('profile_loadout_skin')}</div><div class="pp-loadout-val">${equippedSkinId}</div></div>
                        <div class="pp-loadout-item"><div class="pp-loadout-label">${t('profile_loadout_projectile')}</div><div class="pp-loadout-val">${equippedProjectileId}</div></div>
                        <div class="pp-loadout-item"><div class="pp-loadout-label">${t('profile_loadout_trail')}</div><div class="pp-loadout-val">${equippedTrailId}</div></div>
                        <div class="pp-loadout-item"><div class="pp-loadout-label">${t('profile_loadout_collectible')}</div><div class="pp-loadout-val">${equippedCollectibleId || '—'} ${minted ? ' (NFT)' : ''}</div></div>
                    </div>
                </div>

                <div class="tech-border pp-section">
                    <div style="font-family:'Press Start 2P'; font-size:0.55rem; color:#0ff; margin-bottom:10px;">${t('profile_trophies')}</div>
                    <div class="pp-trophy-grid">
                        ${(earnedDefs.slice(0, 18).map((d: any) => renderTrophyCard(d, true)).join('')) || `<div style="opacity:0.5;">—</div>`}
                        ${lockedDefs.slice(0, Math.max(0, 18 - Math.min(18, earnedDefs.length))).map((d: any) => renderTrophyCard(d, false)).join('')}
                    </div>
                    <div style="margin-top:10px; opacity:0.5; font-size:0.42rem;">${trophyCount}/${trophyDefs.length}</div>
                </div>

                <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
                    ${canRequest ? `
                        ${rel.is_friend ? `<button class="retro-btn big" disabled style="flex:1; min-width:220px;">${t('profile_friend_status_friends')}</button>` : ''}
                        ${(!rel.is_friend && rel.outgoing_request_pending) ? `<button class="retro-btn big" disabled style="flex:1; min-width:220px;">${t('profile_friend_status_request_sent')}</button>` : ''}
                        ${(!rel.is_friend && rel.incoming_request_pending) ? `
                            <button class="retro-btn big" id="btn-accept-friend" style="flex:1; min-width:220px;">${t('profile_friend_accept')}</button>
                            <button class="retro-btn big" id="btn-decline-friend" style="flex:1; min-width:220px; border-color:#ff4444; color:#ff4444;">${t('profile_friend_decline')}</button>
                        ` : ''}
                        ${(!rel.is_friend && !rel.outgoing_request_pending && !rel.incoming_request_pending) ? `<button class="retro-btn big" id="btn-send-friend-request" style="flex:1; min-width:220px;">${t('profile_send_friend_request')}</button>` : ''}
                    ` : ''}
                    <button class="retro-btn big" id="btn-close-public-profile" style="flex:1; min-width:220px;">${t('btn_back')}</button>
                </div>
            `;

            contentEl.querySelector('#btn-close-public-profile')?.addEventListener('click', () => {
                overlay.style.display = 'none';
            });

            const reqBtn = contentEl.querySelector('#btn-send-friend-request') as HTMLButtonElement | null;
            if (reqBtn) {
                reqBtn.addEventListener('click', async () => {
                    reqBtn.disabled = true;
                    reqBtn.textContent = `${t('msg_syncing')}...`;
                    try {
                        const from_uid = getCurrentUid();
                        const r = await fetch(`${API_BASE_URL}/friends/request`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ from_uid, to_uid: pi_uid })
                        });
                        const out = await r.json().catch(() => ({}));
                        if (!r.ok) throw new Error(out?.error || `HTTP ${r.status}`);
                        reqBtn.textContent = t('profile_friend_status_request_sent');
                    } catch (e: any) {
                        reqBtn.disabled = false;
                        reqBtn.textContent = t('profile_send_friend_request');
                        alert(`${t('msg_network_err')}\n${e?.message || ''}`);
                    }
                });
            }

            const acceptBtn = contentEl.querySelector('#btn-accept-friend') as HTMLButtonElement | null;
            const declineBtn = contentEl.querySelector('#btn-decline-friend') as HTMLButtonElement | null;
            if (acceptBtn) {
                acceptBtn.addEventListener('click', async () => {
                    acceptBtn.disabled = true;
                    acceptBtn.textContent = `${t('msg_syncing')}...`;
                    try {
                        const r = await fetch(`${API_BASE_URL}/friends/respond`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ from_uid: pi_uid, to_uid: me, action: 'accept' })
                        });
                        const out = await r.json().catch(() => ({}));
                        if (!r.ok) throw new Error(out?.error || `HTTP ${r.status}`);
                        // Reload dossier to show updated status
                        (window as any).openPublicProfile(pi_uid);
                    } catch (e: any) {
                        acceptBtn.disabled = false;
                        acceptBtn.textContent = t('profile_friend_accept');
                        alert(`${t('msg_network_err')}\n${e?.message || ''}`);
                    }
                });
            }
            if (declineBtn) {
                declineBtn.addEventListener('click', async () => {
                    declineBtn.disabled = true;
                    declineBtn.textContent = `${t('msg_syncing')}...`;
                    try {
                        const r = await fetch(`${API_BASE_URL}/friends/respond`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ from_uid: pi_uid, to_uid: me, action: 'decline' })
                        });
                        const out = await r.json().catch(() => ({}));
                        if (!r.ok) throw new Error(out?.error || `HTTP ${r.status}`);
                        (window as any).openPublicProfile(pi_uid);
                    } catch (e: any) {
                        declineBtn.disabled = false;
                        declineBtn.textContent = t('profile_friend_decline');
                        alert(`${t('msg_network_err')}\n${e?.message || ''}`);
                    }
                });
            }
        } catch (e: any) {
            contentEl.innerHTML = `<div style="color:#ff4444; white-space:pre-wrap; overflow-wrap:anywhere;">${t('leaderboard_error')}\n${e?.message || e}</div>`;
        }
    };

    // â”€â”€ Standalone Hub Bomb Timer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Runs independently of UIManager since dummyGameContext has no uiManager.
    function tickHubBombTimer() {
        const now = Date.now();
        const nextFree = hubShopManager.wheelData.nextFreeSpinAt || 0;
        const canFree = now >= nextFree;
        const diff = Math.max(0, nextFree - now);

        const hubBombEl = document.getElementById('hub-bomb-timer');
        const hubReadyEl = document.getElementById('hub-wheel-timer');
        if (!hubBombEl || !hubReadyEl) return;

        if (canFree) {
            hubBombEl.style.display = 'none';
            hubReadyEl.style.display = 'inline';
            hubReadyEl.textContent = globalLocalizationManager.translate('wheel_ready') || 'READY!';
            hubReadyEl.style.color = '#00ff88';
        } else {
            hubBombEl.style.display = 'flex';
            hubReadyEl.style.display = 'none';

            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            const urgent = diff < 60000;

            const setD = (id: string, val: number) => {
                const el = document.getElementById(id);
                if (!el) return;
                el.textContent = String(val);
                el.className = 'bomb-digit hub-digit' + (urgent ? ' urgent' : '');
            };
            setD('hub-bt-h1', Math.floor(h / 10));
            setD('hub-bt-h2', h % 10);
            setD('hub-bt-m1', Math.floor(m / 10));
            setD('hub-bt-m2', m % 10);
            setD('hub-bt-s1', Math.floor(s / 10));
            setD('hub-bt-s2', s % 10);
        }
    }
    tickHubBombTimer(); // run immediately
    setInterval(tickHubBombTimer, 1000); // live every second
    // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

    (window as any).refreshAllSelections = () => {
        if (typeof updateHubUI === 'function') updateHubUI();
        if (typeof updateHangarDisplay === 'function') updateHangarDisplay();
        if (window.game && window.game.uiManager) {
            window.game.uiManager.renderShop();
            window.game.uiManager.populateGalerie();
            window.game.uiManager.populateProfile();
            window.game.uiManager.populateArsenal();
        }
    };

    let currentHangarIndex = 0;
    const getAllHangarItems = () => {
        const skins = hubShopManager.shopItems.filter(i => i.type === 'SKIN');
        if (!skins.find(s => s.id === 'skin_default')) {
            skins.unshift({ id: 'skin_default', nameKey: 'shop_skin_default_name', iconSrc: playerImgSrc1, type: 'SKIN', descKey: '', cost: [0], cosmeticType: 'player_skin' } as any);
        }
        const collectibles = hubShopManager.shopItems.filter(i => i.type === 'COLLECTIBLE');
        return [...skins, ...collectibles];
    };
    let allHangarItems = getAllHangarItems();

    const updateHangarDisplay = () => {
        allHangarItems = getAllHangarItems(); // Refresh list (unlocked status can change)
        const item = allHangarItems[currentHangarIndex];
        const imgEl = document.getElementById('hangar-img') as HTMLImageElement;
        const nameEl = document.getElementById('ship-name');
        const btnEl = document.getElementById('hangar-equip-btn') as HTMLButtonElement;

        if (imgEl && item) imgEl.src = item.iconSrc;
        if (nameEl && item) nameEl.textContent = globalLocalizationManager.translate(item.nameKey);

        const bonusEl = document.getElementById('ship-bonus');
        if (bonusEl) {
            bonusEl.textContent = item.descKey ? globalLocalizationManager.translate(item.descKey) : '';
        }

        const currentCosmetics = (hubShopManager.playerCosmetics || {}) as IPlayerCosmetics;
        const currentCollectibles = (hubShopManager.playerCollectibles || {}) as IPlayerCollectibles;

        const isUnlocked = item.type === 'COLLECTIBLE'
            ? (currentCollectibles.unlocked_collectibles || []).includes(item.id)
            : (item.id === 'skin_default' || item.id === 'default' || (currentCosmetics.unlocked_skins || []).includes(item.id));

        const isEquipped = item.type === 'COLLECTIBLE'
            ? currentCollectibles.equipped_collectible === item.id
            : currentCosmetics.equipped_skin === item.id;

        if (btnEl) {
            const newBtn = btnEl.cloneNode(true) as HTMLButtonElement;
            if (btnEl.parentNode) btnEl.parentNode.replaceChild(newBtn, btnEl);

            if (isEquipped) {
                newBtn.setAttribute('data-translate-key', 'hub_equipped');
                newBtn.textContent = globalLocalizationManager.translate('hub_equipped');
                newBtn.disabled = true;
                newBtn.className = "hub-button wide primary";
            } else if (isUnlocked) {
                newBtn.setAttribute('data-translate-key', 'hub_equip');
                newBtn.textContent = globalLocalizationManager.translate('hub_equip');
                newBtn.disabled = false;
                newBtn.className = "hub-button wide secondary";
                newBtn.onclick = () => {
                    if (item.type === 'COLLECTIBLE') {
                        hubShopManager.equipCollectible(item.id);
                        hubShopManager.equipCosmetic('skin_default', 'player_skin');
                    } else {
                        hubShopManager.equipCosmetic(item.id, 'player_skin');
                        hubShopManager.equipCollectible(null);
                    }
                    updateHangarDisplay(); // Refresh UI immediately to show 'Equipped' state
                };
            } else {
                newBtn.setAttribute('data-translate-key', 'hub_locked');
                newBtn.textContent = globalLocalizationManager.translate('hub_locked');
                newBtn.disabled = false;
                newBtn.className = "hub-button wide";
                newBtn.onclick = () => document.getElementById('nav-shop')?.click();
            }
        }
    };

    // --- UPDATE HUB UI (MIT RESUME LOGIK) ---
    updateHubUI = async () => {
        let localCoins = parseInt(localStorage.getItem('galaxyFallCoins') || '0');

        const hasActiveGame = gameInstance && gameInstance.player && gameInstance.player.isAlive() &&
            gameInstance.gameState !== 'GAME_OVER' && gameInstance.gameState !== 'WIN';

        if (hasActiveGame && gameInstance) {
            localCoins = gameInstance.coins;
        }

        const hubCoinEl = document.getElementById('hub-coins-display');
        if (hubCoinEl) hubCoinEl.textContent = localCoins.toLocaleString();

        const profileName = document.getElementById('pi-username-placeholder');
        if (profileName) profileName.textContent = piManagerInstance.username || globalLocalizationManager.translate('hub_commander');

        const startBtnText = document.querySelector('#start-pi-edition .launch-title');
        if (startBtnText) {
            if (hasActiveGame) {
                startBtnText.textContent = globalLocalizationManager.translate('hub_resume');
            } else {
                const key = startBtnText.getAttribute('data-translate-key');
                startBtnText.textContent = key ? globalLocalizationManager.translate(key) : globalLocalizationManager.translate('hub_start_mission');
            }
        }

        (window as any).updateCockpitDisplays(hasActiveGame ? gameInstance : null);

        // Trophy-Counter im Pilot-System anzeigen
        const trophyData: TrophyMap = (window as any).trophyData || {};
        const earned = Object.values(trophyData).filter(t => t.earned).length;
        const claimable = Object.values(trophyData).filter(t => t.earned && !t.claimed).length;
        const total = TROPHY_DEFINITIONS.length;

        const valStats = document.getElementById('val-stats');
        if (valStats) valStats.textContent = `${earned}/${total}`;

        const trophyBadge = document.getElementById('trophy-badge');
        if (trophyBadge) {
            trophyBadge.style.display = claimable > 0 ? 'block' : 'none';
        }

        if (gameInstance) {
            gameInstance.uiManager.updateWheelUI();
        } else {
            // Falls das Spiel noch nicht bereit ist, setzen wir trotzdem den Click-Handler
            const teaserBtn = document.getElementById('hub-wheel-teaser-btn');
            if (teaserBtn) teaserBtn.onclick = () => {
                const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
                if (canvas) {
                    const game = (window as any).ensureGameInstance(canvas);
                    game.uiManager.showLuckyWheel();
                }
            };
        }

        // --- Sync Pilot Gallery / Network if currently visible ---
        const bestUI = window.game?.uiManager || (window as any).dummyGameContext?.uiManager;
        if (bestUI) {
            const pilotGalleryView = document.getElementById('view-pilot-gallery');
            if (pilotGalleryView && pilotGalleryView.classList.contains('active')) {
                bestUI.populateGalerie('pilot-gallery-root');
            }
            const pilotNetworkView = document.getElementById('view-pilot-network');
            if (pilotNetworkView && pilotNetworkView.classList.contains('active')) {
                bestUI.populateNetwork('pilot-network-root');
            }
        }
    };

    (window as any).requireLogin = (): boolean => {
        const outView = document.querySelector('.logged-out-view') as HTMLElement;
        if (outView && outView.style.display !== 'none') {
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                // Flash the button red to draw attention to it
                loginBtn.style.animation = 'pulse-red 0.5s 3';
                setTimeout(() => { loginBtn.style.animation = ''; }, 1500);
            }
            return false;
        }
        return true;
    };

    // --- EVENTS ---
    document.getElementById('start-pi-edition')?.addEventListener('click', (e) => {
        if (!(window as any).requireLogin()) return;
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            try {
                const tempCtx = new AudioContextClass();
                tempCtx.resume().then(() => tempCtx.close()).catch(e => console.warn(e));
                (window as any).tempAudioCtx = tempCtx;
            } catch (err) {
                console.warn("AudioContext init failed", err);
            }
        }

        const btn = e.currentTarget as HTMLElement;
        const panelPilot = document.getElementById('panel-pilot');
        const panelMarket = document.getElementById('panel-market');
        const centerCol = document.querySelector('.center-col');
        const appViewport = document.getElementById('app-viewport');
        const shipContainer = document.querySelector('.ship-img-container');

        // Prevent double clicks
        if (btn.classList.contains('initiating')) return;

        // 1. Initial State: Button blinks Red
        btn.classList.add('initiating');
        const titleSpan = btn.querySelector('.launch-title');
        if (titleSpan) titleSpan.textContent = globalLocalizationManager.translate('hub_initiating');

        // Play epic sound if available (fallback to normal click if not)
        if (gameInstance?.uiManager?.soundManager) {
            // Ideally a cool low rumble sound here, we'll just use a click for now
            gameInstance.uiManager.soundManager.play('uiClick');
        }

        // 2. Shake the center column after a brief moment
        setTimeout(() => {
            centerCol?.classList.add('launch-shake');
        }, 300);

        // 3. Move side panels out & trigger Hyper Jump BG
        setTimeout(() => {
            panelPilot?.classList.add('launch-hide-left');
            panelMarket?.classList.add('launch-hide-right');
            appViewport?.classList.add('hyper-jump');
        }, 800);

        // 4. BLAST OFF
        setTimeout(() => {
            shipContainer?.classList.add('launch-blast');
        }, 1200);

        // 5. Actually start the game and reset UI
        setTimeout(async () => {
            try {
                await startGame();
            } catch (err) {
                console.error("Error launching game:", err);
            } finally {
                // Reset UI for when they return to Hub
                btn.classList.remove('initiating');
                if (titleSpan) titleSpan.textContent = globalLocalizationManager.translate('hub_start_mission');
                centerCol?.classList.remove('launch-shake');
                panelPilot?.classList.remove('launch-hide-left');
                appViewport?.classList.remove('hyper-jump');
                shipContainer?.classList.remove('launch-blast');
            }
        }, 1600); // 1.6 Seconds total sequence
    });

    const showGameOverlay = (toggleFunc: (show: boolean) => void) => {
        hubContainer.style.display = 'none';
        gameWrapper.style.display = 'block';
        document.body.classList.remove('hub-active');
        document.body.classList.add('game-active');

        const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        const game = ensureGameInstance(canvas);

        // Ensure loop is running for UI animations/background
        if (gameLoopId) cancelAnimationFrame(gameLoopId);
        let lastTime = 0;
        const loop = (timestamp: number) => {
            if (!window.game) return;
            if (!lastTime) lastTime = timestamp;
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            window.game.update(Math.min(deltaTime, 50));
            window.game.draw();
            gameLoopId = requestAnimationFrame(loop);
        };
        gameLoopId = requestAnimationFrame(loop);

        game.resizeGame();

        // WICHTIG: Wenn wir aus dem Hub kommen, mÃ¼ssen wir sicherstellen,
        // dass die Spielinstanz die neuesten Upgrades/MÃ¼nzen vom Hub-Context Ã¼bernimmt.
        if (gameWrapper.dataset.fromHub === 'true') {
            game.loadGameData(); // LÃ¤dt coins & highscore
            if (typeof (window as any).dummyGameContext !== 'undefined') {
                const dummy = (window as any).dummyGameContext;
                game.shopManager.playerUpgrades = { ...dummy.shopManager.playerUpgrades };
                game.shopManager.playerCosmetics = { ...dummy.shopManager.playerCosmetics };
                game.shopManager.playerCollectibles = { ...dummy.shopManager.playerCollectibles };
            }
        }

        toggleFunc(true);
        game.uiManager.soundManager.play('uiClick');
    };

    document.getElementById('nav-shop')?.addEventListener('click', () => {
        if (!(window as any).requireLogin()) return;
        document.getElementById('game-wrapper')!.dataset.fromHub = 'true';
        showGameOverlay((show) => setTimeout(() => window.game?.uiManager.toggleShopScreen(show), 50));
    });

    document.getElementById('nav-leaderboard')?.addEventListener('click', () => {
        if (!(window as any).requireLogin()) return;
        document.getElementById('game-wrapper')!.dataset.fromHub = 'true';
        showGameOverlay((show) => setTimeout(() => window.game?.uiManager.toggleLeaderboardScreen(show), 50));
    });

    document.getElementById('nav-settings')?.addEventListener('click', () => {
        if (!(window as any).requireLogin()) return;
        document.getElementById('game-wrapper')!.dataset.fromHub = 'true';
        showGameOverlay((show) => setTimeout(() => window.game?.uiManager.toggleSettingsScreen(show), 50));
    });

    document.getElementById('nav-trophies')?.addEventListener('click', () => {
        if (!(window as any).requireLogin()) return;
        document.getElementById('game-wrapper')!.dataset.fromHub = 'true';
        showGameOverlay((show) => setTimeout(() => showHallOfFameOverlay(), 50));
    });

    document.getElementById('hangar-prev')?.addEventListener('click', () => {
        currentHangarIndex = (currentHangarIndex - 1 + allHangarItems.length) % allHangarItems.length;
        updateHangarDisplay();
    });
    document.getElementById('hangar-next')?.addEventListener('click', () => {
        currentHangarIndex = (currentHangarIndex + 1) % allHangarItems.length;
        updateHangarDisplay();
    });

    // =========================================================================
    // ðŸ† HALL OF FAME â€“ TROPHY SYSTEM (Funktionen sofort registrieren!)
    // =========================================================================

    /** Gibt die UID des aktuellen Spielers zurÃ¼ck (Pi oder Guest). */
    function getCurrentUid(): string {
        return piManagerInstance.isAuthenticated && piManagerInstance.uid
            ? piManagerInstance.uid
            : localStorage.getItem('galaxy_fall_guest_id') || 'UNREGISTERED';
    }

    /**
     * Gibt den In-Memory-Trophy-Cache zurÃ¼ck.
     * KEIN localStorage â€“ nur reiner Arbeitsspeicher.
     * Wird beim Server-Load befÃ¼llt und bei Award/Claim aktuell gehalten.
     */
    function initTrophyData(): TrophyMap {
        if (!(window as any).trophyData) {
            (window as any).trophyData = ensureAllTrophiesExist({});
        }
        return (window as any).trophyData as TrophyMap;
    }


    /**
     * Markiert eine Trophae als verdient.
     * In-Memory sofort + Server-DB als einzige persistente Quelle.
     * localStorage wird NICHT verwendet.
     */
    async function awardTrophy(trophyId: string) {
        const trophyDef = TROPHY_DEFINITIONS.find(t => t.id === trophyId);
        if (!trophyDef) { console.warn(`Unknown trophy: ${trophyId}`); return; }

        const trophies = initTrophyData();
        if (trophies[trophyId]?.earned) return; // Bereits verdient

        // In-Memory sofort aktualisieren (UI-Feedback)
        trophies[trophyId] = {
            earned: true,
            claimed: false,
            reward: TROPHY_REWARDS[trophyId]
        };
        updateHubUI();

        // Server ist die einzige persistente Quelle
        const uid = getCurrentUid();
        if (uid && uid !== 'UNREGISTERED') {
            try {
                await fetch(`${API_BASE_URL}/award-trophy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pi_uid: uid, trophyId, reward: TROPHY_REWARDS[trophyId] })
                });
                console.log(`ðŸ† Trophy '${trophyId}' in Server-DB gespeichert. Reward: ${TROPHY_REWARDS[trophyId].toLocaleString()} GFC`);
            } catch (e) {
                // Server nicht erreichbar â€“ In-Memory bleibt, aber Warnung
                console.warn(`âš ï¸ Trophy '${trophyId}' nur In-Memory, Server-Sync fehlgeschlagen!`, e);
            }
        }
    }
    (window as any).awardTrophy = awardTrophy;

    /**
     * Claim-Coins fÃ¼r eine verdiente Trophae.
     * ALLES wird vom Server validiert â€“ kein localStorage.
     */
    async function claimTrophy(trophyId: string) {
        const uid = getCurrentUid();
        if (!uid || uid === 'UNREGISTERED') {
            alert(globalLocalizationManager.translate('msg_login_required_trophy'));
            return;
        }

        const trophies = initTrophyData();
        const trophyState = trophies[trophyId];
        if (!trophyState || !trophyState.earned || trophyState.claimed) return;

        // Optimistisches In-Memory Update
        trophyState.claimed = true;
        renderHallOfFame();

        try {
            const res = await fetch(`${API_BASE_URL}/claim-trophy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pi_uid: uid, trophyId })
            });

            // Erst Text lesen, dann JSON parsen â€“ verhindert SyntaxError bei leerem Body
            const rawText = await res.text();
            if (!rawText || rawText.trim() === '') {
                throw new Error(`Server antwortete mit leerem Body (HTTP ${res.status})`);
            }

            let data: any;
            try {
                data = JSON.parse(rawText);
            } catch {
                throw new Error(`Server-Antwort kein gÃ¼ltiges JSON (HTTP ${res.status}): ${rawText.substring(0, 100)}`);
            }

            if (data.success) {
                if (gameInstance) {
                    gameInstance.coins = data.newCoins;
                } else if ((window as any).dummyGameContext) {
                    (window as any).dummyGameContext.coins = data.newCoins;
                }
                showTrophyClaimFeedback(trophyId, data.reward);
                console.log(`ðŸ’° Trophy '${trophyId}' claimed! +${data.reward.toLocaleString()} ${globalLocalizationManager.translate('msg_gfc')} | Balance: ${data.newCoins.toLocaleString()}`);
            } else if (data.error === 'already_claimed') {
                trophyState.claimed = true;
                renderHallOfFame();
                console.log(`â„¹ï¸ Trophy '${trophyId}' bereits geclaimt.`);
            } else if (data.error === 'Trophy not earned yet') {
                // Trophy ist im In-Memory als earned, aber Server kennt sie nicht
                // â†’ awardTrophy erneut versuchen, dann Claim wiederholen
                console.warn(`âš ï¸ Trophy not on server yet for '${trophyId}' â€“ re-awarding...`);
                trophyState.claimed = false;
                renderHallOfFame();
                await awardTrophy(trophyId);
                // Kurze Pause, dann nochmal versuchen
                await new Promise(r => setTimeout(r, 500));
                // Rekursiver Retry (einmalig)
                const res2 = await fetch(`${API_BASE_URL}/claim-trophy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pi_uid: uid, trophyId })
                });
                const raw2 = await res2.text();
                if (raw2 && raw2.trim() !== '') {
                    const data2 = JSON.parse(raw2);
                    if (data2.success) {
                        trophyState.claimed = true;
                        if (gameInstance) {
                            gameInstance.coins = data2.newCoins;
                        } else if ((window as any).dummyGameContext) {
                            (window as any).dummyGameContext.coins = data2.newCoins;
                        }
                        showTrophyClaimFeedback(trophyId, data2.reward);
                    }
                }
            } else {
                trophyState.claimed = false;
                renderHallOfFame();
                console.error(`âŒ Claim fehlgeschlagen: ${data.error}`);
                alert(`${globalLocalizationManager.translate('msg_claim_failed')} ${data.error}`);
            }
        } catch (e: any) {
            trophyState.claimed = false;
            renderHallOfFame();
            console.error('âŒ Claim-Trophy Fehler:', e?.message || e);
            alert(`${globalLocalizationManager.translate('msg_claim_network_err')}\n${e?.message || globalLocalizationManager.translate('msg_unknown_err')}`);
        }
    }

    /** Zeigt kurz ein leuchtendes Feedback wenn eine Trophae geclaimed wird. */
    function showTrophyClaimFeedback(trophyId: string, reward: number) {
        const def = TROPHY_DEFINITIONS.find(t => t.id === trophyId);
        const popup = document.createElement('div');
        const t = (k: string) => globalLocalizationManager.translate(k);
        popup.className = 'trophy-claim-popup';
        popup.innerHTML = `
            <div class="tcp-icon">${def?.icon || 'ðŸ†'}</div>
            <div class="tcp-text">
                <div class="tcp-name">${def ? t(def.nameKey) : trophyId}</div>
                <div class="tcp-reward">+${reward.toLocaleString()} ${t('msg_gfc_credited')}</div>
            </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.classList.add('tcp-visible'), 50);
        setTimeout(() => {
            popup.classList.remove('tcp-visible');
            setTimeout(() => popup.remove(), 500);
        }, 3500);
    }

    /** Rendert den Inhalt des Hall-of-Fame-Overlays aus dem In-Memory-Cache. */
    function renderHallOfFame() {
        const listEl = document.getElementById('trophies-list');
        if (!listEl) return;

        const t = (k: string) => globalLocalizationManager.translate(k);
        const trophies = initTrophyData();
        const rarityOrder: Record<string, number> = { legendary: 0, epic: 1, rare: 2, common: 3 };
        const sorted = [...TROPHY_DEFINITIONS].sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
        const earned = sorted.filter(d => trophies[d.id]?.earned);
        const locked = sorted.filter(d => !trophies[d.id]?.earned);
        const totalReward = TROPHY_DEFINITIONS.reduce((s, d) => s + TROPHY_REWARDS[d.id], 0);
        const claimedReward = TROPHY_DEFINITIONS.filter(d => trophies[d.id]?.claimed).reduce((s, d) => s + TROPHY_REWARDS[d.id], 0);

        listEl.innerHTML = `
            <div class="hall-summary">
                <div class="hall-stat">
                    <span class="hall-val">${earned.length}/${TROPHY_DEFINITIONS.length}</span>
                    <span class="hall-lbl">${t('hub_trophies_earned')}</span>
                </div>
                <div class="hall-stat">
                    <span class="hall-val" style="color:#ffd700">${claimedReward.toLocaleString()} / ${totalReward.toLocaleString()} ${t('msg_gfc')}</span>
                    <span class="hall-lbl">${t('hub_rewards_claimed')}</span>
                </div>
            </div>

            ${earned.length > 0 ? `
            <div class="hall-section-header">${t('hub_earned_trophies_header')}</div>
            <div class="trophy-grid">
                ${earned.map(def => {
            const state: TrophyState = trophies[def.id];
            const canClaim = state.earned && !state.claimed;
            return `
                    <div class="trophy-card rarity-${def.rarity}" id="tc-${def.id}" onclick="window._showTrophyInfo('${def.id}', true, '${def.rarity}')" style="cursor:pointer">
                        <div class="tc-rarity-badge">${t('hub_rarity_' + def.rarity)}</div>
                        <div class="tc-icon">${def.icon}</div>
                        <div class="tc-name">${t(def.nameKey)}</div>
                        <div class="tc-reward">ðŸª™ ${TROPHY_REWARDS[def.id].toLocaleString()} ${t('msg_gfc')}</div>
                        ${canClaim
                    ? `<button class="tc-claim-btn" id="claim-btn-${def.id}"
                                onclick="event.stopPropagation(); window._claimTrophy('${def.id}')">${t('hub_claim_reward')}</button>`
                    : `<div class="tc-claimed-badge">${t('hub_claimed')}</div>`
                }
                    </div>`;
        }).join('')}
            </div>` : `
            <div style="text-align:center;padding:40px;color:rgba(255,255,255,0.3);font-family:var(--main-font);font-size:0.5rem;">
                ${t('hub_no_trophies')}
            </div>`}

            ${locked.length > 0 ? `
            <div class="hall-section-header locked-header">${t('hub_locked_trophies_header')}</div>
            <div class="trophy-grid">
                ${locked.map(def => `
                <div class="trophy-card rarity-${def.rarity} locked" id="tc-${def.id}" onclick="window._showTrophyInfo('${def.id}', false, '${def.rarity}')" style="cursor:pointer">
                    <div class="tc-rarity-badge">${t('hub_rarity_' + def.rarity)}</div>
                    <div class="tc-icon locked-icon">ðŸ”’</div>
                    <div class="tc-name">${t(def.nameKey)}</div>
                    <div class="tc-hint">â„¹ï¸ ${t(def.descKey)}</div>
                    <div class="tc-reward locked-reward">ðŸª™ ${TROPHY_REWARDS[def.id].toLocaleString()} ${t('msg_gfc')}</div>
                </div>`).join('')}
            </div>` : ''}
        `;
    }


    /**
     
     * Ã–ffnet das Hall-of-Fame-Overlay â€“ lÃ¤dt TrophÃ¤en LIVE vom Server.
     * So gibt es keine Race Conditions zwischen Award und Claim.
     */
    async function showHallOfFameOverlay() {
        const overlay = document.getElementById('trophies-container');
        const listEl = document.getElementById('trophies-list');
        if (!overlay || !listEl) return;

        // Overlay sofort zeigen mit Ladeanimation
        overlay.style.display = 'flex';
        listEl.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                        height:200px;gap:16px;color:#0ff;font-family:var(--main-font);font-size:0.5rem;">
                <div style="font-size:2rem;animation:spin 1s linear infinite">âš™ï¸</div>
                ${globalLocalizationManager.translate('msg_syncing')}
            </div>
        `;

        const uid = getCurrentUid();
        if (uid && uid !== 'UNREGISTERED') {
            try {
                const res = await fetch(`${API_BASE_URL}/load-data?pi_uid=${uid}`);
                if (res.ok) {
                    const data = await res.json();
                    // Server-Daten sind die einzige Wahrheit
                    (window as any).trophyData = ensureAllTrophiesExist(data.trophies || {});
                    console.log('ðŸ† Hall of Fame: Live-Sync vom Server ok.');
                }
            } catch (e) {
                console.warn('âš ï¸ Hall: Offline â€“ verwende Session-Cache.', e);
            }
        }

        renderHallOfFame();
    }

    // Globaler Claim-Handler (wird aus HTML-onclick verwendet)
    (window as any)._claimTrophy = claimTrophy;

    (window as any)._showTrophyInfo = (id: string, isUnlocked: boolean, rarity: string) => {
        if (gameInstance && gameInstance.uiManager) {
            gameInstance.uiManager.showTrophyDetails(id, isUnlocked, rarity);
        } else if ((window as any).dummyGameContext) {
            // Find global UIManager instance or use a fallback
            if (window.game && window.game.uiManager) {
                window.game.uiManager.showTrophyDetails(id, isUnlocked, rarity);
            }
        }
    };

    // =========================================================================
    // ðŸŽ WELCOME BONUS â€“ EPIC FIRST-TIME REWARD
    // =========================================================================

    async function checkAndShowWelcomeBonus(uid: string, username: string) {

        console.log(`ðŸŽ PrÃƒÂ¼fe Welcome-Bonus fÃƒÂ¼r: ${username} (${uid})...`);
        try {
            const res = await fetch(`${API_BASE_URL}/check-welcome-bonus?pi_uid=${uid}&t=${Date.now()}`);
            if (!res.ok) { console.warn("âŒ Bonus-Check fehlgeschlagen (Server-Fehler)"); return; }
            const data = await res.json();
            console.log("ðŸŽ Bonus-Zustand vom Server:", data);
            if (!data.eligible) { console.log("â„¹ï¸ User hat den Bonus bereits erhalten."); return; }
            showWelcomeBonusOverlay(uid, username, data.amount);
        } catch (e) { console.error("âŒ Bonus-Check Fehler:", e); }
    }

    function showWelcomeBonusOverlay(uid: string, username: string, amount: number) {
        const overlay = document.getElementById('welcome-bonus-overlay')!;
        const pilotNameEl = document.getElementById('welcome-bonus-pilot-name')!;
        const counterEl = document.getElementById('welcome-bonus-counter')!;
        const claimBtn = document.getElementById('welcome-bonus-claim-btn') as HTMLButtonElement;
        const claimBtnText = document.getElementById('claim-btn-text')!;

        // Personalise
        const tWB = (k: string, rep?: any) => globalLocalizationManager.translate(k, rep);
        pilotNameEl.textContent = `âš¡ ${tWB('hub_welcome_bonus_title')}: ${username.toUpperCase()} âš¡`;

        // Update description with localized text + amount
        const descEl = document.getElementById('welcome-bonus-desc');
        if (descEl) {
            descEl.innerHTML = tWB('hub_welcome_desc', { amount: amount.toLocaleString() });
        }

        // --- Canvas particle system ---
        const canvas = document.getElementById('bonus-particle-canvas') as HTMLCanvasElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d')!;

        const COLORS = ['#00ffff', '#ffd700', '#ff6600', '#ffffff', '#00ff88', '#ff00ff'];
        interface Particle { x: number; y: number; vx: number; vy: number; alpha: number; r: number; color: string; rot: number; rotV: number; type: 'star' | 'hex' | 'dot'; }
        const particles: Particle[] = [];

        function spawnParticleBurst(cx: number, cy: number, n: number, fast: boolean) {
            for (let i = 0; i < n; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = fast ? (4 + Math.random() * 8) : (0.5 + Math.random() * 2.5);
                particles.push({
                    x: cx, y: cy,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - (fast ? 3 : 0),
                    alpha: 1,
                    r: fast ? (3 + Math.random() * 6) : (1 + Math.random() * 3),
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    rot: Math.random() * Math.PI * 2,
                    rotV: (Math.random() - 0.5) * 0.15,
                    type: (['star', 'hex', 'dot'] as const)[Math.floor(Math.random() * 3)]
                });
            }
        }

        function drawParticle(p: Particle) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;

            if (p.type === 'dot') {
                ctx.beginPath();
                ctx.arc(0, 0, p.r, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'hex') {
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const a = (i / 6) * Math.PI * 2;
                    i === 0 ? ctx.moveTo(Math.cos(a) * p.r, Math.sin(a) * p.r)
                        : ctx.lineTo(Math.cos(a) * p.r, Math.sin(a) * p.r);
                }
                ctx.closePath();
                ctx.fill();
            } else {
                // star
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const ao = (i / 5) * Math.PI * 2 - Math.PI / 2;
                    const ai = ao + Math.PI / 5;
                    i === 0 ? ctx.moveTo(Math.cos(ao) * p.r, Math.sin(ao) * p.r) : ctx.lineTo(Math.cos(ao) * p.r, Math.sin(ao) * p.r);
                    ctx.lineTo(Math.cos(ai) * p.r * 0.4, Math.sin(ai) * p.r * 0.4);
                }
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }

        let animId: number;
        function particleLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Ambient rain from top
            if (Math.random() < 0.4) {
                particles.push({
                    x: Math.random() * canvas.width, y: -10,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: 1 + Math.random() * 2,
                    alpha: 0.8, r: 1 + Math.random() * 3,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    rot: 0, rotV: 0.05, type: 'dot'
                });
            }
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.08;
                p.alpha -= 0.008;
                p.rot += p.rotV;
                if (p.alpha <= 0 || p.y > canvas.height + 20) { particles.splice(i, 1); continue; }
                drawParticle(p);
            }
            animId = requestAnimationFrame(particleLoop);
        }

        // Show overlay
        overlay.style.display = 'flex';
        particleLoop();

        // Animate counter up to full amount
        let teaser = 0;
        const teaseInterval = setInterval(() => {
            teaser = Math.min(teaser + Math.ceil(amount / 40), amount);
            counterEl.textContent = teaser.toLocaleString();
            if (teaser >= amount) clearInterval(teaseInterval);
        }, 40);

        // Claim button handler
        claimBtn.addEventListener('click', async () => {
            claimBtn.disabled = true;
            claimBtnText.textContent = `â³ ${globalLocalizationManager.translate('msg_syncing')}`;

            try {
                const res = await fetch(`${API_BASE_URL}/claim-welcome-bonus`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pi_uid: uid, username })
                });
                const data = await res.json();

                if (res.ok && data.success) {
                    claimBtnText.textContent = `âœ… ${globalLocalizationManager.translate('msg_gfc_credited')}`;
                    claimBtn.classList.add('claimed');

                    // Ring bursts
                    ['', ' gold', ' white'].forEach((cls, i) => {
                        setTimeout(() => {
                            const ring = document.createElement('div');
                            ring.className = 'wb-ring-burst' + cls;
                            overlay.appendChild(ring);
                            setTimeout(() => ring.remove(), 900);
                        }, i * 150);
                    });

                    // Big particle burst from center
                    spawnParticleBurst(canvas.width / 2, canvas.height / 2, 120, true);

                    // Animate counter from old balance â†’ new total balance
                    clearInterval(teaseInterval);

                    const oldBalance = (gameInstance) ? gameInstance.coins : parseInt(localStorage.getItem('galaxyFallCoins') || '0');
                    const newBalance = data.newBalance !== undefined ? data.newBalance : oldBalance + amount;

                    let currentAnim = oldBalance;
                    const TOTAL_TIME = 2500;
                    const STEPS = 80;
                    const stepAnim = (newBalance - currentAnim) / STEPS;
                    const interval = TOTAL_TIME / STEPS;

                    const countUp = setInterval(() => {
                        currentAnim = Math.min(currentAnim + stepAnim, newBalance);
                        counterEl.textContent = Math.round(currentAnim).toLocaleString();
                        counterEl.style.animation = 'wb-counter-pop 0.1s ease';
                        setTimeout(() => { counterEl.style.animation = ''; }, 100);
                        if (currentAnim >= newBalance) {
                            clearInterval(countUp);
                            counterEl.textContent = newBalance.toLocaleString();
                            // Final mega burst
                            spawnParticleBurst(canvas.width / 2, canvas.height / 2, 200, true);
                        }
                    }, interval);

                    // Update coins across all systems
                    if (data.newBalance !== undefined) {
                        if (gameInstance) {
                            gameInstance.coins = data.newBalance;
                        } else if ((window as any).dummyGameContext) {
                            (window as any).dummyGameContext.coins = data.newBalance;
                        }
                    }

                    // Auto-close after celebration
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        overlay.style.transition = 'opacity 0.8s ease';
                        setTimeout(() => {
                            overlay.style.display = 'none';
                            overlay.style.opacity = '';
                            overlay.style.transition = '';
                            cancelAnimationFrame(animId);
                        }, 800);
                    }, 4500);

                } else if (data.error === 'already_claimed') {
                    overlay.style.display = 'none';
                    cancelAnimationFrame(animId);
                } else {
                    claimBtnText.textContent = `âŒ ${globalLocalizationManager.translate('msg_unknown_err')}`;
                    claimBtn.disabled = false;
                }
            } catch {
                claimBtnText.textContent = `âŒ ${globalLocalizationManager.translate('msg_network_err')}`;
                claimBtn.disabled = false;
            }
        }, { once: true });
    }




    const performUnifiedLogin = async () => {
        console.log("Unified login sequence initiated...");
        const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
        const authBtn = document.getElementById('auth-login-btn') as HTMLButtonElement;
        const lockOverlay = document.getElementById('auth-lock-overlay');
        const hubContainer = document.getElementById('hub-container');
        const connectingOverlay = document.getElementById('connecting-overlay');

        if (loginBtn) { loginBtn.disabled = true; loginBtn.textContent = globalLocalizationManager.translate('msg_loading_network').slice(0, 20) + '...'; }
        if (authBtn) { authBtn.disabled = true; authBtn.textContent = globalLocalizationManager.translate('msg_loading_network').slice(0, 20) + '...'; }

        // Zeige MK-I Connecting Animation
        if (connectingOverlay) {
            connectingOverlay.style.display = 'flex';
            // Force reflow so transition fires
            connectingOverlay.getBoundingClientRect();
            connectingOverlay.style.opacity = '1';
        }

        try {
            // Kleiner kÃ¼nstlicher Delay fÃ¼r die Ã„sthetik der Animation
            await new Promise(resolve => setTimeout(resolve, 800));

            // Attempt Pi SDK Auth
            try {
                await piManagerInstance.authenticate(false);
                console.log("âœ… Pi SDK Auth successful:", piManagerInstance.username);
            } catch (authErr) {
                console.warn("Pi Auth unavailable - guest mode active.", authErr);
            }

            const outView = document.querySelector('.logged-out-view') as HTMLElement;
            const inView = document.querySelector('.logged-in-view') as HTMLElement;

            if (outView) outView.style.display = 'none';
            if (inView) inView.style.display = 'flex';

            if (lockOverlay) {
                lockOverlay.style.opacity = '0';
                setTimeout(() => lockOverlay.style.display = 'none', 500);
            }
            if (hubContainer) {
                hubContainer.style.filter = 'none';
                hubContainer.style.pointerEvents = 'all';
            }

            const { uid, username } = getHubPlayerIdentity();

            if (gameInstance) {
                // Perform full sync
                await gameInstance.loadPlayerDataFromServer();
            } else if ((window as any).dummyGameContext) {
                // Sync ALL data (coins, upgrades, cosmetics, trophies) in the Hub context
                await (window as any).dummyGameContext.loadPlayerDataFromServer();
            }

            updateHubUI();
            renderHallOfFame();

            // Welcome bonus should be checked regardless of gameInstance, even for guests
            if (uid !== 'UNREGISTERED') {
                checkAndShowWelcomeBonus(uid, username);
            }

        } catch (e) {
            console.error("Unified Login Error:", e);
        } finally {
            if (loginBtn) { loginBtn.disabled = false; loginBtn.textContent = globalLocalizationManager.translate('hub_online'); }
            if (authBtn) { authBtn.disabled = false; authBtn.textContent = globalLocalizationManager.translate('hub_access_granted'); }

            // Verstecke Connecting Animation
            if (connectingOverlay) {
                connectingOverlay.style.opacity = '0';
                setTimeout(() => { connectingOverlay.style.display = 'none'; }, 500);
            }
        }
    };

    document.getElementById('login-btn')?.addEventListener('click', performUnifiedLogin);
    document.getElementById('auth-login-btn')?.addEventListener('click', performUnifiedLogin);

    // --- CAROUSEL REFRESH ---
    (window as any).updateCarouselPositions = updateCarouselPositions;

    // =========================================================================
    // 3D CAROUSEL LOGIK (INKLUSIVE MOBILE FIXES)
    // =========================================================================
    let currentCarouselIndex = 1; // 0=Pilot, 1=Game, 2=Market
    const cPanelPilot = document.getElementById('panel-pilot');
    const cPanelGame = document.getElementById('panel-game');
    const cPanelMarket = document.getElementById('panel-market');

    function updateCarouselPositions() {
        if (!cPanelPilot || !cPanelGame || !cPanelMarket) return;

        cPanelPilot.className = 'cockpit-panel side-monitor';
        cPanelGame.className = 'cockpit-panel';
        cPanelMarket.className = 'cockpit-panel side-monitor';

        if (currentCarouselIndex === 0) { // Pilot
            cPanelPilot.classList.add('pos-center');
            cPanelGame.classList.add('pos-right');
            cPanelMarket.classList.add('pos-left');
        } else if (currentCarouselIndex === 1) { // Game
            cPanelPilot.classList.add('pos-left');
            cPanelGame.classList.add('pos-center');
            cPanelMarket.classList.add('pos-right');
        } else if (currentCarouselIndex === 2) { // Market
            cPanelPilot.classList.add('pos-right');
            cPanelGame.classList.add('pos-left');
            cPanelMarket.classList.add('pos-center');
        }
    }

    (window as any).rotateTo = (target: string) => {
        if (target === 'pilot') currentCarouselIndex = 0;
        if (target === 'game') currentCarouselIndex = 1;
        if (target === 'market') currentCarouselIndex = 2;
        updateCarouselPositions();
        if (gameInstance) gameInstance.uiManager.soundManager.play('uiClick');
    };

    document.getElementById('nav-rotate-left')?.addEventListener('click', () => {
        currentCarouselIndex--;
        if (currentCarouselIndex < 0) currentCarouselIndex = 2;
        updateCarouselPositions();
    });
    document.getElementById('nav-rotate-right')?.addEventListener('click', () => {
        currentCarouselIndex++;
        if (currentCarouselIndex > 2) currentCarouselIndex = 0;
        updateCarouselPositions();
    });

    // Helper: always get the best available UIManager for Hub use
    const getActiveUIManager = () => {
        if (window.game && window.game.uiManager) return window.game.uiManager;
        const dummy = (window as any).dummyGameContext;
        if (dummy && dummy.uiManager) return dummy.uiManager;
        return null;
    };

    document.querySelectorAll('.monitor-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const el = e.target as HTMLElement;
            const targetId = el.dataset.target;
            const parent = el.closest('.cockpit-panel');
            if (parent && targetId) {
                parent.querySelectorAll('.monitor-tab').forEach(t => t.classList.remove('active'));
                el.classList.add('active');
                parent.querySelectorAll('.monitor-view').forEach(v => v.classList.remove('active'));
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.classList.add('active');

                if (parent.id === 'panel-pilot') {
                    (window as any).rotateTo('pilot');

                    const ui = getActiveUIManager();
                    if (targetId === 'view-pilot-gallery' && ui) {
                        // Small delay to let the view become visible first
                        setTimeout(() => ui.populateGalerie('pilot-gallery-root'), 50);
                    }
                    if (targetId === 'view-pilot-network' && ui) {
                        setTimeout(() => ui.populateNetwork('pilot-network-root'), 50);
                    }
                }
                if (parent.id === 'panel-market') (window as any).rotateTo('market');
            }
        });
    });

    // --- FIX: MOBILE SWIPE (DEAKTIVIERT WÃ„HREND SPIEL) ---
    let touchStartX = 0;
    if (cockpitWrapper) {
        cockpitWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        cockpitWrapper.addEventListener('touchend', (e) => {
            // FIX: Swipe blockieren, wenn das komplette Spiel-Overlay aktiv ist
            if (document.body.classList.contains('game-active')) {
                return;
            }

            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchEndX - touchStartX;
            if (diff > 50) {
                currentCarouselIndex--;
                if (currentCarouselIndex < 0) currentCarouselIndex = 2;
                updateCarouselPositions();
            } else if (diff < -50) {
                currentCarouselIndex++;
                if (currentCarouselIndex > 2) currentCarouselIndex = 0;
                updateCarouselPositions();
            }
        }, { passive: true });
    }

    // --- HUB RETURN LOGIC ---
    window.addEventListener('returnToHubRequested', () => {
        console.log("Event: returnToHubRequested");

        // Pause Game
        if (gameInstance) {
            gameInstance.isPaused = true;
            if (gameInstance.uiManager && gameInstance.uiManager.soundManager) {
                gameInstance.uiManager.soundManager.toggleMusic(false);
            }
        }

        // Hide Game UI
        const gameWrapper = document.getElementById('game-wrapper');
        const menuContainer = document.getElementById('menu-container');
        const gameOverContainer = document.getElementById('game-over-container');

        if (gameWrapper) gameWrapper.style.display = 'none';
        if (menuContainer) menuContainer.style.display = 'none';
        if (gameOverContainer) gameOverContainer.style.display = 'none';

        document.body.style.overflow = 'auto';

        // Show Hub
        const hub = document.getElementById('hub-container');
        if (hub) {
            hub.style.display = 'flex';
            setTimeout(() => hub.classList.add('hub-visible'), 50);
        }

        // Refresh Hub
        if (typeof updateHubUI === 'function') updateHubUI();
        if (typeof updateHangarDisplay === 'function') updateHangarDisplay();

        // Reset Carousel
        const panelPilot = document.getElementById('panel-pilot');
        const panelGame = document.getElementById('panel-game');
        const panelMarket = document.getElementById('panel-market');
        if (panelPilot) panelPilot.className = 'cockpit-panel pos-left';
        if (panelGame) panelGame.className = 'cockpit-panel pos-center active';
        if (panelMarket) panelMarket.className = 'cockpit-panel pos-right';

        document.querySelector('.ship-img-container')?.classList.remove('launch-blast');
    });

    // --- FIX: SPRACHAUSWAHL & BACK BUTTON ---
    const initLanguageScreenEvents = () => {
        document.querySelectorAll('.lang-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = (e.target as HTMLElement).dataset.lang || 'en';
                globalLocalizationManager.setLanguage(lang);

                const ls = document.getElementById('language-select-screen');
                if (ls) ls.style.display = 'none';

                // Apply translations to everything immediately
                globalLocalizationManager.applyTranslationsToUI();
                if (typeof updateHubUI === 'function') updateHubUI();
                if (typeof updateHangarDisplay === 'function') updateHangarDisplay();

                if (gameInstance) {
                    gameInstance.uiManager.populateAllTranslatedContent();
                    gameInstance.changeState('INTRO');
                    piManagerInstance.authenticate();
                }
            });
        });
    };

    // =========================================================================
    // ðŸŒ HUB LANGUAGE CAROUSEL (MANDATED BY US-PROTOCOL-8)
    // =========================================================================
    const initHubLanguageCarousel = () => {
        const hubLangs = [
            { code: 'en', flag: 'https://flagcdn.com/w80/gb.png' },
            { code: 'de', flag: 'https://flagcdn.com/w80/de.png' },
            { code: 'es', flag: 'https://flagcdn.com/w80/es.png' },
            { code: 'it', flag: 'https://flagcdn.com/w80/it.png' },
            { code: 'zh', flag: 'https://flagcdn.com/w80/cn.png' },
            { code: 'ja', flag: 'https://flagcdn.com/w80/jp.png' }
        ];
        let currentHubLangIdx = hubLangs.findIndex(l => l.code === globalLocalizationManager.language);
        if (currentHubLangIdx === -1) currentHubLangIdx = 0;

        const updateHubLangUI = () => {
            const flagIcon = document.getElementById('hub-flag-icon') as HTMLImageElement;
            if (flagIcon) {
                flagIcon.src = hubLangs[currentHubLangIdx].flag;
            }
        };

        document.getElementById('hub-lang-prev')?.addEventListener('click', () => {
            currentHubLangIdx = (currentHubLangIdx - 1 + hubLangs.length) % hubLangs.length;
            globalLocalizationManager.setLanguage(hubLangs[currentHubLangIdx].code);
            globalLocalizationManager.applyTranslationsToUI();
            if (typeof updateHubUI === 'function') updateHubUI();
            if (typeof updateHangarDisplay === 'function') updateHangarDisplay();
            updateHubLangUI();
        });

        document.getElementById('hub-lang-next')?.addEventListener('click', () => {
            currentHubLangIdx = (currentHubLangIdx + 1) % hubLangs.length;
            globalLocalizationManager.setLanguage(hubLangs[currentHubLangIdx].code);
            globalLocalizationManager.applyTranslationsToUI();
            if (typeof updateHubUI === 'function') updateHubUI();
            if (typeof updateHangarDisplay === 'function') updateHangarDisplay();
            updateHubLangUI();
        });

        // Sync Initial Flag
        updateHubLangUI();
    };
    // --- LEGAL PROTOCOLS LOGIC ---
    const initLegalOverlay = () => {
        const legalOverlay = document.getElementById('legal-overlay');
        const openBtn = document.getElementById('open-legal-btn');
        const openBtnSettings = document.getElementById('open-legal-settings-btn');
        const closeBtn = document.getElementById('close-legal-btn');
        const closeBtnBottom = document.getElementById('close-legal-btn-bottom');
        const tabBtns = document.querySelectorAll('.legal-tab-btn');
        const viewTerms = document.getElementById('legal-view-terms');
        const viewPrivacy = document.getElementById('legal-view-privacy');

        if (!legalOverlay) return;

        const openLegal = () => {
            legalOverlay.style.display = 'flex';
            if (gameInstance) gameInstance.uiManager.soundManager.play('uiClick');
        };

        const closeLegal = () => {
            legalOverlay.style.display = 'none';
            if (gameInstance) gameInstance.uiManager.soundManager.play('uiClick');
        };

        openBtn?.addEventListener('click', openLegal);
        openBtnSettings?.addEventListener('click', openLegal);
        closeBtn?.addEventListener('click', closeLegal);
        closeBtnBottom?.addEventListener('click', closeLegal);

        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = (e.currentTarget as HTMLElement).dataset.tab;
                tabBtns.forEach(b => b.classList.remove('active'));
                (e.currentTarget as HTMLElement).classList.add('active');

                if (target === 'terms') {
                    if (viewTerms) viewTerms.style.display = 'block';
                    if (viewPrivacy) viewPrivacy.style.display = 'none';
                } else {
                    if (viewTerms) viewTerms.style.display = 'none';
                    if (viewPrivacy) viewPrivacy.style.display = 'block';
                }
                if (gameInstance) gameInstance.uiManager.soundManager.play('uiClick');
            });
        });
    };

    initLegalOverlay();
    initLanguageScreenEvents();
    initHubLanguageCarousel();

    // --- INIT ---
    // 0. Fake Loading Bar for awesomeness
    const simulateLoadingBar = async () => {
        return new Promise<void>((resolve) => {
            const overlay = document.getElementById('startup-loading-screen');
            const bar = document.getElementById('startup-loading-bar');
            const text = document.getElementById('startup-loading-text');

            if (!overlay || !bar || !text) {
                resolve();
                return;
            }

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15 + 5; // Fast progression
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    bar.style.width = '100%';
                    text.textContent = globalLocalizationManager.translate('hub_systems_online');

                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            overlay.style.display = 'none';
                            resolve();
                        }, 500);
                    }, 400);
                } else {
                    bar.style.width = `${progress}%`;
                    if (progress > 25) text.textContent = globalLocalizationManager.translate('msg_loading_network');
                    if (progress > 50) text.textContent = globalLocalizationManager.translate('msg_loading_assets');
                    if (progress > 80) text.textContent = globalLocalizationManager.translate('msg_loading_sync');
                }
            }, 150);
        });
    };

    // 1. Initialer Sync beim Start â€“ KEIN Auto-Login, nur UI + Daily Deal
    const initSync = async () => {
        // Schnelles UI-Update zuerst
        globalLocalizationManager.applyTranslationsToUI();
        updateHubUI();
        updateHangarDisplay();

        // Start live Hub bomb timer â€” deferred so dummyGameContext is ready
        setTimeout(() => {
            const ui = (window as any).dummyGameContext?.uiManager;
            if (ui && typeof ui.startHubBombTick === 'function') {
                ui.startHubBombTick();
            }
        }, 100);

        // Asynchrone Hintergrundsequenz
        (async () => {
            try {
                // Schritt 1: Loading Bar anzeigen
                await simulateLoadingBar();

                // Render Ads in Hub
                piManagerInstance.renderBanner('pi-ad-banner-container');

                // Schritt 2: Daily Deal laden (immer, ohne Login)
                await fetchDailyDeal();
                console.log("âœ… Daily Deal geladen.");

                // Schritt 3: Auto-Login Versuch
                try {
                    console.log("ðŸ” Checking for existing Pi session...");
                    const user = await piManagerInstance.authenticate(true);
                    if (user) {
                        console.log("âœ¨ Auto-Login successful.");
                        await performUnifiedLogin();
                    }
                } catch (e) {
                    console.log("No previous session found, staying as guest.");
                }

            } catch (e) {
                console.error("Sync Fehler:", e);
            } finally {
                // Finales UI-Refresh
                updateHubUI();
                updateHangarDisplay();
                updateCarouselPositions();
                (window as any).updateHubUI = updateHubUI;
                (window as any).ensureGameInstance = ensureGameInstance;

                // Initialisiere die Spiel-Instanz im Hintergrund (fÃ¼r Lucky Wheel & UI)
                const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
                if (canvas) ensureGameInstance(canvas);

                console.log("âœ… Hub initialisiert und bereit.");
            }
        })();
    };

    initSync();

    setTimeout(() => hubContainer.classList.add('hub-visible'), 100);
});
