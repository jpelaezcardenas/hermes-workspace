import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { buildCommandCenterStatus } from '../../server/command-center-data'

export const Route = createFileRoute('/api/command-center-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        const url = new URL(request.url)
        return json(await buildCommandCenterStatus({
          refresh: url.searchParams.get('refresh') === '1',
        }))
      },
    },
  },
})
