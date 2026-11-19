const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 1440, height: 180 } });
  await p.goto('http://localhost:4390/__v/encode.html?n=0');
  const r = await p.evaluate(async () => {
    const v = document.createElement('video'); v.muted = true; v.src = '/__v/out/brag.mp4'; document.body.append(v);
    await new Promise(r => v.onloadeddata = r);
    const c = document.createElement('canvas'); c.width = 1440; c.height = 180; const x = c.getContext('2d'); const out = [];
    for (const [k, t] of [10.6, 3.0, 15.5, 20.3].entries()) {
      const shown = new Promise(res => v.requestVideoFrameCallback((n, m) => res(m.mediaTime)));
      v.currentTime = t; await new Promise(r => v.onseeked = r);
      const mt = await Promise.race([shown, new Promise(r => setTimeout(() => r('no frame callback'), 3000))]);
      x.drawImage(v, k * 360, 0, 360, 180); out.push([t, mt]);
    }
    document.body.innerHTML = ''; document.body.style.margin = 0; document.body.append(c);
    return out;
  });
  console.log(JSON.stringify(r));
  await p.screenshot({ path: 'out/seek.png' });
  await b.close();
})();
