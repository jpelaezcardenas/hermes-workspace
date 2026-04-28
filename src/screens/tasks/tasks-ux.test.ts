import { describe, expect, it } from 'vitest'

import { formatTaskAssigneeLabel } from './task-card'

const enCopy = {
  assigneePrefix: 'Assignee',
  unassigned: 'Unassigned',
} as const

describe('tasks UX copy', () => {
  it('formats assignee labels explicitly for assigned and unassigned tasks', () => {
    expect(formatTaskAssigneeLabel('jarvis', { jarvis: 'Jarvis' }, enCopy)).toBe('Assignee: Jarvis')
    expect(formatTaskAssigneeLabel(null, {}, enCopy)).toBe('Assignee: Unassigned')
  })
})
