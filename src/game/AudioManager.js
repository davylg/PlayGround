/**
 * Tiny procedural audio engine. Everything is synthesised with WebAudio so the
 * game has zero binary audio dependencies and starts instantly on mobile.
 */
export class AudioManager {
  constructor(settings) {
    this.settings = settings;
    this.ctx = null;
    this.master = null;
    this.musicBus = null;
    this.sfxBus = null;
    this.uiBus = null;
    this.musicTimer = null;
    this.musicStep = 0;
    this.mode = 'menu';
    this.started = false;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(this.ctx.destination);

    this.musicBus = this.ctx.createGain();
    this.sfxBus = this.ctx.createGain();
    this.uiBus = this.ctx.createGain();
    this.musicBus.connect(this.master);
    this.sfxBus.connect(this.master);
    this.uiBus.connect(this.master);
    this.applyVolumes();
    this.started = true;
    this.startMusic();
  }

  applyVolumes() {
    if (!this.ctx) return;
    const music = Number(this.settings.get('music') ?? 0.3);
    const sfx = Number(this.settings.get('sfx') ?? 0.7);
    const ui = Number(this.settings.get('ui') ?? 0.5);
    this.musicBus.gain.setTargetAtTime(music * 0.25, this.ctx.currentTime, 0.05);
    this.sfxBus.gain.setTargetAtTime(sfx * 0.55, this.ctx.currentTime, 0.05);
    this.uiBus.gain.setTargetAtTime(ui * 0.35, this.ctx.currentTime, 0.05);
  }

  setMode(mode) {
    this.mode = mode;
    this.musicStep = 0;
    if (mode === 'game' && this.ctx) this.startMusic();
  }

  startMusic() {
    if (!this.ctx || this.musicTimer) return;
    const tempo = this.mode === 'game' ? 0.235 : 0.34;
    this.musicTimer = setInterval(() => this.musicTick(), tempo * 1000);
  }

  stopMusic() {
    if (this.musicTimer) clearInterval(this.musicTimer);
    this.musicTimer = null;
  }

  musicTick() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;
    const step = this.musicStep;
    this.musicStep = (step + 1) % 16;
    const game = this.mode === 'game';
    const root = game ? 55 : 43.65;
    const scale = game ? [1, 1, 1.5, 1.2, 1, 1.5, 1.78, 1.2] : [1, 1.2, 1.5, 1.78, 1.5, 1.2, 1, 1.5];

    // Sparse bass pulse.
    if (step % 2 === 0) {
      const freq = root * scale[(step / 2) % scale.length] * (game && step % 8 === 4 ? 2 : 1);
      this.tone(freq, t, game ? 0.25 : 0.5, game ? 0.16 : 0.08, 'sawtooth', this.musicBus, 120);
    }

    // Glassy arpeggio.
    if (step % 4 === 2 || (!game && step % 8 === 6)) {
      const freq = root * (game ? 6 : 8) * scale[step % scale.length];
      this.tone(freq, t, 0.2, 0.018, 'triangle', this.musicBus, 1600);
    }

