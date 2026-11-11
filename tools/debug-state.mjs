// Launch a match with accelerated time and dump game state over one round.
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') console.log(`[console.error] ${m.text()}`);
});
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelector('#play-button').click();
  window.__vc.game.timeScale = 30;
});

let shot = 0;
for (let i = 0; i < 20; i++) {
  await page.waitForTimeout(4000);
  const state = await page.evaluate(() => {
    const { game } = window.__vc;
    return {
      elapsed: +game.elapsed.toFixed(1),
      roundState: game.roundManager?.state,
      roundNumber: game.roundManager?.roundNumber,
      score: [game.teamManager?.attackersScore, game.teamManager?.defendersScore],
      roundTime: +Math.round(game.roundManager?.roundTime || 0),
      bombState: game.bombController?.state,
      bombTimer: game.bombController?.timer >= 0 ? +game.bombController.timer.toFixed(0) : null,
      playerAlive: game.player?.isAlive,
      playerHp: game.player?.health,
      playerPos: game.player?.position?.toArray?.().map((n) => +n.toFixed(1)),
      alive: {
        atk: game.teamManager?.attackersAlive,
        def: game.teamManager?.defendersAlive
      },
      killfeed: game.hud?.killfeed?.slice?.(-3) || null
    };
  });
  console.log(JSON.stringify(state));
}
await browser.close();
