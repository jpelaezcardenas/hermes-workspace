import { describe, expect, it } from 'vitest'

import {
  evaluateQueueExecutionSafety,
  evaluateWorkerSurfaceItem,
  sanitizeSourceCoverageSnapshot,
} from './-worker-safety-filter'
import type { ExecutiveQueueItem } from './-executive-queue-utils'

function queueItem(
  overrides: Partial<ExecutiveQueueItem> = {},
): ExecutiveQueueItem {
  return {
    schemaVersion: 1,
    id: 'eq_safe_low_risk',
    title: 'Draft local Codex safety notes',
    outcome: 'Local notes are drafted.',
    status: 'Queued',
    priority: 'P1',
    domain: 'AI Ops',
    owner: 'Executive',
    riskLevel: 'Low',
    approvalLevel: 'Auto',
    confidence: 'High',
    source: {
      type: 'Voice Lab',
      id: 'voice-safe',
      timestamp: '2026-06-06T13:00:00.000Z',
      excerpt: 'Draft local safety notes.',
      fullReference: '/tmp/voice-safe.json',
    },
    context: 'Local-only prep.',
    constraints: ['No external side effects.'],
    nextAction: 'Draft local notes',
    blockedReason: '',
    resultSummary: '',
    createdAt: '2026-06-06T13:00:00.000Z',
    updatedAt: '2026-06-06T13:00:00.000Z',
    dueAt: '',
    completedAt: '',
    completedBy: '',
    auditTrail: [],
    sync: {
      notionPageId: '',
      lastSyncedAt: '',
      lastSyncStatus: 'not_synced',
    },
    localPath: '/tmp/eq_safe_low_risk.json',
    ...overrides,
  }
}

