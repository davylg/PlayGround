const STORAGE_KEY = "skyhook-sound";

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.ambient = null;
    this.enabled = localStorage.getItem(STORAGE_KEY) !== "off";
    this.started = false;
  }

  markInteraction() {
    this.ensure();
    if (this.ctx?.state === "suspended") this.ctx.resume().catch(() => {});
  }

  ensure() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? 0.52 : 0;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  setEnabled(value) {
    this.enabled = value;
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    if (this.master && this.ctx) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setTargetAtTime(value ? 0.52 : 0, now, 0.04);
    }
    if (value) {
      this.ensure();
      this.ctx?.resume().catch(() => {});
      this.startAmbient();
    }
  }

  startAmbient() {
    if (!this.enabled || this.started) return;
    const ctx = this.ensure();
    if (!ctx) return;
    this.started = true;
    const bus = ctx.createGain();
    bus.gain.value = 0.15;
    bus.connect(this.master);

    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = last * 0.985 + white * 0.015;
      data[i] = last * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 680;
    filter.Q.value = 0.4;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.2;
    noise.connect(filter).connect(noiseGain).connect(bus);
    noise.start();

    const toneGain = ctx.createGain();
    toneGain.gain.value = 0.05;
    toneGain.connect(bus);
    const filter2 = ctx.createBiquadFilter();
    filter2.type = "lowpass";
    filter2.frequency.value = 220;
    filter2.connect(toneGain);

    [55, 82.4, 110].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 2 ? "triangle" : "sine";
      osc.frequency.value = freq;
      osc.detune.value = i * 4;
      const g = ctx.createGain();
      g.gain.value = i === 2 ? 0.18 : 0.4;
      osc.connect(g).connect(filter2);
      osc.start();
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.09;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain).connect(noiseGain.gain);
    lfo.start();

    this.ambient = { bus, noise, filter };
  }

  env(node, attack, decay, peak = 1) {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    node.gain.cancelScheduledValues(now);
    node.gain.setValueAtTime(0.0001, now);
    node.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), now + attack);
    node.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);
  }

  tone({ freq = 440, end = null, type = "sine", attack = 0.005, decay = 0.18, gain = 0.1, detune = 0, delay = 0 }) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx || ctx.state !== "running") return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (end) osc.frequency.exponentialRampToValueAtTime(Math.max(20, end), now + attack + decay);
    osc.detune.value = detune;
    this.env(g, attack, decay, gain);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + attack + decay + 0.03);
  }

  noiseBurst({ duration = 0.2, gain = 0.12, lowpass = 1400, highpass = 80, delay = 0 }) {
    if (!this.enabled) return;
    const ctx = this.ensure();
    if (!ctx || ctx.state !== "running") return;
    const now = ctx.currentTime + delay;
    const length = Math.ceil(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = lowpass;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = highpass;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    src.connect(hp).connect(lp).connect(g).connect(this.master);
    src.start(now);
  }

  flap() {
    this.tone({ freq: 520, end: 180, type: "sine", decay: 0.1, gain: 0.075 });
    this.noiseBurst({ duration: 0.1, gain: 0.035, lowpass: 1800, highpass: 300 });
  }

  fire() {
    this.tone({ freq: 190, end: 980, type: "sawtooth", decay: 0.15, gain: 0.045 });
    this.tone({ freq: 380, end: 1400, type: "sine", decay: 0.12, gain: 0.035 });
  }

  attach() {
    this.tone({ freq: 880, end: 1320, type: "triangle", decay: 0.17, gain: 0.065 });
    this.tone({ freq: 440, type: "sine", decay: 0.24, gain: 0.04 });
  }

  release() {
    this.noiseBurst({ duration: 0.18, gain: 0.06, lowpass: 3000, highpass: 600 });
    this.tone({ freq: 640, end: 320, type: "triangle", decay: 0.12, gain: 0.03 });
  }

  score() {
    this.tone({ freq: 740, type: "triangle", decay: 0.16, gain: 0.045 });
    this.tone({ freq: 1110, type: "sine", decay: 0.24, gain: 0.035, detune: 3 });
  }

  perfect() {
    this.tone({ freq: 880, type: "triangle", decay: 0.14, gain: 0.05 });
    this.tone({ freq: 1320, type: "triangle", decay: 0.22, gain: 0.04, delay: 0.08 });
    this.tone({ freq: 1760, type: "sine", decay: 0.28, gain: 0.025, delay: 0.15 });
  }

  hit() {
    this.noiseBurst({ duration: 0.32, gain: 0.22, lowpass: 1600, highpass: 60 });
    this.tone({ freq: 130, end: 42, type: "sawtooth", decay: 0.4, gain: 0.12 });
  }

  best() {
    [523, 659, 784, 1047].forEach((freq, i) => {
      this.tone({ freq, type: "triangle", decay: 0.35, gain: 0.045, delay: i * 0.1 });
    });
  }

  ui() {
    this.tone({ freq: 660, end: 880, type: "sine", decay: 0.08, gain: 0.04 });
  }

  lowEnergy() {
    this.tone({ freq: 200, end: 120, type: "square", decay: 0.1, gain: 0.02 });
  }
}
