import type { MissionHistoryEntry } from './hooks/mission-history'
import { normalizeOptionalString } from './hooks/mission-history'

const MAX_TRACE_SESSION_KEY_CHARS = 240

export type MissionHistoryTraceCopyStatus = 'idle' | 'copied' | 'failed'
export type MissionHistoryTraceLookupStatus =
  | 'idle'
  | 'checking'
  | 'found'
  | 'missing'
  | 'error'

export type MissionHistoryTraceActionViewModel = {
  label: string
  helperText: string | null
  tone: 'neutral' | 'success' | 'danger'
  disabled: boolean
}

export type MissionHistoryTraceInspectActionViewModel = {
  label: string
  helperText: string
  to: '/chat/$sessionKey' | null
  params: { sessionKey: string } | null
  disabled: boolean
}

export type MissionHistoryTraceInspectContractViewModel = {
  route: '/chat/$sessionKey'
  routeParamName: 'sessionKey'
  routeParamValue: string
  supportedByCurrentRoute: boolean
  mode: 'raw-session-key-mvp'
  risk: string
}

export type MissionHistoryTraceLookupViewModel = {
  label: string
  helperText: string
  tone: 'neutral' | 'success' | 'warning'
  isChecking: boolean
}

export type MissionHistoryTraceLookupRefreshControl = {
  label: string
  title: string
  ariaLabel: string
  disabled: boolean
  isLoading: boolean
  visible: boolean
}

export type MissionHistoryTraceRecoveryViewModel = {
  title: string
  description: string
  recommendation: string
  tone: 'success' | 'warning'
  actions: string[]
}

type MissionHistoryTraceInspectControl = {
  kind: 'inspect'
  label: string
  helperText: string
  disabled: boolean
}

type MissionHistoryTraceCopyControl = {
  kind: 'copy'
  label: string
  helperText: string | null
  disabled: boolean
  tone: 'neutral' | 'success' | 'danger'
}

type MissionHistoryTraceNewMissionControl = {
  kind: 'newMission'
  label: string
  helperText: string
  disabled: boolean
}

export type MissionHistoryTraceButtonControl =
  | MissionHistoryTraceInspectControl
  | MissionHistoryTraceCopyControl
  | MissionHistoryTraceNewMissionControl

export type MissionHistoryTraceRecoveryControl = MissionHistoryTraceButtonControl

export type MissionHistoryTraceRecoveryActionsViewModel = {
  primary: MissionHistoryTraceRecoveryControl
  secondary: MissionHistoryTraceRecoveryControl | null
  tertiary: MissionHistoryTraceRecoveryControl | null
}

export type MissionHistoryTraceRecoveryPanelViewModel = {
  trace: MissionHistoryTraceViewModel
  lookup: MissionHistoryTraceLookupViewModel
  lookupRefresh: MissionHistoryTraceLookupRefreshControl
  recovery: MissionHistoryTraceRecoveryViewModel | null
  recoveryActions: MissionHistoryTraceRecoveryActionsViewModel | null
  feedback: MissionHistoryTraceRecoveryFeedbackViewModel | null
}

export type MissionHistoryTraceRecoveryLastAction =
  | 'inspect'
  | 'copy'
  | 'newMission'

export type MissionHistoryTraceRecoveryFeedbackViewModel = {
  message: string
  tone: 'neutral' | 'success' | 'danger'
}

export type MissionHistoryTraceButtonTone =
  | 'accent'
  | 'neutral'
  | 'success'
  | 'danger'

export type MissionHistoryTraceRecoveryRenderActionViewModel = {
  label: string
  title: string
  ariaLabel: string
  classTone: MissionHistoryTraceButtonTone
  disabled: boolean
}

export type MissionHistoryTraceButtonElementViewModel = {
  actionKind: MissionHistoryTraceButtonControl['kind']
  key: string
  type: 'button'
  label: string
  title: string
  ariaLabel: string
  disabled: boolean
  className: string
}

