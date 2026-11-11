const STORAGE_KEY = 'vemcomer.settings.v1';

export const DEFAULT_SETTINGS = {
  sensitivity: 0.85,
  music: 0.34,
  sfx: 0.72,
  ui: 0.55,
  quality: 'high',
  vibration: true,
  showMobileControls: 'auto',
  fov: 72,
  invertY: false,
  side: 'auto',
  primary: 'rifle',
  character: 'brasa',
  skin: 'default',
  minimap: true
};

export class SettingsManager {
  constructor() {
    this.data = { ...DEFAULT_SETTINGS };
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      this.data = { ...this.data, ...saved };
    } catch {
      /* storage can be unavailable in private mode */
    }
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
    return value;
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      /* no-op */
    }
  }

  reset() {
    this.data = { ...DEFAULT_SETTINGS };
    this.save();
  }
}
