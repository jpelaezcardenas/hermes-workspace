import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { collectFleetCronDashboard } from '../../server/fleet'

export const Route = createFileRoute('/api/fleet-cron')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          return json(await collectFleetCronDashboard())
        } catch (error) {
          return json(
            {
              error: error instanceof Error ? error.message : 'Failed to collect fleet cron jobs',
              generatedAt: new Date().toISOString(),
              summary: { total: 0, active: 0, paused: 0, failedRecent: 0 },
              jobs: [],
            },
            { status: 200 },
          )
        }
      },
    },
  },
})
