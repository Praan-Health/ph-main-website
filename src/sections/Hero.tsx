import { Button } from '../components/Button'
import { CAL_URL, HERO_CONDITIONS } from '../content/site'
import { useTypewriter } from '../hooks/useTypewriter'
import { asset } from '../lib/asset'

export function Hero() {
  const typed = useTypewriter(HERO_CONDITIONS)

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">
            <span className="sr-only">Care for {HERO_CONDITIONS.join(', ')}</span>
            <span aria-hidden="true">
              Care for <span className="hero__typed">{typed}</span>
            </span>
          </span>
          <h1 className="hero__title">Complete healthcare for your parents, all in one place.</h1>
          <p className="lead hero__sub">
            Doctor-led care, clinics, nutrition and personalised protocols designed around their evolving health needs.
          </p>
          <div className="hero__actions">
            <Button href={CAL_URL}>Book Free Consultation</Button>
          </div>
        </div>
        <div className="hero__media">
          <img
            className="hero__photo"
            src={asset('/assets/6a0b0af0686e8aac45bd1234_daddi.webp')}
            alt="A smiling older woman in a sari"
            width="986"
            height="1316"
            fetchPriority="high"
          />
          <img className="hero__chip hero__chip--hba1c" src={asset('/assets/ui/Bubble-1.webp')} alt="HbA1c 6.2%, improving" width="180" height="180" />
          <img className="hero__chip hero__chip--steps" src={asset('/assets/ui/Bubble-2.webp')} alt="7,328 steps today" width="140" height="140" />
        </div>
      </div>
    </section>
  )
}
