import { describe, expect, it } from 'vitest'
import type { MissionHistoryEntry } from '@/screens/gateway/hooks/mission-history'
import {
  buildProjectMissionTraceIntent,
  getMissionTraceSessionKey,
} from './project-mission-trace'

const baseEntry: MissionHistoryEntry = {
  id: 'mission-1',
  goal: 'Ship project trace links',
  startedAt: '2026-01-01T10:00:00.000Z',
  completedAt: '2026-01-01T10:05:00.000Z',
  workerCount: 2,
  totalTokens: 1200,
  status: 'completed',
  projectPath: '/workspace/demo',
}

describe('project mission trace links', () => {
  it('exposes a trace session key only for entries with a persisted session', () => {
    expect(
      getMissionTraceSessionKey({
        ...baseEntry,
        sessionKey: ' conductor:abc123 ',
      }),
    ).toBe('conductor:abc123')

    expect(getMissionTraceSessionKey(baseEntry)).toBeNull()
    expect(
      getMissionTraceSessionKey({ ...baseEntry, sessionKey: '   ' }),
    ).toBeNull()
  })

  it('builds a conductor trace intent from mission history', () => {
    expect(
      buildProjectMissionTraceIntent({
        ...baseEntry,
        id: 'mission-alpha',
        activeProjectId: 'project-alpha',
        activeProjectName: 'Alpha',
        activeProjectPath: '/workspace/alpha',
        effectiveWorkingDirectory: '/workspace/alpha',
        sessionKey: 'conductor:alpha-session',
      }),
    ).toEqual({
      missionHistoryId: 'mission-alpha',
      sessionKey: 'conductor:alpha-session',
      projectId: 'project-alpha',
      projectName: 'Alpha',
      projectPath: '/workspace/alpha',
    })
  })
})
