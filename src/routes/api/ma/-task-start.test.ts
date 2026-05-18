import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createMultiAgentStore, createTask } from '../../../server/multi-agent/store'

interface StartRouteModule {
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
let repoPath = ''
let stateFile = ''
let eventsDir = ''

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function initRepo(): string {
  const path = mkdtempSync(join(tempRoot, 'repo-'))
  git(path, ['init', '-b', 'main'])
  git(path, ['config', 'user.email', 'test@example.com'])
  git(path, ['config', 'user.name', 'Test User'])
  writeFileSync(join(path, 'README.md'), '# test repo\n', 'utf-8')
  git(path, ['add', 'README.md'])
  git(path, ['commit', '-m', 'initial commit'])
  return path
}

async function loadRoute(): Promise<StartRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({
    createFileRoute: () => (cfg: unknown) => cfg,
  }))
  return (await import('./tasks.$taskId.start')) as unknown as StartRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-start-route-'))
  repoPath = initRepo()
  stateFile = join(tempRoot, 'state.json')
  eventsDir = join(tempRoot, 'events')
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  process.env.HERMES_MA_EVENTS_DIR = eventsDir
  process.env.HERMES_MA_PROJECTS_JSON = JSON.stringify([{ id: 'workspace', name: 'Workspace', repoPath }])
  process.env.HERMES_MA_WORKER_COMMAND = process.execPath
  process.env.HERMES_MA_WORKER_ARGS_JSON = JSON.stringify(['-e', "console.log('route worker done')"])
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('POST /api/ma/tasks/:taskId/start', () => {
  it('creates a task worktree, starts a worker run, stores branch metadata, and emits events', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => '123' })
    const task = createTask(store, {
      projectId: 'workspace',
      title: 'Build Start Route',
      description: 'Create worktree only',
      assigneeProfileId: 'backend-engineer',
    })
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/start`, { method: 'POST' }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{
      ok: boolean
      task: { id: string; status: string; branchName: string; worktreePath: string; latestRunId: string }
      run: { id: string; status: string; profileId: string }
    }>(res)
    expect(body.ok).toBe(true)
    expect(body.task).toMatchObject({
      id: task.id,
      status: 'running',
      branchName: 'hermes/task-task-123-build-start-route',
    })
    expect(body.task.latestRunId).toMatch(/^run-/)
    expect(body.run).toMatchObject({ id: body.task.latestRunId, status: 'starting', profileId: 'backend-engineer' })
    expect(body.task.worktreePath).toContain('.hermes-worktrees/task-task-123-build-start-route')
    expect(git(body.task.worktreePath, ['rev-parse', '--abbrev-ref', 'HEAD'])).toBe(
      'hermes/task-task-123-build-start-route',
    )
    const eventFile = await readFile(join(eventsDir, `${task.id}.jsonl`), 'utf-8')
    expect(eventFile).toContain('worktree.created')
    expect(eventFile).toContain(body.task.worktreePath)
  })

  it('returns 404 for an unknown task id', async () => {
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/tasks/task-missing/start', { method: 'POST' }),
      params: { taskId: 'task-missing' },
    })

    expect(res.status).toBe(404)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('Task not found')
  })

  it('returns 404 when the task project is not configured', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'missing-project' })
    const task = createTask(store, {
      projectId: 'missing-project',
      title: 'Missing Project',
      description: 'No configured project matches',
      assigneeProfileId: 'backend-engineer',
    })
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/start`, { method: 'POST' }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(404)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('Project not found')
  })

  it('returns 409 when the worktree path already exists but is unmanaged', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'conflict' })
    const task = createTask(store, {
      projectId: 'workspace',
      title: 'Conflict Path',
      description: 'Pre-existing unmanaged worktree directory',
      assigneeProfileId: 'backend-engineer',
    })
    const mod = await loadRoute()

    mkdirSync(join(repoPath, '.hermes-worktrees', 'task-task-conflict-conflict-path'), {
      recursive: true,
    })

    // Pre-create the generated path outside git's worktree registry.
    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/start`, { method: 'POST' }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(409)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('Worktree path already exists')
  })
})
