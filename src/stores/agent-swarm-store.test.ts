import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSwarmStore } from './agent-swarm-store'
import type { SwarmSession } from './agent-swarm-store'
import type { GatewaySession } from '@/lib/gateway-api'

const FIXED_NOW = 1_700_000_000_000

function makeSession(overrides: Partial<GatewaySession> = {}): GatewaySession {
  return {
    key: 'subagent:agent-1',
    status: 'running',
    totalTokens: 100,
    updatedAt: FIXED_NOW,
    ...overrides,
  }
}

/** Minimal typed Response double; the store reads `ok`, `status`, `json()`. */
function makeResponse(
  init: { ok?: boolean; status?: number; json?: () => Promise<unknown> } = {},
): Response {
  const ok = init.ok ?? true
  const status = init.status ?? (ok ? 200 : 500)
  const json = init.json ?? (() => Promise.resolve({}))
  const response: Pick<Response, 'ok' | 'status' | 'json'> = {
    ok,
    status,
    json: json as Response['json'],
  }
  return response as Response
}

/** Stub fetch to return a sessions payload (the `{ sessions: [...] }` shape). */
function stubSessions(
  sessions: Array<GatewaySession>,
  wrapper: 'sessions' | 'data' = 'sessions',
): ReturnType<typeof vi.fn> {
  const body = wrapper === 'data' ? { data: { sessions } } : { sessions }
  const mock = vi.fn(() =>
    Promise.resolve(makeResponse({ json: () => Promise.resolve(body) })),
  )
  vi.stubGlobal('fetch', mock)
  return mock
}

function getStatuses(): Array<SwarmSession['swarmStatus']> {
  return useSwarmStore.getState().sessions.map((s) => s.swarmStatus)
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(FIXED_NOW)
  useSwarmStore.setState({
    sessions: [],
    isConnected: false,
    lastFetchedAt: 0,
    error: null,
    _intervalId: null,
  })
})

