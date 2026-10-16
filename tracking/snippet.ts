/**
 * The analytics snippets injected into every page's <head> at build time (see vite.config.ts).
 *
 * Consent defaults and the gtag stub are always injected so the cookie banners' `gtag('consent', 'update', ...)` works.
 * The GTM, GA4 and Meta pixel loaders are only injected when VITE_TRACKING=on, so previews never send real traffic.
 */
export interface TrackingConfig {
  isOn: boolean
  gtmId: string
  ga4Id: string
  metaPixelId: string
}

// Same ids as praan-web's tracking.js; override with VITE_GTM_ID / VITE_GA4_ID / VITE_META_PIXEL_ID.
export const DEFAULT_IDS = { gtmId: 'GTM-T77MB23B', ga4Id: 'G-MSW0P2YL4K', metaPixelId: '591743524032156' } as const

const ID_PATTERNS = { gtmId: /^GTM-[A-Z0-9]+$/, ga4Id: /^G-[A-Z0-9]+$/, metaPixelId: /^\d+$/ } as const

export function readTrackingConfig(env: Record<string, string | undefined>): TrackingConfig {
  const config: TrackingConfig = {
    isOn: env.VITE_TRACKING === 'on',
    gtmId: env.VITE_GTM_ID || DEFAULT_IDS.gtmId,
    ga4Id: env.VITE_GA4_ID || DEFAULT_IDS.ga4Id,
    metaPixelId: env.VITE_META_PIXEL_ID || DEFAULT_IDS.metaPixelId,
  }
  // The ids end up inside inline scripts, so reject anything that is not a plain id.
  for (const key of Object.keys(ID_PATTERNS) as (keyof typeof ID_PATTERNS)[]) {
    if (!ID_PATTERNS[key].test(config[key])) throw new Error(`Invalid tracking id for ${key}: ${config[key]}`)
  }
  return config
}

const ALL_DENIED = '{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",personalization_storage:"denied",security_storage:"denied",functionality_storage:"denied"}'

/** Consent Mode defaults (from the saved "consentMode" choice, else all denied) and the gtag stub. Always injected. */
export const CONSENT_DEFAULTS = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;try{var c=localStorage.getItem("consentMode");if(c===null){gtag("consent","default",${ALL_DENIED});gtag("set","ads_data_redaction",false);}else{gtag("consent","default",JSON.parse(c));}}catch(e){}`

/** Keeps the Meta pixel's consent in step with ad_storage whenever the banner saves a choice. */
const META_CONSENT_SYNC = `(function(){var g=window.gtag;window.gtag=function(a,b,c){g.apply(null,arguments);if(a==="consent"&&b==="update"&&c&&window.fbq)window.fbq("consent",c.ad_storage==="granted"?"grant":"revoke");};})();`

export function trackingLoaders({ gtmId, ga4Id, metaPixelId }: TrackingConfig): string {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${ga4Id}';document.head.appendChild(s);window.gtag('js',new Date());window.gtag('config','${ga4Id}');})();
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
(function(){var granted=false;try{var c=localStorage.getItem("consentMode");granted=!!c&&JSON.parse(c).ad_storage==="granted";}catch(e){}fbq('consent',granted?'grant':'revoke');fbq('init','${metaPixelId}');fbq('track','PageView');})();
${META_CONSENT_SYNC}`
}

/** Everything to put in <head>: always the consent defaults, plus the loaders when tracking is on. */
export function trackingHead(config: TrackingConfig): string {
  const body = config.isOn ? `${CONSENT_DEFAULTS}\n${trackingLoaders(config)}` : CONSENT_DEFAULTS
  return `<script>${body}</script>`
}
