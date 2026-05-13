import { describe, expect, it, vi } from 'vitest'
import {
  CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY,
  CONDUCTOR_LAUNCH_INTENT_TTL_MS,
  consumeConductorLaunchIntent,
  parseConductorLaunchIntent,
  persistConductorLaunchIntent,
} from './conductor-launch-intent'

function createMemoryStorage() {
  const values = new Map<string, string>()
  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value)
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key)
    }),
    values,
  }
}

describe('conductor launch intent', () => {
  it('parses valid project launch intent and preserves project override', () => {
    const now = Date.now()
    const intent = parseConductorLaunchIntent(
      {
        source: 'projects',
        createdAt: now,
        draft: 'Build: ship slice',
        projectOverride: {
          activeProjectId: 'project-1',
          activeProjectName: 'demo-app',
          activeProjectPath: '/workspace/demo-app',
          effectiveWorkingDirectory: '/workspace/demo-app',
        },
      },
      now,
    )

    expect(intent).toEqual({
      source: 'projects',
      createdAt: now,
      draft: 'Build: ship slice',
      projectOverride: {
        activeProjectId: 'project-1',
        activeProjectName: 'demo-app',
        activeProjectPath: '/workspace/demo-app',
        effectiveWorkingDirectory: '/workspace/demo-app',
      },
    })
  })

  it('rejects expired or malformed intents', () => {
    const now = Date.now()
    expect(
      parseConductorLaunchIntent(
        {
          source: 'projects',
          createdAt: now - CONDUCTOR_LAUNCH_INTENT_TTL_MS - 1,
          draft: 'too late',
          projectOverride: { activeProjectPath: '/workspace/demo-app' },
        },
        now,
      ),
    ).toBeNull()

    expect(
      parseConductorLaunchIntent(
        {
          source: 'projects',
          createdAt: now,
          draft: 'missing project',
          projectOverride: {},
        },
        now,
      ),
    ).toBeNull()
  })

  it('persists draft fallback and consumes intent once', () => {
    const storage = createMemoryStorage()
    persistConductorLaunchIntent(
      {
        source: 'projects',
        createdAt: Date.now(),
        draft: 'Build: from project',
        projectOverride: {
          activeProjectId: 'project-1',
          activeProjectName: 'demo-app',
          activeProjectPath: '/workspace/demo-app',
          effectiveWorkingDirectory: '/workspace/demo-app',
        },
      },
      storage,
    )

    expect(storage.values.get('conductor:goal-draft')).toBe(
      'Build: from project',
    )
    expect(storage.values.has(CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY)).toBe(true)

    const consumed = consumeConductorLaunchIntent(storage)
    expect(consumed?.projectOverride.activeProjectPath).toBe(
      '/workspace/demo-app',
    )
    expect(storage.values.has(CONDUCTOR_LAUNCH_INTENT_STORAGE_KEY)).toBe(false)
  })
})
