import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Each test creates an isolated HERMES_HOME and dynamically imports the
// module after setting the env var, since CLAUDE_HOME is captured at
// module-load time.
let tempHome = ''
let fakeUserHome = ''
let homedirSpy: ReturnType<typeof vi.spyOn> | undefined

async function importFresh() {
  // resetModules clears the registry so the module re-runs and picks up
  // the freshly-set HERMES_HOME (CLAUDE_HOME is captured at module load).
  vi.resetModules()
  return await import('./claude-config')
}

beforeEach(() => {
  tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-auth-test-'))
  fakeUserHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-userhome-test-'))
  process.env.HERMES_HOME = tempHome
  // Redirect os.homedir() so the Claude Code branch reads from a tmpdir,
  // never the real ~/.claude/.credentials.json.
  homedirSpy = vi.spyOn(os, 'homedir').mockReturnValue(fakeUserHome)
})

afterEach(() => {
  delete process.env.HERMES_HOME
  homedirSpy?.mockRestore()
  homedirSpy = undefined
  if (tempHome) {
    try {
      fs.rmSync(tempHome, { recursive: true, force: true })
    } catch {}
    tempHome = ''
  }
  if (fakeUserHome) {
    try {
      fs.rmSync(fakeUserHome, { recursive: true, force: true })
    } catch {}
    fakeUserHome = ''
  }
})

function writeClaudeCodeCreds(json: unknown) {
  const dir = path.join(fakeUserHome, '.claude')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, '.credentials.json'), JSON.stringify(json))
}

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

describe('checkAuthStore: ~/.claude/.credentials.json (Claude Code) detection', () => {
  it('returns hasToken=true and source=claude-code when claudeAiOauth.accessToken is set', async () => {
    writeClaudeCodeCreds({
      claudeAiOauth: {
        accessToken: 'sk-ant-oat01-EXAMPLEEXAMPLE',
        refreshToken: 'sk-ant-ort01-EXAMPLEEXAMPLE',
        expiresAt: 1730000000000,
        scopes: ['user:inference'],
        subscriptionType: 'pro',
      },
    })
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(true)
    expect(result.source).toBe('claude-code')
    expect(result.maskedKey).toBeDefined()
    expect(result.maskedKey).not.toContain('EXAMPLEEXAMPLE')
  })

  it('returns hasToken=false when ~/.claude/.credentials.json is missing and no other store has a token', async () => {
    // Nothing written under fakeUserHome/.claude — file simply does not exist.
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(false)
    expect(result.source).toBe('')
  })

  it('does NOT trigger claude-code branch for non-anthropic providers, even when file is present', async () => {
    writeClaudeCodeCreds({
      claudeAiOauth: { accessToken: 'sk-ant-oat01-EXAMPLEEXAMPLE' },
    })
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('openai-codex')
    expect(result.hasToken).toBe(false)
    expect(result.source).not.toBe('claude-code')
  })

  it('finds token via alternate shape data.oauth.accessToken', async () => {
    writeClaudeCodeCreds({
      oauth: { accessToken: 'sk-ant-oat01-ALT-SHAPE-EXAMPLE' },
    })
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(true)
    expect(result.source).toBe('claude-code')
  })

  it('finds token via top-level data.accessToken', async () => {
    writeClaudeCodeCreds({ accessToken: 'sk-ant-oat01-TOPLEVEL-EXAMPLE' })
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(true)
    expect(result.source).toBe('claude-code')
  })

  it('returns hasToken=false when claudeAiOauth.accessToken is empty string', async () => {
    writeClaudeCodeCreds({ claudeAiOauth: { accessToken: '' } })
    const { checkAuthStore } = await importFresh()
    const result = checkAuthStore('anthropic')
    expect(result.hasToken).toBe(false)
  })
})
