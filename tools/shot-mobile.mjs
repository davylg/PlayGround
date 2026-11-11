// Force touch-device UI and capture mobile menu + game screens.
import { createRequire } from 'module';
const require = createRequire('/home/runner/.local/share/omgithub-playwright/node_modules/');
const { chromium } = require('playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox', '--no-sandbox']
});
const page = await browser.newPage({ viewport: { width: 844, height: 390 } });
page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 30000 });
await page.evaluate(() => {
  const key = 'vemcomer.settings.v1';
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data.showMobileControls = 'on';
  localStorage.setItem(key, JSON.stringify(data));
});
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(3000);
await page.screenshot({ path: 'screenshots/mobile-menu.jpg', type: 'jpeg', quality: 88, timeout: 25000 });
await page.evaluate(() => {
  document.querySelector('#play-button').click();
  window.__vc.game.timeScale = 8;
});
await page.waitForTimeout(6000);
await page.screenshot({ path: 'screenshots/mobile-game.jpg', type: 'jpeg', quality: 88, timeout: 25000 });
console.log('saved');
await browser.close();
