import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  PRIORITY_ORDER,
  STATUS_LABELS,
  STATUS_ORDER,
  useTaskStore,
} from './task-store'
import type { Task, TaskPriority, TaskStatus } from './task-store'

const FIXED_NOW = 1_700_000_000_000

type NewTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

function makeTaskInput(overrides: Partial<NewTaskInput> = {}): NewTaskInput {
  return {
    title: 'Write tests',
    description: 'Cover the store',
    status: 'backlog',
    priority: 'P1',
    tags: [],
    ...overrides,
  }
}

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'TASK-1',
    title: 'Existing task',
    description: 'A description',
    status: 'backlog',
    priority: 'P2',
    tags: [],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    ...overrides,
  }
}

/**
 * Build a Response-like object. The store only reads `ok`, `status`, and
 * `json()`, so a minimal typed double suffices without a full DOM Response.
 */
function makeResponse(
  init: {
    ok?: boolean
    status?: number
    json?: () => Promise<unknown>
  } = {},
): Response {
  const ok = init.ok ?? true
  const status = init.status ?? (ok ? 200 : 500)
  const json = init.json ?? (() => Promise.resolve({}))
  const response: Pick<Response, 'ok' | 'status' | 'json'> = {
    ok,
    status,
    json: json as Response['json'],
  }
  return response as Response
}

/** Typed fetch mock installed via vi.stubGlobal so callers stay type-safe. */
function stubFetch(
  impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
): ReturnType<typeof vi.fn> {
  const mock = vi.fn(impl)
  vi.stubGlobal('fetch', mock)
  return mock
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(FIXED_NOW)
  useTaskStore.setState({ tasks: [], afterSync: false })
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('task-store exported constants', () => {
  it('exposes status labels for every status', () => {
    const statuses: Array<TaskStatus> = [
      'backlog',
      'in_progress',
      'review',
      'done',
    ]
    for (const status of statuses) {
      expect(typeof STATUS_LABELS[status]).toBe('string')
    }
    expect(STATUS_LABELS.in_progress).toBe('In Progress')
  })

  it('orders statuses and priorities', () => {
    expect(STATUS_ORDER).toEqual(['backlog', 'in_progress', 'review', 'done'])
    expect(PRIORITY_ORDER).toEqual(['P0', 'P1', 'P2', 'P3'])
  })
})

describe('task-store addTask', () => {
  it('optimistically prepends a task and reconciles with the server task', async () => {
    const serverTask = makeTask({ id: 'SERVER-1', title: 'Write tests' })
    const fetchMock = stubFetch(() =>
      Promise.resolve(
        makeResponse({ json: () => Promise.resolve({ task: serverTask }) }),
      ),
    )

    await useTaskStore.getState().addTask(makeTaskInput())

    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0]).toEqual(serverTask)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/tasks',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('keeps the optimistic task when the server returns no task payload', async () => {
    stubFetch(() =>
      Promise.resolve(makeResponse({ json: () => Promise.resolve({}) })),
    )

    await useTaskStore
      .getState()
      .addTask(makeTaskInput({ title: 'Local only' }))

    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    expect(tasks[0]?.title).toBe('Local only')
    expect(tasks[0]?.id).toMatch(/^TASK-/)
    expect(tasks[0]?.createdAt).toBe(new Date(FIXED_NOW).toISOString())
  })

  it('keeps the optimistic task when the server payload is not a valid task', async () => {
    stubFetch(() =>
      Promise.resolve(
        makeResponse({ json: () => Promise.resolve({ task: { id: 'x' } }) }),
      ),
    )

    await useTaskStore.getState().addTask(makeTaskInput({ title: 'Partial' }))
    expect(useTaskStore.getState().tasks[0]?.title).toBe('Partial')
  })

  it('rolls back the optimistic task when the network call fails', async () => {
    stubFetch(() => Promise.reject(new Error('network down')))

    await expect(
      useTaskStore.getState().addTask(makeTaskInput()),
    ).rejects.toThrow('Failed to create task')
    expect(useTaskStore.getState().tasks).toHaveLength(0)
  })

  it('rolls back and surfaces the server error message on a non-ok response', async () => {
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 400,
          json: () => Promise.resolve({ error: 'bad title' }),
        }),
      ),
    )

    await expect(
      useTaskStore.getState().addTask(makeTaskInput()),
    ).rejects.toThrow('bad title')
    expect(useTaskStore.getState().tasks).toHaveLength(0)
  })

  it('falls back to a generic message when the error body cannot be parsed', async () => {
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 503,
          json: () => Promise.reject(new Error('not json')),
        }),
      ),
    )

    await expect(
      useTaskStore.getState().addTask(makeTaskInput()),
    ).rejects.toThrow('Request failed (503)')
  })

  it('uses the message field when error is absent', async () => {
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 422,
          json: () => Promise.resolve({ message: 'validation failed' }),
        }),
      ),
    )

    await expect(
      useTaskStore.getState().addTask(makeTaskInput()),
    ).rejects.toThrow('validation failed')
  })

  it('preserves existing tasks ahead of which the new task is prepended', async () => {
    useTaskStore.setState({ tasks: [makeTask({ id: 'OLD-1' })] })
    stubFetch(() =>
      Promise.resolve(makeResponse({ json: () => Promise.resolve({}) })),
    )

    await useTaskStore.getState().addTask(makeTaskInput({ title: 'Newest' }))
    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(2)
    expect(tasks[0]?.title).toBe('Newest')
    expect(tasks[1]?.id).toBe('OLD-1')
  })
})

