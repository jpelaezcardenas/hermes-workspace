import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'

import {  getKanbanBackendMeta, listKanbanCards } from './kanban-backend'
import { getUserHomeForHermesRoot } from './claude-paths'
import type {KanbanBackendMeta} from './kanban-backend';

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

export type MissionControlKanbanCard = {
  id: string
  title: string
  spec?: string | null
  status?: string | null
  assignedWorker?: string | null
  createdAt?: number
  updatedAt?: number
  latestRun?: { summary?: string | null; outcome?: string | null; status?: string | null } | null
}

export type JamesMissionControlStatus = 'ok' | 'review_required' | 'blocked'
export type JamesMcpHonestyStatus = 'visible' | 'available_outside_workspace' | 'review_failed' | 'unavailable'

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
  sideEffects: Array<{ key: string; label: string; status: 'blocked'; reason: string }>
  graph: {
    nodes: Array<{ id: string; kind: 'core' | 'manager' | 'watcher' | 'room' | 'decision' | 'kanban' | 'gate'; label: string; status?: string | null }>
    edges: Array<{ from: string; to: string; kind: 'directs' | 'observed_by' | 'tracked_by' | 'decides' | 'blocked_by' }>
  }
  sources: Array<{ kind: 'registry' | 'kanban' | 'mcp' | 'watcher'; path?: string; status?: string | null }>
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
  kanbanCards: Array<MissionControlKanbanCard>
  kanbanBackend?: KanbanBackendMeta | null
  registryPaths?: { agents?: string; watchers?: string }
  now?: number
}

const USER_HOME = getUserHomeForHermesRoot()
const DEFAULT_JAMES_REGISTRY_DIR =
  process.env.JAMES_ORGANIZATION_REGISTRY_DIR ??
  path.join(USER_HOME, 'ops', 'james-2', 'docs', 'james-organization', 'registries')

export const DEFAULT_JAMES_AGENTS_REGISTRY = path.join(DEFAULT_JAMES_REGISTRY_DIR, 'james_agents_registry.yaml')
export const DEFAULT_JAMES_WATCHERS_REGISTRY = path.join(DEFAULT_JAMES_REGISTRY_DIR, 'james_watchers_registry.yaml')
export const DEFAULT_JAMES_KANBAN_DB =
  process.env.HERMES_KANBAN_DB ??
  path.join(USER_HOME, '.hermes', 'kanban', 'boards', 'james-despachante', 'kanban.db')

const SIDE_EFFECT_GATES: JamesMissionControlSnapshot['sideEffects'] = [
  { key: 'real_whatsapp', label: 'WhatsApp real', status: 'blocked', reason: 'requires explicit Ugo approval; customer channel side effect' },
  { key: 'pix_santander', label: 'Pix/Santander real', status: 'blocked', reason: 'financial R5 side effect; not executable from Mission Control MVP' },
  { key: 'host_mutation', label: 'HOST mutativo', status: 'blocked', reason: 'requires ops handoff/review; Workspace remains read-only for HOST' },
  { key: 'providers_secrets_auth_env', label: 'Providers/secrets/auth/.env', status: 'blocked', reason: 'credential/provider changes are outside this UI/API MVP' },
  { key: 't29_camp7', label: 'T29/CAMP-7', status: 'blocked', reason: 'pilot/campaign gates remain blocked until separate explicit approval' },
]

function asStringArray(value: unknown): Array<string> {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).map((item) => item.trim())
    : []
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function registryStatus(registry: RegistryObject): string | null {
  return typeof registry.status === 'string' && registry.status.trim() ? registry.status.trim() : null
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

function normalizeWatcher(watcher: RegistryWatcher, registryRequiresReview: boolean): MissionControlWatcher | null {
  const id = typeof watcher.watcher_id === 'string' ? watcher.watcher_id.trim() : ''
  const manager = typeof watcher.manager === 'string' ? watcher.manager.trim() : ''
  if (!id || !manager) return null
  return {
    id,
    manager,
    evidence: asStringArray(watcher.evidence),
    cadenceSeconds: asNumber(watcher.cadence_seconds),
    riskClass: typeof watcher.risk_class === 'string' ? watcher.risk_class : null,
    actionPolicy: typeof watcher.action_policy === 'string' ? watcher.action_policy : null,
    runtimeStatus: registryRequiresReview ? 'review_required' : 'registry_only',
  }
}

function extractKv(text: string, key: string): string | null {
  const match = text.match(new RegExp(`^\\s*${key}\\s*:\\s*(.+?)\\s*$`, 'im'))
  return match?.[1]?.trim() ?? null
}

function extractRooms(cards: Array<MissionControlKanbanCard>): Array<MissionControlRoom> {
  return cards.flatMap((card) => {
    const spec = card.spec ?? ''
    if (!/james_room_origin:v0/i.test(spec)) return []
    const roomId = extractKv(spec, 'room_id')
    if (!roomId) return []
    return [{
      roomId,
      ownerManager: extractKv(spec, 'owner_manager'),
      decisionRef: extractKv(spec, 'decision_ref'),
      riskClass: extractKv(spec, 'risk_class'),
      kanbanTaskId: card.id,
      kanbanStatus: card.status ?? null,
    }]
  })
}

function extractDecisions(rooms: Array<MissionControlRoom>): Array<MissionControlDecision> {
  return rooms.flatMap((room) => room.decisionRef ? [{
    decisionRef: room.decisionRef,
    source: 'kanban' as const,
    roomId: room.roomId,
    taskId: room.kanbanTaskId,
    status: room.kanbanStatus,
  }] : [])
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
  ) return true
  const evidence = `${card.title}\n${card.spec ?? ''}\n${card.latestRun?.summary ?? ''}`.toLowerCase()
  return evidence.includes('review-failed') || evidence.includes('review_failed')
}

