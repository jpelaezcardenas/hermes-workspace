import { createFileRoute } from '@tanstack/react-router'
import {
  createSessionCookie,
  createSessionStore,
  generateSessionToken,
  storeSessionToken,
} from '../../../server/auth-middleware'
import { consumeMagicLinkToken } from '../../../server/email-auth'

function redirectWithMessage(target: string, message: string) {
  const url = new URL(target, 'http://localhost')
  url.searchParams.set('auth_error', message)
  return new Response(null, {
    status: 302,
    headers: { Location: url.pathname + url.search },
  })
}

export const Route = createFileRoute('/auth/email/verify')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const token = String(url.searchParams.get('token') || '').trim()
        if (!token) {
          return redirectWithMessage('/ai-hotboard', '登录链接无效，请重新申请')
        }

        const resolved = consumeMagicLinkToken(token)
        if (!resolved) {
          return redirectWithMessage('/ai-hotboard', '登录链接已过期或已使用，请重新申请')
        }

        const store = createSessionStore()
        const user = store.upsertUser({
          email: resolved.email,
          displayName: resolved.displayName,
          role: resolved.role,
        })

        const sessionToken = generateSessionToken()
        storeSessionToken(sessionToken, {
          userId: user.id,
          ttlSeconds: 7 * 24 * 60 * 60,
        })

        return new Response(null, {
          status: 302,
          headers: {
            Location: '/ai-hotboard',
            'Set-Cookie': createSessionCookie(sessionToken),
          },
        })
      },
    },
  },
})

