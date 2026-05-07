import { HugeiconsIcon } from '@hugeicons/react'
import {
  Analytics01Icon,
  ArrowRight01Icon,
  CheckListIcon,
  DashboardSquare01Icon,
  Database01Icon,
  Rocket01Icon,
  Settings01Icon,
  Shield01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type StatusTone = 'good' | 'warn' | 'blocked' | 'idle'

type Metric = {
  label: string
  value: string
  detail: string
  tone: StatusTone
}

type BriefItem = {
  title: string
  detail: string
  owner: string
  tone: StatusTone
}

type PipelineItem = {
  title: string
  platform: string
  stage:
    | 'Idea'
    | 'Researching'
    | 'Script'
    | 'Production'
    | 'Scheduled'
    | 'Published'
  owner: string
  blocker?: string
}

type AgentItem = {
  name: string
  role: string
  model: string
  status: string
  tone: StatusTone
  lastSignal: string
}

type IntegrationItem = {
  name: string
  mode: 'read-only' | 'disabled' | 'fixture' | 'live'
  status: string
  tone: StatusTone
}

type LlOpsStatus = {
  fetchedAt: string
  services: Array<{
    id: string
    label: string
    role: string
    active: boolean
    status: string
  }>
  stateFiles: Array<{
    id: string
    label: string
    path: string
    exists: boolean
    modifiedAt: string | null
    size: number
  }>
  recentSharedEntries: Array<{
    timestamp: string
    title: string
  }>
  activeWorkspaces: Array<{
    workspace: string
    path: string
    state: string
  }>
  opsStatus: {
    generatedAt: unknown
    summary: unknown
  } | null
}

const metrics: Array<Metric> = [
  {
    label: 'MRR target',
    value: '$33K',
    detail: 'Strategic target, not live revenue',
    tone: 'idle',
  },
  {
    label: 'Pipeline',
    value: '18',
    detail: 'Fixture content items across six stages',
    tone: 'good',
  },
  {
    label: 'Credential gates',
    value: '5',
    detail: 'Apify, YouTube, TikTok, Instagram, Google Ads',
    tone: 'warn',
  },
  {
    label: 'Unsafe actions',
    value: '0',
    detail: 'No infra or Hermes mutations in this MVP',
    tone: 'good',
  },
]

function buildMetrics(status: LlOpsStatus | undefined): Array<Metric> {
  if (!status) return metrics
  const activeServices = status.services.filter((service) => service.active).length
  const readyStateFiles = status.stateFiles.filter((file) => file.exists).length

  return [
    {
      label: 'Hermes services',
      value: `${activeServices}/${status.services.length}`,
      detail: 'Live read-only systemd status',
      tone: activeServices === status.services.length ? 'good' : 'warn',
    },
    {
      label: 'Active workspaces',
      value: String(status.activeWorkspaces.length),
      detail: 'Parsed from ACTIVE_STATE.md',
      tone: status.activeWorkspaces.length > 0 ? 'good' : 'warn',
    },
    {
      label: 'State files',
      value: `${readyStateFiles}/${status.stateFiles.length}`,
      detail: 'Read-only local ops sources',
      tone: readyStateFiles === status.stateFiles.length ? 'good' : 'warn',
    },
    {
      label: 'Unsafe actions',
      value: '0',
      detail: 'No infra or Hermes mutations in the dashboard',
      tone: 'good',
    },
  ]
}

const briefing: Array<BriefItem> = [
  {
    title: 'Build the ops cockpit before data integrations',
    detail:
      'Static MVP proves layout, density, and navigation before touching API keys.',
    owner: 'Codex',
    tone: 'good',
  },
  {
    title: 'Google Ads remains credential-gated',
    detail:
      'Read-only MCP path exists, but activation waits for real credentials.',
    owner: 'Lucas',
    tone: 'warn',
  },
  {
    title: 'Hermes actions stay approval-gated',
    detail:
      'Restart, config edits, trading, and external writes require a Chairman Brief.',
    owner: 'Atlas',
    tone: 'blocked',
  },
]

function buildBriefing(status: LlOpsStatus | undefined): Array<BriefItem> {
  if (!status || status.recentSharedEntries.length === 0) return briefing
  return status.recentSharedEntries.slice(0, 3).map((entry) => ({
    title: entry.title,
    detail: `Latest shared-state entry at ${entry.timestamp}. Source: /home/lucas/llempire/SHARED_STATE.md`,
    owner: 'Live',
    tone: 'good',
  }))
}

const pipeline: Array<PipelineItem> = [
  {
    title: 'Tenfold dashboard teardown',
    platform: 'Research',
    stage: 'Researching',
    owner: 'Codex',
  },
  {
    title: 'AI Ops dashboard static MVP',
    platform: 'Hermes Workspace',
    stage: 'Production',
    owner: 'Codex',
  },
  {
    title: 'YouTube performance import',
    platform: 'YouTube',
    stage: 'Idea',
    owner: 'Lucas',
    blocker: 'API key not confirmed',
  },
  {
    title: 'TikTok/Instagram trend pulls',
    platform: 'Apify',
    stage: 'Idea',
    owner: 'Seven',
    blocker: 'Apify credential not confirmed',
  },
  {
    title: 'Client launch reporting',
    platform: 'Clients',
    stage: 'Script',
    owner: 'Lucas',
  },
  {
    title: 'ScrapeGraph structured extract pilot',
    platform: 'ScrapeGraphAI',
    stage: 'Idea',
    owner: 'Codex',
    blocker: 'Sandbox test pending',
  },
]

const agents: Array<AgentItem> = [
  {
    name: 'Seven',
    role: 'Chief of Staff',
    model: 'gemini-2.5-flash',
    status: 'Active',
    tone: 'good',
    lastSignal: 'Workspace/briefing context available',
  },
  {
    name: 'Atlas',
    role: 'Infra and Security',
    model: 'gemini-2.5-flash',
    status: 'Approval gate',
    tone: 'warn',
    lastSignal: 'Hermes Workspace changes require visible event log',
  },
  {
    name: 'Neo',
    role: 'Finance and Market Intel',
    model: 'gemini-2.5-flash',
    status: 'Read-only safe',
    tone: 'good',
    lastSignal: 'Trading/write actions are excluded from MVP',
  },
  {
    name: 'Codex',
    role: 'Builder and operator',
    model: 'GPT-5',
    status: 'Building',
    tone: 'good',
    lastSignal: 'Static route only; no external writes',
  },
]

function buildAgents(status: LlOpsStatus | undefined): Array<AgentItem> {
  if (!status) return agents
  return status.services.map((service) => ({
    name: service.label,
    role: service.role,
    model:
      service.id === 'hermes-workspace'
        ? 'vite dev / TanStack Start'
        : 'Hermes v0.11 runtime',
    status: service.status,
    tone: service.active ? 'good' : 'blocked',
    lastSignal: `Live read-only check from systemctl is-active ${service.id}`,
  }))
}

const integrations: Array<IntegrationItem> = [
  {
    name: 'Hermes Workspace',
    mode: 'read-only',
    status: 'UI shell connected',
    tone: 'good',
  },
  {
    name: 'LL Empire state files',
    mode: 'fixture',
    status: 'Planned read-only source',
    tone: 'idle',
  },
  {
    name: 'Obsidian summaries',
    mode: 'fixture',
    status: 'Planned read-only source',
    tone: 'idle',
  },
  {
    name: 'Apify',
    mode: 'disabled',
    status: 'Credential not confirmed',
    tone: 'warn',
  },
  {
    name: 'YouTube Data API',
    mode: 'disabled',
    status: 'Credential not confirmed',
    tone: 'warn',
  },
  {
    name: 'Instagram Graph',
    mode: 'disabled',
    status: 'Account/token readiness not proven',
    tone: 'warn',
  },
  {
    name: 'Google Ads',
    mode: 'disabled',
    status: 'MCP pilot credential-gated',
    tone: 'blocked',
  },
  {
    name: 'ScrapeGraphAI',
    mode: 'disabled',
    status: 'Optional sandbox pilot',
    tone: 'idle',
  },
]

function buildIntegrations(status: LlOpsStatus | undefined): Array<IntegrationItem> {
  if (!status) return integrations
  const stateFiles = status.stateFiles.map((file) => ({
    name: file.label,
    mode: 'live' as const,
    status: file.exists
      ? `Modified ${file.modifiedAt ?? 'unknown'} (${file.size} bytes)`
      : `Missing: ${file.path}`,
    tone: file.exists ? ('good' as const) : ('warn' as const),
  }))

  return [
    {
      name: 'Hermes services',
      mode: 'live',
      status: `${status.services.filter((service) => service.active).length}/${status.services.length} active`,
      tone: status.services.every((service) => service.active) ? 'good' : 'warn',
    },
    ...stateFiles,
    {
      name: 'Apify',
      mode: 'disabled',
      status: 'Credential not confirmed',
      tone: 'warn',
    },
    {
      name: 'YouTube Data API',
      mode: 'disabled',
      status: 'Credential not confirmed',
      tone: 'warn',
    },
    {
      name: 'Instagram Graph',
      mode: 'disabled',
      status: 'Account/token readiness not proven',
      tone: 'warn',
    },
    {
      name: 'Google Ads',
      mode: 'disabled',
      status: 'MCP pilot credential-gated',
      tone: 'blocked',
    },
    {
      name: 'ScrapeGraphAI',
      mode: 'disabled',
      status: 'Optional sandbox pilot',
      tone: 'idle',
    },
  ]
}

async function fetchLlOpsStatus(): Promise<LlOpsStatus> {
  const response = await fetch('/api/ll-ops-status')
  if (!response.ok) {
    throw new Error(`Failed to load LL Ops status: ${response.status}`)
  }
  return response.json() as Promise<LlOpsStatus>
}

type SectionId =
  | 'overview'
  | 'research'
  | 'pipeline'
  | 'performance'
  | 'agents'
  | 'clients'
  | 'settings'

const sections: Array<{ id: SectionId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'research', label: 'Research' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'performance', label: 'Performance' },
  { id: 'agents', label: 'Agents' },
  { id: 'clients', label: 'Clients' },
  { id: 'settings', label: 'Settings' },
]

