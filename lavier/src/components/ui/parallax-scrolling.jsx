import { photos } from '@/content.js'
import { BandEdge, Words } from '@/components/ui.jsx'

// Layered parallax band (after the Osmo parallax resource), built from Lavier's own material:
// layer 1 a photograph of a care room under the brand's dark green, layer 2 the gold arc of the logo,
// layer 3 the words (the manifesto of the brand manual). The band's top and bottom are wave edges
// (a CSS mask) with the gold line of the logo, so it flows out of the hero and into the next section.
// The motion (parallax, the circle that opens the photograph, the quote that fills in as you read)
// lives in src/lib/motion.js, started once for the whole page.
export function ParallaxComponent() {
  const { src, w, h } = photos.harmonia
  const layer = { 'aria-hidden': 'true', alt: '', loading: 'lazy', decoding: 'async' }
  return (
    <section className="section parallax ground-inverse band" id="harmonia" aria-labelledby="harmonia-h" data-parallax-layers="">
      <img {...layer} data-parallax-layer="1" data-mask-reveal="" className="parallax__layer parallax__layer--photo" src={src(w, h)} srcSet={[0.4, 0.7, 1].map((k) => `${src(Math.round(w * k), Math.round(h * k))} ${Math.round(w * k)}w`).join(", ")} sizes="(orientation: portrait) 140vh, 100vw" width={w} height={h} data-source="stand-in" />
      <img {...layer} data-parallax-layer="2" className="parallax__layer parallax__layer--arc" src="img/parallax-arc.svg" width="600" height="600" />
      <BandEdge />
      <div className="wrap">
        <div className="grid" data-parallax-layer="3">
          <div className="span-8 parallax__text">
            <p className="eyebrow parallax__eyebrow">Manifesto Lavier</p>
            <h2 id="harmonia-h" data-words="">
              <Words>Corpo e mente,</Words> <em><Words>em harmonia</Words></em>
            </h2>
            <blockquote className="parallax__quote" data-fill="">
              <Words>“Beleza é quando corpo e mente</Words> <em><Words>encontram o mesmo ritmo.”</Words></em>
            </blockquote>
            <p className="parallax__lede">
              Lavier nasce do encontro entre o toque que cuida e a pausa que transforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
