import { BOMB_STATE } from './BombController.js';

export const ROUND_STATE = {
  WAITING: 'WaitingForPlayers',
  PREPARING: 'PreparingRound',
  STARTING: 'RoundStarting',
  ACTIVE: 'RoundActive',
  BOMB_PLANTED: 'BombPlanted',
  ENDING: 'RoundEnding',
  FINISHED: 'MatchFinished'
};

const PREP_TIME = 2.2;
const START_TIME = 3.0;
const END_TIME = 4.8;
const ROUND_TIME = 90;

export class RoundManager {
  constructor(game, options = {}) {
    this.game = game;
    this.winTarget = options.winTarget || 4;
    this.roundNumber = 0;
    this.state = ROUND_STATE.WAITING;
    this.phaseTimer = 0;
    this.roundTime = ROUND_TIME;
    this.lastWinner = null;
    this.lastReason = '';
    this.matchWinner = null;
    this.checkTimer = 0;
    this.roundActive = false;
  }

  start() {
    this.roundNumber = 1;
    this.phaseTimer = 1.0;
    this.state = ROUND_STATE.WAITING;
    this.game.hud.showRoundBanner({
      kicker: 'VEM COMER · DOCA ZERO',
      title: 'PREPARANDO OPERAÇÃO',
      sub: '4 vs 4 · PRIMEIRO A 4 ROUNDS',
      color: '#ffb24a',
      time: 1
    });
    this.game.audio.setMode('game');
  }

  update(dt) {
    if (this.state === ROUND_STATE.WAITING) {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.prepareRound();
      return;
    }
    if (this.state === ROUND_STATE.PREPARING) {
      this.phaseTimer -= dt;
      if (this.phaseTimer <= 0) this.beginStarting();
      return;
    }
    if (this.state === ROUND_STATE.STARTING) {
      this.phaseTimer -= dt;
      this.game.hud.setCountdown(Math.max(0, Math.ceil(this.phaseTimer)));
      if (this.phaseTimer <= 0) this.beginActive();
      return;
    }
    if (this.state === ROUND_STATE.ACTIVE || this.state === ROUND_STATE.BOMB_PLANTED) {
      this.roundTime = Math.max(0, this.roundTime - dt);
      this.checkTimer -= dt;
      if (this.checkTimer <= 0) {
        this.checkTimer = 0.35;
        this.checkElimination();
      }
      if (this.state === ROUND_STATE.ACTIVE && this.roundTime <= 0) {
        this.endRound('defenders', 'TEMPO ESGOTADO');
      }
      this.game.hud.updateRound(this);
      return;
    }
    if (this.state === ROUND_STATE.ENDING) {
      this.phaseTimer -= dt;
      this.game.hud.updateRound(this);
      if (this.phaseTimer <= 0) {
        if (this.game.teamManager.getTeam(this.lastWinner).score >= this.winTarget) {
          this.finishMatch(this.lastWinner);
        } else {
          this.roundNumber += 1;
          this.prepareRound();
        }
      }
      return;
    }
  }

  prepareRound() {
    this.state = ROUND_STATE.PREPARING;
    this.phaseTimer = PREP_TIME;
    this.roundTime = ROUND_TIME;
    this.roundActive = false;
    this.game.controlsEnabled = false;
    this.game.input.setEnabled(false);
    this.game.resetRound();
    this.game.hud.hideMatchResult();
    this.game.hud.setCountdown(null);
    this.game.hud.showRoundBanner({
      kicker: `ROUND ${this.roundNumber} · ${this.game.teamManager.attackersScore} — ${this.game.teamManager.defendersScore}`,
      title: 'PREPARE-SE',
      sub: this.game.player.team === 'attackers' ? 'ATAQUE · PLANTE A BOMBA NOS SITES A OU B' : 'DEFESA · IMPEÇA O PLANT E DESARME A BOMBA',
      color: this.game.player.team === 'attackers' ? '#ff633f' : '#4adfff',
      time: PREP_TIME
    });
  }

  beginStarting() {
    this.state = ROUND_STATE.STARTING;
    this.phaseTimer = START_TIME;
    this.game.hud.showRoundBanner({
      kicker: `ROUND ${this.roundNumber}`,
      title: '',
      sub: '',
      color: '#ffffff',
      time: 0
    });
  }