describe('task-store updateTask', () => {
  it('throws when the task does not exist', async () => {
    stubFetch(() => Promise.resolve(makeResponse()))
    await expect(
      useTaskStore.getState().updateTask('missing', { title: 'x' }),
    ).rejects.toThrow('Task not found')
  })

  it('optimistically applies updates and reconciles with the server task', async () => {
    useTaskStore.setState({ tasks: [makeTask({ id: 'T1', title: 'old' })] })
    const serverTask = makeTask({ id: 'T1', title: 'server canonical' })
    stubFetch(() =>
      Promise.resolve(
        makeResponse({ json: () => Promise.resolve({ task: serverTask }) }),
      ),
    )

    await useTaskStore.getState().updateTask('T1', { title: 'new' })
    expect(useTaskStore.getState().tasks[0]).toEqual(serverTask)
  })

  it('bumps updatedAt and keeps the optimistic value with no server task', async () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1', title: 'old', updatedAt: 'old-date' })],
    })
    stubFetch(() =>
      Promise.resolve(makeResponse({ json: () => Promise.resolve({}) })),
    )

    await useTaskStore.getState().updateTask('T1', { title: 'new title' })
    const task = useTaskStore.getState().tasks[0]
    expect(task?.title).toBe('new title')
    expect(task?.updatedAt).toBe(new Date(FIXED_NOW).toISOString())
  })

  it('rolls back to the previous task when the network call fails', async () => {
    const previous = makeTask({ id: 'T1', title: 'original' })
    useTaskStore.setState({ tasks: [previous] })
    stubFetch(() => Promise.reject(new Error('offline')))

    await expect(
      useTaskStore.getState().updateTask('T1', { title: 'attempted' }),
    ).rejects.toThrow('Failed to update task')
    expect(useTaskStore.getState().tasks[0]).toEqual(previous)
  })

  it('maps a 404 response to "Task not found" and rolls back', async () => {
    const previous = makeTask({ id: 'T1', title: 'original' })
    useTaskStore.setState({ tasks: [previous] })
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 404,
          json: () => Promise.resolve({}),
        }),
      ),
    )

    await expect(
      useTaskStore.getState().updateTask('T1', { title: 'attempted' }),
    ).rejects.toThrow('Task not found')
    expect(useTaskStore.getState().tasks[0]).toEqual(previous)
  })

  it('surfaces a non-404 server error message and rolls back', async () => {
    const previous = makeTask({ id: 'T1' })
    useTaskStore.setState({ tasks: [previous] })
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: 'server boom' }),
        }),
      ),
    )

    await expect(
      useTaskStore.getState().updateTask('T1', { title: 'x' }),
    ).rejects.toThrow('server boom')
    expect(useTaskStore.getState().tasks[0]).toEqual(previous)
  })

  it('leaves unrelated tasks untouched', async () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1' }), makeTask({ id: 'T2', title: 'keep me' })],
    })
    stubFetch(() =>
      Promise.resolve(makeResponse({ json: () => Promise.resolve({}) })),
    )

    await useTaskStore.getState().updateTask('T1', { status: 'done' })
    const tasks = useTaskStore.getState().tasks
    expect(tasks[0]?.status).toBe('done')
    expect(tasks[1]?.title).toBe('keep me')
  })
})

describe('task-store moveTask', () => {
  it('delegates to updateTask with the new status', async () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1', status: 'backlog' })],
    })
    const bodies: Array<string> = []
    stubFetch((_input, init) => {
      if (typeof init?.body === 'string') bodies.push(init.body)
      return Promise.resolve(makeResponse({ json: () => Promise.resolve({}) }))
    })

    await useTaskStore.getState().moveTask('T1', 'in_progress')
    expect(useTaskStore.getState().tasks[0]?.status).toBe('in_progress')
    expect(bodies[0]).toContain('"status":"in_progress"')
  })

  it('propagates the updateTask error for a missing task', async () => {
    stubFetch(() => Promise.resolve(makeResponse()))
    await expect(
      useTaskStore.getState().moveTask('nope', 'done'),
    ).rejects.toThrow('Task not found')
  })
})