export type MissionHistoryTraceViewModel = {
  sessionKey: string
  sourceLabel: string
  actionLabel: string
  copyValue: string
  helperText: string
  isFallback: boolean
}

export function readConductorTraceSessionKey(
  search: Record<string, unknown>,
): string | null {
  const value = normalizeOptionalString(search.traceSessionKey)
  if (!value || value.length > MAX_TRACE_SESSION_KEY_CHARS) return null
  return value
}

export function findMissionHistoryEntryByTraceSessionKey(
  entries: MissionHistoryEntry[],
  traceSessionKey: string | null,
): MissionHistoryEntry | null {
  const target = normalizeOptionalString(traceSessionKey)
  if (!target) return null
  return (
    entries.find(
      (entry) => normalizeOptionalString(entry.sessionKey) === target,
    ) ?? null
  )
}

function buildTraceFallbackId(sessionKey: string): string {
  return `trace-${sessionKey.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'session'}`
}

export function buildFallbackMissionHistoryEntryForTrace(
  traceSessionKey: string | null,
  nowIso = new Date().toISOString(),
): MissionHistoryEntry | null {
  const sessionKey = normalizeOptionalString(traceSessionKey)
  if (!sessionKey) return null
  return {
    id: buildTraceFallbackId(sessionKey),
    goal: `Open Conductor trace session: ${sessionKey}`,
    startedAt: nowIso,
    completedAt: nowIso,
    workerCount: 1,
    totalTokens: 0,
    status: 'completed',
    projectPath: null,
    sessionKey,
    completeSummary:
      'No local mission history entry was found for this trace session. Use the session key to inspect the persisted Conductor/agent history.',
  }
}

export function buildMissionHistoryTraceViewModel(
  entry: MissionHistoryEntry | null | undefined,
): MissionHistoryTraceViewModel | null {
  const sessionKey = normalizeOptionalString(entry?.sessionKey)
  if (!sessionKey) return null

  const isFallback = entry?.id === buildTraceFallbackId(sessionKey)
  return {
    sessionKey,
    sourceLabel: isFallback
      ? 'Trace session key only'
      : 'Persisted mission history',
    actionLabel: 'Copy session key',
    copyValue: sessionKey,
    helperText: isFallback
      ? 'No local mission history entry was found. Copy this key to inspect persisted Conductor/agent history.'
      : 'Use this key to correlate the mission with persisted Conductor/agent session history.',
    isFallback,
  }
}

export function buildMissionHistoryTraceActionViewModel(
  status: MissionHistoryTraceCopyStatus,
): MissionHistoryTraceActionViewModel {
  if (status === 'copied') {
    return {
      label: 'Copied',
      helperText: 'Session key copied to clipboard.',
      tone: 'success',
      disabled: false,
    }
  }

  if (status === 'failed') {
    return {
      label: 'Copy failed',
      helperText:
        'Clipboard is unavailable. Select and copy the session key manually.',
      tone: 'danger',
      disabled: false,
    }
  }

  return {
    label: 'Copy session key',
    helperText: null,
    tone: 'neutral',
    disabled: false,
  }
}

export function buildMissionHistoryTraceInspectActionViewModel(
  sessionKeyValue: string | null | undefined,
): MissionHistoryTraceInspectActionViewModel {
  const inspectContract =
    buildMissionHistoryTraceInspectContractViewModel(sessionKeyValue)
  if (!inspectContract) {
    return {
      label: 'Inspect session',
      helperText: 'No session key is available to inspect.',
      to: null,
      params: null,
      disabled: true,
    }
  }

  return {
    label: 'Inspect session',
    helperText: 'Open the persisted chat session that backs this Conductor trace.',
    to: inspectContract.route,
    params: { sessionKey: inspectContract.routeParamValue },
    disabled: false,
  }
}

