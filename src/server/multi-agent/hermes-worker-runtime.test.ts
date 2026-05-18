import { describe, expect, it } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { appendTaskEvent, createMultiAgentEventLog, listTaskEvents } from './events'
import { createMultiAgentStore, createRun, createTask, getTask, updateTask } from './store'
import type { MultiAgentProfile, MultiAgentProject } from './types'
import {
  buildHermesWorkerPrompt,
  launchHermesWorker,
  waitForHermesWorkerRun,
} from './hermes-worker-runtime'

const now = '2026-05-18T12:00:00.000Z'

function profile(): MultiAgentProfile {
  return {
    id: 'backend-engineer',
    name: 'Backend Engineer',
    role: 'backend-engineer',
    runtime: 'hermes-agent',
    skills: ['test-driven-development'],
    enabledToolsets: ['terminal', 'file'],
    permissionPolicy: 'ask-risky',
    createdAt: now,
    updatedAt: now,
  }
}

function project(repoPath: string): MultiAgentProject {
  return {
    id: 'workspace',
    name: 'Workspace',
    repoPath,
    defaultBranch: 'main',
    worktreeRoot: join(repoPath, '.hermes-worktrees'),
    githubRemote: null,
    createdAt: now,
    updatedAt: now,
  }
}

describe('hermes worker runtime', () => {
  it('builds a constrained work packet prompt', () => {
    const tempRoot = mkdtempSync(join(tmpdir(), 'hermes-runtime-prompt-'))
    try {
      const store = createMultiAgentStore({ stateFile: join(tempRoot, 'state.json'), now: () => now, id: () => '1' })
      const task = createTask(store, {
        projectId: 'workspace',
        title: 'Add events route',
        description: 'Expose task event stream',
        assigneeProfileId: 'backend-engineer',
        workPacket: 'Create GET /api/ma/tasks/:taskId/events',
        acceptanceCriteria: ['returns events', 'stays inside worktree'],
      })
      const prompt = buildHermesWorkerPrompt({
        task: { ...task, worktreePath: join(tempRoot, 'wt'), branchName: 'hermes/task-1-events' },
        project: project(tempRoot),
        profile: profile(),
      })

      expect(prompt).toContain('You are a Hermes Agent worker running under Hermes Workspace Multi-Agent Control Plane.')
      expect(prompt).toContain('Role: backend-engineer')
      expect(prompt).toContain('Task: Add events route')
      expect(prompt).toContain('Worktree:')
      expect(prompt).toContain('Create GET /api/ma/tasks/:taskId/events')
      expect(prompt).toContain('- returns events')
      expect(prompt).toContain('Do not push, deploy, send external messages, or edit secrets without approval.')
    } finally {
      rmSync(tempRoot, { recursive: true, force: true })
    }
  })

  it('emits run events and marks task done on process exit 0', async () => {
    const tempRoot = mkdtempSync(join(tmpdir(), 'hermes-runtime-pass-'))
    try {
      const store = createMultiAgentStore({
        stateFile: join(tempRoot, 'state.json'),
        now: () => now,
        id: (() => {
          let next = 0
          return () => String(++next)
        })(),
      })
      const eventLog = createMultiAgentEventLog({ eventsDir: join(tempRoot, 'events') })
      const task = updateTask(
        store,
        createTask(store, {
          projectId: 'workspace',
          title: 'Run worker',
          description: 'Run a fake worker',
          assigneeProfileId: 'backend-engineer',
          workPacket: 'Print a result',
        }).id,
        { worktreePath: tempRoot, branchName: 'hermes/task-run-worker', status: 'ready' },
      )
      const run = createRun(store, { taskId: task.id, profileId: profile().id, status: 'starting' })

      const handle = launchHermesWorker({
        store,
        eventLog,
        task,
        run,
        project: project(tempRoot),
        profile: profile(),
        command: process.execPath,
        args: ['-e', "console.log('worker says hi')"],
      })
      await waitForHermesWorkerRun(handle)

      const events = listTaskEvents(eventLog, task.id)
      expect(events.map((event) => event.type)).toEqual([
        'run.started',
        'run.log',
        'task.completed',
      ])
      expect(events.find((event) => event.type === 'run.log')?.message).toContain('worker says hi')
      expect(getTask(store, task.id)).toMatchObject({ status: 'done', latestRunId: run.id })
    } finally {
      rmSync(tempRoot, { recursive: true, force: true })
    }
  })

  it('marks task failed on process exit non-zero', async () => {
    const tempRoot = mkdtempSync(join(tmpdir(), 'hermes-runtime-fail-'))
    try {
      const store = createMultiAgentStore({ stateFile: join(tempRoot, 'state.json'), now: () => now, id: () => 'x' })
      const eventLog = createMultiAgentEventLog({ eventsDir: join(tempRoot, 'events') })
      const task = updateTask(
        store,
        createTask(store, {
          projectId: 'workspace',
          title: 'Fail worker',
          description: 'Run a failing fake worker',
          assigneeProfileId: 'backend-engineer',
        }).id,
        { worktreePath: tempRoot, branchName: 'hermes/task-fail-worker', status: 'ready' },
      )
      const run = createRun(store, { taskId: task.id, profileId: profile().id, status: 'starting' })

      const handle = launchHermesWorker({
        store,
        eventLog,
        task,
        run,
        project: project(tempRoot),
        profile: profile(),
        command: process.execPath,
        args: ['-e', "console.error('boom'); process.exit(7)"],
      })
      await waitForHermesWorkerRun(handle)

      const events = listTaskEvents(eventLog, task.id)
      expect(events.map((event) => event.type)).toContain('task.failed')
      expect(getTask(store, task.id)).toMatchObject({ status: 'failed', latestRunId: run.id })
    } finally {
      rmSync(tempRoot, { recursive: true, force: true })
    }
  })
})
