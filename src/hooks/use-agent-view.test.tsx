/** @vitest-environment jsdom */
import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  formatCost,
  formatRuntime,
  useAgentView,
  useAgentViewStore,
} from './use-agent-view'
import type { GatewaySession } from '@/lib/gateway-api'
import type { AgentPersona } from '@/lib/agent-personas'

// ---------------------------------------------------------------------------
// Module mocks
//
// useAgentView is wired to three side-effecting collaborators:
//   - `@/lib/gateway-api`     (fetchSessions -> the live session list it
//                              classifies into active/queued/history)
//   - `@/lib/agent-personas`  (assignPersona -> stable named-agent display)
//   - `@/stores/mission-store`(useMissionStore selector -> active mission +
//                              agentSessionMap for mission/non-mission split)
//
// We replace all three with typed fakes so the test can drive the hook's pure
// classification/normalization logic (isAgentSession filtering, status
// bucketing, token/cost/progress derivation) through deterministic inputs and
// assert the resulting active/queued/history arrays, plus the synchronous
// derived layout flags and the kill/cancel state transitions.
//
// `useAgentViewStore` is the hook's own (real) zustand store; it is reset in
// beforeEach so the open/queue/history toggles start from a known baseline.
// ---------------------------------------------------------------------------

const fetchSessionsMock =
  vi.fn<() => Promise<{ sessions?: Array<GatewaySession> }>>()

vi.mock('@/lib/gateway-api', () => ({
  fetchSessions: () => fetchSessionsMock(),
}))

// Deterministic persona so session names are predictable in assertions.
const stubPersona: AgentPersona = {
  name: 'Nova',
  role: 'Specialist',
  emoji: '\u{1F916}',
  color: 'text-blue-400',
  specialties: [],
}

vi.mock('@/lib/agent-personas', () => ({
  assignPersona: (_key: string, _task?: string): AgentPersona => stubPersona,
}))

// Mission store: a minimal selector-callable fake. Tests reassign
// `missionState` fields and the hook reads them via the selector.
type MissionSlice = {
  activeMission: { name: string; state: string } | null
  agentSessionMap: Record<string, string>
}

const missionState: MissionSlice = {
  activeMission: null,
  agentSessionMap: {},
}

vi.mock('@/stores/mission-store', () => ({
  useMissionStore: <T,>(selector: (state: MissionSlice) => T): T =>
    selector(missionState),
}))

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function session(over: Partial<GatewaySession>): GatewaySession {
  return { ...over }
}

/** A baseline running agent-kind session keyed `over.key`. */
function agentSession(over: Partial<GatewaySession>): GatewaySession {
  return { kind: 'agent', status: 'running', ...over }
}

const storeInitialState = useAgentViewStore.getState()

function setViewportWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  // Reset the real agent-view store to its declared defaults.
  useAgentViewStore.setState({
    isOpen: false,
    queueOpen: true,
    historyOpen: false,
  })
  missionState.activeMission = null
  missionState.agentSessionMap = {}
  fetchSessionsMock.mockResolvedValue({ sessions: [] })
  setViewportWidth(1280) // desktop by default
})

afterEach(() => {
  useAgentViewStore.setState(storeInitialState)
})

// ---------------------------------------------------------------------------
// Store-backed open/queue/history toggles
// ---------------------------------------------------------------------------

