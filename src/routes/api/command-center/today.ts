import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterToday } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/today')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterToday),
    },
  },
})
