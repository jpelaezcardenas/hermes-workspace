import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'

import { getKanbanBackendMeta, listKanbanCards } from './kanban-backend'
import { getUserHomeForHermesRoot } from './claude-paths'
import type { KanbanBackendMeta } from './kanban-backend'

type RegistryObject = Record<string, unknown>

type RegistryAgent = {
  agent_id?: string
  domain?: string
  mission?: string
  owns?: unknown
  can?: unknown
  cannot?: unknown
  heartbeat_seconds?: unknown
}

type RegistryWatcher = {
  watcher_id?: string
  manager?: string
  evidence?: unknown
  cadence_seconds?: unknown
  risk_class?: unknown
  action_policy?: string
}

type RegistryCapability = {
  capability_id?: string
  manager?: string
  risk_class?: string
  tool?: string
  gate?: string
  watcher?: string
  ledger?: string
  approval_required?: unknown
}

type JamesModuleKind =
  | 'ui'
  | 'api'
  | 'worker'
  | 'provider'
  | 'mcp'
  | 'runtime'
  | 'gate'
type JamesModuleRiskFlag =
  | 'side_effect_sensitive'
  | 'host_boundary'
  | 'financial'
  | 'whatsapp'
  | 'internal_worker'
  | 'gate_blocked'

type RegistryModule = {
  module_id?: string
  module?: string
  type?: unknown
  ports?: unknown
  repo_paths?: unknown
  path_repo?: unknown
  containers?: unknown
  process_container?: unknown
  endpoints?: unknown
  dependencies?: unknown
  visibility?: unknown
  gates?: unknown
  possible_side_effects?: unknown
  health_status_endpoint?: unknown
  source?: string
}

export type JamesModuleRegistryCard = {
  module: string
  kinds: Array<JamesModuleKind>
  ports: Array<number>
  paths: Array<string>
  processes: Array<string>
  dependencies: Array<string>
  visibility: Array<string>
  gates: Array<string>
  possibleSideEffects: Array<string>
  healthDeclared: unknown
  observedHealth?: {
    status: 'unknown' | 'ok' | 'degraded' | 'failed'
    source: string
    observedAt: string
    detail?: string
  }
  registrySource: { kind: 'canonical'; status: string | null }
  riskFlags: Array<JamesModuleRiskFlag>
}

type TrustLedgerEntry = {
  sequence?: number
  event?: {
    manager?: string
    signal?: string
    delta?: number
    capability_id?: string | null
    evidence_ref?: string
    trust_score_after?: number
  }
}

export type MissionControlKanbanCard = {
  id: string
  title: string
  spec?: string | null
  status?: string | null
  assignedWorker?: string | null
  createdAt?: number
  updatedAt?: number
  latestRun?: {
    summary?: string | null
    outcome?: string | null
    status?: string | null
    metadata?: unknown
  } | null
  comments?: Array<string>
}

export type JamesMissionControlStatus = 'ok' | 'review_required' | 'blocked'
export type JamesMcpHonestyStatus =
  | 'visible'
  | 'available_outside_workspace'
  | 'review_failed'
  | 'unavailable'

export type JamesT29DecisionCockpit = {
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
  missingGates: Array<{
    key: string
    label: string
    status: 'missing'
  }>
  realActionControl: {
    label: string
    enabled: false
    blockedBy: 'T29'
    reason: string
  }
}

export type JamesMissionControlSnapshot = {
  generatedAt: string
  operationalStatus: JamesMissionControlStatus
  statusReasons: Array<string>
  organization: {
    core: MissionControlAgent | null
    managers: Array<MissionControlAgent>
  }
  watchers: {
    total: number
    byManager: Record<string, Array<MissionControlWatcher>>
  }
  rooms: Array<MissionControlRoom>
  decisions: Array<MissionControlDecision>
  autonomy: {
    managers: Array<MissionControlAutonomyManager>
  }
  kanban: {
    backend?: KanbanBackendMeta | null
    countsByStatus: Record<string, number>
    cards: Array<MissionControlKanbanCard>
  }
  mcpHonesty: {
    status: JamesMcpHonestyStatus
    taskId?: string | null
    reason: string
  }
  sideEffects: Array<{
    key: string
    label: string
    status: 'blocked'
    reason: string
  }>
  t29DecisionCockpit: JamesT29DecisionCockpit
  modulesRegistry?: {
    source: { kind: 'canonical'; status: string | null; path?: string }
    counts: { total: number; byKind: Record<string, number> }
    modules: Array<JamesModuleRegistryCard>
    warnings: Array<string>
  }
  graph: {
    nodes: Array<{
      id: string
      kind:
        | 'core'
        | 'manager'
        | 'watcher'
        | 'room'
        | 'decision'
        | 'kanban'
        | 'gate'
        | 'module'
        | 'port'
      label: string
      status?: string | null
    }>
    edges: Array<{
      from: string
      to: string
      kind:
        | 'directs'
        | 'observed_by'
        | 'tracked_by'
        | 'decides'
        | 'blocked_by'
        | 'depends_on'
        | 'exposes'
        | 'rendered_in'
        | 'may_trigger_side_effect'
    }>
  }
  sources: Array<{
    kind: 'registry' | 'kanban' | 'mcp' | 'watcher' | 'autonomy'
    path?: string
    status?: string | null
  }>
}

export type MissionControlAutonomyPermission = {
  capabilityId: string
  riskClass: string
  tool: string
  gate: string
  watcher: string
  ledger: string
  approvalRequired: boolean
  enabled: boolean
  reason: string | null
}

export type MissionControlAutonomyEvent = {
  signal: string
  capabilityId: string | null
  evidenceRef: string | null
  sequence: number | null
}

export type MissionControlAutonomyDecision = {
  decisionRef: string
  roomId: string
  taskId: string
  status: string | null
}

