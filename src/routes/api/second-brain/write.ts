import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireJsonContentType } from '../../../server/rate-limit'
import { isAuthenticated } from '../../../server/auth-middleware'
import { writeSecondBrainFile } from '../../../server/second-brain-files'

function statusFor(message: string): number {
  if (/read-only|hash conflict/i.test(message)) return 409
  if (/unknown|disabled|unavailable/i.test(message)) return 404
  if (/absolute|traversal|denied|escape|expectedHash|markdown|text|large|parent/i.test(message)) return 400
  return 500
}

export const Route = createFileRoute('/api/second-brain/write')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const contentTypeCheck = requireJsonContentType(request)
        if (contentTypeCheck) return contentTypeCheck
        try {
          const body = (await request.json()) as Record<string, unknown>
          const result = await writeSecondBrainFile({
            sourceId: String(body.source || ''),
            path: String(body.path || ''),
            content: typeof body.content === 'string' ? body.content : '',
            expectedHash: String(body.expectedHash || ''),
          })
          return json(result)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to write file'
          return json({ ok: false, error: message }, { status: statusFor(message) })
        }
      },
    },
  },
})