function buildMcpHonesty(cards: Array<MissionControlKanbanCard>): JamesMissionControlSnapshot['mcpHonesty'] {
  const mcp15 =
    cards.find((card) => /\bMCP-15\b/i.test(card.title)) ??
    cards.find((card) => /\bMCP-15\b/i.test(card.spec ?? ''))
  if (!mcp15) {
    return { status: 'unavailable', taskId: null, reason: 'MCP-15 card/evidence not found; Mission Control must not claim MCP OK.' }
  }
  if (isMcpReviewFailure(mcp15)) {
    return { status: 'review_failed', taskId: mcp15.id, reason: 'MCP-15 is blocked or review-failed; show visible/review-failed, never operational OK.' }
  }
  return { status: 'available_outside_workspace', taskId: mcp15.id, reason: 'MCP evidence exists, but Workspace only surfaces it read-only until review proves operational wiring.' }
}

function countsByStatus(cards: Array<MissionControlKanbanCard>): Record<string, number> {
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
): JamesMissionControlSnapshot['graph'] {
  const nodes: JamesMissionControlSnapshot['graph']['nodes'] = []
  const edges: JamesMissionControlSnapshot['graph']['edges'] = []
  if (core) nodes.push({ id: core.id, kind: 'core', label: core.id })
  for (const manager of managers) {
    nodes.push({ id: manager.id, kind: 'manager', label: manager.id })
    if (core) edges.push({ from: core.id, to: manager.id, kind: 'directs' })
  }
  for (const watcher of watchers) {
    nodes.push({ id: watcher.id, kind: 'watcher', label: watcher.id, status: watcher.runtimeStatus })
    edges.push({ from: watcher.manager, to: watcher.id, kind: 'observed_by' })
  }
  for (const room of rooms) {
    nodes.push({ id: room.roomId, kind: 'room', label: room.roomId, status: room.riskClass })
    edges.push({ from: room.roomId, to: room.kanbanTaskId, kind: 'tracked_by' })
    if (room.ownerManager) edges.push({ from: room.ownerManager, to: room.roomId, kind: 'directs' })
  }
  for (const decision of decisions) {
    nodes.push({ id: decision.decisionRef, kind: 'decision', label: decision.decisionRef, status: decision.status })
    if (decision.roomId) edges.push({ from: decision.roomId, to: decision.decisionRef, kind: 'decides' })
  }
  for (const card of cards.slice(0, 50)) {
    nodes.push({ id: card.id, kind: 'kanban', label: card.title, status: card.status ?? null })
  }
  for (const gate of SIDE_EFFECT_GATES) {
    nodes.push({ id: gate.key, kind: 'gate', label: gate.label, status: gate.status })
    if (core) edges.push({ from: core.id, to: gate.key, kind: 'blocked_by' })
  }
  return { nodes, edges }
}

