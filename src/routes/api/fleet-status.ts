import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { collectFleetStatus } from '../../server/fleet'

export const Route = createFileRoute('/api/fleet-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          return json(await collectFleetStatus())
        } catch (error) {
          return json(
            {
              error: error instanceof Error ? error.message : 'Failed to collect fleet status',
              generatedAt: new Date().toISOString(),
              summary: { total: 0, healthy: 0, degraded: 0, offline: 0, unknown: 0 },
              nodes: [],
            },
            { status: 200 },
          )
        }
      },
    },
  },
})
