import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/* ==========================================================================
   RICK & MORTY: PORTAL PANIC
   Core: renderer, scene, audio, shared helpers.
   ========================================================================== */

export { THREE };

export const $ = (id) => document.getElementById(id);
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(rand(a, b + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const TAU = Math.PI * 2;
export const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 760;
export const formatScore = (n) => Math.floor(n).toString().padStart(6, '0');
export const angleLerp = (a, b, t) => {
  let d = ((b - a + Math.PI) % TAU) - Math.PI;
  if (d < -Math.PI) d += TAU;
  return a + d * t;
};

document.body.classList.toggle('mobile', isTouch);

export const state = {
  mode: 'loading',
  started: false,
  muted: false,
  time: 0,
  score: 0,
  best: Number(localStorage.getItem('portal-panic-best') || 0),
  wave: 0,
  waveTotal: 0,
  waveActive: false,
  intermission: 0,
  pending: [],
  spawnTimer: 0,
  kills: 0,
  seeds: 0,
  combo: 1,
  comboTimer: 0,
  shake: 0,
  endTimer: 0,
  won: false,
  hintTimer: 10,
  lastMinimap: 0,
  bossSpawned: false,
  bossSummoned: false,
};

/* --------------------------------------------------------------------------
   AUDIO
   -------------------------------------------------------------------------- */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.musicGain = null;
    this.muted = false;
    this.musicNext = 0;
    this.musicStep = 0;
    this.hum = null;
  }
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.42;
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 18;
    comp.ratio.value = 5;
    this.master.connect(comp).connect(this.ctx.destination);

    // A tiny generated plate reverb gives the garage some space.
    const len = this.ctx.sampleRate * 0.55;
    const impulse = this.ctx.createBuffer(2, len, this.ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const data = impulse.getChannelData(c);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.4);
    }
    this.verb = this.ctx.createConvolver();
    this.verb.buffer = impulse;
    this.verbGain = this.ctx.createGain();
    this.verbGain.gain.value = 0.16;
    this.verb.connect(this.verbGain).connect(this.master);

    this.startHum();
  }
  setMuted(value) {
    this.muted = value;
    if (this.master) this.master.gain.setTargetAtTime(value ? 0 : 0.42, this.ctx.currentTime, 0.04);
    const buttons = [$('btn-sound'), $('btn-sound-title')];
    buttons.forEach((b) => {
      if (!b) return;
      b.classList.toggle('off', value);
      b.setAttribute('aria-label', value ? 'Ativar som' : 'Desativar som');
    });
    const label = $('sound-title-label');
    if (label) label.textContent = value ? 'SOM DESLIGADO' : 'SOM LIGADO';
  }
  startHum() {
    if (!this.ctx || this.hum) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    o.type = 'sawtooth';
    o.frequency.value = 49;
    f.type = 'lowpass';
    f.frequency.value = 120;
    g.gain.value = 0.012;
    o.connect(f).connect(g).connect(this.master);
    o.start();
    const lfo = this.ctx.createOscillator();
    const lg = this.ctx.createGain();
    lfo.frequency.value = 0.09;
    lg.gain.value = 7;
    lfo.connect(lg).connect(o.frequency);
    lfo.start();
    this.hum = o;
  }
  tone({ freq = 440, end = freq, dur = 0.15, type = 'sine', vol = 0.12, delay = 0, verb = 0 }) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(Math.max(20, freq), t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, end), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    if (verb) {
      const send = this.ctx.createGain();
      send.gain.value = verb;
      g.connect(send).connect(this.verb);
    }
    o.start(t);
    o.stop(t + dur + 0.03);
  }
  noise({ dur = 0.12, vol = 0.09, freq = 1200, q = 0.8, delay = 0, type = 'bandpass', verb = 0 }) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.value = vol;
    src.connect(f).connect(g).connect(this.master);
    if (verb) {
      const send = this.ctx.createGain();
      send.gain.value = verb;
      g.connect(send).connect(this.verb);
    }
    src.start(t);
  }
  shoot() {
    this.tone({ freq: 760, end: 150, dur: 0.12, type: 'square', vol: 0.055, verb: 0.25 });
    this.tone({ freq: 1500, end: 360, dur: 0.07, type: 'sawtooth', vol: 0.025 });
    this.noise({ dur: 0.07, vol: 0.045, freq: 2100, q: 1.1 });
  }
  enemyShoot() {
    this.tone({ freq: 320, end: 88, dur: 0.24, type: 'sawtooth', vol: 0.045, verb: 0.35 });
    this.noise({ dur: 0.15, vol: 0.03, freq: 700, q: 0.7 });
  }
  hit() {
    this.noise({ dur: 0.06, vol: 0.06, freq: 2800, q: 1.4 });
    this.tone({ freq: 220, end: 90, dur: 0.08, type: 'triangle', vol: 0.05 });
  }
  kill() {
    this.noise({ dur: 0.25, vol: 0.09, freq: 600, q: 0.55, verb: 0.4 });
    this.tone({ freq: 140, end: 42, dur: 0.3, type: 'sawtooth', vol: 0.08, verb: 0.4 });
  }
  hurt() {
    this.tone({ freq: 130, end: 45, dur: 0.35, type: 'sawtooth', vol: 0.1, verb: 0.35 });
    this.noise({ dur: 0.2, vol: 0.07, freq: 420, q: 0.5 });
  }
  dash() {
    this.tone({ freq: 180, end: 760, dur: 0.18, type: 'sine', vol: 0.07, verb: 0.2 });
    this.noise({ dur: 0.18, vol: 0.05, freq: 1300, q: 0.6 });
  }
  pickup() {
    this.tone({ freq: 740, end: 740, dur: 0.09, type: 'sine', vol: 0.07, delay: 0 });
    this.tone({ freq: 1110, end: 1110, dur: 0.16, type: 'sine', vol: 0.05, delay: 0.07, verb: 0.3 });
  }
  heal() {
    this.tone({ freq: 440, end: 880, dur: 0.35, type: 'sine', vol: 0.06, verb: 0.35 });
    this.tone({ freq: 660, end: 1320, dur: 0.4, type: 'triangle', vol: 0.035, delay: 0.08, verb: 0.4 });
  }
  wave() {
    this.tone({ freq: 90, end: 240, dur: 1.2, type: 'sawtooth', vol: 0.07, verb: 0.5 });
    this.tone({ freq: 220, end: 440, dur: 0.8, type: 'sine', vol: 0.04, delay: 0.15, verb: 0.4 });
    this.noise({ dur: 0.6, vol: 0.025, freq: 400, q: 0.4, verb: 0.5 });
  }
  boss() {
    this.tone({ freq: 55, end: 36, dur: 1.6, type: 'sawtooth', vol: 0.13, verb: 0.5 });
    this.tone({ freq: 165, end: 82, dur: 1.3, type: 'square', vol: 0.035, verb: 0.6 });
    this.noise({ dur: 1.1, vol: 0.04, freq: 180, q: 0.4, verb: 0.6 });
  }
  ui() {
    this.tone({ freq: 520, end: 780, dur: 0.06, type: 'square', vol: 0.025 });
  }
  updateMusic(active) {
    if (!this.ctx || this.muted || !active) return;
    const t = this.ctx.currentTime;
    if (!this.musicNext) this.musicNext = t + 0.2;
    if (this.musicNext > t + 0.35) return;
    const notes = [55, 55, 65.41, 49, 55, 73.42, 65.41, 49];
    const beat = 0.29;
    while (this.musicNext < t + 0.2) {
      const n = notes[this.musicStep % notes.length];
      const when = this.musicNext - t;
      this.tone({ freq: n, end: n, dur: 0.22, type: 'triangle', vol: 0.022, delay: when });
      if (this.musicStep % 2 === 0) {
        this.tone({ freq: 120, end: 38, dur: 0.12, type: 'sine', vol: 0.055, delay: when });
      }
      if (this.musicStep % 4 === 2) this.noise({ dur: 0.045, vol: 0.018, freq: 4500, q: 2, delay: when });
      this.musicNext += beat;
      this.musicStep++;
    }
  }
}
export const audio = new SoundEngine();

