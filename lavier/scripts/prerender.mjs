// Turns the client build into a static page: the React tree is rendered to HTML at build time,
// the client bundle is dropped (the page needs no React in the browser), and the design kit's
// scripts are linked in its place, as plain module files from public/assets.
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const { render } = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href)

const kit = ['assets/system.js', 'assets/motion/motion.js', 'assets/layout/layout.js']
  .map((src) => `<script type="module" src="${src}"></script>`)
  .join('\n')

let html = readFileSync(resolve(dist, 'index.html'), 'utf8')
html = html
  .replace(/<script type="module" crossorigin src="[^"]+"><\/script>\n?/, '')
  .replace(/<link rel="modulepreload" crossorigin href="\.\/build\/[^"]+">\n?/g, '')
  .replace('<div id="root"><!--app--></div>', `${render()}\n${kit}`)

if (html.includes('<!--app-->')) throw new Error('prerender: the #root placeholder was not found')
writeFileSync(resolve(dist, 'index.html'), html)
rmSync(resolve('.ssr'), { recursive: true, force: true })
// the client bundle is not referenced any more: remove it from the build
for (const f of readdirSync(resolve(dist, 'build'))) if (f.endsWith('.js')) rmSync(resolve(dist, 'build', f))
console.log('prerendered dist/index.html')