export function buildMissionHistoryTraceInspectContractViewModel(
  sessionKeyValue: string | null | undefined,
): MissionHistoryTraceInspectContractViewModel | null {
  const sessionKey = normalizeOptionalString(sessionKeyValue)
  if (!sessionKey) return null

  return {
    route: '/chat/$sessionKey',
    routeParamName: 'sessionKey',
    routeParamValue: sessionKey,
    supportedByCurrentRoute: true,
    mode: 'raw-session-key-mvp',
    risk:
      'The chat route accepts the raw trace session key as its sessionKey param; a dedicated trace inspector is still deferred.',
  }
}

export function buildMissionHistoryTraceLookupViewModel(
  status: MissionHistoryTraceLookupStatus,
): MissionHistoryTraceLookupViewModel {
  if (status === 'checking') {
    return {
      label: 'Checking persisted session…',
      helperText: 'Looking for a chat session matching this trace key.',
      tone: 'neutral',
      isChecking: true,
    }
  }

  if (status === 'found') {
    return {
      label: 'Persisted session found',
      helperText: 'This trace can be inspected in chat history.',
      tone: 'success',
      isChecking: false,
    }
  }

  if (status === 'missing') {
    return {
      label: 'Persisted session not found',
      helperText:
        'No persisted chat session was found for this key. You can still try opening it manually.',
      tone: 'warning',
      isChecking: false,
    }
  }

  if (status === 'error') {
    return {
      label: 'Unable to check persisted session',
      helperText:
        'Session lookup failed. You can still try opening the session manually.',
      tone: 'warning',
      isChecking: false,
    }
  }

  return {
    label: 'Persisted session lookup pending',
    helperText: 'Session lookup will start when a trace key is available.',
    tone: 'neutral',
    isChecking: false,
  }
}

export function buildMissionHistoryTraceLookupRefreshControl({
  status,
  hasSessionKey,
  isRefreshing,
}: {
  status: MissionHistoryTraceLookupStatus
  hasSessionKey: boolean
  isRefreshing: boolean
}): MissionHistoryTraceLookupRefreshControl {
  if (status === 'checking' || isRefreshing) {
    return {
      label: 'Checking…',
      title: 'Persisted session lookup is already running.',
      ariaLabel: 'Checking persisted session lookup status.',
      disabled: true,
      isLoading: true,
      visible: true,
    }
  }

  if (!hasSessionKey) {
    return {
      label: 'Refresh status',
      title: 'No trace session key is available to refresh.',
      ariaLabel:
        'Refresh persisted session lookup status: no trace session key is available.',
      disabled: true,
      isLoading: false,
      visible: false,
    }
  }

  if (status === 'error') {
    return {
      label: 'Retry lookup',
      title: 'Retry persisted session lookup for this trace key.',
      ariaLabel: 'Retry lookup: Retry persisted session lookup for this trace key.',
      disabled: false,
      isLoading: false,
      visible: true,
    }
  }

  return {
    label: 'Refresh status',
    title: 'Refresh persisted session lookup status.',
    ariaLabel: 'Refresh status: Refresh persisted session lookup status.',
    disabled: false,
    isLoading: false,
    visible: true,
  }
}

export function buildMissionHistoryTraceRecoveryViewModel(
  isFallback: boolean,
  lookupStatus: MissionHistoryTraceLookupStatus,
): MissionHistoryTraceRecoveryViewModel | null {
  if (!isFallback) return null

  const base = {
    title: 'Local mission history not found',
    description:
      'This trace was opened from a session key, but no local Conductor mission history entry matched it.',
  }

  if (lookupStatus === 'found') {
    return {
      ...base,
      recommendation: 'Open the persisted session to inspect its chat history.',
      tone: 'success',
      actions: [
        'Inspect the persisted session',
        'Copy the session key for manual lookup',
        'Start a new mission if this trace is from another environment',
      ],
    }
  }

  if (lookupStatus === 'missing') {
    return {
      ...base,
      recommendation:
        'No persisted session was found here. The key may be stale or from another workspace.',
      tone: 'warning',
      actions: [
        'Copy the session key for manual lookup',
        'Try inspecting the session anyway',
        'Start a new mission if recovery is not possible',
      ],
    }
  }

  if (lookupStatus === 'error') {
    return {
      ...base,
      recommendation:
        'Persisted session lookup failed. You can still inspect manually or retry later.',
      tone: 'warning',
      actions: [
        'Try inspecting the session manually',
        'Copy the session key for support/debugging',
        'Retry lookup later',
      ],
    }
  }

  return {
    ...base,
    recommendation:
      'Wait for persisted session lookup, then inspect the session or copy the key for manual recovery.',
    tone: 'warning',
    actions: [
      'Wait for lookup to complete',
      'Copy the session key for manual lookup',
      'Inspect the session if you recognize the key',
    ],
  }
}

