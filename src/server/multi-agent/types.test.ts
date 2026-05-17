import { describe, expect, it } from 'vitest'
import type {
  MultiAgentApproval,
  MultiAgentEvent,
  MultiAgentProfile,
  MultiAgentProject,
  MultiAgentRun,
  MultiAgentState,
  MultiAgentTask,
  MultiAgentValidation,
} from './types'

describe('multi-agent domain types', () => {
  it('models the MVP create task → worktree → run lifecycle', () => {
    const now = '2026-05-16T18:10:00.000Z'
    const project: MultiAgentProject = {
      id: 'workspace',
      name: 'Hermes Workspace',
      repoPath: '/repo/hermes-workspace',
      defaultBranch: 'main',
      worktreeRoot: '/repo/hermes-workspace/.hermes-worktrees',
      githubRemote: 'git@github.com:example/hermes-workspace.git',
      graphifyGraphPath: null,
      obsidianPath: null,
      validation: { test: 'pnpm test', build: 'pnpm build' },
      createdAt: now,
      updatedAt: now,
    }
    const profile: MultiAgentProfile = {
      id: 'backend-engineer',
      name: 'Backend Engineer',
      role: 'backend-engineer',
      runtime: 'hermes-agent',
      skills: ['test-driven-development'],
      enabledToolsets: ['terminal', 'file'],
      permissionPolicy: 'ask-risky',
      createdAt: now,
      updatedAt: now,
    }
    const task: MultiAgentTask = {
      id: 'task-123',
      projectId: project.id,
      title: 'Add store',
      description: 'Persist multi-agent state',
      status: 'ready',
      priority: 'high',
      assigneeProfileId: profile.id,
      parentIds: [],
      childIds: [],
      workPacket: 'Implement file-backed store',
      acceptanceCriteria: ['Stores tasks', 'Handles corrupt JSON'],
      branchName: 'hermes/task-task-123-add-store',
      worktreePath: '/repo/hermes-workspace/.hermes-worktrees/task-task-123-add-store',
      latestRunId: 'run-123',
      createdAt: now,
      updatedAt: now,
    }
    const run: MultiAgentRun = {
      id: 'run-123',
      taskId: task.id,
      profileId: profile.id,
      status: 'queued',
    }
    const event: MultiAgentEvent = {
      id: 'event-123',
      taskId: task.id,
      runId: run.id,
      type: 'worktree.created',
      message: 'Created worktree',
      payload: { branchName: task.branchName },
      createdAt: now,
    }
    const approval: MultiAgentApproval = {
      id: 'approval-123',
      taskId: task.id,
      riskLevel: 'high',
      actionType: 'github.pr_create',
      title: 'Create PR',
      description: 'Push branch and create GitHub PR',
      payload: { branchName: task.branchName },
      status: 'pending',
      createdAt: now,
    }
    const validation: MultiAgentValidation = {
      id: 'validation-123',
      taskId: task.id,
      type: 'test',
      command: 'pnpm test',
      status: 'queued',
    }
    const state: MultiAgentState = {
      projects: { [project.id]: project },
      profiles: { [profile.id]: profile },
      tasks: { [task.id]: task },
      runs: { [run.id]: run },
      approvals: { [approval.id]: approval },
      validations: { [validation.id]: validation },
      artifacts: {},
      schemaVersion: 1,
      updatedAt: now,
    }

    expect(state.tasks[task.id]?.status).toBe('ready')
    expect(event.type).toBe('worktree.created')
    expect(approval.status).toBe('pending')
    expect(profile.runtime).toBe('hermes-agent')
  })
})