describe('task-store deleteTask', () => {
  it('throws when the task does not exist', async () => {
    stubFetch(() => Promise.resolve(makeResponse()))
    await expect(useTaskStore.getState().deleteTask('missing')).rejects.toThrow(
      'Task not found',
    )
  })

  it('optimistically removes the task on success', async () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1' }), makeTask({ id: 'T2' })],
    })
    stubFetch(() => Promise.resolve(makeResponse()))

    await useTaskStore.getState().deleteTask('T1')
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['T2'])
  })

  it('restores the task at the head when the network call fails', async () => {
    const removed = makeTask({ id: 'T1' })
    useTaskStore.setState({ tasks: [removed, makeTask({ id: 'T2' })] })
    stubFetch(() => Promise.reject(new Error('offline')))

    await expect(useTaskStore.getState().deleteTask('T1')).rejects.toThrow(
      'Failed to delete task',
    )
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['T1', 'T2'])
  })

  it('maps a 404 to "Task not found" and restores the task', async () => {
    const removed = makeTask({ id: 'T1' })
    useTaskStore.setState({ tasks: [removed] })
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 404,
          json: () => Promise.resolve({}),
        }),
      ),
    )

    await expect(useTaskStore.getState().deleteTask('T1')).rejects.toThrow(
      'Task not found',
    )
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['T1'])
  })

  it('surfaces a non-404 server error and restores the task', async () => {
    const removed = makeTask({ id: 'T1' })
    useTaskStore.setState({ tasks: [removed] })
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ error: 'cannot delete' }),
        }),
      ),
    )

    await expect(useTaskStore.getState().deleteTask('T1')).rejects.toThrow(
      'cannot delete',
    )
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['T1'])
  })
})

describe('task-store syncFromApi', () => {
  it('marks afterSync without fetching in a non-window (node) environment', async () => {
    const fetchMock = stubFetch(() => Promise.resolve(makeResponse()))
    // The store env is node: typeof window === 'undefined'.
    await useTaskStore.getState().syncFromApi()
    expect(useTaskStore.getState().afterSync).toBe(true)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('replaces tasks from a valid payload when window is present', async () => {
    vi.stubGlobal('window', {})
    const valid = makeTask({ id: 'S1' })
    const invalid = { id: 5, title: 'bad' }
    stubFetch(() =>
      Promise.resolve(
        makeResponse({
          json: () => Promise.resolve({ tasks: [valid, invalid] }),
        }),
      ),
    )

    await useTaskStore.getState().syncFromApi()
    const state = useTaskStore.getState()
    expect(state.afterSync).toBe(true)
    expect(state.tasks).toHaveLength(1)
    expect(state.tasks[0]?.id).toBe('S1')
  })

  it('normalizes a non-array payload to an empty task list', async () => {
    vi.stubGlobal('window', {})
    stubFetch(() =>
      Promise.resolve(
        makeResponse({ json: () => Promise.resolve({ tasks: 'nope' }) }),
      ),
    )

    await useTaskStore.getState().syncFromApi()
    expect(useTaskStore.getState().tasks).toEqual([])
    expect(useTaskStore.getState().afterSync).toBe(true)
  })

  it('handles a payload that is not an object', async () => {
    vi.stubGlobal('window', {})
    stubFetch(() =>
      Promise.resolve(makeResponse({ json: () => Promise.resolve(null) })),
    )

    await useTaskStore.getState().syncFromApi()
    expect(useTaskStore.getState().tasks).toEqual([])
  })

  it('marks afterSync but leaves tasks intact when the request is not ok', async () => {
    vi.stubGlobal('window', {})
    useTaskStore.setState({ tasks: [makeTask({ id: 'KEEP' })] })
    stubFetch(() => Promise.resolve(makeResponse({ ok: false, status: 500 })))

    await useTaskStore.getState().syncFromApi()
    expect(useTaskStore.getState().afterSync).toBe(true)
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['KEEP'])
  })

  it('marks afterSync when fetch rejects', async () => {
    vi.stubGlobal('window', {})
    useTaskStore.setState({ tasks: [makeTask({ id: 'KEEP' })] })
    stubFetch(() => Promise.reject(new Error('boom')))

    await useTaskStore.getState().syncFromApi()
    expect(useTaskStore.getState().afterSync).toBe(true)
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['KEEP'])
  })

  it('treats unparseable JSON as an empty payload', async () => {
    vi.stubGlobal('window', {})
    stubFetch(() =>
      Promise.resolve(
        makeResponse({ json: () => Promise.reject(new Error('not json')) }),
      ),
    )

    await useTaskStore.getState().syncFromApi()
    expect(useTaskStore.getState().tasks).toEqual([])
    expect(useTaskStore.getState().afterSync).toBe(true)
  })
})

