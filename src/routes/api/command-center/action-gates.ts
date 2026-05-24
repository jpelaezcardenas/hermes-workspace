import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterActionGates } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/action-gates')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterActionGates),
    },
  },
})
