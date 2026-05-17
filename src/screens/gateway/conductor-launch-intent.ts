export type ConductorLaunchIntentSource = 'projects'

export type ConductorProjectOverride = {
  activeProjectId: string | null
  activeProjectName: string | null
  activeProjectPath: string | null
  effectiveWorkingDirectory: string | null
  contextPreview?: {
    summary: string
    files: Array<{ name: string; path: string; chars: number }>
  } | null
  status?: {
    gitDirty: boolean | null
    changedFiles: number | null
    lastCommit: string | null
    lastCommitAt: string | null
    detectedStack: Array<string>
    packageManager: string | null
  } | null
}

export type ConductorLaunchIntent = {
  source: ConductorLaunchIntentSource
  createdAt: number
  draft: string
  projectOverride: ConductorProjectOverride
}

const CONDUCTOR_GOAL_DRAFT_STORAGE_KEY = 'conductor:goal-draft'
export const CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY = 'conductor:launch-intent'
export const CONDUCTOR_LAUNCH_INTENT_TTL_MS = 5 * 60_000

function readString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function readNullableBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null
}

function readNullableNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readStringArray(value: unknown, maxItems: number): Array<string> {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems)
}

function readContextPreview(
  value: unknown,
): ConductorProjectOverride['contextPreview'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const record = value as Record<string, unknown>
  const summary = readString(record.summary) ?? ''
  const rawFiles = Array.isArray(record.files) ? record.files : []
  const files = rawFiles
    .slice(0, 8)
    .map((file) => {
      if (!file || typeof file !== 'object' || Array.isArray(file)) return null
      const fileRecord = file as Record<string, unknown>
      const name = readString(fileRecord.name)
      const filePath = readString(fileRecord.path)
      const chars = readNullableNumber(fileRecord.chars)
      if (!name || !filePath || chars === null) return null
      return { name, path: filePath, chars }
    })
    .filter(
      (file): file is { name: string; path: string; chars: number } =>
        file !== null,
    )
  if (!summary && files.length === 0) return null
  return { summary: summary.slice(0, 1200), files }
}

function readProjectStatus(value: unknown): ConductorProjectOverride['status'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const record = value as Record<string, unknown>
  return {
    gitDirty: readNullableBoolean(record.gitDirty),
    changedFiles: readNullableNumber(record.changedFiles),
    lastCommit: readString(record.lastCommit),
    lastCommitAt: readString(record.lastCommitAt),
    detectedStack: readStringArray(record.detectedStack, 12),
    packageManager: readString(record.packageManager),
  }
}

function readProjectOverride(value: unknown): ConductorProjectOverride | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const record = value as Record<string, unknown>
  const activeProjectId = readString(record.activeProjectId)
  const activeProjectName = readString(record.activeProjectName)
  const activeProjectPath = readString(record.activeProjectPath)
  const effectiveWorkingDirectory = readString(record.effectiveWorkingDirectory)

  if (!activeProjectPath && !effectiveWorkingDirectory) return null

  return {
    activeProjectId,
    activeProjectName,
    activeProjectPath,
    effectiveWorkingDirectory: effectiveWorkingDirectory ?? activeProjectPath,
    contextPreview: readContextPreview(record.contextPreview),
    status: readProjectStatus(record.status),
  }
}

export function parseConductorLaunchIntent(
  value: unknown,
  now = Date.now(),
): ConductorLaunchIntent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const record = value as Record<string, unknown>
  if (record.source !== 'projects') return null

  const createdAt =
    typeof record.createdAt === 'number' && Number.isFinite(record.createdAt)
      ? record.createdAt
      : null
  if (
    createdAt === null ||
    now - createdAt > CONDUCTOR_LAUNCH_INTENT_TTL_MS ||
    createdAt - now > 10_000
  )
    return null

  const draft = readString(record.draft)
  const projectOverride = readProjectOverride(record.projectOverride)
  if (!draft || !projectOverride) return null

  return {
    source: 'projects',
    createdAt,
    draft,
    projectOverride,
  }
}

export function loadConductorLaunchIntent(
  storage?: Pick<Storage, 'getItem' | 'removeItem'>,
): ConductorLaunchIntent | null {
  const targetStorage = storage ?? globalThis.localStorage
  try {
    const raw = targetStorage.getItem(CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY)
    if (!raw) return null
    return parseConductorLaunchIntent(JSON.parse(raw))
  } catch {
    return null
  }
}

export function clearConductorLaunchIntent(
  storage?: Pick<Storage, 'removeItem'>,
): void {
  const targetStorage = storage ?? globalThis.localStorage
  try {
    targetStorage.removeItem(CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY)
  } catch {
    // Ignore storage failures.
  }
}

export function consumeConductorLaunchIntent(
  storage?: Pick<Storage, 'getItem' | 'removeItem'>,
): ConductorLaunchIntent | null {
  const intent = loadConductorLaunchIntent(storage)
  clearConductorLaunchIntent(storage)
  return intent
}

export function persistConductorLaunchIntent(
  intent: Omit<ConductorLaunchIntent, 'createdAt'> & { createdAt?: number },
  storage?: Pick<Storage, 'setItem' | 'removeItem'>,
): void {
  const targetStorage = storage ?? globalThis.localStorage
  try {
    const completeIntent: ConductorLaunchIntent = {
      ...intent,
      createdAt: intent.createdAt ?? Date.now(),
    }
    targetStorage.setItem(
      CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY,
      JSON.stringify(completeIntent),
    )
    if (completeIntent.draft.trim()) {
      targetStorage.setItem(
        CONDUCTOR_GOAL_DRAFT_STORAGE_KEY,
        completeIntent.draft,
      )
    } else {
      targetStorage.removeItem(CONDUCTOR_GOAL_DRAFT_STORAGE_KEY)
    }
  } catch {
    // Ignore storage failures; direct Conductor launches still work.
  }
}
