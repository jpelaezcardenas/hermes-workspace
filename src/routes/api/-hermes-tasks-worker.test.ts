import { describe, expect, it } from 'vitest'
import { parseWorkerRunBody, workerRunResponsePayload } from './-hermes-tasks-worker'

describe('parseWorkerRunBody', () => {
  it('defaults to fake dry run execution', () => {
    expect(parseWorkerRunBody({})).toEqual({ dryRun: true })
    expect(parseWorkerRunBody({ dryRun: false })).toEqual({ dryRun: true })
  })
})

describe('workerRunResponsePayload', () => {
  it('returns only safe worker execution fields for the route response', () => {
    const payload = workerRunResponsePayload({
      task: {
        id: 'fake-task-1',
        title: 'Safe task',
        description: 'private instruction should stay on task only',
        column: 'review',
        priority: 'medium',
        assignee: null,
        tags: [],
        due_date: null,
        position: 0,
        created_by: 'user',
        created_at: '2026-06-06T12:00:00.000Z',
        updated_at: '2026-06-06T12:30:00.000Z',
        session_id: null,
        worker_execution: {
          status: 'completed',
          safe_summary: 'Safe worker result completed.',
          safe_next_prompt: 'Review worker result',
          requires_tim_approval: false,
          approval_prompt: null,
          execution_record_id: 'fake-exec-1',
          updated_at: '2026-06-06T12:30:00.000Z',
          dry_run: true,
        },
      },
      safeResponse: {
        ok: true,
        status: 'completed',
        executionRecordId: 'fake-exec-1',
        safeSummary: 'Safe worker result completed.',
        safeNextPrompt: 'Review worker result',
        safeArtifactRefs: [],
        safeSourceRefs: [],
        requiresTimApproval: false,
        approvalPrompt: null,
      },
    })

    expect(payload.worker.status).toBe('completed')
    expect(JSON.stringify(payload.worker)).not.toContain('private instruction')
  })
})
