import "./style.css";
import { SkyhookGame } from "./game.js";
import { AudioEngine } from "./audio.js";

const $ = (id) => document.getElementById(id);

const dom = {
  canvas: $("game-canvas"),
  title: $("title-screen"),
  gameover: $("gameover-screen"),
  pause: $("pause-screen"),
  gameUI: $("game-ui"),
  play: $("play-button"),
  retry: $("retry-button"),
  home: $("home-button"),
  resume: $("resume-button"),
  restart: $("restart-button"),
  pauseButton: $("pause-button"),
  soundButton: $("sound-button"),
  score: $("score"),
  best: $("best-score"),
  titleBest: $("title-best"),
  finalScore: $("final-score"),
  finalHooks: $("final-hooks"),
  finalBest: $("final-best"),
  newBest: $("new-best"),
  resultLine: $("result-line"),
  resultTip: $("result-tip"),
  hookFill: $("hook-fill"),
  hookMeter: $("hook-meter"),
  hookHint: $("hook-hint"),
  combo: $("combo"),
  toast: $("toast"),
  impact: $("impact-flash"),
};

const audio = new AudioEngine();
let best = loadBest();
let resultTimer = 0;
let toastTimer = 0;
let comboReset = 0;
let currentMode = "title";
let hasPlayed = false;
let pendingResult = null;

const callbacks = {
  onFlap: () => audio.flap(),
  onGrapple: () => {
    audio.fire();
    audio.attach();
    vibrate(18);
  },
  onRelease: (gate, reason) => {
    audio.release();
    if (reason === "near") vibrate(12);
  },
  onScore: (score, perfect, streak, gate) => {
    updateScore(score, perfect);
    if (perfect) {
      audio.perfect();
      showCombo(streak > 1 ? `PERFECT ×${streak}` : "PERFECT +2", true);
      vibrate([10, 20, 16]);
      if (gate) celebrateGate();
    } else {
      audio.score();
      vibrate(8);
    }
  },
  onHook: (count) => {
    if (count === 0) return;
  },
  onDeath: (score, hooks) => {
    currentMode = "dead";
    audio.hit();
    vibrate([60, 40, 100]);
    hideHookHint();
    dom.combo.classList.remove("is-showing");
    const previousBest = best;
    if (score > best) best = score;
    saveBest(best);
    pendingResult = { score, hooks, previousBest, isNewBest: score > previousBest && score > 0 };
    resultTimer = window.setTimeout(showGameOver, 900);
  },
  onEnergy: (energy, maxEnergy) => {
    const percent = Math.max(0, Math.min(100, (energy / maxEnergy) * 100));
    dom.hookFill.style.width = `${percent.toFixed(1)}%`;
    dom.hookMeter.classList.toggle("is-empty", percent < 16);
  },
  onLowEnergy: () => {
    audio.lowEnergy();
    showToast("HOOK CHARGE LOW · LET IT RECHARGE", 1900);
  },
  onFx: ({ flash }) => {
    dom.impact.style.opacity = String(Math.min(0.75, flash * 0.7));
  },
  onStart: () => {
    currentMode = "playing";
    hasPlayed = true;
  },
};

let game;
try {
  game = new SkyhookGame(dom.canvas, callbacks);
} catch (error) {
  console.error(error);
  showFatalError();
}

function loadBest() {
  try {
    return Math.max(0, Number.parseInt(localStorage.getItem("skyhook-best") || "0", 10) || 0);
  } catch {
    return 0;
  }
}

function saveBest(value) {
  try {
    localStorage.setItem("skyhook-best", String(value));
  } catch {
    /* storage can be unavailable in private browsing */
  }
}

function vibrate(pattern) {
  if (typeof navigator.vibrate === "function") navigator.vibrate(pattern);
}

function padScore(value) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function syncBest() {
  dom.best.textContent = padScore(Math.max(best, game?.score || 0));
  dom.titleBest.textContent = padScore(best);
}

function setScreen(element, visible) {
  element.classList.toggle("is-hidden", !visible);
  element.setAttribute("aria-hidden", String(!visible));
}

function clearOverlays() {
  window.clearTimeout(resultTimer);
  resultTimer = 0;
  setScreen(dom.title, false);
  setScreen(dom.gameover, false);
  setScreen(dom.pause, false);
  dom.gameUI.classList.add("is-visible");
  dom.gameUI.setAttribute("aria-hidden", "false");
}

function startGame() {
  if (!game) return;
  audio.markInteraction();
  audio.startAmbient();
  audio.ui();
  window.clearTimeout(resultTimer);
  setScreen(dom.title, false);
  setScreen(dom.gameover, false);
  setScreen(dom.pause, false);
  dom.gameUI.classList.add("is-visible");
  dom.gameUI.setAttribute("aria-hidden", "false");
  dom.hookHint.classList.remove("is-visible");
  dom.combo.classList.remove("is-showing");
  dom.score.textContent = "0";
  pendingResult = null;
  game.startRun();
  currentMode = "playing";
  syncBest();
  window.setTimeout(() => {
    if (currentMode === "playing") showToast("HOLD NEAR A GOLD RING TO HOOK THE SKY", 2800);
  }, 700);
}