/* --------------------------------------------------------------------------
   RENDERER + SCENE
   -------------------------------------------------------------------------- */
const canvas = $('game-canvas');
export const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  stencil: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x040a07);
scene.fog = new THREE.FogExp2(0x06100c, 0.021);

export const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 120);
camera.position.set(0, 10.5, 13);
camera.lookAt(0, 1.2, 0);

export const composer = new EffectComposer(renderer);
export const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
export const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  isTouch ? 0.42 : 0.58,
  0.55,
  0.84
);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());

/* --------------------------------------------------------------------------
   SHARED MATERIAL / TEXTURE HELPERS
   -------------------------------------------------------------------------- */
export function standard(color, roughness = 0.78, metalness = 0.08, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
}
export function emissive(color, intensity = 1, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color: 0x0b1511,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.35,
    metalness: 0.2,
    ...extra,
  });
}
export function addBox(parent, w, h, d, material, x = 0, y = 0, z = 0, cast = true, receive = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  parent.add(m);
  return m;
}
export function addCyl(parent, rTop, rBot, h, seg, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
export function addSphere(parent, r, material, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), material);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
export function markShadows(root, cast = true, receive = true) {
  root.traverse((o) => {
    if (o.isMesh && !o.userData.noShadow) {
      o.castShadow = cast;
      o.receiveShadow = receive;
    }
  });
}

