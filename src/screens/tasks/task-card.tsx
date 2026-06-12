import { cn } from '@/lib/utils'
import type { ClaudeTask, TaskAgentState } from '@/lib/tasks-api'
import { PRIORITY_COLORS, isOverdue } from '@/lib/tasks-api'

type Props = {
  task: ClaudeTask
  assigneeLabels?: Record<string, string>
  onClick: () => void
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

const AGENT_STATE_CONFIG: Record<
  NonNullable<TaskAgentState>,
  { label: string; color: string; pulse: boolean }
> = {
  reviewing: { label: 'Astra reviewing…', color: '#a855f7', pulse: true },
  delegating: { label: 'Delegating…', color: '#f59e0b', pulse: true },
  working: { label: 'Agent working…', color: '#3b82f6', pulse: true },
}

function AgentStateBadge({ state, agentName }: { state: TaskAgentState; agentName?: string | null }) {
  if (!state) return null
  const cfg = AGENT_STATE_CONFIG[state]
  const label = state === 'delegating' && agentName ? `→ ${agentName}` : cfg.label
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
      style={{ background: `${cfg.color}22`, color: cfg.color, border: `1px solid ${cfg.color}44` }}
    >
      {cfg.pulse && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: cfg.color }}
        />
      )}
      {label}
    </span>
  )
}

function SourceBadge({ source }: { source: ClaudeTask['source'] }) {
  if (!source || source === 'human') return null
  if (source === 'idea_job') {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
        💡 idea
      </span>
    )
  }
  if (source === 'astra') {
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
        ✦ astra
      </span>
    )
  }
  return null
}

export function TaskCard({ task, assigneeLabels = {}, onClick, onDragStart, isDragging }: Props) {
  const overdue = isOverdue(task)
  const priorityColor = PRIORITY_COLORS[task.priority]
  const visibleTags = task.tags.slice(0, 2)
  const extraTagCount = task.tags.length - 2
  const assigneeLabel = formatTaskAssigneeLabel(task.assignee, assigneeLabels)
  const isAgentActive = Boolean(task.agent_state)

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
        isAgentActive && 'ring-1 ring-violet-500/30',
      )}
      style={{ borderLeftWidth: 3, borderLeftColor: priorityColor }}
    >
      {/* Priority dot in top-right */}
      <span
        className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full shrink-0"
        style={{ background: priorityColor }}
        title={`Priority: ${task.priority}`}
      />

      {/* Agent state banner — overlays top of card when active */}
      {isAgentActive && (
        <div
          className="absolute inset-x-0 top-0 h-0.5 rounded-t-lg animate-pulse"
          style={{ background: 'linear-gradient(90deg, #a855f7, #3b82f6, #a855f7)', backgroundSize: '200%', animation: 'gradient-shift 2s linear infinite' }}
        />
      )}

      <p className="text-sm font-medium text-[var(--theme-text)] leading-snug mb-1 line-clamp-2 pr-4">
        {task.title}
      </p>

      {task.description && (
        <p className="text-xs text-[var(--theme-muted)] line-clamp-2 mb-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-col gap-1.5 mt-2">
        {/* Agent state + source badges */}
        {(isAgentActive || (task.source && task.source !== 'human')) && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <AgentStateBadge state={task.agent_state ?? null} agentName={task.agent_name} />
            <SourceBadge source={task.source} />
          </div>
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
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
                  const [y, m, d] = task.due_date!.split('-').map(Number)
                  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                })()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
