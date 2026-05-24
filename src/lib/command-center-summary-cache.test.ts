import { describe, expect, it } from 'vitest'
import {
  COMMAND_CENTER_SUMMARY_CACHE_KEY,
  readCommandCenterSummaryCache,
  writeCommandCenterSummaryCache,
} from './command-center-summary-cache'

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial))
  return {
    getItem(key: string) {
      return values.get(key) ?? null
    },
    setItem(key: string, value: string) {
      values.set(key, value)
    },
    removeItem(key: string) {
      values.delete(key)
    },
  }
}

describe('command center summary cache', () => {
  it('persists and restores the last successful envelope', () => {
    const storage = memoryStorage()
    const envelope = {
      ok: true,
      generatedAt: '2026-05-24T12:00:00.000Z',
      data: { version: '2026-05-24' },
    }

    const written = writeCommandCenterSummaryCache(
      storage,
      envelope,
      new Date('2026-05-24T12:01:00.000Z'),
    )
    const restored = readCommandCenterSummaryCache<typeof envelope>(storage)

    expect(written?.cachedAt).toBe('2026-05-24T12:01:00.000Z')
    expect(restored?.envelope).toEqual(envelope)
    expect(storage.getItem(COMMAND_CENTER_SUMMARY_CACHE_KEY)).toContain(
      '2026-05-24T12:01:00.000Z',
    )
  })

  it('ignores corrupt or incompatible cache records', () => {
    expect(readCommandCenterSummaryCache(memoryStorage())).toBeNull()
    expect(
      readCommandCenterSummaryCache(
        memoryStorage({ [COMMAND_CENTER_SUMMARY_CACHE_KEY]: 'not-json' }),
      ),
    ).toBeNull()
    expect(
      readCommandCenterSummaryCache(
        memoryStorage({
          [COMMAND_CENTER_SUMMARY_CACHE_KEY]: JSON.stringify({
            version: 2,
            cachedAt: '2026-05-24T12:01:00.000Z',
            envelope: {},
          }),
        }),
      ),
    ).toBeNull()
  })
})