export function buildJamesMissionControlSnapshot(input: BuildMissionControlSnapshotInput): JamesMissionControlSnapshot {
  const agentsStatus = registryStatus(input.agentsRegistry)
  const watchersStatus = registryStatus(input.watchersRegistry)
  const agents = Array.isArray(input.agentsRegistry.agents)
    ? (input.agentsRegistry.agents as Array<RegistryAgent>).map(normalizeAgent).filter((agent): agent is MissionControlAgent => Boolean(agent))
    : []
  const registryRequiresReview = [agentsStatus, watchersStatus].some((status) => status === 'review_required_before_runtime_use')
  const watcherList = Array.isArray(input.watchersRegistry.watchers)
    ? (input.watchersRegistry.watchers as Array<RegistryWatcher>).map((watcher) => normalizeWatcher(watcher, registryRequiresReview)).filter((watcher): watcher is MissionControlWatcher => Boolean(watcher))
    : []
  const core = agents.find((agent) => agent.id === 'james.core.director') ?? null
  const managers = agents.filter((agent) => agent.id !== 'james.core.director')
  const byManager = watcherList.reduce<Record<string, Array<MissionControlWatcher>>>((acc, watcher) => {
    acc[watcher.manager] = [...(acc[watcher.manager] ?? []), watcher]
    return acc
  }, {})
  const cards = input.kanbanCards
  const rooms = extractRooms(cards)
  const decisions = extractDecisions(rooms)
  const mcpHonesty = buildMcpHonesty(cards)
  const statusReasons = [
    ...(agentsStatus ? [`agents_registry:${agentsStatus}`] : ['agents_registry:missing']),
    ...(watchersStatus ? [`watchers_registry:${watchersStatus}`] : ['watchers_registry:missing']),
    `mcp:${mcpHonesty.status}`,
    'side_effects:blocked',
  ]
  const operationalStatus: JamesMissionControlStatus =
    mcpHonesty.status === 'review_failed'
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
    kanban: { backend: input.kanbanBackend ?? null, countsByStatus: countsByStatus(cards), cards },
    mcpHonesty,
    sideEffects: SIDE_EFFECT_GATES,
    graph: graphNodesAndEdges(core, managers, watcherList, rooms, decisions, cards),
    sources: [
      { kind: 'registry', path: input.registryPaths?.agents, status: agentsStatus },
      { kind: 'registry', path: input.registryPaths?.watchers, status: watchersStatus },
      { kind: 'kanban', status: input.kanbanBackend?.id ?? null },
      { kind: 'mcp', status: mcpHonesty.status },
      { kind: 'watcher', status: watchersStatus },
    ],
  }
}

function readYamlObject(filePath: string): RegistryObject {
  const parsed = parseYaml(fs.readFileSync(filePath, 'utf-8')) as unknown
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as RegistryObject : {}
}

function readJamesBoardCards(dbPath = DEFAULT_JAMES_KANBAN_DB): Array<MissionControlKanbanCard> {
  if (!fs.existsSync(dbPath)) return []
  try {
    const sql = [
      'select id, title, body as spec, status, assignee as assignedWorker,',
      'created_at as createdAt,',
      'coalesce(last_heartbeat_at, completed_at, started_at, created_at) as updatedAt',
      'from tasks',
      'where status != \'archived\'',
      'order by created_at desc, id desc;'
    ].join(' ')
    const raw = execFileSync('sqlite3', [dbPath, '-json', sql], { encoding: 'utf8', timeout: 10_000 }).trim()
    const parsed = raw ? JSON.parse(raw) as Array<Record<string, unknown>> : []
    return Array.isArray(parsed)
      ? parsed.map((row) => ({
          id: typeof row.id === 'string' ? row.id : '',
          title: typeof row.title === 'string' ? row.title : 'Untitled task',
          spec: typeof row.spec === 'string' ? row.spec : '',
          status: typeof row.status === 'string' ? row.status : null,
          assignedWorker: typeof row.assignedWorker === 'string' ? row.assignedWorker : null,
          createdAt: typeof row.createdAt === 'number' ? row.createdAt * 1000 : undefined,
          updatedAt: typeof row.updatedAt === 'number' ? row.updatedAt * 1000 : undefined,
        })).filter((card) => Boolean(card.id))
      : []
  } catch {
    return []
  }
}

export function mergeMissionControlKanbanCards(
  primary: Array<MissionControlKanbanCard>,
  fallback: Array<MissionControlKanbanCard>,
): Array<MissionControlKanbanCard> {
  const byId = new Map<string, MissionControlKanbanCard>()
  for (const card of fallback) byId.set(card.id, card)
  for (const card of primary) byId.set(card.id, card)
  return [...byId.values()].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0) || a.title.localeCompare(b.title))
}

export async function readJamesMissionControlSnapshot(): Promise<JamesMissionControlSnapshot> {
  const agentsRegistry = readYamlObject(DEFAULT_JAMES_AGENTS_REGISTRY)
  const watchersRegistry = readYamlObject(DEFAULT_JAMES_WATCHERS_REGISTRY)
  const cards = mergeMissionControlKanbanCards(await listKanbanCards(), readJamesBoardCards())
  return buildJamesMissionControlSnapshot({
    agentsRegistry,
    watchersRegistry,
    kanbanCards: cards,
    kanbanBackend: getKanbanBackendMeta(),
    registryPaths: { agents: DEFAULT_JAMES_AGENTS_REGISTRY, watchers: DEFAULT_JAMES_WATCHERS_REGISTRY },
  })
}