describe('worker safety filter contracts', () => {
  it('allows verified local source coverage summaries without raw bodies', () => {
    const decision = evaluateWorkerSurfaceItem({
      surface: 'source_coverage',
      action: 'local_report',
      source: { type: 'local_artifact', id: 'snapshot.json', status: 'verified' },
      title: 'Source coverage ready',
    })

    expect(decision.verdict).toBe('allow')
    expect(decision.timFacing).toBe(true)
  })

  it('suppresses teammate-owned Motion work before it reaches Tim-facing cards', () => {
    const decision = evaluateWorkerSurfaceItem({
      surface: 'motion',
      action: 'queue_proposal',
      owner: 'Morris',
      ownership: 'teammate',
      source: { type: 'motion_snapshot', id: 'motion-1', status: 'verified' },
      title: 'Follow up teammate task',
    })

    expect(decision.verdict).toBe('suppress')
    expect(decision.timFacing).toBe(false)
    expect(decision.reasons).toContain('motion_ownership_not_tim_clear')
  })

  it('suppresses partial Reader transcript items instead of marking them ready', () => {
    const decision = evaluateWorkerSurfaceItem({
      surface: 'reader_transcript',
      action: 'queue_proposal',
      fullTranscriptVerified: false,
      source: { type: 'reader', id: 'reader-1', status: 'partial' },
      title: 'AI podcast summary',
    })

    expect(decision.verdict).toBe('suppress')
    expect(decision.reasons).toContain('full_transcript_not_verified')
  })

  it('gates X or bookmark recommendations that become monetization actions', () => {
    const decision = evaluateWorkerSurfaceItem({
      surface: 'x_research',
      action: 'queue_proposal',
      recommendationType: 'package',
      source: { type: 'x_bookmark', id: 'bookmark-1', status: 'verified' },
      title: 'Package this as a Travel Multiplier offer',
    })

    expect(decision.verdict).toBe('gate')
    expect(decision.reasons).toContain(
      'external_or_monetization_recommendation_needs_approval',
    )
  })

  it('blocks raw worker output and credential-looking text from Tim-facing surfaces', () => {
    const rawDecision = evaluateWorkerSurfaceItem({
      surface: 'telegram_summary',
      action: 'summarize',
      rawWorkerOutput: true,
      source: { type: 'codex_output', id: 'worker-1', status: 'verified' },
      title: 'Raw Codex dump',
    })
    const secretDecision = evaluateWorkerSurfaceItem({
      surface: 'telegram_summary',
      action: 'summarize',
      body: 'worker printed api_key: placeholder',
      source: { type: 'codex_output', id: 'worker-2', status: 'verified' },
      title: 'Unsafe worker log',
    })

    expect(rawDecision.verdict).toBe('suppress')
    expect(secretDecision.verdict).toBe('deny')
  })

  it('allows draft-only execution for a sourced local queue item', () => {
    const decision = evaluateQueueExecutionSafety({
      item: queueItem(),
      mode: 'draft_only',
      approvedPhrase: 'Draft local notes only',
    })

    expect(decision.verdict).toBe('allow')
    expect(decision.timFacing).toBe(true)
  })

  it('gates draft-only queue execution unless the item is low-risk Auto local prep', () => {
    const medium = evaluateQueueExecutionSafety({
      item: queueItem({
        id: 'eq_medium_draft',
        riskLevel: 'Medium',
        approvalLevel: 'Auto',
      }),
      mode: 'draft_only',
      approvedPhrase: 'Draft only',
    })
    const manual = evaluateQueueExecutionSafety({
      item: queueItem({
        id: 'eq_manual_draft',
        riskLevel: 'Low',
        approvalLevel: 'Manual Only',
      }),
      mode: 'draft_only',
      approvedPhrase: 'Draft only',
    })

    expect(medium.verdict).toBe('gate')
    expect(medium.reasons).toContain('draft_only_requires_low_risk_auto_item')
    expect(manual.verdict).toBe('gate')
    expect(manual.reasons).toContain('draft_only_requires_low_risk_auto_item')
  })

  it('gates draft-only execution for people, Motion, calendar, sends, money, and system changes', () => {
    const gated = [
      queueItem({ id: 'people', title: 'Draft people decision memo' }),
      queueItem({ id: 'motion', title: 'Draft Motion task cleanup' }),
      queueItem({ id: 'calendar', title: 'Draft calendar invite', domain: 'Calendar' }),
      queueItem({ id: 'send', title: 'Draft and send email', domain: 'Email' }),
      queueItem({ id: 'money', title: 'Draft money reimbursement', domain: 'Finance' }),
      queueItem({ id: 'system', title: 'Draft system restart plan', domain: 'Code' }),
    ].map((item) =>
      evaluateQueueExecutionSafety({
        item,
        mode: 'draft_only',
        approvedPhrase: 'Draft only',
      }),
    )

    expect(gated.every((decision) => decision.verdict === 'gate')).toBe(true)
    expect(gated.flatMap((decision) => decision.reasons)).toContain(
      'draft_only_touches_approval_gated_surface',
    )
  })

  it('blocks generic approve-and-run for high-risk or external queue work', () => {
    const decision = evaluateQueueExecutionSafety({
      item: queueItem({
        id: 'eq_high_risk_email',
        title: 'Send donor follow-up email',
        domain: 'Email',
        riskLevel: 'High',
        approvalLevel: 'Ask Before External',
        context: 'External email send.',
        nextAction: 'Send the email',
      }),
      mode: 'approve_and_run',
      approvedPhrase: 'Approve',
    })

    expect(decision.verdict).toBe('gate')
    expect(decision.reasons).toContain('generic_approve_cannot_authorize_execution')
    expect(decision.reasons).toContain('high_risk_queue_item_requires_manual_gate')
  })

  it('requires an exact item-scoped phrase for medium-risk approve-and-run', () => {
    const item = queueItem({
      id: 'eq_medium_workspace',
      title: 'Run workspace worker check',
      riskLevel: 'Medium',
      approvalLevel: 'Ask Before System Change',
      context: 'Could touch Workspace execution routes.',
      nextAction: 'Run the bounded route check',
    })

    const generic = evaluateQueueExecutionSafety({
      item,
      mode: 'approve_and_run',
      approvedPhrase: 'Approve and Run',
    })
    const scoped = evaluateQueueExecutionSafety({
      item,
      mode: 'approve_and_run',
      approvedPhrase: 'RUN-eq_medium_workspace',
    })

    expect(generic.verdict).toBe('gate')
    expect(scoped.verdict).toBe('allow')
  })

  it('redacts source coverage snapshots to safe summary fields only', () => {
    const sanitized = sanitizeSourceCoverageSnapshot({
      generated_at: '2026-06-06T00:00:00Z',
      sources: {
        motion: {
          available: true,
          tim_owned_count: 3,
          raw_task_titles: ['private raw task title'],
        },
        reader: {
          acceptable_full_transcripts: 4,
          token: 'do-not-return',
          failure_reason_counts: { partial: 1 },
        },
      },
      raw_private_body: 'do-not-return',
    })

    expect(JSON.stringify(sanitized)).not.toContain('private raw task title')
    expect(JSON.stringify(sanitized)).not.toContain('do-not-return')
    expect(sanitized).toMatchObject({
      generated_at: '2026-06-06T00:00:00Z',
      sources: {
        motion: { available: true, tim_owned_count: 3 },
        reader: {
          acceptable_full_transcripts: 4,
          failure_reason_counts: { partial: 1 },
        },
      },
    })
  })
})
