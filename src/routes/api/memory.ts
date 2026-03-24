import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  HERMES_API,
  ensureGatewayProbed,
  getGatewayCapabilities,
  getMemory,
} from '../../server/hermes-api'

export const Route = createFileRoute('/api/memory')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        await ensureGatewayProbed()
        if (!getGatewayCapabilities().memory) {
          return json(
            {
              ok: false,
              error: `Gateway does not support /api/memory on ${HERMES_API}`,
            },
            { status: 503 },
          )
        }

        try {
          return json(await getMemory())
        } catch (err) {
          return json(
            { error: err instanceof Error ? err.message : String(err) },
            { status: 500 },
          )
        }
      },
    },
  },
})
