// The page's two React islands, loaded after the page is on screen (src/client.jsx): the tubelight
// menu and the FAQ accordion take over the static HTML the prerender left in their places.
import { createRoot } from 'react-dom/client'
import { NavPill } from '@/components/Nav.jsx'
import { FaqAccordion } from '@/components/ui/text-reveal-faqs.jsx'

export function mount() {
  const islands = { tubelight: <NavPill />, faq: <FaqAccordion /> }
  for (const [name, element] of Object.entries(islands)) {
    const el = document.querySelector(`[data-island="${name}"]`)
    if (el) createRoot(el).render(element)
  }
}
