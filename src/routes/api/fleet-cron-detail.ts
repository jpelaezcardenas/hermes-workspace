import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { collectFleetCronDetail } from '../../server/fleet'

export const Route = createFileRoute('/api/fleet-cron-detail')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const nodeId = url.searchParams.get('nodeId')
        const jobId = url.searchParams.get('jobId')

        if (!nodeId || !jobId) {
          return json({ error: 'Missing nodeId or jobId' }, { status: 400 })
        }

        try {
          const detail = await collectFleetCronDetail(nodeId, jobId)
          if (!detail) return json({ error: 'Cron job not found' }, { status: 404 })
          return json(detail)
        } catch (error) {
          return json(
            {
              error: error instanceof Error ? error.message : 'Cron detail collection failed',
              generatedAt: new Date().toISOString(),
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
