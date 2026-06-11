import { beforeEach, describe, expect, it, vi } from 'vitest'

import { isAuthenticated } from '../../server/auth-middleware'
import { readJamesMissionControlSnapshot } from '../../server/james-mission-control'
import { Route } from './james-mission-control'

vi.mock('../../server/auth-middleware', () => ({
  isAuthenticated: vi.fn(),
}))

vi.mock('../../server/james-mission-control', () => ({
  readJamesMissionControlSnapshot: vi.fn(),
}))

type RouteWithHandlers = typeof Route & {
  options: {
    server: {
      handlers: {
        GET: (ctx: { request: Request }) => Promise<Response>
      }
    }
  }
}

const handler = (Route as RouteWithHandlers).options.server.handlers.GET

describe('GET /api/james-mission-control', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    vi.mocked(isAuthenticated).mockReturnValue(false)

    const response = await handler({
      request: new Request('http://localhost/api/james-mission-control'),
    })

    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({
      ok: false,
      error: 'Unauthorized',
    })
    expect(readJamesMissionControlSnapshot).not.toHaveBeenCalled()
  })

  it('returns the Mission Control snapshot when authenticated', async () => {
    vi.mocked(isAuthenticated).mockReturnValue(true)
    vi.mocked(readJamesMissionControlSnapshot).mockResolvedValue({
      generatedAt: '2026-06-08T00:00:00.000Z',
      operationalStatus: 'review_required',
      statusReasons: ['side_effects:blocked'],
      organization: { core: null, managers: [] },
      watchers: { total: 0, byManager: {} },
      rooms: [],
      decisions: [],
      autonomy: { managers: [] },
      kanban: { countsByStatus: {}, cards: [] },
      mcpHonesty: { status: 'unavailable', taskId: null, reason: 'test' },
      sideEffects: [],
      graph: { nodes: [], edges: [] },
      sources: [],
    })

    const response = await handler({
      request: new Request('http://localhost/api/james-mission-control'),
    })

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toMatchObject({
      ok: true,
      snapshot: {
        generatedAt: '2026-06-08T00:00:00.000Z',
        operationalStatus: 'review_required',
      },
    })
  })
})
