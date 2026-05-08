import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'
import { dashboardFetch } from '../../server/gateway-capabilities'

const BodySchema = z.object({
  provider: z.string().min(1),
})

type DashboardOAuthStartResponse = {
  session_id?: unknown
  flow?: unknown
  user_code?: unknown
  verification_url?: unknown
  verification_uri?: unknown
  verification_uri_complete?: unknown
  auth_url?: unknown
  expires_in?: unknown
  poll_interval?: unknown
  interval?: unknown
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function mapDashboardOAuthStart(data: DashboardOAuthStartResponse) {
  const sessionId = readString(data.session_id)
  const verificationUrl =
    readString(data.verification_uri_complete) ||
    readString(data.verification_url) ||
    readString(data.verification_uri) ||
    readString(data.auth_url)

  return {
    device_code: sessionId,
    session_id: sessionId,
    flow: readString(data.flow) || 'device_code',
    user_code: readString(data.user_code),
    verification_uri: verificationUrl,
    verification_uri_complete: verificationUrl,
    interval: readNumber(data.poll_interval, readNumber(data.interval, 3)),
    expires_in: readNumber(data.expires_in, 600),
  }
}

function readError(data: unknown, fallback: string): string {
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    if (typeof record.detail === 'string') return record.detail
    if (typeof record.error === 'string') return record.error
    if (typeof record.message === 'string') return record.message
  }
  return fallback
}

export const Route = createFileRoute('/api/oauth/device-code')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = BodySchema.safeParse(body)
        if (!parsed.success) {
          return json({ error: 'Missing provider' }, { status: 400 })
        }

        const provider = parsed.data.provider.trim()

        try {
          const res = await dashboardFetch(
            `/api/providers/oauth/${encodeURIComponent(provider)}/start`,
            { method: 'POST' },
          )
          const data = await res.json().catch(() => ({}))

          if (!res.ok) {
            return json(
              { error: readError(data, 'Device code request failed') },
              { status: res.status },
            )
          }

          return json(mapDashboardOAuthStart(data as DashboardOAuthStartResponse))
        } catch (err) {
          return json(
            { error: err instanceof Error ? err.message : 'Network error' },
            { status: 500 },
          )
        }
      },
    },
  },
})
