const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 1440, height: 540 } });
  await p.goto('http://localhost:4390/__v/encode.html?n=0');
  const info = await p.evaluate(async () => {
    const times = [0, 1.0, 3.0, 5.0, 7.9, 10.6, 12.0, 14.3, 16.2, 17.6, 19.0, 20.3];
    const v = document.createElement('video'); v.muted = true; v.src = '/__v/out/brag.mp4';
    await new Promise(r => v.onloadeddata = r);
    const c = document.createElement('canvas'); c.width = 1440; c.height = 540; const x = c.getContext('2d');
    for (let i = 0; i < times.length; i++) { v.currentTime = times[i] + 0.001; await new Promise(r => v.onseeked = r); x.drawImage(v, (i % 4) * 360, Math.floor(i / 4) * 180, 360, 180); x.fillStyle = '#000'; x.fillText(times[i] + 's', (i % 4) * 360 + 6, Math.floor(i / 4) * 180 + 14); }
    document.body.style.margin = 0; document.body.innerHTML = ''; document.body.append(c);
    return { duration: v.duration };
  });
  console.log(JSON.stringify(info));
  await p.screenshot({ path: 'out/sheet.png' });
  await b.close();
})();
