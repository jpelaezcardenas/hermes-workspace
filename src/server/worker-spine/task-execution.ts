import { runWorkerSpineAdapter } from './adapter'
import { buildWorkerQueueInputFromPr600Request } from './pr600-seam'
import { createFakeWorkerSpinePorts } from './ports'
import type { WorkerQueueInput, WorkerSpineResult } from './adapter'
import type { WorkerSpinePorts } from './ports'
import type { TaskColumn, TaskRecord, WorkerExecutionSummary } from '../tasks-store'

export type WorkerTaskPatch = {
  column: TaskColumn
  worker_execution: WorkerExecutionSummary
}

export function buildWorkerQueueInputFromTask(task: TaskRecord, nowIso: string): WorkerQueueInput {
  return buildWorkerQueueInputFromPr600Request({
    queueItemId: task.id,
    taskTitle: task.title,
    taskInstruction: task.description || task.title,
    requestedBy: 'workspace',
    approvalReceiptId: null,
    dryRun: true,
  }, nowIso)
}

export async function runFakeWorkerForTask(task: TaskRecord, options: {
  nowIso?: string
  ports?: WorkerSpinePorts
} = {}): Promise<WorkerSpineResult> {
  const nowIso = options.nowIso ?? new Date().toISOString()
  return runWorkerSpineAdapter({
    input: buildWorkerQueueInputFromTask(task, nowIso),
    ports: options.ports ?? createFakeWorkerSpinePorts(),
  })
}

export function mapWorkerResultToTaskPatch(result: WorkerSpineResult): WorkerTaskPatch {
  const status = result.decision.status === 'queued' || result.decision.status === 'running'
    ? 'blocked'
    : result.decision.status
  const summary: WorkerExecutionSummary = {
    status,
    safe_summary: result.safeResponse.safeSummary,
    safe_next_prompt: result.safeResponse.safeNextPrompt,
    requires_tim_approval: result.safeResponse.requiresTimApproval,
    approval_prompt: result.safeResponse.approvalPrompt,
    execution_record_id: result.safeResponse.executionRecordId,
    updated_at: result.record.updatedAt,
    dry_run: true,
  }

  return {
    column: columnForWorkerStatus(summary.status),
    worker_execution: summary,
  }
}

function columnForWorkerStatus(status: WorkerExecutionSummary['status']): TaskColumn {
  if (status === 'completed') return 'review'
  return 'blocked'
}
