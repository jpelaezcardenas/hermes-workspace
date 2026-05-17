import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import type { MultiAgentProject, MultiAgentProjectValidation } from './types'

export type ResolveProjectInput = {
  id?: string
  name?: string
  repoPath?: string
  path?: string
  defaultBranch?: string | null
  worktreeRoot?: string | null
  githubRemote?: string | null
  gitRemote?: string | null
  graphifyGraphPath?: string | null
  obsidianPath?: string | null
  validation?: MultiAgentProjectValidation
  now?: () => string
}

function nowIso(): string {
  return new Date().toISOString()
}

function gitOutput(repoPath: string, args: string[]): string | null {
  try {
    const output = execFileSync('git', ['-C', repoPath, ...args], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5_000,
    }).trim()
    return output || null
  } catch {
    return null
  }
}

function safeProjectId(repoPath: string): string {
  return Buffer.from(repoPath).toString('base64url')
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}

export function isGitRepo(repoPath: string): boolean {
  return gitOutput(repoPath, ['rev-parse', '--is-inside-work-tree']) === 'true'
}

export function detectDefaultBranch(repoPath: string): string {
  const originHead = gitOutput(repoPath, ['symbolic-ref', '--short', 'refs/remotes/origin/HEAD'])
  const originBranch = originHead?.replace(/^origin\//, '')
  if (originBranch) return originBranch

  const currentBranch = gitOutput(repoPath, ['rev-parse', '--abbrev-ref', 'HEAD'])
  if (currentBranch && currentBranch !== 'HEAD') return currentBranch

  const mainExists = gitOutput(repoPath, ['rev-parse', '--verify', 'main'])
  if (mainExists) return 'main'

  return 'main'
}

export function detectGithubRemote(repoPath: string): string | null {
  const origin = gitOutput(repoPath, ['remote', 'get-url', 'origin'])
  if (origin) return origin

  const remotes = gitOutput(repoPath, ['remote', '-v'])
  const githubLine = remotes
    ?.split('\n')
    .map((line) => line.trim())
    .find((line) => line.includes('github.com'))
  if (!githubLine) return null

  const [, remoteUrl] = githubLine.split(/\s+/)
  return remoteUrl || null
}

export function defaultWorktreeRoot(repoPath: string): string {
  return join(repoPath, '.hermes-worktrees')
}

export function resolveProject(input: ResolveProjectInput): MultiAgentProject {
  const rawPath = input.repoPath ?? input.path
  if (!rawPath?.trim()) throw new Error('Project repoPath is required')

  const repoPath = resolve(rawPath)
  if (!existsSync(repoPath)) throw new Error(`Project path does not exist: ${repoPath}`)
  if (!isDirectory(repoPath)) throw new Error(`Project path is not a directory: ${repoPath}`)
  if (!isGitRepo(repoPath)) throw new Error(`Project path is not a git repository: ${repoPath}`)

  const timestamp = input.now?.() ?? nowIso()
  const githubRemote = input.githubRemote ?? input.gitRemote ?? detectGithubRemote(repoPath)

  return {
    id: input.id ?? safeProjectId(repoPath),
    name: input.name ?? basename(repoPath),
    repoPath,
    defaultBranch: input.defaultBranch || detectDefaultBranch(repoPath),
    worktreeRoot: input.worktreeRoot ? resolve(input.worktreeRoot) : defaultWorktreeRoot(repoPath),
    githubRemote,
    graphifyGraphPath: input.graphifyGraphPath ?? null,
    obsidianPath: input.obsidianPath ?? null,
    validation: input.validation,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}
