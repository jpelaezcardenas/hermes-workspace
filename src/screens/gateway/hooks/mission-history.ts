import type { MissionProjectMetadata } from '@/routes/api/conductor-spawn'

export type MissionHistoryWorkerDetail = {
  label: string
  model: string
  totalTokens: number
  personaEmoji: string
  personaName: string
}

export type MissionHistoryEntry = {
  id: string
  goal: string
  startedAt: string
  completedAt: string
  workerCount: number
  totalTokens: number
  status: 'completed' | 'failed'
  projectPath: string | null
  activeProjectId?: string | null
  activeProjectName?: string | null
  activeProjectPath?: string | null
  effectiveWorkingDirectory?: string | null
  outputPath?: string | null
  sessionKey?: string | null
  workerSummary?: Array<string>
  outputText?: string
  streamText?: string
  completeSummary?: string
  workerDetails?: Array<MissionHistoryWorkerDetail>
  error?: string | null
}

export const HISTORY_STORAGE_KEY = 'conductor:history'
export const MAX_HISTORY_ENTRIES = 50

export function normalizeOptionalString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

export function extractProjectPath(text: string): string | null {
  if (!text) return null
  const patterns = [
    /(?:Project path|Working directory|Directory|Output path):\s*([^\n]+)/i,
    /(\/[^\s]+(?:workspace|project|app|repo)[^\s]*)/i,
  ]
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) return match[1].trim().replace(/[.,;)]$/, '')
  }
  return null
}

export function normalizeMissionHistoryEntry(
  entry: MissionHistoryEntry,
): MissionHistoryEntry {
  const projectPath =
    (typeof entry.projectPath === 'string' && entry.projectPath.trim()) ||
    extractProjectPath(
      typeof entry.projectPath === 'string' ? entry.projectPath : '',
    ) ||
    null
  const outputText =
    typeof entry.outputText === 'string' ? entry.outputText : undefined
  const streamText =
    typeof entry.streamText === 'string' ? entry.streamText : undefined
  const outputPath =
    (typeof entry.outputPath === 'string' && entry.outputPath.trim()) ||
    extractProjectPath(
      typeof entry.outputPath === 'string' ? entry.outputPath : '',
    ) ||
    projectPath ||
    extractProjectPath(outputText ?? '') ||
    extractProjectPath(streamText ?? '') ||
    null
  return {
    ...entry,
    projectPath,
    activeProjectId: normalizeOptionalString(entry.activeProjectId),
    activeProjectName: normalizeOptionalString(entry.activeProjectName),
    activeProjectPath: normalizeOptionalString(entry.activeProjectPath),
    effectiveWorkingDirectory:
      normalizeOptionalString(entry.effectiveWorkingDirectory) ??
      normalizeOptionalString(entry.activeProjectPath) ??
      projectPath,
    outputPath,
    sessionKey: normalizeOptionalString(entry.sessionKey),
    outputText,
    streamText,
  }
}

export function loadMissionHistory(): Array<MissionHistoryEntry> {
  try {
    const raw = globalThis.localStorage.getItem(HISTORY_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const seen = new Set<string>()
    return parsed
      .filter((entry: unknown): entry is MissionHistoryEntry => {
        if (!entry || typeof entry !== 'object') return false
        const e = entry as Record<string, unknown>
        if (
          typeof e.id !== 'string' ||
          typeof e.goal !== 'string' ||
          typeof e.startedAt !== 'string'
        )
          return false
        if (seen.has(e.id)) return false
        seen.add(e.id)
        return true
      })
      .map(normalizeMissionHistoryEntry)
      .slice(0, MAX_HISTORY_ENTRIES)
  } catch {
    return []
  }
}

export function appendMissionHistory(entry: MissionHistoryEntry): void {
  try {
    const current = loadMissionHistory()
    // Deduplicate by id before appending
    const filtered = current.filter((e) => e.id !== entry.id)
    const updated = [entry, ...filtered].slice(0, MAX_HISTORY_ENTRIES)
    globalThis.localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(updated),
    )
  } catch {
    // Ignore persistence failures.
  }
}

