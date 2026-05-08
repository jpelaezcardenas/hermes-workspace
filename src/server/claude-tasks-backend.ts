import {
  createKanbanCard,
  getKanbanBackendMeta,
  getKanbanCardDetail,
  listKanbanCards,
  updateKanbanCard,
} from './kanban-backend'
import type {
  KanbanBackendMeta,
  KanbanCardDetail,
  KanbanTaskComment,
  KanbanTaskEvent,
  KanbanTaskRun,
} from './kanban-backend'

export type TaskColumn =
  | 'backlog'
  | 'todo'
  | 'in_progress'
  | 'review'
  | 'blocked'
  | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'

export type ClaudeTaskRecord = {
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
}

export type ClaudeTaskRelationLink = {
  id: string
  title?: string | null
  column?: TaskColumn | null
  priority?: TaskPriority | null
  assignee?: string | null
}

export type ClaudeTaskDetail = {
  task: ClaudeTaskRecord
  comments: Array<KanbanTaskComment>
  events: Array<KanbanTaskEvent>
  links: {
    parents: Array<ClaudeTaskRelationLink>
    children: Array<ClaudeTaskRelationLink>
  }
  runs: Array<KanbanTaskRun>
}

type TaskFilters = {
  column?: string | null
  assignee?: string | null
  priority?: string | null
  includeDone?: boolean
}

type CreateTaskInput = {
  title: string
  description?: string
  column?: TaskColumn
  priority?: TaskPriority
  assignee?: string | null
  tags?: Array<string>
  due_date?: string | null
  created_by?: string
}

type UpdateTaskInput = Partial<Omit<CreateTaskInput, 'created_by'>>

function toIso(timestamp: number): string {
  return new Date(timestamp).toISOString()
}

function mapTaskPriorityToKanbanPriority(
  priority: TaskPriority | undefined,
): number {
  switch (priority) {
    case 'high':
      return 1
    case 'low':
      return -1
    case 'medium':
    default:
      return 0
  }
}

function mapKanbanPriorityToTaskPriority(priority: unknown): TaskPriority {
  const numeric =
    typeof priority === 'number' && Number.isFinite(priority) ? priority : 0
  if (numeric > 0) return 'high'
  if (numeric < 0) return 'low'
  return 'medium'
}

function mapKanbanStatusToTaskColumn(status: string): TaskColumn {
  switch (status) {
    case 'ready':
      return 'todo'
    case 'running':
      return 'in_progress'
    case 'review':
      return 'review'
    case 'blocked':
      return 'blocked'
    case 'done':
      return 'done'
    case 'backlog':
    default:
      return 'backlog'
  }
}

function mapTaskColumnToKanbanStatus(
  column: TaskColumn,
): 'backlog' | 'ready' | 'running' | 'review' | 'blocked' | 'done' {
  switch (column) {
    case 'todo':
      return 'ready'
    case 'in_progress':
      return 'running'
    case 'review':
      return 'review'
    case 'blocked':
      return 'blocked'
    case 'done':
      return 'done'
    case 'backlog':
    default:
      return 'backlog'
  }
}

function mapCardToTask(card: {
  id: string
  title: string
  spec: string
  assignedWorker: string | null
  status: string
  priority?: number | null
  createdBy: string
  createdAt: number
  updatedAt: number
}): ClaudeTaskRecord {
  return {
    id: card.id,
    title: card.title,
    description: card.spec,
    column: mapKanbanStatusToTaskColumn(card.status),
    priority: mapKanbanPriorityToTaskPriority(card.priority),
    assignee: card.assignedWorker,
    tags: [],
    due_date: null,
    position: card.updatedAt,
    created_by: card.createdBy,
    created_at: toIso(card.createdAt),
    updated_at: toIso(card.updatedAt),
  }
}

function taskToRelationLink(task: ClaudeTaskRecord): ClaudeTaskRelationLink {
  return {
    id: task.id,
    title: task.title,
    column: task.column,
    priority: task.priority,
    assignee: task.assignee,
  }
}

