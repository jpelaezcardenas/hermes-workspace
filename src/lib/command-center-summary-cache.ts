export const COMMAND_CENTER_SUMMARY_CACHE_KEY = 'cael.command-center.summary.v1'

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export type CommandCenterSummaryCacheRecord<T> = {
  version: 1
  cachedAt: string
  envelope: T
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isCacheRecord<T>(
  value: unknown,
): value is CommandCenterSummaryCacheRecord<T> {
  if (!isRecord(value)) return false
  return (
    value.version === 1 &&
    typeof value.cachedAt === 'string' &&
    isRecord(value.envelope)
  )
}

export function readCommandCenterSummaryCache<T>(
  storage: StorageLike | null | undefined,
  key = COMMAND_CENTER_SUMMARY_CACHE_KEY,
): CommandCenterSummaryCacheRecord<T> | null {
  if (!storage) return null
  try {
    const raw = storage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    return isCacheRecord<T>(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function writeCommandCenterSummaryCache<T>(
  storage: StorageLike | null | undefined,
  envelope: T,
  now = new Date(),
  key = COMMAND_CENTER_SUMMARY_CACHE_KEY,
): CommandCenterSummaryCacheRecord<T> | null {
  if (!storage) return null
  const cached: CommandCenterSummaryCacheRecord<T> = {
    version: 1,
    cachedAt: now.toISOString(),
    envelope,
  }
  try {
    storage.setItem(key, JSON.stringify(cached))
    return cached
  } catch {
    return null
  }
}
