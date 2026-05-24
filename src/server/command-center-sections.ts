import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {
  buildCommandCenterSummary,
  type CommandCenterEnvelope,
  type CommandCenterSummary,
  type CommandCenterSummaryActionGate,
  type CommandCenterSummaryAgentRun,
  type CommandCenterSummaryBrainSource,
  type CommandCenterSummaryHomebaseRecords,
  type CommandCenterSummaryNowNextItem,
  type CommandCenterSummaryUsage,
} from './command-center-summary'
import { listSecondBrainSources } from './second-brain-files'
import {
  buildN8nGovernanceResponse,
  collectPromotionReceipts,
  getN8nCommandRegistry,
  type N8nGovernanceResponse,
  type PromotionReceiptSummary,
  type SafeWorkflowCommand,
} from '../lib/cael-n8n-governance'
import { listRecentPersistedRuns, type PersistedRunState } from './run-store'

type JsonFetcher = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>

type CommandCenterBuildOptions = {
  requestUrl: string
  cookie?: string | null
  fetcher?: JsonFetcher
}

async function withCommandCenterTimeout<T>(
  promise: Promise<T>,
  fallback: T,
  timeoutMs = 1500,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), timeoutMs)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

export type CommandCenterToday = {
  nowNext: CommandCenterSummaryNowNextItem[]
  priority: CommandCenterSummaryNowNextItem[]
  alerts: CommandCenterSummaryNowNextItem[]
}

export type CommandCenterBrain = {
  sources: CommandCenterSummaryBrainSource[]
  memoryArtifacts: {
    count: number
    rootConfigured: boolean
    root: string | null
  }
  policy: string[]
}

export type CommandCenterAutomations = {
  boundary: string
  instances: N8nGovernanceResponse['instances']
  promotionReceipts: PromotionReceiptSummary[]
  guardrails: string[]
}

export type CommandCenterActionGateDetail = CommandCenterSummaryActionGate & {
  ownerSystem: string
  sideEffects: string
  rollback: string
  href: string | null
}

export type CommandCenterActionGates = {
  total: number
  approvalRequired: number
  dryRun: number
  actions: CommandCenterActionGateDetail[]
}

export type CommandCenterMemoryArtifact = {
  id: string
  title: string
  path: string
  scope: 'personal' | 'business' | 'shared'
  tenant: string | null
  updatedAt: string | null
  sensitivity: 'normal' | 'secret_ref'
  tags: string[]
  excerpt: string
}

export type CommandCenterMemoryArtifacts = {
  root: string
  count: number
  artifacts: CommandCenterMemoryArtifact[]
}

export type CommandCenterVaultRef = {
  id: string
  displayName: string
  scope: 'personal' | 'business' | 'shared'
  exists: boolean
  lastVerifiedAt: string | null
  rotationDueAt: string | null
  linkedSystems: string[]
  vaultHref: string | null
  secretValue: null
}

export type CommandCenterVaultRefs = {
  warningCount: number
  refs: CommandCenterVaultRef[]
  policy: string[]
}

export type CommandCenterAgentRun = CommandCenterSummaryAgentRun & {
  receiptCount: number | null
  verification: string
}

export type CommandCenterAgentRuns = {
  runs: CommandCenterAgentRun[]
  receipts: PromotionReceiptSummary[]
}

type HomebaseRecordKind =
  | 'task'
  | 'person'
  | 'meeting'
  | 'memory'
  | 'message'
  | 'calendar'
  | 'note'
  | 'approval'

type HomebaseGraphNode = Record<string, unknown> & {
  id?: unknown
  title?: unknown
  name?: unknown
  subject?: unknown
  status?: unknown
  updatedAt?: unknown
  dueAt?: unknown
  startedAt?: unknown
  startsAt?: unknown
  receivedAt?: unknown
}

type HomebaseGraphConnection = {
  edges?: Array<{ node?: HomebaseGraphNode }>
  totalCount?: number
}

