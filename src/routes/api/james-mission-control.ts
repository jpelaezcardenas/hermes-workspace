import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../server/auth-middleware'
import { readJamesMissionControlSnapshot } from '../../server/james-mission-control'

export const Route = createFileRoute('/api/james-mission-control')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json(
            { ok: false, error: 'Unauthorized', snapshot: null },
            { status: 401 },
          )
        }
        try {
          const snapshot = await readJamesMissionControlSnapshot()
          return json({ ok: true, snapshot })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : String(error),
              snapshot: null,
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
