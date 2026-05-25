import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../../server/auth-middleware'
import { searchAgentMemory } from '../../../../server/knowledge-memory-fabric'
import { requireJsonContentType } from '../../../../server/rate-limit'

export const Route = createFileRoute('/api/knowledge/fabric/agent-search')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const contentTypeCheck = requireJsonContentType(request)
        if (contentTypeCheck) return contentTypeCheck
        try {
          const body = (await request.json()) as Record<string, unknown>
          return json(await searchAgentMemory({
            query: body.query ?? body.q,
            memoryScope: body.memoryScope ?? body.memory_scope,
            maxResults: body.maxResults ?? body.max_results,
            agentSource: body.agentSource ?? body.agent_source,
          }))
        } catch (error) {
          return json({ ok: false, error: error instanceof Error ? error.message : 'Agent memory search failed' }, { status: 400 })
        }
      },
    },
  },
})
