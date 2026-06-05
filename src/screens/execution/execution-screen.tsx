import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import type { ExecutionLayerSnapshot } from '@/server/execution-layer'

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      {children}
    </section>
  )
}

async function fetchExecutionLayer(): Promise<ExecutionLayerSnapshot> {
  const response = await fetch('/api/execution-layer')
  if (!response.ok) {
    throw new Error('Execution Layer konnte nicht geladen werden.')
  }
  const payload = (await response.json()) as {
    ok: boolean
    snapshot?: ExecutionLayerSnapshot
    error?: string
  }
  if (!payload.ok || !payload.snapshot) {
    throw new Error(
      payload.error ?? 'Execution Layer konnte nicht geladen werden.',
    )
  }
  return payload.snapshot
}

export function ExecutionScreen() {
  const query = useQuery({
    queryKey: ['execution-layer'],
    queryFn: fetchExecutionLayer,
    refetchInterval: 60_000,
  })

  if (query.isLoading) {
    return (
      <main className="h-full overflow-auto bg-[var(--theme-bg)] p-6 text-ink">
        <p className="text-sm text-muted">Execution Layer wird geladen...</p>
      </main>
    )
  }

  if (query.isError) {
    return (
      <main className="h-full overflow-auto bg-[var(--theme-bg)] p-6 text-ink">
        <Section title="Fehler">
          <p className="text-sm text-muted">
            {query.error instanceof Error
              ? query.error.message
              : 'Unbekannter Fehler'}
          </p>
        </Section>
      </main>
    )
  }

  const snapshot = query.data

  return (
    <main className="h-full overflow-auto bg-[var(--theme-bg)] p-4 text-ink md:p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Hermes Execution Layer
          </p>
          <h1 className="text-2xl font-semibold">Heute steuerbar machen</h1>
          <p className="text-sm text-muted">
            Signal: {snapshot.signal}. {snapshot.focus}
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Section title="Heute wirklich tun">
            <div className="flex flex-col gap-3">
              {snapshot.today.map((action) => (
                <article
                  key={`${action.source}:${action.title}`}
                  className="rounded-md bg-[var(--theme-card2)] p-3"
                >
                  <h3 className="text-sm font-semibold">{action.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {action.owner} · {action.timebox}
                  </p>
                  <p className="mt-2 text-xs text-muted">{action.doneWhen}</p>
                </article>
              ))}
              {snapshot.today.length === 0 && (
                <p className="text-sm text-muted">
                  Keine sichere Tagesaktion gefunden.
                </p>
              )}
            </div>
          </Section>

          <Section title="Naechster kleinster Slice">
            <h3 className="text-sm font-semibold">
              {snapshot.nextSmallestSlice.action}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {snapshot.nextSmallestSlice.whyThis}
            </p>
            <p className="mt-3 text-xs text-muted">
              {snapshot.nextSmallestSlice.acceptance}
            </p>
          </Section>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Section title="Wartet auf Chris">
            <ul className="space-y-3">
              {snapshot.waitingForChris.map((decision) => (
                <li
                  key={`${decision.source}:${decision.title}`}
                  className="text-sm"
                >
                  <span className="font-medium">{decision.title}</span>
                  <p className="text-xs text-muted">{decision.whyChris}</p>
                </li>
              ))}
              {snapshot.waitingForChris.length === 0 && (
                <li className="text-sm text-muted">Nichts erkannt.</li>
              )}
            </ul>
          </Section>

          <Section title="Codex offen">
            <ul className="space-y-3">
              {snapshot.codexOpen.map((handoff) => (
                <li key={handoff.source} className="text-sm">
                  <span className="font-medium">{handoff.filename}</span>
                  <p className="text-xs text-muted">{handoff.next}</p>
                </li>
              ))}
              {snapshot.codexOpen.length === 0 && (
                <li className="text-sm text-muted">Keine offenen Handoffs.</li>
              )}
            </ul>
          </Section>

          <Section title="Nicht anfassen">
            <ul className="space-y-3">
              {snapshot.dontTouch.map((item) => (
                <li key={`${item.source}:${item.item}`} className="text-sm">
                  <span className="font-medium">{item.item}</span>
                  <p className="text-xs text-muted">{item.reason}</p>
                </li>
              ))}
              {snapshot.dontTouch.length === 0 && (
                <li className="text-sm text-muted">
                  Keine Nicht-Tun-Regel erkannt.
                </li>
              )}
            </ul>
          </Section>
        </div>

        <Section title="Belege">
          <ul className="space-y-1 text-xs text-muted">
            {snapshot.proofLog.map((entry) => (
              <li key={`${entry.kind}:${entry.path}`}>
                {entry.kind}: {entry.path}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  )
}
