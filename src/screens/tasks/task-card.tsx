import { formatWorkerExecutionLabel, getWorkerExecutionTone, shouldShowWorkerExecution, workerToneClass } from './worker-status'
import type { ClaudeTask } from '@/lib/tasks-api'
import { PRIORITY_COLORS, isOverdue } from '@/lib/tasks-api'
import { cn } from '@/lib/utils'

type Props = {
  task: ClaudeTask
  assigneeLabels?: Record<string, string>
  onClick: () => void
  onRunWorker?: () => void
  workerRunning?: boolean
  onDragStart: (e: React.DragEvent) => void
  isDragging?: boolean
}

export function formatTaskAssigneeLabel(
  assignee: string | null,
  assigneeLabels: Record<string, string>,
): string {
  const resolvedLabel = assignee ? (assigneeLabels[assignee] ?? assignee) : 'Unassigned'
  return `Assignee: ${resolvedLabel}`
}

export function TaskCard({ task, assigneeLabels = {}, onClick, onRunWorker, workerRunning = false, onDragStart, isDragging }: Props) {
  const overdue = isOverdue(task)
  const priorityColor = PRIORITY_COLORS[task.priority]
  const visibleTags = task.tags.slice(0, 2)
  const extraTagCount = task.tags.length - 2
  const assigneeLabel = formatTaskAssigneeLabel(task.assignee, assigneeLabels)
  const workerExecution = task.worker_execution
  const showWorkerExecution = shouldShowWorkerExecution(workerExecution)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={cn(
        'relative rounded-lg border p-3 cursor-pointer transition-all select-none',
        'bg-[var(--theme-card)] border-[var(--theme-border)]',
        'hover:border-[var(--theme-accent)]',
        isDragging ? 'opacity-40 rotate-1 shadow-2xl' : 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]',
      )}
      style={{ borderLeftWidth: 3, borderLeftColor: priorityColor }}
    >
      {/* Priority dot in top-right */}
      <span
        className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full shrink-0"
        style={{ background: priorityColor }}
        title={`Priority: ${task.priority}`}
      />

      <p className="text-sm font-medium text-[var(--theme-text)] leading-snug mb-1 line-clamp-2 pr-4">
        {task.title}
      </p>

      {task.description && (
        <p className="text-xs text-[var(--theme-muted)] line-clamp-2 mb-2">
          {task.description}
        </p>
      )}

      {showWorkerExecution && (
        <div className="mb-2 flex flex-col gap-1">
          <span
            className={cn(
              'w-fit rounded-md border px-1.5 py-0.5 text-[10px] font-medium',
              workerToneClass(getWorkerExecutionTone(workerExecution.status)),
            )}
            title={workerExecution.safe_summary}
          >
            {formatWorkerExecutionLabel(workerExecution)}
          </span>
          {workerExecution.safe_next_prompt && (
            <p className="line-clamp-1 text-[10px] text-[var(--theme-muted)]">
              Next: {workerExecution.safe_next_prompt}
            </p>
          )}
        </div>
      )}

      {onRunWorker && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onRunWorker()
          }}
          disabled={workerRunning}
          className="mb-2 rounded-md border border-[var(--theme-border)] px-2 py-1 text-[10px] font-medium text-[var(--theme-muted)] transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-text)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {workerRunning ? 'Running fake worker…' : 'Run fake worker'}
        </button>
      )}

      <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--theme-hover)] text-[var(--theme-muted)]">
            {assigneeLabel}
          </span>
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--theme-hover)] text-[var(--theme-muted)]"
            >
              {tag}
            </span>
          ))}
          {extraTagCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--theme-hover)] text-[var(--theme-muted)]">
              +{extraTagCount} more
            </span>
          )}
        </div>

        {task.due_date && (
          <div className="flex items-center gap-1 text-[10px] tabular-nums">
            {overdue && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="text-red-400 font-semibold">Overdue</span>
                <span className="text-[var(--theme-muted)] mx-0.5">·</span>
              </>
            )}
            <span className={overdue ? 'text-red-400 font-semibold' : 'text-[var(--theme-muted)]'}>
              {(() => {
                const [y, m, d] = task.due_date.split('-').map(Number)
                return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              })()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
