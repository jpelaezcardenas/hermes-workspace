/**
 * /api/agent-dispatch — Wave 2 Lane B (F04)
 *
 * Explicit 501 stub. The Workspace UI calls /api/agent-dispatch in some
 * legacy code paths; rather than letting the request fall through to the
 * SPA index (silent text/html 200 + JSON parse error), surface a real JSON
 * 501 with pointers to the supported routes.
 *
 * Auth: cookie-gated like other agent routes.
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'

export const Route = createFileRoute('/api/agent-dispatch')({
  server: {
    handlers: {
      GET: async () =>
        json(
          { ok: false, error: 'Method Not Allowed', allowed: ['POST'] },
          { status: 405, headers: { Allow: 'POST' } },
        ),
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'unauthenticated' }, { status: 401 })
        }
        return json(
          {
            ok: false,
            error:
              'agent-dispatch not implemented; use /api/swarm-dispatch for tmux worker dispatch or /api/conductor-spawn for chat-stream sessions',
            deferred: 'phase-3f',
            see: ['/api/swarm-dispatch', '/api/conductor-spawn'],
          },
          { status: 501 },
        )
      },
    },
  },
})
