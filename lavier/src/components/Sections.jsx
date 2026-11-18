import { photos, treatments, evaluationSteps, links } from '../content.js'
import { BandEdge, BookButton, Photo, Words } from './ui.jsx'

// peek-list: four rows, each with its own photograph; system.js swaps the picture to the row under
// the pointer, the focus or a tap.
export function Treatments() {
  return (
    <section className="section" id="tratamentos" aria-labelledby="tratamentos-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="tratamentos-h" data-words=""><Words>Tratamentos.</Words> <span className="muted"><Words>Corpo, rosto e mente no mesmo plano.</Words></span></h2>
        </div>
        <div className="grid grid--top fill" data-peek>
          <ul className="rows span-6">
            {treatments.map((t) => (
              <li key={t.key} data-peek-to={t.key} tabIndex={0}>
                <span className="rows__name">{t.name}</span>
                <p>{t.line}</p>
                <span className="rows__value">{t.tag}</span>
              </li>
            ))}
          </ul>
          <div className="frame frame--photo frame--fill span-6 start-7">
            {treatments.map((t, i) => (
              <Photo key={t.key} photo={photos[t.key]} className="frame__img" data-peek-for={t.key} hidden={i > 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// photo-pair: two details of the care ritual, one ratio, one light; the line above says what they show.
export function Space() {
  return (
    <section className="section" id="espaco" aria-labelledby="espaco-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="espaco-h" data-words=""><Words>O espaço Lavier em Salvador</Words></h2>
          <p>Inaugurado em outubro de 2026, com hora marcada e cuidado individualizado em cada atendimento.</p>
        </div>
        <div className="grid pair">
          <div className="frame frame--photo span-6"><Photo photo={photos.toalhas} className="frame__img" /></div>
          <div className="frame frame--photo span-6"><Photo photo={photos.ritual} className="frame__img" /></div>
        </div>
      </div>
    </section>
  )
}

// split with the dealt moment: the photograph develops once as it comes on screen (picture-develops).
export function Evaluation() {
  return (
    <section className="section" id="avaliacao" aria-labelledby="avaliacao-h">
      <div className="wrap grid grid--top">
        <div className="span-6">
          <div className="section-head">
            <h2 id="avaliacao-h" data-words=""><Words>A avaliação individual.</Words> <span className="muted"><Words>Todo protocolo começa nela.</Words></span></h2>
          </div>
          {/* a real sequence: a gold line draws down the steps as you scroll and each marker lights up
              when it reaches it (src/lib/motion.js); without script the line and markers stand drawn */}
          <div className="steps" data-timeline="">
            <ol className="rows steps-list">
              {evaluationSteps.map((s) => (
                <li key={s.name}>
                  <span className="rows__name">{s.name}<small>{s.line}</small></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="btn-row"><BookButton /></div>
        </div>
        <figure className="develop span-6 start-7" data-moment="picture-develops">
          <Photo photo={photos.develop} />
        </figure>
      </div>
    </section>
  )
}

// Larissa in her own words (a line from her Instagram post of 10 Oct 2026), beside a detail photograph;
// no portrait until the clinic sends one.
export function Larissa() {
  return (
    <section className="section ground-rose band" id="larissa" aria-labelledby="larissa-h">
      <BandEdge />
      <div className="wrap">
        <div className="section-head">
          <h2 id="larissa-h" data-words=""><Words>Larissa Xavier,</Words> <em><Words>esteticista e terapeuta</Words></em></h2>
        </div>
        <div className="grid grid--top fill">
          <div className="span-6 flex flex-col gap-6">
            <figure className="quote about__quote m-0">
              <blockquote>“A Lavier Corpo &amp; Mente carrega muito da minha história.”</blockquote>
              <figcaption className="mt-4">Larissa Xavier, sobre a abertura do espaço</figcaption>
            </figure>
            <p className="measure m-0 text-[length:var(--t-lead)] leading-relaxed">
              Larissa une a estética facial e corporal à terapia integrativa, com cuidado individualizado para o
              corpo e para a autoestima.
            </p>
            <p><a className="link" href={links.instagram} target="_blank" rel="noopener">Ver o Instagram da Lavier</a></p>
          </div>
          <div className="frame frame--photo span-6 start-7 about__photo">
            <Photo photo={photos.oleo} className="frame__img" sizes="(max-width: 1023px) 100vw, 628px" />
          </div>
        </div>
      </div>
    </section>
  )
}
