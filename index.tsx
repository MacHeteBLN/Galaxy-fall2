// --- START OF FILE index.tsx ---

import { translations } from './translations.js';

// --- SECTION 1: ASSET-IMPORTE ---
import playerImgSrc1 from './assets/images/player_tier1.png';
import playerImgSrc2 from './assets/images/player_tier2.png';
import playerImgSrc3 from './assets/images/player_tier3.png';
import playerImgSrc4 from './assets/images/player_tier4.png';
import gruntImgSrc from './assets/images/enemy_grunt.png';
import tankImgSrc from './assets/images/enemy_tank.png';
import weaverImgSrc from './assets/images/enemy_weaver.png';
import shooterImgSrc from './assets/images/enemy_shooter.png';
import teleporterImgSrc from './assets/images/enemy_teleporter.png'; // NEU: Asset für Teleporter
import bossSentinelPrimeSrc from './assets/images/boss_sentinel_prime.png';
import bossVoidSerpentSrc from './assets/images/boss_void_serpent.png';
import bossOmegaNexusBaseSrc from './assets/images/boss_omega_nexus_base.png';
import bossOmegaNexusRingSrc from './assets/images/boss_omega_nexus_ring.png';
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
import orbitalDrone1ImgSrc from './assets/images/orbital_drone_1.png';
import orbitalDrone2ImgSrc from './assets/images/orbital_drone_2.png';
import orbitalDrone3ImgSrc from './assets/images/orbital_drone_3.png';
import piCoinImgSrc from './assets/images/pi_coin.png';


// --- SECTION 2: BILD-INITIALISIERUNG ---
const createImage = (src: string): HTMLImageElement => { const img = new Image(); img.src = src; return img; };
const playerImg1 = createImage(playerImgSrc1), playerImg2 = createImage(playerImgSrc2), playerImg3 = createImage(playerImgSrc3), playerImg4 = createImage(playerImgSrc4);
const gruntImg = createImage(gruntImgSrc), tankImg = createImage(tankImgSrc), weaverImg = createImage(weaverImgSrc), shooterImg = createImage(shooterImgSrc), teleporterImg = createImage(teleporterImgSrc); // NEU
const bossSentinelPrimeImg = createImage(bossSentinelPrimeSrc);
const bossVoidSerpentImg = createImage(bossVoidSerpentSrc);
const bossOmegaNexusBaseImg = createImage(bossOmegaNexusBaseSrc);
const bossOmegaNexusRingImg = createImage(bossOmegaNexusRingSrc);
const orbitalDroneImages = [createImage(orbitalDrone1ImgSrc), createImage(orbitalDrone2ImgSrc), createImage(orbitalDrone3ImgSrc)];
const piCoinImg = createImage(piCoinImgSrc);
const powerUpImages: { [key: string]: HTMLImageElement } = { 'WEAPON_UP': createImage(powerupWeaponUpSrc), 'RAPID_FIRE': createImage(powerupRapidFireSrc), 'SIDE_SHOTS': createImage(powerupSideShotsSrc), 'LASER_BEAM': createImage(powerupLaserBeamSrc), 'HOMING_MISSILES': createImage(powerupHomingMissilesSrc), 'SHIELD': createImage(powerupShieldSrc), 'REPAIR_KIT': createImage(powerupRepairKitSrc), 'EXTRA_LIFE': createImage(powerupExtraLifeSrc), 'GHOST_PROTOCOL': createImage(powerupGhostProtocolSrc), 'ORBITAL_DRONE': createImage(powerupOrbitalDroneSrc), 'NUKE': createImage(powerupNukeSrc), 'BLACK_HOLE': createImage(powerupBlackHoleSrc), 'SCORE_BOOST': createImage(powerupScoreBoostSrc), };
const powerUpImageSources: { [key: string]: string } = { 'WEAPON_UP': powerupWeaponUpSrc, 'RAPID_FIRE': powerupRapidFireSrc, 'SIDE_SHOTS': powerupSideShotsSrc, 'LASER_BEAM': powerupLaserBeamSrc, 'HOMING_MISSILES': powerupHomingMissilesSrc, 'SHIELD': powerupShieldSrc, 'REPAIR_KIT': powerupRepairKitSrc, 'EXTRA_LIFE': powerupExtraLifeSrc, 'GHOST_PROTOCOL': powerupGhostProtocolSrc, 'ORBITAL_DRONE': powerupOrbitalDroneSrc, 'NUKE': powerupNukeSrc, 'BLACK_HOLE': powerupBlackHoleSrc, 'SCORE_BOOST': powerupScoreBoostSrc, };

// --- SECTION 3: TYP-DEFINITIONEN & LEVEL DEFINITION---
interface IKeyMap { [key: string]: boolean; }
interface IStar { pos: Vector2D; s: number; v: number; a: number; }
// NEUE LEVEL DEFINITION
interface ILevelDefinition { wave: number; scoreToEarn: number; enemies: string[]; boss?: string; formation?: string; msgKey: string; s: number; m: number; }
interface IUIElements { score: HTMLElement; level: HTMLElement; highscore: HTMLElement; specialInventory: HTMLElement; ultraInventory: HTMLElement; livesDisplay: HTMLElement; weaponStatus: HTMLElement; energyBar: HTMLElement; weaponTierDisplay: HTMLElement; }
interface IParticle { pos: Vector2D; vel: Vector2D; size: number; life: number; color: string; }
interface IInventoryItem { type: string; count: number; }

// --- SECTION 4: KERN-KLASSEN ---
class Vector2D { public x: number; public y: number; constructor(x: number, y: number) { this.x = x; this.y = y; } }
class Entity { public game: Game; public pos: Vector2D; public width: number; public height: number; public family: string = 'none'; public type: string = 'NONE'; protected _isGarbage: boolean = false; public inFormation: boolean = false; constructor(game: Game, x: number, y: number, w: number, h: number) { this.game = game; this.pos = new Vector2D(x, y); this.width = w; this.height = h; } update(dt: number): void {} draw(ctx: CanvasRenderingContext2D): void {} isAlive(): boolean { return !this._isGarbage; } destroy(): void { this._isGarbage = true; } }
class EntityFamily extends Entity { constructor(game: Game, x: number, y: number, w: number, h: number, family: string, type: string) { super(game, x, y, w, h); this.family = family; this.type = type; } }

// --- SECTION 5: SPIEL-ENTITÄTEN ---
class Particle extends Entity {
    private vel: Vector2D; private size: number; private life: number; private color: string; private initialLife: number;
    constructor(game: Game, x: number, y: number, color: string, life: number = 0.5, size: number = 2) { super(game, x, y, 0, 0); this.family = 'effect'; this.type = 'PARTICLE'; this.vel = new Vector2D((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50); this.size = Math.random() * size + 1; this.life = Math.random() * life; this.initialLife = this.life; this.color = color; }
    update(dt: number): void { const dt_s = dt / 1000; this.pos.x += this.vel.x * dt_s; this.pos.y += this.vel.y * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.life / this.initialLife; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}
class Explosion extends EntityFamily {
    private particles: IParticle[] = [];
    constructor(game: Game, x: number, y: number, color: string = '#FFA500', countMultiplier: number = 1) { super(game, x, y, 0, 0, 'effect', 'EXPLOSION'); const count = (this.game.uiManager.settings.particles === 2 ? 20 : (this.game.uiManager.settings.particles === 1 ? 10 : 0)) * countMultiplier; for (let i = 0; i < count; i++) { this.particles.push({ pos: new Vector2D(x, y), vel: new Vector2D(Math.random() * 360 - 180, Math.random() * 360 - 180), size: Math.random() * 4 + 1, life: 0.7, color: color }); } }
    update(dt: number): void { const dt_s = dt / 1000; this.particles.forEach(p => { p.pos.x += p.vel.x * dt_s; p.pos.y += p.vel.y * dt_s; p.life -= dt_s; }); this.particles = this.particles.filter(p => p.life > 0); if (this.particles.length === 0) this.destroy(); }
    draw(ctx: CanvasRenderingContext2D): void { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.life / 0.7; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); }
}
class NukeEffect extends Entity {
    private radius: number = 0; private life: number = 1;
    constructor(game: Game) { super(game, game.width / 2, game.height / 2, 0, 0); this.type = 'EFFECT'; }
    update(dt: number): void { const dt_s = dt / 1000; this.radius += 1200 * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = `rgba(255,255,255,${this.life})`; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}
class ShockwaveEffect extends Entity {
    private radius: number = 0; private life: number = 0.5; private initialLife: number = 0.5; private color: string;
    constructor(game: Game, x: number, y: number, color: string = '#F0F') { super(game, x, y, 0, 0); this.family = 'effect'; this.type = 'SHOCKWAVE'; this.color = color; }
    update(dt: number): void { const dt_s = dt / 1000; this.radius += 800 * dt_s; this.life -= dt_s; if (this.life <= 0) this.destroy(); }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.life / this.initialLife; ctx.strokeStyle = this.color; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
}
// NEUE KLASSE
class TeleportEffect extends Entity {
    private life: number = 0.4; private radius: number = 0; private isOpening: boolean; private maxRadius: number = 40;
    constructor(game: Game, x: number, y: number, isOpening: boolean) { super(game, x, y, 0, 0); this.family = 'effect'; this.isOpening = isOpening; this.radius = isOpening ? 0 : this.maxRadius; }
    update(dt: number): void { const dt_s = dt / 1000; this.life -= dt_s; this.radius += (this.isOpening ? 1 : -1) * (this.maxRadius / 0.4) * dt_s; if (this.life <= 0) this.destroy(); }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const alpha = this.life / 0.4; ctx.globalAlpha = alpha; ctx.strokeStyle = '#EE82EE'; ctx.lineWidth = 4; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
}
class Coin extends EntityFamily {
    public value: number; public speed: number = 180;
    private image: HTMLImageElement;
    private angle: number = 0;
    private rotationSpeed: number = 7;

