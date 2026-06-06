import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../../server/auth-middleware'
import {
  createXBookmarkReviewDigest,
  readBookmarkCache,
  readXArticleExtractionCache,
} from './-x-bookmarks-utils'

export const Route = createFileRoute('/api/x-bookmarks/review')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const cache = await readBookmarkCache()
        const articleExtractions = await readXArticleExtractionCache()
        if (!cache) {
          return json({
            ok: true,
            cache: null,
            digest: createXBookmarkReviewDigest(
              [],
              undefined,
              articleExtractions?.items || [],
            ),
          })
        }

        const digest = createXBookmarkReviewDigest(
          cache.items,
          undefined,
          articleExtractions?.items || [],
        )
        return json({
          ok: true,
          cache: {
            fetchedAt: cache.fetchedAt,
            count: cache.items.length,
            nextToken: cache.nextToken,
          },
          digest,
          limitations: [
            'X returns post createdAt, not bookmark save time.',
            'X Article extraction uses X web GraphQL and records extracted, unavailable, or error status per article.',
            'Digest classification is deterministic and source-backed, not a substitute for final human judgment.',
          ],
        })
      },
    },
  },
})
