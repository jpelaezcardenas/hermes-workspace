import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../../server/auth-middleware'
import {
  configuredClientId,
  createXBookmarkStatus,
  defaultRedirectUri,
  readBookmarkCache,
  readTokenState,
} from './-x-bookmarks-utils'

export const Route = createFileRoute('/api/x-bookmarks/status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const tokenState = await readTokenState()
        const cache = await readBookmarkCache()
        return json({
          ok: true,
          status: createXBookmarkStatus({
            clientId: configuredClientId(),
            redirectUri: defaultRedirectUri(request.url),
            tokenState,
          }),
          cache: cache
            ? {
                fetchedAt: cache.fetchedAt,
                count: cache.items.length,
                nextToken: cache.nextToken,
                sample: cache.items.slice(0, 5),
              }
            : null,
        })
      },
    },
  },
})
