import * as THREE from 'three';
import { SettingsManager } from './game/SettingsManager.js';
import { AudioManager } from './game/AudioManager.js';
import { InputManager } from './game/InputManager.js';
import { GameManager } from './game/GameManager.js';
import { MenuUI } from './game/MenuUI.js';
import { CharacterViewer } from './game/CharacterFactory.js';
import './styles.css';

const canvas = document.getElementById('game-canvas');
const bootScreen = document.getElementById('boot-screen');
const settings = new SettingsManager();
const audio = new AudioManager(settings);
const input = new InputManager(settings);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const viewer = new CharacterViewer(renderer, canvas);
const game = new GameManager({ settings, audio, input });
const menu = new MenuUI({ app: { game, gameActive: false }, settings, audio, input, viewer });

const app = {
  game,
  menu,
  gameActive: false
};
app.startMatch = (opts) => {
  menu.hideMenuForGame();
  game.startMatch(opts);
  if (!input.isTouch) {
    setTimeout(() => canvas.requestPointerLock?.(), 80);
  }
};
menu.app = app;
game.onRematch = () => {
  if (!game.lastMatch) return;
  game.startMatch(game.lastMatch);
};
game.onExitToMenu = () => {
  game.clearGame();
  input.setEnabled(false);
  if (document.pointerLockElement) document.exitPointerLock?.();
  menu.showMenu();
};
game.openSettings = () => menu.openSettings();

let lastTime = performance.now();
let frameCount = 0;

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.get('quality') === 'low' ? 1 : 2));
  renderer.setSize(width, height, false);
  viewer.resize(width, height);
  const aspect = width / Math.max(1, height);
  game.setViewport(aspect);
}

function loop() {
  const now = performance.now();
  let dt = (now - lastTime) / 1000;
  lastTime = now;
  dt = Math.min(dt, 0.1);
  frameCount++;

  if (app.gameActive && game.scene && game.activeCamera) {
    game.update(dt);
    renderer.clear();
    renderer.render(game.scene, game.activeCamera);
  } else {
    viewer.update(dt);
    renderer.clear();
    renderer.render(viewer.scene, viewer.camera);
  }

  requestAnimationFrame(loop);
}

function reveal() {
  if (frameCount > 12) {
    bootScreen.classList.add('hidden');
  }
}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 120));
window.addEventListener('beforeunload', () => {
  game.dispose();
});
canvas.addEventListener('click', () => {
  if (!app.gameActive || input.isTouch) return;
  if (game.paused) return;
  if (!document.pointerLockElement) canvas.requestPointerLock?.();
});
document.addEventListener('pointerlockchange', () => {
  const locked = !!document.pointerLockElement;
  if (app.gameActive && !input.isTouch) {
    menu.hideMenuForGame();
    game.hud?.showPointerHint(!locked);
  }
});

input.setupTouch(document.getElementById('mobile-controls'));
resize();
requestAnimationFrame(loop);
setInterval(reveal, 80);

// Debug handle for automated testing.
window.__vc = { app, game, menu, settings, input };
