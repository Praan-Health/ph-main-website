import { validateSubmission } from './validate.js'
import { toLeadPayload } from './n8n.js'

const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000

const json = (status, body, headers = {}) => ({ status, body, headers })

function corsHeaders(origin, allowedOrigins) {
  if (!origin || !allowedOrigins.includes(origin)) return {}
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'Origin',
  }
}

const visitorIp = (headers) => (headers['x-forwarded-for'] ?? '').split(',')[0].trim()

function makeRateLimiter() {
  const hits = new Map()
  return (key) => {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) hits.clear()
    return recent.length > RATE_LIMIT
  }
}

/**
 * The request logic, free of HTTP and cloud clients so it can be tested. Order matters: validate, store the
 * submission (the safety net n8n's 30-day history is not), then forward to the Incoming Leads webhook.
 * A failure in either one alone never fails the visitor; both failing does.
 */
export function createHandler({ store, updateForward, forward, config, now, makeId }) {
  const isLimited = makeRateLimiter()

  return async function handle(req) {
    const headers = req.headers ?? {}
    const cors = corsHeaders(headers.origin, config.allowedOrigins)
    const path = req.path ?? '/api/forms'

    if (req.method === 'GET' && path === '/status') return json(200, { ok: true })
    if (path !== '/api/forms') return json(404, { ok: false, error: 'not found' })
    if (req.method === 'OPTIONS') return { status: 204, body: null, headers: cors }
    if (req.method !== 'POST') return json(405, { ok: false, error: 'method not allowed' }, cors)
    if (headers.origin && !cors['access-control-allow-origin']) return json(403, { ok: false, error: 'origin not allowed' })

    const ip = visitorIp(headers)
    if (isLimited(ip || 'unknown')) return json(429, { ok: false, error: 'too many requests' }, cors)

    const checked = validateSubmission(req.body)
    if (!checked.ok) return json(400, { ok: false, error: checked.error }, cors)
    const submission = checked.value

    const eventId = submission.eventId || makeId()
    const userAgent = headers['user-agent'] ?? ''
    const receivedAt = now()
    const collection = config.collections[submission.formName]

    let docId = null
    let storeError = null
    try {
      docId = await store({
        formName: submission.formName,
        fields: submission.fields,
        pagePath: submission.pagePath,
        source: submission.pageUrl,
        eventId,
        environment: config.environment,
        site: 'ph-main-website',
        ip,
        userAgent,
        origin: headers.origin ?? null,
      }, collection)
    } catch (error) {
      storeError = error
      console.error(JSON.stringify({ severity: 'ERROR', message: 'form_store_failed', error: String(error), submission }))
    }

    const shouldForward = config.forwardEnabled && config.forwardForms.includes(submission.formName)
    let forwardResult = null
    if (shouldForward) {
      const lead = toLeadPayload(submission, { eventId, ip, userAgent, fbp: submission.fbp, fbc: submission.fbc, now: receivedAt })
      try {
        forwardResult = await forward(lead, { 'user-agent': userAgent, 'x-forwarded-for': ip })
      } catch (error) {
        forwardResult = { ok: false, error: String(error) }
        console.error(JSON.stringify({ severity: 'ERROR', message: 'lead_forward_failed', error: String(error), lead }))
      }
      if (docId) {
        try {
          await updateForward(docId, forwardResult, collection)
        } catch (error) {
          console.error(JSON.stringify({ severity: 'WARNING', message: 'forward_status_not_saved', error: String(error) }))
        }
      }
    }

    const saved = !storeError
    const forwarded = forwardResult?.ok === true
    if (!saved && !forwarded) return json(502, { ok: false, error: 'could not save the submission' }, cors)
    return json(200, { ok: true }, cors)
  }
}
