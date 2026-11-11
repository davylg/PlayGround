import { CHARACTERS, getCharacter, getRole } from '../data/characters.js';
import { WEAPONS, PRIMARY_WEAPONS, SECONDARY_WEAPONS, getWeapon } from '../data/weapons.js';

const $ = (id) => document.getElementById(id);

const roleColors = {
  assault: '#ff6b4a', defense: '#48d7ff', support: '#55f0b0', recon: '#ffd75e', control: '#c88bff'
};

function weaponSVG(id, color = 'currentColor') {
  if (id === 'pistol') {
    return `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg"><path d="M8 12h70l3 6H60l-5 8H30l-5-8H8z" fill="${color}" opacity="0.92"/><path d="M28 26h18l-3 9H31z" fill="${color}" opacity="0.55"/><rect x="72" y="15" width="18" height="4" rx="1" fill="${color}" opacity="0.7"/></svg>`;
  }
  if (id === 'shotgun') {
    return `<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg"><path d="M6 18h104l-4 8H26l-4-8z" fill="${color}" opacity="0.95"/><rect x="106" y="17" width="42" height="7" rx="2" fill="${color}" opacity="0.72"/><path d="M20 26h24l-6 12H24z" fill="${color}" opacity="0.45"/></svg>`;
  }
  if (id === 'sniper') {
    return `<svg viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="18" width="116" height="6" rx="2" fill="${color}" opacity="0.95"/><rect x="118" y="19" width="54" height="4" rx="1" fill="${color}" opacity="0.68"/><rect x="42" y="9" width="42" height="8" rx="3" fill="${color}" opacity="0.55"/><path d="M22 24h26l-7 13H26z" fill="${color}" opacity="0.45"/></svg>`;
  }
  if (id === 'smg') {
    return `<svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="94" height="8" rx="3" fill="${color}" opacity="0.95"/><rect x="100" y="18" width="22" height="4" rx="1" fill="${color}" opacity="0.65"/><path d="M24 24h20l-5 13H27z" fill="${color}" opacity="0.45"/><rect x="60" y="10" width="18" height="5" rx="2" fill="${color}" opacity="0.55"/></svg>`;
  }
  return `<svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="17" width="112" height="7" rx="2" fill="${color}" opacity="0.95"/><rect x="116" y="18" width="36" height="5" rx="2" fill="${color}" opacity="0.7"/><path d="M28 24h24l-7 13H33z" fill="${color}" opacity="0.45"/><rect x="65" y="9" width="26" height="7" rx="2" fill="${color}" opacity="0.5"/></svg>`;
}

export class MenuUI {
  constructor({ app, settings, audio, input, viewer }) {
    this.app = app;
    this.settings = settings;
    this.audio = audio;
    this.input = input;
    this.viewer = viewer;
    this.selectedCharacterId = settings.get('character') || CHARACTERS[0].id;
    this.selectedSkin = settings.get('skin') || 'default';
    this.primaryWeapon = settings.get('primary') || 'rifle';
    this.activeView = 'home';
    this.sticker = '✦';
    this.menuRoot = $('menu-root');
    this.bootScreen = $('boot-screen');
    this.gameRoot = $('game-root');
    this.setup();
    this.setCharacter(this.selectedCharacterId, this.selectedSkin, true);
  }

