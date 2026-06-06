import { randomUUID } from 'node:crypto'
import {
  appendFile,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from 'node:fs/promises'
import { join } from 'node:path'

import type { DelegationHandoff, VoiceReview } from './-voice-lab-ledger-utils'

export type QueueStatus =
  | 'Triage'
  | 'Proposed'
  | 'Queued'
  | 'In Progress'
  | 'Blocked'
  | 'Done'
  | 'Archived'
export type QueuePriority = 'P0' | 'P1' | 'P2' | 'P3'
export type QueueRiskLevel = 'Low' | 'Medium' | 'High'
export type QueueApprovalLevel =
  | 'Auto'
  | 'Ask Before External'
  | 'Ask Before Spend'
  | 'Ask Before System Change'
  | 'Manual Only'
export type QueueConfidence = 'Low' | 'Medium' | 'High'
export type QueueDomain =
  | 'AI Ops'
  | 'Restored'
  | 'Travel Multiplier'
  | 'Personal'
  | 'Finance'
  | 'Code'
  | 'Research'
  | 'Email'
  | 'Calendar'
  | 'Meetings'
  | 'Home'
  | 'Health'

export type QueueOwner =
  | 'Executive'
  | 'Restored COS'
  | 'TM COS'
  | 'Personal COS'
  | 'Coding Agent'
  | 'Research Agent'
  | 'Finance CFO'
  | 'Email Assistant'
  | 'Calendar Assistant'
  | 'Meeting Notes Agent'
  | 'Voice Lab'
  | 'Tim'
  | `Human: ${string}`

export type QueueAuditEvent = {
  action: string
  actor: string
  timestamp: string
  note?: string
  from?: string
  to?: string
}

export type ExecutiveQueueItem = {
  schemaVersion: 1
  id: string
  title: string
  outcome: string
  status: QueueStatus
  priority: QueuePriority
  domain: QueueDomain
  owner: QueueOwner
  riskLevel: QueueRiskLevel
  approvalLevel: QueueApprovalLevel
  confidence: QueueConfidence
  source: {
    type: 'Voice Lab'
    id: string
    timestamp: string
    excerpt: string
    fullReference: string
  }
  context: string
  constraints: Array<string>
  nextAction: string
  blockedReason: string
  resultSummary: string
  createdAt: string
  updatedAt: string
  dueAt: string
  completedAt: string
  completedBy: string
  auditTrail: Array<QueueAuditEvent>
  sync: {
    notionPageId: string
    lastSyncedAt: string
    lastSyncStatus: 'not_synced' | 'synced' | 'error'
  }
  localPath: string
}

export type QueueBoardColumn =
  | 'Triage'
  | 'Proposed'
  | 'Queued'
  | 'In Progress'
  | 'Blocked'
  | 'Done'
export const QUEUE_BOARD_COLUMNS: Array<QueueBoardColumn> = [
  'Triage',
  'Proposed',
  'Queued',
  'In Progress',
  'Blocked',
  'Done',
]

export type ListQueueItemsInput = {
  root?: string
  includeArchived?: boolean
  status?: QueueStatus
  owner?: QueueOwner
  domain?: QueueDomain
}

type CreateQueueItemFromVoiceLabInput = {
  root?: string
  now: string
  conversationId: string
  ledgerPath: string
  delegation: DelegationHandoff
  review?: VoiceReview
}

type TransitionQueueItemInput = {
  status: QueueStatus
  actor: string
  now: string
  resultSummary?: string
  blockedReason?: string
}

export type QueueApprovalDecision =
  | 'approve_action'
  | 'hold'
  | 'manual_only'
  | 'broader_approval'

type PersistedTransitionQueueItemInput = TransitionQueueItemInput & {
  root?: string
  id: string
}

type ApplyQueueApprovalInput = {
  root?: string
  id: string
  decision: QueueApprovalDecision
  actor: string
  now: string
  note?: string
}

export type QueueExecutionMode =
  | 'approve_and_run'
  | 'draft_only'
  | 'explain_more'

export type QueueExecutionRecord = {
  schemaVersion: 1
  id: string
  itemId: string
  itemTitle: string
  mode: QueueExecutionMode
  actor: string
  timestamp: string
  note: string
  sessionKey: string
  approvalReceiptId?: string
  approvalReceiptPath?: string
  status: 'dispatched' | 'completed' | 'error'
  prompt: string
  localPath: string
  completedAt?: string
  resultSummary?: string
  error?: string
  runId?: string | null
}

export type QueueApprovalReceipt = {
  schemaVersion: 1
  id: string
  itemId: string
  itemTitle: string
  mode: Exclude<QueueExecutionMode, 'explain_more'>
  actor: string
  timestamp: string
  approvedPhrase: string
  normalizedScope: string
  sourceChannel: string
  sourceReference: {
    sessionId: string
    messageId: string
    fallbackReference: string
  }
  riskLevel: QueueRiskLevel
  approvalLevel: QueueApprovalLevel
  sessionKey: string
  authorizedSideEffects: Array<string>
  forbiddenSideEffects: Array<string>
  expectedTimSurface: string
  rawWorkerOutputPolicy: string
  status: 'captured'
  localPath: string
}

type BuildQueueExecutionPromptInput = {
  mode: QueueExecutionMode
  actor: string
  note?: string
}

type CreateQueueExecutionRecordInput = BuildQueueExecutionPromptInput & {
  root?: string
  item: ExecutiveQueueItem
  now: string
  sessionKey: string
  approvalReceipt?: QueueApprovalReceipt
}

type CreateQueueApprovalReceiptInput = {
  root?: string
  item: ExecutiveQueueItem
  mode: Exclude<QueueExecutionMode, 'explain_more'>
  actor: string
  now: string
  note?: string
  sessionKey: string
  approvedPhrase?: string
  sourceChannel?: string
  sourceReference?: Partial<QueueApprovalReceipt['sourceReference']>
}

function slugId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

function createId(input: CreateQueueItemFromVoiceLabInput): string {
  return `eq_${input.now.slice(0, 10).replace(/-/g, '')}_${slugId(input.conversationId)}`
}

function defaultRoot(): string {
  return join(
    process.env.HERMES_HOME ||
      join(
        process.env.HOME || '/Users/hermes',
        '.hermes',
        'profiles',
        'executive',
      ),
    'executive-queue',
  )
}

function cleanSentence(value: string): string {
  return value.trim().replace(/[.!?]+$/, '')
}

function titleFromOutcome(outcome: string): string {
  const cleaned = cleanSentence(outcome)
  if (/may 28|webinar|travel multiplier/i.test(cleaned))
    return 'Prepare May 28 Travel Multiplier webinar'
  return cleaned.slice(0, 80) || 'Untitled Executive Queue item'
}

function domainFromInput(input: CreateQueueItemFromVoiceLabInput): QueueDomain {
  const text = `${input.delegation.outcome} ${input.delegation.context}`
  if (/travel multiplier|webinar|travel hacking|course/i.test(text))
    return 'Travel Multiplier'
  if (/restored|church|pastor|staff|pco|planning center/i.test(text))
    return 'Restored'
  if (/monarch|receipt|expensify|budget|transaction/i.test(text))
    return 'Finance'
  if (/code|bug|build|deploy|github|repo/i.test(text)) return 'Code'
  if (/research|find|scan|current facts/i.test(text)) return 'Research'
  if (/email|inbox|reply/i.test(text)) return 'Email'
  if (/calendar|schedule|meeting time/i.test(text)) return 'Calendar'
  return 'AI Ops'
}

function ownerFromDelegation(owner: string, domain: QueueDomain): QueueOwner {
  const normalized = owner.trim().toLowerCase()
  if (normalized.includes('tm cos') || normalized.includes('sales webinar'))
    return 'TM COS'
  if (normalized.includes('restored')) return 'Restored COS'
  if (normalized.includes('personal')) return 'Personal COS'
  if (normalized.includes('coding')) return 'Coding Agent'
  if (normalized.includes('research')) return 'Research Agent'
  if (normalized.includes('finance')) return 'Finance CFO'
  if (normalized.includes('email')) return 'Email Assistant'
  if (normalized.includes('calendar')) return 'Calendar Assistant'
  if (normalized.includes('meeting')) return 'Meeting Notes Agent'
  if (normalized.includes('tim')) return 'Tim'
  if (domain === 'Travel Multiplier') return 'TM COS'
  if (domain === 'Restored') return 'Restored COS'
  return 'Executive'
}

function riskFromInput(
  input: CreateQueueItemFromVoiceLabInput,
  domain: QueueDomain,
): QueueRiskLevel {
  const fullText = `${input.delegation.outcome} ${input.delegation.context} ${input.delegation.nextAction}`
  const nextAction = input.delegation.nextAction
  if (
    domain === 'Restored' &&
    /pastoral|staff|conflict|care|minor|discipline|counsel/i.test(fullText)
  )
    return 'High'
  if (
    /spend|purchase|deploy|restart|secret|credential|production|config/i.test(
      fullText,
    )
  )
    return 'High'
  if (/send|publish|post|contact|external/i.test(nextAction)) return 'High'
  if (
    /shared|notion|calendar|draft|categor|approval|publish|send/i.test(fullText)
  )
    return 'Medium'
  if (input.delegation.approvalRequired) return 'Medium'
  return 'Low'
}

function approvalFromRisk(
  input: CreateQueueItemFromVoiceLabInput,
  riskLevel: QueueRiskLevel,
): QueueApprovalLevel {
  const text = `${input.delegation.outcome} ${input.delegation.context} ${input.delegation.nextAction}`
  if (/spend|purchase|subscription|paid|credits|ad spend/i.test(text))
    return 'Ask Before Spend'
  if (
    /deploy|restart|config|secret|credential|production|launchd|docker|cron/i.test(
      text,
    )
  )
    return 'Ask Before System Change'
  if (
    /send|publish|post|contact|external|shared docs?|before publishing|before sending/i.test(
      text,
    )
  )
    return 'Ask Before External'
  if (riskLevel === 'High') return 'Manual Only'
  if (input.delegation.approvalRequired) return 'Ask Before External'
  return 'Auto'
}

function priorityFromInput(
  input: CreateQueueItemFromVoiceLabInput,
): QueuePriority {
  const text = `${input.delegation.outcome} ${input.delegation.context}`
  if (/urgent|now|drop other work/i.test(text)) return 'P0'
  if (/today|may 28|webinar/i.test(text)) return 'P1'
  if (/this week/i.test(text)) return 'P2'
  return 'P3'
}

function canAutoQueue(
  item: Pick<
    ExecutiveQueueItem,
    'confidence' | 'riskLevel' | 'approvalLevel' | 'nextAction' | 'domain'
  >,
): boolean {
  const internalPrep =
    /draft|prepare|research|summarize|outline|review|classify|plan/i.test(
      item.nextAction,
    )
  if (item.confidence !== 'High') return false
  if (!internalPrep) return false
  if (item.domain === 'Restored' && item.riskLevel === 'High') return false
  if (item.riskLevel === 'High') return false
  return (
    item.approvalLevel === 'Auto' ||
    item.approvalLevel === 'Ask Before External'
  )
}

function buildLocalPath(root: string, now: string, id: string): string {
  return join(root, 'items', now.slice(0, 10), `${id}.json`)
}

function isQueueItem(value: unknown): value is ExecutiveQueueItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<ExecutiveQueueItem>
  return (
    item.schemaVersion === 1 &&
    typeof item.id === 'string' &&
    typeof item.title === 'string'
  )
}

