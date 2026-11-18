import { useEffect, useState } from 'react'
import { motion as Motion, MotionConfig } from 'framer-motion'
import { cn } from '@/lib/utils.js'

// The menu's links as a "tubelight" pill (after the Tubelight Navbar on 21st.dev): a soft lamp of the
// brand's gold glows over the link of the section on screen, and slides to the next one as the page
// scrolls or a link is clicked. It sits in the site's own top bar, between the logo and the booking
// button, from 1024px up; below that the bar's Menu button opens the full-screen list (system.js).
// An item may carry `menu`, a panel that opens under the bar on hover or focus (the kit's .nav__menu;
// the item is not a .nav__item, so system.js leaves it alone and index.css opens the panel).
export function NavBar({ items, className }) {
  const [active, setActive] = useState(null)

  // scroll spy: the lit link follows the section that holds the middle of the screen
  useEffect(() => {
    const sections = items.map((item) => document.querySelector(item.url)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(`#${hit.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <MotionConfig reducedMotion="user">
      <nav className={cn('tubelight', className)} aria-label="Seções">
        {items.map((item) => {
          const isActive = active === item.url
          return (
            <div key={item.name} className="tubelight__item">
              <a
                href={item.url}
                onClick={() => setActive(item.url)}
                className={cn('tubelight__link', isActive && 'is-active')}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="tubelight__label">{item.name}</span>
                {item.menu && (
                  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {isActive && (
                  <Motion.span
                    layoutId="lamp"
                    className="tubelight__lamp"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-hidden="true"
                  >
                    <span className="tubelight__bar">
                      <span className="tubelight__glow tubelight__glow--wide" />
                      <span className="tubelight__glow tubelight__glow--mid" />
                      <span className="tubelight__glow tubelight__glow--core" />
                    </span>
                  </Motion.span>
                )}
              </a>
              {item.menu}
            </div>
          )
        })}
      </nav>
    </MotionConfig>
  )
}
