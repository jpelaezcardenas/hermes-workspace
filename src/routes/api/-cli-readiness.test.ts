import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

describe('cli-readiness API', () => {
  it('returns sanitized readiness JSON without raw auth details', async () => {
    vi.doMock('../../server/auth-middleware', () => ({
      requireLocalOrAuth: vi.fn(() => true),
    }))
    vi.doMock('../../server/cli-readiness', () => ({
      getCliReadiness: vi.fn(() => ({
        ok: true,
        checkedAt: 1777527540000,
        cli: {
          claude: {
            installed: true,
            path: '/usr/local/bin/claude',
            version: 'claude 2.1.0',
            authenticated: true,
            authMethod: 'claude.ai',
            status: 'ready',
            detail: 'Logged in with token sk-secret',
          },
          codex: {
            installed: true,
            path: '/usr/local/bin/codex',
            version: 'codex 0.128.0',
            authenticated: true,
            authMethod: 'chatgpt',
            status: 'ready',
            detail: 'Logged in as kaan@example.com',
          },
        },
        secrets: {
          codexAuthFilePresent: true,
          codexTokenPresent: true,
          hermesAuthFilePresent: true,
          hermesOpenAiCodexProviderPresent: true,
        },
      })),
      sanitizeCliReadiness: vi.fn((readiness) => ({
        ...readiness,
        cli: {
          claude: Object.fromEntries(Object.entries(readiness.cli.claude).filter(([key]) => key !== 'detail')),
          codex: Object.fromEntries(Object.entries(readiness.cli.codex).filter(([key]) => key !== 'detail')),
        },
      })),
    }))

    const { getCliReadinessResponse } = await import('./cli-readiness')
    const response = getCliReadinessResponse(new Request('http://local/api/cli-readiness'))
    const body = await response.json() as Record<string, any>
    const serialized = JSON.stringify(body)

    expect(body.ok).toBe(true)
    expect(body.cli.claude).not.toHaveProperty('detail')
    expect(body.cli.codex).not.toHaveProperty('detail')
    expect(serialized).not.toContain('sk-secret')
    expect(serialized).not.toContain('kaan@example.com')
  })
})
