import { describe, expect, it } from 'vitest'
import {
  buildFallbackMissionProjectMetadata,
  buildMissionHistoryEntryProjectFields,
  filterMissionHistoryByProject,
  summarizeProjectMissionHistory,
  type MissionHistoryEntry,
} from './mission-history'

const baseEntry: MissionHistoryEntry = {
  id: 'mission-1',
  goal: 'Implement project-aware conductor history',
  startedAt: '2026-01-01T10:00:00.000Z',
  completedAt: '2026-01-01T10:10:00.000Z',
  workerCount: 2,
  totalTokens: 1234,
  status: 'completed',
  projectPath: null,
}

describe('mission history project attribution', () => {
  it('stores explicit project metadata and session key on mission history entries', () => {
    const fields = buildMissionHistoryEntryProjectFields({
      projectMetadata: {
        activeProjectId: 'project-alpha',
        activeProjectName: 'Alpha',
        activeProjectPath: '/workspace/alpha',
        effectiveWorkingDirectory: '/workspace/alpha',
        contextPreview: null,
        status: null,
      },
      outputPath: '/workspace/alpha/dispatch-123',
      sessionKey: ' conductor:alpha-session ',
    })

    expect(fields).toEqual({
      projectPath: '/workspace/alpha',
      activeProjectId: 'project-alpha',
      activeProjectName: 'Alpha',
      activeProjectPath: '/workspace/alpha',
      effectiveWorkingDirectory: '/workspace/alpha',
      outputPath: '/workspace/alpha/dispatch-123',
      sessionKey: 'conductor:alpha-session',
    })
  })

  it('preserves active project attribution when a mission is restored before completion', () => {
    const metadata = buildFallbackMissionProjectMetadata({
      configuredProjectsDir: '/fallback/projects',
      outputPath: '/fallback/output',
      previousMetadata: {
        activeProjectId: 'project-beta',
        activeProjectName: 'Beta',
        activeProjectPath: '/workspace/beta',
        effectiveWorkingDirectory: '/workspace/beta',
        contextPreview: null,
        status: null,
      },
    })

    expect(metadata).toMatchObject({
      activeProjectId: 'project-beta',
      activeProjectName: 'Beta',
      activeProjectPath: '/workspace/beta',
      effectiveWorkingDirectory: '/workspace/beta',
    })
  })

  it('filters mission history by project id or path for traceability', () => {
    const entries: MissionHistoryEntry[] = [
      {
        ...baseEntry,
        id: 'mission-alpha-new',
        activeProjectId: 'project-alpha',
        activeProjectName: 'Alpha',
        activeProjectPath: '/workspace/alpha',
        effectiveWorkingDirectory: '/workspace/alpha',
        completedAt: '2026-01-01T11:00:00.000Z',
      },
      {
        ...baseEntry,
        id: 'mission-alpha-old',
        activeProjectId: null,
        activeProjectName: null,
        activeProjectPath: '/workspace/alpha',
        effectiveWorkingDirectory: '/workspace/alpha',
        completedAt: '2026-01-01T09:00:00.000Z',
      },
      {
        ...baseEntry,
        id: 'mission-beta',
        activeProjectId: 'project-beta',
        activeProjectName: 'Beta',
        activeProjectPath: '/workspace/beta',
        effectiveWorkingDirectory: '/workspace/beta',
      },
    ]

    expect(
      filterMissionHistoryByProject(entries, {
        id: 'project-alpha',
        path: '/workspace/alpha',
      }).map((entry) => entry.id),
    ).toEqual(['mission-alpha-new', 'mission-alpha-old'])
  })

  it('summarizes project mission history counts and most recent mission', () => {
    const summary = summarizeProjectMissionHistory(
      [
        {
          ...baseEntry,
          id: 'failed-latest',
          status: 'failed',
          activeProjectId: 'project-alpha',
          activeProjectPath: '/workspace/alpha',
          completedAt: '2026-01-02T10:00:00.000Z',
        },
        {
          ...baseEntry,
          id: 'completed-old',
          status: 'completed',
          activeProjectId: 'project-alpha',
          activeProjectPath: '/workspace/alpha',
          completedAt: '2026-01-01T10:00:00.000Z',
        },
      ],
      { id: 'project-alpha', path: '/workspace/alpha' },
    )

    expect(summary).toEqual({
      total: 2,
      completed: 1,
      failed: 1,
      latest: expect.objectContaining({ id: 'failed-latest' }),
    })
  })
})
