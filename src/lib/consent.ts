/**
 * Cookie choices as a Google Consent Mode object, stored in localStorage under "consentMode". The same key and shape
 * the inner pages and the Webflow site use, so a choice made on any page applies everywhere.
 */
export const CONSENT_STORAGE_KEY = 'consentMode'

export type ConsentKey =
  | 'functionality_storage'
  | 'analytics_storage'
  | 'ad_storage'
  | 'ad_user_data'
  | 'ad_personalization'
  | 'personalization_storage'
  | 'security_storage'

export type ConsentMode = Record<ConsentKey, 'granted' | 'denied'>
export type ConsentSelection = Record<ConsentKey, boolean>

/** The categories shown under "I want to choose", as on the live site. Functionality is always on. */
export const CONSENT_OPTIONS: readonly { key: ConsentKey; label: string }[] = [
  { key: 'functionality_storage', label: 'Functionality' },
  { key: 'analytics_storage', label: 'Analytics Storage' },
  { key: 'ad_storage', label: 'Ad Storage' },
  { key: 'ad_user_data', label: 'Ad User Data' },
  { key: 'ad_personalization', label: 'Ad Personalisation' },
  { key: 'personalization_storage', label: 'Personalization Storage' },
  { key: 'security_storage', label: 'Security Storage' },
]

export const everyOption = (value: boolean): ConsentSelection =>
  Object.fromEntries(CONSENT_OPTIONS.map(({ key }) => [key, value])) as ConsentSelection

export function buildConsentMode(selection: ConsentSelection): ConsentMode {
  return Object.fromEntries(
    CONSENT_OPTIONS.map(({ key }) => [key, key === 'functionality_storage' || selection[key] ? 'granted' : 'denied']),
  ) as ConsentMode
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function hasStoredChoice(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) !== null
  } catch {
    // Storage blocked: treat as no choice yet so the visitor can still answer.
    return false
  }
}

export function saveConsent(selection: ConsentSelection): void {
  const mode = buildConsentMode(selection)
  window.gtag?.('consent', 'update', mode)
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(mode))
  } catch {
    // Private mode: the choice still applies for this page view.
  }
}
