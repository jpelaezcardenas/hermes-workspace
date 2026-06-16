import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type AgentBusSummary = {
  total?: number
  up?: number
  down?: number
  no_endpoint?: number
  non_operational?: number
  events?: number
}

type AgentBusAgent = {
  id?: string
  name?: string
  status_config?: string
  health?: string
  listener?: string
  port?: number | null
  error?: string | null
}

type AgentBusMission = {
  mission_type?: string
  target?: string
  source_agent?: string
  brief?: string
  reason?: string
  safe_mode?: boolean
  created_at?: string
  mission_record_path?: string
  path?: string
}

type AgentBusPayload = {
  ok: boolean
  status?: {
    checked_at?: string
    registry_last_updated?: string
    summary?: AgentBusSummary
    agents?: Array<AgentBusAgent>
  }
  events?: Array<Record<string, unknown>>
  missions?: Array<AgentBusMission>
  issues?: Array<AgentBusAgent>
  reportPreview?: string
}

type ActionState =
  | { status: 'idle'; message: string }
  | { status: 'running'; message: string }
  | { status: 'ok'; message: string }
  | { status: 'error'; message: string }

const initialActionState: ActionState = {
  status: 'idle',
  message: 'Las acciones seguras quedan registradas en el Agent Bus.',
}

function formatDate(value?: string): string {
  if (!value) return 'sin lectura'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function firstLine(value?: string): string {
  return String(value || '').split('\\n').find(Boolean) || 'sin detalles'
}

function missionTitle(mission: AgentBusMission): string {
  if (mission.mission_type === 'handoff') {
    return `${mission.source_agent || 'agente'} -> ${mission.target || 'agente'}`
  }
  if (mission.mission_type === 'thumbnail') {
    return `Thumbnail ${mission.target || ''}`.trim()
  }
  return mission.mission_type || 'Misión'
}

function StatTile({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: number | string
  tone?: 'neutral' | 'good' | 'warn' | 'bad'
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border px-4 py-3',
        tone === 'good' && 'border-emerald-200 bg-emerald-50 text-emerald-900',
        tone === 'warn' && 'border-amber-200 bg-amber-50 text-amber-950',
        tone === 'bad' && 'border-red-200 bg-red-50 text-red-900',
        tone === 'neutral' && 'border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text)]',
      )}
    >
      <div className="text-2xl font-semibold leading-none">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.08em] opacity-70">
        {label}
      </div>
    </div>
  )
}