    // Percussion in game mode.
    if (game && (step === 0 || step === 8)) this.noise(0.13, 0.12, t, 90);
    if (game && step % 2 === 1) this.noise(0.035, 0.025, t, 7000);
  }

  tone(freq, when, duration, gain, type = 'sine', destination = this.sfxBus, lowpass = 0) {
    if (!this.ctx || !destination) return;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), when);
    env.gain.setValueAtTime(0.0001, when);
    env.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), when + 0.006);
    env.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    if (lowpass) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = lowpass;
      osc.connect(filter);
      filter.connect(env);
    } else {
      osc.connect(env);
    }
    env.connect(destination);
    osc.start(when);
    osc.stop(when + duration + 0.03);
  }

  noise(duration, gain, when = this.ctx?.currentTime, cutoff = 2000) {
    if (!this.ctx || !this.sfxBus) return;
    const length = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = cutoff > 4000 ? 'highpass' : 'lowpass';
    filter.frequency.value = cutoff;
    const env = this.ctx.createGain();
    env.gain.setValueAtTime(gain, when);
    env.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    src.connect(filter);
    filter.connect(env);
    env.connect(this.sfxBus);
    src.start(when);
  }

  sfx(name, pan = 0) {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const t = this.ctx.currentTime;
    switch (name) {
      case 'ui':
        this.tone(520, t, 0.055, 0.035, 'triangle', this.uiBus);
        this.tone(880, t + 0.035, 0.09, 0.02, 'sine', this.uiBus);
        break;
      case 'uiBack':
        this.tone(440, t, 0.08, 0.028, 'triangle', this.uiBus);
        this.tone(280, t + 0.04, 0.1, 0.018, 'sine', this.uiBus);
        break;
      case 'pistol':
        this.noise(0.11, 0.42, t, 2400);
        this.tone(120, t, 0.1, 0.17, 'square', this.sfxBus, 500);
        break;
      case 'rifle':
        this.noise(0.07, 0.28, t, 3200);
        this.tone(90, t, 0.075, 0.12, 'square', this.sfxBus, 420);
        break;
      case 'shotgun':
        this.noise(0.22, 0.62, t, 1800);
        this.tone(68, t, 0.24, 0.28, 'sawtooth', this.sfxBus, 300);
        break;
      case 'sniper':
        this.noise(0.32, 0.58, t, 1600);
        this.tone(58, t, 0.35, 0.3, 'sawtooth', this.sfxBus, 260);
        break;
      case 'hit':
        this.tone(1450, t, 0.045, 0.035, 'square', this.sfxBus, 3000);
        break;
      case 'headshot':
        this.tone(1850, t, 0.11, 0.055, 'triangle', this.sfxBus, 4500);
        this.tone(900, t + 0.04, 0.09, 0.03, 'sine', this.sfxBus);
        break;
      case 'hurt':
        this.noise(0.16, 0.2, t, 500);
        this.tone(82, t, 0.18, 0.08, 'sawtooth', this.sfxBus, 200);
        break;
      case 'reload':
        this.noise(0.045, 0.16, t, 5200);
        this.noise(0.06, 0.18, t + 0.22, 4200);
        this.noise(0.05, 0.12, t + 0.9, 2200);
        break;
      case 'empty':
        this.noise(0.035, 0.1, t, 3200);
        break;
      case 'step':
        this.noise(0.045, 0.07, t, 480);
        break;
      case 'jump':
        this.tone(170, t, 0.12, 0.02, 'sine', this.sfxBus);
        break;
      case 'ability':
        this.tone(240, t, 0.3, 0.1, 'sawtooth', this.sfxBus, 1800);
        this.tone(480, t + 0.04, 0.3, 0.07, 'triangle', this.sfxBus, 2800);
        break;
      case 'special':
        this.tone(110, t, 0.75, 0.14, 'sawtooth', this.sfxBus, 900);
        this.tone(330, t + 0.08, 0.65, 0.08, 'triangle', this.sfxBus, 2400);
        this.noise(0.6, 0.13, t, 2500);
        break;
      case 'beep':
        this.tone(1160, t, 0.07, 0.055, 'square', this.sfxBus, 2800);
        break;
      case 'plant':
        this.tone(440, t, 0.18, 0.08, 'square', this.sfxBus, 1200);
        this.tone(660, t + 0.2, 0.26, 0.07, 'square', this.sfxBus, 1800);
        break;
      case 'defuse':
        this.tone(520, t, 0.4, 0.04, 'sine', this.sfxBus);
        break;
      case 'explosion':
        this.noise(1.3, 0.72, t, 450);
        this.tone(48, t, 1.4, 0.34, 'sawtooth', this.sfxBus, 180);
        this.tone(90, t + 0.12, 0.8, 0.14, 'square', this.sfxBus, 400);
        break;
      case 'roundStart':
        this.tone(330, t, 0.25, 0.08, 'triangle', this.sfxBus);
        this.tone(495, t + 0.18, 0.35, 0.07, 'triangle', this.sfxBus);
        break;
      case 'victory':
        [330, 440, 554, 660].forEach((f, i) => this.tone(f, t + i * 0.12, 0.8, 0.07, 'triangle', this.sfxBus));
        break;
      case 'defeat':
        [330, 294, 247, 196].forEach((f, i) => this.tone(f, t + i * 0.15, 0.7, 0.06, 'sawtooth', this.sfxBus, 900));
        break;
      default:
        break;
    }
  }

  ui(name = 'ui') {
    this.sfx(name);
  }
}
