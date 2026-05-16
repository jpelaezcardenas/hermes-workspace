import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

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

const originalHermesHome = process.env.HERMES_HOME
const originalClaudeHome = process.env.CLAUDE_HOME
const originalHermesToken = process.env.HERMES_API_TOKEN
const originalClaudeToken = process.env.CLAUDE_API_TOKEN

let homeDir: string

beforeEach(() => {
  vi.resetModules()
  homeDir = mkdtempSync(join(tmpdir(), 'hermes-profiles-list-'))
  mkdirSync(join(homeDir, 'profiles', 'alpha'), { recursive: true })
  mkdirSync(join(homeDir, 'profiles', 'beta'), { recursive: true })
  writeFileSync(join(homeDir, 'active_profile'), 'alpha')
  process.env.HERMES_HOME = homeDir
  delete process.env.CLAUDE_HOME
  process.env.HERMES_API_TOKEN = 'profiles-token'
  delete process.env.CLAUDE_API_TOKEN
})

afterEach(() => {
  if (originalHermesHome === undefined) delete process.env.HERMES_HOME
  else process.env.HERMES_HOME = originalHermesHome
  if (originalClaudeHome === undefined) delete process.env.CLAUDE_HOME
  else process.env.CLAUDE_HOME = originalClaudeHome
  if (originalHermesToken === undefined) delete process.env.HERMES_API_TOKEN
  else process.env.HERMES_API_TOKEN = originalHermesToken
  if (originalClaudeToken === undefined) delete process.env.CLAUDE_API_TOKEN
  else process.env.CLAUDE_API_TOKEN = originalClaudeToken
  rmSync(homeDir, { recursive: true, force: true })
})

describe('GET /api/profiles/list', () => {
  it('returns 401 without session cookie or bearer token', async () => {
    const mod = await import('./list')
    const res = await (mod as any).Route.server.handlers.GET({
      request: new Request('http://localhost/api/profiles/list'),
    })

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns the profile list for bearer-token callers', async () => {
    const mod = await import('./list')
    const res = await (mod as any).Route.server.handlers.GET({
      request: new Request('http://localhost/api/profiles/list', {
        headers: { Authorization: 'Bearer profiles-token' },
      }),
    })

    expect(res.status).toBe(200)
    const body = (await res.json()) as {
      profiles: Array<{ name: string; active: boolean }>
      activeProfile: string
    }
    expect(body.activeProfile).toBe('alpha')
    expect(body.profiles.map((profile) => profile.name)).toEqual(
      expect.arrayContaining(['default', 'alpha', 'beta']),
    )
    expect(body.profiles.find((profile) => profile.name === 'alpha')?.active).toBe(
      true,
    )
  })
})
