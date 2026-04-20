import { createFileRoute } from '@tanstack/react-router'
import { handleHotboardFeedGet } from '../../../server/hotboard-feed-api'

export const Route = createFileRoute('/api/hotboard/feed')({
  server: {
    handlers: {
      GET: async ({ request }) => handleHotboardFeedGet(request),
    },
  },
})
