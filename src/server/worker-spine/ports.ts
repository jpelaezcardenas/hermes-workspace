export type WorkerCandidateOutputStatus = 'completed' | 'failed'

export interface WorkerCandidateOutput {
  status: WorkerCandidateOutputStatus
  summary: string
  nextPrompt: string | null
  artifactRefs: Array<{ label: string; uri: string; safeToShow: boolean }>
}

export interface WorkerExecutionRecord {
  id: string
  status: 'blocked' | 'needs_tim' | 'queued' | 'running' | 'completed' | 'failed'
  queueItemId: string | null
  title: string
  safeSummary: string
  createdAt: string
  updatedAt: string
}

export interface WorkerContextPacket {
  id: string
  title: string
  instruction: string
  dryRun: boolean
}

export interface WorkerActivityLogDraft {
  action: string
  details: string
}

export interface WorkerTelegramSummary {
  kind: 'silent' | 'completion' | 'blocked' | 'needs_tim' | 'failure'
  shouldDeliver: boolean
  message: string | null
}

export interface WorkerSpinePorts {
  dispatchWorker: (context: WorkerContextPacket) => Promise<WorkerCandidateOutput>
  persistRecord: (record: WorkerExecutionRecord) => Promise<WorkerExecutionRecord>
  writeActivityLog?: (
    draft: WorkerActivityLogDraft,
  ) => Promise<{ ok: true; pageId: string } | { ok: false; safeReason: string }>
  deliverTelegram?: (
    summary: WorkerTelegramSummary,
  ) => Promise<{ ok: true } | { ok: false; safeReason: string }>
}

export interface FakeWorkerSpinePorts extends WorkerSpinePorts {
  dispatchCalls: Array<WorkerContextPacket>
  persistCalls: Array<WorkerExecutionRecord>
}

export const defaultFakeWorkerOutput: WorkerCandidateOutput = {
  status: 'completed',
  summary: 'Safe worker result completed.',
  nextPrompt: 'Review worker result',
  artifactRefs: [],
}

export function createFakeWorkerSpinePorts(options: {
  candidateOutput?: WorkerCandidateOutput
} = {}): FakeWorkerSpinePorts {
  const dispatchCalls: Array<WorkerContextPacket> = []
  const persistCalls: Array<WorkerExecutionRecord> = []
  const candidateOutput = options.candidateOutput ?? defaultFakeWorkerOutput

  return {
    dispatchCalls,
    persistCalls,
    dispatchWorker(context) {
      dispatchCalls.push(context)
      return Promise.resolve(candidateOutput)
    },
    persistRecord(record) {
      persistCalls.push(record)
      return Promise.resolve(record)
    },
  }
}
