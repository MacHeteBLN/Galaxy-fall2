import { translations } from './translations.js';

// --- BILDER LADEN (ALS PFADE) ---
import playerImgSrc1 from './assets/images/player_tier1.png';
import playerImgSrc2 from './assets/images/player_tier2.png';
import playerImgSrc3 from './assets/images/player_tier3.png';
import playerImgSrc4 from './assets/images/player_tier4.png';

// --- Gegner-Bilder importieren ---
import gruntImgSrc from './assets/images/enemy_grunt.png';
import tankImgSrc from './assets/images/enemy_tank.png';
import weaverImgSrc from './assets/images/enemy_weaver.png';
import shooterImgSrc from './assets/images/enemy_shooter.png';

// --- NEUE BOSS-BILDER IMPORTIEREN ---
// Hinweis: Für Omega Nexus werden zwei Bilder für die Rotations-Animation benötigt.
import bossSentinelPrimeSrc from './assets/images/boss_sentinel_prime.png';
import bossVoidSerpentSrc from './assets/images/boss_void_serpent.png';
import bossOmegaNexusBaseSrc from './assets/images/boss_omega_nexus_base.png';
import bossOmegaNexusRingSrc from './assets/images/boss_omega_nexus_ring.png';


// --- POWER-UP BILDER IMPORTIEREN ---
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

// --- Bilder für die Drohnen importieren ---
import orbitalDrone1ImgSrc from './assets/images/orbital_drone_1.png';
import orbitalDrone2ImgSrc from './assets/images/orbital_drone_2.png';
import orbitalDrone3ImgSrc from './assets/images/orbital_drone_3.png';


// --- ECHTE BILD-OBJEKTE ERSTELLEN ---
const createImage = (src: string) => { const img = new Image(); img.src = src; return img; };
const playerImg1 = createImage(playerImgSrc1), playerImg2 = createImage(playerImgSrc2), playerImg3 = createImage(playerImgSrc3), playerImg4 = createImage(playerImgSrc4);
const gruntImg = createImage(gruntImgSrc), tankImg = createImage(tankImgSrc), weaverImg = createImage(weaverImgSrc), shooterImg = createImage(shooterImgSrc);

// Bild-Objekte für die neuen Bosse
const bossSentinelPrimeImg = createImage(bossSentinelPrimeSrc);
const bossVoidSerpentImg = createImage(bossVoidSerpentSrc);
const bossOmegaNexusBaseImg = createImage(bossOmegaNexusBaseSrc);
const bossOmegaNexusRingImg = createImage(bossOmegaNexusRingSrc);

const powerUpImages: { [key: string]: HTMLImageElement } = { 'WEAPON_UP': createImage(powerupWeaponUpSrc), 'RAPID_FIRE': createImage(powerupRapidFireSrc), 'SIDE_SHOTS': createImage(powerupSideShotsSrc), 'LASER_BEAM': createImage(powerupLaserBeamSrc), 'HOMING_MISSILES': createImage(powerupHomingMissilesSrc), 'SHIELD': createImage(powerupShieldSrc), 'REPAIR_KIT': createImage(powerupRepairKitSrc), 'EXTRA_LIFE': createImage(powerupExtraLifeSrc), 'GHOST_PROTOCOL': createImage(powerupGhostProtocolSrc), 'ORBITAL_DRONE': createImage(powerupOrbitalDroneSrc), 'NUKE': createImage(powerupNukeSrc), 'BLACK_HOLE': createImage(powerupBlackHoleSrc), 'SCORE_BOOST': createImage(powerupScoreBoostSrc), };
const powerUpImageSources: { [key: string]: string } = { 'WEAPON_UP': powerupWeaponUpSrc, 'RAPID_FIRE': powerupRapidFireSrc, 'SIDE_SHOTS': powerupSideShotsSrc, 'LASER_BEAM': powerupLaserBeamSrc, 'HOMING_MISSILES': powerupHomingMissilesSrc, 'SHIELD': powerupShieldSrc, 'REPAIR_KIT': powerupRepairKitSrc, 'EXTRA_LIFE': powerupExtraLifeSrc, 'GHOST_PROTOCOL': powerupGhostProtocolSrc, 'ORBITAL_DRONE': powerupOrbitalDroneSrc, 'NUKE': powerupNukeSrc, 'BLACK_HOLE': powerupBlackHoleSrc, 'SCORE_BOOST': powerupScoreBoostSrc, };

// --- Bild-Objekte für die Drohnen erstellen ---
const orbitalDroneImages = [createImage(orbitalDrone1ImgSrc), createImage(orbitalDrone2ImgSrc), createImage(orbitalDrone3ImgSrc)];


// --- TYPE DEFINITIONS ---
interface IKeyMap { [key: string]: boolean; }
interface IStar { pos: Vector2D; s: number; v: number; a: number; }
interface ILevelDefinition { scoreToEarn: number; s: number; m: number; e: string[]; msgKey: string; }
interface IUIElements { score: HTMLElement; level: HTMLElement; highscore: HTMLElement; specialInventory: HTMLElement; ultraInventory: HTMLElement; livesDisplay: HTMLElement; weaponStatus: HTMLElement; energyBar: HTMLElement; }
interface IParticle { pos: Vector2D; vel: Vector2D; size: number; life: number; color: string; }
interface IInventoryItem { type: string; count: number; }

// --- CORE CLASSES ---
class Vector2D { public x: number; public y: number; constructor(x: number, y: number) { this.x = x; this.y = y; } }
class Entity { public game: Game; public pos: Vector2D; public width: number; public height: number; public family: string = 'none'; public type: string = 'NONE'; protected _isGarbage: boolean = false; constructor(game: Game, x: number, y: number, w: number, h: number) { this.game = game; this.pos = new Vector2D(x, y); this.width = w; this.height = h; } update(dt: number): void {} draw(ctx: CanvasRenderingContext2D): void {} isAlive(): boolean { return !this._isGarbage; } destroy(): void { this._isGarbage = true; } }
class EntityFamily extends Entity { constructor(game: Game, x: number, y: number, w: number, h: number, family: string, type: string) { super(game, x, y, w, h); this.family = family; this.type = type; } }

class Player extends EntityFamily {
    public speed: number = 400; public lives: number = 3; public maxLives: number = 5;
    public energy: number = 100; public fireCooldown: number = 0;
    public powerUpManager: PowerUpManager; public drones: Drone[] = []; public laser: LaserBeam | null = null;
    public droneAngle: number = 0;

    constructor(game: Game) {
        super(game, game.width / 2 - 25, game.height - 80, 50, 40, 'player', 'PLAYER');
        this.powerUpManager = new PowerUpManager(this);
    }
    update(dt: number): void {
        const dt_s = dt / 1000; const move = new Vector2D(0, 0);
        if (this.game.keys['ArrowLeft'] || this.game.keys['KeyA']) move.x = -1; if (this.game.keys['ArrowRight'] || this.game.keys['KeyD']) move.x = 1;
        if (this.game.keys['ArrowUp'] || this.game.keys['KeyW']) move.y = -1; if (this.game.keys['ArrowDown'] || this.game.keys['KeyS']) move.y = 1;
        const mag = Math.hypot(move.x, move.y);
        if (mag > 0) { this.pos.x += (move.x / mag) * this.speed * dt_s; this.pos.y += (move.y / mag) * this.speed * dt_s; }
        this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width));
        this.pos.y = Math.max(0, Math.min(this.pos.y, this.game.height - this.height));
        if (this.game.keys['Space'] && this.fireCooldown <= 0) this.shoot();
        if (this.fireCooldown > 0) this.fireCooldown -= dt;
        
        this.droneAngle += 3 * dt_s;

        this.powerUpManager.update(dt); this.drones.forEach(d => d.update(dt));
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save(); ctx.globalAlpha = this.isGhosted() ? 0.5 : 1;
        const t = this.powerUpManager.weaponTier; let currentImage: HTMLImageElement;
        switch (t) { case 1: currentImage = playerImg1; break; case 2: currentImage = playerImg2; break; case 3: currentImage = playerImg3; break; case 4: currentImage = playerImg4; break; default: currentImage = playerImg1; }
        const drawX = this.pos.x + (this.width / 2) - (currentImage.width / 2); const drawY = this.pos.y + (this.height / 2) - (currentImage.height / 2);
        ctx.drawImage(currentImage, drawX, drawY); this.drones.forEach(d => d.draw(ctx));
        if (this.isShielded()) {
            const a = (this.powerUpManager.timers['SHIELD']! < 1000 && Math.floor(Date.now() / 100) % 2 === 0) ? 0 : 0.4;
            ctx.fillStyle = `rgba(11,255,255,${a})`; ctx.beginPath(); ctx.arc(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.width * 0.7, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }
    shoot(): void { this.powerUpManager.shoot(); }
    takeHit(damagePercentage: number): void {
        if (this.isGhosted()) return;
        if (this.isShielded()) { this.powerUpManager.deactivate('SHIELD'); this.game.uiManager.soundManager.play('shieldDown'); return; }
        this.powerUpManager.onPlayerHit(); this.energy -= damagePercentage; this.game.triggerScreenShake(5); this.game.uiManager.soundManager.play('playerHit');
        if (this.energy <= 0) {
            this.lives--;
            if (this.lives <= 0) { this.destroy(); this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, '#FFFFFF', 2)); this.game.triggerScreenShake(50); this.game.uiManager.soundManager.play('playerExplosion');
            } else { this.energy = 100; this.pos.x = this.game.width / 2 - this.width / 2; this.pos.y = this.game.height - 80; this.powerUpManager.activate('GHOST_PROTOCOL', 5000); }
        }
    }
    isShielded(): boolean { return this.powerUpManager.isActive('SHIELD'); }
    isGhosted(): boolean { return this.powerUpManager.isActive('GHOST_PROTOCOL'); }
    isScoreBoosted(): boolean { return this.powerUpManager.isActive('SCORE_BOOST'); }
}

