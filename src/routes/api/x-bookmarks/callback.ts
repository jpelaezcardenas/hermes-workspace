import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import {
  configuredClientId,
  configuredClientSecret,
  exchangeCodeForToken,
  fetchAuthenticatedUser,
  readOAuthState,
  writeTokenState,
} from './-x-bookmarks-utils'

function htmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

export const Route = createFileRoute('/api/x-bookmarks/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const code = url.searchParams.get('code') || ''
        const state = url.searchParams.get('state') || ''
        const error = url.searchParams.get('error') || ''

        if (error) {
          return htmlResponse(
            `<h1>X Bookmark Intake authorization failed</h1><p>${error}</p>`,
            400,
          )
        }
        if (!code || !state) {
          return htmlResponse(
            '<h1>X Bookmark Intake authorization failed</h1><p>Missing OAuth code or state.</p>',
            400,
          )
        }

        const oauthState = await readOAuthState()
        if (!oauthState || oauthState.state !== state) {
          return htmlResponse(
            '<h1>X Bookmark Intake authorization failed</h1><p>OAuth state did not match. Start again from Workspace.</p>',
            400,
          )
        }

        const clientId = configuredClientId()
        if (!clientId) {
          return htmlResponse(
            '<h1>X Bookmark Intake authorization failed</h1><p>X_BOOKMARKS_CLIENT_ID is not configured locally.</p>',
            400,
          )
        }

        try {
          const tokenState = await exchangeCodeForToken({
            clientId,
            clientSecret: configuredClientSecret(),
            code,
            codeVerifier: oauthState.codeVerifier,
            redirectUri: oauthState.redirectUri,
          })
          const user = await fetchAuthenticatedUser(
            tokenState.accessToken || '',
          )
          await writeTokenState({ ...tokenState, ...user })
          return htmlResponse(
            '<h1>X Bookmark Intake connected</h1><p>You can close this tab and return to Workspace.</p>',
          )
        } catch (err) {
          return htmlResponse(
            `<h1>X Bookmark Intake authorization failed</h1><p>${err instanceof Error ? err.message : 'Unknown OAuth error'}</p>`,
            500,
          )
        }
      },
    },
  },
})
