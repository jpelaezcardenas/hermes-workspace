import { describe, expect, it } from 'vitest'
import type { MissionHistoryEntry } from './hooks/mission-history'
import {
  buildFallbackMissionHistoryEntryForTrace,
  buildMissionHistoryTraceActionViewModel,
  buildMissionHistoryTraceInspectActionViewModel,
  buildMissionHistoryTraceInspectContractViewModel,
  buildMissionHistoryTraceLookupRefreshControl,
  buildMissionHistoryTraceLookupViewModel,
  buildMissionHistoryTraceRecoveryPanelViewModel,
  buildMissionHistoryTraceRecoveryActionsViewModel,
  buildMissionHistoryTraceButtonRenderViewModel,
  buildMissionHistoryTraceRenderActionViewModel,
  buildMissionHistoryTraceButtonClassName,
  buildMissionHistoryTraceButtonElementViewModel,
  buildMissionHistoryTraceRecoveryFeedbackViewModel,
  buildMissionHistoryTraceRecoveryRenderActionViewModel,
  buildMissionHistoryTraceRecoveryViewModel,
  buildMissionHistoryTraceViewModel,
  findMissionHistoryEntryByTraceSessionKey,
  readConductorTraceSessionKey,
} from './conductor-trace-hydration'

const baseEntry: MissionHistoryEntry = {
  id: 'mission-1',
  goal: 'Hydrate trace from Projects',
  startedAt: '2026-01-01T10:00:00.000Z',
  completedAt: '2026-01-01T10:05:00.000Z',
  workerCount: 1,
  totalTokens: 100,
  status: 'completed',
  projectPath: '/workspace/demo',
}

