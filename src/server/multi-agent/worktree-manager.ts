import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, realpathSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import type { MultiAgentProject, MultiAgentTask } from './types'

export type TaskWorktreeResult = {
  branchName: string
  worktreePath: string
}

export type WorktreeStatus = {
  clean: boolean
  changedFiles: string[]
  porcelain: string
}

export type RemoveWorktreeOptions = {
  force?: boolean
}

const SAFE_TASK_ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,159}$/

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 10_000,
  }).trim()
}

function assertSafeTaskId(taskId: string): void {
  if (!SAFE_TASK_ID_PATTERN.test(taskId)) {
    throw new Error(`Unsafe task id: ${taskId}`)
  }
}

function slugifyTitle(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 64) || 'task'
  )
}

function isPathInside(parent: string, child: string): boolean {
  const relativePath = relative(resolve(parent), resolve(child))
  return relativePath === '' || (!relativePath.startsWith('..') && !relativePath.startsWith(sep))
}

function existingPath(path: string): string | null {
  try {
    return realpathSync(path)
  } catch {
    return null
  }
}

export function buildTaskBranchName(task: Pick<MultiAgentTask, 'id' | 'title'>): string {
  assertSafeTaskId(task.id)
  return `hermes/task-${task.id}-${slugifyTitle(task.title)}`
}

function worktreeDirName(task: Pick<MultiAgentTask, 'id' | 'title'>): string {
  assertSafeTaskId(task.id)
  return `task-${task.id}-${slugifyTitle(task.title)}`
}

export function buildTaskWorktreePath(
  project: Pick<MultiAgentProject, 'worktreeRoot'>,
  task: Pick<MultiAgentTask, 'id' | 'title'>,
): string {
  const worktreePath = resolve(project.worktreeRoot, worktreeDirName(task))
  assertWorktreePathInsideRoot(project, worktreePath)
  return worktreePath
}

function assertWorktreePathInsideRoot(
  project: Pick<MultiAgentProject, 'worktreeRoot'> & Partial<Pick<MultiAgentProject, 'repoPath'>>,
  worktreePath: string,
): void {
  const rootPath = resolve(project.worktreeRoot)
  const resolvedWorktreePath = resolve(worktreePath)
  if (!isPathInside(rootPath, resolvedWorktreePath) || rootPath === resolvedWorktreePath) {
    throw new Error(`Worktree path is outside worktree root: ${worktreePath}`)
  }
  if (project.repoPath && resolve(project.repoPath) === resolvedWorktreePath) {
    throw new Error('Refusing to use repository root as task worktree')
  }
}

function branchExists(repoPath: string, branchName: string): boolean {
  try {
    git(repoPath, ['rev-parse', '--verify', branchName])
    return true
  } catch {
    return false
  }
}

function worktreeList(repoPath: string): Array<{ path: string; branch: string | null }> {
  const output = git(repoPath, ['worktree', 'list', '--porcelain'])
  const entries: Array<{ path: string; branch: string | null }> = []
  let currentPath: string | null = null
  let currentBranch: string | null = null

  for (const line of output.split('\n')) {
    if (line.startsWith('worktree ')) {
      if (currentPath) entries.push({ path: currentPath, branch: currentBranch })
      currentPath = line.slice('worktree '.length)
      currentBranch = null
      continue
    }
    if (line.startsWith('branch ')) {
      currentBranch = line.slice('branch '.length).replace(/^refs\/heads\//, '')
    }
  }
  if (currentPath) entries.push({ path: currentPath, branch: currentBranch })
  return entries
}

function existingManagedWorktree(repoPath: string, branchName: string, worktreePath: string): boolean {
  const expectedPath = resolve(worktreePath)
  return worktreeList(repoPath).some(
    (entry) => entry.branch === branchName && resolve(entry.path) === expectedPath,
  )
}

export async function createTaskWorktree(
  project: MultiAgentProject,
  task: MultiAgentTask,
): Promise<TaskWorktreeResult> {
  const branchName = task.branchName ?? buildTaskBranchName(task)
  const worktreePath = task.worktreePath ? resolve(task.worktreePath) : buildTaskWorktreePath(project, task)
  assertWorktreePathInsideRoot(project, worktreePath)

  if (existingManagedWorktree(project.repoPath, branchName, worktreePath)) {
    return { branchName, worktreePath }
  }

  if (existsSync(worktreePath)) {
    throw new Error(`Worktree path already exists but is not registered for branch ${branchName}: ${worktreePath}`)
  }

  mkdirSync(project.worktreeRoot, { recursive: true })

  const args = ['worktree', 'add', worktreePath]
  if (!branchExists(project.repoPath, branchName)) {
    args.push('-b', branchName, project.defaultBranch)
  } else {
    args.push(branchName)
  }
  git(project.repoPath, args)

  return { branchName, worktreePath }
}

export function getWorktreeStatus(worktreePath: string): WorktreeStatus {
  const porcelain = git(worktreePath, ['status', '--porcelain'])
  const changedFiles = porcelain
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.slice(2).trim())
    .map((file) => file.split(' -> ').at(-1) || file)

  return {
    clean: changedFiles.length === 0,
    changedFiles,
    porcelain,
  }
}

export function removeTaskWorktree(
  project: MultiAgentProject,
  worktreePath: string,
  branchName: string,
  options: RemoveWorktreeOptions = {},
): void {
  const resolvedRepoPath = resolve(project.repoPath)
  const resolvedWorktreePath = resolve(worktreePath)

  if (resolvedWorktreePath === resolvedRepoPath) {
    throw new Error('Refusing to remove repository root as a worktree')
  }
  assertWorktreePathInsideRoot(project, resolvedWorktreePath)

  const realRepoPath = existingPath(resolvedRepoPath)
  const realWorktreePath = existingPath(resolvedWorktreePath)
  if (realRepoPath && realWorktreePath && realRepoPath === realWorktreePath) {
    throw new Error('Refusing to remove repository root as a worktree')
  }

  if (existsSync(resolvedWorktreePath)) {
    const status = getWorktreeStatus(resolvedWorktreePath)
    if (!status.clean && !options.force) {
      throw new Error(`Refusing to remove dirty worktree: ${resolvedWorktreePath}`)
    }
  }

  git(project.repoPath, ['worktree', 'remove', options.force ? '--force' : '', resolvedWorktreePath].filter(Boolean))

  if (branchName && branchName !== project.defaultBranch && branchExists(project.repoPath, branchName)) {
    git(project.repoPath, ['branch', '-D', branchName])
  }
}
