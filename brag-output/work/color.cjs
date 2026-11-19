const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const [file, frame, t] = process.argv.slice(2);
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage();
  await p.goto('http://localhost:4390/__v/encode.html?n=0');
  const r = await p.evaluate(async ({ file, frame, t }) => {
    const pts = [[100, 100], [960, 540], [1700, 900], [300, 800]];
    const grab = src => { const c = new OffscreenCanvas(1920, 1080), x = c.getContext('2d'); x.drawImage(src, 0, 0, 1920, 1080); return pts.map(([a, b]) => [...x.getImageData(a, b, 1, 1).data.slice(0, 3)]); };
    const img = await createImageBitmap(await (await fetch(frame)).blob());
    const v = document.createElement('video'); v.muted = true; v.src = file;
    await new Promise(r => v.onloadeddata = r); v.currentTime = +t; await new Promise(r => v.onseeked = r);
    return { orig: grab(img), video: grab(v), meta: v.videoWidth };
  }, { file, frame, t });
  console.log(JSON.stringify(r));
  await b.close();
})();
