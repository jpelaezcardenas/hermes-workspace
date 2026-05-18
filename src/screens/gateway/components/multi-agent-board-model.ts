import type {
  MultiAgentPriority,
  MultiAgentTask,
  MultiAgentTaskStatus,
} from '../../../server/multi-agent/types'

export type MultiAgentBoardColumnStatus = Exclude<MultiAgentTaskStatus, 'cancelled'>

export type MultiAgentBoardColumnDefinition = {
  status: MultiAgentBoardColumnStatus
  label: string
  hint: string
}

export const MULTI_AGENT_BOARD_COLUMNS: MultiAgentBoardColumnDefinition[] = [
  { status: 'backlog', label: 'Backlog', hint: 'Captured work packets' },
  { status: 'ready', label: 'Ready', hint: 'Worktree-ready tasks' },
  { status: 'running', label: 'Running', hint: 'Active workers' },
  { status: 'needs_approval', label: 'Needs Approval', hint: 'Waiting on a human gate' },
  { status: 'review', label: 'Review', hint: 'Diff and validation pass' },
  { status: 'blocked', label: 'Blocked', hint: 'Needs intervention' },
  { status: 'done', label: 'Done', hint: 'Completed slices' },
  { status: 'failed', label: 'Failed', hint: 'Needs retry or diagnosis' },
]

const STATUS_LABELS: Record<MultiAgentTaskStatus, string> = {
  backlog: 'Backlog',
  ready: 'Ready',
  running: 'Running',
  needs_approval: 'Needs Approval',
  review: 'Review',
  blocked: 'Blocked',
  done: 'Done',
  failed: 'Failed',
  cancelled: 'Cancelled',
}

const PRIORITY_LABELS: Record<MultiAgentPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

export type MultiAgentBoardColumn = MultiAgentBoardColumnDefinition & {
  tasks: MultiAgentTask[]
}

export type MultiAgentTaskMeta = {
  statusLabel: string
  priorityLabel: string
  branchLabel: string
  worktreeLabel: string
  canStart: boolean
}

export function buildMultiAgentBoardColumns(tasks: MultiAgentTask[]): MultiAgentBoardColumn[] {
  return MULTI_AGENT_BOARD_COLUMNS.map((column) => ({
    ...column,
    tasks: tasks
      .filter((task) => task.status === column.status)
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
  }))
}

export function buildMultiAgentTaskMeta(task: MultiAgentTask): MultiAgentTaskMeta {
  return {
    statusLabel: STATUS_LABELS[task.status],
    priorityLabel: PRIORITY_LABELS[task.priority],
    branchLabel: task.branchName?.trim() || 'No branch yet',
    worktreeLabel: task.worktreePath?.split('/').filter(Boolean).pop() || 'No worktree yet',
    canStart: task.status === 'backlog' || task.status === 'ready',
  }
}

export function parseAcceptanceCriteriaDraft(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim().replace(/^[-*]\s*/, '').trim())
    .filter(Boolean)
}
