import type { MissionHistoryEntry } from '@/screens/gateway/hooks/mission-history'
import { normalizeOptionalString } from '@/screens/gateway/hooks/mission-history'

export type ProjectMissionTraceIntent = {
  missionHistoryId: string
  sessionKey: string
  projectId: string | null
  projectName: string | null
  projectPath: string | null
}

export function getMissionTraceSessionKey(
  entry: Pick<MissionHistoryEntry, 'sessionKey'>,
): string | null {
  return normalizeOptionalString(entry.sessionKey)
}

export function buildProjectMissionTraceIntent(
  entry: MissionHistoryEntry,
): ProjectMissionTraceIntent | null {
  const sessionKey = getMissionTraceSessionKey(entry)
  if (!sessionKey) return null
  return {
    missionHistoryId: entry.id,
    sessionKey,
    projectId: normalizeOptionalString(entry.activeProjectId),
    projectName: normalizeOptionalString(entry.activeProjectName),
    projectPath:
      normalizeOptionalString(entry.activeProjectPath) ??
      normalizeOptionalString(entry.effectiveWorkingDirectory) ??
      normalizeOptionalString(entry.projectPath) ??
      normalizeOptionalString(entry.outputPath),
  }
}