class PowerUpManager {
    public player: Player; public game: Game; public weaponTier: number = 1; public weaponTierTimer: number = 0;
    public ultraWeapon: string | null = null; public timers: { [key: string]: number } = {};
    public specialInventory: IInventoryItem[] = []; public ultraInventory: IInventoryItem[] = [];
    constructor(player: Player) { this.player = player; this.game = player.game; }
    update(dt: number): void { for (const key in this.timers) { this.timers[key] -= dt; if (this.timers[key] <= 0) this.deactivate(key); } if (this.weaponTierTimer > 0) { this.weaponTierTimer -= dt; if (this.weaponTierTimer <= 0) { this.weaponTier--; this.setWeaponTierTimer(); } } }
    setWeaponTierTimer(): void { if (this.weaponTier <= 1) { this.weaponTier = 1; this.weaponTierTimer = 0; return; } switch(this.weaponTier) { case 4: this.weaponTierTimer = 30000; break; case 3: this.weaponTierTimer = 60000; break; case 2: this.weaponTierTimer = 90000; break; } }
    deactivate(key: string): void {
        delete this.timers[key];
        if (this.ultraWeapon === key) {
            this.ultraWeapon = null;
            if (this.player.laser) {
                this.player.laser.destroy();
                this.player.laser = null;
            }
        } else if (key === 'ORBITAL_DRONE') {
            this.player.drones.forEach(d => d.destroy());
            this.player.drones = [];
        }
    }
    resetTemporaryPowerUps(): void {
        const activeTimers = Object.keys(this.timers);
        activeTimers.forEach(timerKey => {
            this.deactivate(timerKey);
        });
        this.ultraWeapon = null;
    }
    isActive(type: string): boolean { return this.timers[type] > 0; }
    onPlayerHit(): void { if (this.weaponTier > 1) { this.weaponTier--; this.setWeaponTierTimer(); } }
    collectSpecial(type: string): void { this.collectToInventory(type, this.specialInventory, 3); }
    collectUltra(type: string): void { this.collectToInventory(type, this.ultraInventory, 2); }
    private collectToInventory(type: string, inventory: IInventoryItem[], maxSize: number): void { const existing = inventory.find(item => item.type === type); if (existing) existing.count++; else if (inventory.length < maxSize) inventory.push({ type, count: 1 }); this.game.uiManager.soundManager.play('powerup'); }
    activateSpecial(slotIndex: number): void {
        if (slotIndex < 0 || slotIndex >= this.specialInventory.length) return;
        const special = this.specialInventory[slotIndex];
        if (!special) return;

        if (special.type === 'BLACK_HOLE') {
            const p = this.game.player!;
            this.game.addEntity(new BlackHoleProjectile(this.game, p.pos.x + p.width/2, p.pos.y, 0, -600));
            this.game.uiManager.soundManager.play('missileLaunch');
        } else {
            this.activate(special.type);
        }

        special.count--;
        if (special.count <= 0) {
            this.specialInventory.splice(slotIndex, 1);
        }
    }
    activateUltra(slotIndex: number): void {
        if (slotIndex < 0 || slotIndex >= this.ultraInventory.length) return;
        const ultra = this.ultraInventory[slotIndex];
        if (!ultra) return;

        if (this.ultraWeapon) {
            this.deactivate(this.ultraWeapon);
        }
        
        this.activate(ultra.type);
        ultra.count--;
        if (ultra.count <= 0) {
            this.ultraInventory.splice(slotIndex, 1);
        }
    }
    activate(type: string, duration?: number): void {
        const W_ULTRA_DURATIONS: {[key: string]: number} = {'LASER_BEAM': 10000, 'HOMING_MISSILES': 15000};
        const W_TEMP_DURATIONS: {[key: string]: number} = {'SIDE_SHOTS': 15000, 'RAPID_FIRE': 30000};
        const D = ['SHIELD', 'REPAIR_KIT', 'EXTRA_LIFE', 'GHOST_PROTOCOL'];
        const Z = ['NUKE', 'SCORE_BOOST'];

        if (type === 'ORBITAL_DRONE') {
            if (this.player.drones.length < 3) {
                const droneTier = this.player.drones.length + 1;
                this.player.drones.push(new Drone(this.game, droneTier, this.player.drones.length));
                this.player.drones.forEach((drone, index) => drone.updateIndex(index));
            }
            this.timers['ORBITAL_DRONE'] = 30000;
        }
        else if (type === 'WEAPON_UP') { if (this.weaponTier < 4) this.weaponTier++; this.setWeaponTierTimer(); }
        else if (Object.keys(W_TEMP_DURATIONS).includes(type)) this.timers[type] = duration ?? W_TEMP_DURATIONS[type]!;
        else if (Object.keys(W_ULTRA_DURATIONS).includes(type)) { this.ultraWeapon = type; this.timers[type] = duration ?? W_ULTRA_DURATIONS[type]!; }
        else if (D.includes(type)) { if (type === 'EXTRA_LIFE') { if (this.player.lives < this.player.maxLives) this.player.lives++; } else if (type === 'REPAIR_KIT') this.player.energy = 100; else this.timers[type] = duration ?? 15000; }
        else if (Z.includes(type)) { if (type === 'NUKE') { this.game.entities.filter(e => e.family === 'enemy' && !(e as Enemy).isBoss).forEach(e => (e as Enemy).takeHit(9999)); this.game.addEntity(new NukeEffect(this.game)); this.game.triggerScreenShake(50); } else if (type === 'SCORE_BOOST') this.timers[type] = 20000; }
        this.game.uiManager.soundManager.play('powerup');
    }
    shoot(): void {
        const p = this.player; p.fireCooldown = this.isActive('RAPID_FIRE') ? 75 : 150;
        if (this.ultraWeapon) {
            switch (this.ultraWeapon) {
                case 'LASER_BEAM': if (!p.laser || !p.laser.isAlive()) { p.laser = new LaserBeam(this.game, p); this.game.addEntity(p.laser); } p.fireCooldown = 0; return;
                case 'HOMING_MISSILES': this.game.addEntity(new HomingMissile(this.game, p.pos.x + p.width/2, p.pos.y)); p.fireCooldown = 400; this.game.uiManager.soundManager.play('missileLaunch'); return;
            }
        }
        const x = p.pos.x, y = p.pos.y, w = p.width, h = p.height; const velY = -600;
        switch (this.weaponTier) {
            case 1: this.game.addEntity(new Projectile(this.game, x + w / 2, y)); break;
            case 2: this.game.addEntity(new Projectile(this.game, x + w * 0.2, y)); this.game.addEntity(new Projectile(this.game, x + w * 0.8, y)); break;
            case 3: this.game.addEntity(new Projectile(this.game, x + w / 2, y, 0, velY)); const angle15 = 15 * (Math.PI/180); this.game.addEntity(new Projectile(this.game, x + w / 2, y, Math.sin(-angle15) * Math.abs(velY), Math.cos(-angle15) * velY)); this.game.addEntity(new Projectile(this.game, x + w / 2, y, Math.sin(angle15) * Math.abs(velY), Math.cos(angle15) * velY)); break;
            case 4: this.game.addEntity(new Projectile(this.game, x + w * 0.1, y, -150, velY)); this.game.addEntity(new Projectile(this.game, x + w * 0.9, y, 150, velY)); this.game.addEntity(new Projectile(this.game, x + w * 0.3, y)); this.game.addEntity(new Projectile(this.game, x + w * 0.7, y)); break;
        }
        if (this.isActive('SIDE_SHOTS')) { this.game.addEntity(new Projectile(this.game, x, y + h / 2, -300, 0)); this.game.addEntity(new Projectile(this.game, x + w, y + h / 2, 300, 0)); }
        this.game.uiManager.soundManager.play('shoot');
    }
}

class Projectile extends EntityFamily { public vel: Vector2D; public damage: number = 1; constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -600) { super(game, x - 2.5, y, 5, 20, 'projectile', 'PROJECTILE'); this.vel = new Vector2D(velX, velY); } update(dt: number): void { const dt_s = dt / 1000; this.pos.x += this.vel.x * dt_s; this.pos.y += this.vel.y * dt_s; if (this.pos.y < -this.height || this.pos.y > this.game.height || this.pos.x < -this.width || this.pos.x > this.game.width) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#0ff'; ctx.shadowColor = '#0ff'; ctx.shadowBlur = 5; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } onHit(e: Enemy): void { this.destroy(); } }

class HeavyProjectile extends Projectile {
    constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -600) {
        super(game, x, y, velX, velY);
        this.pos.x = x - 4;
        this.width = 8;
        this.height = 22;
        this.damage = 2.5;
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFA500';
        ctx.shadowBlur = 8;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }
}

class PiercingProjectile extends Projectile {
    private hitEnemies: Enemy[] = [];
    constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -700) {
        super(game, x, y, velX, velY);
        this.pos.x = x - 3;
        this.width = 6;
        this.height = 25;
        this.damage = 0.8;
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.fillStyle = '#9400D3';
        ctx.shadowColor = '#EE82EE';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }
    onHit(e: Enemy): void {
        this.hitEnemies.push(e);
    }
    hasHit(e: Enemy): boolean {
        return this.hitEnemies.includes(e);
    }
}

