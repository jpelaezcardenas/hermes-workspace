import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { buildAutopilotDispatchPlan } from '../../server/swarm-autopilot'
import { ensureDefaultSwarmLiveWorkers } from '../../server/swarm-live-workers'
import { DEFAULT_SWARM_AGENT_TEAM } from '../../server/swarm-roster'

type AutopilotRequest = {
  prompt?: unknown
  missionTitle?: unknown
  maxWorkers?: unknown
  dispatch?: unknown
  ensureLiveWorkers?: unknown
  waitForCheckpoint?: unknown
  checkpointPollSeconds?: unknown
  timeoutSeconds?: unknown
}

function numberInRange(value: unknown, fallback: number, min: number, max: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(min, Math.min(max, value))
    : fallback
}

export const Route = createFileRoute('/api/swarm-autopilot')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        let body: AutopilotRequest
        try {
          body = (await request.json()) as AutopilotRequest
        } catch {
          return json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
        }

        const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''
        if (!prompt) return json({ ok: false, error: 'prompt required' }, { status: 400 })
        if (prompt.length > 32_000) return json({ ok: false, error: 'prompt too long' }, { status: 400 })

        const missionTitle = typeof body.missionTitle === 'string' && body.missionTitle.trim()
          ? body.missionTitle.trim()
          : undefined
        const maxWorkers = numberInRange(body.maxWorkers, 8, 1, DEFAULT_SWARM_AGENT_TEAM.length)
        const plan = buildAutopilotDispatchPlan({
          prompt,
          missionTitle,
          workers: DEFAULT_SWARM_AGENT_TEAM,
          maxWorkers,
        })

        const setup = body.ensureLiveWorkers === false ? null : ensureDefaultSwarmLiveWorkers()
        if (body.dispatch !== true) {
          return json({
            ok: true,
            dryRun: true,
            plannedAt: Date.now(),
            setup,
            plan,
          })
        }

        const res = await fetch(new URL('/api/swarm-dispatch', request.url), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(request.headers.get('cookie') ? { cookie: request.headers.get('cookie') as string } : {}),
          },
          body: JSON.stringify({
            assignments: plan.assignments,
            missionTitle: plan.missionTitle,
            timeoutSeconds: numberInRange(body.timeoutSeconds, 300, 10, 600),
            waitForCheckpoint: body.waitForCheckpoint !== false,
            checkpointPollSeconds: numberInRange(body.checkpointPollSeconds, 90, 5, 240),
            allowAsync: true,
          }),
        })
        const dispatch = await res.json().catch(() => null)
        return json({
          ok: res.ok,
          dryRun: false,
          plannedAt: Date.now(),
          setup,
          plan,
          dispatch,
        }, { status: res.ok ? 200 : 502 })
      },
    },
  },
})
