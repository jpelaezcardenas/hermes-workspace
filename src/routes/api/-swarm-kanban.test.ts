import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

describe('swarm-kanban API project scope', () => {
  it('accepts projectId from query params', async () => {
    const listKanbanCards = vi.fn(async () => [])
    const getKanbanBackendMeta = vi.fn(() => ({ id: 'local', label: 'Local board', detected: true, writable: true }))
    vi.doMock('../../server/auth-middleware', () => ({
      requireLocalOrAuth: vi.fn(() => true),
    }))
    vi.doMock('../../server/kanban-backend', () => ({
      listKanbanCards,
      getKanbanBackendMeta,
      createKanbanCard: vi.fn(),
      updateKanbanCard: vi.fn(),
    }))
    vi.doMock('./workspace', () => ({
      loadWorkspaceCatalog: vi.fn(async () => ({ projectSlug: 'active-project' })),
    }))

    const { getSwarmKanbanResponse } = await import('./swarm-kanban')
    const response = await getSwarmKanbanResponse(new Request('http://local/api/swarm-kanban?projectId=solarbot'))
    const body = await response.json()

    expect(body.ok).toBe(true)
    expect(listKanbanCards).toHaveBeenCalledWith('solarbot')
    expect(getKanbanBackendMeta).toHaveBeenCalledWith('solarbot')
  })

  it('rejects unauthenticated requests before reading cards', async () => {
    const listKanbanCards = vi.fn(async () => [])
    vi.doMock('../../server/auth-middleware', () => ({
      requireLocalOrAuth: vi.fn(() => false),
    }))
    vi.doMock('../../server/kanban-backend', () => ({
      listKanbanCards,
      getKanbanBackendMeta: vi.fn(),
      createKanbanCard: vi.fn(),
      updateKanbanCard: vi.fn(),
    }))
    vi.doMock('./workspace', () => ({
      loadWorkspaceCatalog: vi.fn(async () => ({ projectSlug: 'active-project' })),
    }))

    const { getSwarmKanbanResponse } = await import('./swarm-kanban')
    const response = await getSwarmKanbanResponse(new Request('http://local/api/swarm-kanban'))

    expect(response.status).toBe(401)
    expect(await response.json()).toMatchObject({ ok: false, error: 'Unauthorized' })
    expect(listKanbanCards).not.toHaveBeenCalled()
  })

  it('requires explicit projectId for card creation instead of falling back to the active workspace project', async () => {
    const createKanbanCard = vi.fn()
    vi.doMock('../../server/auth-middleware', () => ({
      requireLocalOrAuth: vi.fn(() => true),
    }))
    vi.doMock('../../server/kanban-backend', () => ({
      listKanbanCards: vi.fn(),
      getKanbanBackendMeta: vi.fn(),
      createKanbanCard,
      updateKanbanCard: vi.fn(),
    }))
    vi.doMock('./workspace', () => ({
      loadWorkspaceCatalog: vi.fn(async () => ({ projectSlug: 'active-project' })),
    }))

    const { createSwarmKanbanResponse } = await import('./swarm-kanban')
    const response = await createSwarmKanbanResponse(new Request('http://local/api/swarm-kanban', {
      method: 'POST',
      body: JSON.stringify({ title: 'Fix safety gate' }),
    }))

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ ok: false, error: expect.stringContaining('projectId') })
    expect(createKanbanCard).not.toHaveBeenCalled()
  })
})
