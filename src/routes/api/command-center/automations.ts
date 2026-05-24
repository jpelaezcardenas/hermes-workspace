import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterAutomations } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/automations')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterAutomations),
    },
  },
})
