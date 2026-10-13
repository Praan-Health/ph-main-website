import { useState } from 'react'
import { asset } from '../lib/asset'

/**
 * First-visit cookie banner. Same storage key and shape as the banner on the inner pages
 * (src/protocols/components/layout/CookieConsent.tsx), a Google Consent Mode object, so a choice
 * made on any page applies everywhere and the banner only ever shows once.
 */
const STORAGE_KEY = 'consentMode'

const CONSENT_KEYS = [
  'functionality_storage',
  'analytics_storage',
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'personalization_storage',
  'security_storage',
] as const

type ConsentKey = (typeof CONSENT_KEYS)[number]
type ConsentMode = Record<ConsentKey, 'granted' | 'denied'>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function hasStoredChoice(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    // Storage blocked: treat as no choice yet so the visitor can still answer.
    return false
  }
}

function saveConsent(acceptAll: boolean): void {
  const mode = Object.fromEntries(
    CONSENT_KEYS.map((key) => [key, key === 'functionality_storage' || acceptAll ? 'granted' : 'denied']),
  ) as ConsentMode
  window.gtag?.('consent', 'update', mode)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mode))
  } catch {
    // Private mode: the choice still applies for this page view.
  }
}

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(() => !hasStoredChoice())

  if (!isOpen) return null

  const choose = (acceptAll: boolean) => {
    saveConsent(acceptAll)
    setIsOpen(false)
  }

  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-title">
      <h2 className="cookie__title" id="cookie-title">Cookie settings</h2>
      <p className="cookie__text">
        We use cookies to give you the best experience and to understand how the site is used, so we can keep improving it.{' '}
        <a href={asset('/privacy/')}>See our Privacy Policy</a>
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--primary" onClick={() => choose(true)}>Accept all</button>
        <button type="button" className="btn btn--secondary" onClick={() => choose(false)}>Reject all</button>
      </div>
    </div>
  )
}
