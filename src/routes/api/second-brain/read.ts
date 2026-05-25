import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../server/auth-middleware'
import { readSecondBrainFile } from '../../../server/second-brain-files'

function statusFor(message: string): number {
  if (/not found|ENOENT|unknown|disabled|unavailable/i.test(message)) return 404
  if (/absolute|traversal|denied|escape|markdown|text|large|file/i.test(message)) return 400
  return 500
}

export const Route = createFileRoute('/api/second-brain/read')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const url = new URL(request.url)
        const source = url.searchParams.get('source') || ''
        const path = url.searchParams.get('path') || ''
        try {
          return json({ ok: true, ...(await readSecondBrainFile(source, path)) })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to read file'
          return json({ ok: false, error: message }, { status: statusFor(message) })
        }
      },
    },
  },
})
