'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MissionControlSnapshot = {
  generatedAt: string
  operationalStatus: 'ok' | 'review_required' | 'blocked'
  statusReasons: Array<string>
  organization: {
    core: { id: string; domain: string; mission: string } | null
    managers: Array<{ id: string; domain: string; mission: string }>
  }
  watchers: {
    total: number
    byManager: Record<
      string,
      Array<{
        id: string
        evidence: Array<string>
        riskClass: string | null
        runtimeStatus: string
      }>
    >
  }
  rooms: Array<{
    roomId: string
    ownerManager: string | null
    decisionRef: string | null
    riskClass: string | null
    kanbanTaskId: string
    kanbanStatus: string | null
  }>
  decisions: Array<{
    decisionRef: string
    roomId: string | null
    taskId: string
    status: string | null
  }>
  autonomy: {
    managers: Array<AutonomyManager>
  }
  kanban: {
    countsByStatus: Record<string, number>
    cards: Array<{ id: string; title: string; status?: string | null }>
  }
  mcpHonesty: { status: string; taskId?: string | null; reason: string }
  sideEffects: Array<{
    key: string
    label: string
    status: 'blocked'
    reason: string
  }>
  t29DecisionCockpit: T29DecisionCockpitSnapshot
  modulesRegistry?: ModulesRegistrySnapshot
  graph: {
    nodes: Array<{
      id: string
      kind: string
      label: string
      status?: string | null
    }>
    edges: Array<{ from: string; to: string; kind: string }>
  }
  sources: Array<{ kind: string; path?: string; status?: string | null }>
}

type T29DecisionCockpitSnapshot = {
  baseline: {
    james2Commit: string
    loureiroTechCommit: string
    board: string
  }
  boardGate: {
    safeBaselineCounts: { running: number; ready: number }
    t29Status: string
    t30Status: string
    t31Status: string
    quietExceptRealGates: boolean
  }
  campaignCenter: {
    mode: 'local-only/dry-run'
    endpoints: Array<string>
    realSideEffectsEnabled: false
    whatsappMessagesSent: 0
  }
  employeeLicenseBot: {
    lastLocalSmokeStatus: 'ok'
    employeeTelegramCheck: 'ok'
    atendimentoCheck: 'ok'
    expectedSanitizedReturn: string
    privacy: string
  }
  missingGates: Array<{ key: string; label: string; status: 'missing' }>
  realActionControl: {
    label: string
    enabled: false
    blockedBy: 'T29'
    reason: string
  }
}

type ModulesRegistrySnapshot = {
  source: { kind: string; status: string | null; path?: string }
  counts: { total: number; byKind: Record<string, number> }
  modules: Array<{
    module: string
    kinds: Array<string>
    ports: Array<number>
    paths: Array<string>
    processes: Array<string>
    dependencies: Array<string>
    visibility: Array<string>
    gates: Array<string>
    possibleSideEffects: Array<string>
    healthDeclared: unknown
    observedHealth?: {
      status: string
      source: string
      observedAt: string
      detail?: string
    }
    registrySource: { kind: string; status: string | null }
    riskFlags: Array<string>
  }>
  warnings: Array<string>
}

type AutonomyManager = {
  manager: string
  domain: string | null
  defaultTier: number
  effectiveTier: number
  trustScore: number
  riskCeilingWithoutApproval: string | null
  permissions: Array<{
    capabilityId: string
    riskClass: string
    tool: string
    gate: string
    watcher: string
    ledger: string
    approvalRequired: boolean
    enabled: boolean
    reason: string | null
  }>
  gates: Array<string>
  promotedCapabilities: Array<string>
  capabilityTiers: Record<string, number>
  reviewRequired: boolean
  gatesActive: boolean
  lastSignal: string | null
  lastDecisions: Array<{
    decisionRef: string
    roomId: string
    taskId: string
    status: string | null
  }>
  lastFailures: Array<{
    signal: string
    capabilityId: string | null
    evidenceRef: string | null
    sequence: number | null
  }>
  nextStepRecommended: string
}

type MissionControlResponse = {
  ok?: boolean
  snapshot?: MissionControlSnapshot | null
  error?: string
}

async function fetchMissionControl(): Promise<MissionControlSnapshot> {
  const res = await fetch('/api/james-mission-control')
  const data = (await res.json().catch(() => ({}))) as MissionControlResponse
  if (!res.ok || data.ok === false || !data.snapshot) {
    throw new Error(
      data.error || `Mission Control request failed: ${res.status}`,
    )
  }
  return data.snapshot
}

