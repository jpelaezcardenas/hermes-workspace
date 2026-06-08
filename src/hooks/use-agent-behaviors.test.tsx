/** @vitest-environment jsdom */
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getActivityEmoji, useAgentBehaviors } from './use-agent-behaviors'
import type { SwarmSession } from '@/stores/agent-swarm-store'
import type { AgentPersona } from '@/lib/agent-personas'

// ---------------------------------------------------------------------------
// Module mocks
//
// useAgentBehaviors drives a 1s `setInterval` simulation loop and reads/writes
// the persona registry in `@/lib/agent-personas`. The behavior math in
// `@/components/agent-swarm/agent-behaviors` is pure, so we keep it real and
// only mock the persona registry (a module-global Map that would otherwise
// leak assignments across tests). We then drive the loop with fake timers and
// a stubbed `Math.random` so each tick's branch is deterministic, asserting on
// the returned view map.
// ---------------------------------------------------------------------------

const assignPersonaMock = vi.fn<(key: string, task?: string) => AgentPersona>()
const releasePersonaMock = vi.fn<(key: string) => void>()

function personaFor(key: string): AgentPersona {
  return {
    name: `Persona-${key}`,
    role: 'Engineer',
    emoji: '🤖',
    color: 'text-blue-400',
    specialties: [],
  }
}

vi.mock('@/lib/agent-personas', () => ({
  assignPersona: (key: string, task?: string) => assignPersonaMock(key, task),
  releasePersona: (key: string) => releasePersonaMock(key),
}))

function session(over: Partial<SwarmSession>): SwarmSession {
  return {
    key: 'k',
    swarmStatus: 'idle',
    staleness: 0,
    ...over,
  }
}

// Math.random is consumed by randomBetween (durations), random chat-bubble
// rolls, break-type choice, and cross-agent visit index picks. Pinning it to a
// fixed value makes those deterministic. 0.5 keeps the random work-chat roll
// (< 0.15) false and picks middle-of-range durations / break types.
let randomValue = 0.5

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(1_000_000)
  vi.spyOn(Math, 'random').mockImplementation(() => randomValue)
  assignPersonaMock.mockImplementation((key) => personaFor(key))
  releasePersonaMock.mockReset()
  randomValue = 0.5
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

/** Advance the simulation by N 1s ticks inside act(). */
function tick(times = 1): void {
  act(() => {
    vi.advanceTimersByTime(1_000 * times)
  })
}

// ===========================================================================
// getActivityEmoji — pure lookup
// ===========================================================================

describe('getActivityEmoji', () => {
  it('maps every activity to its emoji', () => {
    expect(getActivityEmoji('idle')).toBe('🧍')
    expect(getActivityEmoji('walking')).toBe('🚶')
    expect(getActivityEmoji('coding')).toBe('💻')
    expect(getActivityEmoji('thinking')).toBe('💭')
    expect(getActivityEmoji('water_break')).toBe('💧')
    expect(getActivityEmoji('coffee_break')).toBe('☕')
    expect(getActivityEmoji('lunch')).toBe('🍕')
    expect(getActivityEmoji('meeting')).toBe('🤝')
    expect(getActivityEmoji('chatting')).toBe('💬')
    expect(getActivityEmoji('celebrating')).toBe('🎉')
    expect(getActivityEmoji('frustrated')).toBe('😤')
  })
})

// ===========================================================================
// Initial view map construction
// ===========================================================================

describe('useAgentBehaviors — view map construction', () => {
  it('returns an empty map for no sessions', () => {
    const { result } = renderHook(() => useAgentBehaviors([]))
    expect(result.current.size).toBe(0)
  })

  it('keys a session by its `key`, exposing persona + emoji + defaults', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'alpha', swarmStatus: 'idle' })]),
    )

    expect(result.current.size).toBe(1)
    const view = result.current.get('alpha')
    expect(view).toBeDefined()
    expect(view?.sessionKey).toBe('alpha')
    expect(view?.personaName).toBe('Persona-alpha')
    // Brand-new agents start idle at their desk.
    expect(view?.activity).toBe('idle')
    expect(view?.activityEmoji).toBe('🧍')
    expect(view?.isWalking).toBe(false)
  })

  it('falls back to friendlyId when key is absent', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([
        session({ key: undefined, friendlyId: 'fr-1', swarmStatus: 'idle' }),
      ]),
    )
    expect(result.current.has('fr-1')).toBe(true)
    expect(result.current.get('fr-1')?.personaName).toBe('Persona-fr-1')
  })

  it('skips sessions whose key and friendlyId are both empty', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([
        session({ key: '', friendlyId: '', swarmStatus: 'idle' }),
        session({ key: 'real', swarmStatus: 'idle' }),
      ]),
    )
    expect(result.current.size).toBe(1)
    expect(result.current.has('real')).toBe(true)
  })

  it('forwards task/initialMessage/label to assignPersona for naming', () => {
    renderHook(() =>
      useAgentBehaviors([
        session({ key: 'a', task: 'build the api', swarmStatus: 'idle' }),
        session({
          key: 'b',
          task: undefined,
          initialMessage: 'fix the bug',
          swarmStatus: 'idle',
        }),
        session({
          key: 'c',
          task: undefined,
          initialMessage: undefined,
          label: 'just a label',
          swarmStatus: 'idle',
        }),
      ]),
    )

    const calls = assignPersonaMock.mock.calls
    const byKey = new Map(calls.map((c) => [c[0], c[1]]))
    expect(byKey.get('a')).toBe('build the api')
    expect(byKey.get('b')).toBe('fix the bug')
    expect(byKey.get('c')).toBe('just a label')
  })

  it('assigns distinct desks to multiple concurrent agents', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([
        session({ key: 'a', swarmStatus: 'idle' }),
        session({ key: 'b', swarmStatus: 'idle' }),
        session({ key: 'c', swarmStatus: 'idle' }),
      ]),
    )

    const desks = ['a', 'b', 'c'].map(
      (k) => result.current.get(k)?.deskPosition,
    )
    const serialized = desks.map((d) => `${d?.x},${d?.y}`)
    expect(new Set(serialized).size).toBe(3)
  })
})

