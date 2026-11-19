const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const file = process.argv[2], shot = process.argv[3], at = +(process.argv[4] || 0.5);
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 960, height: 540 } });
  await p.goto('http://localhost:4390/__v/blank.html').catch(() => {});
  await p.setContent(`<body style="margin:0;background:#000"><video id="v" muted style="width:960px;height:540px"></video></body>`);
  const r = await p.evaluate(async ({ file, at }) => {
    const v = document.getElementById('v'); v.src = file;
    await new Promise((res, rej) => { v.onloadeddata = res; v.onerror = () => rej(new Error('video error ' + (v.error && v.error.code))); });
    v.currentTime = at; await new Promise(r => v.onseeked = r);
    const ab = await (await fetch(file)).arrayBuffer();
    let audio = null;
    try { const ctx = new OfflineAudioContext(2, 48000, 48000); const dec = await ctx.decodeAudioData(ab); let pk = 0; const d = dec.getChannelData(0); for (let i = 0; i < d.length; i += 7) pk = Math.max(pk, Math.abs(d[i])); audio = { dur: dec.duration, ch: dec.numberOfChannels, peak: +pk.toFixed(3) }; } catch (e) { audio = 'decode failed: ' + e.message; }
    return { duration: v.duration, w: v.videoWidth, h: v.videoHeight, audio };
  }, { file: 'http://localhost:4390/__v/' + file, at });
  console.log(JSON.stringify(r));
  if (shot) await p.screenshot({ path: shot });
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
