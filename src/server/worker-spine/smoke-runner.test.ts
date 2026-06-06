import { describe, expect, it } from 'vitest'
import { runWorkerSpineSmoke } from './smoke-runner'

describe('runWorkerSpineSmoke', () => {
  it('runs fake-only adapter scenarios and returns safe pass summary', async () => {
    const result = await runWorkerSpineSmoke()
    const serialized = JSON.stringify(result)

    expect(result.ok).toBe(true)
    expect(result.summary).toBe('Worker Spine Adapter Smoke: PASS')
    expect(result.scenariosPassed).toBeGreaterThanOrEqual(5)
    expect(result.scenariosFailed).toBe(0)
    expect(result.unsafeMarkersAbsent).toBe(true)
    expect(serialized).not.toContain('FAKE_TOKEN_SHOULD_NOT_RENDER')
    expect(serialized).not.toContain('FAKE_STACK_TRACE_SHOULD_NOT_RENDER')
    expect(serialized).not.toContain('FAKE_RAW_PROMPT_SHOULD_NOT_RENDER')
  })
})
