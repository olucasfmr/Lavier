// Turns the client build into a static page: the whole React tree is rendered to HTML at build time,
// and the full-page React bundle is dropped. The page keeps two kinds of script: the design kit's plain
// modules from public/assets, and src/client.jsx (the React islands, the tubelight menu and the FAQ
// accordion, plus the scroll motion), whose built file and chunks the Vite manifest names.
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const { render } = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href)

// the client entry and every chunk it imports or loads later stay; any other built script goes
const manifest = JSON.parse(readFileSync(resolve(dist, '.vite/manifest.json'), 'utf8'))
const client = manifest['src/client.jsx']
if (!client) throw new Error('prerender: src/client.jsx is missing from the Vite manifest')
const keep = new Set()
const walk = (key) => {
  const entry = manifest[key]
  if (!entry || keep.has(entry.file)) return
  keep.add(entry.file)
  for (const k of [...(entry.imports || []), ...(entry.dynamicImports || [])]) walk(k)
}
walk('src/client.jsx')

const scripts = ['assets/system.js', 'assets/motion/motion.js', 'assets/layout/layout.js', client.file]
  .map((src) => `<script type="module" src="${src}"></script>`)
  .join('\n')

let html = readFileSync(resolve(dist, 'index.html'), 'utf8')
html = html
  .replace(/<script type="module" crossorigin src="[^"]+"><\/script>\n?/, '')
  .replace(/<link rel="modulepreload" crossorigin href="\.\/build\/[^"]+">\n?/g, '')
  .replace('<div id="root"><!--app--></div>', `${render()}\n${scripts}`)

if (html.includes('<!--app-->')) throw new Error('prerender: the #root placeholder was not found')
writeFileSync(resolve(dist, 'index.html'), html)
rmSync(resolve('.ssr'), { recursive: true, force: true })
rmSync(resolve(dist, '.vite'), { recursive: true, force: true })
for (const f of readdirSync(resolve(dist, 'build'))) {
  if (f.endsWith('.js') && !keep.has(`build/${f}`)) rmSync(resolve(dist, 'build', f))
}
console.log('prerendered dist/index.html with', client.file)
