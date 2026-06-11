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
      t29DecisionCockpit: {
        baseline: {
          james2Commit: '8b42392',
          loureiroTechCommit: '07280cd',
          board: 'james-despachante quiet except real gates',
        },
        boardGate: {
          safeBaselineCounts: { running: 0, ready: 0 },
          t29Status: 'blocked',
          t30Status: 'todo/gated',
          t31Status: 'todo/gated',
          quietExceptRealGates: true,
        },
        campaignCenter: {
          mode: 'local-only/dry-run',
          endpoints: [
            'http://127.0.0.1:18089/health',
            'http://127.0.0.1:18089/campaign-center/status',
          ],
          realSideEffectsEnabled: false,
          whatsappMessagesSent: 0,
        },
        employeeLicenseBot: {
          lastLocalSmokeStatus: 'ok',
          employeeTelegramCheck: 'ok',
          atendimentoCheck: 'ok',
          expectedSanitizedReturn:
            'Licenciamento encontrado. Honorário visível: R$ 30,00. Dados sensíveis ocultos.',
          privacy: 'sensitive identifiers omitted from cockpit snapshot',
        },
        missingGates: [
          { key: 'approval_ref', label: 'approval_ref explícito do Ugo', status: 'missing' },
        ],
        realActionControl: {
          label: 'Enviar campanha real',
          enabled: false,
          blockedBy: 'T29',
          reason: 'blocked',
        },
      },
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
        t29DecisionCockpit: {
          baseline: { james2Commit: '8b42392', loureiroTechCommit: '07280cd' },
          realActionControl: { enabled: false, blockedBy: 'T29' },
        },
      },
    })
  })
})
