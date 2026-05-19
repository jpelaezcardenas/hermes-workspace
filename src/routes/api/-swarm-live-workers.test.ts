import { describe, expect, it } from 'vitest'
import { buildSwarmLiveWorkersStartSummary } from '../../server/swarm-live-workers'

describe('buildSwarmLiveWorkersStartSummary', () => {
  it('summarizes all 15 worker startup results for the UI/API response', () => {
    const summary = buildSwarmLiveWorkersStartSummary([
      { workerId: 'swarm1', started: true, alreadyRunning: false, ok: true },
      { workerId: 'swarm2', started: false, alreadyRunning: true, ok: true },
      { workerId: 'swarm3', started: false, alreadyRunning: false, ok: false, error: 'tmux failed' },
    ])

    expect(summary).toEqual({
      requested: 3,
      ok: false,
      started: 1,
      alreadyRunning: 1,
      failed: 1,
    })
  })
})
