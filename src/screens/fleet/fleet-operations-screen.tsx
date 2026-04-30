import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FleetOperationAuditRecord, FleetOperationResponse } from '@/server/fleet-operations'
import { cn } from '@/lib/utils'

async function fetchOperations(): Promise<{ generatedAt: string; records: Array<FleetOperationAuditRecord> }> {
  const res = await fetch('/api/fleet-operations?limit=100')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function statusClass(status: FleetOperationAuditRecord['status']) {
  if (status === 'completed') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  if (status === 'failed' || status === 'rejected') return 'border-red-500/30 bg-red-500/10 text-red-300'
  if (status === 'running') return 'border-blue-500/30 bg-blue-500/10 text-blue-300'
  return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
}

export function FleetOperationsScreen() {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['fleet-operations'], queryFn: fetchOperations, refetchInterval: 15_000 })
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/fleet-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'plan', operation: 'cron.run_now', nodeId: 'pierre-local', jobId: '8c886b3fed87' }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<FleetOperationResponse>
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fleet-operations'] }),
  })
  const records = query.data?.records ?? []

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-6 py-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <a className="text-sm text-muted hover:text-ink" href="/fleet">← Fleet</a>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Operations</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Fleet Operations</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Audit trail first. Every sharp button writes a record before it does anything interesting.
            </p>
          </div>
          <button
            className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-4 py-2 text-xs text-ink hover:bg-[var(--theme-card2)] disabled:text-muted"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            Test plan diary run
          </button>
        </header>

        {mutation.data?.plan ? (
          <section className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Planned operation</div>
            <div className="mt-2 text-lg font-semibold text-ink">{mutation.data.plan.operation}</div>
            <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-xl bg-black/20 p-3"><span className="text-muted">Node</span><br />{mutation.data.plan.nodeId}</div>
              <div className="rounded-xl bg-black/20 p-3"><span className="text-muted">Target</span><br />{mutation.data.plan.targetId}</div>
              <div className="rounded-xl bg-black/20 p-3"><span className="text-muted">Side effect</span><br />{mutation.data.plan.sideEffect}</div>
              <div className="rounded-xl bg-black/20 p-3"><span className="text-muted">Rollback</span><br />{mutation.data.plan.rollback}</div>
            </div>
            <pre className="mt-3 overflow-auto rounded-xl bg-black/30 p-3 text-xs text-ink">{mutation.data.plan.displayCommand}</pre>
            <div className="mt-3 text-xs text-muted">Execution buttons are wired on cron cards. This page proves the audit spine without surprise side effects.</div>
          </section>
        ) : null}

        {query.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Operations audit failed: {query.error instanceof Error ? query.error.message : 'unknown error'}
          </div>
        ) : null}

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Recent audit records</h2>
            <div className="text-xs text-muted">{records.length} records</div>
          </div>
          <div className="grid gap-3">
            {records.map((record) => (
              <article key={record.id} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="font-mono text-xs text-muted">{record.id}</div>
                    <div className="mt-1 text-sm font-semibold text-ink">{record.operation} · {record.nodeId} · {record.targetId}</div>
                  </div>
                  <span className={cn('w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]', statusClass(record.status))}>{record.status}</span>
                </div>
                <div className="mt-3 text-xs text-muted">{new Date(record.timestamp).toLocaleString()} · {record.commandClass} · actor {record.actor}</div>
                <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-black/20 p-3 text-xs text-ink">{record.resultSummary}</pre>
              </article>
            ))}
            {query.isLoading ? <div className="text-sm text-muted">Collecting audit trail…</div> : null}
            {!query.isLoading && records.length === 0 ? <div className="text-sm text-muted">No operations recorded yet.</div> : null}
          </div>
        </section>
      </div>
    </div>
  )
}
