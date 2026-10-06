import { Button } from '../components/Button'
import { CallbackButton } from '../components/CallbackButton'
import { asset } from '../lib/asset'
import { treatments } from '../protocols/content/clinics'

// The six procedures our interventional pain specialists choose between. The physiotherapy,
// rehab and nursing cards on the Clinics page are rehab services, not procedures.
const PROCEDURE_COUNT = 6

export function Treatments() {
  return (
    <section className="section" id="treatments" aria-labelledby="treatments-title">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">{treatments.eyebrow}</span>
          <h2 id="treatments-title">{treatments.heading}</h2>
          <p className="lead">{treatments.sub}</p>
        </div>

        <ul className="treatments">
          {treatments.cards.slice(0, PROCEDURE_COUNT).map((card) => (
            <li key={card.title} className="treatment">
              <img className="treatment__image" src={asset(card.image.src)} alt="" width="1200" height="800" loading="lazy" />
              <span className="treatment__tag">{card.tag}</span>
              <div className="treatment__body">
                <h3 className="treatment__title">{card.title}</h3>
                <p className="treatment__text">{card.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="treatments__actions">
          <CallbackButton />
          <Button href={asset('/clinics/')} variant="secondary">
            See all treatments
          </Button>
        </div>
      </div>
    </section>
  )
}