function statusLabel(
  status: MissionControlSnapshot['operationalStatus'],
): string {
  if (status === 'ok') return 'OK'
  if (status === 'blocked') return 'Blocked'
  return 'Review required'
}

function statusClass(
  status: MissionControlSnapshot['operationalStatus'],
): string {
  if (status === 'ok')
    return 'border-emerald-400/40 bg-emerald-500/10 text-emerald-700'
  if (status === 'blocked')
    return 'border-red-400/40 bg-red-500/10 text-red-700'
  return 'border-amber-400/40 bg-amber-500/10 text-amber-700'
}

function compactStatusCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  )
  return entries.length
    ? entries.map(([status, count]) => `${status}:${count}`).join(' · ')
    : 'no cards'
}

export function JamesMissionControlView({ className }: { className?: string }) {
  const query = useQuery({
    queryKey: ['james', 'mission-control'],
    queryFn: fetchMissionControl,
    refetchInterval: 10_000,
    staleTime: 5_000,
  })
  const snapshot = query.data
  const managersWithWatchers = useMemo(() => {
    if (!snapshot) return []
    return snapshot.organization.managers.map((manager) => ({
      manager,
      watchers: snapshot.watchers.byManager[manager.id] ?? [],
    }))
  }, [snapshot])

  if (query.isLoading) {
    return (
      <div
        className={cn(
          'rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 text-sm text-[var(--theme-muted)]',
          className,
        )}
      >
        Loading James Mission Control snapshot…
      </div>
    )
  }

  if (query.isError || !snapshot) {
    return (
      <div
        className={cn(
          'rounded-[1.5rem] border border-red-400/40 bg-red-500/10 p-6 text-sm text-red-700',
          className,
        )}
      >
        <div className="font-semibold">Mission Control unavailable</div>
        <div className="mt-1 text-xs">
          {query.error instanceof Error
            ? query.error.message
            : 'Could not load /api/james-mission-control.'}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('grid gap-3', className)}>
      <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4 shadow-[0_16px_48px_var(--theme-shadow)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              James Mission Control
            </div>
            <h2 className="mt-1 text-xl font-semibold text-[var(--theme-text)]">
              Core Director + Domain Managers + Rooms
            </h2>
            <p className="mt-1 max-w-3xl text-sm text-[var(--theme-muted-2)]">
              Evidence-only snapshot. Kanban is rendered as ledger/trail, MCP-15
              honesty is explicit, and all real side effects remain blocked.
            </p>
          </div>
          <span
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]',
              statusClass(snapshot.operationalStatus),
            )}
          >
            {statusLabel(snapshot.operationalStatus)}
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Metric
            label="Managers"
            value={snapshot.organization.managers.length}
          />
          <Metric label="Watchers" value={snapshot.watchers.total} />
          <Metric label="Rooms" value={snapshot.rooms.length} />
          <Metric
            label="Graph"
            value={`${snapshot.graph.nodes.length}/${snapshot.graph.edges.length}`}
            hint="nodes/edges"
          />
        </div>
        <div className="mt-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-muted)]">
          <span className="font-semibold text-[var(--theme-text)]">
            Status reasons:
          </span>{' '}
          {snapshot.statusReasons.join(' · ')}
        </div>
      </section>

      <T29DecisionCockpitPanel cockpit={snapshot.t29DecisionCockpit} />

      <ModulesRegistryPanel modulesRegistry={snapshot.modulesRegistry} />

      <div className="grid gap-3 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-[var(--theme-text)]">
              Organograma e watchers
            </h3>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
              registry-backed
            </span>
          </div>
          <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3">
            <div className="text-xs font-semibold text-[var(--theme-text)]">
              {snapshot.organization.core?.id ?? 'james.core.director missing'}
            </div>
            <div className="mt-1 text-xs text-[var(--theme-muted-2)]">
              {snapshot.organization.core?.mission ??
                'Core Director registry not available.'}
            </div>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {managersWithWatchers.map(({ manager, watchers }) => (
              <article
                key={manager.id}
                className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3"
              >
                <div className="text-xs font-semibold text-[var(--theme-text)]">
                  {manager.id}
                </div>
                <div className="mt-1 line-clamp-2 text-[11px] text-[var(--theme-muted-2)]">
                  {manager.mission}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {watchers.length ? (
                    watchers.map((watcher) => (
                      <span
                        key={watcher.id}
                        title={watcher.evidence.join(', ')}
                        className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2 py-0.5 text-[10px] text-[var(--theme-muted)]"
                      >
                        {watcher.id} · {watcher.riskClass ?? 'R?'}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-[var(--theme-muted)]">
                      no watcher in registry
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">
            MCP honesty + side-effect gates
          </h3>
          <div className="mt-3 rounded-xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-700">
            <div className="font-semibold">
              MCP-15: {snapshot.mcpHonesty.status}
            </div>
            <div className="mt-1">{snapshot.mcpHonesty.reason}</div>
          </div>
          <div className="mt-3 space-y-2">
            {snapshot.sideEffects.map((gate) => (
              <div
                key={gate.key}
                className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-700"
              >
                <div className="font-semibold">{gate.label} · blocked</div>
                <div className="mt-0.5 opacity-80">{gate.reason}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">
            Rooms e decisions
          </h3>
          <div className="mt-2 space-y-2">
            {snapshot.rooms.length ? (
              snapshot.rooms.map((room) => (
                <div
                  key={room.roomId}
                  className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs"
                >
                  <div className="font-semibold text-[var(--theme-text)]">
                    {room.roomId}
                  </div>
                  <div className="mt-1 text-[var(--theme-muted-2)]">
                    owner {room.ownerManager ?? 'unknown'} · decision{' '}
                    {room.decisionRef ?? 'pending'} · task {room.kanbanTaskId}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-4 text-xs text-[var(--theme-muted)]">
                No james_room_origin:v0 cards found yet.
              </div>
            )}
          </div>
        </section>
        <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">
            Kanban ledger
          </h3>
          <div className="mt-2 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-muted-2)]">
            {compactStatusCounts(snapshot.kanban.countsByStatus)}
          </div>
          <div className="mt-2 max-h-64 space-y-2 overflow-y-auto pr-1">
            {snapshot.kanban.cards.slice(0, 12).map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs"
              >
                <div className="truncate font-semibold text-[var(--theme-text)]">
                  {card.title}
                </div>
                <div className="mt-1 text-[var(--theme-muted)]">
                  {card.id} · {card.status ?? 'unknown'}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <AutonomyDashboardPanel autonomy={snapshot.autonomy} />
    </div>
  )
}

export function T29DecisionCockpitPanel({
  cockpit,
}: {
  cockpit: T29DecisionCockpitSnapshot
}) {
  const running = cockpit.boardGate.safeBaselineCounts.running
  const ready = cockpit.boardGate.safeBaselineCounts.ready
  return (
    <section className="rounded-[1.5rem] border border-red-400/30 bg-red-500/[0.06] p-4 shadow-[0_16px_48px_var(--theme-shadow)]">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">
            T29 / CAMP-7 decision cockpit
          </h3>
          <p className="mt-1 text-xs text-[var(--theme-muted-2)]">
            Local-only snapshot before any red-button decision. Real send controls
            are rendered disabled next to the gates that still block T29.
          </p>
        </div>
        <button
          type="button"
          disabled
          aria-label={`${cockpit.realActionControl.label} bloqueado por ${cockpit.realActionControl.blockedBy}`}
          className="cursor-not-allowed rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-red-700 opacity-80"
        >
          {cockpit.realActionControl.label}: blocked by{' '}
          {cockpit.realActionControl.blockedBy}
        </button>
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1.2fr]">
        <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs">
          <div className="mb-2 font-semibold text-[var(--theme-text)]">
            Baseline
          </div>
          <div className="space-y-1 text-[var(--theme-muted)]">
            <div>james-2 {cockpit.baseline.james2Commit}</div>
            <div>loureiro-tech {cockpit.baseline.loureiroTechCommit}</div>
            <div>{cockpit.baseline.board}</div>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs">
          <div className="mb-2 font-semibold text-[var(--theme-text)]">
            Board gate
          </div>
          <div className="space-y-1 text-[var(--theme-muted)]">
            <div>running={running} · ready={ready}</div>
            <div>T29 {cockpit.boardGate.t29Status}</div>
            <div>
              T30 {cockpit.boardGate.t30Status} · T31{' '}
              {cockpit.boardGate.t31Status}
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs">
          <div className="mb-2 font-semibold text-[var(--theme-text)]">
            Campaign Center readiness
          </div>
          <div className="space-y-1 text-[var(--theme-muted)]">
            <div>{cockpit.campaignCenter.mode}</div>
            {cockpit.campaignCenter.endpoints.map((endpoint) => (
              <div key={endpoint}>{endpoint}</div>
            ))}
            <div>
              real_side_effects_enabled=
              {String(cockpit.campaignCenter.realSideEffectsEnabled)}
            </div>
            <div>
              whatsapp_messages_sent=
              {cockpit.campaignCenter.whatsappMessagesSent}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs">
          <div className="mb-2 font-semibold text-[var(--theme-text)]">
            Funcionários /licenca smoke
          </div>
          <div className="space-y-1 text-[var(--theme-muted)]">
            <div>last local smoke status {cockpit.employeeLicenseBot.lastLocalSmokeStatus}</div>
            <div>employee_telegram_check={cockpit.employeeLicenseBot.employeeTelegramCheck}</div>
            <div>atendimento_check={cockpit.employeeLicenseBot.atendimentoCheck}</div>
            <div>{cockpit.employeeLicenseBot.expectedSanitizedReturn}</div>
          </div>
        </div>
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-xs">
          <div className="mb-2 font-semibold text-amber-800">
            Gates faltantes antes de T29
          </div>
          <div className="flex flex-wrap gap-1">
            {cockpit.missingGates.map((gate) => (
              <span
                key={gate.key}
                className="rounded-full border border-amber-400/40 bg-[var(--theme-bg)] px-2 py-0.5 text-amber-800"
              >
                {gate.label}
              </span>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-2 py-1 font-semibold text-red-700">
            {cockpit.realActionControl.reason}
          </div>
        </div>
      </div>
    </section>
  )
}

function safeJsonSummary(value: unknown): string {
  if (!value || typeof value !== 'object') return 'declared health: n/a'
  const text = JSON.stringify(value)
  return text.length > 120 ? `${text.slice(0, 117)}…` : text
}

export function ModulesRegistryPanel({
  modulesRegistry,
}: {
  modulesRegistry?: ModulesRegistrySnapshot
}) {
  if (!modulesRegistry) {
    return (
      <section className="rounded-[1.5rem] border border-dashed border-[var(--theme-border)] bg-[var(--theme-card)] p-4 text-xs text-[var(--theme-muted)]">
        Modules registry unavailable; Mission Control keeps registry state
        separate from observed health.
      </section>
    )
  }
  const kindSummary = Object.entries(modulesRegistry.counts.byKind)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([kind, count]) => `${kind}:${count}`)
    .join(' · ')

  return (
    <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">
            Modules registry
          </h3>
          <p className="mt-1 text-xs text-[var(--theme-muted-2)]">
            declared registry ≠ observed health; visual read-only map inside
            Workspace 3200.
          </p>
        </div>
        <span className="rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
          {modulesRegistry.source.kind} ·{' '}
          {modulesRegistry.source.status ?? 'unknown'}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Metric label="Modules" value={modulesRegistry.counts.total} />
        <Metric label="Kinds" value={kindSummary || 'none'} />
        <Metric
          label="Warnings"
          value={modulesRegistry.warnings.join(' · ') || 'none'}
        />
      </div>
      <div className="mt-3 grid gap-2 xl:grid-cols-2">
        {modulesRegistry.modules.map((module) => (
          <article
            key={module.module}
            data-testid={`module-registry-${module.module}`}
            className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-[var(--theme-text)]">
                  {module.module}
                </div>
                <div className="mt-1 text-[var(--theme-muted-2)]">
                  {module.kinds.join(' · ') || 'kind unknown'}
                  {module.visibility.includes('interno')
                    ? ' · internal only'
                    : ''}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {module.ports.length ? (
                  module.ports.map((port) => (
                    <span
                      key={port}
                      className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2 py-0.5 text-[var(--theme-muted)]"
                    >
                      :{port}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2 py-0.5 text-[var(--theme-muted)]">
                    no host port
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {module.gates.map((gate) => (
                <span
                  key={gate}
                  className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-amber-700"
                >
                  {gate}
                </span>
              ))}
              {module.riskFlags.map((flag) => (
                <span
                  key={flag}
                  className="rounded-full border border-red-400/30 bg-red-500/10 px-2 py-0.5 text-red-700"
                >
                  {flag}
                </span>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-[var(--theme-muted)]">
              depends: {module.dependencies.join(' · ') || 'none declared'}
            </div>
            <div className="mt-1 text-[11px] text-[var(--theme-muted)]">
              declared: {safeJsonSummary(module.healthDeclared)}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-amber-700">
              observed:{' '}
              {module.observedHealth?.status ?? 'not probed by registry'}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function AutonomyDashboardPanel({
  autonomy,
}: {
  autonomy: MissionControlSnapshot['autonomy']
}) {
  const managers = autonomy.managers
  return (
    <section className="rounded-[1.5rem] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--theme-text)]">
            Autonomy dashboard
          </h3>
          <p className="mt-1 text-xs text-[var(--theme-muted-2)]">
            Manager tier, trust_score, permissions, gates, recent
            decisions/failures and recommended next step.
          </p>
        </div>
        <span className="rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
          read-only
        </span>
      </div>
      <div className="grid gap-3 xl:grid-cols-2">
        {managers.length ? (
          managers.map((manager) => (
            <article
              key={manager.manager}
              data-testid={`autonomy-manager-${manager.manager}`}
              className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] p-3 text-xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-[var(--theme-text)]">
                    {manager.manager}
                  </div>
                  <div className="mt-1 text-[var(--theme-muted-2)]">
                    {manager.domain ?? 'unknown domain'} · default Tier{' '}
                    {manager.defaultTier}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-700">
                    Tier {manager.effectiveTier}
                  </span>
                  <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2 py-0.5 text-[var(--theme-muted)]">
                    trust_score {manager.trustScore}
                  </span>
                  <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-card2)] px-2 py-0.5 text-[var(--theme-muted)]">
                    {manager.riskCeilingWithoutApproval ?? 'R?'} ceiling
                  </span>
                </div>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <AutonomyList
                  title="Permissions"
                  empty="no capability registry entries"
                >
                  {manager.permissions.slice(0, 6).map((permission) => (
                    <li
                      key={permission.capabilityId}
                      className={cn(
                        'rounded-lg border px-2 py-1',
                        permission.enabled
                          ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-700'
                          : 'border-amber-400/30 bg-amber-500/10 text-amber-700',
                      )}
                    >
                      <div className="font-semibold">
                        {permission.capabilityId}
                      </div>
                      <div className="opacity-80">
                        {permission.riskClass} · {permission.gate} ·{' '}
                        {permission.ledger}
                      </div>
                    </li>
                  ))}
                </AutonomyList>
                <AutonomyList title="Gates" empty="no gates">
                  {manager.gates.map((gate) => (
                    <li
                      key={gate}
                      className="rounded-lg border border-[var(--theme-border)] px-2 py-1 text-[var(--theme-muted)]"
                    >
                      {gate}
                    </li>
                  ))}
                </AutonomyList>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <AutonomyList title="Últimas decisões" empty="no decisions yet">
                  {manager.lastDecisions.map((decision) => (
                    <li
                      key={decision.decisionRef}
                      className="rounded-lg border border-[var(--theme-border)] px-2 py-1 text-[var(--theme-muted)]"
                    >
                      {decision.decisionRef}
                      <div className="opacity-70">
                        {decision.taskId} · {decision.status ?? 'unknown'}
                      </div>
                    </li>
                  ))}
                </AutonomyList>
                <AutonomyList title="Últimas falhas" empty="no failures">
                  {manager.lastFailures.map((failure) => (
                    <li
                      key={`${failure.sequence}-${failure.signal}`}
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-2 py-1 text-red-700"
                    >
                      {failure.signal}
                      <div className="opacity-80">
                        {failure.capabilityId ?? 'manager'} ·{' '}
                        {failure.evidenceRef ?? 'no evidence ref'}
                      </div>
                    </li>
                  ))}
                </AutonomyList>
              </div>
              <div className="mt-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card2)] px-3 py-2 text-[var(--theme-muted)]">
                <span className="font-semibold text-[var(--theme-text)]">
                  Next step:
                </span>{' '}
                {manager.nextStepRecommended}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-4 text-xs text-[var(--theme-muted)]">
            No autonomy projection available yet.
          </div>
        )}
      </div>
    </section>
  )
}

function AutonomyList({
  title,
  empty,
  children,
}: {
  title: string
  empty: string
  children: ReactNode
}) {
  const hasItems = Array.isArray(children)
    ? children.length > 0
    : Boolean(children)
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {title}
      </div>
      <ul className="space-y-1">
        {hasItems ? (
          children
        ) : (
          <li className="rounded-lg border border-dashed border-[var(--theme-border)] px-2 py-1 text-[var(--theme-muted)]">
            {empty}
          </li>
        )}
      </ul>
    </div>
  )
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-[var(--theme-text)]">
        {value}
      </div>
      {hint ? (
        <div className="text-[10px] text-[var(--theme-muted-2)]">{hint}</div>
      ) : null}
    </div>
  )
}
