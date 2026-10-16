import { describe, expect, it } from 'vitest'
import { DEFAULT_IDS, readTrackingConfig, trackingHead } from './snippet.ts'

describe('readTrackingConfig', () => {
  it('is off by default and uses the default ids', () => {
    expect(readTrackingConfig({})).toEqual({ isOn: false, ...DEFAULT_IDS })
  })

  it('turns on only for VITE_TRACKING=on', () => {
    expect(readTrackingConfig({ VITE_TRACKING: 'on' }).isOn).toBe(true)
    expect(readTrackingConfig({ VITE_TRACKING: 'true' }).isOn).toBe(false)
  })

  it('takes ids from the environment', () => {
    const config = readTrackingConfig({ VITE_GTM_ID: 'GTM-ABC123', VITE_GA4_ID: 'G-XYZ789', VITE_META_PIXEL_ID: '42' })
    expect(config).toMatchObject({ gtmId: 'GTM-ABC123', ga4Id: 'G-XYZ789', metaPixelId: '42' })
  })

  it('rejects ids that are not plain ids', () => {
    expect(() => readTrackingConfig({ VITE_GTM_ID: "x');alert(1);('" })).toThrow('gtmId')
    expect(() => readTrackingConfig({ VITE_META_PIXEL_ID: 'abc' })).toThrow('metaPixelId')
  })
})

describe('trackingHead', () => {
  it('only sets consent defaults while tracking is off', () => {
    const html = trackingHead(readTrackingConfig({}))
    expect(html).toContain('consent')
    expect(html).not.toContain('googletagmanager')
    expect(html).not.toContain('fbevents')
  })

  it('adds the GTM, GA4 and Meta loaders when on', () => {
    const html = trackingHead(readTrackingConfig({ VITE_TRACKING: 'on' }))
    expect(html).toContain(`gtm.js?id='+i`)
    expect(html).toContain(DEFAULT_IDS.gtmId)
    expect(html).toContain(`gtag/js?id=${DEFAULT_IDS.ga4Id}`)
    expect(html).toContain(`fbq('init','${DEFAULT_IDS.metaPixelId}')`)
  })

  it('denies everything by default until a choice is saved', () => {
    expect(trackingHead(readTrackingConfig({}))).toContain('analytics_storage:"denied"')
  })
})
