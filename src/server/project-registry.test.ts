import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

let tempHome = ''
let workspaceDir = ''
let originalHermesHome: string | undefined
let originalWorkspaceDir: string | undefined

beforeEach(() => {
  tempHome = mkdtempSync(join(tmpdir(), 'hermes-project-registry-home-'))
  workspaceDir = mkdtempSync(
    join(tmpdir(), 'hermes-project-registry-workspace-'),
  )
  originalHermesHome = process.env.HERMES_HOME
  originalWorkspaceDir = process.env.HERMES_WORKSPACE_DIR
  process.env.HERMES_HOME = tempHome
  process.env.HERMES_WORKSPACE_DIR = workspaceDir
})

afterEach(() => {
  if (originalHermesHome === undefined) delete process.env.HERMES_HOME
  else process.env.HERMES_HOME = originalHermesHome
  if (originalWorkspaceDir === undefined)
    delete process.env.HERMES_WORKSPACE_DIR
  else process.env.HERMES_WORKSPACE_DIR = originalWorkspaceDir
  rmSync(tempHome, { recursive: true, force: true })
  rmSync(workspaceDir, { recursive: true, force: true })
})

describe('buildProjectRegistry', () => {
  it('returns active project metadata, instruction excerpts, readme, and git remote', async () => {
    writeFileSync(
      join(workspaceDir, 'AGENTS.md'),
      'Follow project instructions.\n'.repeat(4),
    )
    writeFileSync(
      join(workspaceDir, 'README.md'),
      '# Demo Project\nUseful docs.',
    )
    execFileSync('git', ['init'], { cwd: workspaceDir, stdio: 'ignore' })
    execFileSync(
      'git',
      ['remote', 'add', 'origin', 'git@github.com:acme/demo.git'],
      {
        cwd: workspaceDir,
        stdio: 'ignore',
      },
    )

    const { buildProjectRegistry } = await import('./project-registry')
    const registry = await buildProjectRegistry()

    expect(registry.projects).toHaveLength(1)
    expect(registry.activeProjectId).toBe(registry.projects[0].id)
    expect(registry.projects[0]).toMatchObject({
      name: workspaceDir.split('/').at(-1),
      path: workspaceDir,
      active: true,
      gitRemote: 'git@github.com:acme/demo.git',
      gitBranch: null,
    })
    expect(registry.projects[0].instructionFiles[0]).toMatchObject({
      name: 'AGENTS.md',
      path: join(workspaceDir, 'AGENTS.md'),
    })
    expect(registry.projects[0].instructionFiles[0].excerpt).toContain(
      'Follow project instructions',
    )
    expect(registry.projects[0].readme?.excerpt).toContain('Demo Project')

    const { buildProjectContextPromptBlock } =
      await import('./project-registry')
    const promptBlock = buildProjectContextPromptBlock(registry.projects[0])
    expect(promptBlock).toContain('## Active Project Context')
    expect(promptBlock).toContain(`Path: ${workspaceDir}`)
    expect(promptBlock).toContain('git@github.com:acme/demo.git')
    expect(promptBlock).toContain('### AGENTS.md')
    expect(promptBlock).toContain('Follow project instructions')
  })

  it('discovers direct child projects under the active workspace', async () => {
    const child = join(workspaceDir, 'child-app')
    mkdirSync(child)
    writeFileSync(join(child, 'package.json'), '{"name":"child-app"}')
    writeFileSync(join(child, 'CLAUDE.md'), 'Child instructions')

    const { buildProjectRegistry } = await import('./project-registry')
    const registry = await buildProjectRegistry()

    expect(registry.projects.some((project) => project.path === child)).toBe(
      true,
    )
    expect(
      registry.projects.find((project) => project.path === child)
        ?.instructionFiles[0]?.name,
    ).toBe('CLAUDE.md')
  })
})
