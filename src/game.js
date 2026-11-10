import * as THREE from 'three';
import { AGENTS, AGENT_BY_ID, MAP_BY_ID, WEAPONS } from './data.js';
import { sound } from './audio.js';
import { NavGrid, resolveCollision, pointInBox } from './nav.js';
import { createWorld, createRenderer, createComposer, createAgentModel, makeViewModel, createGunMesh, clamp, lerp, rand, pick } from './world.js';

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _ray = new THREE.Ray();
const _sphere = new THREE.Sphere();
const _box = new THREE.Box3();

const angleDelta = (a, b) => {
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

const DIFFICULTY = {
  recruit: { aim: 0.07, reaction: 0.58, burst: 0.75, ability: 0.035 },
  pro: { aim: 0.035, reaction: 0.36, burst: 0.9, ability: 0.07 },
  elite: { aim: 0.018, reaction: 0.23, burst: 1.0, ability: 0.1 }
};

export class Game {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.callbacks = callbacks;
    this.renderer = null;
    this.composer = null;
    this.scene = null;
    this.camera = null;
    this.world = null;
    this.running = false;
    this.uiBlocked = false;
    this.chatOpen = false;
    this.pointerLocked = false;
    this.sensitivity = 1;
    this.isTouch = matchMedia('(pointer: coarse)').matches;
    this.keys = new Set();
    this.moveInput = { x: 0, y: 0 };
    this.touchLook = { x: 0, y: 0 };
    this.fireHeld = false;
    this.adsHeld = false;
    this.interactHeld = false;
    this.time = 0;
    this.lastHud = 0;
    this.raf = 0;
    this.lastFrame = performance.now();
    this.killfeed = [];
    this.chat = [];
    this.effects = [];
    this.tracers = [];
    this.impacts = [];
    this.smokes = [];
    this.fires = [];
    this.barriers = [];
    this.decoys = [];
    this.reveals = [];
    this.bombMesh = null;
    this.dynamicColliders = [];
    this.hitFlash = 0;
    this.shake = 0;
    this.mobile = false;
    this.netRole = null;
    this.netLink = null;
    this.netPeers = new Map();
    this.netSelfId = null;
    this.netHostId = null;
    this.netSnapshotClock = 0;
    this.netInputClock = 0;
    this.netLastShot = 0;
    this.bindInput();
  }

  bindInput() {
    this.onKeyDown = e => {
      if (e.repeat) return;
      if (this.chatOpen) return;
      const k = e.key.toLowerCase();
      this.keys.add(k);
      if (k === 'e') this.interactHeld = true;
      if (k === 'r') this.reload();
      if (k === 'q') this.useAbility();
      if (k === '1') this.switchWeapon('primary');
      if (k === '2') this.switchWeapon('sidearm');
      if (k === ' ') e.preventDefault();
    };
    this.onKeyUp = e => {
      const k = e.key.toLowerCase();
      this.keys.delete(k);
      if (k === 'e') this.interactHeld = false;
    };
    this.onMouseMove = e => {
      if (this.uiBlocked || this.chatOpen || !this.player) return;
      if (!this.pointerLocked && !(e.buttons & 1)) return;
      const sens = 0.0021 * this.sensitivity * (this.adsHeld ? 0.62 : 1);
      this.player.yaw -= e.movementX * sens;
      this.player.pitch = clamp(this.player.pitch - e.movementY * sens, -1.42, 1.42);
    };
    this.onMouseDown = e => {
      if (this.uiBlocked || this.chatOpen || !this.player) return;
      if (e.button === 0) {
        if (!this.pointerLocked && !this.isTouch) {
          this.canvas.requestPointerLock?.();
        }
        this.fireHeld = true;
        this.tryPlayerShoot(true);
      }
      if (e.button === 2) this.adsHeld = true;
    };
    this.onMouseUp = e => {
      if (e.button === 0) this.fireHeld = false;
      if (e.button === 2) this.adsHeld = false;
    };
    this.onContext = e => e.preventDefault();
    this.onPointerLock = () => {
      this.pointerLocked = document.pointerLockElement === this.canvas;
      this.emit('pointerlock', this.pointerLocked);
    };
    this.onResize = () => this.resize();

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onResize);
    document.addEventListener('pointerlockchange', this.onPointerLock);
    this.canvas.addEventListener('contextmenu', this.onContext);
  }

  emit(type, data = {}) {
    if (this.netRole === 'host' && this.netLink && !['hud', 'shot', 'hitmarker', 'damage', 'weaponSwitch', 'purchase'].includes(type)) {
      this.netLink.broadcast({ kind: 'event', type, data });
    }
    if (type === 'hud') this.callbacks.onHud?.(data);
    else this.callbacks.onEvent?.(type, data);
  }

  async start(config) {
    this.stopLoop();
    this.config = {
      agentId: config.agentId || AGENTS[0].id,
      mapId: config.mapId || 'docks',
      difficulty: config.difficulty || 'pro',
      mode: config.mode || 'solo'
    };
    this.map = MAP_BY_ID[this.config.mapId] || MAP_BY_ID.docks;
    this.agent = AGENT_BY_ID[this.config.agentId] || AGENTS[0];
    this.difficulty = DIFFICULTY[this.config.difficulty] || DIFFICULTY.pro;
    this.round = 0;
    this.score = { alpha: 0, bravo: 0 };
    this.sideAlpha = 'attack';
    this.halftimeDone = false;
    this.matchOver = false;
    this.killfeed = [];
    this.chat = [];
    this.effects = [];
    this.tracers = [];
    this.impacts = [];
    this.smokes = [];
    this.fires = [];
    this.barriers = [];
    this.decoys = [];
    this.reveals = [];
    this.dynamicColliders = [];
    this.time = 0;
    this.lastHud = 0;
    this.phase = 'buy';
    this.phaseTime = 15;
    this.roundTime = 90;
    this.targetSite = pick(this.map.sites);
    this.bomb = { state: 'carried', carrier: null, position: null, timer: 0, defuse: 0, plant: 0, site: null, planter: null };
    this.bombMesh = null;
    this.buildScene();
    this.buildEntities();
    this.beginRound(true);
    this.running = true;
    this.lastFrame = performance.now();
    this.loop();
    this.emit('matchStart', { map: this.map, player: this.player });
    setTimeout(() => this.emit('pointerlock', false), 20);
    return this;
  }

  buildScene() {
    if (this.world?.scene) {
      this.scene?.clear();
      this.world = null;
    }
    this.world = createWorld(this.map);
    this.scene = this.world.scene;
    this.world.dynamicColliders = this.dynamicColliders;
    this.nav = new NavGrid(this.map, this.world.colliders, 1.25);
    if (!this.renderer) this.renderer = createRenderer(this.canvas);
    this.renderer.setSize(this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, false);
    this.camera = new THREE.PerspectiveCamera(78, (this.canvas.clientWidth || window.innerWidth) / (this.canvas.clientHeight || window.innerHeight), 0.025, 240);
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);
    this.viewmodel = makeViewModel(this.player?.weaponId || this.agent.weapon);
    this.viewmodel.position.copy(this.viewmodel.userData.basePos);
    this.camera.add(this.viewmodel);
    this.composer?.dispose?.();
    const c = createComposer(this.renderer, this.scene, this.camera);
    this.composer = c.composer;
    this.bloom = c.bloom;
    this.resize();
  }

  buildEntities() {
    const others = AGENTS.filter(a => a.id !== this.agent.id).sort(() => Math.random() - 0.5);
    this.agents = [];
    this.player = {
      id: 'player', isPlayer: true, team: 'alpha', name: 'YOU', agentId: this.agent.id,
      pos: new THREE.Vector3(), yaw: 0, pitch: 0, health: 100, armor: 0, alive: true,
      money: 800, sidearm: 'standard', primary: null, weaponId: 'standard',
      ammo: WEAPONS.standard.mag, reserve: WEAPONS.standard.reserve, reloading: 0,
      kills: 0, deaths: 0, abilityCd: 0, abilityMax: this.agent.power.cooldown, abilityUsed: false,
      overclockUntil: 0, invisUntil: 0, blindUntil: 0, lastShot: 0, lastStep: 0,
      mesh: null, bomb: false, wasAlive: true, damageTaken: 0
    };
    this.agents.push(this.player);
    const offsets = [[-5.2, 0.4], [-2.6, -0.6], [0, 0.2], [2.6, -0.6], [5.2, 0.4]];
    for (let i = 0; i < 9; i++) {
      const a = others[i];
      const team = i < 4 ? 'alpha' : 'bravo';
      const idx = this.agents.length;
      const bot = {
        id: 'bot' + i, isPlayer: false, team, name: a.name, agentId: a.id, agent: a,
        pos: new THREE.Vector3(), yaw: 0, pitch: 0, health: 100, armor: 0, alive: true,
        money: 800, sidearm: 'standard', primary: null, weaponId: 'standard',
        ammo: WEAPONS.standard.mag, reserve: WEAPONS.standard.reserve, reloading: 0,
        kills: 0, deaths: 0, abilityCd: 0, abilityMax: a.power.cooldown, abilityUsed: false,
        overclockUntil: 0, invisUntil: 0, blindUntil: 0, lastShot: 0,
        mesh: null, bomb: false, wasAlive: true, target: null, targetKind: 'agent',
        path: [], pathIndex: 0, pathTarget: '', nextPath: 0, nextThink: 0,
        strafe: 0, nextStrafe: 0, reaction: 0, aimYaw: 0, aimPitch: 0,
        nextShot: 0, plantProgress: 0, defuseProgress: 0, site: this.map.sites[i % 2],
        damageTaken: 0, lastHit: 0, decoyTarget: null
      };
      const mesh = createAgentModel(a, team, idx, a.name);
      mesh.position.copy(bot.pos);
      this.scene.add(mesh);
      bot.mesh = mesh;
      this.agents.push(bot);
    }
    this.player.mesh = null;
    this.alphaBots = this.agents.filter(a => a.team === 'alpha' && !a.isPlayer);
    this.bravoBots = this.agents.filter(a => a.team === 'bravo');
    this.teammates = this.agents.filter(a => a.team === 'alpha');
    this.enemies = this.agents.filter(a => a.team === 'bravo');
  }

  sideOf(team) { return team === 'alpha' ? this.sideAlpha : (this.sideAlpha === 'attack' ? 'defense' : 'attack'); }
  attackTeam() { return this.sideAlpha === 'attack' ? 'alpha' : 'bravo'; }
  defenseTeam() { return this.sideAlpha === 'defense' ? 'alpha' : 'bravo'; }

  spawnPoint(team, index) {
    const side = this.sideOf(team);
    const sp = this.map.spawns[side];
    const offs = [[-5.2, 0.4], [-2.6, -0.6], [0, 0.2], [2.6, -0.6], [5.2, 0.4]];
    const o = offs[index % 5];
    return { x: sp.x + o[0], z: sp.z + o[1], yaw: side === 'attack' ? 0 : Math.PI };
  }

  beginRound(first = false) {
    if (this.matchOver) return;
    this.round++;
    this.phase = 'buy';
    this.phaseTime = 15;
    this.roundTime = 90;
    this.targetSite = pick(this.map.sites);
    this.bomb = { state: 'carried', carrier: null, position: null, timer: 0, defuse: 0, plant: 0, site: null, planter: null };
    this.clearBombMesh();
    this.clearRoundEffects();
    this.interactHeld = false;
    this.fireHeld = false;
    this.adsHeld = false;
    this.player.reloading = 0;
    this.player.pitch = 0;
    const teamIndex = { alpha: 0, bravo: 0 };
    for (const a of this.agents) {
      const idx = teamIndex[a.team]++;
      const sp = this.spawnPoint(a.team, idx);
      a.pos.set(sp.x, 0, sp.z);
      a.yaw = sp.yaw;
      a.aimYaw = sp.yaw;
      a.aimPitch = 0;
      a.pitch = 0;
      a.health = 100;
      if (!a.wasAlive) a.armor = 0;
      a.alive = true;
      a.damageTaken = 0;
      a.abilityCd = 0;
      a.abilityUsed = false;
      a.overclockUntil = 0;
      a.invisUntil = 0;
      a.blindUntil = 0;
      a.target = null;
      a.path = [];
      a.pathIndex = 0;
      a.pathTarget = '';
      a.nextPath = 0;
      a.plantProgress = 0;
      a.defuseProgress = 0;
      a.reaction = 0;
      if (!a.wasAlive) {
        a.primary = null;
      }
      a.wasAlive = true;
      a.weaponId = a.primary || a.sidearm || 'standard';
      const w = WEAPONS[a.weaponId] || WEAPONS.standard;
      a.ammo = w.mag;
      a.reserve = w.reserve;
      if (a.mesh) {
        a.mesh.visible = true;
        a.mesh.position.copy(a.pos);
        a.mesh.rotation.y = a.yaw;
        const gun = a.mesh.userData.gun;
        if (gun) {
          gun.visible = true;
        }
      }
      if (a.isPlayer) {
        this.viewmodel?.removeFromParent();
        this.viewmodel = makeViewModel(a.weaponId);
        this.viewmodel.position.copy(this.viewmodel.userData.basePos);
        this.camera.add(this.viewmodel);
      }
    }
    const attackers = this.agents.filter(a => a.alive && a.team === this.attackTeam());
    const carrier = pick(attackers);
    if (carrier) {
      this.bomb.carrier = carrier;
      carrier.bomb = true;
    }
    for (const a of this.agents) if (!a.isPlayer) this.botBuy(a);
    this.emit('buyStart', { round: this.round, time: 15, targetSite: this.targetSite.id });
    this.emit('roundStart', { round: this.round, side: this.sideOf('alpha'), targetSite: this.targetSite.id });
    setTimeout(() => {
      if (this.phase === 'buy') this.botChat(this.targetSite.id === 'A' ? 'A site. Move with me.' : 'B site. Watch the cross.');
    }, 1100);
    if (first) setTimeout(() => this.emit('welcome'), 400);
  }

  botBuy(bot) {
    const sig = WEAPONS[bot.agent.weapon];
    if (!bot.primary && sig && bot.money >= sig.cost) {
      bot.primary = sig.id;
      bot.money -= sig.cost;
    }
    if (!bot.primary) {
      bot.primary = null;
      bot.weaponId = 'standard';
    } else {
      bot.weaponId = bot.primary;
    }
    if (bot.money >= 800) {
      bot.armor = 50; bot.money -= 800;
    } else if (bot.money >= 400) {
      bot.armor = 25; bot.money -= 400;
    }
    const w = WEAPONS[bot.weaponId] || WEAPONS.standard;
    bot.ammo = w.mag; bot.reserve = w.reserve;
  }

  clearRoundEffects() {
    for (const e of this.effects) this.removeEffect(e);
    this.effects = [];
    for (const s of this.smokes) this.removeEffect(s);
    this.smokes = [];
    for (const f of this.fires) this.removeEffect(f);
    this.fires = [];
    for (const b of this.barriers) this.removeEffect(b);
    this.barriers = [];
    for (const d of this.decoys) this.removeEffect(d);
    this.decoys = [];
    this.reveals = [];
    for (const t of this.tracers) this.scene.remove(t.line);
    this.tracers = [];
    for (const i of this.impacts) this.scene.remove(i.mesh);
    this.impacts = [];
    this.dynamicColliders = [];
  }

  clearBombMesh() {
    if (this.bombMesh) {
      this.scene.remove(this.bombMesh);
      this.bombMesh = null;
    }
  }

  stopLoop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose() {
    this.stopLoop();
    this.running = false;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('pointerlockchange', this.onPointerLock);
    this.canvas.removeEventListener('contextmenu', this.onContext);
    this.composer?.dispose?.();
    this.renderer?.dispose?.();
  }

  resize() {
    if (!this.renderer || !this.camera) return;
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.composer?.setSize(w, h);
    if (this.bloom) this.bloom.resolution.set(w, h);
  }

  loop() {
    if (!this.running) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    this.time += dt;
    this.update(dt);
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(() => this.loop());
  }

  update(dt) {
    if (!this.player) return;
    if (this.netRole === 'client') {
      this.updateNetClient(dt);
      this.updateVisuals(dt);
      this.updateEffects(dt);
      this.updateCamera(dt);
      this.world.update(dt, this.time);
      if (this.bombMesh) {
        this.bombMesh.rotation.y += dt * 0.6;
        const pulse = 1.1 + Math.sin(this.time * 4) * 0.35;
        if (this.bombMesh.userData.light) this.bombMesh.userData.light.intensity = pulse;
        if (this.bombMesh.userData.core) this.bombMesh.userData.core.material.opacity = 0.45 + pulse * 0.15;
      }
      if (this.time - this.lastHud > 0.08) {
        this.lastHud = this.time;
        this.emit('hud', this.getState());
      }
      return;
    }
    if (this.phase === 'buy') {
      this.phaseTime -= dt;
      if (this.phaseTime <= 0) {
        this.phase = 'live';
        this.phaseTime = 0;
        this.emit('liveStart');
        sound.roundStart();
        this.botChat('Weapons hot. Go.');
      }
    } else if (this.phase === 'live') {
      this.roundTime -= dt;
      if (this.roundTime <= 0 && this.bomb.state !== 'planted') {
        this.endRound(this.defenseTeam(), 'Time expired');
      }
    } else if (this.phase === 'roundEnd' || this.phase === 'halftime') {
      this.phaseTime -= dt;
      if (this.phaseTime <= 0) this.advancePhase();
    }

    if (this.phase === 'live') {
      this.updatePlayer(dt);
      this.updateBomb(dt);
      for (const bot of this.agents) if (!bot.isPlayer && bot.alive) this.updateBot(bot, dt);
      this.updateAbilityEffects(dt);
      this.checkElimination();
    } else if (this.phase === 'buy') {
      this.updatePlayerBuy(dt);
      this.updateAbilityEffects(dt);
    } else {
      this.updatePlayerDead(dt);
      this.updateAbilityEffects(dt);
    }
    this.updateVisuals(dt);
    this.updateEffects(dt);
    this.updateCamera(dt);
    this.world.update(dt, this.time);
    if (this.netRole === 'host' && this.netLink) {
      this.netSnapshotClock += dt;
      if (this.netSnapshotClock >= 0.08) {
        this.netSnapshotClock = 0;
        this.netLink.broadcast({ kind: 'snapshot', state: this.getState() });
      }
    }
    if (this.time - this.lastHud > 0.08) {
      this.lastHud = this.time;
      this.emit('hud', this.getState());
    }
  }

  advancePhase() {
    if (this.phase === 'roundEnd') {
      if (this.score.alpha >= 12 || this.score.bravo >= 12) {
        this.phase = 'matchEnd';
        this.matchOver = true;
        const playerWon = this.score.alpha > this.score.bravo;
        this.emit('matchEnd', { winner: playerWon ? 'alpha' : 'bravo', score: { ...this.score } });
        if (playerWon) sound.win(); else sound.lose();
        return;
      }
      if (!this.halftimeDone && (this.score.alpha >= 6 || this.score.bravo >= 6)) {
        this.startHalftime();
        return;
      }
      this.beginRound();
    } else if (this.phase === 'halftime') {
      this.beginRound();
    }
  }

  startHalftime() {
    this.phase = 'halftime';
    this.phaseTime = 7;
    this.halftimeDone = true;
    this.sideAlpha = this.sideAlpha === 'attack' ? 'defense' : 'attack';
    for (const a of this.agents) {
      a.money = 800;
      a.primary = null;
      a.sidearm = 'standard';
      a.weaponId = 'standard';
      a.armor = 0;
      a.ammo = WEAPONS.standard.mag;
      a.reserve = WEAPONS.standard.reserve;
      a.abilityCd = 0;
      a.wasAlive = true;
    }
    this.clearRoundEffects();
    this.clearBombMesh();
    this.emit('halftime', {
      score: { ...this.score },
      sideAlpha: this.sideAlpha,
      playerSide: this.sideOf('alpha')
    });
    this.botChat('Sides swapped. Fresh buy. Reset your heads.');
  }

  endRound(winner, reason) {
    if (this.phase !== 'live') return;
    this.phase = 'roundEnd';
    this.phaseTime = 4.8;
    this.score[winner]++;
    const loser = winner === 'alpha' ? 'bravo' : 'alpha';
    for (const a of this.agents) {
      a.wasAlive = a.alive;
      if (a.team === winner) {
        a.money = Math.min(9000, a.money + 3000);
      } else {
        a.money = Math.min(9000, a.money + 1900);
      }
      if (a.isPlayer && a.alive) a.money = Math.min(9000, a.money + 0);
    }
    if (this.bomb.planter && winner === this.attackTeam()) this.bomb.planter.money = Math.min(9000, this.bomb.planter.money + 300);
    if (this.bomb.defuser && winner === this.defenseTeam()) this.bomb.defuser.money = Math.min(9000, this.bomb.defuser.money + 300);
    this.fireHeld = false;
    this.interactHeld = false;
    this.emit('roundEnd', {
      winner, reason, score: { ...this.score }, round: this.round,
      playerWon: winner === 'alpha'
    });
    if (winner === 'alpha') sound.win(); else sound.lose();
    this.botChat(winner === 'alpha' ? 'Good round. Reset and stack up.' : 'We lost that one. Tighten it up.');
  }

  checkElimination() {
    if (this.phase !== 'live') return;
    const attackersAlive = this.agents.filter(a => a.team === this.attackTeam() && a.alive).length;
    const defendersAlive = this.agents.filter(a => a.team === this.defenseTeam() && a.alive).length;
    if (attackersAlive === 0) this.endRound(this.defenseTeam(), 'Attackers eliminated');
    else if (defendersAlive === 0) this.endRound(this.attackTeam(), 'Defenders eliminated');
  }

  updatePlayerBuy(dt) {
    if (!this.player.alive) return;
    this.player.yaw += this.touchLook.x;
    this.player.pitch = clamp(this.player.pitch + this.touchLook.y, -1.42, 1.42);
    this.touchLook.x = 0; this.touchLook.y = 0;
    if (this.phase === 'buy') {
      // allow looking around from spawn, but not moving until barriers drop
    }
  }

  updatePlayerDead(dt) {
    this.player.yaw += this.touchLook.x;
    this.player.pitch = clamp(this.player.pitch + this.touchLook.y, -1.42, 1.42);
    this.touchLook.x = 0; this.touchLook.y = 0;
    this.camera.position.set(this.player.pos.x, 0.55, this.player.pos.z);
  }

  updatePlayer(dt) {
    const p = this.player;
    if (!p.alive) return;
    if (this.chatOpen || this.uiBlocked) {
      this.fireHeld = false;
      this.moveInput.x = 0; this.moveInput.y = 0;
    }
    this.player.yaw += this.touchLook.x;
    this.player.pitch = clamp(this.player.pitch + this.touchLook.y, -1.42, 1.42);
    this.touchLook.x = 0; this.touchLook.y = 0;

    let ix = this.moveInput.x;
    let iy = this.moveInput.y;
    if (this.keys.has('w') || this.keys.has('arrowup')) iy += 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) iy -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) ix += 1;
    if (this.keys.has('a') || this.keys.has('arrowleft')) ix -= 1;
    ix = clamp(ix, -1, 1); iy = clamp(iy, -1, 1);
    const len = Math.hypot(ix, iy);
    if (len > 1) { ix /= len; iy /= len; }
    const crouch = this.keys.has('control') || this.keys.has('c');
    const sprint = this.keys.has('shift') && iy > 0 && !this.adsHeld && !crouch;
    let speed = crouch ? 2.7 : sprint ? 6.9 : 4.9;
    if (this.adsHeld) speed = 2.9;
    const fwd = _v1.set(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    const right = _v2.set(Math.cos(p.yaw), 0, -Math.sin(p.yaw));
    const desired = _v3.set(0, 0, 0).addScaledVector(fwd, iy).addScaledVector(right, ix);
    if (desired.lengthSq() > 0) desired.normalize();
    p.pos.addScaledVector(desired, speed * dt);
    const colliders = this.world.colliders.concat(this.dynamicColliders);
    resolveCollision(p.pos, 0.38, colliders);

    if (desired.lengthSq() > 0.01) {
      p.lastStep -= dt;
      if (p.lastStep <= 0) { sound.step(); p.lastStep = sprint ? 0.31 : 0.46; }
    }
    const w = WEAPONS[p.weaponId] || WEAPONS.standard;
    if (p.reloading > 0) {
      p.reloading -= dt;
      if (p.reloading <= 0) {
        const need = Math.min(w.mag - p.ammo, p.reserve);
        p.ammo += need; p.reserve -= need;
        p.reloading = 0;
        sound.reload();
      }
    }
    if (this.fireHeld && w.auto) this.tryPlayerShoot(false);
    if (p.health <= 0) this.killAgent(p, p.lastHitBy || p, 'rifle');
    this.updateInteraction(dt);
  }

  updateCamera(dt) {
    if (!this.camera || !this.player) return;
    const p = this.player;
    if (p.alive) {
      const crouch = this.keys.has('control') || this.keys.has('c');
      const eye = crouch ? 1.17 : 1.62;
      const bob = Math.min(0.035, Math.abs(this.moveInput.y) * 0.008);
      this.camera.position.set(p.pos.x, eye + Math.sin(this.time * 8) * bob, p.pos.z);
      this.camera.rotation.set(p.pitch, p.yaw, 0, 'YXZ');
    } else {
      this.camera.rotation.set(p.pitch, p.yaw, 0, 'YXZ');
    }
    const w = WEAPONS[p.weaponId] || WEAPONS.standard;
    const targetFov = this.adsHeld ? 78 / (w.zoom || 1.2) : 78;
    this.camera.fov = lerp(this.camera.fov, targetFov, Math.min(1, dt * 12));
    this.camera.updateProjectionMatrix();
    if (this.viewmodel) {
      const bob = Math.sin(this.time * 8) * 0.003;
      const base = this.viewmodel.userData.basePos;
      const ads = this.adsHeld ? 0.5 : 1;
      this.viewmodel.position.x = lerp(this.viewmodel.position.x, base.x * ads + bob, dt * 12);
      this.viewmodel.position.y = lerp(this.viewmodel.position.y, base.y * ads + Math.abs(bob) * 0.5, dt * 12);
      this.viewmodel.position.z = lerp(this.viewmodel.position.z, base.z * (this.adsHeld ? 0.8 : 1), dt * 12);
      this.viewmodel.rotation.z = lerp(this.viewmodel.rotation.z, -this.moveInput.x * 0.025, dt * 8);
    }
    if (this.shake > 0) {
      this.camera.position.x += rand(-1, 1) * this.shake * 0.03;
      this.camera.position.y += rand(-1, 1) * this.shake * 0.03;
      this.shake = Math.max(0, this.shake - dt * 3.5);
    }
    this.hitFlash = Math.max(0, this.hitFlash - dt * 3);
  }

  // ---------------------------------------------------------------- weapons
  tryPlayerShoot(fromClick = false) {
    const p = this.player;
    if (!p || !p.alive || this.phase !== 'live' || this.chatOpen || this.uiBlocked) return;
    if (this.netRole === 'client') return;
    const w = WEAPONS[p.weaponId] || WEAPONS.standard;
    if (p.reloading > 0) return;
    if (this.time < p.lastShot + 1 / (w.rate * (p.overclockUntil > this.time ? 1.35 : 1))) return;
    if (p.ammo <= 0) { this.reload(); return; }
    p.lastShot = this.time;
    p.ammo--;
    const moving = Math.hypot(this.moveInput.x, this.moveInput.y) > 0.1;
    let spread = w.spread * (this.adsHeld ? 0.22 : 1);
    spread += (moving ? w.moveSpread : 0.002) * (this.adsHeld ? 0.4 : 1);
    if (this.keys.has('control') || this.keys.has('c')) spread *= 0.7;
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    const origin = this.camera.position.clone();
    const muzzle = new THREE.Vector3();
    if (this.viewmodel) this.viewmodel.userData.gun.localToWorld(muzzle.copy(this.viewmodel.userData.muzzle));
    else muzzle.copy(origin);
    let hitSomething = false;
    let hitHead = false;
    for (let pellet = 0; pellet < (w.pellets || 1); pellet++) {
      const d = dir.clone();
      const rx = rand(-1, 1) * spread;
      const ry = rand(-1, 1) * spread;
      d.x += rx; d.y += ry; d.z += rand(-1, 1) * spread * 0.4;
      d.normalize();
      const wallDist = this.wallRayDistance(origin, d, w.range + 5);
      const hit = this.raycastAgents(origin, d, Math.min(w.range + 5, wallDist), p.team, p);
      const end = hit ? hit.point.clone() : origin.clone().addScaledVector(d, Math.min(wallDist, w.range));
      if (hit) {
        hitSomething = true;
        if (hit.part === 'head') hitHead = true;
        let dmg = w.damage * (hit.part === 'head' ? w.headMult : hit.part === 'legs' ? 0.82 : 1);
        if (hit.distance > w.range * 0.58) dmg *= 0.82;
        this.damageAgent(hit.agent, dmg, p, hit.part);
        this.addImpact(end, d, w.color, true);
      } else {
        this.addImpact(end, d, this.world.theme.accent, false);
      }
      this.addTracer(muzzle, end, '#ffe2a1', 0.06);
    }
    this.recoilPlayer(w);
    this.muzzleFlash();
    sound.shoot(w.type);
    this.emit('shot', { weapon: w, hit: hitSomething, head: hitHead });
    if (hitSomething) {
      sound.hit(hitHead);
      this.emit('hitmarker', { head: hitHead });
    }
    if (p.ammo <= 0) this.reload();
  }

  recoilPlayer(w) {
    this.player.pitch = clamp(this.player.pitch + w.recoil * rand(0.55, 1.0), -1.42, 1.42);
    this.player.yaw += w.recoil * rand(-0.35, 0.35);
    if (this.viewmodel) {
      this.viewmodel.position.z += 0.035;
      this.viewmodel.rotation.x = -0.055;
      setTimeout(() => {
        if (this.viewmodel) this.viewmodel.rotation.x = 0;
      }, 45);
    }
  }

  muzzleFlash() {
    if (!this.viewmodel) return;
    const flash = this.viewmodel.userData.flash;
    flash.material.opacity = 1;
    flash.rotation.z = rand(0, TAU);
    flash.scale.setScalar(rand(0.7, 1.4));
    setTimeout(() => { if (flash) flash.material.opacity = 0; }, 38);
  }

  reload() {
    const p = this.player;
    if (!p || !p.alive || p.reloading > 0 || this.phase !== 'live') return;
    const w = WEAPONS[p.weaponId] || WEAPONS.standard;
    if (p.ammo >= w.mag || p.reserve <= 0) return;
    p.reloading = w.reload;
    sound.reload();
    this.emit('reload', { time: w.reload });
  }

  switchWeapon(slot) {
    const p = this.player;
    if (!p || !p.alive) return;
    const id = slot === 'primary' ? p.primary : p.sidearm;
    if (!id || p.weaponId === id) return;
    p.weaponId = id;
    const w = WEAPONS[id] || WEAPONS.standard;
    p.ammo = Math.min(p.ammo || w.mag, w.mag);
    p.reserve = w.reserve;
    p.reloading = 0;
    this.viewmodel?.removeFromParent();
    this.viewmodel = makeViewModel(id);
    this.viewmodel.position.copy(this.viewmodel.userData.basePos);
    this.camera.add(this.viewmodel);
    sound.reload();
    this.emit('weaponSwitch', { weapon: w });
  }

  raycastAgents(origin, dir, maxDist, shooterTeam, exclude) {
    let best = null;
    for (const a of this.agents) {
      if (!a.alive || a === exclude || a.team === shooterTeam) continue;
      if (a.invisUntil > this.time && origin.distanceTo(a.pos) > 5) continue;
      const parts = [
        { y: 1.68, r: 0.19, part: 'head' },
        { y: 1.08, r: 0.43, part: 'body' },
        { y: 0.46, r: 0.32, part: 'legs' }
      ];
      for (const pt of parts) {
        _sphere.center.set(a.pos.x, pt.y, a.pos.z);
        _sphere.radius = pt.r;
        const hit = _ray.set(origin, dir).intersectSphere(_sphere, _v1);
        if (hit) {
          const dist = origin.distanceTo(_v1);
          if (dist <= maxDist && (!best || dist < best.distance)) {
            best = { agent: a, part: pt.part, distance: dist, point: _v1.clone() };
          }
        }
      }
    }
    return best;
  }

  wallRayDistance(origin, dir, maxDist) {
    let nearest = maxDist;
    const list = this.world.colliders.concat(this.dynamicColliders);
    for (const c of list) {
      const minX = c.x - c.w / 2, maxX = c.x + c.w / 2;
      const minZ = c.z - c.d / 2, maxZ = c.z + c.d / 2;
      const minY = 0, maxY = c.h || 4;
      let tmin = 0, tmax = nearest;
      let ok = true;
      const axes = [
        [origin.x, dir.x, minX, maxX],
        [origin.y, dir.y, minY, maxY],
        [origin.z, dir.z, minZ, maxZ]
      ];
      for (const [o, d, mn, mx] of axes) {
        if (Math.abs(d) < 1e-8) {
          if (o < mn || o > mx) { ok = false; break; }
        } else {
          let t1 = (mn - o) / d, t2 = (mx - o) / d;
          if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
          tmin = Math.max(tmin, t1);
          tmax = Math.min(tmax, t2);
          if (tmin > tmax) { ok = false; break; }
        }
      }
      if (ok && tmin > 0.02 && tmin < nearest) nearest = tmin;
    }
    return nearest;
  }

  hasLOS(a, b) {
    const from = new THREE.Vector3(a.x, 1.5, a.z);
    const to = new THREE.Vector3(b.x, 1.35, b.z);
    const dir = to.clone().sub(from);
    const dist = dir.length();
    dir.normalize();
    if (this.wallRayDistance(from, dir, dist) < dist - 0.35) return false;
    for (const s of this.smokes) {
      const d = this.distanceToSegment(s.pos, from, to);
      if (d < s.radius * 0.9) return false;
    }
    return true;
  }

  distanceToSegment(p, a, b) {
    const ab = _v1.copy(b).sub(a);
    const t = clamp(_v2.copy(p).sub(a).dot(ab) / Math.max(0.0001, ab.lengthSq()), 0, 1);
    return _v3.copy(a).addScaledVector(ab, t).distanceTo(p);
  }

  damageAgent(target, amount, source, part = 'body') {
    if (!target || !target.alive) return;
    let dmg = amount;
    if (target.armor > 0) {
      const absorbed = Math.min(target.armor, dmg * 0.5);
      target.armor -= absorbed;
      dmg -= absorbed;
    }
    target.health -= dmg;
    target.lastHitBy = source;
    target.lastHit = this.time;
    target.damageTaken += amount;
    if (target.isPlayer) {
      this.shake = Math.min(1.2, this.shake + 0.25);
      this.hitFlash = 1;
      sound.hurt();
      this.emit('damaged', { amount: Math.round(amount), health: Math.max(0, target.health), armor: Math.max(0, target.armor) });
    } else if (!target.target && source) {
      target.target = source;
      target.reaction = Math.min(target.reaction, 0.12);
    }
    if (target.health <= 0) this.killAgent(target, source, WEAPONS[source?.weaponId]?.type || 'Rifle', part);
  }

  killAgent(target, source, weaponType = 'Rifle', part = 'body') {
    if (!target || !target.alive) return;
    target.alive = false;
    target.deaths++;
    target.wasAlive = false;
    if (target.mesh) target.mesh.visible = false;
    if (source && source !== target) {
      source.kills++;
      source.money = Math.min(9000, source.money + 200);
    }
    if (target.bomb) this.dropBomb(target);
    this.addKillFeed(source?.name || 'WORLD', target.name, weaponType, part === 'head');
    this.emit('kill', {
      killer: source?.name || 'WORLD', victim: target.name, head: part === 'head',
      killerTeam: source?.team, victimTeam: target.team, weapon: weaponType
    });
    if (target.isPlayer) {
      this.fireHeld = false;
      this.adsHeld = false;
      this.emit('death', { by: source?.name || 'UNKNOWN', head: part === 'head' });
      sound.lose();
    }
    this.checkElimination();
  }

  addKillFeed(killer, victim, weapon, head) {
    this.killfeed.unshift({ killer, victim, weapon, head, t: this.time });
    if (this.killfeed.length > 5) this.killfeed.pop();
    this.emit('killfeed', this.killfeed[0]);
  }

  addTracer(from, to, color, life = 0.08) {
    const geo = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    const line = new THREE.Line(geo, mat);
    this.scene.add(line);
    this.tracers.push({ line, life, maxLife: life });
  }

  addImpact(point, dir, color, flesh = false) {
    const geo = new THREE.SphereGeometry(flesh ? 0.035 : 0.055, 6, 4);
    const mat = new THREE.MeshBasicMaterial({ color: flesh ? '#ff5b6e' : color, transparent: true, opacity: 0.95, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(point);
    this.scene.add(mesh);
    this.impacts.push({ mesh, life: flesh ? 0.28 : 0.38, maxLife: flesh ? 0.28 : 0.38, vel: new THREE.Vector3(rand(-1, 1), rand(0.3, 1.2), rand(-1, 1)) });
  }

  // ---------------------------------------------------------------- bomb
  updateInteraction(dt) {
    const p = this.player;
    this.prompt = null;
    if (!p.alive || this.phase !== 'live') return;
    if (this.bomb.state === 'carried' && this.bomb.carrier === p) {
      const site = this.siteAt(p.pos);
      if (site) {
        if (this.interactHeld) {
          this.bomb.plant += dt;
          if (Math.floor(this.bomb.plant * 3) !== Math.floor((this.bomb.plant - dt) * 3)) sound.plantTick();
          this.prompt = { text: 'PLANTING SPIKE', progress: this.bomb.plant / 3, key: 'E' };
          if (this.bomb.plant >= 3) this.plantBomb(p, site);
        } else {
          this.bomb.plant = 0;
          this.prompt = { text: `HOLD [E] TO PLANT AT ${site.id}`, progress: 0, key: 'E' };
        }
      } else {
        this.prompt = { text: 'CARRY THE SPIKE TO SITE A OR B', progress: 0 };
      }
    } else if (this.bomb.state === 'planted' && p.team === this.defenseTeam()) {
      const dist = p.pos.distanceTo(this.bomb.position);
      if (dist < 2.5) {
        if (this.interactHeld) {
          this.bomb.defuse += dt;
          if (Math.floor(this.bomb.defuse * 4) !== Math.floor((this.bomb.defuse - dt) * 4)) sound.defuseTick();
          this.prompt = { text: 'DEFUSING SPIKE', progress: this.bomb.defuse / 7, key: 'E' };
          if (this.bomb.defuse >= 7) this.defuseBomb(p);
        } else {
          this.bomb.defuse = Math.max(0, this.bomb.defuse - dt * 2);
          this.prompt = { text: 'HOLD [E] TO DEFUSE', progress: this.bomb.defuse / 7, key: 'E' };
        }
      }
    } else if (this.bomb.state === 'dropped' && p.team === this.attackTeam()) {
      const dist = p.pos.distanceTo(this.bomb.position);
      if (dist < 2.2) {
        this.prompt = { text: 'PRESS [E] TO PICK UP SPIKE', progress: 0, key: 'E' };
        if (this.interactHeld) this.pickupBomb(p);
      }
    }
  }

  siteAt(pos) {
    for (const s of this.map.sites) {
      if (pointInBox(pos.x, pos.z, s, -0.6)) return s;
    }
    return null;
  }

  updateBomb(dt) {
    if (this.bomb.state === 'carried') {
      const c = this.bomb.carrier;
      if (c && !c.alive) this.dropBomb(c);
    } else if (this.bomb.state === 'planted') {
      this.bomb.timer -= dt;
      const interval = this.bomb.timer < 10 ? 0.35 : 1;
      if (!this.lastBeep || this.time - this.lastBeep >= interval) {
        this.lastBeep = this.time;
        sound.plantTick();
        this.emit('bombBeep', { time: this.bomb.timer });
      }
      if (this.bombMesh) {
        const pulse = 0.55 + Math.abs(Math.sin(this.time * (this.bomb.timer < 10 ? 9 : 3))) * 1.8;
        this.bombMesh.userData.light.intensity = pulse;
        this.bombMesh.userData.core.material.opacity = 0.45 + pulse * 0.2;
      }
      if (this.bomb.timer <= 0) {
        this.bomb.timer = 0;
        this.detonateBomb();
        this.endRound(this.attackTeam(), 'Bomb detonated');
        return;
      }
    } else if (this.bomb.state === 'dropped') {
      // Bots pick up the spike if they are attackers and nearby.
      for (const a of this.agents) {
        if (a.alive && !a.isPlayer && a.team === this.attackTeam() && a.pos.distanceTo(this.bomb.position) < 1.8) {
          this.pickupBomb(a);
          break;
        }
      }
    }
    if (this.bombMesh) {
      this.bombMesh.rotation.y += dt * 0.6;
    }
  }

  plantBomb(agent, site) {
    if (this.bomb.state !== 'carried') return;
    if (agent.bomb) agent.bomb = false;
    this.bomb.state = 'planted';
    this.bomb.timer = 45;
    this.bomb.defuse = 0;
    this.bomb.plant = 0;
    this.bomb.site = site;
    this.bomb.planter = agent;
    this.bomb.position = new THREE.Vector3(site.x, 0, site.z);
    this.bomb.carrier = null;
    this.createBombMesh(this.bomb.position);
    sound.bombPlanted();
    this.emit('plant', { agent: agent.name, site: site.id, team: agent.team });
    this.botChat(agent.team === 'alpha' ? `Spike down at ${site.id}. Hold angles.` : `Spike planted at ${site.id}. Watch the retake.`);
  }

  dropBomb(agent) {
    if (this.bomb.state !== 'carried') return;
    agent.bomb = false;
    this.bomb.state = 'dropped';
    this.bomb.carrier = null;
    this.bomb.position = new THREE.Vector3(agent.pos.x, 0, agent.pos.z);
    this.createBombMesh(this.bomb.position);
    this.emit('bombDropped', { position: { x: agent.pos.x, z: agent.pos.z } });
    this.botChat(agent.team === 'alpha' ? 'Spike is down. Someone grab it.' : 'Spike dropped. Cover it.');
  }

  pickupBomb(agent) {
    if (this.bomb.state !== 'dropped') return;
    if (agent.pos.distanceTo(this.bomb.position) > 2.4) return;
    this.bomb.state = 'carried';
    this.bomb.carrier = agent;
    agent.bomb = true;
    this.clearBombMesh();
    this.emit('bombPickup', { agent: agent.name });
    if (agent.isPlayer) sound.buy();
  }

  createBombMesh(pos) {
    this.clearBombMesh();
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.62), new THREE.MeshStandardMaterial({ color: '#141a20', roughness: 0.42, metalness: 0.7 }));
    body.position.y = 0.14; g.add(body);
    const core = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.4), new THREE.MeshBasicMaterial({ color: '#ff5a36', transparent: true, opacity: 0.8 }));
    core.position.y = 0.28; g.add(core);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.76, 36), new THREE.MeshBasicMaterial({ color: '#ff5a36', transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; g.add(ring);
    const light = new THREE.PointLight('#ff4d2e', 1.2, 7, 2);
    light.position.y = 0.4; g.add(light);
    g.position.copy(pos);
    this.scene.add(g);
    this.bombMesh = g;
    g.userData = { light, core, ring };
  }

  detonateBomb() {
    if (this.bomb.state === 'exploded') return;
    this.bomb.state = 'exploded';
    const pos = this.bomb.position || new THREE.Vector3();
    this.clearBombMesh();
    const blast = new THREE.Mesh(
      new THREE.SphereGeometry(1, 18, 12),
      new THREE.MeshBasicMaterial({ color: '#ffb35a', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    blast.position.copy(pos); blast.position.y = 0.8;
    this.scene.add(blast);
    this.effects.push({ mesh: blast, life: 1.2, maxLife: 1.2, type: 'blast' });
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1, 1.25, 48),
      new THREE.MeshBasicMaterial({ color: '#ff5a36', transparent: true, opacity: 0.9, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2; ring.position.copy(pos); ring.position.y = 0.08;
    this.scene.add(ring);
    this.effects.push({ mesh: ring, life: 1.4, maxLife: 1.4, type: 'ring' });
    this.shake = 2.2;
    sound.explosion();
    this.emit('explosion', { position: { x: pos.x, z: pos.z } });
  }

  defuseBomb(agent) {
    if (this.bomb.state !== 'planted') return;
    this.bomb.state = 'defused';
    this.bomb.defuser = agent;
    this.clearBombMesh();
    this.emit('defuse', { agent: agent.name, team: agent.team });
    this.botChat(agent.team === 'alpha' ? 'Defused. Good hold.' : 'Defused. That was too close.');
    this.endRound(agent.team, 'Bomb defused');
  }

  // ---------------------------------------------------------------- bots
  updateBot(bot, dt) {
    const now = this.time;
    if (bot.remote) { this.updateRemoteBot(bot, dt); return; }
    if (bot.abilityCd > 0) bot.abilityCd = Math.max(0, bot.abilityCd - dt);
    if (bot.reloading > 0) {
      bot.reloading -= dt;
      if (bot.reloading <= 0) {
        const w = WEAPONS[bot.weaponId] || WEAPONS.standard;
        const need = Math.min(w.mag - bot.ammo, bot.reserve);
        bot.ammo += need; bot.reserve -= need;
      }
    }
    if (now > bot.nextThink) {
      bot.nextThink = now + 0.18 + Math.random() * 0.08;
      const t = this.findBotTarget(bot);
      if (t !== bot.target) {
        bot.target = t;
        bot.reaction = t ? this.difficulty.reaction + rand(0, 0.22) : 0;
      }
    }
    if (bot.target && (!bot.target.alive || bot.target.team === bot.team)) bot.target = null;
    if (bot.blindUntil > now) {
      bot.target = null;
      bot.aimPitch = Math.sin(now * 8 + bot.pos.x) * 0.25;
    }

    if (bot.target) {
      this.botCombat(bot, bot.target, dt);
    } else {
      this.botObjective(bot, dt);
    }

    // Unique power: bots use their signature utility in contact or near the site.
    if (bot.abilityCd <= 0 && Math.random() < this.difficulty.ability * dt * 4) {
      const nearObjective = bot.pos.distanceTo(this.objectivePoint(bot)) < 24;
      if (bot.target || nearObjective) this.activateAbility(bot, bot.target ? bot.target.pos : this.objectivePoint(bot));
    }

    // Plant and defuse logic.
    if (this.bomb.state === 'carried' && this.bomb.carrier === bot && !bot.target) {
      const site = this.siteAt(bot.pos);
      if (site) {
        bot.plantProgress += dt;
        if (bot.plantProgress >= 3) {
          bot.plantProgress = 0;
          this.plantBomb(bot, site);
        }
      } else {
        bot.plantProgress = 0;
      }
    } else {
      bot.plantProgress = 0;
    }
    if (this.bomb.state === 'planted' && bot.team === this.defenseTeam() && !bot.target) {
      if (bot.pos.distanceTo(this.bomb.position) < 2.2) {
        bot.defuseProgress += dt;
        if (bot.defuseProgress >= 7) {
          bot.defuseProgress = 0;
          this.defuseBomb(bot);
        }
      } else {
        bot.defuseProgress = 0;
      }
    } else {
      bot.defuseProgress = 0;
    }

    if (bot.mesh) {
      bot.mesh.position.set(bot.pos.x, 0, bot.pos.z);
      bot.mesh.rotation.y = bot.yaw;
    }
  }

  findBotTarget(bot) {
    let best = null, bestScore = Infinity;
    for (const enemy of this.agents) {
      if (!enemy.alive || enemy.team === bot.team) continue;
      if (enemy.invisUntil > this.time && bot.pos.distanceTo(enemy.pos) > 5) continue;
      const dx = enemy.pos.x - bot.pos.x;
      const dz = enemy.pos.z - bot.pos.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 56) continue;
      const desiredYaw = Math.atan2(-dx, -dz);
      if (Math.abs(angleDelta(bot.yaw, desiredYaw)) > 1.95 && dist > 6) continue;
      if (!this.hasLOS(bot.pos, enemy.pos)) continue;
      const score = dist - (enemy.isPlayer ? 4 : 0) - (enemy.health < 40 ? 3 : 0);
      if (score < bestScore) { bestScore = score; best = enemy; }
    }
    if (!best) {
      // A decoy can pull attention when nothing else is visible.
      for (const d of this.decoys) {
        if (d.team === bot.team || d.life <= 0) continue;
        const dist = bot.pos.distanceTo(d.pos);
        if (dist < 26 && this.hasLOS(bot.pos, d.pos)) { best = { isDecoy: true, decoy: d, pos: d.pos, alive: true, team: d.team, name: 'DECOY', agentId: 'mirage' }; break; }
      }
    }
    return best;
  }

  botCombat(bot, target, dt) {
    const w = WEAPONS[bot.weaponId] || WEAPONS.standard;
    const dx = target.pos.x - bot.pos.x;
    const dz = target.pos.z - bot.pos.z;
    const dist = Math.hypot(dx, dz);
    const desiredYaw = Math.atan2(-dx, -dz);
    const turnSpeed = 5.2 + (this.config.difficulty === 'elite' ? 3.8 : this.config.difficulty === 'recruit' ? 0.5 : 1.9);
    bot.yaw += clamp(angleDelta(bot.yaw, desiredYaw), -turnSpeed * dt, turnSpeed * dt);
    const dy = (target.pos.y + 1.15) - 1.35;
    bot.aimPitch = lerp(bot.aimPitch, Math.atan2(dy, Math.max(0.1, dist)), dt * 8);
    if (bot.reaction > 0) { bot.reaction -= dt; return; }
    const ideal = w.type === 'Sniper' || w.type === 'Marksman' ? 32 : w.type === 'Shotgun' ? 6 : w.type === 'SMG' ? 12 : 18;
    const move = new THREE.Vector3();
    if (dist > ideal + 3) {
      move.set(dx, 0, dz).normalize();
    } else if (dist < ideal * 0.55) {
      move.set(-dx, 0, -dz).normalize();
    }
    if (this.time > bot.nextStrafe) {
      bot.nextStrafe = this.time + rand(0.7, 1.6);
      bot.strafe = pick([-1, 0, 1]);
    }
    if (bot.strafe) {
      const side = new THREE.Vector3(-dz, 0, dx).normalize().multiplyScalar(bot.strafe * 0.55);
      move.add(side);
    }
    if (move.lengthSq() > 0.01) {
      move.normalize().multiplyScalar(w.type === 'Sniper' ? 1.6 : 2.5);
      bot.pos.addScaledVector(move, dt);
      resolveCollision(bot.pos, 0.38, this.world.colliders.concat(this.dynamicColliders));
    }
    if (Math.abs(angleDelta(bot.yaw, desiredYaw)) < 0.14 && this.hasLOS(bot.pos, target.pos)) {
      this.botShoot(bot, target, w);
    }
  }

  botShoot(bot, target, w) {
    if (this.time < bot.nextShot || bot.reloading > 0) return;
    if (bot.ammo <= 0) {
      bot.reloading = Math.max(1.3, w.reload * 0.8);
      bot.ammo = 0;
      return;
    }
    bot.ammo--;
    const rate = w.rate * (bot.overclockUntil > this.time ? 1.3 : 1);
    bot.nextShot = this.time + 1 / rate * rand(0.92, 1.12);
    const origin = new THREE.Vector3(bot.pos.x, 1.36, bot.pos.z);
    const forward = new THREE.Vector3(-Math.sin(bot.yaw), 0, -Math.cos(bot.yaw));
    origin.addScaledVector(forward, 0.36);
    const aim = new THREE.Vector3(target.pos.x, target.pos.y + (Math.random() < 0.22 ? 1.68 : 1.1), target.pos.z);
    const dist = origin.distanceTo(aim);
    const err = dist * this.difficulty.aim * (bot.blindUntil > this.time ? 3.2 : 1) * (bot.invisUntil > this.time ? 0.6 : 1);
    aim.x += rand(-1, 1) * err;
    aim.z += rand(-1, 1) * err;
    aim.y += rand(-1, 1) * err * 0.65;
    const dir = aim.sub(origin).normalize();
    const wallDist = this.wallRayDistance(origin, dir, w.range + 4);
    const hit = this.raycastAgents(origin, dir, Math.min(w.range + 4, wallDist), bot.team, bot);
    const end = hit ? hit.point.clone() : origin.clone().addScaledVector(dir, Math.min(wallDist, w.range));
    if (hit) {
      let dmg = w.damage * (hit.part === 'head' ? w.headMult : hit.part === 'legs' ? 0.82 : 1);
      if (hit.distance > w.range * 0.58) dmg *= 0.82;
      this.damageAgent(hit.agent, dmg, bot, hit.part);
      this.addImpact(end, dir, '#ff6b72', true);
    } else {
      this.addImpact(end, dir, this.world.theme.accent, false);
    }
    this.addTracer(origin, end, bot.team === 'alpha' ? '#8effe9' : '#ff8c9e', 0.055);
    if (this.player && this.player.pos.distanceTo(bot.pos) < 36) sound.shoot(w.type, true);
  }

  botObjective(bot, dt) {
    const side = this.sideOf(bot.team);
    let target = this.objectivePoint(bot);
    if (this.bomb.state === 'planted') {
      if (side === 'defense') target = this.bomb.position;
      else target = this.bomb.position;
    } else if (this.bomb.state === 'dropped' && side === 'attack') {
      target = this.bomb.position;
    }
    const distToTarget = bot.pos.distanceTo(target);
    if (side === 'defense' && this.bomb.state === 'planted' && distToTarget < 2.0) {
      // Face the spike while defusing.
      bot.yaw = Math.atan2(-(target.x - bot.pos.x), -(target.z - bot.pos.z));
      return;
    }
    if (this.bomb.carrier === bot && side === 'attack' && this.siteAt(bot.pos)) {
      return;
    }
    const key = `${target.x.toFixed(1)}:${target.z.toFixed(1)}:${side}:${this.bomb.state}`;
    if (this.time > bot.nextPath || bot.pathTarget !== key) {
      bot.pathTarget = key;
      bot.path = this.nav.findPath(bot.pos, target);
      bot.pathIndex = 0;
      bot.nextPath = this.time + rand(1.1, 1.9);
    }
    if (bot.path && bot.path.length) {
      let node = bot.path[bot.pathIndex] || bot.path[bot.path.length - 1];
      let dx = node.x - bot.pos.x, dz = node.z - bot.pos.z;
      let d = Math.hypot(dx, dz);
      while (d < 0.65 && bot.pathIndex < bot.path.length - 1) {
        bot.pathIndex++;
        node = bot.path[bot.pathIndex];
        dx = node.x - bot.pos.x; dz = node.z - bot.pos.z;
        d = Math.hypot(dx, dz);
      }
      if (d > 0.7) {
        const speed = bot.bomb ? 4.6 : (side === 'defense' && this.bomb.state === 'planted' ? 5.2 : 4.4);
        const nx = dx / d, nz = dz / d;
        bot.pos.x += nx * speed * dt;
        bot.pos.z += nz * speed * dt;
        resolveCollision(bot.pos, 0.38, this.world.colliders.concat(this.dynamicColliders));
        const desiredYaw = Math.atan2(-nx, -nz);
        bot.yaw += clamp(angleDelta(bot.yaw, desiredYaw), -5.5 * dt, 5.5 * dt);
      } else if (bot.pathIndex < bot.path.length - 1) {
        bot.pathIndex++;
      }
    } else if (distToTarget > 1.2) {
      const dx = target.x - bot.pos.x, dz = target.z - bot.pos.z;
      const d = Math.hypot(dx, dz);
      bot.pos.x += dx / d * 3.8 * dt;
      bot.pos.z += dz / d * 3.8 * dt;
      resolveCollision(bot.pos, 0.38, this.world.colliders.concat(this.dynamicColliders));
      bot.yaw += clamp(angleDelta(bot.yaw, Math.atan2(-dx, -dz)), -5 * dt, 5 * dt);
    }
  }

  objectivePoint(bot) {
    const side = this.sideOf(bot.team);
    if (this.bomb.state === 'planted') return this.bomb.position;
    if (side === 'attack') {
      const s = this.targetSite;
      const idx = bot.id.charCodeAt(3) % 5;
      const offs = [[-4, -3], [4, -3], [0, 3], [-5, 3], [5, 3]];
      return new THREE.Vector3(s.x + offs[idx][0], 0, s.z + offs[idx][1]);
    }
    const s = bot.site || this.map.sites[0];
    const idx = bot.id.charCodeAt(3) % 5;
    const offs = [[-5, -4], [5, -4], [0, 4], [-5, 4], [5, 4]];
    return new THREE.Vector3(s.x + offs[idx][0], 0, s.z + offs[idx][1]);
  }

  botChat(text) {
    if (!this.chatThrottle || this.time - this.chatThrottle > 2.5) {
      this.chatThrottle = this.time;
      const speaker = pick(this.agents.filter(a => !a.isPlayer && a.team === 'alpha'))?.name || 'COMMAND';
      this.addChat(speaker, text, true);
    }
  }

  addChat(author, text, team = true) {
    const msg = { author, text, team, t: this.time };
    this.chat.push(msg);
    if (this.chat.length > 40) this.chat.shift();
    this.emit('chat', msg);
  }

  sendChat(text, author = 'YOU') {
    if (!text || !text.trim()) return;
    if (this.netRole === 'client' && this.netHostId) {
      this.netLink?.send(this.netHostId, { kind: 'chat', text: text.trim().slice(0, 120) });
      this.addChat('YOU', text.trim().slice(0, 120), true);
      this.emit('chatSent', text.trim());
      return;
    }
    this.addChat(author, text.trim().slice(0, 120), true);
    this.emit('chatSent', text.trim());
  }

  // ---------------------------------------------------------------- abilities
  useAbility() {
    const p = this.player;
    if (!p || !p.alive || this.phase !== 'live' || p.abilityCd > 0) {
      if (p && p.abilityCd > 0) { sound.error(); this.emit('error', 'Ability recharging'); }
      return;
    }
    if (this.netRole === 'client' && this.netHostId) {
      this.netLink?.send(this.netHostId, { kind: 'ability' });
      p.abilityCd = p.abilityMax;
      sound.ability(AGENT_BY_ID[p.agentId]?.power.type || 'flash');
      return;
    }
    const def = AGENT_BY_ID[p.agentId];
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    let aim = p.pos.clone().addScaledVector(dir, 14);
    aim.y = 0;
    const wallDist = this.wallRayDistance(this.camera.position.clone(), dir, 16);
    if (wallDist < 14) aim = this.camera.position.clone().addScaledVector(dir, Math.max(2, wallDist - 0.4));
    aim.y = 0;
    this.activateAbility(p, aim, dir);
  }

  activateAbility(agent, targetPos = null, explicitDir = null) {
    if (!agent || !agent.alive) return;
    const def = AGENT_BY_ID[agent.agentId];
    if (!def) return;
    const power = def.power;
    const forward = explicitDir ? explicitDir.clone() : new THREE.Vector3(-Math.sin(agent.yaw), 0, -Math.cos(agent.yaw));
    const pos = new THREE.Vector3(agent.pos.x, 0, agent.pos.z);
    const aim = targetPos ? new THREE.Vector3(targetPos.x, 0, targetPos.z) : pos.clone().addScaledVector(forward, 12);
    aim.x = clamp(aim.x, -47, 47); aim.z = clamp(aim.z, -47, 47);
    agent.abilityCd = power.cooldown;
    agent.abilityUsed = true;
    sound.ability(power.type);
    this.emit('ability', { agent: agent.name, type: power.type, name: power.name, team: agent.team });
    switch (power.type) {
      case 'flash': {
        const flashPos = pos.clone().addScaledVector(forward, 8); flashPos.y = 1.55;
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 8), new THREE.MeshBasicMaterial({ color: '#fff7d6', transparent: true, opacity: 1 }));
        orb.position.copy(flashPos); this.scene.add(orb);
        this.effects.push({ mesh: orb, life: 0.55, maxLife: 0.55, type: 'flashOrb' });
        for (const a of this.agents) {
          if (!a.alive || a.team === agent.team) continue;
          if (a.pos.distanceTo(flashPos) > 25) continue;
          if (!this.hasLOS(a.pos, flashPos)) continue;
          if (a.isPlayer) {
            this.emit('flash', { duration: 2.4 });
          } else {
            a.blindUntil = this.time + 2.4;
          }
        }
        break;
      }
      case 'smoke': {
        this.spawnSmoke(aim, agent.team, 12);
        break;
      }
      case 'reveal': {
        this.spawnReveal(agent.team, aim, 20, 5);
        break;
      }
      case 'dash': {
        const old = pos.clone();
        const newPos = pos.clone().addScaledVector(forward, 6.2);
        resolveCollision(newPos, 0.38, this.world.colliders.concat(this.dynamicColliders));
        agent.pos.x = newPos.x; agent.pos.z = newPos.z;
        this.addTracer(old.clone().setY(0.8), new THREE.Vector3(agent.pos.x, 0.8, agent.pos.z), def.accent, 0.35);
        break;
      }
      case 'fire': {
        this.spawnFire(aim, agent.team, 8);
        break;
      }
      case 'wall': {
        this.spawnBarrier(agent, forward, 12);
        break;
      }
      case 'emp': {
        for (const a of this.agents) {
          if (!a.alive || a.team === agent.team) continue;
          if (a.pos.distanceTo(agent.pos) > 28) continue;
          if (a.isPlayer) this.emit('emp', { duration: 4 });
          else { a.blindUntil = this.time + 3.2; a.reaction = Math.max(a.reaction, 0.4); }
        }
        for (const d of this.decoys) if (d.team !== agent.team) d.life = 0;
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.6, 48), new THREE.MeshBasicMaterial({ color: '#8d8dff', transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
        ring.rotation.x = -Math.PI / 2; ring.position.copy(pos); ring.position.y = 0.1; this.scene.add(ring);
        this.effects.push({ mesh: ring, life: 0.7, maxLife: 0.7, type: 'empRing' });
        break;
      }
      case 'heal': {
        for (const a of this.agents) {
          if (a.alive && a.team === agent.team && a.pos.distanceTo(agent.pos) < 9) {
            a.health = Math.min(100, a.health + 38);
            if (a.isPlayer) this.emit('heal', { amount: 38 });
          }
        }
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.55, 40), new THREE.MeshBasicMaterial({ color: '#65ffc2', transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
        ring.rotation.x = -Math.PI / 2; ring.position.copy(pos); ring.position.y = 0.08; this.scene.add(ring);
        this.effects.push({ mesh: ring, life: 1.2, maxLife: 1.2, type: 'healRing' });
        break;
      }
      case 'invis': {
        agent.invisUntil = this.time + 4;
        if (agent.isPlayer) this.emit('invis', { duration: 4 });
        break;
      }
      case 'flare': {
        this.spawnReveal(agent.team, aim, 18, 4.5);
        this.spawnFire(aim, agent.team, 4.5, 2.8);
        break;
      }
      case 'decoy': {
        this.spawnDecoy(agent, pos.clone().addScaledVector(forward, 2.2));
        break;
      }
      case 'overclock': {
        agent.overclockUntil = this.time + 6;
        if (agent.isPlayer) this.emit('overclock', { duration: 6 });
        break;
      }
    }
  }

  spawnSmoke(pos, team, duration = 12) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: '#9ba9b8', roughness: 1, metalness: 0, transparent: true, opacity: 0.28, depthWrite: false });
    for (let i = 0; i < 11; i++) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(rand(1.2, 2.2), 10, 8), mat.clone());
      m.position.set(rand(-2.4, 2.4), rand(0.8, 2.8), rand(-2.4, 2.4));
      m.material.opacity = rand(0.18, 0.34);
      group.add(m);
    }
    group.position.set(pos.x, 0, pos.z);
    this.scene.add(group);
    const s = { type: 'smoke', pos: new THREE.Vector3(pos.x, 1.4, pos.z), radius: 4.4, life: duration, maxLife: duration, group, team };
    this.smokes.push(s);
    this.effects.push(s);
  }

  spawnFire(pos, team, duration = 8, radius = 4.4) {
    const group = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius * 0.2, radius, 48), new THREE.MeshBasicMaterial({ color: '#ff7b2f', transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; group.add(ring);
    for (let i = 0; i < 14; i++) {
      const f = new THREE.Mesh(new THREE.ConeGeometry(rand(0.15, 0.5), rand(0.7, 2.0), 5), new THREE.MeshBasicMaterial({ color: pick(['#ff7b2f', '#ffb13b', '#ff4d2e']), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
      const a = rand(0, TAU), r = rand(0.4, radius * 0.85);
      f.position.set(Math.cos(a) * r, rand(0.3, 0.9), Math.sin(a) * r); group.add(f);
    }
    group.position.set(pos.x, 0, pos.z); this.scene.add(group);
    const light = new THREE.PointLight('#ff6b2f', 3.0, radius * 3, 2); light.position.y = 1.2; group.add(light);
    const f = { type: 'fire', pos: new THREE.Vector3(pos.x, 0, pos.z), radius, life: duration, maxLife: duration, group, team, tick: 0 };
    this.fires.push(f); this.effects.push(f);
  }

  spawnBarrier(agent, forward, duration = 12) {
    const alongX = Math.abs(forward.x) < Math.abs(forward.z);
    const w = alongX ? 6.5 : 0.4;
    const d = alongX ? 0.4 : 6.5;
    const pos = agent.pos.clone().addScaledVector(forward, 4.2);
    pos.x = clamp(pos.x, -47, 47); pos.z = clamp(pos.z, -47, 47);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 2.8, d), new THREE.MeshStandardMaterial({ color: '#2a4c58', emissive: '#3ce6ff', emissiveIntensity: 0.7, roughness: 0.3, metalness: 0.5, transparent: true, opacity: 0.82 }));
    mesh.position.set(pos.x, 1.4, pos.z); this.scene.add(mesh);
    const collider = { x: pos.x, z: pos.z, w, d, h: 2.8 };
    this.dynamicColliders.push(collider);
    const b = { type: 'barrier', pos, mesh, collider, life: duration, maxLife: duration, team: agent.team };
    this.barriers.push(b); this.effects.push(b);
  }

  spawnReveal(team, pos, radius = 18, duration = 5) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius * 0.96, radius, 64), new THREE.MeshBasicMaterial({ color: '#6fffe0', transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(pos.x, 0.07, pos.z); this.scene.add(ring);
    const r = { type: 'reveal', team, pos: new THREE.Vector3(pos.x, 0, pos.z), radius, life: duration, maxLife: duration, mesh: ring };
    this.reveals.push(r); this.effects.push(r);
  }

  spawnDecoy(agent, pos) {
    const def = AGENT_BY_ID[agent.agentId];
    const mesh = createAgentModel(def, agent.team, 2, '');
    mesh.position.set(pos.x, 0, pos.z);
    mesh.rotation.y = agent.yaw;
    this.scene.add(mesh);
    const d = { type: 'decoy', team: agent.team, pos: new THREE.Vector3(pos.x, 0, pos.z), life: 7, maxLife: 7, mesh, source: agent };
    this.decoys.push(d); this.effects.push(d);
  }

  removeEffect(e) {
    if (!e) return;
    if (e.mesh) this.scene.remove(e.mesh);
    if (e.group) this.scene.remove(e.group);
    if (e.collider) this.dynamicColliders = this.dynamicColliders.filter(c => c !== e.collider);
    if (e.type === 'smoke') this.smokes = this.smokes.filter(s => s !== e);
    if (e.type === 'fire') this.fires = this.fires.filter(f => f !== e);
    if (e.type === 'barrier') this.barriers = this.barriers.filter(b => b !== e);
    if (e.type === 'decoy') this.decoys = this.decoys.filter(d => d !== e);
    if (e.type === 'reveal') this.reveals = this.reveals.filter(r => r !== e);
  }

  updateAbilityEffects(dt) {
    for (const f of this.fires) {
      f.tick -= dt;
      if (f.tick <= 0) {
        f.tick = 0.4;
        for (const a of this.agents) {
          if (!a.alive || a.team === f.team) continue;
          if (a.pos.distanceTo(f.pos) < f.radius) this.damageAgent(a, 9, f.source || a, 'body');
        }
      }
    }
  }

  updateEffects(dt) {
    for (let i = this.tracers.length - 1; i >= 0; i--) {
      const t = this.tracers[i];
      t.life -= dt;
      t.line.material.opacity = Math.max(0, t.life / t.maxLife) * 0.9;
      if (t.life <= 0) { this.scene.remove(t.line); this.tracers.splice(i, 1); }
    }
    for (let i = this.impacts.length - 1; i >= 0; i--) {
      const im = this.impacts[i];
      im.life -= dt;
      im.mesh.position.addScaledVector(im.vel, dt);
      im.mesh.scale.setScalar(Math.max(0.05, im.life / im.maxLife));
      im.mesh.material.opacity = Math.max(0, im.life / im.maxLife);
      if (im.life <= 0) { this.scene.remove(im.mesh); this.impacts.splice(i, 1); }
    }
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const e = this.effects[i];
      e.life -= dt;
      if (e.type === 'smoke') {
        e.group.rotation.y += dt * 0.12;
        e.group.scale.setScalar(1 + Math.sin(this.time * 1.2) * 0.03);
        for (const c of e.group.children) c.material.opacity = Math.max(0, e.life / e.maxLife) * 0.28;
      } else if (e.type === 'fire') {
        e.group.rotation.y += dt * 0.4;
        for (const c of e.group.children) {
          if (c.isMesh && c.geometry.type === 'ConeGeometry') {
            c.scale.y = 0.75 + Math.abs(Math.sin(this.time * 7 + c.position.x)) * 0.55;
          }
        }
      } else if (e.type === 'flashOrb') {
        e.mesh.scale.setScalar(1 + (1 - e.life / e.maxLife) * 14);
        e.mesh.material.opacity = e.life / e.maxLife;
      } else if (e.type === 'blast') {
        e.mesh.scale.setScalar(1 + (1 - e.life / e.maxLife) * 18);
        e.mesh.material.opacity = e.life / e.maxLife;
      } else if (e.type === 'ring' || e.type === 'empRing' || e.type === 'healRing') {
        e.mesh.scale.setScalar(1 + (1 - e.life / e.maxLife) * (e.type === 'empRing' ? 30 : 7));
        e.mesh.material.opacity = e.life / e.maxLife;
      } else if (e.type === 'barrier') {
        e.mesh.material.opacity = Math.min(0.82, e.life / e.maxLife * 1.5);
      } else if (e.type === 'decoy') {
        e.mesh.position.y = Math.sin(this.time * 3) * 0.02;
      } else if (e.type === 'reveal') {
        e.mesh.material.opacity = (e.life / e.maxLife) * 0.3;
      }
      if (e.life <= 0) {
        this.removeEffect(e);
        this.effects.splice(i, 1);
      }
    }
    for (let i = this.reveals.length - 1; i >= 0; i--) if (this.reveals[i].life <= 0) this.reveals.splice(i, 1);
  }

  updateVisuals(dt) {
    for (const a of this.agents) {
      if (a.isPlayer || !a.mesh) continue;
      a.mesh.position.set(a.pos.x, 0, a.pos.z);
      a.mesh.rotation.y = a.yaw;
      if (a.mesh.userData.ring) {
        a.mesh.userData.ring.material.opacity = a.alive ? 0.65 : 0;
      }
    }
    if (this.viewmodel?.userData.flash) {
      const f = this.viewmodel.userData.flash;
      if (f.material.opacity > 0) f.material.opacity = Math.max(0, f.material.opacity - dt * 24);
    }
    if (this.player && this.player.invisUntil > this.time && this.viewmodel) {
      this.viewmodel.visible = this.player.invisUntil - this.time < 0.5 || Math.sin(this.time * 30) > 0.5;
    } else if (this.viewmodel) this.viewmodel.visible = true;
  }

  // ---------------------------------------------------------------- shop
  getShop() {
    const discount = 0.9;
    return Object.values(WEAPONS).filter(w => w.id !== 'standard').map(w => {
      const signature = w.signature === this.player.agentId;
      const price = signature ? Math.floor(w.cost * discount) : w.cost;
      return { ...w, price, signature, owned: this.player.primary === w.id };
    });
  }

  buyForAgent(agent, item, tier = 'light') {
    if (!agent || !agent.alive || this.phase !== 'buy') return false;
    if (item === 'armor') {
      const config = tier === 'heavy' ? { price: 800, armor: 50 } : { price: 400, armor: 25 };
      if (agent.armor >= config.armor || agent.money < config.price) return false;
      agent.money -= config.price;
      agent.armor = config.armor;
      if (agent.isPlayer) {
        sound.buy();
        this.emit('purchase', { armor: config.armor, price: config.price });
      }
      return true;
    }
    const w = WEAPONS[item];
    if (!w) return false;
    const signature = w.signature === agent.agentId;
    const price = signature ? Math.floor(w.cost * 0.9) : w.cost;
    if (agent.money < price) return false;
    agent.money -= price;
    agent.primary = item;
    agent.weaponId = item;
    agent.ammo = w.mag;
    agent.reserve = w.reserve;
    agent.reloading = 0;
    if (agent.isPlayer) {
      this.setViewmodel(item);
      sound.buy();
      this.emit('purchase', { weapon: w, price });
    } else {
      this.setAgentGun(agent, item);
    }
    return true;
  }

  setViewmodel(id) {
    this.viewmodel?.removeFromParent();
    this.viewmodel = makeViewModel(id);
    this.viewmodel.position.copy(this.viewmodel.userData.basePos);
    this.camera.add(this.viewmodel);
  }

  setAgentGun(agent, id) {
    if (!agent.mesh) return;
    const old = agent.mesh.userData.gun;
    if (old) agent.mesh.remove(old);
    const gun = createGunMesh(id, 0.72);
    gun.position.set(0.27, 1.18, -0.35);
    gun.rotation.set(-0.05, 0, 0);
    agent.mesh.add(gun);
    agent.mesh.userData.gun = gun;
  }

  buyWeapon(id) {
    if (this.phase !== 'buy' || !this.player.alive) { sound.error(); this.emit('error', 'Buy window closed'); return false; }
    if (this.netRole === 'client') {
      const w = WEAPONS[id];
      if (!w) return false;
      const price = w.signature === this.player.agentId ? Math.floor(w.cost * 0.9) : w.cost;
      if (this.player.money < price) { sound.error(); this.emit('error', 'Not enough credits'); return false; }
      this.netLink?.send(this.netHostId, { kind: 'buy', item: id });
      this.player.money -= price;
      this.player.primary = id;
      this.player.weaponId = id;
      this.player.ammo = w.mag;
      this.player.reserve = w.reserve;
      this.player.reloading = 0;
      this.setViewmodel(id);
      sound.buy();
      this.emit('purchase', { weapon: w, price });
      return true;
    }
    return this.buyForAgent(this.player, id);
  }

  buyArmor(tier) {
    if (this.phase !== 'buy' || !this.player.alive) { sound.error(); return false; }
    if (this.netRole === 'client') {
      const config = tier === 'heavy' ? { price: 800, armor: 50 } : { price: 400, armor: 25 };
      if (this.player.armor >= config.armor) { sound.error(); this.emit('error', 'Armor already equipped'); return false; }
      if (this.player.money < config.price) { sound.error(); this.emit('error', 'Not enough credits'); return false; }
      this.player.money -= config.price;
      this.player.armor = config.armor;
      this.netLink?.send(this.netHostId, { kind: 'buy', item: 'armor', tier });
      sound.buy();
      this.emit('purchase', { armor: config.armor, price: config.price });
      return true;
    }
    return this.buyForAgent(this.player, 'armor', tier);
  }

  // ---------------------------------------------------------------- state
  getState() {
    const p = this.player;
    if (!p) return null;
    const w = WEAPONS[p.weaponId] || WEAPONS.standard;
    const def = AGENT_BY_ID[p.agentId];
    const enemiesVisible = [];
    if (p.alive) {
      for (const a of this.agents) {
        if (a.team === p.team || !a.alive) continue;
        let vis = false;
        if (a.invisUntil <= this.time) {
          const d = p.pos.distanceTo(a.pos);
          vis = d < 55 && this.hasLOS(p.pos, a.pos);
          if (!vis) {
            for (const r of this.reveals) {
              if (r.team === p.team && r.life > 0 && a.pos.distanceTo(r.pos) < r.radius) { vis = true; break; }
            }
          }
        }
        if (vis) enemiesVisible.push(a.id);
      }
    }
    return {
      phase: this.phase,
      round: this.round,
      time: this.time,
      phaseTime: Math.max(0, this.phaseTime),
      roundTime: Math.max(0, this.roundTime),
      score: { ...this.score },
      sideAlpha: this.sideAlpha,
      playerSide: this.sideOf('alpha'),
      playerTeam: 'alpha',
      mapName: this.map.name,
      mapLocation: this.map.location,
      targetSite: this.targetSite?.id,
      player: {
        health: Math.max(0, Math.round(p.health)), armor: Math.max(0, Math.round(p.armor)),
        money: p.money, alive: p.alive, kills: p.kills, deaths: p.deaths,
        weapon: { name: w.name, type: w.type, ammo: p.ammo, mag: w.mag, reserve: p.reserve, reloading: p.reloading > 0 },
        weaponId: p.weaponId,
        primary: p.primary, sidearm: p.sidearm,
        ability: { name: def.power.name, type: def.power.type, cd: Math.max(0, p.abilityCd), max: p.abilityMax, ready: p.abilityCd <= 0 },
        bomb: this.bomb.carrier === p,
        invisible: p.invisUntil > this.time,
        overclock: p.overclockUntil > this.time,
        ads: this.adsHeld
      },
      bomb: {
        state: this.bomb.state,
        time: Math.max(0, this.bomb.timer),
        site: this.bomb.site?.id || null,
        carrier: this.bomb.carrier?.name || null,
        defuse: clamp(this.bomb.defuse / 7, 0, 1),
        plant: clamp(this.bomb.plant / 3, 0, 1),
        position: this.bomb.position ? { x: this.bomb.position.x, z: this.bomb.position.z } : null
      },
      prompt: this.prompt,
      agents: this.agents.map(a => ({
        id: a.id, name: a.name, team: a.team, agentId: a.agentId, isPlayer: a.isPlayer,
        x: a.pos.x, z: a.pos.z, yaw: a.yaw, health: Math.max(0, Math.round(a.health)), alive: a.alive,
        armor: Math.max(0, Math.round(a.armor)), money: a.money, kills: a.kills, deaths: a.deaths,
        weaponId: a.weaponId, ammo: a.ammo, reserve: a.reserve,
        abilityCd: Math.max(0, a.abilityCd), abilityMax: a.abilityMax,
        bomb: this.bomb.carrier === a,
        visible: a.isPlayer || a.team === 'alpha' || enemiesVisible.includes(a.id),
        invisible: a.invisUntil > this.time
      })),
      killfeed: this.killfeed.slice(0, 5),
      chat: this.chat.slice(-7),
      sites: this.map.sites.map(s => ({ id: s.id, x: s.x, z: s.z, w: s.w, d: s.d })),
      buyOpen: this.phase === 'buy',
      halftime: this.phase === 'halftime',
      matchOver: this.matchOver
    };
  }

  setUiBlocked(blocked) { this.uiBlocked = blocked; if (blocked) { this.fireHeld = false; this.adsHeld = false; } }
  setChatOpen(open) { this.chatOpen = open; this.setUiBlocked(open); }
  setMove(x, y) { this.moveInput.x = clamp(x, -1, 1); this.moveInput.y = clamp(y, -1, 1); }
  look(dx, dy) { this.touchLook.x += dx * 0.0022; this.touchLook.y += dy * 0.0022; }
  setFiring(v) { this.fireHeld = v; if (v) this.tryPlayerShoot(true); }
  setAds(v) { this.adsHeld = v; }
  setInteract(v) { this.interactHeld = v; }
  requestLock() { this.canvas.requestPointerLock?.(); }
}



