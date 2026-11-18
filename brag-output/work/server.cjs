// Static server for the video: the built site at /, the video pages at /__v/, the fonts at /__f/,
// and POST /__save?name=x writes the body into work/out/x.
const http = require('http'), fs = require('fs'), path = require('path');
const WORK = __dirname, SITE = path.resolve(WORK, '../../lavier/dist'), FONTS = path.resolve(WORK, '../../lavier/node_modules');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.wav': 'audio/wav', '.json': 'application/json' };
fs.mkdirSync(path.join(WORK, 'out'), { recursive: true });
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'POST' && url.pathname === '/__save') {
    const name = path.basename(url.searchParams.get('name') || 'out.bin');
    const out = fs.createWriteStream(path.join(WORK, 'out', name));
    req.pipe(out); out.on('finish', () => { res.end('ok'); });
    return;
  }
  let p = decodeURIComponent(url.pathname), base = SITE;
  if (p.startsWith('/__v/')) { base = WORK; p = p.slice(4); }
  else if (p.startsWith('/__f/')) { base = FONTS; p = p.slice(4); }
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(base, p);
  if (!file.startsWith(base)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(data);
  });
}).listen(4390, () => console.log('video server on http://localhost:4390'));
