import type {
  WorkerActivityLogDraft,
  WorkerCandidateOutput,
  WorkerContextPacket,
  WorkerExecutionRecord,
  WorkerSpinePorts,
  WorkerTelegramSummary,
} from './ports'

export type WorkerId =
  | 'executive'
  | 'codex'
  | 'research'
  | 'qa'
  | 'personal_cfo'
  | 'restored_cos'
  | 'tm_cos'

export interface WorkerQueueInput {
  queueItemId: string | null
  title: string
  instruction: string
  requestedBy: 'tim' | 'executive' | 'workspace' | 'cron' | 'system'
  source: 'executive_queue' | 'manual' | 'cron' | 'api' | 'fixture'
  domain:
    | 'executive'
    | 'coding'
    | 'research'
    | 'finance'
    | 'restored'
    | 'travel_multiplier'
    | 'personal'
    | 'unknown'
  riskLevel: 'low' | 'medium' | 'high'
  approvalReceiptId: string | null
  dryRun: boolean
  sourceRefs: Array<{
    label: string
    uri: string
    safeToShow: boolean
  }>
  nowIso: string
}

export interface WorkerSpineDecision {
  ok: boolean
  status: 'blocked' | 'needs_tim' | 'queued' | 'running' | 'completed' | 'failed'
  executionRecordId: string
  workerId: WorkerId | null
  routingDecisionId: string | null
  escalationPacketId: string | null
  contextPacketId: string | null
  safeSummary: string
  safeNextPrompt: string | null
  requiresTimApproval: boolean
  approvalPrompt: string | null
}

export interface WorkerOutputValidationResult {
  status: 'pass' | 'fail'
  safeSummary: string
  safeNextPrompt: string | null
}

export interface WorkerActivityLogDecision {
  state: 'not_needed' | 'pending' | 'logged' | 'failed'
  shouldWrite: boolean
  draft: WorkerActivityLogDraft | null
}

export interface WorkerExecutionSafeResponse {
  ok: boolean
  status: WorkerSpineDecision['status']
  executionRecordId: string
  safeSummary: string
  safeNextPrompt: string | null
  safeArtifactRefs: Array<{ label: string; uri: string; safeToShow: true }>
  safeSourceRefs: Array<{ label: string; uri: string; safeToShow: true }>
  requiresTimApproval: boolean
  approvalPrompt: string | null
}

export interface WorkerSpineResult {
  decision: WorkerSpineDecision
  record: WorkerExecutionRecord
  validation: WorkerOutputValidationResult | null
  telegramSummary: WorkerTelegramSummary | null
  activityLogDecision: WorkerActivityLogDecision | null
  safeResponse: WorkerExecutionSafeResponse
}