describe('useAgentView — panel store actions', () => {
  it('exposes the persisted open/queue/history flags and their setters', () => {
    const { result } = renderHook(() => useAgentView())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.queueOpen).toBe(true)
    expect(result.current.historyOpen).toBe(false)

    act(() => result.current.setOpen(true))
    expect(result.current.isOpen).toBe(true)

    act(() => result.current.toggleOpen())
    expect(result.current.isOpen).toBe(false)

    act(() => result.current.setQueueOpen(false))
    expect(result.current.queueOpen).toBe(false)

    act(() => result.current.setHistoryOpen(true))
    expect(result.current.historyOpen).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Derived layout flags (viewport-driven)
// ---------------------------------------------------------------------------

describe('useAgentView — layout derivation', () => {
  it('is desktop with a visible panel + offset when open above the breakpoint', () => {
    setViewportWidth(1280)
    useAgentViewStore.setState({ isOpen: true })
    const { result } = renderHook(() => useAgentView())

    expect(result.current.isDesktop).toBe(true)
    expect(result.current.panelVisible).toBe(true)
    expect(result.current.showFloatingToggle).toBe(false)
    expect(result.current.panelWidth).toBe(288)
    expect(result.current.panelOffset).toBe(288)
    expect(result.current.shouldAutoOpen).toBe(false)
  })

  it('shows the floating toggle (no offset) when desktop but closed', () => {
    setViewportWidth(1280)
    useAgentViewStore.setState({ isOpen: false })
    const { result } = renderHook(() => useAgentView())

    expect(result.current.isDesktop).toBe(true)
    expect(result.current.panelVisible).toBe(false)
    expect(result.current.showFloatingToggle).toBe(true)
    expect(result.current.panelOffset).toBe(0)
  })

  it('is not desktop below the breakpoint: no panel and no floating toggle', () => {
    setViewportWidth(800)
    useAgentViewStore.setState({ isOpen: true })
    const { result } = renderHook(() => useAgentView())

    expect(result.current.isDesktop).toBe(false)
    expect(result.current.panelVisible).toBe(false)
    expect(result.current.showFloatingToggle).toBe(false)
    expect(result.current.panelOffset).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Session classification (isAgentSession + status bucketing)
// ---------------------------------------------------------------------------

describe('useAgentView — session classification', () => {
  it('buckets running / queued / completed / failed agent sessions', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({ key: 'run-1', status: 'running' }),
        agentSession({ key: 'queue-1', status: 'queued' }),
        agentSession({ key: 'done-1', status: 'complete' }),
        agentSession({ key: 'fail-1', status: 'failed' }),
      ],
    })

    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.activeAgents.map((a) => a.id)).toEqual(['run-1'])
    expect(result.current.queuedAgents.map((a) => a.id)).toEqual(['queue-1'])
    // completed + failed both land in history.
    expect(result.current.historyAgents.map((a) => a.id).sort()).toEqual([
      'done-1',
      'fail-1',
    ])
    const failItem = result.current.historyAgents.find((h) => h.id === 'fail-1')
    expect(failItem?.status).toBe('failed')
    const doneItem = result.current.historyAgents.find((h) => h.id === 'done-1')
    expect(doneItem?.status).toBe('success')
    expect(result.current.isLiveConnected).toBe(true)
    expect(result.current.errorMessage).toBeNull()
    expect(result.current.activeCount).toBe(1)
  })

  it('treats a session with no explicit status as active (running fallback)', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [session({ kind: 'worker', key: 'no-status' })],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))
    expect(result.current.activeAgents.at(0)?.id).toBe('no-status')
  })

  it('excludes chat / main / cron sessions from the agent panel', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({ key: 'api-xyz', kind: 'chat' }),
        agentSession({ key: 'main' }),
        session({ key: 'team:main', kind: 'agent' }),
        session({ friendlyId: 'main', key: 'fid', kind: 'agent' }),
        agentSession({ key: 'cron-1', kind: 'cron' }),
        session({ key: 'plain', kind: 'random' }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.activeAgents).toEqual([])
    expect(result.current.queuedAgents).toEqual([])
    expect(result.current.historyAgents).toEqual([])
  })

  it('recognizes every delegated worker kind as an agent', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({ key: 'a', kind: 'agent' }),
        agentSession({ key: 'w', kind: 'worker' }),
        agentSession({ key: 'd', kind: 'delegate' }),
        agentSession({ key: 's', kind: 'swarm' }),
        agentSession({ key: 'sub', kind: 'subagent' }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(5))
  })

  it('dedupes sessions that share the same key', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({ key: 'dup', status: 'running' }),
        agentSession({ key: 'dup', status: 'running' }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.activeAgents).toHaveLength(1)
  })

  it('caps history at ten entries', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: Array.from({ length: 15 }, (_unused, i) =>
        agentSession({ key: `done-${i}`, status: 'complete' }),
      ),
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() =>
      expect(result.current.historyAgents.length).toBeGreaterThan(0),
    )
    expect(result.current.historyAgents).toHaveLength(10)
  })
})

// ---------------------------------------------------------------------------
// Field normalization on the mapped active agent
// ---------------------------------------------------------------------------

describe('useAgentView — active agent normalization', () => {
  it('derives name from persona, task text, model, tokens, cost and progress', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({
          key: 'rich',
          status: 'running',
          task: 'Write the launch post',
          model: 'anthropic/claude-opus',
          totalTokens: 50_000,
          progress: 42,
        }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))
    const agent = result.current.activeAgents.at(0)
    expect(agent?.name).toBe('\u{1F916} Nova — Specialist')
    expect(agent?.task).toBe('Write the launch post')
    expect(agent?.model).toBe('anthropic/claude-opus')
    expect(agent?.tokenCount).toBe(50_000)
    // estimatedCost falls back to tokenCount * 0.000004 rounded to 3dp.
    expect(agent?.estimatedCost).toBeCloseTo(0.2, 3)
    // progress is clamped into [1, 99].
    expect(agent?.progress).toBe(42)
    expect(agent?.isLive).toBe(true)
  })

  it('falls back to a placeholder task and default progress/model', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [agentSession({ key: 'bare', status: 'running' })],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))
    const agent = result.current.activeAgents.at(0)
    expect(agent?.task).toBe('Agent session in progress')
    expect(agent?.model).toBe('unknown')
    // running status with no explicit progress → default 35.
    expect(agent?.progress).toBe(35)
    expect(agent?.tokenCount).toBe(0)
  })

  it('extracts task text from a structured lastMessage content array', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({
          key: 'msg',
          status: 'running',
          lastMessage: {
            content: [
              { type: 'text', text: 'Part A' },
              { type: 'text', text: 'Part B' },
            ],
          },
        }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))
    expect(result.current.activeAgents.at(0)?.task).toBe('Part A Part B')
  })

  it('prefers status-derived completion via staleness heuristic', async () => {
    // A session with tokens but no explicit status, last updated long ago, is
    // inferred complete and routed to history.
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        session({
          kind: 'agent',
          key: 'stale',
          totalTokens: 1000,
          updatedAt: Date.now() - 200_000,
        }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() =>
      expect(result.current.historyAgents.length).toBeGreaterThan(0),
    )
    expect(result.current.historyAgents.at(0)?.id).toBe('stale')
  })
})

