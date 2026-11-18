import { links, MAIN_ACTION } from '../content.js'

// The drawn arrow of a primary button, in its own square chip at the button's end (the button inside
// the button); index.css moves the chip and grows the arrow's stem on hover and focus.
export function Arrow() {
  return (
    <span className="btn__chip" aria-hidden="true">
      <svg className="m-arrow" viewBox="0 0 12 12">
        <path className="m-arrow__stem" d="M1 6h8" />
        <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
      </svg>
    </span>
  )
}

// The one main action, word for word everywhere: opens the clinic's own WhatsApp from its bio.
export function BookButton({ className = '', arrow = false }) {
  return (
    <a className={`btn btn--primary ${className}`.trim()} href={links.whatsapp} target="_blank" rel="noopener">
      {MAIN_ACTION}
      {arrow && <Arrow />}
    </a>
  )
}

// A responsive Unsplash photograph with its real size, so nothing shifts while it loads.
export function Photo({ photo, className, sizes = '(max-width: 1023px) 100vw, 50vw', eager = false, ...rest }) {
  const { src, w, h, alt } = photo
  const srcSet = [0.5, 0.75, 1].map((k) => `${src(Math.round(w * k), Math.round(h * k))} ${Math.round(w * k)}w`).join(', ')
  return (
    <img
      className={className}
      src={src(w, h)}
      srcSet={srcSet}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? undefined : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      data-source="stand-in"
      {...rest}
    />
  )
}

// A heading's words as plain spans, split when the page is built, so the scroll reveal
// (src/lib/motion.js) can move them one by one. The text reads the same with or without script.
export function Words({ children }) {
  return String(children)
    .split(/(\s+)/)
    .map((part, i) => (/^\s+$/.test(part) || !part ? part : <span key={i} className="w">{part}</span>))
}

// The gold line along a colour band's wave edge (the band itself is cut by a CSS mask). A background
// layer beside the section's .wrap, hidden from assistive technology.
export function BandEdge({ top = false }) {
  return (
    <img className="band-edge" src={top ? 'img/band-edge-top.svg' : 'img/band-edge.svg'} width="1440" height="900" alt="" aria-hidden="true" loading="lazy" decoding="async" />
  )
}

// The client's logo, cut from the original (design/lavier-logo-original.webp) at twice its shown size:
// the bar shows only the wordmark (LAVIER over CORPO E MENTE), the footer the whole logo.
export function Logo({ full = false }) {
  const img = full
    ? { src: 'img/lavier-logo-224.webp', width: 224, height: 231, loading: 'lazy' }
    : { src: 'img/lavier-wordmark.webp', width: 248, height: 102 }
  return (
    <a className={`nav__logo logo ${full ? 'logo--full frame--corners' : 'logo--word'}`} href="#top">
      <img {...img} alt="Lavier Corpo e Mente" />
    </a>
  )
}
