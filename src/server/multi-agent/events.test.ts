import { appendFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  appendTaskEvent,
  createMultiAgentEventLog,
  getLatestTaskEvent,
  listTaskEvents,
} from './events'
import type { MultiAgentEvent } from './types'

function tempEventsDir(): string {
  return join(mkdtempSync(join(tmpdir(), 'hermes-ma-events-')), 'events')
}

function event(overrides: Partial<MultiAgentEvent> = {}): MultiAgentEvent {
  return {
    id: overrides.id ?? 'event-1',
    taskId: overrides.taskId ?? 'task-123',
    runId: overrides.runId ?? null,
    type: overrides.type ?? 'task.created',
    message: overrides.message ?? 'Task created',
    payload: overrides.payload,
    createdAt: overrides.createdAt ?? '2026-05-16T18:30:00.000Z',
  }
}

describe('multi-agent event log', () => {
  it('appends and reads events in order', () => {
    const log = createMultiAgentEventLog({ eventsDir: tempEventsDir() })

    appendTaskEvent(log, event({ id: 'event-1', message: 'first' }))
    appendTaskEvent(log, event({ id: 'event-2', message: 'second' }))

    expect(listTaskEvents(log, 'task-123').map((item) => item.message)).toEqual(['first', 'second'])
  })

  it('returns null as the latest event when the task has no event file', () => {
    const log = createMultiAgentEventLog({ eventsDir: tempEventsDir() })

    expect(listTaskEvents(log, 'task-123')).toEqual([])
    expect(getLatestTaskEvent(log, 'task-123')).toBeNull()
  })

  it('returns the latest appended event', () => {
    const log = createMultiAgentEventLog({ eventsDir: tempEventsDir() })

    appendTaskEvent(log, event({ id: 'event-1', message: 'created' }))
    appendTaskEvent(log, event({ id: 'event-2', type: 'worktree.created', message: 'worktree' }))

    expect(getLatestTaskEvent(log, 'task-123')?.message).toBe('worktree')
  })

  it('rejects unsafe task ids to prevent path traversal', () => {
    const log = createMultiAgentEventLog({ eventsDir: tempEventsDir() })

    expect(() => listTaskEvents(log, '../outside')).toThrow(/Unsafe task id/)
    expect(() => appendTaskEvent(log, event({ taskId: 'task/123' }))).toThrow(/Unsafe task id/)
  })

  it('skips malformed JSONL lines while preserving valid events', () => {
    const eventsDir = tempEventsDir()
    const log = createMultiAgentEventLog({ eventsDir })

    appendTaskEvent(log, event({ id: 'event-1', message: 'valid' }))
    appendFileSync(join(eventsDir, 'task-123.jsonl'), '{ not json }\n', 'utf-8')
    appendTaskEvent(log, event({ id: 'event-2', message: 'still valid' }))

    expect(listTaskEvents(log, 'task-123').map((item) => item.id)).toEqual(['event-1', 'event-2'])
  })
})
