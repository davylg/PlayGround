import * as THREE from 'three';
import { FRUIT_DEFS } from './fruits.js';
import { TIERS } from './ui.js';

const GRAVITY = 8.4;
const BEST_KEY = 'chainblade.best';
const TIER_THRESHOLDS = [0, 5, 10, 17];
const TYPE_LIST = Object.keys(FRUIT_DEFS).filter((id) => id !== 'golden');

function rand(a, b) { return a + Math.random() * (b - a); }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

export class Game {
  constructor({ scene, camera, canvas, factory, effects, world, audio, ui }) {
    this.scene = scene;
    this.camera = camera;
    this.canvas = canvas;
    this.factory = factory;
    this.effects = effects;
    this.world = world;
    this.audio = audio;
    this.ui = ui;

    this.state = 'menu';
    this.clock = 0;
    this.ambientClock = 0;
    this.elapsed = 0;
    this.fruits = [];
    this.debris = [];
    this.pending = [];

    this.score = 0;
    this.lives = 3;
    this.chain = 0;
    this.bestChain = 0;
    this.fruitSliced = 0;
    this.lastSliceTime = -10;
    this.lastSlicePoint = null;
    this.strokeHits = 0;
    this.lastStrokeTime = 0;
    this.strokeStart = 0;
    this.lastGoldenAt = -30;
    this.hintTimer = 0;
    this.lastTier = -1;

    try { this.best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0; } catch { this.best = 0; }

    this.bounds = { viewH: 18, viewW: 9, halfW: 4, bottom: -9, top: 9, scale: 1 };
    this.raycaster = new THREE.Raycaster();
    this.ndc = new THREE.Vector2();
    this.slicePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    this.tmpVec = new THREE.Vector3();
    this.activePointer = null;
    this.isDown = false;
    this.lastWorld = null;
    this.pointerNDC = { x: 0, y: 0 };
    this.lastPointerAt = -10;
    this.haptics = typeof navigator.vibrate === 'function';

    this.menuSpawnTimer = 0.5;
    this.autoSwipeTimer = 2.0;
    this.autoSwipe = null;

    effects.flashCb = (kind) => this.ui.flash(kind);
    effects.hurtCb = () => this.ui.hurt();
    this.ui.setBest(this.best);
    this.ui.setMuted(this.audio.muted);
    this.ui.setTier(0);
    this.world.setAccent(TIERS[0].color);

    this._installInput();

    if (new URLSearchParams(location.search).get('play') === '1') {
      this.startGame();
    } else {
      this.enterMenu();
    }
  }

  /* ------------------------------------------------------------------ */
  /* viewport                                                            */
  /* ------------------------------------------------------------------ */
  setViewport(viewH, viewW, bottom) {
    this.bounds.viewH = viewH;
    this.bounds.viewW = viewW;
    this.bounds.bottom = bottom;
    this.bounds.top = bottom + viewH;
    this.bounds.halfW = Math.min(viewW * 0.43, 6.1);
    this.bounds.scale = clamp(this.bounds.halfW / 4.1, 0.92, 1.32);
  }

  /* ------------------------------------------------------------------ */
  /* state transitions                                                   */
  /* ------------------------------------------------------------------ */
  startGame() {
    this.audio.ensure();
    this._clearFruits();
    this.effects.trail.clear();
    this.state = 'playing';
    this.ui.hideGameOver();
    this.ui.showStart(false);
    this.ui.showPause(false);
    this.ui.showHUD(true);
    this.ui.reset();
    this.ui.setBest(this.best);

    this.score = 0;
    this.lives = 3;
    this.chain = 0;
    this.bestChain = 0;
    this.fruitSliced = 0;
    this.elapsed = 0;
    this.spawnTimer = 0.55;
    this.pending = [];
    this.lastSliceTime = -10;
    this.lastSlicePoint = null;
    this.lastGoldenAt = -30;
    this.hintTimer = 5.5;
    this.lastTier = -1;
    this.strokeHits = 0;
    this.lastWorld = null;
    this.isDown = false;
    this.autoSwipe = null;
    this.menuSpawnTimer = 0;
    this.ui.showHint(true);
    this._spawnOpeners();
    this.ui.setChain(0, 1, 0, TIERS[0]);
    this.ui.setTier(0);
    this.ui.setBladeProgress(0);
    this.ui.updateChainTimer(0);
    this._applyTier(0);
    this.world.setAccent(TIERS[0].color);
    this.audio.start();
  }

