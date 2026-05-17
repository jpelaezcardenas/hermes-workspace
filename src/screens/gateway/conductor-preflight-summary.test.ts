import { describe, expect, it } from 'vitest'
import {
  buildConductorPreflightSummary,
  shouldWarnProjectMismatch,
} from './conductor-preflight-summary'
import type { ConductorProjectOverride } from './conductor-launch-intent'

describe('buildConductorPreflightSummary', () => {
  it('summarizes a project launch override with status, stack, package manager, and context files', () => {
    const override: ConductorProjectOverride = {
      activeProjectId: 'demo',
      activeProjectName: 'Demo App',
      activeProjectPath: '/workspace/demo-app',
      effectiveWorkingDirectory: '/workspace/demo-app',
      contextPreview: {
        summary: 'Path: /workspace/demo-app\nContext files: 2',
        files: [
          {
            name: 'AGENTS.md',
            path: '/workspace/demo-app/AGENTS.md',
            chars: 700,
          },
          {
            name: 'README.md',
            path: '/workspace/demo-app/README.md',
            chars: 1200,
          },
        ],
      },
      status: {
        gitDirty: true,
        changedFiles: 3,
        lastCommit: 'abc1234',
        lastCommitAt: '2026-01-01T00:00:00Z',
        detectedStack: ['React', 'TypeScript', 'TanStack Start'],
        packageManager: 'pnpm',
      },
    }

    expect(buildConductorPreflightSummary(override)).toEqual({
      projectLabel: 'Demo App',
      workingDirectory: '/workspace/demo-app',
      gitStatusLabel: '3 changed files',
      gitStatusTone: 'warning',
      stackLabel: 'React, TypeScript, TanStack Start',
      packageManagerLabel: 'pnpm',
      contextFilesLabel: 'AGENTS.md, README.md',
      contextSummary: 'Path: /workspace/demo-app\nContext files: 2',
      lastCommitLabel: 'abc1234',
    })
  })

  it('falls back gracefully for missing optional metadata', () => {
    expect(
      buildConductorPreflightSummary({
        activeProjectId: null,
        activeProjectName: null,
        activeProjectPath: '/workspace/simple-app',
        effectiveWorkingDirectory: null,
      }),
    ).toMatchObject({
      projectLabel: 'simple-app',
      workingDirectory: '/workspace/simple-app',
      gitStatusLabel: 'Git status unavailable',
      gitStatusTone: 'muted',
      stackLabel: 'Stack not detected',
      packageManagerLabel: 'Package manager unavailable',
      contextFilesLabel: 'No context files detected',
      contextSummary: null,
      lastCommitLabel: null,
    })
  })
})

describe('shouldWarnProjectMismatch', () => {
  it('warns when a launch override targets a different project than the active Conductor project', () => {
    expect(
      shouldWarnProjectMismatch(
        {
          activeProjectId: 'project-from-projects',
          activeProjectName: 'From Projects',
          activeProjectPath: '/workspace/from-projects',
          effectiveWorkingDirectory: '/workspace/from-projects',
        },
        { id: 'active', path: '/workspace/active' },
      ),
    ).toBe(true)
  })

  it('does not warn when ids or paths match', () => {
    expect(
      shouldWarnProjectMismatch(
        {
          activeProjectId: 'active',
          activeProjectName: 'Active',
          activeProjectPath: '/workspace/other-path',
          effectiveWorkingDirectory: '/workspace/other-path',
        },
        { id: 'active', path: '/workspace/active' },
      ),
    ).toBe(false)

    expect(
      shouldWarnProjectMismatch(
        {
          activeProjectId: null,
          activeProjectName: 'Active',
          activeProjectPath: '/workspace/active',
          effectiveWorkingDirectory: '/workspace/active',
        },
        { id: 'active', path: '/workspace/active' },
      ),
    ).toBe(false)
  })
})
