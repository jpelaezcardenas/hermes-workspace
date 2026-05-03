import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'

type AgentRow = {
  label: string
  pid: number | null
  state: string | null
  lastExitCode: number | null
  loaded: boolean
  error?: string
}

type PortRow = {
  port: number
  pid: number | null
  command: string | null
  user: string | null
  address: string | null
}

type LaunchAgentsResponse = {
  ok: boolean
  uid?: number
  agents?: Array<AgentRow>
  ports?: Array<PortRow>
  portsError?: string
  checkedPorts?: Array<number>
  generatedAt?: string
  error?: string
}

const RESTART_LABELS = [
  'ai.hermes.gateway',
  'ai.hermes.workspace',
  'ai.hermes.dashboard',
] as const

const LOG_FILES = [
  { key: 'gateway', label: 'gateway.log' },
  { key: 'dashboard', label: 'dashboard.log' },
] as const

type LogKey = (typeof LOG_FILES)[number]['key']

export const Route = createFileRoute('/system')({
  ssr: false,
  component: SystemRoute,
})

function SystemRoute() {
  usePageTitle('System')
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">System</h1>
        <p className="text-sm text-muted-foreground">
          Live launchd state, listening ports, and tailed Hermes logs. Restart
          actions are stubbed (Phase 3E Part 2).
        </p>
      </header>
      <LaunchAgentsPanel />
      <LogsPanel />
    </div>
  )
}

