/**
 * Tasks API client with automatic backend detection.
 *
 * Two backend routes exist for task storage:
 *   /api/hermes-tasks  — flat-file store at ~/.hermes/tasks.json (used by agents/cron)
 *   /api/claude-tasks  — kanban-backend abstraction (local JSON, or Hermes Dashboard proxy)
 *
 * On first fetch this module probes both in parallel and selects the backend that has
 * data. If both have data, hermes-tasks wins (it is the canonical agent task store).
 * The decision is cached for the page session so subsequent calls never re-probe.
 *
 * All mutations (create, update, move, delete, launch) route through the same resolved
 * backend so reads and writes are always consistent.
 */

const HERMES_BASE = '/api/hermes-tasks'
const CLAUDE_BASE = '/api/claude-tasks'

export type TasksBackend = 'hermes' | 'claude'

// --- Backend resolution -------------------------------------------------

type BackendResolution = {
  base: string
  assigneesBase: string
  backend: TasksBackend
}

let _resolved: BackendResolution | null = null
let _resolving: Promise<BackendResolution> | null = null

async function probeBackend(base: string): Promise<number> {
  try {
    const res = await fetch(base, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return 0
    const data = await res.json()
    return Array.isArray(data.tasks) ? data.tasks.length : 0
  } catch {
    return 0
  }
}

async function resolveBackend(): Promise<BackendResolution> {
  if (_resolved) return _resolved
  if (_resolving) return _resolving

  _resolving = (async () => {
    const [hermesCount, claudeCount] = await Promise.all([
      probeBackend(HERMES_BASE),
      probeBackend(CLAUDE_BASE),
    ])

    // Prefer hermes if it has data; fall back to claude if only claude has data;
    // default to hermes when both are empty (it is the canonical store agents write to).
    const useHermes = hermesCount >= claudeCount
    _resolved = {
      base: useHermes ? HERMES_BASE : CLAUDE_BASE,
      assigneesBase: useHermes
        ? '/api/hermes-tasks-assignees'
        : '/api/claude-tasks-assignees',
      backend: useHermes ? 'hermes' : 'claude',
    }
    return _resolved
  })()

  return _resolving
}

/** Returns the currently resolved backend id, or null if not yet probed. */
export function getActiveBackend(): TasksBackend | null {
  return _resolved?.backend ?? null
}

/** Force a fresh re-probe on the next fetchTasks() call (e.g. after backend config changes). */
export function resetBackendResolution(): void {
  _resolved = null
  _resolving = null
}

// --- Types --------------------------------------------------------------

export type TaskColumn =
  | 'backlog'
  | 'todo'
  | 'in_progress'
  | 'review'
  | 'blocked'
  | 'done'
  | 'deleted'
export type TaskPriority = 'high' | 'medium' | 'low'

export type ClaudeTask = {
  id: string
  title: string
  description: string
  column: TaskColumn
  priority: TaskPriority
  assignee: string | null
  tags: Array<string>
  due_date: string | null
  position: number
  created_by: string
  created_at: string
  updated_at: string
  session_id?: string | null
}

export type TaskEventPayload =
  | Record<string, unknown>
  | Array<unknown>
  | string
  | number
  | boolean
  | null

export type TaskComment = {
  id: number | string
  task_id: string
  author: string
  body: string
  created_at: number | string
}

export type TaskEvent = {
  id: number | string
  task_id: string
  kind: string
  payload?: TaskEventPayload
  created_at: number | string
  run_id?: number | null
}

export type TaskRun = {
  id: number | string
  task_id: string
  profile?: string | null
  step_key?: string | null
  status: string
  claim_lock?: string | null
  claim_expires?: number | null
  worker_pid?: number | null
  max_runtime_seconds?: number | null
  last_heartbeat_at?: number | null
  started_at: number | string
  ended_at?: number | string | null
  outcome?: string | null
  summary?: string | null
  metadata?: Record<string, unknown> | null
  error?: string | null
}

export type TaskRelationLink = {
  id: string
  title?: string | null
  column?: TaskColumn | null
  priority?: TaskPriority | null
  assignee?: string | null
}

export type TaskDetail = {
  task: ClaudeTask
  comments: Array<TaskComment>
  events: Array<TaskEvent>
  links: {
    parents: Array<TaskRelationLink>
    children: Array<TaskRelationLink>
  }
  runs: Array<TaskRun>
}

export type CreateTaskInput = {
  title: string
  description?: string
  column?: TaskColumn
  priority?: TaskPriority
  assignee?: string | null
  tags?: Array<string>
  due_date?: string | null
  created_by?: string
}

export type UpdateTaskInput = Partial<Omit<CreateTaskInput, 'created_by'>>

export type TaskAssignee = {
  id: string
  label: string
  isHuman: boolean
}

export type AssigneesResponse = {
  assignees: Array<TaskAssignee>
  humanReviewer: string | null
}

// --- API functions -------------------------------------------------------

export async function fetchAssignees(): Promise<AssigneesResponse> {
  const { assigneesBase } = await resolveBackend()
  const res = await fetch(assigneesBase)
  if (!res.ok) return { assignees: [], humanReviewer: null }
  return res.json()
}

export async function fetchTasks(params?: {
  column?: TaskColumn
  assignee?: string
  priority?: TaskPriority
  include_done?: boolean
}): Promise<Array<ClaudeTask>> {
  const { base } = await resolveBackend()
  const q = new URLSearchParams()
  if (params?.column) q.set('column', params.column)
  if (params?.assignee) q.set('assignee', params.assignee)
  if (params?.priority) q.set('priority', params.priority)
  if (params?.include_done) q.set('include_done', 'true')
  const url = q.toString() ? `${base}?${q}` : base
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`)
  const data = await res.json()
  return data.tasks ?? []
}

function emptyTaskDetail(task: ClaudeTask): TaskDetail {
  return {
    task,
    comments: [],
    events: [],
    links: { parents: [], children: [] },
    runs: [],
  }
}

function normalizeTaskColumn(value: unknown): TaskColumn | null {
  return value === 'backlog' ||
    value === 'todo' ||
    value === 'in_progress' ||
    value === 'review' ||
    value === 'blocked' ||
    value === 'done' ||
    value === 'deleted'
    ? value
    : null
}

function normalizeTaskPriority(value: unknown): TaskPriority | null {
  return value === 'high' || value === 'medium' || value === 'low'
    ? value
    : null
}

function normalizeTaskRelationLink(value: unknown): TaskRelationLink | null {
  if (typeof value === 'string') {
    const id = value.trim()
    return id ? { id } : null
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const record = value as Record<string, unknown>
  const id = typeof record.id === 'string' ? record.id.trim() : ''
  if (!id) return null

  return {
    id,
    title: typeof record.title === 'string' ? record.title : null,
    column: normalizeTaskColumn(record.column),
    priority: normalizeTaskPriority(record.priority),
    assignee: typeof record.assignee === 'string' ? record.assignee : null,
  }
}

function normalizeTaskRelationLinks(value: unknown): Array<TaskRelationLink> {
  if (!Array.isArray(value)) return []
  return value.flatMap((entry) => {
    const normalized = normalizeTaskRelationLink(entry)
    return normalized ? [normalized] : []
  })
}

export async function fetchTaskDetail(taskId: string): Promise<TaskDetail> {
  const { base } = await resolveBackend()
  const res = await fetch(`${base}/${encodeURIComponent(taskId)}`)
  if (!res.ok) throw new Error(`Failed to fetch task detail: ${res.status}`)
  const data = await res.json()
  const task = data.task as ClaudeTask | undefined
  if (!task) throw new Error('Task detail response did not include a task')
  return {
    ...emptyTaskDetail(task),
    comments: Array.isArray(data.comments) ? data.comments : [],
    events: Array.isArray(data.events) ? data.events : [],
    links: {
      parents: normalizeTaskRelationLinks(data.links?.parents),
      children: normalizeTaskRelationLinks(data.links?.children),
    },
    runs: Array.isArray(data.runs) ? data.runs : [],
  }
}

export async function createTask(input: CreateTaskInput): Promise<ClaudeTask> {
  const { base } = await resolveBackend()
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      (body as { detail?: string }).detail ||
        `Failed to create task: ${res.status}`,
    )
  }
  return (await res.json()).task
}

export async function updateTask(
  taskId: string,
  input: UpdateTaskInput,
): Promise<ClaudeTask> {
  const { base } = await resolveBackend()
  const res = await fetch(`${base}/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`Failed to update task: ${res.status}`)
  return (await res.json()).task
}

