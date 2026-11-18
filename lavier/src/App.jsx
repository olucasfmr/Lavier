import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { Treatments, Space, Evaluation, Larissa } from './components/Sections.jsx'
import { ActionBar } from './components/Footer.jsx'
import { StickyFooter } from '@/components/ui/sticky-footer.jsx'
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow.jsx'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling.jsx'
import { initMotion } from '@/lib/motion.js'
import FAQs from '@/components/ui/text-reveal-faqs.jsx'

// The page is a stack of screens (one section per screen at 1440x900): hero, the parallax band,
// tratamentos, espaço, avaliação, perguntas frequentes, Larissa, then the close and the footer as one last screen.
// still: the prerender's version, every FAQ answer open (src/client.jsx makes it an accordion)
export default function App({ still = false }) {
  // dev only: on the built page src/client.jsx starts the same motion (React runs there only in the islands)
  useEffect(() => initMotion(document), [])

  return (
    <>
      <BackgroundGradientGlow />
      <Nav />
      <main id="top">
        <Hero />
        <ParallaxComponent />
        <Treatments />
        <Space />
        <Evaluation />
        <FAQs still={still} />
        <Larissa />
      </main>
      <StickyFooter />
      <ActionBar />
    </>
  )
}
