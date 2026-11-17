import { links, MAIN_ACTION } from '../content.js'

// The drawn arrow of the kit's primary button (motion.css animates it on hover).
export function Arrow() {
  return (
    <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path className="m-arrow__stem" d="M1 6h8" />
      <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
    </svg>
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

// The footer shows the name alone: the 13px initial tile there sits beside the line and reads as a stray dot.
export function Logo({ mark = true }) {
  return (
    <a className="nav__logo" href="#top">
      {mark && <span className="mark mark--initial" aria-hidden="true">L</span>}Lavier
    </a>
  )
}
