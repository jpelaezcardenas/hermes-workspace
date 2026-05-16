import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => (opts: any) => opts,
}))

vi.mock('@tanstack/react-start', () => ({
  json: (body: unknown, init?: ResponseInit) =>
    new Response(JSON.stringify(body), {
      ...(init || {}),
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    }),
}))

vi.mock('../../server/gateway-capabilities', () => ({
  ensureGatewayProbed: async () => ({
    health: true,
    chatCompletions: true,
    models: true,
    dashboard: { available: false, url: 'http://localhost' },
    sessions: false,
    skills: false,
    config: false,
    memory: false,
    jobs: false,
    mcp: false,
    mcpFallback: false,
    conductor: false,
    kanban: false,
    streaming: false,
  }),
}))

const originalHermesToken = process.env.HERMES_API_TOKEN
const originalClaudeToken = process.env.CLAUDE_API_TOKEN
const originalPassword = process.env.CLAUDE_PASSWORD

beforeEach(() => {
  vi.resetModules()
})

afterEach(() => {
  if (originalHermesToken === undefined) delete process.env.HERMES_API_TOKEN
  else process.env.HERMES_API_TOKEN = originalHermesToken
  if (originalClaudeToken === undefined) delete process.env.CLAUDE_API_TOKEN
  else process.env.CLAUDE_API_TOKEN = originalClaudeToken
  if (originalPassword === undefined) delete process.env.CLAUDE_PASSWORD
  else process.env.CLAUDE_PASSWORD = originalPassword
})

describe('GET /api/auth-check', () => {
  it('reports authenticated for bearer-token callers', async () => {
    process.env.HERMES_API_TOKEN = 'auth-token'
    const mod = await import('./auth-check')
    const res = await (mod as any).Route.server.handlers.GET({
      request: new Request('http://localhost/api/auth-check', {
        headers: { Authorization: 'Bearer auth-token' },
      }),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ authenticated: true, authRequired: true })
  })

  it('reports auth required when token protection is configured but no credentials are present', async () => {
    process.env.HERMES_API_TOKEN = 'auth-token'
    const mod = await import('./auth-check')
    const res = await (mod as any).Route.server.handlers.GET({
      request: new Request('http://localhost/api/auth-check'),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ authenticated: false, authRequired: true })
  })
})