function showGameOver() {
  if (!pendingResult) return;
  const { score, hooks, isNewBest } = pendingResult;
  dom.finalScore.textContent = String(score);
  dom.finalHooks.textContent = String(hooks);
  dom.finalBest.textContent = String(best);
  dom.newBest.hidden = !isNewBest;
  dom.resultLine.textContent = resultLineFor(score);
  dom.resultTip.textContent = resultTipFor(score, hooks);
  dom.gameUI.classList.remove("is-visible");
  dom.gameUI.setAttribute("aria-hidden", "true");
  setScreen(dom.gameover, true);
  currentMode = "gameover";
  hideHookHint();
  syncBest();
  if (isNewBest) window.setTimeout(() => audio.best(), 260);
  pendingResult = null;
}

function resultLineFor(score) {
  if (score <= 0) return "The sky barely noticed you. Try again.";
  if (score < 4) return "A short and glorious tumble.";
  if (score < 8) return "You found a rhythm in the ruins.";
  if (score < 15) return "The gale knows your name now.";
  if (score < 25) return "A small legend stitched from wind and gold.";
  return "The sky itself is taking notes.";
}

function resultTipFor(score, hooks) {
  if (hooks === 0) return "TIP · HOLD NEAR A GOLDEN RING TO GRAPPLE. IT PULLS YOU THROUGH.";
  if (score < 6) return "TIP · TAP IN A STEADY BEAT. HOLDING FIRES A HOOK WHEN A RING IS IN RANGE.";
  if (score < 12) return "TIP · RELEASE THE HOOK EARLY FOR A HIGHER, FASTER SLINGSHOT.";
  return "TIP · EVERY GRAPPLED GATE IS WORTH TWO. CHASE THE GOLDEN THREAD.";
}

function updateScore(score, perfect) {
  dom.score.textContent = String(score);
  dom.score.classList.remove("pop");
  void dom.score.offsetWidth;
  dom.score.classList.add("pop");
  syncBest();
  if (perfect) {
    dom.score.style.color = "var(--gold)";
    window.setTimeout(() => {
      if (dom.score) dom.score.style.color = "";
    }, 480);
  }
}

function showCombo(text, warm = false) {
  dom.combo.textContent = text;
  dom.combo.classList.remove("is-showing", "is-warm");
  void dom.combo.offsetWidth;
  dom.combo.classList.add("is-showing");
  dom.combo.classList.toggle("is-warm", warm);
  window.clearTimeout(comboReset);
  comboReset = window.setTimeout(() => dom.combo.classList.remove("is-showing", "is-warm"), 1200);
}

function showToast(text, duration = 1800) {
  dom.toast.textContent = text;
  dom.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => dom.toast.classList.remove("is-visible"), duration);
}

function hideHookHint() {
  dom.hookHint.classList.remove("is-visible");
}

function celebrateGate() {
  dom.impact.style.opacity = "0.32";
  window.setTimeout(() => {
    if (currentMode === "playing") dom.impact.style.opacity = "0";
  }, 90);
}

function showFatalError() {
  dom.title.innerHTML = `<div style="margin:auto;max-width:560px;text-align:center;padding:24px"><h1 style="font-family:var(--display);color:var(--orange);font-size:48px;line-height:1">NO SKY<br>FOUND</h1><p style="color:rgba(255,241,215,.65);line-height:1.6">This browser could not start WebGL. Try a current version of Chrome, Safari, or Edge with hardware acceleration enabled.</p></div>`;
}

function updateHud() {
  if (!game) return;
  const state = game.getDisplayState();
  const hint = game.getHookHint();
  if (hint && state.mode === "playing") {
    const margin = 74;
    const x = Math.max(margin, Math.min(window.innerWidth - margin, hint.x));
    const y = Math.max(86, Math.min(window.innerHeight - 100, hint.y - 42));
    dom.hookHint.style.left = `${x}px`;
    dom.hookHint.style.top = `${y}px`;
    dom.hookHint.classList.add("is-visible");
  } else {
    hideHookHint();
  }
  dom.hookMeter.classList.toggle("is-firing", state.attached && state.mode === "playing");
  if (state.mode !== "playing") dom.hookMeter.classList.remove("is-firing");
}

/* ——— Input ——— */

const presses = new Map();
let keyboardPress = false;
let keyboardTimer = 0;

function isInteractiveTarget(target) {
  return Boolean(target?.closest?.("button, a, input, [role='button']"));
}

function beginPress(id) {
  if (!game || game.mode !== "playing") return;
  game.flap();
  const timer = window.setTimeout(() => {
    if (!presses.has(id) || !game || game.mode !== "playing") return;
    const press = presses.get(id);
    press.holding = true;
    game.setHolding(true);
  }, 165);
  presses.set(id, { timer, holding: false });
}

