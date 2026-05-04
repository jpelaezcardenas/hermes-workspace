import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { buildCompanyFlowPacket } from '../../server/command-center-data'

export const Route = createFileRoute('/api/company-flow')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        return json(await buildCompanyFlowPacket())
      },
    },
  },
})
