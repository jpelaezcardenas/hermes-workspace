import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'
import {
  createSessionCookie,
  createSessionStore,
  generateSessionToken,
  storeSessionToken,
} from '../../../server/auth-middleware'
import {
  authenticatePassword,
  passwordUserToUpsertInput,
} from '../../../server/password-auth'
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
  requireJsonContentType,
} from '../../../server/rate-limit'

const PasswordLoginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(256),
})

export const Route = createFileRoute('/api/auth/password')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        const ip = getClientIp(request)
        // Tighter limit than email: password attempts should be cheap to
        // guess against, so we cap per-IP retries more aggressively.
        if (!rateLimit(`password-auth:${ip}`, 10, 60_000)) {
          return rateLimitResponse()
        }

        const raw = await request.json().catch(() => ({}))
        const parsed = PasswordLoginSchema.safeParse(raw)
        if (!parsed.success) {
          return json({ ok: false, error: '请输入用户名和密码' }, { status: 400 })
        }

        const result = authenticatePassword(parsed.data.username, parsed.data.password)
        if (!result.ok) {
          // Do not distinguish unknown_user vs wrong_password to the client —
          // it prevents user-enumeration via login form.
          const status = result.reason === 'no_password_configured' ? 503 : 401
          const error =
            result.reason === 'no_password_configured'
              ? '账号密码尚未配置，请联系 JC'
              : '用户名或密码错误'
          return json({ ok: false, error }, { status })
        }

        const store = createSessionStore()
        const user = store.upsertUser(passwordUserToUpsertInput(result.user))
        const sessionToken = generateSessionToken()
        storeSessionToken(sessionToken, {
          userId: user.id,
          ttlSeconds: 7 * 24 * 60 * 60,
        })

        return new Response(
          JSON.stringify({
            ok: true,
            user: { display_name: user.display_name, role: user.role },
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Set-Cookie': createSessionCookie(sessionToken),
            },
          },
        )
      },
    },
  },
})
