import { photos, treatments, links } from '../content.js'
import { BookButton, Logo } from './ui.jsx'
import { NavBar } from '@/components/ui/tubelight-navbar.jsx'

// The panel "Tratamentos" opens under the bar (the kit's nav-mega panel, shown by CSS on hover/focus).
function TreatmentsMenu() {
  return (
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
          <span className="t-small muted">Avaliações com hora marcada</span>
        </a>
      </div>
    </div>
  )
}

const sections = [
  { name: 'Tratamentos', url: '#tratamentos', menu: <TreatmentsMenu /> },
  { name: 'Espaço', url: '#espaco' },
  { name: 'Avaliação', url: '#avaliacao' },
  { name: 'Larissa', url: '#larissa' },
  { name: 'Dúvidas', url: '#faq' },
]

// the tubelight pill, also mounted on its own by src/client.jsx on the built page
export function NavPill() {
  return <NavBar items={sections} />
}

// One fixed opaque bar: the logo, the section links and the booking button. From 1024px the links are
// the tubelight pill (a React island); below that the Menu button opens the kit's full-screen list
// (.nav__links, run by system.js with the phone sheet and aria-expanded).
export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Pular para o conteúdo</a>
        <Logo />
        <nav className="nav__links" aria-label="Principal">
          {sections.map((s) => (
            <div key={s.name} className="nav__item">
              <a className="nav__link" href={s.url}>
                {s.name}
                {s.menu && (
                  <>
                    {' '}
                    <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </a>
              {s.menu}
            </div>
          ))}
        </nav>
        <div className="nav__pill" data-island="tubelight">
          <NavPill />
        </div>
        <div className="nav__actions">
          <BookButton />
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