describe('task-store getTasksByMission', () => {
  it('returns only tasks for the given mission id', () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ id: 'A', missionId: 'm1' }),
        makeTask({ id: 'B', missionId: 'm2' }),
        makeTask({ id: 'C', missionId: 'm1' }),
        makeTask({ id: 'D' }),
      ],
    })
    const result = useTaskStore.getState().getTasksByMission('m1')
    expect(result.map((t) => t.id)).toEqual(['A', 'C'])
  })

  it('returns an empty array when no tasks match', () => {
    useTaskStore.setState({ tasks: [makeTask({ id: 'A', missionId: 'm1' })] })
    expect(useTaskStore.getState().getTasksByMission('nope')).toEqual([])
  })
})

describe('task-store upsertMissionTasks', () => {
  it('adds new mission tasks with generated ids and timestamps', () => {
    useTaskStore
      .getState()
      .upsertMissionTasks([
        makeTaskInput({ title: 'Mission task', missionId: 'm1' }),
      ])
    const tasks = useTaskStore.getState().tasks
    expect(tasks).toHaveLength(1)
    const task = tasks[0]
    expect(task?.title).toBe('Mission task')
    expect(task?.missionId).toBe('m1')
    expect(task?.id).toMatch(/^mission-m1-/)
    expect(task?.createdAt).toBe(new Date(FIXED_NOW).toISOString())
  })

  it('uses "unknown" in the id when missionId is absent', () => {
    useTaskStore
      .getState()
      .upsertMissionTasks([makeTaskInput({ title: 'No mission' })])
    expect(useTaskStore.getState().tasks[0]?.id).toMatch(/^mission-unknown-/)
  })

  it('replaces existing tasks that share title and missionId', () => {
    useTaskStore.setState({
      tasks: [
        makeTask({ id: 'OLD', title: 'Shared', missionId: 'm1' }),
        makeTask({ id: 'KEEP', title: 'Other', missionId: 'm1' }),
      ],
    })
    useTaskStore
      .getState()
      .upsertMissionTasks([makeTaskInput({ title: 'Shared', missionId: 'm1' })])

    const tasks = useTaskStore.getState().tasks
    const ids = tasks.map((t) => t.id)
    expect(ids).toContain('KEEP')
    expect(ids).not.toContain('OLD')
    // The new "Shared" task replaces the old one.
    expect(tasks.filter((t) => t.title === 'Shared')).toHaveLength(1)
  })

  it('does not replace a same-title task in a different mission', () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'OTHER', title: 'Shared', missionId: 'm2' })],
    })
    useTaskStore
      .getState()
      .upsertMissionTasks([makeTaskInput({ title: 'Shared', missionId: 'm1' })])

    const ids = useTaskStore.getState().tasks.map((t) => t.id)
    expect(ids).toContain('OTHER')
    expect(useTaskStore.getState().tasks).toHaveLength(2)
  })

  it('handles an empty upsert by leaving tasks unchanged', () => {
    useTaskStore.setState({ tasks: [makeTask({ id: 'A' })] })
    useTaskStore.getState().upsertMissionTasks([])
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['A'])
  })
})

describe('task-store updateTaskStatus', () => {
  it('updates the status and bumps updatedAt for the matching task', () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1', status: 'backlog', updatedAt: 'old' })],
    })
    useTaskStore.getState().updateTaskStatus('T1', 'done')
    const task = useTaskStore.getState().tasks[0]
    expect(task?.status).toBe('done')
    expect(task?.updatedAt).toBe(new Date(FIXED_NOW).toISOString())
  })

  it('leaves other tasks untouched and ignores a missing id', () => {
    const original = makeTask({ id: 'T2', status: 'review', updatedAt: 'keep' })
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1', status: 'backlog' }), original],
    })
    useTaskStore.getState().updateTaskStatus('does-not-exist', 'done')
    expect(useTaskStore.getState().tasks[1]).toEqual(original)
  })

  it('moves through every status in order', () => {
    useTaskStore.setState({
      tasks: [makeTask({ id: 'T1', status: 'backlog' })],
    })
    const order: Array<TaskStatus> = STATUS_ORDER
    for (const status of order) {
      useTaskStore.getState().updateTaskStatus('T1', status)
      expect(useTaskStore.getState().tasks[0]?.status).toBe(status)
    }
  })

  it('accepts every priority on the seeded task', () => {
    const priorities: Array<TaskPriority> = PRIORITY_ORDER
    for (const priority of priorities) {
      useTaskStore.setState({ tasks: [makeTask({ id: 'P', priority })] })
      expect(useTaskStore.getState().tasks[0]?.priority).toBe(priority)
    }
  })
})
