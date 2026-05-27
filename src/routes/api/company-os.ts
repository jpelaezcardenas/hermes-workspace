import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { readCompanyOsSnapshot } from '../../server/company-os-store'

export const Route = createFileRoute('/api/company-os')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const snapshot = await readCompanyOsSnapshot(url.searchParams.get('slug'))
        if (!snapshot) {
          return json(
            { ok: false, error: 'No Company OS workspace found' },
            { status: 404 },
          )
        }

        return json({ ok: true, snapshot })
      },
    },
  },
})
