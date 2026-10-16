import { nameOf, phoneDigits, phoneOf } from './validate.js'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'campaign']

const present = (object) => Object.fromEntries(Object.entries(object).filter(([, v]) => v !== '' && v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)))

/**
 * Builds the flat lead the n8n "Incoming Leads" webhook reads (top-level keys only, no nesting).
 * `source` is left as "website" unless the page URL carried one, so a lead never matches an unrelated
 * campaign route key by accident; with no route key the pipeline uses its `default` route.
 */
export function toLeadPayload(submission, context) {
  const { fields } = submission
  const first = nameOf(fields)
  const last = (fields['Last Name'] ?? '').trim()
  const site = (fields['Site of Pain'] ?? '').trim()
  const intensity = (fields['Intensity of Pain'] ?? '').trim()
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, (fields[key] ?? '').trim()]))

  return present({
    form_name: submission.formName,
    firstName: first,
    lastName: last,
    name: [first, last].filter(Boolean).join(' '),
    email: (fields.Email ?? '').trim().toLowerCase(),
    phone: phoneDigits(phoneOf(fields)),
    conditions: site ? [site] : [],
    condition_description: intensity ? `Intensity of pain: ${intensity}` : '',
    page_url: submission.pageUrl,
    landing_page: submission.pagePath,
    source: (fields.source ?? '').trim() || 'website',
    ...utm,
    event_id: context.eventId,
    fbp: context.fbp,
    fbc: context.fbc,
    client_ip_address: context.ip,
    client_user_agent: context.userAgent,
    submitted_at: context.now,
  })
}
