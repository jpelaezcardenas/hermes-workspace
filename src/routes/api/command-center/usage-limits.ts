import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterUsageLimits } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/usage-limits')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterUsageLimits),
    },
  },
})
