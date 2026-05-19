import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { TaskDiffResult } from '../../../server/multi-agent/diff-manager'
import type {
  MultiAgentEvent,
  MultiAgentProfile,
  MultiAgentProject,
  MultiAgentTask,
  MultiAgentValidation,
} from '../../../server/multi-agent/types'
import { MultiAgentDiffPanel, MultiAgentTaskDetail } from './multi-agent-task-detail'
import { MultiAgentValidationPanel } from './multi-agent-validation-panel'

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
    productBrief: {
      goal: 'Ship a clearer operator experience',
      userStory: 'As an operator, I understand why this task matters.',
      successMetrics: ['activation: task accepted by PM'],
      nonGoals: ['billing changes'],
    },
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

function validation(overrides: Partial<MultiAgentValidation> = {}): MultiAgentValidation {
  return {
    id: 'validation-1',
    taskId: 'task-1',
    type: 'test',
    command: 'pnpm test',
    status: 'passed',
    exitCode: 0,
    outputSummary: 'all tests passed',
    outputArtifactId: 'artifact-1',
    startedAt: now,
    finishedAt: now,
    ...overrides,
  }
}

function summaryProps(overrides: Partial<React.ComponentProps<typeof MultiAgentTaskDetail>> = {}) {
  return {
    task: task(),
    projects: [project],
    profiles: [profile],
    events: [event()],
    finalSummary: 'Implemented memory hooks and saved context.',
    summarySaving: false,
    summarySaveError: null,
    summarySavedPath: null,
    onSaveSummary: () => undefined,
    ...overrides,
  }
}

function skillDebugProps(overrides: Partial<React.ComponentProps<typeof MultiAgentTaskDetail>> = {}) {
  return {
    task: task(),
    projects: [project],
    profiles: [profile],
    events: [
      event({
        id: 'event-skills',
        type: 'run.started',
        message: 'Started Hermes worker with contextual skills',
        payload: {
          loadedSkills: ['test-driven-development', 'systematic-debugging', 'frontend-design'],
        },
      }),
    ],
    loadedSkills: ['test-driven-development', 'systematic-debugging', 'frontend-design'],
    ...overrides,
  }
}

describe('MultiAgentValidationPanel', () => {
  it('renders validation commands and latest validation results', () => {
    const html = renderToStaticMarkup(
      <MultiAgentValidationPanel
        task={task()}
        validations={[validation(), validation({ id: 'validation-2', type: 'build', command: 'pnpm build', status: 'failed', exitCode: 1, outputSummary: 'build failed' })]}
        runningType={null}
        error={null}
        onValidate={() => undefined}
      />,
    )

    expect(html).toContain('Run test')
    expect(html).toContain('Run build')
    expect(html).toContain('test')
    expect(html).toContain('passed')
    expect(html).toContain('all tests passed')
    expect(html).toContain('build')
    expect(html).toContain('failed')
    expect(html).toContain('build failed')
  })

  it('disables validation controls until a worktree exists and shows running state', () => {
    const noWorktree = renderToStaticMarkup(
      <MultiAgentValidationPanel task={task({ worktreePath: null })} validations={[]} runningType={null} error={null} onValidate={() => undefined} />,
    )
    const running = renderToStaticMarkup(
      <MultiAgentValidationPanel task={task()} validations={[]} runningType="test" error="validation unavailable" onValidate={() => undefined} />,
    )

    expect(noWorktree).toContain('Create or start a worktree before validation')
    expect(noWorktree).toContain('disabled')
    expect(running).toContain('Running test')
    expect(running).toContain('validation unavailable')
  })
})

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
    expect(html).toContain('Product Brief')
    expect(html).toContain('Ship a clearer operator experience')
    expect(html).toContain('As an operator, I understand why this task matters.')
    expect(html).toContain('activation: task accepted by PM')
    expect(html).toContain('billing changes')
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

  it('renders final summary and optional Obsidian save controls', () => {
    const html = renderToStaticMarkup(<MultiAgentTaskDetail {...summaryProps()} />)

    expect(html).toContain('Final Summary')
    expect(html).toContain('Implemented memory hooks and saved context.')
    expect(html).toContain('Save summary to Obsidian')
  })

  it('renders summary save states and saved path', () => {
    const saving = renderToStaticMarkup(<MultiAgentTaskDetail {...summaryProps({ summarySaving: true })} />)
    const saved = renderToStaticMarkup(<MultiAgentTaskDetail {...summaryProps({ summarySavedPath: '/vault/Hermes/Multi-Agent Runs/task-1.md' })} />)
    const error = renderToStaticMarkup(<MultiAgentTaskDetail {...summaryProps({ summarySaveError: 'Cannot write note' })} />)

    expect(saving).toContain('Saving summary…')
    expect(saved).toContain('/vault/Hermes/Multi-Agent Runs/task-1.md')
    expect(error).toContain('Cannot write note')
  })

  it('renders a debug panel for skills loaded for this run', () => {
    const html = renderToStaticMarkup(<MultiAgentTaskDetail {...skillDebugProps()} />)

    expect(html).toContain('Skills loaded for this run')
    expect(html).toContain('test-driven-development')
    expect(html).toContain('systematic-debugging')
    expect(html).toContain('frontend-design')
  })
})
