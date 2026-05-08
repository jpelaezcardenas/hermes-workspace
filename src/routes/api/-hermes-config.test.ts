import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (_path: string) => (opts: any) => opts,
}))

vi.mock('../../server/auth-middleware', () => ({
  isAuthenticated: () => true,
}))

vi.mock('../../server/gateway-capabilities', () => ({
  ensureGatewayProbed: vi.fn(),
  getCapabilities: () => ({ config: true }),
}))

vi.mock('../../server/local-provider-discovery', () => ({
  ensureDiscovery: vi.fn(),
  getDiscoveryStatus: () => [],
  getDiscoveredModels: () => [],
}))

let tmpHome = ''
const originalEnv: Record<string, string | undefined> = {}

function setEnv(key: string, value: string | undefined) {
  if (!(key in originalEnv)) originalEnv[key] = process.env[key]
  if (value === undefined) delete process.env[key]
  else process.env[key] = value
}

beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-config-route-'))
  setEnv('HERMES_HOME', tmpHome)
  setEnv('CLAUDE_HOME', undefined)
  vi.resetModules()
})

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  for (const key of Object.keys(originalEnv)) delete originalEnv[key]
  fs.rmSync(tmpHome, { recursive: true, force: true })
})

async function loadHandlers(modulePath: string) {
  const mod = await import(modulePath)
  return (mod as any).Route.server.handlers
}

describe('canonical /api/hermes-config route', () => {
  it('GET returns normalized provider state with paths and active provider', async () => {
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

    const handlers = await loadHandlers('./hermes-config')
    const res = await handlers.GET({
      request: new Request('http://localhost/api/hermes-config'),
    })
    const body = await res.json()

    expect(body.ok).toBe(true)
    expect(body.activeProvider).toBe('openrouter')
    expect(body.activeModel).toBe('auto')
    expect(body.paths.hermesHome).toBe(tmpHome)
    const openrouter = body.providers.find((p: any) => p.id === 'openrouter')
    expect(openrouter.configured).toBe(true)
    expect(openrouter.isDefault).toBe(true)
  })

  it('PATCH with set-default-model action writes flat provider/model to disk', async () => {
    const handlers = await loadHandlers('./hermes-config')
    const res = await handlers.PATCH({
      request: new Request('http://localhost/api/hermes-config', {
        method: 'PATCH',
        body: JSON.stringify({
          action: 'set-default-model',
          providerId: 'openrouter',
          modelId: 'auto',
        }),
      }),
    })
    const body = await res.json()

    expect(body.ok).toBe(true)
    const onDisk = fs.readFileSync(path.join(tmpHome, 'config.yaml'), 'utf-8')
    expect(onDisk).toContain('provider: openrouter')
    expect(onDisk).toContain('model: auto')
  })

  it('PATCH with set-api-key action writes env value to .env', async () => {
    const handlers = await loadHandlers('./hermes-config')
    const res = await handlers.PATCH({
      request: new Request('http://localhost/api/hermes-config', {
        method: 'PATCH',
        body: JSON.stringify({
          action: 'set-api-key',
          envKey: 'OPENROUTER_API_KEY',
          value: 'sk-or-99999',
        }),
      }),
    })
    const body = await res.json()

    expect(body.ok).toBe(true)
    expect(fs.readFileSync(path.join(tmpHome, '.env'), 'utf-8')).toContain(
      'OPENROUTER_API_KEY=sk-or-99999',
    )
  })
})

describe('legacy /api/claude-config alias', () => {
  it('GET returns the same normalized payload as the canonical route', async () => {
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

    const handlers = await loadHandlers('./claude-config')
    const res = await handlers.GET({
      request: new Request('http://localhost/api/claude-config'),
    })
    const body = await res.json()

    expect(body.ok).toBe(true)
    expect(body.activeProvider).toBe('openrouter')
    expect(body.activeModel).toBe('auto')
  })

  it('PATCH still accepts legacy { config } body without false restart copy', async () => {
    const handlers = await loadHandlers('./claude-config')
    const res = await handlers.PATCH({
      request: new Request('http://localhost/api/claude-config', {
        method: 'PATCH',
        body: JSON.stringify({ config: { provider: 'openrouter' } }),
      }),
    })
    const body = await res.json()

    expect(body.ok).toBe(true)
    expect(body.message).not.toMatch(/restart/i)
  })

  it('PATCH set-default-model returns a non-restart acknowledgement', async () => {
    const handlers = await loadHandlers('./hermes-config')
    const res = await handlers.PATCH({
      request: new Request('http://localhost/api/hermes-config', {
        method: 'PATCH',
        body: JSON.stringify({
          action: 'set-default-model',
          providerId: 'openrouter',
          modelId: 'auto',
        }),
      }),
    })
    const body = await res.json()

    expect(body.ok).toBe(true)
    expect(body.message).not.toMatch(/restart/i)
  })

  it('GET aliases provider.maskedCredentials to provider.maskedKeys for legacy /settings', async () => {
    fs.writeFileSync(
      path.join(tmpHome, '.env'),
      'OPENROUTER_API_KEY=sk-test-1234\n',
      'utf-8',
    )

    const handlers = await loadHandlers('./claude-config')
    const res = await handlers.GET({
      request: new Request('http://localhost/api/claude-config'),
    })
    const body = await res.json()
    const openrouter = body.providers.find((p: any) => p.id === 'openrouter')

    expect(openrouter.maskedKeys).toEqual(openrouter.maskedCredentials)
    expect(openrouter.maskedKeys.OPENROUTER_API_KEY).toBeTruthy()
  })
})
