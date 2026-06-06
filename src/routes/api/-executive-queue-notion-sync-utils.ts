import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { listQueueItems, readQueueItemById, writeQueueItem } from './-executive-queue-utils'
import type { ExecutiveQueueItem } from './-executive-queue-utils'

export type NotionSyncMode = 'proposal_only' | 'apply_approved'

export type NotionRichTextProperty = {
  rich_text: Array<{ text: { content: string } }>
}

export type NotionSelectProperty = {
  select: { name: string }
}

export type NotionTitleProperty = {
  title: Array<{ text: { content: string } }>
}

export type NotionUrlProperty = {
  url: string | null
}

export type NotionDateProperty = {
  date: { start: string } | null
}

export type ExecutiveQueueNotionProperties = {
  Name: NotionTitleProperty
  Status: NotionSelectProperty
  Priority: NotionSelectProperty
  Domain: NotionSelectProperty
  Owner: NotionSelectProperty
  Risk: NotionSelectProperty
  Approval: NotionSelectProperty
  Outcome: NotionRichTextProperty
  'Next Action': NotionRichTextProperty
  Context: NotionRichTextProperty
  Constraints: NotionRichTextProperty
  Source: NotionRichTextProperty
  'Queue Item ID': NotionRichTextProperty
  'Local Path': NotionRichTextProperty
  'Source Reference': NotionUrlProperty
  'Created At': NotionDateProperty
  'Updated At': NotionDateProperty
}

export type NotionSyncOperation = {
  operation: 'create' | 'update'
  queueItemId: string
  title: string
  reason: string
  notionPageId: string
  notionProperties: ExecutiveQueueNotionProperties
}

export type NotionSyncSkippedItem = {
  queueItemId: string
  title: string
  reason: string
}

export type ExecutiveQueueNotionSyncProposal = {
  schemaVersion: 1
  id: string
  mode: NotionSyncMode
  actor: string
  generatedAt: string
  eligibleCount: number
  totalCount: number
  wouldCreate: Array<NotionSyncOperation>
  wouldUpdate: Array<NotionSyncOperation>
  wouldSkip: Array<NotionSyncSkippedItem>
  wouldDelete: Array<never>
  warnings: Array<string>
  persistedPath: string
}

export type BuildNotionSyncProposalInput = {
  items: Array<ExecutiveQueueItem>
  now: string
  actor: string
  mode: 'proposal_only'
}

export type CreateNotionSyncProposalInput = {
  root?: string
  now: string
  actor: string
  mode: 'proposal_only'
}

export type NotionWriteResult = {
  operation: 'create' | 'update'
  queueItemId: string
  notionPageId: string
  title: string
}

export type NotionSyncApproval = {
  proposalId: string
  proposalPath: string
  approvedBy: string
  approvalText: string
  expectedCreates: number
  expectedUpdates: number
}

export type NotionHttpClient = (input: { path: string; method: 'POST' | 'PATCH'; body: Record<string, unknown> }) => Promise<Record<string, unknown>>

export type ApplyApprovedNotionSyncInput = {
  root?: string
  now: string
  actor: string
  databaseId?: string
  approval: NotionSyncApproval
  notionClient?: NotionHttpClient
}

export type ExecutiveQueueNotionSyncApplyResult = {
  schemaVersion: 1
  mode: 'apply_approved'
  actor: string
  appliedAt: string
  proposalId: string
  proposalPath: string
  created: Array<NotionWriteResult>
  updated: Array<NotionWriteResult>
  skipped: Array<NotionSyncSkippedItem>
  deleted: Array<never>
  warnings: Array<string>
  persistedPath: string
}

function defaultRoot(): string {
  return join(process.env.HERMES_HOME || join(process.env.HOME || '/Users/hermes', '.hermes', 'profiles', 'executive'), 'executive-queue')
}