    constructor(game: Game, x: number, y: number, value: number) { 
        super(game, x, y, 45, 45, 'pickup', 'COIN');
        this.value = value;
        this.image = piCoinImg;
    }
    update(dt: number): void { 
        const dt_s = dt / 1000;
        this.pos.y += this.speed * dt_s; 
        this.angle += this.rotationSpeed * dt_s;
        if (this.pos.y > this.game.height) this.destroy(); 
    }
    draw(ctx: CanvasRenderingContext2D): void { 
        const scaleX = Math.cos(this.angle);
        ctx.save();
        ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
        ctx.scale(scaleX, 1);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
    public onCollect(): void { 
        if (this.game.player) { 
            this.game.uiManager.soundManager.play('coinCollect');
            const scoreToAdd = this.game.player.isScoreBoosted() ? this.value * 2 : this.value; 
            this.game.score += scoreToAdd; 
            this.game.scoreEarnedThisLevel += scoreToAdd; 
        } 
        this.destroy(); 
    }
}
class PowerUp extends EntityFamily {
    public speed: number = 150; public powerUpType: string;
    constructor(game: Game, x: number, y: number) { super(game, x, y, 38, 38, 'pickup', 'POWERUP'); const allTypes = ['WEAPON_UP', 'SIDE_SHOTS', 'RAPID_FIRE', 'SHIELD', 'REPAIR_KIT', 'EXTRA_LIFE', 'GHOST_PROTOCOL', 'ORBITAL_DRONE', 'NUKE', 'BLACK_HOLE', 'SCORE_BOOST', 'LASER_BEAM', 'HOMING_MISSILES']; this.powerUpType = allTypes[Math.floor(Math.random() * allTypes.length)]!; }
    update(dt: number): void { this.pos.y += this.speed * (dt / 1000); if (this.pos.y > this.game.height) this.destroy(); }
    draw(ctx: CanvasRenderingContext2D): void { const image = powerUpImages[this.powerUpType]; if (image) ctx.drawImage(image, this.pos.x, this.pos.y, this.width, this.height); }
    public onCollect(): void { if (this.game.player) { const SPECIALS = ['NUKE', 'BLACK_HOLE', 'SCORE_BOOST']; const ULTRAS = ['LASER_BEAM', 'HOMING_MISSILES']; if(SPECIALS.includes(this.powerUpType)) this.game.player.powerUpManager.collectSpecial(this.powerUpType); else if (ULTRAS.includes(this.powerUpType)) this.game.player.powerUpManager.collectUltra(this.powerUpType); else this.game.player.powerUpManager.activate(this.powerUpType); } this.destroy(); }
}
class Enemy extends EntityFamily {
    public baseHealth: number; public health: number; public maxHealth: number; public pointsValue: number;
    public stunTimer: number = 0; public speed: number = 90; public isBoss: boolean = false; public collisionDamage: number = 35;
    constructor(game: Game, x: number, y: number, w: number, h: number, health: number, points: number, type: string) { super(game, x, y, w, h, 'enemy', type); this.baseHealth = health; this.health = this.baseHealth * game.enemyHealthMultiplier; this.maxHealth = this.health; this.pointsValue = points; }
    takeHit(damage: number): void { if (!this.isAlive()) return; this.health -= damage; if (this.health <= 0) { this.destroy(); let scoreToAdd = this.pointsValue * this.game.level; if (this.game.player && this.game.player.isScoreBoosted()) scoreToAdd *= 2; this.game.score += scoreToAdd; this.game.scoreEarnedThisLevel += scoreToAdd; if (this.isBoss) { this.game.isBossActive = false; setTimeout(() => this.game.changeState('LEVEL_START'), 3000); } if (this.game.uiManager.settings.particles > 0) this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2)); if (Math.random() < 0.2) this.game.addEntity(new Coin(this.game, this.pos.x, this.pos.y, this.pointsValue)); if (Math.random() < 0.15) this.game.addEntity(new PowerUp(this.game, this.pos.x, this.pos.y)); this.game.uiManager.soundManager.play('enemyExplosion'); } }
    update(dt: number): void { if (this.stunTimer > 0) { this.stunTimer -= dt; return; } if (this.inFormation) return; const dt_s = dt / 1000; this.pos.y += this.speed * dt_s; if (this.pos.y > this.game.height) this.destroy(); }
    stun(duration: number): void { this.stunTimer = duration; }
    drawHealthBar(ctx: CanvasRenderingContext2D): void { if (this.health < this.maxHealth && !this.isBoss) { ctx.save(); ctx.fillStyle = '#500'; ctx.fillRect(this.pos.x, this.pos.y - 10, this.width, 5); ctx.fillStyle = '#f00'; ctx.fillRect(this.pos.x, this.pos.y - 10, this.width * (this.health / this.maxHealth), 5); ctx.restore(); } }
}
class Grunt extends Enemy { private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 60), -54, 60, 54, 1, 10, 'GRUNT'); this.speed = 100 * game.enemySpeedMultiplier; this.collisionDamage = 35; this.image = gruntImg; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
class Tank extends Enemy { private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 100), -96, 100, 96, 3, 30, 'TANK'); this.speed = 60 * game.enemySpeedMultiplier; this.collisionDamage = 50; this.image = tankImg; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
class Weaver extends Enemy { private angle: number; private hSpeed: number; private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 55), -46, 55, 46, 1, 20, 'WEAVER'); this.speed = 80 * game.enemySpeedMultiplier; this.angle = Math.random() * Math.PI * 2; this.hSpeed = (Math.random() * 2 + 1) * 60; this.collisionDamage = 35; this.image = weaverImg; } update(dt: number): void { const dt_s = dt / 1000; super.update(dt); if (this.inFormation) return; this.angle += 3 * dt_s; this.pos.x += Math.sin(this.angle) * this.hSpeed * dt_s; if (this.pos.x < 0 || this.pos.x > this.game.width - this.width) { this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width)); this.hSpeed *= -1; } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
class Shooter extends Enemy { private fireCooldown: number; private image: HTMLImageElement; constructor(game: Game) { super(game, Math.random() * (game.width - 52), -52, 52, 52, 2, 50, 'SHOOTER'); this.speed = 70 * game.enemySpeedMultiplier; this.fireCooldown = Math.random() * 1000 + 1500; this.collisionDamage = 50; this.image = shooterImg; } update(dt: number): void { super.update(dt); this.fireCooldown -= dt; if (this.fireCooldown <= 0 && this.pos.y > 0) { this.game.addEntity(new EnemyProjectile(this.game, this.pos.x + this.width / 2, this.pos.y + this.height)); this.fireCooldown = 2000; } } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
// NEUE KLASSE
class Teleporter extends Enemy {
    private teleportCooldown: number = 4000; private isVisible: boolean = true; private visibleTimer: number = 3000; private image: HTMLImageElement;
    constructor(game: Game) { super(game, Math.random() * (game.width - 60), 50 + Math.random() * (game.height / 3), 60, 60, 2, 80, 'TELEPORTER'); this.speed = 0; this.image = teleporterImg; }
    update(dt: number): void { if (this.inFormation) return; this.teleportCooldown -= dt; if (this.isVisible) { this.visibleTimer -= dt; if (this.visibleTimer <= 0) { this.isVisible = false; this.game.addEntity(new TeleportEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, false)); this.teleportCooldown = 1000; } } else if (this.teleportCooldown <= 0) { this.teleport(); this.isVisible = true; this.visibleTimer = 3000; } }
    teleport(): void { this.pos.x = Math.random() * (this.game.width - this.width); this.pos.y = 50 + Math.random() * (this.game.height / 3); this.game.addEntity(new TeleportEffect(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, true)); }
    draw(ctx: CanvasRenderingContext2D): void { if (this.isVisible) { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); this.drawHealthBar(ctx); ctx.restore(); } }
}
class BlackHole extends Entity {
    private life: number = 8000; private pullRadius: number = 300; private killRadius: number = 20;
    constructor(game: Game, x: number, y: number) { super(game, x, y, 0, 0); this.type = 'EFFECT'; }
    update(dt: number): void { const dt_s = dt/1000; this.life -= dt; if (this.life <= 0) { this.game.entities.forEach(e => { const dist = Math.hypot(this.pos.x - (e.pos.x + e.width/2), this.pos.y - (e.pos.y + e.height/2)); if (dist < this.pullRadius && e instanceof Enemy && !e.isBoss) e.takeHit(9999); }); this.destroy(); this.game.addEntity(new ShockwaveEffect(this.game, this.pos.x, this.pos.y, '#EE82EE')); return; } this.game.entities.forEach(e => { if (e.family === 'enemy' || e.family === 'pickup') { const dist = Math.hypot(this.pos.x - (e.pos.x + e.width/2), this.pos.y - (e.pos.y + e.height/2)); if (dist < this.pullRadius) { if (e instanceof Enemy && !e.isBoss) e.stun(50); const angle = Math.atan2(this.pos.y - e.pos.y, this.pos.x - e.pos.x); const pullSpeed = 180 * (1 - dist / this.pullRadius); e.pos.x += Math.cos(angle) * pullSpeed * dt_s; e.pos.y += Math.sin(angle) * pullSpeed * dt_s; if (dist < this.killRadius) { if (e instanceof Enemy && !e.isBoss) e.takeHit(9999); else if (!(e instanceof Enemy)) e.destroy(); } } } }); }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.killRadius, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#f0f'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(this.pos.x, this.pos.y, this.pullRadius * (this.life / 8000), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
}
class Projectile extends EntityFamily { public vel: Vector2D; public damage: number = 1; constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -600) { super(game, x - 2.5, y, 5, 20, 'projectile', 'PROJECTILE'); this.vel = new Vector2D(velX, velY); } update(dt: number): void { const dt_s = dt / 1000; this.pos.x += this.vel.x * dt_s; this.pos.y += this.vel.y * dt_s; if (this.pos.y < -this.height || this.pos.y > this.game.height || this.pos.x < -this.width || this.pos.x > this.game.width) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#0ff'; ctx.shadowColor = '#0ff'; ctx.shadowBlur = 5; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } onHit(e: Enemy): void { this.destroy(); } }
class HeavyProjectile extends Projectile { constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -600) { super(game, x, y, velX, velY); this.pos.x = x - 4; this.width = 8; this.height = 22; this.damage = 2.5; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#FFD700'; ctx.shadowColor = '#FFA500'; ctx.shadowBlur = 8; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } }
class PiercingProjectile extends Projectile { private hitEnemies: Enemy[] = []; constructor(game: Game, x: number, y: number, velX: number = 0, velY: number = -700) { super(game, x, y, velX, velY); this.pos.x = x - 3; this.width = 6; this.height = 25; this.damage = 0.8; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#9400D3'; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 10; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } onHit(e: Enemy): void { this.hitEnemies.push(e); } hasHit(e: Enemy): boolean { return this.hitEnemies.includes(e); } }
class BlackHoleProjectile extends Projectile { constructor(game: Game, x: number, y: number, velX: number, velY: number) { super(game, x - 10, y - 10, velX, velY); this.width = 20; this.height = 20; this.type = 'BLACK_HOLE_PROJECTILE'; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#9400D3'; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.width / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } onHit(e: Enemy): void { this.game.addEntity(new BlackHole(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2)); this.destroy(); } }
class LaserBeam extends EntityFamily {
    public player: Player; public damage: number = 0.2; private soundCooldown: number = 0; private phase: number = 0; private amplitude: number = 30; private frequency: number = 0.02;
    constructor(game: Game, player: Player) { super(game, 0, 0, 60, game.height, 'projectile', 'LASER_BEAM'); this.player = player; }
    update(dt: number): void { if (!this.player.isAlive() || !this.player.powerUpManager.isActive('LASER_BEAM')) { this.destroy(); return; } this.pos.x = this.player.pos.x + this.player.width / 2 - this.amplitude; this.pos.y = 0; this.height = this.player.pos.y; this.phase += (dt / 1000) * 15; this.soundCooldown -= dt; if (this.soundCooldown <= 0) { this.game.uiManager.soundManager.play('laser'); this.soundCooldown = 100; } }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); const centerX = this.player.pos.x + this.player.width / 2; const beamHeight = this.player.pos.y; ctx.beginPath(); ctx.moveTo(centerX + Math.sin(this.phase) * this.amplitude, beamHeight); for (let y = beamHeight; y > 0; y--) { const xOffset = Math.sin(y * this.frequency + this.phase) * this.amplitude; ctx.lineTo(centerX + xOffset, y); } ctx.strokeStyle = '#f0f'; ctx.lineWidth = 15; ctx.shadowColor = '#f0f'; ctx.shadowBlur = 20; ctx.stroke(); ctx.beginPath(); ctx.moveTo(centerX + Math.sin(this.phase) * this.amplitude, beamHeight); for (let y = beamHeight; y > 0; y--) { const xOffset = Math.sin(y * this.frequency + this.phase) * this.amplitude; ctx.lineTo(centerX + xOffset, y); } ctx.strokeStyle = '#EE82EE'; ctx.lineWidth = 8; ctx.shadowColor = '#EE82EE'; ctx.shadowBlur = 15; ctx.stroke(); ctx.beginPath(); ctx.moveTo(centerX + Math.sin(this.phase) * this.amplitude, beamHeight); for (let y = beamHeight; y > 0; y--) { const xOffset = Math.sin(y * this.frequency + this.phase) * this.amplitude; ctx.lineTo(centerX + xOffset, y); } ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
}
class HomingMissile extends Projectile { private target: Enemy | null = null; private searchCooldown: number = 0; private lifetime: number = 5000; constructor(game: Game, x: number, y: number) { super(game, x, y, (Math.random() - 0.5) * 200, -300); this.type = 'HOMING_MISSILE'; this.damage = 15; this.width = 8; this.height = 16; } findTarget(): void { const enemies = this.game.entities.filter(e => e.family === 'enemy' && e.isAlive()) as Enemy[]; if (enemies.length === 0) { this.target = null; return; } let closestEnemy: Enemy | null = null; let minDistance = Infinity; enemies.forEach(enemy => { const dist = Math.hypot(this.pos.x - (enemy.pos.x + enemy.width / 2), this.pos.y - (enemy.pos.y + enemy.height / 2)); if (dist < minDistance) { minDistance = dist; closestEnemy = enemy; } }); this.target = closestEnemy; } update(dt: number): void { this.lifetime -= dt; this.searchCooldown -= dt; if (this.searchCooldown <= 0) { this.findTarget(); this.searchCooldown = 500; } if (this.target && this.target.isAlive()) { const speed = 400; const turnFactor = 5; const dt_s = dt / 1000; const targetX = this.target.pos.x + this.target.width / 2; const targetY = this.target.pos.y + this.target.height / 2; const desiredVelX = targetX - this.pos.x; const desiredVelY = targetY - this.pos.y; const mag = Math.hypot(desiredVelX, desiredVelY); const normalizedDesiredVelX = mag > 0 ? (desiredVelX / mag) * speed : 0; const normalizedDesiredVelY = mag > 0 ? (desiredVelY / mag) * speed : 0; this.vel.x += (normalizedDesiredVelX - this.vel.x) * turnFactor * dt_s; this.vel.y += (normalizedDesiredVelY - this.vel.y) * turnFactor * dt_s; } super.update(dt); if (this.lifetime <= 0) this.destroy(); } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.translate(this.pos.x + this.width / 2, this.pos.y + this.height / 2); const angle = Math.atan2(this.vel.y, this.vel.x) + Math.PI / 2; ctx.rotate(angle); ctx.fillStyle = '#ff9900'; ctx.shadowColor = '#ff5722'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.moveTo(0, -this.height / 2); ctx.lineTo(-this.width / 2, this.height / 2); ctx.lineTo(this.width / 2, this.height / 2); ctx.closePath(); ctx.fill(); const flameSize = Math.random() * 8 + 4; ctx.fillStyle = '#ff5722'; ctx.beginPath(); ctx.moveTo(0, this.height / 2); ctx.lineTo(-this.width / 2 + 2, this.height / 2 + flameSize / 2); ctx.lineTo(0, this.height / 2 + flameSize); ctx.lineTo(this.width / 2 - 2, this.height / 2 + flameSize / 2); ctx.closePath(); ctx.fill(); ctx.restore(); } }
class EnemyProjectile extends Projectile { public playerDamage: number; constructor(game: Game, x: number, y: number, vX: number = 0, vY: number = 360, playerDamage: number = 25) { super(game, x, y, vX, vY); this.type = 'ENEMY_PROJECTILE'; this.width = 5; this.height=10; this.playerDamage = playerDamage; } draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.fillStyle = '#FF4136'; ctx.shadowColor = '#FF4136'; ctx.shadowBlur = 5; ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); } }
class Drone extends EntityFamily {
    private tier: number; private index: number; private orbitRadius: number = 75; private fireCooldown: number = 0; private image: HTMLImageElement;
    constructor(game: Game, tier: number, index: number) { super(game, 0, 0, 36, 36, 'player', 'DRONE'); this.tier = tier; this.index = index; this.image = orbitalDroneImages[this.tier - 1]!; }
    updateIndex(newIndex: number) { this.index = newIndex; }
    update(dt: number): void { if (!this.game.player || !this.game.player.isAlive() || !this.game.player.powerUpManager.isActive('ORBITAL_DRONE')) { this.destroy(); return; } const totalDrones = this.game.player.drones.length; const angleOffset = (2 * Math.PI / totalDrones) * this.index; const currentAngle = this.game.player.droneAngle + angleOffset; const playerPos = this.game.player.pos; this.pos.x = playerPos.x + this.game.player.width / 2 + Math.cos(currentAngle) * this.orbitRadius; this.pos.y = playerPos.y + this.game.player.height / 2 + Math.sin(currentAngle) * this.orbitRadius; this.fireCooldown -= dt; if (this.fireCooldown <= 0) this.shoot(); }
    shoot(): void { switch (this.tier) { case 1: this.game.addEntity(new Projectile(this.game, this.pos.x, this.pos.y)); this.fireCooldown = 600; break; case 2: this.game.addEntity(new HeavyProjectile(this.game, this.pos.x, this.pos.y)); this.fireCooldown = 500; break; case 3: this.game.addEntity(new PiercingProjectile(this.game, this.pos.x, this.pos.y)); this.fireCooldown = 400; break; } }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height); ctx.restore(); }
}
class PowerUpManager {
    public player: Player; public game: Game; public weaponTier: number = 1; public weaponTierTimer: number = 0;
    public ultraWeapon: string | null = null; public timers: { [key: string]: number } = {};
    public specialInventory: IInventoryItem[] = []; public ultraInventory: IInventoryItem[] = [];
    constructor(player: Player) { this.player = player; this.game = player.game; }
    update(dt: number): void { for (const key in this.timers) { this.timers[key] -= dt; if (this.timers[key] <= 0) this.deactivate(key); } if (this.weaponTierTimer > 0) { this.weaponTierTimer -= dt; if (this.weaponTierTimer <= 0) { this.weaponTier--; this.setWeaponTierTimer(); } } }
    setWeaponTierTimer(): void { if (this.weaponTier <= 1) { this.weaponTier = 1; this.weaponTierTimer = 0; return; } switch(this.weaponTier) { case 4: this.weaponTierTimer = 30000; break; case 3: this.weaponTierTimer = 60000; break; case 2: this.weaponTierTimer = 90000; break; } }
    deactivate(key: string): void { delete this.timers[key]; if (this.ultraWeapon === key) { this.ultraWeapon = null; if (this.player.laser) { this.player.laser.destroy(); this.player.laser = null; } } else if (key === 'ORBITAL_DRONE') { this.player.drones.forEach(d => d.destroy()); this.player.drones = []; } }
    resetTemporaryPowerUps(): void { Object.keys(this.timers).forEach(timerKey => this.deactivate(timerKey)); this.ultraWeapon = null; }
    isActive(type: string): boolean { return this.timers[type] > 0; }
    onPlayerHit(): void { if (this.weaponTier > 1) { this.weaponTier--; this.setWeaponTierTimer(); } }
    collectSpecial(type: string): void { this.collectToInventory(type, this.specialInventory, 3); }
    collectUltra(type: string): void { this.collectToInventory(type, this.ultraInventory, 2); }
    private collectToInventory(type: string, inventory: IInventoryItem[], maxSize: number): void { const existing = inventory.find(item => item.type === type); if (existing) existing.count++; else if (inventory.length < maxSize) inventory.push({ type, count: 1 }); this.game.uiManager.soundManager.play('powerup'); }
    activateSpecial(slotIndex: number): void { const special = this.specialInventory[slotIndex]; if (!special) return; if (special.type === 'BLACK_HOLE') { const p = this.game.player!; this.game.addEntity(new BlackHoleProjectile(this.game, p.pos.x + p.width/2, p.pos.y, 0, -600)); this.game.uiManager.soundManager.play('missileLaunch'); } else { this.activate(special.type); } special.count--; if (special.count <= 0) this.specialInventory.splice(slotIndex, 1); }
    activateUltra(slotIndex: number): void { const ultra = this.ultraInventory[slotIndex]; if (!ultra) return; if (this.ultraWeapon) this.deactivate(this.ultraWeapon); this.activate(ultra.type); ultra.count--; if (ultra.count <= 0) this.ultraInventory.splice(slotIndex, 1); }
    activate(type: string, duration?: number): void { const W_ULTRA_DURATIONS: {[key: string]: number} = {'LASER_BEAM': 10000, 'HOMING_MISSILES': 15000}; const W_TEMP_DURATIONS: {[key: string]: number} = {'SIDE_SHOTS': 15000, 'RAPID_FIRE': 30000}; const DEFENSE_TYPES = ['SHIELD', 'REPAIR_KIT', 'EXTRA_LIFE', 'GHOST_PROTOCOL']; const SPECIAL_TYPES = ['NUKE', 'SCORE_BOOST']; if (type === 'ORBITAL_DRONE') { if (this.player.drones.length < 3) { const droneTier = this.player.drones.length + 1; this.player.drones.push(new Drone(this.game, droneTier, this.player.drones.length)); this.player.drones.forEach((drone, index) => drone.updateIndex(index)); } this.timers['ORBITAL_DRONE'] = 30000; } else if (type === 'WEAPON_UP') { if (this.weaponTier < 4) this.weaponTier++; this.setWeaponTierTimer(); } else if (Object.keys(W_TEMP_DURATIONS).includes(type)) { this.timers[type] = duration ?? W_TEMP_DURATIONS[type]!; } else if (Object.keys(W_ULTRA_DURATIONS).includes(type)) { this.ultraWeapon = type; this.timers[type] = duration ?? W_ULTRA_DURATIONS[type]!; } else if (DEFENSE_TYPES.includes(type)) { if (type === 'EXTRA_LIFE') { if (this.player.lives < this.player.maxLives) this.player.lives++; } else if (type === 'REPAIR_KIT') { this.player.energy = 100; } else { this.timers[type] = duration ?? 15000; } } else if (SPECIAL_TYPES.includes(type)) { if (type === 'NUKE') { this.game.entities.filter(e => e.family === 'enemy' && !(e as Enemy).isBoss).forEach(e => (e as Enemy).takeHit(9999)); this.game.addEntity(new NukeEffect(this.game)); } else if (type === 'SCORE_BOOST') { this.timers[type] = 20000; } } this.game.uiManager.soundManager.play('powerup'); }
    shoot(): void { const p = this.player; p.fireCooldown = this.isActive('RAPID_FIRE') ? 75 : 150; if (this.ultraWeapon) { switch (this.ultraWeapon) { case 'LASER_BEAM': if (!p.laser || !p.laser.isAlive()) { p.laser = new LaserBeam(this.game, p); this.game.addEntity(p.laser); } p.fireCooldown = 0; break; case 'HOMING_MISSILES': this.game.addEntity(new HomingMissile(this.game, p.pos.x + p.width/2, p.pos.y)); p.fireCooldown = 400; this.game.uiManager.soundManager.play('missileLaunch'); break; } } const x = p.pos.x, y = p.pos.y, w = p.width, h = p.height; const velY = -600; const angle15 = 15 * (Math.PI/180); switch (this.weaponTier) { case 1: this.game.addEntity(new Projectile(this.game, x + w / 2, y)); break; case 2: this.game.addEntity(new Projectile(this.game, x + w * 0.2, y)); this.game.addEntity(new Projectile(this.game, x + w * 0.8, y)); break; case 3: this.game.addEntity(new Projectile(this.game, x + w / 2, y, 0, velY)); this.game.addEntity(new Projectile(this.game, x + w / 2, y, Math.sin(-angle15) * Math.abs(velY), Math.cos(-angle15) * velY)); this.game.addEntity(new Projectile(this.game, x + w / 2, y, Math.sin(angle15) * Math.abs(velY), Math.cos(angle15) * velY)); break; case 4: this.game.addEntity(new Projectile(this.game, x + w * 0.1, y, -150, velY)); this.game.addEntity(new Projectile(this.game, x + w * 0.9, y, 150, velY)); this.game.addEntity(new Projectile(this.game, x + w * 0.3, y)); this.game.addEntity(new Projectile(this.game, x + w * 0.7, y)); break; } if (this.isActive('SIDE_SHOTS')) { this.game.addEntity(new Projectile(this.game, x, y + h / 2, -300, 0)); this.game.addEntity(new Projectile(this.game, x + w, y + h / 2, 300, 0)); } this.game.uiManager.soundManager.play('shoot'); }
}
class Player extends EntityFamily {
    public speed: number = 400; public lives: number = 3; public maxLives: number = 5;
    public energy: number = 100; public fireCooldown: number = 0;
    public powerUpManager: PowerUpManager; public drones: Drone[] = [];
    public laser: LaserBeam | null = null; public droneAngle: number = 0;
    public isChargingBlackHole: boolean = false;
    public blackHoleChargeSlot: number | null = null;
    constructor(game: Game) {
        super(game, game.width / 2 - 25, game.height - 80, 50, 40, 'player', 'PLAYER');
        this.powerUpManager = new PowerUpManager(this);
    }
    update(dt: number): void {
        const dt_s = dt / 1000;
        
        if (this.game.isMobile) {
            if (this.game.touchX !== null && this.game.touchY !== null) {
                const targetX = this.game.touchX - this.width / 2;
                const targetY = this.game.touchY - this.height / 2;
                this.pos.x += (targetX - this.pos.x) * 0.2;
                this.pos.y += (targetY - this.pos.y) * 0.2;
            }
        } else {
            const move = new Vector2D(0, 0);
            if (this.game.keys['ArrowLeft'] || this.game.keys['KeyA']) move.x = -1;
            if (this.game.keys['ArrowRight'] || this.game.keys['KeyD']) move.x = 1;
            if (this.game.keys['ArrowUp'] || this.game.keys['KeyW']) move.y = -1;
            if (this.game.keys['ArrowDown'] || this.game.keys['KeyS']) move.y = 1;
            const mag = Math.hypot(move.x, move.y);
            if (mag > 0) {
                this.pos.x += (move.x / mag) * this.speed * dt_s;
                this.pos.y += (move.y / mag) * this.speed * dt_s;
            }
        }
        
        this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width));
        this.pos.y = Math.max(0, Math.min(this.pos.y, this.game.height - this.height));
        if (this.fireCooldown <= 0 && !this.isChargingBlackHole) {
            this.shoot();
        }
        if (this.fireCooldown > 0) this.fireCooldown -= dt;
        this.droneAngle += 3 * dt_s;
        this.powerUpManager.update(dt);
        this.drones.forEach(d => d.update(dt));
    }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.globalAlpha = this.isGhosted() ? 0.5 : 1; const tier = this.powerUpManager.weaponTier; let currentImage: HTMLImageElement; switch (tier) { case 1: currentImage = playerImg1; break; case 2: currentImage = playerImg2; break; case 3: currentImage = playerImg3; break; case 4: currentImage = playerImg4; break; default: currentImage = playerImg1; } const drawX = this.pos.x + (this.width / 2) - (currentImage.width / 2); const drawY = this.pos.y + (this.height / 2) - (currentImage.height / 2); ctx.drawImage(currentImage, drawX, drawY); this.drones.forEach(d => d.draw(ctx)); if (this.isShielded()) { const alpha = (this.powerUpManager.timers['SHIELD']! < 1000 && Math.floor(Date.now() / 100) % 2 === 0) ? 0 : 0.4; ctx.fillStyle = `rgba(11,255,255,${alpha})`; ctx.beginPath(); ctx.arc(this.pos.x + this.width / 2, this.pos.y + this.height / 2, this.width * 0.7, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }
    shoot(): void { this.powerUpManager.shoot(); }
    takeHit(damagePercentage: number): void { if (this.isGhosted()) return; if (this.isShielded()) { this.powerUpManager.deactivate('SHIELD'); this.game.uiManager.soundManager.play('shieldDown'); return; } this.powerUpManager.onPlayerHit(); this.energy -= damagePercentage; this.game.uiManager.soundManager.play('playerHit'); if (this.energy <= 0) { this.lives--; if (this.lives <= 0) { this.destroy(); this.game.addEntity(new Explosion(this.game, this.pos.x + this.width / 2, this.pos.y + this.height / 2, '#FFFFFF', 2)); this.game.uiManager.soundManager.play('playerExplosion'); } else { this.energy = 100; this.pos.x = this.game.width / 2 - this.width / 2; this.pos.y = this.game.height - 80; this.powerUpManager.activate('GHOST_PROTOCOL', 5000); } } }
    isShielded(): boolean { return this.powerUpManager.isActive('SHIELD'); }
    isGhosted(): boolean { return this.powerUpManager.isActive('GHOST_PROTOCOL'); }
    isScoreBoosted(): boolean { return this.powerUpManager.isActive('SCORE_BOOST'); }
}
// ÜBERARBEITETER BOSS
class BossSentinelPrime extends Enemy {
    private attackPattern: number = 0; private attackTimer: number = 5000;
    private movementPattern: string = 'ENTER'; private hSpeed: number; private image: HTMLImageElement;
    private patrolY: number = 50;
    private isPreparingCharge: boolean = false; private chargePreparationTimer: number = 0;
    private isPreparingLineAttack: boolean = false; private lineAttackPreparationTimer: number = 0;

    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 225, -300, 450, 300, health, 5000, 'BOSS_SENTINEL_PRIME');
        this.isBoss = true; this.hSpeed = 100 * speedMultiplier; this.image = bossSentinelPrimeImg; this.collisionDamage = 75;
    }

    // in der Klasse BossSentinelPrime

