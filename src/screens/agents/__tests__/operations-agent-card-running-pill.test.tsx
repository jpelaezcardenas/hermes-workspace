// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  RunningWorkersPill,
  emitFocusLiveWorker,
} from '../components/operations-agent-card'
import {
  selectRunningWorkersForAgent,
  type RunningKanbanWorker,
} from '../hooks/use-operations'

function makeWorker(
  overrides: Partial<RunningKanbanWorker> = {},
): RunningKanbanWorker {
  return {
    taskId: overrides.taskId ?? 't_running_1',
    title: overrides.title ?? 'Running task',
    assignee:
      'assignee' in overrides ? (overrides.assignee ?? null) : 'coding',
    startedAt: overrides.startedAt ?? Date.now() - 60_000,
  }
}

describe('selectRunningWorkersForAgent', () => {
  it('matches workers whose assignee equals the agent name or id', () => {
    const workers: RunningKanbanWorker[] = [
      makeWorker({ taskId: 't1', assignee: 'coding' }),
      makeWorker({ taskId: 't2', assignee: 'research' }),
      makeWorker({ taskId: 't3', assignee: null }),
    ]
    const codingMatches = selectRunningWorkersForAgent(workers, {
      id: 'coding',
      name: 'coding',
    })
    expect(codingMatches.map((worker) => worker.taskId)).toEqual(['t1'])

    const opsMatches = selectRunningWorkersForAgent(workers, {
      id: 'ops',
      name: 'ops',
    })
    expect(opsMatches).toHaveLength(0)
  })

  it('also matches when assignee equals the agent id (not just name)', () => {
    const workers = [makeWorker({ taskId: 't_id', assignee: 'agent-7' })]
    const matches = selectRunningWorkersForAgent(workers, {
      id: 'agent-7',
      name: 'Different Display Name',
    })
    expect(matches.map((w) => w.taskId)).toEqual(['t_id'])
  })
})

describe('RunningWorkersPill markup', () => {
  it('renders the "N running" pill markup with correct attrs', () => {
    const html = renderToStaticMarkup(
      <RunningWorkersPill
        count={1}
        firstTaskId="t_focus"
        agentDisplayName="coding"
      />,
    )
    expect(html).toContain('data-testid="agent-running-pill"')
    expect(html).toContain('data-running-count="1"')
    expect(html).toContain('1 running')
    // Singular vs plural
    expect(html).toContain('1 running worker for coding')
  })

  it('uses plural form for >1 workers', () => {
    const html = renderToStaticMarkup(
      <RunningWorkersPill
        count={3}
        firstTaskId="t_focus"
        agentDisplayName="coding"
      />,
    )
    expect(html).toContain('3 running workers for coding')
    expect(html).toContain('data-running-count="3"')
  })
})

describe('emitFocusLiveWorker', () => {
  it('dispatches an operations:focus-live-worker CustomEvent with taskId', () => {
    const handler = vi.fn((event: Event) =>
      (event as CustomEvent<{ taskId?: string }>).detail?.taskId,
    )
    window.addEventListener('operations:focus-live-worker', handler)
    emitFocusLiveWorker('t_focus')
    window.removeEventListener('operations:focus-live-worker', handler)

    expect(handler).toHaveBeenCalledTimes(1)
    const eventArg = handler.mock.calls[0]![0] as CustomEvent<{
      taskId?: string
    }>
    expect(eventArg.detail?.taskId).toBe('t_focus')
  })
})