function fallbackRelationLink(taskId: string): ClaudeTaskRelationLink {
  return { id: taskId }
}

async function mapCardDetailToTaskDetail(
  detail: KanbanCardDetail,
): Promise<ClaudeTaskDetail> {
  const relationIds = new Set([
    ...detail.links.parents,
    ...detail.links.children,
  ])
  const relatedById = new Map<string, ClaudeTaskRelationLink>()
  if (relationIds.size > 0) {
    for (const card of await listKanbanCards()) {
      if (!relationIds.has(card.id)) continue
      relatedById.set(card.id, taskToRelationLink(mapCardToTask(card)))
    }
  }

  return {
    task: mapCardToTask(detail.card),
    comments: detail.comments,
    events: detail.events,
    links: {
      parents: detail.links.parents.map(
        (taskId) => relatedById.get(taskId) ?? fallbackRelationLink(taskId),
      ),
      children: detail.links.children.map(
        (taskId) => relatedById.get(taskId) ?? fallbackRelationLink(taskId),
      ),
    },
    runs: detail.runs,
  }
}

export function getClaudeTasksBackendMeta(): KanbanBackendMeta {
  return getKanbanBackendMeta()
}

export async function listClaudeTasks(
  filters: TaskFilters = {},
): Promise<Array<ClaudeTaskRecord>> {
  let tasks = (await listKanbanCards()).map(mapCardToTask)
  if (!filters.includeDone) {
    tasks = tasks.filter((task) => task.column !== 'done')
  }
  if (filters.column) {
    tasks = tasks.filter((task) => task.column === filters.column)
  }
  if (filters.assignee) {
    tasks = tasks.filter((task) => task.assignee === filters.assignee)
  }
  if (filters.priority) {
    tasks = tasks.filter((task) => task.priority === filters.priority)
  }
  return tasks.sort(
    (a, b) => b.position - a.position || a.title.localeCompare(b.title),
  )
}

export async function getClaudeTask(
  taskId: string,
): Promise<ClaudeTaskRecord | null> {
  const tasks = await listKanbanCards()
  const card = tasks.find((entry) => entry.id === taskId)
  return card ? mapCardToTask(card) : null
}

export async function getClaudeTaskDetail(
  taskId: string,
): Promise<ClaudeTaskDetail | null> {
  const detail = await getKanbanCardDetail(taskId)
  return detail ? mapCardDetailToTaskDetail(detail) : null
}

export async function createClaudeTask(
  input: CreateTaskInput,
): Promise<ClaudeTaskRecord> {
  const card = await createKanbanCard({
    title: input.title,
    spec: input.description ?? '',
    assignedWorker: input.assignee ?? null,
    status: mapTaskColumnToKanbanStatus(input.column ?? 'backlog'),
    priority: mapTaskPriorityToKanbanPriority(input.priority),
    createdBy: input.created_by ?? 'user',
  })
  return mapCardToTask(card)
}

export async function updateClaudeTask(
  taskId: string,
  updates: UpdateTaskInput,
): Promise<ClaudeTaskRecord | null> {
  const card = await updateKanbanCard(taskId, {
    title: typeof updates.title === 'string' ? updates.title : undefined,
    spec:
      typeof updates.description === 'string' ? updates.description : undefined,
    assignedWorker:
      updates.assignee === null || typeof updates.assignee === 'string'
        ? updates.assignee
        : undefined,
    priority: updates.priority
      ? mapTaskPriorityToKanbanPriority(updates.priority)
      : undefined,
    status: updates.column
      ? mapTaskColumnToKanbanStatus(updates.column)
      : undefined,
  })
  return card ? mapCardToTask(card) : null
}

export async function moveClaudeTask(
  taskId: string,
  column: TaskColumn,
): Promise<ClaudeTaskRecord | null> {
  return updateClaudeTask(taskId, { column })
}
