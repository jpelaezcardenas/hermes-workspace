import { execFileSync } from 'node:child_process'
import type { MultiAgentValidation } from './types'

export type GitHubPrPreflightCheckName =
  | 'gh.version'
  | 'gh.auth'
  | 'git.remote'
  | 'git.branch'
  | 'validation.status'

export type GitHubPrPreflightCheck = {
  name: GitHubPrPreflightCheckName
  ok: boolean
  message: string
}

export type GitHubPrPreflight = {
  ok: boolean
  checks: GitHubPrPreflightCheck[]
}

export type ExecFile = (command: string, args: string[], options?: { cwd?: string }) => string

export type GitHubPrPreflightInput = {
  worktreePath: string
  branchName: string
  validations: MultiAgentValidation[]
  execFile?: ExecFile
}

export type BuildGitHubPrCommandInput = {
  title: string
  body: string
  baseBranch: string
  headBranch: string
  draft?: boolean
}

function defaultExecFile(command: string, args: string[], options: { cwd?: string } = {}): string {
  return execFileSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 20_000,
  }).trim()
}

function check(name: GitHubPrPreflightCheckName, fn: () => string, okMessage: string): GitHubPrPreflightCheck {
  try {
    const output = fn()
    return { name, ok: true, message: output || okMessage }
  } catch (err) {
    return { name, ok: false, message: err instanceof Error ? err.message : String(err) }
  }
}

export function getGitHubPrPreflight(input: GitHubPrPreflightInput): GitHubPrPreflight {
  const execFile = input.execFile ?? defaultExecFile
  const checks: GitHubPrPreflightCheck[] = [
    check('gh.version', () => execFile('gh', ['--version']), 'gh is installed'),
    check('gh.auth', () => execFile('gh', ['auth', 'status']), 'gh is authenticated'),
    check('git.remote', () => execFile('git', ['remote', 'get-url', 'origin'], { cwd: input.worktreePath }), 'origin remote exists'),
    check('git.branch', () => {
      const branch = execFile('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: input.worktreePath })
      if (branch !== input.branchName) throw new Error(`Expected branch ${input.branchName}, got ${branch}`)
      return branch
    }, 'branch exists'),
    {
      name: 'validation.status',
      ok: input.validations.some((validation) => validation.status === 'passed'),
      message: input.validations.some((validation) => validation.status === 'passed')
        ? 'At least one validation passed'
        : 'No passed validation found',
    },
  ]

  return { ok: checks.every((item) => item.ok), checks }
}

export function buildGitHubPrCommand(input: BuildGitHubPrCommandInput): string[] {
  const args = [
    'pr', 'create',
    '--title', input.title,
    '--body', input.body,
    '--base', input.baseBranch,
    '--head', input.headBranch,
  ]
  if (input.draft) args.push('--draft')
  return args
}
