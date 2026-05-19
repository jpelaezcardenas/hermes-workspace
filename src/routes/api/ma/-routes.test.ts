import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

interface ApiRouteModule {
  Route: {
    server: {
      handlers: Record<string, (ctx: { request: Request }) => Promise<Response>>
    }
  }
}

const originalEnv = { ...process.env }
let tempRoot = ''
let stateFile = ''
let repoPath = ''

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

async function loadRoute(relativePath: string): Promise<ApiRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({
    createFileRoute: () => (cfg: unknown) => cfg,
  }))
  return (await import(relativePath)) as unknown as ApiRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-routes-'))
  stateFile = join(tempRoot, 'state.json')
  repoPath = initRepo()
  process.env = { ...originalEnv }
  process.env.HERMES_MA_STATE_FILE = stateFile
  process.env.HERMES_MA_PROJECTS_JSON = JSON.stringify([
    { id: 'workspace', name: 'Workspace', repoPath, validation: { test: 'pnpm test' } },
  ])
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('multi-agent API routes', () => {
  it('GET /api/ma/profiles returns default Hermes Agent profiles', async () => {
    const mod = await loadRoute('./profiles')
    const res = await mod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/profiles'),
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; profiles: Array<{ id: string; runtime: string }> }>(res)
    expect(body.ok).toBe(true)
    expect(body.profiles.map((profile) => profile.id)).toEqual([
      'orchestrator',
      'frontend-engineer',
      'backend-engineer',
      'qa-validator',
      'reviewer',
      'docs-writer',
    ])
    expect(new Set(body.profiles.map((profile) => profile.runtime))).toEqual(new Set(['hermes-agent']))
  })

  it('GET /api/ma/projects resolves configured projects', async () => {
    const mod = await loadRoute('./projects')
    const res = await mod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/projects'),
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; projects: Array<{ id: string; repoPath: string; defaultBranch: string }> }>(res)
    expect(body.ok).toBe(true)
    expect(body.projects).toHaveLength(1)
    expect(body.projects[0]).toMatchObject({ id: 'workspace', repoPath, defaultBranch: 'main' })
  })

  it('POST and GET /api/ma/missions persists top-level product missions', async () => {
    const mod = await loadRoute('./missions')
    const created = await mod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/missions', {
        method: 'POST',
        body: JSON.stringify({
          projectId: 'workspace',
          title: 'Autonomous Hermes team',
          productBrief: {
            goal: 'Let one mission coordinate multiple Hermes workers.',
            userStory: 'As an operator, I can create a mission before decomposing it into tasks.',
            successMetrics: ['mission appears in board'],
            nonGoals: ['remote worker fleet'],
          },
          constraints: ['local single-user only'],
          desiredOutput: 'Mission ready for planning.',
        }),
      }),
    })

    expect(created.status).toBe(201)
    const createdBody = await jsonBody<{ ok: boolean; mission: { id: string; title: string; status: string; taskIds: string[] } }>(created)
    expect(createdBody.ok).toBe(true)
    expect(createdBody.mission).toMatchObject({ title: 'Autonomous Hermes team', status: 'draft', taskIds: [] })

    const listed = await mod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/missions?project_id=workspace'),
    })
    expect(listed.status).toBe(200)
    const listedBody = await jsonBody<{ ok: boolean; missions: Array<{ id: string; title: string }> }>(listed)
    expect(listedBody.missions.map((mission) => mission.title)).toEqual(['Autonomous Hermes team'])
  })

  it('GET /api/ma/tasks returns persisted tasks and supports project/status filters', async () => {
    const tasksMod = await loadRoute('./tasks')
    await tasksMod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/tasks', {
        method: 'POST',
        body: JSON.stringify({
          projectId: 'workspace',
          missionId: 'mission-api',
          title: 'Build API',
          description: 'Expose routes',
          assigneeProfileId: 'backend-engineer',
          priority: 'high',
          workPacket: 'Implement initial routes',
          acceptanceCriteria: ['Can create task'],
          status: 'ready',
        }),
      }),
    })

    const res = await tasksMod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/tasks?project_id=workspace&status=ready'),
    })

    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; tasks: Array<{ title: string; status: string; missionId?: string | null }> }>(res)
    expect(body.ok).toBe(true)
    expect(body.tasks).toHaveLength(1)
    expect(body.tasks[0]).toMatchObject({ title: 'Build API', status: 'ready', missionId: 'mission-api' })
  })

  it('POST /api/ma/tasks validates input and creates a task', async () => {
    const mod = await loadRoute('./tasks')
    const res = await mod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/tasks', {
        method: 'POST',
        body: JSON.stringify({
          projectId: 'workspace',
          title: 'Create task route',
          description: 'Persist task from route',
          assigneeProfileId: 'backend-engineer',
          priority: 'medium',
          workPacket: 'Add POST route',
          productBrief: {
            goal: 'Reduce task creation ambiguity for product work.',
            userStory: 'As a PM, I can capture the product why before implementation starts.',
            successMetrics: ['PM can review goal in task detail'],
            nonGoals: ['full roadmap planner'],
          },
          acceptanceCriteria: ['Task persisted'],
        }),
      }),
    })

    expect(res.status).toBe(201)
    const body = await jsonBody<{ ok: boolean; task: { id: string; status: string; title: string; productBrief?: { goal: string; userStory: string; successMetrics: string[]; nonGoals: string[] } } }>(res)
    expect(body.ok).toBe(true)
    expect(body.task.id).toMatch(/^task-/)
    expect(body.task).toMatchObject({
      title: 'Create task route',
      status: 'backlog',
      productBrief: {
        goal: 'Reduce task creation ambiguity for product work.',
        userStory: 'As a PM, I can capture the product why before implementation starts.',
        successMetrics: ['PM can review goal in task detail'],
        nonGoals: ['full roadmap planner'],
      },
    })
  })

  it('POST /api/ma/tasks returns 400 for missing title', async () => {
    const mod = await loadRoute('./tasks')
    const res = await mod.Route.server.handlers.POST({
      request: new Request('http://localhost/api/ma/tasks', {
        method: 'POST',
        body: JSON.stringify({ projectId: 'workspace', assigneeProfileId: 'backend-engineer' }),
      }),
    })

    expect(res.status).toBe(400)
    const body = await jsonBody<{ ok: boolean; error: string }>(res)
    expect(body.ok).toBe(false)
    expect(body.error).toContain('title is required')
  })

  it('routes return 401 when password protection is enabled and no auth cookie is present', async () => {
    process.env.CLAUDE_PASSWORD = 'guard'
    const mod = await loadRoute('./profiles')
    const res = await mod.Route.server.handlers.GET({
      request: new Request('http://localhost/api/ma/profiles'),
    })

    expect(res.status).toBe(401)
  })
})
