import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { deleteKnowledgePage } from '../../../server/knowledge-browser'

type DeleteKnowledgeBody = {
  path?: string
}

export const Route = createFileRoute('/api/knowledge/delete')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        return json(
          { error: 'Use POST to delete a knowledge page' },
          { status: 405 },
        )
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const body = (await request.json()) as DeleteKnowledgeBody
          const result = deleteKnowledgePage(body.path || '')
          return json(result)
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Failed to delete knowledge page'
          const status =
            /not allowed|outside knowledge root|required|traversal|only markdown|editing is only/i.test(
              message,
            )
              ? 400
              : /ENOENT/.test(message)
                ? 404
                : 500
          return json({ error: message }, { status })
        }
      },
    },
  },
})
