import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { createSampleAgentSurface } from '../../../features/agent-surfaces/sample-surface'

export const Route = createFileRoute('/api/agent-surfaces/sample')({
  server: {
    handlers: {
      GET: ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        return json({ ok: true, surface: createSampleAgentSurface() })
      },
    },
  },
})
