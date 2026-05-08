import { describe, expect, it } from 'vitest'
import { formatSwarmWorkerLabel, resolveSwarmWorkerDisplayName } from './swarm-roster'

describe('swarm roster presentation helpers', () => {
  it('prefers roster names for human-facing display labels', () => {
    expect(resolveSwarmWorkerDisplayName('swarm2', { name: 'Backend Foundation' })).toBe('Backend Foundation')
    expect(formatSwarmWorkerLabel('swarm2', { name: 'Backend Foundation', role: 'Runtime Contracts' })).toBe(
      'Backend Foundation — Runtime Contracts',
    )
  })

  it('falls back to title-cased machine ids and default roles when roster data is missing', () => {
    expect(resolveSwarmWorkerDisplayName('swarm2')).toBe('Swarm2')
    expect(formatSwarmWorkerLabel('swarm2')).toBe('Swarm2 — Backend Foundation')
  })
})
