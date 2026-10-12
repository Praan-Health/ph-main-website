import { CallbackButton } from '../components/CallbackButton'
import { HERO_PAIN_AREAS } from '../content/site'
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
            Advanced, minimally invasive chronic pain treatments for knee, back, shoulder, hip, and spine, combined with holistic rehabilitation through physiotherapy, strength training, nutrition, and counseling, delivered at our clinic and in the comfort of your home.
          </p>
          <div className="hero__actions">
            <CallbackButton />
          </div>
        </div>
      </div>
    </section>
  )
}
