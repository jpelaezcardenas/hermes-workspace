import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { MultiAgentArtifact, MultiAgentTask, MultiAgentValidation } from '../../../server/multi-agent/types'
import { MultiAgentPrPanel } from './multi-agent-pr-panel'

const now = '2026-05-18T13:00:00.000Z'

function task(overrides: Partial<MultiAgentTask> = {}): MultiAgentTask {
  return {
    id: 'task-1',
    projectId: 'workspace',
    title: 'Create PR',
    description: 'Open a pull request',
    status: 'review',
    priority: 'medium',
    assigneeProfileId: 'backend-engineer',
    parentIds: [],
    childIds: [],
    workPacket: 'Summary body',
    acceptanceCriteria: [],
    branchName: 'hermes/task-1-demo',
    worktreePath: '/repo/.worktrees/task-1',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

function validation(overrides: Partial<MultiAgentValidation> = {}): MultiAgentValidation {
  return {
    id: 'validation-1',
    taskId: 'task-1',
    type: 'test',
    command: 'pnpm test',
    status: 'passed',
    exitCode: 0,
    ...overrides,
  }
}

function artifact(overrides: Partial<MultiAgentArtifact> = {}): MultiAgentArtifact {
  return {
    id: 'artifact-1',
    taskId: 'task-1',
    type: 'github-pr',
    pathOrUrl: 'https://github.com/example/repo/pull/1',
    title: 'Create PR',
    createdAt: now,
    ...overrides,
  }
}

describe('MultiAgentPrPanel', () => {
  it('renders PR readiness, validation status, and existing PR links', () => {
    const html = renderToStaticMarkup(
      <MultiAgentPrPanel task={task()} validations={[validation()]} prArtifacts={[artifact()]} creating={false} error={null} onCreatePr={() => undefined} />,
    )

    expect(html).toContain('Pull Request')
    expect(html).toContain('hermes/task-1-demo')
    expect(html).toContain('validation passed')
    expect(html).toContain('Create PR')
    expect(html).toContain('https://github.com/example/repo/pull/1')
  })

  it('disables PR creation until worktree branch and validation are ready', () => {
    const noWorktree = renderToStaticMarkup(
      <MultiAgentPrPanel task={task({ worktreePath: null, branchName: null })} validations={[]} prArtifacts={[]} creating={false} error={null} onCreatePr={() => undefined} />,
    )
    const noValidation = renderToStaticMarkup(
      <MultiAgentPrPanel task={task()} validations={[]} prArtifacts={[]} creating error="approval required" onCreatePr={() => undefined} />,
    )

    expect(noWorktree).toContain('Worktree and branch are required')
    expect(noWorktree).toContain('disabled')
    expect(noValidation).toContain('No passed validation')
    expect(noValidation).toContain('Creating PR')
    expect(noValidation).toContain('approval required')
  })
})
