import { describe, expect, it } from 'vitest'
import { createRemoteStatus, remoteUrlMatchesExpectedRepo } from './claude-update'

describe('claude update repo gating', () => {
  it('matches Hermes C&C Interface repo aliases', () => {
    expect(remoteUrlMatchesExpectedRepo('https://github.com/blackscience/hermes-c-c-interface.git', ['hermes-c-c-interface'])).toBe(true)
    expect(remoteUrlMatchesExpectedRepo('git@github.com:blackscience/hermes-c-c-interface.git', ['blackscience/hermes-c-c-interface'])).toBe(true)
    expect(remoteUrlMatchesExpectedRepo('git@github.com:outsourc-e/hermes-workspace.git', ['outsourc-e/hermes-workspace'])).toBe(true)
  })

  it('blocks update availability for wrong remote repos even when heads differ', () => {
    const status = createRemoteStatus({
      name: 'origin',
      label: 'Hermes C&C Interface',
      expectedRepo: 'hermes-c-c-interface',
      aliases: ['hermes-c-c-interface'],
      url: 'https://github.com/example/not-workspace.git',
      currentHead: 'local',
      remoteHead: 'remote',
    })

    expect(status.repoMatches).toBe(false)
    expect(status.updateAvailable).toBe(false)
    expect(status.error).toContain('expected hermes-c-c-interface')
  })

  it('allows update availability only for the expected repo with a newer remote head', () => {
    const status = createRemoteStatus({
      name: 'upstream',
      label: 'Hermes Agent',
      expectedRepo: 'hermes-agent',
      aliases: ['hermes-agent'],
      url: 'https://github.com/NousResearch/hermes-agent.git',
      currentHead: 'local',
      remoteHead: 'remote',
    })

    expect(status.repoMatches).toBe(true)
    expect(status.updateAvailable).toBe(true)
    expect(status.error).toBeNull()
  })
})
