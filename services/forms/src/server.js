import http from 'node:http'
import { randomBytes } from 'node:crypto'
import { Firestore, FieldValue } from '@google-cloud/firestore'
import { loadConfig } from './config.js'
import { createHandler } from './handler.js'

const config = loadConfig()
const firestore = new Firestore()
const MAX_BODY_BYTES = 20_000
const N8N_TIMEOUT_MS = 10_000

async function store(doc, collection) {
  const ref = await firestore.collection(collection).add({ ...doc, receivedAt: FieldValue.serverTimestamp() })
  console.log(JSON.stringify({ severity: 'NOTICE', message: 'form_submission', id: ref.id, formName: doc.formName }))
  return ref.id
}

async function updateForward(id, result, collection) {
  await firestore.collection(collection).doc(id).update({ n8n: { ...result, at: new Date().toISOString() } })
}

async function forward(lead, visitorHeaders) {
  const res = await fetch(config.n8nUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...visitorHeaders },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(N8N_TIMEOUT_MS),
  })
  console.log(JSON.stringify({ severity: res.ok ? 'INFO' : 'ERROR', message: 'lead_forwarded', status: res.status }))
  return { ok: res.ok, status: res.status }
}

const handle = createHandler({
  store,
  updateForward,
  forward,
  config,
  now: () => new Date().toISOString(),
  makeId: () => `lead_${Date.now()}_${randomBytes(3).toString('hex')}`,
})

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  const send = ({ status, body, headers }) => {
    res.writeHead(status, { 'content-type': 'application/json', ...headers })
    res.end(body === null ? undefined : JSON.stringify(body))
  }
  try {
    const path = new URL(req.url ?? '/', 'http://localhost').pathname
    let body
    if (req.method === 'POST') {
      try {
        body = JSON.parse(await readBody(req))
      } catch {
        return send({ status: 400, body: { ok: false, error: 'invalid JSON' }, headers: {} })
      }
    }
    send(await handle({ method: req.method, path, headers: req.headers, body }))
  } catch (error) {
    console.error(JSON.stringify({ severity: 'ERROR', message: 'unhandled', error: String(error) }))
    send({ status: 500, body: { ok: false }, headers: {} })
  }
})

server.listen(config.port, () => console.log(JSON.stringify({ severity: 'INFO', message: 'listening', port: config.port, forward: config.forwardEnabled, environment: config.environment })))
