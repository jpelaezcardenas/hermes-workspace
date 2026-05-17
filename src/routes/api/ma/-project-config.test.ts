import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { listConfiguredProjects, resolveConfiguredProject } from './-project-config'

const originalEnv = { ...process.env }
let tempRoot = ''
let repoPath = ''

function git(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], {
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function initRepo(): string {
  const path = mkdtempSync(join(tempRoot, 'repo-'))
  git(path, ['init', '-b', 'main'])
  git(path, ['config', 'user.email', 'test@example.com'])
  git(path, ['config', 'user.name', 'Test User'])
  writeFileSync(join(path, 'README.md'), '# test repo\n', 'utf-8')
  git(path, ['add', 'README.md'])
  git(path, ['commit', '-m', 'initial commit'])
  return path
}

beforeEach(() => {
  tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-project-config-'))
  repoPath = initRepo()
  process.env = { ...originalEnv }
  delete process.env.HERMES_MA_PROJECTS_JSON
  delete process.env.HERMES_MA_PROJECT_PATH
})

afterEach(() => {
  process.env = { ...originalEnv }
  rmSync(tempRoot, { recursive: true, force: true })
})

describe('multi-agent project route config', () => {
  it('parses configured projects from shared env once for all ma routes', () => {
    process.env.HERMES_MA_PROJECTS_JSON = JSON.stringify([{ id: 'workspace', repoPath }])

    const projects = listConfiguredProjects()
    const project = resolveConfiguredProject('workspace')

    expect(projects).toHaveLength(1)
    expect(projects[0]).toMatchObject({ id: 'workspace', repoPath, defaultBranch: 'main' })
    expect(project).toMatchObject({ id: 'workspace', repoPath, defaultBranch: 'main' })
  })

  it('throws a typed not-found error for missing project ids', () => {
    process.env.HERMES_MA_PROJECTS_JSON = JSON.stringify([{ id: 'workspace', repoPath }])

    expect(() => resolveConfiguredProject('missing')).toThrow(
      expect.objectContaining({ name: 'MultiAgentProjectNotFoundError', statusCode: 404 }),
    )
  })
})