function canvasTexture(w, h, draw, { repeat = null, srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  return tex;
}

export function makeConcreteTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = '#27332e';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9000; i++) {
      const v = Math.random();
      ctx.fillStyle = `rgba(${v > 0.5 ? '190,210,200' : '5,12,8'},${Math.random() * 0.06})`;
      const s = Math.random() * 4 + 1;
      ctx.fillRect(Math.random() * w, Math.random() * h, s, s);
    }
    // slabs
    ctx.strokeStyle = 'rgba(7, 14, 11, .8)';
    ctx.lineWidth = 5;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo((i * w) / 4, 0);
      ctx.lineTo((i * w) / 4, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, (i * h) / 4);
      ctx.lineTo(w, (i * h) / 4);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(170, 200, 184, .07)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo((i * w) / 4 + 3, 0);
      ctx.lineTo((i * w) / 4 + 3, h);
      ctx.stroke();
    }
    // stains and scuffs
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 44 + 8;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(8, 18, 13, ${Math.random() * 0.18})`);
      g.addColorStop(1, 'rgba(8, 18, 13, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    ctx.strokeStyle = 'rgba(154, 184, 167, .08)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.random() * 28 - 14, y + Math.random() * 28 - 14);
      ctx.stroke();
    }
  }, { repeat: [7, 6] });
}

export function makeMetalTexture() {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#33433f';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.025})`;
      ctx.fillRect(0, Math.random() * h, w, Math.random() * 2);
    }
    ctx.strokeStyle = 'rgba(5,12,9,.7)';
    ctx.lineWidth = 3;
    for (let x = 0; x < w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(3,8,6,.7)';
    for (let x = 16; x < w; x += 64) {
      for (let y = 14; y < h; y += 40) {
        ctx.beginPath();
        ctx.arc(x, y, 2.3, 0, TAU);
        ctx.fill();
      }
    }
  }, { repeat: [4, 1] });
}

export function makeHazardTexture() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#c9a92d';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#151b16';
    ctx.save();
    ctx.translate(0, 0);
    for (let i = -h; i < w + h; i += 42) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 21, 0);
      ctx.lineTo(i + 21 + h, h);
      ctx.lineTo(i + h, h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    for (let i = 0; i < 400; i++) ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }, { repeat: [4, 1] });
}

export function makeGlowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.2, inner.replace(/[\d.]+\)$/, '0.75)'));
    g.addColorStop(0.55, inner.replace(/[\d.]+\)$/, '0.18)'));
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, { srgb: true });
}
export const glowTexture = makeGlowTexture();

export function glowSprite(color = 0x7dff5a, size = 1, opacity = 0.8) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(size, size, 1);
  s.userData.noShadow = true;
  return s;
}

export function makeTextTexture(text, {
  width = 1024, height = 512, bg = 'rgba(8,18,13,0)', color = '#eaffdf',
  font = 'Bangers', size = 140, sub = '', subColor = '#7dff5a', border = true, align = 'center',
} = {}) {
  return canvasTexture(width, height, (ctx, w, h) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    if (border) {
      ctx.strokeStyle = 'rgba(125,255,90,.35)';
      ctx.lineWidth = 5;
      ctx.strokeRect(12, 12, w - 24, h - 24);
    }
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    const x = align === 'center' ? w / 2 : 50;
    const lines = String(text).split('\n');
    ctx.font = `${size}px ${font}, Impact, sans-serif`;
    ctx.shadowColor = color;
    ctx.shadowBlur = 22;
    ctx.fillStyle = color;
    const lineHeight = size * 0.8;
    const total = (lines.length - 1) * lineHeight;
    const baseY = (sub ? h * 0.4 : h / 2) - total / 2;
    lines.forEach((line, i) => ctx.fillText(line, x, baseY + i * lineHeight));
    if (sub) {
      ctx.shadowColor = subColor;
      ctx.shadowBlur = 12;
      ctx.font = `600 ${Math.round(size * 0.21)}px Rajdhani, sans-serif`;
      ctx.fillStyle = subColor;
      ctx.fillText(sub, x, h * 0.75);
    }
  });
}

/* --------------------------------------------------------------------------
   PARTICLES
   -------------------------------------------------------------------------- */
