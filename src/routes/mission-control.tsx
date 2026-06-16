import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'

type MissionAction =
  | 'health-check'
  | 'local-context'
  | 'daily-briefing'
  | 'ask-hermes'
  | 'send-note'

type MissionResult = {
  ok: boolean
  action: MissionAction
  title: string
  output: string
  stderr?: string
  durationMs: number
  ranAt: string
  error?: string
}

const QUICK_ACTIONS: Array<{
  action: MissionAction
  title: string
  description: string
  promptPlaceholder?: string
  needsPrompt?: boolean
}> = [
  {
    action: 'health-check',
    title: 'Health check',
    description: 'Check Hermes services, key ports, disk, memory, and local API reachability.',
  },
  {
    action: 'local-context',
    title: 'local-rag pulse',
    description: 'Ask llmwiki what it knows about the current Hermes homelab setup.',
    promptPlaceholder: 'Optional local-rag query...',
  },
  {
    action: 'daily-briefing',
    title: 'Daily briefing',
    description: 'Run a read-only Hermes briefing with local-rag context and suggested next actions.',
  },
  {
    action: 'ask-hermes',
    title: 'Ask Hermes',
    description: 'Send a one-shot request through Hermes from this browser page.',
    promptPlaceholder: 'What should Hermes do or answer?',
    needsPrompt: true,
  },
  {
    action: 'send-note',
    title: 'Send Mike a note',
    description: 'Send a short note to the configured Discord home channel through Hermes messaging.',
    promptPlaceholder: 'Note text to send...',
    needsPrompt: true,
  },
]

export const Route = createFileRoute('/mission-control')({
  ssr: false,
  component: MissionControlPage,
})

function formatDuration(ms: number): string {
  if (!Number.isFinite(ms)) return ''
  if (ms < 1000) return `${ms}ms`
  return `${Math.round(ms / 100) / 10}s`
}

function ActionCard({
  action,
  title,
  description,
  promptPlaceholder,
  needsPrompt,
  runningAction,
  onRun,
}: {
  action: MissionAction
  title: string
  description: string
  promptPlaceholder?: string
  needsPrompt?: boolean
  runningAction: MissionAction | null
  onRun: (action: MissionAction, prompt: string) => void
}) {
  const [prompt, setPrompt] = useState('')
  const running = runningAction === action
  const disabled = Boolean(runningAction) || (needsPrompt && !prompt.trim())

  return (
    <section className="rounded-2xl border border-primary-200 bg-primary-50/70 p-5 shadow-sm dark:border-primary-800 dark:bg-primary-900/40">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-primary-950 dark:text-primary-50">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-primary-600 dark:text-primary-300">
          {description}
        </p>
      </div>
      {promptPlaceholder ? (
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={promptPlaceholder}
          className="mb-4 min-h-24 w-full resize-y rounded-xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-3 py-2 text-sm text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-muted)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20"
          maxLength={4000}
        />
      ) : null}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRun(action, prompt)}
        className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {running ? 'Running…' : `Run ${title}`}
      </button>
    </section>
  )
}

function MissionControlPage() {
  usePageTitle('Mission Control')
  const [runningAction, setRunningAction] = useState<MissionAction | null>(null)
  const [result, setResult] = useState<MissionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function runAction(action: MissionAction, prompt: string) {
    setRunningAction(action)
    setError(null)
    setResult(null)
    try {
      const response = await fetch('/api/mission-control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, prompt }),
      })
      const data = (await response.json()) as MissionResult
      if (!response.ok) {
        setError(data.error || data.output || `Request failed with HTTP ${response.status}`)
      }
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setRunningAction(null)
    }
  }

  return (
    <main className="min-h-full overflow-auto bg-primary-100/60 p-4 dark:bg-primary-950 md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 to-accent-50/40 p-6 shadow-sm dark:border-primary-800 dark:from-primary-900 dark:to-accent-950/20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-300">
            Homelab Mission Control
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-primary-950 dark:text-primary-50 md:text-4xl">
            Safe browser buttons for useful Hermes work
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-primary-600 dark:text-primary-300 md:text-base">
            Run read-only health checks, pull local-rag context, ask Hermes for a quick briefing, or send a short note without opening SSH or the terminal.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          {QUICK_ACTIONS.map((item) => (
            <ActionCard
              key={item.action}
              {...item}
              runningAction={runningAction}
              onRun={runAction}
            />
          ))}
        </div>

        <section className="rounded-2xl border border-primary-200 bg-primary-50 p-5 shadow-sm dark:border-primary-800 dark:bg-primary-900/50">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-primary-950 dark:text-primary-50">
                Latest output
              </h2>
              {result ? (
                <p className="text-xs text-primary-500 dark:text-primary-400">
                  {result.title} · {new Date(result.ranAt).toLocaleString()} · {formatDuration(result.durationMs)}
                </p>
              ) : null}
            </div>
            {result ? (
              <span className={result.ok ? 'rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300' : 'rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-300'}>
                {result.ok ? 'OK' : 'Failed'}
              </span>
            ) : null}
          </div>
          {error ? (
            <div className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          ) : null}
          <pre className="min-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-primary-950 p-4 text-sm leading-6 text-primary-50 shadow-inner">
            {result?.output || 'Run an action above to see the result here.'}
          </pre>
          {result?.stderr ? (
            <details className="mt-3 text-sm text-primary-600 dark:text-primary-300">
              <summary className="cursor-pointer">stderr</summary>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-primary-900 p-3 text-primary-50">
                {result.stderr}
              </pre>
            </details>
          ) : null}
        </section>
      </div>
    </main>
  )
}