function matchesListFilter(
  item: ExecutiveQueueItem,
  input: ListQueueItemsInput,
): boolean {
  if (!input.includeArchived && item.status === 'Archived') return false
  if (input.status && item.status !== input.status) return false
  if (input.owner && item.owner !== input.owner) return false
  if (input.domain && item.domain !== input.domain) return false
  return true
}

export function groupQueueItemsForBoard(
  items: Array<ExecutiveQueueItem>,
): Record<QueueBoardColumn, Array<ExecutiveQueueItem>> {
  const grouped: Record<QueueBoardColumn, Array<ExecutiveQueueItem>> = {
    Triage: [],
    Proposed: [],
    Queued: [],
    'In Progress': [],
    Blocked: [],
    Done: [],
  }

  for (const item of items) {
    if (item.status === 'Archived') continue
    if (item.status in grouped)
      grouped[item.status as QueueBoardColumn].push(item)
  }

  return grouped
}

export async function listQueueItems(
  input: ListQueueItemsInput = {},
): Promise<Array<ExecutiveQueueItem>> {
  const root = input.root ?? defaultRoot()
  const itemsRoot = join(root, 'items')
  const items: Array<ExecutiveQueueItem> = []

  let dateDirs: Array<string>
  try {
    dateDirs = await readdir(itemsRoot)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT')
      return []
    throw error
  }

  for (const dateDir of dateDirs) {
    const dir = join(itemsRoot, dateDir)
    let files: Array<string>
    try {
      files = await readdir(dir)
    } catch {
      continue
    }

    for (const file of files) {
      if (!file.endsWith('.json')) continue
      try {
        const parsed = JSON.parse(
          await readFile(join(dir, file), 'utf-8'),
        ) as unknown
        if (isQueueItem(parsed) && matchesListFilter(parsed, input))
          items.push(parsed)
      } catch {
        continue
      }
    }
  }

  const priorityWeight: Record<string, number> = {
    P0: 0,
    P1: 1,
    P2: 2,
    P3: 3,
    P4: 4,
  }
  const statusWeight: Record<string, number> = {
    Proposed: 0,
    Triage: 1,
    Queued: 2,
    'In Progress': 3,
    Blocked: 4,
    Done: 8,
    Archived: 9,
  }

  return items.sort((a, b) => {
    const activeA = a.status === 'Done' || a.status === 'Archived' ? 1 : 0
    const activeB = b.status === 'Done' || b.status === 'Archived' ? 1 : 0
    if (activeA !== activeB) return activeA - activeB

    const priority =
      (priorityWeight[a.priority] ?? 9) - (priorityWeight[b.priority] ?? 9)
    if (priority !== 0) return priority

    const status = (statusWeight[a.status] ?? 9) - (statusWeight[b.status] ?? 9)
    if (status !== 0) return status

    return b.updatedAt.localeCompare(a.updatedAt)
  })
}

