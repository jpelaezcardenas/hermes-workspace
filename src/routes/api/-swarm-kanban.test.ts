import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

describe('swarm-kanban API project scope', () => {
  it('accepts projectId from query params', async () => {
    const listKanbanCards = vi.fn(async () => [])
    const getKanbanBackendMeta = vi.fn(() => ({ id: 'local', label: 'Local board', detected: true, writable: true }))
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
})
