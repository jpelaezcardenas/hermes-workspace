import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterMemoryArtifacts } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/memory-artifacts')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterMemoryArtifacts),
    },
  },
})
