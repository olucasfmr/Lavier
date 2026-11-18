// The built page's bundled script. The page itself is static HTML (scripts/prerender.mjs): the scroll
// motion and smooth scroll start at once; React and the two islands (the tubelight menu and the FAQ
// accordion) load right after, so they never hold up the first paint. The FAQ shrinks when its answers
// fold into the accordion, so the scroll triggers are measured again then.
import { initMotion, refreshMotion } from '@/lib/motion.js'

initMotion(document)

const islands = () => import('./islands.jsx').then((m) => { m.mount(); requestAnimationFrame(() => requestAnimationFrame(refreshMotion)) })
if ('requestIdleCallback' in window) requestIdleCallback(islands, { timeout: 1500 })
else setTimeout(islands, 200)
