import { Button } from '../components/Button'
import { CAL_URL, CARE_TEAM, NUMBERS, PROTOCOL_DELIVERY } from '../content/site'

export function Protocols() {
  return (
    <section className="section" id="protocols" aria-labelledby="protocols-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Protocols</span>
          <h2 id="protocols-title">
            Doctor-led, <span className="accent">comprehensive</span> protocols
          </h2>
          <p className="lead">One doctor runs everything. A dedicated team delivers it — at home and online.</p>
          <div className="row">
            <Button href={CAL_URL}>Start your journey</Button>
            <Button href="/protocols" variant="secondary">
              Know more
            </Button>
          </div>
        </div>

        <div className="protocol-grid">
          <article className="card team-card">
            <h3>Your care team</h3>
            <div className="team-card__center">
              <img src="/assets/team/Dr.-Rachit-Gulati.png" alt="Dr. Rachit Gulati" width="160" height="160" loading="lazy" />
              <div>
                <strong>Doctor</strong>
                <span>At the centre of your protocol</span>
              </div>
            </div>
            <ul className="chips">
              {CARE_TEAM.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </article>

          <article className="card delivery-card">
            <h3>How your protocol is delivered</h3>
            <ul className="delivery">
              {PROTOCOL_DELIVERY.map((item) => (
                <li key={item.label}>
                  <span className="delivery__value">{item.value}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
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
