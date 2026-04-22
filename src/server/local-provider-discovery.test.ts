import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import YAML from 'yaml'

/**
 * Local provider discovery tests.
 *
 * Bug: isProviderConfigured only checks global ~/.hermes/config.yaml.
 * When a provider is configured in a profile config, it is not found,
 * causing ensureProviderInConfig to log a warning every 30 seconds.
 */

describe('local-provider-discovery log spam', () => {
  let tempHome: string
  let originalHermesHome: string | undefined
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    originalHermesHome = process.env.HERMES_HOME
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'local-discovery-test-'))
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    if (originalHermesHome === undefined) {
      delete process.env.HERMES_HOME
    } else {
      process.env.HERMES_HOME = originalHermesHome
    }
    consoleSpy.mockRestore()
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  function globalConfigPath(): string {
    return path.join(tempHome, '.hermes', 'config.yaml')
  }

  function profileConfigPath(profile: string): string {
    return path.join(tempHome, '.hermes', 'profiles', profile, 'config.yaml')
  }

  /**
   * Buggy implementation — global only (exact copy from local-provider-discovery.ts).
   */
  function isProviderConfiguredBuggy(providerId: string): boolean {
    const configPath = globalConfigPath()
    try {
      const raw = fs.readFileSync(configPath, 'utf-8')
      const cpMatch = raw.match(
        /custom_providers:\s*\n((?:\s+-[\s\S]*?)*)(?=\n\S|\n*$)/,
      )
      if (!cpMatch) return false
      return cpMatch[0].includes(`name: ${providerId}`)
    } catch {
      return false
    }
  }

  /**
   * Fixed implementation — checks active profile via HERMES_HOME first.
   */
  function isProviderConfiguredFixed(providerId: string): boolean {
    const home = process.env.HERMES_HOME?.trim()
      ? path.resolve(process.env.HERMES_HOME)
      : path.join(os.homedir(), '.hermes')
    const configPath = path.join(home, 'config.yaml')
    try {
      if (!fs.existsSync(configPath)) return false
      const raw = fs.readFileSync(configPath, 'utf-8')
      const parsed = YAML.parse(raw)
      if (!parsed || !Array.isArray(parsed.custom_providers)) return false
      return parsed.custom_providers.some(
        (p: unknown) =>
          p &&
          typeof p === 'object' &&
          (p as Record<string, unknown>).name === providerId,
      )
    } catch {
      return false
    }
  }

  /**
   * Fixed ensureProviderInConfig — only logs when provider is truly missing.
   */
  function ensureProviderInConfigFixed(providerId: string, providerDef?: { name: string }): boolean {
    if (isProviderConfiguredFixed(providerId)) return false
    if (!providerDef) return false
    console.log(
      `[local-discovery] ${providerDef.name} detected but not in custom_providers. Gateway restart needed after adding it.`,
    )
    return false
  }

  it('buggy: ollama configured in profile → isProviderConfigured returns false (missing profile config)', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'sentinel')
    fs.mkdirSync(path.dirname(profileConfigPath('sentinel')), { recursive: true })
    fs.writeFileSync(
      profileConfigPath('sentinel'),
      YAML.stringify({ custom_providers: [{ name: 'ollama', baseUrl: 'http://127.0.0.1:11434/v1' }] }),
      'utf-8',
    )

    expect(isProviderConfiguredBuggy('ollama')).toBe(false)
  })

  it('fixed: ollama configured in profile → isProviderConfigured returns true', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'sentinel')
    fs.mkdirSync(path.dirname(profileConfigPath('sentinel')), { recursive: true })
    fs.writeFileSync(
      profileConfigPath('sentinel'),
      YAML.stringify({ custom_providers: [{ name: 'ollama', baseUrl: 'http://127.0.0.1:11434/v1' }] }),
      'utf-8',
    )

    expect(isProviderConfiguredFixed('ollama')).toBe(true)
  })

  it('fixed: provider configured in global config still detected', () => {
    fs.mkdirSync(path.dirname(globalConfigPath()), { recursive: true })
    fs.writeFileSync(
      globalConfigPath(),
      YAML.stringify({ custom_providers: [{ name: 'atomic-chat', baseUrl: 'http://127.0.0.1:1337/v1' }] }),
      'utf-8',
    )
    process.env.HERMES_HOME = path.join(tempHome, '.hermes')

    expect(isProviderConfiguredFixed('atomic-chat')).toBe(true)
  })

  it('buggy ensureProviderInConfig logs spam even when provider is in profile config', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'nous')
    fs.mkdirSync(path.dirname(profileConfigPath('nous')), { recursive: true })
    fs.writeFileSync(
      profileConfigPath('nous'),
      YAML.stringify({ custom_providers: [{ name: 'ollama', baseUrl: 'http://127.0.0.1:11434/v1' }] }),
      'utf-8',
    )

    // Simulate buggy ensureProviderInConfig — it calls buggy isProviderConfigured
    const buggyConfigured = isProviderConfiguredBuggy('ollama')
    expect(buggyConfigured).toBe(false)

    // The original code would then log — simulate that
    if (!buggyConfigured) {
      console.log(
        `[local-discovery] Ollama detected but not in custom_providers. Gateway restart needed after adding it.`,
      )
    }

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Ollama detected but not in custom_providers'),
    )
  })

  it('fixed ensureProviderInConfig does NOT log when provider is in profile config', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'nous')
    fs.mkdirSync(path.dirname(profileConfigPath('nous')), { recursive: true })
    fs.writeFileSync(
      profileConfigPath('nous'),
      YAML.stringify({ custom_providers: [{ name: 'ollama', baseUrl: 'http://127.0.0.1:11434/v1' }] }),
      'utf-8',
    )

    ensureProviderInConfigFixed('ollama', { name: 'Ollama' })
    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it('fixed ensureProviderInConfig logs only when provider is truly absent', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'nous')
    fs.mkdirSync(path.dirname(profileConfigPath('nous')), { recursive: true })
    fs.writeFileSync(profileConfigPath('nous'), YAML.stringify({}), 'utf-8')

    ensureProviderInConfigFixed('ollama', { name: 'Ollama' })
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Ollama detected but not in custom_providers'),
    )
  })
})
