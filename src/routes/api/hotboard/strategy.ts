import { createFileRoute } from '@tanstack/react-router'
import { handleHotboardStrategyGet } from '../../../server/hotboard-strategy-api'

export const Route = createFileRoute('/api/hotboard/strategy')({
  server: {
    handlers: {
      GET: async ({ request }) => handleHotboardStrategyGet(request),
    },
  },
})