type HomebaseGraphResponse = {
  tasks?: HomebaseGraphConnection
  people?: HomebaseGraphConnection
  meetingRecords?: HomebaseGraphConnection
  messages?: HomebaseGraphConnection
  calendarEvents?: HomebaseGraphConnection
  approvalRequests?: HomebaseGraphConnection
}

const MEMORY_ARTIFACT_LIMIT = 20
const MEMORY_ARTIFACT_ROOT = '/Users/cderamos/.codex/knowledge-vault/artifacts'
const DEV_HARNESS_AUDIT_ROOT = '/Users/cderamos/.local/share/dev-harness/audit'
const DENIED_ARTIFACT_DIRS = new Set([
  '.git',
  'node_modules',
  '.next',
  '.turbo',
  'dist',
  'build',
  'storage',
  'vector_store',
  'vectors',
  'lightrag',
  'models',
])

const SECRET_TEXT_RE =
  /(password|passwd|secret|client_secret|token|api[_-]?key|private[_ -]?key|bearer)\s*[:=]\s*[^\s,;]+/gi
const BEARER_RE = /Bearer\s+[A-Za-z0-9._-]+/g
const OPENAI_KEY_RE = /sk-[A-Za-z0-9_-]{16,}/g
const KV_REF_RE = /kv-[\w-]+:\s*\S+/gi

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function expandHome(input: string): string {
  return input.replace(/^~(?=$|\/)/, os.homedir())
}

function configuredPath(envName: string, fallback: string): string {
  return path.resolve(expandHome(process.env[envName]?.trim() || fallback))
}

function configuredUrl(envNames: string[], fallback: string): string | null {
  for (const name of envNames) {
    const value = process.env[name]?.trim()
    if (value) return value
  }
  return fallback || null
}

function redactText(input: string): string {
  return input
    .replace(SECRET_TEXT_RE, '$1=***')
    .replace(BEARER_RE, 'Bearer ***')
    .replace(OPENAI_KEY_RE, 'sk-***')
    .replace(KV_REF_RE, 'kv-ref:***')
}

