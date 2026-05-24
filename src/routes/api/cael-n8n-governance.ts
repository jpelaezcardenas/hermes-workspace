import { createFileRoute } from '@tanstack/react-router'
import { buildN8nGovernanceResponse } from '../../lib/cael-n8n-governance'
import { requireLocalOrAuth } from '../../server/auth-middleware'

export const Route = createFileRoute('/api/cael-n8n-governance')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json(
            { ok: false, error: 'Authentication required' },
            { status: 401 },
          )
        }

        const response = await buildN8nGovernanceResponse()
        return Response.json(response, { status: 200 })
      },
    },
  },
})
