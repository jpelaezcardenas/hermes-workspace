import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import {
  applyQueueApproval,
  groupQueueItemsForBoard,
  listQueueItems,
  updateQueueItemStatus,
} from './-executive-queue-utils'
import type { QueueApprovalDecision, QueueDomain, QueueOwner, QueueStatus } from './-executive-queue-utils'

function readQueueStatus(value: string | null): QueueStatus | undefined {
  if (
    value === 'Triage' ||
    value === 'Proposed' ||
    value === 'Queued' ||
    value === 'In Progress' ||
    value === 'Blocked' ||
    value === 'Done' ||
    value === 'Archived'
  ) {
    return value
  }
  return undefined
}

function readQueueOwner(value: string | null): QueueOwner | undefined {
  return value?.trim() ? (value as QueueOwner) : undefined
}

function readQueueDomain(value: string | null): QueueDomain | undefined {
  return value?.trim() ? (value as QueueDomain) : undefined
}

function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function readStatusValue(value: unknown): QueueStatus | null {
  return readQueueStatus(typeof value === 'string' ? value : null) ?? null
}

function readApprovalDecision(value: unknown): QueueApprovalDecision | null {
  if (
    value === 'approve_action' ||
    value === 'hold' ||
    value === 'manual_only' ||
    value === 'broader_approval'
  ) {
    return value
  }
  return null
}

export const Route = createFileRoute('/api/executive-queue')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url)
          const items = await listQueueItems({
            includeArchived: url.searchParams.get('include_archived') === 'true',
            status: readQueueStatus(url.searchParams.get('status')),
            owner: readQueueOwner(url.searchParams.get('owner')),
            domain: readQueueDomain(url.searchParams.get('domain')),
          })
          const grouped = groupQueueItemsForBoard(items)
          return json({ ok: true, items, grouped, total: items.length })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : 'Failed to load Executive Queue',
            },
            { status: 500 },
          )
        }
      },
      PATCH: async ({ request }) => {
        try {
          const payload = (await request.json()) as Record<string, unknown>
          const id = readString(payload.id)
          if (!id) return json({ ok: false, error: 'id is required' }, { status: 400 })

          const actor = readString(payload.actor, 'Executive Queue')
          const now = new Date().toISOString()
          const action = readString(payload.action)

          if (action === 'transition') {
            const status = readStatusValue(payload.status)
            if (!status) return json({ ok: false, error: 'valid status is required' }, { status: 400 })
            const item = await updateQueueItemStatus({
              id,
              status,
              actor,
              now,
              resultSummary: readString(payload.resultSummary),
              blockedReason: readString(payload.blockedReason),
            })
            return json({ ok: true, item })
          }

          if (action === 'approval') {
            const decision = readApprovalDecision(payload.decision)
            if (!decision) return json({ ok: false, error: 'valid approval decision is required' }, { status: 400 })
            const item = await applyQueueApproval({
              id,
              decision,
              actor,
              now,
              note: readString(payload.note),
            })
            return json({ ok: true, item })
          }

          return json({ ok: false, error: 'valid action is required' }, { status: 400 })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : 'Failed to update Executive Queue item',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
