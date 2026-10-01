import { Button } from '../components/Button'
import { CareTeamDiagram } from '../components/CareTeamDiagram'
import { CheckIcon } from '../components/icons'
import { CAL_URL, NUMBERS, WHAT_INCLUDED } from '../content/site'
import { asset } from '../lib/asset'

export function Protocols() {
  return (
    <section className="section section--linen" id="protocols" aria-labelledby="protocols-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Personalised Care Protocols</span>
          <h2 id="protocols-title">
            Doctor-led, <span className="accent">comprehensive</span> protocols
          </h2>
          <p className="lead">
            One doctor builds your plan and directs a specialist team to deliver it — at home and online.
          </p>
          <div className="row">
            <Button href={CAL_URL} className="btn--lg">
              Start your journey
            </Button>
            <Button href={asset("/protocols/")} variant="secondary" className="btn--lg">
              Know more
            </Button>
          </div>
        </div>

        <div className="protocol-layout">
          <article className="card">
            <h3>How your care team works</h3>
            <CareTeamDiagram />
          </article>

          <article className="card included">
            <h3>What's included</h3>
            <ul className="included__list">
              {WHAT_INCLUDED.map((item) => (
                <li key={item.text}>
                  <span className="included__check">
                    <CheckIcon size={16} />
                  </span>
                  <span className="included__text">{item.text}</span>
                  <span className="included__tag">{item.tag}</span>
                </li>
              ))}
            </ul>
            <Button href={CAL_URL} className="btn--lg included__cta">
              Start your journey
            </Button>
          </article>
        </div>

        <div className="numbers" aria-label="Strength in numbers">
          <h3 className="numbers__title">Strength in numbers</h3>
          <ul>
            {NUMBERS.map((n) => (
              <li key={n.label}>
                <span className="numbers__value">{n.value}</span>
                <span>{n.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
