import test from 'node:test'
import assert from 'node:assert/strict'
import { toLeadPayload } from '../src/n8n.js'

const submission = {
  formName: 'Contact Form',
  fields: {
    'First Name': 'Asha',
    'Last Name': 'Rao',
    'Phone Number': '98450 12345',
    'Site of Pain': 'knee',
    'Intensity of Pain': 'moderate',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: '',
  },
  pagePath: '/clinics/',
  pageUrl: 'https://praan.health/clinics/?utm_source=google',
}
const context = { eventId: 'lead_1_abc', ip: '203.0.113.9', userAgent: 'UA/1.0', fbp: 'fb.1.1.2', fbc: '', now: '2026-10-16T10:00:00.000Z' }

test('maps the callback form to the flat shape the Incoming Leads webhook reads', () => {
  const lead = toLeadPayload(submission, context)
  assert.equal(lead.firstName, 'Asha')
  assert.equal(lead.lastName, 'Rao')
  assert.equal(lead.name, 'Asha Rao')
  assert.equal(lead.phone, '9845012345')
  assert.equal(lead.page_url, 'https://praan.health/clinics/?utm_source=google')
  assert.equal(lead.landing_page, '/clinics/')
  assert.equal(lead.utm_source, 'google')
  assert.equal(lead.utm_medium, 'cpc')
})

test('sends pain details as conditions', () => {
  const lead = toLeadPayload(submission, context)
  assert.deepEqual(lead.conditions, ['knee'])
  assert.equal(lead.condition_description, 'Intensity of pain: moderate')
})

test('carries the event id, visitor ip and user agent for Meta deduplication', () => {
  const lead = toLeadPayload(submission, context)
  assert.equal(lead.event_id, 'lead_1_abc')
  assert.equal(lead.client_ip_address, '203.0.113.9')
  assert.equal(lead.client_user_agent, 'UA/1.0')
  assert.equal(lead.fbp, 'fb.1.1.2')
  assert.equal('fbc' in lead, false)
  assert.equal(lead.submitted_at, '2026-10-16T10:00:00.000Z')
})

test('omits empty values so the pipeline falls through to its defaults', () => {
  const lead = toLeadPayload(submission, context)
  assert.equal('utm_campaign' in lead, false)
})

test('never puts a route key in source unless the form sent one', () => {
  const lead = toLeadPayload(submission, context)
  assert.equal(lead.source, 'website')
})

test('reads the Contact page spelling of phone and email', () => {
  const lead = toLeadPayload({ formName: 'Contact Form', fields: { 'First Name': 'Asha', 'Last Name': 'Rao', Email: 'A@B.co', Phone: '+91 98450 12345' }, pagePath: '/contact/', pageUrl: 'https://praan.health/contact/' }, context)
  assert.equal(lead.phone, '919845012345')
  assert.equal(lead.email, 'a@b.co')
  assert.equal('conditions' in lead, false)
})
