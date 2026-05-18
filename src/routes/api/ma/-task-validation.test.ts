import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createMultiAgentStore, createTask, loadState, updateTask } from '../../../server/multi-agent/store'

interface TaskValidationRouteModule {
  Route: {
    server: {
      handlers: {
        GET: (ctx: { request: Request; params: { taskId: string } }) => Promise<Response>
        POST: (ctx: { request: Request; params: { taskId: string } }) => Promise<Response>
      }
    }
  }
}

const originalEnv = { ...process.env }
let tempRoot = ''
let worktreePath = ''
let stateFile = ''

async function loadRoute(): Promise<TaskValidationRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({
    createFileRoute: () => (cfg: unknown) => cfg,
  }))
  return (await import('./tasks.$taskId.validate')) as unknown as TaskValidationRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-validation-route-'))
  worktreePath = mkdtempSync(join(tempRoot, 'worktree-'))
  execFileSync('git', ['init', '-b', 'main'], { cwd: worktreePath, stdio: 'ignore' })
  stateFile = join(tempRoot, 'state.json')
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  process.env.HERMES_MA_PROJECTS_JSON = JSON.stringify([
    {
      id: 'workspace',
      name: 'Workspace',
      repoPath: worktreePath,
      validation: {
        test: `${process.execPath} -e "console.log('test ok')"`,
        build: `${process.execPath} -e "console.error('build bad'); process.exit(5)"`,
      },
    },
  ])
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('POST /api/ma/tasks/:taskId/validate', () => {
  it('runs configured validation in the task worktree and persists the result', async () => {
    writeFileSync(join(worktreePath, 'marker.txt'), 'ok\n', 'utf-8')
    const store = createMultiAgentStore({ stateFile, id: () => 'validation' })
    const task = updateTask(
      store,
      createTask(store, {
        projectId: 'workspace',
        title: 'Validate me',
        description: 'Run test command',
        assigneeProfileId: 'backend-engineer',
      }).id,
      { worktreePath, branchName: 'hermes/task-validate', status: 'review' },
    )
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/validate`, {
        method: 'POST',
        body: JSON.stringify({ type: 'test' }),
      }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; validation: { id: string; status: string; outputSummary: string; outputArtifactId: string } }>(res)
    expect(body.ok).toBe(true)
    expect(body.validation).toMatchObject({ status: 'passed' })
    expect(body.validation.outputSummary).toContain('test ok')
    const state = loadState(stateFile)
    expect(state.validations[body.validation.id]).toMatchObject({ status: 'passed' })
    const artifact = state.artifacts[body.validation.outputArtifactId]
    expect(artifact).toMatchObject({ taskId: task.id, type: 'validation-output', title: 'test validation output' })
    expect(existsSync(artifact.pathOrUrl)).toBe(true)
    expect(readFileSync(artifact.pathOrUrl, 'utf-8')).toContain('test ok')

    const listRes = await mod.Route.server.handlers.GET({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/validate`, { method: 'GET' }),
      params: { taskId: task.id },
    })
    expect(listRes.status).toBe(200)
    const listBody = await jsonBody<{ ok: boolean; validations: Array<{ id: string; status: string }> }>(listRes)
    expect(listBody.validations).toEqual([expect.objectContaining({ id: body.validation.id, status: 'passed' })])
  })

  it('returns failed validation for non-zero configured commands', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'fail' })
    const task = updateTask(
      store,
      createTask(store, {
        projectId: 'workspace',
        title: 'Fail validation',
        description: 'Run build command',
        assigneeProfileId: 'backend-engineer',
      }).id,
      { worktreePath, branchName: 'hermes/task-fail-validation', status: 'review' },
    )
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/validate`, {
        method: 'POST',
        body: JSON.stringify({ type: 'build' }),
      }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; validation: { status: string; exitCode: number; outputSummary: string } }>(res)
    expect(body.validation.status).toBe('failed')
    expect(body.validation.exitCode).toBe(5)
    expect(body.validation.outputSummary).toContain('build bad')
  })

  it('returns 404 for unknown tasks and 409 for tasks without worktrees', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'no-worktree' })
    const task = createTask(store, {
      projectId: 'workspace',
      title: 'No worktree',
      description: 'Cannot validate yet',
      assigneeProfileId: 'backend-engineer',
    })
    const mod = await loadRoute()

    const missing = await mod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/tasks/task-missing/validate', { method: 'POST' }),
      params: { taskId: 'task-missing' },
    })
    expect(missing.status).toBe(404)

    const noWorktree = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/validate`, {
        method: 'POST',
        body: JSON.stringify({ type: 'test' }),
      }),
      params: { taskId: task.id },
    })
    expect(noWorktree.status).toBe(409)
  })

  it('rejects custom validation commands until approvals are implemented', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'custom' })
    const task = updateTask(
      store,
      createTask(store, {
        projectId: 'workspace',
        title: 'Custom validation',
        description: 'Needs approval',
        assigneeProfileId: 'backend-engineer',
      }).id,
      { worktreePath, branchName: 'hermes/task-custom-validation', status: 'review' },
    )
    const mod = await loadRoute()

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/tasks/${task.id}/validate`, {
        method: 'POST',
        body: JSON.stringify({ type: 'custom', command: 'echo unsafe' }),
      }),
      params: { taskId: task.id },
    })

    expect(res.status).toBe(403)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.error).toContain('Custom validation commands require approval')
  })
})
