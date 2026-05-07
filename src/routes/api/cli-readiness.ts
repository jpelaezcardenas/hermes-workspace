import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { getCliReadiness, sanitizeCliReadiness } from '../../server/cli-readiness'

export function getCliReadinessResponse(request: Request) {
  if (!requireLocalOrAuth(request)) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  return json(sanitizeCliReadiness(getCliReadiness()))
}

export const Route = createFileRoute('/api/cli-readiness')({
  server: {
    handlers: {
      GET: async ({ request }) => getCliReadinessResponse(request),
    },
  },
})