  setup() {
    // Navigation
    document.querySelectorAll('.nav-link, .brand').forEach((el) => {
      el.addEventListener('click', () => {
        const target = el.dataset.nav || 'home';
        this.setView(target);
        this.audio.ui('ui');
      });
    });

    // Home action buttons
    $('play-button').addEventListener('click', () => this.launchMatch());
    $('pick-agent-button').addEventListener('click', () => {
      this.setView('characters');
      this.audio.ui('ui');
    });
    $('loadout-chip').addEventListener('click', () => {
      this.setView('armory');
      this.audio.ui('ui');
    });

    // Side selector
    document.querySelectorAll('#side-selector button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#side-selector button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.settings.set('side', btn.dataset.side);
        this.audio.ui('ui');
      });
    });
    const side = this.settings.get('side') || 'auto';
    document.querySelectorAll('#side-selector button').forEach((b) => b.classList.toggle('active', b.dataset.side === side));

    // Character viewer interactions
    const dragZones = [$('character-drag'), $('customize-drag')];
    dragZones.forEach((zone) => {
      if (!zone) return;
      zone.addEventListener('pointerdown', (e) => {
        this.viewer.startDrag(e.clientX);
        zone.setPointerCapture?.(e.pointerId);
      });
      zone.addEventListener('pointermove', (e) => this.viewer.dragTo(e.clientX));
      zone.addEventListener('pointerup', () => this.viewer.stopDrag());
      zone.addEventListener('pointercancel', () => this.viewer.stopDrag());
      zone.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.viewer.zoomBy(e.deltaY > 0 ? 0.28 : -0.28);
      }, { passive: false });
    });
    $('viewer-zoom-in').addEventListener('click', () => this.viewer.zoomBy(-0.35));
    $('viewer-zoom-out').addEventListener('click', () => this.viewer.zoomBy(0.35));

    // Arsenal
    $('equip-weapon').addEventListener('click', () => {
      this.settings.set('primary', this.primaryWeapon);
      const weapon = getWeapon(this.primaryWeapon);
      $('loadout-name').textContent = weapon.name;
      this.toast(`${weapon.name} EQUIPADA`);
      this.audio.ui('ui');
    });

    // Sticker grid
    document.querySelectorAll('#sticker-grid .sticker').forEach((el) => {
      el.addEventListener('click', () => {
        document.querySelectorAll('#sticker-grid .sticker').forEach((b) => b.classList.remove('active'));
        el.classList.add('active');
        this.sticker = el.textContent.trim();
        $('sticker-preview').textContent = this.sticker;
        this.audio.ui('ui');
      });
    });

    // Settings controls
    this.bindRange('sens-range', 'sens-value', (v) => `${Number(v).toFixed(2)}`, (v) => this.settings.set('sensitivity', Number(v)));
    this.bindRange('fov-range', 'fov-value', (v) => `${Math.round(v)}°`, (v) => this.settings.set('fov', Number(v)));
    this.bindRange('music-range', 'music-value', (v) => `${Math.round(v * 100)}%`, (v) => this.settings.set('music', Number(v)));
    this.bindRange('sfx-range', 'sfx-value', (v) => `${Math.round(v * 100)}%`, (v) => this.settings.set('sfx', Number(v)));
    this.bindRange('ui-range', 'ui-value', (v) => `${Math.round(v * 100)}%`, (v) => this.settings.set('ui', Number(v)));
    document.querySelectorAll('#quality-selector button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#quality-selector button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.settings.set('quality', btn.dataset.quality);
        this.audio.ui('ui');
        this.toast('QUALIDADE APLICADA');
      });
    });
    document.querySelectorAll('#mobile-selector button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#mobile-selector button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.settings.set('showMobileControls', btn.dataset.mobile);
        this.applyTouchMode();
        this.audio.ui('ui');
      });
    });
    this.bindToggle('vibration-toggle', 'vibration');
    this.bindToggle('invert-toggle', 'invertY');
    this.bindToggle('minimap-toggle', 'minimap');
    $('reset-settings').addEventListener('click', () => {
      this.settings.reset();
      this.syncSettings();
      this.applyTouchMode();
      this.audio.ui('uiBack');
      this.toast('PADRÕES RESTAURADOS');
    });
    document.querySelectorAll('[data-close-settings]').forEach((el) => el.addEventListener('click', () => this.closeSettings()));
    $('settings-open').addEventListener('click', () => this.openSettings());
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.app.gameActive) this.app.game.togglePause(true);
      else if (e.code === 'Escape') this.openSettings();
    });

    this.syncSettings();
    this.renderRoster();
    this.renderWeaponRail();
    this.updateHeroCard();
    this.applyTouchMode();
  }

  bindRange(rangeId, valueId, format, apply) {
    const range = $(rangeId);
    const value = $(valueId);
    if (!range || !value) return;
    range.addEventListener('input', () => {
      value.textContent = format(range.value);
      apply(range.value);
      this.audio.applyVolumes();
      this.audio.ui('ui');
    });
  }

  bindToggle(id, key) {
    const input = $(id);
    if (!input) return;
    input.addEventListener('change', () => {
      this.settings.set(key, input.checked);
      this.audio.ui('ui');
    });
  }

  syncSettings() {
    const setRange = (id, key, valueId, format) => {
      const range = $(id);
      const value = $(valueId);
      const val = this.settings.get(key);
      range.value = val;
      value.textContent = format(val);
    };
    setRange('sens-range', 'sensitivity', 'sens-value', (v) => Number(v).toFixed(2));
    setRange('fov-range', 'fov', 'fov-value', (v) => `${Math.round(v)}°`);
    setRange('music-range', 'music', 'music-value', (v) => `${Math.round(v * 100)}%`);
    setRange('sfx-range', 'sfx', 'sfx-value', (v) => `${Math.round(v * 100)}%`);
    setRange('ui-range', 'ui', 'ui-value', (v) => `${Math.round(v * 100)}%`);
    document.querySelectorAll('#quality-selector button').forEach((b) => b.classList.toggle('active', b.dataset.quality === this.settings.get('quality')));
    document.querySelectorAll('#mobile-selector button').forEach((b) => b.classList.toggle('active', b.dataset.mobile === this.settings.get('showMobileControls')));
    $('vibration-toggle').checked = !!this.settings.get('vibration');
    $('invert-toggle').checked = !!this.settings.get('invertY');
    $('minimap-toggle').checked = !!this.settings.get('minimap');
    $('loadout-name').textContent = getWeapon(this.primaryWeapon).name;
  }

  applyTouchMode() {
    const mode = this.settings.get('showMobileControls');
    const touch = this.input.isTouch;
    const enabled = mode === 'on' || (mode === 'auto' && touch);
    document.body.classList.toggle('touch-device', enabled);
  }

  setView(view) {
    this.activeView = view;
    document.querySelectorAll('.view').forEach((el) => el.classList.toggle('active', el.id === `view-${view}`));
    document.querySelectorAll('.nav-link').forEach((el) => el.classList.toggle('active', el.dataset.nav === view));
    this.menuRoot.classList.toggle('character-mode', view === 'characters' || view === 'armory');
    this.menuRoot.classList.toggle('customize-mode', view === 'customize');
    if (view === 'home') this.viewer.setComposition('home');
    else if (view === 'characters') this.viewer.setComposition('character');
    else if (view === 'customize') this.viewer.setComposition('customize');
    else this.viewer.setComposition('home');
  }

  setCharacter(id, skinId = this.selectedSkin, silent = false) {
    const data = getCharacter(id);
    this.selectedCharacterId = data.id;
    this.selectedSkin = skinId;
    this.settings.set('character', data.id);
    this.settings.set('skin', skinId);
    this.viewer.setCharacter(data, skinId);
    this.viewer.setComposition(this.activeView === 'home' ? 'home' : this.activeView === 'customize' ? 'customize' : 'character');
    this.updateHeroCard();
    this.updateAgentDetail();
    this.updateCustomize(data);
    document.querySelectorAll('.roster-card').forEach((el) => el.classList.toggle('active', el.dataset.id === data.id));
    document.querySelectorAll('.dock-agent').forEach((el) => el.classList.toggle('active', el.dataset.id === data.id));
    if (!silent) this.audio.ui('ui');
  }

  updateHeroCard() {
    const data = getCharacter(this.selectedCharacterId);
    const role = getRole(data.role);
    $('hero-agent-role').textContent = role.label;
    $('hero-agent-name').textContent = data.shortName;
    $('hero-agent-real').textContent = `${data.name.split(' ')[0]} ${data.name.split('"')[1] ? `"${data.name.split('"')[1]}"` : ''} · ${data.age}`;
    const container = $('hero-agent-abilities');
    container.innerHTML = `
      <div class="hero-agent-ability"><span>${data.passive.icon}</span><div><strong>${data.passive.name.toUpperCase()}</strong><small>PASSIVA</small></div></div>
      <div class="hero-agent-ability"><span>${data.active.icon}</span><div><strong>${data.active.name.toUpperCase()}</strong><small>ATIVA</small></div></div>
      <div class="hero-agent-ability"><span>${data.special.icon}</span><div><strong>${data.special.name.toUpperCase()}</strong><small>ESPECIAL</small></div></div>`;
    const index = CHARACTERS.findIndex((c) => c.id === data.id) + 1;
    container.parentElement.querySelector('.hero-agent-hint span').textContent = `${String(index).padStart(2, '0')}/12`;
  }

  renderRoster() {
    const grid = $('roster-grid');
    grid.innerHTML = '';
    CHARACTERS.forEach((data, i) => {
      const role = getRole(data.role);
      const button = document.createElement('button');
      button.className = 'roster-card';
      button.dataset.id = data.id;
      button.style.setProperty('--agent-color', roleColors[data.role] || '#ff6b4a');
      button.innerHTML = `
        <span class="roster-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="roster-sigil">${data.shortName.slice(0, 1)}</span>
        <span class="roster-name">${data.shortName}</span>
        <span class="roster-role">${role.label}</span>`;
      button.addEventListener('click', () => this.setCharacter(data.id));
      grid.appendChild(button);
    });
    const dock = $('agent-dock');
    dock.innerHTML = '';
    CHARACTERS.forEach((data) => {
      const role = getRole(data.role);
      const btn = document.createElement('button');
      btn.className = 'dock-agent';
      btn.dataset.id = data.id;
      btn.style.setProperty('--agent-color', roleColors[data.role] || '#ff6b4a');
      btn.innerHTML = `${data.shortName.slice(0, 1)}<small>${role.label.slice(0, 2)}</small>`;
      btn.addEventListener('click', () => this.setCharacter(data.id));
      dock.appendChild(btn);
    });
  }

  updateAgentDetail() {
    const data = getCharacter(this.selectedCharacterId);
    const role = getRole(data.role);
    const roleColor = roleColors[data.role] || '#ff6b4a';
    const index = CHARACTERS.findIndex((c) => c.id === data.id) + 1;
    const ability = (kind, ability) => `
      <div class="detail-ability ${kind === 'passive' ? 'passive' : ''}">
        <div class="detail-ability-icon">${ability.icon}</div>
        <div class="detail-ability-copy">
          <div class="detail-ability-head"><strong>${ability.name.toUpperCase()}</strong><span>${kind === 'passive' ? 'PASSIVA' : `RECARREGA ${ability.cooldown}s`}</span></div>
          <p>${ability.desc}</p>
        </div>
      </div>`;
    const stat = (label, value) => `
      <div class="stat-item"><span>${label}</span><div><i style="width:${value * 10}%"></i></div></div>`;
    $('agent-detail').innerHTML = `
      <div class="detail-top">
        <span class="role-chip" style="--role-color:${roleColor};color:${roleColor};border-color:${roleColor}55">${role.icon} ${role.label}</span>
        <span class="detail-num">AGENTE ${String(index).padStart(2, '0')}/12</span>
      </div>
      <h3 class="detail-name">${data.shortName}</h3>
      <div class="detail-real">${data.name.replace(data.shortName, '').trim()} · ${data.age} · ${data.home.toUpperCase()}</div>
      <p class="detail-tagline">${data.tagline}</p>
      <p class="detail-description">${data.description}</p>
      <div class="detail-section-title">HABILIDADES</div>
      <div class="ability-list">
        ${ability('passive', data.passive)}
        ${ability('active', data.active)}
        ${ability('special', data.special)}
      </div>
      <div class="detail-section-title">STATUS</div>
      <div class="stat-grid">
        ${stat('MOBILIDADE', data.stats.mobility)}
        ${stat('PODER', data.stats.firepower)}
        ${stat('UTILIDADE', data.stats.utility)}
        ${stat('DIFICULDADE', data.stats.difficulty)}
      </div>
      <div class="detail-section-title">SKINS</div>
      <div class="skin-row">
        ${data.skins.map((skin) => `
          <button class="skin-swatch ${skin.id === this.selectedSkin ? 'active' : ''}" data-skin="${skin.id}" style="--swatch:${skin.color};--role-color:${roleColor}">
            <span>${skin.name}</span>
          </button>`).join('')}
      </div>
      <div class="detail-actions">
        <button class="btn-primary compact" id="confirm-agent"><span class="btn-label">ESCOLHER</span><span class="btn-arrow">→</span></button>
        <button class="btn-ghost" id="view-customize-btn">SKINS</button>
      </div>
      <p class="quote-line">${data.quote}</p>`;
    document.querySelectorAll('.skin-swatch').forEach((el) => {
      el.addEventListener('click', () => {
        this.setCharacter(data.id, el.dataset.skin, true);
        this.audio.ui('ui');
      });
    });
    $('confirm-agent').addEventListener('click', () => {
      this.toast(`${data.shortName} SELECIONADA`);
      this.audio.ui('ui');
      this.launchMatch();
    });
    $('view-customize-btn').addEventListener('click', () => this.setView('customize'));
  }

  updateCustomize(data) {
    const role = getRole(data.role);
    const roleColor = roleColors[data.role] || '#ff6b4a';
    $('customize-agent-name').textContent = `${data.shortName} · ${(data.skins.find((s) => s.id === this.selectedSkin) || data.skins[0]).name.toUpperCase()}`;
    $('customize-role').textContent = `${role.icon} ${role.label}`;
    $('customize-name').textContent = (data.skins.find((s) => s.id === this.selectedSkin) || data.skins[0]).name;
    $('customize-desc').textContent = data.description;
    const list = $('skin-list');
    list.innerHTML = data.skins.map((skin) => `
      <button class="skin-card ${skin.id === this.selectedSkin ? 'active' : ''}" data-skin="${skin.id}" style="--swatch:${skin.color}">
        <div class="skin-thumb" style="--swatch:${skin.color};background:${skin.color}"></div>
        <div><strong>${skin.name.toUpperCase()}</strong><small>${skin.price}</small></div>
        <div class="skin-equip">${skin.id === this.selectedSkin ? 'EQUIPADA' : 'EQUIPAR'}</div>
      </button>`).join('');
    list.querySelectorAll('.skin-card').forEach((el) => {
      el.addEventListener('click', () => this.setCharacter(data.id, el.dataset.skin, true));
    });
  }

  renderWeaponRail() {
    const rail = $('weapon-rail');
    rail.innerHTML = '';
    [...PRIMARY_WEAPONS, ...SECONDARY_WEAPONS].forEach((id, i) => {
      const weapon = WEAPONS[id];
      const card = document.createElement('button');
      card.className = 'weapon-card';
      card.dataset.id = id;
      card.innerHTML = `
        <span class="weapon-card-index">${String(i + 1).padStart(2, '0')}</span>
        <span class="weapon-card-glyph">${weaponSVG(id)}</span>
        <span class="weapon-card-copy"><strong>${weapon.name}</strong><small>${weapon.class}</small></span>
        <span class="equipped-tag">${id === this.primaryWeapon ? 'EQUIPADA' : ''}</span>`;
      card.addEventListener('click', () => this.selectWeapon(id));
      rail.appendChild(card);
    });
    this.selectWeapon(this.primaryWeapon, true);
  }

  selectWeapon(id, silent = false) {
    this.primaryWeapon = id;
    const weapon = WEAPONS[id];
    document.querySelectorAll('.weapon-card').forEach((el) => {
      el.classList.toggle('active', el.dataset.id === id);
      const tag = el.querySelector('.equipped-tag');
      if (tag) tag.textContent = el.dataset.id === this.primaryWeapon ? 'EQUIPADA' : '';
    });
    $('weapon-code').textContent = `${weapon.name} / ${weapon.class}`;
    $('weapon-name').textContent = weapon.name;
    $('weapon-class').textContent = weapon.class;
    $('weapon-description').textContent = weapon.description;
    $('weapon-silhouette').innerHTML = weaponSVG(id, '#dfe6ea');
    $('weapon-stats').innerHTML = Object.entries(weapon.stats).map(([key, value]) => `
      <div class="wstat"><span>${key}</span><div><i style="width:${value}%"></i></div><strong>${value}</strong></div>`).join('');
    $('loadout-name').textContent = weapon.name;
    if (!silent) this.audio.ui('ui');
  }

  openSettings() {
    $('settings-modal').classList.add('open');
    this.audio.ui('ui');
  }

  closeSettings() {
    $('settings-modal').classList.remove('open');
    this.audio.ui('uiBack');
  }

  showMenu() {
    this.menuRoot.classList.remove('hidden');
    this.gameRoot.classList.remove('active');
    this.gameRoot.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('game-active');
    this.app.gameActive = false;
    this.viewer.setComposition('home');
    this.setView('home');
  }

  hideMenuForGame() {
    this.menuRoot.classList.add('hidden');
    this.gameRoot.classList.add('active');
    this.gameRoot.setAttribute('aria-hidden', 'false');
    document.body.classList.add('game-active');
    this.app.gameActive = true;
    this.closeSettings();
  }

  launchMatch() {
    this.audio.init();
    const side = this.settings.get('side') || 'auto';
    this.app.startMatch({
      characterId: this.selectedCharacterId,
      primaryWeapon: this.primaryWeapon,
      side,
      winTarget: 4
    });
  }

  toast(text) {
    const toast = $('toast');
    toast.textContent = text;
    toast.classList.add('visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
  }
}
