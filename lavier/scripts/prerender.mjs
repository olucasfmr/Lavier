// Turns the client build into a static page: the React tree is rendered to HTML at build time and
// React's bundle is dropped (the page needs no React in the browser). The page keeps two kinds of
// script: the design kit's plain modules from public/assets, and src/client.js (smooth scroll and
// parallax), whose built file and chunks the Vite manifest names.
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const { render } = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href)

// the client entry and every chunk it imports stay; any other built script goes
const manifest = JSON.parse(readFileSync(resolve(dist, '.vite/manifest.json'), 'utf8'))
const client = manifest['src/client.js']
if (!client) throw new Error('prerender: src/client.js is missing from the Vite manifest')
const keep = new Set()
const walk = (key) => {
  const entry = manifest[key]
  if (!entry || keep.has(entry.file)) return
  keep.add(entry.file)
  for (const k of entry.imports || []) walk(k)
}
walk('src/client.js')

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
