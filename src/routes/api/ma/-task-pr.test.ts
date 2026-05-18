import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createMultiAgentStore, createTask, listApprovals, resolveApproval, updateTask, saveValidation } from '../../../server/multi-agent/store'

interface TaskPrRouteModule {
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

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], { encoding: 'utf-8' }).trim()
}

function setupRepo(): string {
  const path = mkdtempSync(join(tempRoot, 'repo-'))
  git(path, ['init', '-b', 'main'])
  git(path, ['config', 'user.email', 'test@example.com'])
  git(path, ['config', 'user.name', 'Test User'])
  writeFileSync(join(path, 'README.md'), '# repo\n', 'utf-8')
  git(path, ['add', 'README.md'])
  git(path, ['commit', '-m', 'initial'])
  git(path, ['checkout', '-b', 'hermes/task-1-demo'])
  git(path, ['remote', 'add', 'origin', 'https://github.com/example/repo.git'])
  return path
}

async function loadRoute(): Promise<TaskPrRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({ createFileRoute: () => (cfg: unknown) => cfg }))
  return (await import('./tasks.$taskId.pr')) as unknown as TaskPrRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-pr-route-'))
  repoPath = setupRepo()
  stateFile = join(tempRoot, 'state.json')
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  process.env.HERMES_MA_PROJECTS_JSON = JSON.stringify([{ id: 'workspace', name: 'Workspace', repoPath }])
  process.env.HERMES_MA_GH_MOCK = '1'
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('POST /api/ma/tasks/:taskId/pr', () => {
  it('creates a pending approval before executing PR creation', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'id' })
    const created = createTask(store, { projectId: 'workspace', title: 'Demo PR', description: 'Create PR', assigneeProfileId: 'backend-engineer' })
    const task = updateTask(store, created.id, { worktreePath: repoPath, branchName: 'hermes/task-1-demo', status: 'review' })
    saveValidation(store, { id: 'validation-1', taskId: task.id, type: 'test', command: 'pnpm test', status: 'passed', exitCode: 0 })
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/pr`, { method: 'POST', body: JSON.stringify({ title: 'Demo PR', body: 'Summary' }) }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(202)
    const body = await jsonBody<{ ok: boolean; approval: { status: string; actionType: string } }>(res)
    expect(body.approval).toMatchObject({ status: 'pending', actionType: 'github.pr_create' })
    expect(listApprovals(store, { taskId: task.id, status: 'pending' })).toHaveLength(1)
  })

  it('creates a PR artifact after approval is resolved', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'id' })
    const created = createTask(store, { projectId: 'workspace', title: 'Demo PR', description: 'Create PR', assigneeProfileId: 'backend-engineer' })
    const task = updateTask(store, created.id, { worktreePath: repoPath, branchName: 'hermes/task-1-demo', status: 'review' })
    saveValidation(store, { id: 'validation-1', taskId: task.id, type: 'test', command: 'pnpm test', status: 'passed', exitCode: 0 })
    const approval = (await loadRoute(), listApprovals(store, { taskId: task.id }))[0]
    // create approval through the first route call to preserve production flow
    const mod = await loadRoute()
    await mod.Route.server.handlers.POST({ request: new Request(`http://localhost/api/ma/tasks/${task.id}/pr`, { method: 'POST', body: JSON.stringify({ title: 'Demo PR', body: 'Summary' }) }), params: { taskId: task.id } })
    const pending = listApprovals(store, { taskId: task.id, status: 'pending' })[0]
    resolveApproval(store, pending.id, 'approved')

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/pr`, { method: 'POST', body: JSON.stringify({ title: 'Demo PR', body: 'Summary' }) }),
      params: { taskId: task.id },
    })

    expect(approval).toBeUndefined()
    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; pr: { url: string; artifactId: string } }>(res)
    expect(body.pr.url).toBe('https://github.com/example/repo/pull/1')
    expect(body.pr.artifactId).toMatch(/^artifact-/)
  })

  it('returns conflict when preflight fails', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'id' })
    const created = createTask(store, { projectId: 'workspace', title: 'No validation', description: 'Create PR', assigneeProfileId: 'backend-engineer' })
    const task = updateTask(store, created.id, { worktreePath: repoPath, branchName: 'hermes/task-1-demo', status: 'review' })
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/pr`, { method: 'POST', body: JSON.stringify({ title: 'Demo PR', body: 'Summary' }) }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(409)
    const body = await jsonBody<{ ok: boolean; preflight: { ok: boolean } }>(res)
    expect(body.preflight.ok).toBe(false)
  })
})