export function buildMissionHistoryTraceRecoveryActionsViewModel({
  isFallback,
  lookupStatus,
  copyStatus,
  sessionKey,
}: {
  isFallback: boolean
  lookupStatus: MissionHistoryTraceLookupStatus
  copyStatus: MissionHistoryTraceCopyStatus
  sessionKey: string | null | undefined
}): MissionHistoryTraceRecoveryActionsViewModel | null {
  if (!isFallback || !normalizeOptionalString(sessionKey)) return null

  const copyAction = buildMissionHistoryTraceActionViewModel(copyStatus)
  const copyControl: MissionHistoryTraceCopyControl = {
    kind: 'copy',
    label: copyAction.label,
    helperText: copyAction.helperText,
    disabled: copyAction.disabled,
    tone: copyAction.tone,
  }

  if (lookupStatus === 'found') {
    return {
      primary: {
        kind: 'inspect',
        label: 'Inspect recovered session',
        helperText: 'Open the persisted session that matched this trace key.',
        disabled: false,
      },
      secondary: copyControl,
      tertiary: {
        kind: 'newMission',
        label: 'Start new mission',
        helperText: 'Start over if this trace belongs to another environment.',
        disabled: false,
      },
    }
  }

  if (lookupStatus === 'checking' || lookupStatus === 'idle') {
    return {
      primary: {
        kind: 'inspect',
        label: 'Inspect manually',
        helperText: 'Lookup is still running; you can inspect manually if needed.',
        disabled: false,
      },
      secondary: copyControl,
      tertiary: null,
    }
  }

  return {
    primary: copyControl,
    secondary: {
      kind: 'inspect',
      label: lookupStatus === 'missing' ? 'Try inspect anyway' : 'Inspect manually',
      helperText:
        lookupStatus === 'missing'
          ? 'Open chat history even though lookup did not find a match.'
          : 'Open chat history while lookup is unavailable.',
      disabled: false,
    },
    tertiary: {
      kind: 'newMission',
      label: 'Start new mission',
      helperText: 'Start over if recovery is not possible.',
      disabled: false,
    },
  }
}

export function buildMissionHistoryTraceRecoveryPanelViewModel({
  entry,
  lookupStatus,
  copyStatus,
  lastAction,
  isRefreshingLookup,
}: {
  entry: MissionHistoryEntry | null | undefined
  lookupStatus: MissionHistoryTraceLookupStatus
  copyStatus: MissionHistoryTraceCopyStatus
  lastAction: MissionHistoryTraceRecoveryLastAction | null
  isRefreshingLookup: boolean
}): MissionHistoryTraceRecoveryPanelViewModel | null {
  const trace = buildMissionHistoryTraceViewModel(entry)
  if (!trace) return null

  return {
    trace,
    lookup: buildMissionHistoryTraceLookupViewModel(lookupStatus),
    lookupRefresh: buildMissionHistoryTraceLookupRefreshControl({
      status: lookupStatus,
      hasSessionKey: Boolean(trace.sessionKey),
      isRefreshing: isRefreshingLookup,
    }),
    recovery: buildMissionHistoryTraceRecoveryViewModel(
      trace.isFallback,
      lookupStatus,
    ),
    recoveryActions: buildMissionHistoryTraceRecoveryActionsViewModel({
      isFallback: trace.isFallback,
      lookupStatus,
      copyStatus,
      sessionKey: trace.sessionKey,
    }),
    feedback: buildMissionHistoryTraceRecoveryFeedbackViewModel({
      isFallback: trace.isFallback,
      lastAction,
      copyStatus,
    }),
  }
}