class BlackHoleProjectile extends Projectile {
    constructor(game: Game, x: number, y: number, velX: number, velY: number) {
        super(game, x - 10, y - 10, velX, velY);
        this.width = 20;
        this.height = 20;
        this.type = 'BLACK_HOLE_PROJECTILE';
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.fillStyle = '#9400D3';
        ctx.shadowColor = '#EE82EE';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    onHit(e: Enemy): void {
        this.game.addEntity(new BlackHole(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2));
        this.destroy();
    }
}

class LaserBeam extends EntityFamily { public player: Player; public damage: number = 0.2; private soundCooldown: number = 0; constructor(game: Game, player: Player) { super(game, 0, 0, 15, game.height, 'projectile', 'LASER_BEAM'); this.player = player; } update(dt: number): void { if (!this.player.isAlive() || !this.player.powerUpManager.isActive('LASER_BEAM')) { this.destroy(); return; } this.pos.x = this.player.pos.x + this.player.width / 2 - this.width / 2; this.height = this.player.pos.y; this.soundCooldown -= dt; if(this.soundCooldown <= 0) { this.game.uiManager.soundManager.play('laser'); this.soundCooldown = 100; } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const x = this.pos.x, y = 0, w = this.width, h = this.height; const grad = ctx.createLinearGradient(x, y, x + w, y); grad.addColorStop(0, 'rgba(255,0,0,0)'); grad.addColorStop(0.3, 'rgba(255,100,100,0.8)'); grad.addColorStop(0.5, 'white'); grad.addColorStop(0.7, 'rgba(255,100,100,0.8)'); grad.addColorStop(1, 'rgba(255,0,0,0)'); ctx.fillStyle = grad; ctx.fillRect(x, y, w, h); ctx.restore(); } }
class HomingMissile extends Projectile { private target: Enemy | null = null; private searchCooldown: number = 0; private lifetime: number = 5000; constructor(game: Game, x: number, y: number) { super(game, x, y, (Math.random() - 0.5) * 200, -300); this.type = 'HOMING_MISSILE'; this.damage = 3; this.width = 8; this.height = 16; } findTarget(): void { const enemies = this.game.entities.filter(e => e.family === 'enemy' && e.isAlive()) as Enemy[]; if (enemies.length === 0) { this.target = null; return; } let closestEnemy: Enemy | null = null; let minDistance = Infinity; enemies.forEach(enemy => { const dist = Math.hypot(this.pos.x - (enemy.pos.x + enemy.width / 2), this.pos.y - (enemy.pos.y + enemy.height / 2)); if (dist < minDistance) { minDistance = dist; closestEnemy = enemy; } }); this.target = closestEnemy; } update(dt: number): void { this.lifetime -= dt; this.searchCooldown -= dt; if (this.searchCooldown <= 0) { this.findTarget(); this.searchCooldown = 500; } if (this.target && this.target.isAlive()) { const speed = 400; const turnFactor = 5; const dt_s = dt / 1000; const targetX = this.target.pos.x + this.target.width / 2; const targetY = this.target.pos.y + this.target.height / 2; const desiredVelX = targetX - this.pos.x; const desiredVelY = targetY - this.pos.y; const mag = Math.hypot(desiredVelX, desiredVelY); const normalizedDesiredVelX = mag > 0 ? (desiredVelX / mag) * speed : 0; const normalizedDesiredVelY = mag > 0 ? (desiredVelY / mag) * speed : 0; this.vel.x += (normalizedDesiredVelX - this.vel.x) * turnFactor * dt_s; this.vel.y += (normalizedDesiredVelY - this.vel.y) * turnFactor * dt_s; } super.update(dt); if (this.lifetime <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2); const angle = Math.atan2(this.vel.y, this.vel.x) + Math.PI / 2; ctx.rotate(angle); ctx.fillStyle = '#ff9900'; ctx.shadowColor = '#ff5722'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.moveTo(0, -this.height / 2); ctx.lineTo(-this.width / 2, this.height / 2); ctx.lineTo(this.width / 2, this.height / 2); ctx.closePath(); ctx.fill(); const flameSize = Math.random() * 8 + 4; ctx.fillStyle = '#ff5722'; ctx.beginPath(); ctx.moveTo(0, this.height / 2); ctx.lineTo(-this.width / 2 + 2, this.height / 2 + flameSize / 2); ctx.lineTo(0, this.height / 2 + flameSize); ctx.lineTo(this.width / 2 - 2, this.height / 2 + flameSize / 2); ctx.closePath(); ctx.fill(); ctx.restore(); } }
class Enemy extends EntityFamily { public baseHealth: number; public health: number; public maxHealth: number; public pointsValue: number; public stunTimer: number = 0; public speed: number = 90; public isBoss: boolean = false; public collisionDamage: number = 35; constructor(game: Game, x: number, y: number, w: number, h: number, health: number, points: number, type: string) { super(game, x, y, w, h, 'enemy', type); this.baseHealth = health; this.health = this.baseHealth * game.enemyHealthMultiplier; this.maxHealth = this.health; this.pointsValue = points; } takeHit(damage: number): void { if (!this.isAlive()) return; this.health -= damage; if (this.health <= 0) { this.destroy(); let scoreToAdd = this.pointsValue * this.game.level; if (this.game.player && this.game.player.powerUpManager.isActive('SCORE_BOOST')) scoreToAdd *= 2; this.game.score += scoreToAdd; this.game.scoreEarnedThisLevel += scoreToAdd; if (this.isBoss) { this.game.isBossActive = false; this.game.changeState('LEVEL_START'); this.game.triggerScreenShake(40); } else { this.game.triggerScreenShake(2); } if (this.game.uiManager.settings.particles > 0) this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2)); if (Math.random() < 0.2) this.game.addEntity(new Coin(this.game, this.pos.x, this.pos.y, this.pointsValue)); if (Math.random() < 0.15) this.game.addEntity(new PowerUp(this.game, this.pos.x, this.pos.y)); this.game.uiManager.soundManager.play('enemyExplosion'); } } update(dt: number): void { if (this.stunTimer > 0) { this.stunTimer -= dt; return; } const dt_s = dt / 1000; this.pos.y += this.speed * dt_s; if (this.pos.y > this.game.height) this.destroy(); } stun(duration: number): void { this.stunTimer = duration; } drawHealthBar(ctx: CanvasRenderingContext2D): void { if (this.health < this.maxHealth && !this.isBoss) { ctx.save(); ctx.fillStyle = '#500'; ctx.fillRect(this.pos.x, this.pos.y - 10, this.width, 5); ctx.fillStyle = '#f00'; ctx.fillRect(this.pos.x, this.pos.y - 10, this.width * (this.health / this.maxHealth), 5); ctx.restore(); } } }
class Grunt extends Enemy { private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 60), -54, 60, 54, 1, 10, 'GRUNT'); this.speed = 100 * game.enemySpeedMultiplier; this.collisionDamage = 35; this.image = gruntImg; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
class Tank extends Enemy { private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 100), -96, 100, 96, 3, 30, 'TANK'); this.speed = 60 * game.enemySpeedMultiplier; this.collisionDamage = 50; this.image = tankImg; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
class Weaver extends Enemy { private angle: number; private hSpeed: number; private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 55), -46, 55, 46, 1, 20, 'WEAVER'); this.speed = 80 * game.enemySpeedMultiplier; this.angle = Math.random() * Math.PI * 2; this.hSpeed = (Math.random() * 2 + 1) * 60; this.collisionDamage = 35; this.image = weaverImg; } update(dt: number): void { const dt_s = dt / 1000; super.update(dt); this.angle += 3 * dt_s; this.pos.x += Math.sin(this.angle) * this.hSpeed * dt_s; if (this.pos.x < 0 || this.pos.x > this.game.width - this.width) { this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width)); this.hSpeed *= -1; } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
class Shooter extends Enemy { private fireCooldown: number; private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 52), -52, 52, 52, 2, 50, 'SHOOTER'); this.speed = 70 * game.enemySpeedMultiplier; this.fireCooldown = Math.random() * 1000 + 1500; this.collisionDamage = 50; this.image = shooterImg; } update(dt: number): void { super.update(dt); this.fireCooldown -= dt; if (this.fireCooldown <= 0 && this.pos.y > 0) { this.game.addEntity(new EnemyProjectile(this.game, this.pos.x + this.width / 2, this.pos.y + this.height)); this.fireCooldown = 2000; } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }

// --- NEUE BOSS KLASSEN ---

// BOSS 1: Der Koloss „Sentinel Prime“
class BossSentinelPrime extends Enemy {
    private attackPattern: number = 0;
    private attackTimer: number = 5000;
    private movementPattern: string = 'ENTER';
    private hSpeed: number;
    private image: HTMLImageElement;
    private patrolY: number = 50;

    // Platzhalter für Rotationsanimation der Antennen
    private antennaAngle: number = 0;
    private antennaRotationSpeed: number = 0.8; // rad/s

    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 150, -200, 300, 180, health, 5000, 'BOSS_SENTINEL_PRIME');
        this.isBoss = true;
        this.hSpeed = 80 * speedMultiplier;
        this.image = bossSentinelPrimeImg;
        this.collisionDamage = 75;
    }

    update(dt: number): void {
        const dt_s = dt / 1000;
        this.antennaAngle += this.antennaRotationSpeed * dt_s; // Antennen rotieren lassen

        if (this.movementPattern === 'ENTER') {
            this.pos.y += 100 * dt_s;
            if (this.pos.y >= this.patrolY) {
                this.pos.y = this.patrolY;
                this.movementPattern = 'PATROL';
            }
        } else if (this.movementPattern === 'PATROL') {
            this.pos.x += this.hSpeed * dt_s;
            if (this.pos.x < 0 || this.pos.x > this.game.width - this.width) {
                this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width));
                this.hSpeed *= -1;
            }
        }

        this.attackTimer -= dt;
        if (this.attackTimer <= 0 && this.movementPattern === 'PATROL') {
            this.attackPattern = (this.attackPattern + 1) % 3;
            this.attackTimer = Math.max(2000, 5000 - this.game.level * 100);
            const x = this.pos.x, y = this.pos.y, w = this.width, h = this.height;
            switch (this.attackPattern) {
                case 0: for (let i = 0; i < 10; i++) this.game.addEntity(new EnemyProjectile(this.game, x + (i * w / 9), y + h, 0, 360, this.collisionDamage)); break;
                case 1: for (let i = 0; i < 3; i++) setTimeout(() => this.game.addEntity(new Grunt(this.game)), i * 300); break;
                case 2: for (let i = 0; i < 12; i++) { const angle = i * Math.PI / 6; this.game.addEntity(new EnemyProjectile(this.game, x + w / 2, y + h / 2, Math.cos(angle) * 240, Math.sin(angle) * 240, this.collisionDamage)); } break;
            }
        }
    }
    
    // Die draw-Methode könnte erweitert werden, um rotierende Teile zu zeichnen.
    // Aktuell wird nur das Hauptbild gezeichnet.
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }
}

// BOSS 2: Der Leviathan „Void Serpent“
class BossVoidSerpent extends Enemy {
    private image: HTMLImageElement;
    private attackTimer: number = 4000;
    private angle: number = 0;
    private verticalSpeed: number = 40;
    private horizontalWaveSpeed: number = 1.5;
    private horizontalWaveAmplitude: number = 80;

    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 175, -220, 350, 200, health, 7500, 'BOSS_VOID_SERPENT');
        this.isBoss = true;
        this.image = bossVoidSerpentImg;
        this.collisionDamage = 90;
        this.speed = 0; // Vertikale Geschwindigkeit wird manuell gesteuert
    }

    update(dt: number): void {
        const dt_s = dt / 1000;
        
        // Anfangsbewegung: nach unten in Position fliegen
        if (this.pos.y < 60) {
            this.pos.y += this.verticalSpeed * dt_s;
        }

        // Wellenförmige horizontale Bewegung
        this.angle += this.horizontalWaveSpeed * dt_s;
        this.pos.x += Math.sin(this.angle) * this.horizontalWaveAmplitude * dt_s;
        
        // Grenzen des Bildschirms einhalten
        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.x > this.game.width - this.width) this.pos.x = this.game.width - this.width;

        // Eigene Angriffslogik für den Serpent
        this.attackTimer -= dt;
        if (this.attackTimer <= 0 && this.pos.y >= 60) {
            this.attackTimer = 3500;
            const x = this.pos.x, y = this.pos.y, w = this.width, h = this.height;
            // Feuert eine Salve von Projektilen in einem Bogen
            for (let i = -2; i <= 2; i++) {
                const angle = i * 0.2; // Winkel in Radiant
                this.game.addEntity(new EnemyProjectile(this.game, x + w / 2, y + h * 0.8, Math.sin(angle) * 300, Math.cos(angle) * 300, this.collisionDamage));
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }
}

// BOSS 3: Der Planetenkiller „Omega Nexus“
class BossOmegaNexus extends Enemy {
    private baseImage: HTMLImageElement;
    private ringImage: HTMLImageElement;
    private attackTimer: number = 6000;
    private ringAngle: number = 0;
    private ringRotationSpeed: number = 0.3; // rad/s

    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 200, -250, 400, 250, health, 10000, 'BOSS_OMEGA_NEXUS');
        this.isBoss = true;
        this.baseImage = bossOmegaNexusBaseImg;
        this.ringImage = bossOmegaNexusRingImg;
        this.collisionDamage = 120;
    }

    update(dt: number): void {
        const dt_s = dt / 1000;
        
        // Ringe rotieren lassen
        this.ringAngle += this.ringRotationSpeed * dt_s;

        // Omega Nexus bewegt sich nur langsam in Position und bleibt dann stehen
        if (this.pos.y < 40) {
            this.pos.y += 30 * dt_s;
        }

        // Eigene Angriffslogik für den Omega Nexus (z.B. ein großer Laser)
        this.attackTimer -= dt;
        if (this.attackTimer <= 0 && this.pos.y >= 40) {
             this.attackTimer = 8000;
             // Feuert einen Schuss in Richtung des Spielers
             if(this.game.player) {
                const p = this.game.player;
                const targetX = p.pos.x + p.width/2;
                const targetY = p.pos.y + p.height/2;
                const selfX = this.pos.x + this.width/2;
                const selfY = this.pos.y + this.height/2;

                const angle = Math.atan2(targetY - selfY, targetX - selfX);
                this.game.addEntity(new EnemyProjectile(this.game, selfX, selfY, Math.cos(angle) * 400, Math.sin(angle) * 400, this.collisionDamage));
             }
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const centerX = this.pos.x + this.width / 2;
        const centerY = this.pos.y + this.height / 2;

        // Basis zeichnen
        ctx.drawImage(this.baseImage, this.pos.x, this.pos.y, this.width, this.height);

        // Rotierenden Ring zeichnen
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.ringAngle);
        ctx.drawImage(this.ringImage, -this.ringImage.width / 2, -this.ringImage.height / 2);
        ctx.restore();
    }
}