export function buildQueueItemFromVoiceLab(
  input: CreateQueueItemFromVoiceLabInput,
): ExecutiveQueueItem {
  const root = input.root ?? defaultRoot()
  const id = createId(input)
  const domain = domainFromInput(input)
  const owner = ownerFromDelegation(input.delegation.owner, domain)
  const riskLevel = riskFromInput(input, domain)
  const approvalLevel = approvalFromRisk(input, riskLevel)
  const priority = priorityFromInput(input)
  const confidence: QueueConfidence =
    input.delegation.outcome && input.delegation.nextAction ? 'High' : 'Low'
  const sourceExcerpt = input.delegation.outcome.slice(0, 280)
  const baseItem: ExecutiveQueueItem = {
    schemaVersion: 1,
    id,
    title: titleFromOutcome(input.delegation.outcome),
    outcome: cleanSentence(input.delegation.outcome),
    status: 'Triage',
    priority,
    domain,
    owner,
    riskLevel,
    approvalLevel,
    confidence,
    source: {
      type: 'Voice Lab',
      id: input.conversationId,
      timestamp: input.now,
      excerpt: sourceExcerpt,
      fullReference: input.ledgerPath,
    },
    context: input.delegation.context,
    constraints: input.delegation.constraints,
    nextAction: cleanSentence(input.delegation.nextAction),
    blockedReason: '',
    resultSummary: '',
    createdAt: input.now,
    updatedAt: input.now,
    dueAt: '',
    completedAt: '',
    completedBy: '',
    auditTrail: [
      {
        action: 'created',
        actor: 'Voice Lab',
        timestamp: input.now,
        note:
          input.review?.summary ?? 'Created from Voice Lab delegation handoff.',
      },
    ],
    sync: {
      notionPageId: '',
      lastSyncedAt: '',
      lastSyncStatus: 'not_synced',
    },
    localPath: buildLocalPath(root, input.now, id),
  }

  if (!canAutoQueue(baseItem)) return baseItem

  return {
    ...baseItem,
    status: 'Queued',
    auditTrail: [
      ...baseItem.auditTrail,
      {
        action: 'auto_queued',
        actor: 'Executive',
        timestamp: input.now,
        from: 'Triage',
        to: 'Queued',
        note: 'High confidence internal prep under allowed approval level.',
      },
    ],
  }
}