function endPress(id) {
  const press = presses.get(id);
  if (!press) return;
  window.clearTimeout(press.timer);
  presses.delete(id);
  const stillHolding = [...presses.values()].some((item) => item.holding);
  if (!stillHolding) game?.setHolding(false);
}

window.addEventListener(
  "pointerdown",
  (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;
    if (!game || game.mode !== "playing") return;
    event.preventDefault();
    beginPress(`pointer-${event.pointerId}`);
  },
  { passive: false }
);

window.addEventListener("pointerup", (event) => {
  endPress(`pointer-${event.pointerId}`);
});
window.addEventListener("pointercancel", (event) => {
  endPress(`pointer-${event.pointerId}`);
});
window.addEventListener("blur", () => {
  presses.forEach((press) => window.clearTimeout(press.timer));
  presses.clear();
  game?.setHolding(false);
  if (game?.mode === "playing") pauseGame();
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
    if (game?.mode === "title") {
      event.preventDefault();
      startGame();
      return;
    }
    if (game?.mode === "gameover") {
      event.preventDefault();
      retryGame();
      return;
    }
    if (game?.mode !== "playing" || event.repeat) return;
    event.preventDefault();
    if (!keyboardPress) {
      keyboardPress = true;
      game.flap();
      window.clearTimeout(keyboardTimer);
      keyboardTimer = window.setTimeout(() => {
        if (keyboardPress && game?.mode === "playing") game.setHolding(true);
      }, 165);
    }
    return;
  }
  if (event.code === "KeyP" || event.code === "Escape") {
    event.preventDefault();
    if (game?.mode === "playing") pauseGame();
    else if (game?.mode === "paused") resumeGame();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
    if (keyboardPress) {
      keyboardPress = false;
      window.clearTimeout(keyboardTimer);
      game?.setHolding(false);
    }
  }
});

document.addEventListener("gesturestart", (event) => event.preventDefault());

/* ——— UI actions ——— */

dom.play.addEventListener("click", startGame);
dom.retry.addEventListener("click", retryGame);
dom.home.addEventListener("click", goHome);
dom.resume.addEventListener("click", resumeGame);
dom.restart.addEventListener("click", retryGame);
dom.pauseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (game?.mode === "playing") pauseGame();
});
dom.soundButton.addEventListener("click", (event) => {
  event.stopPropagation();
  audio.markInteraction();
  audio.setEnabled(!audio.enabled);
  updateSoundButton();
  if (audio.enabled) audio.ui();
});

function retryGame() {
  if (!game) return;
  window.clearTimeout(resultTimer);
  pendingResult = null;
  setScreen(dom.gameover, false);
  setScreen(dom.pause, false);
  dom.gameUI.classList.add("is-visible");
  dom.gameUI.setAttribute("aria-hidden", "false");
  game.startRun();
  currentMode = "playing";
  syncBest();
  audio.markInteraction();
  audio.ui();
}

function goHome() {
  if (!game) return;
  window.clearTimeout(resultTimer);
  pendingResult = null;
  audio.ui();
  game.goToTitle();
  currentMode = "title";
  setScreen(dom.gameover, false);
  setScreen(dom.pause, false);
  setScreen(dom.title, true);
  dom.gameUI.classList.remove("is-visible");
  dom.gameUI.setAttribute("aria-hidden", "true");
  hideHookHint();
  syncBest();
}

function pauseGame() {
  if (!game || game.mode !== "playing") return;
  game.pause();
  currentMode = "paused";
  game.setHolding(false);
  presses.forEach((press) => window.clearTimeout(press.timer));
  presses.clear();
  keyboardPress = false;
  window.clearTimeout(keyboardTimer);
  setScreen(dom.pause, true);
  hideHookHint();
  audio.ui();
}

function resumeGame() {
  if (!game || game.mode !== "paused") return;
  setScreen(dom.pause, false);
  dom.gameUI.classList.add("is-visible");
  dom.gameUI.setAttribute("aria-hidden", "false");
  game.resume();
  currentMode = "playing";
  audio.markInteraction();
  audio.ui();
}

function updateSoundButton() {
  dom.soundButton.classList.toggle("is-muted", !audio.enabled);
  dom.soundButton.setAttribute("aria-label", audio.enabled ? "Mute sound" : "Unmute sound");
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && game?.mode === "playing") pauseGame();
});

window.addEventListener("resize", () => {
  game?.resize();
});

/* ——— Loop ——— */

let last = performance.now();
let frameCount = 0;

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  if (game) {
    game.update(dt);
    updateHud();
    frameCount += 1;
  }
  requestAnimationFrame(frame);
}

updateSoundButton();
syncBest();
if (dom.hookFill) dom.hookFill.style.width = "100%";
requestAnimationFrame(frame);

window.__SKYHOOK__ = {
  game,
  startGame,
  retryGame,
  goHome,
  pauseGame,
  resumeGame,
  get state() {
    return game?.getDisplayState();
  },
  get best() {
    return best;
  },
  get frames() {
    return frameCount;
  },
};