const MAX_PARTICLES = isTouch ? 520 : 900;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(MAX_PARTICLES * 3);
const pCol = new Float32Array(MAX_PARTICLES * 3);
const pSize = new Float32Array(MAX_PARTICLES);
const pAlpha = new Float32Array(MAX_PARTICLES);
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
pGeo.setAttribute('size', new THREE.BufferAttribute(pSize, 1));
pGeo.setAttribute('alpha', new THREE.BufferAttribute(pAlpha, 1));
const pMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  vertexShader: `
    attribute float size;
    attribute float alpha;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vColor = color;
      vAlpha = alpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (240.0 / max(1.0, -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float a = smoothstep(1.0, 0.08, d) * vAlpha;
      gl_FragColor = vec4(vColor * a, a);
    }
  `,
});
const pPoints = new THREE.Points(pGeo, pMat);
pPoints.frustumCulled = false;
scene.add(pPoints);
const particles = [];
let particleCursor = 0;

export function emitParticle(pos, color, opts = {}) {
  const i = particleCursor;
  particleCursor = (particleCursor + 1) % MAX_PARTICLES;
  let p = particles[i];
  if (!p) {
    p = particles[i] = { pos: new THREE.Vector3(), vel: new THREE.Vector3(), life: 0, maxLife: 1, size: 1, gravity: 0, drag: 1 };
  }
  p.pos.copy(pos);
  const spread = opts.spread ?? 1;
  p.vel.set(rand(-1, 1), rand(-0.4, 1.2), rand(-1, 1)).normalize().multiplyScalar(rand(0.4, 1.5) * spread);
  if (opts.vel) p.vel.copy(opts.vel);
  p.life = p.maxLife = opts.life ?? rand(0.25, 0.7);
  p.size = opts.size ?? rand(4, 10);
  p.gravity = opts.gravity ?? 3.2;
  p.drag = opts.drag ?? 2.5;
  p.color = color;
  pPos[i * 3] = p.pos.x;
  pPos[i * 3 + 1] = p.pos.y;
  pPos[i * 3 + 2] = p.pos.z;
  pCol[i * 3] = color.r;
  pCol[i * 3 + 1] = color.g;
  pCol[i * 3 + 2] = color.b;
  pSize[i] = p.size;
  pAlpha[i] = 1;
}
export function burst(pos, colorHex, count = 14, opts = {}) {
  const c = colorHex instanceof THREE.Color ? colorHex : new THREE.Color(colorHex);
  for (let i = 0; i < count; i++) emitParticle(pos, c, opts);
}
export function updateParticles(dt) {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if (!p || p.life <= 0) {
      if (pAlpha[i] !== 0) pAlpha[i] = 0;
      continue;
    }
    p.life -= dt;
    const f = Math.max(0, p.life / p.maxLife);
    p.vel.y -= p.gravity * dt;
    p.vel.multiplyScalar(Math.max(0, 1 - p.drag * dt));
    p.pos.addScaledVector(p.vel, dt);
    if (p.pos.y < 0.02) {
      p.pos.y = 0.02;
      p.vel.y *= -0.28;
      p.vel.x *= 0.7;
      p.vel.z *= 0.7;
    }
    pPos[i * 3] = p.pos.x;
    pPos[i * 3 + 1] = p.pos.y;
    pPos[i * 3 + 2] = p.pos.z;
    pAlpha[i] = Math.pow(f, 1.3);
    pSize[i] = p.size * (0.55 + f * 0.75);
  }
  pGeo.attributes.position.needsUpdate = true;
  pGeo.attributes.alpha.needsUpdate = true;
  pGeo.attributes.size.needsUpdate = true;
  pGeo.attributes.color.needsUpdate = true;
}

/* --------------------------------------------------------------------------
   AMBIENT DUST
   -------------------------------------------------------------------------- */
const dustCount = isTouch ? 90 : 180;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
  dustPos[i * 3] = rand(-15, 15);
  dustPos[i * 3 + 1] = rand(0.3, 5);
  dustPos[i * 3 + 2] = rand(-12, 12);
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dustMat = new THREE.PointsMaterial({
  color: 0xa8d8b6,
  size: 0.035,
  transparent: true,
  opacity: 0.36,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,
});
export const dust = new THREE.Points(dustGeo, dustMat);
scene.add(dust);
export function updateDust(t) {
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.0005;
    dustPos[i * 3] += Math.sin(t * 0.11 + i * 0.7) * 0.0007;
    dustPos[i * 3 + 2] += Math.cos(t * 0.13 + i * 0.4) * 0.0007;
  }
  dustGeo.attributes.position.needsUpdate = true;
}

/* --------------------------------------------------------------------------
   RESIZE
   -------------------------------------------------------------------------- */
export function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2));
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloomPass.setSize(w, h);
}
window.addEventListener('resize', onResize);

/* --------------------------------------------------------------------------
   CAMERA SHAKE
   -------------------------------------------------------------------------- */
export function addShake(amount) {
  state.shake = Math.min(1.2, state.shake + amount);
}
