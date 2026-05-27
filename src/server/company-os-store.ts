import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { getHermesRoot } from './hermes-paths'

const execFileAsync = promisify(execFile)

export type CompanyOsTask = {
  title: string
  description: string
  status: 'active' | 'waiting' | 'someday' | 'done'
  tags: Array<string>
  priority: string | null
}

export type CompanyOsDocument = {
  title: string
  filename: string
  body: string
  excerpt: string
}

export type CompanyOsInvoice = {
  file: string
  status: 'outstanding' | 'done' | 'needs-proof' | 'review'
  source: string
}

export type CompanyOsAsset = {
  id: string
  title: string
  kind: 'pricing' | 'media-kit' | 'proposal' | 'tax' | 'contract' | 'invoice' | 'site' | 'brand'
  file: string
  path: string
  note: string
}

export type CompanyOsLead = {
  id: number | string
  title: string
  businessName: string | null
  listId: string | null
  priority: string | null
  estimatedValue: string | null
  draftStatus: string | null
  updatedAt: string | null
}

export type CompanyOsKanbanAction = {
  id: number | string
  title: string
  businessName: string | null
  stage: string | null
  priority: string | null
  draftStatus: string | null
  updatedAt: string | null
  lane: string
  urgency: 'p0' | 'p1' | 'p2'
  reason: string
  recommendedAction: string
  publicAsset: string | null
  assetIds: Array<string>
}

export type CompanyOsSignal = {
  kind: string
  subject?: string
  from?: string
  title?: string
  url?: string
  threadId?: string
  messageId?: string
  gmailUrl?: string
  timestamp?: string
  updatedAt?: string
  summary: string
  needs?: string
  thread?: {
    status: string
    latestAction: string
    messages: Array<{
      id: string
      from: string
      to?: Array<string>
      cc?: Array<string>
      timestamp?: string
      subject?: string
      body: string
      attachments?: Array<string>
    }>
  }
}

export type CompanyOsLiveOps = {
  sources: Array<{
    name: string
    status: 'connected' | 'snapshot' | 'missing' | 'error'
    count: number
    note: string
  }>
  invoices: Array<CompanyOsInvoice>
  invoiceCounts: Record<string, number>
  assets: Array<CompanyOsAsset>
  supabase: {
    ok: boolean
    count: number
    stages: Record<string, number>
    priorities: Record<string, number>
    draftStatuses: Record<string, number>
    hotLeads: Array<CompanyOsLead>
    invoiceLeads: Array<CompanyOsLead>
    kanbanActions: Array<CompanyOsKanbanAction>
    error?: string
  }
  emailSignals: Array<CompanyOsSignal>
  driveSignals: Array<CompanyOsSignal>
}

export type CompanyOsSnapshot = {
  slug: string
  name: string
  idea: string
  audience: string
  status: string
  rules: Array<string>
  tasks: Array<CompanyOsTask>
  documents: Array<CompanyOsDocument>
  log: string
  siteHtml: string
  workspacePath: string
  liveOps: CompanyOsLiveOps
  updatedAt: string
}

export type CompanyOsGmailRefreshResult = {
  ok: boolean
  count: number
  path: string
  message: string
}

const SECTION_STATUS: Record<string, CompanyOsTask['status']> = {
  active: 'active',
  'waiting on': 'waiting',
  someday: 'someday',
  done: 'done',
}

function companyRoot(): string {
  return path.join(getHermesRoot(), 'company-os')
}

function safeSlug(value: string | null): string {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function firstHeading(markdown: string, fallback: string): string {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() || fallback
}

function section(markdown: string, heading: string): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(
    `^##\\s+${escaped}\\s*$\\n?([\\s\\S]*?)(?=\\n##\\s+|$)`,
    'im',
  )
  return regex.exec(markdown)?.[1]?.trim() || ''
}

function linesFromSection(markdown: string, heading: string): Array<string> {
  return section(markdown, heading)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s+/, '').trim())
}

