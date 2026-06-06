import { runWorkerSpineAdapter } from './adapter'
import {
  blockedUnknownTask,
  missingCredentialNeedsTimLocalSetup,
  needsTimExternalSend,
  requiredUnsafeMarkers,
  routineDryRunNotLogged,
  safeCodingTask,
  unsafeOutputRejected,
} from './adapter-fixtures'
import { createFakeWorkerSpinePorts } from './ports'

export interface WorkerSpineSmokeResult {
  ok: boolean
  summary: string
  scenariosPassed: number
  scenariosFailed: number
  unsafeMarkersAbsent: boolean
  surfacesVerified: Array<string>
}

export async function runWorkerSpineSmoke(): Promise<WorkerSpineSmokeResult> {
  const scenarios = [
    { input: safeCodingTask, expectedStatus: 'completed' },
    { input: blockedUnknownTask, expectedStatus: 'blocked' },
    { input: needsTimExternalSend, expectedStatus: 'needs_tim' },
    { input: missingCredentialNeedsTimLocalSetup, expectedStatus: 'needs_tim' },
    { input: routineDryRunNotLogged, expectedStatus: 'completed' },
  ] as const

  let passed = 0
  let failed = 0
  const serializedResults: Array<string> = []

  for (const scenario of scenarios) {
    const result = await runWorkerSpineAdapter({
      input: scenario.input,
      ports: createFakeWorkerSpinePorts(),
    })
    serializedResults.push(JSON.stringify(result))
    if (result.decision.status === scenario.expectedStatus) passed += 1
    else failed += 1
  }

  const unsafeResult = await runWorkerSpineAdapter({
    input: unsafeOutputRejected,
    ports: createFakeWorkerSpinePorts({
      candidateOutput: {
        status: 'completed',
        summary: 'FAKE_TOKEN_SHOULD_NOT_RENDER FAKE_RAW_PROMPT_SHOULD_NOT_RENDER',
        nextPrompt: 'unsafe',
        artifactRefs: [],
      },
    }),
  })
  serializedResults.push(JSON.stringify(unsafeResult))
  if (unsafeResult.decision.status === 'failed') passed += 1
  else failed += 1

  const combined = serializedResults.join('\n')
  const unsafeMarkersAbsent = requiredUnsafeMarkers.every(
    (marker) => !combined.includes(marker),
  )
  if (!unsafeMarkersAbsent) failed += 1

  return {
    ok: failed === 0,
    summary: failed === 0 ? 'Worker Spine Adapter Smoke: PASS' : 'Worker Spine Adapter Smoke: FAIL',
    scenariosPassed: passed,
    scenariosFailed: failed,
    unsafeMarkersAbsent,
    surfacesVerified: ['adapter', 'record', 'safeResponse', 'telegramSummary', 'activityLogDecision'],
  }
}
