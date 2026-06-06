import { describe, expect, it } from 'vitest'
import { buildWorkerQueueInputFromPr600Request, toPr600SafeResponse } from './pr600-seam'
import { runWorkerSpineAdapter } from './adapter'
import { createFakeWorkerSpinePorts } from './ports'

describe('PR 600 seam helpers', () => {
  it('maps a queue execution request into normalized worker input', () => {
    const input = buildWorkerQueueInputFromPr600Request({
      queueItemId: 'fake-queue-pr600',
      taskTitle: 'Draft adapter plan',
      taskInstruction: 'Build only local files.',
      requestedBy: 'workspace',
      approvalReceiptId: null,
      dryRun: true,
    }, '2026-06-06T12:00:00.000Z')

    expect(input).toMatchObject({
      queueItemId: 'fake-queue-pr600',
      title: 'Draft adapter plan',
      requestedBy: 'workspace',
      source: 'executive_queue',
      dryRun: true,
    })
  })

  it('converts adapter output into route-safe response without raw internals', async () => {
    const input = buildWorkerQueueInputFromPr600Request({
      queueItemId: 'fake-queue-pr600',
      taskTitle: 'Draft adapter plan',
      taskInstruction: 'Build only local files.',
      requestedBy: 'workspace',
      approvalReceiptId: null,
      dryRun: true,
    }, '2026-06-06T12:00:00.000Z')
    const result = await runWorkerSpineAdapter({ input, ports: createFakeWorkerSpinePorts() })
    const safeResponse = toPr600SafeResponse(result)

    expect(safeResponse.status).toBe('completed')
    expect(safeResponse.safeSummary).toBe('Safe worker result completed.')
    expect(JSON.stringify(safeResponse)).not.toContain('taskInstruction')
    expect(JSON.stringify(safeResponse)).not.toContain('raw')
  })
})
