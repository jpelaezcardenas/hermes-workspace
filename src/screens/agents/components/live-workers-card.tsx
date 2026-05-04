import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { RunningKanbanWorker } from '../hooks/use-operations'

function formatElapsed(startedAt: number, now: number): string {
  const diffMs = Math.max(0, now - startedAt)
  const seconds = Math.floor(diffMs / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const minutesRest = minutes % 60
  if (hours < 24) {
    return minutesRest > 0 ? `${hours}h ${minutesRest}m` : `${hours}h`
  }
  const days = Math.floor(hours / 24)
  return `${days}d`
}

export function liveWorkerRowDomId(taskId: string): string {
  return `live-worker-row-${taskId}`
}

/** Pure presentational layer — no hooks. Exported so tests can render the
 *  visible output without needing a live React-hook dispatcher in vitest
 *  (this repo has no React-component test setup yet). The stateful
 *  LiveWorkersCard wraps this with its `now` ticker + highlight focus. */
export function LiveWorkersCardView({
  workers,
  now,
  highlightId,
  isLoading,
}: {
  workers: ReadonlyArray<RunningKanbanWorker>
  now: number
  highlightId?: string | null
  isLoading?: boolean
}) {
  const sorted = [...workers].sort((left, right) => right.startedAt - left.startedAt)
  return (
    <section
      data-testid="live-workers-card"
      className="rounded-3xl border border-primary-200 bg-surface p-5 shadow-[0_24px_80px_var(--theme-shadow)]"
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[var(--theme-text)]">Live Workers</h2>
          <span
            className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-[var(--theme-card2)] px-2 py-0.5 text-xs font-medium text-[var(--theme-text)]"
            aria-label={`${sorted.length} running`}
          >
            {sorted.length}
          </span>
        </div>
        {isLoading ? (
          <span className="text-xs text-[var(--theme-muted)]">Refreshing…</span>
        ) : null}
      </header>

      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-primary-200 bg-surface px-4 py-6 text-sm text-[var(--theme-muted)]/80">
          No live workers.
        </p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((worker) => {
            const elapsed = formatElapsed(worker.startedAt, now)
            const isHighlighted = highlightId === worker.taskId
            return (
              <li
                key={worker.taskId}
                id={liveWorkerRowDomId(worker.taskId)}
                data-testid="live-worker-row"
                data-task-id={worker.taskId}
                className={cn(
                  'flex flex-wrap items-center gap-2 rounded-xl border border-primary-200 bg-surface px-3 py-2 transition-shadow',
                  isHighlighted &&
                    'ring-2 ring-[var(--theme-accent)] shadow-[0_0_0_4px_var(--theme-accent-soft)]',
                )}
              >
                <span aria-hidden className="text-base">
                  🤖
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-sm font-medium text-[var(--theme-text)]"
                  title={worker.title}
                >
                  {worker.title}
                </span>
                {worker.assignee ? (
                  <span
                    data-testid="live-worker-assignee"
                    className="inline-flex items-center rounded-full bg-[var(--theme-card2)] px-2 py-0.5 text-[11px] font-medium text-[var(--theme-text)]"
                  >
                    {worker.assignee}
                  </span>
                ) : null}
                <span
                  className="inline-flex items-center rounded-full bg-[var(--theme-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--theme-text)]"
                  aria-label={`Elapsed ${elapsed}`}
                >
                  {elapsed}
                </span>
                <a
                  href={`/missions?focus=${encodeURIComponent(worker.taskId)}`}
                  aria-label={`View log for ${worker.title}`}
                  className="inline-flex h-7 items-center rounded-lg border border-primary-200 bg-surface px-2.5 text-xs font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card2)]"
                >
                  View Log
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export function LiveWorkersCard({
  workers,
  isLoading,
}: {
  workers: RunningKanbanWorker[]
  isLoading?: boolean
}) {
  const [now, setNow] = useState<number>(() => Date.now())
  const [highlightId, setHighlightId] = useState<string | null>(null)

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(interval)
  }, [])

  // External code can dispatch a CustomEvent to flash a row (used by the
  // operations agent card pill). Keeps coupling loose so the card has no
  // direct dependency on screen-level state.
  useEffect(() => {
    function onFocus(event: Event) {
      const detail = (event as CustomEvent<{ taskId?: string }>).detail
      const taskId = detail?.taskId
      if (!taskId) return
      const row = document.getElementById(liveWorkerRowDomId(taskId))
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      setHighlightId(taskId)
      window.setTimeout(() => {
        setHighlightId((current) => (current === taskId ? null : current))
      }, 1000)
    }
    window.addEventListener('operations:focus-live-worker', onFocus as EventListener)
    return () =>
      window.removeEventListener('operations:focus-live-worker', onFocus as EventListener)
  }, [])

  // Keep the sorted memo here only to avoid re-allocating on every render even
  // though LiveWorkersCardView re-sorts internally — cheap defense in depth.
  const stableWorkers = useMemo(
    () => [...workers].sort((left, right) => right.startedAt - left.startedAt),
    [workers],
  )

  return (
    <LiveWorkersCardView
      workers={stableWorkers}
      now={now}
      highlightId={highlightId}
      isLoading={isLoading}
    />
  )
}
