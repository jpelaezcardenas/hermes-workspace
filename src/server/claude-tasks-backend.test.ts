import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

async function loadBackend(options?: {
  cards?: Array<Record<string, unknown>>
  updatedCard?: Record<string, unknown> | null
  detailLinks?: { parents: Array<string>; children: Array<string> }
}) {
  const listKanbanCards = vi.fn(() => Promise.resolve(options?.cards ?? []))
  const createKanbanCard = vi.fn((input) =>
    Promise.resolve({
      id: 'card-created',
      title: input.title,
      spec: input.spec ?? '',
      acceptanceCriteria: [],
      assignedWorker: input.assignedWorker ?? null,
      reviewer: null,
      status: input.status ?? 'backlog',
      missionId: null,
      reportPath: null,
      createdBy: input.createdBy ?? 'user',
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_000_000,
    }),
  )
  const updateKanbanCard = vi.fn((_taskId, _updates) =>
    Promise.resolve(options?.updatedCard ?? null),
  )
  const getKanbanCardDetail = vi.fn((taskId: string) => {
    const card = (options?.cards ?? []).find((entry) => entry.id === taskId)
    return card
      ? {
          card,
          comments: [],
          events: [],
          links: options?.detailLinks ?? { parents: [], children: [] },
          runs: [],
        }
      : null
  })
  const getKanbanBackendMeta = vi.fn(() => ({
    id: 'hermes-proxy',
    label: 'Hermes Dashboard kanban',
    detected: true,
    writable: true,
  }))

  vi.doMock('./kanban-backend', () => ({
    listKanbanCards,
    createKanbanCard,
    updateKanbanCard,
    getKanbanCardDetail,
    getKanbanBackendMeta,
  }))

  const mod = await import('./claude-tasks-backend')
  return {
    mod,
    listKanbanCards,
    createKanbanCard,
    updateKanbanCard,
    getKanbanBackendMeta,
  }
}

describe('claude-tasks-backend', () => {
  it('maps shared kanban cards into /tasks records and preserves blocked cards', async () => {
    const { mod } = await loadBackend({
      cards: [
        {
          id: 'card-1',
          title: 'Blocked card',
          spec: 'Investigate runtime edge case',
          acceptanceCriteria: [],
          assignedWorker: 'swarm6',
          reviewer: null,
          status: 'blocked',
          missionId: null,
          reportPath: null,
          createdBy: 'aurora',
          createdAt: 1_700_000_000_000,
          updatedAt: 1_700_000_050_000,
        },
      ],
    })

    const tasks = await mod.listClaudeTasks({ includeDone: true })
    expect(tasks).toHaveLength(1)
    expect(tasks[0]).toMatchObject({
      id: 'card-1',
      title: 'Blocked card',
      description: 'Investigate runtime edge case',
      column: 'blocked',
      assignee: 'swarm6',
      created_by: 'aurora',
    })
  })

  it('creates tasks in the shared kanban backend instead of tasks.json', async () => {
    const { mod, createKanbanCard } = await loadBackend()

    const task = await mod.createClaudeTask({
      title: 'Wire workspace board to shared kanban',
      description: 'Proxy through Agent API',
      column: 'todo',
      assignee: 'swarm3',
      created_by: 'user',
    })

    expect(createKanbanCard).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Wire workspace board to shared kanban',
        spec: 'Proxy through Agent API',
        assignedWorker: 'swarm3',
        status: 'ready',
        createdBy: 'user',
      }),
    )
    expect(task).toMatchObject({
      id: 'card-created',
      column: 'todo',
      assignee: 'swarm3',
    })
  })

  it('moves running and blocked cards through kanban status updates', async () => {
    const { mod, updateKanbanCard } = await loadBackend({
      updatedCard: {
        id: 'card-2',
        title: 'Updated card',
        spec: 'Now blocked',
        acceptanceCriteria: [],
        assignedWorker: 'swarm5',
        reviewer: null,
        status: 'blocked',
        missionId: null,
        reportPath: null,
        createdBy: 'aurora',
        createdAt: 1_700_000_000_000,
        updatedAt: 1_700_000_090_000,
      },
    })

    const task = await mod.moveClaudeTask('card-2', 'blocked')
    expect(updateKanbanCard).toHaveBeenCalledWith(
      'card-2',
      expect.objectContaining({ status: 'blocked' }),
    )
    expect(task).toMatchObject({ id: 'card-2', column: 'blocked' })
  })

  it('hydrates parent and child links with related task labels for the sheet', async () => {
    const baseCard = {
      spec: '',
      acceptanceCriteria: [],
      assignedWorker: null,
      reviewer: null,
      missionId: null,
      reportPath: null,
      createdBy: 'aurora',
      createdAt: 1_700_000_000_000,
      updatedAt: 1_700_000_010_000,
    }
    const { mod } = await loadBackend({
      detailLinks: {
        parents: ['parent-1'],
        children: ['child-1', 'missing-child'],
      },
      cards: [
        {
          ...baseCard,
          id: 'task-1',
          title: 'Main task',
          status: 'ready',
          priority: 0,
        },
        {
          ...baseCard,
          id: 'parent-1',
          title: 'Parent task',
          status: 'blocked',
          priority: 1,
          assignedWorker: 'swarm1',
        },
        {
          ...baseCard,
          id: 'child-1',
          title: 'Child task',
          status: 'done',
          priority: -1,
          assignedWorker: 'swarm2',
        },
      ],
    })

    const detail = await mod.getClaudeTaskDetail('task-1')

    expect(detail?.links.parents).toEqual([
      {
        id: 'parent-1',
        title: 'Parent task',
        column: 'blocked',
        priority: 'high',
        assignee: 'swarm1',
      },
    ])
    expect(detail?.links.children).toEqual([
      {
        id: 'child-1',
        title: 'Child task',
        column: 'done',
        priority: 'low',
        assignee: 'swarm2',
      },
      { id: 'missing-child' },
    ])
  })
})
