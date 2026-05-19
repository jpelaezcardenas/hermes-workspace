import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  buildSwarmLiveWorkersStartSummary,
  ensureDefaultSwarmLiveWorkers,
  planDefaultSwarmLiveWorkers,
  type SwarmWorkerStartResult,
} from '../../server/swarm-live-workers'

export const Route = createFileRoute('/api/swarm-live-workers')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        return json({ ok: true, workers: planDefaultSwarmLiveWorkers() })
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const setup = ensureDefaultSwarmLiveWorkers()
        const origin = new URL(request.url).origin
        const cookie = request.headers.get('cookie') ?? ''
        const results: Array<SwarmWorkerStartResult> = []

        for (const worker of setup.workers) {
          try {
            const res = await fetch(`${origin}/api/swarm-tmux-start`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(cookie ? { cookie } : {}),
              },
              body: JSON.stringify({ workerId: worker.id }),
            })
            const body = await res.json().catch(() => ({})) as Record<string, unknown>
            results.push({
              workerId: worker.id,
              ok: res.ok,
              started: body.started === true,
              alreadyRunning: body.alreadyRunning === true,
              error: res.ok ? undefined : String(body.error ?? `HTTP ${res.status}`),
            })
          } catch (error) {
            results.push({
              workerId: worker.id,
              ok: false,
              started: false,
              alreadyRunning: false,
              error: error instanceof Error ? error.message : String(error),
            })
          }
        }

        const summary = buildSwarmLiveWorkersStartSummary(results)
        return json({
          ok: summary.ok,
          setup,
          start: {
            summary,
            results,
          },
        }, { status: summary.ok ? 200 : 207 })
      },
    },
  },
})
