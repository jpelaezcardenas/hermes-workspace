import { describe, expect, it } from 'vitest'
import { createFakeWorkerSpinePorts } from './ports'

describe('createFakeWorkerSpinePorts', () => {
  it('persists records without mutation', async () => {
    const ports = createFakeWorkerSpinePorts()
    const record = { id: 'fake-exec-1', status: 'completed' as const }

    await expect(ports.persistRecord(record)).resolves.toBe(record)
  })

  it('returns deterministic fake worker output', async () => {
    const ports = createFakeWorkerSpinePorts()

    await expect(ports.dispatchWorker({ id: 'fake-context-1' })).resolves.toMatchObject({
      status: 'completed',
      summary: 'Safe worker result completed.',
      nextPrompt: 'Review worker result',
    })
  })

  it('does not install live side-effect ports by default', () => {
    const ports = createFakeWorkerSpinePorts()

    expect(ports.deliverTelegram).toBeUndefined()
    expect(ports.writeActivityLog).toBeUndefined()
  })
})
