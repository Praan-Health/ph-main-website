import { Button } from '../components/Button'
import { CallbackButton } from '../components/CallbackButton'
import { CLINIC, CLINIC_FACTS } from '../content/site'

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z" />
      <path d="M9 4v13M15 6.5v13" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="clinic__star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5l3.1 6.9 7.4.8-5.5 5 1.6 7.4L12 18l-6.6 3.6 1.6-7.4-5.5-5 7.4-.8z" fill="currentColor" />
    </svg>
  )
}

/** The clinic's location, shown as a card under the hero: map, name and address, proof points and two actions. */
export function ClinicCard() {
  return (
    <section className="clinic" id="visit" aria-labelledby="clinic-title">
      <div className="container clinic__card">
        <div className="clinic__map">
          <iframe
            className="clinic__map-frame"
            src={CLINIC.mapEmbedUrl}
            title="Map showing the Praan Health clinic in Koramangala, Bengaluru"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          {/* The map is a picture; tapping it opens Google Maps (and a map in a card would otherwise trap page scrolling on phones). */}
          <a className="clinic__map-link" href={CLINIC.mapUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the clinic in Google Maps" />
        </div>

        <div className="clinic__body">
          <h2 id="clinic-title" className="clinic__name">
            {CLINIC.name}
          </h2>
          <p className="clinic__address">{CLINIC.address}</p>
          <ul className="clinic__facts">
            {CLINIC_FACTS.map((fact) => (
              <li key={fact.label} className="clinic__fact">
                <span className="clinic__value">
                  {fact.value.replace('★', '')}
                  {fact.value.endsWith('★') && <StarIcon />}
                </span>
                <span className="clinic__label">{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="clinic__actions">
          <CallbackButton />
          <Button href={CLINIC.mapUrl} variant="ghost">
            <MapIcon /> Map
          </Button>
        </div>
      </div>
    </section>
  )
}
