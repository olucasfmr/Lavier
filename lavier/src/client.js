// The built page's only bundled script: the page itself is static HTML (scripts/prerender.mjs), so the
// smooth scroll and the parallax start here instead of in React's effect.
import { initParallax } from '@/lib/parallax.js'

initParallax(document)