export type MissionControlAutonomyManager = {
  manager: string
  domain: string | null
  defaultTier: number
  effectiveTier: number
  trustScore: number
  riskCeilingWithoutApproval: string | null
  permissions: Array<MissionControlAutonomyPermission>
  gates: Array<string>
  promotedCapabilities: Array<string>
  capabilityTiers: Record<string, number>
  reviewRequired: boolean
  gatesActive: boolean
  lastSignal: string | null
  lastDecisions: Array<MissionControlAutonomyDecision>
  lastFailures: Array<MissionControlAutonomyEvent>
  nextStepRecommended: string
}

export type MissionControlAgent = {
  id: string
  domain: string
  mission: string
  owns: Array<string>
  can: Array<string>
  cannot: Array<string>
  heartbeatSeconds: number | null
}

export type MissionControlWatcher = {
  id: string
  manager: string
  evidence: Array<string>
  cadenceSeconds: number | null
  riskClass: string | null
  actionPolicy: string | null
  runtimeStatus: 'registry_only' | 'review_required'
}

export type MissionControlRoom = {
  roomId: string
  ownerManager: string | null
  decisionRef: string | null
  riskClass: string | null
  kanbanTaskId: string
  kanbanStatus: string | null
}

export type MissionControlDecision = {
  decisionRef: string
  source: 'kanban'
  roomId: string | null
  taskId: string
  status: string | null
}

export type BuildMissionControlSnapshotInput = {
  agentsRegistry: RegistryObject
  watchersRegistry: RegistryObject
  modulesRegistry?: RegistryObject
  capabilitiesRegistry?: RegistryObject
  trustLedgerEntries?: Array<TrustLedgerEntry>
  kanbanCards: Array<MissionControlKanbanCard>
  kanbanBackend?: KanbanBackendMeta | null
  registryPaths?: {
    agents?: string
    watchers?: string
    modules?: string
    capabilities?: string
    trustLedger?: string
  }
  now?: number
}

const USER_HOME = getUserHomeForHermesRoot()
const DEFAULT_JAMES_REGISTRY_DIR =
  process.env.JAMES_ORGANIZATION_REGISTRY_DIR ??
  path.join(
    USER_HOME,
    'ops',
    'james-2',
    'docs',
    'james-organization',
    'registries',
  )

export const DEFAULT_JAMES_AGENTS_REGISTRY = path.join(
  DEFAULT_JAMES_REGISTRY_DIR,
  'james_agents_registry.yaml',
)
export const DEFAULT_JAMES_WATCHERS_REGISTRY = path.join(
  DEFAULT_JAMES_REGISTRY_DIR,
  'james_watchers_registry.yaml',
)
export const DEFAULT_JAMES_MODULES_REGISTRY = path.join(
  DEFAULT_JAMES_REGISTRY_DIR,
  'james_modules_registry.yaml',
)
export const DEFAULT_JAMES_CAPABILITIES_REGISTRY = path.join(
  DEFAULT_JAMES_REGISTRY_DIR,
  'james_capabilities_registry.yaml',
)
export const DEFAULT_JAMES_TRUST_LEDGER =
  process.env.JAMES_TRUST_LEDGER_PATH ??
  path.join(
    USER_HOME,
    'ops',
    'james-2',
    '.runtime',
    'trust-score-ledger',
    'james-trust-score-ledger.jsonl',
  )
export const DEFAULT_JAMES_KANBAN_DB =
  process.env.HERMES_KANBAN_DB ??
  path.join(
    USER_HOME,
    '.hermes',
    'kanban',
    'boards',
    'james-despachante',
    'kanban.db',
  )

const SIDE_EFFECT_GATES: JamesMissionControlSnapshot['sideEffects'] = [
  {
    key: 'real_whatsapp',
    label: 'WhatsApp real',
    status: 'blocked',
    reason: 'requires explicit Ugo approval; customer channel side effect',
  },
  {
    key: 'pix_santander',
    label: 'Pix/Santander real',
    status: 'blocked',
    reason: 'financial R5 side effect; not executable from Mission Control MVP',
  },
  {
    key: 'host_mutation',
    label: 'HOST mutativo',
    status: 'blocked',
    reason: 'requires ops handoff/review; Workspace remains read-only for HOST',
  },
  {
    key: 'providers_secrets_auth_env',
    label: 'Providers/secrets/auth/.env',
    status: 'blocked',
    reason: 'credential/provider changes are outside this UI/API MVP',
  },
  {
    key: 't29_camp7',
    label: 'T29/CAMP-7',
    status: 'blocked',
    reason:
      'pilot/campaign gates remain blocked until separate explicit approval',
  },
]

const T29_MISSING_GATES: JamesT29DecisionCockpit['missingGates'] = [
  { key: 'approval_ref', label: 'approval_ref explícito do Ugo', status: 'missing' },
  { key: 'lote', label: 'lote piloto definido', status: 'missing' },
  { key: 'allowlist', label: 'allowlist de destinatários', status: 'missing' },
  { key: 'janela', label: 'janela operacional aprovada', status: 'missing' },
  { key: 'limite', label: 'limite de volume/frequência', status: 'missing' },
  {
    key: 'mensagem_aprovada',
    label: 'mensagem final aprovada',
    status: 'missing',
  },
  { key: 'kill_switch', label: 'kill switch validado', status: 'missing' },
  { key: 'rollback', label: 'rollback definido', status: 'missing' },
  { key: 'stop_criteria', label: 'critérios de parada', status: 'missing' },
  {
    key: 'humano_disponivel',
    label: 'humano disponível durante a janela',
    status: 'missing',
  },
]

function normalizeGateStatus(status: string | null | undefined, fallback: string): string {
  if (!status) return fallback
  return status === 'todo' ? 'todo/gated' : status
}

function statusForGateCard(
  cards: Array<MissionControlKanbanCard>,
  gateKey: 'T29' | 'T30' | 'T31',
  fallback: string,
): string {
  const titlePrefix = `${gateKey} —`
  const card = cards.find((item) => item.title.startsWith(titlePrefix))
  return normalizeGateStatus(card?.status, fallback)
}

