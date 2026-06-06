import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { isAuthenticated } from '../../../server/auth-middleware'
import {
  buildXBookmarkAuthorizeUrl,
  configuredClientId,
  createOAuthStateValue,
  createPkcePair,
  defaultRedirectUri,
  writeOAuthState,
} from './-x-bookmarks-utils'

export const Route = createFileRoute('/api/x-bookmarks/authorize')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const clientId = configuredClientId()
        if (!clientId) {
          return json(
            {
              ok: false,
              error: 'X_BOOKMARKS_CLIENT_ID is not configured locally.',
            },
            { status: 400 },
          )
        }

        const redirectUri = defaultRedirectUri(request.url)
        const state = createOAuthStateValue()
        const pkce = createPkcePair()
        await writeOAuthState({
          state,
          codeVerifier: pkce.verifier,
          redirectUri,
          createdAt: new Date().toISOString(),
        })

        const authorizeUrl = buildXBookmarkAuthorizeUrl({
          clientId,
          redirectUri,
          state,
          codeChallenge: pkce.challenge,
        })

        return json({
          ok: true,
          authorizeUrl: authorizeUrl.toString(),
          redirectUri,
          mode: 'read-only',
        })
      },
    },
  },
})
