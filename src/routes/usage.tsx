import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { usePageTitle } from '@/hooks/use-page-title'

type UsageWindow = {
  id: string
  label: string
  used: number
  limit: number
  unit: 'percent' | 'dollars' | 'tokens' | 'count'
  usedPercent: number
  remainingPercent: number
  resetsAt?: string
}

type UsageProviderCard = {
  id: string
  label: string
  status: 'ok' | 'missing_credentials' | 'auth_expired' | 'error'
  plan?: string
  message?: string
  updatedAt: string
  source: string
  confidence: 'live' | 'configured' | 'missing' | 'error'
  usageRows: UsageWindow[]
  badges: Array<{ label: string; value: string; color?: string }>
  creditsRemaining: number | null
  codeReviewRemainingPercent: number | null
}

type UsageLimitsResponse = {
  ok: boolean
  generatedAt: string
  enabledProviders: string[]
  providers: UsageProviderCard[]
}

async function fetchUsageLimits(force = false): Promise<UsageLimitsResponse> {
  const response = await fetch(`/api/usage/limits${force ? '?force=1' : ''}`, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Usage limits failed: HTTP ${response.status}`)
  return response.json()
}

export const Route = createFileRoute('/usage')({
  ssr: false,
  component: UsageRoute,
})

function UsageRoute() {
  usePageTitle('Cael Usage')
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['cael-usage-limits'],
    queryFn: () => fetchUsageLimits(false),
    refetchInterval: 60_000,
  })

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">Remaining Limits</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Provider Usage</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
                CodexBar-inspired provider cards for remaining limits, resets, credits, and freshness. The UI only displays normalized, secret-free status from Hermes/Cael usage probes.
              </p>
            </div>
            <button
              className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              {isFetching ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </section>

        {isLoading ? (
          <Panel>Loading provider usage limits…</Panel>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
            {error instanceof Error ? error.message : String(error)}
          </div>
        ) : data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard title="Providers" value={String(data.providers.length)} sub="Configured or discoverable providers." />
              <InfoCard title="Live" value={String(data.enabledProviders.length)} sub="Providers returning live usage now." />
              <InfoCard title="Generated" value={new Date(data.generatedAt).toLocaleTimeString()} sub="Snapshot freshness timestamp." />
              <InfoCard title="Source" value="Hermes" sub="Shared backend JSON for web + desktop." />
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              {data.providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
}

function ProviderCard({ provider }: { provider: UsageProviderCard }) {
  const status = statusMeta(provider.status)
  return (
    <article className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{provider.label}</h2>
          <p className="mt-1 text-xs text-[var(--theme-muted)]">
            Updated {relativeTime(provider.updatedAt)} · {provider.confidence} · {provider.source}
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${status.className}`}>{status.label}</span>
      </div>

      {provider.plan ? <p className="mt-3 text-sm text-[var(--theme-muted)]">Plan: {provider.plan}</p> : null}
      {provider.message ? <p className="mt-3 rounded-xl border border-[var(--theme-border)] bg-black/10 p-3 text-xs leading-5 text-[var(--theme-muted)]">{provider.message}</p> : null}

      {provider.usageRows.length > 0 ? (
        <div className="mt-5 space-y-4">
          {provider.usageRows.map((row) => (
            <UsageRow key={row.id} row={row} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-[var(--theme-border)] bg-black/10 p-4 text-sm text-[var(--theme-muted)]">
          No limit rows available yet. Authenticate this provider or refresh after the provider exposes usage data.
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <MiniMetric label="Credits" value={provider.creditsRemaining == null ? '—' : formatNumber(provider.creditsRemaining)} />
        <MiniMetric label="Code review remaining" value={provider.codeReviewRemainingPercent == null ? '—' : `${provider.codeReviewRemainingPercent.toFixed(0)}%`} />
      </div>

      {provider.badges.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {provider.badges.map((badge) => (
            <span key={`${badge.label}-${badge.value}`} className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs text-[var(--theme-muted)]">
              {badge.label}: {badge.value}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function UsageRow({ row }: { row: UsageWindow }) {
  const remaining = Math.max(0, Math.min(100, row.remainingPercent))
  const fill = `${remaining}%`
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{row.label}</span>
        <span className="font-mono text-xs text-[var(--theme-muted)]">{remaining.toFixed(0)}% left</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: fill }} />
      </div>
      <div className="mt-1 flex items-center justify-between text-xs text-[var(--theme-muted)]">
        <span>{formatUsage(row)}</span>
        <span>{row.resetsAt ? `resets ${relativeTime(row.resetsAt)}` : 'reset unavailable'}</span>
      </div>
    </div>
  )
}

function formatUsage(row: UsageWindow): string {
  if (row.unit === 'dollars') return `${formatCurrency(row.used)} / ${formatCurrency(row.limit)} used`
  if (row.unit === 'tokens') return `${formatNumber(row.used)} / ${formatNumber(row.limit)}`
  if (row.unit === 'percent') return `${row.used.toFixed(0)}% used`
  return `${formatNumber(row.used)} / ${formatNumber(row.limit)}`
}

function statusMeta(status: UsageProviderCard['status']) {
  if (status === 'ok') return { label: 'Live', className: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30' }
  if (status === 'missing_credentials') return { label: 'Setup needed', className: 'bg-amber-500/15 text-amber-300 ring-amber-400/30' }
  if (status === 'auth_expired') return { label: 'Auth expired', className: 'bg-rose-500/15 text-rose-300 ring-rose-400/30' }
  return { label: 'Error', className: 'bg-rose-500/15 text-rose-300 ring-rose-400/30' }
}

function relativeTime(value: string): string {
  const time = new Date(value).getTime()
  if (!Number.isFinite(time)) return 'unknown'
  const diffSeconds = Math.round((time - Date.now()) / 1000)
  const abs = Math.abs(diffSeconds)
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto', style: 'short' })
  if (abs < 60) return formatter.format(diffSeconds, 'second')
  if (abs < 3600) return formatter.format(Math.round(diffSeconds / 60), 'minute')
  if (abs < 86400) return formatter.format(Math.round(diffSeconds / 3600), 'hour')
  return formatter.format(Math.round(diffSeconds / 86400), 'day')
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value)
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value)
}

function Panel({ children }: { children: string }) {
  return <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 text-sm text-[var(--theme-muted)]">{children}</div>
}

function InfoCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">{title}</div>
      <div className="mt-2 break-words text-xl font-semibold">{value}</div>
      <div className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{sub}</div>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-3">
      <div className="text-xs text-[var(--theme-muted)]">{label}</div>
      <div className="mt-1 font-mono text-sm">{value}</div>
    </div>
  )
}
