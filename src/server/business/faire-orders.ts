import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const DEFAULT_CORPUS_DB = '/Volumes/My External Drive/Corpus/index.db'
const PATCHAID_SOURCE_LABEL = 'Faire / PatchAid'
const FAIRE_ORDER_FTS_QUERY = '"New wholesale order" AND Faire'
const CORPUS_SQLITE_TIMEOUT_MS = 15_000

export type FaireCorpusMessage = {
  gmailId: string
  threadId: string
  internalDateMs: number
  fromAddr: string | null
  fromName: string | null
  toAddrs: Array<string>
  subject: string | null
  snippet: string | null
  bodyText: string | null
}

export type FaireOrderItem = {
  title: string
  skuOrUpc: string | null
  quantity: number | null
  unitPrice: number | null
  subtotal: number | null
}

export type PatchAidFaireOrder = {
  orderId: string
  gmailId: string
  threadId: string
  source: 'faire'
  sourceLabel: typeof PATCHAID_SOURCE_LABEL
  brand: 'PatchAid'
  fulfillmentSource: 'Faire'
  customerName: string | null
  orderDate: string | null
  totalAmount: number | null
  unitCount: number | null
  commissionLabel: string | null
  orderUrl: string | null
  items: Array<FaireOrderItem>
}

export type PatchAidFaireOrdersSummary = {
  sourceLabel: typeof PATCHAID_SOURCE_LABEL
  orderCount: number
  revenue: number
  units: number
  latestOrderDate: string | null
}

export type PatchAidFaireOrdersResponse = {
  source: 'corpus-gmail-faire-order-emails'
  sourceLabel: typeof PATCHAID_SOURCE_LABEL
  corpusDbPath: string
  orders: Array<PatchAidFaireOrder>
  summary: PatchAidFaireOrdersSummary
  generatedAt: string
  warning: string | null
}

type RawSqliteMessage = {
  gmailId?: string
  threadId?: string
  internalDateMs?: number
  fromAddr?: string | null
  fromName?: string | null
  toAddrsJson?: string | null
  subject?: string | null
  snippet?: string | null
  bodyText?: string | null
  bodyHtmlExtract?: string | null
}

export function parseFaireOrderEmail(
  message: FaireCorpusMessage | null,
): PatchAidFaireOrder | null {
  if (!message) return null
  const subject = message.subject ?? ''
  const body = [message.snippet, message.bodyText].filter(Boolean).join('\n')
  const searchable = [
    subject,
    message.fromName,
    message.fromAddr,
    message.toAddrs.join('\n'),
    body,
  ]
    .filter(Boolean)
    .join('\n')

  if (!isPatchAidFaireOrder(searchable)) return null

  const orderId = extractOrderId(subject, body)
  if (!orderId) return null

  const customerName = extractCustomerName(subject, body)
  const totalAmount = extractTotalAmount(body)
  const orderDate = extractOrderDate(body, message.internalDateMs)
  const items = extractItems(body)
  const unitCount = extractUnitCount(body, items)

  return {
    orderId,
    gmailId: message.gmailId,
    threadId: message.threadId,
    source: 'faire',
    sourceLabel: PATCHAID_SOURCE_LABEL,
    brand: 'PatchAid',
    fulfillmentSource: 'Faire',
    customerName,
    orderDate,
    totalAmount,
    unitCount,
    commissionLabel: extractCommissionLabel(body),
    orderUrl: extractOrderUrl(body),
    items,
  }
}

export function summarizeFaireOrders(
  orders: Array<PatchAidFaireOrder | null>,
): PatchAidFaireOrdersSummary {
  const validOrders = orders.filter(
    (order): order is PatchAidFaireOrder => order !== null,
  )
  const revenue = validOrders.reduce(
    (sum, order) => sum + (order.totalAmount ?? 0),
    0,
  )
  const units = validOrders.reduce(
    (sum, order) =>
      sum +
      (order.unitCount ??
        order.items.reduce(
          (itemSum, item) => itemSum + (item.quantity ?? 0),
          0,
        )),
    0,
  )
  const latestOrderDate = validOrders
    .map((order) => order.orderDate)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1)

  return {
    sourceLabel: PATCHAID_SOURCE_LABEL,
    orderCount: validOrders.length,
    revenue: roundMoney(revenue),
    units,
    latestOrderDate: latestOrderDate ?? null,
  }
}