export function transitionQueueItem(
  item: ExecutiveQueueItem,
  input: TransitionQueueItemInput,
): ExecutiveQueueItem {
  if (input.status === 'Done' && !input.resultSummary?.trim()) {
    return {
      ...item,
      status: 'Blocked',
      blockedReason: 'Done requires result summary.',
      updatedAt: input.now,
      auditTrail: [
        ...item.auditTrail,
        {
          action: 'blocked',
          actor: input.actor,
          timestamp: input.now,
          from: item.status,
          to: 'Blocked',
          note: 'Done requires result summary.',
        },
      ],
    }
  }

  return {
    ...item,
    status: input.status,
    resultSummary: input.resultSummary?.trim() ?? item.resultSummary,
    blockedReason:
      input.blockedReason?.trim() ??
      (input.status === 'Blocked' ? item.blockedReason : ''),
    completedAt: input.status === 'Done' ? input.now : item.completedAt,
    completedBy: input.status === 'Done' ? input.actor : item.completedBy,
    updatedAt: input.now,
    auditTrail: [
      ...item.auditTrail,
      {
        action: 'status_changed',
        actor: input.actor,
        timestamp: input.now,
        from: item.status,
        to: input.status,
      },
    ],
  }
}

export async function writeQueueItem(
  item: ExecutiveQueueItem,
  root?: string,
): Promise<ExecutiveQueueItem> {
  const queueRoot = root ?? defaultRoot()
  const localPath =
    item.localPath || buildLocalPath(queueRoot, item.createdAt, item.id)
  const record = { ...item, localPath }
  await mkdir(join(queueRoot, 'items', item.createdAt.slice(0, 10)), {
    recursive: true,
    mode: 0o700,
  })
  await writeFile(localPath, `${JSON.stringify(record, null, 2)}\n`, {
    mode: 0o600,
  })
  await appendFile(
    join(queueRoot, 'index.jsonl'),
    `${JSON.stringify({ id: record.id, status: record.status, priority: record.priority, owner: record.owner, updatedAt: record.updatedAt, localPath })}\n`,
    { mode: 0o600 },
  )
  return record
}

