import { describe, expect, it } from 'vitest'
import {
  buildOperationPlan,
  createAuditRecord,
  summarizeOperationResult,
  validateOperationRequest,
} from './fleet-operations'

describe('fleet operations', () => {
  it('builds a safe local cron run plan without exposing secrets', () => {
    const plan = buildOperationPlan({
      operation: 'cron.run_now',
      nodeId: 'pierre-local',
      nodeKind: 'hermes-local',
      targetId: '8c886b3fed87',
    })

    expect(plan).toMatchObject({
      operation: 'cron.run_now',
      scope: 'local',
      commandClass: 'hermes cron run',
      sideEffect: expect.stringContaining('Triggers'),
    })
    expect(plan.displayCommand).toBe('hermes cron run 8c886b3fed87')
    expect(JSON.stringify(plan)).not.toMatch(/API_KEY|TOKEN|PASSWORD|SECRET/i)
  })

  it('builds a safe remote container cron run plan through docker exec', () => {
    const plan = buildOperationPlan({
      operation: 'cron.run_now',
      nodeId: 'maya-round6',
      nodeKind: 'hermes-container',
      targetId: '7a9ab6b1356a',
      container: 'round6-hermes',
      parentId: 'morgan-vps',
    })

    expect(plan).toMatchObject({
      operation: 'cron.run_now',
      scope: 'remote-container',
      commandClass: 'docker exec hermes cron run',
      requiresConfirmation: true,
    })
    expect(plan.displayCommand).toContain('docker exec round6-hermes')
    expect(plan.displayCommand).toContain('7a9ab6b1356a')
  })

  it('rejects unsafe operation request parameters', () => {
    expect(validateOperationRequest({ operation: 'cron.run_now', nodeId: 'maya-round6', jobId: 'abc_123-DEF' }).ok).toBe(true)
    expect(validateOperationRequest({ operation: 'cron.run_now', nodeId: '../maya', jobId: 'abc' }).ok).toBe(false)
    expect(validateOperationRequest({ operation: 'cron.remove', nodeId: 'maya-round6', jobId: 'abc' }).ok).toBe(false)
    expect(validateOperationRequest({ operation: 'cron.run_now', nodeId: 'maya-round6', jobId: 'abc; rm -rf /' }).ok).toBe(false)
  })

  it('creates audit records with redacted result summaries', () => {
    const record = createAuditRecord({
      operation: 'cron.run_now',
      nodeId: 'pierre-local',
      targetId: '8c886b3fed87',
      actor: 'workspace',
      status: 'completed',
      commandClass: 'hermes cron run',
      resultSummary: 'ok TOKEN=*** password=hunter2',
    })

    expect(record.id).toMatch(/^op_/)
    expect(record.resultSummary).toContain('[REDACTED]')
    expect(record.resultSummary).not.toContain('hunter2')
    expect(record.resultSummary).not.toContain('should-not-leak')
  })

  it('summarizes command output compactly and redacts secrets', () => {
    const summary = summarizeOperationResult('Line 1\nLine 2\nAPI_KEY=xyz', 'Done\nsecret=abc123')
    expect(summary).toContain('Done')
    expect(summary).not.toContain('abc123')
    expect(summary).not.toContain('xyz')
    expect(summary).toContain('API_KEY=[REDACTED]')
    expect(summary).toContain('secret=[REDACTED]')
  })
})
