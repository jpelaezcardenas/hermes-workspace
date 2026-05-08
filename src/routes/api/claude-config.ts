/**
 * Legacy /api/claude-config alias — delegates to the canonical Hermes config handlers.
 */
import { createFileRoute } from '@tanstack/react-router'

import {
  handleHermesConfigGet,
  handleHermesConfigPatch,
} from '../../server/hermes-config-route'

export const Route = createFileRoute('/api/claude-config')({
  server: {
    handlers: {
      GET: handleHermesConfigGet,
      PATCH: handleHermesConfigPatch,
    },
  },
})
