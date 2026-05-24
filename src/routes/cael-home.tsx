import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { usePageTitle } from '@/hooks/use-page-title'

type ServiceCheck = {
  id: string
  label: string
  kind: string
  target: string
  ok: boolean
  detail: string
  lane: 'personal' | 'local' | 'business' | 'legacy'
  owner: string
  description: string
  latencyMs?: number
}

type ContextSurface = {
  surface: string
  owner: string
  context: string
  access: string
  boundary: string
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
  services: Array<ServiceCheck>
  contextSurfaces: Array<ContextSurface>
  links: Array<{ label: string; href: string; description: string }>
}

type N8nInstanceId = 'personal-bigmac' | 'business-devserver'


type CommandCenterSummaryEnvelope = {
  ok: boolean
  generatedAt: string
  source: string
  scope: 'personal' | 'business' | 'mixed' | 'system'
  data: CommandCenterSummary | null
  warnings: string[]
  errors: string[]
}

type CommandCenterSummary = {
  version: string
  nowNext: Array<{
    id: string
    label: string
    detail: string
    tone: 'info' | 'success' | 'warning' | 'danger'
    href: string | null
  }>
  actionGates: Array<{
    id: string
    label: string
    status: string
    riskLevel: string
    approvalRequired: boolean
    dryRunSupported: boolean
    detail: string
  }>
  agentRuns: Array<{
    id: string
    title: string
    status: string
    updatedAt: string
    source: string
    path: string | null
  }>
  usage: {
    enabledProviders: string[]
    providers: Array<{
      id: string
      label: string
      status: string
      confidence: string
      monitorKind: string | null
      caelDefault: boolean
      caelModel: string | null
      primary: {
        label: string
        usedPercent: number
        remainingPercent: number
        resetsAt: string | null
      } | null
    }>
  } | null
  brain: {
    sources: Array<{
      id: string
      label: string
      category: string
      status: string
      writable: boolean
    }>
  } | null
  automations: {
    boundary: string
    instances: Array<{
      id: string
      label: string
      ok: boolean
      failures: number
    }>
  } | null
}

type N8nGovernanceResponse = {
  ok: boolean
  generatedAt: string
  boundary: string
  instances: Array<{
    id: N8nInstanceId
    label: string
    scope: string
    access: string
    boundary: string
    health: {
      ok: boolean
      detail: string
      checkedAt: string
      latencyMs?: number
    }
    failures: Array<{
      workflowName: string
      status: string
      lastSeen: string
      count: number
      instance: N8nInstanceId
    }>
  }>
  promotionReceipts: Array<{
    title: string
    path: string
    updatedAt: string
    instance: N8nInstanceId | 'unknown'
  }>
  safeWorkflowCommands: Array<{
    id: string
    label: string
    description: string
    owningInstance: N8nInstanceId
    riskLevel: string
    approvalRequired: boolean
    dryRunSupported: boolean
    sideEffects: string
    rollback: string
    status: 'available' | 'planned' | 'approval_gated'
  }>
  guardrails: Array<string>
}

async function fetchStatus(): Promise<CaelStatusResponse> {
  const response = await fetch('/api/cael-status', { cache: 'no-store' })
  if (!response.ok)
    throw new Error(`Status check failed: HTTP ${response.status}`)
  return response.json()
}

async function fetchN8nGovernance(): Promise<N8nGovernanceResponse> {
  const response = await fetch('/api/cael-n8n-governance', {
    cache: 'no-store',
  })
  if (!response.ok)
    throw new Error(`n8n governance check failed: HTTP ${response.status}`)
  return response.json()
}


async function fetchCommandCenterSummary(): Promise<CommandCenterSummaryEnvelope> {
  const response = await fetch('/api/command-center/summary', {
    cache: 'no-store',
  })
  if (!response.ok)
    throw new Error(`Command center summary failed: HTTP ${response.status}`)
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
      <span
        className={`mr-1.5 size-2 rounded-full ${ok ? 'bg-emerald-400' : 'bg-rose-400'}`}
      />
      {ok ? 'Online' : 'Needs attention'}
    </span>
  )
}

