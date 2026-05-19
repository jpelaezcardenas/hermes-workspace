import { describe, expect, it } from 'vitest'
import {
  buildAutopilotDispatchPlan,
  buildSwarmWorkPacket,
  selectSwarmWorkersForPrompt,
} from './swarm-autopilot'
import { DEFAULT_SWARM_AGENT_TEAM } from './swarm-roster'

describe('swarm autopilot routing', () => {
  it('selects practical specialist workers from prompt context instead of abstract fallback agents', () => {
    const selected = selectSwarmWorkersForPrompt(
      'Implement a Telegram webhook integration with backend API, React UI status panel, tests, security review and docs',
      DEFAULT_SWARM_AGENT_TEAM,
    )

    expect(selected.map((item) => item.workerId)).toEqual([
      'swarm7',
      'swarm4',
      'swarm6',
      'swarm8',
      'swarm10',
      'swarm11',
      'swarm14',
      'swarm3',
    ])
    expect(selected.every((item) => item.score > 0)).toBe(true)
  })

  it('builds role-specific work packets with constraints and checkpoint contract', () => {
    const packet = buildSwarmWorkPacket({
      missionTitle: 'Telegram agent room MVP',
      userPrompt: 'Add bot-to-bot Telegram agent room support.',
      worker: DEFAULT_SWARM_AGENT_TEAM.find((worker) => worker.id === 'swarm7')!,
      rationale: 'Integration lane owns Telegram/webhooks.',
      dependsOn: ['swarm3'],
      reviewRequired: true,
    })

    expect(packet).toContain('Role: Integration Agent')
    expect(packet).toContain('Goal: Telegram agent room MVP')
    expect(packet).toContain('Context: Add bot-to-bot Telegram agent room support.')
    expect(packet).toContain('Relevant dependencies: swarm3')
    expect(packet).toContain('Never print or persist secrets')
    expect(packet).toContain('STATE:')
    expect(packet).toContain('FILES_CHANGED:')
    expect(packet).toContain('NEXT_ACTION:')
  })

  it('creates an end-to-end dispatch plan including conductor coordination and review dependencies', () => {
    const plan = buildAutopilotDispatchPlan({
      prompt: 'Build backend API and frontend dashboard, run QA, security review, update docs',
      missionTitle: 'Task 18 autopilot routing',
      workers: DEFAULT_SWARM_AGENT_TEAM,
      maxWorkers: 8,
    })

    expect(plan.missionTitle).toBe('Task 18 autopilot routing')
    expect(plan.assignments[0]).toMatchObject({
      workerId: 'swarm1',
      rationale: 'CTO / Conductor coordinates the swarm plan and approval gates.',
      dependsOn: [],
      reviewRequired: false,
    })
    const ids = plan.assignments.map((assignment) => assignment.workerId)
    expect(ids).toContain('swarm4')
    expect(ids).toContain('swarm6')
    expect(ids).toContain('swarm8')
    expect(ids).toContain('swarm10')
    expect(ids).toContain('swarm14')
    expect(ids).toContain('swarm11')

    const reviewer = plan.assignments.find((assignment) => assignment.workerId === 'swarm10')
    expect(reviewer?.dependsOn).toEqual(expect.arrayContaining(['swarm4', 'swarm6']))
    expect(reviewer?.task).toContain('Review gate')

    expect(plan.unassigned).toEqual([])
  })
})
