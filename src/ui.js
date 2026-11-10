const TIERS = [
  { name: 'TEMPERED BLADE', next: 'CHAIN 5 TO GILD', color: '#8beaff', glow: 'rgba(139,234,255,0.55)' },
  { name: 'GILDED EDGE', next: 'CHAIN 10 TO STORM', color: '#ffd583', glow: 'rgba(255,213,131,0.55)' },
  { name: 'STORMBOUND BLADE', next: 'CHAIN 17 TO MYTH', color: '#ff8bd0', glow: 'rgba(255,139,208,0.55)' },
  { name: 'MYTHIC EDGE', next: 'MAXIMUM RADIANCE', color: '#e8f7ff', glow: 'rgba(232,247,255,0.65)' },
];
export { TIERS };

export class UI {
  constructor(handlers) {
    this.h = handlers;
    this.el = {
      hud: document.getElementById('hud'),
      score: document.getElementById('score'),
      hudBest: document.getElementById('hud-best'),
      chainBadge: document.getElementById('chain-badge'),
      chainRing: document.getElementById('chain-ring'),
      chainValue: document.getElementById('chain-value'),
      chainMult: document.getElementById('chain-mult'),
      lives: document.getElementById('lives'),
      calloutLayer: document.getElementById('callout-layer'),
      bladeStatus: document.getElementById('blade-status'),
      bladeTier: document.getElementById('blade-tier'),
      bladeNext: document.getElementById('blade-next'),
      bladeBar: document.getElementById('blade-bar'),
      tutorial: document.getElementById('tutorial-hint'),
      startScreen: document.getElementById('start-screen'),
      startBest: document.getElementById('start-best'),
      gameover: document.getElementById('gameover-screen'),
      pause: document.getElementById('pause-screen'),
      finalScore: document.getElementById('final-score'),
      statFruit: document.getElementById('stat-fruit'),
      statChain: document.getElementById('stat-chain'),
      statTime: document.getElementById('stat-time'),
      resultBest: document.getElementById('result-best'),
      recordBadge: document.getElementById('record-badge'),
      resultKicker: document.getElementById('result-kicker'),
      resultTitle: document.getElementById('result-title'),
      flash: document.getElementById('flash'),
      hurt: document.getElementById('hurt'),
      muteBtn: document.getElementById('mute-btn'),
      startMute: document.getElementById('start-mute-btn'),
      pauseBtn: document.getElementById('pause-btn'),
    };
    this.hearts = [...this.el.lives.querySelectorAll('.heart')];
    this.lastScore = 0;
    this.heartCount = 3;
    this.tierIndex = -1;

    document.getElementById('play-btn').addEventListener('click', () => this.h.play());
    document.getElementById('retry-btn').addEventListener('click', () => this.h.retry());
    document.getElementById('menu-btn').addEventListener('click', () => this.h.menu());
    document.getElementById('resume-btn').addEventListener('click', () => this.h.resume());
    document.getElementById('quit-btn').addEventListener('click', () => this.h.quit());
    document.getElementById('pause-btn').addEventListener('click', () => this.h.pause());
    document.getElementById('mute-btn').addEventListener('click', () => this.h.mute());
    document.getElementById('start-mute-btn').addEventListener('click', () => this.h.mute());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') this.h.mute();
    });
  }

  setMuted(muted) {
    document.body.classList.toggle('is-muted', muted);
    if (this.el.muteBtn) this.el.muteBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
    if (this.el.startMute) {
      const label = this.el.startMute.querySelector('.mute-label');
      if (label) label.textContent = muted ? 'SOUND OFF' : 'SOUND ON';
    }
  }

  setBest(best) {
    this.el.startBest.textContent = best.toLocaleString();
    this.el.hudBest.textContent = best.toLocaleString();
    this.el.resultBest.textContent = best.toLocaleString();
  }

  setScore(value) {
    if (value === this.lastScore) return;
    this.lastScore = value;
    this.el.score.textContent = value.toLocaleString();
    this.el.score.animate(
      [{ transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
      { duration: 160, easing: 'cubic-bezier(0.2,1.4,0.4,1)' },
    );
  }

  updateChainTimer(pct) {
    this.el.chainRing.style.setProperty('--p', `${Math.max(0, Math.min(100, pct * 100))}%`);
  }

  setChain(chain, mult, pct, tier) {
    this.el.chainValue.textContent = chain;
    this.el.chainMult.innerHTML = `&times;${mult.toFixed(1)}`;
    this.el.chainRing.style.setProperty('--p', `${Math.max(0, Math.min(100, pct * 100))}%`);
    if (tier) {
      this.el.chainBadge.style.setProperty('--tier', tier.color);
      this.el.chainBadge.style.setProperty('--tier-soft', tier.glow);
      this.el.chainRing.style.setProperty('--tier', tier.color);
      this.el.chainRing.style.setProperty('--tier-soft', tier.glow);
      this.el.bladeStatus.style.setProperty('--tier', tier.color);
    }
    if (chain > 0) {
      this.el.chainBadge.classList.remove('bump');
      void this.el.chainBadge.offsetWidth;
      this.el.chainBadge.classList.add('bump');
      setTimeout(() => this.el.chainBadge.classList.remove('bump'), 160);
    }
  }

  setTier(index) {
    if (index === this.tierIndex) return;
    const changed = this.tierIndex !== -1;
    this.tierIndex = index;
    const tier = TIERS[index];
    this.el.bladeTier.textContent = tier.name;
    this.el.bladeNext.textContent = tier.next;
    this.el.bladeStatus.classList.toggle('awake', index >= 2);
    if (changed) {
      this.el.chainBadge.classList.remove('tier-up');
      void this.el.chainBadge.offsetWidth;
      this.el.chainBadge.classList.add('tier-up');
    }
  }

  setBladeProgress(pct) {
    this.el.bladeBar.style.width = `${Math.max(0, Math.min(1, pct)) * 100}%`;
  }

  setLives(lives, animateLoss = false) {
    this.hearts.forEach((heart, i) => {
      const lost = i >= lives;
      heart.classList.toggle('lost', lost);
      if (!lost && this.heartCount !== lives) {
        heart.classList.remove('pulse');
        void heart.offsetWidth;
        heart.classList.add('pulse');
      }
    });
    if (animateLoss) {
      const heart = this.hearts[Math.max(0, lives)];
      if (heart) {
        heart.classList.remove('pulse');
        void heart.offsetWidth;
        heart.classList.add('pulse');
      }
    }
    this.el.lives.setAttribute('aria-label', `${lives} ${lives === 1 ? 'life' : 'lives'} remaining`);
    this.heartCount = lives;
  }

  callout(text, kind = '', sub = '') {
    const layer = this.el.calloutLayer;
    layer.querySelectorAll('.callout').forEach((n) => n.remove());
    const node = document.createElement('div');
    node.className = `callout ${kind}`;
    node.textContent = text;
    if (sub) {
      const s = document.createElement('span');
      s.className = 'sub';
      s.textContent = sub;
      node.appendChild(s);
    }
    layer.appendChild(node);
    setTimeout(() => node.remove(), 1200);
  }

  popScore(value) {
    // reserved for floating DOM score accents (in-world popups handle the rest)
  }

  showStart(show) {
    this.el.startScreen.classList.toggle('is-hidden', !show);
  }

  showHUD(show) {
    this.el.hud.classList.toggle('is-hidden', !show);
  }

  showPause(show) {
    this.el.pause.classList.toggle('is-hidden', !show);
  }

  showGameOver(stats) {
    this.el.finalScore.textContent = stats.score.toLocaleString();
    this.el.statFruit.textContent = stats.fruit;
    this.el.statChain.textContent = stats.bestChain;
    this.el.statTime.textContent = stats.time;
    this.el.resultBest.textContent = stats.best.toLocaleString();
    this.el.recordBadge.classList.toggle('is-hidden', !stats.newRecord);
    this.el.resultKicker.textContent = stats.newRecord ? 'A NEW LEGEND' : 'RUN COMPLETE';
    this.el.resultTitle.textContent = stats.newRecord ? 'NIGHT CONQUERED' : 'CHAIN BROKEN';
    this.el.gameover.classList.remove('is-hidden');
  }

  hideGameOver() {
    this.el.gameover.classList.add('is-hidden');
  }

  showHint(show) {
    this.el.tutorial.classList.toggle('hide', !show);
  }

  flash(kind) {
    const el = this.el.flash;
    el.classList.remove('is-bomb', 'is-gold');
    void el.offsetWidth;
    el.classList.add(kind === 'gold' ? 'is-gold' : 'is-bomb');
  }

  hurt() {
    const el = this.el.hurt;
    el.classList.remove('is-hit');
    void el.offsetWidth;
    el.classList.add('is-hit');
  }

  reset() {
    this.lastScore = -1;
    this.setScore(0);
    this.setLives(3);
    this.setChain(0, 1, 0, TIERS[0]);
    this.setTier(0);
    this.setBladeProgress(0);
    this.el.chainValue.textContent = '0';
    this.updateChainTimer(0);
    this.el.calloutLayer.querySelectorAll('.callout').forEach((n) => n.remove());
  }

  timeString(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}
