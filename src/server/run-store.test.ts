import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const originalHermesHome = process.env.HERMES_HOME
const originalRunRecoveryMaxAge = process.env.HERMES_RUN_RECOVERY_MAX_AGE_MS

let tempHome: string | null = null

beforeEach(() => {
  vi.resetModules()
  tempHome = mkdtempSync(join(tmpdir(), 'hermes-run-store-'))
  process.env.HERMES_HOME = tempHome
})

afterEach(() => {
  if (tempHome) rmSync(tempHome, { recursive: true, force: true })
  tempHome = null
  if (originalHermesHome === undefined) delete process.env.HERMES_HOME
  else process.env.HERMES_HOME = originalHermesHome
  if (originalRunRecoveryMaxAge === undefined)
    delete process.env.HERMES_RUN_RECOVERY_MAX_AGE_MS
  else process.env.HERMES_RUN_RECOVERY_MAX_AGE_MS = originalRunRecoveryMaxAge
  vi.resetModules()
})

describe('run-store persistence', () => {
  it('preserves concurrent updates to the same run', async () => {
    const { addRunLifecycleEvent, createPersistedRun, getPersistedRun } =
      await import('./run-store')

    await createPersistedRun({ runId: 'run-1', sessionKey: 'session-1' })

    const events = Array.from({ length: 24 }, (_, index) => ({
      text: `event-${index}`,
      emoji: '',
      timestamp: index,
      isError: false,
    }))

    await Promise.all(
      events.map((event) => addRunLifecycleEvent('session-1', 'run-1', event)),
    )

    const stored = await getPersistedRun('session-1', 'run-1')
    expect(stored?.lifecycleEvents.map((event) => event.text).sort()).toEqual(
      events.map((event) => event.text).sort(),
    )
  })

  it('recovers a recent persisted run when the in-memory tracker is absent', async () => {
    const { createPersistedRun, getActiveRunForSession } =
      await import('./run-store')

    await createPersistedRun({
      runId: 'run-recent',
      sessionKey: 'session-1',
    })

    const active = await getActiveRunForSession('session-1')
    expect(active?.runId).toBe('run-recent')
  })

  it('ignores an old persisted run when no server run is still registered', async () => {
    const { createPersistedRun, getActiveRunForSession, updatePersistedRun } =
      await import('./run-store')

    await createPersistedRun({
      runId: 'run-old',
      sessionKey: 'session-1',
    })

    const staleTime = Date.now() - 31 * 60 * 1000
    await updatePersistedRun('session-1', 'run-old', (run) => ({
      ...run,
      lastEventAt: staleTime,
    }))

    await expect(getActiveRunForSession('session-1')).resolves.toBeNull()
  })

  it('keeps an old run recoverable while the server still tracks it', async () => {
    const { createPersistedRun, getActiveRunForSession, updatePersistedRun } =
      await import('./run-store')
    const { registerActiveSendRun, unregisterActiveSendRun } =
      await import('./send-run-tracker')

    await createPersistedRun({
      runId: 'run-active-old',
      sessionKey: 'session-1',
    })

    const staleTime = Date.now() - 31 * 60 * 1000
    await updatePersistedRun('session-1', 'run-active-old', (run) => ({
      ...run,
      lastEventAt: staleTime,
    }))

    registerActiveSendRun('run-active-old')
    try {
      const active = await getActiveRunForSession('session-1')
      expect(active?.runId).toBe('run-active-old')
    } finally {
      unregisterActiveSendRun('run-active-old')
    }
  })
})
