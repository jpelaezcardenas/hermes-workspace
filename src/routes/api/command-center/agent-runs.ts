import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterAgentRuns } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/agent-runs')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterAgentRuns),
    },
  },
})
