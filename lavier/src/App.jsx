import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { Treatments, Space, Evaluation, Larissa } from './components/Sections.jsx'
import Footer, { ActionBar } from './components/Footer.jsx'
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow.jsx'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling.jsx'

// The page is a stack of screens (one section per screen at 1440x900): hero, the parallax band,
// tratamentos, espaço, avaliação, Larissa, then the close and the footer as one last screen.
export default function App() {
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
        <Larissa />
      </main>
      <Footer />
      <ActionBar />
    </>
  )
}