export async function fetchPatchAidFaireOrders(options?: {
  corpusDbPath?: string
  limit?: number
}): Promise<PatchAidFaireOrdersResponse> {
  const corpusDbPath = options?.corpusDbPath ?? DEFAULT_CORPUS_DB
  const limit = clampLimit(options?.limit ?? 5000)
  const generatedAt = new Date().toISOString()

  try {
    const messages = await readFaireOrderMessagesFromCorpus(corpusDbPath, limit)
    const parsed = dedupeFaireOrders(
      messages
        .map(parseFaireOrderEmail)
        .filter((order): order is PatchAidFaireOrder => order !== null),
    )

    return {
      source: 'corpus-gmail-faire-order-emails',
      sourceLabel: PATCHAID_SOURCE_LABEL,
      corpusDbPath,
      orders: parsed,
      summary: summarizeFaireOrders(parsed),
      generatedAt,
      warning: null,
    }
  } catch (err) {
    return {
      source: 'corpus-gmail-faire-order-emails',
      sourceLabel: PATCHAID_SOURCE_LABEL,
      corpusDbPath,
      orders: [],
      summary: summarizeFaireOrders([]),
      generatedAt,
      warning: err instanceof Error ? err.message : 'Unable to read Corpus DB',
    }
  }
}

export function createCachedPatchAidFaireOrdersFetcher(options?: {
  ttlMs?: number
  now?: () => number
  fetcher?: () => Promise<PatchAidFaireOrdersResponse>
}): () => Promise<PatchAidFaireOrdersResponse> {
  const ttlMs = Math.max(0, options?.ttlMs ?? 5 * 60_000)
  const now = options?.now ?? (() => Date.now())
  const fetcher = options?.fetcher ?? (() => fetchPatchAidFaireOrders())
  let cached:
    | { value: PatchAidFaireOrdersResponse; expiresAt: number }
    | null = null
  let pending: Promise<PatchAidFaireOrdersResponse> | null = null

  return async () => {
    const currentTime = now()
    if (cached && cached.expiresAt > currentTime) return cached.value
    if (pending) return pending

    pending = fetcher()
      .then((value) => {
        cached = { value, expiresAt: now() + ttlMs }
        return value
      })
      .finally(() => {
        pending = null
      })

    return pending
  }
}

async function readFaireOrderMessagesFromCorpus(
  corpusDbPath: string,
  limit: number,
): Promise<Array<FaireCorpusMessage>> {
  const sql = `
SELECT
  m.gmail_id AS gmailId,
  m.thread_id AS threadId,
  m.internal_date_ms AS internalDateMs,
  m.from_addr AS fromAddr,
  m.from_name AS fromName,
  m.to_addrs AS toAddrsJson,
  m.subject AS subject,
  m.snippet AS snippet,
  m.body_text AS bodyText,
  CASE
    WHEN coalesce(m.body_text, '') = '' THEN
      coalesce(substr(m.body_html, max(instr(lower(m.body_html), 'you just received') - 200, 1), 1200), '')
      || char(10) ||
      coalesce(substr(m.body_html, max(instr(lower(m.body_html), 'order date') - 200, 1), 1200), '')
      || char(10) ||
      coalesce(substr(m.body_html, max(instr(lower(m.body_html), 'item subtotal') - 400, 1), 1800), '')
    ELSE NULL
  END AS bodyHtmlExtract
FROM messages_fts f
JOIN messages m ON m.gmail_id = f.gmail_id
WHERE messages_fts MATCH ${sqlString(FAIRE_ORDER_FTS_QUERY)}
ORDER BY m.internal_date_ms DESC
LIMIT ${limit};
`.trim()

  const { stdout } = await execFileAsync(
    'sqlite3',
    ['-readonly', '-json', corpusDbPath, sql],
    { maxBuffer: 25 * 1024 * 1024, timeout: CORPUS_SQLITE_TIMEOUT_MS },
  )
  const rows = stdout.trim()
    ? (JSON.parse(stdout) as Array<RawSqliteMessage>)
    : []
  return rows.map(normalizeRawSqliteMessage)
}

