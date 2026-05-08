'use client'

import { Dialog } from '@base-ui/react/dialog'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type {
  ClaudeTask,
  TaskAssignee,
  TaskColumn,
  TaskComment,
  TaskDetail,
  TaskEvent,
  TaskPriority,
  TaskRelationLink,
  TaskRun,
  UpdateTaskInput,
} from '@/lib/tasks-api'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { COLUMN_LABELS, COLUMN_ORDER } from '@/lib/tasks-api'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskId?: string | null
  task: ClaudeTask | null
  detail?: TaskDetail | null
  isLoadingDetail?: boolean
  detailError?: Error | null
  assignees: Array<TaskAssignee>
  allTasks?: Array<ClaudeTask>
  onOpenTask?: (taskId: string) => void
  onSubmit: (input: UpdateTaskInput) => Promise<void>
  isSubmitting: boolean
}

export type TaskHistoryEntry = {
  id: string
  timestamp: number
  source: 'event' | 'comment' | 'run' | 'synthetic'
  title: string
  subtitle?: string
  body?: string
  payloadText?: string
  tone?: 'default' | 'success' | 'warning' | 'danger'
}

function toTimestamp(value: number | string | null | undefined): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value > 1_000_000_000_000 ? value : value * 1000
  }
  if (typeof value === 'string' && value.trim()) {
    const numeric = Number(value)
    if (Number.isFinite(numeric)) return toTimestamp(numeric)
    const parsed = Date.parse(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function formatTimestamp(timestamp: number): string {
  if (!timestamp) return 'Unknown time'
  return new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function titleCase(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function compactPayload(
  payload: TaskEvent['payload'] | undefined,
): string | undefined {
  if (payload === undefined || payload === null) return undefined
  if (typeof payload !== 'object') return String(payload)
  if (Array.isArray(payload)) return JSON.stringify(payload, null, 2)

  const parts: Array<string> = []
  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined || value === '') continue
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      parts.push(`${titleCase(key)}: ${String(value)}`)
    }
  }
  if (parts.length > 0) return parts.join(' · ')
  return JSON.stringify(payload, null, 2)
}

function eventTitle(event: TaskEvent): string {
  const payload =
    event.payload &&
    typeof event.payload === 'object' &&
    !Array.isArray(event.payload)
      ? event.payload
      : {}

  switch (event.kind) {
    case 'created':
      return 'Task created'
    case 'edited':
      return 'Fields edited'
    case 'assigned':
      return payload.assignee
        ? `Assigned to ${String(payload.assignee)}`
        : 'Unassigned'
    case 'status':
      return payload.status
        ? `Moved to ${titleCase(String(payload.status))}`
        : 'Status changed'
    case 'blocked':
      return 'Blocked'
    case 'unblocked':
      return 'Unblocked'
    case 'completed':
    case 'done':
      return 'Completed'
    case 'claimed':
      return payload.profile
        ? `Claimed by ${String(payload.profile)}`
        : 'Claimed'
    case 'reclaimed':
      return 'Claim reclaimed'
    case 'reprioritized':
      return payload.priority !== undefined
        ? `Priority set to ${String(payload.priority)}`
        : 'Priority changed'
    case 'linked':
      return 'Dependency linked'
    case 'unlinked':
      return 'Dependency removed'
    case 'updated':
      return 'Task updated'
    default:
      return titleCase(event.kind)
  }
}

function eventTone(kind: string): TaskHistoryEntry['tone'] {
  if (kind === 'completed' || kind === 'done' || kind === 'unblocked')
    return 'success'
  if (kind === 'blocked' || kind === 'spawn_auto_blocked' || kind === 'gave_up')
    return 'danger'
  if (
    kind.includes('warning') ||
    kind.includes('hallucination') ||
    kind === 'reprioritized'
  )
    return 'warning'
  return 'default'
}

function runTitle(run: TaskRun): string {
  const status = run.outcome || run.status
  const prefix = `Run ${run.id}`
  return status ? `${prefix} ${titleCase(status)}` : prefix
}

function runTone(run: TaskRun): TaskHistoryEntry['tone'] {
  const status = (run.outcome || run.status || '').toLowerCase()
  if (status === 'completed' || status === 'done') return 'success'
  if (
    status === 'blocked' ||
    status === 'crashed' ||
    status === 'timed_out' ||
    status === 'failed' ||
    status === 'gave_up'
  )
    return 'danger'
  if (status === 'running') return 'warning'
  return 'default'
}

export function buildTaskHistoryEntries(
  detail: TaskDetail | null | undefined,
  fallbackTask: ClaudeTask | null | undefined,
): Array<TaskHistoryEntry> {
  const task = detail?.task ?? fallbackTask ?? null
  const entries: Array<TaskHistoryEntry> = []
  let hasCreatedEvent = false

  for (const event of detail?.events ?? []) {
    if (event.kind === 'created') hasCreatedEvent = true
    if (event.kind === 'commented') continue
    entries.push({
      id: `event:${event.id}`,
      timestamp: toTimestamp(event.created_at),
      source: 'event',
      title: eventTitle(event),
      subtitle: event.run_id ? `Event · Run ${event.run_id}` : 'Event',
      payloadText: compactPayload(event.payload),
      tone: eventTone(event.kind),
    })
  }

  for (const comment of detail?.comments ?? []) {
    entries.push({
      id: `comment:${comment.id}`,
      timestamp: toTimestamp(comment.created_at),
      source: 'comment',
      title: `Comment from ${comment.author}`,
      subtitle: 'Comment',
      body: comment.body,
    })
  }

  for (const run of detail?.runs ?? []) {
    const endedAt = toTimestamp(run.ended_at ?? undefined)
    const startedAt = toTimestamp(run.started_at)
    const profile = run.profile ? ` · ${run.profile}` : ''
    entries.push({
      id: `run:${run.id}`,
      timestamp: endedAt || startedAt,
      source: 'run',
      title: runTitle(run),
      subtitle: `Run attempt${profile}`,
      body: run.summary || run.error || undefined,
      payloadText: run.metadata
        ? JSON.stringify(run.metadata, null, 2)
        : undefined,
      tone: runTone(run),
    })
  }

  if (task && entries.length === 0) {
    entries.push({
      id: `synthetic:updated:${task.id}`,
      timestamp: toTimestamp(task.updated_at),
      source: 'synthetic',
      title: 'Last updated',
      subtitle: 'Task record',
      tone: 'default',
    })
  }

  if (task && !hasCreatedEvent) {
    entries.push({
      id: `synthetic:created:${task.id}`,
      timestamp: toTimestamp(task.created_at),
      source: 'synthetic',
      title: 'Task created',
      subtitle: `Created by ${task.created_by}`,
      tone: 'default',
    })
  }

  return entries.sort(
    (a, b) => b.timestamp - a.timestamp || b.id.localeCompare(a.id),
  )
}

function statusLabel(column: TaskColumn): string {
  return COLUMN_LABELS[column]
}

function inputBaseClass() {
  return cn(
    'w-full rounded-lg border px-3 py-2 text-sm',
    'bg-[var(--theme-input)] border-[var(--theme-border)] text-[var(--theme-text)]',
    'focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]',
    'placeholder:text-[var(--theme-muted)]',
  )
}

function toneClasses(tone: TaskHistoryEntry['tone']) {
  switch (tone) {
    case 'success':
      return 'border-emerald-400/60 bg-emerald-400/15'
    case 'warning':
      return 'border-amber-400/60 bg-amber-400/15'
    case 'danger':
      return 'border-red-400/60 bg-red-400/15'
    default:
      return 'border-[var(--theme-border)] bg-[var(--theme-hover)]'
  }
}

function HistoryList({ entries }: { entries: Array<TaskHistoryEntry> }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--theme-border)] p-4 text-sm text-[var(--theme-muted)]">
        No history has been recorded for this task yet.
      </div>
    )
  }

  return (
    <ol className="min-w-0 space-y-3">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="grid min-w-0 grid-cols-[12px_minmax(0,1fr)] gap-3"
        >
          <div className="flex flex-col items-center pt-1.5">
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full border',
                toneClasses(entry.tone),
              )}
            />
            <span className="mt-1 h-full min-h-8 w-px bg-[var(--theme-border)]" />
          </div>
          <article className="min-w-0 max-w-full overflow-hidden rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="break-words text-sm font-medium text-[var(--theme-text)] [overflow-wrap:anywhere]">
                  {entry.title}
                </h4>
                {entry.subtitle && (
                  <p className="mt-0.5 break-words text-[11px] text-[var(--theme-muted)] [overflow-wrap:anywhere]">
                    {entry.subtitle}
                  </p>
                )}
              </div>
              <time className="shrink-0 text-right text-[10px] leading-snug text-[var(--theme-muted)]">
                {formatTimestamp(entry.timestamp)}
              </time>
            </div>
            {entry.body && (
              <p className="mt-3 whitespace-pre-wrap break-words text-xs leading-relaxed text-[var(--theme-text)] [overflow-wrap:anywhere]">
                {entry.body}
              </p>
            )}
            {entry.payloadText && (
              <pre className="mt-3 max-h-60 max-w-full overflow-auto whitespace-pre-wrap break-words rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg)] p-2 text-[11px] leading-relaxed text-[var(--theme-muted)] [overflow-wrap:anywhere]">
                {entry.payloadText}
              </pre>
            )}
          </article>
        </li>
      ))}
    </ol>
  )
}

