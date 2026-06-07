import { describe, expect, it } from 'vitest'
import {
  formatWorkerExecutionLabel,
  getWorkerExecutionTone,
  shouldShowWorkerExecution,
} from './worker-status'
import type { WorkerExecutionSummary } from '@/lib/tasks-api'

const base: WorkerExecutionSummary = {
  status: 'completed',
  safe_summary: 'Safe worker result completed.',
  safe_next_prompt: 'Review worker result',
  requires_tim_approval: false,
  approval_prompt: null,
  execution_record_id: 'fake-exec-1',
  updated_at: '2026-06-06T12:30:00.000Z',
  dry_run: true,
}

describe('worker-status helpers', () => {
  it('formats lifecycle states for task cards', () => {
    expect(formatWorkerExecutionLabel(base)).toBe('Worker: completed')
    expect(formatWorkerExecutionLabel({ ...base, status: 'blocked' })).toBe('Worker: blocked')
    expect(formatWorkerExecutionLabel({ ...base, status: 'needs_tim' })).toBe('Worker: needs Tim')
    expect(formatWorkerExecutionLabel({ ...base, status: 'failed' })).toBe('Worker: failed')
  })

  it('assigns distinct tones for lifecycle states', () => {
    expect(getWorkerExecutionTone(base.status)).toBe('success')
    expect(getWorkerExecutionTone('blocked')).toBe('danger')
    expect(getWorkerExecutionTone('needs_tim')).toBe('warning')
    expect(getWorkerExecutionTone('failed')).toBe('danger')
  })

  it('only shows worker execution when safe metadata exists', () => {
    expect(shouldShowWorkerExecution(base)).toBe(true)
    expect(shouldShowWorkerExecution(null)).toBe(false)
  })
})
