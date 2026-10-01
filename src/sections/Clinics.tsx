import { Button } from '../components/Button'
import { SPECIALITIES } from '../content/site'
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
            <p className="clinics__specialities">{SPECIALITIES.join(' · ')}</p>
            <div className="row">
              <Button href={asset('/clinics/')} variant="inverse">
                Book an appointment
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
      </div>
    </section>
  )
}
