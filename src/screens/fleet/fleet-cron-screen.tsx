import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import type { FleetCronDashboardJob, FleetCronDashboardPayload } from '@/server/fleet'
import type { FleetOperationResponse } from '@/server/fleet-operations'
import { cn } from '@/lib/utils'

async function fetchFleetCron(): Promise<FleetCronDashboardPayload> {
  const res = await fetch('/api/fleet-cron')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function SummaryTile({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</div>
      <div className={cn('mt-2 text-3xl font-semibold tabular-nums', tone)}>{value}</div>
    </div>
  )
}

function toneClass(job: FleetCronDashboardJob) {
  if (job.lastRunStatus === 'failed') return 'border-red-500/30 bg-red-500/10 text-red-300'
  if (job.style.tone === 'systemish') return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
  if (job.style.tone === 'human') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  return 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300'
}

function statusClass(status: string) {
  if (status === 'active') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  if (status === 'paused') return 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300'
  return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
}

function JobCard({
  job,
  onRunNow,
  running,
}: {
  job: FleetCronDashboardJob
  onRunNow: (job: FleetCronDashboardJob) => void
  running: boolean
}) {
  const nodeDetailUrl = `/fleet-node?nodeId=${encodeURIComponent(job.nodeId)}`
  const cronDetailUrl = `/fleet-cron-detail?nodeId=${encodeURIComponent(job.nodeId)}&jobId=${encodeURIComponent(job.id)}`
  return (
    <article className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold text-ink">{job.name}</h2>
            <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]', statusClass(job.status))}>{job.status}</span>
          </div>
          <div className="mt-1 text-xs text-muted">
            {job.nodeName} · <span className="font-mono">{job.id}</span>
          </div>
        </div>
        <span className={cn('w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]', toneClass(job))}>
          {job.lastRunStatus === 'failed' ? 'failed' : job.style.tone}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-xs md:grid-cols-3">
        <div className="rounded-xl bg-[var(--theme-card2)] p-3">
          <div className="text-muted">Schedule</div>
          <div className="mt-1 font-mono text-ink">{job.schedule || 'manual'}</div>
        </div>
        <div className="rounded-xl bg-[var(--theme-card2)] p-3">
          <div className="text-muted">Next run</div>
          <div className="mt-1 truncate text-ink">{job.nextRun || '—'}</div>
        </div>
        <div className="rounded-xl bg-[var(--theme-card2)] p-3">
          <div className="text-muted">Last run</div>
          <div className="mt-1 truncate text-ink">{job.lastRunStatus || '—'}</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-medium text-ink">Delivery polish</div>
          <div className="text-xs text-muted">score {job.style.score}</div>
        </div>
        <div className="mt-2 text-xs text-muted">
          {job.style.reasons.length ? job.style.reasons.join(' · ') : 'Looks clean from available metadata.'}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href={cronDetailUrl}>
          Cron detail
        </a>
        <a className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href={nodeDetailUrl}>
          Node detail
        </a>
        <button
          className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-100 hover:bg-amber-500/20 disabled:text-muted"
          disabled={running}
          onClick={() => onRunNow(job)}
        >
          {running ? 'Running…' : 'Run now'}
        </button>
        <a className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href="/fleet-operations">
          Audit trail
        </a>
        <button className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-muted" disabled>
          Pause/resume soon
        </button>
      </div>
    </article>
  )
}

