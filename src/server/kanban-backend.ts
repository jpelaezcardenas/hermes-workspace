import { execFileSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { randomUUID } from 'node:crypto'
import { getClaudeRoot, getWorkspaceClaudeHome } from './claude-paths'
import {
  SWARM_KANBAN_FILE,
  createSwarmKanbanCard,
  listSwarmKanbanCards,
  updateSwarmKanbanCard,
} from './swarm-kanban-store'
import { CLAUDE_DASHBOARD_URL, getCapabilities } from './gateway-capabilities'
import {
  createDashboardKanbanTask,
  fetchDashboardKanbanBoard,
  fetchDashboardKanbanTaskDetail,
  updateDashboardKanbanTask,
} from './kanban-dashboard-proxy'
import type {
  CreateSwarmKanbanCardInput,
  SwarmKanbanCard,
  UpdateSwarmKanbanCardInput,
} from './swarm-kanban-store'
import type {
  DashboardKanbanTask,
  DashboardKanbanTaskDetailResponse,
} from './kanban-dashboard-proxy'

export type KanbanBackendId = 'local' | 'claude' | 'hermes-proxy'

export type KanbanBackendMeta = {
  id: KanbanBackendId
  label: string
  detected: boolean
  writable: boolean
  details?: string | null
  path?: string | null
}

export type KanbanTaskComment = {
  id: number | string
  task_id: string
  author: string
  body: string
  created_at: number | string
}

export type KanbanTaskEvent = {
  id: number | string
  task_id: string
  kind: string
  payload?: unknown
  created_at: number | string
  run_id?: number | null
}

export type KanbanTaskRun = {
  id: number | string
  task_id: string
  profile?: string | null
  step_key?: string | null
  status: string
  claim_lock?: string | null
  claim_expires?: number | null
  worker_pid?: number | null
  max_runtime_seconds?: number | null
  last_heartbeat_at?: number | null
  started_at: number | string
  ended_at?: number | string | null
  outcome?: string | null
  summary?: string | null
  metadata?: Record<string, unknown> | null
  error?: string | null
}

export type KanbanCardDetail = {
  card: SwarmKanbanCard
  comments: Array<KanbanTaskComment>
  events: Array<KanbanTaskEvent>
  links: { parents: Array<string>; children: Array<string> }
  runs: Array<KanbanTaskRun>
}

type KanbanBackend = {
  meta: () => KanbanBackendMeta
  list: () => Array<SwarmKanbanCard> | Promise<Array<SwarmKanbanCard>>
  create: (
    input: CreateSwarmKanbanCardInput,
  ) => SwarmKanbanCard | Promise<SwarmKanbanCard>
  update: (
    cardId: string,
    updates: UpdateSwarmKanbanCardInput,
  ) => SwarmKanbanCard | null | Promise<SwarmKanbanCard | null>
  detail: (
    cardId: string,
  ) => KanbanCardDetail | null | Promise<KanbanCardDetail | null>
}

// Map upstream Hermes kanban statuses (triage/todo/ready/running/done/blocked
// and any custom user statuses) into our internal lane vocabulary. Mirrors
// mapClaudeStatus() but kept separate because the dashboard plugin sometimes
// returns slightly different status strings than direct SQL access.
function mapDashboardStatusToLane(
  status: string | null | undefined,
): SwarmKanbanCard['status'] {
  switch ((status ?? '').toLowerCase()) {
    case 'triage':
    case 'todo':
    case 'queued':
      return 'backlog'
    case 'ready':
      return 'ready'
    case 'running':
    case 'claimed':
    case 'in_progress':
      return 'running'
    case 'review':
      return 'review'
    case 'blocked':
      return 'blocked'
    case 'done':
    case 'complete':
    case 'completed':
      return 'done'
    default:
      return 'backlog'
  }
}

function mapLaneToDashboardStatus(lane: SwarmKanbanCard['status']): string {
  switch (lane) {
    case 'backlog':
      return 'todo'
    case 'ready':
      return 'ready'
    case 'running':
      // The Hermes dashboard rejects direct writes of 'running' — only the
      // dispatcher's claim path may move a task into 'running'. Treat a
      // user dragging a card to the running lane as 'mark it ready, let
      // the dispatcher pick it up'. The card will flip to running on the
      // next dispatcher tick (default 60s).
      return 'ready'
    case 'review':
      // 'review' isn't a first-class Hermes status; map to 'ready' so the
      // task remains visible on the board until a worker is assigned.
      return 'ready'
    case 'blocked':
      return 'blocked'
    case 'done':
      return 'done'
    default:
      return 'todo'
  }
}

function dashboardTaskToCard(task: DashboardKanbanTask): SwarmKanbanCard {
  const createdAt = normalizeTimestamp(task.created_at)
  const updatedAt = normalizeTimestamp(
    task.started_at ?? task.completed_at ?? task.created_at,
  )
  return {
    id: task.id,
    title: task.title,
    spec: task.body ?? '',
    acceptanceCriteria: [],
    assignedWorker: task.assignee ?? null,
    reviewer: null,
    status: mapDashboardStatusToLane(task.status),
    priority: typeof task.priority === 'number' ? task.priority : 0,
    missionId: null,
    reportPath: null,
    createdBy: task.created_by ?? 'hermes-kanban',
    createdAt,
    updatedAt,
  }
}

type ClaudeTaskRow = {
  id: string
  title: string
  body?: string | null
  status?: string | null
  assignee?: string | null
  priority?: number | string | null
  created_at?: number | string | null
  updated_at?: number | string | null
}

type ClaudeDetection = {
  available: boolean
  cliPath?: string | null
  dbPath: string
  workspacePath: string
  reason?: string
}

function env(name: string): string | null {
  const value = process.env[name]
  return value && value.trim() ? value.trim() : null
}

function claudeProfileRoot(): string {
  return getWorkspaceClaudeHome()
}

function claudeDbPath(): string {
  return path.join(getClaudeRoot(), 'kanban.db')
}

function claudeWorkspacePath(): string {
  return path.join(getClaudeRoot(), 'kanban')
}

function claudeCliPath(): string | null {
  try {
    const output = execFileSync('which', ['claude'], {
      encoding: 'utf8',
      timeout: 5_000,
    }).trim()
    return output || null
  } catch {
    return null
  }
}

function checkClaudeCli(): {
  ok: boolean
  path?: string | null
  reason?: string
} {
  const cli = claudeCliPath()
  if (!cli) return { ok: false, reason: 'claude CLI not found on PATH' }
  try {
    execFileSync(cli, ['--version'], {
      encoding: 'utf8',
      timeout: 10_000,
      env: { ...process.env, CLAUDE_HOME: claudeProfileRoot() },
    })
    return { ok: true, path: cli }
  } catch (error) {
    return {
      ok: false,
      path: cli,
      reason: error instanceof Error ? error.message : String(error),
    }
  }
}

function detectClaudeKanban(): ClaudeDetection {
  const dbPath = claudeDbPath()
  const workspacePath = claudeWorkspacePath()
  const hasDb = fs.existsSync(dbPath)
  const hasWorkspace = fs.existsSync(workspacePath)

  if (!hasDb && !hasWorkspace) {
    return {
      available: false,
      cliPath: null,
      dbPath,
      workspacePath,
      reason:
        'Hermes Kanban storage not found; using the local Swarm Board fallback.',
    }
  }

  const cli = checkClaudeCli()
  return {
    available: true,
    cliPath: cli.ok ? (cli.path ?? null) : null,
    dbPath,
    workspacePath,
    reason: cli.ok
      ? undefined
      : 'Hermes Kanban storage detected; CLI unavailable, using direct local storage access.',
  }
}

function sqliteQuote(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

function runSqlite(dbPath: string, sql: string): string {
  return execFileSync('sqlite3', [dbPath, '-json', sql], {
    encoding: 'utf8',
    timeout: 15_000,
  }).trim()
}

const CLAUDE_TASK_UPDATED_AT_SQL =
  'max(coalesce(last_heartbeat_at, 0), coalesce(completed_at, 0), coalesce(started_at, 0), created_at, coalesce((select max(created_at) from task_events where task_id = tasks.id), 0)) as updated_at'

function readClaudeTasks(): Array<ClaudeTaskRow> {
  const detection = detectClaudeKanban()
  if (!detection.available) return []
  const query = [
    'select',
    'id,',
    'title,',
    'body,',
    'status,',
    'assignee,',
    'priority,',
    'created_at,',
    CLAUDE_TASK_UPDATED_AT_SQL,
    'from tasks',
    'order by created_at desc, id desc;',
  ].join(' ')
  const raw = runSqlite(detection.dbPath, query)
  const parsed = raw ? (JSON.parse(raw) as Array<ClaudeTaskRow>) : []
  return Array.isArray(parsed) ? parsed : []
}

function readClaudeTask(taskId: string): ClaudeTaskRow | null {
  const detection = detectClaudeKanban()
  if (!detection.available) return null
  const raw = runSqlite(
    detection.dbPath,
    `select id, title, body, status, assignee, priority, created_at, ${CLAUDE_TASK_UPDATED_AT_SQL} from tasks where id = ${sqliteQuote(taskId)} limit 1;`,
  )
  const parsed = raw ? (JSON.parse(raw) as Array<ClaudeTaskRow>) : []
  return Array.isArray(parsed) && parsed[0] ? parsed[0] : null
}

function normalizeTimestamp(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value > 1_000_000_000_000 ? value : Math.round(value * 1000)
  }
  if (typeof value === 'string' && value.trim()) {
    const asNum = Number(value)
    if (Number.isFinite(asNum)) return normalizeTimestamp(asNum)
    const parsed = Date.parse(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return Date.now()
}

function normalizePriority(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return 0
}

function mapClaudeStatus(
  status: string | null | undefined,
): SwarmKanbanCard['status'] {
  switch ((status ?? '').toLowerCase()) {
    case 'queued':
    case 'todo':
    case 'triage':
      return 'backlog'
    case 'ready':
      return 'ready'
    case 'running':
    case 'claimed':
    case 'in_progress':
      return 'running'
    case 'review':
      return 'review'
    case 'blocked':
      return 'blocked'
    case 'done':
    case 'complete':
    case 'completed':
      return 'done'
    default:
      return 'backlog'
  }
}

function mapBoardStatus(
  status: SwarmKanbanCard['status'] | null | undefined,
): string {
  switch (status) {
    case 'backlog':
      return 'queued'
    case 'ready':
      return 'ready'
    case 'running':
      return 'running'
    case 'review':
      return 'review'
    case 'blocked':
      return 'blocked'
    case 'done':
      return 'done'
    default:
      return 'queued'
  }
}

function claudeTaskToCard(task: ClaudeTaskRow): SwarmKanbanCard {
  const createdAt = normalizeTimestamp(task.created_at)
  const updatedAt = normalizeTimestamp(task.updated_at ?? task.created_at)
  return {
    id: task.id,
    title: task.title,
    spec: task.body ?? '',
    acceptanceCriteria: [],
    assignedWorker: task.assignee ?? null,
    reviewer: null,
    status: mapClaudeStatus(task.status),
    priority: normalizePriority(task.priority),
    missionId: null,
    reportPath: null,
    createdBy: 'claude-kanban',
    createdAt,
    updatedAt,
  }
}

function parseJsonArray<T>(raw: string): Array<T> {
  const parsed = raw ? (JSON.parse(raw) as unknown) : []
  return Array.isArray(parsed) ? (parsed as Array<T>) : []
}

function parseJsonValue(value: unknown): unknown {
  if (typeof value !== 'string') return value ?? null
  if (!value.trim()) return null
  try {
    return JSON.parse(value) as unknown
  } catch {
    return value
  }
}

function insertClaudeTaskEvent(
  dbPath: string,
  taskId: string,
  kind: string,
  payload: Record<string, unknown>,
): void {
  try {
    runSqlite(
      dbPath,
      `insert into task_events (task_id, run_id, kind, payload, created_at) values (${sqliteQuote(taskId)}, NULL, ${sqliteQuote(kind)}, ${sqliteQuote(JSON.stringify(payload))}, ${Math.floor(Date.now() / 1000)});`,
    )
  } catch {
    // Older or partially initialized kanban databases may not have event
    // tables. Keep the task write successful and let detail reads fall back to
    // synthetic timestamps.
  }
}

function claudeUpdateEventKind(
  updates: UpdateSwarmKanbanCardInput,
): 'assigned' | 'edited' | 'reprioritized' | 'status' | 'updated' {
  const changedKeys = [
    updates.title !== undefined,
    updates.spec !== undefined,
    updates.assignedWorker !== undefined,
    updates.priority !== undefined,
    updates.status !== undefined,
  ].filter(Boolean).length

  if (changedKeys > 1) return 'updated'
  if (updates.status !== undefined) return 'status'
  if (updates.assignedWorker !== undefined) return 'assigned'
  if (updates.priority !== undefined) return 'reprioritized'
  return 'edited'
}

function claudeUpdateEventPayload(
  updates: UpdateSwarmKanbanCardInput,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {}
  if (typeof updates.title === 'string') payload.title = updates.title.trim()
  if (typeof updates.spec === 'string') payload.body = updates.spec
  if (updates.assignedWorker !== undefined)
    payload.assignee = updates.assignedWorker?.trim() || null
  if (updates.priority !== undefined)
    payload.priority = normalizePriority(updates.priority)
  if (updates.status !== undefined)
    payload.status = mapBoardStatus(updates.status)
  return payload
}

function localCardDetail(card: SwarmKanbanCard): KanbanCardDetail {
  return {
    card,
    comments: [],
    events: [
      {
        id: `${card.id}:created`,
        task_id: card.id,
        kind: 'created',
        payload: { status: card.status, assignee: card.assignedWorker },
        created_at: Math.round(card.createdAt / 1000),
      },
      ...(card.updatedAt !== card.createdAt
        ? [
            {
              id: `${card.id}:updated`,
              task_id: card.id,
              kind: 'updated',
              payload: { status: card.status, assignee: card.assignedWorker },
              created_at: Math.round(card.updatedAt / 1000),
            },
          ]
        : []),
    ],
    links: { parents: [], children: [] },
    runs: [],
  }
}

function readClaudeTaskDetail(taskId: string): KanbanCardDetail | null {
  const task = readClaudeTask(taskId)
  if (!task) return null
  const detection = detectClaudeKanban()
  if (!detection.available) return null

  const comments = parseJsonArray<KanbanTaskComment>(
    runSqlite(
      detection.dbPath,
      `select id, task_id, author, body, created_at from task_comments where task_id = ${sqliteQuote(taskId)} order by created_at asc, id asc;`,
    ),
  )
  const rawEvents = parseJsonArray<KanbanTaskEvent & { payload?: unknown }>(
    runSqlite(
      detection.dbPath,
      `select id, task_id, run_id, kind, payload, created_at from task_events where task_id = ${sqliteQuote(taskId)} order by created_at asc, id asc;`,
    ),
  )
  const events = rawEvents.map((event) => ({
    ...event,
    payload: parseJsonValue(event.payload),
  }))
  const rawRuns = parseJsonArray<KanbanTaskRun & { metadata?: unknown }>(
    runSqlite(
      detection.dbPath,
      `select id, task_id, profile, step_key, status, claim_lock, claim_expires, worker_pid, max_runtime_seconds, last_heartbeat_at, started_at, ended_at, outcome, summary, metadata, error from task_runs where task_id = ${sqliteQuote(taskId)} order by started_at asc, id asc;`,
    ),
  )
  const runs = rawRuns.map((run) => ({
    ...run,
    metadata: parseJsonValue(run.metadata) as Record<string, unknown> | null,
  }))
  const parents = parseJsonArray<{ parent_id: string }>(
    runSqlite(
      detection.dbPath,
      `select parent_id from task_links where child_id = ${sqliteQuote(taskId)} order by parent_id;`,
    ),
  ).map((row) => row.parent_id)
  const children = parseJsonArray<{ child_id: string }>(
    runSqlite(
      detection.dbPath,
      `select child_id from task_links where parent_id = ${sqliteQuote(taskId)} order by child_id;`,
    ),
  ).map((row) => row.child_id)

  return {
    card: claudeTaskToCard(task),
    comments,
    events,
    links: { parents, children },
    runs,
  }
}

function dashboardDetailToCardDetail(
  detail: DashboardKanbanTaskDetailResponse | null,
): KanbanCardDetail | null {
  if (!detail?.task) return null
  return {
    card: dashboardTaskToCard(detail.task),
    comments: detail.comments ?? [],
    events: detail.events ?? [],
    links: {
      parents: detail.links?.parents ?? [],
      children: detail.links?.children ?? [],
    },
    runs: detail.runs ?? [],
  }
}

const localBackend: KanbanBackend = {
  meta() {
    return {
      id: 'local',
      label: 'Local board',
      detected: true,
      writable: true,
      path: SWARM_KANBAN_FILE,
      details: 'Using local Swarm board JSON store.',
    }
  },
  list() {
    return listSwarmKanbanCards()
  },
  create(input) {
    return createSwarmKanbanCard(input)
  },
  update(cardId, updates) {
    return updateSwarmKanbanCard(cardId, updates)
  },
  detail(cardId) {
    const card = listSwarmKanbanCards({}).find((entry) => entry.id === cardId)
    return card ? localCardDetail(card) : null
  },
}

const claudeBackend: KanbanBackend = {
  meta() {
    const detection = detectClaudeKanban()
    return {
      id: 'claude',
      label: 'Hermes Kanban',
      detected: detection.available,
      writable: detection.available,
      path: fs.existsSync(detection.dbPath) ? detection.dbPath : null,
      details: detection.available
        ? (detection.reason ??
          `Hermes Kanban storage detected (${detection.cliPath ?? 'direct sqlite'}, ${detection.dbPath})`)
        : (detection.reason ?? 'Hermes Kanban not detected.'),
    }
  },
  list() {
    return readClaudeTasks().map(claudeTaskToCard)
  },
  create(input) {
    const detection = detectClaudeKanban()
    if (!detection.available)
      throw new Error(detection.reason ?? 'Hermes Kanban not detected')
    const nowSeconds = Math.floor(Date.now() / 1000)
    const taskId = `t_${randomUUID().replace(/-/g, '').slice(0, 8)}`
    const status = mapBoardStatus(input.status ?? 'backlog')
    const statements = [
      'insert into tasks (',
      'id, title, body, assignee, status, priority, created_by, created_at, workspace_kind, workspace_path',
      ') values (',
      [
        sqliteQuote(taskId),
        sqliteQuote(input.title.trim()),
        sqliteQuote((input.spec ?? '').trim()),
        input.assignedWorker?.trim()
          ? sqliteQuote(input.assignedWorker.trim())
          : 'NULL',
        sqliteQuote(status),
        String(normalizePriority(input.priority)),
        sqliteQuote(input.createdBy?.trim() || 'swarm2-kanban'),
        String(nowSeconds),
        sqliteQuote('scratch'),
        sqliteQuote(path.join(detection.workspacePath, 'workspaces', taskId)),
      ].join(', '),
      ');',
    ].join(' ')
    runSqlite(detection.dbPath, statements)
    insertClaudeTaskEvent(detection.dbPath, taskId, 'created', {
      status,
      assignee: input.assignedWorker?.trim() || null,
      created_by: input.createdBy?.trim() || 'swarm2-kanban',
    })
    const created = readClaudeTask(taskId)
    if (!created)
      throw new Error(
        `Created Hermes task ${taskId} but could not read it back`,
      )
    return claudeTaskToCard(created)
  },
  update(cardId, updates) {
    const detection = detectClaudeKanban()
    if (!detection.available) return null
    const assignments: Array<string> = []
    if (typeof updates.title === 'string' && updates.title.trim())
      assignments.push(`title = ${sqliteQuote(updates.title.trim())}`)
    if (typeof updates.spec === 'string')
      assignments.push(`body = ${sqliteQuote(updates.spec)}`)
    if (updates.assignedWorker !== undefined)
      assignments.push(
        `assignee = ${updates.assignedWorker?.trim() ? sqliteQuote(updates.assignedWorker.trim()) : 'NULL'}`,
      )
    if (updates.priority !== undefined)
      assignments.push(`priority = ${normalizePriority(updates.priority)}`)
    if (updates.status) {
      const status = mapBoardStatus(updates.status)
      assignments.push(`status = ${sqliteQuote(status)}`)
      if (status === 'running')
        assignments.push(
          `started_at = coalesce(started_at, ${Math.floor(Date.now() / 1000)})`,
        )
      if (status === 'done')
        assignments.push(`completed_at = ${Math.floor(Date.now() / 1000)}`)
      if (status !== 'done') assignments.push('completed_at = NULL')
    }
    if (assignments.length === 0) {
      const current = readClaudeTask(cardId)
      return current ? claudeTaskToCard(current) : null
    }
    runSqlite(
      detection.dbPath,
      `update tasks set ${assignments.join(', ')} where id = ${sqliteQuote(cardId)};`,
    )
    insertClaudeTaskEvent(
      detection.dbPath,
      cardId,
      claudeUpdateEventKind(updates),
      claudeUpdateEventPayload(updates),
    )
    const updated = readClaudeTask(cardId)
    return updated ? claudeTaskToCard(updated) : null
  },
  detail(cardId) {
    return readClaudeTaskDetail(cardId)
  },
}

// Hermes Dashboard kanban plugin backend (HTTP proxy).
//
// Used when the upstream Hermes Agent dashboard exposes the kanban plugin
// (caps.kanban === true). Goes through HTTP rather than direct SQLite so
// remote workspaces (Docker, VPS, separate machines) can use the same
// kanban DB the agent is using. See kanban-dashboard-proxy.ts.
const dashboardProxyBackend: KanbanBackend = {
  meta() {
    const caps = getCapabilities()
    return {
      id: 'hermes-proxy',
      label: 'Hermes Dashboard kanban',
      detected: caps.kanban,
      writable: caps.kanban,
      path: caps.dashboard.url || CLAUDE_DASHBOARD_URL,
      details: caps.kanban
        ? `Synced with the Hermes Dashboard kanban plugin at ${caps.dashboard.url}/kanban (single SQLite source of truth, dispatcher-aware).`
        : 'Hermes Dashboard kanban plugin not detected.',
    }
  },
  async list() {
    const board = await fetchDashboardKanbanBoard()
    const cards: Array<SwarmKanbanCard> = []
    for (const column of board.columns) {
      for (const task of column.tasks) {
        cards.push(dashboardTaskToCard(task))
      }
    }
    return cards.sort(
      (a, b) => b.updatedAt - a.updatedAt || a.title.localeCompare(b.title),
    )
  },
  async create(input) {
    const task = await createDashboardKanbanTask({
      title: input.title.trim(),
      body: (input.spec ?? '').trim() || undefined,
      assignee: input.assignedWorker?.trim() || undefined,
      status: mapLaneToDashboardStatus(input.status ?? 'backlog'),
      priority: normalizePriority(input.priority),
      created_by: input.createdBy?.trim() || 'hermes-workspace',
    })
    return dashboardTaskToCard(task)
  },
  async update(cardId, updates) {
    const patch: Parameters<typeof updateDashboardKanbanTask>[1] = {}
    if (typeof updates.title === 'string' && updates.title.trim())
      patch.title = updates.title.trim()
    if (typeof updates.spec === 'string') patch.body = updates.spec
    if (updates.assignedWorker !== undefined)
      patch.assignee = updates.assignedWorker?.trim() || null
    if (updates.priority !== undefined)
      patch.priority = normalizePriority(updates.priority)
    if (updates.status) patch.status = mapLaneToDashboardStatus(updates.status)
    if (Object.keys(patch).length === 0) {
      // No-op patches: just refetch.
      const board = await fetchDashboardKanbanBoard()
      for (const column of board.columns) {
        for (const task of column.tasks) {
          if (task.id === cardId) return dashboardTaskToCard(task)
        }
      }
      return null
    }
    try {
      const updated = await updateDashboardKanbanTask(cardId, patch)
      return dashboardTaskToCard(updated)
    } catch (err) {
      if (err instanceof Error && err.message.includes('→ 404')) return null
      throw err
    }
  },
  async detail(cardId) {
    return dashboardDetailToCardDetail(
      await fetchDashboardKanbanTaskDetail(cardId),
    )
  },
}

/**
 * Resolve which backend to use.
 *
 * Precedence (highest first):
 *   1. CLAUDE_KANBAN_BACKEND env var (local | claude | hermes-proxy | auto)
 *   2. caps.kanban (Hermes Dashboard plugin available) → hermes-proxy
 *   3. legacy claudeBackend (direct sqlite to ~/.hermes/kanban.db) when DB exists
 *   4. localBackend (file-backed swarm2-kanban.json) as last resort
 *
 * The 'auto' default deliberately prefers hermes-proxy over the legacy direct
 * SQLite path so dispatchers + transactional helpers stay in charge of writes.
 * Set CLAUDE_KANBAN_BACKEND=claude to force the direct-SQLite path during
 * troubleshooting.
 */
export function resolveKanbanBackend(): KanbanBackend {
  const preference = (env('CLAUDE_KANBAN_BACKEND') ?? 'auto').toLowerCase()
  if (preference === 'local') return localBackend
  if (preference === 'hermes-proxy' || preference === 'proxy') {
    return getCapabilities().kanban ? dashboardProxyBackend : localBackend
  }
  if (preference === 'claude') {
    const claudeMeta = claudeBackend.meta()
    return claudeMeta.detected ? claudeBackend : localBackend
  }
  // auto
  if (getCapabilities().kanban) return dashboardProxyBackend
  const claudeMeta = claudeBackend.meta()
  if (claudeMeta.detected) return claudeBackend
  return localBackend
}

export function getKanbanBackendMeta(): KanbanBackendMeta {
  return resolveKanbanBackend().meta()
}

export async function listKanbanCards(): Promise<Array<SwarmKanbanCard>> {
  return Promise.resolve(resolveKanbanBackend().list())
}

export async function createKanbanCard(
  input: CreateSwarmKanbanCardInput,
): Promise<SwarmKanbanCard> {
  return Promise.resolve(resolveKanbanBackend().create(input))
}

export async function updateKanbanCard(
  cardId: string,
  updates: UpdateSwarmKanbanCardInput,
): Promise<SwarmKanbanCard | null> {
  return Promise.resolve(resolveKanbanBackend().update(cardId, updates))
}

export async function getKanbanCardDetail(
  cardId: string,
): Promise<KanbanCardDetail | null> {
  return Promise.resolve(resolveKanbanBackend().detail(cardId))
}
