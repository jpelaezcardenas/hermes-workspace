import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildGitHubPrCommand, getGitHubPrPreflight } from './github-pr-manager'

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], { encoding: 'utf-8' }).trim()
}

function tempGitRepo(): string {
  const repoPath = mkdtempSync(join(tmpdir(), 'hermes-ma-pr-repo-'))
  git(repoPath, ['init', '-b', 'main'])
  git(repoPath, ['config', 'user.email', 'test@example.com'])
  git(repoPath, ['config', 'user.name', 'Test User'])
  writeFileSync(join(repoPath, 'README.md'), '# repo\n', 'utf-8')
  git(repoPath, ['add', 'README.md'])
  git(repoPath, ['commit', '-m', 'initial'])
  git(repoPath, ['checkout', '-b', 'hermes/task-1-demo'])
  writeFileSync(join(repoPath, 'feature.txt'), 'feature\n', 'utf-8')
  git(repoPath, ['add', 'feature.txt'])
  git(repoPath, ['commit', '-m', 'feat: demo'])
  git(repoPath, ['remote', 'add', 'origin', 'https://github.com/example/repo.git'])
  return repoPath
}

describe('github PR manager', () => {
  it('preflights git repo, branch, remote, gh version/auth, and validations', () => {
    const repoPath = tempGitRepo()
    try {
      const preflight = getGitHubPrPreflight({
        worktreePath: repoPath,
        branchName: 'hermes/task-1-demo',
        validations: [
          { id: 'validation-1', taskId: 'task-1', type: 'test', command: 'pnpm test', status: 'passed', exitCode: 0 },
        ],
        execFile: (command, args, options) => {
          if (command === 'gh' && args.join(' ') === '--version') return 'gh version 2.0.0'
          if (command === 'gh' && args.join(' ') === 'auth status') return 'Logged in to github.com'
          return execFileSync(command, args, { cwd: options?.cwd, encoding: 'utf-8' }).trim()
        },
      })

      expect(preflight.ok).toBe(true)
      expect(preflight.checks).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'gh.version', ok: true }),
        expect.objectContaining({ name: 'gh.auth', ok: true }),
        expect.objectContaining({ name: 'git.remote', ok: true }),
        expect.objectContaining({ name: 'git.branch', ok: true }),
        expect.objectContaining({ name: 'validation.status', ok: true }),
      ]))
    } finally {
      rmSync(repoPath, { recursive: true, force: true })
    }
  })

  it('reports failed preflight checks without throwing', () => {
    const repoPath = tempGitRepo()
    try {
      git(repoPath, ['remote', 'remove', 'origin'])
      const preflight = getGitHubPrPreflight({
        worktreePath: repoPath,
        branchName: 'missing-branch',
        validations: [],
        execFile: (command, args, options) => {
          if (command === 'gh') throw new Error(`gh failed: ${args.join(' ')}`)
          return execFileSync(command, args, { cwd: options?.cwd, encoding: 'utf-8' }).trim()
        },
      })

      expect(preflight.ok).toBe(false)
      expect(preflight.checks).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'gh.version', ok: false }),
        expect.objectContaining({ name: 'gh.auth', ok: false }),
        expect.objectContaining({ name: 'git.remote', ok: false }),
        expect.objectContaining({ name: 'git.branch', ok: false }),
        expect.objectContaining({ name: 'validation.status', ok: false }),
      ]))
    } finally {
      rmSync(repoPath, { recursive: true, force: true })
    }
  })

  it('builds a safe gh pr create command', () => {
    expect(buildGitHubPrCommand({
      title: 'Task 1',
      body: 'Summary',
      baseBranch: 'main',
      headBranch: 'hermes/task-1-demo',
      draft: true,
    })).toEqual([
      'pr', 'create',
      '--title', 'Task 1',
      '--body', 'Summary',
      '--base', 'main',
      '--head', 'hermes/task-1-demo',
      '--draft',
    ])
  })
})
