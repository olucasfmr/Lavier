const { chromium } = require(process.env.APPDATA + '/npm/node_modules/@playwright/cli/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage();
  await p.goto('http://localhost:4173/');
  const r = await p.evaluate(async () => {
    const v = await VideoEncoder.isConfigSupported({ codec: 'avc1.640028', width: 1920, height: 1080, bitrate: 12e6, framerate: 30 });
    const v2 = await VideoEncoder.isConfigSupported({ codec: 'avc1.4d0028', width: 1920, height: 1080, bitrate: 12e6, framerate: 30 });
    const a = await AudioEncoder.isConfigSupported({ codec: 'mp4a.40.2', sampleRate: 48000, numberOfChannels: 2, bitrate: 192000 });
    return { v: v.supported, v2: v2.supported, a: a.supported, ua: navigator.userAgent };
  });
  console.log(JSON.stringify(r));
  await b.close();
})();
