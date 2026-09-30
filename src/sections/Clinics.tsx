import { Button } from '../components/Button'
import { HEALTH_PASS, SPECIALITIES } from '../content/site'
import { asset } from '../lib/asset'

export function Clinics() {
  return (
    <section className="section section--blue" id="clinics" aria-labelledby="clinics-title">
      <div className="container">
        <div className="clinics__intro">
          <div className="section-head">
            <span className="eyebrow eyebrow--light">Praan Clinics</span>
            <h2 id="clinics-title">
              Non-surgical treatment for <span className="accent">lasting</span> relief from chronic pain
            </h2>
            <div className="row">
              <Button href="/clinics/book" variant="inverse">
                Book an appointment
              </Button>
              <Button href="/clinics" variant="ghost">
                How we can help you
              </Button>
            </div>
          </div>
          <img
            className="clinics__photo"
            src={asset('/assets/6a6acab5e27bb0574e45713d_header-image.jpg')}
            alt="A Praan clinic consultation room"
            width="720"
            height="480"
            loading="lazy"
          />
        </div>

        <div className="specialities">
          <h3>Our speciality</h3>
          <ul className="chips chips--dark">
            {SPECIALITIES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <aside className="pass" id="health-pass" aria-labelledby="pass-title">
          <div>
            <span className="eyebrow">Health Pass</span>
            <h3 id="pass-title">
              Everything you need to start — for <strong>{HEALTH_PASS.price}</strong> <s>{HEALTH_PASS.was}</s>
            </h3>
            <ul className="pass__list">
              {HEALTH_PASS.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <Button href="/health-pass">See Health Pass benefits</Button>
        </aside>
      </div>
    </section>
  )
}
