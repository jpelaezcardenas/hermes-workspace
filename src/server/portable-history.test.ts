import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  selectPortableConversationHistory,
  shouldReplayPortableHistory,
} from './portable-history'

describe('portable history replay', () => {
  const originalForceFlag = process.env.HERMES_WORKSPACE_FORCE_HISTORY

  beforeEach(() => {
    delete process.env.HERMES_WORKSPACE_FORCE_HISTORY
  })

  afterEach(() => {
    if (originalForceFlag === undefined) {
      delete process.env.HERMES_WORKSPACE_FORCE_HISTORY
    } else {
      process.env.HERMES_WORKSPACE_FORCE_HISTORY = originalForceFlag
    }
  })

  it('skips replay when the gateway can bind portable chat to a server session', () => {
    expect(
      shouldReplayPortableHistory({
        bearerToken: 'token',
      }),
    ).toBe(false)

    expect(
      selectPortableConversationHistory(
        [{ role: 'assistant', content: 'old reply' }],
        [{ role: 'user', content: 'fallback' }],
        { bearerToken: 'token' },
      ),
    ).toEqual([])
  })

  it('replays persisted history for direct local-provider requests', () => {
    expect(
      selectPortableConversationHistory(
        [{ role: 'assistant', content: 'old reply' }],
        [{ role: 'user', content: 'fallback' }],
        { localBaseUrl: 'http://127.0.0.1:11434', bearerToken: 'token' },
      ),
    ).toEqual([{ role: 'assistant', content: 'old reply' }])
  })

  it('falls back to client-sent history when no persisted local session exists', () => {
    expect(
      selectPortableConversationHistory(
        [],
        [{ role: 'user', content: 'fallback' }],
        { bearerToken: '' },
      ),
    ).toEqual([{ role: 'user', content: 'fallback' }])
  })

  it('replays persisted history when HERMES_WORKSPACE_FORCE_HISTORY=1 even with a bearer token', () => {
    process.env.HERMES_WORKSPACE_FORCE_HISTORY = '1'

    expect(
      shouldReplayPortableHistory({
        bearerToken: 'token',
      }),
    ).toBe(true)

    expect(
      selectPortableConversationHistory(
        [{ role: 'assistant', content: 'old reply' }],
        [{ role: 'user', content: 'fallback' }],
        { bearerToken: 'token' },
      ),
    ).toEqual([{ role: 'assistant', content: 'old reply' }])
  })

  it('preserves default skip-replay behavior when the force flag is unset', () => {
    expect(
      shouldReplayPortableHistory({
        bearerToken: 'token',
      }),
    ).toBe(false)
  })
})
