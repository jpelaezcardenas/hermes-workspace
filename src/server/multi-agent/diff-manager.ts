import { execFileSync } from 'node:child_process'
import { relative, resolve, sep } from 'node:path'

export type TaskDiffFile = {
  path: string
  status: string
}

export type TaskDiffResult = {
  clean: boolean
  changedFiles: string[]
  files: TaskDiffFile[]
  porcelain: string
  stat: string
  diff: string
}

export type GetTaskDiffOptions = {
  paths?: string[]
}

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 10_000,
  }).trim()
}

function assertSafeDiffPath(worktreePath: string, path: string): void {
  if (!path || path.includes('\0') || path.startsWith('/') || path.split(/[\\/]+/).includes('..')) {
    throw new Error(`Unsafe diff path: ${path}`)
  }
  const relativePath = relative(resolve(worktreePath), resolve(worktreePath, path))
  if (relativePath === '' || relativePath.startsWith('..') || relativePath.startsWith(sep)) {
    throw new Error(`Unsafe diff path: ${path}`)
  }
}

function pathArgs(worktreePath: string, paths?: string[]): string[] {
  if (!paths?.length) return []
  for (const path of paths) assertSafeDiffPath(worktreePath, path)
  return ['--', ...paths]
}

function parsePorcelainLine(line: string): TaskDiffFile | null {
  if (!line.trim()) return null
  const status = line.slice(0, 2)
  const rawPath = line.slice(2).trim()
  const path = rawPath.split(' -> ').at(-1) || rawPath
  return { path, status: status.trim() || status }
}

function untrackedFileDiff(worktreePath: string, files: TaskDiffFile[]): string {
  return files
    .filter((file) => file.status === '??')
    .map((file) => {
      try {
        return git(worktreePath, ['diff', '--no-index', '--', '/dev/null', file.path])
      } catch (err) {
        const output = (err as { stdout?: Buffer | string }).stdout
        if (Buffer.isBuffer(output)) return output.toString('utf-8').trim()
        if (typeof output === 'string') return output.trim()
        throw err
      }
    })
    .filter(Boolean)
    .join('\n')
}

export function getTaskDiff(worktreePath: string, options: GetTaskDiffOptions = {}): TaskDiffResult {
  const scopedPathArgs = pathArgs(worktreePath, options.paths)
  const porcelain = git(worktreePath, ['status', '--porcelain', ...scopedPathArgs])
  const files = porcelain
    .split('\n')
    .map(parsePorcelainLine)
    .filter((file): file is TaskDiffFile => Boolean(file))
  const changedFiles = files.map((file) => file.path)

  const trackedStat = files.length ? git(worktreePath, ['diff', '--stat', ...scopedPathArgs]) : ''
  const untrackedStat = files
    .filter((file) => file.status === '??')
    .map((file) => `${file.path} | untracked`)
    .join('\n')
  const stat = [trackedStat, untrackedStat].filter(Boolean).join('\n')
  const trackedDiff = files.length ? git(worktreePath, ['diff', ...scopedPathArgs]) : ''
  const untrackedDiff = files.length ? untrackedFileDiff(worktreePath, files) : ''
  const diff = [trackedDiff, untrackedDiff].filter(Boolean).join('\n')

  return {
    clean: files.length === 0,
    changedFiles,
    files,
    porcelain,
    stat,
    diff,
  }
}
