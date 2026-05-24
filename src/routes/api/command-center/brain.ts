import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterBrain } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/brain')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterBrain),
    },
  },
})
