import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { TaskDiffResult } from '../../../server/multi-agent/diff-manager'
import type { MultiAgentEvent, MultiAgentProfile, MultiAgentProject, MultiAgentTask } from '../../../server/multi-agent/types'
import { MultiAgentDiffPanel, MultiAgentTaskDetail } from './multi-agent-task-detail'

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

const changedDiff: TaskDiffResult = {
  clean: false,
  changedFiles: ['README.md', 'new-file.txt'],
  files: [
    { path: 'README.md', status: 'M' },
    { path: 'new-file.txt', status: '??' },
  ],
  porcelain: ' M README.md\n?? new-file.txt',
  stat: 'README.md | 2 +-\nnew-file.txt | untracked',
  diff: 'diff --git a/README.md b/README.md\n+# changed repo\ndiff --git a/new-file.txt b/new-file.txt\n+new file',
}

describe('MultiAgentDiffPanel', () => {
  it('renders changed files, stat, and unified diff content', () => {
    const html = renderToStaticMarkup(<MultiAgentDiffPanel diff={changedDiff} loading={false} error={null} />)

    expect(html).toContain('README.md')
    expect(html).toContain('new-file.txt')
    expect(html).toContain('README.md | 2 +-')
    expect(html).toContain('diff --git a/README.md b/README.md')
    expect(html).toContain('+new file')
  })

  it('renders clean and loading states', () => {
    const cleanHtml = renderToStaticMarkup(<MultiAgentDiffPanel diff={{ ...changedDiff, clean: true, changedFiles: [], files: [], stat: '', diff: '', porcelain: '' }} loading={false} error={null} />)
    const loadingHtml = renderToStaticMarkup(<MultiAgentDiffPanel diff={null} loading error={null} />)

    expect(cleanHtml).toContain('No changes in worktree')
    expect(loadingHtml).toContain('Loading diff')
  })
})

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
