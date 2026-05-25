import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { getMemoryFabricHealth } from '../../../../server/knowledge-memory-fabric'

export const Route = createFileRoute('/api/knowledge/fabric/health')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          return json(await getMemoryFabricHealth())
        } catch (error) {
          return json(
            { ok: false, error: error instanceof Error ? error.message : 'Memory Fabric health check failed' },
            { status: 500 },
          )
        }
      },
    },
  },
})