function buildT29DecisionCockpit(
  cards: Array<MissionControlKanbanCard>,
): JamesT29DecisionCockpit {
  const statusCounts = countsByStatus(cards)

  return {
    baseline: {
      james2Commit: '8b42392',
      loureiroTechCommit: '07280cd',
      board: 'james-despachante quiet except real gates',
    },
    boardGate: {
      safeBaselineCounts: {
        running: statusCounts.running ?? 0,
        ready: statusCounts.ready ?? 0,
      },
      t29Status: statusForGateCard(cards, 'T29', 'blocked'),
      t30Status: statusForGateCard(cards, 'T30', 'todo/gated'),
      t31Status: statusForGateCard(cards, 'T31', 'todo/gated'),
      quietExceptRealGates: true,
    },
    campaignCenter: {
      mode: 'local-only/dry-run',
      endpoints: [
        'http://127.0.0.1:18089/health',
        'http://127.0.0.1:18089/campaign-center/status',
      ],
      realSideEffectsEnabled: false,
      whatsappMessagesSent: 0,
    },
    employeeLicenseBot: {
      lastLocalSmokeStatus: 'ok',
      employeeTelegramCheck: 'ok',
      atendimentoCheck: 'ok',
      expectedSanitizedReturn:
        'Licenciamento encontrado. Honorário visível: R$ 30,00. Dados sensíveis ocultos.',
      privacy: 'sensitive identifiers omitted from cockpit snapshot',
    },
    missingGates: T29_MISSING_GATES,
    realActionControl: {
      label: 'Enviar campanha real',
      enabled: false,
      blockedBy: 'T29',
      reason: 'T29/CAMP-7 remains blocked; Mission Control is local-only/dry-run.',
    },
  }
}

