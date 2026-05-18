import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { MultiAgentEvent, MultiAgentProfile, MultiAgentProject, MultiAgentTask } from '../../../server/multi-agent/types'
import { MultiAgentTaskDetail } from './multi-agent-task-detail'

const now = '2026-05-18T00:00:00.000Z'

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

const profile: MultiAgentProfile = {
  id: 'backend-engineer',
  name: 'Backend Engineer',
  role: 'backend-engineer',
  runtime: 'hermes-agent',
  model: null,
  skills: ['test-driven-development'],
  enabledToolsets: ['terminal', 'file'],
  permissionPolicy: 'ask-risky',
  createdAt: now,
  updatedAt: now,
}

function task(overrides: Partial<MultiAgentTask> = {}): MultiAgentTask {
  return {
    id: 'task-1',
    projectId: 'workspace',
    title: 'Run worker',
    description: 'Run a worker and show logs',
    status: 'running',
    priority: 'medium',
    assigneeProfileId: 'backend-engineer',
    parentIds: [],
    childIds: [],
    workPacket: 'Execute the work packet',
    acceptanceCriteria: ['streams logs'],
    branchName: 'hermes/task-1-run-worker',
    worktreePath: '/repo/.hermes-worktrees/task-1-run-worker',
    latestRunId: 'run-1',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

function event(overrides: Partial<MultiAgentEvent> = {}): MultiAgentEvent {
  return {
    id: 'event-1',
    taskId: 'task-1',
    runId: 'run-1',
    type: 'run.log',
    message: 'worker says hi',
    payload: { stream: 'stdout' },
    createdAt: now,
    ...overrides,
  }
}

describe('MultiAgentTaskDetail', () => {
  it('renders the selected task work packet, worktree, and live events from an extracted component', () => {
    const html = renderToStaticMarkup(
      <MultiAgentTaskDetail
        task={task()}
        projects={[project]}
        profiles={[profile]}
        events={[event()]}
      />,
    )

    expect(html).toContain('Task Detail')
    expect(html).toContain('Run worker')
    expect(html).toContain('Backend Engineer')
    expect(html).toContain('task-1-run-worker')
    expect(html).toContain('Execute the work packet')
    expect(html).toContain('streams logs')
    expect(html).toContain('Events / Live Log')
    expect(html).toContain('worker says hi')
  })

  it('renders an empty selection state without requiring board internals', () => {
    const html = renderToStaticMarkup(
      <MultiAgentTaskDetail task={null} projects={[project]} profiles={[profile]} events={[]} />,
    )

    expect(html).toContain('Select a task to inspect')
  })
})
