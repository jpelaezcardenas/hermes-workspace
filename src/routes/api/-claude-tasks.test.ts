import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

function mockAuthAndWorkspace() {
  vi.doMock('../../server/auth-middleware', () => ({
    isAuthenticated: vi.fn(() => true),
  }))
  vi.doMock('./workspace', () => ({
    loadWorkspaceCatalog: vi.fn(async () => ({ projectSlug: 'active-project' })),
  }))
}

describe('claude tasks API project scope', () => {
  it('requires explicit projectId when creating a task instead of falling back to the active workspace project', async () => {
    const createClaudeTask = vi.fn()
    mockAuthAndWorkspace()
    vi.doMock('../../server/claude-tasks-backend', () => ({
      createClaudeTask,
      listClaudeTasks: vi.fn(),
    }))

    const { createClaudeTasksResponse } = await import('./claude-tasks')
    const response = await createClaudeTasksResponse(new Request('http://local/api/claude-tasks', {
      method: 'POST',
      body: JSON.stringify({ title: 'Review auth' }),
    }))

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: expect.stringContaining('projectId') })
    expect(createClaudeTask).not.toHaveBeenCalled()
  })

  it('requires explicit projectId when updating a task instead of falling back to the active workspace project', async () => {
    const updateClaudeTask = vi.fn()
    mockAuthAndWorkspace()
    vi.doMock('../../server/claude-tasks-backend', () => ({
      getClaudeTask: vi.fn(),
      moveClaudeTask: vi.fn(),
      updateClaudeTask,
    }))

    const { Route } = await import('./claude-tasks.$taskId')
    const handlers = Route.options.server.handlers as Record<string, (ctx: { request: Request; params: { taskId: string } }) => Promise<Response>>
    const response = await handlers.PATCH({
      request: new Request('http://local/api/claude-tasks/task-1', {
        method: 'PATCH',
        body: JSON.stringify({ title: 'Wrong project risk' }),
      }),
      params: { taskId: 'task-1' },
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: expect.stringContaining('projectId') })
    expect(updateClaudeTask).not.toHaveBeenCalled()
  })

  it('requires explicit projectId when moving a task instead of falling back to the active workspace project', async () => {
    const moveClaudeTask = vi.fn()
    mockAuthAndWorkspace()
    vi.doMock('../../server/claude-tasks-backend', () => ({
      getClaudeTask: vi.fn(),
      moveClaudeTask,
      updateClaudeTask: vi.fn(),
    }))

    const { Route } = await import('./claude-tasks.$taskId')
    const handlers = Route.options.server.handlers as Record<string, (ctx: { request: Request; params: { taskId: string } }) => Promise<Response>>
    const response = await handlers.POST({
      request: new Request('http://local/api/claude-tasks/task-1?action=move', {
        method: 'POST',
        body: JSON.stringify({ column: 'done' }),
      }),
      params: { taskId: 'task-1' },
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ error: expect.stringContaining('projectId') })
    expect(moveClaudeTask).not.toHaveBeenCalled()
  })
})