function normalizeRawSqliteMessage(row: RawSqliteMessage): FaireCorpusMessage {
  const bodyHtmlText = row.bodyHtmlExtract
    ? htmlToText(row.bodyHtmlExtract)
    : null
  const bodyParts = [row.bodyText, bodyHtmlText].filter(Boolean)
  return {
    gmailId: row.gmailId ?? '',
    threadId: row.threadId ?? '',
    internalDateMs: Number(row.internalDateMs ?? 0),
    fromAddr: row.fromAddr ?? null,
    fromName: row.fromName ?? null,
    toAddrs: parseJsonStringArray(row.toAddrsJson),
    subject: row.subject ?? null,
    snippet: row.snippet ?? null,
    bodyText: bodyParts.length > 0 ? bodyParts.join('\n') : null,
  }
}

function parseJsonStringArray(raw: string | null | undefined): Array<string> {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === 'string')
      : []
  } catch {
    return []
  }
}

function isPatchAidFaireOrder(text: string): boolean {
  const lower = text.toLowerCase()
  const isFaireOrder =
    lower.includes('new wholesale order') &&
    (lower.includes('faire') || lower.includes('faire.com'))
  if (!isFaireOrder) return false

  const isAlacSource =
    lower.includes('lowacidcoffee.com') ||
    lower.includes("alex's low-acid") ||
    lower.includes("alex's low acid") ||
    lower.includes('low-acid organic coffee') ||
    lower.includes('low acid organic coffee')
  if (isAlacSource) return false

  // Be intentionally stricter than a generic "patchaid.com" hit: Alex's
  // non-PatchAid Faire forwards often carry a PatchAid link in the email
  // signature. Require the Faire order itself to be addressed to PatchAid,
  // sent from a PatchAid mailbox, or to use Faire's brand-heading copy.
  return (
    /(?:^|[\s<])(?:alex|faire|wholesale)@patchaid\.com\b/i.test(text) ||
    /to:\s*patchaid\b/i.test(text) ||
    /patchaid\s*</i.test(text) ||
    /patchaid\s*-\s*you have a new order/i.test(text) ||
    /\/direct\/patchaid/i.test(text) ||
    /\bby\s+patchaid\b/i.test(text)
  )
}

function dedupeFaireOrders(
  orders: Array<PatchAidFaireOrder>,
): Array<PatchAidFaireOrder> {
  const byOrderId = new Map<string, PatchAidFaireOrder>()
  for (const order of orders) {
    const existing = byOrderId.get(order.orderId)
    if (
      !existing ||
      orderCompletenessScore(order) > orderCompletenessScore(existing)
    ) {
      byOrderId.set(order.orderId, order)
    }
  }
  return Array.from(byOrderId.values()).sort(compareOrdersDesc)
}

function orderCompletenessScore(order: PatchAidFaireOrder): number {
  return (
    order.items.length * 10 +
    (order.totalAmount !== null ? 5 : 0) +
    (order.orderDate !== null ? 2 : 0) +
    (order.orderUrl !== null ? 1 : 0) +
    (order.commissionLabel !== null ? 1 : 0)
  )
}

function compareOrdersDesc(
  a: PatchAidFaireOrder,
  b: PatchAidFaireOrder,
): number {
  const aDate = a.orderDate ?? ''
  const bDate = b.orderDate ?? ''
  if (aDate !== bDate) return bDate.localeCompare(aDate)
  return a.orderId.localeCompare(b.orderId)
}

