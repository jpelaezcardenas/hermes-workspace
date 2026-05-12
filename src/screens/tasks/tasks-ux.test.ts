import { describe, expect, it } from 'vitest'

import { formatTaskAssigneeLabel } from './task-card'
import { TASKS_BOARD_HELP_TEXT } from './tasks-screen'

describe('tasks UX copy', () => {
  it('exposes helper copy that explains drag and assignment behavior', () => {
    expect(TASKS_BOARD_HELP_TEXT).toBe(
      'Drag cards to change status. Open a card to set assignee and due date.',
    )
  })

  it('labels visible destructive task actions distinctly', async () => {
    const dialog = await import('./task-dialog')

    expect(dialog.ARCHIVE_TASK_BUTTON_LABEL).toBe('Archive')
    expect(dialog.DELETE_TASK_BUTTON_LABEL).toBe('Delete')
  })

  it('formats assignee labels explicitly for assigned and unassigned tasks', () => {
    expect(formatTaskAssigneeLabel('jarvis', { jarvis: 'Jarvis' })).toBe(
      'Assignee: Jarvis',
    )
    expect(formatTaskAssigneeLabel(null, {})).toBe('Assignee: Unassigned')
  })
})