function clampText(value: string, max = 1900): string {
  const text = value.trim()
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

function richText(value: string): NotionRichTextProperty {
  return { rich_text: [{ text: { content: clampText(value) } }] }
}

function title(value: string): NotionTitleProperty {
  return { title: [{ text: { content: clampText(value || 'Untitled Executive Queue item', 1900) } }] }
}

function select(value: string): NotionSelectProperty {
  return { select: { name: value || 'None' } }
}

function date(value: string): NotionDateProperty {
  return value ? { date: { start: value } } : { date: null }
}

function sourceUrl(value: string): NotionUrlProperty {
  if (/^https?:\/\//i.test(value)) return { url: value }
  return { url: null }
}

function proposalId(now: string): string {
  return `notion_sync_proposal_${now.replace(/[^0-9]/g, '').slice(0, 14)}`
}

function proposalPath(root: string, now: string, id: string): string {
  return join(root, 'notion-sync-proposals', now.slice(0, 10), `${id}.json`)
}

function applyResultPath(root: string, now: string, syncProposalId: string): string {
  return join(root, 'notion-sync-results', now.slice(0, 10), `${syncProposalId}-apply-${now.replace(/[^0-9]/g, '').slice(0, 14)}.json`)
}

function getNotionToken(): string {
  const token = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN
  if (!token) throw new Error('Missing Notion API token. Set NOTION_API_KEY or NOTION_TOKEN in local secure config, not chat.')
  return token
}

function getDatabaseId(inputDatabaseId?: string): string {
  const databaseId = inputDatabaseId || process.env.EXECUTIVE_QUEUE_NOTION_DATABASE_ID || process.env.NOTION_EXECUTIVE_QUEUE_DATABASE_ID
  if (!databaseId) throw new Error('Missing Executive Queue Notion database ID. Set EXECUTIVE_QUEUE_NOTION_DATABASE_ID in local secure config.')
  return databaseId
}

function extractNotionPageId(response: Record<string, unknown>): string {
  const id = response.id
  if (typeof id !== 'string' || !id.trim()) throw new Error('Notion response did not include a page id.')
  return id
}

async function defaultNotionClient(input: { path: string; method: 'POST' | 'PATCH'; body: Record<string, unknown> }): Promise<Record<string, unknown>> {
  const response = await fetch(`https://api.notion.com/v1${input.path}`, {
    method: input.method,
    headers: {
      Authorization: `Bearer ${getNotionToken()}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify(input.body),
  })
  const text = await response.text()
  const data = text ? (JSON.parse(text) as Record<string, unknown>) : {}
  if (!response.ok) {
    const message = typeof data.message === 'string' ? data.message : `Notion API failed with ${response.status}`
    throw new Error(message)
  }
  return data
}

export function filterNotionSyncEligibleItems(items: Array<ExecutiveQueueItem>): Array<ExecutiveQueueItem> {
  return items.filter((item) => item.status !== 'Triage' && item.status !== 'Archived')
}

export function buildNotionProperties(item: ExecutiveQueueItem): ExecutiveQueueNotionProperties {
  return {
    Name: title(item.title),
    Status: select(item.status),
    Priority: select(item.priority),
    Domain: select(item.domain),
    Owner: select(item.owner),
    Risk: select(item.riskLevel),
    Approval: select(item.approvalLevel),
    Outcome: richText(item.outcome),
    'Next Action': richText(item.nextAction),
    Context: richText(item.context),
    Constraints: richText(item.constraints.join('\n')),
    Source: richText(`${item.source.type}: ${item.source.id}\n${item.source.excerpt}`),
    'Queue Item ID': richText(item.id),
    'Local Path': richText(item.localPath),
    'Source Reference': sourceUrl(item.source.fullReference),
    'Created At': date(item.createdAt),
    'Updated At': date(item.updatedAt),
  }
}

export function buildNotionSyncProposal(input: BuildNotionSyncProposalInput): ExecutiveQueueNotionSyncProposal {
  const eligible = filterNotionSyncEligibleItems(input.items)
  const skipped = input.items
    .filter((item) => item.status === 'Triage' || item.status === 'Archived')
    .map((item) => ({
      queueItemId: item.id,
      title: item.title,
      reason: item.status === 'Triage' ? 'Raw Triage capture is not synced to Notion.' : 'Archived items are not synced or deleted in proposal-only mode.',
    }))

  const wouldCreate: Array<NotionSyncOperation> = []
  const wouldUpdate: Array<NotionSyncOperation> = []

  for (const item of eligible) {
    const operation: NotionSyncOperation = {
      operation: item.sync.notionPageId ? 'update' : 'create',
      queueItemId: item.id,
      title: item.title,
      reason: item.sync.notionPageId ? 'Existing Notion page would be updated from local JSON.' : 'Triaged local queue item has no Notion page yet.',
      notionPageId: item.sync.notionPageId,
      notionProperties: buildNotionProperties(item),
    }
    if (operation.operation === 'update') wouldUpdate.push(operation)
    else wouldCreate.push(operation)
  }

  const id = proposalId(input.now)
  return {
    schemaVersion: 1,
    id,
    mode: input.mode,
    actor: input.actor,
    generatedAt: input.now,
    eligibleCount: eligible.length,
    totalCount: input.items.length,
    wouldCreate,
    wouldUpdate,
    wouldSkip: skipped,
    wouldDelete: [],
    warnings: [
      'Proposal only: no Notion pages were created, updated, archived, or deleted.',
      'Local JSON remains the source of truth. Notion is a proposed human command-center mirror.',
      'Risk and approval fields are exported for visibility only and should not be editable from Notion.',
    ],
    persistedPath: '',
  }
}

export async function persistNotionSyncProposal(
  proposal: ExecutiveQueueNotionSyncProposal,
  root?: string,
): Promise<ExecutiveQueueNotionSyncProposal> {
  const queueRoot = root ?? defaultRoot()
  const persistedPath = proposalPath(queueRoot, proposal.generatedAt, proposal.id)
  const record = { ...proposal, persistedPath }
  await mkdir(join(queueRoot, 'notion-sync-proposals', proposal.generatedAt.slice(0, 10)), { recursive: true, mode: 0o700 })
  await writeFile(persistedPath, `${JSON.stringify(record, null, 2)}\n`, { mode: 0o600 })
  return record
}

export async function createNotionSyncProposal(
  input: CreateNotionSyncProposalInput,
): Promise<ExecutiveQueueNotionSyncProposal> {
  const items = await listQueueItems({ root: input.root, includeArchived: true })
  const proposal = buildNotionSyncProposal({
    items,
    now: input.now,
    actor: input.actor,
    mode: input.mode,
  })
  return persistNotionSyncProposal(proposal, input.root)
}

async function readProposal(path: string): Promise<ExecutiveQueueNotionSyncProposal> {
  const proposal = JSON.parse(await readFile(path, 'utf-8')) as ExecutiveQueueNotionSyncProposal
  if (proposal.mode !== 'proposal_only') throw new Error('Only proposal_only snapshots can be applied.')
  return proposal
}

function assertApprovedProposal(proposal: ExecutiveQueueNotionSyncProposal, approval: NotionSyncApproval): void {
  if (approval.approvalText !== 'APPROVE NOTION SYNC') {
    throw new Error('Live Notion sync requires approvalText exactly: APPROVE NOTION SYNC')
  }
  if (!approval.approvedBy.trim()) throw new Error('Live Notion sync requires approvedBy.')
  if (approval.proposalId !== proposal.id) throw new Error('Approval proposalId does not match proposal snapshot.')
  if (approval.proposalPath !== proposal.persistedPath) throw new Error('Approval proposalPath does not match proposal snapshot.')
  if (approval.expectedCreates !== proposal.wouldCreate.length) throw new Error('Approved create count does not match proposal snapshot.')
  if (approval.expectedUpdates !== proposal.wouldUpdate.length) throw new Error('Approved update count does not match proposal snapshot.')
  if (proposal.wouldDelete.length > 0) throw new Error('Notion deletes are permanently disabled for Executive Queue sync.')
}

async function updateQueueItemNotionSync(input: {
  root?: string
  queueItemId: string
  notionPageId: string
  now: string
  actor: string
}): Promise<void> {
  const item = await readQueueItemById(input.queueItemId, input.root)
  if (!item) throw new Error(`Queue item not found after Notion write: ${input.queueItemId}`)
  await writeQueueItem(
    {
      ...item,
      updatedAt: input.now,
      sync: {
        ...item.sync,
        notionPageId: input.notionPageId,
        lastSyncedAt: input.now,
        lastSyncStatus: 'synced',
      },
      auditTrail: [
        ...item.auditTrail,
        {
          action: 'notion_synced',
          actor: input.actor,
          timestamp: input.now,
          note: `Synced to Notion page ${input.notionPageId}`,
        },
      ],
    },
    input.root,
  )
}

async function persistApplyResult(
  result: ExecutiveQueueNotionSyncApplyResult,
  root?: string,
): Promise<ExecutiveQueueNotionSyncApplyResult> {
  const queueRoot = root ?? defaultRoot()
  const persistedPath = applyResultPath(queueRoot, result.appliedAt, result.proposalId)
  const record = { ...result, persistedPath }
  await mkdir(join(queueRoot, 'notion-sync-results', result.appliedAt.slice(0, 10)), { recursive: true, mode: 0o700 })
  await writeFile(persistedPath, `${JSON.stringify(record, null, 2)}\n`, { mode: 0o600 })
  return record
}

export async function applyApprovedNotionSync(input: ApplyApprovedNotionSyncInput): Promise<ExecutiveQueueNotionSyncApplyResult> {
  const proposal = await readProposal(input.approval.proposalPath)
  assertApprovedProposal(proposal, input.approval)
  const databaseId = getDatabaseId(input.databaseId)
  const notionClient = input.notionClient ?? defaultNotionClient
  const created: Array<NotionWriteResult> = []
  const updated: Array<NotionWriteResult> = []

  for (const operation of proposal.wouldCreate) {
    const response = await notionClient({
      path: '/pages',
      method: 'POST',
      body: {
        parent: { database_id: databaseId },
        properties: operation.notionProperties,
      },
    })
    const notionPageId = extractNotionPageId(response)
    created.push({ operation: 'create', queueItemId: operation.queueItemId, notionPageId, title: operation.title })
    await updateQueueItemNotionSync({
      root: input.root,
      queueItemId: operation.queueItemId,
      notionPageId,
      now: input.now,
      actor: input.actor,
    })
  }

  for (const operation of proposal.wouldUpdate) {
    if (!operation.notionPageId) throw new Error(`Cannot update Notion without page id for ${operation.queueItemId}`)
    const response = await notionClient({
      path: `/pages/${operation.notionPageId}`,
      method: 'PATCH',
      body: { properties: operation.notionProperties },
    })
    const notionPageId = extractNotionPageId(response)
    updated.push({ operation: 'update', queueItemId: operation.queueItemId, notionPageId, title: operation.title })
    await updateQueueItemNotionSync({
      root: input.root,
      queueItemId: operation.queueItemId,
      notionPageId,
      now: input.now,
      actor: input.actor,
    })
  }

  return persistApplyResult(
    {
      schemaVersion: 1,
      mode: 'apply_approved',
      actor: input.actor,
      appliedAt: input.now,
      proposalId: proposal.id,
      proposalPath: proposal.persistedPath,
      created,
      updated,
      skipped: proposal.wouldSkip,
      deleted: [],
      warnings: [
        'Live Notion sync was approval-gated by proposal id, proposal path, exact approval text, and expected operation counts.',
        'No Notion pages were deleted or archived.',
        'Local JSON remains the machine source of truth.',
      ],
      persistedPath: '',
    },
    input.root,
  )
}
