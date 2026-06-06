import { mkdtemp, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import { describe, expect, it } from 'vitest'

import { createQueueItemFromVoiceLab, readQueueItemById, transitionQueueItem, writeQueueItem } from './-executive-queue-utils'
import {
  applyApprovedNotionSync,
  buildNotionSyncProposal,
  createNotionSyncProposal,
  filterNotionSyncEligibleItems,
} from './-executive-queue-notion-sync-utils'

describe('Executive Queue Notion proposal sync', () => {
  it('excludes raw Triage and Archived items from Notion proposal sync', () => {
    const triage = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:00:00.000Z',
      conversationId: 'voice-triage',
      ledgerPath: '/tmp/voice-triage.json',
      delegation: {
        outcome: '',
        owner: 'Executive',
        context: 'Ambiguous raw capture.',
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
    const archived = { ...queued, id: 'archived-item', status: 'Archived' as const }

    const eligible = filterNotionSyncEligibleItems([triage, queued, archived])

    expect(eligible.map((item) => item.id)).toEqual([queued.id])
  })

  it('builds proposal-only Notion rows without mutating queue item sync state', () => {
    const item = createQueueItemFromVoiceLab.sync({
      now: '2026-05-22T21:05:00.000Z',
      conversationId: 'voice-queued',
      ledgerPath: '/tmp/voice-queued.json',
      delegation: {
        outcome: 'prepare May 28 Travel Multiplier webinar',
        owner: 'TM COS',
        context: 'Internal prep only. Public copy requires Tim approval.',
        constraints: ['No publishing without Tim approval.'],
        nextAction: 'Draft outline',
        approvalRequired: false,
      },
    })
    const inProgress = transitionQueueItem(item, {
      status: 'In Progress',
      actor: 'Executive',
      now: '2026-05-22T21:10:00.000Z',
    })

    const proposal = buildNotionSyncProposal({
      items: [inProgress],
      now: '2026-05-22T21:15:00.000Z',
      actor: 'Executive',
      mode: 'proposal_only',
    })

    expect(proposal.mode).toBe('proposal_only')
    expect(proposal.wouldCreate).toHaveLength(1)
    expect(proposal.wouldUpdate).toHaveLength(0)
    expect(proposal.wouldSkip).toHaveLength(0)
    expect(proposal.wouldDelete).toHaveLength(0)
    expect(proposal.warnings).toContain('Proposal only: no Notion pages were created, updated, archived, or deleted.')
    expect(proposal.wouldCreate[0]?.queueItemId).toBe(inProgress.id)
    expect(proposal.wouldCreate[0]?.notionProperties.Name.title[0]?.text.content).toBe(inProgress.title)
    expect(proposal.wouldCreate[0]?.notionProperties.Status.select.name).toBe('In Progress')
    expect(proposal.wouldCreate[0]?.notionProperties.Risk.select.name).toBe('Medium')
    expect(proposal.wouldCreate[0]?.notionProperties.Approval.select.name).toBe('Auto')
    expect(inProgress.sync.lastSyncStatus).toBe('not_synced')
  })

  it('persists proposal snapshots locally for review', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-notion-sync-'))
    const item = await createQueueItemFromVoiceLab({
      root,
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
    await writeQueueItem({ ...item, status: 'Queued' }, root)

    const proposal = await createNotionSyncProposal({
      root,
      now: '2026-05-22T21:20:00.000Z',
      actor: 'Executive',
      mode: 'proposal_only',
    })

    expect(proposal.persistedPath).toContain('notion-sync-proposals')
    const saved = JSON.parse(await readFile(proposal.persistedPath, 'utf-8')) as { id: string; wouldCreate: Array<unknown> }
    expect(saved.id).toBe(proposal.id)
    expect(saved.wouldCreate).toHaveLength(1)
  })

  it('rejects live Notion sync without exact approval text', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-notion-sync-gate-'))
    const item = await createQueueItemFromVoiceLab({
      root,
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
    await writeQueueItem({ ...item, status: 'Queued' }, root)
    const proposal = await createNotionSyncProposal({
      root,
      now: '2026-05-22T21:20:00.000Z',
      actor: 'Executive',
      mode: 'proposal_only',
    })

    await expect(
      applyApprovedNotionSync({
        root,
        now: '2026-05-22T21:25:00.000Z',
        actor: 'Executive',
        databaseId: 'database-id',
        approval: {
          proposalId: proposal.id,
          proposalPath: proposal.persistedPath,
          approvedBy: 'Tim',
          approvalText: 'yes',
          expectedCreates: proposal.wouldCreate.length,
          expectedUpdates: proposal.wouldUpdate.length,
        },
        notionClient: (async () => Promise.resolve({ id: 'should-not-run' })),
      }),
    ).rejects.toThrow('APPROVE NOTION SYNC')
  })

  it('applies approved create operations and records sync state without deletes', async () => {
    const root = await mkdtemp(join(tmpdir(), 'executive-queue-notion-sync-apply-'))
    const item = await createQueueItemFromVoiceLab({
      root,
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
    await writeQueueItem({ ...item, status: 'Queued' }, root)
    const proposal = await createNotionSyncProposal({
      root,
      now: '2026-05-22T21:20:00.000Z',
      actor: 'Executive',
      mode: 'proposal_only',
    })
    const calls: Array<{ path: string; method: string; body: Record<string, unknown> }> = []

    const result = await applyApprovedNotionSync({
      root,
      now: '2026-05-22T21:25:00.000Z',
      actor: 'Executive',
      databaseId: 'database-id',
      approval: {
        proposalId: proposal.id,
        proposalPath: proposal.persistedPath,
        approvedBy: 'Tim',
        approvalText: 'APPROVE NOTION SYNC',
        expectedCreates: proposal.wouldCreate.length,
        expectedUpdates: proposal.wouldUpdate.length,
      },
      notionClient: (async (call) => Promise.resolve((() => {
        calls.push(call)
        return { id: 'notion-page-1' }
      })())),
    })

    expect(calls).toHaveLength(1)
    expect(calls[0]?.path).toBe('/pages')
    expect(calls[0]?.method).toBe('POST')
    expect(calls[0]?.body.parent).toEqual({ database_id: 'database-id' })
    expect(result.created).toEqual([{ operation: 'create', queueItemId: item.id, notionPageId: 'notion-page-1', title: item.title }])
    expect(result.deleted).toEqual([])
    expect(result.persistedPath).toContain('notion-sync-results')

    const updated = await readQueueItemById(item.id, root)
    expect(updated?.sync.notionPageId).toBe('notion-page-1')
    expect(updated?.sync.lastSyncStatus).toBe('synced')
    expect(updated?.auditTrail.some((entry) => entry.action === 'notion_synced')).toBe(true)
  })
})
