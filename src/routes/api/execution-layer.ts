import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  buildExecutionLayerSnapshot,
  renderExecutionLayerMarkdown,
} from '../../server/execution-layer'

export const Route = createFileRoute('/api/execution-layer')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const format = url.searchParams.get('format')

        try {
          const snapshot = buildExecutionLayerSnapshot()
          if (format === 'markdown') {
            return new Response(renderExecutionLayerMarkdown(snapshot), {
              headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Cache-Control': 'private, max-age=10',
              },
            })
          }

          return json(
            { ok: true, snapshot },
            {
              headers: {
                'Cache-Control': 'private, max-age=10',
              },
            },
          )
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to build execution layer',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