afterEach(() => {
  useSwarmStore.getState().stopPolling()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('agent-swarm-store fetchSessions success', () => {
  it('loads subagent sessions and marks the store connected', async () => {
    stubSessions([makeSession({ key: 'subagent:a' })])
    await useSwarmStore.getState().fetchSessions()

    const state = useSwarmStore.getState()
    expect(state.isConnected).toBe(true)
    expect(state.error).toBeNull()
    expect(state.lastFetchedAt).toBe(FIXED_NOW)
    expect(state.sessions).toHaveLength(1)
    expect(state.sessions[0]?.swarmStatus).toBe('running')
    expect(state.sessions[0]?.staleness).toBe(0)
  })

  it('reads sessions from the nested data wrapper', async () => {
    stubSessions([makeSession({ key: 'subagent:a' })], 'data')
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)
  })

  it('defaults to an empty list when neither shape is present', async () => {
    const mock = vi.fn(() =>
      Promise.resolve(makeResponse({ json: () => Promise.resolve({}) })),
    )
    vi.stubGlobal('fetch', mock)
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toEqual([])
    expect(useSwarmStore.getState().isConnected).toBe(true)
  })

  it('filters out non-subagent sessions', async () => {
    stubSessions([
      makeSession({ key: 'subagent:keep' }),
      makeSession({ key: 'main:chat' }),
      makeSession({ key: undefined }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)
    expect(useSwarmStore.getState().sessions[0]?.key).toBe('subagent:keep')
  })

  it('drops zero-token sessions that are older than the never-ran window', async () => {
    stubSessions([
      makeSession({
        key: 'subagent:stale',
        totalTokens: 0,
        tokenCount: 0,
        updatedAt: FIXED_NOW - 200_000,
      }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(0)
  })

  it('keeps a recent zero-token session inside the never-ran window', async () => {
    stubSessions([
      makeSession({
        key: 'subagent:fresh',
        totalTokens: 0,
        tokenCount: 0,
        updatedAt: FIXED_NOW - 1_000,
      }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)
  })

  it('keeps an old zero-token session that has an explicit error', async () => {
    stubSessions([
      makeSession({
        key: 'subagent:errored',
        totalTokens: 0,
        tokenCount: 0,
        updatedAt: FIXED_NOW - 200_000,
        errorMessage: 'it broke',
      }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)
    expect(useSwarmStore.getState().sessions[0]?.swarmStatus).toBe('error')
  })

  it('keeps an old zero-token session with a string updatedAt that parses recent', async () => {
    stubSessions([
      makeSession({
        key: 'subagent:str',
        totalTokens: 0,
        tokenCount: 0,
        updatedAt: new Date(FIXED_NOW - 1_000).toISOString(),
      }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)
  })

  it('drops a zero-token session whose updatedAt is missing (treated as epoch 0)', async () => {
    stubSessions([
      makeSession({
        key: 'subagent:noupdate',
        totalTokens: 0,
        tokenCount: 0,
        updatedAt: undefined,
      }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(0)
  })
})

describe('agent-swarm-store swarmStatus derivation', () => {
  async function statusFor(
    overrides: Partial<GatewaySession>,
  ): Promise<SwarmSession['swarmStatus'] | undefined> {
    stubSessions([makeSession({ key: 'subagent:s', ...overrides })])
    await useSwarmStore.getState().fetchSessions()
    return useSwarmStore.getState().sessions[0]?.swarmStatus
  }

  it('maps thinking/reasoning statuses to thinking', async () => {
    expect(await statusFor({ status: 'thinking' })).toBe('thinking')
    expect(await statusFor({ status: 'Reasoning' })).toBe('thinking')
  })

  it('maps error statuses to error', async () => {
    expect(await statusFor({ status: 'error' })).toBe('error')
    expect(await statusFor({ status: 'errored' })).toBe('error')
  })

  it('maps failed/cancelled/killed statuses to failed', async () => {
    expect(await statusFor({ status: 'failed' })).toBe('failed')
    expect(await statusFor({ status: 'cancelled' })).toBe('failed')
    expect(await statusFor({ status: 'canceled' })).toBe('failed')
    expect(await statusFor({ status: 'killed' })).toBe('failed')
  })

  it('maps completion synonyms to complete', async () => {
    for (const status of [
      'complete',
      'completed',
      'success',
      'succeeded',
      'done',
    ]) {
      expect(await statusFor({ status })).toBe('complete')
    }
  })

  it('maps idle/waiting/sleeping to idle', async () => {
    expect(await statusFor({ status: 'idle' })).toBe('idle')
    expect(await statusFor({ status: 'waiting' })).toBe('idle')
    expect(await statusFor({ status: 'sleeping' })).toBe('idle')
  })

  it('derives complete from staleness when tokens exist and no status', async () => {
    expect(
      await statusFor({
        status: '',
        totalTokens: 50,
        updatedAt: FIXED_NOW - 40_000,
      }),
    ).toBe('complete')
  })

  it('derives idle from staleness when no tokens, no status, no error', async () => {
    // Zero tokens, no explicit error: must be within the 120s never-ran window
    // to survive the filter, yet past the 60s idle threshold (line 56 branch).
    expect(
      await statusFor({
        status: undefined,
        totalTokens: 0,
        tokenCount: 0,
        updatedAt: FIXED_NOW - 70_000,
      }),
    ).toBe('idle')
  })

  it('falls back to running for a fresh session with no explicit status', async () => {
    expect(await statusFor({ status: '', updatedAt: FIXED_NOW - 1_000 })).toBe(
      'running',
    )
  })

  it('uses the tokenCount field when totalTokens is absent', async () => {
    expect(
      await statusFor({
        status: undefined,
        totalTokens: undefined,
        tokenCount: 25,
        updatedAt: FIXED_NOW - 40_000,
      }),
    ).toBe('complete')
  })

  it('parses a string updatedAt for staleness-based derivation', async () => {
    expect(
      await statusFor({
        status: '',
        totalTokens: 10,
        updatedAt: new Date(FIXED_NOW - 40_000).toISOString(),
      }),
    ).toBe('complete')
  })
})

describe('agent-swarm-store explicit error detection', () => {
  async function statusFor(
    overrides: Partial<GatewaySession>,
  ): Promise<SwarmSession['swarmStatus'] | undefined> {
    stubSessions([makeSession({ key: 'subagent:s', ...overrides })])
    await useSwarmStore.getState().fetchSessions()
    return useSwarmStore.getState().sessions[0]?.swarmStatus
  }

  it('forces error when stopReason is "error" even with a running status', async () => {
    expect(await statusFor({ status: 'running', stopReason: 'Error' })).toBe(
      'error',
    )
  })

  it('forces error from errorMessage', async () => {
    expect(await statusFor({ errorMessage: 'boom' })).toBe('error')
  })

  it('forces error from the error field', async () => {
    expect(await statusFor({ error: 'bad' })).toBe('error')
  })

  it('forces error from failureReason', async () => {
    expect(await statusFor({ failureReason: 'crashed' })).toBe('error')
  })

  it('forces error from lastError', async () => {
    expect(await statusFor({ lastError: 'stale failure' })).toBe('error')
  })

  it('ignores blank/whitespace error fields', async () => {
    expect(
      await statusFor({ status: 'running', errorMessage: '   ', error: '' }),
    ).toBe('running')
  })

  it('ignores a non-string error field', async () => {
    expect(await statusFor({ status: 'running', errorMessage: 42 })).toBe(
      'running',
    )
  })

  it('ignores a non-error stopReason', async () => {
    expect(await statusFor({ status: 'running', stopReason: 'end_turn' })).toBe(
      'running',
    )
  })
})

describe('agent-swarm-store sorting', () => {
  it('orders by status priority then by staleness ascending', async () => {
    stubSessions([
      makeSession({ key: 'subagent:done', status: 'complete' }),
      makeSession({ key: 'subagent:think', status: 'thinking' }),
      makeSession({ key: 'subagent:run', status: 'running' }),
      makeSession({ key: 'subagent:err', status: 'error' }),
      makeSession({ key: 'subagent:idle', status: 'idle' }),
      makeSession({ key: 'subagent:fail', status: 'failed' }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(getStatuses()).toEqual([
      'thinking',
      'running',
      'idle',
      'complete',
      'failed',
      'error',
    ])
  })

  it('breaks ties on equal status by lower staleness first', async () => {
    stubSessions([
      makeSession({
        key: 'subagent:older',
        status: 'running',
        updatedAt: FIXED_NOW - 5_000,
      }),
      makeSession({
        key: 'subagent:newer',
        status: 'running',
        updatedAt: FIXED_NOW - 1_000,
      }),
    ])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions.map((s) => s.key)).toEqual([
      'subagent:newer',
      'subagent:older',
    ])
  })
})

describe('agent-swarm-store fetchSessions errors', () => {
  it('records an http error and marks disconnected', async () => {
    const mock = vi.fn(() =>
      Promise.resolve(makeResponse({ ok: false, status: 503 })),
    )
    vi.stubGlobal('fetch', mock)
    await useSwarmStore.getState().fetchSessions()
    const state = useSwarmStore.getState()
    expect(state.isConnected).toBe(false)
    expect(state.error).toBe('HTTP 503')
  })

  it('records a thrown Error message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network gone'))),
    )
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().error).toBe('network gone')
    expect(useSwarmStore.getState().isConnected).toBe(false)
  })

  it('stringifies a non-Error rejection', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject('plain string failure')),
    )
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().error).toBe('plain string failure')
  })

  it('preserves prior sessions when a later fetch errors', async () => {
    stubSessions([makeSession({ key: 'subagent:a' })])
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)

    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('down'))),
    )
    await useSwarmStore.getState().fetchSessions()
    expect(useSwarmStore.getState().sessions).toHaveLength(1)
    expect(useSwarmStore.getState().isConnected).toBe(false)
  })
})

describe('agent-swarm-store polling', () => {
  it('fetches immediately and then on the interval', async () => {
    const mock = stubSessions([makeSession({ key: 'subagent:a' })])
    useSwarmStore.getState().startPolling(5_000)
    expect(mock).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(5_000)
    expect(mock).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(5_000)
    expect(mock).toHaveBeenCalledTimes(3)
  })

  it('defaults the interval to 5000ms', async () => {
    const mock = stubSessions([makeSession({ key: 'subagent:a' })])
    useSwarmStore.getState().startPolling()
    expect(mock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(4_999)
    expect(mock).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(mock).toHaveBeenCalledTimes(2)
  })

  it('does not start a second polling loop while already polling', () => {
    const mock = stubSessions([makeSession({ key: 'subagent:a' })])
    useSwarmStore.getState().startPolling(5_000)
    const firstId = useSwarmStore.getState()._intervalId
    useSwarmStore.getState().startPolling(5_000)
    expect(useSwarmStore.getState()._intervalId).toBe(firstId)
    // Only the original immediate fetch ran; the second call short-circuited.
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('stops polling and clears the interval id', async () => {
    const mock = stubSessions([makeSession({ key: 'subagent:a' })])
    useSwarmStore.getState().startPolling(5_000)
    useSwarmStore.getState().stopPolling()
    expect(useSwarmStore.getState()._intervalId).toBeNull()

    await vi.advanceTimersByTimeAsync(15_000)
    // Only the immediate fetch ran before stopping.
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('stopPolling is a no-op when not polling', () => {
    stubSessions([])
    expect(() => useSwarmStore.getState().stopPolling()).not.toThrow()
    expect(useSwarmStore.getState()._intervalId).toBeNull()
  })
})
