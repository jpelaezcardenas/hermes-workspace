import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  getSessionUser,
  isAuthenticated,
  isFeishuSsoEnabled,
  isPasswordProtectionEnabled,
} from '../../server/auth-middleware'
import { ensureGatewayProbed } from '../../server/gateway-capabilities'

export const Route = createFileRoute('/api/auth-check')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          // Use ensureGatewayProbed() which handles auto-detection across
          // multiple ports (8642, 8643) instead of checking a single
          // hardcoded URL. This was previously a standalone
          // isBackendReachable() that only tried port 8642 and never
          // benefited from the gateway-capabilities auto-detection logic.
          const caps = await ensureGatewayProbed()
          const reachable = caps.health || caps.chatCompletions || caps.models

          if (!reachable) {
            return json(
              {
                authenticated: false,
                authRequired: false,
                error: 'hermes_agent_unreachable',
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