function RiskPill({ risk, gated }: { risk: string; gated: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
        gated
          ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30'
          : 'bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30'
      }`}
    >
      {gated ? 'Approval gated' : risk.replaceAll('_', ' ')}
    </span>
  )
}

const laneLabel: Record<ServiceCheck['lane'], string> = {
  personal: 'Personal mesh',
  local: 'Local-only',
  business: 'Business lane',
  legacy: 'Legacy',
}

const laneClass: Record<ServiceCheck['lane'], string> = {
  personal: 'bg-sky-500/15 text-sky-200 ring-sky-400/30',
  local: 'bg-violet-500/15 text-violet-200 ring-violet-400/30',
  business: 'bg-amber-500/15 text-amber-200 ring-amber-400/30',
  legacy: 'bg-zinc-500/15 text-zinc-200 ring-zinc-400/30',
}

function LanePill({ lane }: { lane: ServiceCheck['lane'] }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${laneClass[lane]}`}
    >
      {laneLabel[lane]}
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
  const {
    data: n8n,
    error: n8nError,
    isLoading: n8nLoading,
    refetch: refetchN8n,
    isFetching: isN8nFetching,
  } = useQuery({
    queryKey: ['cael-n8n-governance'],
    queryFn: fetchN8nGovernance,
    refetchInterval: 60_000,
  })
  const {
    data: commandSummary,
    error: commandSummaryError,
    isLoading: commandSummaryLoading,
    refetch: refetchCommandSummary,
    isFetching: isCommandSummaryFetching,
  } = useQuery({
    queryKey: ['command-center-summary'],
    queryFn: fetchCommandCenterSummary,
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
                This workspace is the new primary cockpit: chat, terminal,
                memory, workflows, watchdogs, tasks, and receipts. Twenty is now
                legacy/migration-only until data is exported or intentionally
                archived.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 lg:items-end">
              {data ? <StatusPill ok={data.ok} /> : null}
              <button
                className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50"
                disabled={isFetching || isN8nFetching || isCommandSummaryFetching}
                onClick={() => {
                  void refetch()
                  void refetchN8n()
                  void refetchCommandSummary()
                }}
              >
                {isFetching || isN8nFetching || isCommandSummaryFetching ? 'Refreshing...' : 'Refresh status'}
              </button>
            </div>
          </div>
        </section>

        <CommandCenterSummaryPanel
          envelope={commandSummary}
          error={commandSummaryError}
          isLoading={commandSummaryLoading}
        />

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
              <InfoCard
                title="Host"
                value={data.host}
                sub="BigMac is the personal runtime host."
              />
              <InfoCard
                title="Bind"
                value={data.posture.bind}
                sub="Tailscale mesh surface."
              />
              <InfoCard
                title="Internet"
                value={data.posture.publicInternet}
                sub="No public tunnel/funnel."
              />
              <InfoCard title="Auth" value="enabled" sub={data.posture.auth} />
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Private access mesh</h2>
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
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="font-medium">{service.label}</h3>
                            <LanePill lane={service.lane} />
                          </div>
                          <p className="text-xs leading-5 text-[var(--theme-muted)]">
                            {service.description}
                          </p>
                          <p className="mt-2 text-xs font-medium text-[var(--theme-text)]">
                            Owner: {service.owner}
                          </p>
                          <p className="mt-1 break-all text-xs text-[var(--theme-muted)]">
                            {service.target}
                          </p>
                        </div>
                        <StatusPill ok={service.ok} />
                      </div>
                      <p className="mt-3 text-sm text-[var(--theme-muted)]">
                        {service.detail}
                        {typeof service.latencyMs === 'number'
                          ? ` · ${service.latencyMs}ms`
                          : ''}
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
                      <div className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">
                        {link.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Context ownership and boundaries
                </h2>
                <p className="mt-1 text-sm leading-6 text-[var(--theme-muted)]">
                  Cael keeps personal Tailscale, local BigMac APIs, and business
                  Twingate/dev-server access visibly separate. This panel
                  reports health and routing posture only; it does not expose
                  service keys, passwords, bearer tokens, or raw environment
                  values.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {data.contextSurfaces.map((surface) => (
                  <div
                    key={surface.surface}
                    className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
                  >
                    <div className="text-sm font-semibold">
                      {surface.surface}
                    </div>
                    <div className="mt-1 text-xs font-medium text-[var(--theme-text)]">
                      Owner: {surface.owner}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                      {surface.context}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                      Access: {surface.access}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-amber-100/80">
                      Boundary: {surface.boundary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        <N8nGovernancePanel
          data={n8n}
          error={n8nError}
          isLoading={n8nLoading}
        />
      </div>
    </main>
  )
}


function CommandCenterSummaryPanel({
  envelope,
  error,
  isLoading,
}: {
  envelope?: CommandCenterSummaryEnvelope
  error: Error | null
  isLoading: boolean
}) {
  const summary = envelope?.data
  if (isLoading) {
    return (
      <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-[var(--theme-muted)]">
        Loading command center summary...
      </section>
    )
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200">
        {error.message}
      </section>
    )
  }

  if (!summary) return null

  const activeProviders = summary.usage?.providers.filter(
    (provider) => provider.monitorKind === 'cael' || provider.caelDefault,
  ) ?? []
  const availableBrainSources = summary.brain?.sources.filter(
    (source) => source.status === 'available',
  ).length ?? 0

  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">
            Shared Command Center API
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Now, gates, receipts, and limits</h2>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            {envelope?.source} - {summary.version} - {new Date(envelope?.generatedAt ?? summary.version).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill ok={Boolean(envelope?.ok)} />
          {envelope?.warnings.length ? (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/30">
              {envelope.warnings.length} warning{envelope.warnings.length === 1 ? '' : 's'}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <SummaryColumn title="Now / Next">
          {summary.nowNext.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
              <div className="text-sm font-semibold">{item.label}</div>
              <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{item.detail}</p>
            </div>
          ))}
        </SummaryColumn>

        <SummaryColumn title="Action Gates">
          {summary.actionGates.length ? (
            summary.actionGates.slice(0, 4).map((gate) => (
              <div key={gate.id} className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-semibold">{gate.label}</div>
                  <RiskPill risk={gate.riskLevel} gated={gate.approvalRequired} />
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{gate.detail}</p>
              </div>
            ))
          ) : (
            <EmptySummary label="No approval gates surfaced." />
          )}
        </SummaryColumn>

        <SummaryColumn title="Receipts">
          {summary.agentRuns.length ? (
            summary.agentRuns.slice(0, 4).map((run) => (
              <div key={run.id} className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
                <div className="text-sm font-semibold">{run.title}</div>
                <p className="mt-2 text-xs text-[var(--theme-muted)]">
                  {run.status} - {run.updatedAt ? new Date(run.updatedAt).toLocaleString() : 'unknown'}
                </p>
              </div>
            ))
          ) : (
            <EmptySummary label="No receipt summaries found." />
          )}
        </SummaryColumn>

        <SummaryColumn title="Models + Brain">
          <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
            <div className="text-sm font-semibold">
              {activeProviders.length} Cael model monitor{activeProviders.length === 1 ? '' : 's'}
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
              {activeProviders.map((provider) => provider.caelModel || provider.label).join(', ') || 'No active model monitors reported.'}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
            <div className="text-sm font-semibold">
              {availableBrainSources} available brain source{availableBrainSources === 1 ? '' : 's'}
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
              References only; secret and runtime stores remain filtered.
            </p>
          </div>
        </SummaryColumn>
      </div>
    </section>
  )
}

function SummaryColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function EmptySummary({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4 text-sm text-[var(--theme-muted)]">
      {label}
    </div>
  )
}

function N8nGovernancePanel({
  data,
  error,
  isLoading,
}: {
  data?: N8nGovernanceResponse
  error: Error | null
  isLoading: boolean
}) {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">
            n8n governance
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Health, failures, receipts, and safe actions
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--theme-muted)]">
            {data?.boundary ??
              'BigMac personal n8n and Visual Graphx business n8n are checked separately. No secrets or execution payloads are rendered.'}
          </p>
        </div>
        {data ? <StatusPill ok={data.ok} /> : null}
      </div>

      {isLoading ? (
        <div className="mt-5 rounded-2xl border border-[var(--theme-border)] bg-black/10 p-5 text-sm text-[var(--theme-muted)]">
          Loading n8n governance snapshot…
        </div>
      ) : error ? (
        <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200">
          {error.message}
        </div>
      ) : data ? (
        <div className="mt-5 flex flex-col gap-5">
          <div className="grid gap-4 xl:grid-cols-2">
            {data.instances.map((instance) => (
              <div
                key={instance.id}
                className="rounded-2xl border border-[var(--theme-border)] bg-black/10 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{instance.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--theme-muted)]">
                      {instance.scope}
                    </p>
                  </div>
                  <StatusPill ok={instance.health.ok} />
                </div>
                <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                  <InfoTerm label="Access" value={instance.access} />
                  <InfoTerm label="Boundary" value={instance.boundary} />
                  <InfoTerm
                    label="Health"
                    value={`${instance.health.detail}${
                      typeof instance.health.latencyMs === 'number'
                        ? ` · ${instance.health.latencyMs}ms`
                        : ''
                    }`}
                  />
                  <InfoTerm
                    label="Checked"
                    value={new Date(instance.health.checkedAt).toLocaleString()}
                  />
                </dl>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold">
                    Recent failure families
                  </h4>
                  {instance.failures.length ? (
                    <div className="mt-3 flex flex-col gap-2">
                      {instance.failures.map((failure) => (
                        <div
                          key={`${failure.workflowName}-${failure.status}-${failure.lastSeen}`}
                          className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-sm"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-medium">
                              {failure.workflowName}
                            </span>
                            <span className="rounded-full bg-rose-500/15 px-2 py-1 text-xs text-rose-200">
                              {failure.status} · {failure.count}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-[var(--theme-muted)]">
                            Last seen {failure.lastSeen || 'unknown'}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-[var(--theme-muted)]">
                      No recent failures available from the read-only query.
                      Health still reflects the live endpoint.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-[var(--theme-border)] bg-black/10 p-5">
              <h3 className="text-lg font-semibold">Promotion receipts</h3>
              <p className="mt-1 text-sm text-[var(--theme-muted)]">
                Latest local receipt artifacts; paths only, never credential
                values.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {data.promotionReceipts.length ? (
                  data.promotionReceipts.map((receipt) => (
                    <div
                      key={receipt.path}
                      className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium">{receipt.title}</div>
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-[var(--theme-muted)]">
                          {receipt.instance.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="mt-2 break-all text-xs text-[var(--theme-muted)]">
                        {receipt.path}
                      </p>
                      <p className="mt-1 text-xs text-[var(--theme-muted)]">
                        Updated {new Date(receipt.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--theme-muted)]">
                    No n8n promotion receipt files found in the allowlisted
                    receipt roots.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--theme-border)] bg-black/10 p-5">
              <h3 className="text-lg font-semibold">Safe workflow actions</h3>
              <p className="mt-1 text-sm text-[var(--theme-muted)]">
                Registry view only. Dangerous actions stay behind policy,
                dry-run, approval, receipt, and rollback gates.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {data.safeWorkflowCommands.map((command) => (
                  <div
                    key={command.id}
                    className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="font-medium">{command.label}</div>
                        <p className="mt-1 text-xs uppercase tracking-wide text-[var(--theme-muted)]">
                          {command.owningInstance.replace('-', ' ')} ·{' '}
                          {command.status.replace('_', ' ')}
                        </p>
                      </div>
                      <RiskPill
                        risk={command.riskLevel}
                        gated={command.approvalRequired}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">
                      {command.description}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                      Side effects: {command.sideEffects}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[var(--theme-muted)]">
                      Rollback: {command.rollback}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--theme-border)] bg-black/10 p-5">
            <h3 className="text-lg font-semibold">Guardrails</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--theme-muted)] md:grid-cols-2">
              {data.guardrails.map((guardrail) => (
                <li key={guardrail}>• {guardrail}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function InfoTerm({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {label}
      </dt>
      <dd className="mt-1 break-words text-[var(--theme-text)]">{value}</dd>
    </div>
  )
}

function InfoCard({
  title,
  value,
  sub,
}: {
  title: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {title}
      </div>
      <div className="mt-2 break-words text-xl font-semibold">{value}</div>
      <div className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
        {sub}
      </div>
    </div>
  )
}
