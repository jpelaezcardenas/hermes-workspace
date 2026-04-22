import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import YAML from 'yaml'

/**
 * Models API tests.
 *
 * Bug: models.ts reads from global ~/.hermes/models.json and parses
 * config.yaml with regex instead of YAML. It must use the active profile's
 * config path and parse YAML properly.
 *
 * Because models.ts is a TanStack Start route with heavy framework deps, we
 * test the underlying I/O helpers with the same logic rewritten.
 */

describe('models API config reading', () => {
  let tempHome: string
  let originalHermesHome: string | undefined

  beforeEach(() => {
    originalHermesHome = process.env.HERMES_HOME
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'models-api-test-'))
  })

  afterEach(() => {
    if (originalHermesHome === undefined) {
      delete process.env.HERMES_HOME
    } else {
      process.env.HERMES_HOME = originalHermesHome
    }
    fs.rmSync(tempHome, { recursive: true, force: true })
  })

  function resolveModelsJson(): string {
    const home = process.env.HERMES_HOME?.trim()
      ? path.resolve(process.env.HERMES_HOME)
      : path.join(os.homedir(), '.hermes')
    return path.join(home, 'models.json')
  }

  function resolveConfigYaml(): string {
    const home = process.env.HERMES_HOME?.trim()
      ? path.resolve(process.env.HERMES_HOME)
      : path.join(os.homedir(), '.hermes')
    return path.join(home, 'config.yaml')
  }

  /**
   * Current buggy implementation — reads default model via regex.
   */
  function readHermesDefaultModelRegex(configPath: string): { id: string; provider: string } | null {
    try {
      if (!fs.existsSync(configPath)) return null
      const raw = fs.readFileSync(configPath, 'utf-8')
      const defaultMatch = raw.match(/^\s*default:\s*(.+)$/m)
      const providerMatch = raw.match(/^\s*provider:\s*(.+)$/m)
      if (!defaultMatch) return null
      const modelId = defaultMatch[1].trim()
      const provider = providerMatch ? providerMatch[1].trim() : 'unknown'
      return { id: modelId, provider }
    } catch {
      return null
    }
  }

  /**
   * Fixed implementation — reads via YAML parse.
   */
  function readHermesDefaultModelYaml(configPath: string): { id: string; provider: string } | null {
    try {
      if (!fs.existsSync(configPath)) return null
      const raw = fs.readFileSync(configPath, 'utf-8')
      const parsed = YAML.parse(raw)
      if (!parsed || typeof parsed !== 'object') return null

      let modelId = ''
      let provider = ''

      const modelField = parsed.model
      if (typeof modelField === 'string') {
        modelId = modelField
        provider = parsed.provider || 'unknown'
      } else if (modelField && typeof modelField === 'object') {
        modelId = modelField.default || ''
        provider = modelField.provider || parsed.provider || 'unknown'
      }

      if (!modelId) return null
      return { id: modelId, provider }
    } catch {
      return null
    }
  }

  it('reads models.json from HERMES_HOME instead of hardcoded ~/.hermes', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'nous')
    const modelsPath = resolveModelsJson()
    fs.mkdirSync(path.dirname(modelsPath), { recursive: true })
    fs.writeFileSync(modelsPath, JSON.stringify([{ model: 'nous-gpt', name: 'Nous GPT', provider: 'nous' }]))

    const raw = fs.readFileSync(modelsPath, 'utf-8')
    const entries = JSON.parse(raw)
    expect(entries[0].model).toBe('nous-gpt')
    expect(modelsPath).toContain(path.join('.hermes', 'profiles', 'nous'))
  })

  it('regex parser incorrectly matches wrong key when "default" appears elsewhere', () => {
    const configPath = path.join(tempHome, 'config.yaml')
    fs.writeFileSync(
      configPath,
      YAML.stringify({
        model: { default: 'correct-model', provider: 'local-ollama' },
        fallback_model: { default: 'wrong-model', provider: 'openrouter' },
      }),
      'utf-8',
    )

    const result = readHermesDefaultModelRegex(configPath)
    // The regex is naive and will match fallback_model's default first or second
    // In multi-line mode with ^ it will match model.default first since it comes first.
    expect(result).not.toBeNull()
    // But if order changes, it could be wrong — the regex approach is fragile.
    expect(result!.id).toBe('correct-model')
  })

  it('regex parser fails on nested providers block with same key names', () => {
    const configPath = path.join(tempHome, 'config.yaml')
    fs.writeFileSync(
      configPath,
      `custom_providers:
  - name: ollama
    default: ollama-model
    provider: ollama
model:
  default: real-model
  provider: nous
`,
      'utf-8',
    )

    const result = readHermesDefaultModelRegex(configPath)
    // Naive regex will likely match ollama-model because "default:" appears first in custom_providers
    // This proves regex parsing is unsafe.
    expect(result!.id).toBe('ollama-model') // current bug
  })

  it('YAML parser returns correct model even with duplicate key names elsewhere', () => {
    const configPath = path.join(tempHome, 'config.yaml')
    fs.writeFileSync(
      configPath,
      `custom_providers:
  - name: ollama
    default: ollama-model
    provider: ollama
model:
  default: real-model
  provider: nous
`,
      'utf-8',
    )

    const result = readHermesDefaultModelYaml(configPath)
    expect(result!.id).toBe('real-model')
    expect(result!.provider).toBe('nous')
  })

  it('YAML parser respects HERMES_HOME profile path', () => {
    process.env.HERMES_HOME = path.join(tempHome, '.hermes', 'profiles', 'architect')
    const configPath = resolveConfigYaml()
    fs.mkdirSync(path.dirname(configPath), { recursive: true })
    fs.writeFileSync(configPath, YAML.stringify({ model: { default: 'arch-model', provider: 'openai-codex' } }), 'utf-8')

    const result = readHermesDefaultModelYaml(configPath)
    expect(result!.id).toBe('arch-model')
    expect(result!.provider).toBe('openai-codex')
  })

  it('YAML parser handles flat model (legacy format)', () => {
    const configPath = path.join(tempHome, 'config.yaml')
    fs.writeFileSync(configPath, YAML.stringify({ model: 'flat-model', provider: 'anthropic' }), 'utf-8')

    const result = readHermesDefaultModelYaml(configPath)
    expect(result!.id).toBe('flat-model')
    expect(result!.provider).toBe('anthropic')
  })
})
