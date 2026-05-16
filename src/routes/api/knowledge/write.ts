import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { writeKnowledgePage } from '../../../server/knowledge-browser'

type WriteKnowledgeBody = {
  path?: string
  content?: string
}

export const Route = createFileRoute('/api/knowledge/write')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        return json(
          { error: 'Use POST to write a knowledge page' },
          { status: 405 },
        )
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const body = (await request.json()) as WriteKnowledgeBody
          const path = body.path || ''
          const content = body.content
          if (typeof content !== 'string') {
            return json({ error: 'Content is required' }, { status: 400 })
          }
          const result = writeKnowledgePage(path, content)
          return json({
            page: result.meta,
            content: result.content,
            backlinks: result.backlinks,
          })
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Failed to write knowledge page'
          const status =
            /not allowed|outside knowledge root|required|traversal|only markdown|editing is only/i.test(
              message,
            )
              ? 400
              : 500
          return json({ error: message }, { status })
        }
      },
    },
  },
})
