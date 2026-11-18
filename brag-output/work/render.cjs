// Captures the video page frame by frame in headless Chrome (reduced motion, so the site rests still
// and every frame is a pure function of t).
//   node render.cjs stills 1.0 5.5 ...   -> work/stills/t-1.00.jpg
//   node render.cjs frames [from] [to]   -> work/frames/00000.jpg (30 fps)
const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const FPS = 30, DUR = 21;
(async () => {
  const [mode, ...args] = process.argv.slice(2);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  page.on('console', m => { if (m.type() === 'error') console.log('page error:', m.text()); });
  await page.goto('http://localhost:4390/__v/video.html');
  console.log('anchors', JSON.stringify(await page.evaluate(() => window.ready)));
  const shot = async (t, file) => {
    await page.evaluate(t => window.renderAt(t), t);
    await page.screenshot({ path: file, type: 'jpeg', quality: 94 });
  };
  if (mode === 'stills') {
    const dir = path.join(__dirname, 'stills'); fs.mkdirSync(dir, { recursive: true });
    for (const a of args) { const t = parseFloat(a); await shot(t, path.join(dir, `t-${t.toFixed(2)}.jpg`)); console.log('still', t); }
  } else {
    const dir = path.join(__dirname, 'frames'); fs.mkdirSync(dir, { recursive: true });
    const n = Math.round(DUR * FPS), from = +(args[0] || 0), to = +(args[1] || n);
    const t0 = Date.now();
    for (let i = from; i < to; i++) {
      await shot(i / FPS, path.join(dir, String(i).padStart(5, '0') + '.jpg'));
      if (i % 60 === 0) console.log('frame', i, ((Date.now() - t0) / 1000).toFixed(0) + 's');
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
