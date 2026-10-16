import { useId, useState } from 'react'
import { CONSENT_OPTIONS, everyOption, hasStoredChoice, saveConsent } from '../lib/consent'
import type { ConsentKey, ConsentSelection } from '../lib/consent'
import { asset } from '../lib/asset'

/**
 * First-visit cookie banner, as on the live site: Accept All, Reject all, or "I want to choose" to pick categories.
 * The choice is stored the same way as on the inner pages (see lib/consent.ts), so it is asked once for the whole site.
 */
export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(() => !hasStoredChoice())
  const [isChoosing, setIsChoosing] = useState(false)
  // Every category starts ticked, as on the live site; functionality is always on.
  const [selection, setSelection] = useState<ConsentSelection>(() => everyOption(true))
  const titleId = useId()
  const optionsId = useId()

  if (!isOpen) return null

  const finish = (chosen: ConsentSelection) => {
    saveConsent(chosen)
    setIsOpen(false)
  }
  const toggle = (key: ConsentKey, checked: boolean) => setSelection((current) => ({ ...current, [key]: checked }))

  return (
    <div className="cookie" role="dialog" aria-labelledby={titleId}>
      <h2 className="cookie__title" id={titleId}>Cookie Settings</h2>
      <p className="cookie__text">
        We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.
      </p>
      <a className="cookie__policy" href={asset('/privacy/')}>See our Privacy Policy</a>

      <div className="cookie__actions">
        <button type="button" className="btn btn--primary" onClick={() => finish(everyOption(true))}>Accept All</button>
        <button type="button" className="btn btn--secondary" onClick={() => finish(everyOption(false))}>Reject all</button>
        <button type="button" className="cookie__choose" aria-expanded={isChoosing} aria-controls={optionsId} onClick={() => setIsChoosing(true)}>
          I want to choose
        </button>
      </div>

      {isChoosing && (
        <div className="cookie__options" id={optionsId}>
          <div className="cookie__grid">
            {CONSENT_OPTIONS.map(({ key, label }) => {
              const isLocked = key === 'functionality_storage'
              return (
                <label className="cookie__option" key={key}>
                  <input
                    type="checkbox"
                    checked={isLocked || selection[key]}
                    disabled={isLocked}
                    onChange={(event) => toggle(key, event.target.checked)}
                  />
                  <span>{label}</span>
                </label>
              )
            })}
          </div>
          <button type="button" className="btn btn--primary" onClick={() => finish(selection)}>Accept selection</button>
        </div>
      )}
    </div>
  )
}
