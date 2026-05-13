import { describe, expect, it } from 'vitest'
import { buildMissionProjectMetadata } from '@/routes/api/conductor-spawn'

describe('buildMissionProjectMetadata', () => {
  it('uses explicit project override as effective working directory', () => {
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
      },
    })

    expect(metadata).toEqual({
      activeProjectId: 'project-1',
      activeProjectName: 'demo-app',
      activeProjectPath: '/workspace/demo-app',
      effectiveWorkingDirectory: '/workspace/demo-app',
    })
  })

  it('falls back from active project path to configured project directory', () => {
    const metadata = buildMissionProjectMetadata({
      activeProject: {
        id: 'project-1',
        name: 'demo-app',
        path: '/workspace/demo-app',
      },
      projectsDir: '/custom/workdir',
    })

    expect(metadata).toEqual({
      activeProjectId: 'project-1',
      activeProjectName: 'demo-app',
      activeProjectPath: '/workspace/demo-app',
      effectiveWorkingDirectory: '/custom/workdir',
    })
  })
})
