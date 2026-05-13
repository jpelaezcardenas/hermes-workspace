#!/usr/bin/env node
/**
 * Dashboard Smoke Test — validates API endpoints return expected shapes.
 * Usage: node scripts/dashboard-smoke.mjs [baseUrl]
 * Default: http://localhost:3000
 */

const BASE = process.argv[2] || 'http://localhost:3000'
let passed = 0
let failed = 0

async function check(name, url, validate) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error(`❌ ${name}: HTTP ${res.status}`)
      failed++
      return
    }
    const data = await res.json()
    const result = validate(data)
    if (result === true) {
      console.log(`✅ ${name}`)
      passed++
    } else {
      console.error(`❌ ${name}: ${result}`)
      failed++
    }
  } catch (err) {
    console.error(`❌ ${name}: ${err.message}`)
    failed++
  }
}

// 1. Ping
await check('GET /api/ping', `${BASE}/api/ping`, (d) => {
  if (d.ok !== true) return 'missing ok:true'
  return true
})

// 2. Sessions
await check('GET /api/sessions', `${BASE}/api/sessions`, (d) => {
  // May be bare array or {sessions: [...]}
  const sessions = Array.isArray(d) ? d : d?.sessions
  if (!Array.isArray(sessions)) return 'expected sessions array'
  return true
})

// 3. Session Status
await check('GET /api/session-status', `${BASE}/api/session-status`, (d) => {
  if (!d.payload) return 'missing payload'
  if (!Array.isArray(d.payload.sessions))
    return 'expected payload.sessions array'
  return true
})

// 4. Provider Usage
await check('GET /api/provider-usage', `${BASE}/api/provider-usage`, (d) => {
  if (typeof d !== 'object' || d === null) return 'expected object payload'
  if (!Array.isArray(d.providers)) return 'expected providers array'
  return true
})
// 5. Context Usage
await check('GET /api/context-usage', `${BASE}/api/context-usage`, (d) => {
  if (d.ok !== true) return 'missing ok:true'
  if (typeof d.contextPercent !== 'number')
    return 'missing numeric contextPercent'
  return true
})

// 6. Models
await check('GET /api/models', `${BASE}/api/models`, (d) => {
  if (!Array.isArray(d) && !d.models) return 'expected array or {models:[]}'
  return true
})

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed > 0 ? 1 : 0)
