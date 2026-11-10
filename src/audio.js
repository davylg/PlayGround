export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.volume = 1;
    this.ambient = null;
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
    this.master.connect(this.ctx.destination);
    this.startAmbient();
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.setTargetAtTime(muted ? 0 : 0.42 * (this.volume ?? 1), this.ctx.currentTime, 0.05);
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : 0.42 * this.volume, this.ctx.currentTime, 0.05);
  }

  startAmbient() {
    if (!this.ctx || this.ambient) return;
    const g = this.ctx.createGain();
    g.gain.value = 0.018;
    g.connect(this.master);
    const o1 = this.ctx.createOscillator();
    o1.type = 'sine'; o1.frequency.value = 48;
    const o2 = this.ctx.createOscillator();
    o2.type = 'triangle'; o2.frequency.value = 72.3;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 160;
    o1.connect(f); o2.connect(f); f.connect(g);
    o1.start(); o2.start();
    this.ambient = { g, o1, o2 };
  }

  env(gain, t0, attack, dur, vol) {
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  }

  tone(freq, dur = 0.12, type = 'sine', vol = 0.2, slide = null, delay = 0) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t0 + dur);
    this.env(g, t0, 0.005, dur, vol);
    o.connect(g); g.connect(this.master);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }

  noise(dur = 0.12, vol = 0.2, cutoff = 1200, type = 'lowpass', delay = 0) {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + delay;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = type; f.frequency.value = cutoff;
    const g = this.ctx.createGain();
    this.env(g, t0, 0.003, dur, vol);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t0);
  }

  shoot(type = 'Rifle', distant = false) {
    if (!this.ctx) return;
    const map = {
      Sidearm: [0.08, 900, 0.18], SMG: [0.07, 1250, 0.2], Shotgun: [0.2, 500, 0.35],
      Marksman: [0.15, 780, 0.28], Rifle: [0.1, 950, 0.25], LMG: [0.12, 620, 0.3], Sniper: [0.35, 380, 0.5]
    };
    const [dur, cutoff, vol] = map[type] || map.Rifle;
    const v = distant ? vol * 0.24 : vol;
    this.noise(dur, v, cutoff, 'lowpass');
    this.tone(type === 'Sniper' ? 92 : 120, dur * 1.2, 'triangle', v * 0.55, 44);
    if (type === 'Shotgun') this.noise(0.24, v * 0.7, 280, 'lowpass');
  }

  reload() {
    this.tone(240, 0.05, 'square', 0.04);
    this.noise(0.05, 0.08, 2400, 'highpass', 0.16);
    this.tone(170, 0.06, 'square', 0.05, 130, 0.42);
  }

  hit(head = false) {
    this.tone(head ? 1800 : 1050, 0.045, 'square', head ? 0.13 : 0.08, head ? 700 : 800);
    if (head) this.tone(2400, 0.08, 'sine', 0.08, 1600, 0.02);
  }

  hurt() {
    this.noise(0.15, 0.18, 340, 'lowpass');
    this.tone(75, 0.18, 'sine', 0.16, 40);
  }

  step() {
    this.noise(0.045, 0.025, 280, 'lowpass');
  }

  ui() {
    this.tone(620, 0.035, 'square', 0.035, 900);
  }

  buy() {
    this.tone(440, 0.06, 'sine', 0.06);
    this.tone(660, 0.09, 'sine', 0.055, 880, 0.06);
  }

  error() {
    this.tone(160, 0.09, 'square', 0.06, 110);
  }

  plantTick() {
    this.tone(1280, 0.045, 'square', 0.05, 1000);
  }

  defuseTick() {
    this.tone(760, 0.04, 'sine', 0.03, 900);
  }

  bombPlanted() {
    this.tone(140, 0.3, 'sawtooth', 0.08, 60);
    this.tone(880, 0.12, 'square', 0.06, 440, 0.1);
  }

  explosion() {
    this.noise(1.5, 0.55, 280, 'lowpass');
    this.tone(62, 1.4, 'sine', 0.4, 28);
    this.tone(120, 0.6, 'sawtooth', 0.18, 34);
  }

  roundStart() {
    [392, 523, 659].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.07, f, i * 0.09));
  }

  win() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.24, 'triangle', 0.1, f, i * 0.1));
  }

  lose() {
    [392, 330, 262].forEach((f, i) => this.tone(f, 0.28, 'triangle', 0.09, f * 0.9, i * 0.13));
  }

  ability(type) {
    if (type === 'flash') {
      this.tone(1600, 0.35, 'sine', 0.16, 4200);
      this.noise(0.2, 0.1, 3000, 'highpass');
    } else if (type === 'smoke') {
      this.noise(0.8, 0.16, 600, 'lowpass');
    } else if (type === 'fire') {
      this.noise(0.9, 0.18, 700, 'lowpass');
      this.tone(90, 0.6, 'sawtooth', 0.08, 50);
    } else if (type === 'emp') {
      this.tone(220, 0.4, 'sawtooth', 0.12, 60);
      this.noise(0.3, 0.1, 2400, 'highpass');
    } else {
      this.tone(700, 0.18, 'sine', 0.07, 1400);
      this.noise(0.2, 0.08, 1800, 'bandpass');
    }
  }

  announce() {
    this.tone(520, 0.06, 'sine', 0.05, 620);
  }
}

export const sound = new SoundEngine();
