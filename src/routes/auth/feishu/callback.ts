import { createFileRoute } from '@tanstack/react-router'
import {
  createSessionCookie,
  createSessionStore,
  generateSessionToken,
  storeSessionToken,
} from '../../../server/auth-middleware'
import { resolveFeishuUserFromCallback } from '../../../server/feishu-auth'

function redirectWithMessage(target: string, message: string) {
  const url = new URL(target, 'http://localhost')
  url.searchParams.set('auth_error', message)
  return Response.redirect(url.pathname + url.search, 302)
}

export const Route = createFileRoute('/auth/feishu/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const code = String(url.searchParams.get('code') || '').trim()

        if (!code) {
          return redirectWithMessage('/ai-hotboard', 'Missing Feishu OAuth code')
        }

        try {
          const feishuUser = await resolveFeishuUserFromCallback(request, code)
          const store = createSessionStore()

          const user = store.upsertUser({
            feishuOpenId: feishuUser.openId,
            feishuUnionId: feishuUser.unionId,
            displayName: feishuUser.displayName,
            role: feishuUser.role,
          })

          const token = generateSessionToken()
          storeSessionToken(token, {
            userId: user.id,
            ttlSeconds: 7 * 24 * 60 * 60,
          })
          return new Response(null, {
            status: 302,
            headers: {
              Location: '/ai-hotboard',
              'Set-Cookie': createSessionCookie(token),
            },
          })
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          if (message.includes('UNAUTHORIZED_WHITELIST')) {
            return redirectWithMessage('/ai-hotboard', '未授权访问 ai-hotboard，请联系 JC')
          }

          return redirectWithMessage('/ai-hotboard', 'Feishu 登录失败，请重试')
        }
      },
    },
  },
})
