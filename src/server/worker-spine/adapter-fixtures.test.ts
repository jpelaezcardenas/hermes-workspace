import { describe, expect, it } from 'vitest'
import { requiredUnsafeMarkers, workerSpineAdapterFixtures } from './adapter-fixtures'

describe('workerSpineAdapterFixtures', () => {
  it('uses unique fake queue IDs and fixed timestamps', () => {
    const fixtures = Object.values(workerSpineAdapterFixtures)
    const ids = fixtures.map((fixture) => fixture.queueItemId)

    expect(new Set(ids).size).toBe(ids.length)
    expect(fixtures.every((fixture) => fixture.nowIso === '2026-06-06T12:00:00.000Z')).toBe(true)
    expect(fixtures.every((fixture) => fixture.queueItemId?.startsWith('fake-queue-'))).toBe(true)
  })

  it('does not contain real credential-shaped content', () => {
    const serialized = JSON.stringify(workerSpineAdapterFixtures).toLowerCase()

    expect(serialized).not.toContain('sk-')
    expect(serialized).not.toContain('bearer ')
    expect(serialized).not.toContain('/users/hermes')
    expect(serialized).not.toContain('auth.json')
    expect(serialized).not.toContain('.env')
  })

  it('declares required fake unsafe markers', () => {
    expect(requiredUnsafeMarkers).toEqual([
      'FAKE_TOKEN_SHOULD_NOT_RENDER',
      'FAKE_AUTH_HEADER_SHOULD_NOT_RENDER',
      'FAKE_COOKIE_SHOULD_NOT_RENDER',
      'FAKE_ENV_PATH_SHOULD_NOT_RENDER',
      'FAKE_AUTH_JSON_PATH_SHOULD_NOT_RENDER',
      'FAKE_STACK_TRACE_SHOULD_NOT_RENDER',
      'FAKE_RAW_PROMPT_SHOULD_NOT_RENDER',
      'FAKE_RAW_COMPLETION_SHOULD_NOT_RENDER',
      'FAKE_PRIVATE_BODY_SHOULD_NOT_RENDER',
      'FAKE_LONG_LOG_SHOULD_NOT_RENDER',
    ])
  })
})
