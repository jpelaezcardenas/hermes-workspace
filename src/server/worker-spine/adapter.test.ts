import { describe, expect, it } from 'vitest'
import { runWorkerSpineAdapter } from './adapter'
import {
  blockedUnknownTask,
  missingCredentialNeedsTimLocalSetup,
  missingSourceExecutiveEscalation,
  needsTimExternalSend,
  routineDryRunNotLogged,
  safeCodingTask,
  unsafeOutputRejected,
} from './adapter-fixtures'
import { createFakeWorkerSpinePorts } from './ports'
import type { WorkerQueueInput } from './adapter'

function makeInput(overrides: Partial<WorkerQueueInput> = {}): WorkerQueueInput {
  return {
    queueItemId: 'fake-queue-1',
    title: 'Draft safe local plan',
    instruction: 'Create a safe implementation plan only.',
    requestedBy: 'executive',
    source: 'fixture',
    domain: 'coding',
    riskLevel: 'low',
    approvalReceiptId: null,
    dryRun: true,
    sourceRefs: [{ label: 'Fake source', uri: 'fixture://source', safeToShow: true }],
    nowIso: '2026-06-06T12:00:00.000Z',
    ...overrides,
  }
}

describe('runWorkerSpineAdapter', () => {
  it('rejects invalid queue input safely', async () => {
    const result = await runWorkerSpineAdapter({
      input: makeInput({ title: '', instruction: '' }),
      ports: createFakeWorkerSpinePorts(),
    })

    expect(result.decision.status).toBe('blocked')
    expect(result.safeResponse.safeSummary).toBe('Worker request is missing required safe input.')
    expect(JSON.stringify(result)).not.toContain('undefined')
  })

  it('completes a safe fake coding task without live side-effect ports', async () => {
    const ports = createFakeWorkerSpinePorts()
    const result = await runWorkerSpineAdapter({ input: safeCodingTask, ports })

    expect(result.decision.status).toBe('completed')
    expect(result.decision.ok).toBe(true)
    expect(result.record.id).toMatch(/^fake-exec-/)
    expect(result.safeResponse.safeSummary).toBe('Safe worker result completed.')
    expect(result.safeResponse.safeNextPrompt).toBe('Review worker result')
    expect(result.telegramSummary?.kind).toBe('completion')
    expect(result.activityLogDecision?.state).toBe('pending')
    expect(ports.dispatchCalls).toHaveLength(1)
    expect(result.safeResponse).not.toHaveProperty('rawOutput')
  })

  it('blocks unknown work before dispatch', async () => {
    const ports = createFakeWorkerSpinePorts()
    const result = await runWorkerSpineAdapter({ input: blockedUnknownTask, ports })

    expect(result.decision.status).toBe('blocked')
    expect(result.decision.safeSummary).toBe('Worker request blocked until Executive reviews routing.')
    expect(result.decision.requiresTimApproval).toBe(false)
    expect(ports.dispatchCalls).toHaveLength(0)
  })

  it('requires Tim approval for external send intent without dispatching', async () => {
    const ports = createFakeWorkerSpinePorts()
    const result = await runWorkerSpineAdapter({ input: needsTimExternalSend, ports })

    expect(result.decision.status).toBe('needs_tim')
    expect(result.decision.requiresTimApproval).toBe(true)
    expect(result.decision.approvalPrompt).toBe('Approval needed: external send. Risk: public outbound action. Reply: `Approve external send`')
    expect(ports.dispatchCalls).toHaveLength(0)
  })

  it('uses local credential setup language when credentials are missing', async () => {
    const result = await runWorkerSpineAdapter({
      input: missingCredentialNeedsTimLocalSetup,
      ports: createFakeWorkerSpinePorts(),
    })

    expect(result.decision.status).toBe('needs_tim')
    expect(result.safeResponse.safeSummary).toBe('Access needed before this worker can continue.')
    expect(result.decision.approvalPrompt).toBe('Access needed: connect the required source locally. Next prompt: `Set up source access`')
  })

  it('escalates missing source to Executive first', async () => {
    const result = await runWorkerSpineAdapter({
      input: missingSourceExecutiveEscalation,
      ports: createFakeWorkerSpinePorts(),
    })

    expect(result.decision.status).toBe('blocked')
    expect(result.safeResponse.safeSummary).toBe('Missing source. Executive should check available tools before asking Tim.')
    expect(result.decision.requiresTimApproval).toBe(false)
  })

  it('does not log routine dry-run checks', async () => {
    const result = await runWorkerSpineAdapter({
      input: routineDryRunNotLogged,
      ports: createFakeWorkerSpinePorts(),
    })

    expect(result.decision.status).toBe('completed')
    expect(result.activityLogDecision?.state).toBe('not_needed')
    expect(result.telegramSummary?.shouldDeliver).toBe(false)
  })

  it('fails closed when fake unsafe worker output is returned', async () => {
    const ports = createFakeWorkerSpinePorts({
      candidateOutput: {
        status: 'completed',
        summary: 'FAKE_TOKEN_SHOULD_NOT_RENDER FAKE_STACK_TRACE_SHOULD_NOT_RENDER',
        nextPrompt: 'Unsafe prompt',
        artifactRefs: [],
      },
    })
    const result = await runWorkerSpineAdapter({ input: unsafeOutputRejected, ports })
    const serialized = JSON.stringify(result)

    expect(result.decision.status).toBe('failed')
    expect(result.safeResponse.safeSummary).toBe('Worker output failed safety validation.')
    expect(serialized).not.toContain('FAKE_TOKEN_SHOULD_NOT_RENDER')
    expect(serialized).not.toContain('FAKE_STACK_TRACE_SHOULD_NOT_RENDER')
  })

  it('does not call optional delivery or log write ports in dry run', async () => {
    const telegramCalls: Array<unknown> = []
    const activityLogCalls: Array<unknown> = []
    const ports = createFakeWorkerSpinePorts()
    ports.deliverTelegram = (summary) => {
      telegramCalls.push(summary)
      return Promise.resolve({ ok: true })
    }
    ports.writeActivityLog = (draft) => {
      activityLogCalls.push(draft)
      return Promise.resolve({ ok: true, pageId: 'fake-notion-page-1' })
    }

    await runWorkerSpineAdapter({ input: safeCodingTask, ports })

    expect(telegramCalls).toHaveLength(0)
    expect(activityLogCalls).toHaveLength(0)
  })
})
