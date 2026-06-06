import type { ExecutiveQueueItem } from '@/routes/api/-executive-queue-utils'

export const ACTIVE_QUEUE_STATUSES = new Set(['Triage', 'Proposed', 'Queued', 'In Progress', 'Blocked'])
export const PRIORITY_WEIGHT: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3, P4: 4 }
export const DOMAIN_ORDER = ['Restored', 'Finance', 'Travel Multiplier', 'Personal', 'AI Ops', 'Meetings', 'Email']

export type StartHereMode = 'Repair' | 'Decide' | 'Unblock' | 'Blitz' | 'Check'

export type StartHereQueueState = {
  activeItems: Array<ExecutiveQueueItem>
  criticalExceptionItems: Array<ExecutiveQueueItem>
  approvalItems: Array<ExecutiveQueueItem>
  blockedItems: Array<ExecutiveQueueItem>
  blitzItems: Array<ExecutiveQueueItem>
  safeDraftOnlyItems: Array<ExecutiveQueueItem>
  safeDraftOnlyItem: ExecutiveQueueItem | null
  inProgressItems: Array<ExecutiveQueueItem>
  primaryItem: ExecutiveQueueItem | null
  primaryMode: StartHereMode
  primaryCta: string
  topLine: string
}

function isTerminalStatus(item: ExecutiveQueueItem): boolean {
  const status = String(item.status).toLowerCase()
  return ['done', 'archived', 'cancelled', 'canceled', 'parked'].includes(status)
}

function isParkedOrCancelled(item: ExecutiveQueueItem): boolean {
  const status = String(item.status).toLowerCase()
  const text = [item.title, item.context, item.blockedReason, item.resultSummary]
    .join(' ')
    .toLowerCase()
  return (
    ['cancelled', 'canceled', 'parked'].includes(status) ||
    /\b(cancelled|canceled|parked)\b/.test(text)
  )
}

function isActionableNow(item: ExecutiveQueueItem): boolean {
  return !isTerminalStatus(item) && item.status !== 'Blocked' && item.status !== 'In Progress'
}

function needsTimDecision(item: ExecutiveQueueItem): boolean {
  return isActionableNow(item) && (item.status === 'Proposed' || item.approvalLevel !== 'Auto')
}

const CRITICAL_FAILURE_PATTERN = /\b(broken|failed|failure|down|offline|unavailable|expired|unauthorized|auth|access|credential|secret|token|mcp)\b/i
const CRITICAL_SERVICE_PATTERN = /\b(gmail|superhuman|monarch|telegram|delivery|gateway|dashboard|api|cron|watchdog|calendar|finance)\b/i

function isCriticalException(item: ExecutiveQueueItem): boolean {
  if (isTerminalStatus(item)) return false

  const text = [
    item.title,
    item.outcome,
    item.context,
    item.nextAction,
    item.blockedReason,
    item.source.excerpt,
  ].join(' ')
  if (!CRITICAL_FAILURE_PATTERN.test(text) || !CRITICAL_SERVICE_PATTERN.test(text)) return false

  const severePriority = item.priority === 'P0' || item.priority === 'P1'
  const elevatedRisk = item.riskLevel === 'High' || item.approvalLevel === 'Ask Before System Change' || item.approvalLevel === 'Manual Only'
  const impairedWorkflow = item.status === 'Blocked' || item.status === 'Proposed' || item.status === 'Triage'
  const criticalDomain = item.domain === 'AI Ops' || item.domain === 'Email' || item.domain === 'Finance' || item.domain === 'Calendar'

  return severePriority && elevatedRisk && impairedWorkflow && criticalDomain
}

export function sortQueueItems(items: Array<ExecutiveQueueItem>): Array<ExecutiveQueueItem> {
  return [...items].sort((a, b) => {
    const priority = (PRIORITY_WEIGHT[a.priority] ?? 9) - (PRIORITY_WEIGHT[b.priority] ?? 9)
    if (priority !== 0) return priority
    const aTime = Date.parse(a.updatedAt || a.createdAt || '') || 0
    const bTime = Date.parse(b.updatedAt || b.createdAt || '') || 0
    return bTime - aTime
  })
}

