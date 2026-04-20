import { createFileRoute } from '@tanstack/react-router'
import {
  handleHotboardIntakeGet,
  handleHotboardIntakePost,
} from '../../../server/hotboard-intake-api'

export const Route = createFileRoute('/api/hotboard/intake')({
  server: {
    handlers: {
      GET: async ({ request }) => handleHotboardIntakeGet(request),
      POST: async ({ request }) => handleHotboardIntakePost(request),
    },
  },
})