function stripMarkdownUnsafe(input: string): string {
  return redactText(input)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/<details>[\s\S]*?<\/details>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*#{1,6}\s*/gm, '')
    .replace(/^\s*[-*_]{3,}\s*$/gm, ' ')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerpt(input: string, maxLength = 240): string {
  const safe = stripMarkdownUnsafe(input)
  return safe.length > maxLength ? `${safe.slice(0, maxLength - 1)}...` : safe
}

function hasSecretLikeContent(input: string): boolean {
  SECRET_TEXT_RE.lastIndex = 0
  BEARER_RE.lastIndex = 0
  OPENAI_KEY_RE.lastIndex = 0
  return (
    SECRET_TEXT_RE.test(input) ||
    BEARER_RE.test(input) ||
    OPENAI_KEY_RE.test(input)
  )
}

function titleFromMarkdown(filePath: string, content: string): string {
  const safe = redactText(content)
  const title = safe
    .split('\n')
    .find((line) => /^#\s+/.test(line))
    ?.replace(/^#\s+/, '')
    .trim()
  return title || path.basename(filePath)
}

function scopeFromText(value: string): 'personal' | 'business' | 'shared' {
  const lower = value.toLowerCase()
  if (lower.includes('graphx') || lower.includes('business')) return 'business'
  if (lower.includes('shared') || lower.includes('capsule')) return 'shared'
  return 'personal'
}

function createEnvelope<T>(input: {
  source: string
  data: T | null
  warnings?: string[]
  errors?: string[]
}): CommandCenterEnvelope<T> {
  const generatedAt = new Date().toISOString()
  const warnings = input.warnings ?? []
  const errors = input.errors ?? []
  return {
    ok: warnings.length === 0 && errors.length === 0,
    generatedAt,
    source: input.source,
    scope: 'mixed',
    data: errors.length ? null : input.data,
    warnings,
    errors,
  }
}

async function summarySlice<T>(
  options: CommandCenterBuildOptions,
  source: string,
  select: (summary: CommandCenterSummary) => T,
): Promise<CommandCenterEnvelope<T>> {
  const summary = await buildCommandCenterSummary(options)
  return {
    ...summary,
    source,
    data: summary.data ? select(summary.data) : null,
  }
}

function commandToAction(
  command: SafeWorkflowCommand,
): CommandCenterActionGateDetail {
  return {
    id: command.id,
    label: command.label,
    source: `n8n:${command.owningInstance}`,
    status: command.status,
    riskLevel: command.riskLevel,
    approvalRequired: command.approvalRequired,
    dryRunSupported: command.dryRunSupported,
    detail: command.description,
    ownerSystem: command.owningInstance,
    sideEffects: command.sideEffects,
    rollback: command.rollback,
    href: null,
  }
}

function localActionGates(): CommandCenterActionGateDetail[] {
  return [
    {
      id: 'memory-reingest',
      label: 'Memory reingest',
      source: 'knowledge-vault',
      status: 'dry_run',
      riskLevel: 'reversible_local',
      approvalRequired: true,
      dryRunSupported: true,
      detail:
        'Reingest a selected markdown artifact into the chosen brain after review.',
      ownerSystem: 'Knowledge Vault',
      sideEffects:
        'Writes a receipt and may enqueue ingestion only after approval.',
      rollback:
        'Delete the generated receipt and re-run with the prior artifact version.',
      href: '/memory',
    },
    {
      id: 'vaultwarden-secret-management',
      label: 'Secret vault management',
      source: 'vaultwarden',
      status: 'approval_gated',
      riskLevel: 'destructive',
      approvalRequired: true,
      dryRunSupported: false,
      detail: 'Create, rotate, reveal, or delete credential material.',
      ownerSystem: 'Vaultwarden',
      sideEffects: 'May change credential material and downstream auth state.',
      rollback:
        'Restore from Vaultwarden item history or rotate dependent services.',
      href: configuredUrl(
        ['NEXT_PUBLIC_VAULTWARDEN_URL', 'VAULTWARDEN_URL'],
        'https://vault.visualgraphx.com',
      ),
    },
    {
      id: 'twenty-homebase-actions',
      label: 'Twenty Homebase actions',
      source: 'twenty-homebase',
      status: 'approval_gated',
      riskLevel: 'external_send',
      approvalRequired: true,
      dryRunSupported: true,
      detail:
        'Manual CRM actions and record workflow proposals migrated from the KB Brain Dashboard.',
      ownerSystem: 'Twenty/Homebase',
      sideEffects:
        'External writes stay disabled until the command-center approval contract is wired.',
      rollback:
        'Review generated receipts and reverse affected Twenty records manually.',
      href: configuredUrl(
        ['TWENTY_HOMEBASE_URL', 'NEXT_PUBLIC_TWENTY_HOMEBASE_URL'],
        'http://127.0.0.1:3020',
      ),
    },
  ]
}

function safeVaultRefs(): CommandCenterVaultRef[] {
  const vaultHref = configuredUrl(
    ['NEXT_PUBLIC_VAULTWARDEN_URL', 'VAULTWARDEN_URL'],
    'https://vault.visualgraphx.com',
  )
  return [
    {
      id: 'vaultwarden:google-oauth-personal-n8n',
      displayName: 'Google OAuth - personal n8n',
      scope: 'personal',
      exists: true,
      lastVerifiedAt: null,
      rotationDueAt: null,
      linkedSystems: ['gmail', 'google-tasks', 'contacts', 'n8n'],
      vaultHref,
      secretValue: null,
    },
    {
      id: 'vaultwarden:postgres-main-databases',
      displayName: 'PostgreSQL Main - databases',
      scope: 'personal',
      exists: true,
      lastVerifiedAt: null,
      rotationDueAt: null,
      linkedSystems: ['twenty-homebase', 'personal-brain', 'knowledge-vault'],
      vaultHref,
      secretValue: null,
    },
    {
      id: 'vaultwarden:graphx-business-memory',
      displayName: 'GraphX Business Memory API',
      scope: 'business',
      exists: true,
      lastVerifiedAt: null,
      rotationDueAt: null,
      linkedSystems: ['graphx', 'business-memory', 'mcp', 'n8n'],
      vaultHref,
      secretValue: null,
    },
    {
      id: 'vaultwarden:dev-harness-refs',
      displayName: 'dev-harness and OMX references',
      scope: 'shared',
      exists: true,
      lastVerifiedAt: null,
      rotationDueAt: null,
      linkedSystems: ['dev-harness', 'omx', 'agent-runs'],
      vaultHref,
      secretValue: null,
    },
  ]
}

async function walkMarkdown(root: string, depth = 0): Promise<string[]> {
  if (depth > 5) return []
  let entries: Array<import('node:fs').Dirent> = []
  try {
    entries = await fs.readdir(root, { withFileTypes: true })
  } catch {
    return []
  }

  const chunks = await Promise.all(
    entries.slice(0, 100).map(async (entry) => {
      if (DENIED_ARTIFACT_DIRS.has(entry.name.toLowerCase())) return []
      const next = path.join(root, entry.name)
      if (entry.isDirectory()) return walkMarkdown(next, depth + 1)
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
        return [next]
      return []
    }),
  )
  return chunks.flat()
}

async function listMemoryArtifacts(
  root: string,
): Promise<CommandCenterMemoryArtifact[]> {
  const realRoot = await fs.realpath(root).catch(() => null)
  if (!realRoot) return []
  const files = (await walkMarkdown(realRoot))
    .sort()
    .slice(-MEMORY_ARTIFACT_LIMIT)
  const artifacts = await Promise.all(
    files.map(async (filePath) => {
      const realFile = await fs.realpath(filePath).catch(() => null)
      if (!realFile || !realFile.startsWith(`${realRoot}${path.sep}`))
        return null
      const stat = await fs.stat(realFile).catch(() => null)
      const content = await fs.readFile(realFile, 'utf8').catch(() => '')
      const scope = scopeFromText(realFile)
      return {
        id: Buffer.from(realFile).toString('base64url'),
        title: titleFromMarkdown(realFile, content),
        path: realFile,
        scope,
        tenant: scope === 'business' ? 'graphx' : null,
        updatedAt: stat?.mtime.toISOString() ?? null,
        sensitivity: hasSecretLikeContent(content) ? 'secret_ref' : 'normal',
        tags: ['markdown', 'artifact'],
        excerpt: excerpt(content),
      } satisfies CommandCenterMemoryArtifact
    }),
  )
  return artifacts.filter((artifact): artifact is CommandCenterMemoryArtifact =>
    Boolean(artifact),
  )
}

async function readJsonFile(
  filePath: string,
): Promise<Record<string, unknown> | null> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8')) as Record<
      string,
      unknown
    >
  } catch {
    return null
  }
}

async function countReceipts(dir: string): Promise<number> {
  try {
    const entries = await fs.readdir(dir, { recursive: true })
    return entries.filter((entry) => {
      const name = String(entry).toLowerCase()
      return (
        name.endsWith('receipt.json') ||
        name.endsWith('result.json') ||
        name.endsWith('.md')
      )
    }).length
  } catch {
    return 0
  }
}

async function listDevHarnessRuns(limit = 8): Promise<CommandCenterAgentRun[]> {
  const root = configuredPath('DEV_HARNESS_AUDIT_ROOT', DEV_HARNESS_AUDIT_ROOT)
  let entries: Array<import('node:fs').Dirent> = []
  try {
    entries = await fs.readdir(root, { withFileTypes: true })
  } catch {
    return []
  }
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name))
    .slice(-limit)

  const runs = await Promise.all(
    dirs.map(async (dir) => {
      const runId = path.basename(dir)
      const status = await readJsonFile(path.join(dir, 'status.json'))
      const result = await readJsonFile(path.join(dir, 'result.json'))
      const stat = await fs.stat(dir).catch(() => null)
      const receiptCount = await countReceipts(dir)
      return {
        id: runId,
        title: excerpt(
          readString(status?.objective) ||
            readString(result?.objective) ||
            'Receipt-backed run',
          140,
        ),
        status: excerpt(
          readString(status?.status) || readString(result?.status) || 'unknown',
          80,
        ),
        updatedAt: stat?.mtime.toISOString() ?? '',
        source: 'dev-harness',
        path: dir,
        receiptCount,
        verification:
          receiptCount > 0 ? 'Receipts available' : 'No receipts found',
      } satisfies CommandCenterAgentRun
    }),
  )
  return runs.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

