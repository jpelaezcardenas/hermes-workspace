/**
 * Jobs API proxy for Hermes Workspace.
 *
 * Issue #162: resolve the jobs profile in one place, then forward it to the
 * Hermes dashboard / FastAPI jobs endpoints so the screen reflects the active
 * Hermes Agent profile instead of silently drifting to another profile.
 */
import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  BEARER_TOKEN,
  HERMES_API,
  HERMES_UPGRADE_INSTRUCTIONS,
  dashboardFetch,
  ensureGatewayProbed,
} from '../../server/gateway-capabilities'
import { createCapabilityUnavailablePayload } from '@/lib/feature-gates'
import {
  buildJobsProfileSearch,
  resolveJobsProfile,
} from '../../server/jobs-profile-resolution'

function authHeaders(): Record<string, string> {
  return BEARER_TOKEN ? { Authorization: `Bearer ${BEARER_TOKEN}` } : {}
}

async function jobsResponse(res: Response): Promise<Response> {
  const text = await res.text()

  if (!res.ok) {
    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = JSON.parse(text) as unknown
    const normalized = Array.isArray(data) ? { jobs: data } : data
    return new Response(JSON.stringify(normalized), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const Route = createFileRoute('/api/hermes-jobs')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
          })
        }
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.jobs) {
          return new Response(
            JSON.stringify({
              ...createCapabilityUnavailablePayload('jobs'),
              items: [],
              jobs: [],
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const url = new URL(request.url)
        const profile = resolveJobsProfile(url)
        const search = buildJobsProfileSearch(url, profile)
        const res = capabilities.dashboard.available
          ? await dashboardFetch(`/api/cron/jobs${search}`)
          : await fetch(`${HERMES_API}/api/jobs${search}`, {
              headers: authHeaders(),
            })
        return jobsResponse(res)
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
          })
        }
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.jobs) {
          return new Response(
            JSON.stringify({
              ...createCapabilityUnavailablePayload('jobs', {
                error: `Gateway does not support /api/jobs. ${HERMES_UPGRADE_INSTRUCTIONS}`,
              }),
            }),
            { status: 503, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const url = new URL(request.url)
        const profile = resolveJobsProfile(url)
        const search = buildJobsProfileSearch(url, profile)
        const body = await request.text()
        const res = capabilities.dashboard.available
          ? await dashboardFetch(`/api/cron/jobs${search}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body,
            })
          : await fetch(`${HERMES_API}/api/jobs${search}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', ...authHeaders() },
              body,
            })
        return new Response(await res.text(), {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
