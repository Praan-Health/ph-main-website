import { Button } from '../components/Button'
import { CAL_URL, NUMBERS } from '../content/site'
import { asset } from '../lib/asset'

export function Protocols() {
  return (
    <section className="section section--linen" id="protocols" aria-labelledby="protocols-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Long-term rehab protocols</span>
          <h2 id="protocols-title">
            Keep the relief with a doctor-led <span className="accent">protocol</span>
          </h2>
          <p className="lead">
            After treatment, one doctor builds your plan and directs a physio, dietician and strength trainer to deliver it — at home and online.
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
