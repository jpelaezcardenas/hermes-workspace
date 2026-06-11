import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  getCanonicalHermesSessionConfig,
  resolveSessionKey,
} from './session-utils'

describe('Workspace session resolution', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('uses explicit non-synthetic session keys unchanged', async () => {
    vi.stubEnv(
      'HERMES_WORKSPACE_CANONICAL_SESSION_KEY',
      'agent:main:telegram:dm:8346394033',
    )

    await expect(
      resolveSessionKey({ rawSessionKey: 'workspace-local-session' }),
    ).resolves.toEqual({
      sessionKey: 'workspace-local-session',
      resolvedVia: 'raw',
    })
  })

  it('maps empty/default Workspace chat to the canonical Hermes session when configured', async () => {
    vi.stubEnv(
      'HERMES_WORKSPACE_CANONICAL_SESSION_KEY',
      'agent:main:telegram:dm:8346394033',
    )
    vi.stubEnv('HERMES_WORKSPACE_CANONICAL_SESSION_FRIENDLY_ID', 'Hermes Ugo')

    expect(getCanonicalHermesSessionConfig()).toEqual({
      sessionKey: 'agent:main:telegram:dm:8346394033',
      friendlyId: 'Hermes Ugo',
    })

    await expect(resolveSessionKey({ rawSessionKey: '' })).resolves.toEqual({
      sessionKey: 'agent:main:telegram:dm:8346394033',
      resolvedVia: 'canonical',
    })
  })

  it('maps synthetic main/new keys to the canonical Hermes session', async () => {
    vi.stubEnv(
      'HERMES_WORKSPACE_CANONICAL_SESSION_KEY',
      'agent:main:telegram:dm:8346394033',
    )

    await expect(resolveSessionKey({ rawSessionKey: 'main' })).resolves.toEqual({
      sessionKey: 'agent:main:telegram:dm:8346394033',
      resolvedVia: 'canonical',
    })
    await expect(resolveSessionKey({ rawSessionKey: 'new' })).resolves.toEqual({
      sessionKey: 'agent:main:telegram:dm:8346394033',
      resolvedVia: 'canonical',
    })
  })
})