export async function readQueueItemById(
  id: string,
  root?: string,
): Promise<ExecutiveQueueItem | null> {
  const items = await listQueueItems({ root, includeArchived: true })
  return items.find((item) => item.id === id) ?? null
}

export async function updateQueueItemStatus(
  input: PersistedTransitionQueueItemInput,
): Promise<ExecutiveQueueItem> {
  const item = await readQueueItemById(input.id, input.root)
  if (!item) throw new Error(`Queue item not found: ${input.id}`)
  const updated = transitionQueueItem(item, input)
  return writeQueueItem(updated, input.root)
}

export async function applyQueueApproval(
  input: ApplyQueueApprovalInput,
): Promise<ExecutiveQueueItem> {
  const item = await readQueueItemById(input.id, input.root)
  if (!item) throw new Error(`Queue item not found: ${input.id}`)

  const note = input.note?.trim()
  const next = (() => {
    if (input.decision === 'approve_action') {
      return {
        ...item,
        status: 'In Progress' as const,
        updatedAt: input.now,
        auditTrail: [
          ...item.auditTrail,
          {
            action: 'approval_granted',
            actor: input.actor,
            timestamp: input.now,
            from: item.status,
            to: 'In Progress',
            note: note || 'Approved this action only.',
          },
        ],
      }
    }

    if (input.decision === 'broader_approval') {
      return {
        ...item,
        status: 'In Progress' as const,
        updatedAt: input.now,
        auditTrail: [
          ...item.auditTrail,
          {
            action: 'broader_approval_granted',
            actor: input.actor,
            timestamp: input.now,
            from: item.status,
            to: 'In Progress',
            note: note || 'Broader approval granted for this queue item.',
          },
        ],
      }
    }

    if (input.decision === 'manual_only') {
      return {
        ...item,
        status: 'Proposed' as const,
        approvalLevel: 'Manual Only' as const,
        updatedAt: input.now,
        auditTrail: [
          ...item.auditTrail,
          {
            action: 'manual_only_set',
            actor: input.actor,
            timestamp: input.now,
            from: item.status,
            to: 'Proposed',
            note: note || 'Manual only mode set from approval controls.',
          },
        ],
      }
    }

    return {
      ...item,
      status: 'Blocked' as const,
      blockedReason: note || 'Held from Executive Queue approval controls.',
      updatedAt: input.now,
      auditTrail: [
        ...item.auditTrail,
        {
          action: 'approval_held',
          actor: input.actor,
          timestamp: input.now,
          from: item.status,
          to: 'Blocked',
          note: note || 'Held from Executive Queue approval controls.',
        },
      ],
    }
  })()

  return writeQueueItem(next, input.root)
}

