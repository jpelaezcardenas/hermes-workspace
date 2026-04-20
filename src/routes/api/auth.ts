import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  generateSessionToken,
  isFeishuSsoEnabled,
  isPasswordProtectionEnabled,
} from '../../server/auth-middleware'
import { buildFeishuAuthorizeUrl } from '../../server/feishu-auth'
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
} from '../../server/rate-limit'

export const Route = createFileRoute('/api/auth')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const ssoEnabled = isFeishuSsoEnabled()
        if (!ssoEnabled) {
          return json(
            { ok: false, error: 'Feishu SSO is not configured' },
            { status: 400 },
          )
        }

        const ip = getClientIp(request)
        if (!rateLimit(`feishu-auth-start:${ip}`, 30, 60_000)) {
          return rateLimitResponse()
        }

        const state = generateSessionToken()
        const authorizeUrl = buildFeishuAuthorizeUrl(request, state)

        return Response.redirect(authorizeUrl, 302)
      },

      POST: async () => {
        if (isPasswordProtectionEnabled() && !isFeishuSsoEnabled()) {
          return json(
            {
              ok: false,
              error: 'Password authentication is no longer supported for this route',
            },
            { status: 410 },
          )
        }

        return json(
          {
            ok: false,
            error: 'Use GET /api/auth to start Feishu SSO',
          },
          { status: 405 },
        )
      },
    },
  },
})
