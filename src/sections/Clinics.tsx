import { Button } from '../components/Button'
import { CALLBACK_HREF, PAIN_AREAS, PROCEDURES } from '../content/site'
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
            <p className="clinics__sub">
              Our doctors find the cause of your pain and treat it with precise, minimally invasive procedures, without surgery.
            </p>
            <div className="row">
              <Button href={CALLBACK_HREF} variant="inverse">
                Request Callback
              </Button>
              <Button href={asset('/clinics/')} variant="ghost">
                Explore the clinic
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

        <h3 className="clinics__label">Where it hurts</h3>
        <ul className="pain-areas">
          {PAIN_AREAS.map((area) => (
            <li key={area.id} className="pain-areas__item">
              <a href={asset('/clinics/')} className="pain-areas__link">
                <span className="pain-areas__name">{area.label}</span>
                <span className="pain-areas__note">{area.note}</span>
              </a>
            </li>
          ))}
        </ul>

        <h3 className="clinics__label">Procedures we perform</h3>
        <ul className="chips chips--dark">
          {PROCEDURES.map((procedure) => (
            <li key={procedure}>{procedure}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
