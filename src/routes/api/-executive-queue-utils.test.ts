import { mkdtemp, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import { describe, expect, it } from 'vitest'

import {
  applyQueueApproval,
  buildQueueExecutionPrompt,
  createQueueApprovalReceipt,
  createQueueExecutionRecord,
  createQueueItemFromVoiceLab,
  groupQueueItemsForBoard,
  listQueueItems,
  transitionQueueItem,
  updateQueueItemStatus,
  writeQueueItem,
} from './-executive-queue-utils'

describe('Executive Queue local store', () => {
  it('creates a real queue item from a Voice Lab delegation handoff', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-'))

    const item = await createQueueItemFromVoiceLab({
      root,
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-123',
      ledgerPath: '/tmp/voice-123.json',
      delegation: {
        outcome:
          'prepare my May 28 Travel Multiplier webinar so attendees believe travel hacking is real and buy the course',
        owner: 'TM COS',
        context:
          'Tim asked for webinar prep. Executive recommended TM COS. Needs approval before publishing or sending anything.',
        constraints: ['No side effects without explicit confirmation.'],
        nextAction: 'Draft the webinar outline and offer bridge',
        approvalRequired: true,
      },
      review: {
        summary: 'Latest Executive turn: Decision: delegate this to TM COS.',
        decisions: ['Decision: delegate this to TM COS.'],
        followUpActions: [
          'Next action: draft the webinar outline and offer bridge.',
        ],
        openQuestions: ['No open questions detected.'],
        needsApproval: [
          'Needs approval before publishing or sending anything.',
        ],
      },
    })

    expect(item.status).toBe('Queued')
    expect(item.priority).toBe('P1')
    expect(item.domain).toBe('Travel Multiplier')
    expect(item.owner).toBe('TM COS')
    expect(item.riskLevel).toBe('Medium')
    expect(item.approvalLevel).toBe('Ask Before External')
    expect(item.confidence).toBe('High')
    expect(item.source).toMatchObject({
      type: 'Voice Lab',
      id: 'voice-123',
      timestamp: '2026-05-22T21:00:00.000Z',
      fullReference: '/tmp/voice-123.json',
    })
    expect(item.source.excerpt).toContain(
      'prepare my May 28 Travel Multiplier webinar',
    )
    expect(item.nextAction).toBe('Draft the webinar outline and offer bridge')
    expect(item.auditTrail[0]).toMatchObject({
      action: 'created',
      actor: 'Voice Lab',
    })
    expect(
      item.auditTrail.some((event) => event.action === 'auto_queued'),
    ).toBe(true)

    const saved = await readFile(item.localPath, 'utf-8')
    expect(JSON.parse(saved)).toMatchObject({ id: item.id, status: 'Queued' })
  })

  it('blocks Done transitions without a result summary', () => {
    const item = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-456',
      ledgerPath: '/tmp/voice-456.json',
      delegation: {
        outcome: 'research safe travel hacking examples',
        owner: 'Research Agent',
        context: 'Internal research request.',
        constraints: [],
        nextAction: 'Find three public proof examples',
        approvalRequired: false,
      },
    })

    const transitioned = transitionQueueItem(item, {
      status: 'Done',
      actor: 'Tim',
      now: '2026-05-22T21:05:00.000Z',
    })

    expect(transitioned.status).toBe('Blocked')
    expect(transitioned.blockedReason).toBe('Done requires result summary.')
    expect(transitioned.completedAt).toBe('')
  })

  it('preserves result summary when moving to Done', () => {
    const item = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-789',
      ledgerPath: '/tmp/voice-789.json',
      delegation: {
        outcome: 'draft webinar outline',
        owner: 'TM COS',
        context: 'Internal prep request.',
        constraints: [],
        nextAction: 'Draft outline',
        approvalRequired: false,
      },
    })

    const transitioned = transitionQueueItem(item, {
      status: 'Done',
      resultSummary: 'Draft outline saved locally.',
      actor: 'TM COS',
      now: '2026-05-22T21:10:00.000Z',
    })

    expect(transitioned.status).toBe('Done')
    expect(transitioned.resultSummary).toBe('Draft outline saved locally.')
    expect(transitioned.completedAt).toBe('2026-05-22T21:10:00.000Z')
    expect(transitioned.completedBy).toBe('TM COS')
  })

  it('lists queue items from the local JSON store newest first and excludes archived by default', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-list-'))
    const first = createQueueItemFromVoiceLab.sync({
      root,
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-first',
      ledgerPath: '/tmp/voice-first.json',
      delegation: {
        outcome: 'draft internal command center outline',
        owner: 'Executive',
        context: 'Internal prep request.',
        constraints: [],
        nextAction: 'Draft outline',
        approvalRequired: false,
      },
    })
    const second = createQueueItemFromVoiceLab.sync({
      root,
      now: '2026-05-22T22:00:00.000Z',
      conversationId: 'voice-second',
      ledgerPath: '/tmp/voice-second.json',
      delegation: {
        outcome: 'draft internal command center review',
        owner: 'Executive',
        context: 'Internal prep request.',
        constraints: [],
        nextAction: 'Draft review',
        approvalRequired: false,
      },
    })
    const archived = {
      ...first,
      id: 'eq_20260522_archived',
      status: 'Archived' as const,
      updatedAt: '2026-05-22T23:00:00.000Z',
      localPath: join(root, 'items', '2026-05-22', 'eq_20260522_archived.json'),
    }

    await writeQueueItem(first, root)
    await writeQueueItem(second, root)
    await writeQueueItem(archived, root)

    const items = await listQueueItems({ root })

    expect(items.map((item) => item.id)).toEqual([second.id, first.id])
    expect(items.every((item) => item.status !== 'Archived')).toBe(true)
  })

  it('groups queue items into Executive Queue board columns', () => {
    const triage = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-triage',
      ledgerPath: '/tmp/voice-triage.json',
      delegation: {
        outcome: '',
        owner: 'Executive',
        context: 'Ambiguous request.',
        constraints: [],
        nextAction: '',
        approvalRequired: true,
      },
    })
    const queued = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:05:00.000Z',
      conversationId: 'voice-queued',
      ledgerPath: '/tmp/voice-queued.json',
      delegation: {
        outcome: 'prepare May 28 Travel Multiplier webinar',
        owner: 'TM COS',
        context: 'Internal prep.',
        constraints: [],
        nextAction: 'Draft outline',
        approvalRequired: false,
      },
    })
    const blocked = transitionQueueItem(queued, {
      status: 'Blocked',
      actor: 'Executive',
      now: '2026-05-22T21:10:00.000Z',
      blockedReason: 'Waiting on Tim approval.',
    })

    const grouped = groupQueueItemsForBoard([queued, blocked, triage])

    expect(grouped.Triage).toHaveLength(1)
    expect(grouped.Queued).toHaveLength(1)
    expect(grouped.Blocked).toHaveLength(1)
    expect(grouped.Done).toHaveLength(0)
  })

  it('persists status transitions to the local JSON record', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-transition-'))
    const item = await createQueueItemFromVoiceLab({
      root,
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-transition',
      ledgerPath: '/tmp/voice-transition.json',
      delegation: {
        outcome: 'prepare May 28 Travel Multiplier webinar',
        owner: 'TM COS',
        context: 'Internal prep.',
        constraints: [],
        nextAction: 'Draft outline',
        approvalRequired: false,
      },
    })

    const updated = await updateQueueItemStatus({
      root,
      id: item.id,
      status: 'In Progress',
      actor: 'Executive',
      now: '2026-05-22T21:15:00.000Z',
    })

    expect(updated.status).toBe('In Progress')
    expect(updated.auditTrail.at(-1)).toMatchObject({
      action: 'status_changed',
      actor: 'Executive',
      from: 'Queued',
      to: 'In Progress',
    })
    const saved = JSON.parse(await readFile(updated.localPath, 'utf-8')) as {
      status: string
    }
    expect(saved.status).toBe('In Progress')
  })

  it('approves a single queue action and moves it into progress with audit trail', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-approval-'))
    const item = await createQueueItemFromVoiceLab({
      root,
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-approval',
      ledgerPath: '/tmp/voice-approval.json',
      delegation: {
        outcome: 'prepare May 28 Travel Multiplier webinar',
        owner: 'TM COS',
        context: 'Needs approval before publishing or sending anything.',
        constraints: [],
        nextAction: 'Draft outline',
        approvalRequired: true,
      },
    })

    const approved = await applyQueueApproval({
      root,
      id: item.id,
      decision: 'approve_action',
      actor: 'Tim',
      now: '2026-05-22T21:20:00.000Z',
      note: 'Approve this action only.',
    })

    expect(approved.status).toBe('In Progress')
    expect(approved.auditTrail.at(-1)).toMatchObject({
      action: 'approval_granted',
      actor: 'Tim',
      from: 'Queued',
      to: 'In Progress',
      note: 'Approve this action only.',
    })
  })

  it('builds a single-action execution prompt from a queue item', () => {
    const item = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-execute-prompt',
      ledgerPath: '/tmp/voice-execute-prompt.json',
      delegation: {
        outcome: 'draft internal Command Center execution notes',
        owner: 'Executive',
        context: 'Tim approved local preparation only.',
        constraints: ['Do not send messages.', 'Do not spend money.'],
        nextAction: 'Draft the implementation note',
        approvalRequired: true,
      },
    })

    const prompt = buildQueueExecutionPrompt(item, {
      mode: 'draft_only',
      actor: 'Tim',
      note: 'Keep this local.',
    })

    expect(prompt).toContain('Execution mode: draft_only')
    expect(prompt).toContain(
      'Queue item: draft internal Command Center execution notes',
    )
    expect(prompt).toContain('Next action: Draft the implementation note')
    expect(prompt).toContain('Approval scope: single queue item only')
    expect(prompt).toContain('Do not send messages.')
    expect(prompt).toContain('Keep this local.')
    expect(prompt).toContain('Worker safety filter: raw Codex')
    expect(prompt).toContain(
      'The Workspace API sends this as plain Telegram status/completion text.',
    )
    expect(prompt).not.toContain('wrap this final report in an HTML artifact')
  })

  it('builds a Telegram explanation prompt without approving or executing the item', () => {
    const item = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-explain-prompt',
      ledgerPath: '/tmp/voice-explain-prompt.json',
      delegation: {
        outcome: 'approve operating knowledge base extraction batch',
        owner: 'Executive',
        context: 'Tim is not sure what the approval means.',
        constraints: ['No execution before approval.'],
        nextAction:
          'Explain what the extraction batch means and what approval would allow',
        approvalRequired: true,
      },
    })

    const prompt = buildQueueExecutionPrompt(item, {
      mode: 'explain_more',
      actor: 'Tim',
      note: 'Explain before approval.',
    })

    expect(prompt).toContain('Execution mode: explain_more')
    expect(prompt).toContain(
      'Do not approve, execute, mutate, or mark this queue item in progress.',
    )
    expect(prompt).toContain('Write a concise Telegram reply to Tim')
    expect(prompt).toContain(
      'Queue item: approve operating knowledge base extraction batch',
    )
    expect(prompt).toContain('Explain before approval.')
  })

  it('persists an execution dispatch record with audit metadata', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-execution-'))
    const item = await createQueueItemFromVoiceLab({
      root,
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-execute-record',
      ledgerPath: '/tmp/voice-execute-record.json',
      delegation: {
        outcome: 'draft local Command Center execution notes',
        owner: 'Executive',
        context: 'Local prep request.',
        constraints: ['No external side effects.'],
        nextAction: 'Draft the notes',
        approvalRequired: true,
      },
    })

    const record = await createQueueExecutionRecord({
      root,
      item,
      mode: 'approve_and_run',
      actor: 'Tim',
      now: '2026-05-22T21:25:00.000Z',
      note: 'Run this now.',
      sessionKey: 'executive-command-center',
    })

    expect(record).toMatchObject({
      itemId: item.id,
      mode: 'approve_and_run',
      actor: 'Tim',
      note: 'Run this now.',
      sessionKey: 'executive-command-center',
      status: 'dispatched',
    })
    expect(record.prompt).toContain(item.title)
    expect(record.localPath).toContain('executions')
    const saved = JSON.parse(await readFile(record.localPath, 'utf-8')) as {
      itemId: string
      mode: string
    }
    expect(saved).toMatchObject({ itemId: item.id, mode: 'approve_and_run' })
  })

  it('persists an approval receipt before approval-triggered execution', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-receipt-'))
    const item = await createQueueItemFromVoiceLab({
      root,
      now: '2026-06-02T23:40:00.000Z',
      conversationId: 'voice-receipt',
      ledgerPath: '/tmp/voice-receipt.json',
      delegation: {
        outcome: 'run a safe AI Ops follow-through check',
        owner: 'Executive',
        context: 'Approval came from Workspace Command Center.',
        constraints: ['No external side effects.'],
        nextAction: 'Run the bounded check',
        approvalRequired: true,
      },
    })

    const receipt = await createQueueApprovalReceipt({
      root,
      item,
      mode: 'approve_and_run',
      actor: 'Tim',
      now: '2026-06-02T23:45:00.000Z',
      note: 'Approve and run',
      sessionKey: 'executive-command-center',
      sourceReference: {
        sessionId: 'telegram-session-1',
        messageId: 'message-123',
      },
    })

    expect(receipt).toMatchObject({
      itemId: item.id,
      itemTitle: item.title,
      mode: 'approve_and_run',
      actor: 'Tim',
      approvedPhrase: 'Approve and run',
      sourceChannel: 'Workspace',
      status: 'captured',
    })
    expect(receipt.normalizedScope).toContain('one Executive Queue item only')
    expect(receipt.forbiddenSideEffects.join('\n')).toContain(
      'No broad interpretation',
    )
    expect(receipt.localPath).toContain('approval-receipts')
    const saved = JSON.parse(await readFile(receipt.localPath, 'utf-8')) as {
      id: string
      itemId: string
    }
    expect(saved).toMatchObject({ id: receipt.id, itemId: item.id })
  })

  it('links execution records and prompts to approval receipts', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-receipt-link-'))
    const item = await createQueueItemFromVoiceLab({
      root,
      now: '2026-06-02T23:40:00.000Z',
      conversationId: 'voice-receipt-link',
      ledgerPath: '/tmp/voice-receipt-link.json',
      delegation: {
        outcome: 'draft safe approval receipt notes',
        owner: 'Executive',
        context: 'Local prep request.',
        constraints: ['No external side effects.'],
        nextAction: 'Draft local notes',
        approvalRequired: true,
      },
    })
    const receipt = await createQueueApprovalReceipt({
      root,
      item,
      mode: 'draft_only',
      actor: 'Tim',
      now: '2026-06-02T23:45:00.000Z',
      sessionKey: 'executive-command-center',
    })

    const record = await createQueueExecutionRecord({
      root,
      item,
      mode: 'draft_only',
      actor: 'Tim',
      now: '2026-06-02T23:46:00.000Z',
      sessionKey: 'executive-command-center',
      approvalReceipt: receipt,
    })

    expect(record.approvalReceiptId).toBe(receipt.id)
    expect(record.approvalReceiptPath).toBe(receipt.localPath)
    expect(record.prompt).toContain(`Approval receipt: ${receipt.localPath}`)
  })
})
