import { describe, expect, it } from 'vitest'

import { formatTaskAssigneeLabel } from './task-card'
import { buildTaskHistoryEntries } from './task-sheet'
import { TASKS_BOARD_HELP_TEXT } from './tasks-screen'
import type { ClaudeTask, TaskDetail } from '@/lib/tasks-api'

describe('tasks UX copy', () => {
  it('exposes helper copy that explains drag and assignment behavior', () => {
    expect(TASKS_BOARD_HELP_TEXT).toBe(
      'Drag cards to change status. Open a card to set assignee and due date.',
    )
  })

  it('formats assignee labels explicitly for assigned and unassigned tasks', () => {
    expect(formatTaskAssigneeLabel('jarvis', { jarvis: 'Jarvis' })).toBe(
      'Assignee: Jarvis',
    )
    expect(formatTaskAssigneeLabel(null, {})).toBe('Assignee: Unassigned')
  })

  it('builds card history with comments, events, and runs newest first', () => {
    const task: ClaudeTask = {
      id: 'task-1',
      title: 'History task',
      description: 'Check timeline ordering',
      column: 'todo',
      priority: 'medium',
      assignee: null,
      tags: [],
      due_date: null,
      position: 1,
      created_by: 'user',
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-01-01T00:00:00.000Z',
    }
    const detail: TaskDetail = {
      task,
      comments: [
        {
          id: 'comment-1',
          task_id: 'task-1',
          author: 'aurora',
          body: 'middle note',
          created_at: '2026-01-01T00:05:00.000Z',
        },
      ],
      events: [
        {
          id: 'event-1',
          task_id: 'task-1',
          kind: 'created',
          created_at: '2026-01-01T00:00:00.000Z',
        },
        {
          id: 'event-2',
          task_id: 'task-1',
          kind: 'status',
          payload: { status: 'review' },
          created_at: '2026-01-01T00:10:00.000Z',
        },
      ],
      links: { parents: [], children: [] },
      runs: [
        {
          id: 'run-1',
          task_id: 'task-1',
          status: 'completed',
          started_at: '2026-01-01T00:02:00.000Z',
          ended_at: '2026-01-01T00:20:00.000Z',
          outcome: 'completed',
          summary: 'done',
        },
      ],
    }

    expect(
      buildTaskHistoryEntries(detail, task).map((entry) => entry.id),
    ).toEqual([
      'run:run-1',
      'event:event-2',
      'comment:comment-1',
      'event:event-1',
    ])
  })
})
