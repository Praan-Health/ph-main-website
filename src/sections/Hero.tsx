import { CallbackButton } from '../components/CallbackButton'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">India's first holistic ecosystem for chronic pain management</h1>
          <p className="lead hero__sub">
            Advanced, minimally invasive pain treatments combined with holistic rehabilitation, at our clinic or in the comfort of your home
          </p>
          <div className="hero__actions">
            <CallbackButton />
          </div>
        </div>
      </div>
    </section>
  )
}
