import type { CSSProperties } from 'react'
import { JOURNEY_STEPS } from '../content/site'
import { useScrollProgress } from '../hooks/useScrollProgress'

const GAPS = JOURNEY_STEPS.length - 1

export function Journey() {
  const { ref, progress } = useScrollProgress<HTMLOListElement>()
  // How far the line has drawn, in steps: 0 at the first dot, GAPS at the last.
  const reached = progress * GAPS

  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-head section-head--center">
          <h2 id="journey-title">
            Your journey to <span className="accent">lasting pain relief</span>
          </h2>
          <p className="lead">We are with you every step of the way</p>
        </div>

        <ol ref={ref} className="timeline">
          {JOURNEY_STEPS.map((step, i) => (
            <li
              key={step.id}
              className={`timeline__step ${i % 2 === 0 ? 'is-left' : 'is-right'} ${reached >= i - 0.02 ? 'is-active' : ''}`}
              style={{ '--seg': Math.min(1, Math.max(0, reached - i)) } as CSSProperties}
            >
              <span className="timeline__numeral" aria-hidden="true">
                {step.numeral}.
              </span>
              <span className="timeline__dot" aria-hidden="true" />
              <div className="timeline__text">
                <h3 className="timeline__title">{step.title}</h3>
                <p className="timeline__why">{step.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