update(dt: number): void {
    const dt_s = dt / 1000;

    // NEUE, KORRIGIERTE LOGIK FÜR ANGRIFFSVORBEREITUNG
    if (this.isPreparingCharge) {
        this.chargePreparationTimer -= dt;
        if (this.chargePreparationTimer <= 0) {
            this.executeAttack();
        }
        return; // Verhindert Bewegung während der Vorbereitung
    }

    if (this.isPreparingLineAttack) {
        this.lineAttackPreparationTimer -= dt;
        if (this.lineAttackPreparationTimer <= 0) {
            this.executeAttack();
        }
        return; // Verhindert Bewegung während der Vorbereitung
    }
    // ENDE DER KORREKTUR

    if (this.movementPattern === 'ENTER') {
        this.pos.y += 100 * dt_s;
        if (this.pos.y >= this.patrolY) {
            this.pos.y = this.patrolY;
            this.movementPattern = 'PATROL';
        }
    } else if (this.movementPattern === 'PATROL') {
        this.pos.x += this.hSpeed * dt_s;
        if (this.pos.x <= 0 || this.pos.x >= this.game.width - this.width) {
            this.pos.x = Math.max(0, Math.min(this.pos.x, this.game.width - this.width));
            this.hSpeed *= -1;
        }
    }

    this.attackTimer -= dt;
    if (this.attackTimer <= 0) {
        this.prepareAttack();
        this.attackTimer = 5000;
    }
}
    
    prepareAttack(): void {
        this.attackPattern = Math.floor(Math.random() * 3);
        switch (this.attackPattern) {
            case 0: // Line Attack
                this.isPreparingLineAttack = true;
                this.lineAttackPreparationTimer = 3000; // 3 seconds warning
                break;
            case 1: // Radial Burst
                this.executeAttack(); // No preparation for this one
                break;
            case 2: // Charge
                if (this.game.player) {
                    this.isPreparingCharge = true;
                    this.chargePreparationTimer = 1500;
                }
                break;
        }
    }
    
    executeAttack(): void {
        const x = this.pos.x, y = this.pos.y, w = this.width, h = this.height;
        switch (this.attackPattern) {
            case 0: // Line Attack
                for (let i = 0; i < 10; i++) this.game.addEntity(new EnemyProjectile(this.game, x + (i * w / 9), y + h, 0, 360, this.collisionDamage));
                break;
            case 1: // Radial Burst
                for (let i = 0; i < 12; i++) {
                    const angle = i * Math.PI / 6;
                    this.game.addEntity(new EnemyProjectile(this.game, x + w / 2, y + h / 2, Math.cos(angle) * 240, Math.sin(angle) * 240, this.collisionDamage));
                }
                break;
            case 2: // Charge
                if (this.game.player) {
                    const chargeSpeed = 600;
                    const targetX = this.game.player.pos.x;
                    const direction = targetX > this.pos.x ? 1 : -1;
                    this.hSpeed = direction * chargeSpeed;
                    this.movementPattern = 'CHARGE'; // A new pattern to handle the charge logic
                    setTimeout(() => {
                        this.hSpeed = 100 * (Math.random() > 0.5 ? 1 : -1); // reset speed
                        this.movementPattern = 'PATROL';
                    }, 1000); // Charge for 1 second
                }
                break;
        }
        this.isPreparingCharge = false;
        this.isPreparingLineAttack = false;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        if (this.isPreparingLineAttack) {
            const glow = (1 - this.lineAttackPreparationTimer / 3000) * 0.8;
            ctx.shadowColor = `rgba(255, 0, 0, ${glow})`;
            ctx.shadowBlur = 30;
        } else if (this.isPreparingCharge) {
            ctx.shadowColor = '#FF4136';
            ctx.shadowBlur = 20;
        }
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    }
}
class BossVoidSerpent extends Enemy {
    private image: HTMLImageElement; private attackTimer: number = 4000; private angle: number = 0;
    private verticalTargetY: number = 80; private waveSpeed: number = 1.2; private waveAmplitude: number;
    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 225, -300, 450, 300, health, 7500, 'BOSS_VOID_SERPENT');
        this.isBoss = true; this.image = bossVoidSerpentImg; this.collisionDamage = 90; this.speed = 40 * speedMultiplier; this.waveAmplitude = (this.game.width / 2) - (this.width / 2) - 20;
    }
    update(dt: number): void { const dt_s = dt / 1000; if (this.pos.y < this.verticalTargetY) { this.pos.y += this.speed * dt_s; } else { this.angle += this.waveSpeed * dt_s; this.pos.x = (this.game.width / 2 - this.width / 2) + Math.sin(this.angle) * this.waveAmplitude; this.verticalTargetY = 80 + Math.cos(this.angle * 0.5) * 40; this.pos.y += (this.verticalTargetY - this.pos.y) * 0.1; } this.attackTimer -= dt; if (this.attackTimer <= 0 && this.pos.y >= 60) { this.attackTimer = Math.max(2000, 3500 - this.game.level * 100); const x = this.pos.x, y = this.pos.y, w = this.width, h = this.height; const attackType = Math.random() > 0.4 ? 'SPREAD' : 'WHIP'; if (attackType === 'SPREAD') { for (let i = -3; i <= 3; i++) { const angle = i * 0.25; this.game.addEntity(new EnemyProjectile(this.game, x + w / 2, y + h * 0.8, Math.sin(angle) * 350, Math.cos(angle) * 350, this.collisionDamage)); } } else { if (this.game.player) { const p = this.game.player; for (let i = 0; i < 3; i++) { setTimeout(() => { const targetX = p.pos.x + p.width/2; const targetY = p.pos.y + p.height/2; const angle = Math.atan2(targetY - (this.pos.y + h), targetX - (this.pos.x + w/2)); this.game.addEntity(new EnemyProjectile(this.game, x + w/2, y + h, Math.cos(angle) * 600, Math.sin(angle) * 600, this.collisionDamage)); }, i * 150); } } } } }
    draw(ctx: CanvasRenderingContext2D): void { ctx.save(); ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); }
}
// ÜBERARBEITETER BOSS
class BossOmegaNexus extends Enemy {
    private baseImage: HTMLImageElement; private ringImage: HTMLImageElement; private ringAngle: number = 0;
    private ringRotationSpeed: number = 0.3; private phase: number = 1; private attackTimer: number = 5000;
    private isChargingLaser: boolean = false; private laserChargeTimer: number = 3000;
    private laserActive: boolean = false; private laserDurationTimer: number = 4000; private bulletHellTimer: number = 200;
    private bulletHellAngle: number = 0;
    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 225, -300, 450, 300, health, 10000, 'BOSS_OMEGA_NEXUS'); // GRÖSSE ANGEPASST
        this.isBoss = true; this.baseImage = bossOmegaNexusBaseImg; this.ringImage = bossOmegaNexusRingImg; this.collisionDamage = 120;
    }
    takeHit(damage: number): void { super.takeHit(damage); if (!this.isAlive()) return; const healthPercentage = this.health / this.maxHealth; if (this.phase === 1 && healthPercentage <= 0.70) { this.phase = 2; this.attackTimer = 1000; } else if (this.phase === 2 && healthPercentage <= 0.35) { this.phase = 3; } }
    update(dt: number): void { const dt_s = dt / 1000; this.ringAngle += this.ringRotationSpeed * dt_s; if (this.pos.y < 30) { this.pos.y += 25 * dt_s; } this.attackTimer -= dt; switch(this.phase) { case 1: this.updatePhase1(dt); break; case 2: this.updatePhase2(dt); break; case 3: this.updatePhase3(dt); break; } }
    private updatePhase1(dt: number): void { if (this.attackTimer <= 0) { this.attackTimer = 4000; this.fireTargetedBarrage(3, 400); } }
    private updatePhase2(dt: number): void { if (this.isChargingLaser) { this.laserChargeTimer -= dt; if (this.laserChargeTimer <= 0) { this.isChargingLaser = false; this.laserActive = true; this.laserDurationTimer = 4000; } return; } if (this.laserActive) { this.laserDurationTimer -= dt; if (this.laserDurationTimer <= 0) { this.laserActive = false; } return; } if (this.attackTimer <= 0) { this.attackTimer = 8000; this.isChargingLaser = true; this.laserChargeTimer = 3000; } }
    private updatePhase3(dt: number): void { this.updatePhase2(dt); this.bulletHellTimer -= dt; if (this.bulletHellTimer <= 0 && !this.laserActive) { this.bulletHellTimer = 100; const bulletSpeed = 250; this.game.addEntity(new EnemyProjectile(this.game, this.pos.x + this.width/2, this.pos.y + this.height/2, Math.cos(this.bulletHellAngle) * bulletSpeed, Math.sin(this.bulletHellAngle) * bulletSpeed, 40)); this.game.addEntity(new EnemyProjectile(this.game, this.pos.x + this.width/2, this.pos.y + this.height/2, Math.cos(this.bulletHellAngle + Math.PI) * bulletSpeed, Math.sin(this.bulletHellAngle + Math.PI) * bulletSpeed, 40)); this.bulletHellAngle += 0.3; } }
    private fireTargetedBarrage(count: number, speed: number): void { if (!this.game.player) return; const p = this.game.player; const selfX = this.pos.x + this.width / 2; const selfY = this.pos.y + this.height / 2; for (let i = 0; i < count; i++) { setTimeout(() => { const targetX = p.pos.x + p.width / 2; const targetY = p.pos.y + p.height / 2; const angle = Math.atan2(targetY - selfY, targetX - selfX); this.game.addEntity(new EnemyProjectile(this.game, selfX, selfY, Math.cos(angle) * speed, Math.sin(angle) * speed, this.collisionDamage)); }, i * 200); } }
    draw(ctx: CanvasRenderingContext2D): void { const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; ctx.drawImage(this.baseImage, this.pos.x, this.pos.y, this.width, this.height); ctx.save(); ctx.translate(centerX, centerY); ctx.rotate(this.ringAngle); ctx.drawImage(this.ringImage, -this.ringImage.width / 2, -this.ringImage.height / 2); ctx.restore(); if (this.isChargingLaser) { const chargeRatio = 1 - (this.laserChargeTimer / 3000); ctx.fillStyle = `rgba(255, 100, 100, ${chargeRatio * 0.7})`; ctx.beginPath(); ctx.arc(centerX, centerY + 100, 40 * chargeRatio, 0, Math.PI * 2); ctx.fill(); } if (this.laserActive) { ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; ctx.fillRect(centerX - 15, centerY, 30, this.game.height); ctx.fillStyle = 'rgba(255, 100, 100, 0.7)'; ctx.fillRect(centerX - 25, centerY, 50, this.game.height); } }
}
// ÜBERARBEITETER BOSS
class BossNexusPrime extends Enemy {
    private baseImage: HTMLImageElement; private ringImage: HTMLImageElement; private ringAngle: number = 0;
    private ringRotationSpeed: number = 0.5; private phase: number = 1; private attackTimer: number = 4000;
    private isChargingLaser: boolean = false; private laserChargeTimer: number = 2500;
    private laserActive: boolean = false; private laserDurationTimer: number = 3000; private laserX: number;
    private laserSweepSpeed: number = 80; private bulletHellTimer: number = 0; private bulletHellAngle: number = 0;
    private drones: {pos: Vector2D, angle: number}[] = [];

