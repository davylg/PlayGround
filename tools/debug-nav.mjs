// Fine-grained probe of round transitions and bot movement.
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelector('#play-button').click();
  window.__vc.game.timeScale = 20;
});

let last = '';
for (let i = 0; i < 24; i++) {
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => {
    const { game } = window.__vc;
    const rm = game.roundManager;
    const b0 = game.bots[3];
    const b3 = game.bots[0];
    return [
      +game.elapsed.toFixed(1),
      rm.roundNumber,
      rm.state.slice(0, 4),
      +rm.phaseTimer.toFixed(1),
      +Math.round(rm.roundTime),
      game.teamManager.attackersScore + '-' + game.teamManager.defendersScore,
      'atk:' + game.teamManager.attackersAlive + '/def:' + game.teamManager.defendersAlive,
      'b0@' + b0.position.x.toFixed(0) + ',' + b0.position.z.toFixed(0),
      'b3@' + b3.position.x.toFixed(0) + ',' + b3.position.z.toFixed(0),
      game.bombController.state
    ].join(' | ');
  });
  if (info !== last) {
    console.log(info);
    last = info;
  }
}
await browser.close();
