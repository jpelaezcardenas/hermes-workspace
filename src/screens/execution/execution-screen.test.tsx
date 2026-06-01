// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ExecutionScreen } from './execution-screen'

function renderWithQueryClient() {
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false } },
        })
      }
    >
      <ExecutionScreen />
    </QueryClientProvider>,
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ExecutionScreen', () => {
  it('renders the loading state', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => undefined)))

    renderWithQueryClient()

    expect(screen.getByText('Execution Layer wird geladen...')).toBeTruthy()
  })

  it('renders the core execution buckets from the API snapshot', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          new Response(
            JSON.stringify({
              ok: true,
              snapshot: {
                generatedAt: '2026-06-01T10:00:00.000Z',
                signal: 'Yellow',
                focus: 'Offene Codex-Handoffs klaeren.',
                today: [
                  {
                    title: 'Offenen Handoff abschliessen.',
                    owner: 'Codex',
                    timebox: '30 Minuten',
                    source: '/tmp/handoff.md',
                    doneWhen: 'Outbox liegt vor.',
                    risk: 'Low',
                  },
                ],
                waitingForChris: [
                  {
                    title: 'codegraph P2 freigeben.',
                    whyChris: 'RiskGate.',
                    risk: 'Medium',
                    source: '/tmp/decision.md',
                  },
                ],
                codexOpen: [
                  {
                    filename: 'codex-handoff-demo.md',
                    status: 'open',
                    source: '/tmp/handoff.md',
                    next: 'Bearbeiten.',
                  },
                ],
                wins: [],
                dontTouch: [
                  {
                    item: 'Neue Cronjobs.',
                    reason: 'Erst validieren.',
                    source: '/tmp/momentum.md',
                  },
                ],
                memoryCandidates: [],
                nextSmallestSlice: {
                  action: 'codex-handoff-demo.md abschliessen.',
                  whyThis: 'Open loop senken.',
                  acceptance: 'Outbox liegt vor.',
                  shouldBecomeCodexHandoff: false,
                },
                proofLog: [{ path: '/tmp/handoff.md', kind: 'codex-inbox' }],
                warnings: [],
              },
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          ),
        ),
      ),
    )

    renderWithQueryClient()

    await waitFor(() => {
      expect(screen.getByText('Heute steuerbar machen')).toBeTruthy()
    })
    expect(screen.getByText('Offenen Handoff abschliessen.')).toBeTruthy()
    expect(screen.getByText('codegraph P2 freigeben.')).toBeTruthy()
    expect(screen.getByText('codex-handoff-demo.md')).toBeTruthy()
    expect(screen.getByText('Neue Cronjobs.')).toBeTruthy()
  })
})
