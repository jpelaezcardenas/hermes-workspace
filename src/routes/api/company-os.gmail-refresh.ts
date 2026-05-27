import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { refreshCompanyOsGmailSnapshot } from '../../server/company-os-store'

export const Route = createFileRoute('/api/company-os/gmail-refresh')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json().catch(() => ({} as { slug?: string }))

        try {
          const result = await refreshCompanyOsGmailSnapshot(body.slug || 'unalignedos')
          return json({ ok: true, result })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
