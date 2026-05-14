'use client'

import { useEffect, useMemo, useState } from 'react'

type JsonRecord = Record<string, unknown>

type WeatherbotPayload = {
  ok: boolean
  checkedAt: number
  source: {
    repoPath: string
    statePath: string
    metricsPath: string
    dashboardPath: string
    eventsPath: string
  }
  freshness: {
    updatedAt: string | null
    updatedAtMs: number | null
    ageMs: number | null
    stale: boolean
  }
  stats: {
    cashBalance: number | null
    equityEstimate: number | null
    reservedCapital: number | null
    unrealizedPnl: number | null
    totalTradesOpened: number | null
    wins: number | null
    losses: number | null
    openPositions: number | null
    closedPositions: number | null
    resolvedMarkets: number | null
    totalMarkets: number | null
  }
  breakdowns: JsonRecord
  openPositions: Array<JsonRecord>
  recentEvents: Array<JsonRecord>
  dashboardText: string | null
  files: {
    metricsMtimeMs: number | null
    dashboardMtimeMs: number | null
    eventsMtimeMs: number | null
    eventsCountApprox: number
  }
}

const REFRESH_MS = 30_000

function formatMoney(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function formatNumber(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(value)
}

function formatSignedNumber(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return `${value >= 0 ? '+' : ''}${formatNumber(value)}`
}

function formatAge(ms: number | null | undefined): string {
  if (typeof ms !== 'number' || Number.isNaN(ms)) return '—'
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`
  if (ms < 3_600_000) return `${Math.round(ms / 60_000)}m`
  return `${(ms / 3_600_000).toFixed(1)}h`
}

function formatTimestamp(value: string | null | undefined): string {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('es-AR', { hour12: false })
}

function asText(value: unknown): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (value == null) return '—'
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function statusTone(payload: WeatherbotPayload): string {
  if (payload.freshness.stale) return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-sm">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {hint ? <div className="mt-1 text-xs text-white/45">{hint}</div> : null}
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-black/20 backdrop-blur-sm">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-white/55">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}

function StatusPill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

export function WeatherbotScreen() {
  const [payload, setPayload] = useState<WeatherbotPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setError(null)
        const res = await fetch('/api/weatherbot', { cache: 'no-store' })
        const data = (await res.json()) as WeatherbotPayload & { error?: string }
        if (!res.ok || !data.ok) {
          throw new Error(data.error || `weatherbot fetch failed (${res.status})`)
        }
        if (!cancelled) {
          setPayload(data)
          setLoading(false)
        }
      } catch (cause) {
        if (cancelled) return
        setPayload(null)
        setLoading(false)
        setError(cause instanceof Error ? cause.message : 'weatherbot fetch failed')
      }
    }

    void load()
    const timer = window.setInterval(() => {
      void load()
    }, REFRESH_MS)

    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const summary = useMemo(() => {
    if (!payload) return null
    return {
      updated: formatTimestamp(payload.freshness.updatedAt),
      age: formatAge(payload.freshness.ageMs),
      staleLabel: payload.freshness.stale ? 'Stale' : 'Fresh',
    }
  }, [payload])

  if (loading && !payload) {
    return (
      <div className="mx-auto flex min-h-full max-w-7xl items-center justify-center px-4 py-12 text-white/70">
        Loading Weatherbot dashboard…
      </div>
    )
  }

  if (error && !payload) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 pb-[calc(var(--tabbar-h,80px)+1.5rem)]" data-plugin-surface="weatherbot">
        <Section title="Weatherbot" subtitle="Could not load the workspace surface.">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {error}
          </div>
        </Section>
      </div>
    )
  }

  if (!payload) return null

  const totalEvents = payload.files.eventsCountApprox
  const openPositions = payload.openPositions

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-[calc(var(--tabbar-h,80px)+1.5rem)]" data-plugin-surface="weatherbot">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-white">Weatherbot</h1>
            <StatusPill className={statusTone(payload)}>
              {summary?.staleLabel ?? '—'} · updated {summary?.age ?? '—'} ago
            </StatusPill>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
            File-backed cockpit for the weather trading lab. Reads <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/85">metrics.json</code>, <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/85">dashboard.txt</code> and <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/85">events.jsonl</code> directly from the lab repo.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
            <StatusPill className="border-white/10 bg-white/5 text-white/70">Repo: {payload.source.repoPath}</StatusPill>
            <StatusPill className="border-white/10 bg-white/5 text-white/70">Checked: {summary?.updated ?? '—'}</StatusPill>
            <StatusPill className="border-white/10 bg-white/5 text-white/70">Events: {formatNumber(totalEvents)}</StatusPill>
          </div>
        </div>
        <div className="grid gap-2 text-xs text-white/50 md:min-w-[320px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 font-mono break-all">{payload.source.metricsPath}</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 font-mono break-all">{payload.source.dashboardPath}</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 font-mono break-all">{payload.source.eventsPath}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Cash balance" value={formatMoney(payload.stats.cashBalance)} />
        <MetricCard label="Equity estimate" value={formatMoney(payload.stats.equityEstimate)} />
        <MetricCard label="Reserved capital" value={formatMoney(payload.stats.reservedCapital)} hint="Capital parked in open positions" />
        <MetricCard label="Unrealized PnL" value={formatSignedNumber(payload.stats.unrealizedPnl)} />
        <MetricCard label="Trades opened" value={formatNumber(payload.stats.totalTradesOpened)} />
        <MetricCard label="Open positions" value={formatNumber(payload.stats.openPositions)} />
        <MetricCard label="Closed positions" value={formatNumber(payload.stats.closedPositions)} />
        <MetricCard label="Resolved markets" value={formatNumber(payload.stats.resolvedMarkets)} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Section title="Open positions" subtitle="Pulled from the latest metrics snapshot.">
          {openPositions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-[0.14em] text-white/40">
                  <tr>
                    <th className="pb-3 pr-4">City</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Bucket</th>
                    <th className="pb-3 pr-4">Entry → now</th>
                    <th className="pb-3 pr-4">PnL</th>
                    <th className="pb-3 pr-4">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {openPositions.map((position, index) => {
                    const key = `${asText(position.city)}-${asText(position.date)}-${index}`
                    return (
                      <tr key={key} className="border-t border-white/8">
                        <td className="py-3 pr-4 font-medium text-white">{asText(position.city)}</td>
                        <td className="py-3 pr-4 text-white/65">{asText(position.date)}</td>
                        <td className="py-3 pr-4 text-white/65">{asText(position.bucket)}</td>
                        <td className="py-3 pr-4 text-white/65">
                          {formatNumber(position.entry_price as number | null)} → {formatNumber(position.current_price as number | null)}
                        </td>
                        <td className="py-3 pr-4 text-white/65">{formatSignedNumber(position.unrealized_pnl as number | null)}</td>
                        <td className="py-3 pr-4 text-white/65">{asText(position.forecast_src)} {formatNumber(position.forecast_temp as number | null)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-5 text-sm text-white/55">
              No open positions in the current snapshot.
            </div>
          )}
        </Section>

        <Section title="Recent events" subtitle={`Latest ${payload.recentEvents.length} events from events.jsonl`}>
          <div className="space-y-3">
            {payload.recentEvents.length > 0 ? (
              payload.recentEvents.map((event, index) => (
                <div key={`${asText(event.ts)}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/45">
                    <span className="font-mono">{asText(event.ts)}</span>
                    <span>{asText(event.event)}</span>
                  </div>
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs leading-5 text-white/70">{JSON.stringify(event, null, 2)}</pre>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-5 text-sm text-white/55">
                No recent events found.
              </div>
            )}
          </div>
        </Section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Section title="Breakdowns" subtitle="Compact view of the latest snapshot.">
          <div className="space-y-4 text-sm text-white/70">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/40">Markets by city</div>
              <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-3 text-xs leading-5">{JSON.stringify(payload.breakdowns.markets_by_city ?? {}, null, 2)}</pre>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/40">Open positions by city</div>
              <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-3 text-xs leading-5">{JSON.stringify(payload.breakdowns.open_positions_by_city ?? {}, null, 2)}</pre>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/40">Closed reasons</div>
              <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-3 text-xs leading-5">{JSON.stringify(payload.breakdowns.closed_reasons ?? {}, null, 2)}</pre>
            </div>
          </div>
        </Section>

        <Section title="Raw dashboard" subtitle="The text file the bot writes on every refresh.">
          <pre className="max-h-[36rem] overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-5 text-white/75 whitespace-pre-wrap">
            {payload.dashboardText || 'No dashboard.txt found.'}
          </pre>
        </Section>
      </div>
    </div>
  )
}
