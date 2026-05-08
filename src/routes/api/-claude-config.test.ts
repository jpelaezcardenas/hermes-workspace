import { beforeEach, describe, expect, it, vi } from 'vitest'

const { readFileSync, writeFileSync, mkdirSync } = vi.hoisted(() => ({
  readFileSync: vi.fn().mockReturnValue(''),
  writeFileSync: vi.fn().mockImplementation(() => {}),
  mkdirSync: vi.fn().mockImplementation(() => {}),
}))

vi.mock('node:fs', () => ({
  default: { readFileSync, writeFileSync, mkdirSync },
  readFileSync,
  writeFileSync,
  mkdirSync,
}))

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

beforeEach(() => {
  vi.clearAllMocks()
})

describe('claude-config route', () => {
  async function getPatchHandler() {
    vi.resetModules()
    const mod = await import('./claude-config')
    return (mod as any).Route.server.handlers.PATCH
  }

  it('returns a non-restart save acknowledgement after legacy config saves', async () => {
    const patch = await getPatchHandler()
    const request = new Request('http://localhost/api/claude-config', {
      method: 'PATCH',
      body: JSON.stringify({ config: { provider: 'openrouter' } }),
    })

    const res = await patch({ request })
    const json = await res.json()

    expect(json.message).not.toMatch(/restart/i)
    expect(json.message).toBeTruthy()
  })
})
