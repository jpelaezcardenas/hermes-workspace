import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { getSkillSlashCommandDefinitions } from '../../server/skill-commands'

export const Route = createFileRoute('/api/skill-commands')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        return json({
          ok: true,
          commands: getSkillSlashCommandDefinitions(),
        })
      },
    },
  },
})
