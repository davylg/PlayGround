const STORAGE_KEY = 'vem-comer-settings-v1';

const defaults = {
  sensitivity: 1,
  musicVolume: 0.45,
  sfxVolume: 0.85,
  masterVolume: 0.8,
  quality: 'medium',
  fov: 78,
  shadows: true,
  particles: true,
  vibration: true,
  invertY: false,
  stickScale: 1,
  selectedCharacter: 'iara',
  selectedSkin: 0,
  selectedBanner: 0,
  botDifficulty: 'veteran',
  roundTarget: 4,
};

export class SettingsManager {
  constructor() {
    this.values = { ...defaults };
    this.listeners = new Set();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') this.values = { ...defaults, ...parsed };
      }
    } catch (error) { /* ignore private-mode errors */ }
  }

  get(key) {
    return this.values[key];
  }

  set(key, value) {
    if (!(key in this.values)) return;
    this.values[key] = value;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values)); } catch (error) { /* ignore */ }
    this.listeners.forEach(listener => listener(key, value));
  }

  reset() {
    const keep = {};
    keep.selectedCharacter = this.values.selectedCharacter;
    keep.selectedSkin = this.values.selectedSkin;
    keep.selectedBanner = this.values.selectedBanner;
    this.values = { ...defaults, ...keep };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values)); } catch (error) { /* ignore */ }
    this.listeners.forEach(listener => listener('reset', this.values));
  }

  onChange(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
