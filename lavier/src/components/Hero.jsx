import { photos } from '../content.js'
import { BookButton, Photo } from './ui.jsx'

// hero-split (dealt): the words on span-5, the photograph on span-6 start-7, one float card with a
// real fact from the clinic's Instagram (December's agenda opened on 2 Nov 2026).
export default function Hero() {
  return (
    <section className="hero hero--split" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            <p className="hero__kicker eyebrow">Agenda de dezembro de 2026 aberta</p>
            <h1 id="hero-h">Estética corporal e facial <em>em Salvador</em></h1>
            <p className="hero__lead">
              Estética avançada e terapia integrativa com Larissa Xavier, esteticista e terapeuta. Cada protocolo
              começa por uma avaliação individual do seu corpo.
            </p>
            <div className="btn-row">
              <BookButton arrow />
              <a className="btn btn--secondary" href="#tratamentos">Ver tratamentos</a>
            </div>
          </div>
          <div className="hero__media frame--corners span-6 start-7">
            <Photo photo={photos.hero} eager sizes="(max-width: 1023px) 100vw, 628px" style={{ '--ly-pos': '50% 40%' }} />
            <div className="ly-float">
              <div className="ly-float__row"><span>Salvador, BA</span><span>Hora marcada</span></div>
              <div className="ly-float__title">Avaliação individual antes de cada protocolo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