function receiptToRun(receipt: PromotionReceiptSummary): CommandCenterAgentRun {
  return {
    id: receipt.path,
    title: excerpt(receipt.title, 140),
    status: receipt.instance,
    updatedAt: receipt.updatedAt,
    source: 'receipt',
    path: receipt.path,
    receiptCount: 1,
    verification: 'Receipt available',
  }
}

function persistedRunToAgentRun(run: PersistedRunState): CommandCenterAgentRun {
  const toolCount = run.toolCalls.length
  const assistantChars = run.assistantText.length
  return {
    id: `cael-chat:${run.runId}`,
    title: excerpt(`Chat run ${run.friendlyId || run.sessionKey}`, 140),
    status: run.status,
    updatedAt: new Date(
      run.updatedAt || run.lastEventAt || run.createdAt,
    ).toISOString(),
    source: 'cael-chat',
    path: null,
    receiptCount: null,
    verification:
      toolCount > 0 || assistantChars > 0
        ? `${toolCount} tool events, ${assistantChars} assistant chars persisted`
        : 'Accepted by server run ledger; awaiting persisted output',
  }
}

function homebaseQuery(): string {
  return `{
    tasks(first: 8, orderBy: [{ updatedAt: DescNullsLast }]) { edges { node { id title status dueAt updatedAt } } totalCount }
    people(first: 6, orderBy: [{ updatedAt: DescNullsLast }]) { edges { node { id name { firstName lastName } emails { primaryEmail } updatedAt } } totalCount }
    meetingRecords(first: 6, orderBy: [{ startedAt: DescNullsLast }, { updatedAt: DescNullsLast }]) { edges { node { id name startedAt status updatedAt } } totalCount }
    messages(first: 6, orderBy: [{ receivedAt: DescNullsLast }]) { edges { node { id subject receivedAt updatedAt } } totalCount }
    calendarEvents(first: 6, orderBy: [{ startsAt: AscNullsLast }]) { edges { node { id title startsAt updatedAt } } totalCount }
    approvalRequests(first: 6, orderBy: [{ updatedAt: DescNullsLast }]) { edges { node { id name status updatedAt } } totalCount }
  }`
}

