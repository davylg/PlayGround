export class AudioManager {
  constructor(settings) {
    this.settings = settings;
    this.context = null;
    this.ready = false;
    this.musicNodes = [];
  }

  ensureContext() {
    if (this.ready) return this.context;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    this.context = new AudioContextClass();
    this.master = this.context.createGain();
    this.sfxGain = this.context.createGain();
    this.musicGain = this.context.createGain();
    this.sfxGain.connect(this.master);
    this.musicGain.connect(this.master);
    this.master.connect(this.context.destination);
    this.applyVolumes();
    this.ready = true;
    return this.context;
  }

  applyVolumes() {
    if (!this.ready) return;
    this.master.gain.value = this.settings.get('masterVolume');
    this.sfxGain.gain.value = this.settings.get('sfxVolume');
    this.musicGain.gain.value = this.settings.get('musicVolume') * 0.55;
  }

  resume() {
    const context = this.ensureContext();
    if (context && context.state === 'suspended') context.resume();
  }

  playTone({ frequency = 220, duration = 0.18, type = 'sine', gain = 0.2, sweep = null, delay = 0, destination = 'sfx' }) {
    const context = this.ensureContext();
    if (!context) return;
    const start = context.currentTime + delay;
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    if (sweep) {
      if (Array.isArray(sweep)) osc.frequency.exponentialRampToValueAtTime(Math.max(10, sweep[1]), start + duration);
      else osc.frequency.exponentialRampToValueAtTime(Math.max(10, sweep), start + duration);
    }
    gainNode.gain.setValueAtTime(0.0001, start);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.001, gain), start + Math.min(duration * 0.2, 0.03));
    gainNode.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gainNode).connect(destination === 'music' ? this.musicGain : this.sfxGain);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }

  playNoise({ duration = 0.16, gain = 0.18, filter = 600, sweep = null, delay = 0 }) {
    const context = this.ensureContext();
    if (!context) return;
    const sampleCount = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < sampleCount; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / sampleCount);
    const source = context.createBufferSource();
    source.buffer = buffer;
    const filterNode = context.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(filter, context.currentTime + delay);
    if (sweep) filterNode.frequency.exponentialRampToValueAtTime(Math.max(50, sweep), context.currentTime + delay + duration);
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(gain, context.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + duration);
    source.connect(filterNode).connect(gainNode).connect(this.sfxGain);
    source.start(context.currentTime + delay);
  }

  ui(kind = 'click') {
    this.resume();
    if (kind === 'click') this.playTone({ frequency: 720, duration: 0.06, type: 'triangle', gain: 0.05 });
    if (kind === 'confirm') {
      this.playTone({ frequency: 540, duration: 0.08, type: 'triangle', gain: 0.07 });
      this.playTone({ frequency: 780, duration: 0.1, type: 'triangle', gain: 0.06, delay: 0.07 });
    }
    if (kind === 'back') this.playTone({ frequency: 430, duration: 0.09, type: 'triangle', gain: 0.05 });
    if (kind === 'error') this.playTone({ frequency: 220, duration: 0.14, type: 'sawtooth', gain: 0.07, sweep: 90 });
    if (kind === 'deploy') this.playTone({ frequency: 300, duration: 0.32, type: 'sawtooth', gain: 0.09, sweep: [300, 90] });
  }

  shot(kind = 'rifle', distance = 0) {
    const falloff = Math.max(0.28, 1 - distance / 70);
    if (kind === 'pistol') {
      this.playNoise({ duration: 0.08, gain: 0.15 * falloff, filter: 1900, sweep: 500 });
      this.playTone({ frequency: 230, duration: 0.05, type: 'square', gain: 0.05 * falloff, sweep: 110 });
    } else if (kind === 'smg') {
      this.playNoise({ duration: 0.06, gain: 0.11 * falloff, filter: 2400, sweep: 700 });
      this.playTone({ frequency: 190, duration: 0.04, type: 'square', gain: 0.045 * falloff, sweep: 90 });
    } else if (kind === 'shotgun') {
      this.playNoise({ duration: 0.18, gain: 0.24 * falloff, filter: 1200, sweep: 260 });
      this.playTone({ frequency: 130, duration: 0.14, type: 'sawtooth', gain: 0.08 * falloff, sweep: 55 });
    } else if (kind === 'sniper') {
      this.playNoise({ duration: 0.2, gain: 0.25 * falloff, filter: 1600, sweep: 320 });
      this.playTone({ frequency: 175, duration: 0.18, type: 'sawtooth', gain: 0.1 * falloff, sweep: 55 });
    } else {
      this.playNoise({ duration: 0.09, gain: 0.16 * falloff, filter: 2200, sweep: 520 });
      this.playTone({ frequency: 215, duration: 0.06, type: 'square', gain: 0.06 * falloff, sweep: 85 });
    }
  }

  impact() {
    this.playNoise({ duration: 0.05, gain: 0.07, filter: 900 });
  }

  hit() {
    this.playTone({ frequency: 900, duration: 0.045, type: 'square', gain: 0.08, sweep: 500 });
  }

  kill() {
    this.playTone({ frequency: 640, duration: 0.08, type: 'triangle', gain: 0.08 });
    this.playTone({ frequency: 940, duration: 0.1, type: 'triangle', gain: 0.07, delay: 0.07 });
  }

  reload() {
    this.playTone({ frequency: 420, duration: 0.07, type: 'square', gain: 0.06 });
    this.playTone({ frequency: 300, duration: 0.08, type: 'square', gain: 0.05, delay: 0.16 });
    this.playTone({ frequency: 620, duration: 0.07, type: 'square', gain: 0.07, delay: 0.35 });
  }

  jump() {
    this.playTone({ frequency: 300, duration: 0.1, type: 'sine', gain: 0.045, sweep: 520 });
  }

  footstep(distance = 0) {
    const gain = Math.max(0.02, 0.07 - distance / 400);
    this.playNoise({ duration: 0.06, gain, filter: 420, sweep: 190 });
  }

  ability(kind = 'normal') {
    if (kind === 'special') {
      this.playTone({ frequency: 320, duration: 0.3, type: 'sawtooth', gain: 0.12, sweep: [320, 110] });
      this.playNoise({ duration: 0.25, gain: 0.11, filter: 1500, sweep: 320 });
    } else {
      this.playTone({ frequency: 480, duration: 0.13, type: 'triangle', gain: 0.09, sweep: [480, 190] });
      this.playNoise({ duration: 0.12, gain: 0.06, filter: 1000 });
    }
  }

  bombBeep(rate = 1) {
    this.playTone({ frequency: 900, duration: 0.06, type: 'square', gain: 0.09 });
    if (rate > 1.4) this.playTone({ frequency: 1150, duration: 0.05, type: 'square', gain: 0.07, delay: 0.08 });
  }

  plant() {
    this.playTone({ frequency: 420, duration: 0.12, type: 'triangle', gain: 0.08 });
    this.playTone({ frequency: 660, duration: 0.16, type: 'triangle', gain: 0.07, delay: 0.1 });
  }

  defuse() {
    this.playTone({ frequency: 560, duration: 0.16, type: 'triangle', gain: 0.08 });
    this.playTone({ frequency: 760, duration: 0.22, type: 'triangle', gain: 0.07, delay: 0.12 });
  }

  explosion() {
    this.playNoise({ duration: 0.55, gain: 0.4, filter: 1600, sweep: 70 });
    this.playTone({ frequency: 80, duration: 0.65, type: 'sawtooth', gain: 0.16, sweep: 30 });
    this.playNoise({ duration: 0.8, gain: 0.2, filter: 500, sweep: 60, delay: 0.07 });
  }

  roundStart() {
    this.playTone({ frequency: 420, duration: 0.15, type: 'triangle', gain: 0.1 });
    this.playTone({ frequency: 640, duration: 0.2, type: 'triangle', gain: 0.09, delay: 0.16 });
  }

  victory() {
    const notes = [520, 660, 790, 1050];
    notes.forEach((frequency, index) => this.playTone({ frequency, duration: 0.3, type: 'triangle', gain: 0.12, delay: index * 0.13 }));
  }

  defeat() {
    const notes = [380, 300, 230, 170];
    notes.forEach((frequency, index) => this.playTone({ frequency, duration: 0.36, type: 'sawtooth', gain: 0.1, delay: index * 0.15 }));
  }

  ambience() {
    if (!this.ready) return;
    this.playTone({ frequency: 58, duration: 2.5, type: 'sine', gain: 0.05, destination: 'music' });
    this.playTone({ frequency: 87, duration: 2.8, type: 'sine', gain: 0.03, destination: 'music', delay: 0.4 });
  }
}
