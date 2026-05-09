import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { getHermesStatus } from '../../server/hermes-status'

export function getHermesStatusResponse(request: Request) {
  if (!requireLocalOrAuth(request)) {
    return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  return json(getHermesStatus())
}

export const Route = createFileRoute('/api/hermes-status')({
  server: {
    handlers: {
      GET: async ({ request }) => getHermesStatusResponse(request),
    },
  },
})
