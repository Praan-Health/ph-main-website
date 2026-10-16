import test from 'node:test'
import assert from 'node:assert/strict'
import { createHandler } from '../src/handler.js'

const goodBody = {
  formName: 'Contact Form',
  fields: { 'First Name': 'Asha', 'Last Name': 'Rao', 'Phone Number': '9845012345', 'Site of Pain': 'knee', 'Intensity of Pain': 'moderate' },
  pagePath: '/clinics/',
  pageUrl: 'https://praan.health/clinics/',
  eventId: 'lead_1_abc',
}

function setup(overrides = {}) {
  const calls = { stored: [], updated: [], forwarded: [] }
  const deps = {
    store: async (doc, collection) => { calls.stored.push({ ...doc, collection }); return 'doc1' },
    updateForward: async (id, result, collection) => { calls.updated.push([id, result, collection]) },
    forward: async (payload, headers) => { calls.forwarded.push([payload, headers]); return { ok: true, status: 200 } },
    config: { forwardEnabled: true, forwardForms: ['Contact Form'], environment: 'production', allowedOrigins: ['https://praan.health'], collections: { 'Contact Form': 'leads', 'Team Support Form': 'support' } },
    now: () => '2026-10-16T10:00:00.000Z',
    makeId: () => 'lead_generated',
    ...overrides,
  }
  return { handle: createHandler(deps), calls }
}
const req = (body, extra = {}) => ({ method: 'POST', headers: { origin: 'https://praan.health', 'user-agent': 'UA/1.0', 'x-forwarded-for': '203.0.113.9, 10.0.0.1' }, body, ...extra })

test('stores the submission first, then forwards it to n8n', async () => {
  const { handle, calls } = setup()
  const res = await handle(req(goodBody))
  assert.equal(res.status, 200)
  assert.equal(res.body.ok, true)
  assert.equal(calls.stored.length, 1)
  assert.equal(calls.stored[0].environment, 'production')
  assert.equal(calls.forwarded.length, 1)
  assert.equal(calls.forwarded[0][0].phone, '9845012345')
  assert.equal(calls.forwarded[0][0].client_ip_address, '203.0.113.9')
  assert.deepEqual(calls.updated[0], ['doc1', { ok: true, status: 200 }, 'leads'])
  assert.equal(calls.stored[0].collection, 'leads')
})

test('does not forward when forwarding is off, but still stores', async () => {
  const { handle, calls } = setup({ config: { forwardEnabled: false, forwardForms: ['Contact Form'], environment: 'production', allowedOrigins: ['https://praan.health'], collections: { 'Contact Form': 'leads', 'Team Support Form': 'support' } } })
  const res = await handle(req(goodBody))
  assert.equal(res.status, 200)
  assert.equal(calls.stored.length, 1)
  assert.equal(calls.forwarded.length, 0)
})

test('does not forward forms that are not in the forward list', async () => {
  const { handle, calls } = setup()
  const res = await handle(req({ formName: 'Team Support Form', fields: { 'First Name': 'Asha', Email: 'a@b.co', 'Additional Details': 'hi' } }))
  assert.equal(res.status, 200)
  assert.equal(calls.stored.length, 1)
  assert.equal(calls.forwarded.length, 0)
})

test('ignores a forward target supplied by the browser', async () => {
  const { handle, calls } = setup()
  await handle(req({ ...goodBody, forward: { target: 'https://evil.example', payload: { x: '1' } } }))
  assert.equal(calls.forwarded.length, 1)
  assert.equal(JSON.stringify(calls.forwarded[0][0]).includes('evil'), false)
})

test('still succeeds when n8n fails, and records the failure', async () => {
  const { handle, calls } = setup({ forward: async () => { throw new Error('boom') } })
  const res = await handle(req(goodBody))
  assert.equal(res.status, 200)
  assert.equal(calls.updated[0][1].ok, false)
})

test('forwards even if storing fails, so the lead is not lost', async () => {
  const { handle, calls } = setup({ store: async () => { throw new Error('firestore down') } })
  const res = await handle(req(goodBody))
  assert.equal(res.status, 200)
  assert.equal(calls.forwarded.length, 1)
})

test('fails only when nothing could be saved or forwarded', async () => {
  const { handle } = setup({
    store: async () => { throw new Error('firestore down') },
    forward: async () => { throw new Error('n8n down') },
  })
  const res = await handle(req(goodBody))
  assert.equal(res.status, 502)
  assert.equal(res.body.ok, false)
})

test('rejects invalid input with 400 and stores nothing', async () => {
  const { handle, calls } = setup()
  const res = await handle(req({ ...goodBody, fields: { ...goodBody.fields, 'Phone Number': '1' } }))
  assert.equal(res.status, 400)
  assert.equal(calls.stored.length, 0)
})

test('answers CORS preflight for an allowed origin only', async () => {
  const { handle } = setup()
  const ok = await handle({ method: 'OPTIONS', headers: { origin: 'https://praan.health' } })
  assert.equal(ok.status, 204)
  assert.equal(ok.headers['access-control-allow-origin'], 'https://praan.health')
  const bad = await handle({ method: 'OPTIONS', headers: { origin: 'https://evil.example' } })
  assert.equal(bad.headers['access-control-allow-origin'], undefined)
})

test('rejects a POST from a disallowed origin', async () => {
  const { handle, calls } = setup()
  const res = await handle(req(goodBody, { headers: { origin: 'https://evil.example', 'user-agent': 'x' } }))
  assert.equal(res.status, 403)
  assert.equal(calls.stored.length, 0)
})

test('rate limits a single visitor', async () => {
  const { handle } = setup()
  let last
  for (let i = 0; i < 12; i++) last = await handle(req(goodBody))
  assert.equal(last.status, 429)
})

test('answers the health check and unknown routes', async () => {
  const { handle } = setup()
  assert.equal((await handle({ method: 'GET', path: '/status', headers: {} })).status, 200)
  assert.equal((await handle({ method: 'GET', path: '/nope', headers: {} })).status, 404)
})

test('stores support requests in their own collection', async () => {
  const { handle, calls } = setup()
  await handle(req({ formName: 'Team Support Form', fields: { 'First Name': 'Asha', Email: 'a@b.co', 'Additional Details': 'hi' } }))
  assert.equal(calls.stored[0].collection, 'support')
})
