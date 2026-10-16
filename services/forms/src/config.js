const list = (value, fallback) => (value ?? fallback).split(',').map((s) => s.trim()).filter(Boolean)

/** All settings come from environment variables (set on the Cloud Run service). */
export function loadConfig(env = process.env) {
  const forwardEnabled = env.FORWARD_TO_N8N === 'on'
  if (forwardEnabled && !env.N8N_WEBHOOK_URL) throw new Error('N8N_WEBHOOK_URL is required when FORWARD_TO_N8N=on')
  return {
    port: Number(env.PORT ?? 8080),
    environment: env.ENVIRONMENT ?? 'production',
    // Leads (callback and Contact page) and support requests are kept apart.
    collections: {
      'Contact Form': env.FIRESTORE_COLLECTION ?? 'websiteFormSubmissions',
      'Team Support Form': env.SUPPORT_COLLECTION ?? 'websiteSupportRequests',
    },
    allowedOrigins: list(env.ALLOWED_ORIGINS, 'https://praan-health.github.io,https://praan.health,https://www.praan.health'),
    forwardEnabled,
    forwardForms: list(env.FORWARD_FORMS, 'Contact Form'),
    n8nUrl: env.N8N_WEBHOOK_URL ?? '',
  }
}
