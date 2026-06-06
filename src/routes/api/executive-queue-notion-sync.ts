import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { applyApprovedNotionSync, createNotionSyncProposal } from './-executive-queue-notion-sync-utils'
import type { NotionSyncApproval } from './-executive-queue-notion-sync-utils'

function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function readNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : -1
}

function readApproval(value: unknown): NotionSyncApproval {
  const approval = value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
  return {
    proposalId: readString(approval.proposalId),
    proposalPath: readString(approval.proposalPath),
    approvedBy: readString(approval.approvedBy),
    approvalText: readString(approval.approvalText),
    expectedCreates: readNumber(approval.expectedCreates),
    expectedUpdates: readNumber(approval.expectedUpdates),
  }
}

export const Route = createFileRoute('/api/executive-queue-notion-sync')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const mode = readString(payload.mode, 'proposal_only')
          if (mode === 'proposal_only') {
            const proposal = await createNotionSyncProposal({
              now: new Date().toISOString(),
              actor: readString(payload.actor, 'Executive Queue'),
              mode: 'proposal_only',
            })
            return json({ ok: true, proposal })
          }

          if (mode === 'apply_approved') {
            const result = await applyApprovedNotionSync({
              now: new Date().toISOString(),
              actor: readString(payload.actor, 'Executive Queue'),
              approval: readApproval(payload.approval),
            })
            return json({ ok: true, result })
          }

          return json(
            {
              ok: false,
              error: 'Unsupported Notion sync mode. Use proposal_only or apply_approved.',
            },
            { status: 400 },
          )
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : 'Failed to run Notion sync request',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
