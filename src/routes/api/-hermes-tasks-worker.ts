import type { WorkerExecutionSafeResponse } from '../../server/worker-spine/adapter'
import type { TaskRecord } from '../../server/tasks-store'

export type WorkerRunBody = { dryRun: true }

export function parseWorkerRunBody(_body: unknown): WorkerRunBody {
  return { dryRun: true }
}

export function workerRunResponsePayload(args: {
  task: TaskRecord
  safeResponse: WorkerExecutionSafeResponse
}): {
  task: TaskRecord
  worker: WorkerExecutionSafeResponse
} {
  return {
    task: args.task,
    worker: args.safeResponse,
  }
}
