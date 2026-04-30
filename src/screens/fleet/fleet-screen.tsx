import { useQuery } from '@tanstack/react-query'
import type { FleetStatusPayload, FleetNodeStatus } from '@/server/fleet'
import { cn } from '@/lib/utils'

function statusClass(status: FleetNodeStatus['status']) {
  if (status === 'healthy') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  if (status === 'degraded') return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
  if (status === 'offline') return 'border-red-500/30 bg-red-500/10 text-red-300'
  return 'border-neutral-500/30 bg-neutral-500/10 text-neutral-300'
}

function kindLabel(kind: FleetNodeStatus['kind']) {
  return kind.replace('-', ' ')
}

function timeLabel(value: string | null) {
  if (!value) return 'never'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

async function fetchFleetStatus(): Promise<FleetStatusPayload> {
  const res = await fetch('/api/fleet-status')
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

function CheckRow({ check }: { check: FleetNodeStatus['checks'][number] }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg bg-[var(--theme-card2)] px-3 py-2">
      <div>
        <div className="text-xs font-medium text-ink">{check.label}</div>
        {check.detail ? <div className="mt-0.5 text-[11px] text-muted line-clamp-2">{check.detail}</div> : null}
      </div>
      <span className={cn('mt-0.5 size-2.5 shrink-0 rounded-full', check.ok ? 'bg-emerald-400' : 'bg-amber-400')} />
    </div>
  )
}

function NodeCard({ node }: { node: FleetNodeStatus }) {
  return (
    <article className="flex min-h-[300px] flex-col rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn('size-2.5 rounded-full', node.status === 'healthy' ? 'bg-emerald-400' : node.status === 'degraded' ? 'bg-amber-400' : node.status === 'offline' ? 'bg-red-400' : 'bg-neutral-400')} />
            <h2 className="truncate text-lg font-semibold text-ink">{node.name}</h2>
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{kindLabel(node.kind)}</div>
        </div>
        <span className={cn('rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]', statusClass(node.status))}>
          {node.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-[var(--theme-card2)] p-3">
          <div className="text-muted">Host</div>
          <div className="mt-1 truncate font-medium text-ink">{node.address || node.host}</div>
        </div>
        <div className="rounded-xl bg-[var(--theme-card2)] p-3">
          <div className="text-muted">Last seen</div>
          <div className="mt-1 font-medium text-ink">{timeLabel(node.lastSeen)}</div>
        </div>
        {node.container ? (
          <div className="col-span-2 rounded-xl bg-[var(--theme-card2)] p-3">
            <div className="text-muted">Container</div>
            <div className="mt-1 truncate font-medium text-ink">{node.container}</div>
            {node.dockerStatus ? <div className="mt-1 text-[11px] text-muted">{node.dockerStatus}</div> : null}
          </div>
        ) : null}
        {node.model || node.provider ? (
          <div className="col-span-2 rounded-xl bg-[var(--theme-card2)] p-3">
            <div className="text-muted">Model</div>
            <div className="mt-1 truncate font-medium text-ink">{node.model || 'unknown'}</div>
            <div className="mt-1 text-[11px] text-muted">{node.provider || 'provider unknown'}</div>
          </div>
        ) : null}
      </div>

      {node.cron ? (
        <div className="mt-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink">Cron jobs</span>
            <span className="text-muted">{node.cron.active}/{node.cron.total} active</span>
          </div>
          {node.cron.failedRecent ? (
            <div className="mt-2 text-xs text-red-300">{node.cron.failedRecent} recent failure</div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex-1 space-y-2">
        {node.checks.slice(0, 3).map((check) => (
          <CheckRow key={`${node.id}-${check.label}`} check={check} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {node.gatewayUrl ? <a className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href={node.gatewayUrl}>Gateway</a> : null}
        {node.workspaceUrl ? <a className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href={node.workspaceUrl}>Workspace</a> : null}
        <a className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href={`/fleet-node?nodeId=${encodeURIComponent(node.id)}`}>
          Detail / logs
        </a>
        <button className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 text-xs text-muted" disabled>
          Operations soon
        </button>
      </div>
    </article>
  )
}

export function FleetScreen() {
  const query = useQuery({
    queryKey: ['fleet-status'],
    queryFn: fetchFleetStatus,
    refetchInterval: 30_000,
    staleTime: 10_000,
  })

  const data = query.data

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-6 py-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Fleet control</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Hermes / OpenClaw Cockpit</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              One surface for local Hermes, Morgan VPS containers, Maya, cron, and the OpenClaw placeholder. Read-only for now. Sensible.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-1.5 text-xs text-ink hover:bg-[var(--theme-card2)]" href="/fleet-cron">
                Cron Control Center
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-4 py-3 text-xs text-muted">
            <div>Registry</div>
            <div className="mt-1 max-w-[360px] truncate font-mono text-ink">{data?.registryPath || '~/.hermes/fleet.yaml'}</div>
          </div>
        </header>

        {query.isError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Fleet collection failed: {query.error instanceof Error ? query.error.message : 'unknown error'}
          </div>
        ) : null}

        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <SummaryTile label="Total" value={data?.summary.total ?? 0} tone="text-ink" />
          <SummaryTile label="Healthy" value={data?.summary.healthy ?? 0} tone="text-emerald-300" />
          <SummaryTile label="Degraded" value={data?.summary.degraded ?? 0} tone="text-amber-300" />
          <SummaryTile label="Offline" value={data?.summary.offline ?? 0} tone="text-red-300" />
          <SummaryTile label="Unknown" value={data?.summary.unknown ?? 0} tone="text-neutral-300" />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(data?.nodes ?? []).map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
          {query.isLoading ? (
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-muted">
              Collecting fleet state…
            </div>
          ) : null}
        </section>

        <footer className="text-xs text-muted">
          Last refresh: {data ? new Date(data.generatedAt).toLocaleString() : 'not yet'}
        </footer>
      </div>
    </div>
  )
}
