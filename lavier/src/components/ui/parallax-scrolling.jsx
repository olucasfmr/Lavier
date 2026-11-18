import { useEffect, useRef } from 'react'
import { initParallax } from '@/lib/parallax.js'
import { photos } from '@/content.js'

// Layered parallax band (after the Osmo parallax resource), built from Lavier's own material:
// layer 1 a photograph of a care room under the brand's dark green, layer 2 the gold arc of the logo,
// layer 3 the words (the manifesto of the brand manual), layer 4 an organic creme wave in front.
// GSAP moves each layer at its own speed while the band scrolls past (src/lib/parallax.js).
// The pictures are background layers beside the section's one .wrap; the words stay on the page grid.
// The built page ships no React: there src/client.js runs the same initParallax over this markup.
export function ParallaxComponent() {
  const parallaxRef = useRef(null)

  useEffect(() => initParallax(parallaxRef.current), [])

  const { src, w, h } = photos.harmonia
  const layer = { 'aria-hidden': 'true', alt: '', loading: 'lazy', decoding: 'async' }
  return (
    <section ref={parallaxRef} className="section parallax ground-inverse" id="harmonia" aria-labelledby="harmonia-h" data-parallax-layers="">
      <img {...layer} data-parallax-layer="1" className="parallax__layer parallax__layer--photo" src={src(w, h)} width={w} height={h} data-source="stand-in" />
      <img {...layer} data-parallax-layer="2" className="parallax__layer parallax__layer--arc" src="img/parallax-arc.svg" width="600" height="600" />
      <div className="wrap">
        <div className="grid" data-parallax-layer="3">
          <div className="span-8 parallax__text">
            <p className="eyebrow parallax__eyebrow">Manifesto Lavier</p>
            <h2 id="harmonia-h">Corpo e mente, <em>em harmonia</em></h2>
            <blockquote className="parallax__quote">
              “Beleza é quando corpo e mente <em>encontram o mesmo ritmo.</em>”
            </blockquote>
            <p className="parallax__lede">
              Lavier nasce do encontro entre o toque que cuida e a pausa que transforma.
            </p>
          </div>
        </div>
      </div>
      <img {...layer} data-parallax-layer="4" className="parallax__layer parallax__layer--front" src="img/parallax-wave.svg" width="1440" height="900" />
    </section>
  )
}
