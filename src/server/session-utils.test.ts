import { describe, expect, it } from 'vitest'

import {
  normalizeDefaultChatSessionKey,
  resolveSessionKey,
} from './session-utils'

describe('session-utils', () => {
  it('normalizes legacy dashboard chat aliases to the portable main session', () => {
    expect(normalizeDefaultChatSessionKey('dashboard-chat')).toBe('main')
    expect(normalizeDefaultChatSessionKey('agent:main:main')).toBe('main')
    expect(normalizeDefaultChatSessionKey('agent:main:dashboard-chat')).toBe(
      'main',
    )
  })

  it('uses normalized raw keys before friendly aliases', async () => {
    await expect(
      resolveSessionKey({
        rawSessionKey: 'dashboard-chat',
        friendlyId: 'another-session',
      }),
    ).resolves.toEqual({ sessionKey: 'main', resolvedVia: 'raw' })
  })

  it('leaves concrete sessions unchanged', async () => {
    await expect(
      resolveSessionKey({ rawSessionKey: 'abc123', friendlyId: 'main' }),
    ).resolves.toEqual({ sessionKey: 'abc123', resolvedVia: 'raw' })
  })
})
