import type {
  ExecutiveQueueItem,
  QueueExecutionMode,
} from './-executive-queue-utils'

export type SafetyVerdict = 'allow' | 'gate' | 'suppress' | 'deny'

export type WorkerSafetyDecision = {
  verdict: SafetyVerdict
  reasons: Array<string>
  timFacing: boolean
  requiredApprovalPhrase?: string
}

export type WorkerSurfaceItem = {
  surface:
    | 'source_coverage'
    | 'motion'
    | 'granola'
    | 'reader_transcript'
    | 'x_research'
    | 'bookmark_research'
    | 'executive_queue'
    | 'kanban'
    | 'heavy_lift'
    | 'workspace_approval'
    | 'telegram_summary'
    | 'agent_surface'
  action: string
  source?: {
    type?: string
    id?: string
    status?: 'verified' | 'partial' | 'failed' | 'unavailable'
  }
  title?: string
  body?: string
  owner?: string
  ownership?: 'tim_clear' | 'teammate' | 'ambiguous' | 'unassigned'
  confidential?: boolean
  sensitivePeopleIssue?: boolean
  fullTranscriptVerified?: boolean
  recommendationType?: 'sell' | 'package' | 'pilot_offer' | 'outbound' | 'internal'
  rawWorkerOutput?: boolean
  riskClasses?: Array<string>
  sideEffects?: Array<string>
  approvalPhrase?: string
  expectedApprovalPhrase?: string
  approvalReceiptId?: string
  href?: string
}

type QueueExecutionSafetyInput = {
  item: ExecutiveQueueItem
  mode: QueueExecutionMode
  approvedPhrase?: string
}

const HIGH_RISK_CLASSES = new Set([
  'finance_write',
  'external_communication',
  'pastoral_private_people',
  'system_change',
  'credential_or_secret',
  'public_publishing',
  'cron_change',
  'money_movement',
  'calendar_commitment',
  'motion_mutation',
])

const SIDE_EFFECT_ACTIONS = new Set([
  'send_email',
  'send_text',
  'publish',
  'create_cron',
  'update_cron',
  'restart_gateway',
  'repair_oauth',
  'write_monarch',
  'move_money',
  'change_motion_task',
  'create_calendar_commitment',
  'launch_worker',
  'approve_and_run',
])

const SAFE_INTERNAL_ACTIONS = new Set([
  'summarize',
  'draft',
  'classify',
  'local_report',
  'queue_proposal',
  'read_only_research',
])

const QUEUE_DRAFT_ONLY_GATED_PATTERN = /\b(people|personnel|staffing|pastoral|counsel|motion|calendar|schedule|invite|send|email|text|message|publish|post|money|spend|payment|reimburse|monarch|finance|tax|budget|system|restart|deploy|config|credential|secret|token|oauth|cron|launchd|docker)\b/i

const SECRET_PATTERNS = [
  /api[_-]?key\s*[:=]/i,
  /bearer\s+[a-z0-9._-]{8,}/i,
  /refresh[_-]?token/i,
  /auth\.json|\.env|credential/i,
]

const SOURCE_COVERAGE_SAFE_KEYS = new Set([
  'available',
  'generated_at',
  'items_last_30_days_scanned',
  'estimated_ai_relevant_items',
  'x_bookmarks_30_days',
  'unique_x_accounts_30_days',
  'reader_action_summary',
  'recent_notes_scanned',
  'eligible_notes_parsed',
  'skipped_confidential_or_sensitive',
  'action_summary',
  'task_count',
  'ownership_counts',
  'tim_owned_count',
  'teammate_owned_count',
  'ambiguous_unassigned_count',
  'unscheduled_count',
  'items_checked',
  'acceptable_full_transcripts',
  'unacceptable_transcripts',
  'failure_reason_counts',
])

function decision(
  verdict: SafetyVerdict,
  reasons: Array<string>,
  timFacing: boolean,
  requiredApprovalPhrase?: string,
): WorkerSafetyDecision {
  return {
    verdict,
    reasons: [...new Set(reasons)].sort(),
    timFacing,
    ...(requiredApprovalPhrase ? { requiredApprovalPhrase } : {}),
  }
}