// ===========================================================================
// Status transitions on tick
// ===========================================================================

describe('useAgentBehaviors — status transitions', () => {
  it('a running idle agent starts walking toward its desk on the first tick', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'run', swarmStatus: 'running' })]),
    )

    // Position starts at desk, so it is already "at target"; the tick flips
    // idle -> walking and then immediately arrives -> coding at the desk.
    tick()
    const view = result.current.get('run')
    expect(view?.activity).toBe('coding')
    expect(view?.activityEmoji).toBe('💻')
    expect(view?.expression).toBe('focused')
  })

  it('a complete session celebrates', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'done', swarmStatus: 'complete' })]),
    )

    tick()
    const view = result.current.get('done')
    expect(view?.activity).toBe('celebrating')
    expect(view?.activityEmoji).toBe('🎉')
    expect(view?.expression).toBe('excited')
    expect(view?.chatMessage).not.toBeNull()
  })

  it('celebration times out back to idle after CELEBRATE_MS', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'done', swarmStatus: 'complete' })]),
    )

    tick() // -> celebrating (activityStartTime = now)
    expect(result.current.get('done')?.activity).toBe('celebrating')
    // CELEBRATE_MS is 5s; advance past it.
    tick(6)
    const view = result.current.get('done')
    expect(view?.activity).toBe('idle')
    expect(view?.chatMessage).toBeNull()
    expect(view?.expression).toBe('neutral')
  })

  it('a failed session is frustrated, then times out to idle', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'bad', swarmStatus: 'failed' })]),
    )

    tick()
    const frustrated = result.current.get('bad')
    expect(frustrated?.activity).toBe('frustrated')
    expect(frustrated?.activityEmoji).toBe('😤')
    expect(frustrated?.expression).toBe('confused')

    tick(6)
    expect(result.current.get('bad')?.activity).toBe('idle')
  })

  it('a thinking session shows the thinking activity and bubble', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'th', swarmStatus: 'thinking' })]),
    )

    tick()
    const view = result.current.get('th')
    expect(view?.activity).toBe('thinking')
    expect(view?.activityEmoji).toBe('💭')
    expect(view?.chatMessage).toBe('💭 thinking...')
    expect(view?.expression).toBe('confused')
  })

  it('a coding agent leaves for a break once the coding window elapses', () => {
    const { result, rerender } = renderHook(
      (status: SwarmSession['swarmStatus']) =>
        useAgentBehaviors([session({ key: 'c', swarmStatus: status })]),
      { initialProps: 'running' as SwarmSession['swarmStatus'] },
    )

    // First tick: idle -> walking -> arrives at desk -> coding.
    tick()
    expect(result.current.get('c')?.activity).toBe('coding')

    // randomValue 0.5 -> CODING window midpoint ~22.5s and break type index 2
    // (lunch). Advance the clock well past the coding window, then tick.
    rerender('running')
    tick(25)

    const view = result.current.get('c')
    // After enough time the agent walks off toward a break location.
    expect([
      'walking',
      'water_break',
      'coffee_break',
      'lunch',
      'meeting',
    ]).toContain(view?.activity)
    // It is no longer sitting and coding.
    expect(view?.activity).not.toBe('coding')
  })
})

// ===========================================================================
// Cleanup of stale agents
// ===========================================================================

describe('useAgentBehaviors — cleanup', () => {
  it('drops agents no longer in the session list and releases their persona', () => {
    const { result, rerender } = renderHook(
      (sessions: Array<SwarmSession>) => useAgentBehaviors(sessions),
      {
        initialProps: [
          session({ key: 'a', swarmStatus: 'running' }),
          session({ key: 'b', swarmStatus: 'running' }),
        ],
      },
    )

    tick()
    expect(result.current.has('a')).toBe(true)
    expect(result.current.has('b')).toBe(true)

    // Remove 'b' from the active set.
    rerender([session({ key: 'a', swarmStatus: 'running' })])
    tick()

    expect(result.current.has('a')).toBe(true)
    expect(result.current.has('b')).toBe(false)
    expect(releasePersonaMock).toHaveBeenCalledWith('b')
  })
})

// ===========================================================================
// Direction / isWalking derivation
// ===========================================================================

describe('useAgentBehaviors — direction + isWalking', () => {
  it('reports right direction and not-walking when already at target', () => {
    const { result } = renderHook(() =>
      useAgentBehaviors([session({ key: 'a', swarmStatus: 'idle' })]),
    )
    const view = result.current.get('a')
    // position === targetPosition at rest, so dx is 0 -> 'right', not walking.
    expect(view?.direction).toBe('right')
    expect(view?.isWalking).toBe(false)
  })
})