    constructor(game: Game, health: number, speedMultiplier: number) {
        super(game, game.width / 2 - 225, -300, 450, 300, health, 25000, 'BOSS_NEXUS_PRIME'); // GRÖSSE ANGEPASST
        this.isBoss = true; this.baseImage = bossOmegaNexusBaseImg; this.ringImage = bossOmegaNexusRingImg; this.collisionDamage = 150;
        this.laserX = this.game.width / 2;
    }
    takeHit(damage: number): void { super.takeHit(damage); if (!this.isAlive()) return; const healthPercentage = this.health / this.maxHealth; if (this.phase === 1 && healthPercentage <= 0.70) { this.phase = 2; this.attackTimer = 1000; this.drones.push({pos: new Vector2D(100, 150), angle: 0}); this.drones.push({pos: new Vector2D(this.game.width - 100, 150), angle: Math.PI}); } else if (this.phase === 2 && healthPercentage <= 0.35) { this.phase = 3; this.ringRotationSpeed = 1.0; } }
    update(dt: number): void { const dt_s = dt / 1000; this.ringAngle += this.ringRotationSpeed * dt_s; if (this.pos.y < 30) this.pos.y += 20 * dt_s; this.attackTimer -= dt; this.updateDrones(dt_s); switch(this.phase) { case 1: this.updatePhase1(dt); break; case 2: this.updatePhase2(dt); break; case 3: this.updatePhase3(dt); break; } }
    updateDrones(dt_s: number): void { if (this.drones.length === 0) return; this.drones.forEach(d => { d.angle += 3 * dt_s; if (this.game.player) { const p = this.game.player; const targetAngle = Math.atan2(p.pos.y - d.pos.y, p.pos.x - d.pos.x); if (Math.random() < 0.02) { this.game.addEntity(new EnemyProjectile(this.game, d.pos.x, d.pos.y, Math.cos(targetAngle) * 300, Math.sin(targetAngle) * 300, 30)); } } }); }
    updatePhase1(dt: number): void { if (this.attackTimer <= 0) { this.attackTimer = 3500; this.fireTargetedBarrage(4, 450); } }
    updatePhase2(dt: number): void { if (this.isChargingLaser) { this.laserChargeTimer -= dt; if (this.laserChargeTimer <= 0) { this.isChargingLaser = false; this.laserActive = true; this.laserDurationTimer = 3000; this.laserX = 100; this.laserSweepSpeed = 80; } return; } if (this.laserActive) { this.laserDurationTimer -= dt; this.laserX += this.laserSweepSpeed * (dt/1000); if(this.laserX > this.game.width - 100 || this.laserX < 100) { this.laserSweepSpeed *= -1; } if (this.laserDurationTimer <= 0) this.laserActive = false; return; } if (this.attackTimer <= 0) { this.attackTimer = 7000; this.isChargingLaser = true; this.laserChargeTimer = 2500; } }
    updatePhase3(dt: number): void { this.updatePhase2(dt); this.bulletHellTimer -= dt; if (this.bulletHellTimer <= 0) { this.bulletHellTimer = 80; const bulletSpeed = 300; for(let i=0; i<4; i++){ const angle = this.bulletHellAngle + (i * Math.PI / 2); this.game.addEntity(new EnemyProjectile(this.game, this.pos.x + this.width/2, this.pos.y + this.height/2, Math.cos(angle) * bulletSpeed, Math.sin(angle) * bulletSpeed, 40)); } this.bulletHellAngle += 0.25; } }
    fireTargetedBarrage(count: number, speed: number): void { if (!this.game.player) return; const p = this.game.player; const selfX = this.pos.x + this.width / 2; const selfY = this.pos.y + this.height / 2; for (let i = 0; i < count; i++) { setTimeout(() => { const targetX = p.pos.x + p.width / 2; const targetY = p.pos.y + p.height / 2; const angle = Math.atan2(targetY - selfY, targetX - selfX); this.game.addEntity(new EnemyProjectile(this.game, selfX, selfY, Math.cos(angle) * speed, Math.sin(angle) * speed, this.collisionDamage)); }, i * 150); } }
    draw(ctx: CanvasRenderingContext2D): void { const centerX = this.pos.x + this.width / 2; const centerY = this.pos.y + this.height / 2; ctx.save(); ctx.shadowColor = '#FF4136'; ctx.shadowBlur = this.phase * 10; ctx.drawImage(this.baseImage, this.pos.x, this.pos.y, this.width, this.height); ctx.restore(); ctx.save(); ctx.translate(centerX, centerY); ctx.rotate(this.ringAngle); ctx.drawImage(this.ringImage, -this.ringImage.width / 2, -this.ringImage.height / 2); ctx.restore(); this.drones.forEach(d => { ctx.fillStyle = '#B10DC9'; ctx.beginPath(); ctx.arc(d.pos.x, d.pos.y, 20, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#FF4136'; ctx.beginPath(); ctx.arc(d.pos.x, d.pos.y, 8, 0, Math.PI * 2); ctx.fill(); }); if (this.isChargingLaser) { const chargeRatio = 1 - (this.laserChargeTimer / 2500); ctx.fillStyle = `rgba(255, 100, 100, ${chargeRatio * 0.8})`; ctx.beginPath(); ctx.arc(centerX, centerY + 100, 45 * chargeRatio, 0, Math.PI * 2); ctx.fill(); } if (this.laserActive) { ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; ctx.fillRect(this.laserX - 10, 0, 20, this.game.height); ctx.fillStyle = 'rgba(255, 100, 100, 0.7)'; ctx.fillRect(this.laserX - 20, 0, 40, this.game.height); } }
}

// --- SECTION 6 & 7: SYSTEM-MANAGER UND GAME KLASSE ---
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
    private currentTrack: 'normal' | 'boss' = 'normal';
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

    constructor(uiManager: UIManager) {
        this.uiManager = uiManager;
        this.stepDuration = 60.0 / this.bpm / this.stepsPerBeat;
        this.defineMusicPatterns();
        this.defineBossMusicPatterns();
    }

    public initAudio(): void {
        if (this.audioCtx && this.audioCtx.state === 'running') {
            return;
        }
        try {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                this.masterGain = this.audioCtx.createGain();
                this.masterGain.connect(this.audioCtx.destination);
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            this.setVolume(this.uiManager.settings.masterVolume);
            this.toggleMusic(this.uiManager.settings.music);
        } catch (e) {
            console.error("Web Audio API is not supported or failed to initialize", e);
        }
    }
    
    defineMusicPatterns() { const N = {C2:65.41,G2:98,Ab2:103.83,Eb2:77.78,C3:130.81,D3:146.83,Eb3:155.56,F3:174.61,G3:196,Ab3:207.65,Bb3:233.08,C4:261.63,D4:293.66,Eb4:311.13,F4:349.23,G4:392,Ab4:415.3,Bb4:466.16}; const R=0; this.leadMelody=[N.G4,R,N.Eb4,R,N.G4,R,N.F4,R,N.Eb4,R,N.D4,R,N.C4,R,R,R,N.G4,R,N.Eb4,R,N.G4,R,N.F4,R,N.G4,N.Ab4,N.G4,N.F4,N.Eb4,R,R,R,N.Ab4,R,N.F4,R,N.Ab4,R,N.G4,R,N.F4,R,N.Eb4,R,N.C4,R,N.Eb4,R,N.G4,N.F4,N.Eb4,R,N.D4,R,N.C4,R,N.C4,R,R,R,R,R,R,R]; this.bassLine=[...Array(16).fill(N.C2),...Array(16).fill(N.G2),...Array(16).fill(N.Ab2),...Array(16).fill(N.Eb2)]; const A_C=[N.C4,N.Eb4,N.G4,N.Eb4],A_G=[N.G3,N.Bb3,N.D4,N.Bb3],A_A=[N.Ab3,N.C4,N.Eb4,N.C4],A_E=[N.Eb3,N.G3,N.Bb3,N.G3]; this.arpeggioMelody=[...A_C,...A_C,...A_C,...A_C,...A_G,...A_G,...A_G,...A_G,...A_A,...A_A,...A_A,...A_A,...A_E,...A_E,...A_E,...A_E]; const K=true,S=true,H=true,o=false; this.kickPattern=[K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,o,o,K,o,K,o,K,o,o,o]; this.snarePattern=[o,o,o,o,S,o,o,o,o,o,o,o,S,o,o,o,o,o,o,o,S,o,o,o,o,o,o,o,S,o,o,o,o,o,o,o,S,o,o,o,o,o,o,o,S,o,o,o,o,o,o,o,S,o,o,o,o,o,S,o,S,o,S,o]; this.hihatPattern=[H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,o,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,o,H,o,H,o,H,o,H,H,H,o,H,H,H,o]; }
    defineBossMusicPatterns() { const N={A2:110,E2:82.41,F2:87.31,G2:98,A3:220,B3:246.94,C4:261.63,D4:293.66,E4:329.63,F4:349.23,Gs4:415.3,A4:440}; const R=0; this.bossLeadMelody=[N.A4,N.A4,R,N.Gs4,R,N.A4,R,N.E4,N.F4,N.F4,R,N.E4,R,N.D4,R,N.C4,N.A4,N.A4,R,N.Gs4,R,N.A4,R,N.E4,N.F4,R,N.E4,R,N.D4,R,N.C4,R,N.A4,N.A4,R,N.Gs4,R,N.A4,R,N.E4,N.F4,N.F4,R,N.E4,R,N.D4,R,N.C4,N.B3,N.C4,N.D4,N.E4,N.F4,N.E4,N.D4,N.C4,N.B3,R,R,R,R,R,R,R]; this.bossBassLine=[...Array(16).fill(N.A2),...Array(16).fill(N.G2),...Array(16).fill(N.F2),...Array(16).fill(N.E2)]; const A_A=[N.A3,N.C4,N.E4,N.C4],A_G=[N.G2,N.B3,N.D4,N.B3],A_F=[N.F2,N.A3,N.C4,N.A3],A_E=[N.E2,N.Gs4,N.B3,N.Gs4]; this.bossArpeggioMelody=[...A_A,...A_A,...A_A,...A_A,...A_G,...A_G,...A_G,...A_G,...A_F,...A_F,...A_F,...A_F,...A_E,...A_E,...A_E,...A_E]; const K=true,S=true,H=true,o=false; const r=(p:boolean[],t:number)=>Array(t).fill(p).flat(); this.bossKickPattern=r([K,K,o,o,K,o,o,o,K,K,o,o,K,o,o,K],4); this.bossSnarePattern=r([o,o,o,o,S,o,o,o,o,o,o,o,S,o,S,o],4); this.bossHihatPattern=r([H,H,H,H,H,H,H,H,H,H,H,H,H,H,H,H],4); }
    setTrack(trackName: 'normal' | 'boss') { if (!this.audioCtx || this.currentTrack === trackName) return; this.currentTrack = trackName; if (this.musicPlaying) { this.currentStep = 0; this.nextNoteTime = this.audioCtx.currentTime; } }
    playNote(freq: number, time: number, duration: number, type: OscillatorType, volMultiplier: number = 1) { if (!this.audioCtx || !this.masterGain || freq === 0) return; const osc = this.audioCtx.createOscillator(); const gain = this.audioCtx.createGain(); osc.connect(gain); gain.connect(this.masterGain); osc.type = type; osc.frequency.setValueAtTime(freq, time); const noteVol = volMultiplier * this.uiManager.settings.masterVolume; gain.gain.setValueAtTime(noteVol, time); gain.gain.exponentialRampToValueAtTime(0.0001, time + duration); osc.start(time); osc.stop(time + duration); }
    playDrum(type: 'kick' | 'snare' | 'hihat', time: number) { if (!this.audioCtx || !this.masterGain) return; const noiseSource = this.audioCtx.createBufferSource(); const bufferSize = this.audioCtx.sampleRate * 0.2; const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate); const data = buffer.getChannelData(0); for(let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; } noiseSource.buffer = buffer; const filter = this.audioCtx.createBiquadFilter(); const gain = this.audioCtx.createGain(); noiseSource.connect(filter); filter.connect(gain); gain.connect(this.masterGain); const drumVol = this.uiManager.settings.masterVolume; let duration = 0.1, vol = drumVol; switch(type) { case 'kick': filter.type = 'lowpass'; filter.frequency.setValueAtTime(120, time); vol *= 1; duration = 0.15; break; case 'snare': filter.type = 'highpass'; filter.frequency.setValueAtTime(1500, time); vol *= 0.8; duration = 0.1; break; case 'hihat': filter.type = 'highpass'; filter.frequency.setValueAtTime(8000, time); vol *= 0.4; duration = 0.05; break; } gain.gain.setValueAtTime(vol, time); gain.gain.exponentialRampToValueAtTime(0.001, time + duration); noiseSource.start(time); noiseSource.stop(time + duration); }
    scheduler() { if (!this.audioCtx || !this.musicPlaying) return; while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) { let l, a, b, k, s, h; if (this.currentTrack === 'boss') {[l,a,b,k,s,h]=[this.bossLeadMelody,this.bossArpeggioMelody,this.bossBassLine,this.bossKickPattern,this.bossSnarePattern,this.bossHihatPattern];} else {[l,a,b,k,s,h]=[this.leadMelody,this.arpeggioMelody,this.bassLine,this.kickPattern,this.snarePattern,this.hihatPattern];} this.playNote(l[this.currentStep]!, this.nextNoteTime, this.stepDuration * 0.9, 'square', 0.15); this.playNote(a[this.currentStep]!, this.nextNoteTime, this.stepDuration, 'square', 0.07); if (this.currentStep % 2 === 0) this.playNote(b[this.currentStep]!, this.nextNoteTime, this.stepDuration * 1.8, 'triangle', 0.3); if(k[this.currentStep])this.playDrum('kick',this.nextNoteTime); if(s[this.currentStep])this.playDrum('snare',this.nextNoteTime); if(h[this.currentStep])this.playDrum('hihat',this.nextNoteTime); this.nextNoteTime += this.stepDuration; this.currentStep = (this.currentStep + 1) % this.totalSteps; } }
    toggleMusic(shouldPlay: boolean): void { if (!this.audioCtx) return; this.musicPlaying = shouldPlay; if (this.musicPlaying && this.musicScheduler === null) { this.currentStep = 0; this.nextNoteTime = this.audioCtx.currentTime; this.musicScheduler = window.setInterval(() => this.scheduler(), 25); } else if (!this.musicPlaying && this.musicScheduler !== null) { clearInterval(this.musicScheduler); this.musicScheduler = null; } }
    setVolume(volume: number) { if (this.masterGain && this.audioCtx) this.masterGain.gain.setValueAtTime(volume, this.audioCtx.currentTime); }
    play(soundName: string) { 
        if (!this.audioCtx || !this.masterGain || !this.uiManager.settings.sfx) return; 
        let freq = 440, duration = 0.1, type: OscillatorType = 'sine', vol = 1; 
        switch (soundName) { 
            case 'shoot': freq = 880; duration = 0.05; type = 'triangle'; vol = 0.4; break; 
            case 'missileLaunch': freq = 220; duration = 0.3; type = 'sawtooth'; break; 
            case 'playerHit': freq = 200; duration = 0.2; type = 'square'; break; 
            case 'playerExplosion': freq = 100; duration = 0.5; type = 'sawtooth'; break; 
            case 'enemyExplosion': freq = 150; duration = 0.15; type = 'sawtooth'; vol = 0.5; break; 
            case 'laser': freq = 1500; duration = 0.1; type = 'sawtooth'; vol = 0.3; break; 
            case 'powerup': freq = 1200; duration = 0.1; type = 'sine'; break; 
            case 'coinCollect': freq = 1400; duration = 0.08; type = 'sine'; vol = 0.6; break;
            case 'shieldDown': freq = 300; duration = 0.2; type = 'square'; break; 
        } 
        const osc = this.audioCtx.createOscillator(); 
        const gN = this.audioCtx.createGain(); 
        osc.connect(gN); 
        gN.connect(this.masterGain); 
        osc.type = type; 
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime); 
        gN.gain.setValueAtTime(vol * this.uiManager.settings.masterVolume, this.audioCtx.currentTime); 
        gN.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration); 
        osc.start(this.audioCtx.currentTime); 
        osc.stop(this.audioCtx.currentTime + duration); 
    }
}

