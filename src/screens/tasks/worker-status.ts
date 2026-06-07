import type { WorkerExecutionSummary } from '@/lib/tasks-api'

export type WorkerExecutionTone = 'success' | 'warning' | 'danger' | 'neutral'

export function shouldShowWorkerExecution(execution: WorkerExecutionSummary | null | undefined): execution is WorkerExecutionSummary {
  return Boolean(execution?.safe_summary && execution.execution_record_id)
}

export function formatWorkerExecutionLabel(execution: WorkerExecutionSummary): string {
  if (execution.status === 'needs_tim') return 'Worker: needs Tim'
  return `Worker: ${execution.status}`
}

export function getWorkerExecutionTone(status: WorkerExecutionSummary['status']): WorkerExecutionTone {
  switch (status) {
    case 'completed':
      return 'success'
    case 'needs_tim':
      return 'warning'
    case 'blocked':
    case 'failed':
      return 'danger'
  }
}

export function workerToneClass(tone: WorkerExecutionTone): string {
  if (tone === 'success') return 'border-green-500/30 bg-green-500/10 text-green-300'
  if (tone === 'warning') return 'border-amber-500/30 bg-amber-500/10 text-amber-300'
  if (tone === 'danger') return 'border-red-500/30 bg-red-500/10 text-red-300'
  return 'border-[var(--theme-border)] bg-[var(--theme-hover)] text-[var(--theme-muted)]'
}