export function buildFallbackMissionProjectMetadata(params: {
  configuredProjectsDir?: string
  outputPath?: string | null
  previousMetadata?: MissionProjectMetadata | null
}): MissionProjectMetadata {
  return {
    activeProjectId: params.previousMetadata?.activeProjectId ?? null,
    activeProjectName: params.previousMetadata?.activeProjectName ?? null,
    activeProjectPath: params.previousMetadata?.activeProjectPath ?? null,
    effectiveWorkingDirectory:
      params.previousMetadata?.effectiveWorkingDirectory ??
      normalizeOptionalString(params.configuredProjectsDir) ??
      params.outputPath ??
      null,
    contextPreview: params.previousMetadata?.contextPreview ?? null,
    status: params.previousMetadata?.status ?? null,
  }
}

export function buildMissionHistoryEntryProjectFields(params: {
  projectMetadata: MissionProjectMetadata
  outputPath: string | null
  sessionKey?: string | null
}): Pick<
  MissionHistoryEntry,
  | 'projectPath'
  | 'activeProjectId'
  | 'activeProjectName'
  | 'activeProjectPath'
  | 'effectiveWorkingDirectory'
  | 'outputPath'
  | 'sessionKey'
> {
  return {
    projectPath:
      params.projectMetadata.activeProjectPath ??
      params.projectMetadata.effectiveWorkingDirectory ??
      params.outputPath,
    activeProjectId: params.projectMetadata.activeProjectId,
    activeProjectName: params.projectMetadata.activeProjectName,
    activeProjectPath: params.projectMetadata.activeProjectPath,
    effectiveWorkingDirectory: params.projectMetadata.effectiveWorkingDirectory,
    outputPath: params.outputPath,
    sessionKey: normalizeOptionalString(params.sessionKey),
  }
}

type ProjectMissionHistoryTarget = {
  id?: string | null
  path?: string | null
}

function normalizeProjectPathForMatch(
  value: string | null | undefined,
): string | null {
  const normalized = normalizeOptionalString(value)
  return normalized ? normalized.replace(/\/+$/, '') : null
}

function missionMatchesProject(
  entry: MissionHistoryEntry,
  target: ProjectMissionHistoryTarget,
): boolean {
  const targetId = normalizeOptionalString(target.id)
  const targetPath = normalizeProjectPathForMatch(target.path)
  if (targetId && normalizeOptionalString(entry.activeProjectId) === targetId) {
    return true
  }
  if (!targetPath) return false
  const candidatePaths = [
    entry.activeProjectPath,
    entry.effectiveWorkingDirectory,
    entry.projectPath,
    entry.outputPath,
  ]
    .map(normalizeProjectPathForMatch)
    .filter((value): value is string => value !== null)

  return candidatePaths.some(
    (candidate) =>
      candidate === targetPath || candidate.startsWith(`${targetPath}/`),
  )
}

function compareMissionHistoryRecency(
  left: MissionHistoryEntry,
  right: MissionHistoryEntry,
): number {
  const leftMs = new Date(left.completedAt || left.startedAt).getTime()
  const rightMs = new Date(right.completedAt || right.startedAt).getTime()
  return (
    (Number.isFinite(rightMs) ? rightMs : 0) -
    (Number.isFinite(leftMs) ? leftMs : 0)
  )
}

export function filterMissionHistoryByProject(
  entries: Array<MissionHistoryEntry>,
  target: ProjectMissionHistoryTarget,
): Array<MissionHistoryEntry> {
  return entries
    .map(normalizeMissionHistoryEntry)
    .filter((entry) => missionMatchesProject(entry, target))
    .sort(compareMissionHistoryRecency)
}

export type ProjectMissionHistorySummary = {
  total: number
  completed: number
  failed: number
  latest: MissionHistoryEntry | null
}

export function summarizeProjectMissionHistory(
  entries: Array<MissionHistoryEntry>,
  target: ProjectMissionHistoryTarget,
): ProjectMissionHistorySummary {
  const projectEntries = filterMissionHistoryByProject(entries, target)
  return {
    total: projectEntries.length,
    completed: projectEntries.filter((entry) => entry.status === 'completed')
      .length,
    failed: projectEntries.filter((entry) => entry.status === 'failed').length,
    latest: projectEntries[0] ?? null,
  }
}