class LocalizationManager { private currentLanguage: string = 'en'; private translations: { [lang: string]: { [key: string]: string } } = translations; constructor() { this.setLanguage(localStorage.getItem('galaxyFallLanguage') || 'en'); } setLanguage(lang: string): void { this.currentLanguage = this.translations[lang] ? lang : 'en'; localStorage.setItem('galaxyFallLanguage', this.currentLanguage); } translate(key: string): string { return this.translations[this.currentLanguage]?.[key] || this.translations['en']?.[key] || key; } applyTranslationsToUI(): void { document.querySelectorAll<HTMLElement>('[data-translate-key]').forEach(el => { const key = el.dataset.translateKey; if (key) el.textContent = this.translate(key); }); } }

class UIManager {
    public game: Game; private ctx: CanvasRenderingContext2D; private scoreEl: HTMLElement; private levelEl: HTMLElement; private highscoreEl: HTMLElement; private specialInventoryEl: HTMLElement; private ultraInventoryEl: HTMLElement; private livesDisplay: HTMLElement; private weaponStatusEl: HTMLElement; private energyBarEl: HTMLElement; private weaponTierDisplayEl: HTMLElement; private menuContainer: HTMLElement;
    private gameOverContainer: HTMLElement;
    private langSelectScreen: HTMLElement; private langBackButton: HTMLElement; private tabButtons: { [key: string]: HTMLButtonElement }; private tabPanes: { [key: string]: HTMLElement }; public settings: { masterVolume: number; music: boolean; sfx: boolean; particles: number; screenShake: boolean; }; public soundManager: SoundManager; public localizationManager: LocalizationManager; private langSelectSource: 'startup' | 'settings' = 'startup'; private mainMenuElements: { resume: HTMLElement, restart: HTMLElement, quit: HTMLElement, header: HTMLElement };
    
    constructor(game: Game, ui: IUIElements) {
        this.game = game;
        this.ctx = game.ctx;
        this.scoreEl = ui.score;
        this.levelEl = ui.level;
        this.highscoreEl = ui.highscore;
        this.specialInventoryEl = ui.specialInventory;
        this.ultraInventoryEl = ui.ultraInventory;
        this.livesDisplay = ui.livesDisplay;
        this.weaponStatusEl = ui.weaponStatus;
        this.energyBarEl = ui.energyBar;
        this.weaponTierDisplayEl = ui.weaponTierDisplay;
        this.menuContainer = document.getElementById('menu-container')!;
        this.gameOverContainer = document.getElementById('game-over-container')!;
        this.langSelectScreen = document.getElementById('language-select-screen')!;
        this.langBackButton = document.getElementById('lang-back-button')!;
        this.tabButtons = { spiel: document.getElementById('tab-spiel')! as HTMLButtonElement, arsenal: document.getElementById('tab-arsenal')! as HTMLButtonElement, gegner: document.getElementById('tab-gegner')! as HTMLButtonElement, einstellungen: document.getElementById('tab-einstellungen')! as HTMLButtonElement, };
        this.tabPanes = { spiel: document.getElementById('spiel-view')!, arsenal: document.getElementById('arsenal-view')!, gegner: document.getElementById('gegner-view')!, einstellungen: document.getElementById('einstellungen-view')!, };
        this.mainMenuElements = { resume: document.getElementById('resume-button')!, restart: document.getElementById('restart-button')!, quit: document.getElementById('quit-button')!, header: this.menuContainer.querySelector('.menu-header h1')! };
        this.settings = this.loadSettings();
        this.localizationManager = new LocalizationManager();
        this.soundManager = new SoundManager(this);
        
        this.toggleMainMenu = this.toggleMainMenu.bind(this);
        this.togglePauseMenu = this.togglePauseMenu.bind(this);
        this.showTab = this.showTab.bind(this);
        this.drawLevelMessage = this.drawLevelMessage.bind(this);
        this.drawGameOver = this.drawGameOver.bind(this);
        this.drawWinScreen = this.drawWinScreen.bind(this);
        
        this.initButtons();
    }
    
    update(): void {
        this.scoreEl.textContent = this.game.score.toString();
        this.levelEl.textContent = this.game.level > 40 ? 'MAX' : this.game.level.toString();
        if (this.game.isPaused || ['MENU', 'GAME_OVER', 'WIN'].includes(this.game.gameState)) {
            this.highscoreEl.textContent = this.game.highscore.toString();
        }
        if (!this.game.player || !this.game.player.isAlive()) {
            this.specialInventoryEl.innerHTML = '';
            this.ultraInventoryEl.innerHTML = '';
            this.livesDisplay.innerHTML = '';
            this.weaponStatusEl.innerHTML = '';
            this.energyBarEl.style.width = '0%';
            this.weaponTierDisplayEl.innerHTML = '';
            return;
        }
        this.livesDisplay.innerHTML = `<div class="life-icon"></div><span>x${this.game.player.lives}</span>`;
        this.energyBarEl.style.width = `${this.game.player.energy}%`;
        this.updateInventoryUI(this.specialInventoryEl, this.game.player.powerUpManager.specialInventory, 3, 1);
        this.updateInventoryUI(this.ultraInventoryEl, this.game.player.powerUpManager.ultraInventory, 2, 4);
        this.updateWeaponStatusUI();
    }
    
    updateInventoryUI(element: HTMLElement, inventory: IInventoryItem[], maxSize: number, keyStart: number): void {
        let html = '';
        const type = element.id === 'special-inventory' ? 'special' : 'ultra';
        for (let i = 0; i < maxSize; i++) {
            const item = inventory[i];
            const key = keyStart + i;
            if (item) {
                const imageSrc = powerUpImageSources[item.type];
                html += `<div class="inventory-slot" data-slot-index="${i}" data-inventory-type="${type}">
                            <div class="slot-key">${key}</div>
                            <img src="${imageSrc}" class="slot-image" alt="${item.type}"/>
                            ${item.count > 1 ? `<div class="slot-count">x${item.count}</div>` : ''}
                         </div>`;
            } else {
                html += `<div class="inventory-slot"><div class="slot-key">${key}</div></div>`;
            }
        }
        element.innerHTML = html;
    }

