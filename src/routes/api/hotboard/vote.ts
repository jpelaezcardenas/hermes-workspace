import { createFileRoute } from '@tanstack/react-router'
import { handleHotboardVotePost } from '../../../server/hotboard-vote-api'

export const Route = createFileRoute('/api/hotboard/vote')({
  server: {
    handlers: {
      POST: async ({ request }) => handleHotboardVotePost(request),
    },
  },
})
