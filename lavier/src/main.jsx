import './index.css'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Dev only: the production page is prerendered to static HTML (scripts/prerender.mjs) and ships no
// React runtime. Here the page renders first, then the design kit's scripts run over the finished DOM,
// exactly as they do on the built page.
const root = document.getElementById('root')
flushSync(() => createRoot(root).render(<App />))
// The built page has no wrapper: the kit's selectors (body > nav.actionbar) need the page's nodes as body children.
root.replaceWith(...root.childNodes)

for (const src of ['assets/system.js', 'assets/motion/motion.js', 'assets/layout/layout.js']) {
  const s = document.createElement('script')
  s.type = 'module'
  s.src = src
  document.body.append(s)
}