export async function runWorkerSpineAdapter(args: {
  input: WorkerQueueInput
  ports: WorkerSpinePorts
}): Promise<WorkerSpineResult> {
  const { input, ports } = args
  const inputProblem = validateWorkerQueueInput(input)
  if (inputProblem) {
    return blockedResult(input, 'Worker request is missing required safe input.', input.nowIso)
  }

  if (input.domain === 'unknown') {
    return blockedResult(
      input,
      'Worker request blocked until Executive reviews routing.',
      input.nowIso,
    )
  }

  if (isMissingSource(input)) {
    return blockedResult(
      input,
      'Missing source. Executive should check available tools before asking Tim.',
      input.nowIso,
    )
  }

  if (isMissingCredential(input)) {
    return needsTimResult(
      input,
      'Access needed before this worker can continue.',
      'Access needed: connect the required source locally. Next prompt: `Set up source access`',
    )
  }

  if (requiresApproval(input)) {
    return needsTimResult(
      input,
      'Worker request needs Tim approval before dispatch.',
      'Approval needed: external send. Risk: public outbound action. Reply: `Approve external send`',
    )
  }

  const record = makeRecord(input, 'running', 'Worker request is running safely.')
  const context: WorkerContextPacket = {
    id: `fake-context-${safeId(input.queueItemId ?? input.title)}`,
    title: sanitizeText(input.title, 'Worker task'),
    instruction: sanitizeText(input.instruction, 'Safe worker instruction'),
    dryRun: input.dryRun,
  }
  const candidateOutput = await ports.dispatchWorker(context)
  const validation = validateWorkerOutput(candidateOutput)
  if (validation.status === 'fail') {
    const failedRecord = {
      ...record,
      status: 'failed' as const,
      safeSummary: 'Worker output failed safety validation.',
      updatedAt: input.nowIso,
    }
    await ports.persistRecord(failedRecord)
    return resultFromParts({
      decision: makeDecision({
        input,
        status: 'failed',
        ok: false,
        summary: 'Worker output failed safety validation.',
        nextPrompt: 'Regenerate safe output',
        workerId: routeWorkerId(input),
        contextPacketId: context.id,
      }),
      record: failedRecord,
      validation,
      telegramSummary: { kind: 'failure', shouldDeliver: true, message: 'Failed safely. Worker output failed safety validation.' },
      activityLogDecision: { state: 'failed', shouldWrite: false, draft: null },
    })
  }

  const completedRecord = {
    ...record,
    status: 'completed' as const,
    safeSummary: validation.safeSummary,
    updatedAt: input.nowIso,
  }
  await ports.persistRecord(completedRecord)
  const routine = isRoutine(input)
  return resultFromParts({
    decision: makeDecision({
      input,
      status: 'completed',
      ok: true,
      summary: validation.safeSummary,
      nextPrompt: validation.safeNextPrompt,
      workerId: routeWorkerId(input),
      contextPacketId: context.id,
    }),
    record: completedRecord,
    validation,
    telegramSummary: routine
      ? { kind: 'silent', shouldDeliver: false, message: null }
      : { kind: 'completion', shouldDeliver: true, message: `Done. ${validation.safeSummary}` },
    activityLogDecision: routine
      ? { state: 'not_needed', shouldWrite: false, draft: null }
      : {
          state: 'pending',
          shouldWrite: true,
          draft: {
            action: sanitizeText(input.title, 'Completed worker task'),
            details: validation.safeSummary,
          },
        },
  })
}

function validateWorkerQueueInput(input: WorkerQueueInput): string | null {
  if (!input.title.trim() || !input.instruction.trim()) return 'missing_input'
  if (!input.nowIso.trim()) return 'missing_time'
  return null
}

function validateWorkerOutput(output: WorkerCandidateOutput): WorkerOutputValidationResult {
  const combined = JSON.stringify(output)
  if (containsUnsafe(combined)) {
    return {
      status: 'fail',
      safeSummary: 'Worker output failed safety validation.',
      safeNextPrompt: 'Regenerate safe output',
    }
  }
  return {
    status: 'pass',
    safeSummary: sanitizeText(output.summary, 'Safe worker result completed.'),
    safeNextPrompt: output.nextPrompt ? sanitizeText(output.nextPrompt, 'Review worker result') : null,
  }
}

function resultFromParts(args: {
  decision: WorkerSpineDecision
  record: WorkerExecutionRecord
  validation: WorkerOutputValidationResult | null
  telegramSummary: WorkerTelegramSummary | null
  activityLogDecision: WorkerActivityLogDecision | null
}): WorkerSpineResult {
  const safeResponse = buildSafeResponse(args.decision)
  return { ...args, safeResponse }
}

function blockedResult(input: WorkerQueueInput, summary: string, nowIso: string): WorkerSpineResult {
  const record = makeRecord(input, 'blocked', summary, nowIso)
  return resultFromParts({
    decision: makeDecision({
      input,
      status: 'blocked',
      ok: false,
      summary,
      nextPrompt: 'Review worker routing',
      workerId: null,
      escalationPacketId: `fake-escalation-${safeId(input.queueItemId ?? input.title)}`,
    }),
    record,
    validation: null,
    telegramSummary: { kind: 'blocked', shouldDeliver: true, message: `Blocked. ${summary}` },
    activityLogDecision: { state: 'not_needed', shouldWrite: false, draft: null },
  })
}