export function buildQueueExecutionPrompt(
  item: ExecutiveQueueItem,
  input: BuildQueueExecutionPromptInput,
): string {
  const note = input.note?.trim()
  const approvalReceipt =
    'approvalReceipt' in input
      ? (input.approvalReceipt as QueueApprovalReceipt | undefined)
      : undefined
  const constraints = item.constraints.length
    ? item.constraints.map((constraint) => `- ${constraint}`).join('\n')
    : '- No extra constraints recorded.'

  return [
    "You are Executive operating from Tim Walker's Workspace Command Center.",
    '',
    `Execution mode: ${input.mode}`,
    input.mode === 'explain_more'
      ? 'Approval scope: explanation only. Do not approve, execute, mutate, or mark this queue item in progress.'
      : 'Approval scope: single queue item only. Do not treat this as broader approval.',
    input.mode === 'explain_more'
      ? 'Side-effect rule: Write a concise Telegram reply to Tim that explains what this item is, why it matters, what approval would allow, what risks exist, and 2-3 good questions he can ask before deciding.'
      : input.mode === 'draft_only'
        ? 'Side-effect rule: prepare local drafts and analysis only. Do not send, publish, spend, schedule, restart services, or contact people.'
        : 'Side-effect rule: execute only the queue item below. If the work requires sending, publishing, spending, calendar commitments, people decisions, or broader system changes beyond the named item, stop and ask Tim.',
    '',
    `Queue item: ${item.title}`,
    `Queue ID: ${item.id}`,
    `Priority: ${item.priority}`,
    `Domain: ${item.domain}`,
    `Owner: ${item.owner}`,
    `Risk: ${item.riskLevel}`,
    `Approval level: ${item.approvalLevel}`,
    `Outcome: ${item.outcome}`,
    `Context: ${item.context || 'None'}`,
    `Next action: ${item.nextAction || 'Needs triage'}`,
    approvalReceipt
      ? `Approval receipt: ${approvalReceipt.localPath}`
      : 'Approval receipt: none recorded for this execution mode.',
    '',
    'Constraints:',
    constraints,
    '',
    note ? `Tim's note: ${note}` : "Tim's note: none.",
    '',
    'Worker safety filter: raw Codex, Kanban, or other worker output must stay behind Executive synthesis. Do not paste raw worker logs to Tim unless Tim explicitly asks for the raw execution record.',
    'Approval phrase rule: generic Approve or Approve and Run cannot authorize multiple unrelated side effects. Stay inside the single queue item and receipt.',
    'Delivery requirement: your final response must be a concise, ready-to-read execution report. Include the real result, verification output, artifact paths created, and whether any follow-up approval is needed. The Workspace API sends this as plain Telegram status/completion text. Do not create routine HTML status cards unless the deliverable itself is a dense review artifact.',
  ].join('\n')
}

function authorizedSideEffectsForReceipt(
  input: CreateQueueApprovalReceiptInput,
): Array<string> {
  if (input.mode === 'draft_only') {
    return [
      'Prepare local drafts, analysis, and artifacts for this single queue item.',
      'Report concise status and completion back to Tim.',
    ]
  }

  return [
    'Execute only this single queue item within its recorded risk and approval boundaries.',
    'Create local artifacts needed to prove the result.',
    'Report concise status and completion back to Tim.',
  ]
}

function forbiddenSideEffectsForReceipt(): Array<string> {
  return [
    'No external messages unless this exact queue item explicitly authorizes sending.',
    'No spending or paid services unless this exact queue item explicitly authorizes spend.',
    'No calendar commitments unless this exact queue item explicitly authorizes scheduling.',
    'No people decisions, Restored pastoral decisions, or sensitive domain decisions.',
    'No cron, launchd, Docker, gateway, Workspace, dashboard, config, credential, or production-system changes unless this exact queue item explicitly authorizes them.',
    'No broad interpretation of a generic Approve reply beyond the immediately preceding explicit action.',
  ]
}

