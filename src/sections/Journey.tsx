import { JOURNEY_STEPS } from '../content/site'
import { useStickyProgress } from '../hooks/useStickyProgress'

const COUNT = JOURNEY_STEPS.length

export function Journey() {
  const { ref, progress, scrollTo } = useStickyProgress<HTMLElement>()
  const active = Math.min(COUNT - 1, Math.floor(progress * COUNT))

  return (
    <section ref={ref} className="journey" id="journey" aria-labelledby="journey-title" style={{ '--steps': COUNT } as React.CSSProperties}>
      <div className="journey__sticky">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Your journey</span>
            <h2 id="journey-title">
              From first visit to <span className="accent">lasting relief</span>
            </h2>
            <p className="lead">We are with you every step of the way.</p>
          </div>

          <div className="journey__stage">
            <div className="journey__frame">
              {JOURNEY_STEPS.map((step, i) => (
                <div key={step.id} className={`journey__media ${i === active ? 'is-active' : ''} ${step.cutout ? 'is-cutout' : ''}`}>
                  <img src={step.image} alt="" loading="lazy" style={{ objectPosition: step.position }} />
                </div>
              ))}
              <span className="journey__badge" aria-hidden="true">
                {active + 1} / {COUNT}
              </span>
            </div>

            <div className="journey__copy">
              {JOURNEY_STEPS.map((step, i) => (
                <div key={step.id} className={`journey__text ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
                  <p className="journey__who">{step.who}</p>
                  <h3 className="journey__title">{step.title}</h3>
                  <p className="journey__does">{step.does}</p>
                </div>
              ))}
            </div>

            <ol className="journey__dots" aria-label="Journey steps">
              {JOURNEY_STEPS.map((step, i) => (
                <li key={step.id}>
                  <button
                    type="button"
                    className={`journey__dot ${i === active ? 'is-active' : ''}`}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    aria-current={i === active ? 'step' : undefined}
                    onClick={() => scrollTo((i + 0.5) / COUNT)}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