function containsSecretLikeText(text: string): boolean {
  return SECRET_PATTERNS.some((pattern) => pattern.test(text))
}

function isGenericApproval(phrase: string | undefined): boolean {
  const normalized = phrase?.trim().toLowerCase()
  return !normalized || ['approve', 'approved', 'yes', 'ok', 'go', 'approve and run'].includes(normalized)
}

function hasSpecificApproval(input: {
  approvalPhrase?: string
  expectedApprovalPhrase?: string
}): boolean {
  const phrase = input.approvalPhrase?.trim()
  const expected = input.expectedApprovalPhrase?.trim()
  return Boolean(phrase && expected && phrase === expected && !isGenericApproval(phrase))
}

function itemText(item: WorkerSurfaceItem): string {
  return [item.title, item.body].filter(Boolean).join(' ')
}

export function evaluateWorkerSurfaceItem(
  item: WorkerSurfaceItem,
): WorkerSafetyDecision {
  if (item.rawWorkerOutput) {
    return decision(
      'suppress',
      ['raw_worker_output_requires_executive_synthesis'],
      false,
    )
  }

  if (containsSecretLikeText(itemText(item))) {
    return decision('deny', ['secret_or_credential_like_text'], false)
  }

  const reasons: Array<string> = []
  const source = item.source

  if (!source?.type || !source.id) reasons.push('missing_source_link')
  if (
    source?.status &&
    ['partial', 'failed', 'unavailable'].includes(source.status)
  ) {
    reasons.push('source_not_verified')
  }

  if (item.surface === 'motion') {
    if (item.owner && item.owner !== 'Tim') reasons.push('motion_non_tim_owned_suppressed')
    if (['teammate', 'ambiguous', 'unassigned'].includes(item.ownership ?? '')) {
      reasons.push('motion_ownership_not_tim_clear')
    }
  }

  if (item.surface === 'granola') {
    if (item.confidential || item.sensitivePeopleIssue) {
      reasons.push('granola_sensitive_or_confidential')
    }
    if (item.ownership !== 'tim_clear') {
      reasons.push('granola_ownership_not_tim_clear')
    }
  }

  if (item.surface === 'reader_transcript' && !item.fullTranscriptVerified) {
    reasons.push('full_transcript_not_verified')
  }

  if (
    (item.surface === 'x_research' || item.surface === 'bookmark_research') &&
    ['sell', 'package', 'pilot_offer', 'outbound'].includes(
      item.recommendationType ?? '',
    )
  ) {
    reasons.push('external_or_monetization_recommendation_needs_approval')
  }

  if (
    ['kanban', 'heavy_lift', 'workspace_approval', 'telegram_summary'].includes(
      item.surface,
    )
  ) {
    if (SIDE_EFFECT_ACTIONS.has(item.action) && !item.approvalReceiptId) {
      reasons.push('agent_surface_missing_approval_receipt')
    }
    if (item.href && !item.href.startsWith('/') && !item.href.startsWith('https://')) {
      reasons.push('unsafe_href')
    }
  }

  if ((item.sideEffects?.length ?? 0) > 1 && isGenericApproval(item.approvalPhrase)) {
    reasons.push('generic_approve_cannot_authorize_multiple_side_effects')
  }

  if (item.riskClasses?.some((riskClass) => HIGH_RISK_CLASSES.has(riskClass))) {
    reasons.push('high_risk_class_requires_gate')
  }

  if (SIDE_EFFECT_ACTIONS.has(item.action)) {
    if (hasSpecificApproval(item) && reasons.length === 0) {
      return decision('allow', ['specific_approval_present'], true)
    }
    if (!hasSpecificApproval(item)) {
      reasons.push('side_effect_requires_specific_approval_phrase')
    }
    return decision('gate', reasons, true, item.expectedApprovalPhrase)
  }

  if (!SAFE_INTERNAL_ACTIONS.has(item.action)) {
    reasons.push('unknown_action_defaults_to_gate')
  }

  const suppressReasons = new Set([
    'missing_source_link',
    'source_not_verified',
    'motion_non_tim_owned_suppressed',
    'motion_ownership_not_tim_clear',
    'granola_sensitive_or_confidential',
    'granola_ownership_not_tim_clear',
    'full_transcript_not_verified',
  ])

  if (reasons.some((reason) => suppressReasons.has(reason))) {
    return decision('suppress', reasons, false)
  }

  if (reasons.length > 0) return decision('gate', reasons, true)

  return decision('allow', ['safe_internal_item'], true)
}