export function buildMissionHistoryTraceRenderActionViewModel(
  action: MissionHistoryTraceButtonControl,
): MissionHistoryTraceRecoveryRenderActionViewModel {
  const title = action.helperText ?? action.label
  const classTone =
    action.kind === 'inspect'
      ? 'accent'
      : action.kind === 'newMission'
        ? 'neutral'
        : action.tone
  const ariaLabel = action.helperText ? `${action.label}: ${title}` : action.label

  return {
    label: action.label,
    title,
    ariaLabel,
    classTone,
    disabled: action.disabled,
  }
}

export function buildMissionHistoryTraceButtonRenderViewModel(
  action: MissionHistoryTraceButtonControl,
): MissionHistoryTraceRecoveryRenderActionViewModel {
  return buildMissionHistoryTraceRenderActionViewModel(action)
}

export function buildMissionHistoryTraceRecoveryRenderActionViewModel(
  action: MissionHistoryTraceRecoveryControl,
): MissionHistoryTraceRecoveryRenderActionViewModel {
  return buildMissionHistoryTraceRenderActionViewModel(action)
}

export function buildMissionHistoryTraceButtonClassName(
  tone: MissionHistoryTraceButtonTone,
  extraClassName?: string,
): string {
  const baseClassName = ['rounded-xl', 'border', 'px-4', extraClassName]
    .filter(Boolean)
    .join(' ')

  if (tone === 'accent') {
    return `${baseClassName} border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-accent-strong)] hover:bg-[var(--theme-accent-soft-strong)]`
  }

  if (tone === 'success') {
    return `${baseClassName} border-emerald-400/35 bg-emerald-500/10 text-emerald-600 hover:border-emerald-400/60`
  }

  if (tone === 'danger') {
    return `${baseClassName} border-[var(--theme-danger-border)] bg-[var(--theme-danger-soft)] text-[var(--theme-danger)] hover:bg-[var(--theme-danger-soft-strong)]`
  }

  return `${baseClassName} border-[var(--theme-border)] bg-[var(--theme-card2)] text-[var(--theme-text)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]`
}

export function buildMissionHistoryTraceButtonElementViewModel(
  action: MissionHistoryTraceButtonControl,
  options: { extraClassName?: string } = {},
): MissionHistoryTraceButtonElementViewModel {
  const renderAction = buildMissionHistoryTraceRenderActionViewModel(action)
  return {
    actionKind: action.kind,
    key: `${action.kind}-${action.label}`,
    type: 'button',
    label: renderAction.label,
    title: renderAction.title,
    ariaLabel: renderAction.ariaLabel,
    disabled: renderAction.disabled,
    className: buildMissionHistoryTraceButtonClassName(
      renderAction.classTone,
      options.extraClassName,
    ),
  }
}

export function buildMissionHistoryTraceRecoveryFeedbackViewModel({
  isFallback,
  lastAction,
  copyStatus,
}: {
  isFallback: boolean
  lastAction: MissionHistoryTraceRecoveryLastAction | null
  copyStatus: MissionHistoryTraceCopyStatus
}): MissionHistoryTraceRecoveryFeedbackViewModel | null {
  if (!isFallback || !lastAction) return null

  if (lastAction === 'copy') {
    if (copyStatus === 'copied') {
      return {
        message: 'Session key copied for manual recovery.',
        tone: 'success',
      }
    }
    if (copyStatus === 'failed') {
      return {
        message:
          'Clipboard is unavailable. Select the session key and copy it manually.',
        tone: 'danger',
      }
    }
    return null
  }

  if (lastAction === 'inspect') {
    return {
      message: 'Opening persisted chat history for this trace session…',
      tone: 'neutral',
    }
  }

  return {
    message: 'Starting a new mission from the recovery flow…',
    tone: 'neutral',
  }
}