function needsTimResult(input: WorkerQueueInput, summary: string, approvalPrompt: string): WorkerSpineResult {
  const record = makeRecord(input, 'needs_tim', summary)
  const decision = makeDecision({
    input,
    status: 'needs_tim',
    ok: false,
    summary,
    nextPrompt: 'Review approval request',
    workerId: null,
    escalationPacketId: `fake-escalation-${safeId(input.queueItemId ?? input.title)}`,
    requiresTimApproval: true,
    approvalPrompt,
  })
  return resultFromParts({
    decision,
    record,
    validation: null,
    telegramSummary: { kind: 'needs_tim', shouldDeliver: true, message: approvalPrompt },
    activityLogDecision: { state: 'pending', shouldWrite: true, draft: { action: 'Review worker approval', details: summary } },
  })
}

function makeDecision(args: {
  input: WorkerQueueInput
  status: WorkerSpineDecision['status']
  ok: boolean
  summary: string
  nextPrompt: string | null
  workerId: WorkerId | null
  escalationPacketId?: string | null
  contextPacketId?: string | null
  requiresTimApproval?: boolean
  approvalPrompt?: string | null
}): WorkerSpineDecision {
  return {
    ok: args.ok,
    status: args.status,
    executionRecordId: executionRecordId(args.input),
    workerId: args.workerId,
    routingDecisionId: `fake-routing-${safeId(args.input.queueItemId ?? args.input.title)}`,
    escalationPacketId: args.escalationPacketId ?? null,
    contextPacketId: args.contextPacketId ?? null,
    safeSummary: args.summary,
    safeNextPrompt: args.nextPrompt,
    requiresTimApproval: args.requiresTimApproval ?? false,
    approvalPrompt: args.approvalPrompt ?? null,
  }
}

function makeRecord(
  input: WorkerQueueInput,
  status: WorkerExecutionRecord['status'],
  safeSummary: string,
  nowIso = input.nowIso,
): WorkerExecutionRecord {
  return {
    id: executionRecordId(input),
    status,
    queueItemId: input.queueItemId,
    title: sanitizeText(input.title, 'Worker task'),
    safeSummary,
    createdAt: nowIso,
    updatedAt: nowIso,
  }
}

function buildSafeResponse(decision: WorkerSpineDecision): WorkerExecutionSafeResponse {
  return {
    ok: decision.ok,
    status: decision.status,
    executionRecordId: decision.executionRecordId,
    safeSummary: decision.safeSummary,
    safeNextPrompt: decision.safeNextPrompt,
    safeArtifactRefs: [],
    safeSourceRefs: [],
    requiresTimApproval: decision.requiresTimApproval,
    approvalPrompt: decision.approvalPrompt,
  }
}

function requiresApproval(input: WorkerQueueInput): boolean {
  const text = `${input.title} ${input.instruction}`.toLowerCase()
  return input.riskLevel === 'high' && text.includes('send') && !input.approvalReceiptId
}

function isMissingCredential(input: WorkerQueueInput): boolean {
  return `${input.title} ${input.instruction}`.toLowerCase().includes('credential')
}

function isMissingSource(input: WorkerQueueInput): boolean {
  return `${input.title} ${input.instruction}`.toLowerCase().includes('missing source')
}

function isRoutine(input: WorkerQueueInput): boolean {
  const text = `${input.title} ${input.instruction}`.toLowerCase()
  return input.source === 'cron' || text.includes('routine empty check')
}

function routeWorkerId(input: WorkerQueueInput): WorkerId {
  if (input.domain === 'research') return 'research'
  if (input.domain === 'finance') return 'personal_cfo'
  if (input.domain === 'restored') return 'restored_cos'
  if (input.domain === 'travel_multiplier') return 'tm_cos'
  if (input.domain === 'coding') return 'codex'
  return 'executive'
}

function executionRecordId(input: WorkerQueueInput): string {
  return `fake-exec-${safeId(input.queueItemId ?? input.title)}`
}

function safeId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'worker'
}

function sanitizeText(value: string, fallback: string): string {
  if (!value.trim() || containsUnsafe(value)) return fallback
  return value.trim()
}

function containsUnsafe(value: string): boolean {
  return /FAKE_(TOKEN|AUTH_HEADER|COOKIE|ENV_PATH|AUTH_JSON_PATH|STACK_TRACE|RAW_PROMPT|RAW_COMPLETION|PRIVATE_BODY|LONG_LOG)_SHOULD_NOT_RENDER/i.test(value)
}