  enterMenu() {
    this._clearFruits();
    this.effects.trail.clear();
    this.state = 'menu';
    this.score = 0;
    this.chain = 0;
    this.lives = 3;
    this.elapsed = 0;
    this.pending = [];
    this.autoSwipe = null;
    this.lastSlicePoint = null;
    this.isDown = false;
    this.menuSpawnTimer = 0.35;
    this.autoSwipeTimer = 1.7;
    this.ui.hideGameOver();
    this.ui.showStart(true);
    this.ui.showHUD(false);
    this.ui.showPause(false);
    this.ui.showHint(false);
    this.ui.setBest(this.best);
    this.ui.setChain(0, 1, 0, TIERS[0]);
    this._applyTier(0);
    this.world.setAccent(TIERS[0].color);
  }

  quitToMenu() {
    if (this.score > this.best) this._saveBest();
    this.enterMenu();
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.isDown = false;
    this.activePointer = null;
    this.ui.showPause(true);
    this.ui.showHint(false);
    this.audio.ui();
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.ui.showPause(false);
    this.lastWorld = null;
    this.audio.ui();
  }

  togglePause() {
    if (this.state === 'playing') this.pause();
    else if (this.state === 'paused') this.resume();
  }

  gameOver() {
    if (this.state === 'over') return;
    this.state = 'over';
    this.isDown = false;
    this.activePointer = null;
    this.autoSwipe = null;
    this.pending = [];
    this.ui.showHint(false);
    this.ui.showPause(false);
    this.effects.trail.clear();
    this.audio.gameOver();

    const newRecord = this.score > this.best;
    if (newRecord) this._saveBest();
    const stats = {
      score: this.score,
      fruit: this.fruitSliced,
      bestChain: this.bestChain,
      time: this.ui.timeString(this.elapsed),
      best: this.best,
      newRecord,
    };
    this.finalStats = stats;
    setTimeout(() => {
      if (this.state === 'over') this.ui.showGameOver(stats);
    }, 820);
  }

  _saveBest() {
    this.best = this.score;
    try { localStorage.setItem(BEST_KEY, String(this.best)); } catch { /* ignore */ }
    this.ui.setBest(this.best);
  }

  _clearFruits() {
    for (const f of this.fruits) this.scene.remove(f.group);
    for (const d of this.debris) this.scene.remove(d.group);
    this.fruits = [];
    this.debris = [];
    this.pending = [];
  }

  /* ------------------------------------------------------------------ */
  /* input                                                               */
  /* ------------------------------------------------------------------ */
  _installInput() {
    const canvas = this.canvas;
    const onDown = (e) => {
      if (this.state !== 'playing') return;
      this.audio.ensure();
      if (e.pointerType === 'mouse') {
        this.isDown = true;
        this.activePointer = e.pointerId;
        this.strokeHits = 0;
        this.strokeStart = this.clock;
        this.effects.trail.clear();
        this.lastWorld = this.screenToWorld(e.clientX, e.clientY);
        try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      } else {
        if (this.activePointer !== null) return;
        this.isDown = true;
        this.activePointer = e.pointerId;
        this.strokeHits = 0;
        this.strokeStart = this.clock;
        this.effects.trail.clear();
        this.lastWorld = this.screenToWorld(e.clientX, e.clientY);
        this._updateParallax(e.clientX, e.clientY);
      }
      e.preventDefault();
    };

    const onMove = (e) => {
      this._updateParallax(e.clientX, e.clientY);
      if (this.state !== 'playing') { this.lastWorld = null; return; }

      const mouse = e.pointerType === 'mouse';
      if (!mouse && !this.isDown) return;
      if (!mouse && this.activePointer !== e.pointerId) return;

      const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [e];
      for (const evt of events) {
        const p = this.screenToWorld(evt.clientX, evt.clientY);
        if (mouse && !this.isDown && this.lastPointerAt > 0 && this.clock - this.lastPointerAt > 0.18) {
          // hovering still slices, but starts a fresh stroke after a natural pause
          this.strokeHits = 0;
        }
        if (!this.lastWorld) {
          this.lastWorld = p;
          this.lastPointerAt = this.clock;
          continue;
        }
        const dx = p.x - this.lastWorld.x;
        const dy = p.y - this.lastWorld.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.006) continue;
        if (mouse && !this.isDown) {
          if (this.strokeHits === 0 && this.clock - this.lastStrokeTime > 0.28) this.effects.trail.clear();
          this.strokeStart = this.strokeStart || this.clock;
        }
        this.effects.trail.push(new THREE.Vector3(p.x, p.y, 1.5), this.clock);
        this._sampleSwipe(this.lastWorld, p, false);
        this.lastWorld = p;
        this.lastStrokeTime = this.clock;
        this.lastPointerAt = this.clock;
      }
      if (this.hintTimer > 0) {
        this.hintTimer = 0;
        this.ui.showHint(false);
      }
    };

