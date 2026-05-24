import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterHomebaseRecords } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/homebase-records')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterHomebaseRecords),
    },
  },
})
