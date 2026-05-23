import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { usePageTitle } from '@/hooks/use-page-title'

type ServiceCheck = {
  id: string
  label: string
  kind: string
  target: string
  ok: boolean
  detail: string
  latencyMs?: number
}

type CaelStatusResponse = {
  ok: boolean
  generatedAt: string
  host: string
  posture: {
    bind: string
    remoteAccess: string
    auth: string
    publicInternet: string
  }
  services: ServiceCheck[]
  links: Array<{ label: string; href: string; description: string }>
}

async function fetchStatus(): Promise<CaelStatusResponse> {
  const response = await fetch('/api/cael-status', { cache: 'no-store' })
  if (!response.ok) throw new Error(`Status check failed: HTTP ${response.status}`)
  return response.json()
}

export const Route = createFileRoute('/cael-home')({
  ssr: false,
  component: CaelHomeRoute,
})

function StatusPill({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        ok
          ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
          : 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30'
      }`}
    >
      <span className={`mr-1.5 size-2 rounded-full ${ok ? 'bg-emerald-400' : 'bg-rose-400'}`} />
      {ok ? 'Online' : 'Needs attention'}
    </span>
  )
}

function CaelHomeRoute() {
  usePageTitle('Cael Homebase')
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['cael-status'],
    queryFn: fetchStatus,
    refetchInterval: 30_000,
  })

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">
                Cael Command Center
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Homebase for Christian's operating layer
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
                This workspace is the new primary cockpit: chat, terminal, memory, workflows,
                watchdogs, tasks, and receipts. Twenty is now legacy/migration-only until data is
                exported or intentionally archived.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 lg:items-end">
              {data ? <StatusPill ok={data.ok} /> : null}
              <button
                className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50"
                disabled={isFetching}
                onClick={() => void refetch()}
              >
                {isFetching ? 'Refreshing…' : 'Refresh status'}
              </button>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 text-sm text-[var(--theme-muted)]">
            Loading Cael status…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
            {error instanceof Error ? error.message : String(error)}
          </div>
        ) : data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard title="Host" value={data.host} sub="BigMac is the personal runtime host." />
              <InfoCard title="Bind" value={data.posture.bind} sub="Tailscale mesh surface." />
              <InfoCard title="Internet" value={data.posture.publicInternet} sub="No public tunnel/funnel." />
              <InfoCard title="Auth" value="enabled" sub={data.posture.auth} />
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Systems</h2>
                  <p className="text-xs text-[var(--theme-muted)]">
                    Updated {new Date(data.generatedAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {data.services.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium">{service.label}</h3>
                          <p className="mt-1 break-all text-xs text-[var(--theme-muted)]">{service.target}</p>
                        </div>
                        <StatusPill ok={service.ok} />
                      </div>
                      <p className="mt-3 text-sm text-[var(--theme-muted)]">
                        {service.detail}
                        {typeof service.latencyMs === 'number' ? ` · ${service.latencyMs}ms` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
                <h2 className="text-lg font-semibold">Fast lanes</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {data.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href as never}
                      className="rounded-xl border border-[var(--theme-border)] p-4 transition hover:bg-white/5"
                    >
                      <div className="font-medium">{link.label}</div>
                      <div className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">{link.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  )
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
