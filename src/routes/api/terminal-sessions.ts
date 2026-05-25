import { createFileRoute } from '@tanstack/react-router'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { listTerminalSessions } from '../../server/terminal-sessions'

export const Route = createFileRoute('/api/terminal-sessions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return new Response(
            JSON.stringify({ ok: false, error: 'Unauthorized' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        return new Response(
          JSON.stringify({ ok: true, sessions: listTerminalSessions() }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
          },
        )
      },
    },
  },
})
