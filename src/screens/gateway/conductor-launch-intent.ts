export type ConductorLaunchIntentSource = 'projects'

export type ConductorProjectOverride = {
  activeProjectId: string | null
  activeProjectName: string | null
  activeProjectPath: string | null
  effectiveWorkingDirectory: string | null
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
      targetStorage.setItem(CONDUCTOR_GOAL_DRAFT_STORAGE_KEY, completeIntent.draft)
    } else {
      targetStorage.removeItem(CONDUCTOR_GOAL_DRAFT_STORAGE_KEY)
    }
  } catch {
    // Ignore storage failures; direct Conductor launches still work.
  }
}
