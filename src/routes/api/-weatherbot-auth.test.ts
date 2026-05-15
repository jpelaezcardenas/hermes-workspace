import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (_path: string) => (opts: any) => opts,
}))

vi.mock('@tanstack/react-start', () => ({
  json: (body: unknown, init?: ResponseInit) =>
    new Response(JSON.stringify(body), {
      ...(init || {}),
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    }),
}))

vi.mock('../../server/auth-middleware', () => ({
  requireLocalOrAuth: () => false,
}))

describe('weatherbot route auth', () => {
  it('rejects unauthenticated access to /api/weatherbot', async () => {
    vi.resetModules()
    const mod = await import('./weatherbot')
    const get = (mod as any).Route.server.handlers.GET

    const res = await get({
      request: new Request('http://localhost/api/weatherbot'),
    })

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ ok: false, error: 'Unauthorized' })
  })
})