// ---------------------------------------------------------------------------
// Mission split
// ---------------------------------------------------------------------------

describe('useAgentView — mission filtering', () => {
  it('returns all active agents as non-mission when no mission is active', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [agentSession({ key: 'a1', status: 'running' })],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))
    expect(result.current.missionActiveAgents).toEqual([])
    expect(result.current.nonMissionActiveAgents).toHaveLength(1)
    expect(result.current.activeMissionName).toBe('')
    expect(result.current.activeMissionState).toBeNull()
  })

  it('splits agents by the active mission session map', async () => {
    missionState.activeMission = { name: 'Launch', state: 'running' }
    missionState.agentSessionMap = { writer: 'mission-1' }
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({ key: 'mission-1', status: 'running' }),
        agentSession({ key: 'rogue-1', status: 'running' }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(2))
    expect(result.current.missionActiveAgents.map((a) => a.id)).toEqual([
      'mission-1',
    ])
    expect(result.current.nonMissionActiveAgents.map((a) => a.id)).toEqual([
      'rogue-1',
    ])
    expect(result.current.activeMissionName).toBe('Launch')
    expect(result.current.activeMissionState).toBe('running')
  })
})

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

describe('useAgentView — gateway errors', () => {
  it('clears the lists and surfaces the error message when fetch rejects', async () => {
    fetchSessionsMock.mockRejectedValue(new Error('gateway down'))
    const { result } = renderHook(() => useAgentView())

    await waitFor(() =>
      expect(result.current.errorMessage).toBe('gateway down'),
    )
    expect(result.current.isLiveConnected).toBe(false)
    expect(result.current.isDemoMode).toBe(false)
    expect(result.current.activeAgents).toEqual([])
    expect(result.current.queuedAgents).toEqual([])
    expect(result.current.historyAgents).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('uses a generic message when the rejection is not an Error', async () => {
    fetchSessionsMock.mockRejectedValue('boom')
    const { result } = renderHook(() => useAgentView())

    await waitFor(() =>
      expect(result.current.errorMessage).toBe('Gateway unavailable'),
    )
  })
})

// ---------------------------------------------------------------------------
// killAgent / cancelQueueTask transitions
// ---------------------------------------------------------------------------

describe('useAgentView — kill & cancel', () => {
  it('moves a killed active agent into history as failed and removes it', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [agentSession({ key: 'victim', status: 'running' })],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))

    act(() => result.current.killAgent('victim'))

    expect(result.current.activeAgents).toEqual([])
    const killed = result.current.historyAgents.at(0)
    expect(killed?.status).toBe('failed')
    expect(killed?.name).toBe('\u{1F916} Nova — Specialist')
  })

  it('is a no-op when killing an unknown agent id', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [agentSession({ key: 'keep', status: 'running' })],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.activeAgents).toHaveLength(1))
    const beforeHistory = result.current.historyAgents.length

    act(() => result.current.killAgent('ghost'))

    expect(result.current.activeAgents).toHaveLength(1)
    expect(result.current.historyAgents).toHaveLength(beforeHistory)
  })

  it('removes a queued task on cancel', async () => {
    fetchSessionsMock.mockResolvedValue({
      sessions: [
        agentSession({ key: 'q1', status: 'queued' }),
        agentSession({ key: 'q2', status: 'queued' }),
      ],
    })
    const { result } = renderHook(() => useAgentView())

    await waitFor(() => expect(result.current.queuedAgents).toHaveLength(2))

    act(() => result.current.cancelQueueTask('q1'))

    expect(result.current.queuedAgents.map((t) => t.id)).toEqual(['q2'])
  })
})

// ---------------------------------------------------------------------------
// Pure formatters
// ---------------------------------------------------------------------------

describe('formatRuntime / formatCost', () => {
  it('formats runtime as minutes and zero-padded seconds', () => {
    expect(formatRuntime(0)).toBe('0m 00s')
    expect(formatRuntime(5)).toBe('0m 05s')
    expect(formatRuntime(125)).toBe('2m 05s')
  })

  it('formats cost with a dollar sign and three decimals', () => {
    expect(formatCost(0)).toBe('$0.000')
    expect(formatCost(1.5)).toBe('$1.500')
  })
})
