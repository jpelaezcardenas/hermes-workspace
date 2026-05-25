import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'
import {
  readCommandCenterSummaryCache,
  writeCommandCenterSummaryCache,
} from '@/lib/command-center-summary-cache'

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

type CommandCenterSummaryCacheMeta = {
  cachedAt: string
  fromCache: boolean
}

type CommandCenterSummaryEnvelope = {
  ok: boolean
  generatedAt: string
  source: string
  scope: 'personal' | 'business' | 'mixed' | 'system'
  data: CommandCenterSummary | null
  warnings: string[]
  errors: string[]
  cacheMeta?: CommandCenterSummaryCacheMeta
}

type CommandCenterSummary = {
  version: string
  posture: {
    host: string
    bind: string
    remoteAccess: string
    auth: string
    publicInternet: string
  } | null
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
  homebaseRecords: {
    status: string
    detail: string
    records: Array<{
      id: string
      label: string
      kind: string
      updatedAt: string | null
    }>
  }
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

type CommandCenterSectionEnvelope<T> = {
  ok: boolean
  generatedAt: string
  source: string
  scope: 'personal' | 'business' | 'mixed' | 'system'
  data: T | null
  warnings: string[]
  errors: string[]
}

type CommandCenterActionGateDetail =
  CommandCenterSummary['actionGates'][number] & {
    ownerSystem: string
    sideEffects: string
    rollback: string
    href: string | null
  }

type CommandCenterActionGatesSection = {
  total: number
  approvalRequired: number
  dryRun: number
  actions: CommandCenterActionGateDetail[]
}

type CommandCenterAgentRunsSection = {
  runs: Array<
    CommandCenterSummary['agentRuns'][number] & {
      receiptCount: number | null
      verification: string
    }
  >
  receipts: Array<{
    title: string
    path: string
    updatedAt: string
    instance: N8nInstanceId | 'unknown'
  }>
}

type CommandCenterAutomationSection = {
  boundary: string
  instances: N8nGovernanceResponse['instances']
  promotionReceipts: N8nGovernanceResponse['promotionReceipts']
  guardrails: string[]
}

type CommandCenterBrainSection = {
  sources: NonNullable<CommandCenterSummary['brain']>['sources']
  memoryArtifacts: {
    count: number
    rootConfigured: boolean
    root: string | null
  }
  policy: string[]
}

type CommandCenterMemoryArtifactsSection = {
  root: string
  count: number
  artifacts: Array<{
    id: string
    title: string
    path: string
    scope: 'personal' | 'business' | 'shared'
    tenant: string | null
    updatedAt: string | null
    sensitivity: 'normal' | 'secret_ref'
    tags: string[]
    excerpt: string
  }>
}

type CommandCenterVaultRefsSection = {
  warningCount: number
  refs: Array<{
    id: string
    displayName: string
    scope: 'personal' | 'business' | 'shared'
    exists: boolean
    lastVerifiedAt: string | null
    rotationDueAt: string | null
    linkedSystems: string[]
    vaultHref: string | null
    secretValue: null
  }>
  policy: string[]
}

type CommandCenterHomebaseSection = CommandCenterSummary['homebaseRecords']
type CommandCenterUsageSection = NonNullable<CommandCenterSummary['usage']>

type CommandCenterSectionsSnapshot = {
  actionGates?: CommandCenterSectionEnvelope<CommandCenterActionGatesSection>
  agentRuns?: CommandCenterSectionEnvelope<CommandCenterAgentRunsSection>
  automations?: CommandCenterSectionEnvelope<CommandCenterAutomationSection>
  brain?: CommandCenterSectionEnvelope<CommandCenterBrainSection>
  homebaseRecords?: CommandCenterSectionEnvelope<CommandCenterHomebaseSection>
  memoryArtifacts?: CommandCenterSectionEnvelope<CommandCenterMemoryArtifactsSection>
  usageLimits?: CommandCenterSectionEnvelope<CommandCenterUsageSection>
  vaultRefs?: CommandCenterSectionEnvelope<CommandCenterVaultRefsSection>
  errors: string[]
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

function getBrowserStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

function withCacheMeta(
  envelope: CommandCenterSummaryEnvelope,
  cacheMeta: CommandCenterSummaryCacheMeta,
): CommandCenterSummaryEnvelope {
  return { ...envelope, cacheMeta }
}

function readCachedCommandCenterSummary():
  | CommandCenterSummaryEnvelope
  | undefined {
  const cached =
    readCommandCenterSummaryCache<CommandCenterSummaryEnvelope>(
      getBrowserStorage(),
    )
  if (!cached) return undefined
  return withCacheMeta(cached.envelope, {
    cachedAt: cached.cachedAt,
    fromCache: true,
  })
}

async function fetchCommandCenterSummary(): Promise<CommandCenterSummaryEnvelope> {
  const response = await fetch('/api/command-center/summary', {
    cache: 'no-store',
  })
  if (!response.ok)
    throw new Error(`Command center summary failed: HTTP ${response.status}`)
  const envelope = (await response.json()) as CommandCenterSummaryEnvelope
  const cached = writeCommandCenterSummaryCache(getBrowserStorage(), envelope)
  return withCacheMeta(envelope, {
    cachedAt: cached?.cachedAt ?? envelope.generatedAt,
    fromCache: false,
  })
}

async function fetchWithTimeout(
  path: string,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(path, { cache: 'no-store', signal: controller.signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`${path} timed out after ${timeoutMs}ms`)
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

async function fetchCommandCenterSection<T>(
  path: string,
): Promise<CommandCenterSectionEnvelope<T>> {
  const response = await fetchWithTimeout(path, 7000)
  if (!response.ok) {
    throw new Error(`${path} failed: HTTP ${response.status}`)
  }
  return (await response.json()) as CommandCenterSectionEnvelope<T>
}

async function captureSection<T>(
  path: string,
): Promise<CommandCenterSectionEnvelope<T> | Error> {
  try {
    return await fetchCommandCenterSection<T>(path)
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error))
  }
}

async function fetchCommandCenterSections(): Promise<CommandCenterSectionsSnapshot> {
  const [
    actionGates,
    agentRuns,
    automations,
    brain,
    homebaseRecords,
    memoryArtifacts,
    usageLimits,
    vaultRefs,
  ] = await Promise.all([
    captureSection<CommandCenterActionGatesSection>(
      '/api/command-center/action-gates',
    ),
    captureSection<CommandCenterAgentRunsSection>(
      '/api/command-center/agent-runs',
    ),
    captureSection<CommandCenterAutomationSection>(
      '/api/command-center/automations',
    ),
    captureSection<CommandCenterBrainSection>('/api/command-center/brain'),
    captureSection<CommandCenterHomebaseSection>(
      '/api/command-center/homebase-records',
    ),
    captureSection<CommandCenterMemoryArtifactsSection>(
      '/api/command-center/memory-artifacts',
    ),
    captureSection<CommandCenterUsageSection>(
      '/api/command-center/usage-limits',
    ),
    captureSection<CommandCenterVaultRefsSection>(
      '/api/command-center/vault-refs',
    ),
  ])

  const errors: string[] = []
  function unwrap<T>(
    name: string,
    value: CommandCenterSectionEnvelope<T> | Error,
  ) {
    if (value instanceof Error) {
      errors.push(`${name}: ${value.message}`)
      return undefined
    }
    return value
  }

  return {
    actionGates: unwrap('Action gates', actionGates),
    agentRuns: unwrap('Agent runs', agentRuns),
    automations: unwrap('Automations', automations),
    brain: unwrap('Brain', brain),
    homebaseRecords: unwrap('Homebase', homebaseRecords),
    memoryArtifacts: unwrap('Memory artifacts', memoryArtifacts),
    usageLimits: unwrap('Usage limits', usageLimits),
    vaultRefs: unwrap('Vault refs', vaultRefs),
    errors,
  }
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

export function CaelHomeRoute() {
  usePageTitle('Cael Homebase')
  const initialCommandSummary = useMemo(readCachedCommandCenterSummary, [])
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
    initialData: initialCommandSummary,
    initialDataUpdatedAt: initialCommandSummary?.cacheMeta?.cachedAt
      ? Date.parse(initialCommandSummary.cacheMeta.cachedAt)
      : undefined,
    staleTime: 15_000,
    refetchInterval: 30_000,
  })
  const {
    data: commandSections,
    error: commandSectionsError,
    isLoading: commandSectionsLoading,
    refetch: refetchCommandSections,
    isFetching: isCommandSectionsFetching,
  } = useQuery({
    queryKey: ['command-center-sections'],
    queryFn: fetchCommandCenterSections,
    staleTime: 15_000,
    refetchInterval: 45_000,
  })
  const [isManualRefreshing, setIsManualRefreshing] = useState(false)
  const commandCenterOk = commandSummary?.ok ?? data?.ok

  async function refreshCommandCenter() {
    if (isManualRefreshing) return
    setIsManualRefreshing(true)
    try {
      await Promise.allSettled([
        refetch(),
        refetchN8n(),
        refetchCommandSummary(),
        refetchCommandSections(),
      ])
    } finally {
      setIsManualRefreshing(false)
    }
  }

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
              {typeof commandCenterOk === 'boolean' ? (
                <StatusPill ok={commandCenterOk} />
              ) : null}
              <button
                className="rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50"
                disabled={isManualRefreshing}
                onClick={() => {
                  void refreshCommandCenter()
                }}
              >
                {isManualRefreshing
                  ? 'Refreshing...'
                  : 'Refresh command center'}
              </button>
            </div>
          </div>
        </section>

        <CommandCenterSummaryPanel
          envelope={commandSummary}
          error={commandSummaryError}
          isLoading={commandSummaryLoading}
          isFetching={isCommandSummaryFetching}
        />

        <CommandCenterSectionsPanel
          snapshot={commandSections}
          error={commandSectionsError}
          isLoading={commandSectionsLoading}
          isFetching={isCommandSectionsFetching}
        />

        <CommandCenterPostureGrid envelope={commandSummary} fallback={data} />

        {isLoading && !commandSummary?.data ? (
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 text-sm text-[var(--theme-muted)]">
            Loading Cael status…
          </div>
        ) : error && !commandSummary?.data ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
            {error instanceof Error ? error.message : String(error)}
          </div>
        ) : data ? (
          <>
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
  isFetching,
}: {
  envelope?: CommandCenterSummaryEnvelope
  error: Error | null
  isLoading: boolean
  isFetching: boolean
}) {
  const summary = envelope?.data
  if (isLoading && !summary) {
    return (
      <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-[var(--theme-muted)]">
        Loading command center summary...
      </section>
    )
  }

  if (error && !summary) {
    return (
      <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200">
        {error.message}
      </section>
    )
  }

  if (!summary) return null

  const updatedAt = envelope?.cacheMeta?.cachedAt ?? envelope?.generatedAt
  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleTimeString()
    : 'unknown'
  const isCached = Boolean(envelope?.cacheMeta?.fromCache)

  const activeProviders =
    summary.usage?.providers.filter(
      (provider) => provider.monitorKind === 'cael' || provider.caelDefault,
    ) ?? []
  const availableBrainSources =
    summary.brain?.sources.filter((source) => source.status === 'available')
      .length ?? 0

  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">
            Shared Command Center API
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Now, gates, receipts, and limits
          </h2>
          <p className="mt-2 text-sm text-[var(--theme-muted)]">
            {envelope?.source} - {summary.version} -{' '}
            {isCached ? 'last known' : 'live'} {updatedLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill ok={Boolean(envelope?.ok)} />
          {isCached ? (
            <span className="rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-400/30">
              Last known
            </span>
          ) : null}
          {isFetching ? (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-[var(--theme-muted)] ring-1 ring-white/10">
              Refreshing
            </span>
          ) : null}
          {error ? (
            <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-200 ring-1 ring-rose-400/30">
              Refresh failed
            </span>
          ) : null}
          {envelope?.warnings.length ? (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/30">
              {envelope.warnings.length} warning
              {envelope.warnings.length === 1 ? '' : 's'}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <SummaryColumn title="Now / Next">
          {summary.nowNext.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </SummaryColumn>

        <SummaryColumn title="Action Gates">
          {summary.actionGates.length ? (
            summary.actionGates.slice(0, 4).map((gate) => (
              <div
                key={gate.id}
                className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-semibold">{gate.label}</div>
                  <RiskPill
                    risk={gate.riskLevel}
                    gated={gate.approvalRequired}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                  {gate.detail}
                </p>
              </div>
            ))
          ) : (
            <EmptySummary label="No approval gates surfaced." />
          )}
        </SummaryColumn>

        <SummaryColumn title="Receipts">
          {summary.agentRuns.length ? (
            summary.agentRuns.slice(0, 4).map((run) => (
              <div
                key={run.id}
                className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
              >
                <div className="text-sm font-semibold">{run.title}</div>
                <p className="mt-2 text-xs text-[var(--theme-muted)]">
                  {run.status} -{' '}
                  {run.updatedAt
                    ? new Date(run.updatedAt).toLocaleString()
                    : 'unknown'}
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
              {activeProviders.length} Cael model monitor
              {activeProviders.length === 1 ? '' : 's'}
            </div>
            <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
              {activeProviders
                .map((provider) => provider.caelModel || provider.label)
                .join(', ') || 'No active model monitors reported.'}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
            <div className="text-sm font-semibold">
              {availableBrainSources} available brain source
              {availableBrainSources === 1 ? '' : 's'}
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

function CommandCenterSectionsPanel({
  snapshot,
  error,
  isLoading,
  isFetching,
}: {
  snapshot?: CommandCenterSectionsSnapshot
  error: Error | null
  isLoading: boolean
  isFetching: boolean
}) {
  if (isLoading && !snapshot) {
    return (
      <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 text-sm text-[var(--theme-muted)]">
        Loading command center sections...
      </section>
    )
  }

  if (error && !snapshot) {
    return (
      <section className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200">
        {error.message}
      </section>
    )
  }

  if (!snapshot) return null

  const actionGates = snapshot.actionGates?.data?.actions ?? []
  const runs = snapshot.agentRuns?.data?.runs ?? []
  const automationInstances = snapshot.automations?.data?.instances ?? []
  const memoryArtifacts = snapshot.memoryArtifacts?.data?.artifacts ?? []
  const vaultRefs = snapshot.vaultRefs?.data?.refs ?? []
  const homebase = snapshot.homebaseRecords?.data
  const usageProviders = snapshot.usageLimits?.data?.providers ?? []
  const brainSources = snapshot.brain?.data?.sources ?? []
  const warningCount = [
    snapshot.actionGates,
    snapshot.agentRuns,
    snapshot.automations,
    snapshot.brain,
    snapshot.homebaseRecords,
    snapshot.memoryArtifacts,
    snapshot.usageLimits,
    snapshot.vaultRefs,
  ].reduce(
    (count, envelope) => count + (envelope?.warnings.length ?? 0),
    snapshot.errors.length,
  )

  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">
            Section Contract
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Native-ready command center sections
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--theme-muted)]">
            These cards are hydrated from the dedicated `/api/command-center/*`
            section endpoints. Desktop and mobile web can render this data
            without porting the business logic into either client.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isFetching ? (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-[var(--theme-muted)] ring-1 ring-white/10">
              Refreshing
            </span>
          ) : null}
          {warningCount ? (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/30">
              {warningCount} warning{warningCount === 1 ? '' : 's'}
            </span>
          ) : (
            <StatusPill ok />
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <SummaryColumn title="Action Gates">
          <SectionCount
            label="Approval required"
            value={String(snapshot.actionGates?.data?.approvalRequired ?? 0)}
            detail={`${snapshot.actionGates?.data?.dryRun ?? 0} dry-run capable actions`}
          />
          {actionGates.slice(0, 3).map((gate) => (
            <div
              key={gate.id}
              className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-semibold">{gate.label}</div>
                <RiskPill risk={gate.riskLevel} gated={gate.approvalRequired} />
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                {gate.sideEffects || gate.detail}
              </p>
            </div>
          ))}
        </SummaryColumn>

        <SummaryColumn title="Runs + Receipts">
          <SectionCount
            label="Runs surfaced"
            value={String(runs.length)}
            detail={`${snapshot.agentRuns?.data?.receipts.length ?? 0} receipt refs`}
          />
          {runs.slice(0, 3).map((run) => (
            <div
              key={run.id}
              className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
            >
              <div className="text-sm font-semibold">{run.title}</div>
              <p className="mt-2 text-xs text-[var(--theme-muted)]">
                {run.status} - {run.verification}
              </p>
            </div>
          ))}
        </SummaryColumn>

        <SummaryColumn title="Brain + Memory">
          <SectionCount
            label="Brain sources"
            value={String(brainSources.length)}
            detail={`${snapshot.brain?.data?.memoryArtifacts.count ?? memoryArtifacts.length} artifact refs`}
          />
          {memoryArtifacts.slice(0, 3).map((artifact) => (
            <div
              key={artifact.id}
              className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-semibold">{artifact.title}</div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase text-[var(--theme-muted)]">
                  {artifact.sensitivity}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--theme-muted)]">
                {artifact.excerpt || artifact.scope}
              </p>
            </div>
          ))}
        </SummaryColumn>

        <SummaryColumn title="Automations">
          <SectionCount
            label="Automation lanes"
            value={String(automationInstances.length)}
            detail={
              snapshot.automations?.data?.boundary ?? 'No automation snapshot'
            }
          />
          {automationInstances.map((instance) => (
            <div
              key={instance.id}
              className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-semibold">{instance.label}</div>
                <StatusPill ok={instance.health.ok} />
              </div>
              <p className="mt-2 text-xs text-[var(--theme-muted)]">
                {instance.failures.length} recent failure families
              </p>
            </div>
          ))}
        </SummaryColumn>

        <SummaryColumn title="Vault + Models">
          <SectionCount
            label="Vault refs"
            value={String(vaultRefs.length)}
            detail="Reference-only. Secret values are never returned."
          />
          <SectionCount
            label="Model monitors"
            value={String(usageProviders.length)}
            detail={
              usageProviders
                .filter(
                  (provider) =>
                    provider.caelDefault || provider.monitorKind === 'cael',
                )
                .map((provider) => provider.caelModel || provider.label)
                .join(', ') || 'No active Cael model monitors reported.'
            }
          />
        </SummaryColumn>

        <SummaryColumn title="Homebase">
          <SectionCount
            label={homebase?.status ?? 'unknown'}
            value={String(homebase?.records.length ?? 0)}
            detail={homebase?.detail ?? 'Homebase section unavailable.'}
          />
          {(homebase?.records ?? []).slice(0, 3).map((record) => (
            <div
              key={record.id}
              className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4"
            >
              <div className="text-sm font-semibold">{record.label}</div>
              <p className="mt-2 text-xs uppercase tracking-wide text-[var(--theme-muted)]">
                {record.kind}
              </p>
            </div>
          ))}
          {!homebase?.records.length ? (
            <EmptySummary label="Homebase is running in reference-only/degraded mode until the server credential resolver is wired." />
          ) : null}
        </SummaryColumn>
      </div>
    </section>
  )
}

function SectionCount({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
      <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
        {detail}
      </p>
    </div>
  )
}

function CommandCenterPostureGrid({
  envelope,
  fallback,
}: {
  envelope?: CommandCenterSummaryEnvelope
  fallback?: CaelStatusResponse
}) {
  const posture = envelope?.data?.posture ?? fallback?.posture
  const host = envelope?.data?.posture?.host ?? fallback?.host
  if (!posture || !host) return null

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <InfoCard
        title="Host"
        value={host}
        sub="BigMac is the personal runtime host."
      />
      <InfoCard
        title="Bind"
        value={posture.bind}
        sub="Tailscale mesh surface."
      />
      <InfoCard
        title="Internet"
        value={posture.publicInternet}
        sub="No public tunnel/funnel."
      />
      <InfoCard
        title="Auth"
        value={posture.auth}
        sub="Workspace authentication posture."
      />
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