class PowerUp extends EntityFamily { 
    public speed: number = 150; 
    public powerUpType: string; 
    constructor(game: Game, x: number, y: number) { 
        super(game, x, y, 38, 38, 'pickup', 'POWERUP'); 
        const W_UPGRADE = ['WEAPON_UP']; 
        const W_TEMP = ['SIDE_SHOTS', 'RAPID_FIRE']; 
        const D = ['SHIELD', 'REPAIR_KIT', 'EXTRA_LIFE', 'GHOST_PROTOCOL', 'ORBITAL_DRONE']; 
        const Z = ['NUKE', 'BLACK_HOLE', 'SCORE_BOOST']; 
        const U = ['LASER_BEAM', 'HOMING_MISSILES']; 
        const allTypes = [...W_UPGRADE, ...W_TEMP, ...D, ...Z, ...U]; 
        this.powerUpType = allTypes[Math.floor(Math.random() * allTypes.length)]!; 
    } 
    update(dt: number): void { this.pos.y += this.speed * (dt / 1000); if (this.pos.y > this.game.height) this.destroy(); } 
    draw(ctx: CanvasRenderingContext2D): void { const image = powerUpImages[this.powerUpType]; if (image) { ctx.save(); ctx.drawImage(image, this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } } 
    onCollect(): void { 
        this.destroy(); 
        if (this.game.player) { 
            const Z = ['NUKE', 'BLACK_HOLE', 'SCORE_BOOST']; 
            const U = ['LASER_BEAM', 'HOMING_MISSILES']; 
            if(Z.includes(this.powerUpType)) { 
                this.game.player.powerUpManager.collectSpecial(this.powerUpType); 
            } else if (U.includes(this.powerUpType)) { 
                this.game.player.powerUpManager.collectUltra(this.powerUpType); 
            } else { 
                this.game.player.powerUpManager.activate(this.powerUpType); 
            } 
        } 
    } 
}
class Coin extends EntityFamily { public value: number; public speed: number = 180; constructor(game: Game, x: number, y: number, value: number) { super(game, x, y, 15, 15, 'pickup', 'COIN'); this.value = value; } update(dt: number): void { this.pos.y += this.speed * (dt / 1000); if (this.pos.y > this.game.height) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#FFDC00'; ctx.beginPath(); ctx.arc(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.width / 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#F39C12'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = "10px 'Press Start 2P'"; ctx.fillText('$', this.pos.x + this.width / 2, this.pos.y + this.height / 2 + 1); ctx.restore(); } onCollect(): void { this.destroy(); if (this.game.player) { const scoreToAdd = this.game.player.isScoreBoosted() ? this.value * 2 : this.value; this.game.score += scoreToAdd; this.game.scoreEarnedThisLevel += scoreToAdd; } } }
class Explosion extends EntityFamily { private particles: IParticle[] = []; constructor(game: Game, x: number, y: number, color: string = '#FFA500', countMultiplier: number = 1) { super(game, x, y, 0, 0, 'effect', 'EXPLOSION'); const count = (this.game.uiManager.settings.particles === 2 ? 20 : (this.game.uiManager.settings.particles === 1 ? 10 : 0)) * countMultiplier; for (let i = 0; i < count; i++) { this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.random() * 360 - 180, Math.random() * 360 - 180), size: Math.random() * 4 + 1, life: 0.7, color: color }); } } update(dt: number): void { const dt_s = dt / 1000; this.particles.forEach(p => { p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); if (this.particles.length === 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.life / 0.7; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); } }
class Particle extends Entity { private vel: Vector2D; private size: number; private life: number; private color: string; private initialLife: number; constructor(game: Game, x: number, y: number, color: string, life: number = 0.5, size: number = 2) { super(game, x, y, 0, 0); this.family = 'effect'; this.type = 'PARTICLE'; this.vel = new Vector2D((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50); this.size = Math.random() * size + 1; this.life = Math.random() * life; this.initialLife = this.life; this.color = color; } update(dt: number): void { const dt_s = dt / 1000; this.pos.x += this.vel.x * dt_s; this.pos.y += this.vel.y * dt_s; this.life -= dt_s; if (this.life <= 0) { this.destroy(); } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.life / this.initialLife; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }

class Drone extends EntityFamily {
    private tier: number;
    private index: number;
    private orbitRadius: number = 75;
    private fireCooldown: number = 0;
    private image: HTMLImageElement;

    constructor(game: Game, tier: number, index: number) {
        super(game, 0, 0, 36, 36, 'player', 'DRONE');
        this.tier = tier;
        this.index = index;
        this.image = orbitalDroneImages[this.tier - 1]!;
    }

    updateIndex(newIndex: number) {
        this.index = newIndex;
    }

    update(dt: number): void {
        if (!this.game.player || !this.game.player.isAlive() || !this.game.player.powerUpManager.isActive('ORBITAL_DRONE')) {
            this.destroy();
            return;
        }

        const totalDrones = this.game.player.drones.length;
        const angleOffset = (2 * Math.PI / totalDrones) * this.index;
        const currentAngle = this.game.player.droneAngle + angleOffset;
        
        const playerPos = this.game.player.pos;
        this.pos.x = playerPos.x + this.game.player.width / 2 + Math.cos(currentAngle) * this.orbitRadius;
        this.pos.y = playerPos.y + this.game.player.height / 2 + Math.sin(currentAngle) * this.orbitRadius;

        this.fireCooldown -= dt;
        if (this.fireCooldown <= 0) {
            this.shoot();
        }
    }
    