function asStringArray(value: unknown): Array<string> {
  return Array.isArray(value)
    ? value
        .filter(
          (item): item is string =>
            typeof item === 'string' && item.trim().length > 0,
        )
        .map((item) => item.trim())
    : []
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function asBoolean(value: unknown): boolean {
  return value === true
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : null
}

function registryStatus(registry: RegistryObject): string | null {
  return typeof registry.status === 'string' && registry.status.trim()
    ? registry.status.trim()
    : null
}

function normalizeAgent(agent: RegistryAgent): MissionControlAgent | null {
  const id = typeof agent.agent_id === 'string' ? agent.agent_id.trim() : ''
  if (!id) return null
  return {
    id,
    domain: typeof agent.domain === 'string' ? agent.domain : 'unknown',
    mission: typeof agent.mission === 'string' ? agent.mission : '',
    owns: asStringArray(agent.owns),
    can: asStringArray(agent.can),
    cannot: asStringArray(agent.cannot),
    heartbeatSeconds: asNumber(agent.heartbeat_seconds),
  }
}

function normalizeWatcher(
  watcher: RegistryWatcher,
  registryRequiresReview: boolean,
): MissionControlWatcher | null {
  const id =
    typeof watcher.watcher_id === 'string' ? watcher.watcher_id.trim() : ''
  const manager =
    typeof watcher.manager === 'string' ? watcher.manager.trim() : ''
  if (!id || !manager) return null
  return {
    id,
    manager,
    evidence: asStringArray(watcher.evidence),
    cadenceSeconds: asNumber(watcher.cadence_seconds),
    riskClass:
      typeof watcher.risk_class === 'string' ? watcher.risk_class : null,
    actionPolicy:
      typeof watcher.action_policy === 'string' ? watcher.action_policy : null,
    runtimeStatus: registryRequiresReview ? 'review_required' : 'registry_only',
  }
}

function asNumberArray(value: unknown): Array<number> {
  return Array.isArray(value)
    ? value.filter(
        (item): item is number =>
          typeof item === 'number' && Number.isFinite(item),
      )
    : []
}

function normalizeModuleKind(value: string): JamesModuleKind | null {
  return ['ui', 'api', 'worker', 'provider', 'mcp', 'runtime', 'gate'].includes(
    value,
  )
    ? (value as JamesModuleKind)
    : null
}

function moduleRiskFlags(
  module: RegistryModule,
  kinds: Array<JamesModuleKind>,
  visibility: Array<string>,
  gates: Array<string>,
  possibleSideEffects: Array<string>,
): Array<JamesModuleRiskFlag> {
  const blob = [
    module.module,
    module.module_id,
    ...kinds,
    ...visibility,
    ...gates,
    ...possibleSideEffects,
  ]
    .join(' ')
    .toLowerCase()
  const flags = new Set<JamesModuleRiskFlag>()
  if (kinds.includes('worker') && visibility.includes('interno'))
    flags.add('internal_worker')
  if (gates.length || /blocked|bloquead|t29|camp-7|approval|gate/.test(blob))
    flags.add('gate_blocked')
  if (
    /side_effect|send|envio|campanha|campaign|provider|approval|host|pix|santander|whatsapp/.test(
      blob,
    )
  )
    flags.add('side_effect_sensitive')
  if (/host/.test(blob)) flags.add('host_boundary')
  if (/pix|santander|financial|financeira/.test(blob)) flags.add('financial')
  if (/whatsapp|baileys|evolution/.test(blob)) flags.add('whatsapp')
  return [...flags].sort()
}

function normalizeModule(
  module: RegistryModule,
  sourceStatus: string | null,
): JamesModuleRegistryCard | null {
  const id = asString(module.module) ?? asString(module.module_id)
  if (!id) return null
  const kinds = asStringArray(module.type).flatMap(
    (kind) => normalizeModuleKind(kind) ?? [],
  )
  const repoPaths = asStringArray(module.repo_paths)
  const pathRepo = asStringArray(module.path_repo)
  const processes = [
    ...asStringArray(module.process_container),
    ...asStringArray(module.containers),
  ]
  const visibility = asStringArray(module.visibility)
  const gates = asStringArray(module.gates)
  const possibleSideEffects = asStringArray(module.possible_side_effects)
  return {
    module: id,
    kinds,
    ports: asNumberArray(module.ports),
    paths: [
      ...new Set([
        ...repoPaths,
        ...pathRepo,
        ...asStringArray(module.endpoints),
      ]),
    ],
    processes: [...new Set(processes)],
    dependencies: asStringArray(module.dependencies),
    visibility,
    gates,
    possibleSideEffects,
    healthDeclared: module.health_status_endpoint,
    registrySource: { kind: 'canonical', status: sourceStatus },
    riskFlags: moduleRiskFlags(
      module,
      kinds,
      visibility,
      gates,
      possibleSideEffects,
    ),
  }
}

function buildModulesRegistry(
  registry: RegistryObject,
  registryPath?: string,
): JamesMissionControlSnapshot['modulesRegistry'] | undefined {
  const rawModules = Array.isArray(registry.modules)
    ? (registry.modules as Array<RegistryModule>)
    : []
  const status = registryStatus(registry)
  const modules = rawModules
    .map((module) => normalizeModule(module, status))
    .filter((module): module is JamesModuleRegistryCard => Boolean(module))
  if (!modules.length) return undefined
  const byKind = modules.reduce<Record<string, number>>(
    (acc, module) => {
      for (const kind of module.kinds) acc[kind] = (acc[kind] ?? 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  return {
    source: {
      kind: 'canonical',
      status,
      ...(registryPath ? { path: registryPath } : {}),
    },
    counts: { total: modules.length, byKind },
    modules,
    warnings: [
      'declared_registry_is_not_observed_health',
      'read_only_no_runtime_probe',
    ],
  }
}

function extractKv(text: string, key: string): string | null {
  const match = text.match(new RegExp(`^\\s*${key}\\s*:\\s*(.+?)\\s*$`, 'im'))
  const value = match?.[1]?.trim()
  return value ? value.replace(/^['"]|['"]$/g, '') : null
}

function stringifyMetadata(metadata: unknown): string {
  if (!metadata) return ''
  if (typeof metadata === 'string') return metadata
  if (typeof metadata === 'object' && !Array.isArray(metadata)) {
    return Object.entries(metadata as Record<string, unknown>)
      .filter(
        ([, value]) =>
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean',
      )
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join('\n')
  }
  return ''
}

function extractRoomFromText(
  card: MissionControlKanbanCard,
  text: string,
): MissionControlRoom | null {
  const roomId = extractKv(text, 'room_id')
  if (!roomId) return null
  return {
    roomId,
    ownerManager:
      extractKv(text, 'owner_manager') ?? extractKv(text, 'opened_by'),
    decisionRef: extractKv(text, 'decision_ref'),
    riskClass: extractKv(text, 'risk_class'),
    kanbanTaskId: card.id,
    kanbanStatus: card.status ?? null,
  }
}

function mergeRoomEvidence(
  existing: MissionControlRoom | undefined,
  next: MissionControlRoom,
): MissionControlRoom {
  return {
    roomId: existing?.roomId ?? next.roomId,
    ownerManager: next.ownerManager ?? existing?.ownerManager ?? null,
    decisionRef: next.decisionRef ?? existing?.decisionRef ?? null,
    riskClass: next.riskClass ?? existing?.riskClass ?? null,
    kanbanTaskId: next.kanbanTaskId,
    kanbanStatus: next.kanbanStatus ?? existing?.kanbanStatus ?? null,
  }
}

function extractRooms(
  cards: Array<MissionControlKanbanCard>,
): Array<MissionControlRoom> {
  return cards.flatMap((card) => {
    const byId = new Map<string, MissionControlRoom>()
    const spec = card.spec ?? ''
    if (/james_room_origin:v0/i.test(spec)) {
      const room = extractRoomFromText(card, spec)
      if (room)
        byId.set(room.roomId, mergeRoomEvidence(byId.get(room.roomId), room))
    }

    const metadataRoom = extractRoomFromText(
      card,
      stringifyMetadata(card.latestRun?.metadata),
    )
    if (metadataRoom)
      byId.set(
        metadataRoom.roomId,
        mergeRoomEvidence(byId.get(metadataRoom.roomId), metadataRoom),
      )

    for (const text of Array.isArray(card.comments) ? card.comments : []) {
      const room = extractRoomFromText(card, text)
      if (room && byId.has(room.roomId))
        byId.set(room.roomId, mergeRoomEvidence(byId.get(room.roomId), room))
    }
    return [...byId.values()]
  })
}

function extractDecisions(
  rooms: Array<MissionControlRoom>,
): Array<MissionControlDecision> {
  return rooms.flatMap((room) =>
    room.decisionRef
      ? [
          {
            decisionRef: room.decisionRef,
            source: 'kanban' as const,
            roomId: room.roomId,
            taskId: room.kanbanTaskId,
            status: room.kanbanStatus,
          },
        ]
      : [],
  )
}

const TIER_FLOORS: Record<number, number> = { 0: 0, 1: 50, 2: 60, 3: 75, 4: 90 }
const PROMOTION_SIGNALS: Partial<Record<string, number>> = {
  clean_reviews: 5,
  watcher_ok_after_apply: 5,
  useful_blocker: 5,
  low_noise_escalation: 5,
  accurate_dependency_detection: 5,
}
const DEMOTION_SIGNALS: Partial<Record<string, number>> = {
  failed_watcher_after_apply: -15,
  unauthorized_scope_attempt: -15,
  repeated_bad_plan: -10,
  ignored_legitimate_blocker: -10,
  noisy_escalation: -5,
}
const REVIEW_SIGNALS = new Set(Object.keys(DEMOTION_SIGNALS))

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.trunc(score)))
}

function tierForScore(score: number): number {
  if (score >= TIER_FLOORS[4]) return 4
  if (score >= TIER_FLOORS[3]) return 3
  if (score >= TIER_FLOORS[2]) return 2
  if (score >= TIER_FLOORS[1]) return 1
  return 0
}

function registryDefaults(registry: RegistryObject): RegistryObject {
  return registry.defaults &&
    typeof registry.defaults === 'object' &&
    !Array.isArray(registry.defaults)
    ? (registry.defaults as RegistryObject)
    : {}
}

function normalizeCapabilities(
  registry: RegistryObject,
): Array<MissionControlAutonomyPermission & { manager: string }> {
  const capabilities = Array.isArray(registry.capabilities)
    ? (registry.capabilities as Array<RegistryCapability>)
    : []
  return capabilities.flatMap((capability) => {
    const manager = asString(capability.manager)
    const capabilityId = asString(capability.capability_id)
    if (!manager || !capabilityId) return []
    return [
      {
        manager,
        capabilityId,
        riskClass: asString(capability.risk_class) ?? 'R?',
        tool: asString(capability.tool) ?? 'unknown_tool',
        gate: asString(capability.gate) ?? 'unknown_gate',
        watcher: asString(capability.watcher) ?? 'unknown_watcher',
        ledger: asString(capability.ledger) ?? 'unknown',
        approvalRequired: asBoolean(capability.approval_required),
        enabled: false,
        reason: null,
      },
    ]
  })
}

function eventDelta(signal: string, event: TrustLedgerEntry['event']): number {
  if (typeof event?.delta === 'number' && Number.isFinite(event.delta))
    return event.delta
  return PROMOTION_SIGNALS[signal] ?? DEMOTION_SIGNALS[signal] ?? 0
}

function eventPayload(
  entry: TrustLedgerEntry,
  index: number,
): MissionControlAutonomyEvent | null {
  const event = entry.event
  const signal = asString(event?.signal)
  if (!signal) return null
  return {
    signal,
    capabilityId: asString(event?.capability_id) ?? null,
    evidenceRef: asString(event?.evidence_ref) ?? null,
    sequence: typeof entry.sequence === 'number' ? entry.sequence : index + 1,
  }
}

function nextStepForAutonomy(manager: MissionControlAutonomyManager): string {
  if (manager.reviewRequired) return 'open_review_room_before_more_autonomy'
  if (manager.effectiveTier >= 2)
    return 'maintain_tier_2_with_watcher_and_ledger'
  if (
    manager.trustScore >= TIER_FLOORS[2] &&
    manager.permissions.some((permission) => permission.riskClass === 'R1')
  ) {
    return 'promote_capability_only_after_clean_review'
  }
  return 'collect_clean_review_and_watcher_evidence'
}

function buildAutonomyDashboard(
  agents: Array<MissionControlAgent>,
  agentsRegistry: RegistryObject,
  capabilitiesRegistry: RegistryObject,
  trustLedgerEntries: Array<TrustLedgerEntry>,
  rooms: Array<MissionControlRoom>,
): JamesMissionControlSnapshot['autonomy'] {
  const rawAgents = Array.isArray(agentsRegistry.agents)
    ? (agentsRegistry.agents as Array<RegistryObject>)
    : []
  const agentDefaults = registryDefaults(agentsRegistry)
  const rawAgentById = new Map(
    rawAgents.map((agent) => [asString(agent.agent_id) ?? '', agent]),
  )
  const capabilities = normalizeCapabilities(capabilitiesRegistry)
  const capabilitiesByManager = capabilities.reduce<
    Record<string, Array<MissionControlAutonomyPermission>>
  >((acc, item) => {
    const { manager, ...permission } = item
    acc[manager] = [...(acc[manager] ?? []), permission]
    return acc
  }, {})

  const managers = agents.map((agent) => {
    const rawAgent = rawAgentById.get(agent.id) ?? {}
    let score =
      asNumber(rawAgent.trust_score) ??
      asNumber(agentDefaults.trust_score) ??
      50
    const defaultTier =
      asNumber(rawAgent.autonomy_tier) ??
      asNumber(agentDefaults.autonomy_tier) ??
      1
    const riskCeilingWithoutApproval =
      asString(rawAgent.risk_ceiling_without_approval) ??
      asString(agentDefaults.risk_ceiling_without_approval) ??
      'R2'
    const promotedCapabilities = new Set<string>()
    const capabilityTiers: Record<string, number> = {}
    const failures: Array<MissionControlAutonomyEvent> = []
    let forcedTier: number | undefined
    let reviewRequired = false
    let lastSignal: string | null = null

    trustLedgerEntries.forEach((entry, index) => {
      const event = entry.event
      if (event?.manager !== agent.id) return
      const signal = asString(event.signal)
      if (!signal) return
      lastSignal = signal
      score = clampScore(score + eventDelta(signal, event))
      const capability = asString(event.capability_id)
      if (signal in PROMOTION_SIGNALS && capability && score >= TIER_FLOORS[2])
        promotedCapabilities.add(capability)
      if (signal in DEMOTION_SIGNALS && capability)
        promotedCapabilities.delete(capability)
      if (signal === 'failed_watcher_after_apply') {
        forcedTier = 1
        reviewRequired = true
      } else if (signal === 'unauthorized_scope_attempt') {
        forcedTier = 0
        reviewRequired = true
      } else if (REVIEW_SIGNALS.has(signal)) {
        reviewRequired = true
      }
      if (REVIEW_SIGNALS.has(signal)) {
        const failure = eventPayload(entry, index)
        if (failure) failures.push(failure)
      }
    })

    let effectiveTier: number
    let promotedPayload: Array<string>
    if (typeof forcedTier === 'number') {
      effectiveTier = forcedTier
      promotedPayload = []
    } else if (promotedCapabilities.size > 0 && score >= TIER_FLOORS[2]) {
      promotedPayload = [...promotedCapabilities].sort()
      for (const capability of promotedPayload) capabilityTiers[capability] = 2
      effectiveTier = 2
    } else {
      effectiveTier = Math.min(tierForScore(score), 1)
      promotedPayload = []
    }

    const permissions = (capabilitiesByManager[agent.id] ?? []).map(
      (permission) => ({
        ...permission,
        enabled:
          permission.riskClass === 'R0' ||
          promotedPayload.includes(permission.capabilityId),
        reason:
          permission.riskClass === 'R0'
            ? null
            : promotedPayload.includes(permission.capabilityId)
              ? null
              : 'requires_trust_score_capability_promotion',
      }),
    )

    const managerDecisions = rooms.flatMap((room) =>
      room.ownerManager === agent.id && room.decisionRef
        ? [
            {
              decisionRef: room.decisionRef,
              roomId: room.roomId,
              taskId: room.kanbanTaskId,
              status: room.kanbanStatus,
            },
          ]
        : [],
    )

    const managerPayload: MissionControlAutonomyManager = {
      manager: agent.id,
      domain: agent.domain || null,
      defaultTier,
      effectiveTier,
      trustScore: score,
      riskCeilingWithoutApproval,
      permissions,
      gates: [
        ...new Set(permissions.map((permission) => permission.gate)),
      ].sort(),
      promotedCapabilities: promotedPayload,
      capabilityTiers,
      reviewRequired,
      gatesActive: true,
      lastSignal,
      lastDecisions: managerDecisions.slice(-5),
      lastFailures: failures.slice(-5),
      nextStepRecommended: 'collect_clean_review_and_watcher_evidence',
    }
    managerPayload.nextStepRecommended = nextStepForAutonomy(managerPayload)
    return managerPayload
  })

  return { managers }
}

function isMcpReviewFailure(card: MissionControlKanbanCard): boolean {
  const normalizedStatus = (card.status ?? '').toLowerCase().replace(/-/g, '_')
  if (
    [
      'blocked',
      'review_failed',
      'failed_review',
      'changes_requested',
      'change_requested',
      'fail',
      'failed',
      'rejected',
    ].includes(normalizedStatus)
  )
    return true
  const evidence =
    `${card.title}\n${card.spec ?? ''}\n${card.latestRun?.summary ?? ''}`.toLowerCase()
  return (
    evidence.includes('review-failed') || evidence.includes('review_failed')
  )
}

function buildMcpHonesty(
  cards: Array<MissionControlKanbanCard>,
): JamesMissionControlSnapshot['mcpHonesty'] {
  const mcp15 =
    cards.find((card) => /\bMCP-15\b/i.test(card.title)) ??
    cards.find((card) => /\bMCP-15\b/i.test(card.spec ?? ''))
  if (!mcp15) {
    return {
      status: 'unavailable',
      taskId: null,
      reason:
        'MCP-15 card/evidence not found; Mission Control must not claim MCP OK.',
    }
  }
  if (isMcpReviewFailure(mcp15)) {
    return {
      status: 'review_failed',
      taskId: mcp15.id,
      reason:
        'MCP-15 is blocked or review-failed; show visible/review-failed, never operational OK.',
    }
  }
  return {
    status: 'available_outside_workspace',
    taskId: mcp15.id,
    reason:
      'MCP evidence exists, but Workspace only surfaces it read-only until review proves operational wiring.',
  }
}

function countsByStatus(
  cards: Array<MissionControlKanbanCard>,
): Record<string, number> {
  return cards.reduce<Record<string, number>>((acc, card) => {
    const key = card.status || 'unknown'
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})
}

function graphNodesAndEdges(
  core: MissionControlAgent | null,
  managers: Array<MissionControlAgent>,
  watchers: Array<MissionControlWatcher>,
  rooms: Array<MissionControlRoom>,
  decisions: Array<MissionControlDecision>,
  cards: Array<MissionControlKanbanCard>,
  modulesRegistry?: JamesMissionControlSnapshot['modulesRegistry'],
): JamesMissionControlSnapshot['graph'] {
  const nodes: JamesMissionControlSnapshot['graph']['nodes'] = []
  const edges: JamesMissionControlSnapshot['graph']['edges'] = []
  if (core) nodes.push({ id: core.id, kind: 'core', label: core.id })
  for (const manager of managers) {
    nodes.push({ id: manager.id, kind: 'manager', label: manager.id })
    if (core) edges.push({ from: core.id, to: manager.id, kind: 'directs' })
  }
  for (const watcher of watchers) {
    nodes.push({
      id: watcher.id,
      kind: 'watcher',
      label: watcher.id,
      status: watcher.runtimeStatus,
    })
    edges.push({ from: watcher.manager, to: watcher.id, kind: 'observed_by' })
  }
  for (const room of rooms) {
    nodes.push({
      id: room.roomId,
      kind: 'room',
      label: room.roomId,
      status: room.riskClass,
    })
    edges.push({ from: room.roomId, to: room.kanbanTaskId, kind: 'tracked_by' })
    if (room.ownerManager)
      edges.push({ from: room.ownerManager, to: room.roomId, kind: 'directs' })
  }
  for (const decision of decisions) {
    nodes.push({
      id: decision.decisionRef,
      kind: 'decision',
      label: decision.decisionRef,
      status: decision.status,
    })
    if (decision.roomId)
      edges.push({
        from: decision.roomId,
        to: decision.decisionRef,
        kind: 'decides',
      })
  }
  for (const card of cards.slice(0, 50)) {
    nodes.push({
      id: card.id,
      kind: 'kanban',
      label: card.title,
      status: card.status ?? null,
    })
  }
  if (modulesRegistry) {
    const knownModules = new Set(
      modulesRegistry.modules.map((module) => module.module),
    )
    for (const module of modulesRegistry.modules) {
      const moduleNode = `module:${module.module}`
      nodes.push({
        id: moduleNode,
        kind: 'module',
        label: module.module,
        status: module.kinds.join(','),
      })
      if (module.module === 'workspace_mission_control') {
        edges.push({
          from: moduleNode,
          to: 'james.core.director',
          kind: 'rendered_in',
        })
      }
      for (const dependency of module.dependencies) {
        const dependencyNode = knownModules.has(dependency)
          ? `module:${dependency}`
          : `module:${dependency}`
        if (!nodes.some((node) => node.id === dependencyNode))
          nodes.push({ id: dependencyNode, kind: 'module', label: dependency })
        edges.push({ from: moduleNode, to: dependencyNode, kind: 'depends_on' })
      }
      for (const port of module.ports) {
        const portNode = `port:${port}`
        if (!nodes.some((node) => node.id === portNode))
          nodes.push({ id: portNode, kind: 'port', label: `:${port}` })
        edges.push({ from: moduleNode, to: portNode, kind: 'exposes' })
      }
      for (const gate of module.gates) {
        const gateNode = `gate:${gate}`
        if (!nodes.some((node) => node.id === gateNode))
          nodes.push({
            id: gateNode,
            kind: 'gate',
            label: gate,
            status: 'blocked',
          })
        edges.push({ from: moduleNode, to: gateNode, kind: 'blocked_by' })
      }
    }
  }
  for (const gate of SIDE_EFFECT_GATES) {
    nodes.push({
      id: gate.key,
      kind: 'gate',
      label: gate.label,
      status: gate.status,
    })
    if (core) edges.push({ from: core.id, to: gate.key, kind: 'blocked_by' })
  }
  return { nodes, edges }
}

export function buildJamesMissionControlSnapshot(
  input: BuildMissionControlSnapshotInput,
): JamesMissionControlSnapshot {
  const agentsStatus = registryStatus(input.agentsRegistry)
  const watchersStatus = registryStatus(input.watchersRegistry)
  const agents = Array.isArray(input.agentsRegistry.agents)
    ? (input.agentsRegistry.agents as Array<RegistryAgent>)
        .map(normalizeAgent)
        .filter((agent): agent is MissionControlAgent => Boolean(agent))
    : []
  const registryRequiresReview = [agentsStatus, watchersStatus].some(
    (status) => status === 'review_required_before_runtime_use',
  )
  const watcherList = Array.isArray(input.watchersRegistry.watchers)
    ? (input.watchersRegistry.watchers as Array<RegistryWatcher>)
        .map((watcher) => normalizeWatcher(watcher, registryRequiresReview))
        .filter((watcher): watcher is MissionControlWatcher => Boolean(watcher))
    : []
  const core =
    agents.find((agent) => agent.id === 'james.core.director') ?? null
  const managers = agents.filter((agent) => agent.id !== 'james.core.director')
  const byManager = watcherList.reduce<
    Record<string, Array<MissionControlWatcher>>
  >((acc, watcher) => {
    acc[watcher.manager] = [...(acc[watcher.manager] ?? []), watcher]
    return acc
  }, {})
  const cards = input.kanbanCards
  const rooms = extractRooms(cards)
  const decisions = extractDecisions(rooms)
  const mcpHonesty = buildMcpHonesty(cards)
  const modulesRegistry = buildModulesRegistry(
    input.modulesRegistry ?? {},
    input.registryPaths?.modules,
  )
  const t29DecisionCockpit = buildT29DecisionCockpit(cards)
  const autonomy = buildAutonomyDashboard(
    agents,
    input.agentsRegistry,
    input.capabilitiesRegistry ?? {},
    input.trustLedgerEntries ?? [],
    rooms,
  )
  const autonomyRequiresReview = autonomy.managers.some(
    (manager) => manager.reviewRequired,
  )
  const statusReasons = [
    ...(agentsStatus
      ? [`agents_registry:${agentsStatus}`]
      : ['agents_registry:missing']),
    ...(watchersStatus
      ? [`watchers_registry:${watchersStatus}`]
      : ['watchers_registry:missing']),
    ...(modulesRegistry?.source.status
      ? [`modules_registry:${modulesRegistry.source.status}`]
      : ['modules_registry:missing']),
    `autonomy:${autonomy.managers.length ? 'visible' : 'missing'}`,
    `mcp:${mcpHonesty.status}`,
    `t29:${t29DecisionCockpit.boardGate.t29Status}`,
    'side_effects:blocked',
  ]
  const operationalStatus: JamesMissionControlStatus =
    mcpHonesty.status === 'review_failed' || autonomyRequiresReview
      ? 'review_required'
      : registryRequiresReview
        ? 'review_required'
        : 'ok'

  return {
    generatedAt: new Date(input.now ?? Date.now()).toISOString(),
    operationalStatus,
    statusReasons,
    organization: { core, managers },
    watchers: { total: watcherList.length, byManager },
    rooms,
    decisions,
    autonomy,
    kanban: {
      backend: input.kanbanBackend ?? null,
      countsByStatus: countsByStatus(cards),
      cards,
    },
    mcpHonesty,
    sideEffects: SIDE_EFFECT_GATES,
    t29DecisionCockpit,
    ...(modulesRegistry ? { modulesRegistry } : {}),
    graph: graphNodesAndEdges(
      core,
      managers,
      watcherList,
      rooms,
      decisions,
      cards,
      modulesRegistry,
    ),
    sources: [
      {
        kind: 'registry',
        path: input.registryPaths?.agents,
        status: agentsStatus,
      },
      {
        kind: 'registry',
        path: input.registryPaths?.watchers,
        status: watchersStatus,
      },
      {
        kind: 'registry',
        path: input.registryPaths?.modules,
        status: modulesRegistry?.source.status ?? null,
      },
      {
        kind: 'registry',
        path: input.registryPaths?.capabilities,
        status: registryStatus(input.capabilitiesRegistry ?? {}),
      },
      { kind: 'kanban', status: input.kanbanBackend?.id ?? null },
      { kind: 'mcp', status: mcpHonesty.status },
      { kind: 'watcher', status: watchersStatus },
      {
        kind: 'autonomy',
        path: input.registryPaths?.trustLedger,
        status: autonomy.managers.length ? 'visible' : 'missing',
      },
    ],
  }
}

function readYamlObject(filePath: string): RegistryObject {
  if (!fs.existsSync(filePath)) return {}
  const parsed = parseYaml(fs.readFileSync(filePath, 'utf-8')) as unknown
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
    ? (parsed as RegistryObject)
    : {}
}

function readTrustLedger(filePath: string): Array<TrustLedgerEntry> {
  if (!fs.existsSync(filePath)) return []
  try {
    return fs
      .readFileSync(filePath, 'utf-8')
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line) as TrustLedgerEntry)
      .filter((entry) => typeof entry === 'object' && !Array.isArray(entry))
  } catch {
    return []
  }
}

function readJamesBoardCards(
  dbPath = DEFAULT_JAMES_KANBAN_DB,
): Array<MissionControlKanbanCard> {
  if (!fs.existsSync(dbPath)) return []
  try {
    const sql = [
      'select id, title, body as spec, status, assignee as assignedWorker,',
      'created_at as createdAt,',
      'coalesce(last_heartbeat_at, completed_at, started_at, created_at) as updatedAt,',
      '(select summary from task_runs where task_id = tasks.id order by started_at desc, id desc limit 1) as latestRunSummary,',
      '(select outcome from task_runs where task_id = tasks.id order by started_at desc, id desc limit 1) as latestRunOutcome,',
      '(select status from task_runs where task_id = tasks.id order by started_at desc, id desc limit 1) as latestRunStatus,',
      '(select metadata from task_runs where task_id = tasks.id order by started_at desc, id desc limit 1) as latestRunMetadata,',
      "coalesce((select json_group_array(body) from task_comments where task_id = tasks.id), '[]') as commentsJson",
      'from tasks',
      "where status != 'archived'",
      'order by created_at desc, id desc;',
    ].join(' ')
    const raw = execFileSync('sqlite3', [dbPath, '-json', sql], {
      encoding: 'utf8',
      timeout: 10_000,
      maxBuffer: 20 * 1024 * 1024,
    }).trim()
    const parsed = raw
      ? (JSON.parse(raw) as Array<Record<string, unknown>>)
      : []
    return Array.isArray(parsed)
      ? parsed
          .map((row) => normalizeBoardRow(row))
          .filter((card) => Boolean(card.id))
      : []
  } catch {
    return []
  }
}

function parseComments(value: unknown): Array<string> {
  if (typeof value !== 'string') return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is string =>
            typeof item === 'string' && item.trim().length > 0,
        )
      : []
  } catch {
    return []
  }
}