describe('conductor trace hydration', () => {
  it('reads a bounded trace session key from route search', () => {
    expect(
      readConductorTraceSessionKey({ traceSessionKey: ' session:abc ' }),
    ).toBe('session:abc')
    expect(readConductorTraceSessionKey({ traceSessionKey: '' })).toBeNull()
    expect(readConductorTraceSessionKey({ traceSessionKey: 123 })).toBeNull()
    expect(
      readConductorTraceSessionKey({ traceSessionKey: 'x'.repeat(260) }),
    ).toBeNull()
  })

  it('finds matching mission history by session key', () => {
    const match = findMissionHistoryEntryByTraceSessionKey(
      [
        { ...baseEntry, id: 'mission-a', sessionKey: 'session-a' },
        { ...baseEntry, id: 'mission-b', sessionKey: ' session-b ' },
      ],
      'session-b',
    )

    expect(match).toEqual(expect.objectContaining({ id: 'mission-b' }))
    expect(
      findMissionHistoryEntryByTraceSessionKey(
        [{ ...baseEntry, id: 'mission-a', sessionKey: 'session-a' }],
        'missing',
      ),
    ).toBeNull()
  })

  it('builds a safe fallback history entry when only trace session key is available', () => {
    const entry = buildFallbackMissionHistoryEntryForTrace(
      ' session:orphan ',
      '2026-01-02T00:00:00.000Z',
    )

    expect(entry).toEqual({
      id: 'trace-session-orphan',
      goal: 'Open Conductor trace session: session:orphan',
      startedAt: '2026-01-02T00:00:00.000Z',
      completedAt: '2026-01-02T00:00:00.000Z',
      workerCount: 1,
      totalTokens: 0,
      status: 'completed',
      projectPath: null,
      sessionKey: 'session:orphan',
      completeSummary:
        'No local mission history entry was found for this trace session. Use the session key to inspect the persisted Conductor/agent history.',
    })

    expect(buildFallbackMissionHistoryEntryForTrace('   ')).toBeNull()
  })

  it('builds a visible trace view model for a persisted history entry', () => {
    expect(
      buildMissionHistoryTraceViewModel({
        ...baseEntry,
        sessionKey: ' conductor:session:123 ',
      }),
    ).toEqual({
      sessionKey: 'conductor:session:123',
      sourceLabel: 'Persisted mission history',
      actionLabel: 'Copy session key',
      copyValue: 'conductor:session:123',
      helperText:
        'Use this key to correlate the mission with persisted Conductor/agent session history.',
      isFallback: false,
    })
  })

  it('marks fallback trace view models as session-key-only recoveries', () => {
    const fallback = buildFallbackMissionHistoryEntryForTrace(
      'orphan-session',
      '2026-01-02T00:00:00.000Z',
    )

    expect(buildMissionHistoryTraceViewModel(fallback)).toEqual({
      sessionKey: 'orphan-session',
      sourceLabel: 'Trace session key only',
      actionLabel: 'Copy session key',
      copyValue: 'orphan-session',
      helperText:
        'No local mission history entry was found. Copy this key to inspect persisted Conductor/agent history.',
      isFallback: true,
    })
  })

  it('omits the trace view model when the entry has no session key', () => {
    expect(buildMissionHistoryTraceViewModel(baseEntry)).toBeNull()
  })

  it('builds copy action feedback labels by status', () => {
    expect(buildMissionHistoryTraceActionViewModel('idle')).toEqual({
      label: 'Copy session key',
      helperText: null,
      tone: 'neutral',
      disabled: false,
    })
    expect(buildMissionHistoryTraceActionViewModel('copied')).toEqual({
      label: 'Copied',
      helperText: 'Session key copied to clipboard.',
      tone: 'success',
      disabled: false,
    })
    expect(buildMissionHistoryTraceActionViewModel('failed')).toEqual({
      label: 'Copy failed',
      helperText: 'Clipboard is unavailable. Select and copy the session key manually.',
      tone: 'danger',
      disabled: false,
    })
  })

  it('builds an inspect action that opens the persisted chat session by key', () => {
    expect(
      buildMissionHistoryTraceInspectActionViewModel(' conductor:session:123 '),
    ).toEqual({
      label: 'Inspect session',
      helperText:
        'Open the persisted chat session that backs this Conductor trace.',
      to: '/chat/$sessionKey',
      params: { sessionKey: 'conductor:session:123' },
      disabled: false,
    })
  })

  it('documents the inspect route MVP contract for raw trace session keys', () => {
    expect(
      buildMissionHistoryTraceInspectContractViewModel(' conductor:session:123 '),
    ).toEqual({
      route: '/chat/$sessionKey',
      routeParamName: 'sessionKey',
      routeParamValue: 'conductor:session:123',
      supportedByCurrentRoute: true,
      mode: 'raw-session-key-mvp',
      risk:
        'The chat route accepts the raw trace session key as its sessionKey param; a dedicated trace inspector is still deferred.',
    })
  })

  it('disables the inspect action without a session key', () => {
    expect(buildMissionHistoryTraceInspectActionViewModel('   ')).toEqual({
      label: 'Inspect session',
      helperText: 'No session key is available to inspect.',
      to: null,
      params: null,
      disabled: true,
    })
  })

  it('builds persisted session lookup status view models', () => {
    expect(buildMissionHistoryTraceLookupViewModel('idle')).toEqual({
      label: 'Persisted session lookup pending',
      helperText: 'Session lookup will start when a trace key is available.',
      tone: 'neutral',
      isChecking: false,
    })
    expect(buildMissionHistoryTraceLookupViewModel('checking')).toEqual({
      label: 'Checking persisted session…',
      helperText: 'Looking for a chat session matching this trace key.',
      tone: 'neutral',
      isChecking: true,
    })
    expect(buildMissionHistoryTraceLookupViewModel('found')).toEqual({
      label: 'Persisted session found',
      helperText: 'This trace can be inspected in chat history.',
      tone: 'success',
      isChecking: false,
    })
    expect(buildMissionHistoryTraceLookupViewModel('missing')).toEqual({
      label: 'Persisted session not found',
      helperText:
        'No persisted chat session was found for this key. You can still try opening it manually.',
      tone: 'warning',
      isChecking: false,
    })
    expect(buildMissionHistoryTraceLookupViewModel('error')).toEqual({
      label: 'Unable to check persisted session',
      helperText:
        'Session lookup failed. You can still try opening the session manually.',
      tone: 'warning',
      isChecking: false,
    })
  })

  it('builds lookup refresh controls for retryable and refreshable statuses', () => {
    expect(
      buildMissionHistoryTraceLookupRefreshControl({
        status: 'error',
        hasSessionKey: true,
        isRefreshing: false,
      }),
    ).toEqual({
      label: 'Retry lookup',
      title: 'Retry persisted session lookup for this trace key.',
      ariaLabel: 'Retry lookup: Retry persisted session lookup for this trace key.',
      disabled: false,
      isLoading: false,
      visible: true,
    })

    expect(
      buildMissionHistoryTraceLookupRefreshControl({
        status: 'found',
        hasSessionKey: true,
        isRefreshing: false,
      }),
    ).toEqual({
      label: 'Refresh status',
      title: 'Refresh persisted session lookup status.',
      ariaLabel: 'Refresh status: Refresh persisted session lookup status.',
      disabled: false,
      isLoading: false,
      visible: true,
    })

    expect(
      buildMissionHistoryTraceLookupRefreshControl({
        status: 'checking',
        hasSessionKey: true,
        isRefreshing: true,
      }),
    ).toEqual({
      label: 'Checking…',
      title: 'Persisted session lookup is already running.',
      ariaLabel: 'Checking persisted session lookup status.',
      disabled: true,
      isLoading: true,
      visible: true,
    })

    expect(
      buildMissionHistoryTraceLookupRefreshControl({
        status: 'idle',
        hasSessionKey: false,
        isRefreshing: false,
      }),
    ).toEqual({
      label: 'Refresh status',
      title: 'No trace session key is available to refresh.',
      ariaLabel: 'Refresh persisted session lookup status: no trace session key is available.',
      disabled: true,
      isLoading: false,
      visible: false,
    })
  })

  it('builds a trace recovery panel contract for fallback UI', () => {
    const fallback = buildFallbackMissionHistoryEntryForTrace(
      ' orphan-session ',
      '2026-01-02T00:00:00.000Z',
    )

    expect(
      buildMissionHistoryTraceRecoveryPanelViewModel({
        entry: fallback,
        lookupStatus: 'error',
        copyStatus: 'idle',
        lastAction: null,
        isRefreshingLookup: false,
      }),
    ).toEqual({
      trace: {
        sessionKey: 'orphan-session',
        sourceLabel: 'Trace session key only',
        actionLabel: 'Copy session key',
        copyValue: 'orphan-session',
        helperText:
          'No local mission history entry was found. Copy this key to inspect persisted Conductor/agent history.',
        isFallback: true,
      },
      lookup: {
        label: 'Unable to check persisted session',
        helperText:
          'Session lookup failed. You can still try opening the session manually.',
        tone: 'warning',
        isChecking: false,
      },
      lookupRefresh: {
        label: 'Retry lookup',
        title: 'Retry persisted session lookup for this trace key.',
        ariaLabel: 'Retry lookup: Retry persisted session lookup for this trace key.',
        disabled: false,
        isLoading: false,
        visible: true,
      },
      recovery: {
        title: 'Local mission history not found',
        description:
          'This trace was opened from a session key, but no local Conductor mission history entry matched it.',
        recommendation:
          'Persisted session lookup failed. You can still inspect manually or retry later.',
        tone: 'warning',
        actions: [
          'Try inspecting the session manually',
          'Copy the session key for support/debugging',
          'Retry lookup later',
        ],
      },
      recoveryActions: {
        primary: {
          kind: 'copy',
          label: 'Copy session key',
          helperText: null,
          disabled: false,
          tone: 'neutral',
        },
        secondary: {
          kind: 'inspect',
          label: 'Inspect manually',
          helperText: 'Open chat history while lookup is unavailable.',
          disabled: false,
        },
        tertiary: {
          kind: 'newMission',
          label: 'Start new mission',
          helperText: 'Start over if recovery is not possible.',
          disabled: false,
        },
      },
      feedback: null,
    })

    expect(
      buildMissionHistoryTraceRecoveryPanelViewModel({
        entry: baseEntry,
        lookupStatus: 'idle',
        copyStatus: 'idle',
        lastAction: null,
        isRefreshingLookup: false,
      }),
    ).toBeNull()
  })

  it('builds fallback trace recovery guidance from lookup status', () => {
    expect(buildMissionHistoryTraceRecoveryViewModel(false, 'found')).toBeNull()
    expect(buildMissionHistoryTraceRecoveryViewModel(true, 'found')).toEqual({
      title: 'Local mission history not found',
      description:
        'This trace was opened from a session key, but no local Conductor mission history entry matched it.',
      recommendation: 'Open the persisted session to inspect its chat history.',
      tone: 'success',
      actions: [
        'Inspect the persisted session',
        'Copy the session key for manual lookup',
        'Start a new mission if this trace is from another environment',
      ],
    })
    expect(buildMissionHistoryTraceRecoveryViewModel(true, 'missing')).toEqual({
      title: 'Local mission history not found',
      description:
        'This trace was opened from a session key, but no local Conductor mission history entry matched it.',
      recommendation:
        'No persisted session was found here. The key may be stale or from another workspace.',
      tone: 'warning',
      actions: [
        'Copy the session key for manual lookup',
        'Try inspecting the session anyway',
        'Start a new mission if recovery is not possible',
      ],
    })
    expect(buildMissionHistoryTraceRecoveryViewModel(true, 'error')).toEqual({
      title: 'Local mission history not found',
      description:
        'This trace was opened from a session key, but no local Conductor mission history entry matched it.',
      recommendation:
        'Persisted session lookup failed. You can still inspect manually or retry later.',
      tone: 'warning',
      actions: [
        'Try inspecting the session manually',
        'Copy the session key for support/debugging',
        'Retry lookup later',
      ],
    })
  })

  it('builds fallback trace recovery action controls from lookup and copy status', () => {
    expect(
      buildMissionHistoryTraceRecoveryActionsViewModel({
        isFallback: false,
        lookupStatus: 'found',
        copyStatus: 'idle',
        sessionKey: 'session-1',
      }),
    ).toBeNull()

    expect(
      buildMissionHistoryTraceRecoveryActionsViewModel({
        isFallback: true,
        lookupStatus: 'found',
        copyStatus: 'idle',
        sessionKey: ' session-1 ',
      }),
    ).toEqual({
      primary: {
        kind: 'inspect',
        label: 'Inspect recovered session',
        helperText: 'Open the persisted session that matched this trace key.',
        disabled: false,
      },
      secondary: {
        kind: 'copy',
        label: 'Copy session key',
        helperText: null,
        disabled: false,
        tone: 'neutral',
      },
      tertiary: {
        kind: 'newMission',
        label: 'Start new mission',
        helperText: 'Start over if this trace belongs to another environment.',
        disabled: false,
      },
    })

    expect(
      buildMissionHistoryTraceRecoveryActionsViewModel({
        isFallback: true,
        lookupStatus: 'checking',
        copyStatus: 'copied',
        sessionKey: 'session-1',
      }),
    ).toEqual({
      primary: {
        kind: 'inspect',
        label: 'Inspect manually',
        helperText: 'Lookup is still running; you can inspect manually if needed.',
        disabled: false,
      },
      secondary: {
        kind: 'copy',
        label: 'Copied',
        helperText: 'Session key copied to clipboard.',
        disabled: false,
        tone: 'success',
      },
      tertiary: null,
    })

    expect(
      buildMissionHistoryTraceRecoveryActionsViewModel({
        isFallback: true,
        lookupStatus: 'missing',
        copyStatus: 'failed',
        sessionKey: 'session-1',
      }),
    ).toEqual({
      primary: {
        kind: 'copy',
        label: 'Copy failed',
        helperText:
          'Clipboard is unavailable. Select and copy the session key manually.',
        disabled: false,
        tone: 'danger',
      },
      secondary: {
        kind: 'inspect',
        label: 'Try inspect anyway',
        helperText: 'Open chat history even though lookup did not find a match.',
        disabled: false,
      },
      tertiary: {
        kind: 'newMission',
        label: 'Start new mission',
        helperText: 'Start over if recovery is not possible.',
        disabled: false,
      },
    })
  })

  it('builds shared render metadata for session trace buttons', () => {
    expect(
      buildMissionHistoryTraceRenderActionViewModel({
        kind: 'inspect',
        label: 'Inspect session',
        helperText:
          'Open the persisted chat session that backs this Conductor trace.',
        disabled: false,
      }),
    ).toEqual({
      label: 'Inspect session',
      title: 'Open the persisted chat session that backs this Conductor trace.',
      ariaLabel: 'Inspect session: Open the persisted chat session that backs this Conductor trace.',
      classTone: 'accent',
      disabled: false,
    })

    expect(
      buildMissionHistoryTraceRenderActionViewModel({
        kind: 'copy',
        label: 'Copied',
        helperText: 'Session key copied to clipboard.',
        disabled: false,
        tone: 'success',
      }),
    ).toEqual({
      label: 'Copied',
      title: 'Session key copied to clipboard.',
      ariaLabel: 'Copied: Session key copied to clipboard.',
      classTone: 'success',
      disabled: false,
    })

    expect(
      buildMissionHistoryTraceRenderActionViewModel({
        kind: 'copy',
        label: 'Copy session key',
        helperText: null,
        disabled: false,
        tone: 'neutral',
      }),
    ).toEqual({
      label: 'Copy session key',
      title: 'Copy session key',
      ariaLabel: 'Copy session key',
      classTone: 'neutral',
      disabled: false,
    })
  })

  it('keeps recovery render metadata as a compatibility wrapper around shared trace buttons', () => {
    expect(
      buildMissionHistoryTraceRecoveryRenderActionViewModel({
        kind: 'inspect',
        label: 'Inspect recovered session',
        helperText: 'Open the persisted session that matched this trace key.',
        disabled: false,
      }),
    ).toEqual({
      label: 'Inspect recovered session',
      title: 'Open the persisted session that matched this trace key.',
      ariaLabel: 'Inspect recovered session: Open the persisted session that matched this trace key.',
      classTone: 'accent',
      disabled: false,
    })

    expect(
      buildMissionHistoryTraceRecoveryRenderActionViewModel({
        kind: 'copy',
        label: 'Copy failed',
        helperText:
          'Clipboard is unavailable. Select and copy the session key manually.',
        disabled: false,
        tone: 'danger',
      }),
    ).toEqual({
      label: 'Copy failed',
      title: 'Clipboard is unavailable. Select and copy the session key manually.',
      ariaLabel: 'Copy failed: Clipboard is unavailable. Select and copy the session key manually.',
      classTone: 'danger',
      disabled: false,
    })

    expect(
      buildMissionHistoryTraceRecoveryRenderActionViewModel({
        kind: 'newMission',
        label: 'Start new mission',
        helperText: 'Start over if recovery is not possible.',
        disabled: true,
      }),
    ).toEqual({
      label: 'Start new mission',
      title: 'Start over if recovery is not possible.',
      ariaLabel: 'Start new mission: Start over if recovery is not possible.',
      classTone: 'neutral',
      disabled: true,
    })
  })

  it('builds shared class names for trace action button render tones', () => {
    expect(buildMissionHistoryTraceButtonClassName('accent', 'text-xs')).toBe(
      'rounded-xl border px-4 text-xs border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-accent-strong)] hover:bg-[var(--theme-accent-soft-strong)]',
    )
    expect(buildMissionHistoryTraceButtonClassName('success')).toBe(
      'rounded-xl border px-4 border-emerald-400/35 bg-emerald-500/10 text-emerald-600 hover:border-emerald-400/60',
    )
    expect(buildMissionHistoryTraceButtonClassName('danger')).toBe(
      'rounded-xl border px-4 border-[var(--theme-danger-border)] bg-[var(--theme-danger-soft)] text-[var(--theme-danger)] hover:bg-[var(--theme-danger-soft-strong)]',
    )
    expect(buildMissionHistoryTraceButtonClassName('neutral')).toBe(
      'rounded-xl border px-4 border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]',
    )
  })

  it('builds shared button element props for recovery and session trace controls', () => {
    expect(
      buildMissionHistoryTraceButtonElementViewModel(
        {
          kind: 'inspect',
          label: 'Inspect session',
          helperText:
            'Open the persisted chat session that backs this Conductor trace.',
          disabled: false,
        },
        { extraClassName: 'text-xs' },
      ),
    ).toEqual({
      actionKind: 'inspect',
      key: 'inspect-Inspect session',
      type: 'button',
      label: 'Inspect session',
      title: 'Open the persisted chat session that backs this Conductor trace.',
      ariaLabel: 'Inspect session: Open the persisted chat session that backs this Conductor trace.',
      disabled: false,
      className:
        'rounded-xl border px-4 text-xs border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-accent-strong)] hover:bg-[var(--theme-accent-soft-strong)]',
    })

    expect(
      buildMissionHistoryTraceButtonElementViewModel({
        kind: 'copy',
        label: 'Copy session key',
        helperText: null,
        disabled: false,
        tone: 'neutral',
      }),
    ).toEqual({
      actionKind: 'copy',
      key: 'copy-Copy session key',
      type: 'button',
      label: 'Copy session key',
      title: 'Copy session key',
      ariaLabel: 'Copy session key',
      disabled: false,
      className:
        'rounded-xl border px-4 border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]',
    })
  })

  it('builds visible recovery feedback after user actions', () => {
    expect(
      buildMissionHistoryTraceRecoveryFeedbackViewModel({
        isFallback: false,
        lastAction: 'copy',
        copyStatus: 'copied',
      }),
    ).toBeNull()
    expect(
      buildMissionHistoryTraceRecoveryFeedbackViewModel({
        isFallback: true,
        lastAction: null,
        copyStatus: 'idle',
      }),
    ).toBeNull()
    expect(
      buildMissionHistoryTraceRecoveryFeedbackViewModel({
        isFallback: true,
        lastAction: 'copy',
        copyStatus: 'copied',
      }),
    ).toEqual({
      message: 'Session key copied for manual recovery.',
      tone: 'success',
    })
    expect(
      buildMissionHistoryTraceRecoveryFeedbackViewModel({
        isFallback: true,
        lastAction: 'copy',
        copyStatus: 'failed',
      }),
    ).toEqual({
      message: 'Clipboard is unavailable. Select the session key and copy it manually.',
      tone: 'danger',
    })
    expect(
      buildMissionHistoryTraceRecoveryFeedbackViewModel({
        isFallback: true,
        lastAction: 'inspect',
        copyStatus: 'idle',
      }),
    ).toEqual({
      message: 'Opening persisted chat history for this trace session…',
      tone: 'neutral',
    })
    expect(
      buildMissionHistoryTraceRecoveryFeedbackViewModel({
        isFallback: true,
        lastAction: 'newMission',
        copyStatus: 'idle',
      }),
    ).toEqual({
      message: 'Starting a new mission from the recovery flow…',
      tone: 'neutral',
    })
  })
})
