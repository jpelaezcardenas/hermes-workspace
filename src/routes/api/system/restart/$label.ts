/**
 * POST /api/system/restart/:label — STUB
 *
 * Phase 3E Part 1 ships the read-only system surface. The actual launchd
 * restart wiring (`launchctl kickstart -k gui/<uid>/<label>`) is intentionally
 * deferred to Part 2 so we can review the safety story (allowed labels,
 * confirmation prompt, audit log, error surface) before granting the route
 * the ability to bounce the gateway from the browser.
 *
 * Until then this endpoint exists, requires localhost-or-auth, validates the
 * label against the allow-list, and returns 501 Not Implemented so the UI
 * can wire the button up against a real route shape.
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'

const ALLOWED_LABELS = new Set([
  'ai.hermes.gateway',
  'ai.hermes.workspace',
  'ai.hermes.dashboard',
])

export const Route = createFileRoute('/api/system/restart/$label')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const label = params.label
        if (!ALLOWED_LABELS.has(label)) {
          return json(
            {
              ok: false,
              error: `Unknown label. Allowed: ${[...ALLOWED_LABELS].join(', ')}`,
            },
            { status: 400 },
          )
        }
        return json(
          {
            ok: false,
            error: 'Not Implemented',
            label,
            note: 'Restart action is a stub in Phase 3E Part 1. Use `launchctl kickstart -k gui/<uid>/<label>` from a terminal until Part 2 ships.',
          },
          { status: 501 },
        )
      },
    },
  },
})
