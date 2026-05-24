import { createFileRoute } from '@tanstack/react-router'
import { commandCenterJson } from '../../../server/command-center-route'
import { buildCommandCenterVaultRefs } from '../../../server/command-center-sections'

export const Route = createFileRoute('/api/command-center/vault-refs')({
  server: {
    handlers: {
      GET: async ({ request }) =>
        commandCenterJson(request, buildCommandCenterVaultRefs),
    },
  },
})
