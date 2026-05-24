import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { usePageTitle } from '@/hooks/use-page-title'

type IntegrationCheck = {
  id: string
  label: string
  status: 'ready' | 'setup-needed' | 'warning' | 'unknown'
  detail: string
  safeMode: string
}

type IntegrationStatus = {
  ok: boolean
  generatedAt: string
  integrations: IntegrationCheck[]
  policy: Record<string, string>
}

async function fetchIntegrationStatus(): Promise<IntegrationStatus> {
  const response = await fetch('/api/integrations/status', { cache: 'no-store' })
  if (!response.ok) throw new Error(`Integration status failed: HTTP ${response.status}`)
  return response.json()
}

export const Route = createFileRoute('/integrations')({
  ssr: false,
  component: IntegrationsRoute,
})

function IntegrationsRoute() {
  usePageTitle('Cael Integrations')
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['cael-integrations'],
    queryFn: fetchIntegrationStatus,
    refetchInterval: 60_000,
  })

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">Provider readiness</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Integrations</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
                This is the control panel for Google Workspace, Vaultwarden, and legacy Twenty migration state.
                Reads come first; sending, creating, deleting, and editing stay approval-gated.
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
          <Panel>Loading integration state…</Panel>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
            {error instanceof Error ? error.message : String(error)}
          </div>
        ) : data ? (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              {data.integrations.map((integration) => (
                <div key={integration.id} className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold">{integration.label}</h2>
                    <StatusBadge status={integration.status} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">{integration.detail}</p>
                  <p className="mt-3 rounded-xl border border-[var(--theme-border)] bg-black/10 p-3 text-xs leading-5 text-[var(--theme-muted)]">
                    {integration.safeMode}
                  </p>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
              <h2 className="text-lg font-semibold">Policy</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {Object.entries(data.policy).map(([key, value]) => (
                  <div key={key} className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">{key}</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        <section className="grid gap-3 md:grid-cols-3">
          <FastLink to="/mail" title="Mail" body="Inbox/search/thread reader. Setup-needed until Google auth is repaired." />
          <FastLink to="/contacts" title="Contacts" body="Twenty legacy export + Google People contacts, read-only first." />
          <FastLink to="/calendar" title="Calendar" body="Agenda and event drafting, with explicit approval for writes." />
        </section>
      </div>
    </main>
  )
}

function StatusBadge({ status }: { status: IntegrationCheck['status'] }) {
  const label = status === 'ready' ? 'Ready' : status === 'warning' ? 'Legacy' : status === 'setup-needed' ? 'Setup needed' : 'Unknown'
  const cls = status === 'ready'
    ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30'
    : status === 'warning'
      ? 'bg-amber-500/15 text-amber-300 ring-amber-400/30'
      : 'bg-rose-500/15 text-rose-300 ring-rose-400/30'
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}>{label}</span>
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 text-sm text-[var(--theme-muted)]">{children}</div>
}

function FastLink({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link to={to as never} className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 transition hover:bg-white/5">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">{body}</p>
    </Link>
  )
}
