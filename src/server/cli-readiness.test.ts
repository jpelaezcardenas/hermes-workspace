import { afterEach, describe, expect, it, vi } from 'vitest'

const originalEnv = { ...process.env }

afterEach(() => {
  process.env = { ...originalEnv }
  vi.resetModules()
  vi.clearAllMocks()
  vi.unstubAllEnvs()
})

describe('cli-readiness', () => {
  it('reports sanitized Claude and Codex login readiness without exposing raw secrets', async () => {
    vi.doMock('node:child_process', () => ({
      execFileSync: vi.fn((command: string, args: Array<string> = []) => {
        if (command === 'which' && args[0] === 'claude') return '/home/kaan/.local/bin/claude\n'
        if (command === 'which' && args[0] === 'codex') return '/home/kaan/.npm-global/bin/codex\n'
        if (command === '/home/kaan/.local/bin/claude' && args[0] === '--version') return '2.1.112 (Claude Code)\n'
        if (command === '/home/kaan/.local/bin/claude' && args[0] === 'auth') return 'Logged in as kaan@example.com with token sk-secret\n'
        if (command === '/home/kaan/.npm-global/bin/codex' && args[0] === '--version') return 'codex-cli 0.128.0\n'
        if (command === '/home/kaan/.npm-global/bin/codex' && args[0] === 'login') return 'Logged in with ChatGPT\n'
        throw new Error(`unexpected command ${command} ${args.join(' ')}`)
      }),
    }))
    vi.doMock('node:fs', () => ({
      existsSync: vi.fn((target: string) => target.includes('.codex') || target.includes('.hermes')),
    }))

    const { getCliReadiness, redactSecrets, sanitizeCliReadiness } = await import('./cli-readiness')
    const readiness = getCliReadiness()
    const sanitized = sanitizeCliReadiness(readiness)

    expect(readiness.ok).toBe(true)
    expect(readiness.cli.claude).toMatchObject({ installed: true, authenticated: true, status: 'ready' })
    expect(readiness.cli.codex).toMatchObject({ installed: true, authenticated: true, status: 'ready' })
    expect(JSON.stringify(readiness)).not.toContain('sk-secret')
    expect(JSON.stringify(readiness)).not.toContain('kaan@example.com')
    expect(sanitized.cli.claude).not.toHaveProperty('detail')
    expect(sanitized.cli.codex).not.toHaveProperty('detail')
    expect(redactSecrets('OPENAI_API_KEY=sk-abc123 email=kaan@example.com token ghp_1234567890abcdef')).toContain('[REDACTED]')
  })
})