function nodeLabel(kind: HomebaseRecordKind, node: HomebaseGraphNode): string {
  if (kind === 'person' && isRecord(node.name)) {
    const first = readString(node.name.firstName)
    const last = readString(node.name.lastName)
    const name = `${first} ${last}`.trim()
    if (name) return name
    if (isRecord(node.emails))
      return readString(node.emails.primaryEmail, 'Unnamed person')
  }
  return (
    readString(node.title) ||
    readString(node.name) ||
    readString(node.subject) ||
    `Untitled ${kind}`
  )
}

function nodeTime(node: HomebaseGraphNode): string | null {
  return (
    readString(node.dueAt) ||
    readString(node.startedAt) ||
    readString(node.receivedAt) ||
    readString(node.startsAt) ||
    readString(node.updatedAt) ||
    null
  )
}

function recordsFromConnection(
  kind: HomebaseRecordKind,
  connection: HomebaseGraphConnection | undefined,
): CommandCenterSummaryHomebaseRecords['records'] {
  return readArray(connection?.edges)
    .filter(isRecord)
    .map((edge) => (isRecord(edge.node) ? edge.node : null))
    .filter((node): node is HomebaseGraphNode => Boolean(node))
    .map((node) => ({
      id: `${kind}:${readString(node.id, nodeLabel(kind, node))}`,
      label: excerpt(nodeLabel(kind, node), 120),
      kind,
      updatedAt: nodeTime(node),
    }))
}

