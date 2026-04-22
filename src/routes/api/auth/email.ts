import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { z } from 'zod'
import {
  buildMagicLinkVerifyUrl,
  generateMagicLinkToken,
  resolveWhitelistedUserByEmail,
  sendMagicLinkEmail,
} from '../../../server/email-auth'
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
  requireJsonContentType,
} from '../../../server/rate-limit'

const EmailLoginSchema = z.object({
  email: z.string().trim().email().max(320),
})

export const Route = createFileRoute('/api/auth/email')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        const ip = getClientIp(request)
        if (!rateLimit(`email-auth-start:${ip}`, 20, 60_000)) {
          return rateLimitResponse()
        }

        const raw = await request.json().catch(() => ({}))
        const parsed = EmailLoginSchema.safeParse(raw)
        if (!parsed.success) {
          return json({ ok: false, error: 'Invalid email address' }, { status: 400 })
        }

        const email = parsed.data.email.toLowerCase()
        const whitelisted = resolveWhitelistedUserByEmail(email)
        if (!whitelisted) {
          return json({ ok: false, error: '该邮箱未授权' }, { status: 403 })
        }

        const magic = generateMagicLinkToken(email)
        const verifyUrl = buildMagicLinkVerifyUrl(request, magic.token)
        const sendResult = await sendMagicLinkEmail({
          toEmail: email,
          displayName: whitelisted.displayName,
          verifyUrl,
        })

        return json({
          ok: true,
          mode: sendResult.mode,
          expires_in_seconds: 15 * 60,
        })
      },
    },
  },
})

