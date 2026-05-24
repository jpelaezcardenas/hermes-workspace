import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireJsonContentType } from '../../../server/rate-limit'
import { isAuthenticated } from '../../../server/auth-middleware'
import { dispatchSecondBrainWorkflow } from '../../../server/second-brain-files'
import type { SecondBrainWorkflowOperation } from '../../../server/second-brain-files'

function statusFor(message: string): number {
  if (/unsupported|absolute|traversal|unknown|disabled|unavailable/i.test(message)) return 400
  return 502
}

export const Route = createFileRoute('/api/second-brain/dispatch')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const contentTypeCheck = requireJsonContentType(request)
        if (contentTypeCheck) return contentTypeCheck
        try {
          const body = (await request.json()) as Record<string, unknown>
          const result = await dispatchSecondBrainWorkflow({
            operation: String(body.operation || '') as SecondBrainWorkflowOperation,
            sourceId: String(body.source || ''),
            path: typeof body.path === 'string' ? body.path : undefined,
            hash: typeof body.hash === 'string' ? body.hash : undefined,
            metadata:
              body.metadata && typeof body.metadata === 'object'
                ? (body.metadata as Record<string, unknown>)
                : undefined,
          })
          return json(result)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to dispatch workflow'
          return json({ ok: false, error: message }, { status: statusFor(message) })
        }
      },
    },
  },
})
