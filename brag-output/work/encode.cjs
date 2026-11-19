// Runs encode.html in headless Chrome: node encode.cjs <frames> <poster.jpg relative to work/>
const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const [n = '630', poster = ''] = process.argv.slice(2);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  page.on('console', m => console.log(m.text()));
  page.on('pageerror', e => console.log('pageerror', e.message));
  await page.goto(`http://localhost:4390/__v/encode.html?n=${n}&poster=${encodeURIComponent(poster)}`);
  const r = await page.evaluate(() => window.done);
  console.log('done', JSON.stringify(r));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