function resolveRelatedTask(
  link: TaskRelationLink,
  allTasks: Array<ClaudeTask>,
): TaskRelationLink {
  const knownTask = allTasks.find((task) => task.id === link.id)
  if (!knownTask) return link
  return {
    id: link.id,
    title: link.title ?? knownTask.title,
    column: link.column ?? knownTask.column,
    priority: link.priority ?? knownTask.priority,
    assignee: link.assignee ?? knownTask.assignee,
  }
}

function relatedTaskMeta(relation: TaskRelationLink): string {
  const parts = [relation.id]
  if (relation.column) parts.push(statusLabel(relation.column))
  if (relation.assignee) parts.push(`Assigned to ${relation.assignee}`)
  return parts.join(' · ')
}

function RelatedTaskGroup({
  title,
  links,
  allTasks,
  currentTaskId,
  onOpenTask,
}: {
  title: string
  links: Array<TaskRelationLink>
  allTasks: Array<ClaudeTask>
  currentTaskId: string
  onOpenTask?: (taskId: string) => void
}) {
  return (
    <div className="min-w-0 space-y-2">
      <h4 className="text-xs font-medium text-[var(--theme-muted)]">{title}</h4>
      {links.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--theme-border)] px-3 py-2 text-xs text-[var(--theme-muted)]">
          None
        </p>
      ) : (
        <div className="min-w-0 space-y-2">
          {links.map((link) => {
            const relation = resolveRelatedTask(link, allTasks)
            const isCurrentTask = relation.id === currentTaskId
            const canOpen = Boolean(onOpenTask) && !isCurrentTask
            return (
              <button
                key={relation.id}
                type="button"
                disabled={!canOpen}
                onClick={() => onOpenTask?.(relation.id)}
                className={cn(
                  'group flex min-w-0 w-full items-start justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors',
                  'border-[var(--theme-border)] bg-[var(--theme-panel)] hover:border-[var(--theme-accent)] hover:bg-[var(--theme-hover)]',
                  isCurrentTask && 'cursor-default opacity-70',
                )}
              >
                <span className="min-w-0">
                  <span className="block break-words text-sm font-medium text-[var(--theme-text)] [overflow-wrap:anywhere]">
                    {relation.title || relation.id}
                  </span>
                  <span className="mt-0.5 block break-words text-[11px] text-[var(--theme-muted)] [overflow-wrap:anywhere]">
                    {relatedTaskMeta(relation)}
                  </span>
                </span>
                {canOpen && (
                  <span className="shrink-0 text-xs text-[var(--theme-muted)] transition-colors group-hover:text-[var(--theme-accent)]">
                    Open
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function RelatedTasksSection({
  detail,
  allTasks,
  currentTaskId,
  onOpenTask,
}: {
  detail: TaskDetail | null | undefined
  allTasks: Array<ClaudeTask>
  currentTaskId: string
  onOpenTask?: (taskId: string) => void
}) {
  const parents = detail?.links.parents ?? []
  const children = detail?.links.children ?? []
  if (parents.length === 0 && children.length === 0) return null

  return (
    <section className="min-w-0 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[var(--theme-text)]">
          Related tasks
        </h3>
        <p className="mt-1 text-xs text-[var(--theme-muted)]">
          Parent and child tasks open in this sheet.
        </p>
      </div>
      <div className="min-w-0 space-y-4">
        <RelatedTaskGroup
          title="Parent tasks"
          links={parents}
          allTasks={allTasks}
          currentTaskId={currentTaskId}
          onOpenTask={onOpenTask}
        />
        <RelatedTaskGroup
          title="Child tasks"
          links={children}
          allTasks={allTasks}
          currentTaskId={currentTaskId}
          onOpenTask={onOpenTask}
        />
      </div>
    </section>
  )
}

export function TaskSheet({
  open,
  onOpenChange,
  taskId = null,
  task,
  detail,
  isLoadingDetail = false,
  detailError = null,
  assignees,
  allTasks = [],
  onOpenTask,
  onSubmit,
  isSubmitting,
}: Props) {
  const activeTask = detail?.task ?? task
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [column, setColumn] = useState<TaskColumn>('backlog')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [assignee, setAssignee] = useState<string>('')
  const [tags, setTags] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (!activeTask) return
    setTitle(activeTask.title)
    setDescription(activeTask.description)
    setColumn(activeTask.column)
    setPriority(activeTask.priority)
    setAssignee(activeTask.assignee ?? '')
    setTags(activeTask.tags.join(', '))
    setDueDate(activeTask.due_date ?? '')
  }, [activeTask?.id, activeTask?.updated_at, activeTask])

  const historyEntries = useMemo(
    () => buildTaskHistoryEntries(detail, activeTask),
    [detail, activeTask],
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      column,
      priority,
      assignee: assignee || null,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      due_date: dueDate || null,
    })
  }

  const inputClass = inputBaseClass()
  const labelClass = 'block text-xs font-medium text-[var(--theme-muted)] mb-1'

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Popup
          className={cn(
            'fixed right-0 top-0 z-50 flex h-dvh w-[min(920px,100vw)] flex-col overflow-hidden',
            'border-l border-[var(--theme-border)] bg-[var(--theme-panel)] text-[var(--theme-text)] shadow-[0_24px_120px_rgba(0,0,0,0.45)]',
            'transition-transform duration-200 ease-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0',
          )}
        >
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--theme-border)] p-5">
            <div className="min-w-0">
              <Dialog.Title className="text-lg font-semibold text-[var(--theme-text)]">
                {activeTask?.title || 'Task'}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-xs text-[var(--theme-muted)]">
                {activeTask
                  ? `${activeTask.id} · ${statusLabel(activeTask.column)} · newest history first`
                  : 'Task detail'}
              </Dialog.Description>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-sm text-[var(--theme-muted)] transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-text)]"
              aria-label="Close task detail"
            >
              Close
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {!activeTask ? (
              <div className="rounded-xl border border-dashed border-[var(--theme-border)] p-6 text-sm text-[var(--theme-muted)]">
                {taskId
                  ? `Loading task ${taskId}...`
                  : 'Select a task to open its detail view.'}
              </div>
            ) : (
              <div className="min-w-0 space-y-5">
                <section className="min-w-0 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--theme-text)]">
                        Fields
                      </h3>
                      <p className="mt-1 text-xs text-[var(--theme-muted)]">
                        Edit the task record without leaving the board.
                      </p>
                    </div>
                    <span className="text-[11px] text-[var(--theme-muted)]">
                      Updated{' '}
                      {formatTimestamp(toTimestamp(activeTask.updated_at))}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass}>Title *</label>
                      <input
                        className={inputClass}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        className={cn(inputClass, 'min-h-40 resize-y')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional details..."
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Column</label>
                        <select
                          className={inputClass}
                          style={{ colorScheme: 'dark' }}
                          value={column}
                          onChange={(e) =>
                            setColumn(e.target.value as TaskColumn)
                          }
                        >
                          {COLUMN_ORDER.map((col) => (
                            <option key={col} value={col}>
                              {COLUMN_LABELS[col]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Priority</label>
                        <select
                          className={inputClass}
                          style={{ colorScheme: 'dark' }}
                          value={priority}
                          onChange={(e) =>
                            setPriority(e.target.value as TaskPriority)
                          }
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Assignee</label>
                        <select
                          className={inputClass}
                          style={{ colorScheme: 'dark' }}
                          value={assignee}
                          onChange={(e) => setAssignee(e.target.value)}
                        >
                          <option value="">Unassigned</option>
                          {assignees.map(({ id, label }) => (
                            <option key={id} value={id}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Due date</label>
                        <input
                          type="date"
                          className={inputClass}
                          style={{ colorScheme: 'dark' }}
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Tags (comma-separated)
                      </label>
                      <input
                        className={inputClass}
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="frontend, bug, research"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[var(--theme-border)] pt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={isSubmitting || !title.trim()}
                        style={{
                          background: 'var(--theme-accent)',
                          color: 'white',
                        }}
                      >
                        {isSubmitting ? 'Saving...' : 'Save changes'}
                      </Button>
                    </div>
                  </form>
                </section>

                <RelatedTasksSection
                  detail={detail}
                  allTasks={allTasks}
                  currentTaskId={activeTask.id}
                  onOpenTask={onOpenTask}
                />

                <section className="min-w-0 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--theme-text)]">
                        History
                      </h3>
                      <p className="mt-1 text-xs text-[var(--theme-muted)]">
                        Full card activity in reverse chronological order.
                      </p>
                    </div>
                    <span className="text-[11px] text-[var(--theme-muted)]">
                      {historyEntries.length} entries
                    </span>
                  </div>

                  {isLoadingDetail && (
                    <div className="mb-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-hover)] p-3 text-xs text-[var(--theme-muted)]">
                      Loading full history...
                    </div>
                  )}

                  {detailError && (
                    <div className="mb-3 rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-xs text-red-300">
                      Could not load full history: {detailError.message}
                    </div>
                  )}

                  <HistoryList entries={historyEntries} />
                </section>
              </div>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
