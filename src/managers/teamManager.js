export class TeamManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.attackers = [];
    this.defenders = [];
    this.attackersScore = 0;
    this.defendersScore = 0;
    this.roundAttackersWins = 0;
  }

  register(entity, team) {
    if (team === 'attackers') this.attackers.push(entity);
    else this.defenders.push(entity);
  }

  unregister(entity) {
    this.attackers = this.attackers.filter(e => e !== entity);
    this.defenders = this.defenders.filter(e => e !== entity);
  }

  clear() {
    this.attackers = [];
    this.defenders = [];
  }

  alive(team) {
    return this.get(team).filter(entity => entity.isAlive && entity.isAlive()).length;
  }

  get(team) {
    return team === 'attackers' ? this.attackers : this.defenders;
  }

  opponent(team) {
    return team === 'attackers' ? 'defenders' : 'attackers';
  }

  player(team) {
    return this.get(team).find(entity => entity.isPlayer);
  }

  playersAliveCount() {
    return {
      attackers: this.alive('attackers'),
      defenders: this.alive('defenders'),
    };
  }

  addScore(team, amount = 1) {
    if (team === 'attackers') this.attackersScore += amount;
    else this.defendersScore += amount;
  }

  resetRoundState() {
    [...this.attackers, ...this.defenders].forEach(entity => {
      if (entity.resetRound) entity.resetRound();
    });
  }

  resetMatch() {
    this.attackersScore = 0;
    this.defendersScore = 0;
  }
}
