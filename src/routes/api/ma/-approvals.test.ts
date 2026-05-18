import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createApproval, createMultiAgentStore } from '../../../server/multi-agent/store'

interface ApprovalsRouteModule {
  Route: {
    server: {
      handlers: {
        GET: (ctx: { request: Request }) => Promise<Response>
      }
    }
  }
}

interface ResolveRouteModule {
  Route: {
    server: {
      handlers: {
        POST: (ctx: { request: Request; params: { approvalId: string } }) => Promise<Response>
      }
    }
  }
}

const originalEnv = { ...process.env }
let tempRoot = ''
let stateFile = ''

async function loadApprovalsRoute(): Promise<ApprovalsRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({ createFileRoute: () => (cfg: unknown) => cfg }))
  return (await import('./approvals')) as unknown as ApprovalsRouteModule
}

async function loadResolveRoute(): Promise<ResolveRouteModule> {
  vi.doMock('@tanstack/react-router', () => ({ createFileRoute: () => (cfg: unknown) => cfg }))
  return (await import('./approvals.$approvalId.resolve')) as unknown as ResolveRouteModule
}

async function jsonBody<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

beforeEach(() => {
  vi.resetModules()
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-approvals-route-'))
  stateFile = join(tempRoot, 'state.json')
  process.env = { ...originalEnv, HERMES_MA_STATE_FILE: stateFile }
  delete process.env.CLAUDE_PASSWORD
})

afterEach(() => {
  vi.restoreAllMocks()
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('multi-agent approval routes', () => {
  it('lists pending approvals by default and supports all status filter', async () => {
    let nextId = 1
    const store = createMultiAgentStore({ stateFile, id: () => `approval-${nextId++}`, now: () => '2026-05-18T13:00:00.000Z' })
    const pending = createApproval(store, {
      taskId: 'task-1',
      riskLevel: 'high',
      actionType: 'github.pr_create',
      title: 'Create PR',
      description: 'Push branch and create PR',
      payload: { branch: 'hermes/task-1' },
    })
    createApproval(store, {
      taskId: 'task-2',
      riskLevel: 'medium',
      actionType: 'shell.risky',
      title: 'Run shell command',
      description: 'Run custom validation',
      payload: { command: 'pnpm test' },
    })
    const second = Object.values((await import('../../../server/multi-agent/store')).loadState(stateFile).approvals).find((approval) => approval.taskId === 'task-2')!
    ;(await import('../../../server/multi-agent/store')).resolveApproval(store, second.id, 'denied')
    const mod = await loadApprovalsRoute()

    const pendingRes = await mod.Route.server.handlers.GET({ request: new Request('http://localhost/api/ma/approvals') })
    expect(pendingRes.status).toBe(200)
    const pendingBody = await jsonBody<{ ok: boolean; approvals: Array<{ id: string; status: string }> }>(pendingRes)
    expect(pendingBody.approvals).toEqual([expect.objectContaining({ id: pending.id, status: 'pending' })])

    const allRes = await mod.Route.server.handlers.GET({ request: new Request('http://localhost/api/ma/approvals?status=all') })
    const allBody = await jsonBody<{ approvals: Array<{ status: string }> }>(allRes)
    expect(allBody.approvals.map((approval) => approval.status).sort()).toEqual(['denied', 'pending'])
  })

  it('resolves approvals as approved or denied and rejects unsupported decisions', async () => {
    const store = createMultiAgentStore({ stateFile, id: () => 'approval', now: () => '2026-05-18T13:00:00.000Z' })
    const approval = createApproval(store, {
      taskId: 'task-1',
      riskLevel: 'critical',
      actionType: 'git.push',
      title: 'Push branch',
      description: 'Push to remote',
      payload: { branch: 'hermes/task-1' },
    })
    const mod = await loadResolveRoute()

    const bad = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/approvals/${approval.id}/resolve`, {
        method: 'POST',
        body: JSON.stringify({ decision: 'maybe' }),
      }),
      params: { approvalId: approval.id },
    })
    expect(bad.status).toBe(400)

    const res = await mod.Route.server.handlers.POST({
      request: new Request(`http://localhost/api/ma/approvals/${approval.id}/resolve`, {
        method: 'POST',
        body: JSON.stringify({ decision: 'approved' }),
      }),
      params: { approvalId: approval.id },
    })
    expect(res.status).toBe(200)
    const body = await jsonBody<{ ok: boolean; approval: { id: string; status: string; resolvedAt: string } }>(res)
    expect(body.approval).toMatchObject({ id: approval.id, status: 'approved' })
    expect(body.approval.resolvedAt).toBeTruthy()
  })
})