export function FleetCronScreen() {
  const queryClient = useQueryClient()
  const [pendingRun, setPendingRun] = useState<FleetCronDashboardJob | null>(null)
  const [operationResult, setOperationResult] = useState<FleetOperationResponse | null>(null)
  const query = useQuery({
    queryKey: ['fleet-cron'],
    queryFn: fetchFleetCron,
    refetchInterval: 30_000,
    staleTime: 10_000,
  })
  const runNowMutation = useMutation({
    mutationFn: async (job: FleetCronDashboardJob) => {
      const res = await fetch('/api/fleet-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'cron.run_now', nodeId: job.nodeId, jobId: job.id, confirmed: true }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<FleetOperationResponse>
    },
    onSuccess: async (result) => {
      setOperationResult(result)
      setPendingRun(null)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['fleet-cron'] }),
        queryClient.invalidateQueries({ queryKey: ['fleet-operations'] }),
      ])
    },
  })
  const data = query.data

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-6 py-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <a className="text-sm text-muted hover:text-ink" href="/fleet">← Fleet</a>
            <span className="mx-2 text-muted">·</span>
            <a className="text-sm text-muted hover:text-ink" href="/fleet-operations">Operations audit</a>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Cron control</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Cron Control Center</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Schedules, run status, source nodes, delivery polish signals, and confirmation-gated execution with audit records.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-4 py-3 text-xs text-muted">
            <div>Registry</div>
            <div className="mt-1 max-w-[360px] truncate font-mono text-ink">{data?.registryPath || '~/.hermes/fleet.yaml'}</div>
          </div>
        </header>

        {query.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Cron collection failed: {query.error instanceof Error ? query.error.message : 'unknown error'}
          </div>
        ) : null}

        {runNowMutation.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Run failed: {runNowMutation.error instanceof Error ? runNowMutation.error.message : 'unknown error'}
          </div>
        ) : null}

        {operationResult ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <div className="font-semibold">Operation recorded: {operationResult.record.status}</div>
            <pre className="mt-2 whitespace-pre-wrap text-xs">{operationResult.record.resultSummary}</pre>
            <a className="mt-3 inline-block text-xs underline" href="/fleet-operations">View audit trail</a>
          </div>
        ) : null}

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryTile label="Jobs" value={data?.summary.total ?? 0} tone="text-ink" />
          <SummaryTile label="Active" value={data?.summary.active ?? 0} tone="text-emerald-300" />
          <SummaryTile label="Paused" value={data?.summary.paused ?? 0} tone="text-neutral-300" />
          <SummaryTile label="Failed" value={data?.summary.failedRecent ?? 0} tone="text-red-300" />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {(data?.jobs ?? []).map((job) => (
            <JobCard
              key={`${job.nodeId}-${job.id}`}
              job={job}
              running={runNowMutation.isPending && pendingRun?.nodeId === job.nodeId && pendingRun?.id === job.id}
              onRunNow={setPendingRun}
            />
          ))}
          {query.isLoading ? (
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-muted">
              Collecting cron jobs…
            </div>
          ) : null}
          {data && data.jobs.length === 0 ? (
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-muted">
              No cron jobs reported by fleet nodes.
            </div>
          ) : null}
        </section>

        <footer className="text-xs text-muted">
          Last refresh: {data ? new Date(data.generatedAt).toLocaleString() : 'not yet'}
        </footer>
        {pendingRun ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">Confirm operation</div>
              <h2 className="mt-2 text-xl font-semibold text-ink">Run cron now?</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="rounded-xl bg-[var(--theme-card2)] p-3"><span className="text-muted">Node</span><br />{pendingRun.nodeName} · <span className="font-mono">{pendingRun.nodeId}</span></div>
                <div className="rounded-xl bg-[var(--theme-card2)] p-3"><span className="text-muted">Job</span><br />{pendingRun.name} · <span className="font-mono">{pendingRun.id}</span></div>
                <div className="rounded-xl bg-[var(--theme-card2)] p-3"><span className="text-muted">Side effect</span><br />Triggers this job immediately. If it sends a message, that delivery cannot be unsent.</div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button className="rounded-lg border border-[var(--theme-border)] px-3 py-2 text-xs text-ink" onClick={() => setPendingRun(null)} disabled={runNowMutation.isPending}>
                  Cancel
                </button>
                <button
                  className="rounded-lg border border-amber-500/40 bg-amber-500/20 px-3 py-2 text-xs text-amber-100 hover:bg-amber-500/30 disabled:text-muted"
                  disabled={runNowMutation.isPending}
                  onClick={() => runNowMutation.mutate(pendingRun)}
                >
                  {runNowMutation.isPending ? 'Running…' : 'Confirm run'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
