import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { appendTaskEvent, createMultiAgentEventLog } from '../../../server/multi-agent/events'
import { createMultiAgentStore, createTask } from '../../../server/multi-agent/store'

interface TaskEventsRouteModule {
  Route: {
    server: {
      handlers: {
        GET: (ctx: { request: Request; params: { taskId: string } }) => Promise<Response>
      }
    }
  }
}

const originalEnv = { ...process.env }
let tempRoot = ''
let stateFile = ''
let eventsDir = ''

async function loadRoute(): Promise<TaskEventsRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({
    createFileRoute: () => (cfg: unknown) => cfg,
  }))
  return (await import('./tasks.$taskId.events')) as unknown as TaskEventsRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-events-route-'))
  stateFile = join(tempRoot, 'state.json')
  eventsDir = join(tempRoot, 'events')
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  process.env.HERMES_MA_EVENTS_DIR = eventsDir
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('GET /api/ma/tasks/:taskId/events', () => {
  it('returns events for an existing task in order', async () => {
    const store = createMultiAgentStore({ stateFile, now: () => '2026-05-18T12:00:00.000Z', id: () => '1' })
    const eventLog = createMultiAgentEventLog({ eventsDir })
    const task = createTask(store, {
      projectId: 'workspace',
      title: 'Stream events',
      description: 'Expose events',
      assigneeProfileId: 'backend-engineer',
    })
    appendTaskEvent(eventLog, {
      id: 'event-1',
      taskId: task.id,
      type: 'run.started',
      message: 'started',
      createdAt: '2026-05-18T12:00:01.000Z',
    })
    appendTaskEvent(eventLog, {
      id: 'event-2',
      taskId: task.id,
      type: 'run.log',
      message: 'hello',
      createdAt: '2026-05-18T12:00:02.000Z',
    })

    const mod = await loadRoute()
    const res = await mod.Route.server.handlers.GET({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/events`),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; events: Array<{ id: string; message: string }> }>(res)
    expect(body.ok).toBe(true)
    expect(body.events.map((event) => event.message)).toEqual(['started', 'hello'])
  })

  it('returns 404 for unknown tasks before reading event files', async () => {
    const mod = await loadRoute()
    const res = await mod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/tasks/task-missing/events'),
      params: { taskId: 'task-missing' },
    })

    expect(res.status).toBe(404)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('Task not found')
  })
})
