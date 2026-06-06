import type { WorkerQueueInput } from './adapter'

const nowIso = '2026-06-06T12:00:00.000Z'

function baseFixture(
  queueItemId: string,
  overrides: Partial<WorkerQueueInput>,
): WorkerQueueInput {
  return {
    queueItemId,
    title: 'Safe worker task',
    instruction: 'Complete safe local work only.',
    requestedBy: 'executive',
    source: 'fixture',
    domain: 'coding',
    riskLevel: 'low',
    approvalReceiptId: null,
    dryRun: true,
    sourceRefs: [{ label: 'Fake source', uri: 'fixture://source', safeToShow: true }],
    nowIso,
    ...overrides,
  }
}

export const safeCodingTask = baseFixture('fake-queue-safe-coding', {
  title: 'Implement adapter branch',
  instruction: 'Build a local worker spine adapter with fake-only ports.',
})

export const safeResearchTask = baseFixture('fake-queue-safe-research', {
  title: 'Summarize safe source',
  instruction: 'Summarize fake public source only.',
  domain: 'research',
})

export const blockedUnknownTask = baseFixture('fake-queue-blocked-unknown', {
  title: 'Do unknown risky thing',
  instruction: 'Ambiguous work with unknown owner.',
  domain: 'unknown',
})

export const needsTimExternalSend = baseFixture('fake-queue-needs-tim-send', {
  title: 'Send external message',
  instruction: 'Send this external message now.',
  riskLevel: 'high',
})

export const missingCredentialNeedsTimLocalSetup = baseFixture(
  'fake-queue-missing-credential',
  {
    title: 'Connect missing credential source',
    instruction: 'Use missing credential to continue.',
    riskLevel: 'high',
  },
)

export const missingSourceExecutiveEscalation = baseFixture(
  'fake-queue-missing-source',
  {
    title: 'Use missing source',
    instruction: 'Need a source that is not available to this worker.',
    domain: 'research',
  },
)

export const unsafeOutputRejected = baseFixture('fake-queue-unsafe-output', {
  title: 'Unsafe output regression',
  instruction: 'Return unsafe fake markers only in worker output.',
})

export const routineDryRunNotLogged = baseFixture('fake-queue-routine-dry-run', {
  title: 'Routine empty check',
  instruction: 'Run routine empty check with no meaningful outcome.',
  source: 'cron',
})

export const completedWithSafeArtifact = baseFixture('fake-queue-safe-artifact', {
  title: 'Create safe artifact label',
  instruction: 'Create a fake safe artifact reference.',
})

export const activityLogWritePending = baseFixture('fake-queue-log-pending', {
  title: 'Meaningful completion to log',
  instruction: 'Complete meaningful local work.',
})

export const activityLogWriteSkipped = baseFixture('fake-queue-log-skipped', {
  title: 'Skip routine log',
  instruction: 'Routine dry run should not log.',
  source: 'cron',
})

export const workerSpineAdapterFixtures = {
  safeCodingTask,
  safeResearchTask,
  blockedUnknownTask,
  needsTimExternalSend,
  missingCredentialNeedsTimLocalSetup,
  missingSourceExecutiveEscalation,
  unsafeOutputRejected,
  routineDryRunNotLogged,
  completedWithSafeArtifact,
  activityLogWritePending,
  activityLogWriteSkipped,
}

export const requiredUnsafeMarkers = [
  'FAKE_TOKEN_SHOULD_NOT_RENDER',
  'FAKE_AUTH_HEADER_SHOULD_NOT_RENDER',
  'FAKE_COOKIE_SHOULD_NOT_RENDER',
  'FAKE_ENV_PATH_SHOULD_NOT_RENDER',
  'FAKE_AUTH_JSON_PATH_SHOULD_NOT_RENDER',
  'FAKE_STACK_TRACE_SHOULD_NOT_RENDER',
  'FAKE_RAW_PROMPT_SHOULD_NOT_RENDER',
  'FAKE_RAW_COMPLETION_SHOULD_NOT_RENDER',
  'FAKE_PRIVATE_BODY_SHOULD_NOT_RENDER',
  'FAKE_LONG_LOG_SHOULD_NOT_RENDER',
] as const
