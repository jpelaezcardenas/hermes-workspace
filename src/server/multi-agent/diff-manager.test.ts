import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getTaskDiff } from './diff-manager'

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function initRepo(): string {
  const repoPath = mkdtempSync(join(tmpdir(), 'hermes-ma-diff-repo-'))
  git(repoPath, ['init', '-b', 'main'])
  git(repoPath, ['config', 'user.email', 'test@example.com'])
  git(repoPath, ['config', 'user.name', 'Test User'])
  writeFileSync(join(repoPath, 'README.md'), '# test repo\n', 'utf-8')
  writeFileSync(join(repoPath, 'keep.txt'), 'keep\n', 'utf-8')
  git(repoPath, ['add', 'README.md', 'keep.txt'])
  git(repoPath, ['commit', '-m', 'initial commit'])
  return repoPath
}

describe('multi-agent diff manager', () => {
  it('returns clean diff state when the worktree has no changes', () => {
    const repoPath = initRepo()
    try {
      const diff = getTaskDiff(repoPath)

      expect(diff.clean).toBe(true)
      expect(diff.changedFiles).toEqual([])
      expect(diff.stat).toBe('')
      expect(diff.diff).toBe('')
      expect(diff.porcelain).toBe('')
    } finally {
      rmSync(repoPath, { recursive: true, force: true })
    }
  })

  it('returns modified and untracked files with stat and unified diff content', async () => {
    const repoPath = initRepo()
    try {
      await writeFile(join(repoPath, 'README.md'), '# changed repo\n', 'utf-8')
      await writeFile(join(repoPath, 'new-file.txt'), 'new file\n', 'utf-8')

      const diff = getTaskDiff(repoPath)

      expect(diff.clean).toBe(false)
      expect(diff.changedFiles).toEqual(['README.md', 'new-file.txt'])
      expect(diff.porcelain).toContain('README.md')
      expect(diff.porcelain).toContain('new-file.txt')
      expect(diff.stat).toContain('README.md')
      expect(diff.stat).toContain('new-file.txt')
      expect(diff.diff).toContain('diff --git a/README.md b/README.md')
      expect(diff.diff).toContain('-# test repo')
      expect(diff.diff).toContain('+# changed repo')
      expect(diff.diff).toContain('diff --git a/new-file.txt b/new-file.txt')
      expect(diff.diff).toContain('+new file')
    } finally {
      rmSync(repoPath, { recursive: true, force: true })
    }
  })

  it('supports safe path filters inside the worktree', async () => {
    const repoPath = initRepo()
    try {
      await mkdir(join(repoPath, 'src'))
      await writeFile(join(repoPath, 'README.md'), '# changed repo\n', 'utf-8')
      await writeFile(join(repoPath, 'src', 'app.ts'), 'export const app = true\n', 'utf-8')

      const diff = getTaskDiff(repoPath, { paths: ['src/app.ts'] })

      expect(diff.changedFiles).toEqual(['src/app.ts'])
      expect(diff.diff).toContain('diff --git a/src/app.ts b/src/app.ts')
      expect(diff.diff).not.toContain('README.md')
    } finally {
      rmSync(repoPath, { recursive: true, force: true })
    }
  })

  it('rejects unsafe path filters', () => {
    const repoPath = initRepo()
    try {
      expect(() => getTaskDiff(repoPath, { paths: ['../secret.txt'] })).toThrow(/Unsafe diff path/)
      expect(() => getTaskDiff(repoPath, { paths: ['/tmp/secret.txt'] })).toThrow(/Unsafe diff path/)
    } finally {
      rmSync(repoPath, { recursive: true, force: true })
    }
  })
})
