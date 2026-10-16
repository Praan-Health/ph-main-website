import { JOURNEY_ICON_PATHS } from '../components/journeyIcons'
import { JOURNEY_STEPS } from '../content/site'

/** The patient journey as hairline-divided columns: an icon on top, the step and why at the foot. */
export function Journey() {
  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <h2 id="journey-title" className="journey__title">
          Your journey to <span className="accent">lasting pain relief</span>
        </h2>
        <p className="lead journey__sub">We are with you every step of the way</p>

        <ol className="journey__list">
          {JOURNEY_STEPS.map((step) => (
            <li key={step.id} className="journey__item">
              <svg className="journey__icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
                <path d={JOURNEY_ICON_PATHS[step.id]} />
              </svg>
              <div className="journey__text">
                <h3>{step.title}</h3>
                <p>{step.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