export async function deleteTask(taskId: string): Promise<void> {
  const { base } = await resolveBackend()
  const res = await fetch(`${base}/${taskId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Failed to delete task: ${res.status}`)
}

export async function linkSession(
  taskId: string,
  sessionId: string | null,
): Promise<ClaudeTask> {
  const { base } = await resolveBackend()
  const res = await fetch(`${base}/${taskId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId }),
  })
  if (!res.ok) throw new Error(`Failed to link session: ${res.status}`)
  return (await res.json()).task
}

export async function launchSession(
  taskId: string,
): Promise<{ sessionId: string; briefing: string; task: ClaudeTask }> {
  const { base } = await resolveBackend()
  const res = await fetch(`${base}/${taskId}?action=launch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  if (!res.ok) throw new Error(`Failed to launch session: ${res.status}`)
  return res.json()
}

export async function moveTask(
  taskId: string,
  column: TaskColumn,
  movedBy = 'user',
): Promise<ClaudeTask> {
  const { base } = await resolveBackend()
  const res = await fetch(`${base}/${taskId}?action=move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ column, moved_by: movedBy }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      (body as { detail?: string }).detail ||
        `Failed to move task: ${res.status}`,
    )
  }
  return (await res.json()).task
}

// --- Display constants ---------------------------------------------------

export const COLUMN_LABELS: Record<TaskColumn, string> = {
  backlog: 'Triage',
  todo: 'Ready',
  in_progress: 'Running',
  review: 'Review',
  blocked: 'Blocked',
  done: 'Done',
  deleted: 'Deleted',
}

export const COLUMN_ORDER: Array<TaskColumn> = [
  'backlog',
  'todo',
  'in_progress',
  'review',
  'blocked',
  'done',
]

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  high: '#ef4444',
  medium: '#f97316',
  low: '#6b7280',
}

export const COLUMN_COLORS: Record<TaskColumn, string> = {
  backlog: '#6b7280',
  todo: '#3b82f6',
  in_progress: '#f97316',
  review: '#a855f7',
  blocked: '#ef4444',
  done: '#22c55e',
  deleted: '#374151',
}

export function isOverdue(task: ClaudeTask): boolean {
  if (!task.due_date) return false
  // Parse YYYY-MM-DD manually to avoid UTC-vs-local offset issues.
  // new Date("2026-04-02") parses as UTC midnight, which in EST is the
  // previous evening — causing everything to appear one day early.
  const [year, month, day] = task.due_date.split('-').map(Number)
  const due = new Date(year, month - 1, day) // local midnight
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return due < today
}
