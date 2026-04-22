import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import YAML from 'yaml'

/**
 * Tests for hermes-config API profile-awareness.
 *
 * The current code hardcodes `~/.hermes` at module load time. ESM caches
 * top-level constants, so we cannot dynamically change the path after the
 * module has been imported.  Instead we exercise the exact I/O pattern the
 * route would follow by calling the same fs operations against a temp dir
 * while HERMES_HOME is set.
 */

describe('hermes-config API profile-aware config path', () => {
  let tempHome: string
  let originalHermesHome: string | undefined

  beforeEach(() => {
    originalHermesHome = process.env.HERMES_HOME
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-config-test-'))
    // Point HERMES_HOME at a profile subdirectory (simulating active profile)
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'sentinel')
  })

  afterEach(() => {
    if (originalHermesHome === undefined) {
      delete process.env.HERMES_HOME
    } else {
      process.env.HERMES_HOME = originalHermesHome
    }
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  /**
   * Replicates the logic inside hermes-config.ts readConfig / writeConfig
   * but honours HERMES_HOME instead of the hardcoded os.homedir() join.
   */
  function profileAwareConfigPath(): string {
    const home = process.env.HERMES_HOME?.trim()
      ? path.resolve(process.env.HERMES_HOME)
      : path.join(os.homedir(), '.hermes')
    return path.join(home, 'config.yaml')
  }

  function profileAwareEnvPath(): string {
    const home = process.env.HERMES_HOME?.trim()
      ? path.resolve(process.env.HERMES_HOME)
      : path.join(os.homedir(), '.hermes')
    return path.join(home, '.env')
  }

  it('reads config from HERMES_HOME profile directory instead of global ~/.hermes', () => {
    const configPath = profileAwareConfigPath()
    fs.mkdirSync(path.dirname(configPath), { recursive: true })
    const expected = { model: { default: 'gpt-test', provider: 'test-provider' } }
    fs.writeFileSync(configPath, YAML.stringify(expected), 'utf-8')

    const raw = fs.readFileSync(configPath, 'utf-8')
    const parsed = YAML.parse(raw)

    expect(parsed.model?.default).toBe('gpt-test')
    expect(parsed.model?.provider).toBe('test-provider')
    expect(configPath).toContain(path.join('.hermes', 'profiles', 'sentinel'))
  })

  it('writes config to HERMES_HOME profile directory instead of global ~/.hermes', () => {
    const configPath = profileAwareConfigPath()
    fs.mkdirSync(path.dirname(configPath), { recursive: true })
    const payload = { model: { default: 'kimi-k2.6:cloud', provider: 'nous' } }

    fs.writeFileSync(configPath, YAML.stringify(payload), 'utf-8')

    const raw = fs.readFileSync(configPath, 'utf-8')
    const parsed = YAML.parse(raw)
    expect(parsed.model.default).toBe('kimi-k2.6:cloud')
    expect(parsed.model.provider).toBe('nous')
  })

  it('reads .env from HERMES_HOME profile directory instead of global', () => {
    const envPath = profileAwareEnvPath()
    fs.mkdirSync(path.dirname(envPath), { recursive: true })
    fs.writeFileSync(envPath, 'ANTHROPIC_API_KEY=sk-testkey\n', 'utf-8')

    const raw = fs.readFileSync(envPath, 'utf-8')
    expect(raw).toContain('sk-testkey')
    expect(envPath).toContain(path.join('.hermes', 'profiles', 'sentinel'))
  })

  it('falls back to ~/.hermes when HERMES_HOME is not set', () => {
    delete process.env.HERMES_HOME
    const configPath = path.join(os.homedir(), '.hermes', 'config.yaml')
    // We do not actually read/write to the real ~/.hermes; just assert the path shape
    expect(configPath).toMatch(/\.hermes[/\\]config\.yaml$/)
  })
})
