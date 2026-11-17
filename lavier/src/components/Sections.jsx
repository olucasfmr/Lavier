import { photos, treatments, evaluationSteps, links } from '../content.js'
import { BookButton, Photo } from './ui.jsx'

// peek-list: four rows, each with its own photograph; system.js swaps the picture to the row under
// the pointer, the focus or a tap.
export function Treatments() {
  return (
    <section className="section" id="tratamentos" aria-labelledby="tratamentos-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="tratamentos-h">Tratamentos. <span className="muted">Corpo, rosto e mente no mesmo plano.</span></h2>
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
          <h2 id="espaco-h">O espaço Lavier em Salvador</h2>
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
            <h2 id="avaliacao-h">A avaliação individual. <span className="muted">Todo protocolo começa nela.</span></h2>
          </div>
          <ol className="rows steps-list">
            {evaluationSteps.map((s) => (
              <li key={s.name}>
                <span className="rows__name">{s.name}<small>{s.line}</small></span>
              </li>
            ))}
          </ol>
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
    <section className="section" id="larissa" aria-labelledby="larissa-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="larissa-h">Larissa Xavier, esteticista e terapeuta</h2>
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