export async function createQueueApprovalReceipt(
  input: CreateQueueApprovalReceiptInput,
): Promise<QueueApprovalReceipt> {
  const queueRoot = input.root ?? defaultRoot()
  const id = `qreceipt_${input.now.slice(0, 10).replace(/-/g, '')}_${randomUUID()}`
  const localPath = join(
    queueRoot,
    'approval-receipts',
    input.now.slice(0, 10),
    `${id}.json`,
  )
  const approvedPhrase =
    input.approvedPhrase?.trim() ||
    input.note?.trim() ||
    (input.mode === 'draft_only' ? 'Draft Only' : 'Approve and Run')
  const record: QueueApprovalReceipt = {
    schemaVersion: 1,
    id,
    itemId: input.item.id,
    itemTitle: input.item.title,
    mode: input.mode,
    actor: input.actor,
    timestamp: input.now,
    approvedPhrase,
    normalizedScope: `Approval authorizes ${input.mode} for one Executive Queue item only: ${input.item.title}`,
    sourceChannel: input.sourceChannel?.trim() || 'Workspace',
    sourceReference: {
      sessionId: input.sourceReference?.sessionId?.trim() || '',
      messageId: input.sourceReference?.messageId?.trim() || '',
      fallbackReference:
        input.sourceReference?.fallbackReference?.trim() ||
        'Workspace Executive Queue execution control',
    },
    riskLevel: input.item.riskLevel,
    approvalLevel: input.item.approvalLevel,
    sessionKey: input.sessionKey,
    authorizedSideEffects: authorizedSideEffectsForReceipt(input),
    forbiddenSideEffects: forbiddenSideEffectsForReceipt(),
    expectedTimSurface:
      'Plain Telegram lifecycle updates plus one concise completion report.',
    rawWorkerOutputPolicy:
      'Hidden behind Executive synthesis unless Tim asks for the raw execution record.',
    status: 'captured',
    localPath,
  }

  await mkdir(join(queueRoot, 'approval-receipts', input.now.slice(0, 10)), {
    recursive: true,
    mode: 0o700,
  })
  await writeFile(localPath, `${JSON.stringify(record, null, 2)}\n`, {
    mode: 0o600,
  })
  await appendFile(
    join(queueRoot, 'approval-receipts.jsonl'),
    `${JSON.stringify({ id: record.id, itemId: record.itemId, mode: record.mode, actor: record.actor, timestamp: record.timestamp, sourceChannel: record.sourceChannel, localPath })}\n`,
    { mode: 0o600 },
  )
  return record
}

export async function createQueueExecutionRecord(
  input: CreateQueueExecutionRecordInput,
): Promise<QueueExecutionRecord> {
  const queueRoot = input.root ?? defaultRoot()
  const id = `qexec_${input.now.slice(0, 10).replace(/-/g, '')}_${randomUUID()}`
  const localPath = join(
    queueRoot,
    'executions',
    input.now.slice(0, 10),
    `${id}.json`,
  )
  const record: QueueExecutionRecord = {
    schemaVersion: 1,
    id,
    itemId: input.item.id,
    itemTitle: input.item.title,
    mode: input.mode,
    actor: input.actor,
    timestamp: input.now,
    note: input.note?.trim() ?? '',
    sessionKey: input.sessionKey,
    approvalReceiptId: input.approvalReceipt?.id,
    approvalReceiptPath: input.approvalReceipt?.localPath,
    status: 'dispatched',
    prompt: buildQueueExecutionPrompt(input.item, input),
    localPath,
  }

  await mkdir(join(queueRoot, 'executions', input.now.slice(0, 10)), {
    recursive: true,
    mode: 0o700,
  })
  await writeFile(localPath, `${JSON.stringify(record, null, 2)}\n`, {
    mode: 0o600,
  })
  await appendFile(
    join(queueRoot, 'executions.jsonl'),
    `${JSON.stringify({ id: record.id, itemId: record.itemId, mode: record.mode, actor: record.actor, timestamp: record.timestamp, sessionKey: record.sessionKey, localPath })}\n`,
    { mode: 0o600 },
  )
  return record
}

export async function updateQueueExecutionRecord(
  record: QueueExecutionRecord,
  patch: Partial<
    Pick<
      QueueExecutionRecord,
      'status' | 'completedAt' | 'resultSummary' | 'error' | 'runId'
    >
  >,
): Promise<QueueExecutionRecord> {
  const existing = JSON.parse(
    await readFile(record.localPath, 'utf8'),
  ) as QueueExecutionRecord
  const updated: QueueExecutionRecord = {
    ...existing,
    ...patch,
  }
  await writeFile(record.localPath, `${JSON.stringify(updated, null, 2)}\n`, {
    mode: 0o600,
  })
  return updated
}

async function createQueueItemFromVoiceLabAsync(
  input: CreateQueueItemFromVoiceLabInput,
): Promise<ExecutiveQueueItem> {
  const item = buildQueueItemFromVoiceLab(input)
  return writeQueueItem(item, input.root)
}

export const createQueueItemFromVoiceLab = Object.assign(
  createQueueItemFromVoiceLabAsync,
  {
    sync: buildQueueItemFromVoiceLab,
  },
)
