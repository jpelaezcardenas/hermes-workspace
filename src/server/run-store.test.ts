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

  it('expires accepted runs faster than active runs when no server run is registered', async () => {
    const { createPersistedRun, getActiveRunForSession, updatePersistedRun } =
      await import('./run-store')

    await createPersistedRun({
      runId: 'run-accepted-stale',
      sessionKey: 'session-1',
    })

    const staleTime = Date.now() - 3 * 60 * 1000
    await updatePersistedRun('session-1', 'run-accepted-stale', (run) => ({
      ...run,
      lastEventAt: staleTime,
    }))

    await expect(getActiveRunForSession('session-1')).resolves.toBeNull()
  })

  it('keeps active runs recoverable longer than accepted handshakes', async () => {
    const { createPersistedRun, getActiveRunForSession, updatePersistedRun } =
      await import('./run-store')

    await createPersistedRun({
      runId: 'run-active-recent',
      sessionKey: 'session-1',
    })

    const recentTime = Date.now() - 3 * 60 * 1000
    await updatePersistedRun('session-1', 'run-active-recent', (run) => ({
      ...run,
      status: 'active',
      lastEventAt: recentTime,
    }))

    const active = await getActiveRunForSession('session-1')
    expect(active?.runId).toBe('run-active-recent')
  })

  it('lists recent persisted runs across sessions', async () => {
    const { createPersistedRun, listRecentPersistedRuns, updatePersistedRun } =
      await import('./run-store')

    await createPersistedRun({ runId: 'run-a', sessionKey: 'session-a' })
    await createPersistedRun({ runId: 'run-b', sessionKey: 'session-b' })

    await updatePersistedRun('session-a', 'run-a', (run) => ({
      ...run,
      lastEventAt: 10,
    }))
    await updatePersistedRun('session-b', 'run-b', (run) => ({
      ...run,
      lastEventAt: 20,
    }))

    const runs = await listRecentPersistedRuns(2)
    expect(runs.map((run) => run.runId)).toEqual(['run-b', 'run-a'])
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
