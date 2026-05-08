import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  getOAuthSetupMode,
  getOAuthStartButtonLabel,
  getProviderClickAction,
} from './settings-dialog'

describe('getProviderClickAction', () => {
  it('opens OAuth setup for OAuth providers instead of saving config', () => {
    expect(getProviderClickAction({ authType: 'oauth', hasKey: true })).toBe(
      'oauth',
    )
  })

  it('opens local setup for local providers instead of saving config', () => {
    expect(getProviderClickAction({ authType: 'none', hasKey: true })).toBe(
      'local',
    )
  })

  it('selects configured API-key providers', () => {
    expect(getProviderClickAction({ authType: 'api_key', hasKey: true })).toBe(
      'select',
    )
  })

  it('opens Custom setup instead of saving provider config on card click', () => {
    expect(
      getProviderClickAction({
        providerId: 'custom',
        authType: 'api_key',
        hasKey: true,
      }),
    ).toBe('custom')
  })

  it('ignores API-key providers that are missing credentials', () => {
    expect(getProviderClickAction({ authType: 'api_key', hasKey: false })).toBe(
      'ignore',
    )
  })
})

describe('local provider setup copy', () => {
  it('does not render meta or lecture copy for local provider cards', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).not.toContain(
      'Clicking this card does not change Hermes config',
    )
    expect(source).not.toContain('{provider.name} Local')
    expect(source).not.toContain(
      'Start Ollama locally, then refresh provider detection',
    )
  })
})

describe('active provider ring', () => {
  it('keeps setup clicks in the existing inline active-card expression', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain(
      '(oauthProviderId || localProviderId || activeProvider) === p.id',
    )
    expect(source).not.toContain('getHighlightedProviderId')
  })
})

describe('settings save message copy', () => {
  it('normalizes legacy backend Claude restart copy before display', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain("replace('Restart Claude', 'Restart Hermes')")
  })
})

describe('canonical hermes-config endpoint', () => {
  it('reads and writes the canonical /api/hermes-config route', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain("'/api/hermes-config'")
    expect(source).not.toContain("'/api/claude-config'")
  })
})

describe('detail panel mutual exclusivity', () => {
  it('hides the api-key model panel when oauth or local detail is open', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain(
      '!oauthProviderId && !localProviderId && activeProvider',
    )
  })

  it('clears the provider preview when entering oauth or local mode', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain('const clearProviderPreview =')
    expect(source).toMatch(
      /resetOAuthState[\s\S]*?clearProviderPreview\(\)/,
    )
    expect(source).toMatch(
      /showLocalProviderSetup[\s\S]*?clearProviderPreview\(\)/,
    )
  })
})

describe('default-model controls', () => {
  it('uses the explicit set-default-model action instead of saving provider on card click', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain("action: 'set-default-model'")
    expect(source).not.toMatch(
      /save\(\{ config: \{ model, provider: providerId \} \}/,
    )
    expect(source).not.toMatch(
      /save\(\{ config: \{ provider: providerId \} \}/,
    )
  })

  it('renders an explicit "Set as default" control', () => {
    const source = fs.readFileSync(
      new URL('./settings-dialog.tsx', import.meta.url),
      'utf-8',
    )

    expect(source).toContain('Set as default')
  })
})

describe('getOAuthSetupMode', () => {
  it('uses WebUI device flow for Nous Portal', () => {
    expect(getOAuthSetupMode('nous')).toBe('device-code')
  })

  it('uses WebUI device flow for OpenAI Codex', () => {
    expect(getOAuthSetupMode('openai-codex')).toBe('device-code')
  })
})

describe('getOAuthStartButtonLabel', () => {
  it('uses generic action text instead of repeating the provider name', () => {
    expect(getOAuthStartButtonLabel('idle')).toBe('Start OAuth')
  })

  it('uses waiting text while the OAuth flow is active', () => {
    expect(getOAuthStartButtonLabel('starting')).toBe('Waiting...')
    expect(getOAuthStartButtonLabel('pending')).toBe('Waiting...')
  })
})
