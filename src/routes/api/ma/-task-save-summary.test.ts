import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createMultiAgentStore, createRun, createTask, loadState } from '../../../server/multi-agent/store'

interface SaveSummaryRouteModule {
  Route: {
    server: {
      handlers: {
        POST: (ctx: { request: Request; params: { taskId: string } }) => Promise<Response>
      }
    }
  }
}

const originalEnv = { ...process.env }
let tempRoot = ''
let stateFile = ''
let obsidianRoot = ''

async function loadRoute(): Promise<SaveSummaryRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({ createFileRoute: () => (cfg: unknown) => cfg }))
  return (await import('./tasks.$taskId.save-summary')) as unknown as SaveSummaryRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-save-summary-route-'))
  stateFile = join(tempRoot, 'state.json')
  obsidianRoot = join(tempRoot, 'Obsidian Runs')
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  process.env.HERMES_MA_OBSIDIAN_RUNS_DIR = obsidianRoot
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('POST /api/ma/tasks/:taskId/save-summary', () => {
  it('stores a final summary on the task latest run and writes optional Obsidian note', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'id', now: () => '2026-05-18T12:00:00.000Z' })
    const task = createTask(store, { projectId: 'workspace', title: 'Memory hooks', description: 'Persist summary', assigneeProfileId: 'backend-engineer' })
    const run = createRun(store, { taskId: task.id, profileId: 'backend-engineer', status: 'completed' })
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/save-summary`, {
        method: 'POST',
        body: JSON.stringify({ summary: 'Final context for future sessions.', saveToObsidian: true }),
      }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; task: { id: string }; run: { id: string; summary: string }; obsidian?: { path: string } }>(res)
    expect(body.ok).toBe(true)
    expect(body.run).toMatchObject({ id: run.id, summary: 'Final context for future sessions.' })
    expect(body.task).toMatchObject({ id: task.id, finalSummary: 'Final context for future sessions.' })
    expect(body.obsidian?.path).toMatch(/memory-hooks\.md$/)
    expect(readFileSync(body.obsidian!.path, 'utf-8')).toContain('Final context for future sessions.')
    const persistedState = loadState(stateFile)
    expect(persistedState.runs[run.id]?.summary).toBe('Final context for future sessions.')
    expect(persistedState.tasks[task.id]?.finalSummary).toBe('Final context for future sessions.')
  })

  it('returns bad request for empty summary and not found for missing tasks', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'id' })
    const task = createTask(store, { projectId: 'workspace', title: 'Memory hooks', description: 'Persist summary', assigneeProfileId: 'backend-engineer' })
    createRun(store, { taskId: task.id, profileId: 'backend-engineer', status: 'completed' })
    const mod = await loadRoute()

    const empty = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/save-summary`, { method: 'POST', body: JSON.stringify({ summary: '  ' }) }),
      params: { taskId: task.id },
    })
    const missing = await mod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/tasks/missing/save-summary', { method: 'POST', body: JSON.stringify({ summary: 'hello' }) }),
      params: { taskId: 'missing' },
    })

    expect(empty.status).toBe(400)
    expect(missing.status).toBe(404)
  })
})
