import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  applyHermesConfigPatch,
  parseEnvFile,
  readHermesConfigFiles,
  resolveHermesConfigPaths,
  stringifyEnv,
} from './hermes-config-store'

let tmpHome = ''
const originalEnv: Record<string, string | undefined> = {}

function setEnv(key: string, value: string | undefined) {
  if (!(key in originalEnv)) originalEnv[key] = process.env[key]
  if (value === undefined) delete process.env[key]
  else process.env[key] = value
}

beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-config-store-'))
  setEnv('HERMES_HOME', tmpHome)
  setEnv('CLAUDE_HOME', undefined)
})

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  for (const key of Object.keys(originalEnv)) delete originalEnv[key]
  fs.rmSync(tmpHome, { recursive: true, force: true })
})

describe('resolveHermesConfigPaths', () => {
  it('uses HERMES_HOME when set and points config + env + auth profiles inside it', () => {
    const paths = resolveHermesConfigPaths()

    expect(paths.hermesHome).toBe(tmpHome)
    expect(paths.configPath).toBe(path.join(tmpHome, 'config.yaml'))
    expect(paths.envPath).toBe(path.join(tmpHome, '.env'))
    expect(paths.authProfilesPath).toBe(path.join(tmpHome, 'auth-profiles.json'))
  })

  it('falls back to CLAUDE_HOME when HERMES_HOME is unset', () => {
    setEnv('HERMES_HOME', undefined)
    setEnv('CLAUDE_HOME', tmpHome)

    expect(resolveHermesConfigPaths().hermesHome).toBe(tmpHome)
  })
})

describe('parseEnvFile / stringifyEnv', () => {
  it('parses key=value lines, strips quotes, ignores comments and blank lines', () => {
    const raw = [
      '# top comment',
      '',
      'PLAIN=plain-value',
      'QUOTED="quoted value"',
      "SINGLE='single value'",
      '  SPACED = spaced  ',
    ].join('\n')

    expect(parseEnvFile(raw)).toEqual({
      PLAIN: 'plain-value',
      QUOTED: 'quoted value',
      SINGLE: 'single value',
      SPACED: 'spaced',
    })
  })

  it('round-trips env entries to KEY=VALUE lines with trailing newline', () => {
    expect(stringifyEnv({ A: 'one', B: 'two' })).toBe('A=one\nB=two\n')
  })
})

describe('readHermesConfigFiles', () => {
  it('returns empty config/env/authProfiles when files do not exist', () => {
    const paths = resolveHermesConfigPaths()
    expect(readHermesConfigFiles(paths)).toEqual({
      config: {},
      env: {},
      authProfiles: {},
    })
  })

  it('reads YAML config, .env, and auth-profiles.json from disk', () => {
    fs.mkdirSync(tmpHome, { recursive: true })
    fs.writeFileSync(
      path.join(tmpHome, 'config.yaml'),
      'provider: openrouter\nmodel: auto\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(tmpHome, '.env'),
      'OPENROUTER_API_KEY=sk-test-1234\n',
      'utf-8',
    )
    fs.writeFileSync(
      path.join(tmpHome, 'auth-profiles.json'),
      JSON.stringify({ profiles: { 'nous:default': { token: 'abc12345' } } }),
      'utf-8',
    )

    const paths = resolveHermesConfigPaths()
    const result = readHermesConfigFiles(paths)
    expect(result.config).toMatchObject({ provider: 'openrouter', model: 'auto' })
    expect(result.env).toEqual({ OPENROUTER_API_KEY: 'sk-test-1234' })
    expect(result.authProfiles).toMatchObject({
      profiles: { 'nous:default': { token: 'abc12345' } },
    })
  })
})

describe('applyHermesConfigPatch', () => {
  it('set-default-model writes flat provider/model and removes nested model object', () => {
    fs.mkdirSync(tmpHome, { recursive: true })
    fs.writeFileSync(
      path.join(tmpHome, 'config.yaml'),
      'model:\n  default: legacy\n  provider: legacy\n',
      'utf-8',
    )

    const paths = resolveHermesConfigPaths()
    const result = applyHermesConfigPatch(paths, {
      action: 'set-default-model',
      providerId: 'openrouter',
      modelId: 'auto',
    })

    expect(result.ok).toBe(true)
    const onDisk = fs.readFileSync(path.join(tmpHome, 'config.yaml'), 'utf-8')
    expect(onDisk).toContain('provider: openrouter')
    expect(onDisk).toContain('model: auto')
    expect(onDisk).not.toContain('default: legacy')
  })

  it('set-api-key writes the env value to .env', () => {
    const paths = resolveHermesConfigPaths()
    const result = applyHermesConfigPatch(paths, {
      action: 'set-api-key',
      envKey: 'OPENROUTER_API_KEY',
      value: 'sk-or-99999',
    })

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(path.join(tmpHome, '.env'), 'utf-8')).toContain(
      'OPENROUTER_API_KEY=sk-or-99999',
    )
  })

  it('remove-api-key deletes the env entry from .env', () => {
    fs.mkdirSync(tmpHome, { recursive: true })
    fs.writeFileSync(
      path.join(tmpHome, '.env'),
      'OPENROUTER_API_KEY=sk-old\nKEEP=yes\n',
      'utf-8',
    )

    const paths = resolveHermesConfigPaths()
    applyHermesConfigPatch(paths, {
      action: 'remove-api-key',
      envKey: 'OPENROUTER_API_KEY',
    })

    const onDisk = fs.readFileSync(path.join(tmpHome, '.env'), 'utf-8')
    expect(onDisk).not.toContain('OPENROUTER_API_KEY')
    expect(onDisk).toContain('KEEP=yes')
  })

  it('set-custom-provider upserts a custom_providers entry by name', () => {
    const paths = resolveHermesConfigPaths()

    applyHermesConfigPatch(paths, {
      action: 'set-custom-provider',
      provider: {
        name: 'my-gateway',
        baseUrl: 'https://models.example.test/v1',
        apiKeyEnv: 'MY_GATEWAY_KEY',
        apiMode: 'chat_completions',
      },
    })

    applyHermesConfigPatch(paths, {
      action: 'set-custom-provider',
      provider: {
        name: 'my-gateway',
        baseUrl: 'https://models.example.test/v2',
      },
    })

    const onDisk = fs.readFileSync(path.join(tmpHome, 'config.yaml'), 'utf-8')
    expect(onDisk).toContain('name: my-gateway')
    expect(onDisk).toContain('base_url: https://models.example.test/v2')
    expect(onDisk).not.toContain('https://models.example.test/v1')
  })

  it('remove-custom-provider drops a named entry', () => {
    fs.mkdirSync(tmpHome, { recursive: true })
    fs.writeFileSync(
      path.join(tmpHome, 'config.yaml'),
      [
        'custom_providers:',
        '  - name: keep-me',
        '    base_url: https://keep.test/v1',
        '  - name: drop-me',
        '    base_url: https://drop.test/v1',
        '',
      ].join('\n'),
      'utf-8',
    )

    const paths = resolveHermesConfigPaths()
    applyHermesConfigPatch(paths, {
      action: 'remove-custom-provider',
      name: 'drop-me',
    })

    const onDisk = fs.readFileSync(path.join(tmpHome, 'config.yaml'), 'utf-8')
    expect(onDisk).toContain('keep-me')
    expect(onDisk).not.toContain('drop-me')
  })
})
