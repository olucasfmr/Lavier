import { photos, treatments, links } from '../content.js'
import { BookButton, Logo } from './ui.jsx'

// nav-mega: one fixed opaque bar; "Tratamentos" opens the full-width panel (system.js runs it,
// the phone sheet and aria-expanded included).
export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Pular para o conteúdo</a>
        <Logo />
        <nav className="nav__links" aria-label="Principal">
          <div className="nav__item">
            <a className="nav__link" href="#tratamentos">
              Tratamentos{' '}
              <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-3">
                  <p className="t-label">Tratamentos</p>
                  {treatments.slice(0, 3).map((t) => (
                    <a key={t.key} href="#tratamentos">
                      {t.name}
                      <span>{t.menu}</span>
                    </a>
                  ))}
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Primeira visita</p>
                  <a href="#avaliacao">Avaliação individual<span>Conversa, avaliação e plano</span></a>
                  <a href="#espaco">O espaço<span>Aberto em outubro de 2026</span></a>
                  <a href={links.instagram} target="_blank" rel="noopener">Instagram<span>Rotina e novidades</span></a>
                </div>
                <a className="menu-card span-3 start-10" href="#avaliacao">
                  <div className="panel">
                    <img className="frame__img" src={photos.menu.src(640, 320)} width="640" height="320" alt={photos.menu.alt} loading="lazy" />
                  </div>
                  <span className="t-card">Agenda de dezembro de 2026 aberta</span>
                  <span className="t-small muted">Avaliações com hora marcada</span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item"><a className="nav__link" href="#espaco">Espaço</a></div>
          <div className="nav__item"><a className="nav__link" href="#avaliacao">Avaliação</a></div>
          <div className="nav__item"><a className="nav__link" href="#larissa">Larissa</a></div>
        </nav>
        <div className="nav__actions">
          <BookButton />
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <span className="nav__toggle-label">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
