/**
 * Tiny procedural sound engine — no audio assets needed.
 * All sounds are synthesized with WebAudio and only start after a user gesture.
 */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.compressor = null;
    this.noiseBuffer = null;
    this.muted = false;
    try { this.muted = localStorage.getItem('chainblade.muted') === '1'; } catch { /* ignore */ }
  }

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    try {
      this.ctx = new Ctx();
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -16;
      this.compressor.knee.value = 22;
      this.compressor.ratio.value = 5;
      this.compressor.attack.value = 0.003;
      this.compressor.release.value = 0.22;
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.55;
      this.master.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
      this.noiseBuffer = this._makeNoise(1.2);
    } catch {
      this.ctx = null;
    }
  }

  _makeNoise(seconds) {
    const len = Math.floor(this.ctx.sampleRate * seconds);
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = white * 0.7 + last * 2.4;
    }
    return buffer;
  }

  setMuted(muted) {
    this.muted = muted;
    try { localStorage.setItem('chainblade.muted', muted ? '1' : '0'); } catch { /* ignore */ }
    if (this.master && this.ctx) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setTargetAtTime(muted ? 0 : 0.55, t, 0.03);
    }
  }

  toggleMuted() {
    this.setMuted(!this.muted);
    if (!this.muted) this.ensure();
    return this.muted;
  }

  _now() { return this.ctx ? this.ctx.currentTime : 0; }

  _tone(type, f0, f1, dur, gain = 0.08, when = 0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, f0), t);
    if (f1 !== f0) osc.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  _noise(filterType, f0, f1, dur, gain = 0.12, q = 1, when = 0) {
    if (!this.ctx || this.muted || !this.noiseBuffer) return;
    const t = this.ctx.currentTime + when;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = filterType;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(Math.max(30, f0), t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t, Math.random() * 0.6);
    src.stop(t + dur + 0.03);
  }

  ui() {
    this.ensure();
    this._tone('sine', 720, 980, 0.09, 0.035);
  }

  slice(chain = 0, golden = false) {
    this.ensure();
    if (!this.ctx) return;
    const p = 1 + Math.min(chain, 18) * 0.025;
    this._noise('bandpass', 2600 * p, 700, 0.14, 0.1, 1.1);
    this._tone('triangle', 1900 * p, 950, 0.11, 0.055);
    this._noise('lowpass', 600, 220, 0.16, 0.07, 0.8, 0.004);
    if (golden) {
      this._tone('sine', 1180, 1760, 0.28, 0.06, 0.02);
      this._tone('sine', 1770, 2350, 0.34, 0.045, 0.06);
    }
  }

  chainUp(step = 0) {
    this.ensure();
    const pent = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
    const note = pent[Math.min(step, pent.length - 1)];
    const freq = 392 * Math.pow(2, note / 12);
    this._tone('sine', freq, freq, 0.3, 0.055);
    this._tone('triangle', freq * 2, freq * 2, 0.22, 0.024, 0.02);
  }

  bomb() {
    this.ensure();
    this._noise('lowpass', 1600, 90, 0.55, 0.42, 0.7);
    this._noise('highpass', 3000, 700, 0.22, 0.15, 0.6, 0.01);
    this._tone('sine', 110, 28, 0.6, 0.32);
    this._tone('sawtooth', 70, 200, 0.14, 0.08);
  }

  miss() {
    this.ensure();
    this._tone('triangle', 220, 130, 0.2, 0.06);
    this._tone('sine', 110, 70, 0.34, 0.09, 0.02);
  }

  heart() {
    this.ensure();
    this._tone('sine', 523, 784, 0.3, 0.06);
    this._tone('sine', 784, 1047, 0.4, 0.05, 0.08);
  }

  frenzy() {
    this.ensure();
    [523, 659, 784, 1047, 1319].forEach((f, i) => this._tone('triangle', f, f, 0.36, 0.05, i * 0.055));
  }

  gameOver() {
    this.ensure();
    [392, 349, 311, 262].forEach((f, i) => this._tone('triangle', f, f, 0.5, 0.055, i * 0.16));
    this._tone('sine', 131, 98, 1.4, 0.07, 0.5);
  }

  start() {
    this.ensure();
    [262, 392, 523].forEach((f, i) => this._tone('sine', f, f * 1.01, 0.4, 0.045, i * 0.07));
  }
}
