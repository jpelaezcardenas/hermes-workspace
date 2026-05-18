import { execFileSync } from 'node:child_process'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createMultiAgentStore, createTask, updateTask } from '../../../server/multi-agent/store'

interface TaskDiffRouteModule {
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
let repoPath = ''
let stateFile = ''

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

async function loadRoute(): Promise<TaskDiffRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({
    createFileRoute: () => (cfg: unknown) => cfg,
  }))
  return (await import('./tasks.$taskId.diff')) as unknown as TaskDiffRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-diff-route-'))
  repoPath = initRepo()
  stateFile = join(tempRoot, 'state.json')
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('GET /api/ma/tasks/:taskId/diff', () => {
  it('returns changed files, stat, and unified diff for a task worktree', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'diff' })
    const task = updateTask(
      store,
      createTask(store, {
        projectId: 'workspace',
        title: 'Show diff',
        description: 'Expose diff',
        assigneeProfileId: 'backend-engineer',
      }).id,
      { worktreePath: repoPath, branchName: 'hermes/task-diff', status: 'review' },
    )
    writeFileSync(join(repoPath, 'README.md'), '# changed repo\n', 'utf-8')
    writeFileSync(join(repoPath, 'new-file.txt'), 'new file\n', 'utf-8')
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.GET({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/diff`),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{
      ok: boolean
      diff: { clean: boolean; changedFiles: string[]; stat: string; diff: string }
    }>(res)
    expect(body.ok).toBe(true)
    expect(body.diff.clean).toBe(false)
    expect(body.diff.changedFiles).toEqual(['README.md', 'new-file.txt'])
    expect(body.diff.stat).toContain('README.md')
    expect(body.diff.stat).toContain('new-file.txt')
    expect(body.diff.diff).toContain('diff --git a/README.md b/README.md')
    expect(body.diff.diff).toContain('diff --git a/new-file.txt b/new-file.txt')
  })

  it('returns 404 for unknown tasks', async () => {
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/tasks/task-missing/diff'),
      params: { taskId: 'task-missing' },
    })

    expect(res.status).toBe(404)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('Task not found')
  })

  it('returns 409 when the task has no worktree yet', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'no-worktree' })
    const task = createTask(store, {
      projectId: 'workspace',
      title: 'No worktree',
      description: 'Cannot diff yet',
      assigneeProfileId: 'backend-engineer',
    })
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.GET({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/diff`),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(409)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('has no worktree')
  })
})