  beginActive() {
    this.state = ROUND_STATE.ACTIVE;
    this.roundActive = true;
    this.phaseTimer = 0;
    this.roundTime = ROUND_TIME;
    this.game.controlsEnabled = true;
    this.game.input.setEnabled(true);
    this.game.hud.setCountdown(null);
    this.game.hud.hideRoundBanner();
    this.game.audio.sfx('roundStart');
    this.game.hud.notify(this.game.player.team === 'attackers' ? 'ATAQUE · PLANTA A BOMBA' : 'DEFESA · PROTEGE OS SITES', this.game.player.team === 'attackers' ? '#ff633f' : '#4adfff', 3);
    this.game.hud.updateRound(this);
  }

  checkElimination() {
    const attackers = this.game.teamManager.attackersAlive;
    const defenders = this.game.teamManager.defendersAlive;
    if (defenders === 0 && this.state === ROUND_STATE.ACTIVE) {
      this.endRound('attackers', 'DEFESA ELIMINADA');
    } else if (defenders === 0 && this.state === ROUND_STATE.BOMB_PLANTED) {
      this.endRound('attackers', 'DEFESA ELIMINADA');
    } else if (attackers === 0 && this.state === ROUND_STATE.ACTIVE) {
      this.endRound('defenders', 'ATAQUE ELIMINADO');
    }
  }

  onBombPlanted(site) {
    this.state = ROUND_STATE.BOMB_PLANTED;
    this.game.controlsEnabled = true;
    this.game.input.setEnabled(true);
    this.game.hud.showAlert('BOMBA PLANTADA', `SITE ${site.id} · ${this.game.bombController.timer.toFixed(0)}s`, '#ff633f');
  }

  onBombExploded() {
    this.endRound('attackers', 'BOMBA DETONADA');
  }

  onBombDefused() {
    this.endRound('defenders', 'BOMBA DESARMADA');
  }

  endRound(winner, reason) {
    if (this.state === ROUND_STATE.ENDING || this.state === ROUND_STATE.FINISHED) return;
    this.lastWinner = winner;
    this.lastReason = reason;
    this.state = ROUND_STATE.ENDING;
    this.phaseTimer = END_TIME;
    this.controlsEnabled = false;
    this.roundActive = false;
    this.game.controlsEnabled = false;
    this.game.input.setEnabled(false);
    this.game.teamManager.addScore(winner);
    const color = winner === 'attackers' ? '#ff633f' : '#4adfff';
    this.game.hud.showRoundResult({
      winner,
      label: winner.toUpperCase(),
      reason,
      scores: [this.game.teamManager.attackersScore, this.game.teamManager.defendersScore],
      color,
      isPlayerWin: winner === this.game.player.team,
      round: this.roundNumber
    });
    this.game.audio.sfx(winner === this.game.player.team ? 'victory' : 'defeat');
    this.game.onRoundEnd(winner, reason);
    if (this.game.teamManager.getTeam(winner).score >= this.winTarget) {
      // The result overlay is followed by the match overlay after END_TIME.
    }
  }

  finishMatch(winner) {
    if (this.state === ROUND_STATE.FINISHED) return;
    this.state = ROUND_STATE.FINISHED;
    this.matchWinner = winner;
    this.game.controlsEnabled = false;
    this.game.input.setEnabled(false);
    this.game.hud.showMatchResult({
      winner,
      isPlayerWin: winner === this.game.player.team,
      scores: [this.game.teamManager.attackersScore, this.game.teamManager.defendersScore],
      scoreboard: this.game.teamManager.getScoreboard(),
      team: this.game.player.team
    });
    this.game.audio.sfx(winner === this.game.player.team ? 'victory' : 'defeat');
  }

  canPlant() {
    return this.state === ROUND_STATE.ACTIVE && this.game.bombController.state === BOMB_STATE.NOT_PLANTED;
  }

  canDefuse() {
    return this.state === ROUND_STATE.BOMB_PLANTED && this.game.bombController.state === BOMB_STATE.PLANTED;
  }

  canUseAbilities() {
    return this.state === ROUND_STATE.ACTIVE || this.state === ROUND_STATE.BOMB_PLANTED;
  }

  canShoot() {
    return this.state === ROUND_STATE.ACTIVE || this.state === ROUND_STATE.BOMB_PLANTED;
  }

  get isRoundActive() {
    return this.state === ROUND_STATE.ACTIVE || this.state === ROUND_STATE.BOMB_PLANTED;
  }
}
