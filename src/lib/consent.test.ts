import { describe, expect, it } from 'vitest'
import { CONSENT_OPTIONS, buildConsentMode, everyOption } from './consent'

describe('buildConsentMode', () => {
  it('grants everything when all options are chosen', () => {
    const mode = buildConsentMode(everyOption(true))
    expect(Object.values(mode).every((value) => value === 'granted')).toBe(true)
  })

  it('denies everything except functionality when none are chosen', () => {
    const mode = buildConsentMode(everyOption(false))
    expect(mode.functionality_storage).toBe('granted')
    expect(Object.entries(mode).filter(([, value]) => value === 'granted').map(([key]) => key)).toEqual(['functionality_storage'])
  })

  it('follows a custom selection', () => {
    const mode = buildConsentMode({ ...everyOption(false), analytics_storage: true, ad_storage: true })
    expect(mode.analytics_storage).toBe('granted')
    expect(mode.ad_storage).toBe('granted')
    expect(mode.ad_personalization).toBe('denied')
    expect(mode.security_storage).toBe('denied')
  })

  it('always keeps functionality on, even if it is unticked', () => {
    expect(buildConsentMode({ ...everyOption(true), functionality_storage: false }).functionality_storage).toBe('granted')
  })
})

describe('CONSENT_OPTIONS', () => {
  it('lists the seven categories the live site shows, in order', () => {
    expect(CONSENT_OPTIONS.map((option) => option.label)).toEqual([
      'Functionality',
      'Analytics Storage',
      'Ad Storage',
      'Ad User Data',
      'Ad Personalisation',
      'Personalization Storage',
      'Security Storage',
    ])
  })
})
