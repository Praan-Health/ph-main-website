import { Button } from '../components/Button'
import { CALLBACK_HREF, HERO_PAIN_AREAS } from '../content/site'
import { useTypewriter } from '../hooks/useTypewriter'

export function Hero() {
  const typed = useTypewriter(HERO_PAIN_AREAS)

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">
            <span className="sr-only">Relief from {HERO_PAIN_AREAS.join(', ')}</span>
            <span aria-hidden="true">
              Relief from <span className="hero__typed">{typed}</span>
            </span>
          </span>
          <h1 className="hero__title">India's first holistic ecosystem for chronic pain management.</h1>
          <p className="lead hero__sub">
            Doctor-led, non-surgical treatment for back, knee, shoulder and neck pain — from precise diagnosis to long-term rehab, under one roof.
          </p>
          <div className="hero__actions">
            <Button href={CALLBACK_HREF}>Request Callback</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
