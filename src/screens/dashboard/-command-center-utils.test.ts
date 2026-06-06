import { describe, expect, it } from 'vitest'
import {
  getStartHereQueueState,
  isSafeDraftOnlyQueueItem,
  selectSafeDraftOnlyQueueItem,
} from './-command-center-utils'
import type { ExecutiveQueueItem } from '@/routes/api/-executive-queue-utils'

function queueItem(overrides: Partial<ExecutiveQueueItem>): ExecutiveQueueItem {
  return {
    schemaVersion: 1,
    id: overrides.id ?? 'item',
    title: overrides.title ?? 'Untitled item',
    outcome: overrides.outcome ?? 'Move work forward',
    status: overrides.status ?? 'Queued',
    priority: overrides.priority ?? 'P2',
    domain: overrides.domain ?? 'AI Ops',
    owner: overrides.owner ?? 'Executive',
    riskLevel: overrides.riskLevel ?? 'Medium',
    approvalLevel: overrides.approvalLevel ?? 'Ask Before System Change',
    confidence: overrides.confidence ?? 'High',
    source: overrides.source ?? {
      type: 'Voice Lab',
      id: 'source',
      timestamp: '2026-06-02T10:00:00.000Z',
      excerpt: 'source excerpt',
      fullReference: 'source ref',
    },
    context: overrides.context ?? 'Context',
    constraints: overrides.constraints ?? [],
    nextAction: overrides.nextAction ?? 'Next action',
    blockedReason: overrides.blockedReason ?? '',
    resultSummary: overrides.resultSummary ?? '',
    createdAt: overrides.createdAt ?? '2026-06-02T10:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-06-02T10:00:00.000Z',
    dueAt: overrides.dueAt ?? '',
    completedAt: overrides.completedAt ?? '',
    completedBy: overrides.completedBy ?? '',
    auditTrail: overrides.auditTrail ?? [],
    sync: overrides.sync ?? {
      notionPageId: '',
      lastSyncedAt: '',
      lastSyncStatus: 'not_synced',
    },
    localPath: overrides.localPath ?? '',
  }
}

