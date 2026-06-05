import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ExecutionLayerSnapshot } from '../../server/execution-layer'

const snapshot: ExecutionLayerSnapshot = {
  generatedAt: '2026-06-01T10:00:00.000Z',
  signal: 'Yellow',
  focus: 'Offene Codex-Handoffs klaeren.',
  today: [],
  waitingForChris: [],
  codexOpen: [],
  wins: [],
  dontTouch: [],
  memoryCandidates: [],
  nextSmallestSlice: {
    action: 'Test action',
    whyThis: 'Test reason',
    acceptance: 'Test acceptance',
    shouldBecomeCodexHandoff: false,
  },
  proofLog: [],
  warnings: [],
}

vi.mock('../../server/auth-middleware', () => ({
  isAuthenticated: () => true,
}))

vi.mock('../../server/execution-layer', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../server/execution-layer')>()
  return {
    ...actual,
    buildExecutionLayerSnapshot: () => snapshot,
    renderExecutionLayerMarkdown: () => '# Hermes Execution Layer - 2026-06-01',
  }
})

type RouteWithGet = {
  options: {
    server: {
      handlers: {
        GET: (ctx: { request: Request }) => Promise<Response>
      }
    }
  }
}

async function getHandler() {
  const mod = await import('./execution-layer')
  return (mod.Route as RouteWithGet).options.server.handlers.GET
}

beforeEach(() => {
  vi.resetModules()
})

describe('/api/execution-layer', () => {
  it('returns the execution snapshot as JSON', async () => {
    const handler = await getHandler()
    const response = await handler({
      request: new Request('http://localhost/api/execution-layer'),
    })

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      snapshot: { signal: 'Yellow' },
    })
  })

  it('returns markdown when requested', async () => {
    const handler = await getHandler()
    const response = await handler({
      request: new Request('http://localhost/api/execution-layer?format=markdown'),
    })

    expect(response.status).toBe(200)
    await expect(response.text()).resolves.toContain(
      '# Hermes Execution Layer - 2026-06-01',
    )
  })
})
