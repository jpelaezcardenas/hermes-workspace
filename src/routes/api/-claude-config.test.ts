import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Each test creates an isolated HERMES_HOME and dynamically imports the
// module after setting the env var, since CLAUDE_HOME is captured at
// module-load time.
let tempHome = ''

async function importFresh() {
  // resetModules clears the registry so the module re-runs and picks up
  // the freshly-set HERMES_HOME (CLAUDE_HOME is captured at module load).
  vi.resetModules()
  return await import('./claude-config')
}

beforeEach(() => {
  tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-auth-test-'))
  process.env.HERMES_HOME = tempHome
})

afterEach(() => {
  delete process.env.HERMES_HOME
  if (tempHome) {
    try {
      fs.rmSync(tempHome, { recursive: true, force: true })
    } catch {}
    tempHome = ''
  }
})

describe('checkAuthStore: ~/.hermes/auth.json detection', () => {
  it('returns hasToken=true when credential_pool[providerId][0].access_token is set', async () => {
    fs.writeFileSync(
      path.join(tempHome, 'auth.json'),
      JSON.stringify({
        credential_pool: {
          anthropic: [{ access_token: 'sk-ant-oat01-EXAMPLEEXAMPLEEXAMPLE' }],
        },
      }),
    )

    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(true)
    expect(result.source).toBe('hermes-auth-json')
    expect(result.maskedKey).toBeDefined()
    expect(result.maskedKey).not.toContain('EXAMPLEEXAMPLE')
  })

  it('returns hasToken=true when providers[id].state.tokens.access_token is set', async () => {
    fs.writeFileSync(
      path.join(tempHome, 'auth.json'),
      JSON.stringify({
        providers: {
          'openai-codex': {
            state: { tokens: { access_token: 'oai-codex-EXAMPLEEXAMPLE' } },
          },
        },
      }),
    )

    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('openai-codex')
    expect(result.hasToken).toBe(true)
    expect(result.source).toBe('hermes-auth-json')
  })

  it('returns hasToken=false when auth.json is missing', async () => {
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(false)
  })

  it('returns hasToken=false when token field is empty string', async () => {
    fs.writeFileSync(
      path.join(tempHome, 'auth.json'),
      JSON.stringify({
        credential_pool: {
          anthropic: [{ access_token: '' }],
        },
      }),
    )
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(false)
  })

  it('returns hasToken=false when token field has wrong type (number)', async () => {
    fs.writeFileSync(
      path.join(tempHome, 'auth.json'),
      JSON.stringify({
        credential_pool: {
          anthropic: [{ access_token: 12345 }],
        },
      }),
    )
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(false)
  })

  it('still finds tokens via legacy auth-profiles.json when present', async () => {
    fs.writeFileSync(
      path.join(tempHome, 'auth-profiles.json'),
      JSON.stringify({
        profiles: {
          'anthropic:default': { token: 'legacy-token-EXAMPLE' },
        },
      }),
    )
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(true)
    expect(result.source).toBe('claude-auth-store')
  })
})
