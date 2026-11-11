import { BombState } from '../objectives/bombController.js';

export const RoundState = {
  WAITING_FOR_PLAYERS: 'waitingForPlayers',
  PREPARING: 'preparingRound',
  STARTING: 'roundStarting',
  ACTIVE: 'roundActive',
  BOMB_PLANTED: 'bombPlanted',
  ENDING: 'roundEnding',
  MATCH_FINISHED: 'matchFinished',
};

export class RoundManager {
  constructor({ teamManager, bomb, audio, settings }) {
    this.teamManager = teamManager;
    this.bomb = bomb;
    this.audio = audio;
    this.settings = settings;
    this.state = RoundState.WAITING_FOR_PLAYERS;
    this.roundNumber = 0;
    this.roundTarget = settings.get('roundTarget');
    this.timer = 0;
    this.roundTime = 95;
    this.prepTime = 3.2;
    this.endDelay = 3.4;
    this.onStateChange = null;
    this.onRoundStart = null;
    this.onRoundEnd = null;
    this.onMatchEnd = null;
  }

  setState(state) {
    if (this.state === state) return;
    this.state = state;
    this.onStateChange?.(state, this.roundNumber);
  }

  startMatch() {
    this.roundTarget = Number(this.settings.get('roundTarget'));
    this.teamManager.resetMatch();
    this.roundNumber = 0;
    this.setState(RoundState.WAITING_FOR_PLAYERS);
    this.startRound();
  }

  startRound() {
    this.roundNumber += 1;
    this.teamManager.resetRoundState();
    this.bomb.resetRound();
    this.roundTime = 95;
    this.setState(RoundState.PREPARING);
    this.timer = this.prepTime;
    this.onRoundStart?.(this.roundNumber, this.state);
    this.audio.roundStart();
  }

  activateRound() {
    this.setState(RoundState.ACTIVE);
    this.timer = this.roundTime;
    this.onRoundStart?.(this.roundNumber, this.state);
  }

  update(dt) {
    switch (this.state) {
      case RoundState.PREPARING:
        this.timer -= dt;
        if (this.timer <= 0) this.activateRound();
        break;
      case RoundState.ACTIVE:
      case RoundState.BOMB_PLANTED:
        this.timer -= dt;
        this.checkElimination();
        if (this.state === RoundState.ACTIVE && this.timer <= 0) {
          this.endRound('defenders', 'Tempo esgotado');
        }
        break;
      case RoundState.ENDING:
        this.timer -= dt;
        if (this.timer <= 0) {
          const matchWinner = this.matchWinner();
          if (matchWinner) this.finishMatch(matchWinner);
          else this.startRound();
        }
        break;
      default:
        break;
    }
  }

  checkElimination() {
    const alive = this.teamManager.playersAliveCount();
    if (alive.attackers === 0 && this.bomb.state !== BombState.PLANTED) {
      this.endRound('defenders', 'Atacantes eliminados');
      return;
    }
    if (alive.defenders === 0) {
      this.endRound('attackers', 'Defensores eliminados');
    }
  }

  onBombExploded() {
    if (this.state !== RoundState.BOMB_PLANTED) return;
    this.endRound('attackers', 'Bomba explodiu');
  }

  onBombDefused() {
    if (this.state !== RoundState.BOMB_PLANTED && this.state !== RoundState.ACTIVE) return;
    this.endRound('defenders', 'Bomba desarmada');
  }

  endRound(winnerTeam, reason) {
    if (this.state === RoundState.ENDING || this.state === RoundState.MATCH_FINISHED) return;
    this.teamManager.addScore(winnerTeam, 1);
    this.setState(RoundState.ENDING);
    this.timer = this.endDelay;
    this.onRoundEnd?.(winnerTeam, reason, this.roundNumber);
  }

  matchWinner() {
    const target = Number(this.settings.get('roundTarget'));
    if (this.teamManager.attackersScore >= target) return 'attackers';
    if (this.teamManager.defendersScore >= target) return 'defenders';
    return null;
  }

  finishMatch(winnerTeam) {
    this.setState(RoundState.MATCH_FINISHED);
    this.onMatchEnd?.(winnerTeam);
  }

  status() {
    return {
      state: this.state,
      roundNumber: this.roundNumber,
      timer: this.timer,
      roundTarget: Number(this.settings.get('roundTarget')),
      stateLabel: this.stateLabel(),
    };
  }

  stateLabel() {
    switch (this.state) {
      case RoundState.WAITING_FOR_PLAYERS: return 'PREPARANDO';
      case RoundState.PREPARING: return 'PREPARAÇÃO';
      case RoundState.STARTING: return 'INICIANDO';
      case RoundState.ACTIVE: return 'ROUND ATIVO';
      case RoundState.BOMB_PLANTED: return 'BOMBA PLANTADA';
      case RoundState.ENDING: return 'FIM DE ROUND';
      case RoundState.MATCH_FINISHED: return 'PARTIDA ENCERRADA';
      default: return 'AGUARDANDO';
    }
  }
}
