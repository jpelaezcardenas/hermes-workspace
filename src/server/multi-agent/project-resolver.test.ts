import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { mkdtempSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  defaultWorktreeRoot,
  detectDefaultBranch,
  detectGithubRemote,
  isGitRepo,
  resolveProject,
} from './project-resolver'

function tempDir(prefix = 'hermes-ma-project-'): string {
  return mkdtempSync(join(tmpdir(), prefix))
}

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function initRepo(branch = 'main'): string {
  const repoPath = tempDir()
  git(repoPath, ['init', '-b', branch])
  git(repoPath, ['config', 'user.email', 'test@example.com'])
  git(repoPath, ['config', 'user.name', 'Test User'])
  writeFileSync(join(repoPath, 'README.md'), '# test repo\n', 'utf-8')
  git(repoPath, ['add', 'README.md'])
  git(repoPath, ['commit', '-m', 'initial commit'])
  return repoPath
}

describe('multi-agent project resolver', () => {
  it('detects git repositories and rejects non-git directories', () => {
    const repoPath = initRepo()
    const plainDir = tempDir()

    expect(isGitRepo(repoPath)).toBe(true)
    expect(isGitRepo(plainDir)).toBe(false)
  })

  it('rejects non-existent project paths', () => {
    expect(() => resolveProject({ repoPath: join(tempDir(), 'missing') })).toThrow(/does not exist/)
  })

  it('detects default branch from origin HEAD when available', () => {
    const repoPath = initRepo('main')
    git(repoPath, ['remote', 'add', 'origin', 'git@github.com:example/repo.git'])
    git(repoPath, ['symbolic-ref', 'refs/remotes/origin/HEAD', 'refs/remotes/origin/main'])

    expect(detectDefaultBranch(repoPath)).toBe('main')
  })

  it('falls back to current branch when origin HEAD is unavailable', () => {
    const repoPath = initRepo('develop')

    expect(detectDefaultBranch(repoPath)).toBe('develop')
  })

  it('detects GitHub remote and derives worktree root', () => {
    const repoPath = initRepo()
    git(repoPath, ['remote', 'add', 'origin', 'git@github.com:example/repo.git'])

    expect(detectGithubRemote(repoPath)).toBe('git@github.com:example/repo.git')
    expect(defaultWorktreeRoot(repoPath)).toBe(join(repoPath, '.hermes-worktrees'))
  })

  it('resolves a project with explicit metadata', () => {
    const repoPath = initRepo('main')
    git(repoPath, ['remote', 'add', 'origin', 'https://github.com/example/repo.git'])

    const project = resolveProject({
      id: 'custom-project',
      name: 'Custom Project',
      repoPath,
      validation: { test: 'pnpm test' },
      obsidianPath: '/vault/Custom Project',
    })

    expect(project).toMatchObject({
      id: 'custom-project',
      name: 'Custom Project',
      repoPath,
      defaultBranch: 'main',
      worktreeRoot: join(repoPath, '.hermes-worktrees'),
      githubRemote: 'https://github.com/example/repo.git',
      validation: { test: 'pnpm test' },
      obsidianPath: '/vault/Custom Project',
    })
    expect(project.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
    expect(project.updatedAt).toBe(project.createdAt)
  })

  it('resolves registry-shaped projects without mutating project-registry', () => {
    const repoPath = initRepo()

    const project = resolveProject({
      id: 'registry-id',
      name: 'Registry Project',
      path: repoPath,
      gitRemote: null,
    })

    expect(project.id).toBe('registry-id')
    expect(project.name).toBe('Registry Project')
    expect(project.repoPath).toBe(repoPath)
  })

  it('rejects files instead of directories', () => {
    const root = tempDir()
    const filePath = join(root, 'not-a-dir')
    mkdirSync(root, { recursive: true })
    writeFileSync(filePath, 'nope', 'utf-8')

    expect(() => resolveProject({ repoPath: filePath })).toThrow(/not a directory/)
  })
})
