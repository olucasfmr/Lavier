import { Fragment } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx'
import { Words } from '@/components/ui.jsx'
import { faqItems, links } from '@/content.js'

// FAQ (after "text-reveal-faqs" by Ruixen UI): the questions in an accordion, each answer coming in
// letter by letter out of a blur when it opens. The section follows the page's split: the heading
// and a line on the left, the questions on the right.
// `still` renders every answer open with no script: that is what the built HTML holds, for search
// engines and for anyone without JavaScript; src/client.jsx then swaps in the interactive accordion.
export default function FAQs({ still = false }) {
  return (
    <section className="section" id="faq" aria-labelledby="faq-h">
      <div className="wrap grid grid--top">
        <div className="span-5 faq__intro">
          <div className="section-head">
            <h2 id="faq-h" data-words="">
              <Words>Perguntas</Words> <em><Words>frequentes</Words></em>
            </h2>
            <p>As dúvidas comuns antes da primeira avaliação na Lavier.</p>
          </div>
          <p className="faq__help">
            Não encontrou a sua?{' '}
            <a className="link" href={links.whatsapp} target="_blank" rel="noopener">Fale com a clínica pelo WhatsApp</a>
          </p>
        </div>
        <div className="span-6 start-7" data-island="faq">
          {still ? <StillAnswers /> : <FaqAccordion />}
        </div>
      </div>
    </section>
  )
}

// from 640px the first answer starts open; on a phone every answer starts closed, so the list fits a screen
export function FaqAccordion() {
  const first = typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches ? faqItems[0].id : undefined
  return (
    <Accordion type="single" collapsible defaultValue={first} className="accordion">
      {faqItems.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <BlurredStagger text={item.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// the same list, every answer shown, no accordion (the built page before React takes over)
function StillAnswers() {
  return (
    <div className="accordion">
      {faqItems.map((item) => (
        <div key={item.id} className="accordion__item">
          <h3 className="accordion__header"><span className="accordion__trigger">{item.question}</span></h3>
          <div className="accordion__body"><p className="accordion__text">{item.answer}</p></div>
        </div>
      ))}
    </div>
  )
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.015 } } }
const letter = { hidden: { opacity: 0, filter: 'blur(10px)' }, show: { opacity: 1, filter: 'blur(0px)' } }

// The answer appears letter by letter out of a blur. Letters are grouped by word, so lines still
// break between words; a screen reader gets the plain sentence once. Under reduced motion it is
// plain text.
export function BlurredStagger({ text }) {
  const reduce = useReducedMotion()
  if (reduce) return <p className="accordion__text">{text}</p>
  const words = text.split(' ')
  return (
    <p className="accordion__text">
      <span className="sr-only">{text}</span>
      <Motion.span variants={container} initial="hidden" animate="show" aria-hidden="true">
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, c) => (
                <Motion.span key={c} variants={letter} transition={{ duration: 0.3 }} className="inline-block">
                  {char}
                </Motion.span>
              ))}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </Motion.span>
    </p>
  )
}
