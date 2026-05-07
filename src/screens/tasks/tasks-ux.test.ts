import { describe, expect, it } from 'vitest'

import { formatTaskAssigneeLabel } from './task-card'
import {
  TASKS_BOARD_HELP_TEXT,
  buildTasksQueryKey,
  withActiveProjectId,
} from './tasks-screen'

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

  it('scopes task query keys by active project to avoid cache bleed', () => {
    expect(buildTasksQueryKey(false, 'solarbot')).toEqual([
      'claude',
      'tasks',
      'solarbot',
      false,
    ])
    expect(buildTasksQueryKey(true, null)).toEqual([
      'claude',
      'tasks',
      'default',
      true,
    ])
  })

  it('injects active project into task dialog submissions without mutating input', () => {
    const input = { title: 'Fix robot turn', column: 'todo' as const }
    const scoped = withActiveProjectId(input, 'solarbot')

    expect(scoped).toEqual({
      title: 'Fix robot turn',
      column: 'todo',
      projectId: 'solarbot',
    })
    expect(input).toEqual({ title: 'Fix robot turn', column: 'todo' })
  })
})
