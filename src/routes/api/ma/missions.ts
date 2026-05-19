import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { createMission, listMissions } from '../../../server/multi-agent/store'
import type { MultiAgentMissionStatus, MultiAgentProductBrief } from '../../../server/multi-agent/types'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

const MISSION_STATUSES = new Set<MultiAgentMissionStatus>([
  'draft',
  'planned',
  'running',
  'waiting_approval',
  'reviewing',
  'blocked',
  'completed',
  'failed',
  'cancelled',
])

function trimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function stringArray(value: unknown, fieldName: string): string[] {
  if (value === undefined) return []
  if (!Array.isArray(value)) throw new Error(`${fieldName} must be an array`)
  return value.map((item) => trimmedString(item)).filter(Boolean)
}

function parseStatus(value: unknown): MultiAgentMissionStatus | undefined {
  const status = trimmedString(value)
  if (!status) return undefined
  if (!MISSION_STATUSES.has(status as MultiAgentMissionStatus)) {
    throw new Error(`Unsupported mission status: ${status}`)
  }
  return status as MultiAgentMissionStatus
}

function parseProductBrief(value: unknown): MultiAgentProductBrief {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('productBrief is required')
  }
  const brief = value as Record<string, unknown>
  const productBrief = {
    goal: trimmedString(brief.goal),
    userStory: trimmedString(brief.userStory ?? brief.user_story),
    successMetrics: stringArray(brief.successMetrics ?? brief.success_metrics, 'successMetrics'),
    nonGoals: stringArray(brief.nonGoals ?? brief.non_goals, 'nonGoals'),
  }
  if (!productBrief.goal) throw new Error('productBrief.goal is required')
  return productBrief
}

export const Route = createFileRoute('/api/ma/missions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const url = new URL(request.url)
          const projectId = url.searchParams.get('project_id') ?? url.searchParams.get('projectId') ?? undefined
          const status = parseStatus(url.searchParams.get('status'))
          const missions = listMissions(getRouteStore(), { projectId, status })
          return json({ ok: true, missions })
        } catch (err) {
          return json({ ok: false, missions: [], error: safeError(err) }, { status: 400 })
        }
      },
      POST: async ({ request }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const projectId = trimmedString(body.projectId ?? body.project_id)
          const title = trimmedString(body.title)
          if (!projectId) throw new Error('projectId is required')
          if (!title) throw new Error('title is required')

          const mission = createMission(getRouteStore(), {
            projectId,
            title,
            status: parseStatus(body.status),
            productBrief: parseProductBrief(body.productBrief ?? body.product_brief),
            constraints: stringArray(body.constraints, 'constraints'),
            desiredOutput: trimmedString(body.desiredOutput ?? body.desired_output),
          })

          return json({ ok: true, mission }, { status: 201 })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
