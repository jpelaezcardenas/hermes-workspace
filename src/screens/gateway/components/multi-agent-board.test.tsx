import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { MultiAgentMission, MultiAgentProject } from '../../../server/multi-agent/types'
import { MultiAgentCreateMissionDialog, MultiAgentMissionPanel } from './multi-agent-board'

const now = '2026-05-19T10:00:00.000Z'

const project: MultiAgentProject = {
  id: 'workspace',
  name: 'Workspace',
  repoPath: '/repo',
  defaultBranch: 'main',
  worktreeRoot: '/repo/.hermes-worktrees',
  githubRemote: null,
  createdAt: now,
  updatedAt: now,
}

const mission: MultiAgentMission = {
  id: 'mission-1',
  projectId: 'workspace',
  title: 'Real multi-agent team',
  status: 'draft',
  productBrief: {
    goal: 'Coordinate several Hermes workers from one mission.',
    userStory: 'As an operator, I create one mission before planning tasks.',
    successMetrics: ['planner creates task graph'],
    nonGoals: ['remote worker fleet'],
  },
  constraints: ['single-user local'],
  desiredOutput: 'Mission ready for planning.',
  taskIds: ['task-1', 'task-2'],
  createdAt: now,
  updatedAt: now,
}

describe('MultiAgent mission UI', () => {
  it('renders mission list and selected mission context', () => {
    const html = renderToStaticMarkup(
      <MultiAgentMissionPanel
        missions={[mission]}
        projects={[project]}
        selectedMissionId="mission-1"
        loading={false}
        error={null}
        onSelect={() => undefined}
        onCreateMission={() => undefined}
        onPlanMission={() => undefined}
        planningMissionId={null}
      />,
    )

    expect(html).toContain('Mission Control')
    expect(html).toContain('Real multi-agent team')
    expect(html).toContain('Coordinate several Hermes workers from one mission.')
    expect(html).toContain('2 tasks')
    expect(html).toContain('Workspace')
    expect(html).toContain('Plan mission')
  })

  it('renders mission planning state', () => {
    const html = renderToStaticMarkup(
      <MultiAgentMissionPanel
        missions={[mission]}
        projects={[project]}
        selectedMissionId="mission-1"
        loading={false}
        error={null}
        onSelect={() => undefined}
        onCreateMission={() => undefined}
        onPlanMission={() => undefined}
        planningMissionId="mission-1"
      />,
    )

    expect(html).toContain('Planning…')
  })

  it('renders create mission dialog fields', () => {
    const html = renderToStaticMarkup(
      <MultiAgentCreateMissionDialog
        projects={[project]}
        creating={false}
        error={null}
        onCancel={() => undefined}
        onCreate={vi.fn()}
      />,
    )

    expect(html).toContain('Create Mission')
    expect(html).toContain('Mission Title')
    expect(html).toContain('Product Goal')
    expect(html).toContain('User Story')
    expect(html).toContain('Success Metrics')
    expect(html).toContain('Constraints')
    expect(html).toContain('Desired Output')
  })
})