    const onUp = (e) => {
      if (this.activePointer !== null && this.activePointer !== e.pointerId) return;
      this.isDown = false;
      this.activePointer = null;
      this.lastWorld = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    };

    canvas.addEventListener('pointerdown', onDown, { passive: false });
    canvas.addEventListener('pointermove', onMove, { passive: false });
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse' && !this.isDown) {
        this.lastWorld = null;
        this.lastPointerAt = -10;
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT')) return;
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        if (this.state === 'playing' || this.state === 'paused') {
          e.preventDefault();
          this.togglePause();
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (this.state === 'menu') { e.preventDefault(); this.startGame(); }
        else if (this.state === 'over') { e.preventDefault(); this.startGame(); }
        else if (this.state === 'paused') { e.preventDefault(); this.resume(); }
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pause();
    });

    window.addEventListener('blur', () => {
      if (this.state === 'playing') this.pause();
    });
  }

  _updateParallax(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointerNDC.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    this.world.setParallax(this.pointerNDC.x, this.pointerNDC.y);
  }

  screenToWorld(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    this.ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.ndc.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    this.raycaster.setFromCamera(this.ndc, this.camera);
    const hit = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(this.slicePlane, hit);
    if (!hit) return new THREE.Vector3(0, 0, 0);
    return hit;
  }

  /* ------------------------------------------------------------------ */
  /* swipe collision                                                     */
  /* ------------------------------------------------------------------ */
  _sampleSwipe(p0, p1, attract) {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const len2 = dx * dx + dy * dy;
    if (len2 < 0.00003) return;

    const hits = [];
    for (const f of this.fruits) {
      if (f.sliced) continue;
      let t = ((f.pos.x - p0.x) * dx + (f.pos.y - p0.y) * dy) / len2;
      t = clamp(t, 0, 1);
      const cx = p0.x + dx * t;
      const cy = p0.y + dy * t;
      const dist = Math.hypot(f.pos.x - cx, f.pos.y - cy);
      const reach = f.radius * (f.bomb ? 0.92 : 1.0) + 0.04;
      if (dist <= reach) {
        hits.push({ fruit: f, t, point: new THREE.Vector3(cx, cy, 0) });
      }
    }
    if (!hits.length) return;
    hits.sort((a, b) => a.t - b.t);

    const angle = Math.atan2(dy, dx);
    for (const hit of hits) {
      if (hit.fruit.sliced) continue;
      if (hit.fruit.bomb) this._sliceBomb(hit.fruit, hit.point, angle);
      else this._sliceFruit(hit.fruit, angle, attract);
    }
    this.fruits = this.fruits.filter((f) => !f.sliced);
  }

  _sliceFruit(fruit, angle, attract) {
    fruit.sliced = true;
    this.scene.remove(fruit.group);

    const halves = this.factory.createHalves(fruit.def.id, fruit.radius, angle);
    for (const half of halves) {
      half.group.position.copy(fruit.pos);
      half.group.position.x += (Math.random() - 0.5) * 0.12;
      half.group.position.y += (Math.random() - 0.5) * 0.12;
      half.group.position.z += 0.15;
      this.scene.add(half.group);
      this.debris.push(half);
    }

    const tier = TIERS[this._tierIndex()];
    this.effects.burstFruit(fruit.pos, fruit.def, fruit.radius, tier.color);
    this.effects.addSlash(fruit.pos, angle, tier.color, 0.9 + fruit.radius * 0.3);
    if (this.lastSlicePoint) {
      this.effects.addArc(this.lastSlicePoint, fruit.pos, tier.color);
    }
    this.lastSlicePoint = fruit.pos.clone();
    this.effects.addShake(0.035 + this._tierIndex() * 0.012);

    if (attract) {
      return;
    }

    this.fruitSliced++;
    this.strokeHits++;
    this.lastSliceTime = this.clock;
    this.chain++;
    this.bestChain = Math.max(this.bestChain, this.chain);

    let mult = 1 + Math.min(this.chain, 30) * 0.1;
    const isGolden = fruit.def.special;
    let gain = Math.round(fruit.def.points * mult);

    let extraChain = 0;
    if (isGolden) extraChain = 2;
    this.chain += extraChain;
    mult = 1 + Math.min(this.chain, 30) * 0.1;

    let heartRestored = false;
    if (this.chain > 0 && this.chain % 25 === 0 && this.lives < 3) {
      this.lives++;
      this.ui.setLives(this.lives);
      heartRestored = true;
      this.audio.heart();
    }
    if (isGolden) {
      this.effects.flash('gold');
      this.audio.frenzy();
      if (this.lives < 3) {
        this.lives++;
        this.ui.setLives(this.lives);
        heartRestored = true;
        this.audio.heart();
      } else {
        gain += 100;
      }
      this.effects.addShock(fruit.pos, 0xffd583, 7.5, 0.75);
      this.ui.callout('GOLDEN SURGE', 'frenzy', heartRestored ? 'HEART RESTORED' : 'SCORE SURGE +100');
    }

    this.score += gain;
    this.ui.setScore(this.score);
    this.ui.setChain(this.chain, mult, 1, TIERS[this._tierIndex()]);
    const popupPos = fruit.pos.clone();
    popupPos.x += (Math.random() - 0.5) * 0.5;
    popupPos.y += (Math.random() - 0.5) * 0.25;
    this.effects.addPopup(popupPos, `+${gain}`, {
      color: isGolden ? '#ffe6a0' : tier.color,
      scale: isGolden ? 1.6 : 1.0 + Math.min(this.chain, 12) * 0.018,
      sub: isGolden ? 'GOLDEN FRUIT' : '',
      life: isGolden ? 1.5 : 1.0,
      rise: 2.4,
    });
    this.audio.slice(this.chain, isGolden);

    const newTier = this._tierIndex();
    if (newTier !== this.lastTier) {
      this._applyTier(newTier);
      this.ui.callout(TIERS[newTier].name, 'chain', 'BLADE TRANSFORMED');
      this.audio.chainUp(newTier + 2);
    } else if (this.chain > 0 && this.chain % 5 === 0) {
      this.audio.chainUp(this.chain / 5);
      this.ui.callout(`CHAIN ×${this.chain}`, 'chain', heartRestored ? 'HEART RESTORED' : 'POWER RISING');
    }

    if (this.chain === 10) {
      this.ui.callout('CHAIN ×10', 'frenzy', 'STORMBOUND AWAKENED');
    }

    if (this.strokeHits >= 3) {
      const labels = ['', '', '', 'TRIPLE SLICE', 'QUAD SLICE', 'GODLIKE SLICE'];
      const label = labels[Math.min(this.strokeHits, 5)];
      const bonus = 25 * this.strokeHits;
      this.score += bonus;
      this.ui.setScore(this.score);
      this.ui.callout(label, 'mult', `+${bonus} SWIPE BONUS`);
      this.effects.addPopup(new THREE.Vector3(fruit.pos.x, fruit.pos.y + 1.2, 1), `+${bonus}`, {
        color: '#8beaff', scale: 1.0, life: 0.9, rise: 1.8,
      });
    }

    this.ui.setBladeProgress(this._tierProgress());
    this.hintTimer = 0;
    this.ui.showHint(false);
  }

  _sliceBomb(fruit, hitPoint, angle) {
    fruit.sliced = true;
    this.scene.remove(fruit.group);
    this.effects.addSlash(hitPoint, angle, '#ff6a5a', 1.3);
    this.effects.burstBomb(fruit.pos);
    this.audio.bomb();
    this.effects.addShake(0.9);
    this.effects.hurtFlash();
    if (this.haptics) { try { navigator.vibrate([36, 28, 80]); } catch { /* ignore */ } }

    if (this.state !== 'playing') return;

    this.lives = Math.max(0, this.lives - 1);
    this.ui.setLives(this.lives, true);
    this.ui.callout('BOOM', 'danger', this.chain > 0 ? 'CHAIN LOST · HEART LOST' : 'HEART LOST');
    this._resetChain(false);
    this.strokeHits = 0;
    if (this.lives <= 0) this.gameOver();
  }

  _resetChain(showCallout = true) {
    if (this.chain <= 0) {
      this.chain = 0;
      this.ui.setChain(0, 1, 0, TIERS[0]);
      this.ui.updateChainTimer(0);
      return;
    }
    const old = this.chain;
    this.chain = 0;
    this.lastSliceTime = -10;
    this.lastSlicePoint = null;
    this.ui.setChain(0, 1, 0, TIERS[0]);
    this.ui.updateChainTimer(0);
    this.ui.setBladeProgress(0);
    this._applyTier(0);
    this.world.setAccent(TIERS[0].color);
    if (showCallout && old >= 3) {
      this.ui.callout('CHAIN BROKEN', 'danger', `${old} SLICES FADED`);
    }
  }

  _tierIndex() {
    let idx = 0;
    for (let i = 0; i < TIER_THRESHOLDS.length; i++) {
      if (this.chain >= TIER_THRESHOLDS[i]) idx = i;
    }
    return idx;
  }

  _tierProgress() {
    const idx = this._tierIndex();
    if (idx >= TIER_THRESHOLDS.length - 1) return 1;
    const lo = TIER_THRESHOLDS[idx];
    const hi = TIER_THRESHOLDS[idx + 1];
    return clamp((this.chain - lo) / (hi - lo), 0, 1);
  }

  _applyTier(index) {
    this.lastTier = index;
    const tier = TIERS[index];
    this.ui.setTier(index);
    this.effects.trail.setColor(tier.color);
    this.effects.trail.width = 1 + index * 0.16 + Math.min(this.chain, 20) * 0.006;
    if (this.haptics && index > 0) { try { navigator.vibrate(14); } catch { /* ignore */ } }
  }

  _currentWindow() {
    return Math.max(2.05, 2.7 - Math.min(0.65, this.chain * 0.022));
  }

  /* ------------------------------------------------------------------ */
  /* spawning                                                            */
  /* ------------------------------------------------------------------ */
  _spawnOpeners() {
    const bottom = this.bounds.bottom;
    const specs = [
      { type: 'watermelon', x: -this.bounds.halfW * 0.38, apex: 0.66, delay: 0 },
      { type: 'orange', x: this.bounds.halfW * 0.3, apex: 0.74, delay: 0.12 },
      { type: 'dragon', x: this.bounds.halfW * 0.02, apex: 0.58, delay: 0.28 },
    ];
    for (const spec of specs) {
      this._spawnFruit({ type: spec.type, x: spec.x, bomb: false });
      const f = this.fruits[this.fruits.length - 1];
      if (!f) continue;
      const y = bottom + this.bounds.viewH * 0.3;
      f.pos.set(spec.x, y - spec.delay * 6, 0);
      f.vel.y = Math.sqrt(2 * GRAVITY * Math.max(2, this.bounds.viewH * spec.apex - y));
      f.vel.x = (spec.x > 0 ? -1 : 1) * rand(0.2, 0.6);
    }
  }

  _chooseType() {
    let total = 0;
    for (const id of TYPE_LIST) total += FRUIT_DEFS[id].weight;
    let roll = Math.random() * total;
    for (const id of TYPE_LIST) {
      roll -= FRUIT_DEFS[id].weight;
      if (roll <= 0) return id;
    }
    return 'apple';
  }

  _scheduleBurst() {
    const diff = Math.min(1, this.elapsed / 85);
    const roll = Math.random();
    let count = 1;
    if (roll < 0.04 + 0.08 * diff) count = 4;
    else if (roll < 0.15 + 0.14 * diff) count = 3;
    else if (roll < 0.42 + 0.13 * diff) count = 2;

    const xs = [];
    for (let i = 0; i < count; i++) {
      const lane = count === 1 ? rand(-0.65, 0.65) : -0.8 + (1.6 * (i + 0.5)) / count + rand(-0.09, 0.09);
      xs.push(lane * this.bounds.halfW);
    }
    // shuffle lanes so bursts don't sweep left-to-right predictably
    for (let i = xs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [xs[i], xs[j]] = [xs[j], xs[i]];
    }

    let bombIndex = -1;
    if (this.elapsed > 8) {
      const bombChance = 0.07 + 0.1 * diff;
      if (Math.random() < bombChance) {
        if (count === 1) {
          // never a lone bomb; pair it with a fruit
          count = 2;
          xs.push(rand(-0.7, 0.7) * this.bounds.halfW);
          bombIndex = Math.random() < 0.5 ? 0 : 1;
        } else {
          bombIndex = Math.floor(Math.random() * count);
        }
      }
    }

    for (let i = 0; i < count; i++) {
      this.pending.push({
        at: this.clock + i * rand(0.06, 0.12),
        x: xs[i] ?? rand(-0.7, 0.7) * this.bounds.halfW,
        bomb: i === bombIndex,
        type: this._chooseType(),
      });
    }

    if (this.elapsed > 14 && this.clock - this.lastGoldenAt > 23 && Math.random() < 0.09) {
      this.lastGoldenAt = this.clock;
      this.pending.push({
        at: this.clock + 0.15,
        x: rand(-0.35, 0.35) * this.bounds.halfW,
        bomb: false,
        type: 'golden',
      });
    }
  }

  _spawnFruit(spec) {
    const scale = this.bounds.scale * (spec.type === 'golden' ? 1.05 : 1);
    let created;
    if (spec.bomb) created = this.factory.createBomb(this.bounds.scale * 0.98);
    else created = this.factory.createFruit(spec.type, scale);

    const bottom = this.bounds.bottom;
    const startY = bottom - 1.8;
    const apex = bottom + this.bounds.viewH * (spec.bomb ? rand(0.58, 0.84) : rand(0.56, 0.97));
    const vy = Math.sqrt(Math.max(1, 2 * GRAVITY * (apex - startY)));
    const vx = rand(-0.75, 0.75) + (-spec.x) * 0.035;

    const group = created.group;
    group.position.set(spec.x, startY, 0);
    group.rotation.set(rand(0, Math.PI * 2), rand(0, Math.PI * 2), rand(0, Math.PI * 2));
    this.scene.add(group);

    const fruit = {
      group,
      pos: group.position,
      vel: new THREE.Vector3(vx, vy, 0),
      radius: created.radius,
      def: created.def,
      bomb: !!spec.bomb,
      sliced: false,
      age: 0,
      spin: group.userData.spin || new THREE.Vector3(0, 0, 1),
      spinSpeed: group.userData.spinSpeed || 1,
      phase: rand(0, Math.PI * 2),
      startScale: 0.82,
      grace: this.state === 'playing' && this.elapsed < 3.8,
    };
    group.scale.setScalar(0.82);
    this.fruits.push(fruit);
  }

  /* ------------------------------------------------------------------ */
  /* attract mode                                                        */
  /* ------------------------------------------------------------------ */
  _updateAttract(dt) {
    this.menuSpawnTimer -= dt;
    if (this.menuSpawnTimer <= 0) {
      this.menuSpawnTimer = rand(0.95, 1.5);
      if (this.fruits.filter((f) => !f.sliced).length < 6) {
        const count = Math.random() < 0.28 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          this._spawnFruit({
            x: rand(-0.7, 0.7) * this.bounds.halfW,
            bomb: false,
            type: this._chooseType(),
          });
        }
      }
    }

    if (this.autoSwipe) {
      this.autoSwipe.t += dt / this.autoSwipe.duration;
      const t = clamp(this.autoSwipe.t, 0, 1);
      const ease = t * t * (3 - 2 * t);
      const p = new THREE.Vector3().lerpVectors(this.autoSwipe.from, this.autoSwipe.to, ease);
      this.effects.trail.push(new THREE.Vector3(p.x, p.y, 1.5), this.clock);
      if (this.autoSwipe.t > 0.02) {
        this._sampleSwipe(this.autoSwipe.prev, p, true);
      }
      this.autoSwipe.prev = p;
      if (t >= 1) {
        this.autoSwipe = null;
        this.autoSwipeTimer = rand(1.7, 2.9);
      }
    } else {
      this.autoSwipeTimer -= dt;
      if (this.autoSwipeTimer <= 0) {
        const candidates = this.fruits.filter((f) => !f.sliced && !f.bomb && f.pos.y > this.bounds.bottom + 3);
        if (candidates.length) {
          candidates.sort((a, b) => b.pos.y - a.pos.y);
          const target = candidates[0];
          const side = Math.random() < 0.5 ? -1 : 1;
          const from = new THREE.Vector3(
            target.pos.x - side * rand(2.4, 3.8),
            target.pos.y - rand(1.2, 2.2),
            0,
          );
          const to = new THREE.Vector3(
            target.pos.x + side * rand(2.4, 3.8),
            target.pos.y + rand(1.2, 2.2),
            0,
          );
          this.autoSwipe = { from, to, prev: from.clone(), t: 0, duration: rand(0.22, 0.3) };
          this.effects.trail.clear();
        } else {
          this.autoSwipeTimer = 0.4;
        }
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* update                                                              */
  /* ------------------------------------------------------------------ */
  update(dt) {
    this.ambientClock += dt;
    this.world.update(dt, this.ambientClock);

    if (this.state === 'paused') {
      // world keeps breathing; gameplay and effects freeze
      return;
    }

    this.clock += dt;

    if (this.state === 'menu') {
      this._updateAttract(dt);
    } else if (this.state === 'playing') {
      this.elapsed += dt;
      this._updateSpawner(dt);
      this._updateChain(dt);
      this._updateHint(dt);
    }

    this._updatePending();
    this._updateFruits(dt);
    this._updateDebris(dt);
    this.effects.update(dt, this.clock);
  }

  _updateSpawner(dt) {
    const diff = Math.min(1, this.elapsed / 85);
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this._scheduleBurst();
      this.spawnTimer = (1.06 - 0.34 * diff) * rand(0.86, 1.18);
    }
  }

  _updatePending() {
    for (let i = this.pending.length - 1; i >= 0; i--) {
      if (this.pending[i].at <= this.clock) {
        const spec = this.pending[i];
        this.pending.splice(i, 1);
        if (this.state === 'playing' || this.state === 'menu') this._spawnFruit(spec);
      }
    }
  }

  _updateChain(dt) {
    if (this.chain <= 0) return;
    const window = this._currentWindow();
    const since = this.clock - this.lastSliceTime;
    if (since > window) {
      this._resetChain(true);
      return;
    }
    this.ui.updateChainTimer(1 - since / window);
  }

  _updateHint(dt) {
    if (this.hintTimer > 0) {
      this.hintTimer -= dt;
      if (this.hintTimer <= 0) this.ui.showHint(false);
    }
  }

  _updateFruits(dt) {
    const bottom = this.bounds.bottom;
    const half = this.bounds.halfW;
    for (let i = this.fruits.length - 1; i >= 0; i--) {
      const f = this.fruits[i];
      if (f.sliced) continue;
      f.age += dt;
      f.vel.y -= GRAVITY * dt;
      f.pos.x += f.vel.x * dt;
      f.pos.y += f.vel.y * dt;
      f.pos.z = 0;

      f.group.rotation.x += f.spin.x * f.spinSpeed * dt * 1.9;
      f.group.rotation.y += f.spin.y * f.spinSpeed * dt * 1.9;
      f.group.rotation.z += f.spin.z * f.spinSpeed * dt * 1.1;
      const pop = Math.min(1, f.age / 0.22);
      f.group.scale.setScalar(0.82 + pop * 0.18 + Math.sin(this.clock * 2.2 + f.phase) * 0.012);

      if (f.bomb) {
        const spark = f.group.userData.spark;
        const glow = f.group.userData.glow;
        const ring = f.group.userData.ring;
        if (spark) spark.scale.setScalar(0.6 + Math.sin(this.clock * 22 + f.phase) * 0.16);
        if (glow) glow.material.opacity = 0.4 + Math.sin(this.clock * 18 + f.phase) * 0.16;
        if (ring) ring.rotation.z += dt * 2.2;
      } else if (f.def?.special) {
        const ring = f.group.userData.ring;
        const glow = f.group.userData.glow;
        if (ring) { ring.rotation.z += dt * 1.5; ring.rotation.y += dt * 0.7; }
        if (glow) glow.material.opacity = 0.42 + Math.sin(this.clock * 3 + f.phase) * 0.14;
      }

      const out = f.pos.y < bottom - 1.4 && f.vel.y < 0;
      const sideways = Math.abs(f.pos.x) > this.bounds.viewW * 0.5 + 2.5;
      if (out || sideways) {
        this.scene.remove(f.group);
        this.fruits.splice(i, 1);
        if (!f.bomb && this.state === 'playing') this._onMiss(f);
        continue;
      }
    }
  }

  _onMiss(fruit) {
    // Opening arcs (and anything spawned in the first moments) are a free
    // tutorial: dropping them never costs a heart.
    if (fruit?.grace) return;
    this.lives = Math.max(0, this.lives - 1);
    this.ui.setLives(this.lives, true);
    this.effects.hurtFlash();
    this.effects.addShake(0.12);
    this.audio.miss();
    const hadChain = this.chain;
    this._resetChain(false);
    this.ui.callout('MISSED', 'danger', hadChain >= 3 ? `${hadChain} SLICE CHAIN LOST` : 'A HEART FADES');
    if (this.lives <= 0) this.gameOver();
  }

  _updateDebris(dt) {
    const bottom = this.bounds.bottom;
    for (let i = this.debris.length - 1; i >= 0; i--) {
      const d = this.debris[i];
      d.age += dt;
      d.velocity.y -= GRAVITY * 0.72 * dt;
      d.group.position.x += d.velocity.x * dt;
      d.group.position.y += d.velocity.y * dt;
      d.group.rotation.x += d.spin.x * dt;
      d.group.rotation.y += d.spin.y * dt;
      d.group.rotation.z += d.spin.z * dt;
      if (d.age > 2.2) {
        const k = Math.max(0, 1 - (d.age - 2.2) / 0.5);
        d.group.scale.setScalar(k);
      }
      if (d.age > 2.7 || d.group.position.y < bottom - 4) {
        this.scene.remove(d.group);
        this.debris.splice(i, 1);
      }
    }
  }

  /* debug hooks used by local screenshot checks */
  debugSpawn(type, x = 0, apex = 0.75) {
    const bottom = this.bounds.bottom;
    this._spawnFruit({ type: type || this._chooseType(), x, bomb: type === 'bomb' });
    const f = this.fruits[this.fruits.length - 1];
    if (f) {
      f.pos.y = bottom + this.bounds.viewH * apex;
      f.vel.y = 0.5;
    }
  }

  debugSlice() {
    const p0 = new THREE.Vector3(-this.bounds.halfW, 0, 0);
    const p1 = new THREE.Vector3(this.bounds.halfW, 0, 0);
    this._sampleSwipe(p0, p1, false);
  }
}