function queueText(item: ExecutiveQueueItem): string {
  return [
    item.title,
    item.outcome,
    item.context,
    item.nextAction,
    ...item.constraints,
  ].join(' ')
}

function expectedQueuePhrase(item: ExecutiveQueueItem): string {
  return `RUN-${item.id}`
}

export function evaluateQueueExecutionSafety(
  input: QueueExecutionSafetyInput,
): WorkerSafetyDecision {
  const reasons: Array<string> = []

  if (!input.item.source.id) {
    reasons.push('missing_source_link')
  }

  if (containsSecretLikeText(queueText(input.item))) {
    return decision('deny', ['secret_or_credential_like_text'], false)
  }

  if (input.mode === 'explain_more') {
    return reasons.length
      ? decision('suppress', reasons, false)
      : decision('allow', ['explanation_only'], true)
  }

  if (input.mode === 'draft_only') {
    if (input.item.riskLevel !== 'Low' || input.item.approvalLevel !== 'Auto') {
      reasons.push('draft_only_requires_low_risk_auto_item')
    }
    if (input.item.status !== 'Queued' && input.item.status !== 'In Progress') {
      reasons.push('draft_only_requires_active_queue_item')
    }
    if (input.item.domain === 'Calendar' || input.item.domain === 'Finance') {
      reasons.push('draft_only_touches_approval_gated_surface')
    }
    if (
      input.item.owner === 'Finance CFO' ||
      input.item.owner === 'Calendar Assistant'
    ) {
      reasons.push('draft_only_touches_approval_gated_surface')
    }
    if (QUEUE_DRAFT_ONLY_GATED_PATTERN.test(queueText(input.item))) {
      reasons.push('draft_only_touches_approval_gated_surface')
    }
    return reasons.length
      ? decision('gate', reasons, true)
      : decision('allow', ['draft_only_local_execution'], true)
  }

  const requiredPhrase = expectedQueuePhrase(input.item)

  if (isGenericApproval(input.approvedPhrase)) {
    reasons.push('generic_approve_cannot_authorize_execution')
  }

  if (input.item.riskLevel === 'High') {
    reasons.push('high_risk_queue_item_requires_manual_gate')
  }

  if (
    input.item.riskLevel === 'Medium' ||
    input.item.approvalLevel !== 'Auto'
  ) {
    if (input.approvedPhrase?.trim() !== requiredPhrase) {
      reasons.push('item_scoped_approval_phrase_required')
    }
  }

  if (input.item.approvalLevel === 'Manual Only') {
    reasons.push('manual_only_item_cannot_auto_execute')
  }

  if (reasons.length > 0) {
    return decision('gate', reasons, true, requiredPhrase)
  }

  return decision('allow', ['safe_approve_and_run_execution'], true)
}

function sanitizeObject(value: unknown, allowArbitraryKeys = false): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value

  const result: Record<string, unknown> = {}
  for (const [key, nested] of Object.entries(value)) {
    if (!allowArbitraryKeys && !SOURCE_COVERAGE_SAFE_KEYS.has(key)) continue
    const nestedAllowsArbitraryKeys = key === 'failure_reason_counts'
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      result[key] = sanitizeObject(nested, nestedAllowsArbitraryKeys)
    } else {
      result[key] = nested
    }
  }
  return result
}

export function sanitizeSourceCoverageSnapshot(
  snapshot: Record<string, unknown>,
): Record<string, unknown> {
  const safe: Record<string, unknown> = {}
  if (typeof snapshot.generated_at === 'string') safe.generated_at = snapshot.generated_at

  const sources = snapshot.sources
  if (sources && typeof sources === 'object' && !Array.isArray(sources)) {
    safe.sources = Object.fromEntries(
      Object.entries(sources).map(([name, value]) => [name, sanitizeObject(value)]),
    )
  }
  return safe
}
