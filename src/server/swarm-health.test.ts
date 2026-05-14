import { describe, expect, it } from 'vitest'
import { buildWorkerHealth } from './swarm-health'

describe('swarm health semantic wrappers', () => {
  it('resolves wrapperFound from roster wrapper field instead of worker id', () => {
    const health = buildWorkerHealth(
      {
        id: 'builder',
        profile: 'builder',
        wrapper: 'builder:task',
      },
      {
        profilesBase: '/profiles',
        wrapperBase: '/bin',
        exists: (path) => path === '/profiles/builder' || path === '/bin/builder:task',
        readWorkerConfig: () => ({ model: 'gpt-5.5', provider: 'openai-codex' }),
        scanRecentAuthErrors: () => ({ count: 0, lastAt: null, lastMessage: null }),
      },
    )

    expect(health).toMatchObject({
      workerId: 'builder',
      profileFound: true,
      wrapperFound: true,
      model: 'gpt-5.5',
      provider: 'openai-codex',
      recentAuthErrors: 0,
    })
  })
})
