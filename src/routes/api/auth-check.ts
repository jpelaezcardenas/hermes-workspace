import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  getSessionUser,
  isAuthenticated,
  isFeishuSsoEnabled,
  isPasswordProtectionEnabled,
} from '../../server/auth-middleware'

export const Route = createFileRoute('/api/auth-check')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const healthResponse = await fetch('http://localhost:8642/health', {
            signal: AbortSignal.timeout(4_000),
          })

          if (!healthResponse.ok) {
            return json(
              {
                authenticated: false,
                authRequired: false,
                error: `hermes_agent_http_${healthResponse.status}`,
              },
              { status: 503 },
            )
          }
        } catch (error) {
          return json(
            {
              authenticated: false,
              authRequired: false,
              error:
                error instanceof DOMException && error.name === 'AbortError'
                  ? 'hermes_agent_timeout'
                  : 'hermes_agent_unreachable',
            },
            { status: 503 },
          )
        }

        const authRequired = isPasswordProtectionEnabled() || isFeishuSsoEnabled()
        const authenticated = isAuthenticated(request)
        const user = authenticated ? getSessionUser(request) : null

        return json({
          authenticated,
          authRequired,
          authMode: isFeishuSsoEnabled() ? 'feishu_sso' : authRequired ? 'password' : 'none',
          user: user
            ? {
                id: user.id,
                feishu_open_id: user.feishu_open_id,
                feishu_union_id: user.feishu_union_id,
                display_name: user.display_name,
                role: user.role,
              }
            : null,
        })
      },
    },
  },
})
