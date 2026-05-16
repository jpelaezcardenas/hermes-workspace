import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { buildKnowledgeHealthReport } from '../../../server/knowledge-browser'

export const Route = createFileRoute('/api/knowledge/health')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          return json({ report: buildKnowledgeHealthReport() })
        } catch (error) {
          return json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to build knowledge health report',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
