import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { listConfiguredProjects } from './-project-config'
import { requireAuthenticated, safeError } from './-helpers'

export const Route = createFileRoute('/api/ma/projects')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const projects = listConfiguredProjects()
          return json({ ok: true, projects })
        } catch (err) {
          return json({ ok: false, projects: [], error: safeError(err) }, { status: 500 })
        }
      },
    },
  },
})
