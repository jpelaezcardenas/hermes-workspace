import { describe, expect, it } from 'vitest'
import {
  buildConductorWorkingDirectoryRules,
  buildMissionProjectMetadata,
  buildOrchestratorPrompt,
  buildProjectOverridePromptBlock,
} from './conductor-spawn'

describe('buildConductorWorkingDirectoryRules', () => {
  it('uses active project as worker cwd when project directory is not configured', () => {
    const rules = buildConductorWorkingDirectoryRules({
      projectsDir: '/tmp/active-project',
      activeProjectPath: '/tmp/active-project',
      explicitProjectsDir: false,
    })

    expect(rules).toContain(
      '- Primary working directory for every worker: /tmp/active-project',
    )
    expect(rules).toContain(
      '- Every worker prompt MUST include exactly this line: "Working directory: /tmp/active-project"',
    )
    expect(rules.join('\n')).toContain(
      'Project Directory was not configured explicitly',
    )
  })

  it('keeps explicit project directory ahead of active project metadata', () => {
    const rules = buildConductorWorkingDirectoryRules({
      projectsDir: '/tmp/custom-output',
      activeProjectPath: '/tmp/active-project',
      explicitProjectsDir: true,
    })

    expect(rules).toContain(
      '- Primary working directory for every worker: /tmp/custom-output',
    )
    expect(rules.join('\n')).toContain(
      'configured Project Directory explicitly',
    )
    expect(rules.join('\n')).toContain('/tmp/custom-output')
  })
})

describe('buildOrchestratorPrompt', () => {
  it('injects project context and mandatory worker working directory rules', () => {
    const prompt = buildOrchestratorPrompt('Ship the slice', 'dispatch skill', {
      orchestratorModel: '',
      workerModel: '',
      projectsDir: '/tmp/active-project',
      activeProjectPath: '/tmp/active-project',
      explicitProjectsDir: false,
      maxParallel: 1,
      supervised: false,
      projectContext: '## Active Project Context\nPath: /tmp/active-project',
    })

    expect(prompt).toContain('## Active Project Context')
    expect(prompt).toContain('## Worker Working Directory')
    expect(prompt).toContain(
      'Primary working directory for every worker: /tmp/active-project',
    )
    expect(prompt).toContain('Working directory: /tmp/active-project')
    expect(prompt).toContain(
      'Workers should write output to /tmp/active-project/dispatch-<slug> directories',
    )
  })
})

describe('buildMissionProjectMetadata', () => {
  it('uses historical project override ahead of current active project', () => {
    const metadata = buildMissionProjectMetadata({
      activeProject: {
        id: 'current',
        name: 'current-app',
        path: '/workspace/current-app',
      },
      projectsDir: '',
      override: {
        activeProjectId: 'historical',
        activeProjectName: 'historical-app',
        activeProjectPath: '/workspace/historical-app',
        effectiveWorkingDirectory: '/workspace/historical-app',
      },
    })

    expect(metadata).toEqual({
      activeProjectId: 'historical',
      activeProjectName: 'historical-app',
      activeProjectPath: '/workspace/historical-app',
      effectiveWorkingDirectory: '/workspace/historical-app',
      contextPreview: null,
      status: null,
    })
  })

  it('preserves bounded context preview and status from project override', () => {
    const metadata = buildMissionProjectMetadata({
      activeProject: {
        id: 'current',
        name: 'current-app',
        path: '/workspace/current-app',
      },
      projectsDir: '',
      override: {
        activeProjectId: 'project-1',
        activeProjectName: 'demo-app',
        activeProjectPath: '/workspace/demo-app',
        effectiveWorkingDirectory: '/workspace/demo-app',
        contextPreview: {
          summary: 'Project summary',
          files: [
            {
              name: 'README.md',
              path: '/workspace/demo-app/README.md',
              chars: 900,
            },
          ],
        },
        status: {
          gitDirty: true,
          changedFiles: 3,
          lastCommit: 'abc1234',
          lastCommitAt: '2026-01-01T00:00:00Z',
          detectedStack: ['React', 'TypeScript'],
          packageManager: 'pnpm',
        },
      },
    })

    const promptBlock = buildProjectOverridePromptBlock(metadata)

    expect(promptBlock).toContain('Project: demo-app')
    expect(promptBlock).toContain('Git status: 3 changed file(s)')
    expect(promptBlock).toContain('Stack: React, TypeScript')
    expect(promptBlock).toContain('Package manager: pnpm')
    expect(promptBlock).toContain('Project summary')
    expect(promptBlock).toContain(
      '- README.md (900 chars): /workspace/demo-app/README.md',
    )
  })
})
