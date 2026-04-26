import { describe, it, expect, vi, beforeEach } from 'vitest'
import path from 'node:path'

const { existsSync, readFileSync, writeFileSync, mkdirSync } = vi.hoisted(() => ({
  existsSync: vi.fn().mockReturnValue(false),
  readFileSync: vi.fn().mockReturnValue(''),
  writeFileSync: vi.fn().mockImplementation(() => {}),
  mkdirSync: vi.fn().mockImplementation(() => {}),
}))

vi.mock('node:fs', () => ({
  default: { existsSync, readFileSync, writeFileSync, mkdirSync },
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
}))

const { homedir } = vi.hoisted(() => ({
  homedir: vi.fn().mockReturnValue('/home/testuser'),
}))

vi.mock('node:os', () => ({
  default: { homedir },
  homedir,
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
  delete process.env.HERMES_HOME
  delete process.env.HERMES_API_URL
  delete process.env.HERMES_DASHBOARD_URL
  delete process.env.HERMES_DASHBOARD_TOKEN
})

async function loadMod() {
  vi.resetModules()
  return import('../gateway-capabilities')
}

describe('gateway-capabilities', () => {
  it('default port is 8642', async () => {
    const mod = await loadMod()
    expect(mod.HERMES_API).toBe('http://127.0.0.1:8642')
  })

  it('setGatewayUrl fallback uses 8642 when env override is cleared', async () => {
    const mod = await loadMod()
    mod.setGatewayUrl('http://tailscale:9999')
    expect(mod.HERMES_API).toBe('http://tailscale:9999')

    const fallback = mod.setGatewayUrl(null as any)
    expect(fallback).toBe('http://127.0.0.1:8642')
    expect(mod.HERMES_API).toBe('http://127.0.0.1:8642')
  })

  it('respects HERMES_API_URL env when no override', async () => {
    process.env.HERMES_API_URL = 'http://localhost:9000'
    const mod = await loadMod()
    expect(mod.HERMES_API).toBe('http://localhost:9000')
  })

  it('getResolvedUrls reports default source when no env or file override', async () => {
    const mod = await loadMod()
    const resolved = mod.getResolvedUrls()
    expect(resolved.gateway).toBe('http://127.0.0.1:8642')
    expect(resolved.source).toBe('default')
  })

  function isDashboardSessionsCall(c: string): boolean {
    return (
      c.startsWith('http://dashboard:9119/') && c.includes('/api/sessions')
    )
  }

  it('tries dashboard API calls without auth before token fallback', async () => {
    process.env.HERMES_DASHBOARD_URL = 'http://dashboard:9119'
    const fetchMock = vi
      .fn()
      .mockImplementation(() => Promise.resolve(new Response('{}', { status: 200 })))
    vi.stubGlobal('fetch', fetchMock)

    const mod = await loadMod()
    await mod.dashboardFetch('/api/sessions')

    const sessionsCalls = fetchMock.mock.calls.filter((c) =>
      isDashboardSessionsCall(String(c[0])),
    )
    expect(sessionsCalls.length).toBeGreaterThanOrEqual(1)
    const init = sessionsCalls[0][1] as RequestInit
    const headers = new Headers(init?.headers)
    expect(headers.has('Authorization')).toBe(false)
  })

  it('adds dashboard auth only after a 401 response', async () => {
    process.env.HERMES_DASHBOARD_URL = 'http://dashboard:9119'
    process.env.HERMES_DASHBOARD_TOKEN = 'dashboard-token'
    let sessionsAttempt = 0
    const fetchMock = vi.fn().mockImplementation(() => {
      // Module load and probes may call fetch first; only /api/sessions emulates 401 then 200.
      return Promise.resolve(new Response('{}', { status: 200 }))
    })
    vi.stubGlobal('fetch', fetchMock)

    const mod = await loadMod()

    fetchMock.mockImplementation((url, init) => {
      if (isDashboardSessionsCall(String(url))) {
        if (sessionsAttempt++ === 0) {
          return Promise.resolve(new Response('', { status: 401 }))
        }
        return Promise.resolve(new Response('{}', { status: 200 }))
      }
      return Promise.resolve(new Response('{}', { status: 200 }))
    })
    await mod.dashboardFetch('/api/sessions')

    const sessionsCalls = fetchMock.mock.calls.filter((c) =>
      isDashboardSessionsCall(String(c[0])),
    )
    expect(sessionsCalls.length).toBeGreaterThanOrEqual(2)
    const firstHeaders = new Headers((sessionsCalls[0][1] as RequestInit)?.headers)
    const secondHeaders = new Headers((sessionsCalls[1][1] as RequestInit)?.headers)
    expect(firstHeaders.has('Authorization')).toBe(false)
    expect(secondHeaders.get('Authorization')).toBe('Bearer dashboard-token')
  })
})
