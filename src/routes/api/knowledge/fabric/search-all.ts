import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { searchAllKnowledgeWithEvidence } from '../../../../server/knowledge-memory-fabric'
import { requireJsonContentType } from '../../../../server/rate-limit'

export const Route = createFileRoute('/api/knowledge/fabric/search-all')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const contentTypeCheck = requireJsonContentType(request)
        if (contentTypeCheck) return contentTypeCheck
        try {
          const body = (await request.json()) as Record<string, unknown>
          return json(await searchAllKnowledgeWithEvidence({
            query: body.query ?? body.q,
            mode: body.mode,
            maxResults: body.maxResults ?? body.max_results,
          }))
        } catch (error) {
          return json({ ok: false, error: error instanceof Error ? error.message : 'Knowledge Fabric search failed' }, { status: 400 })
        }
      },
    },
  },
})
