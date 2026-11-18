import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// The page's scroll motion, every piece tied to the scroll position (scrubbed), so scrolling reads as
// one continuous movement instead of sections popping in. Started once for the whole page, by React's
// effect in dev and by src/client.js on the built page. Under reduced motion nothing runs: the page
// scrolls natively and everything rests in its finished state (the markup and CSS never hide anything;
// only these tweens set a starting state).

// parallax: how far each layer travels (% of its own height) while its section scrolls past the top
const LAYERS = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 40 },
  { layer: '4', yPercent: 10 },
]

// the manifesto's resting dim state: creme words on the dark green still read 3:1 or more
const FILL_FROM = 0.62
// a heading's words before they come up: still 3:1 or more on every ground of the page (the italic
// accents are lighter colours, so they start closer to full)
const WORDS_FROM = 0.7
const WORDS_FROM_ACCENT = 0.86

function parallax(root) {
  root.querySelectorAll('[data-parallax-layers]').forEach((trigger) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger, start: '0% 0%', end: '100% 0%', scrub: 0 } })
    LAYERS.forEach(({ layer, yPercent }, i) => {
      const targets = trigger.querySelectorAll(`[data-parallax-layer="${layer}"]`)
      if (targets.length) tl.to(targets, { yPercent, ease: 'none' }, i === 0 ? undefined : '<')
    })
  })
}

// a circle opens over the photograph as its band comes up the screen (the circle of the logo)
function maskReveal(root) {
  root.querySelectorAll('[data-mask-reveal]').forEach((el) => {
    const trigger = el.closest('section') || el
    gsap.fromTo(el, { clipPath: 'circle(16% at 50% 50%)' }, {
      clipPath: 'circle(75% at 50% 50%)', ease: 'none',
      scrollTrigger: { trigger, start: 'top 90%', end: 'top 10%', scrub: 0.6 },
    })
  })
}

// the quote's words fill in, one after another, as the reader scrolls past them
function textFill(root) {
  root.querySelectorAll('[data-fill]').forEach((el) => {
    const trigger = el.closest('section') || el
    gsap.fromTo(el.querySelectorAll('.w'), { opacity: FILL_FROM }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger, start: 'top 45%', end: 'bottom 65%', scrub: 0.6 },
    })
  })
}

// a gold line draws down the steps; each marker turns from rosé to gold when the line reaches it
function timelineDraw(root) {
  root.querySelectorAll('[data-timeline]').forEach((list) => {
    const items = [...list.querySelectorAll('li')]
    if (!items.length) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 } })
    tl.fromTo(list, { '--draw': 0 }, { '--draw': 1, ease: 'none', duration: 1 }, 0)
    const height = list.offsetHeight || 1
    items.forEach((li) => {
      const at = Math.min(0.95, li.offsetTop / height)
      tl.fromTo(li, { '--lit': 0 }, { '--lit': 1, ease: 'none', duration: 0.08 }, at)
    })
  })
}

// a section heading's words come up one by one over a short stretch of scroll as it comes on screen;
// tied to the scroll with no lag, so a heading is always whole once it reaches its place
function wordsReveal(root) {
  root.querySelectorAll('[data-words]').forEach((h) => {
    gsap.fromTo(h.querySelectorAll('.w'), { opacity: (i, el) => (el.closest('em, .muted') ? WORDS_FROM_ACCENT : WORDS_FROM) }, {
      opacity: 1, ease: 'none', stagger: 0.08,
      scrollTrigger: { trigger: h, start: 'top 95%', end: 'top 68%', scrub: true },
    })
  })
}

// measure every scroll trigger again (after a part of the page changed height)
export function refreshMotion() {
  ScrollTrigger.refresh()
}

// the footer's brand block and link columns come out of a blur, one after another, as the footer
// arrives (the Sticky Footer's entrance); its content is fixed on a desktop, so the footer box triggers
function footerReveal(root) {
  root.querySelectorAll('footer [data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: -8, filter: 'blur(4px)', duration: 0.8, ease: 'power2.out', delay: parseFloat(el.dataset.reveal) || 0,
      scrollTrigger: { trigger: el.closest('footer'), start: 'top 75%', once: true },
    })
  })
}

// keyboard: on a desktop the footer's content is fixed under the page, so a focused link in it could sit
// behind the page; bring the footer up whenever something in it takes the focus
function keepFooterFocusVisible(root) {
  const footer = root.querySelector('footer.sticky-footer')
  if (!footer) return () => {}
  const show = () => { if (footer.getBoundingClientRect().bottom > innerHeight + 1) footer.scrollIntoView({ block: 'end' }) }
  footer.addEventListener('focusin', show)
  return () => footer.removeEventListener('focusin', show)
}

export function initMotion(root = document) {
  if (typeof window === 'undefined') return () => {}
  const unfocus = keepFooterFocusVisible(root)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return unfocus

  gsap.registerPlugin(ScrollTrigger)
  const ctx = gsap.context(() => {
    parallax(root)
    maskReveal(root)
    textFill(root)
    timelineDraw(root)
    wordsReveal(root)
    footerReveal(root)
  })

  const lenis = new Lenis()
  const raf = (time) => lenis.raf(time * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // positions change once photographs and the faces arrive: measure the triggers again then
  const refresh = () => ScrollTrigger.refresh()
  if (document.readyState !== 'complete') window.addEventListener('load', refresh, { once: true })
  document.fonts?.ready.then(refresh)

  return () => {
    unfocus()
    ctx.revert()
    gsap.ticker.remove(raf)
    lenis.destroy()
    window.removeEventListener('load', refresh)
  }
}
