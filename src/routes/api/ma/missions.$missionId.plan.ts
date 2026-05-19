import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { loadState, planMissionTasks } from '../../../server/multi-agent/store'
import type { MultiAgentMission } from '../../../server/multi-agent/types'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'

function deterministicMissionPlan(mission: MultiAgentMission) {
  return [
    {
      title: `Architect plan for ${mission.title}`,
      description: 'Define the task graph, dependencies, risks, and execution boundaries for the mission.',
      assigneeProfileId: 'architect',
      priority: 'high' as const,
      workPacket: [
        `Mission goal: ${mission.productBrief.goal}`,
        `User story: ${mission.productBrief.userStory}`,
        `Constraints: ${mission.constraints.join('; ') || 'none'}`,
        'Produce an implementation graph and dependency notes.',
      ].join('\n'),
      acceptanceCriteria: [
        'Task graph boundaries are explicit',
        'Dependencies and approval risks are identified',
      ],
    },
    {
      title: `Implement core flow for ${mission.title}`,
      description: 'Build the backend/control-plane changes needed for the mission.',
      assigneeProfileId: 'backend-engineer',
      priority: 'medium' as const,
      workPacket: [
        `Implement the core flow for: ${mission.productBrief.goal}`,
        `Desired output: ${mission.desiredOutput || 'working mission slice'}`,
      ].join('\n'),
      acceptanceCriteria: [
        'Core behavior is persisted and observable',
        'Generated work remains linked to the mission',
      ],
    },
    {
      title: `Validate mission output for ${mission.title}`,
      description: 'Run QA/review validation for the mission output and summarize readiness.',
      assigneeProfileId: 'qa-validator',
      priority: 'medium' as const,
      workPacket: [
        'Validate mission output against success metrics:',
        ...mission.productBrief.successMetrics.map((metric) => `- ${metric}`),
      ].join('\n'),
      acceptanceCriteria: [
        'Validation evidence is attached to the mission tasks',
        'Remaining risks are documented before approval',
      ],
    },
  ]
}

export const Route = createFileRoute('/api/ma/missions/$missionId/plan')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const store = getRouteStore()
          const state = loadState(store.stateFile, { now: store.now })
          const mission = state.missions[params.missionId]
          if (!mission) return json({ ok: false, error: 'Mission not found' }, { status: 404 })

          const tasks = planMissionTasks(store, mission.id, deterministicMissionPlan(mission))
          const updatedMission = loadState(store.stateFile, { now: store.now }).missions[mission.id]
          return json({ ok: true, mission: updatedMission, tasks })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
