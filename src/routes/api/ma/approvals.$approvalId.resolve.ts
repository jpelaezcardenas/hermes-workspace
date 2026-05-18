import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { resolveApproval } from '../../../server/multi-agent/store'
import type { MultiAgentApprovalStatus } from '../../../server/multi-agent/types'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

function parseDecision(value: unknown): Extract<MultiAgentApprovalStatus, 'approved' | 'denied'> {
  if (value === 'approved' || value === 'denied') return value
  if (value === 'approve') return 'approved'
  if (value === 'deny') return 'denied'
  throw new Error('decision must be approved or denied')
}

export const Route = createFileRoute('/api/ma/approvals/$approvalId/resolve')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const decision = parseDecision(body.decision ?? body.action)
          const approval = resolveApproval(getRouteStore(), params.approvalId, decision)
          return json({ ok: true, approval })
        } catch (err) {
          const message = safeError(err)
          const status = message.startsWith('Approval not found') ? 404 : 400
          return json({ ok: false, error: message }, { status })
        }
      },
    },
  },
})
