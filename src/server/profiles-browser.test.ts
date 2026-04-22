import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import YAML from 'yaml'

import { listProfiles, updateProfileConfig } from './profiles-browser'

describe('listProfiles', () => {
  let tempHome: string

  beforeEach(() => {
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-workspace-profiles-'))
    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  it('always includes the default profile even when a named profile is active', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profilesRoot = path.join(hermesRoot, 'profiles')
    const namedProfileRoot = path.join(profilesRoot, 'jarvis')

    fs.mkdirSync(namedProfileRoot, { recursive: true })
    fs.writeFileSync(path.join(hermesRoot, 'active_profile'), 'jarvis\n', 'utf-8')
    fs.writeFileSync(path.join(hermesRoot, 'config.yaml'), 'model: default-model\n', 'utf-8')
    fs.writeFileSync(path.join(namedProfileRoot, 'config.yaml'), 'model: named-model\n', 'utf-8')

    const profiles = listProfiles()
    const names = profiles.map((profile) => profile.name)

    expect(names).toContain('default')
    expect(names).toContain('jarvis')
    expect(profiles.find((profile) => profile.name === 'default')?.active).toBe(false)
    expect(profiles.find((profile) => profile.name === 'jarvis')?.active).toBe(true)
  })
})

describe('updateProfileConfig deep merge', () => {
  let tempHome: string

  beforeEach(() => {
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-workspace-profiles-'))
    vi.spyOn(os, 'homedir').mockReturnValue(tempHome)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    if (fs.existsSync(tempHome)) {
      fs.rmSync(tempHome, { recursive: true, force: true })
    }
  })

  /**
   * Buggy shallow merge — exact logic from profiles-browser.ts line 319.
   */
  function shallowMerge(
    current: Record<string, unknown>,
    patch: Record<string, unknown>,
  ): Record<string, unknown> {
    const merged = { ...current, ...patch }
    for (const key of Object.keys(merged)) {
      if (merged[key] === undefined) delete merged[key]
    }
    return merged
  }

  /**
   * Fixed deep merge — same logic as hermes-config.ts.
   */
  function deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    for (const [key, value] of Object.entries(source)) {
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        target[key] &&
        typeof target[key] === 'object'
      ) {
        deepMerge(
          target[key] as Record<string, unknown>,
          value as Record<string, unknown>,
        )
      } else {
        target[key] = value
      }
    }
    return target
  }

  it('shallow merge destroys nested keys when patching model.provider', () => {
    const current = {
      model: {
        default: 'kimi-k2.6:cloud',
        provider: 'local-ollama',
        fallback_model: 'anthropic-oauth/claude-sonnet-4-6',
        smart_model_routing: true,
      },
      agent: { name: 'Jules', max_turns: 10 },
    }
    const patch = { model: { provider: 'nous' } }

    const merged = shallowMerge(current, patch)

    // Shallow merge: the entire `model` object is overwritten
    expect(merged.model).toEqual({ provider: 'nous' })
    expect(merged.model).not.toHaveProperty('default')
    expect(merged.model).not.toHaveProperty('fallback_model')
    expect(merged.model).not.toHaveProperty('smart_model_routing')
  })

  it('deep merge preserves nested keys when patching model.provider', () => {
    const current = {
      model: {
        default: 'kimi-k2.6:cloud',
        provider: 'local-ollama',
        fallback_model: 'anthropic-oauth/claude-sonnet-4-6',
        smart_model_routing: true,
      },
      agent: { name: 'Jules', max_turns: 10 },
    }
    const patch = { model: { provider: 'nous' } }

    const merged = deepMerge({ ...current }, patch)

    expect(merged.model).toEqual({
      default: 'kimi-k2.6:cloud',
      provider: 'nous',
      fallback_model: 'anthropic-oauth/claude-sonnet-4-6',
      smart_model_routing: true,
    })
    expect(merged.agent).toEqual({ name: 'Jules', max_turns: 10 })
  })

  it('deep merge overwrites primitive nested values', () => {
    const current = {
      model: { default: 'old-model', provider: 'old-provider', temperature: 0.7 },
    }
    const patch = { model: { default: 'new-model', temperature: 0.9 } }

    const merged = deepMerge({ ...current }, patch)

    expect(merged.model).toEqual({
      default: 'new-model',
      provider: 'old-provider',
      temperature: 0.9,
    })
  })

  it('deep merge on real profile config file round-trips correctly', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profileRoot = path.join(hermesRoot, 'profiles', 'nous')
    fs.mkdirSync(profileRoot, { recursive: true })

    const initial = {
      model: {
        default: 'kimi-k2.6:cloud',
        provider: 'local-ollama',
        fallback_model: 'openrouter/free',
        smart_model_routing: true,
        temperature: 0.7,
      },
      agent: { name: 'Nous' },
      custom_providers: [{ name: 'ollama', baseUrl: 'http://127.0.0.1:11434/v1' }],
    }

    fs.writeFileSync(path.join(profileRoot, 'config.yaml'), YAML.stringify(initial), 'utf-8')

    // Simulate what updateProfileConfig does (but with deep merge)
    const configPath = path.join(profileRoot, 'config.yaml')
    const current = YAML.parse(fs.readFileSync(configPath, 'utf-8'))
    const patch = { model: { provider: 'nous' } }
    const merged = deepMerge(current, patch)
    fs.writeFileSync(configPath, YAML.stringify(merged), 'utf-8')

    const result = YAML.parse(fs.readFileSync(configPath, 'utf-8'))
    expect(result.model.default).toBe('kimi-k2.6:cloud')
    expect(result.model.provider).toBe('nous')
    expect(result.model.fallback_model).toBe('openrouter/free')
    expect(result.model.smart_model_routing).toBe(true)
    expect(result.model.temperature).toBe(0.7)
    expect(result.agent.name).toBe('Nous')
    expect(result.custom_providers).toHaveLength(1)
  })

  it('updateProfileConfig uses deep merge (already fixed)', () => {
    const hermesRoot = path.join(tempHome, '.hermes')
    const profileRoot = path.join(hermesRoot, 'profiles', 'nous')
    fs.mkdirSync(profileRoot, { recursive: true })

    const initial = {
      model: { default: 'kimi-k2.6:cloud', provider: 'local-ollama' },
      agent: { name: 'Nous' },
    }

    fs.writeFileSync(path.join(profileRoot, 'config.yaml'), YAML.stringify(initial), 'utf-8')

    // Current implementation already uses deep merge
    const result = updateProfileConfig('nous', { model: { provider: 'nous' } })

    // Fixed behavior: nested keys are preserved
    expect(result.config.model).toEqual({ default: 'kimi-k2.6:cloud', provider: 'nous' })
    expect(result.config.agent).toEqual({ name: 'Nous' })
  })
})