async function fetchHomebaseRecords(
  fetcher: JsonFetcher,
): Promise<{
  records: CommandCenterSummaryHomebaseRecords['records']
  warnings: string[]
}> {
  const token = process.env.TWENTY_API_BEARER_TOKEN?.trim()
  const baseUrl = configuredUrl(
    [
      'TWENTY_API_BASE_URL',
      'TWENTY_HOMEBASE_URL',
      'NEXT_PUBLIC_TWENTY_HOMEBASE_URL',
    ],
    'http://127.0.0.1:3020',
  )
  if (!token || !baseUrl) {
    return {
      records: [],
      warnings: [
        'Twenty API bearer token is not configured; returning a reference-only Homebase summary.',
      ],
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)
  try {
    const response = await fetcher(new URL('/graphql', baseUrl), {
      method: 'POST',
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ query: homebaseQuery() }),
    })
    const payload = (await response.json()) as {
      data?: HomebaseGraphResponse
      errors?: Array<{ message?: string }>
    }
    if (!response.ok) {
      return {
        records: [],
        warnings: [`Twenty GraphQL HTTP ${response.status}`],
      }
    }
    if (payload.errors?.length) {
      return {
        records: [],
        warnings: payload.errors.map((error) =>
          redactText(error.message || 'Twenty GraphQL error'),
        ),
      }
    }
    const data = payload.data ?? {}
    return {
      records: [
        ...recordsFromConnection('task', data.tasks),
        ...recordsFromConnection('person', data.people),
        ...recordsFromConnection('meeting', data.meetingRecords),
        ...recordsFromConnection('message', data.messages),
        ...recordsFromConnection('calendar', data.calendarEvents),
        ...recordsFromConnection('approval', data.approvalRequests),
      ].slice(0, 20),
      warnings: [],
    }
  } catch (error) {
    return {
      records: [],
      warnings: [
        `Twenty Homebase: ${redactText(error instanceof Error ? error.message : String(error))}`,
      ],
    }
  } finally {
    clearTimeout(timeout)
  }
}

