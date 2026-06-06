import type {
  WorkerExecutionSafeResponse,
  WorkerQueueInput,
  WorkerSpineResult,
} from './adapter'

export interface Pr600QueueExecutionRequest {
  queueItemId: string | null
  taskTitle: string
  taskInstruction: string
  requestedBy: 'tim' | 'executive' | 'workspace' | 'cron'
  approvalReceiptId: string | null
  dryRun?: boolean
}

export function buildWorkerQueueInputFromPr600Request(
  request: Pr600QueueExecutionRequest,
  nowIso: string,
): WorkerQueueInput {
  return {
    queueItemId: request.queueItemId,
    title: request.taskTitle,
    instruction: request.taskInstruction,
    requestedBy: request.requestedBy,
    source: 'executive_queue',
    domain: inferDomain(request.taskTitle, request.taskInstruction),
    riskLevel: inferRisk(request.taskTitle, request.taskInstruction),
    approvalReceiptId: request.approvalReceiptId,
    dryRun: request.dryRun ?? true,
    sourceRefs: [],
    nowIso,
  }
}

export function toPr600SafeResponse(
  result: WorkerSpineResult,
): WorkerExecutionSafeResponse {
  return result.safeResponse
}

function inferDomain(title: string, instruction: string): WorkerQueueInput['domain'] {
  const text = `${title} ${instruction}`.toLowerCase()
  if (text.includes('research')) return 'research'
  if (text.includes('finance') || text.includes('money')) return 'finance'
  if (text.includes('restored') || text.includes('church')) return 'restored'
  if (text.includes('travel multiplier') || text.includes('tm ')) return 'travel_multiplier'
  if (text.includes('code') || text.includes('build') || text.includes('implement')) return 'coding'
  return 'executive'
}

function inferRisk(title: string, instruction: string): WorkerQueueInput['riskLevel'] {
  const text = `${title} ${instruction}`.toLowerCase()
  if (/(send|publish|spend|delete|restart|merge|credential|calendar)/.test(text)) return 'high'
  return 'low'
}
