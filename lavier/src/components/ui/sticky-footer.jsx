import { links, MAIN_ACTION } from '@/content.js'
import { Arrow, BandEdge, Logo, Words } from '@/components/ui.jsx'
import { InstagramCard } from '@/components/ui/instagram-card.jsx'

// The page's footer as a "sticky footer" (after the Sticky Footer on 21st.dev): on a desktop screen
// tall enough for it, the footer's content stays fixed under the page and the page scrolls away to
// reveal it, like a curtain; the footer box clips it, so it only shows where the footer is. Soft beams
// of creme light fall across the green, and the brand block and link columns come out of a blur as the
// footer arrives (src/lib/motion.js, [data-reveal]). On tablets and phones it is an ordinary footer.
// Row 1 is the close (the booking button), row 2 the links and the legal line, as the kit lays out
// footer.closing.
const groups = [
  {
    label: 'Tratamentos',
    links: [
      { title: 'Estética corporal', href: '#tratamentos' },
      { title: 'Estética facial', href: '#tratamentos' },
      { title: 'Terapia integrativa', href: '#tratamentos' },
    ],
  },
  { label: 'Espaço', links: [{ title: 'O espaço', href: '#espaco' }, { title: 'Avaliação', href: '#avaliacao' }] },
  { label: 'A clínica', links: [{ title: 'Sobre Larissa', href: '#larissa' }, { title: 'Perguntas frequentes', href: '#faq' }] },
  {
    label: 'Contato',
    links: [
      { title: 'WhatsApp', href: links.whatsapp, external: true },
      { title: 'Instagram', href: links.instagram, external: true },
    ],
  },
]

export function StickyFooter() {
  return (
    <footer className="footer closing ground-inverse band band--top sticky-footer" id="contact" aria-labelledby="close-h">
      <BandEdge top />
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h" data-words=""><Words>Agende sua avaliação</Words> <em><Words>na Lavier</Words></em></h2>
            <p>Atendimento com hora marcada em Salvador. A conversa começa pelo WhatsApp da clínica.</p>
          </div>
          <a className="btn btn--primary btn--xl" href={links.whatsapp} target="_blank" rel="noopener">
            {MAIN_ACTION}
            <Arrow />
          </a>
        </div>
        {/* the same composition at every width: the brand block opens the links row, as on the desktop */}
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4 closing__brand" data-reveal="0">
              <Logo full />
              <p className="footer__lede">Estética avançada e terapia integrativa em Salvador.</p>
            </div>
            {groups.map((group, i) => (
              <div key={group.label} className="span-2 footer__col" data-reveal={0.1 + i * 0.1}>
                <h3>{group.label}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer__legal">
            <span>&copy; 2026 Lavier Corpo &amp; Mente, Salvador, BA</span>
            <InstagramCard />
            <a className="credits" href="https://unsplash.com/license" target="_blank" rel="noopener">Fotografias via Unsplash</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
