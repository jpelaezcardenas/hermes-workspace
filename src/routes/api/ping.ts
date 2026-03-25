/**
 * /api/ping — lightweight status probe for Hermes gateway health checks.
 *
 * Provides a simple round-trip test that mirrors the existing gateway probe
 * so clients can verify Hermes connectivity without hitting heavier endpoints
 * like /api/sessions or /v1/models.
 *
 * Response shape is intentionally compatible with the legacy ping route
 * that the old chat UI expected.
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  HERMES_API,
  ensureGatewayProbed,
  getCapabilities,
} from '../../server/gateway-capabilities'

export const Route = createFileRoute('/api/ping')({
  server: {
    handlers: {
      GET: async () => {
        // Probe the gateway if not already done
        await ensureGatewayProbed()
        const caps = getCapabilities()

        const body = {
          ok: caps.health,
          status: caps.health ? 'ok' : 'down',
          hermesUrl: HERMES_API,
          capabilities: {
            health: caps.health,
            models: caps.models,
            sessions: caps.sessions,
            skills: caps.skills,
            memory: caps.memory,
            config: caps.config,
            jobs: caps.jobs,
          },
        }

        return json(body, {
          status: caps.health ? 200 : 503,
        })
      },
    },
  },
})
