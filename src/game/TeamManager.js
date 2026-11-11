export class TeamManager {
  constructor() {
    this.teams = {
      attackers: { id: 'attackers', label: 'ATTACKERS', color: '#ff633f', members: [], score: 0 },
      defenders: { id: 'defenders', label: 'DEFENDERS', color: '#4adfff', members: [], score: 0 }
    };
  }

  reset() {
    this.teams.attackers.score = 0;
    this.teams.defenders.score = 0;
    for (const team of Object.values(this.teams)) {
      for (const m of team.members) {
        m.kills = 0;
        m.deaths = 0;
      }
    }
  }

  register(combatant, teamId) {
    const team = this.teams[teamId];
    if (!team) return;
    team.members.push(combatant);
    combatant.team = teamId;
  }

  getTeam(id) {
    return this.teams[id];
  }

  getAttackers() {
    return this.teams.attackers.members;
  }

  getDefenders() {
    return this.teams.defenders.members;
  }

  get attackersAlive() {
    return this.teams.attackers.members.filter((m) => m.isAlive).length;
  }

  get defendersAlive() {
    return this.teams.defenders.members.filter((m) => m.isAlive).length;
  }

  get attackersScore() {
    return this.teams.attackers.score;
  }

  get defendersScore() {
    return this.teams.defenders.score;
  }

  addScore(teamId) {
    this.teams[teamId].score += 1;
  }

  getMemberCount(teamId) {
    return this.teams[teamId].members.length;
  }

  getScoreboard() {
    return [...this.teams.attackers.members, ...this.teams.defenders.members]
      .map((m) => ({ name: m.name, team: m.team, kills: m.kills || 0, deaths: m.deaths || 0, isPlayer: !!m.isPlayer, character: m.character }))
      .sort((a, b) => b.kills - a.kills);
  }
}
