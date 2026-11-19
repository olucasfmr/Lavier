const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 360 } });
  await p.goto('http://localhost:4390/__v/encode.html?n=0');
  const info = await p.evaluate(async () => {
    const v = document.createElement('video'); v.muted = true; v.src = '/__v/out/brag.mp4'; document.body.append(v);
    await new Promise(r => v.oncanplay = r);
    const c = document.createElement('canvas'); c.width = 1440; c.height = 360; const x = c.getContext('2d');
    const marks = [0.6, 2.5, 5.5, 9.5, 11.5, 14.0, 16.0, 19.0]; const got = [];
    v.playbackRate = 2; await v.play();
    await new Promise(res => { const tick = (now, meta) => { if (got.length < marks.length && meta.mediaTime >= marks[got.length]) { const k = got.length; x.drawImage(v, (k % 4) * 360, Math.floor(k / 4) * 180, 360, 180); got.push(+meta.mediaTime.toFixed(2)); } if (got.length >= marks.length || v.ended) res(); else v.requestVideoFrameCallback(tick); }; v.requestVideoFrameCallback(tick); });
    document.body.innerHTML = ''; document.body.style.margin = 0; document.body.append(c);
    return got;
  });
  console.log(JSON.stringify(info));
  await p.screenshot({ path: 'out/play.png' });
  await b.close();
})();
