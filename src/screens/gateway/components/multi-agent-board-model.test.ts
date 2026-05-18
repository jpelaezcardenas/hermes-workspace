import { describe, expect, it } from 'vitest'
import type { MultiAgentTask } from '../../../server/multi-agent/types'
import {
  MULTI_AGENT_BOARD_COLUMNS,
  buildMultiAgentBoardColumns,
  buildMultiAgentTaskMeta,
  parseAcceptanceCriteriaDraft,
} from './multi-agent-board-model'

function task(overrides: Partial<MultiAgentTask>): MultiAgentTask {
  const now = '2026-05-18T00:00:00.000Z'
  return {
    id: overrides.id ?? 'task-1',
    projectId: overrides.projectId ?? 'project-1',
    title: overrides.title ?? 'Implement board',
    description: overrides.description ?? 'Create the agent board UI',
    status: overrides.status ?? 'backlog',
    priority: overrides.priority ?? 'medium',
    assigneeProfileId: overrides.assigneeProfileId ?? 'backend-engineer',
    parentIds: [],
    childIds: [],
    workPacket: overrides.workPacket ?? 'Build the slice',
    acceptanceCriteria: overrides.acceptanceCriteria ?? ['Shows tasks'],
    branchName: overrides.branchName ?? null,
    worktreePath: overrides.worktreePath ?? null,
    latestRunId: overrides.latestRunId ?? null,
    createdAt: overrides.createdAt ?? now,
    updatedAt: overrides.updatedAt ?? now,
  }
}

describe('multi-agent board model', () => {
  it('keeps every MVP task status visible as a board column', () => {
    expect(MULTI_AGENT_BOARD_COLUMNS.map((column) => column.status)).toEqual([
      'backlog',
      'ready',
      'running',
      'needs_approval',
      'review',
      'blocked',
      'done',
      'failed',
    ])
  })

  it('groups tasks by status and omits cancelled tasks from active board columns', () => {
    const columns = buildMultiAgentBoardColumns([
      task({ id: 'ready-1', status: 'ready' }),
      task({ id: 'done-1', status: 'done' }),
      task({ id: 'cancelled-1', status: 'cancelled' }),
    ])

    expect(columns.find((column) => column.status === 'ready')?.tasks.map((item) => item.id)).toEqual(['ready-1'])
    expect(columns.find((column) => column.status === 'done')?.tasks.map((item) => item.id)).toEqual(['done-1'])
    expect(columns.flatMap((column) => column.tasks.map((item) => item.id))).not.toContain('cancelled-1')
  })

  it('summarizes task branch and worktree readiness for cards', () => {
    expect(
      buildMultiAgentTaskMeta(
        task({
          status: 'ready',
          branchName: 'hermes/task-123-board',
          worktreePath: '/repo/.hermes-worktrees/task-123-board',
        }),
      ),
    ).toMatchObject({
      statusLabel: 'Ready',
      priorityLabel: 'Medium',
      branchLabel: 'hermes/task-123-board',
      worktreeLabel: 'task-123-board',
      canStart: true,
    })

    expect(buildMultiAgentTaskMeta(task({ status: 'running' })).canStart).toBe(false)
  })

  it('parses acceptance criteria drafts into clean bullet items', () => {
    expect(parseAcceptanceCriteriaDraft(' - renders board\n\nstarts worktree\n* refreshes tasks ')).toEqual([
      'renders board',
      'starts worktree',
      'refreshes tasks',
    ])
  })
})