    shoot(): void {
        switch (this.tier) {
            case 1:
                this.game.addEntity(new Projectile(this.game, this.pos.x, this.pos.y));
                this.fireCooldown = 600;
                break;
            case 2:
                this.game.addEntity(new HeavyProjectile(this.game, this.pos.x, this.pos.y));
                this.fireCooldown = 500;
                break;
            case 3:
                this.game.addEntity(new PiercingProjectile(this.game, this.pos.x, this.pos.y));
                this.fireCooldown = 400;
                break;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.drawImage(this.image, this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

class NukeEffect extends Entity { private radius: number = 0; private life: number = 1; constructor(game: Game) { super(game, game.width / 2, game.height / 2, 0, 0); this.type = 'EFFECT'; } update(dt: number): void { const dt_s = dt / 1000; this.radius += 1200 * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = `rgba(255,255,255,${this.life})`; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }

class ShockwaveEffect extends Entity {
    private radius: number = 0;
    private life: number = 0.5;
    private initialLife: number = 0.5;
    private color: string;
    constructor(game: Game, x: number, y: number, color: string = '#F0F') {
        super(game, x, y, 0, 0);
        this.family = 'effect';
        this.type = 'SHOCKWAVE';
        this.color = color;
    }
    update(dt: number): void {
        const dt_s = dt / 1000;
        this.radius += 800 * dt_s;
        this.life -= dt_s;
        if (this.life <= 0) this.destroy();
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.globalAlpha = this.life / this.initialLife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class BlackHole extends Entity {
    private life: number = 8000;
    private pullRadius: number = 300;
    private killRadius: number = 20;

    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 0, 0);
        this.type = 'EFFECT';
    }

    update(dt: number): void {
        const dt_s = dt/1000;
        this.life -= dt;
        
        if (this.life <= 0) {
            this.game.entities.forEach(e => {
                const dist = Math.hypot(this.pos.x - (e.pos.x + e.width/2), this.pos.y - (e.pos.y + e.height/2));
                if (dist < this.pullRadius) {
                    if (e instanceof Enemy && e.isBoss) {
                        // Nichts, Bosse werden nicht am Ende zerstört
                    } else if (e instanceof Enemy) {
                        e.takeHit(9999);
                    }
                }
            });
            this.destroy();
            this.game.addEntity(new ShockwaveEffect(this.game, this.pos.x, this.pos.y, '#EE82EE'));
            return; 
        }

        this.game.entities.forEach(e => {
            if (e.family === 'enemy' || e.family === 'pickup') {
                const dist = Math.hypot(this.pos.x - (e.pos.x + e.width/2), this.pos.y - (e.pos.y + e.height/2));
                
                if (dist < this.pullRadius) {
                    if (e instanceof Enemy && !e.isBoss) {
                        e.stun(50); 
                    }

                    const angle = Math.atan2(this.pos.y - e.pos.y, this.pos.x - e.pos.x);
                    const pullSpeed = 180 * (1 - dist / this.pullRadius);
                    e.pos.x += Math.cos(angle) * pullSpeed * dt_s;
                    e.pos.y += Math.sin(angle) * pullSpeed * dt_s;
                    
                    if (dist < this.killRadius) {
                        if (e instanceof Enemy && !e.isBoss) { e.takeHit(9999); }
                        else if (!(e instanceof Enemy)) { e.destroy(); }
                    }
                }
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.killRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f0f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.pullRadius * (this.life / 8000), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class EnemyProjectile extends Projectile { public playerDamage: number; constructor(game: Game, x: number, y: number, vX: number = 0, vY: number = 360, playerDamage: number = 25) { super(game, x, y, vX, vY); this.type = 'ENEMY_PROJECTILE'; this.width = 5; this.height=10; this.playerDamage = playerDamage; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#FF4136'; ctx.shadowColor = '#FF4136'; ctx.shadowBlur = 5; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } }
class SoundManager { public audioCtx: AudioContext | null = null; private masterGain: GainNode | null = null; public uiManager: UIManager; private musicPlaying: boolean = false; private musicScheduler: number | null = null; private currentStep: number = 0; private readonly bpm: number = 160; private readonly stepsPerBeat: number = 4; private readonly totalSteps: number = 64; private stepDuration: number; private scheduleAheadTime: number = 0.1; private nextNoteTime: number = 0.0; private currentTrack: 'normal' | 'boss' = 'normal'; private leadMelody: number[] = []; private bassLine: number[] = []; private arpeggioMelody: number[] = []; private kickPattern: boolean[] = []; private snarePattern: boolean[] = []; private hihatPattern: boolean[] = []; private bossLeadMelody: number[] = []; private bossBassLine: number[] = []; private bossArpeggioMelody: number[] = []; private bossKickPattern: boolean[] = []; private bossSnarePattern: boolean[] = []; private bossHihatPattern: boolean[] = []; constructor(uiManager: UIManager) { this.uiManager = uiManager; this.stepDuration = 60.0 / this.bpm / this.stepsPerBeat; this.defineMusicPatterns(); this.defineBossMusicPatterns(); } public initAudio(): void { if (this.audioCtx) return; try { this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)(); this.masterGain = this.audioCtx.createGain(); this.masterGain.connect(this.audioCtx.destination); this.setVolume(this.uiManager.settings.masterVolume); this.toggleMusic(this.uiManager.settings.music); } catch (e) { console.error("Web Audio API is not supported", e); } } defineMusicPatterns() { const Notes = { C2: 65.41, G2: 98.00, Ab2: 103.83, Eb2: 77.78, C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.00, Ab3: 207.65, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.00, Ab4: 415.30, Bb4: 466.16 }; const R = 0; this.leadMelody = [ Notes.G4, R, Notes.Eb4, R, Notes.G4, R, Notes.F4, R, Notes.Eb4, R, Notes.D4, R, Notes.C4, R, R, R, Notes.G4, R, Notes.Eb4, R, Notes.G4, R, Notes.F4, R, Notes.G4, Notes.Ab4, Notes.G4, Notes.F4, Notes.Eb4, R, R, R, Notes.Ab4, R, Notes.F4, R, Notes.Ab4, R, Notes.G4, R, Notes.F4, R, Notes.Eb4, R, Notes.C4, R, Notes.Eb4, R, Notes.G4, Notes.F4, Notes.Eb4, R, Notes.D4, R, Notes.C4, R, Notes.C4, R, R, R, R, R, R, R, ]; this.bassLine = [ ...Array(16).fill(Notes.C2), ...Array(16).fill(Notes.G2), ...Array(16).fill(Notes.Ab2), ...Array(16).fill(Notes.Eb2) ]; const ArpCm = [Notes.C4, Notes.Eb4, Notes.G4, Notes.Eb4]; const ArpGm = [Notes.G3, Notes.Bb3, Notes.D4, Notes.Bb3]; const ArpAb = [Notes.Ab3, Notes.C4, Notes.Eb4, Notes.C4]; const ArpEb = [Notes.Eb3, Notes.G3, Notes.Bb3, Notes.G3]; this.arpeggioMelody = [ ...ArpCm, ...ArpCm, ...ArpCm, ...ArpCm, ...ArpGm, ...ArpGm, ...ArpGm, ...ArpGm, ...ArpAb, ...ArpAb, ...ArpAb, ...ArpAb, ...ArpEb, ...ArpEb, ...ArpEb, ...ArpEb ]; const K = true, S = true, H = true, o = false; this.kickPattern =  [K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,o,o, K,o,K,o, K,o,o,o]; this.snarePattern = [o,o,o,o, S,o,o,o, o,o,o,o, S,o,o,o, o,o,o,o, S,o,o,o, o,o,o,o, S,o,o,o, o,o,o,o, S,o,o,o, o,o,o,o, S,o,o,o, o,o,o,o, S,o,o,o, o,o,S,o, S,o,S,o]; this.hihatPattern = [H,o,H,o, H,o,H,o, H,o,H,o, H,o,H,o, H,o,H,o, H,o,H,o, H,o,H,o, H,o,H,o, H,H,H,H, H,H,H,H, H,H,H,H, H,H,H,H, H,o,H,o, H,o,H,o, H,H,H,o, H,H,H,o]; } defineBossMusicPatterns() { const Notes = { A2: 110.00, E2: 82.41, F2: 87.31, G2: 98.00, A3: 220.00, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, Gs4: 415.30, A4: 440.00, }; const R = 0; this.bossLeadMelody = [ Notes.A4, Notes.A4, R, Notes.Gs4, R, Notes.A4, R, Notes.E4, Notes.F4, Notes.F4, R, Notes.E4, R, Notes.D4, R, Notes.C4, Notes.A4, Notes.A4, R, Notes.Gs4, R, Notes.A4, R, Notes.E4, Notes.F4, R, Notes.E4, R, Notes.D4, R, Notes.C4, R, Notes.A4, Notes.A4, R, Notes.Gs4, R, Notes.A4, R, Notes.E4, Notes.F4, Notes.F4, R, Notes.E4, R, Notes.D4, R, Notes.C4, Notes.B3, Notes.C4, Notes.D4, Notes.E4, Notes.F4, Notes.E4, Notes.D4, Notes.C4, Notes.B3, R, R, R, R, R, R, R, ]; this.bossBassLine = [...Array(16).fill(Notes.A2),...Array(16).fill(Notes.G2),...Array(16).fill(Notes.F2),...Array(16).fill(Notes.E2)]; const ArpAm = [Notes.A3, Notes.C4, Notes.E4, Notes.C4]; const ArpG = [Notes.G2, Notes.B3, Notes.D4, Notes.B3]; const ArpF = [Notes.F2, Notes.A3, Notes.C4, Notes.A3]; const ArpE = [Notes.E2, Notes.Gs4, Notes.B3, Notes.Gs4]; this.bossArpeggioMelody = [...ArpAm,...ArpAm,...ArpAm,...ArpAm,...ArpG,...ArpG,...ArpG,...ArpG,...ArpF,...ArpF,...ArpF,...ArpF,...ArpE,...ArpE,...ArpE,...ArpE]; const K = true, S = true, H = true, o = false; const repeat = (p: boolean[], t: number) => Array(t).fill(p).flat(); this.bossKickPattern  = repeat([K,K,o,o, K,o,o,o, K,K,o,o, K,o,o,K], 4); this.bossSnarePattern = repeat([o,o,o,o, S,o,o,o, o,o,o,o, S,o,S,o], 4); this.bossHihatPattern = repeat([H,H,H,H, H,H,H,H, H,H,H,H, H,H,H,H], 4); } setTrack(trackName: 'normal' | 'boss') { if (!this.audioCtx || this.currentTrack === trackName) return; this.currentTrack = trackName; if (this.musicPlaying) { this.currentStep = 0; this.nextNoteTime = this.audioCtx.currentTime; } } playNote(freq: number, time: number, duration: number, type: OscillatorType, volMultiplier: number = 1) { if (!this.audioCtx || !this.masterGain || freq === 0) return; const osc = this.audioCtx.createOscillator(); const gain = this.audioCtx.createGain(); osc.connect(gain); gain.connect(this.masterGain); osc.type = type; osc.frequency.setValueAtTime(freq, time); const noteVol = volMultiplier * this.uiManager.settings.masterVolume; gain.gain.setValueAtTime(noteVol, time); gain.gain.exponentialRampToValueAtTime(0.0001, time + duration); osc.start(time); osc.stop(time + duration); } playDrum(type: 'kick' | 'snare' | 'hihat', time: number) { if (!this.audioCtx || !this.masterGain) return; const noiseSource = this.audioCtx.createBufferSource(); const bufferSize = this.audioCtx.sampleRate * 0.2; const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate); const data = buffer.getChannelData(0); for(let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; } noiseSource.buffer = buffer; const filter = this.audioCtx.createBiquadFilter(); const gain = this.audioCtx.createGain(); noiseSource.connect(filter); filter.connect(gain); gain.connect(this.masterGain); const drumVol = this.uiManager.settings.masterVolume; let duration = 0.1, vol = drumVol; switch(type) { case 'kick': filter.type = 'lowpass'; filter.frequency.setValueAtTime(120, time); vol *= 1; duration = 0.15; break; case 'snare': filter.type = 'highpass'; filter.frequency.setValueAtTime(1500, time); vol *= 0.8; duration = 0.1; break; case 'hihat': filter.type = 'highpass'; filter.frequency.setValueAtTime(8000, time); vol *= 0.4; duration = 0.05; break; } gain.gain.setValueAtTime(vol, time); gain.gain.exponentialRampToValueAtTime(0.001, time + duration); noiseSource.start(time); noiseSource.stop(time + duration); } scheduler() { if (!this.audioCtx || !this.musicPlaying) return; while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) { let lead, arp, bass, kick, snare, hihat; if (this.currentTrack === 'boss') { [lead, arp, bass, kick, snare, hihat] = [this.bossLeadMelody, this.bossArpeggioMelody, this.bossBassLine, this.bossKickPattern, this.bossSnarePattern, this.bossHihatPattern]; } else { [lead, arp, bass, kick, snare, hihat] = [this.leadMelody, this.arpeggioMelody, this.bassLine, this.kickPattern, this.snarePattern, this.hihatPattern]; } this.playNote(lead[this.currentStep]!, this.nextNoteTime, this.stepDuration * 0.9, 'square', 0.15); this.playNote(arp[this.currentStep]!, this.nextNoteTime, this.stepDuration, 'square', 0.07); if (this.currentStep % 2 === 0) { this.playNote(bass[this.currentStep]!, this.nextNoteTime, this.stepDuration * 1.8, 'triangle', 0.3); } if (kick[this.currentStep]) this.playDrum('kick', this.nextNoteTime); if (snare[this.currentStep]) this.playDrum('snare', this.nextNoteTime); if (hihat[this.currentStep]) this.playDrum('hihat', this.nextNoteTime); this.nextNoteTime += this.stepDuration; this.currentStep = (this.currentStep + 1) % this.totalSteps; } } toggleMusic(shouldPlay: boolean): void { if (!this.audioCtx) return; this.musicPlaying = shouldPlay; if (this.musicPlaying && this.musicScheduler === null) { this.currentStep = 0; this.nextNoteTime = this.audioCtx.currentTime; this.musicScheduler = window.setInterval(() => this.scheduler(), 25); } else if (!this.musicPlaying && this.musicScheduler !== null) { clearInterval(this.musicScheduler); this.musicScheduler = null; } } setVolume(volume: number) { if (this.masterGain && this.audioCtx) { this.masterGain.gain.setValueAtTime(volume, this.audioCtx.currentTime); } } play(soundName: string) { if (!this.audioCtx || !this.masterGain || !this.uiManager.settings.sfx) return; let freq = 440, duration = 0.1, type: OscillatorType = 'sine', vol = 1; switch (soundName) { case 'shoot': freq = 880; duration = 0.05; type = 'triangle'; vol = 0.4; break; case 'missileLaunch': freq = 220; duration = 0.3; type = 'sawtooth'; break; case 'playerHit': freq = 200; duration = 0.2; type = 'square'; break; case 'playerExplosion': freq = 100; duration = 0.5; type = 'sawtooth'; break; case 'enemyExplosion': freq = 150; duration = 0.15; type = 'sawtooth'; vol = 0.5; break; case 'laser': freq = 1500; duration = 0.1; type = 'sawtooth'; vol = 0.3; break; case 'powerup': freq = 1200; duration = 0.1; type = 'sine'; break; case 'shieldDown': freq = 300; duration = 0.2; type = 'square'; break; } const oscillator = this.audioCtx.createOscillator(); const gainNode = this.audioCtx.createGain(); oscillator.connect(gainNode); gainNode.connect(this.masterGain); oscillator.type = type; oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime); gainNode.gain.setValueAtTime(vol * this.uiManager.settings.masterVolume, this.audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration); oscillator.start(this.audioCtx.currentTime); oscillator.stop(this.audioCtx.currentTime + duration); } }
class LocalizationManager { private currentLanguage: string = 'en'; private translations: { [lang: string]: { [key: string]: string } } = translations; constructor() { this.setLanguage(localStorage.getItem('galaxyFallLanguage') || 'en'); } setLanguage(lang: string): void { this.currentLanguage = this.translations[lang] ? lang : 'en'; localStorage.setItem('galaxyFallLanguage', this.currentLanguage); } translate(key: string): string { return this.translations[this.currentLanguage]?.[key] || this.translations['en']?.[key] || key; } getPowerUpSymbol(type: string): string { const symbols: { [key: string]: string } = { 'WEAPON_UP': 'W+', 'SIDE_SHOTS': 'W<>', 'RAPID_FIRE': 'RF', 'LASER_BEAM': 'L', 'HOMING_MISSILES': 'H', 'SHIELD': 'S', 'REPAIR_KIT': 'R', 'EXTRA_LIFE': '+', 'GHOST_PROTOCOL': 'G', 'ORBITAL_DRONE': 'O', 'NUKE': 'N', 'BLACK_HOLE': 'B', 'SCORE_BOOST': '$' }; return symbols[type] || '?'; } applyTranslationsToUI(): void { document.querySelectorAll<HTMLElement>('[data-translate-key]').forEach(el => { const key = el.dataset.translateKey; if (key) el.textContent = this.translate(key); }); } }

class UIManager {
    public game: Game; private ctx: CanvasRenderingContext2D; private scoreEl: HTMLElement; private levelEl: HTMLElement;
    private highscoreEl: HTMLElement; private specialInventoryEl: HTMLElement; private ultraInventoryEl: HTMLElement;
    private livesDisplay: HTMLElement; private weaponStatusEl: HTMLElement;
    private energyBarEl: HTMLElement; private menuContainer: HTMLElement; private langSelectScreen: HTMLElement;
    private langBackButton: HTMLElement; private tabButtons: { [key: string]: HTMLButtonElement };
    private tabPanes: { [key: string]: HTMLElement }; public settings: { masterVolume: number; music: boolean; sfx: boolean; particles: number; screenShake: boolean; };
    public soundManager: SoundManager; public localizationManager: LocalizationManager; private langSelectSource: 'startup' | 'settings' = 'startup';
    constructor(game: Game, ui: IUIElements) {
        this.game = game; this.ctx = game.ctx; this.scoreEl = ui.score; this.levelEl = ui.level; this.highscoreEl = ui.highscore;
        this.specialInventoryEl = ui.specialInventory; this.ultraInventoryEl = ui.ultraInventory; this.livesDisplay = ui.livesDisplay;
        this.weaponStatusEl = ui.weaponStatus; this.energyBarEl = ui.energyBar;
        this.menuContainer = document.getElementById('menu-container')!; this.langSelectScreen = document.getElementById('language-select-screen')!;
        this.langBackButton = document.getElementById('lang-back-button')!;
        this.tabButtons = { spiel: document.getElementById('tab-spiel')! as HTMLButtonElement, arsenal: document.getElementById('tab-arsenal')! as HTMLButtonElement, gegner: document.getElementById('tab-gegner')! as HTMLButtonElement, einstellungen: document.getElementById('tab-einstellungen')! as HTMLButtonElement, };
        this.tabPanes = { spiel: document.getElementById('spiel-view')!, arsenal: document.getElementById('arsenal-view')!, gegner: document.getElementById('gegner-view')!, einstellungen: document.getElementById('einstellungen-view')!, };
        this.settings = this.loadSettings(); this.localizationManager = new LocalizationManager(); this.soundManager = new SoundManager(this); this.initButtons();
    }
    update(): void {
        this.scoreEl.textContent = this.game.score.toString();
        this.levelEl.textContent = this.game.level > this.game.levelDefinitions.length ? 'MAX' : this.game.level.toString();
        if (this.game.isPaused) {
            this.highscoreEl.textContent = this.game.highscore.toString();
        }
        if (!this.game.player || !this.game.player.isAlive()) {
            this.specialInventoryEl.innerHTML = ''; this.ultraInventoryEl.innerHTML = ''; this.livesDisplay.innerHTML = '';
            this.weaponStatusEl.innerHTML = ''; this.energyBarEl.style.width = '0%'; return;
        }
        this.livesDisplay.innerHTML = `<div class="life-icon"></div><span>x${this.game.player.lives}</span>`;
        this.energyBarEl.style.width = `${this.game.player.energy}%`;
        this.updateInventoryUI(this.specialInventoryEl, this.game.player.powerUpManager.specialInventory, 3, 1);
        this.updateInventoryUI(this.ultraInventoryEl, this.game.player.powerUpManager.ultraInventory, 2, 4);
        this.updateWeaponStatusUI();
    }
    updateInventoryUI(element: HTMLElement, inventory: IInventoryItem[], maxSize: number, keyStart: number): void {
        let html = '';
        for (let i = 0; i < maxSize; i++) {
            const item = inventory[i]; const key = keyStart + i;
            if (item) {
                const imageSrc = powerUpImageSources[item.type];
                html += `<div class="inventory-slot"><div class="slot-key">${key}</div><img src="${imageSrc}" class="slot-image" alt="${item.type}"/>${item.count > 1 ? `<div class="slot-count">x${item.count}</div>` : ''}</div>`;
            } else { html += `<div class="inventory-slot"><div class="slot-key">${key}</div></div>`; }
        }
        element.innerHTML = html;
    }
    updateWeaponStatusUI(): void { if (!this.game.player) return; const pm = this.game.player.powerUpManager; let text = `W-Tier: ${pm.weaponTier}`; let timer = pm.weaponTierTimer; if (timer > 0 && pm.weaponTier > 1) { const seconds = Math.ceil(timer / 1000); text += ` <span class="${seconds <= 5 ? 'timer-warning' : ''}">(${seconds}s)</span>`; } let activeBuffs = ''; if (pm.isActive('RAPID_FIRE')) activeBuffs += ` RF(${Math.ceil(pm.timers['RAPID_FIRE']!/1000)}s)`; if (pm.isActive('SIDE_SHOTS')) activeBuffs += ` W&lt;&gt;(${Math.ceil(pm.timers['SIDE_SHOTS']!/1000)}s)`; if (pm.isActive('ORBITAL_DRONE')) activeBuffs += ` O(${this.game.player.drones.length}x) (${Math.ceil(pm.timers['ORBITAL_DRONE']!/1000)}s)`; this.weaponStatusEl.innerHTML = text + activeBuffs; }
    togglePauseMenu(isPaused: boolean): void { this.menuContainer.style.display = isPaused ? 'flex' : 'none'; if (isPaused) { this.populateAllTranslatedContent(); this.showTab('spiel'); } }
    showTab(tabName: string): void { for (const key in this.tabPanes) { const pane = this.tabPanes[key]!; const button = this.tabButtons[key]!; if (key === tabName) { pane.classList.add('active'); button.classList.add('active'); } else { pane.classList.remove('active'); button.classList.remove('active'); } } }
    initButtons(): void { document.getElementById('resume-button')!.onclick = () => this.game.togglePause(); document.getElementById('restart-button')!.onclick = () => this.game.changeState('LEVEL_START', true); document.getElementById('quit-button')!.onclick = () => this.game.changeState('MENU'); for (const key in this.tabButtons) { this.tabButtons[key]!.onclick = () => this.showTab(key); } const volSlider = document.getElementById('volume-master') as HTMLInputElement; if(volSlider) volSlider.value = this.settings.masterVolume.toString(); if(volSlider) volSlider.oninput = (e: any) => { this.settings.masterVolume = parseFloat(e.target.value); this.applySettings(); this.saveSettings(); }; document.getElementById('toggle-music')!.onclick = () => { this.settings.music = !this.settings.music; this.applySettings(); this.saveSettings(); }; document.getElementById('toggle-sfx')!.onclick = () => { this.settings.sfx = !this.settings.sfx; this.applySettings(); this.saveSettings(); }; document.getElementById('toggle-particles')!.onclick = () => { this.settings.particles = (this.settings.particles + 1) % 3; this.applySettings(); this.saveSettings(); }; document.getElementById('toggle-shake')!.onclick = () => { this.settings.screenShake = !this.settings.screenShake; this.applySettings(); this.saveSettings(); }; document.getElementById('toggle-language')!.onclick = () => { this.langSelectSource = 'settings'; this.menuContainer.style.display = 'none'; this.langSelectScreen.style.display = 'flex'; this.langBackButton.style.display = 'block'; }; this.langBackButton.onclick = () => { this.langSelectScreen.style.display = 'none'; this.menuContainer.style.display = 'flex'; this.langSelectSource = 'startup'; }; document.querySelectorAll<HTMLButtonElement>('.lang-button').forEach(button => { button.onclick = () => { const lang = button.dataset.lang; if (lang) { this.localizationManager.setLanguage(lang); this.populateAllTranslatedContent(); this.langSelectScreen.style.display = 'none'; if (this.langSelectSource === 'settings') { this.menuContainer.style.display = 'flex'; } else { this.game.changeState('INTRO'); } } }; }); }
    applySettings(): void { const langButton = document.getElementById('toggle-language')!; langButton.textContent = this.localizationManager.translate('lang_native_name'); document.getElementById('toggle-music')!.textContent = this.settings.music ? this.localizationManager.translate('on') : this.localizationManager.translate('off'); document.getElementById('toggle-sfx')!.textContent = this.settings.sfx ? this.localizationManager.translate('on') : this.localizationManager.translate('off'); document.getElementById('toggle-particles')!.textContent = [this.localizationManager.translate('off'), this.localizationManager.translate('low'), this.localizationManager.translate('high')][this.settings.particles]; document.getElementById('toggle-shake')!.textContent = this.settings.screenShake ? this.localizationManager.translate('on') : this.localizationManager.translate('off'); (document.getElementById('toggle-music')! as HTMLButtonElement).classList.toggle('active', this.settings.music); (document.getElementById('toggle-sfx')! as HTMLButtonElement).classList.toggle('active', this.settings.sfx); (document.getElementById('toggle-shake')! as HTMLButtonElement).classList.toggle('active', this.settings.screenShake); this.soundManager.setVolume(this.settings.masterVolume); this.soundManager.toggleMusic(this.settings.music); }
    saveSettings(): void { localStorage.setItem('galaxyFallCelestialSettings', JSON.stringify(this.settings)); }
    loadSettings() { const saved = localStorage.getItem('galaxyFallCelestialSettings'); return saved ? JSON.parse(saved) : { masterVolume: 0.5, music: true, sfx: true, particles: 2, screenShake: true }; }
    populateAllTranslatedContent() { this.populateArsenal(); this.populateGegner(); this.localizationManager.applyTranslationsToUI(); this.applySettings(); }
    createEnemyIcon(enemyType: string): string {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d')!;
        const tempGame = { width: 40, height: 40, enemySpeedMultiplier: 1, level: 1, uiManager: { settings: { particles: 0 } } } as unknown as Game;
        let dummyEnemy: Enemy | null = null;
        switch(enemyType) {
            case 'GRUNT': dummyEnemy = new Grunt(tempGame); break;
            case 'WEAVER': dummyEnemy = new Weaver(tempGame); break;
            case 'TANK': dummyEnemy = new Tank(tempGame); break;
            case 'SHOOTER': dummyEnemy = new Shooter(tempGame); break;
            case 'BOSS_SENTINEL_PRIME': dummyEnemy = new BossSentinelPrime(tempGame, 1, 1); dummyEnemy.width = 35; dummyEnemy.height = 21; break;
            case 'BOSS_VOID_SERPENT': dummyEnemy = new BossVoidSerpent(tempGame, 1, 1); dummyEnemy.width = 38; dummyEnemy.height = 22; break;
            case 'BOSS_OMEGA_NEXUS': dummyEnemy = new BossOmegaNexus(tempGame, 1, 1); dummyEnemy.width = 38; dummyEnemy.height = 24; break;
        }
        if (dummyEnemy) {
            dummyEnemy.pos = new Vector2D(canvas.width / 2 - dummyEnemy.width / 2, canvas.height / 2 - dummyEnemy.height / 2);
            dummyEnemy.draw(ctx);
        }
        return canvas.toDataURL();
    }
    populateArsenal(): void { const powerupList = [ { catKey: "arsenal_cat_weapon_upgrade", nameKey: "powerup_wup_name", descKey: 'powerup_wup_desc', type: 'WEAPON_UP' }, { catKey: "arsenal_cat_weapon_mod", nameKey: "powerup_rapid_fire_name", descKey: 'powerup_rapid_fire_desc', type: 'RAPID_FIRE' }, { catKey: "arsenal_cat_weapon_mod", nameKey: "powerup_side_shots_name", descKey: 'powerup_side_shots_desc', type: 'SIDE_SHOTS' }, { catKey: "arsenal_cat_ultra_weapon", nameKey: "powerup_laser_name", descKey: 'powerup_laser_desc', type: 'LASER_BEAM' }, { catKey: "arsenal_cat_ultra_weapon", nameKey: "powerup_homing_missiles_name", descKey: 'powerup_homing_missiles_desc', type: 'HOMING_MISSILES' }, { catKey: "arsenal_cat_defense", nameKey: "powerup_shield_name", descKey: 'powerup_shield_desc', type: 'SHIELD' }, { catKey: "arsenal_cat_defense", nameKey: "powerup_repair_kit_name", descKey: 'powerup_repair_kit_desc', type: 'REPAIR_KIT' }, { catKey: "arsenal_cat_defense", nameKey: "powerup_extra_life_name", descKey: 'powerup_extra_life_desc', type: 'EXTRA_LIFE' }, { catKey: "arsenal_cat_defense", nameKey: "powerup_ghost_protocol_name", descKey: 'powerup_ghost_protocol_desc', type: 'GHOST_PROTOCOL' }, { catKey: "arsenal_cat_defense", nameKey: "powerup_orbital_drone_name", descKey: 'powerup_orbital_drone_desc', type: 'ORBITAL_DRONE' }, { catKey: "arsenal_cat_special", nameKey: "powerup_nuke_name", descKey: 'powerup_nuke_desc', type: 'NUKE' }, { catKey: "arsenal_cat_special", nameKey: "powerup_black_hole_name", descKey: 'powerup_black_hole_desc', type: 'BLACK_HOLE' }, { catKey: "arsenal_cat_special", nameKey: "powerup_score_boost_name", descKey: 'powerup_score_boost_desc', type: 'SCORE_BOOST' } ]; const listEl = document.getElementById('arsenal-list')!; listEl.innerHTML = ''; let currentCategory = ''; powerupList.forEach(p => { const categoryName = this.localizationManager.translate(p.catKey); if (categoryName !== currentCategory) { currentCategory = categoryName; listEl.innerHTML += `<h3>- ${currentCategory} -</h3>`; } const imageSrc = powerUpImageSources[p.type]; listEl.innerHTML += `<div class="powerup-entry"><img src="${imageSrc}" class="arsenal-icon" alt="${p.nameKey}"/><div class="powerup-info"><div class="powerup-title">${this.localizationManager.translate(p.nameKey)}</div><div class="powerup-desc">${this.localizationManager.translate(p.descKey)}</div></div></div>`; }); }
    populateGegner(): void {
        const enemyList = [
            { nameKey: "gegner_grunt_name", descKey: "gegner_grunt_desc", type: 'GRUNT', strengthKey: 'strength_low' },
            { nameKey: "gegner_weaver_name", descKey: "gegner_weaver_desc", type: 'WEAVER', strengthKey: 'strength_low' },
            { nameKey: "gegner_tank_name", descKey: "gegner_tank_desc", type: 'TANK', strengthKey: 'strength_medium' },
            { nameKey: "gegner_shooter_name", descKey: "gegner_shooter_desc", type: 'SHOOTER', strengthKey: 'strength_medium' },
            { nameKey: "gegner_boss1_name", descKey: "gegner_boss1_desc", type: 'BOSS_SENTINEL_PRIME', strengthKey: 'strength_high' },
            { nameKey: "gegner_boss2_name", descKey: "gegner_boss2_desc", type: 'BOSS_VOID_SERPENT', strengthKey: 'strength_extreme' },
            { nameKey: "gegner_boss3_name", descKey: "gegner_boss3_desc", type: 'BOSS_OMEGA_NEXUS', strengthKey: 'strength_apocalyptic' },
        ];
        const t = (key: string) => this.localizationManager.translate(key);
        const listEl = document.getElementById('gegner-list')!;
        listEl.innerHTML = `<h3>- ${t('gegner_header')} -</h3>`;
        enemyList.forEach(e => {
            const iconSrc = this.createEnemyIcon(e.type);
            const strengthClass = e.strengthKey.split('_')[1];
            listEl.innerHTML += `<div class="powerup-entry"> <img src="${iconSrc}" class="arsenal-icon" alt="${t(e.nameKey)} icon"/> <div class="powerup-info"> <div class="powerup-title"> <span>${t(e.nameKey)}</span> <span class="strength-indicator strength-${strengthClass}">${t(e.strengthKey)}</span> </div> <div class="powerup-desc">${t(e.descKey)}</div> </div> </div>`;
        });
    }
    drawLevelMessage(): void { const ctx = this.ctx; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, this.game.height / 2 - 50, this.game.width, 100); ctx.fillStyle = '#FFFF00'; ctx.font = "30px 'Press Start 2P'"; ctx.fillText(this.game.levelMessage, this.game.width / 2, this.game.height / 2 + 10); }
    drawGameOver(): void { const ctx = this.ctx; const t = (key: string) => this.localizationManager.translate(key); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, this.game.width, this.game.height); ctx.fillStyle = '#FF3333'; ctx.font = "80px 'Press Start 2P'"; ctx.fillText(t('game_over_title'), this.game.width / 2, this.game.height / 2 - 50); ctx.fillStyle = '#FFF'; ctx.font = "24px 'Press Start 2P'"; ctx.fillText(`${t('game_over_final_score')}: ${this.game.score}`, this.game.width / 2, this.game.height / 2 + 20); ctx.font = "20px 'Press Start 2P'"; ctx.fillText(t('game_over_prompt'), this.game.width / 2, this.game.height / 2 + 80); }
    drawWinScreen(): void { const ctx = this.ctx; const t = (key: string) => this.localizationManager.translate(key); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, this.game.width, this.game.height); ctx.fillStyle = '#39FF14'; ctx.font = "50px 'Press Start 2P'"; ctx.fillText(t('victory_title'), this.game.width / 2, this.game.height / 2 - 50); ctx.fillStyle = '#FFF'; ctx.font = "24px 'Press Start 2P'"; ctx.fillText(`${t('victory_final_score')}: ${this.game.score}`, this.game.width / 2, this.game.height / 2 + 20); ctx.font = "20px 'Press Start 2P'"; ctx.fillText(t('victory_prompt'), this.game.width / 2, this.game.height / 2 + 80); }
    drawOverlay(): void { if (this.game.isBossActive) { const boss = this.game.entities.find(e => (e as Enemy).isBoss) as Enemy; if (boss) { const barY = 55; this.ctx.fillStyle = 'red'; this.ctx.fillRect(10, barY, this.game.width - 20, 15); this.ctx.fillStyle = 'green'; this.ctx.fillRect(10, barY, (this.game.width - 20) * (boss.health / boss.maxHealth), 15); } } }
}

class Game {
    public canvas: HTMLCanvasElement; public ctx: CanvasRenderingContext2D; public width: number; public height: number;
    public keys: IKeyMap = {}; public gameState: string = 'LANGUAGE_SELECT'; public isPaused: boolean = false;
    private introTimer: number = 3000; public entities: Entity[] = []; public player: Player | null = null;
    public score: number = 0; public scoreEarnedThisLevel: number = 0; public level: number = 1; public highscore: number = 0;
    public isBossActive: boolean = false; public uiManager: UIManager; public levelDefinitions: ILevelDefinition[];
    public stars: IStar[] = [];
    private shakeIntensity: number = 0; private readonly shakeDecay: number = 0.92;
    public enemySpawnTypes: string[] = []; public enemySpawnInterval: number = 1200; private enemySpawnTimer: number = 0;
    public enemySpeedMultiplier: number = 1.0; public enemyHealthMultiplier: number = 1;
    public levelMessage: string = ''; public levelScoreToEarn: number = 0;
    constructor(canvas: HTMLCanvasElement, ui: IUIElements) {
        this.canvas = canvas; this.ctx = canvas.getContext('2d')!; this.width = canvas.width; this.height = canvas.height;
        this.highscore = parseInt(localStorage.getItem('galaxyFallCelestialHighscore') || '0');
        this.levelDefinitions = [
            { scoreToEarn: 2000,  s: 1200, m: 1.0, e: ['GRUNT'], msgKey: "wave_msg_1"},
            { scoreToEarn: 3000,  s: 1000, m: 1.1, e: ['GRUNT', 'WEAVER'], msgKey: "wave_msg_2"},
            { scoreToEarn: 5000, s: 900,  m: 1.2, e: ['GRUNT', 'WEAVER', 'TANK'], msgKey: "wave_msg_3"},
            { scoreToEarn: 8000, s: 800,  m: 1.3, e: ['WEAVER', 'SHOOTER'], msgKey: "wave_msg_4"},
            { scoreToEarn: 0, s: 1000, m: 1.4, e: ['BOSS_SENTINEL_PRIME'], msgKey: "wave_msg_5"},
            { scoreToEarn: 12000, s: 700, m: 1.5, e: ['GRUNT', 'SHOOTER', 'SHOOTER'], msgKey: "wave_msg_6"},
            { scoreToEarn: 15000, s: 650, m: 1.6, e: ['WEAVER', 'WEAVER', 'TANK'], msgKey: "wave_msg_7"},
            { scoreToEarn: 20000, s: 600, m: 1.7, e: ['GRUNT', 'TANK', 'SHOOTER'], msgKey: "wave_msg_8"},
            { scoreToEarn: 25000, s: 550, m: 1.8, e: ['WEAVER', 'SHOOTER', 'SHOOTER'], msgKey: "wave_msg_9"},
            { scoreToEarn: 0, s: 1000, m: 1.9, e: ['BOSS_VOID_SERPENT'], msgKey: "wave_msg_10"},
            { scoreToEarn: 30000, s: 500, m: 2.0, e: ['GRUNT', 'GRUNT', 'GRUNT', 'WEAVER'], msgKey: "wave_msg_11"},
            { scoreToEarn: 30000, s: 450, m: 2.1, e: ['TANK', 'TANK', 'SHOOTER'], msgKey: "wave_msg_12"},
            { scoreToEarn: 30000, s: 400, m: 2.2, e: ['WEAVER', 'WEAVER', 'WEAVER'], msgKey: "wave_msg_13"},
            { scoreToEarn: 40000, s: 380, m: 2.3, e: ['SHOOTER', 'SHOOTER', 'TANK'], msgKey: "wave_msg_14"},
            { scoreToEarn: 0, s: 1000, m: 2.4, e: ['BOSS_OMEGA_NEXUS'], msgKey: "wave_msg_15"},
            { scoreToEarn: 60000, s: 350, m: 2.5, e: ['GRUNT', 'SHOOTER'], msgKey: "wave_msg_16"},
            { scoreToEarn: 70000, s: 320, m: 2.6, e: ['WEAVER', 'TANK'], msgKey: "wave_msg_17"},
            { scoreToEarn: 70000, s: 300, m: 2.7, e: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER'], msgKey: "wave_msg_18"},
            { scoreToEarn: 80000, s: 280, m: 2.8, e: ['SHOOTER', 'SHOOTER', 'SHOOTER', 'SHOOTER'], msgKey: "wave_msg_19"},
            { scoreToEarn: 0, s: 1000, m: 3.0, e: ['BOSS_OMEGA_NEXUS'], msgKey: "wave_msg_20"},
        ];
        this.uiManager = new UIManager(this, ui);
        this.initEventListeners();
        this.createParallaxStarfield();
        this.uiManager.populateAllTranslatedContent();
        if (localStorage.getItem('galaxyFallLanguage')) {
            this.changeState('INTRO');
        } else {
            document.getElementById('language-select-screen')!.style.display = 'flex';
        }
    }
    initEventListeners(): void {
        const keyMap: {[key: string]: { type: 'special' | 'ultra', index: number }} = { 'Digit1': { type: 'special', index: 0 }, 'Digit2': { type: 'special', index: 1 }, 'Digit3': { type: 'special', index: 2 }, 'Digit4': { type: 'ultra',   index: 0 }, 'Digit5': { type: 'ultra',   index: 1 }, };
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            if (this.gameState === 'PLAYING' && this.player && !this.isPaused) {
                const mapping = keyMap[e.code];
                if (mapping) {
                    e.preventDefault();
                    if (mapping.type === 'special') {
                        this.player.powerUpManager.activateSpecial(mapping.index);
                    }
                    else {
                        this.player.powerUpManager.activateUltra(mapping.index);
                    }
                }
            }
        });
        window.addEventListener('keydown', (e) => { if (this.isPaused && e.code !== 'Escape') return; if (e.code === 'Enter') { e.preventDefault(); if (this.gameState === 'INTRO' || this.gameState === 'MENU') { this.uiManager.soundManager.initAudio(); this.changeState('LEVEL_START', true); } else if (this.gameState === 'GAME_OVER' || this.gameState === 'WIN') this.changeState('MENU'); } if (e.code === 'Escape') { if (this.gameState === 'PLAYING' || this.isPaused) { this.togglePause(); } } });
    }
    togglePause(): void { this.isPaused = !this.isPaused; this.uiManager.togglePauseMenu(this.isPaused); }
    changeState(newState: string, forceReset: boolean = false): void {
        if (newState === this.gameState && !forceReset) return;
        if (newState === 'LEVEL_START' && this.isPaused) this.togglePause();
        this.gameState = newState;
        switch (newState) {
            case 'MENU':
                this.entities = [];
                this.player = null;
                this.isPaused = false;
                this.uiManager.togglePauseMenu(false);
                this.uiManager.soundManager.setTrack('normal');
                break;
            case 'LEVEL_START':
                if (forceReset) {
                    this.player = null; this.level = 0;
                }
                if (!this.player || !this.player.isAlive()) {
                    this.level = 1; this.score = 0; this.player = new Player(this); this.entities = [this.player];
                } else {
                    this.level++;
                    this.player.powerUpManager.resetTemporaryPowerUps();
                }

                if (this.level > this.levelDefinitions.length) { this.changeState('WIN'); return; }
                
                this.entities = this.entities.filter(e => e.family === 'player' || e instanceof Drone);
                this.isBossActive = false;
                this.scoreEarnedThisLevel = 0;
                this.configureLevel();
                this.changeState('PLAYING_TRANSITION');
                break;
            case 'PLAYING_TRANSITION':
                setTimeout(() => this.changeState('PLAYING'), 3000);
                break;
            case 'GAME_OVER':
            case 'WIN':
                this.triggerScreenShake(30);
                if (this.score > this.highscore) { this.highscore = this.score; localStorage.setItem('galaxyFallCelestialHighscore', this.score.toString()); }
                this.uiManager.soundManager.setTrack('normal');
                break;
        }
    }
    configureLevel(): void { const levelData = this.levelDefinitions[this.level - 1]!; if (!levelData) { this.changeState('WIN'); return; } this.enemySpawnTypes = levelData.e; this.enemySpawnInterval = levelData.s; this.enemySpeedMultiplier = levelData.m; this.enemyHealthMultiplier = 1 + Math.floor(this.level / 5); this.levelMessage = this.uiManager.localizationManager.translate(levelData.msgKey); this.levelScoreToEarn = levelData.scoreToEarn; this.enemySpawnTimer = 0; this.uiManager.update(); if (this.enemySpawnTypes.some(e => e.includes('BOSS'))) { this.isBossActive = true; this.spawnEnemy(); this.uiManager.soundManager.setTrack('boss'); } else { this.uiManager.soundManager.setTrack('normal'); } }
    update(deltaTime: number): void {
        if (this.gameState === 'LANGUAGE_SELECT' || this.isPaused) return;
        this.updateParallaxStarfield(deltaTime);
        if (this.shakeIntensity > 0) { this.shakeIntensity *= this.shakeDecay; if (this.shakeIntensity < 0.1) this.shakeIntensity = 0; }

        if (this.gameState === 'INTRO') { this.introTimer -= deltaTime; if (this.introTimer <= 0) this.changeState('MENU'); return; }
        if (this.gameState === 'PLAYING' || this.gameState === 'GAME_OVER' || this.gameState === 'WIN') { this.entities.forEach(e => e.update(deltaTime)); }
        if (this.gameState === 'PLAYING') {
            this.enemySpawnTimer += deltaTime;
            if (this.enemySpawnTimer > this.enemySpawnInterval && !this.isBossActive) { this.spawnEnemy(); this.enemySpawnTimer = 0; }
            if (!this.isBossActive && this.levelScoreToEarn > 0 && this.scoreEarnedThisLevel >= this.levelScoreToEarn) { this.changeState('LEVEL_START'); }
            this.handleCollisions();
        }
        this.cleanupEntities(); if (this.player && !this.player.isAlive() && this.gameState === 'PLAYING') { this.changeState('GAME_OVER'); } this.uiManager.update();
    }
    draw(): void { this.ctx.save(); this.ctx.clearRect(0, 0, this.width, this.height); if (this.shakeIntensity > 0 && this.uiManager.settings.screenShake) { const dx = (Math.random() - 0.5) * 2 * this.shakeIntensity; const dy = (Math.random() - 0.5) * 2 * this.shakeIntensity; this.ctx.translate(dx, dy); } this.drawParallaxStarfield(); this.entities.forEach(e => e.draw(this.ctx)); this.uiManager.drawOverlay(); switch (this.gameState) { case 'INTRO': case 'MENU': this.drawProfessionalIntro(); break; case 'PLAYING_TRANSITION': this.uiManager.drawLevelMessage(); break; case 'GAME_OVER': this.uiManager.drawGameOver(); break; case 'WIN': this.uiManager.drawWinScreen(); break; } this.ctx.restore(); }
    createParallaxStarfield(): void { this.stars = []; for (let i = 0; i < 300; i++) { const l = i < 100 ? 1 : (i < 200 ? 2 : 3); this.stars.push({ pos: new Vector2D(Math.random() * this.width, Math.random() * this.height), s: (4 - l) * 0.8, v: (4 - l) * 24, a: 1 - (l / 4) }); } }
    updateParallaxStarfield(dt: number): void { this.stars.forEach(s => { s.pos.y += s.v * (dt / 1000); if (s.pos.y > this.height) { s.pos.y = -(Math.random() * 50); s.pos.x = Math.random() * this.width; } }); }
    drawParallaxStarfield(): void { this.stars.forEach(s => { this.ctx.fillStyle = `rgba(255,255,255,${s.a})`; this.ctx.beginPath(); this.ctx.arc(s.pos.x, s.pos.y, s.s, 0, Math.PI * 2); this.ctx.fill(); }); }
    triggerScreenShake(intensity: number): void { if (this.uiManager.settings.screenShake) this.shakeIntensity = Math.max(this.shakeIntensity, intensity); }
    spawnEnemy(): void {
        const type = this.enemySpawnTypes[Math.floor(Math.random() * this.enemySpawnTypes.length)]!;
        let enemy;
        switch (type) {
            case 'GRUNT': enemy = new Grunt(this); break;
            case 'TANK': enemy = new Tank(this); break;
            case 'WEAVER': enemy = new Weaver(this); break;
            case 'SHOOTER': enemy = new Shooter(this); break;
            case 'BOSS_SENTINEL_PRIME': enemy = new BossSentinelPrime(this, 100 * (1 + this.level/5), 1 + this.level/10); break;
            case 'BOSS_VOID_SERPENT': enemy = new BossVoidSerpent(this, 120 * (1 + this.level/5), 1.1 + this.level/10); break;
            case 'BOSS_OMEGA_NEXUS': enemy = new BossOmegaNexus(this, 150 * (1 + this.level/5), 1.2 + this.level/10); break;
        }
        if (enemy) this.addEntity(enemy);
    }
    drawProfessionalIntro(): void { const t = Date.now(), w = this.width, h = this.height, ctx = this.ctx; ctx.textAlign = 'center'; ctx.font = "60px 'Press Start 2P'"; ctx.fillStyle = '#0ff'; const p = Math.sin(t / 500) * 5 + 15; ctx.shadowColor = '#0ff'; ctx.shadowBlur = p; ctx.fillText("GALAXY FALL", w / 2, h / 2); const sG = ctx.createLinearGradient(w / 2 - 300, 0, w / 2 + 300, 0); const sP = (t % 3000) / 3000; sG.addColorStop(Math.max(0, sP - 0.2), 'rgba(255,255,255,0)'); sG.addColorStop(sP, 'rgba(255,255,255,0.8)'); sG.addColorStop(Math.min(1, sP + 0.2), 'rgba(255,255,255,0)'); ctx.fillStyle = sG; ctx.fillText("CELESTIAL", w / 2, h / 2 + 60); ctx.shadowBlur = 0; const a = Math.sin(t / 400) * 0.4 + 0.6; ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.font = "20px 'Press Start 2P'"; ctx.fillText(this.uiManager.localizationManager.translate('intro_prompt'), w / 2, h / 2 + 140); }
    isColliding(a: Entity, b: Entity): boolean { return a.pos.x < b.pos.x + b.width && a.pos.x + a.width > b.pos.x && a.pos.y < b.pos.y + b.height && a.pos.y + a.height > b.pos.y; }
    addEntity(entity: Entity): void { this.entities.push(entity); }
    cleanupEntities(): void { this.entities = this.entities.filter(e => e.isAlive()); }
    handleCollisions(): void {
        const projectiles = this.entities.filter(e => e.family === 'projectile'); const enemies = this.entities.filter(e => e.family === 'enemy') as Enemy[];
        const player = this.player; if (!player || !player.isAlive()) return;

        if (player.laser && player.laser.isAlive()) {
            for (const enemy of enemies) {
                if (!player.laser) break; 
                if (this.isColliding(player.laser, enemy)) {
                    enemy.takeHit(player.laser.damage);
                    if (this.uiManager.settings.particles > 0 && player.laser) {
                         this.addEntity(new Particle(this, player.laser.pos.x + player.laser.width / 2, enemy.pos.y, '#FF8C00'));
                    }
                }
            }
        }
        
        projectiles.forEach(p => {
            if (p instanceof Projectile && p.type !== 'ENEMY_PROJECTILE') {
                for (const e of enemies) {
                    if (p.isAlive() && e.isAlive() && this.isColliding(p, e)) {
                        if (p instanceof PiercingProjectile) {
                            if (!p.hasHit(e)) {
                                p.onHit(e);
                                e.takeHit(p.damage);
                            }
                            continue; 
                        }
                        
                        if (p instanceof BlackHoleProjectile) {
                           p.onHit(e);
                        } else {
                           p.onHit(e);
                           e.takeHit(p.damage);
                        }
                        break; 
                    }
                }
            }
        });
        const pickups = this.entities.filter(e => e.family === 'pickup'); pickups.forEach(p => { if (p.isAlive() && this.isColliding(player, p)) (p as PowerUp | Coin).onCollect(); });
        if (!player.isGhosted()) {
            enemies.forEach(e => { if (e.isAlive() && this.isColliding(player, e)) { e.takeHit(e.isBoss ? 10 : 999); player.takeHit(e.collisionDamage); } });
            this.entities.filter(e => e.type === 'ENEMY_PROJECTILE').forEach(p => { const proj = p as EnemyProjectile; if (proj.isAlive() && this.isColliding(player, proj)) { proj.destroy(); player.takeHit(proj.playerDamage); } });
        }
    }
}

// --- INITIALIZATION ---
window.addEventListener('load', function () {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const uiElements: IUIElements = {
        score: document.getElementById('score')!, level: document.getElementById('level')!,
        highscore: document.getElementById('highscore')!,
        specialInventory: document.getElementById('special-inventory')!,
        ultraInventory: document.getElementById('ultra-inventory')!,
        livesDisplay: document.getElementById('lives-display')!,
        weaponStatus: document.getElementById('weapon-status')!,
        energyBar: document.getElementById('energy-bar')!,
    };
    const game = new Game(canvas, uiElements);
    let lastTime = 0;
    function gameLoop(timestamp: number) {
        if (!lastTime) lastTime = timestamp; let deltaTime = timestamp - lastTime; lastTime = timestamp;
        const maxDeltaTime = 100; deltaTime = Math.min(deltaTime, maxDeltaTime);
        game.update(deltaTime); game.draw(); requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
});