function LaunchAgentsPanel() {
  const [data, setData] = useState<LaunchAgentsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [restarting, setRestarting] = useState<string | null>(null)
  const [restartMsg, setRestartMsg] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/system/launchagents', {
        credentials: 'same-origin',
      })
      const json = (await res.json()) as LaunchAgentsResponse
      setData(json)
    } catch (err) {
      setData({
        ok: false,
        error: err instanceof Error ? err.message : 'fetch failed',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    const id = setInterval(refresh, 15_000)
    return () => clearInterval(id)
  }, [refresh])

  const restart = useCallback(async (label: string) => {
    setRestarting(label)
    setRestartMsg(null)
    try {
      const res = await fetch(
        `/api/system/restart/${encodeURIComponent(label)}`,
        {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        },
      )
      const body = (await res.json().catch(() => ({}))) as {
        error?: string
        note?: string
      }
      if (res.status === 501) {
        setRestartMsg(
          `${label}: ${body.note || 'Not Implemented (stub).'}`,
        )
      } else if (!res.ok) {
        setRestartMsg(`${label}: ${body.error || `HTTP ${res.status}`}`)
      } else {
        setRestartMsg(`${label}: restart accepted`)
      }
    } catch (err) {
      setRestartMsg(
        `${label}: ${err instanceof Error ? err.message : 'request failed'}`,
      )
    } finally {
      setRestarting(null)
    }
  }, [])

  const agents = data?.agents ?? []
  const ports = data?.ports ?? []
  const checkedPorts = data?.checkedPorts ?? [3000, 8642, 8644, 9119]

  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="text-base font-medium">LaunchAgents & Ports</h2>
          {data?.generatedAt && (
            <p className="text-xs text-muted-foreground">
              updated {new Date(data.generatedAt).toLocaleTimeString()}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-md border border-border px-3 py-1 text-xs hover:bg-muted disabled:opacity-50"
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">PID</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Last Exit</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-4 py-3 text-muted-foreground">
                  {data?.error ? `Error: ${data.error}` : 'No data'}
                </td>
              </tr>
            )}
            {agents.map((a) => (
              <tr key={a.label} className="border-t border-border">
                <td className="px-4 py-2 font-mono text-xs">{a.label}</td>
                <td className="px-4 py-2 font-mono text-xs">
                  {a.pid ?? '—'}
                </td>
                <td className="px-4 py-2">
                  <StateBadge state={a.state} loaded={a.loaded} />
                </td>
                <td className="px-4 py-2 font-mono text-xs">
                  {a.lastExitCode ?? '—'}
                </td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => void restart(a.label)}
                    disabled={
                      restarting === a.label ||
                      !RESTART_LABELS.includes(
                        a.label as (typeof RESTART_LABELS)[number],
                      )
                    }
                    className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50"
                  >
                    {restarting === a.label ? 'Restarting…' : 'Restart'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {restartMsg && (
        <div className="border-t border-border bg-muted/30 px-4 py-2 text-xs">
          {restartMsg}
        </div>
      )}

      <div className="border-t border-border px-4 py-3">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Listening ports ({checkedPorts.join(', ')})
        </h3>
        {data?.portsError && (
          <p className="mb-2 text-xs text-red-500">{data.portsError}</p>
        )}
        {ports.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No matching listeners.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-2 py-1">Port</th>
                <th className="px-2 py-1">PID</th>
                <th className="px-2 py-1">Command</th>
                <th className="px-2 py-1">User</th>
                <th className="px-2 py-1">Address</th>
              </tr>
            </thead>
            <tbody>
              {ports.map((p, i) => (
                <tr key={`${p.port}-${p.pid}-${i}`} className="border-t border-border">
                  <td className="px-2 py-1 font-mono text-xs">{p.port}</td>
                  <td className="px-2 py-1 font-mono text-xs">
                    {p.pid ?? '—'}
                  </td>
                  <td className="px-2 py-1 font-mono text-xs">
                    {p.command ?? '—'}
                  </td>
                  <td className="px-2 py-1 font-mono text-xs">
                    {p.user ?? '—'}
                  </td>
                  <td className="px-2 py-1 font-mono text-xs">
                    {p.address ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

function StateBadge({
  state,
  loaded,
}: {
  state: string | null
  loaded: boolean
}) {
  if (!loaded) {
    return (
      <span className="rounded-md bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-600">
        not loaded
      </span>
    )
  }
  const cls =
    state === 'running'
      ? 'bg-green-500/10 text-green-600'
      : state
        ? 'bg-orange-500/10 text-orange-600'
        : 'bg-muted text-muted-foreground'
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs ${cls}`}>
      {state ?? 'unknown'}
    </span>
  )
}

function LogsPanel() {
  const [active, setActive] = useState<LogKey>('gateway')
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-base font-medium">Logs</h2>
        <div className="flex gap-1">
          {LOG_FILES.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              className={`rounded-md px-3 py-1 text-xs ${
                active === f.key
                  ? 'bg-primary-950 text-primary-50'
                  : 'border border-border hover:bg-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <LogTail key={active} fileKey={active} />
    </section>
  )
}

function LogTail({ fileKey }: { fileKey: LogKey }) {
  const [lines, setLines] = useState<Array<string>>([])
  const [status, setStatus] = useState<'connecting' | 'open' | 'error' | 'closed'>(
    'connecting',
  )
  const [error, setError] = useState<string | null>(null)
  const preRef = useRef<HTMLPreElement | null>(null)

  useEffect(() => {
    setLines([])
    setStatus('connecting')
    setError(null)

    const url = `/api/system/logs/tail?file=${encodeURIComponent(fileKey)}`
    const es = new EventSource(url, { withCredentials: true })

    es.addEventListener('connected', () => setStatus('open'))

    es.addEventListener('log', (ev: MessageEvent) => {
      try {
        const parsed = JSON.parse(ev.data) as { chunk?: string }
        if (typeof parsed.chunk === 'string' && parsed.chunk.length > 0) {
          setLines((prev) => {
            const next = [...prev, parsed.chunk as string]
            // keep last ~400KB
            const joined = next.join('')
            if (joined.length > 400_000) {
              return [joined.slice(joined.length - 400_000)]
            }
            return next
          })
        }
      } catch {
        /* ignore */
      }
    })

    es.addEventListener('error', (ev: MessageEvent) => {
      try {
        const parsed = JSON.parse(ev.data) as { message?: string }
        if (parsed?.message) setError(parsed.message)
      } catch {
        /* ignore */
      }
    })

    es.onerror = () => {
      setStatus('error')
    }

    return () => {
      setStatus('closed')
      es.close()
    }
  }, [fileKey])

  useEffect(() => {
    const el = preRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-1 text-xs text-muted-foreground">
        <span>
          status: <span className="font-mono">{status}</span>
        </span>
        {error && <span className="text-red-500">{error}</span>}
      </div>
      <pre
        ref={preRef}
        className="m-0 max-h-[480px] min-h-[240px] overflow-auto whitespace-pre-wrap break-words bg-black/90 p-3 font-mono text-xs leading-relaxed text-green-100"
      >
        {lines.join('') || '— waiting for log data —'}
      </pre>
    </div>
  )
}
