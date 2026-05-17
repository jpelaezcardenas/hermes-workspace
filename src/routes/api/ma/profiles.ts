import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { defaultMultiAgentProfiles } from '../../../server/multi-agent/profiles'
import { requireAuthenticated, safeError } from './-helpers'

export const Route = createFileRoute('/api/ma/profiles')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          return json({ ok: true, profiles: defaultMultiAgentProfiles() })
        } catch (err) {
          return json({ ok: false, profiles: [], error: safeError(err) }, { status: 500 })
        }
      },
    },
  },
})
