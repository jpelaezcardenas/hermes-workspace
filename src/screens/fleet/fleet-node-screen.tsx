import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FleetNodeDetailPayload, FleetNodeStatus } from '@/server/fleet'
import type { FleetOperationResponse } from '@/server/fleet-operations'
import { cn } from '@/lib/utils'

function getNodeIdFromLocation() {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('nodeId') || ''
}

function statusClass(status: FleetNodeStatus['status']) {
  if (status === 'healthy') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  if (status === 'degraded') return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
  if (status === 'offline') return 'border-red-500/30 bg-red-500/10 text-red-300'
  return 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300'
}

async function fetchFleetNodeDetail(nodeId: string): Promise<FleetNodeDetailPayload> {
  const res = await fetch(`/api/fleet-node-detail?nodeId=${encodeURIComponent(nodeId)}&lines=180`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function Metric({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</div>
      <div className="mt-2 break-words text-sm font-medium text-ink">{value || '—'}</div>
    </div>
  )
}

function CheckRow({ check }: { check: FleetNodeStatus['checks'][number] }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-[var(--theme-card2)] px-3 py-2">
      <div>
        <div className="text-sm font-medium text-ink">{check.label}</div>
        {check.detail ? <div className="mt-1 text-xs text-muted">{check.detail}</div> : null}
      </div>
      <span className={cn('mt-1 size-2.5 shrink-0 rounded-full', check.ok ? 'bg-emerald-400' : 'bg-amber-400')} />
    </div>
  )
}

function LogBlock({ log }: { log: FleetNodeDetailPayload['logs'][number] }) {
  return (
    <article className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)]">
      <div className="flex flex-col gap-1 border-b border-[var(--theme-border)] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-semibold text-ink">{log.label}</div>
          <div className="mt-0.5 font-mono text-[11px] text-muted">{log.source}</div>
        </div>
        <span className={cn('w-fit rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]', log.ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/30 bg-amber-500/10 text-amber-300')}>
          {log.ok ? 'readable' : 'not ready'}
        </span>
      </div>
      <pre className="max-h-[440px] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-xs leading-relaxed text-muted">
        {log.content || 'No output.'}
      </pre>
    </article>
  )
}

export function FleetNodeScreen() {
  const nodeId = useMemo(getNodeIdFromLocation, [])
  const queryClient = useQueryClient()
  const [pendingOp, setPendingOp] = useState<{ operation: string; label: string } | null>(null)
  const [operationResult, setOperationResult] = useState<FleetOperationResponse | null>(null)
  const query = useQuery({
    queryKey: ['fleet-node-detail', nodeId],
    queryFn: () => fetchFleetNodeDetail(nodeId),
    enabled: Boolean(nodeId),
    refetchInterval: 30_000,
    staleTime: 10_000,
  })

  const opMutation = useMutation({
    mutationFn: async ({ operation }: { operation: string }) => {
      const res = await fetch('/api/fleet-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, nodeId, confirmed: true }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<FleetOperationResponse>
    },
    onSuccess: async (result) => {
      setOperationResult(result)
      setPendingOp(null)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['fleet-node-detail', nodeId] }),
        queryClient.invalidateQueries({ queryKey: ['fleet-operations'] }),
      ])
    },
  })

  const detail = query.data
  const node = detail?.node

  const isHermesNode = node?.kind === 'hermes-local' || node?.kind === 'hermes-container'
  const opButtons = isHermesNode
    ? [
        { key: 'health.check', label: 'Health check', requiresConfirm: false },
        { key: 'gateway.restart', label: 'Restart gateway', requiresConfirm: true },
        { key: 'agent.update', label: 'Update agent', requiresConfirm: true },
      ]
    : []

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-6 py-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <a className="text-sm text-muted hover:text-ink" href="/fleet">← Fleet</a>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Fleet node</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{node?.name || nodeId || 'Unknown node'}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Focused status, checks, redacted logs, and node-level operations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {node ? (
              <span className={cn('rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]', statusClass(node.status))}>
                {node.status}
              </span>
            ) : null}
            {opButtons.map((btn) => (
              <button
                key={btn.key}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-xs disabled:text-muted',
                  btn.requiresConfirm
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20'
                    : 'border-[var(--theme-border)] text-ink hover:bg-[var(--theme-card2)]',
                )}
                disabled={opMutation.isPending}
                onClick={() => {
                  if (btn.requiresConfirm) {
                    setPendingOp({ operation: btn.key, label: btn.label })
                    setOperationResult(null)
                  } else {
                    opMutation.mutate({ operation: btn.key })
                  }
                }}
              >
                {opMutation.isPending && pendingOp?.operation === btn.key ? 'Running…' : btn.label}
              </button>
            ))}
          </div>
        </header>

        {!nodeId ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">Missing nodeId.</div>
        ) : null}

        {query.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Node detail failed: {query.error instanceof Error ? query.error.message : 'unknown error'}
          </div>
        ) : null}

        {query.isLoading ? (
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-muted">
            Collecting node detail…
          </div>
        ) : null}

        {node ? (
          <>
            <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Metric label="Kind" value={node.kind} />
              <Metric label="Host" value={node.address || node.host} />
              <Metric label="Container" value={node.container} />
              <Metric label="Last seen" value={node.lastSeen ? new Date(node.lastSeen).toLocaleString() : 'never'} />
              <Metric label="Version" value={node.version} />
              <Metric label="Model" value={node.model} />
              <Metric label="Provider" value={node.provider} />
              <Metric label="Parent" value={detail?.parent?.name || node.parent} />
            </section>

            {node.cron ? (
              <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-ink">Cron</h2>
                  <div className="text-sm text-muted">{node.cron.active}/{node.cron.total} active</div>
                </div>
                <div className="mt-3 grid gap-2">
                  {node.cron.items.length ? node.cron.items.map((job) => (
                    <div key={job.id} className="rounded-xl bg-[var(--theme-card2)] px-3 py-2 text-sm">
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div className="font-medium text-ink">{job.name}</div>
                        <div className="font-mono text-xs text-muted">{job.id} · {job.status}</div>
                      </div>
                      <div className="mt-1 text-xs text-muted">{job.schedule || 'manual'} · next {job.nextRun || '—'} · last {job.lastRunStatus || '—'}</div>
                    </div>
                  )) : <div className="text-sm text-muted">No cron jobs reported.</div>}
                </div>
              </section>
            ) : null}

            <section className="grid gap-2 md:grid-cols-2">
              {node.checks.map((check) => <CheckRow key={check.label} check={check} />)}
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-ink">Logs</h2>
                <div className="text-xs text-muted">Redacted before display</div>
              </div>
              {(detail?.logs ?? []).map((log) => <LogBlock key={`${log.label}-${log.source}`} log={log} />)}
            </section>
          </>
        ) : null}

        {operationResult ? (
          <div className={cn(
            'rounded-2xl border p-4 text-sm',
            operationResult.record.status === 'completed'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
              : operationResult.record.status === 'failed'
                ? 'border-red-500/30 bg-red-500/10 text-red-200'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-200',
          )}>
            <div className="font-semibold">Operation {operationResult.record.status}: {operationResult.record.operation}</div>
            <pre className="mt-2 whitespace-pre-wrap text-xs">{operationResult.record.resultSummary}</pre>
            <a className="mt-3 inline-block text-xs underline" href="/fleet-operations">View audit trail</a>
          </div>
        ) : null}

        {opMutation.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Operation failed: {opMutation.error instanceof Error ? opMutation.error.message : 'unknown error'}
          </div>
        ) : null}

        <footer className="text-xs text-muted">
          Last refresh: {detail ? new Date(detail.generatedAt).toLocaleString() : 'not yet'}
        </footer>

        {pendingOp ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">Confirm operation</div>
              <h2 className="mt-2 text-xl font-semibold text-ink">{pendingOp.label}?</h2>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="rounded-xl bg-[var(--theme-card2)] p-3">
                  <span className="text-muted">Node</span>
                  <br />{node?.name} · <span className="font-mono">{nodeId}</span>
                </div>
                <div className="rounded-xl bg-[var(--theme-card2)] p-3">
                  <span className="text-muted">Operation</span>
                  <br />{pendingOp.label}
                </div>
                <div className="rounded-xl bg-[var(--theme-card2)] p-3">
                  <span className="text-muted">Side effect</span>
                  <br />
                  {pendingOp.operation === 'gateway.restart' && 'Restarts the gateway. Active connections will drop and reconnect.'}
                  {pendingOp.operation === 'agent.update' && 'Pulls latest code and restarts. May break things.'}
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  className="rounded-lg border border-[var(--theme-border)] px-3 py-2 text-xs text-ink"
                  onClick={() => setPendingOp(null)}
                  disabled={opMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg border border-amber-500/40 bg-amber-500/20 px-3 py-2 text-xs text-amber-100 hover:bg-amber-500/30 disabled:text-muted"
                  disabled={opMutation.isPending}
                  onClick={() => opMutation.mutate({ operation: pendingOp.operation })}
                >
                  {opMutation.isPending ? 'Running…' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