function extractOrderId(subject: string, body: string): string | null {
  const combined = `${subject}\n${body}`
  const match =
    combined.match(/Order\s*#([A-Z0-9]+)/i) ?? combined.match(/#([A-Z0-9]{6,})/)
  return match?.[1]?.toUpperCase() ?? null
}

function extractCustomerName(subject: string, body: string): string | null {
  const subjectMatch = subject.match(/New wholesale order from (.+?)\s*\(#/i)
  if (subjectMatch?.[1]) return cleanText(subjectMatch[1])

  const bodyMatch = body.match(/new order from\s+(.+?)(?:\.|\n)/i)
  if (bodyMatch?.[1]) return cleanText(bodyMatch[1])
  return null
}

function extractTotalAmount(body: string): number | null {
  const orderSummaryMatch = body.match(
    /Order Summary[\s\S]{0,200}?Total:\s*\$([\d,.]+)/i,
  )
  if (orderSummaryMatch?.[1]) return parseMoney(orderSummaryMatch[1])

  const receivedMatch = body.match(/received a \$([\d,.]+) order/i)
  if (receivedMatch?.[1]) return parseMoney(receivedMatch[1])
  return null
}

function extractOrderDate(body: string, fallbackMs: number): string | null {
  const match = body.match(/Order Date\s+([A-Z][a-z]+\s+\d{1,2},\s+\d{4})/)
  if (match?.[1]) {
    const parsed = new Date(`${match[1]} UTC`)
    if (!Number.isNaN(parsed.valueOf()))
      return parsed.toISOString().slice(0, 10)
  }
  if (fallbackMs > 0) return new Date(fallbackMs).toISOString().slice(0, 10)
  return null
}

function extractUnitCount(
  body: string,
  items: Array<FaireOrderItem>,
): number | null {
  const subtotalMatch = body.match(/Item subtotal\s*\((\d+)\s+Items?\)/i)
  if (subtotalMatch?.[1]) return Number(subtotalMatch[1])

  const itemQuantitySum = items.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  )
  return itemQuantitySum > 0 ? itemQuantitySum : null
}

function extractCommissionLabel(body: string): string | null {
  const match = body.match(/\n([^\n]*(?:Commission|Faire Direct)[^\n]*)\n/i)
  return match?.[1] ? cleanText(match[1]) : null
}

function extractOrderUrl(body: string): string | null {
  const match = body.match(
    /https:\/\/www\.faire\.com\/(?:maker|brand)-portal\/orders\/[^\s>)]+/i,
  )
  return match?.[0] ?? null
}

function extractItems(body: string): Array<FaireOrderItem> {
  const lines = body
    .split(/\r?\n/)
    .map((line) => cleanText(line))
    .filter(Boolean)

  const items: Array<FaireOrderItem> = []
  for (let i = 0; i < lines.length; i += 1) {
    if (!/^\d{8,14}$/.test(lines[i])) continue

    const title = findTitleBeforeSku(lines, i)
    if (!title) continue

    const numbers = findQuantityPriceSubtotalAfterSku(lines, i)
    items.push({
      title,
      skuOrUpc: lines[i],
      quantity: numbers.quantity,
      unitPrice: numbers.unitPrice,
      subtotal: numbers.subtotal,
    })
  }
  return items
}

function findTitleBeforeSku(
  lines: Array<string>,
  skuIndex: number,
): string | null {
  for (let i = skuIndex - 1; i >= Math.max(0, skuIndex - 6); i -= 1) {
    const candidate = lines[i]
    if (isNonTitleLine(candidate)) continue
    return candidate.replace(/^\[image:\s*/i, '').replace(/\]$/, '')
  }
  return null
}

function findQuantityPriceSubtotalAfterSku(
  lines: Array<string>,
  skuIndex: number,
): Pick<FaireOrderItem, 'quantity' | 'unitPrice' | 'subtotal'> {
  const result: Pick<FaireOrderItem, 'quantity' | 'unitPrice' | 'subtotal'> = {
    quantity: null,
    unitPrice: null,
    subtotal: null,
  }
  const window = lines.slice(skuIndex + 1, skuIndex + 12)
  const qtyIndex = window.findIndex((line) => /^\d+$/.test(line))
  if (qtyIndex === -1) return result

  result.quantity = Number(window[qtyIndex])
  result.unitPrice = moneyFromLine(window[qtyIndex + 1])
  result.subtotal = moneyFromLine(window[qtyIndex + 2])
  return result
}

function isNonTitleLine(line: string): boolean {
  return (
    /^\[image:/i.test(line) ||
    /^https?:/i.test(line) ||
    /^Qty\s*Price\s*Subtotal/i.test(line) ||
    /^QtyPriceSubtotal/i.test(line) ||
    /^\d{8,14}$/.test(line) ||
    /^\d+[- ]?Pack(?:\s+with\s+Display\s+Case)?$/i.test(line) ||
    /^\d+-Day Supply/i.test(line) ||
    /^White$/i.test(line)
  )
}

function moneyFromLine(line: string | undefined): number | null {
  if (!line) return null
  const match = line.match(/\$([\d,.]+)/)
  return match?.[1] ? parseMoney(match[1]) : null
}

function parseMoney(raw: string): number {
  return roundMoney(Number(raw.replace(/,/g, '')))
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function htmlToText(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(
      /[\u034f\u061c\u00ad\u180e\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff]/g,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim()
}

function clampLimit(value: number): number {
  if (!Number.isFinite(value)) return 5000
  return Math.max(1, Math.min(10000, Math.floor(value)))
}

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}