function parseMetadata(value: unknown): unknown {
  if (typeof value !== 'string' || !value.trim()) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function normalizeBoardRow(
  row: Record<string, unknown>,
): MissionControlKanbanCard {
  const latestRun =
    row.latestRunSummary ||
    row.latestRunOutcome ||
    row.latestRunStatus ||
    row.latestRunMetadata
      ? {
          summary:
            typeof row.latestRunSummary === 'string'
              ? row.latestRunSummary
              : null,
          outcome:
            typeof row.latestRunOutcome === 'string'
              ? row.latestRunOutcome
              : null,
          status:
            typeof row.latestRunStatus === 'string'
              ? row.latestRunStatus
              : null,
          metadata: parseMetadata(row.latestRunMetadata),
        }
      : null
  return {
    id: typeof row.id === 'string' ? row.id : '',
    title: typeof row.title === 'string' ? row.title : 'Untitled task',
    spec: typeof row.spec === 'string' ? row.spec : '',
    status: typeof row.status === 'string' ? row.status : null,
    assignedWorker:
      typeof row.assignedWorker === 'string' ? row.assignedWorker : null,
    createdAt:
      typeof row.createdAt === 'number' ? row.createdAt * 1000 : undefined,
    updatedAt:
      typeof row.updatedAt === 'number' ? row.updatedAt * 1000 : undefined,
    latestRun,
    comments: parseComments(row.commentsJson),
  }
}

export function mergeMissionControlKanbanCards(
  primary: Array<MissionControlKanbanCard>,
  fallback: Array<MissionControlKanbanCard>,
): Array<MissionControlKanbanCard> {
  const byId = new Map<string, MissionControlKanbanCard>()
  for (const card of fallback) byId.set(card.id, card)
  for (const card of primary) {
    const existing = byId.get(card.id)
    byId.set(card.id, {
      ...existing,
      ...card,
      latestRun: card.latestRun ?? existing?.latestRun ?? null,
      comments: card.comments?.length ? card.comments : existing?.comments,
    })
  }
  return [...byId.values()].sort(
    (a, b) =>
      (b.updatedAt ?? 0) - (a.updatedAt ?? 0) || a.title.localeCompare(b.title),
  )
}

export async function readJamesMissionControlSnapshot(): Promise<JamesMissionControlSnapshot> {
  const agentsRegistry = readYamlObject(DEFAULT_JAMES_AGENTS_REGISTRY)
  const watchersRegistry = readYamlObject(DEFAULT_JAMES_WATCHERS_REGISTRY)
  const modulesRegistry = readYamlObject(DEFAULT_JAMES_MODULES_REGISTRY)
  const capabilitiesRegistry = readYamlObject(
    DEFAULT_JAMES_CAPABILITIES_REGISTRY,
  )
  const trustLedgerEntries = readTrustLedger(DEFAULT_JAMES_TRUST_LEDGER)
  const cards = mergeMissionControlKanbanCards(
    await listKanbanCards(),
    readJamesBoardCards(),
  )
  return buildJamesMissionControlSnapshot({
    agentsRegistry,
    watchersRegistry,
    modulesRegistry,
    capabilitiesRegistry,
    trustLedgerEntries,
    kanbanCards: cards,
    kanbanBackend: getKanbanBackendMeta(),
    registryPaths: {
      agents: DEFAULT_JAMES_AGENTS_REGISTRY,
      watchers: DEFAULT_JAMES_WATCHERS_REGISTRY,
      modules: DEFAULT_JAMES_MODULES_REGISTRY,
      capabilities: DEFAULT_JAMES_CAPABILITIES_REGISTRY,
      trustLedger: DEFAULT_JAMES_TRUST_LEDGER,
    },
  })
}
