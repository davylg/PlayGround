export class HUDController {
  constructor() {
    this.root = document.getElementById('hud-layer');
    this.elements = {
      playerRoot: this.root,
      atkScore: document.getElementById('hud-atk-score'),
      defScore: document.getElementById('hud-def-score'),
      atkAlive: document.getElementById('hud-atk-alive'),
      defAlive: document.getElementById('hud-def-alive'),
      roundLabel: document.getElementById('hud-round-label'),
      timer: document.getElementById('hud-timer'),
      bombClock: document.getElementById('hud-bomb-clock'),
      objective: document.getElementById('hud-objective'),
      objectiveText: document.querySelector('#hud-objective span'),
      killfeed: document.getElementById('killfeed'),
      minimap: document.getElementById('minimap'),
      minimapSite: document.getElementById('minimap-site'),
      crosshair: document.getElementById('crosshair'),
      hitmarker: document.getElementById('hitmarker'),
      damageVignette: document.getElementById('damage-vignette'),
      killBanner: document.getElementById('kill-banner'),
      killName: document.getElementById('kill-name'),
      abilityFeed: document.getElementById('ability-feed'),
      playerName: document.getElementById('hud-player-name'),
      playerRole: document.getElementById('hud-player-role'),
      healthFill: document.getElementById('health-fill'),
      healthText: document.getElementById('health-text'),
      shieldRow: document.getElementById('shield-row'),
      shieldFill: document.getElementById('shield-fill'),
      weapon: document.getElementById('hud-weapon'),
      ammo: document.getElementById('hud-ammo'),
      reserve: document.getElementById('hud-reserve'),
      reloadBar: document.getElementById('reload-bar'),
      abilityActive: document.getElementById('ability-active'),
      abilityActiveIcon: document.getElementById('ability-active-icon'),
      abilityActiveName: document.getElementById('ability-active-name'),
      abilityActiveCd: document.getElementById('ability-active-cd'),
      abilityActiveRing: document.getElementById('ability-active-ring'),
      abilitySpecial: document.getElementById('ability-special'),
      abilitySpecialIcon: document.getElementById('ability-special-icon'),
      abilitySpecialName: document.getElementById('ability-special-name'),
      abilitySpecialCd: document.getElementById('ability-special-cd'),
      abilitySpecialRing: document.getElementById('ability-special-ring'),
      prompt: document.getElementById('interaction-prompt'),
      promptKey: document.getElementById('prompt-key'),
      promptTitle: document.getElementById('prompt-title'),
      promptSub: document.getElementById('prompt-sub'),
      promptFill: document.getElementById('prompt-progress-fill'),
      roundBanner: document.getElementById('round-banner'),
      roundBannerKicker: document.getElementById('round-banner-kicker'),
      roundBannerTitle: document.getElementById('round-banner-title'),
      roundBannerSub: document.getElementById('round-banner-sub'),
      deathOverlay: document.getElementById('death-overlay'),
      deathDamage: document.getElementById('death-damage'),
      deathKills: document.getElementById('death-kills'),
      matchEnd: document.getElementById('match-end'),
      matchEndTitle: document.getElementById('match-end-title'),
      matchEndSub: document.getElementById('match-end-sub'),
      matchScoreAtk: document.getElementById('match-score-atk'),
      matchScoreDef: document.getElementById('match-score-def'),
      matchStats: document.getElementById('match-stats'),
      mobileControls: document.getElementById('mobile-controls'),
      mobileInteract: document.getElementById('m-btn-interact'),
      toastRoot: document.getElementById('toast-root'),
    };
    this.minimapCtx = this.elements.minimap.getContext('2d');
    this.lastHealth = 100;
    this.hitmarkerTimer = 0;
    this.killBannerTimer = 0;
    this.damageTimer = 0;
    this.promptText = null;
  }

  show() {
    this.root.classList.remove('hidden');
  }

  hide() {
    this.root.classList.add('hidden');
  }

  update(game, dt) {
    const player = game.player;
    const round = game.round;
    const bomb = game.bomb;
    const teamManager = game.teamManager;

    // Score and alive counts.
    this.elements.atkScore.textContent = teamManager.attackersScore;
    this.elements.defScore.textContent = teamManager.defendersScore;
    const alive = teamManager.playersAliveCount();
    this.elements.atkAlive.textContent = `${alive.attackers} VIVOS`;
    this.elements.defAlive.textContent = `${alive.defenders} VIVOS`;
    this.elements.roundLabel.textContent = `ROUND ${round.roundNumber}`;
    if (round.state === 'bombPlanted' || bomb.state === 'planted' || bomb.state === 'defusing') {
      this.elements.timer.textContent = this.formatTime(bomb.timer);
      this.elements.bombClock.classList.remove('hidden');
      this.elements.bombClock.querySelector('strong').textContent = this.formatTime(bomb.timer);
    } else {
      this.elements.timer.textContent = this.formatTime(round.timer);
      this.elements.bombClock.classList.add('hidden');
    }

    // Health.
    const health = Math.max(0, Math.round(player.health.currentHealth));
    const maxHealth = player.health.maxHealth;
    this.elements.healthFill.style.width = `${(health / maxHealth) * 100}%`;
    this.elements.healthText.textContent = health;
    this.elements.healthFill.parentElement.classList.toggle('low', health <= 35);
    if (player.health.shield > 0) {
      this.elements.shieldRow.classList.remove('hidden');
      this.elements.shieldFill.style.width = `${Math.min(100, player.health.shield)}%`;
    } else this.elements.shieldRow.classList.add('hidden');

    // Weapon.
    const weapon = player.weapon.weapon;
    this.elements.weapon.textContent = weapon.name;
    this.elements.ammo.textContent = weapon.currentAmmo;
    this.elements.reserve.textContent = weapon.reserveAmmo;
    if (player.weapon.reloading) {
      this.elements.reloadBar.classList.remove('hidden');
      const progress = 1 - player.weapon.reloadTimer / weapon.reloadTime;
      this.elements.reloadBar.querySelector('i').style.width = `${progress * 100}%`;
    } else this.elements.reloadBar.classList.add('hidden');

    // Abilities.
    const abilityStatus = player.abilityController.status();
    this.elements.abilityActiveIcon.textContent = abilityStatus.active?.icon || '◈';
    this.elements.abilityActiveName.textContent = abilityStatus.active?.name || 'HABILIDADE';
    if (abilityStatus.activeReady) {
      this.elements.abilityActiveCd.textContent = 'PRONTO';
      this.elements.abilityActiveCd.classList.add('ready');
      this.elements.abilityActiveRing.style.strokeDashoffset = '276';
      this.elements.abilityActive.classList.remove('cooling');
    } else {
      const percent = 1 - abilityStatus.activeCooldown / abilityStatus.active.cooldown;
      this.elements.abilityActiveCd.textContent = `${abilityStatus.activeCooldown.toFixed(1)}s`;
      this.elements.abilityActiveCd.classList.remove('ready');
      this.elements.abilityActiveRing.style.strokeDashoffset = `${276 * (1 - percent)}`;
      this.elements.abilityActive.classList.add('cooling');
    }
    this.elements.abilitySpecialIcon.textContent = abilityStatus.special?.icon || '✦';
    this.elements.abilitySpecialName.textContent = abilityStatus.special?.name || 'ESPECIAL';
    if (abilityStatus.specialReady) {
      this.elements.abilitySpecialCd.textContent = 'PRONTO';
      this.elements.abilitySpecialCd.classList.add('ready');
      this.elements.abilitySpecialRing.style.strokeDashoffset = '276';
      this.elements.abilitySpecial.classList.remove('cooling');
    } else {
      const percent = 1 - abilityStatus.specialCooldown / abilityStatus.special.cooldown;
      this.elements.abilitySpecialCd.textContent = `${abilityStatus.specialCooldown.toFixed(1)}s`;
      this.elements.abilitySpecialCd.classList.remove('ready');
      this.elements.abilitySpecialRing.style.strokeDashoffset = `${276 * (1 - percent)}`;
      this.elements.abilitySpecial.classList.add('cooling');
    }

    // Objective text.
    let objectiveText = 'AVANCE PARA O SITE';
    if (player.team === 'attackers') {
      if (bomb.state === 'notPlanted' || bomb.state === 'planting') objectiveText = 'PLANTE A BOMBA';
      else if (bomb.state === 'planted' || bomb.state === 'defusing') objectiveText = 'DEFENDA A BOMBA';
    } else if (player.team === 'defenders') {
      if (bomb.state === 'notPlanted') objectiveText = 'DEFENDA OS SITES';
      else objectiveText = 'DESARME A BOMBA';
    }
    if (round.state === 'preparingRound') objectiveText = 'PREPARE-SE';
    if (round.state === 'roundEnding') objectiveText = round.lastReason || 'FIM DE ROUND';
    if (this.elements.objectiveText.textContent !== objectiveText) this.elements.objectiveText.textContent = objectiveText;

    // Minimap.
    this.updateMinimap(game);

    // Timers for overlays.
    if (this.hitmarkerTimer > 0) {
      this.hitmarkerTimer -= dt;
      if (this.hitmarkerTimer <= 0) this.elements.hitmarker.classList.remove('show', 'kill');
    }
    if (this.killBannerTimer > 0) {
      this.killBannerTimer -= dt;
      if (this.killBannerTimer <= 0) this.elements.killBanner.classList.add('hidden');
    }
    if (this.damageTimer > 0) {
      this.damageTimer -= dt;
      this.elements.damageVignette.style.opacity = Math.max(0, this.damageTimer / 0.6);
    } else this.elements.damageVignette.style.opacity = 0;

    // Death overlay.
    const dead = !player.health.isAlive;
    this.elements.deathOverlay.classList.toggle('hidden', !dead);
    if (dead) {
      this.elements.deathDamage.textContent = Math.round(player.health.damageTaken);
      this.elements.deathKills.textContent = player.kills || 0;
    }
  }

  formatTime(seconds) {
    const clamped = Math.max(0, seconds);
    const minutes = Math.floor(clamped / 60);
    const remaining = Math.floor(clamped % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  }

  hitmarker(isKill = false) {
    this.elements.hitmarker.classList.add('show');
    this.elements.hitmarker.classList.toggle('kill', isKill);
    this.hitmarkerTimer = isKill ? 0.3 : 0.16;
  }

  killBanner(name) {
    this.elements.killName.textContent = name;
    this.elements.killBanner.classList.remove('hidden');
    this.killBannerTimer = 1.6;
  }

  damageFlash() {
    this.damageTimer = 0.55;
  }

  addKillEntry(killerName, victimName, weaponName = 'VECTOR-7') {
    const entry = document.createElement('div');
    entry.className = 'kill-entry';
    entry.innerHTML = `<b>${killerName}</b> <span class="friendly">✕</span> <span class="enemy">${victimName}</span>`;
    this.elements.killfeed.prepend(entry);
    while (this.elements.killfeed.children.length > 5) this.elements.killfeed.lastChild.remove();
    setTimeout(() => entry.remove(), 5000);
  }

  abilityFeed(text) {
    const span = document.createElement('span');
    span.textContent = text;
    this.elements.abilityFeed.innerHTML = '';
    this.elements.abilityFeed.appendChild(span);
    setTimeout(() => span.remove(), 1600);
  }

  toast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.elements.toastRoot.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  showPrompt({ key = 'E', title, sub = '', progress = null }) {
    this.elements.prompt.classList.remove('hidden');
    this.elements.promptKey.textContent = key;
    this.elements.promptTitle.textContent = title;
    this.elements.promptSub.textContent = sub;
    if (progress === null) this.elements.promptFill.style.width = '0%';
    else this.elements.promptFill.style.width = `${Math.max(0, Math.min(100, progress * 100))}%`;
  }

  hidePrompt() {
    this.elements.prompt.classList.add('hidden');
  }

  showRoundBanner(kicker, title, sub) {
    this.elements.roundBannerKicker.textContent = kicker;
    this.elements.roundBannerTitle.textContent = title;
    this.elements.roundBannerSub.textContent = sub;
    this.elements.roundBanner.classList.remove('hidden');
    clearTimeout(this.bannerTimeout);
    this.bannerTimeout = setTimeout(() => this.elements.roundBanner.classList.add('hidden'), 2400);
  }

  hideRoundBanner() {
    this.elements.roundBanner.classList.add('hidden');
  }

  showMatchEnd(winnerTeam, playerTeam, scores, stats) {
    const isWin = winnerTeam === playerTeam;
    this.elements.matchEndTitle.textContent = isWin ? 'VITÓRIA' : 'DERROTA';
    this.elements.matchEndTitle.classList.toggle('loss', !isWin);
    this.elements.matchEndSub.textContent = isWin
      ? 'Sua equipe dominou a Doca Meridiana.'
      : 'Sua equipe foi superada. Ajuste o plano e volte.';
    this.elements.matchScoreAtk.textContent = scores.attackers;
    this.elements.matchScoreDef.textContent = scores.defenders;
    this.elements.matchStats.innerHTML = `
      <div><span>ELIMINAÇÕES</span><b>${stats.kills}</b></div>
      <div><span>DANO CAUSADO</span><b>${Math.round(stats.damage)}</b></div>
      <div><span>ROUNDS</span><b>${stats.rounds}</b></div>
    `;
    this.elements.matchEnd.classList.remove('hidden');
  }

  hideMatchEnd() {
    this.elements.matchEnd.classList.add('hidden');
  }

  updateMinimap(game) {
    const ctx = this.minimapCtx;
    const width = this.elements.minimap.width;
    const height = this.elements.minimap.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(9,13,19,0.65)';
    ctx.fillRect(0, 0, width, height);
    const map = game.map;
    const scaleX = width / 70;
    const scaleZ = height / 44;
    const toX = x => (x + 35) * scaleX;
    const toY = z => (z + 22) * scaleZ;
    // Sites.
    map.siteZones.forEach(zone => {
      ctx.strokeStyle = zone.id === 'A' ? '#ff5b2e' : '#42d9ee';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(toX(zone.center.x), toY(zone.center.y), zone.radius * scaleX, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = zone.id === 'A' ? '#ff5b2e' : '#42d9ee';
      ctx.font = '700 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(zone.id, toX(zone.center.x), toY(zone.center.y) + 4);
    });
    // Obstacles.
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    map.colliders.forEach(collider => {
      ctx.fillRect(toX(collider.minX), toY(collider.minZ), (collider.maxX - collider.minX) * scaleX, (collider.maxZ - collider.minZ) * scaleZ);
    });
    // Entities.
    const drawEntity = (entity, color, isPlayer) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(toX(entity.mesh.position.x), toY(entity.mesh.position.z), isPlayer ? 4 : 3, 0, Math.PI * 2);
      ctx.fill();
    };
    game.teamManager.get('attackers').forEach(entity => {
      if (entity.isAlive()) drawEntity(entity, '#ff6b35', entity.isPlayer);
    });
    game.teamManager.get('defenders').forEach(entity => {
      if (entity.isAlive()) drawEntity(entity, '#42d9ee', entity.isPlayer);
    });
    if (game.bomb.visible) {
      ctx.fillStyle = '#ff344b';
      ctx.fillRect(toX(game.bomb.position.x) - 3, toY(game.bomb.position.z) - 3, 6, 6);
    }
    this.elements.minimapSite.textContent = game.bomb.site ? `SITE ${game.bomb.site}` : 'SITES A / B';
  }
}
