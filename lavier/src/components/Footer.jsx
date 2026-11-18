import { links, MAIN_ACTION } from '../content.js'
import { Arrow, BookButton, Logo } from './ui.jsx'

// footer.closing: row 1 the dealt close-type, row 2 the dealt footer-columns, ordered as the nav.
export default function Footer() {
  return (
    <footer className="footer closing g2m ground-inverse" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">Agende sua avaliação <em>na Lavier</em></h2>
            <p>Atendimento com hora marcada em Salvador. A conversa começa pelo WhatsApp da clínica.</p>
          </div>
          <a className="btn btn--primary btn--xl" href={links.whatsapp} target="_blank" rel="noopener">
            {MAIN_ACTION}
            <Arrow />
          </a>
          {/* phone only: the brand block joins the close, so the footer's first screen is not an empty
              green field; the links row's copy of it hides there (index.css) */}
          <div className="closing__brand stack-4">
            <Logo full />
            <p className="footer__lede">Estética avançada e terapia integrativa em Salvador.</p>
          </div>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4 closing__brand-desk">
              <Logo full />
              <p className="footer__lede">Estética avançada e terapia integrativa em Salvador.</p>
            </div>
            <div className="span-2 footer__col">
              <h3>Tratamentos</h3>
              <ul>
                <li><a href="#tratamentos">Estética corporal</a></li>
                <li><a href="#tratamentos">Estética facial</a></li>
                <li><a href="#tratamentos">Terapia integrativa</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Espaço</h3>
              <ul>
                <li><a href="#espaco">O espaço</a></li>
                <li><a href="#avaliacao">Avaliação</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Larissa</h3>
              <ul>
                <li><a href="#larissa">Sobre Larissa</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Contato</h3>
              <ul>
                <li><a href={links.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href={links.instagram} target="_blank" rel="noopener">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>&copy; 2026 Lavier Corpo &amp; Mente, Salvador, BA</span>
            <div className="socials">
              <a href={links.instagram} target="_blank" rel="noopener" aria-label="Instagram da Lavier">
                <img src="assets/icons/instagram.svg" width="18" height="18" alt="" loading="lazy" />
              </a>
            </div>
            <a className="credits" href="https://unsplash.com/license" target="_blank" rel="noopener">Fotografias via Unsplash</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// The phone's action bar (system.js shows it once the hero's button has scrolled away).
export function ActionBar() {
  return (
    <nav className="actionbar" aria-label="Ação rápida">
      <BookButton />
    </nav>
  )
}
