import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const originalHermesHome = process.env.HERMES_HOME
let tempHome: string | null = null

beforeEach(() => {
  vi.resetModules()
  tempHome = mkdtempSync(join(tmpdir(), 'hermes-chat-runtime-'))
  process.env.HERMES_HOME = tempHome
})

afterEach(() => {
  if (tempHome) rmSync(tempHome, { recursive: true, force: true })
  tempHome = null
  if (originalHermesHome === undefined) delete process.env.HERMES_HOME
  else process.env.HERMES_HOME = originalHermesHome
  vi.resetModules()
})

describe('chat-runtime-store', () => {
  it('persists cursor-addressable chat events by thread', async () => {
    const {
      appendChatRuntimeEvent,
      getChatRuntimeSnapshot,
      listChatRuntimeEvents,
      listChatRuntimeThreads,
    } = await import('./chat-runtime-store')

    const first = await appendChatRuntimeEvent('turn.accepted', {
      sessionKey: 'session-1',
      runId: 'run-1',
    })
    await appendChatRuntimeEvent('chunk', {
      sessionKey: 'session-1',
      runId: 'run-1',
      text: 'hello',
    })

    const replay = await listChatRuntimeEvents('session-1', {
      afterCursor: first.cursor,
    })
    expect(replay.map((event) => event.event)).toEqual(['chunk'])

    const snapshot = await getChatRuntimeSnapshot('session-1')
    expect(snapshot.cursor).toBe('2')
    expect(snapshot.events).toHaveLength(2)

    const threads = await listChatRuntimeThreads()
    expect(threads[0]).toMatchObject({
      threadId: 'session-1',
      eventCount: 2,
      lastEvent: 'chunk',
      lastRunId: 'run-1',
    })
  })
})
