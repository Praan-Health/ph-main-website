// Input validation at the edge: only known forms, bounded sizes, a usable phone for lead forms.
export const KNOWN_FORMS = ['Contact Form', 'Team Support Form']

const MAX_FIELDS = 50
const MAX_VALUE = 2000
const MAX_KEY = 200
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const phoneDigits = (value) => String(value ?? '').replace(/\D/g, '')
export const phoneOf = (fields) => fields['Phone Number'] ?? fields.Phone ?? ''
export const nameOf = (fields) => (fields['First Name'] ?? '').trim()

const cleanText = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : null)

/** Returns {ok:true, value} with sanitised data, or {ok:false, error}. */
export function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false, error: 'body must be an object' }
  if (!KNOWN_FORMS.includes(body.formName)) return { ok: false, error: 'unknown formName' }

  const rawFields = body.fields && typeof body.fields === 'object' && !Array.isArray(body.fields) ? body.fields : {}
  const fields = {}
  for (const [key, raw] of Object.entries(rawFields).slice(0, MAX_FIELDS)) {
    const text = cleanText(raw, MAX_VALUE)
    if (text !== null) fields[key.slice(0, MAX_KEY)] = text
  }

  if (!nameOf(fields)) return { ok: false, error: 'a name is required' }
  const phone = phoneDigits(phoneOf(fields))
  if (body.formName === 'Contact Form' && (phone.length < 10 || phone.length > 15)) return { ok: false, error: 'a valid phone number is required' }
  if (fields.Email && !EMAIL.test(fields.Email)) return { ok: false, error: 'email is not valid' }

  return {
    ok: true,
    value: {
      formName: body.formName,
      fields,
      pagePath: cleanText(body.pagePath, 500) ?? '',
      pageUrl: cleanText(body.pageUrl, 1000) ?? '',
      eventId: cleanText(body.eventId, 100) ?? '',
      fbp: cleanText(body.fbp, 200) ?? '',
      fbc: cleanText(body.fbc, 300) ?? '',
    },
  }
}
