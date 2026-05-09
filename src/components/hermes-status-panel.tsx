import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type HermesStatusComponent = {
  name: string
  ok: boolean
  required: boolean
  severity: 'ok' | 'warn' | 'fail'
  detail: string
}

type HermesStatusPayload = {
  overallOk: boolean
  checkedAt: number
  source: string
  components: HermesStatusComponent[]
  summary: {
    ok: number
    warn: number
    fail: number
    total: number
  }
}

function severityClass(severity: HermesStatusComponent['severity']) {
  if (severity === 'ok') return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
  if (severity === 'warn') return 'bg-amber-500/10 text-amber-700 border-amber-500/30'
  return 'bg-red-500/10 text-red-700 border-red-500/30'
}

function severityLabel(severity: HermesStatusComponent['severity']) {
  if (severity === 'ok') return 'OK'
  if (severity === 'warn') return 'WARN'
  return 'FAIL'
}

export function HermesStatusPanel() {
  const [status, setStatus] = useState<HermesStatusPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/hermes-status', { cache: 'no-store' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus((await response.json()) as HermesStatusPayload)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void refresh()
  }, [])

  const topComponents = useMemo(() => {
    return [...(status?.components ?? [])].sort((a, b) => {
      const order = { fail: 0, warn: 1, ok: 2 }
      return order[a.severity] - order[b.severity]
    }).slice(0, 6)
  }, [status])

  return (
    <section
      data-testid="hermes-status-panel"
      className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-[0_24px_80px_var(--theme-shadow)]"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
            Workspace status
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[var(--theme-text)]">
            Hermes reliability
          </h2>
          <p className="mt-1 text-sm text-[var(--theme-muted-2)]">
            Frontend, backend, gateway, Notion and git health from `hermes-healthcheck`.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-sm text-[var(--theme-text)] hover:bg-[var(--theme-card2)]"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[var(--theme-border)] px-4 py-5 text-sm text-[var(--theme-muted)]">
          Loading Hermes status…
        </div>
      ) : error ? (
        <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-5 text-sm text-red-700">
          Status unavailable: {error}
        </div>
      ) : status ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className={cn('rounded-2xl border px-4 py-3', status.overallOk ? severityClass('ok') : severityClass('fail'))}>
              <div className="text-xs uppercase tracking-[0.14em]">Overall</div>
              <div className="mt-1 text-lg font-semibold">{status.overallOk ? 'OK' : 'Needs attention'}</div>
            </div>
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 py-3">
              <div className="text-xs uppercase tracking-[0.14em] text-[var(--theme-muted)]">OK</div>
              <div className="mt-1 text-lg font-semibold text-[var(--theme-text)]">{status.summary.ok}</div>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-700">
              <div className="text-xs uppercase tracking-[0.14em]">Warn</div>
              <div className="mt-1 text-lg font-semibold">{status.summary.warn}</div>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-700">
              <div className="text-xs uppercase tracking-[0.14em]">Fail</div>
              <div className="mt-1 text-lg font-semibold">{status.summary.fail}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
            {topComponents.map((component) => (
              <div
                key={component.name}
                className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-[var(--theme-text)]">{component.name}</div>
                  <div className="mt-1 line-clamp-2 text-xs text-[var(--theme-muted)]">{component.detail || 'No detail'}</div>
                </div>
                <span className={cn('shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold', severityClass(component.severity))}>
                  {severityLabel(component.severity)}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
