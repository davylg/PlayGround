import * as THREE from 'three';
import { CHARACTERS, getCharacter, getRole } from '../data/characters.js';
import { World } from './World.js';
import { Effects } from './Effects.js';
import { Player } from './Player.js';
import { Bot } from './Bot.js';
import { TeamManager } from './TeamManager.js';
import { RoundManager } from './RoundManager.js';
import { BombController } from './BombController.js';
import { HUDController } from './HUDController.js';

const botWeaponPool = ['rifle', 'rifle', 'smg', 'shotgun', 'sniper'];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export class GameManager {
  constructor({ settings, audio, input }) {
    this.settings = settings;
    this.audio = audio;
    this.input = input;
    this.scene = null;
    this.world = null;
    this.effects = null;
    this.player = null;
    this.bots = [];
    this.teamManager = null;
    this.roundManager = null;
    this.bombController = null;
    this.hud = null;
    this.zones = [];
    this.activeCamera = null;
    this.spectatorCamera = null;
    this.elapsed = 0;
    this.controlsEnabled = false;
    this.paused = false;
    this.matchActive = false;
    this.lastMatch = null;
    this.lastEnemyShot = null;
    this.onRematch = null;
    this.onExitToMenu = null;
    this.openSettings = null;
  }

  startMatch({ characterId, primaryWeapon = 'rifle', side = 'auto', winTarget = 4 }) {
    this.clearGame();
    const chosenSide = side === 'auto' ? (Math.random() > 0.5 ? 'attackers' : 'defenders') : side;
    this.lastMatch = { characterId, primaryWeapon, side: chosenSide, winTarget };
    this.matchActive = true;
    this.elapsed = 0;
    this.paused = false;
    this.zones = [];

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0a0f15');
    this.world = new World(this.scene, { quality: this.settings.get('quality') || 'high' });
    this.effects = new Effects(this.scene);
    this.teamManager = new TeamManager();
    this.hud = new HUDController(this);
    this.bombController = new BombController(this);
    this.roundManager = new RoundManager(this, { winTarget });

    const character = getCharacter(characterId);
    this.player = new Player(character, chosenSide, this, primaryWeapon);
    this.teamManager.register(this.player, chosenSide);
    this.hud.setPlayer(this.player);
    this.activeCamera = this.player.camera;

    // Fill the remaining team slots with bots. Player's side gets 3 allies, the enemy side 4.
    const allyCount = 3;
    const enemyCount = 4;
    const allyTeam = chosenSide;
    const enemyTeam = chosenSide === 'attackers' ? 'defenders' : 'attackers';
    const available = shuffle(CHARACTERS.filter((c) => c.id !== character.id));
    let cursor = 0;
    for (let i = 0; i < allyCount; i++) {
      const data = available[cursor++ % available.length];
      const bot = new Bot(data, allyTeam, this, i, botWeaponPool[Math.floor(Math.random() * botWeaponPool.length)]);
      this.teamManager.register(bot, allyTeam);
      this.bots.push(bot);
    }
    for (let i = 0; i < enemyCount; i++) {
      const data = available[cursor++ % available.length];
      const bot = new Bot(data, enemyTeam, this, i, botWeaponPool[Math.floor(Math.random() * botWeaponPool.length)]);
      this.teamManager.register(bot, enemyTeam);
      this.bots.push(bot);
    }

    this.spectatorCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);
    this.spectatorCamera.rotation.order = 'YXZ';
    this.scene.add(this.spectatorCamera);

    // Callbacks for mobile actions that are not owned by the player controller.
    this.input.callbacks.aim = () => { this.input.aiming = !this.input.aiming; };
    this.input.callbacks.pause = () => this.togglePause(true);

    // Seat the player at their spawn right away so the camera starts in a sane place.
    this.player.resetForRound(this.world.getSpawn(this.player.team, 0));
    this.activeCamera = this.player.camera;

    this.roundManager.start();
    this.audio.setMode('game');
    this.hud.resetForRound();
    this.hud.showPointerHint(!this.input.isTouch);
  }

  clearGame() {
    this.matchActive = false;
    this.controlsEnabled = false;
    this.paused = false;
    this.elapsed = 0;
    this.zones = [];
    this.bots = [];
    this.player = null;
    this.teamManager = null;
    this.roundManager = null;
    this.bombController = null;
    this.world = null;
    this.effects = null;
    this.activeCamera = null;
    this.spectatorCamera = null;
    this.hud = null;
    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      this.scene.clear();
      this.scene = null;
    }
  }

  getCombatants() {
    return this.player ? [this.player, ...this.bots] : [];
  }

  canUseAbilities() {
    return this.roundManager?.canUseAbilities() || false;
  }

  canShoot() {
    return this.roundManager?.canShoot() || false;
  }

  onCombatantDeath(victim, attacker, info = {}) {
    if (attacker && attacker !== victim) {
      attacker.kills = (attacker.kills || 0) + 1;
      if (attacker.abilities?.onKill) attacker.abilities.onKill();
    }
    const color = victim.team === 'attackers' ? '#ff633f' : '#4adfff';
    this.hud?.addKillfeed(attacker ? attacker.name : 'AMBIENTE', victim.name, color, !!info.headshot);
    if (attacker === this.player && victim !== this.player) {
      this.hud?.showKill(victim.name, !!info.headshot);
      this.audio.sfx(info.headshot ? 'headshot' : 'hit');
    }
    if (victim === this.player) {
      this.controlsEnabled = false;
      this.input.setEnabled(false);
    }
  }

  applyDamage(target, amount, attacker, info = {}) {
    if (!target || !target.isAlive || !this.matchActive) return { damage: 0, killed: false };
    const result = target.takeDamage(amount, attacker, info);
    if (attacker === this.player && target !== this.player) {
      this.effects.damageNumber(target.getHeadPosition(), result.damage, !!info.headshot);
      this.hud.hitmarker(!!info.headshot);
      if (result.killed) this.audio.sfx(info.headshot ? 'headshot' : 'hit');
      else this.audio.sfx('hit');
    } else if (result.killed && attacker && attacker !== this.player) {
      this.audio.sfx('hurt');
    }
    return result;
  }

  registerZone(zone) {
    this.zones.push(zone);
  }

  updateZones(dt) {
    for (let i = this.zones.length - 1; i >= 0; i--) {
      const zone = this.zones[i];
      zone.duration -= dt;
      zone.tick -= dt;
      if (zone.duration <= 0) {
        this.zones.splice(i, 1);
        continue;
      }
      if (zone.tick > 0) continue;
      zone.tick = 0.5;
      for (const combatant of this.getCombatants()) {
        if (!combatant.isAlive) continue;
        const dist = combatant.position.distanceTo(zone.center);
        if (dist > zone.radius) continue;
        if (zone.type === 'damage' && combatant.team !== zone.owner.team) {
          const raw = (zone.dps || 12) * 0.5;
          this.applyDamage(combatant, raw, zone.owner, { ability: 'zone' });
        } else if (zone.type === 'heal' && combatant.team === zone.owner.team) {
          combatant.heal(zone.heal || 5, true);
        } else if (zone.type === 'slow' && combatant.team !== zone.owner.team) {
          combatant.slowUntil = Math.max(combatant.slowUntil || 0, this.elapsed + 0.7);
          combatant.slowFactor = zone.slow || 0.5;
        }
      }
    }
  }

  resetRound() {
    if (!this.player || !this.world) return;
    // Clear temporary ability objects, tracers and effects from the last round.
    if (this.world.dynamicGroup) {
      for (let i = this.world.dynamicGroup.children.length - 1; i >= 0; i--) {
        const child = this.world.dynamicGroup.children[i];
        this.world.dynamicGroup.remove(child);
      }
      this.world.temporary = [];
      this.world.smokes = [];
      this.world.dynamicGroup.userData.zones = [];
    }
    this.zones = [];
    this.effects.clear();

    for (const combatant of this.getCombatants()) {
      const spawn = this.world.getSpawn(combatant.team, combatant.isPlayer ? 0 : combatant.index);
      combatant.resetForRound(spawn);
    }
    this.bombController?.reset();
    this.hud?.resetForRound();
    this.activeCamera = this.player.camera;
    this.player.camera.aspect = this.aspect || 1;
    this.player.camera.updateProjectionMatrix();
    this.spectatorCamera?.aspect && (this.spectatorCamera.aspect = this.aspect || 1);
    this.spectatorCamera?.updateProjectionMatrix();
    this.controlsEnabled = false;
  }

  updateSpectatorCamera(dt) {
    if (!this.spectatorCamera || this.player.isAlive) return;
    const allies = this.teamManager.getTeam(this.player.team).members.filter((m) => m.isAlive);
    let target;
    if (allies.length) {
      target = allies[0];
    } else {
      target = this.bots.find((b) => b.isAlive) || this.player;
    }
    const desired = target.position.clone().add(new THREE.Vector3(2.7, 3.1, 3.2));
    this.spectatorCamera.position.lerp(desired, Math.min(1, dt * 2.8));
    const look = target.getChestPosition ? target.getChestPosition() : target.position.clone().setY(1.2);
    this.spectatorCamera.lookAt(look);
    if (target !== this.player) this.hud?.setSpectator(target.name);
  }

  togglePause(visible) {
    if (!this.matchActive || this.roundManager?.state === 'MatchFinished') return;
    this.paused = visible;
    this.controlsEnabled = !visible;
    this.input.setEnabled(!visible);
    this.hud?.togglePause(visible);
    if (!visible && !this.input.isTouch) {
      const canvas = document.getElementById('game-canvas');
      canvas?.requestPointerLock?.();
    }
  }

  update(dt) {
    if (!this.matchActive || !this.scene || this.paused) return;
    dt = Math.min(dt, 0.05);
    dt *= this.timeScale || 1;
    // Sub-step large frames so movement/bots stay stable on slow devices and
    // during accelerated testing.
    const steps = Math.min(8, Math.max(1, Math.ceil(dt / 0.05)));
    const stepDt = dt / steps;
    for (let i = 0; i < steps; i++) {
      this.step(stepDt);
      if (!this.matchActive) break;
    }
  }

  step(dt) {
    this.elapsed += dt;
    this.roundManager?.update(dt);
    this.world?.update(dt);
    this.bombController?.update(dt);
    this.updateZones(dt);
    this.player?.update(dt);
    for (const bot of this.bots) bot.update(dt);
    this.effects?.update(dt);
    this.hud?.update(dt);
    this.updateSpectatorCamera(dt);
    if (!this.player.isAlive) this.activeCamera = this.spectatorCamera || this.player.camera;
    else if (this.activeCamera !== this.player.camera) this.activeCamera = this.player.camera;
  }

  onRoundEnd(winner, reason) {
    if (this.roundManager?.state === 'MatchFinished') return;
    // Keep camera active but freeze combat interaction.
    this.input.setEnabled(false);
    this.controlsEnabled = false;
  }

  setViewport(aspect) {
    this.aspect = aspect;
    if (this.player) {
      this.player.camera.aspect = aspect;
      this.player.camera.updateProjectionMatrix();
    }
    if (this.spectatorCamera) {
      this.spectatorCamera.aspect = aspect;
      this.spectatorCamera.updateProjectionMatrix();
    }
  }

  dispose() {
    this.clearGame();
  }
}
