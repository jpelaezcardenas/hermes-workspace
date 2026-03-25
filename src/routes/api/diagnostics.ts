/**
 * /api/diagnostics — comprehensive connection diagnostic for troubleshooting.
 *
 * Returns structured information about:
 * - Whether the Hermes gateway is reachable
 * - Which API endpoints are available/missing
 * - The configured Hermes URL
 * - Common misconfiguration flags
 *
 * This helps users (and support) understand WHY the workspace can't connect.
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  HERMES_API,
  probeGateway,
} from '../../server/gateway-capabilities'
import { isAuthenticated } from '@/server/auth-middleware'

export const Route = createFileRoute('/api/diagnostics')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        // Force a fresh probe so we get accurate data
        const caps = await probeGateway({ force: true })

        const checks = [
          { name: 'health', url: `${HERMES_API}/health`, required: true },
          { name: 'models', url: `${HERMES_API}/v1/models`, required: true },
          { name: 'sessions', url: `${HERMES_API}/api/sessions`, required: true },
          { name: 'config', url: `${HERMES_API}/api/config`, required: false },
          { name: 'skills', url: `${HERMES_API}/api/skills`, required: false },
          { name: 'memory', url: `${HERMES_API}/api/memory`, required: false },
          { name: 'jobs', url: `${HERMES_API}/api/jobs`, required: false },
        ]

        const results = await Promise.all(
          checks.map(async (check) => {
            const start = Date.now()
            try {
              const res = await fetch(check.url, {
                signal: AbortSignal.timeout(3000),
              })
              const latencyMs = Date.now() - start
              return {
                name: check.name,
                status: res.ok ? 'ok' : 'error',
                httpStatus: res.status,
                latencyMs,
                required: check.required,
                error: res.ok ? undefined : `${res.status} ${res.statusText}`,
              }
            } catch (err) {
              const latencyMs = Date.now() - start
              const errorMsg =
                err instanceof Error ? err.message : String(err)
              return {
                name: check.name,
                status: 'unreachable',
                httpStatus: undefined,
                latencyMs,
                required: check.required,
                error: errorMsg,
              }
            }
          }),
        )

        const missingRequired = results.filter(
          (r) => r.required && r.status !== 'ok',
        )

        const body = {
          ok: missingRequired.length === 0,
          hermesUrl: HERMES_API,
          hermesVersion: caps.probed ? 'responsive' : 'unresponsive',
          checks: results,
          summary: missingRequired.length === 0
            ? 'All required endpoints are reachable.'
            : `Missing required endpoints: ${missingRequired.map((r) => r.name).join(', ')}`,
          hint:
            missingRequired.length > 0
              ? `Ensure Hermes is running at ${HERMES_API}. ` +
                `Try: cd hermes-agent && git pull && pip install -e . && hermes gateway`
              : undefined,
        }

        return json(body, {
          status: missingRequired.length === 0 ? 200 : 503,
        })
      },
    },
  },
})
