import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { MultiAgentProject, MultiAgentTask } from './types'
import {
  buildTaskBranchName,
  buildTaskWorktreePath,
  createTaskWorktree,
  getWorktreeStatus,
  removeTaskWorktree,
} from './worktree-manager'

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function initRepo(): string {
  const repoPath = mkdtempSync(join(tmpdir(), 'hermes-ma-worktree-repo-'))
  git(repoPath, ['init', '-b', 'main'])
  git(repoPath, ['config', 'user.email', 'test@example.com'])
  git(repoPath, ['config', 'user.name', 'Test User'])
  writeFileSync(join(repoPath, 'README.md'), '# test repo\n', 'utf-8')
  git(repoPath, ['add', 'README.md'])
  git(repoPath, ['commit', '-m', 'initial commit'])
  return repoPath
}

function project(repoPath = initRepo()): MultiAgentProject {
  return {
    id: 'project-1',
    name: 'Project 1',
    repoPath,
    defaultBranch: 'main',
    worktreeRoot: join(repoPath, '.hermes-worktrees'),
    githubRemote: null,
    graphifyGraphPath: null,
    obsidianPath: null,
    createdAt: '2026-05-16T19:00:00.000Z',
    updatedAt: '2026-05-16T19:00:00.000Z',
  }
}

function task(overrides: Partial<MultiAgentTask> = {}): MultiAgentTask {
  return {
    id: overrides.id ?? 'task-123',
    projectId: overrides.projectId ?? 'project-1',
    title: overrides.title ?? 'Create Worktree',
    description: overrides.description ?? '',
    status: overrides.status ?? 'backlog',
    priority: overrides.priority ?? 'medium',
    assigneeProfileId: overrides.assigneeProfileId ?? 'backend-engineer',
    parentIds: overrides.parentIds ?? [],
    childIds: overrides.childIds ?? [],
    workPacket: overrides.workPacket ?? '',
    acceptanceCriteria: overrides.acceptanceCriteria ?? [],
    branchName: overrides.branchName,
    worktreePath: overrides.worktreePath,
    latestRunId: overrides.latestRunId,
    createdAt: overrides.createdAt ?? '2026-05-16T19:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-05-16T19:00:00.000Z',
  }
}

describe('multi-agent worktree manager', () => {
  it('builds safe branch and worktree paths from task metadata', () => {
    const repoPath = initRepo()
    const resolvedProject = project(repoPath)
    const resolvedTask = task({ id: 'task-123', title: 'Add Store & Events!' })

    expect(buildTaskBranchName(resolvedTask)).toBe('hermes/task-task-123-add-store-events')
    expect(buildTaskWorktreePath(resolvedProject, resolvedTask)).toBe(
      join(repoPath, '.hermes-worktrees', 'task-task-123-add-store-events'),
    )
  })

  it('creates a git worktree and branch under the project worktree root', async () => {
    const resolvedProject = project()
    const resolvedTask = task({ id: 'task-123', title: 'Implement worktree manager' })

    const result = await createTaskWorktree(resolvedProject, resolvedTask)

    expect(result.branchName).toBe('hermes/task-task-123-implement-worktree-manager')
    expect(result.worktreePath.startsWith(resolve(resolvedProject.worktreeRoot))).toBe(true)
    expect(existsSync(join(result.worktreePath, 'README.md'))).toBe(true)
    expect(git(resolvedProject.repoPath, ['branch', '--list', result.branchName])).toContain(result.branchName)
  })

  it('returns the existing worktree for duplicate creation of the same task', async () => {
    const resolvedProject = project()
    const resolvedTask = task({ id: 'task-123', title: 'Duplicate Safe' })

    const first = await createTaskWorktree(resolvedProject, resolvedTask)
    const second = await createTaskWorktree(resolvedProject, resolvedTask)

    expect(second).toEqual(first)
  })

  it('reports modified and untracked files in a task worktree', async () => {
    const resolvedProject = project()
    const result = await createTaskWorktree(resolvedProject, task())
    writeFileSync(join(result.worktreePath, 'README.md'), '# changed\n', 'utf-8')
    writeFileSync(join(result.worktreePath, 'new-file.txt'), 'new\n', 'utf-8')

    const status = getWorktreeStatus(result.worktreePath)

    expect(status.clean).toBe(false)
    expect(status.changedFiles).toContain('README.md')
    expect(status.changedFiles).toContain('new-file.txt')
    expect(status.porcelain).toContain('README.md')
  })

  it('refuses unsafe task ids before constructing branch names', () => {
    expect(() => buildTaskBranchName(task({ id: '../bad' }))).toThrow(/Unsafe task id/)
    expect(() => buildTaskBranchName(task({ id: 'task/123' }))).toThrow(/Unsafe task id/)
  })

  it('refuses worktree paths outside the project worktree root', () => {
    const resolvedProject = project()
    const outsidePath = join(tmpdir(), 'outside-worktree')

    expect(() => removeTaskWorktree(resolvedProject, outsidePath, 'hermes/task-task-123-safe')).toThrow(
      /outside worktree root/,
    )
  })

  it('removes a clean managed worktree when explicitly requested', async () => {
    const resolvedProject = project()
    const result = await createTaskWorktree(resolvedProject, task({ id: 'task-456', title: 'Remove Me' }))

    removeTaskWorktree(resolvedProject, result.worktreePath, result.branchName)

    expect(existsSync(result.worktreePath)).toBe(false)
    expect(git(resolvedProject.repoPath, ['branch', '--list', result.branchName])).toBe('')
  })

  it('refuses to remove a dirty worktree unless force is true', async () => {
    const resolvedProject = project()
    const result = await createTaskWorktree(resolvedProject, task({ id: 'task-789', title: 'Dirty Remove' }))
    writeFileSync(join(result.worktreePath, 'dirty.txt'), 'dirty\n', 'utf-8')

    expect(() => removeTaskWorktree(resolvedProject, result.worktreePath, result.branchName)).toThrow(
      /dirty worktree/,
    )

    removeTaskWorktree(resolvedProject, result.worktreePath, result.branchName, { force: true })
    expect(existsSync(result.worktreePath)).toBe(false)
  })

  it('does not treat repo root as removable worktree', () => {
    const resolvedProject = project()
    const head = readFileSync(join(resolvedProject.repoPath, 'README.md'), 'utf-8')

    expect(() => removeTaskWorktree(resolvedProject, resolvedProject.repoPath, 'main', { force: true })).toThrow(
      /Refusing to remove repository root/,
    )
    expect(readFileSync(join(resolvedProject.repoPath, 'README.md'), 'utf-8')).toBe(head)
  })
})
