import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { buildLearningLoopReview } from '../../../server/learning-loop-review'

export const Route = createFileRoute('/api/learning-loop/review')({
  server: {
    handlers: {
      GET: ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const windowHours = Number(url.searchParams.get('windowHours') ?? 168)

        return json(
          buildLearningLoopReview(
            Number.isFinite(windowHours) && windowHours > 0 ? windowHours : 168,
          ),
        )
      },
    },
  },
})
