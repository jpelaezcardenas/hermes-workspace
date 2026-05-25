import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import { getDocumentRecord } from '../../../../server/knowledge-memory-fabric'
import { requireJsonContentType } from '../../../../server/rate-limit'

export const Route = createFileRoute('/api/knowledge/fabric/document-record')({
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
          return json(await getDocumentRecord({
            docId: body.docId ?? body.doc_id,
            memoryScope: body.memoryScope ?? body.memory_scope,
          }))
        } catch (error) {
          return json({ ok: false, error: error instanceof Error ? error.message : 'Document lookup failed' }, { status: 400 })
        }
      },
    },
  },
})
