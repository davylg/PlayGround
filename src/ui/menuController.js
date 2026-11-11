import { characters, getCharacter, roleInfo, characterInitials } from '../data/characters.js';
import { weapons, weaponStatsForUI } from '../data/weapons.js';

export class MenuController {
  constructor({ settings, audio, onCharacterChanged, onSkinChanged, onStartMatch }) {
    this.settings = settings;
    this.audio = audio;
    this.onCharacterChanged = onCharacterChanged;
    this.onSkinChanged = onSkinChanged;
    this.onStartMatch = onStartMatch;
    this.selectedSide = 'attackers';
    this.screens = document.querySelectorAll('[data-screen-view]');
    this.selectedCharacter = getCharacter(settings.get('selectedCharacter'));
    this.initMenu();
    this.buildRoster();
    this.buildArmory();
    this.buildCustomization();
    this.bindSettings();
    this.updateHero();
    this.updateDetail();
    this.updateDeploy();
  }

  initMenu() {
    document.querySelectorAll('[data-screen]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        const target = button.dataset.screen;
        if (target === 'characters' && button.id === 'deploy-change') {
          this.hideDeploy();
        }
        this.showScreen(target);
        this.audio.ui(target === 'main' ? 'back' : 'click');
      });
    });
    document.getElementById('quickplay-btn').addEventListener('click', () => {
      this.audio.ui('confirm');
      this.showDeploy();
    });
    document.getElementById('deploy-close').addEventListener('click', () => {
      this.audio.ui('back');
      this.hideDeploy();
    });
    document.querySelectorAll('.side-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.side-card').forEach(other => other.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedSide = card.dataset.side;
        this.audio.ui('click');
      });
    });
    document.getElementById('start-match-btn').addEventListener('click', () => {
      const difficulty = document.getElementById('bot-difficulty').value;
      const roundTarget = Number(document.getElementById('round-target').value);
      this.settings.set('botDifficulty', difficulty);
      this.settings.set('roundTarget', roundTarget);
      this.audio.ui('deploy');
      this.hideDeploy();
      this.onStartMatch?.({ side: this.selectedSide, difficulty, roundTarget });
    });
    document.getElementById('audio-toggle').addEventListener('click', () => {
      const master = this.settings.get('masterVolume');
      const muted = master > 0;
      this.settings.set('masterVolume', muted ? 0 : 0.8);
      document.getElementById('audio-toggle').classList.toggle('active', !muted);
      this.audio.ui('click');
    });
    document.getElementById('fullscreen-btn').addEventListener('click', () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
      else document.exitFullscreen?.();
      this.audio.ui('click');
    });
  }

  showScreen(name) {
    this.screens.forEach(screen => screen.classList.toggle('active', screen.dataset.screenView === name));
    this.currentScreen = name;
    if (name === 'main') this.updateHero();
  }

  currentScreenName() {
    return this.currentScreen || 'main';
  }

  showDeploy() {
    document.getElementById('deploy-modal').classList.remove('hidden');
    this.updateDeploy();
  }

  hideDeploy() {
    document.getElementById('deploy-modal').classList.add('hidden');
  }

  updateHero() {
    const character = this.selectedCharacter;
    document.getElementById('hero-name').textContent = character.name;
    const role = roleInfo(character.role);
    document.getElementById('hero-role').textContent = `${role.label} • ${character.codename || role.description.split(' ')[0]}`;
    document.getElementById('hero-desc').textContent = character.description;
    document.getElementById('hero-age').textContent = `${character.age} ANOS`;
  }

  buildRoster() {
    const roster = document.getElementById('roster');
    roster.innerHTML = '';
    characters.forEach((character, index) => {
      const role = roleInfo(character.role);
      const card = document.createElement('button');
      card.className = 'roster-card';
      card.dataset.characterId = character.id;
      card.style.setProperty('--accent', role.color);
      card.innerHTML = `
        <span class="roster-num">${String(index + 1).padStart(2, '0')}</span>
        <span class="roster-avatar">${characterInitials(character)}</span>
        <span class="roster-name">${character.name}</span>
        <span class="roster-role">${role.label}</span>
      `;
      card.addEventListener('click', () => {
        this.selectCharacter(character.id);
        this.audio.ui('click');
      });
      roster.appendChild(card);
    });
    this.updateRosterSelection();
  }

  updateRosterSelection() {
    document.querySelectorAll('.roster-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.characterId === this.selectedCharacter.id);
    });
  }

  selectCharacter(id) {
    const character = getCharacter(id);
    this.selectedCharacter = character;
    this.settings.set('selectedCharacter', id);
    this.settings.set('selectedSkin', 0);
    this.updateRosterSelection();
    this.updateDetail();
    this.updateHero();
    this.updateCustomization();
    this.updateDeploy();
    this.onCharacterChanged?.(character, 0);
  }

  updateDetail() {
    const character = this.selectedCharacter;
    const index = characters.findIndex(c => c.id === character.id);
    const role = roleInfo(character.role);
    document.getElementById('detail-index').textContent = `${String(index + 1).padStart(2, '0')} / ${String(characters.length).padStart(2, '0')}`;
    document.getElementById('detail-name').textContent = character.name;
    document.getElementById('detail-age').textContent = `${character.age} ANOS • ${character.codename || role.label}`;
    document.getElementById('detail-role').textContent = role.label;
    document.getElementById('detail-role').style.setProperty('--accent', role.color);
    document.querySelector('.character-detail').style.setProperty('--accent', role.color);
    document.getElementById('detail-desc').textContent = `${character.description} ${character.appearance} Personalidade: ${character.personality}`;
    const healthPercent = Math.min(100, (character.health / 120) * 100);
    const speedPercent = Math.min(100, (character.movement.run / 8.2) * 100);
    const controlPercent = Math.max(25, Math.min(100, 100 - character.movement.mass * 55));
    document.getElementById('stat-health').style.width = `${healthPercent}%`;
    document.getElementById('stat-health-val').textContent = character.health;
    document.getElementById('stat-speed').style.width = `${speedPercent}%`;
    document.getElementById('stat-speed-val').textContent = character.movement.run.toFixed(1);
    document.getElementById('stat-control').style.width = `${controlPercent}%`;
    document.getElementById('stat-control-val').textContent = Math.round(controlPercent);
    const abilities = [
      { label: 'PASSIVA', icon: '◆', ...character.passive },
      { label: 'ATIVA', icon: character.active.icon, ...character.active },
      { label: 'ESPECIAL', icon: character.special.icon, ...character.special },
    ];
    document.getElementById('detail-abilities').innerHTML = abilities.map(ability => `
      <div class="ability-row">
        <div class="ab-icon">${ability.icon || '◆'}</div>
        <div><b>${ability.name}</b><small>${ability.description}</small></div>
        <div class="ab-type">${ability.label}<br>${ability.cooldown ? `${ability.cooldown}s` : 'AUTO'}</div>
      </div>
    `).join('');
    const swatches = document.getElementById('detail-skins');
    swatches.innerHTML = '';
    character.skins.forEach((skin, index) => {
      const swatch = document.createElement('button');
      swatch.className = 'swatch' + (index === (this.settings.get('selectedSkin') || 0) ? ' active' : '');
      swatch.style.background = `linear-gradient(120deg, ${skin.colors.cloth}, ${skin.colors.accent})`;
      swatch.title = skin.name;
      swatch.addEventListener('click', () => {
        this.settings.set('selectedSkin', index);
        this.updateDetail();
        this.updateCustomization();
        this.onSkinChanged?.(character, index);
        this.audio.ui('click');
      });
      swatches.appendChild(swatch);
    });
    document.getElementById('select-character-btn').addEventListener('click', () => {
      this.audio.ui('confirm');
      this.showScreen('main');
      this.updateHero();
    });
    document.getElementById('detail-deploy-btn').addEventListener('click', () => {
      this.audio.ui('confirm');
      this.showDeploy();
    });
  }

  buildArmory() {
    const grid = document.getElementById('armory-grid');
    grid.innerHTML = '';
    Object.values(weapons).forEach(weapon => {
      const stats = weaponStatsForUI(weapon.id);
      const card = document.createElement('div');
      card.className = 'weapon-card';
      card.style.setProperty('--accent', weapon.id === 'pistol' ? '#42d9ee' : weapon.id === 'sniper' ? '#f8c95c' : weapon.id === 'shotgun' ? '#ff5b2e' : '#74e69a');
      card.innerHTML = `
        <div class="weapon-art"><div class="gun-silhouette"></div></div>
        <h3>${weapon.name}</h3>
        <span class="weapon-type">${weapon.type}</span>
        <div class="weapon-stats">
          <div class="weapon-stat"><span>DANO</span><div class="bar"><i style="width:${Math.min(100, weapon.damage / 80 * 100)}%"></i></div><b>${weapon.damage}</b></div>
          <div class="weapon-stat"><span>CADÊNCIA</span><div class="bar"><i style="width:${Math.min(100, stats.fireRate / 900 * 100)}%"></i></div><b>${stats.fireRate}</b></div>
          <div class="weapon-stat"><span>MUNIÇÃO</span><div class="bar"><i style="width:${Math.min(100, weapon.magazineSize / 30 * 100)}%"></i></div><b>${weapon.magazineSize}</b></div>
          <div class="weapon-stat"><span>PRECISÃO</span><div class="bar"><i style="width:${stats.accuracy}%"></i></div><b>${stats.accuracy}%</b></div>
        </div>
        <div class="weapon-footer"><span>${weapon.automatic ? 'AUTOMÁTICA' : 'SEMI-AUTOMÁTICA'}</span><b>DISPONÍVEL</b></div>
      `;
      grid.appendChild(card);
    });
  }

  buildCustomization() {
    const banners = [
      { id: 0, name: 'VC', colors: ['#ff5b2e', '#7b2b1c'] },
      { id: 1, name: 'ARENA', colors: ['#42d9ee', '#143241'] },
      { id: 2, name: 'MERIDIANA', colors: ['#f8c95c', '#40301c'] },
    ];
    const grid = document.getElementById('banner-grid');
    grid.innerHTML = '';
    banners.forEach(banner => {
      const button = document.createElement('button');
      button.className = 'banner-thumb';
      button.style.setProperty('--b1', banner.colors[0]);
      button.style.setProperty('--b2', banner.colors[1]);
      button.textContent = banner.name;
      button.addEventListener('click', () => {
        this.settings.set('selectedBanner', banner.id);
        this.updateCustomization();
        this.audio.ui('click');
      });
      grid.appendChild(button);
    });
    this.updateCustomization();
  }

  updateCustomization() {
    const character = this.selectedCharacter;
    const role = roleInfo(character.role);
    document.getElementById('custom-name').textContent = character.name;
    document.getElementById('custom-role').textContent = `${role.label} • ${character.codename || role.description.split('.')[0]}`;
    const swatches = document.getElementById('custom-swatches');
    swatches.innerHTML = '';
    character.skins.forEach((skin, index) => {
      const swatch = document.createElement('button');
      swatch.className = 'custom-swatch' + (index === (this.settings.get('selectedSkin') || 0) ? ' active' : '');
      swatch.style.background = `linear-gradient(120deg, ${skin.colors.cloth}, ${skin.colors.gear})`;
      swatch.innerHTML = `<span>${skin.name}</span>`;
      swatch.addEventListener('click', () => {
        this.settings.set('selectedSkin', index);
        this.updateDetail();
        this.updateCustomization();
        this.onSkinChanged?.(character, index);
        this.audio.ui('click');
      });
      swatches.appendChild(swatch);
    });
    document.querySelectorAll('.banner-thumb').forEach((thumb, index) => {
      thumb.classList.toggle('active', index === (this.settings.get('selectedBanner') || 0));
    });
  }

  updateDeploy() {
    const character = this.selectedCharacter;
    document.getElementById('deploy-avatar').textContent = characterInitials(character);
    document.getElementById('deploy-name').textContent = character.name;
    document.getElementById('deploy-role').textContent = `${roleInfo(character.role).label} • ${character.codename || 'OPERADORA'}`;
    document.getElementById('bot-difficulty').value = this.settings.get('botDifficulty');
    document.getElementById('round-target').value = this.settings.get('roundTarget');
    document.querySelectorAll('.side-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.side === this.selectedSide);
    });
  }

  bindSettings() {
    const settings = this.settings;
    const bindRange = (id, key, transform = value => value, output = value => value) => {
      const element = document.getElementById(id);
      const outputElement = element.nextElementSibling;
      const update = () => {
        const raw = Number(element.value);
        const value = transform(raw);
        if (outputElement) outputElement.textContent = output(value);
        const percent = (raw - Number(element.min)) / (Number(element.max) - Number(element.min)) * 100;
        element.style.setProperty('--p', `${percent}%`);
        settings.set(key, value);
      };
      element.addEventListener('input', update);
      element.value = settings.get(key);
      update();
      return element;
    };

    const bindToggle = (id, key) => {
      const element = document.getElementById(id);
      element.checked = !!settings.get(key);
      element.addEventListener('change', () => settings.set(key, element.checked));
      return element;
    };

    const bindSelect = (id, key) => {
      const element = document.getElementById(id);
      element.value = settings.get(key);
      element.addEventListener('change', () => settings.set(key, element.value));
      return element;
    };

    bindRange('sens-range', 'sensitivity', value => value, value => `${value.toFixed(1)}×`);
    bindRange('stick-range', 'stickScale', value => value / 100, value => `${Math.round(value * 100)}%`);
    bindRange('master-range', 'masterVolume', value => value / 100, value => `${Math.round(value)}%`);
    bindRange('music-range', 'musicVolume', value => value / 100, value => `${Math.round(value)}%`);
    bindRange('sfx-range', 'sfxVolume', value => value / 100, value => `${Math.round(value)}%`);
    bindRange('fov-range', 'fov', value => value, value => `${value}°`);
    bindSelect('quality-select', 'quality');
    bindToggle('vibration-toggle', 'vibration');
    bindToggle('invert-toggle', 'invertY');
    bindToggle('shadows-toggle', 'shadows');
    bindToggle('particles-toggle', 'particles');

    document.getElementById('reset-settings').addEventListener('click', () => {
      this.settings.reset();
      this.audio.ui('back');
      window.location.reload();
    });
  }
}
