import { useState } from 'react'
import { BodyMap } from '../components/BodyMap'
import { CallbackButton } from '../components/CallbackButton'
import { PAIN_AREAS } from '../content/pain'

export function Clinics() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const area = PAIN_AREAS.find((a) => a.id === selectedId) ?? null
  // Keep the last view while nothing is selected so the body does not flip back when you deselect.
  const [view, setView] = useState<'front' | 'back'>('front')
  const shownView = area ? area.view : view

  const select = (id: string) => {
    const next = id === selectedId ? null : id
    setSelectedId(next)
    const nextArea = PAIN_AREAS.find((a) => a.id === next)
    if (nextArea) setView(nextArea.view)
  }

  return (
    <section className="section section--blue" id="clinics" aria-labelledby="clinics-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow--light">Conditions we treat</span>
          <h2 id="clinics-title">
            Relief for pain across the <span className="accent">body</span>
          </h2>
          <p className="clinics__sub">
            From joints to spine to nerves, our non-surgical protocols are tailored to the conditions most common after 50
          </p>
        </div>

        <div className="pain">
          <div className="pain__panel">
            <ul className="pain__areas" aria-label="Areas of pain">
              {PAIN_AREAS.map((a) => (
                <li key={a.id}>
                  <button type="button" className={`pain__area ${a.id === selectedId ? 'is-active' : ''}`} aria-pressed={a.id === selectedId} onClick={() => select(a.id)}>
                    {a.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pain__info" aria-live="polite">
              {area ? (
                <>
                  <h3 className="pain__title">{area.label}</h3>
                  <ul className="chips chips--dark">
                    {area.conditions.map((condition) => (
                      <li key={condition}>{condition}</li>
                    ))}
                  </ul>
                  <p className="pain__note">This is a guide, not a diagnosis. Our doctors find the exact cause.</p>
                </>
              ) : (
                <p className="pain__hint">Choose an area to see where it hurts and the conditions we treat there.</p>
              )}
            </div>

            <div className="row">
              <CallbackButton variant="inverse" />
            </div>
          </div>
          <div className="pain__body">
            <BodyMap area={area} view={shownView} />
            {area && <span className="pain__view">{shownView === 'back' ? 'Back view' : 'Front view'}</span>}
          </div>

        </div>
      </div>
    </section>
  )
}