export function AgentBusPanel() {
  const [data, setData] = useState<AgentBusPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [action, setAction] = useState<ActionState>(initialActionState)

  async function load() {
    setError(null)
    try {
      const response = await fetch('/api/agent-bus', {
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Agent Bus respondió HTTP ${response.status}`)
      setData((await response.json()) as AgentBusPayload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falla al cargar Agent Bus')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    const timer = window.setInterval(() => void load(), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const summary = data?.status?.summary ?? {}
  const missions = data?.missions ?? []
  const issues = data?.issues ?? []
  const events = data?.events ?? []
  const visibleIssues = useMemo(() => issues.slice(0, 5), [issues])

  async function runAction(body: Record<string, unknown>, successMessage: string) {
    setAction({ status: 'running', message: 'Ejecutando acción segura...' })
    try {
      const response = await fetch('/api/agent-bus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const payload = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || `HTTP ${response.status}`)
      }
      setAction({ status: 'ok', message: successMessage })
      await load()
    } catch (err) {
      setAction({
        status: 'error',
        message: err instanceof Error ? err.message : 'La acción falló',
      })
    }
  }

  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-[0_24px_80px_var(--theme-shadow)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--theme-accent-strong)]">
            Agent Bus
          </p>
          <h2 className="mt-1 text-lg font-semibold text-[var(--theme-text)]">
            Estado de las Tropas
          </h2>
          <p className="mt-1 text-sm text-[var(--theme-muted-2)]">
            Lectura de Scumbag, misiones y pendientes operativas de Hermes.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 py-3 text-sm text-[var(--theme-muted)]">
          Última lectura: {formatDate(data?.status?.checked_at)}
        </div>
      </div>

      {loading ? (
        <div className="mt-5 rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-4 py-8 text-center text-sm text-[var(--theme-muted)]">
          Cargando Agent Bus...
        </div>
      ) : error ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900">
          {error}
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-6">
            <StatTile label="total" value={summary.total ?? 0} />
            <StatTile label="online" value={summary.up ?? 0} tone="good" />
            <StatTile label="down" value={summary.down ?? 0} tone={(summary.down ?? 0) > 0 ? 'bad' : 'good'} />
            <StatTile label="sin endpoint" value={summary.no_endpoint ?? 0} tone={(summary.no_endpoint ?? 0) > 0 ? 'warn' : 'good'} />
            <StatTile label="fuera op." value={summary.non_operational ?? 0} tone={(summary.non_operational ?? 0) > 0 ? 'warn' : 'good'} />
            <StatTile label="eventos" value={events.length || summary.events || 0} tone={events.length > 0 ? 'bad' : 'good'} />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[var(--theme-text)]">Pendientes vivas</h3>
                <span className="text-xs text-[var(--theme-muted)]">{issues.length} ítems</span>
              </div>
              <div className="mt-3 space-y-2">
                {visibleIssues.length ? (
                  visibleIssues.map((agent) => (
                    <div
                      key={`${agent.id}-${agent.port ?? 'no-port'}`}
                      className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[var(--theme-text)]">
                          {agent.name || agent.id}
                        </span>
                        <span className="text-xs text-[var(--theme-muted)]">
                          {agent.status_config || 'sin status'} / {agent.health || 'sin health'}
                        </span>
                      </div>
                      {agent.error ? (
                        <p className="mt-1 text-xs text-[var(--theme-muted)]">{firstLine(agent.error)}</p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-5 text-sm text-[var(--theme-muted)]">
                    Ningún agente operativo caído ahora.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[var(--theme-text)]">Últimas misiones</h3>
                <span className="text-xs text-[var(--theme-muted)]">{missions.length} registros</span>
              </div>
              <div className="mt-3 space-y-2">
                {missions.slice(0, 5).map((mission, index) => (
                  <div
                    key={`${mission.path || mission.mission_record_path || index}`}
                    className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-[var(--theme-text)]">
                        {missionTitle(mission)}
                      </span>
                      <span className="text-xs text-[var(--theme-muted)]">
                        {mission.safe_mode ? 'safe' : 'exec'}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--theme-muted)]">
                      {mission.brief || mission.reason || 'misión registrada'}
                    </p>
                  </div>
                ))}
                {!missions.length ? (
                  <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-5 text-sm text-[var(--theme-muted)]">
                    Ninguna misión registrada todavía.
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[var(--theme-text)]">Acciones seguras</h3>
                <p className="mt-1 text-xs text-[var(--theme-muted)]">
                  Sin reinicio, sin WhatsApp y sin consumo de saldo automático.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => runAction({ action: 'sync-roadmap' }, 'Roadmap sincronizado con los eventos actuales.')}
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2 text-sm font-medium text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-card2)]"
                >
                  Sincronizar Roadmap
                </button>
                <button
                  type="button"
                  onClick={() =>
                    runAction(
                      { action: 'thumbnail-mission', target: 'vini' },
                      'Misión de thumbnail de Vini registrada.',
                    )
                  }
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2 text-sm font-medium text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-card2)]"
                >
                  Misión Thumbnail Vini
                </button>
                <button
                  type="button"
                  onClick={() =>
                    runAction(
                      { action: 'handoff-mission', source: 'dona-helena', target: 'larissinha' },
                      'Handoff Dona Helena -> Larissinha registrado.',
                    )
                  }
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-3 py-2 text-sm font-medium text-[var(--theme-text)] transition-colors hover:bg-[var(--theme-card2)]"
                >
                  Handoff Helena para Larissinha
                </button>
              </div>
            </div>
            <p
              className={cn(
                'mt-3 text-sm',
                action.status === 'ok' && 'text-emerald-700',
                action.status === 'error' && 'text-red-700',
                action.status === 'running' && 'text-[var(--theme-accent-strong)]',
                action.status === 'idle' && 'text-[var(--theme-muted)]',
              )}
            >
              {action.message}
            </p>
          </div>
        </>
      )}
    </section>
  )
}
