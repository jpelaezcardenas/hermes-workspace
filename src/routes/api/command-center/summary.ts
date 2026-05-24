import { createFileRoute } from '@tanstack/react-router'
import { requireLocalOrAuth } from '../../../server/auth-middleware'
import { buildCommandCenterSummary } from '../../../server/command-center-summary'

export const Route = createFileRoute('/api/command-center/summary')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json(
            { ok: false, error: 'Authentication required' },
            { status: 401 },
          )
        }

        const summary = await buildCommandCenterSummary({
          requestUrl: request.url,
          cookie: request.headers.get('cookie'),
        })

        return Response.json(summary, {
          status: summary.errors.length ? 502 : 200,
          headers: {
            'Cache-Control': 'private, max-age=5, stale-while-revalidate=20',
          },
        })
      },
    },
  },
})
