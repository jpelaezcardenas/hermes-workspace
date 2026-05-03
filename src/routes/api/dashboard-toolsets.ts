/**
 * Workspace proxy → Hermes Dashboard `/api/tools/toolsets`
 *
 * GET /api/dashboard-toolsets
 *   Forwards to http://127.0.0.1:9119/api/tools/toolsets using the dashboard
 *   bearer token (CLAUDE_DASHBOARD_TOKEN env, or HTML-scrape fallback via
 *   `dashboardFetch`). Mirrors the proxy pattern in `claude-proxy/$.ts`.
 *
 *   Response: passes through the upstream JSON body (an array of toolset
 *   objects: { name, label, description, enabled, available, configured, tools }).
 *   On upstream failure, returns { ok: false, error: <message> } with the
 *   upstream status code.
 *
 * Auth: workspace `isAuthenticated` cookie/bearer guard, identical to other
 * `/api/*` workspace routes. Phase 3B Lane B.
 */
import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'
import { dashboardFetch } from '../../server/gateway-capabilities'
import { safeErrorMessage } from '../../server/rate-limit'

export const Route = createFileRoute('/api/dashboard-toolsets')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return new Response(
            JSON.stringify({ ok: false, error: 'Unauthorized' }),
            { status: 401, headers: { 'content-type': 'application/json' } },
          )
        }
        try {
          const upstream = await dashboardFetch('/api/tools/toolsets', {
            method: 'GET',
          })
          const body = await upstream.text()
          return new Response(body, {
            status: upstream.status,
            headers: {
              'content-type':
                upstream.headers.get('content-type') ?? 'application/json',
            },
          })
        } catch (error) {
          return new Response(
            JSON.stringify({ ok: false, error: safeErrorMessage(error) }),
            {
              status: 502,
              headers: { 'content-type': 'application/json' },
            },
          )
        }
      },
    },
  },
})
