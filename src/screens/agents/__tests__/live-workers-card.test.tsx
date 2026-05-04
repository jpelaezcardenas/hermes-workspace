// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  LiveWorkersCardView,
  liveWorkerRowDomId,
} from '../components/live-workers-card'
import type { RunningKanbanWorker } from '../hooks/use-operations'

// We render the pure view component (no hooks) so we don't need a full React
// component test setup — this repo doesn't yet have one and TanStack Start's
// SSR plugin chain breaks the hook dispatcher under vitest. The wrapping
// LiveWorkersCard is a thin hook layer over LiveWorkersCardView.

const NOW = 1_700_000_000_000

function worker(overrides: Partial<RunningKanbanWorker> = {}): RunningKanbanWorker {
  return {
    taskId: overrides.taskId ?? 't_test_1',
    title: overrides.title ?? 'WS-XX: example task',
    assignee: 'assignee' in overrides ? (overrides.assignee ?? null) : 'coding',
    startedAt: overrides.startedAt ?? NOW - 23 * 60_000,
  }
}

describe('LiveWorkersCardView', () => {
  it('renders the empty state when no workers are running', () => {
    const html = renderToStaticMarkup(
      <LiveWorkersCardView workers={[]} now={NOW} />,
    )
    expect(html).toContain('data-testid="live-workers-card"')
    expect(html).toContain('No live workers.')
    expect(html).not.toContain('data-testid="live-worker-row"')
    expect(html).toContain('aria-label="0 running"')
  })

  it('renders one row per running worker', () => {
    const workers = [
      worker({ taskId: 't_a', title: 'Task A', assignee: 'coding' }),
      worker({ taskId: 't_b', title: 'Task B', assignee: 'research' }),
      worker({ taskId: 't_c', title: 'Task C', assignee: null }),
    ]
    const html = renderToStaticMarkup(
      <LiveWorkersCardView workers={workers} now={NOW} />,
    )
    const rowMatches = html.match(/data-testid="live-worker-row"/g) ?? []
    expect(rowMatches).toHaveLength(3)
    expect(html).toContain(`id="${liveWorkerRowDomId('t_a')}"`)
    expect(html).toContain(`id="${liveWorkerRowDomId('t_b')}"`)
    expect(html).toContain(`id="${liveWorkerRowDomId('t_c')}"`)
    // Assignee chips rendered for non-null assignees only.
    const assigneeChips = html.match(/data-testid="live-worker-assignee"/g) ?? []
    expect(assigneeChips).toHaveLength(2)
    expect(html).toContain('aria-label="3 running"')
    expect(html).not.toContain('No live workers.')
  })

  it('renders View Log links pointing at /missions?focus=<taskId>', () => {
    const html = renderToStaticMarkup(
      <LiveWorkersCardView
        workers={[worker({ taskId: 't_xyz', title: 'T xyz' })]}
        now={NOW}
      />,
    )
    expect(html).toContain('href="/missions?focus=t_xyz"')
    expect(html).toContain('aria-label="View log for T xyz"')
  })

  it('renders elapsed minutes pill from now/startedAt', () => {
    const html = renderToStaticMarkup(
      <LiveWorkersCardView
        workers={[worker({ taskId: 't_e', startedAt: NOW - 23 * 60_000 })]}
        now={NOW}
      />,
    )
    expect(html).toContain('aria-label="Elapsed 23m"')
  })
})
