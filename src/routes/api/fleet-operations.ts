import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { executeFleetOperation, planFleetOperation, readFleetOperations } from '../../server/fleet-operations'

export const Route = createFileRoute('/api/fleet-operations')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        const url = new URL(request.url)
        const limit = Number(url.searchParams.get('limit') || '100')
        return json({ generatedAt: new Date().toISOString(), records: await readFleetOperations(limit) })
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const body = await request.json()
          const mode = body?.mode === 'plan' ? 'plan' : 'execute'
          const result = mode === 'plan' ? await planFleetOperation(body) : await executeFleetOperation(body)
          const status = result.record.status === 'rejected' ? 400 : 200
          return json(result, { status })
        } catch (error) {
          return json({ error: error instanceof Error ? error.message : 'Operation failed', generatedAt: new Date().toISOString() }, { status: 500 })
        }
      },
    },
  },
})
