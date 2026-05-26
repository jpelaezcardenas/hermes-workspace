import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'
import {
  createSessionCookie,
  generateSessionToken,
  getWorkspaceAuthMode,
  isPasswordProtectionEnabled,
  storeSessionToken,
  verifyPassword,
} from '../../server/auth-middleware'
import {
  applyWorkforceConfig,
  fetchWorkforceConfig,
  requestMagicLink,
  validateWorkforceRuntimeConfig,
  verifyMagicLinkToken,
} from '../../server/portal-auth'
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
  requireJsonContentType,
} from '../../server/rate-limit'

const AuthSchema = z.union([
  z.object({
    mode: z.literal('request_magic_link'),
    email: z.string().email().max(320),
  }),
  z.object({
    mode: z.literal('verify_magic_link'),
    email: z.string().email().max(320),
    token: z.string().min(4).max(128),
  }),
  z.object({
    password: z.string().max(1000),
  }),
])

export const Route = createFileRoute('/api/auth')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        // If password protection is disabled, reject auth attempts
        if (!isPasswordProtectionEnabled()) {
          return json(
            { ok: false, error: 'Authentication not required' },
            { status: 400 },
          )
        }

        // Rate limit: max 5 auth attempts per minute per IP
        const ip = getClientIp(request)
        if (!rateLimit(`auth:${ip}`, 5, 60_000)) {
          return rateLimitResponse()
        }

        try {
          const raw = await request.json().catch(() => ({}))
          const parsed = AuthSchema.safeParse(raw)

          if (!parsed.success) {
            return json(
              { ok: false, error: 'Invalid request' },
              { status: 400 },
            )
          }

          const authMode = getWorkspaceAuthMode()

          if ('mode' in parsed.data) {
            if (authMode !== 'magic_link') {
              return json(
                { ok: false, error: 'Magic Link login is not enabled' },
                { status: 400 },
              )
            }

            if (parsed.data.mode === 'request_magic_link') {
              await requestMagicLink(parsed.data.email)
              return json({ ok: true, step: 'magic_link_sent' }, { status: 200 })
            }

            const session = await verifyMagicLinkToken(
              parsed.data.email,
              parsed.data.token,
            )
            const workforce = await fetchWorkforceConfig(session.session_token)
            await validateWorkforceRuntimeConfig(workforce)
            const applied = applyWorkforceConfig(workforce)
            const token = generateSessionToken()
            storeSessionToken(token)

            return json(
              {
                ok: true,
                model: applied.model,
                routeKey: applied.routeKey,
                creditStatus: applied.creditStatus,
              },
              {
                status: 200,
                headers: {
                  'Set-Cookie': createSessionCookie(token),
                },
              },
            )
          }

          if (authMode !== 'password') {
            return json(
              { ok: false, error: 'Password login is not enabled' },
              { status: 400 },
            )
          }

          const { password } = parsed.data

          // Verify password
          const valid = verifyPassword(password)

          if (!valid) {
            // Add small delay to prevent brute force
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return json(
              { ok: false, error: 'Invalid password' },
              { status: 401 },
            )
          }

          // Generate session token
          const token = generateSessionToken()
          storeSessionToken(token)

          // Return success with Set-Cookie header
          return json(
            { ok: true },
            {
              status: 200,
              headers: {
                'Set-Cookie': createSessionCookie(token),
              },
            },
          )
        } catch (err) {
          if (import.meta.env.DEV) console.error('[/api/auth] Error:', err)
          return json(
            { ok: false, error: 'Authentication failed' },
            { status: 500 },
          )
        }
      },
    },
  },
})
