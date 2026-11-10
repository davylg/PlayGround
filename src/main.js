import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { FruitFactory } from './fruits.js';
import { Effects } from './effects.js';
import { createWorld } from './world.js';
import { AudioEngine } from './audio.js';
import { UI } from './ui.js';
import { Game } from './game.js';

const canvas = document.getElementById('scene');
const errorCard = document.getElementById('error-card');

function fail(message) {
  console.error(message);
  errorCard.classList.remove('is-hidden');
  document.getElementById('start-screen')?.classList.add('is-hidden');
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    stencil: false,
  });
} catch (error) {
  fail('WebGL unavailable: ' + error.message);
  throw error;
}

renderer.setClearColor(0x08040f, 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || matchMedia('(pointer: coarse)').matches;
const maxPixelRatio = mobile ? 1.5 : 2;
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 220);
camera.position.set(0, 0, 30);
camera.lookAt(0, 0, 0);

const params = new URLSearchParams(location.search);
const useBloom = params.get('bloom') !== '0';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
let bloomPass = null;
if (useBloom) {
  bloomPass = new UnrealBloomPass(new THREE.Vector2(1280, 720), 0.55, 0.6, 0.82);
  composer.addPass(bloomPass);
}
composer.addPass(new OutputPass());

const factory = new FruitFactory();
const effects = new Effects(scene, camera, factory);
const world = createWorld(scene, factory);
const audio = new AudioEngine();

let game = null;
const ui = new UI({
  play: () => game.startGame(),
  retry: () => game.startGame(),
  menu: () => game.enterMenu(),
  resume: () => game.resume(),
  quit: () => game.quitToMenu(),
  pause: () => game.togglePause(),
  mute: () => {
    const muted = audio.toggleMuted();
    ui.setMuted(muted);
    if (!muted) audio.ui();
  },
});

game = new Game({
  scene, camera, canvas, factory, effects, world, audio, ui,
});
window.__chainblade = game;

/* ------------------------------------------------------------------ */
/* responsive camera framing                                           */
/* ------------------------------------------------------------------ */
const cameraBase = new THREE.Vector3(0, 0, 30);
let viewportHeight = 18;
let viewportWidth = 9;

function resize() {
  const width = Math.max(1, window.innerWidth);
  const height = Math.max(1, window.innerHeight);
  const aspect = width / height;

  const dpr = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height, false);
  composer.setPixelRatio(dpr);
  composer.setSize(width, height);

  camera.aspect = aspect;
  camera.fov = 32;
  camera.updateProjectionMatrix();

  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const distH = (15.2 * 0.5) / tan;
  const distW = (9.4 * 0.5) / (tan * aspect);
  const distance = Math.max(distH, distW);

  cameraBase.set(0, 0, distance);
  camera.position.copy(cameraBase);
  camera.lookAt(0, 0, 0);

  viewportHeight = 2 * distance * tan;
  viewportWidth = viewportHeight * aspect;

  game.setViewport(viewportHeight, viewportWidth, -viewportHeight * 0.5);
  effects.setViewport(height * dpr, THREE.MathUtils.degToRad(camera.fov));

  if (bloomPass) {
    bloomPass.strength = mobile ? 0.44 : 0.55;
    bloomPass.radius = 0.6;
    bloomPass.threshold = 0.82;
  }
}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 120));
resize();

/* ------------------------------------------------------------------ */
/* render loop                                                         */
/* ------------------------------------------------------------------ */
const clock = new THREE.Clock();
let running = true;

function frame() {
  if (!running) return;
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.08);
  game.update(dt);

  const shake = effects.shake;
  if (shake > 0.002) {
    camera.position.set(
      cameraBase.x + (Math.random() - 0.5) * shake * 0.7,
      cameraBase.y + (Math.random() - 0.5) * shake * 0.7,
      cameraBase.z,
    );
  } else {
    camera.position.copy(cameraBase);
  }
  camera.lookAt(0, 0, 0);

  composer.render();
}

requestAnimationFrame(frame);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) clock.getDelta();
});

// clean disposal on hot reload / navigation
window.addEventListener('pagehide', () => { running = false; });