    updateWeaponStatusUI(): void {
        if (!this.game.player) {
            this.weaponTierDisplayEl.innerHTML = '';
            this.weaponStatusEl.innerHTML = '';
            return;
        }
        const t = (key: string) => this.localizationManager.translate(key);
        const pm = this.game.player.powerUpManager;
        let tierText = `${t('w_tier')}: ${pm.weaponTier}`;
        let tierTimer = pm.weaponTierTimer;
        if (tierTimer > 0 && pm.weaponTier > 1) {
            const seconds = Math.ceil(tierTimer / 1000);
            tierText += ` <span class="${seconds <= 5 ? 'timer-warning' : ''}">(${seconds}s)</span>`;
        }
        this.weaponTierDisplayEl.innerHTML = tierText;
        let activeBuffs = '';
        if (pm.isActive('RAPID_FIRE')) {
            activeBuffs += ` ${t('buff_rf')}(${Math.ceil(pm.timers['RAPID_FIRE']!/1000)}s)`;
        }
        if (pm.isActive('SIDE_SHOTS')) {
            activeBuffs += ` ${t('buff_sideshots')}(${Math.ceil(pm.timers['SIDE_SHOTS']!/1000)}s)`;
        }
        if (pm.isActive('ORBITAL_DRONE')) {
            activeBuffs += ` ${t('buff_orbital')}(${this.game.player.drones.length}x) (${Math.ceil(pm.timers['ORBITAL_DRONE']!/1000)}s)`;
        }
        if (activeBuffs.trim() !== '') {
            this.weaponStatusEl.innerHTML = activeBuffs.trim();
            this.weaponStatusEl.style.display = 'block';
        } else {
            this.weaponStatusEl.innerHTML = '';
            this.weaponStatusEl.style.display = 'none';
        }
    }
    
    public toggleMainMenu(show: boolean): void {
        this.menuContainer.style.display = show ? 'flex' : 'none';
        const exitButton = document.getElementById('exit-button');
        if (show) {
            this.mainMenuElements.header.dataset.translateKey = "main_menu_title";
            this.mainMenuElements.header.textContent = this.localizationManager.translate('main_menu_title');
            this.mainMenuElements.resume.style.display = 'none';
            this.mainMenuElements.quit.style.display = 'none';
            if (exitButton) exitButton.style.display = 'block';
            this.mainMenuElements.restart.style.display = 'block';
            this.mainMenuElements.restart.dataset.translateKey = 'btn_start_game';
            this.mainMenuElements.restart.textContent = this.localizationManager.translate('btn_start_game');
            this.populateAllTranslatedContent();
            this.showTab('spiel');
        }
    }
    public togglePauseMenu(isPaused: boolean): void {
        this.menuContainer.style.display = isPaused ? 'flex' : 'none';
        const exitButton = document.getElementById('exit-button');
        if (isPaused) {
            this.mainMenuElements.header.dataset.translateKey = "pause_header";
            this.mainMenuElements.header.textContent = this.localizationManager.translate('pause_header');
            this.mainMenuElements.resume.style.display = 'block';
            this.mainMenuElements.quit.style.display = 'block';
            if (exitButton) exitButton.style.display = 'block';
            this.mainMenuElements.restart.style.display = 'block';
            this.mainMenuElements.restart.dataset.translateKey = 'btn_restart';
            this.mainMenuElements.restart.textContent = this.localizationManager.translate('btn_restart');
            this.populateAllTranslatedContent();
            this.showTab('spiel');
        }
    }

    public toggleGameOverScreen(show: boolean): void {
        if (show) {
            const finalScoreEl = document.getElementById('final-score')!;
            finalScoreEl.textContent = this.game.score.toString();
            this.gameOverContainer.style.display = 'flex';
        } else {
            this.gameOverContainer.style.display = 'none';
        }
    }

    public showTab(tabName: string): void {
        for (const key in this.tabPanes) {
            const pane = this.tabPanes[key]!;
            const button = this.tabButtons[key]!;
            if (key === tabName) {
                pane.classList.add('active');
                button.classList.add('active');
            } else {
                pane.classList.remove('active');
                button.classList.remove('active');
            }
        }
    }
    
    initButtons(): void {
        const eventType = this.game.isMobile ? 'touchstart' : 'click';
    
        const setupButton = (element: HTMLElement | null, action: (e: Event) => void) => {
            if (element) {
                element.addEventListener(eventType, (e) => {
                    e.preventDefault();
                    action(e);
                });
            }
        };
    
        setupButton(this.mainMenuElements.restart, () => { 
            this.soundManager.initAudio(); 
            this.game.changeState('LEVEL_START', true); 
        });
        setupButton(this.mainMenuElements.resume, () => this.game.togglePause());
        setupButton(this.mainMenuElements.quit, () => this.game.changeState('MENU'));
    
        setupButton(document.getElementById('exit-button'), () => {
            if (this.game.isMobile) {
                this.menuContainer.style.display = 'none';
                const exitScreen = document.getElementById('exit-screen');
                if (exitScreen) {
                    exitScreen.style.display = 'flex';
                }
                this.soundManager.toggleMusic(false);
            } else {
                window.close();
            }
        });

        setupButton(document.getElementById('restart-from-gameover-button'), () => {
            this.game.changeState('LEVEL_START', true);
        });
        setupButton(document.getElementById('quit-from-gameover-button'), () => {
            this.game.changeState('MENU');
        });

        setupButton(document.getElementById('mobile-pause-button'), () => this.game.togglePause());
    
        for (const key in this.tabButtons) {
            const button = this.tabButtons[key];
            if (button) {
                setupButton(button, () => this.showTab(key));
            }
        }
    
        const volSlider = document.getElementById('volume-master') as HTMLInputElement;
        if (volSlider) {
            volSlider.addEventListener('input', (e: any) => {
                this.settings.masterVolume = parseFloat(e.target.value);
                this.applySettings();
                this.saveSettings();
            });
            volSlider.value = this.settings.masterVolume.toString();
        }
    
        setupButton(document.getElementById('toggle-music'), () => { this.settings.music = !this.settings.music; this.applySettings(); this.saveSettings(); });
        setupButton(document.getElementById('toggle-sfx'), () => { this.settings.sfx = !this.settings.sfx; this.applySettings(); this.saveSettings(); });
        setupButton(document.getElementById('toggle-particles'), () => { this.settings.particles = (this.settings.particles + 1) % 3; this.applySettings(); this.saveSettings(); });
        setupButton(document.getElementById('toggle-shake'), () => { this.settings.screenShake = !this.settings.screenShake; this.applySettings(); this.saveSettings(); });
        
        setupButton(document.getElementById('toggle-language'), () => {
            this.langSelectSource = 'settings';
            this.menuContainer.style.display = 'none';
            this.langSelectScreen.style.display = 'flex';
            this.langBackButton.style.display = 'block';
        });
        
        setupButton(document.getElementById('lang-back-button'), () => {
            this.langSelectScreen.style.display = 'none';
            this.menuContainer.style.display = 'flex';
            this.langSelectSource = 'startup';
        });
    
        document.querySelectorAll<HTMLButtonElement>('.lang-button').forEach(button => {
            setupButton(button, () => {
                this.soundManager.initAudio();
                const lang = button.dataset.lang;
                if (lang) {
                    this.localizationManager.setLanguage(lang);
                    this.populateAllTranslatedContent();
                    this.langSelectScreen.style.display = 'none';
                    if (this.langSelectSource === 'settings') {
                        this.menuContainer.style.display = 'flex';
                    } else {
                        this.game.changeState('INTRO');
                    }
                }
            });
        });
    
        const inventoryClickHandler = (event: Event) => {
            if (!this.game.player || this.game.isPaused) return;
            const target = event.target as HTMLElement;
            const slot = target.closest('.inventory-slot') as HTMLElement | null;
            if (slot) {
                const index = parseInt(slot.dataset.slotIndex || '-1', 10);
                const type = slot.dataset.inventoryType;
                if (index > -1 && this.game.player) {
                    if (type === 'special') {
                        this.game.player.powerUpManager.activateSpecial(index);
                    } else if (type === 'ultra') {
                        this.game.player.powerUpManager.activateUltra(index);
                    }
                }
            }
        };
    
        if (this.specialInventoryEl) this.specialInventoryEl.addEventListener(eventType, inventoryClickHandler);
        if (this.ultraInventoryEl) this.ultraInventoryEl.addEventListener(eventType, inventoryClickHandler);
    }
    
    public applySettings(): void { 
        const t = (k:string) => this.localizationManager.translate(k);
        const setButtonText = (id: string, text: string) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };
        const setButtonActive = (id: string, isActive: boolean) => {
            const el = document.getElementById(id) as HTMLButtonElement;
            if (el) el.classList.toggle('active', isActive);
        };
    
        setButtonText('toggle-language', t('lang_native_name'));
        setButtonText('toggle-music', this.settings.music ? t('on') : t('off'));
        setButtonText('toggle-sfx', this.settings.sfx ? t('on') : t('off'));
        setButtonText('toggle-particles', [t('off'), t('low'), t('high')][this.settings.particles]!);
        setButtonText('toggle-shake', this.settings.screenShake ? t('on') : t('off'));
    
        setButtonActive('toggle-music', this.settings.music);
        setButtonActive('toggle-sfx', this.settings.sfx);
        setButtonActive('toggle-shake', this.settings.screenShake);
    
        this.soundManager.setVolume(this.settings.masterVolume); 
        this.soundManager.toggleMusic(this.settings.music); 
    }
    public saveSettings(): void { localStorage.setItem('galaxyFallCelestialSettings', JSON.stringify(this.settings)); }
    public loadSettings() { const saved = localStorage.getItem('galaxyFallCelestialSettings'); return saved ? JSON.parse(saved) : { masterVolume: 0.5, music: true, sfx: true, particles: 2, screenShake: false }; }
    public populateAllTranslatedContent() { this.populateArsenal(); this.populateGegner(); this.localizationManager.applyTranslationsToUI(); this.applySettings(); }
    public createEnemyIcon(enemyType: string): string { const canvas = document.createElement('canvas'); canvas.width = 60; canvas.height = 40; const ctx = canvas.getContext('2d')!; const tempGame = { width: 60, height: 40, enemySpeedMultiplier: 1, level: 1, uiManager: { settings: { particles: 0 } } } as unknown as Game; let dummyEnemy: Enemy | null = null; switch(enemyType) { case 'GRUNT': dummyEnemy = new Grunt(tempGame); break; case 'WEAVER': dummyEnemy = new Weaver(tempGame); break; case 'TANK': dummyEnemy = new Tank(tempGame); break; case 'SHOOTER': dummyEnemy = new Shooter(tempGame); break; case 'TELEPORTER': dummyEnemy = new Teleporter(tempGame); break; case 'BOSS_SENTINEL_PRIME': dummyEnemy = new BossSentinelPrime(tempGame, 1, 1); break; case 'BOSS_VOID_SERPENT': dummyEnemy = new BossVoidSerpent(tempGame, 1, 1); break; case 'BOSS_OMEGA_NEXUS': dummyEnemy = new BossOmegaNexus(tempGame, 1, 1); break; case 'BOSS_NEXUS_PRIME': dummyEnemy = new BossNexusPrime(tempGame, 1, 1); break; } if (dummyEnemy) { dummyEnemy.width = 54; dummyEnemy.height = 36; dummyEnemy.pos = new Vector2D(canvas.width / 2 - dummyEnemy.width / 2, canvas.height / 2 - dummyEnemy.height / 2); dummyEnemy.draw(ctx); } return canvas.toDataURL(); }
    public populateArsenal(): void { const pL=[{c:"arsenal_cat_weapon_upgrade",n:"powerup_wup_name",d:'powerup_wup_desc',t:'WEAPON_UP'},{c:"arsenal_cat_weapon_mod",n:"powerup_rapid_fire_name",d:'powerup_rapid_fire_desc',t:'RAPID_FIRE'},{c:"arsenal_cat_weapon_mod",n:"powerup_side_shots_name",d:'powerup_side_shots_desc',t:'SIDE_SHOTS'},{c:"arsenal_cat_ultra_weapon",n:"powerup_laser_name",d:'powerup_laser_desc',t:'LASER_BEAM'},{c:"arsenal_cat_ultra_weapon",n:"powerup_homing_missiles_name",d:'powerup_homing_missiles_desc',t:'HOMING_MISSILES'},{c:"arsenal_cat_defense",n:"powerup_shield_name",d:'powerup_shield_desc',t:'SHIELD'},{c:"arsenal_cat_defense",n:"powerup_repair_kit_name",d:'powerup_repair_kit_desc',t:'REPAIR_KIT'},{c:"arsenal_cat_defense",n:"powerup_extra_life_name",d:'powerup_extra_life_desc',t:'EXTRA_LIFE'},{c:"arsenal_cat_defense",n:"powerup_ghost_protocol_name",d:'powerup_ghost_protocol_desc',t:'GHOST_PROTOCOL'},{c:"arsenal_cat_defense",n:"powerup_orbital_drone_name",d:'powerup_orbital_drone_desc',t:'ORBITAL_DRONE'},{c:"arsenal_cat_special",n:"powerup_nuke_name",d:'powerup_nuke_desc',t:'NUKE'},{c:"arsenal_cat_special",n:"powerup_black_hole_name",d:'powerup_black_hole_desc',t:'BLACK_HOLE'},{c:"arsenal_cat_special",n:"powerup_score_boost_name",d:'powerup_score_boost_desc',t:'SCORE_BOOST'}]; const lE=document.getElementById('arsenal-list')!;lE.innerHTML='';let cC='';pL.forEach(p=>{const cN=this.localizationManager.translate(p.c);if(cN!==cC){cC=cN;lE.innerHTML+=`<h3>- ${cC} -</h3>`;} const iS=powerUpImageSources[p.t];lE.innerHTML+=`<div class="powerup-entry"><img src="${iS}" class="arsenal-icon" alt="${p.n}"/><div class="powerup-info"><div class="powerup-title">${this.localizationManager.translate(p.n)}</div><div class="powerup-desc">${this.localizationManager.translate(p.d)}</div></div></div>`;}); }
    public populateGegner(): void {
        const enemyList = [
            { nameKey: "gegner_grunt_name", descKey: "gegner_grunt_desc", type: 'GRUNT', strengthKey: 'strength_low' },
            { nameKey: "gegner_weaver_name", descKey: "gegner_weaver_desc", type: 'WEAVER', strengthKey: 'strength_low' },
            { nameKey: "gegner_tank_name", descKey: "gegner_tank_desc", type: 'TANK', strengthKey: 'strength_medium' },
            { nameKey: "gegner_shooter_name", descKey: "gegner_shooter_desc", type: 'SHOOTER', strengthKey: 'strength_medium' },
            { nameKey: "gegner_teleporter_name", descKey: "gegner_teleporter_desc", type: 'TELEPORTER', strengthKey: 'strength_high' }, // NEU
            { nameKey: "gegner_sentinel_prime_name", descKey: "gegner_sentinel_prime_desc", type: 'BOSS_SENTINEL_PRIME', strengthKey: 'strength_high' },
            { nameKey: "gegner_void_serpent_name", descKey: "gegner_void_serpent_desc", type: 'BOSS_VOID_SERPENT', strengthKey: 'strength_extreme' },
            { nameKey: "gegner_omega_nexus_name", descKey: "gegner_omega_nexus_desc", type: 'BOSS_OMEGA_NEXUS', strengthKey: 'strength_apocalyptic' },
            { nameKey: "gegner_nexus_prime_name", descKey: "gegner_nexus_prime_desc", type: 'BOSS_NEXUS_PRIME', strengthKey: 'strength_final' },
        ];
        const t = (key: string) => this.localizationManager.translate(key);
        const listEl = document.getElementById('gegner-list')!;
        listEl.innerHTML = `<h3>- ${t('gegner_header')} -</h3>`;
        enemyList.forEach(e => {
            const iconSrc = this.createEnemyIcon(e.type); const strengthClass = e.strengthKey.split('_')[1];
            listEl.innerHTML += `<div class="powerup-entry"> <img src="${iconSrc}" class="arsenal-icon" alt="${t(e.nameKey)} icon"/> <div class="powerup-info"> <div class="powerup-title"> <span>${t(e.nameKey)}</span> <span class="strength-indicator strength-${strengthClass}">${t(e.strengthKey)}</span> </div> <div class="powerup-desc">${t(e.descKey)}</div> </div> </div>`;
        });
    }
    public drawLevelMessage(): void { const ctx = this.ctx; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, this.game.height / 2 - 50, this.game.width, 100); ctx.fillStyle = '#FFFF00'; ctx.font = "30px 'Press Start 2P'"; ctx.fillText(this.game.levelMessage, this.game.width / 2, this.game.height / 2 + 10); }
    public drawGameOver(): void { 
        const ctx = this.ctx; 
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; 
        ctx.fillRect(0, 0, this.game.width, this.game.height); 
    }
    public drawWinScreen(): void { const ctx = this.ctx; const t = (key: string) => this.localizationManager.translate(key); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, this.game.width, this.game.height); ctx.fillStyle = '#39FF14'; ctx.font = "50px 'Press Start 2P'"; ctx.fillText(t('victory_title'), this.game.width / 2, this.game.height / 2 - 50); ctx.fillStyle = '#FFF'; ctx.font = "24px 'Press Start 2P'"; ctx.fillText(`${t('victory_final_score')}: ${this.game.score}`, this.game.width / 2, this.game.height / 2 + 20); ctx.font = "20px 'Press Start 2P'"; ctx.fillText(t('victory_prompt'), this.game.width / 2, this.game.height / 2 + 80); }
    public drawOverlay(): void { if (this.game.isBossActive) { const boss = this.game.entities.find(e => (e as Enemy).isBoss) as Enemy; if (boss) { const barY = 55; this.ctx.fillStyle = 'red'; this.ctx.fillRect(10, barY, this.game.width - 20, 15); this.ctx.fillStyle = 'green'; this.ctx.fillRect(10, barY, (this.game.width - 20) * (boss.health / boss.maxHealth), 15); } } }
}

