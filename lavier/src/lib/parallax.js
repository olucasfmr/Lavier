import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// How far each layer travels (in % of its own height) while its section scrolls past the top of the
// screen: the photograph farthest back moves most, the front shape least, so the layers part in depth.
const LAYERS = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 40 },
  { layer: '4', yPercent: 10 },
]

// Smooth scrolling for the whole page (Lenis, driven by GSAP's ticker) and the layered parallax of
// every [data-parallax-layers] block inside root. Returns a cleanup for React's effect. Under reduced
// motion nothing runs: the page scrolls natively and the layers rest where the CSS puts them.
export function initParallax(root = document) {
  if (typeof window === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  gsap.registerPlugin(ScrollTrigger)

  const timelines = [...root.querySelectorAll('[data-parallax-layers]')].map((trigger) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger, start: '0% 0%', end: '100% 0%', scrub: 0 } })
    LAYERS.forEach(({ layer, yPercent }, i) => {
      const targets = trigger.querySelectorAll(`[data-parallax-layer="${layer}"]`)
      if (targets.length) tl.to(targets, { yPercent, ease: 'none' }, i === 0 ? undefined : '<')
    })
    return tl
  })

  const lenis = new Lenis()
  const raf = (time) => lenis.raf(time * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    timelines.forEach((tl) => { tl.scrollTrigger?.kill(); tl.kill() })
    gsap.ticker.remove(raf)
    lenis.destroy()
  }
}
