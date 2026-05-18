import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { listApprovals } from '../../../server/multi-agent/store'
import type { MultiAgentApprovalStatus } from '../../../server/multi-agent/types'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

const APPROVAL_STATUSES = new Set<MultiAgentApprovalStatus>(['pending', 'approved', 'denied', 'expired'])

function parseApprovalStatus(value: string | null): MultiAgentApprovalStatus | undefined {
  if (!value || value === 'pending') return 'pending'
  if (value === 'all') return undefined
  if (!APPROVAL_STATUSES.has(value as MultiAgentApprovalStatus)) {
    throw new Error(`Unsupported approval status: ${value}`)
  }
  return value as MultiAgentApprovalStatus
}

export const Route = createFileRoute('/api/ma/approvals')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const url = new URL(request.url)
          const status = parseApprovalStatus(url.searchParams.get('status'))
          const taskId = url.searchParams.get('taskId') ?? url.searchParams.get('task_id') ?? undefined
          const approvals = listApprovals(getRouteStore(), { status, taskId })
          return json({ ok: true, approvals })
        } catch (err) {
          return json({ ok: false, approvals: [], error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
