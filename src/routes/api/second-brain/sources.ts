import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { listSecondBrainSources } from '../../../server/second-brain-files'

export const Route = createFileRoute('/api/second-brain/sources')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        return json({ ok: true, sources: await listSecondBrainSources() })
      },
    },
  },
})