const LEVELS: ILevelDefinition[] = [
    { wave: 1, scoreToEarn: 2000, enemies: ['GRUNT'], msgKey: "wave_msg_1", s: 1200, m: 1.0 },
    { wave: 2, scoreToEarn: 4000, enemies: ['GRUNT', 'WEAVER'], msgKey: "wave_msg_2", s: 1100, m: 1.05 },
    { wave: 3, scoreToEarn: 7000, enemies: ['GRUNT', 'GRUNT', 'WEAVER'], msgKey: "wave_msg_3", s: 1000, m: 1.1 },
    { wave: 4, scoreToEarn: 10000, enemies: ['GRUNT', 'TANK'], msgKey: "wave_msg_4", s: 1000, m: 1.15 },
    { wave: 5, scoreToEarn: 14000, enemies: ['WEAVER', 'WEAVER'], formation: 'V_SHAPE', msgKey: "formation_incoming", s: 900, m: 1.2 },
    { wave: 6, scoreToEarn: 18000, enemies: ['SHOOTER', 'GRUNT'], msgKey: "wave_msg_6", s: 850, m: 1.25 },
    { wave: 7, scoreToEarn: 23000, enemies: ['TANK', 'WEAVER'], msgKey: "wave_msg_7", s: 800, m: 1.3 },
    { wave: 8, scoreToEarn: 28000, enemies: ['SHOOTER', 'WEAVER', 'GRUNT'], msgKey: "wave_msg_8", s: 750, m: 1.35 },
    { wave: 9, scoreToEarn: 35000, enemies: ['SHOOTER', 'TANK'], formation: 'MATRIX', msgKey: "formation_incoming", s: 700, m: 1.4 },
    { wave: 10, scoreToEarn: 0, enemies: [], boss: 'BOSS_SENTINEL_PRIME', msgKey: "wave_msg_10", s: 0, m: 1.5 },
    { wave: 11, scoreToEarn: 45000, enemies: ['GRUNT', 'SHOOTER'], msgKey: "wave_msg_11", s: 650, m: 1.55 },
    { wave: 12, scoreToEarn: 55000, enemies: ['WEAVER', 'TANK', 'WEAVER'], msgKey: "wave_msg_12", s: 600, m: 1.6 },
    { wave: 13, scoreToEarn: 68000, enemies: ['TELEPORTER', 'GRUNT'], msgKey: "wave_msg_13", s: 1000, m: 1.65 },
    { wave: 14, scoreToEarn: 80000, enemies: ['SHOOTER', 'SHOOTER', 'TANK'], msgKey: "wave_msg_14", s: 550, m: 1.7 },
    { wave: 15, scoreToEarn: 95000, enemies: ['WEAVER', 'WEAVER', 'WEAVER'], formation: 'CIRCLE', msgKey: "formation_incoming", s: 500, m: 1.75 },
    { wave: 16, scoreToEarn: 110000, enemies: ['TELEPORTER', 'SHOOTER'], msgKey: "wave_msg_16", s: 900, m: 1.8 },
    { wave: 17, scoreToEarn: 130000, enemies: ['TANK', 'TANK', 'GRUNT'], msgKey: "wave_msg_17", s: 500, m: 1.85 },
    { wave: 18, scoreToEarn: 150000, enemies: ['SHOOTER', 'TELEPORTER', 'WEAVER'], msgKey: "wave_msg_18", s: 800, m: 1.9 },
    { wave: 19, scoreToEarn: 175000, enemies: ['TANK', 'SHOOTER', 'WEAVER', 'GRUNT'], formation: 'MATRIX', msgKey: "formation_incoming", s: 450, m: 2.0 },
    { wave: 20, scoreToEarn: 0, enemies: [], boss: 'BOSS_VOID_SERPENT', msgKey: "wave_msg_10", s: 0, m: 2.1 },
    { wave: 21, scoreToEarn: 200000, enemies: ['GRUNT', 'TELEPORTER'], msgKey: "wave_msg_1", s: 700, m: 2.2 },
    { wave: 22, scoreToEarn: 225000, enemies: ['SHOOTER', 'TANK', 'WEAVER'], msgKey: "wave_msg_2", s: 400, m: 2.3 },
    { wave: 23, scoreToEarn: 255000, enemies: ['WEAVER', 'TELEPORTER', 'WEAVER'], msgKey: "wave_msg_3", s: 700, m: 2.4 },
    { wave: 24, scoreToEarn: 285000, enemies: ['TANK', 'TANK', 'SHOOTER'], msgKey: "wave_msg_4", s: 380, m: 2.5 },
    { wave: 25, scoreToEarn: 320000, enemies: ['GRUNT', 'SHOOTER', 'TANK'], formation: 'V_SHAPE', msgKey: "formation_incoming", s: 350, m: 2.6 },
    { wave: 26, scoreToEarn: 360000, enemies: ['SHOOTER', 'SHOOTER', 'TELEPORTER'], msgKey: "wave_msg_6", s: 650, m: 2.7 },
    { wave: 27, scoreToEarn: 400000, enemies: ['TANK', 'WEAVER', 'TELEPORTER'], msgKey: "wave_msg_7", s: 600, m: 2.8 },
    { wave: 28, scoreToEarn: 450000, enemies: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER'], msgKey: "wave_msg_8", s: 320, m: 2.9 },
    { wave: 29, scoreToEarn: 500000, enemies: ['TELEPORTER', 'TANK', 'SHOOTER'], formation: 'MATRIX', msgKey: "formation_incoming", s: 300, m: 3.0 },
    { wave: 30, scoreToEarn: 0, enemies: [], boss: 'BOSS_OMEGA_NEXUS', msgKey: "wave_msg_15", s: 0, m: 3.2 },
    { wave: 31, scoreToEarn: 560000, enemies: ['GRUNT', 'SHOOTER', 'TELEPORTER'], msgKey: "wave_msg_11", s: 500, m: 3.3 },
    { wave: 32, scoreToEarn: 620000, enemies: ['WEAVER', 'TANK', 'WEAVER', 'TELEPORTER'], msgKey: "wave_msg_12", s: 450, m: 3.4 },
    { wave: 33, scoreToEarn: 690000, enemies: ['TELEPORTER', 'TELEPORTER'], msgKey: "wave_msg_13", s: 800, m: 3.5 },
    { wave: 34, scoreToEarn: 760000, enemies: ['SHOOTER', 'TANK', 'SHOOTER', 'TANK'], msgKey: "wave_msg_14", s: 280, m: 3.6 },
    { wave: 35, scoreToEarn: 840000, enemies: ['WEAVER', 'SHOOTER', 'TELEPORTER'], formation: 'CIRCLE', msgKey: "formation_incoming", s: 250, m: 3.7 },
    { wave: 36, scoreToEarn: 920000, enemies: ['TELEPORTER', 'SHOOTER', 'TANK'], msgKey: "wave_msg_16", s: 400, m: 3.8 },
    { wave: 37, scoreToEarn: 1000000, enemies: ['TANK', 'TANK', 'TANK'], msgKey: "wave_msg_17", s: 250, m: 4.0 },
    { wave: 38, scoreToEarn: 1100000, enemies: ['SHOOTER', 'SHOOTER', 'TELEPORTER', 'TELEPORTER'], msgKey: "wave_msg_18", s: 350, m: 4.2 },
    { wave: 39, scoreToEarn: 1250000, enemies: ['GRUNT', 'WEAVER', 'TANK', 'SHOOTER', 'TELEPORTER'], formation: 'MATRIX', msgKey: "formation_incoming", s: 200, m: 4.5 },
    { wave: 40, scoreToEarn: 0, enemies: [], boss: 'BOSS_NEXUS_PRIME', msgKey: "wave_msg_20", s: 0, m: 5.0 },
];


class Game {
    public canvas: HTMLCanvasElement; public ctx: CanvasRenderingContext2D; public readonly baseWidth: number = 800; public readonly baseHeight: number = 800; public width: number; public height: number; public keys: IKeyMap = {}; public gameState: string = 'LANGUAGE_SELECT'; public isPaused: boolean = false; public entities: Entity[] = []; public player: Player | null = null; public score: number = 0; public scoreEarnedThisLevel: number = 0; public level: number = 1; public highscore: number = 0; public isBossActive: boolean = false; public uiManager: UIManager; public stars: IStar[] = []; public enemySpawnTypes: string[] = []; public enemySpawnInterval: number = 1200; private enemySpawnTimer: number = 0; public enemySpeedMultiplier: number = 1.0; public enemyHealthMultiplier: number = 1; public levelMessage: string = ''; public levelScoreToEarn: number = 0;
    
    public isMobile: boolean = false; 
    public touchX: number | null = null; 
    public touchY: number | null = null;
    
    private container: HTMLElement;
    public scale: number = 1;

    // NEUE EIGENSCHAFTEN FÜR FORMATIONEN
    public isFormationActive: boolean = false;
    private formationEnemies: Enemy[] = [];
    private formationMovementDirection: number = 1;
    private formationMoveTimer: number = 0;
    private formationMoveInterval: number = 1000;
    private formationVerticalStep: number = 20;

    constructor(canvas: HTMLCanvasElement, ui: IUIElements) {
        this.canvas = canvas; this.ctx = canvas.getContext('2d')!;
        this.width = this.baseWidth;
        this.height = this.baseHeight;
        this.container = document.getElementById('gameContainer')!;
        this.highscore = parseInt(localStorage.getItem('galaxyFallCelestialHighscore') || '0');
        this.isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        this.uiManager = new UIManager(this, ui); 
        this.initEventListeners(); 
        this.createParallaxStarfield(); 
        this.uiManager.populateAllTranslatedContent();
        this.resizeGame(); 
        if (localStorage.getItem('galaxyFallLanguage')) this.changeState('INTRO'); else document.getElementById('language-select-screen')!.style.display = 'flex';
    }

    resizeGame(): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const scale = Math.min(screenWidth / this.baseWidth, screenHeight / this.baseHeight);
        this.scale = scale;
        this.container.style.transformOrigin = 'top left';
        this.container.style.transform = `scale(${scale})`;
        this.container.style.left = `${(screenWidth - this.baseWidth * scale) / 2}px`;
        this.container.style.top = `${(screenHeight - this.baseHeight * scale) / 2}px`;
        this.container.style.position = 'absolute';
    }
    
    initEventListeners(): void {
        window.addEventListener('resize', () => this.resizeGame());
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                if (this.uiManager.soundManager.audioCtx && this.uiManager.soundManager.audioCtx.state === 'suspended') {
                    this.uiManager.soundManager.audioCtx.resume();
                }
            }
        });

        const introTapHandler = (e: Event) => {
            if (this.gameState === 'INTRO') {
                e.preventDefault();
                this.uiManager.soundManager.initAudio();
                this.changeState('MENU');
                window.removeEventListener('touchstart', introTapHandler);
            }
        };

        if (this.isMobile) {
            this.initMobileControls();
            window.addEventListener('touchstart', introTapHandler, { once: true });
        } else {
            this.initDesktopControls();
        }
    }

    initMobileControls(): void {
        const getTouchPos = (e: TouchEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.touches[0].clientX - rect.left) / this.scale;
            const y = (e.touches[0].clientY - rect.top) / this.scale;
            return { x, y };
        };
    
        this.canvas.addEventListener('touchstart', (e) => {
            if (this.gameState !== 'PLAYING' || this.isPaused) return;
            
            e.preventDefault();
            this.uiManager.soundManager.initAudio();
            const pos = getTouchPos(e as TouchEvent);
            this.touchX = pos.x;
            this.touchY = pos.y;
        }, { passive: false });
    
        this.canvas.addEventListener('touchmove', (e) => {
            if (this.gameState !== 'PLAYING' || this.isPaused) return;
            e.preventDefault();
            const pos = getTouchPos(e as TouchEvent);
            this.touchX = pos.x;
            this.touchY = pos.y;
        }, { passive: false });
    
        this.canvas.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                this.touchX = null;
                this.touchY = null;
            }
        });
    }

    initDesktopControls(): void {
        const keyMap: { [key: string]: { type: 'special' | 'ultra', index: number } } = {
            'Digit1': { type: 'special', index: 0 }, 'Digit2': { type: 'special', index: 1 },
            'Digit3': { type: 'special', index: 2 }, 'Digit4': { type: 'ultra', index: 0 },
            'Digit5': { type: 'ultra', index: 1 },
        };
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Escape' && (this.gameState === 'PLAYING' || this.isPaused)) this.togglePause();
            if (e.code === 'Enter') {
                e.preventDefault();
                if (this.gameState === 'INTRO') {
                    this.uiManager.soundManager.initAudio();
                    this.changeState('MENU');
                } else if (this.gameState === 'MENU') {
                    this.uiManager.soundManager.initAudio();
                    this.changeState('LEVEL_START', true);
                } else if (['WIN'].includes(this.gameState)) {
                    this.changeState('MENU');
                }
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
                    if(e.code === chargedKey) {
                        e.preventDefault();
                        this.player.powerUpManager.activateSpecial(this.player.blackHoleChargeSlot);
                        this.player.isChargingBlackHole = false;
                        this.player.blackHoleChargeSlot = null;
                    }
                }
                else if (mapping) {
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
    
    changeState(newState: string, forceReset: boolean = false): void {
        if (newState === this.gameState && !forceReset) return;

        this.uiManager.toggleMainMenu(false);
        this.uiManager.togglePauseMenu(false);
        this.uiManager.toggleGameOverScreen(false);

        if (newState === 'PAUSED') {
            this.isPaused = true;
        } else if (this.gameState === 'PAUSED' && newState !== 'PAUSED') {
            this.isPaused = false;
        }
        this.gameState = newState;
        switch (newState) {
            case 'MENU':
                this.entities = [];
                this.player = null;
                this.uiManager.toggleMainMenu(true);
                this.uiManager.soundManager.setTrack('normal');
                break;
            case 'PAUSED':
                this.uiManager.togglePauseMenu(true);
                break;
            case 'LEVEL_START':
                if (forceReset) {
                    this.player = null;
                    this.level = 0;
                }
                if (!this.player || !this.player.isAlive()) {
                    this.level = 1;
                    this.score = 0;
                    this.player = new Player(this);
                    this.entities = [this.player];
                } else {
                    this.level++;
                }
                if (this.level > LEVELS.length) {
                    this.changeState('WIN');
                    return;
                }
                this.entities = this.entities.filter(e => e.family === 'player' || e.family === 'pickup');
                this.isBossActive = false;
                this.isFormationActive = false;
                this.formationEnemies = [];
                this.scoreEarnedThisLevel = 0;
                this.configureLevel();
                this.changeState('PLAYING_TRANSITION');
                break;
            case 'PLAYING_TRANSITION':
                setTimeout(() => this.changeState('PLAYING'), 3000);
                break;
            case 'GAME_OVER':
                if (this.score > this.highscore) {
                    this.highscore = this.score;
                    localStorage.setItem('galaxyFallCelestialHighscore', this.score.toString());
                }
                this.uiManager.soundManager.setTrack('normal');
                this.uiManager.toggleGameOverScreen(true);
                break;
            case 'WIN':
                if (this.score > this.highscore) {
                    this.highscore = this.score;
                    localStorage.setItem('galaxyFallCelestialHighscore', this.score.toString());
                }
                this.uiManager.soundManager.setTrack('normal');
                break;
        }
    }
    update(deltaTime: number): void { 
        if (this.isPaused) return; 
        if (this.gameState !== 'PLAYING') { 
            if (this.gameState !== 'LANGUAGE_SELECT') this.updateParallaxStarfield(deltaTime); 
            return; 
        } 
        this.updateParallaxStarfield(deltaTime); 
        this.entities.forEach(e => e.update(deltaTime)); 
        this.enemySpawnTimer += deltaTime; 
        
        if (this.isFormationActive) {
    this.updateFormation(deltaTime);
    if (this.formationEnemies.every(e => !e.isAlive())) {
        // Wenn die Formation besiegt ist, setzen wir nur noch das Flag zurück.
        // Der normale Spawn-Vorgang wird im nächsten Frame im 'else'-Block fortgesetzt.
        this.isFormationActive = false;
    }
} else if (this.isBossActive) {
    // ... (keine Änderung hier)
    const boss = this.entities.find(e => (e as Enemy).isBoss) as Enemy;
    if (boss) {
        const healthPercentage = boss.health / boss.maxHealth;
        const spawnInterval = 1000 + (4000 * healthPercentage);
        if(this.enemySpawnTimer > spawnInterval) {
             this.spawnEnemy(true); // Spawn a random add
             this.enemySpawnTimer = 0;
        }
    } else {
        this.isBossActive = false; // Boss is defeated
    }
} else {
     // Dieser Block wird nun nach dem Besiegen einer Formation ausgeführt
     if (this.enemySpawnTimer > this.enemySpawnInterval) {
        this.spawnEnemy(); 
        this.enemySpawnTimer = 0;
    }
    // Das Level endet, wenn die benötigten Punkte erreicht sind
    if (this.levelScoreToEarn > 0 && this.scoreEarnedThisLevel >= this.levelScoreToEarn) {
        this.changeState('LEVEL_START');
    }
}

        this.handleCollisions(); 
        this.cleanupEntities(); 
        if (this.player && !this.player.isAlive()) this.changeState('GAME_OVER'); 
        this.uiManager.update(); 
    }
    draw(): void {
        this.ctx.clearRect(0, 0, this.baseWidth, this.baseHeight);
        this.drawParallaxStarfield();
        this.entities.forEach(e => {
            e.draw(this.ctx);
        });
        this.uiManager.drawOverlay();
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
            case 'WIN':
                this.uiManager.drawWinScreen();
                break;
        }
    }

    configureLevel(): void { 
        const levelData = LEVELS[this.level - 1]!; 
        if (!levelData) { this.changeState('WIN'); return; } 
        this.enemySpawnTypes = levelData.enemies; 
        this.enemySpawnInterval = levelData.s; 
        this.enemySpeedMultiplier = levelData.m; 
        this.enemyHealthMultiplier = 1 + Math.floor(this.level / 5); 
        this.levelMessage = this.uiManager.localizationManager.translate(levelData.msgKey); 
        this.levelScoreToEarn = levelData.scoreToEarn; this.enemySpawnTimer = 0; this.uiManager.update(); 
        if (levelData.boss) { 
            this.isBossActive = true; 
            this.spawnEnemy(false, levelData.boss); 
            this.uiManager.soundManager.setTrack('boss'); 
        } else if (levelData.formation) {
            this.isFormationActive = true;
            this.spawnFormation(levelData.formation);
            this.uiManager.soundManager.setTrack('normal');
        } else { 
            this.uiManager.soundManager.setTrack('normal'); 
        } 
    }

    updateFormation(dt: number): void {
        this.formationMoveTimer += dt;
        if(this.formationMoveTimer < this.formationMoveInterval) return;

        this.formationMoveTimer = 0;
        let wallHit = false;
        for(const enemy of this.formationEnemies) {
            if(!enemy.isAlive()) continue;
            enemy.pos.x += 10 * this.formationMovementDirection;
            if (enemy.pos.x <= 0 || enemy.pos.x + enemy.width >= this.width) {
                wallHit = true;
            }
        }
        if (wallHit) {
            this.formationMovementDirection *= -1;
            for (const enemy of this.formationEnemies) {
                enemy.pos.y += this.formationVerticalStep;
            }
        }
    }
    
    spawnFormation(type: string): void {
        this.formationEnemies = [];
        const formationData = {
            rows: 5,
            cols: 8,
            hSpacing: 60,
            vSpacing: 50,
            startX: (this.width - (8 * 60)) / 2,
            startY: -250
        };

        for (let r = 0; r < formationData.rows; r++) {
            for (let c = 0; c < formationData.cols; c++) {
                let enemy: Enemy | null = null;
                const enemyType = r < 1 ? 'TANK' : (r < 3 ? 'WEAVER' : 'GRUNT');
                enemy = this.createEnemyByType(enemyType);

                if (enemy) {
                    enemy.pos.x = formationData.startX + c * formationData.hSpacing;
                    enemy.pos.y = formationData.startY + r * formationData.vSpacing;
                    enemy.speed = 0; // Movement is controlled by formation logic
                    enemy.inFormation = true;
                    this.formationEnemies.push(enemy);
                    this.addEntity(enemy);
                }
            }
        }
    }

    createParallaxStarfield(): void { this.stars = []; for (let i = 0; i < 300; i++) { const l = i < 100 ? 1 : (i < 200 ? 2 : 3); this.stars.push({ pos: new Vector2D(Math.random() * this.baseWidth, Math.random() * this.baseHeight), s: (4 - l) * 0.8, v: (4 - l) * 24, a: 1 - (l / 4) }); } }
    updateParallaxStarfield(dt: number): void { this.stars.forEach(s => { s.pos.y += s.v * (dt / 1000); if (s.pos.y > this.baseHeight) { s.pos.y = -(Math.random() * 50); s.pos.x = Math.random() * this.baseWidth; } }); }
    drawParallaxStarfield(): void { this.stars.forEach(s => { this.ctx.fillStyle = `rgba(255,255,255,${s.a})`; this.ctx.beginPath(); this.ctx.arc(s.pos.x, s.pos.y, s.s, 0, Math.PI * 2); this.ctx.fill(); }); }
    
    createEnemyByType(type: string): Enemy | null {
        switch (type) {
            case 'GRUNT': return new Grunt(this);
            case 'TANK': return new Tank(this);
            case 'WEAVER': return new Weaver(this);
            case 'SHOOTER': return new Shooter(this);
            case 'TELEPORTER': return new Teleporter(this);
            case 'BOSS_SENTINEL_PRIME': return new BossSentinelPrime(this, 100 * (1 + this.level/5), 1 + this.level/10);
            case 'BOSS_VOID_SERPENT': return new BossVoidSerpent(this, 120 * (1 + this.level/5), 1.1 + this.level/10);
            case 'BOSS_OMEGA_NEXUS': return new BossOmegaNexus(this, 150 * (1 + this.level/5), 1.2 + this.level/10);
            case 'BOSS_NEXUS_PRIME': return new BossNexusPrime(this, 200 * (1 + this.level/5), 1.3 + this.level/10);
            default: return null;
        }
    }
    
    spawnEnemy(isBossAdd: boolean = false, fixedType?: string): void {
        let type: string;
        if(fixedType) {
            type = fixedType;
        } else if (isBossAdd) {
            const addTypes = ['GRUNT', 'WEAVER', 'SHOOTER', 'TANK', 'TELEPORTER'];
            type = addTypes[Math.floor(Math.random() * addTypes.length)]!;
        } else {
            type = this.enemySpawnTypes[Math.floor(Math.random() * this.enemySpawnTypes.length)]!;
        }
        
        const enemy = this.createEnemyByType(type);
        if (enemy) this.addEntity(enemy);
    }
    
    drawProfessionalIntro(): void { const t = Date.now(), w = this.width, h = this.height, ctx = this.ctx; ctx.textAlign = 'center'; ctx.font = "60px 'Press Start 2P'"; ctx.fillStyle = '#0ff'; const p = Math.sin(t / 500) * 5 + 15; ctx.shadowColor = '#0ff'; ctx.shadowBlur = p; ctx.fillText("GALAXY FALL", w / 2, h / 2); const sG = ctx.createLinearGradient(w / 2 - 300, 0, w / 2 + 300, 0); const sP = (t % 3000) / 3000; sG.addColorStop(Math.max(0, sP - 0.2), 'rgba(255,255,255,0)'); sG.addColorStop(sP, 'rgba(255,255,255,0.8)'); sG.addColorStop(Math.min(1, sP + 0.2), 'rgba(255,255,255,0)'); ctx.fillStyle = sG; ctx.fillText("CELESTIAL", w / 2, h / 2 + 60); ctx.shadowBlur = 0; const a = Math.sin(t / 400) * 0.4 + 0.6; ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.font = "20px 'Press Start 2P'"; const promptKey = this.isMobile ? 'intro_prompt_mobile' : 'intro_prompt'; ctx.fillText(this.uiManager.localizationManager.translate(promptKey), w / 2, h / 2 + 140); }
    isColliding(a: Entity, b: Entity): boolean { return a.pos.x < b.pos.x + b.width && a.pos.x + a.width > b.pos.x && a.pos.y < b.pos.y + b.height && a.pos.y + a.height > b.pos.y; }
    addEntity(entity: Entity): void { this.entities.push(entity); }
    cleanupEntities(): void { this.entities = this.entities.filter(e => e.isAlive()); }
    handleCollisions(): void { const projectiles = this.entities.filter(e => e.family === 'projectile'); const enemies = this.entities.filter(e => e.family === 'enemy') as Enemy[]; const player = this.player; if (!player || !player.isAlive()) return; if (player.laser && player.laser.isAlive()) { for (const enemy of enemies) { if (!player.laser) break; if (this.isColliding(player.laser, enemy)) { enemy.takeHit(player.laser.damage); if (this.uiManager.settings.particles > 0 && player.laser) this.addEntity(new Particle(this, player.laser.pos.x + player.laser.width / 2, enemy.pos.y, '#FF8C00')); } } } projectiles.forEach(p => { if (p instanceof Projectile && p.type !== 'ENEMY_PROJECTILE') { for (const e of enemies) { if (p.isAlive() && e.isAlive() && this.isColliding(p, e)) { if (p instanceof PiercingProjectile) { if (!p.hasHit(e)) { p.onHit(e); e.takeHit(p.damage); } continue; } p.onHit(e); if (!(p instanceof BlackHoleProjectile)) e.takeHit(p.damage); break; } } } }); const pickups = this.entities.filter(e => e.family === 'pickup'); pickups.forEach(p => { if (p.isAlive() && this.isColliding(player, p)) { (p as PowerUp | Coin).onCollect(); } }); if (!player.isGhosted()) { enemies.forEach(e => { if (e.isAlive() && this.isColliding(player, e)) { e.takeHit(e.isBoss ? 10 : 999); player.takeHit(e.collisionDamage); } }); this.entities.filter(e => e.type === 'ENEMY_PROJECTILE').forEach(p => { const proj = p as EnemyProjectile; if (proj.isAlive() && this.isColliding(player, proj)) { proj.destroy(); player.takeHit(proj.playerDamage); } }); } }
}

// --- SECTION 8: INITIALISIERUNG ---
window.addEventListener('load', function () {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const uiElements: IUIElements = { 
        score: document.getElementById('score')!, 
        level: document.getElementById('level')!, 
        highscore: document.getElementById('highscore')!, 
        specialInventory: document.getElementById('special-inventory')!, 
        ultraInventory: document.getElementById('ultra-inventory')!, 
        livesDisplay: document.getElementById('lives-display')!, 
        weaponStatus: document.getElementById('weapon-status')!, 
        energyBar: document.getElementById('energy-bar')!,
        weaponTierDisplay: document.getElementById('weapon-tier-display')!
    };
    const game = new Game(canvas, uiElements);
    let lastTime = 0;
    function gameLoop(timestamp: number) {
        if (!lastTime) lastTime = timestamp; let deltaTime = timestamp - lastTime; lastTime = timestamp;
        deltaTime = Math.min(deltaTime, 100);
        game.update(deltaTime); game.draw(); requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
});