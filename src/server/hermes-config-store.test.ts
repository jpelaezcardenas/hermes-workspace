import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  applyHermesConfigPatch,
  resolveHermesConfigPaths,
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

describe('applyHermesConfigPatch', () => {
  it('set-default-model writes flat provider/model and replaces any nested form', () => {
    fs.mkdirSync(tmpHome, { recursive: true })
    fs.writeFileSync(
      path.join(tmpHome, 'config.yaml'),
      'model:\n  default: legacy\n  provider: legacy\n',
      'utf-8',
    )

    const paths = resolveHermesConfigPaths()
    applyHermesConfigPatch(paths, {
      action: 'set-default-model',
      providerId: 'openrouter',
      modelId: 'auto',
    })

    const onDisk = fs.readFileSync(path.join(tmpHome, 'config.yaml'), 'utf-8')
    expect(onDisk).toContain('provider: openrouter')
    expect(onDisk).toContain('model: auto')
    expect(onDisk).not.toContain('default: legacy')
  })

  it('set-api-key writes the env value to .env', () => {
    const paths = resolveHermesConfigPaths()
    applyHermesConfigPatch(paths, {
      action: 'set-api-key',
      envKey: 'OPENROUTER_API_KEY',
      value: 'sk-or-99999',
    })
    expect(fs.readFileSync(path.join(tmpHome, '.env'), 'utf-8')).toContain(
      'OPENROUTER_API_KEY=sk-or-99999',
    )
  })
})