const GATED_DRAFT_TEXT_PATTERN = /\b(people|personnel|staffing|pastoral|counsel|motion|calendar|schedule|invite|send|email|text|message|publish|post|money|spend|payment|reimburse|monarch|finance|tax|budget|system|restart|deploy|config|credential|secret|token|oauth|cron|launchd|docker)\b/i
const SAFE_DRAFT_TEXT_PATTERN = /\b(draft|summarize|summary|classify|research|review|analy[sz]e|outline|local|notes?|report)\b/i

export function isSafeDraftOnlyQueueItem(item: ExecutiveQueueItem): boolean {
  const text = [
    item.title,
    item.outcome,
    item.context,
    item.nextAction,
    item.blockedReason,
    ...item.constraints,
  ].join(' ')

  if (isParkedOrCancelled(item)) return false
  if (item.status !== 'Queued') return false
  if (item.riskLevel !== 'Low') return false
  if (item.approvalLevel !== 'Auto') return false
  if (item.domain === 'Calendar' || item.domain === 'Finance') return false
  if (item.owner === 'Finance CFO' || item.owner === 'Calendar Assistant') return false
  if (GATED_DRAFT_TEXT_PATTERN.test(text)) return false
  return SAFE_DRAFT_TEXT_PATTERN.test(text)
}

export function selectSafeDraftOnlyQueueItem(
  items: Array<ExecutiveQueueItem>,
): ExecutiveQueueItem | null {
  return sortQueueItems(items.filter(isSafeDraftOnlyQueueItem))[0] ?? null
}

export function getStartHereQueueState(items: Array<ExecutiveQueueItem>): StartHereQueueState {
  const activeItems = sortQueueItems(items.filter((item) => ACTIVE_QUEUE_STATUSES.has(item.status)))
  const criticalExceptionItems = sortQueueItems(activeItems.filter(isCriticalException))
  const approvalItems = sortQueueItems(items.filter(needsTimDecision))
  const blockedItems = sortQueueItems(items.filter((item) => item.status === 'Blocked'))
  const safeDraftOnlyItems = sortQueueItems(items.filter(isSafeDraftOnlyQueueItem))
  const safeDraftOnlyItem = safeDraftOnlyItems[0] ?? null
  const blitzItems = safeDraftOnlyItems
  const inProgressItems = activeItems.filter((item) => item.status === 'In Progress')

  const primaryItem = (() => {
    if (criticalExceptionItems.length) return criticalExceptionItems[0]
    if (approvalItems.length) return approvalItems[0]
    if (blitzItems.length) return blitzItems[0]
    if (blockedItems.length) return blockedItems[0]
    return null
  })()

  const primaryMode: StartHereMode = criticalExceptionItems.length
    ? 'Repair'
    : approvalItems.length
    ? 'Decide'
    : blitzItems.length
      ? 'Blitz'
      : blockedItems.length
        ? 'Unblock'
        : 'Check'

  const primaryCta = primaryMode === 'Repair'
    ? 'Open critical exception'
    : primaryMode === 'Decide'
    ? 'Open approvals'
    : primaryMode === 'Blitz'
      ? 'Start safe draft'
      : primaryMode === 'Unblock'
        ? 'Open blocked item'
        : 'Open queue'

  const topLine = (() => {
    if (criticalExceptionItems.length) {
      return `${criticalExceptionItems.length} critical exception${criticalExceptionItems.length === 1 ? '' : 's'} need fast attention. Start with ${criticalExceptionItems[0].title}.`
    }
    if (approvalItems.length) {
      return `${approvalItems.length} actionable decision${approvalItems.length === 1 ? '' : 's'} ready. Start with ${approvalItems[0].title}.`
    }
    if (blitzItems.length) {
      return `${blitzItems.length} active queue item${blitzItems.length === 1 ? '' : 's'} are ready to move. Start with ${blitzItems[0].title}.`
    }
    if (blockedItems.length) {
      return `${blockedItems.length} item${blockedItems.length === 1 ? '' : 's'} are blocked. Start with ${blockedItems[0].title}.`
    }
    return 'No active queue items are loaded. This should be unusual.'
  })()

  return {
    activeItems,
    criticalExceptionItems,
    approvalItems,
    blockedItems,
    blitzItems,
    safeDraftOnlyItems,
    safeDraftOnlyItem,
    inProgressItems,
    primaryItem,
    primaryMode,
    primaryCta,
    topLine,
  }
}