describe('getStartHereQueueState', () => {
  it('elevates broken Gmail access as a critical exception before normal approval work', () => {
    const state = getStartHereQueueState([
      queueItem({
        id: 'approval-p1',
        title: 'Approve normal P1 system cleanup',
        status: 'Queued',
        priority: 'P1',
        domain: 'AI Ops',
        approvalLevel: 'Ask Before System Change',
        riskLevel: 'Medium',
      }),
      queueItem({
        id: 'gmail-broken',
        title: 'Broken Gmail access',
        outcome: 'Restore Superhuman/Gmail access so inbox scans and finance receipt searches are trustworthy',
        status: 'Blocked',
        priority: 'P0',
        domain: 'Email',
        owner: 'Email Assistant',
        riskLevel: 'High',
        approvalLevel: 'Ask Before System Change',
        nextAction: 'Verify Superhuman MCP auth status and prepare repair steps without requesting secrets in chat',
        blockedReason: 'Superhuman MCP search failed with auth/access error',
      }),
    ])

    expect(state.primaryMode).toBe('Repair')
    expect(state.primaryItem?.id).toBe('gmail-broken')
    expect(state.primaryCta).toBe('Open critical exception')
    expect(state.criticalExceptionItems.map((item) => item.id)).toEqual(['gmail-broken'])
  })

  it('does not treat ordinary blocked work as a critical system exception', () => {
    const state = getStartHereQueueState([
      queueItem({
        id: 'calendar-blocked',
        title: 'Waiting on Tim calendar decision',
        status: 'Blocked',
        priority: 'P1',
        domain: 'Calendar',
        blockedReason: 'Waiting on Tim to choose a time',
      }),
    ])

    expect(state.primaryMode).toBe('Unblock')
    expect(state.criticalExceptionItems).toEqual([])
  })

  it('starts with actionable approval work before higher-priority blocked or in-progress items', () => {
    const state = getStartHereQueueState([
      queueItem({
        id: 'blocked-p1',
        title: 'Blocked P1 should not be first',
        status: 'Blocked',
        priority: 'P1',
        blockedReason: 'Waiting on Tim calendar decision',
      }),
      queueItem({
        id: 'in-progress-p1',
        title: 'In progress P1 should not be first',
        status: 'In Progress',
        priority: 'P1',
      }),
      queueItem({
        id: 'actionable-p2',
        title: 'Actionable P2 approval',
        status: 'Queued',
        priority: 'P2',
        approvalLevel: 'Ask Before System Change',
      }),
    ])

    expect(state.primaryMode).toBe('Decide')
    expect(state.primaryItem?.id).toBe('actionable-p2')
    expect(state.primaryCta).toBe('Open approvals')
  })

  it('uses blitz-ready queued work before blocked work when no approval decision is ready', () => {
    const state = getStartHereQueueState([
      queueItem({
        id: 'blocked-p1',
        title: 'Blocked P1',
        status: 'Blocked',
        priority: 'P1',
        approvalLevel: 'Auto',
      }),
      queueItem({
        id: 'auto-queued-p2',
        title: 'Auto queued P2',
        status: 'Queued',
        priority: 'P2',
        approvalLevel: 'Auto',
        riskLevel: 'Low',
        context: 'Local draft-only prep.',
        constraints: ['No external side effects.'],
        nextAction: 'Draft local notes',
      }),
    ])

    expect(state.primaryMode).toBe('Blitz')
    expect(state.primaryItem?.id).toBe('auto-queued-p2')
    expect(state.primaryCta).toBe('Start safe draft')
  })

  it('selects only low-risk queued draft-only work and skips cancelled or parked items', () => {
    const safe = queueItem({
      id: 'safe-local-draft',
      title: 'Draft local AI Ops note',
      status: 'Queued',
      priority: 'P2',
      riskLevel: 'Low',
      approvalLevel: 'Auto',
      domain: 'AI Ops',
      context: 'Internal local prep only.',
      constraints: ['Draft only. No external side effects.'],
      nextAction: 'Draft the local note',
    })
    const parked = queueItem({
      id: 'parked-low-risk',
      title: 'Parked local draft',
      status: 'Parked' as ExecutiveQueueItem['status'],
      riskLevel: 'Low',
      approvalLevel: 'Auto',
    })
    const cancelled = queueItem({
      id: 'cancelled-low-risk',
      title: 'Cancelled local draft',
      status: 'Cancelled' as ExecutiveQueueItem['status'],
      riskLevel: 'Low',
      approvalLevel: 'Auto',
    })

    expect(isSafeDraftOnlyQueueItem(safe)).toBe(true)
    expect(isSafeDraftOnlyQueueItem(parked)).toBe(false)
    expect(isSafeDraftOnlyQueueItem(cancelled)).toBe(false)
    expect(selectSafeDraftOnlyQueueItem([parked, cancelled, safe])?.id).toBe(
      'safe-local-draft',
    )
  })

  it('keeps people, Motion, calendar, sends, money, and system changes out of safe draft selection', () => {
    const riskyItems = [
      queueItem({ id: 'people', title: 'Draft people decision memo', domain: 'Personal' }),
      queueItem({ id: 'motion', title: 'Clean up Motion tasks', domain: 'AI Ops' }),
      queueItem({ id: 'calendar', title: 'Draft calendar scheduling plan', domain: 'Calendar' }),
      queueItem({ id: 'send', title: 'Draft and send follow-up email', domain: 'Email' }),
      queueItem({ id: 'money', title: 'Draft reimbursement and money checklist', domain: 'Finance' }),
      queueItem({ id: 'system', title: 'Draft Workspace restart steps', domain: 'Code' }),
    ].map((item) => ({
      ...item,
      status: 'Queued' as const,
      priority: 'P2' as const,
      riskLevel: 'Low' as const,
      approvalLevel: 'Auto' as const,
      context: 'Looks local but touches a gated surface.',
      nextAction: item.title,
    }))

    expect(riskyItems.every((item) => !isSafeDraftOnlyQueueItem(item))).toBe(true)
    expect(selectSafeDraftOnlyQueueItem(riskyItems)).toBeNull()
  })
})