export async function buildCommandCenterToday(
  options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterToday>> {
  return summarySlice(
    options,
    'cael-workspace:command-center/today',
    (summary) => ({
      nowNext: summary.nowNext,
      priority: summary.nowNext.filter(
        (item) => item.tone === 'warning' || item.tone === 'danger',
      ),
      alerts: summary.nowNext.filter((item) => item.tone !== 'success'),
    }),
  )
}

export async function buildCommandCenterBrain(
  options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterBrain>> {
  const summary = await buildCommandCenterSummary(options)
  const root = configuredPath('MEMORY_ARTIFACT_ROOT', MEMORY_ARTIFACT_ROOT)
  const rootExists = Boolean(await fs.stat(root).catch(() => null))
  const artifacts = rootExists ? await listMemoryArtifacts(root) : []
  return {
    ...summary,
    source: 'cael-workspace:command-center/brain',
    data: summary.data
      ? {
          sources: summary.data.brain?.sources ?? [],
          memoryArtifacts: {
            count: artifacts.length,
            rootConfigured: rootExists,
            root: rootExists ? root : null,
          },
          policy: [
            'Brain sources are references and health snapshots, not raw secret stores.',
            'Writes remain gated by second-brain file policy and expected hashes.',
          ],
        }
      : null,
  }
}

export async function buildCommandCenterAutomations(
  _options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterAutomations>> {
  const response = await buildN8nGovernanceResponse()
  return createEnvelope({
    source: 'cael-workspace:command-center/automations',
    data: {
      boundary: response.boundary,
      instances: response.instances,
      promotionReceipts: response.promotionReceipts,
      guardrails: response.guardrails,
    },
    warnings: response.ok
      ? []
      : ['One or more n8n automation lanes reported degraded health.'],
  })
}

export async function buildCommandCenterActionGates(
  _options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterActionGates>> {
  const actions = [
    ...getN8nCommandRegistry().map(commandToAction),
    ...localActionGates(),
  ]
  return createEnvelope({
    source: 'cael-workspace:command-center/action-gates',
    data: {
      total: actions.length,
      approvalRequired: actions.filter((action) => action.approvalRequired)
        .length,
      dryRun: actions.filter((action) => action.dryRunSupported).length,
      actions,
    },
  })
}

export async function buildCommandCenterMemoryArtifacts(
  _options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterMemoryArtifacts>> {
  const root = configuredPath('MEMORY_ARTIFACT_ROOT', MEMORY_ARTIFACT_ROOT)
  const artifacts = await listMemoryArtifacts(root)
  const exists = Boolean(await fs.stat(root).catch(() => null))
  return createEnvelope({
    source: 'cael-workspace:command-center/memory-artifacts',
    data: {
      root,
      count: artifacts.length,
      artifacts,
    },
    warnings: exists ? [] : [`Memory artifact root is unavailable: ${root}`],
  })
}

export async function buildCommandCenterVaultRefs(
  _options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterVaultRefs>> {
  const refs = safeVaultRefs()
  return createEnvelope({
    source: 'cael-workspace:command-center/vault-refs',
    data: {
      warningCount: refs.filter((ref) => !ref.exists || ref.rotationDueAt)
        .length,
      refs,
      policy: [
        'Vault refs expose only item references and linked systems.',
        'No raw credential values, OAuth tokens, or retrieved secrets are returned by this API.',
      ],
    },
  })
}

export async function buildCommandCenterAgentRuns(
  _options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterAgentRuns>> {
  const [devHarnessRuns, promotionReceipts, chatRuns] = await Promise.all([
    withCommandCenterTimeout(listDevHarnessRuns(), []),
    withCommandCenterTimeout(collectPromotionReceipts(), []),
    withCommandCenterTimeout(listRecentPersistedRuns(12), []),
  ])
  const receiptRuns = promotionReceipts.map(receiptToRun)
  const persistedChatRuns = chatRuns.map(persistedRunToAgentRun)
  return createEnvelope({
    source: 'cael-workspace:command-center/agent-runs',
    data: {
      runs: [...persistedChatRuns, ...devHarnessRuns, ...receiptRuns]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 16),
      receipts: promotionReceipts,
    },
  })
}

export async function buildCommandCenterHomebaseRecords(
  options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterSummaryHomebaseRecords>> {
  const fetcher = options.fetcher ?? fetch
  const result = await fetchHomebaseRecords(fetcher)
  return createEnvelope({
    source: 'cael-workspace:command-center/homebase-records',
    data: {
      status: result.records.length
        ? 'available'
        : result.warnings.length
          ? 'degraded'
          : 'planned',
      detail: result.records.length
        ? 'Twenty/Homebase records were read server-side and reduced to safe summaries.'
        : 'Twenty/Homebase remains a legacy migration input until the safe adapter has credentials and schema parity.',
      records: result.records,
    },
    warnings: result.warnings,
  })
}

export async function buildCommandCenterUsageLimits(
  options: CommandCenterBuildOptions,
): Promise<CommandCenterEnvelope<CommandCenterSummaryUsage>> {
  return summarySlice(
    options,
    'cael-workspace:command-center/usage-limits',
    (summary) => summary.usage ?? { enabledProviders: [], providers: [] },
  )
}

export async function buildCommandCenterBrainSources(): Promise<
  CommandCenterSummaryBrainSource[]
> {
  return (await listSecondBrainSources()).map((source) => ({
    id: source.id,
    label: source.label,
    category: source.category,
    status: source.status,
    writable: source.writable,
  }))
}