const performanceSources = ['YouTube', 'TikTok', 'Instagram', 'Campaigns']
const clientRows = ['LL Empire core', 'Paid traffic pilot', 'Content factory']

function matchesSearch(values: Array<string | undefined>, query: string) {
  if (!query) return true
  return values.some((value) => value?.toLowerCase().includes(query))
}

function toneClasses(tone: StatusTone): string {
  if (tone === 'good')
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
  if (tone === 'warn')
    return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
  if (tone === 'blocked')
    return 'border-rose-500/30 bg-rose-500/10 text-rose-300'
  return 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-muted)]'
}

function Panel({
  title,
  icon,
  right,
  children,
  className,
}: {
  title: string
  icon: typeof DashboardSquare01Icon
  right?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <HugeiconsIcon
            icon={icon}
            size={18}
            strokeWidth={1.7}
            className="shrink-0 text-[var(--theme-accent)]"
          />
          <h2 className="truncate text-sm font-semibold text-[var(--theme-text)]">
            {title}
          </h2>
        </div>
        {right}
      </div>
      {children}
    </section>
  )
}

function StatusPill({
  tone,
  children,
}: {
  tone: StatusTone
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold leading-none',
        toneClasses(tone),
      )}
    >
      {children}
    </span>
  )
}

export function LlOpsDashboardScreen() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const [query, setQuery] = useState('')
  const [reviewedItemTitle, setReviewedItemTitle] = useState<string | null>(null)
  const statusQuery = useQuery({
    queryKey: ['ll-ops-status'],
    queryFn: fetchLlOpsStatus,
    staleTime: 20_000,
    refetchInterval: 60_000,
  })
  const liveStatus = statusQuery.data
  const visibleMetrics = buildMetrics(liveStatus)
  const visibleBriefing = buildBriefing(liveStatus)
  const visibleAgents = buildAgents(liveStatus)
  const visibleIntegrations = buildIntegrations(liveStatus)
  const normalizedQuery = query.trim().toLowerCase()
  const sectionVisible = (section: SectionId) =>
    activeSection === 'overview' || activeSection === section
  const filteredPipeline = useMemo(
    () =>
      pipeline.filter((item) =>
        matchesSearch(
          [item.title, item.platform, item.stage, item.owner, item.blocker],
          normalizedQuery,
        ),
      ),
    [normalizedQuery],
  )
  const filteredAgents = useMemo(
    () =>
      visibleAgents.filter((agent) =>
        matchesSearch(
          [agent.name, agent.role, agent.model, agent.status, agent.lastSignal],
          normalizedQuery,
        ),
      ),
    [normalizedQuery, visibleAgents],
  )
  const filteredIntegrations = useMemo(
    () =>
      visibleIntegrations.filter((integration) =>
        matchesSearch(
          [integration.name, integration.mode, integration.status],
          normalizedQuery,
        ),
      ),
    [normalizedQuery, visibleIntegrations],
  )
  const filteredBriefing = useMemo(
    () =>
      visibleBriefing.filter((item) =>
        matchesSearch([item.title, item.detail, item.owner], normalizedQuery),
      ),
    [normalizedQuery, visibleBriefing],
  )
  const filteredPerformanceSources = useMemo(
    () =>
      performanceSources.filter((source) =>
        matchesSearch([source], normalizedQuery),
      ),
    [normalizedQuery],
  )
  const filteredClientRows = useMemo(
    () =>
      clientRows.filter((client) => matchesSearch([client], normalizedQuery)),
    [normalizedQuery],
  )

  return (
    <main className="min-h-full bg-[var(--theme-bg)] px-4 pb-28 pt-14 text-[var(--theme-text)] md:px-8 md:py-6 lg:px-10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-5">
        <header className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-5 py-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <StatusPill tone="good">Phase 3 read-only</StatusPill>
                <StatusPill tone={liveStatus ? 'good' : 'warn'}>
                  {liveStatus ? 'Live local data' : 'Fixture fallback'}
                </StatusPill>
                <StatusPill tone="blocked">No browser secrets</StatusPill>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
                LL Empire
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-normal text-[var(--theme-text)] md:text-4xl">
                AI Ops Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
                Founder-operator cockpit for briefing, content pipeline, agent
                state, clients, and integration gates. Live cards use read-only
                local ops sources and keep external integrations disabled until
                credentials are approved.
              </p>
              <p className="mt-3 text-xs leading-5 text-[var(--theme-muted)]">
                Last refresh:{' '}
                {liveStatus?.fetchedAt ?? (statusQuery.isError ? 'failed' : 'loading')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-xs font-semibold transition-colors',
                    activeSection === section.id
                      ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)] text-black'
                      : 'border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-muted)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text)]',
                  )}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <label className="sr-only" htmlFor="ll-ops-search">
              Search dashboard
            </label>
            <input
              id="ll-ops-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pipeline, agents, clients, integrations..."
              className="min-h-10 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 text-sm text-[var(--theme-text)] outline-none transition-colors placeholder:text-[var(--theme-muted)] focus:border-[var(--theme-accent)]"
            />
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setReviewedItemTitle(null)
                setActiveSection('overview')
                void statusQuery.refetch()
              }}
              className="min-h-10 rounded-lg border border-[var(--theme-border)] px-3 text-xs font-semibold text-[var(--theme-text)] transition-colors hover:border-[var(--theme-accent)]"
            >
              Refresh and reset
            </button>
          </div>
          {statusQuery.isError ? (
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Live LL Ops status is unavailable. The dashboard is using safe
              fixture data until the read-only API can reach the configured
              local ops files and services.
            </div>
          ) : null}
          {reviewedItemTitle ? (
            <div className="mt-4 rounded-lg border border-[var(--theme-accent)] bg-[var(--theme-card2)] px-4 py-3 text-sm text-[var(--theme-text)]">
              Review selected: <strong>{reviewedItemTitle}</strong>
            </div>
          ) : null}
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {visibleMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold tabular-nums text-[var(--theme-text)]">
                    {metric.value}
                  </p>
                </div>
                <StatusPill tone={metric.tone}>
                  {liveStatus ? 'Live' : 'Fixture'}
                </StatusPill>
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--theme-muted)]">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>

        {sectionVisible('research') ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel title="Today's Briefing" icon={DashboardSquare01Icon}>
            <div className="divide-y divide-[var(--theme-border)]">
              {filteredBriefing.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-[var(--theme-text)]">
                        {item.title}
                      </h3>
                      <StatusPill tone={item.tone}>{item.owner}</StatusPill>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[var(--theme-muted)]">
                      {item.detail}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReviewedItemTitle(item.title)
                      setActiveSection('research')
                    }}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[var(--theme-border)] px-3 text-xs font-semibold text-[var(--theme-text)] hover:border-[var(--theme-accent)]"
                  >
                    Review
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={14}
                      strokeWidth={1.8}
                    />
                  </button>
                </div>
              ))}
              {filteredBriefing.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[var(--theme-muted)]">
                  No briefing rows match this search.
                </div>
              ) : null}
            </div>
          </Panel>

          <Panel title="Integration Gates" icon={Database01Icon}>
            <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 xl:grid-cols-1">
              {filteredIntegrations.map((item) => (
                <div
                  key={item.name}
                  className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-[var(--theme-text)]">
                      {item.name}
                    </p>
                    <StatusPill tone={item.tone}>{item.mode}</StatusPill>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                    {item.status}
                  </p>
                </div>
              ))}
              {filteredIntegrations.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--theme-border)] p-4 text-center text-sm text-[var(--theme-muted)]">
                  No integrations match this search.
                </div>
              ) : null}
            </div>
          </Panel>
        </div>
        ) : null}

        {sectionVisible('pipeline') || sectionVisible('agents') ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          {sectionVisible('pipeline') ? (
          <Panel
            title="Content Pipeline"
            icon={CheckListIcon}
            right={
              <span className="text-xs text-[var(--theme-muted)]">
                Six guarded stages
              </span>
            }
          >
            <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 2xl:grid-cols-3">
              {filteredPipeline.map((item) => (
                <article
                  key={item.title}
                  className="flex min-h-36 flex-col justify-between rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-4"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <StatusPill tone={item.blocker ? 'warn' : 'good'}>
                        {item.stage}
                      </StatusPill>
                      <span className="truncate text-xs font-semibold text-[var(--theme-muted)]">
                        {item.platform}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold leading-5 text-[var(--theme-text)]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="text-xs text-[var(--theme-muted)]">
                      Owner: {item.owner}
                    </p>
                    {item.blocker ? (
                      <span className="max-w-[55%] text-right text-[11px] font-semibold leading-4 text-amber-300">
                        {item.blocker}
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
              {filteredPipeline.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--theme-border)] p-6 text-center text-sm text-[var(--theme-muted)] md:col-span-2 2xl:col-span-3">
                  No pipeline items match this search.
                </div>
              ) : null}
            </div>
          </Panel>
          ) : null}

          {sectionVisible('agents') ? (
          <Panel title="Agent State" icon={UserGroupIcon}>
            <div className="divide-y divide-[var(--theme-border)]">
              {filteredAgents.map((agent) => (
                <div key={agent.name} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--theme-text)]">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-[var(--theme-muted)]">
                        {agent.role}
                      </p>
                    </div>
                    <StatusPill tone={agent.tone}>{agent.status}</StatusPill>
                  </div>
                  <p className="mt-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2 font-mono text-[11px] text-[var(--theme-muted)]">
                    {agent.model}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                    {agent.lastSignal}
                  </p>
                </div>
              ))}
              {filteredAgents.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[var(--theme-muted)]">
                  No agents match this search.
                </div>
              ) : null}
            </div>
          </Panel>
          ) : null}
        </div>
        ) : null}

        {sectionVisible('performance') ||
        sectionVisible('clients') ||
        sectionVisible('settings') ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {sectionVisible('performance') ? (
          <Panel
            title="Performance"
            icon={Analytics01Icon}
            className="xl:col-span-1"
          >
            <div className="space-y-3 p-4">
              {filteredPerformanceSources.map((source) => (
                <div
                  key={source}
                  className="rounded-lg border border-dashed border-[var(--theme-border)] bg-[var(--theme-card2)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--theme-text)]">
                      {source}
                    </p>
                    <StatusPill tone="idle">No live data</StatusPill>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--theme-border)]">
                    <div className="h-full w-1/3 rounded-full bg-[var(--theme-accent)] opacity-40" />
                  </div>
                </div>
              ))}
              {filteredPerformanceSources.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--theme-border)] p-6 text-center text-sm text-[var(--theme-muted)]">
                  No performance sources match this search.
                </div>
              ) : null}
            </div>
          </Panel>
          ) : null}

          {sectionVisible('clients') ? (
          <Panel title="Clients" icon={Rocket01Icon} className="xl:col-span-1">
            <div className="space-y-3 p-4">
              {filteredClientRows.map((client, index) => (
                <div
                  key={client}
                  className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--theme-text)]">
                      {client}
                    </p>
                    <span className="text-xs font-semibold tabular-nums text-[var(--theme-muted)]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
                    Fixture account row. Replace with CRM or LL Empire state
                    source after data approval.
                  </p>
                </div>
              ))}
              {filteredClientRows.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--theme-border)] p-6 text-center text-sm text-[var(--theme-muted)]">
                  No clients match this search.
                </div>
              ) : null}
            </div>
          </Panel>
          ) : null}

          {sectionVisible('settings') ? (
          <Panel
            title="Safety Contract"
            icon={Shield01Icon}
            className="xl:col-span-1"
          >
            <div className="space-y-3 p-4">
              {[
                'Secrets stay server-side.',
                'Every live metric gets source and timestamp.',
                'Infra and Hermes mutations require Chairman Brief.',
                'Fixture metrics cannot be reported as real performance.',
              ].map((rule) => (
                <div
                  key={rule}
                  className="flex items-start gap-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card2)] p-3"
                >
                  <HugeiconsIcon
                    icon={Settings01Icon}
                    size={16}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[var(--theme-accent)]"
                  />
                  <p className="text-xs leading-5 text-[var(--theme-muted)]">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
          ) : null}
        </div>
        ) : null}
      </div>
    </main>
  )
}
