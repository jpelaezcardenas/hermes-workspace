import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { collectFleetNodeDetail } from '../../server/fleet'

export const Route = createFileRoute('/api/fleet-node-detail')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const nodeId = url.searchParams.get('nodeId')
        const lines = Number(url.searchParams.get('lines') || '160')
        if (!nodeId) {
          return json({ error: 'Missing nodeId' }, { status: 400 })
        }

        try {
          const detail = await collectFleetNodeDetail(nodeId, Number.isFinite(lines) ? lines : 160)
          if (!detail) {
            return json({ error: 'Fleet node not found' }, { status: 404 })
          }
          return json(detail)
        } catch (error) {
          return json(
            {
              error: error instanceof Error ? error.message : 'Failed to collect fleet node detail',
              generatedAt: new Date().toISOString(),
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
