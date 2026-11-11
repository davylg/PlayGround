export class MobileInteractionController {
  constructor({ hud, mobileInput }) {
    this.hud = hud;
    this.mobileInput = mobileInput;
  }

  update({ player, bomb, round }) {
    if (!player.isAlive()) {
      this.hud.hidePrompt();
      this.mobileInput.hideInteract();
      return;
    }
    const isAttacker = player.team === 'attackers';
    if (round.state === 'preparingRound') {
      this.hud.hidePrompt();
      this.mobileInput.hideInteract();
      return;
    }
    if (isAttacker && bomb.canPlant(player)) {
      const label = bomb.state === 'planting' ? 'PLANTANDO' : 'PLANTAR';
      this.hud.showPrompt({
        key: 'E',
        title: 'PLANTAR BOMBA',
        sub: 'Mantenha pressionado até concluir',
        progress: bomb.state === 'planting' ? bomb.plantProgress / 3.2 : 0,
      });
      this.mobileInput.showInteract(label);
      return;
    }
    if (!isAttacker && bomb.canDefuse(player)) {
      const label = bomb.state === 'defusing' ? 'DESARMANDO' : 'DESARMAR';
      this.hud.showPrompt({
        key: 'E',
        title: 'DESARMAR BOMBA',
        sub: 'Mantenha pressionado até concluir',
        progress: bomb.state === 'defusing' ? bomb.defuseProgress / 5 : 0,
      });
      this.mobileInput.showInteract(label);
      return;
    }
    this.hud.hidePrompt();
    this.mobileInput.hideInteract();
  }
}