function parseTasks(markdown: string): Array<CompanyOsTask> {
  const tasks: Array<CompanyOsTask> = []
  let current: CompanyOsTask['status'] = 'active'

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim()
    const heading = /^##\s+(.+)$/.exec(line)?.[1]?.trim().toLowerCase()
    if (heading && SECTION_STATUS[heading]) {
      current = SECTION_STATUS[heading]
      continue
    }

    const taskMatch = /^-\s+\[[ xX]\]\s+\*\*(.+?)\*\*\s+-\s+(.+)$/.exec(line)
    if (!taskMatch) continue

    const title = taskMatch[1].trim()
    const rest = taskMatch[2].trim()
    const tags = Array.from(rest.matchAll(/`([^`]+)`/g)).map((match) => match[1])
    const priority = tags.find((tag) => /^p\d$/i.test(tag)) ?? null
    const description = rest.replace(/\s*`[^`]+`/g, '').trim()

    tasks.push({
      title,
      description,
      status: current,
      tags: tags.filter((tag) => tag !== priority),
      priority,
    })
  }

  return tasks
}

function excerpt(markdown: string): string {
  return markdown
    .replace(/^#+\s+/gm, '')
    .replace(/[*_`#>-]/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
    .slice(0, 220)
}

async function readIfExists(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return ''
  }
}

async function readJsonIfExists<T>(filePath: string, fallback: T): Promise<T> {
  const content = await readIfExists(filePath)
  if (!content) return fallback
  try {
    return JSON.parse(content) as T
  } catch {
    return fallback
  }
}

async function listFilesRecursively(root: string): Promise<Array<string>> {
  async function walk(dir: string): Promise<Array<string>> {
    let entries: Array<import('node:fs').Dirent> = []
    try {
      entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
      return []
    }

    const nested = await Promise.all(
      entries.map(async (entry) => {
        const absolute = path.join(dir, entry.name)
        if (entry.isDirectory()) return walk(absolute)
        if (!entry.isFile()) return []
        return [absolute]
      }),
    )
    return nested.flat()
  }

  return walk(root)
}

function basenameWithParent(filePath: string, root: string): string {
  return path.relative(root, filePath).replaceAll(path.sep, '/')
}

async function readInvoiceFiles(): Promise<Array<CompanyOsInvoice>> {
  const root = path.join(getUserDesktopPath(), 'UNALIGNED', 'INVOICES')
  const outstandingRoot = path.join(root, 'OUTSTANDING')
  const doneRoot = path.join(root, 'DONE')

  const [outstanding, done] = await Promise.all([
    listFilesRecursively(outstandingRoot),
    listFilesRecursively(doneRoot),
  ])

  const invoices: Array<CompanyOsInvoice> = [
    ...outstanding.map((filePath) => ({
      file: basenameWithParent(filePath, outstandingRoot),
      status: filePath.includes('NOT CONFIRMED BUT CONFIRMED')
        ? ('needs-proof' as const)
        : ('outstanding' as const),
      source: 'Desktop/UNALIGNED/INVOICES/OUTSTANDING',
    })),
    ...done.map((filePath) => ({
      file: basenameWithParent(filePath, doneRoot),
      status: 'done' as const,
      source: 'Desktop/UNALIGNED/INVOICES/DONE',
    })),
  ]

  return invoices.filter((invoice) => /\.(pdf|html|docx?)$/i.test(invoice.file))
}

function countBy<T extends string>(items: Array<T>): Record<string, number> {
  return items.reduce<Record<string, number>>((counts, item) => {
    counts[item] = (counts[item] ?? 0) + 1
    return counts
  }, {})
}

function getUserDesktopPath(): string {
  return path.join(process.env.HOME || process.env.USERPROFILE || '', 'Desktop')
}

const ASSET_CATALOG: Array<{
  id: string
  title: string
  kind: CompanyOsAsset['kind']
  relativePath: string
  note: string
}> = [
  {
    id: 'partnership-packages',
    title: 'Unaligned Partnership Packages',
    kind: 'pricing',
    relativePath: 'MASTER FILES/docs/Unaligned_Partnership_Packages.pdf',
    note: 'Primary package/rate asset for sales follow-ups.',
  },
  {
    id: 'sponsorship-pricing',
    title: 'Unaligned Sponsorship Pricing',
    kind: 'pricing',
    relativePath: 'MASTER FILES/docs/Unaligned_Sponsorship_Pricing.html',
    note: 'HTML pricing reference for rate-sent and negotiation cards.',
  },
  {
    id: 'sponsor-program',
    title: 'Sponsor Program',
    kind: 'proposal',
    relativePath: 'MASTER FILES/docs/SponsorProgram.pdf',
    note: 'Program-level sponsor overview.',
  },
  {
    id: 'media-kit',
    title: 'Unaligned Media Kit',
    kind: 'media-kit',
    relativePath: 'SAM FILES/UNALIGNED/UnalignedMediaKit.pdf',
    note: 'Audience and credibility proof for new leads.',
  },
  {
    id: 'stats',
    title: 'Unaligned Stats',
    kind: 'media-kit',
    relativePath: 'SAM FILES/UNALIGNED/UnalignedStats.png',
    note: 'Fast visual proof point for sponsor replies.',
  },
  {
    id: 'w9',
    title: 'Unaligned W9',
    kind: 'tax',
    relativePath: 'SAM FILES/UNALIGNED/UnalignedW9.pdf',
    note: 'Tax/admin document for procurement and payment setup.',
  },
  {
    id: 'ein',
    title: 'Unaligned EIN',
    kind: 'tax',
    relativePath: 'SAM FILES/UNALIGNED/UnalignedEIN.jpg',
    note: 'Business identity proof; review before sharing.',
  },
  {
    id: 'contract',
    title: 'Unaligned Contract',
    kind: 'contract',
    relativePath: 'SAM FILES/UNALIGNED/Unaligned Contract.docx',
    note: 'Contract template/reference; do not send without review.',
  },
  {
    id: 'public-site',
    title: 'Unaligned Public Site',
    kind: 'site',
    relativePath: 'MASTER FILES/index.html',
    note: 'Public-facing website currently built for Unaligned.',
  },
  {
    id: 'logo',
    title: 'Unaligned Logo',
    kind: 'brand',
    relativePath: 'MASTER FILES/unaligned_logo.png',
    note: 'Brand asset for decks and one-pagers.',
  },
]

async function readSalesAssets(): Promise<Array<CompanyOsAsset>> {
  const root = path.join(getUserDesktopPath(), 'UNALIGNED')
  const assets = await Promise.all(
    ASSET_CATALOG.map(async (asset) => {
      const absolute = path.join(root, asset.relativePath)
      try {
        const stat = await fs.stat(absolute)
        if (!stat.isFile()) return null
      } catch {
        return null
      }

      return {
        id: asset.id,
        title: asset.title,
        kind: asset.kind,
        file: asset.relativePath,
        path: absolute,
        note: asset.note,
      }
    }),
  )

  return assets.filter((asset): asset is CompanyOsAsset => Boolean(asset))
}

function extractPythonString(source: string, name: string): string | null {
  const match = new RegExp(`${name}\\s*=\\s*"([^"]+)"`).exec(source)
  return match?.[1] ?? null
}

function normalizeLead(card: Record<string, unknown>): CompanyOsLead {
  return {
    id: typeof card.id === 'number' || typeof card.id === 'string' ? card.id : '',
    title: typeof card.title === 'string' ? card.title : 'Untitled lead',
    businessName:
      typeof card.business_name === 'string' && card.business_name
        ? card.business_name
        : null,
    listId: typeof card.list_id === 'string' ? card.list_id : null,
    priority: typeof card.priority === 'string' ? card.priority : null,
    estimatedValue:
      typeof card.estimated_value === 'string' && card.estimated_value
        ? card.estimated_value
        : null,
    draftStatus:
      typeof card.draft_reply_status === 'string' && card.draft_reply_status
        ? card.draft_reply_status
        : null,
    updatedAt: typeof card.updated_at === 'string' ? card.updated_at : null,
  }
}

function textField(card: Record<string, unknown>, field: string): string {
  const value = card[field]
  return typeof value === 'string' ? value : ''
}

function daysSince(value: string | null): number | null {
  if (!value) return null
  const timestamp = Date.parse(value)
  if (!Number.isFinite(timestamp)) return null
  return Math.floor((Date.now() - timestamp) / 86_400_000)
}

function publicAssetForCard(stage: string, haystack: string): string | null {
  if (/invoice|paid|payment/i.test(haystack)) return 'Invoice / payment proof'
  if (/rate|pricing|sponsor|partnership/i.test(haystack) || stage === 'rates-sent') {
    return 'Unaligned sponsorship pricing / partnership package'
  }
  if (/media|kit|robert|scoble/i.test(haystack)) return 'Unaligned media kit'
  return null
}

function assetIdsForCard(stage: string, haystack: string): Array<string> {
  if (/invoice|paid|payment|procurement|vendor|w-?9|tax/i.test(haystack)) {
    return ['w9', 'ein', 'contract']
  }
  if (/rate|pricing|sponsor|partnership/i.test(haystack) || stage === 'rates-sent') {
    return ['partnership-packages', 'sponsorship-pricing', 'sponsor-program']
  }
  if (/media|kit|robert|scoble|audience|stats/i.test(haystack)) {
    return ['media-kit', 'stats', 'public-site']
  }
  return ['media-kit', 'partnership-packages']
}

function normalizeKanbanAction(
  card: Record<string, unknown>,
): CompanyOsKanbanAction | null {
  const lead = normalizeLead(card)
  const stage = lead.listId || 'unknown'
  const draftStatus = lead.draftStatus || 'unknown'
  const priority = lead.priority || 'unknown'
  const haystack = [
    stage,
    priority,
    draftStatus,
    lead.title,
    lead.businessName || '',
    textField(card, 'description'),
    textField(card, 'intent'),
  ].join(' ')
  const staleDays = daysSince(lead.updatedAt)
  const activeStage = !['dead-leads', 'done', 'paid-out', 'trash'].includes(stage)

  if (/invoice|paid|payment/i.test(haystack) || stage === 'invoice-sent') {
    return {
      ...lead,
      stage,
      draftStatus,
      lane: 'money watchlist',
      urgency: 'p0',
      reason: 'Kanban card looks tied to invoice, payment, or paid status.',
      recommendedAction:
        'Match this card against local invoices and email history, then draft a payment/status follow-up for approval.',
      publicAsset: publicAssetForCard(stage, haystack),
      assetIds: assetIdsForCard(stage, haystack),
    }
  }

  if (
    ['drafted', 'pending'].includes(draftStatus) &&
    ['rates-sent', 'negotiating', 'engaged', 'first-touch'].includes(stage)
  ) {
    return {
      ...lead,
      stage,
      draftStatus,
      lane: 'reply review',
      urgency: priority === 'hot' ? 'p1' : 'p2',
      reason: `Draft status is ${draftStatus} while the deal is still active.`,
      recommendedAction:
        'Review the saved draft, attach the right Unaligned asset if useful, and decide whether to send or rewrite.',
      publicAsset: publicAssetForCard(stage, haystack),
      assetIds: assetIdsForCard(stage, haystack),
    }
  }

  if (
    priority === 'hot' &&
    ['rates-sent', 'negotiating', 'engaged', 'first-touch'].includes(stage)
  ) {
    return {
      ...lead,
      stage,
      draftStatus,
      lane: 'hot lead',
      urgency: 'p1',
      reason: `Hot lead currently sits in ${stage}.`,
      recommendedAction:
        'Confirm owner, last touch, and next ask; prepare a concise follow-up for approval.',
      publicAsset: publicAssetForCard(stage, haystack),
      assetIds: assetIdsForCard(stage, haystack),
    }
  }

  if (activeStage && staleDays !== null && staleDays >= 14) {
    return {
      ...lead,
      stage,
      draftStatus,
      lane: 'stale rescue',
      urgency: priority === 'hot' ? 'p1' : 'p2',
      reason: `No card update in ${staleDays} days.`,
      recommendedAction:
        'Check whether the thread is still alive, then either draft a rescue follow-up or mark the card for cleanup.',
      publicAsset: publicAssetForCard(stage, haystack),
      assetIds: assetIdsForCard(stage, haystack),
    }
  }

  return null
}

function actionRank(action: CompanyOsKanbanAction): number {
  const urgencyRank = { p0: 0, p1: 10, p2: 20 }[action.urgency]
  const laneRank =
    action.lane === 'money watchlist'
      ? 0
      : action.lane === 'reply review'
        ? 1
        : action.lane === 'hot lead'
          ? 2
          : 3
  return urgencyRank + laneRank
}

async function readSupabaseLeads(): Promise<CompanyOsLiveOps['supabase']> {
  const configPath = path.join(
    process.env.HOME || '',
    'Documents',
    'Codex',
    '2026-05-07',
    'i-need-you-to-set-up',
    'review-UNALIGNED',
    'daily_gmail_sync.py',
  )
  const source = await readIfExists(configPath)
  const url = extractPythonString(source, 'SUPABASE_URL')
  const key = extractPythonString(source, 'SUPABASE_KEY')
  if (!url || !key) {
    return {
      ok: false,
      count: 0,
      stages: {},
      priorities: {},
      draftStatuses: {},
      hotLeads: [],
      invoiceLeads: [],
      kanbanActions: [],
      error: 'Supabase URL/key not found in local Unaligned pipeline config.',
    }
  }

  try {
    const response = await fetch(`${url}/rest/v1/cards?select=*&limit=500`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })
    if (!response.ok) {
      return {
        ok: false,
        count: 0,
        stages: {},
        priorities: {},
        draftStatuses: {},
        hotLeads: [],
        invoiceLeads: [],
        kanbanActions: [],
        error: `Supabase returned ${response.status}`,
      }
    }

    const cards = (await response.json()) as Array<Record<string, unknown>>
    const stages = countBy(cards.map((card) => String(card.list_id || 'unknown')))
    const priorities = countBy(cards.map((card) => String(card.priority || 'unknown')))
    const draftStatuses = countBy(
      cards.map((card) => String(card.draft_reply_status || 'unknown')),
    )
    const hotLeads = cards
      .filter((card) => card.priority === 'hot')
      .slice(0, 8)
      .map(normalizeLead)
    const invoiceLeads = cards
      .filter((card) => {
        const haystack = `${card.list_id || ''} ${card.title || ''} ${card.description || ''} ${card.intent || ''}`
        return /invoice|paid|payment/i.test(haystack)
      })
      .slice(0, 8)
      .map(normalizeLead)
    const kanbanActions = cards
      .map(normalizeKanbanAction)
      .filter((action): action is CompanyOsKanbanAction => Boolean(action))
      .sort((left, right) => actionRank(left) - actionRank(right))
      .slice(0, 12)

    return {
      ok: true,
      count: cards.length,
      stages,
      priorities,
      draftStatuses,
      hotLeads,
      invoiceLeads,
      kanbanActions,
    }
  } catch (error) {
    return {
      ok: false,
      count: 0,
      stages: {},
      priorities: {},
      draftStatuses: {},
      hotLeads: [],
      invoiceLeads: [],
      kanbanActions: [],
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function readLiveOps(workspacePath: string): Promise<CompanyOsLiveOps> {
  const [invoices, assets, supabase, emailSnapshot, driveSnapshot] = await Promise.all([
    readInvoiceFiles(),
    readSalesAssets(),
    readSupabaseLeads(),
    readJsonIfExists<{ signals?: Array<CompanyOsSignal> }>(
      path.join(workspacePath, 'live', 'email-signals.json'),
      { signals: [] },
    ),
    readJsonIfExists<{ files?: Array<CompanyOsSignal> }>(
      path.join(workspacePath, 'live', 'drive-signals.json'),
      { files: [] },
    ),
  ])

  return {
    sources: [
      {
        name: 'Desktop UNALIGNED invoices',
        status: invoices.length ? 'connected' : 'missing',
        count: invoices.length,
        note: 'Read from local invoice folders.',
      },
      {
        name: 'Supabase cards',
        status: supabase.ok ? 'connected' : 'error',
        count: supabase.count,
        note: supabase.ok ? 'Read-only live card summary.' : supabase.error || 'Unavailable.',
      },
      {
        name: 'Unaligned sales assets',
        status: assets.length ? 'connected' : 'missing',
        count: assets.length,
        note: 'Read from local website, media kit, pricing, tax, and proposal files.',
      },
      {
        name: 'Gmail signals',
        status: emailSnapshot.signals?.length ? 'snapshot' : 'missing',
        count: emailSnapshot.signals?.length ?? 0,
        note: 'Readonly Gmail snapshot; refresh from the dashboard.',
      },
      {
        name: 'Google Drive signals',
        status: driveSnapshot.files?.length ? 'snapshot' : 'missing',
        count: driveSnapshot.files?.length ?? 0,
        note: 'Connector snapshot; refresh manually from Drive search.',
      },
    ],
    invoices,
    invoiceCounts: countBy(invoices.map((invoice) => invoice.status)),
    assets,
    supabase,
    emailSignals: emailSnapshot.signals ?? [],
    driveSignals: driveSnapshot.files ?? [],
  }
}

export async function refreshCompanyOsGmailSnapshot(
  requestedSlug: string | null,
): Promise<CompanyOsGmailRefreshResult> {
  const slugs = await listCompanySlugs()
  const slug = safeSlug(requestedSlug) || slugs[0]
  if (!slug || !slugs.includes(slug)) {
    throw new Error('No Company OS workspace found')
  }

  const scriptPath = path.join(
    process.cwd(),
    'scripts',
    'company_os_gmail_snapshot.py',
  )

  const { stdout, stderr } = await execFileAsync(
    'python3',
    [scriptPath, '--slug', slug],
    {
      timeout: 120_000,
      maxBuffer: 1024 * 1024 * 4,
    },
  )

  const lastLine = stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .at(-1)
  if (!lastLine) {
    throw new Error(stderr.trim() || 'Gmail refresh did not return a result')
  }

  const result = JSON.parse(lastLine) as { ok?: boolean; count?: number; path?: string }
  if (!result.ok) {
    throw new Error(stderr.trim() || 'Gmail refresh failed')
  }

  return {
    ok: true,
    count: result.count ?? 0,
    path: result.path || '',
    message: `Refreshed ${result.count ?? 0} Gmail thread${result.count === 1 ? '' : 's'}.`,
  }
}

async function listCompanySlugs(): Promise<Array<string>> {
  try {
    const entries = await fs.readdir(companyRoot(), { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => safeSlug(entry.name))
      .filter(Boolean)
      .sort()
  } catch {
    return []
  }
}

export async function readCompanyOsSnapshot(
  requestedSlug: string | null,
): Promise<CompanyOsSnapshot | null> {
  const slugs = await listCompanySlugs()
  const slug = safeSlug(requestedSlug) || slugs[0]
  if (!slug || !slugs.includes(slug)) return null

  const workspacePath = path.join(companyRoot(), slug)
  const [company, tasksMarkdown, log, siteHtml] = await Promise.all([
    readIfExists(path.join(workspacePath, 'COMPANY.md')),
    readIfExists(path.join(workspacePath, 'TASKS.md')),
    readIfExists(path.join(workspacePath, 'LOG.md')),
    readIfExists(path.join(workspacePath, 'site', 'index.html')),
  ])

  const documentsDir = path.join(workspacePath, 'documents')
  const documentFiles = await fs
    .readdir(documentsDir)
    .catch(() => [] as Array<string>)
  const documents = await Promise.all(
    documentFiles
      .filter((filename) => filename.endsWith('.md'))
      .sort()
      .map(async (filename) => {
        const body = await readIfExists(path.join(documentsDir, filename))
        return {
          title: firstHeading(body, filename.replace(/\.md$/, '')),
          filename,
          body,
          excerpt: excerpt(body),
        }
      }),
  )

  return {
    slug,
    name: firstHeading(company, slug),
    idea: section(company, 'Idea'),
    audience: section(company, 'Audience'),
    status: section(company, 'Current Status'),
    rules: linesFromSection(company, 'Rules'),
    tasks: parseTasks(tasksMarkdown),
    documents,
    log,
    siteHtml,
    workspacePath,
    liveOps: await readLiveOps(workspacePath),
    updatedAt: new Date().toISOString(),
  }
}
