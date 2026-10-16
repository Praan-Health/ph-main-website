import test from 'node:test'
import assert from 'node:assert/strict'
import { validateSubmission } from '../src/validate.js'

const base = {
  formName: 'Contact Form',
  fields: { 'First Name': 'Asha', 'Last Name': 'Rao', 'Phone Number': '98450 12345', 'Site of Pain': 'knee', 'Intensity of Pain': 'moderate' },
  pagePath: '/clinics/',
  pageUrl: 'https://praan.health/clinics/',
}

test('accepts a complete callback request', () => {
  const result = validateSubmission(base)
  assert.equal(result.ok, true)
  assert.equal(result.value.formName, 'Contact Form')
})

test('rejects an unknown form name', () => {
  const result = validateSubmission({ ...base, formName: 'Random Form' })
  assert.equal(result.ok, false)
  assert.match(result.error, /formName/)
})

test('rejects a callback request without a usable phone number', () => {
  const result = validateSubmission({ ...base, fields: { ...base.fields, 'Phone Number': '12345' } })
  assert.equal(result.ok, false)
  assert.match(result.error, /phone/i)
})

test('rejects a callback request without a name', () => {
  const result = validateSubmission({ ...base, fields: { ...base.fields, 'First Name': '  ' } })
  assert.equal(result.ok, false)
  assert.match(result.error, /name/i)
})

test('support form does not need a phone number', () => {
  const result = validateSubmission({ formName: 'Team Support Form', fields: { 'First Name': 'Asha', Email: 'a@b.co', 'Additional Details': 'hi' } })
  assert.equal(result.ok, true)
})

test('trims values, caps lengths and drops non-string fields', () => {
  const long = 'x'.repeat(5000)
  const result = validateSubmission({ ...base, fields: { ...base.fields, Notes: long, Bad: { a: 1 } } })
  assert.equal(result.ok, true)
  assert.equal(result.value.fields.Notes.length, 2000)
  assert.equal('Bad' in result.value.fields, false)
})

test('accepts the Contact page field names (Phone, Email)', () => {
  const result = validateSubmission({ formName: 'Contact Form', fields: { 'First Name': 'Asha', 'Last Name': 'Rao', Email: 'a@b.co', Phone: '+91 98450 12345' } })
  assert.equal(result.ok, true)
})

test('rejects a malformed email when one is given', () => {
  const result = validateSubmission({ formName: 'Team Support Form', fields: { 'First Name': 'Asha', Email: 'not-an-email' } })
  assert.equal(result.ok, false)
  assert.match(result.error, /email/i)
})

test('rejects a non-object body', () => {
  assert.equal(validateSubmission(null).ok, false)
  assert.equal(validateSubmission('x').ok, false)
})
