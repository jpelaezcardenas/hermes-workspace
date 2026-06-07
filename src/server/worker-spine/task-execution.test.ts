import { describe, expect, it } from 'vitest'
import { safeCodingTask } from './adapter-fixtures'
import { createFakeWorkerSpinePorts } from './ports'
import {
  buildWorkerQueueInputFromTask,
  mapWorkerResultToTaskPatch,
  runFakeWorkerForTask,
} from './task-execution'
import type { TaskRecord } from '../tasks-store'

function task(overrides: Partial<TaskRecord> = {}): TaskRecord {
  return {
    id: 'fake-task-1',
    title: 'Implement fake worker route',
    description: 'Build safe local files only.',
    column: 'todo',
    priority: 'medium',
    assignee: 'builder',
    tags: ['worker-spine'],
    due_date: null,
    position: 0,
    created_by: 'user',
    created_at: '2026-06-06T12:00:00.000Z',
    updated_at: '2026-06-06T12:00:00.000Z',
    session_id: null,
    ...overrides,
  }
}

describe('buildWorkerQueueInputFromTask', () => {
  it('maps a task into fake-only worker queue input without raw side effects', () => {
    const input = buildWorkerQueueInputFromTask(task(), '2026-06-06T12:30:00.000Z')

    expect(input).toMatchObject({
      queueItemId: 'fake-task-1',
      title: 'Implement fake worker route',
      instruction: 'Build safe local files only.',
      requestedBy: 'workspace',
      source: 'executive_queue',
      domain: 'coding',
      dryRun: true,
      nowIso: '2026-06-06T12:30:00.000Z',
    })
  })
})

describe('mapWorkerResultToTaskPatch', () => {
  it('maps completed worker results to review with safe execution metadata', async () => {
    const result = await runFakeWorkerForTask(task(), {
      nowIso: '2026-06-06T12:30:00.000Z',
      ports: createFakeWorkerSpinePorts(),
    })
    const patch = mapWorkerResultToTaskPatch(result)

    expect(patch.column).toBe('review')
    expect(patch.worker_execution).toMatchObject({
      status: 'completed',
      safe_summary: 'Safe worker result completed.',
      safe_next_prompt: 'Review worker result',
      requires_tim_approval: false,
      dry_run: true,
    })
    expect(JSON.stringify(patch)).not.toContain('Build safe local files only')
  })

  it('maps needs_tim worker results to blocked with explicit approval metadata', async () => {
    const result = await runFakeWorkerForTask(task({
      title: 'Send external message',
      description: 'Send this external message now.',
      priority: 'high',
    }), {
      nowIso: '2026-06-06T12:30:00.000Z',
      ports: createFakeWorkerSpinePorts(),
    })
    const patch = mapWorkerResultToTaskPatch(result)

    expect(patch.column).toBe('blocked')
    expect(patch.worker_execution.status).toBe('needs_tim')
    expect(patch.worker_execution.requires_tim_approval).toBe(true)
    expect(patch.worker_execution.approval_prompt).toContain('Approval needed')
  })

  it('rejects unsafe fake output before patching task details', async () => {
    const result = await runFakeWorkerForTask(task(), {
      nowIso: '2026-06-06T12:30:00.000Z',
      ports: createFakeWorkerSpinePorts({
        candidateOutput: {
          status: 'completed',
          summary: 'FAKE_TOKEN_SHOULD_NOT_RENDER',
          nextPrompt: 'FAKE_RAW_PROMPT_SHOULD_NOT_RENDER',
          artifactRefs: [],
        },
      }),
    })
    const patch = mapWorkerResultToTaskPatch(result)

    expect(patch.column).toBe('blocked')
    expect(patch.worker_execution.status).toBe('failed')
    expect(JSON.stringify(patch)).not.toContain('FAKE_TOKEN_SHOULD_NOT_RENDER')
  })
})

describe('runFakeWorkerForTask', () => {
  it('uses fake ports and never calls live side-effect ports', async () => {
    const ports = createFakeWorkerSpinePorts()
    const result = await runFakeWorkerForTask(task(), {
      nowIso: safeCodingTask.nowIso,
      ports,
    })

    expect(result.safeResponse.status).toBe('completed')
    expect(ports.dispatchCalls).toHaveLength(1)
    expect(ports.persistCalls).toHaveLength(1)
    expect(ports.deliverTelegram).toBeUndefined()
    expect(ports.writeActivityLog).toBeUndefined()
  })
})
