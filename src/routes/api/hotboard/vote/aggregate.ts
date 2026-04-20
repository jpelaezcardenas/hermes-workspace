import { createFileRoute } from '@tanstack/react-router'
import { handleHotboardVoteAggregateGet } from '../../../../server/hotboard-vote-api'

export const Route = createFileRoute('/api/hotboard/vote/aggregate')({
  server: {
    handlers: {
      GET: async ({ request }) => handleHotboardVoteAggregateGet(request),
    },
  },
})
