import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../server/auth-middleware'
import { readUpdateStatus } from '../../../server/update-system'

export const Route = createFileRoute('/api/update/status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        return json(readUpdateStatus())
      },
    },
  },
})
