import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { getHermesRoot } from './claude-paths'
import { hasActiveSendRun } from './send-run-tracker'

export type PersistedRunToolCall = {
  id: string
  name: string
  phase: string
  args?: unknown
  preview?: string
  result?: string
}

export type PersistedRunLifecycleEvent = {
  text: string
  emoji: string
  timestamp: number
  isError: boolean
}

export type PersistedRunState = {
  runId: string
  sessionKey: string
  friendlyId: string
  status: 'accepted' | 'active' | 'handoff' | 'stalled' | 'complete' | 'error'
  createdAt: number
  updatedAt: number
  lastEventAt: number
  assistantText: string
  thinkingText: string
  toolCalls: Array<PersistedRunToolCall>
  lifecycleEvents: Array<PersistedRunLifecycleEvent>
  errorMessage?: string
}

const RUNS_ROOT = path.join(getHermesRoot(), 'webui-mvp', 'runs')
const runUpdateQueues = new Map<string, Promise<void>>()

const RECOVERABLE_RUN_STATUSES = new Set<PersistedRunState['status']>([
  'accepted',
  'active',
  'handoff',
  'stalled',
])
const DEFAULT_RECOVERABLE_RUN_MAX_AGE_MS = 30 * 60 * 1000
const DEFAULT_ACCEPTED_RUN_MAX_AGE_MS = 2 * 60 * 1000
const DEFAULT_HANDOFF_RUN_MAX_AGE_MS = 5 * 60 * 1000
const DEFAULT_STALLED_RUN_MAX_AGE_MS = 2 * 60 * 1000

function readPositiveEnvNumber(name: string): number | null {
  const configured = Number(process.env[name])
  if (Number.isFinite(configured) && configured > 0) return configured
  return null
}

export function getRecoverableRunMaxAgeMs(
  status: PersistedRunState['status'],
): number {
  const statusOverride = readPositiveEnvNumber(
    `HERMES_RUN_RECOVERY_${status.toUpperCase()}_MAX_AGE_MS`,
  )
  if (statusOverride !== null) return statusOverride

  const globalOverride = readPositiveEnvNumber('HERMES_RUN_RECOVERY_MAX_AGE_MS')
  if (globalOverride !== null) return globalOverride

  switch (status) {
    case 'accepted':
      return DEFAULT_ACCEPTED_RUN_MAX_AGE_MS
    case 'handoff':
      return DEFAULT_HANDOFF_RUN_MAX_AGE_MS
    case 'stalled':
      return DEFAULT_STALLED_RUN_MAX_AGE_MS
    default:
      return DEFAULT_RECOVERABLE_RUN_MAX_AGE_MS
  }
}

export function isPersistedRunRecoverable(
  run: PersistedRunState,
  now = Date.now(),
): boolean {
  if (!RECOVERABLE_RUN_STATUSES.has(run.status)) return false
  if (hasActiveSendRun(run.runId)) return true
  const lastEventAt = Number.isFinite(run.lastEventAt)
    ? run.lastEventAt
    : run.updatedAt
  return now - lastEventAt <= getRecoverableRunMaxAgeMs(run.status)
}

function encodeSessionKey(sessionKey: string): string {
  return encodeURIComponent(sessionKey || 'main')
}

function sessionDir(sessionKey: string): string {
  return path.join(RUNS_ROOT, encodeSessionKey(sessionKey))
}

function runPath(sessionKey: string, runId: string): string {
  return path.join(sessionDir(sessionKey), `${runId}.json`)
}

async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true })
}

async function writeRun(run: PersistedRunState): Promise<void> {
  const dir = sessionDir(run.sessionKey)
  await ensureDir(dir)
  const targetPath = runPath(run.sessionKey, run.runId)
  const tempPath = `${targetPath}.${process.pid}.${Date.now()}.${Math.random()
    .toString(36)
    .slice(2)}.tmp`
  await writeFile(tempPath, `${JSON.stringify(run, null, 2)}\n`, 'utf8')
  await rename(tempPath, targetPath)
}

async function enqueueRunUpdate<T>(
  sessionKey: string,
  runId: string,
  work: () => Promise<T>,
): Promise<T> {
  const key = `${encodeSessionKey(sessionKey)}:${runId}`
  const previous = runUpdateQueues.get(key) ?? Promise.resolve()
  const current = previous.catch(() => undefined).then(work)
  const marker = current.then(
    () => undefined,
    () => undefined,
  )
  runUpdateQueues.set(key, marker)
  try {
    return await current
  } finally {
    if (runUpdateQueues.get(key) === marker) {
      runUpdateQueues.delete(key)
    }
  }
}

export async function createPersistedRun(input: {
  runId: string
  sessionKey: string
  friendlyId?: string
}): Promise<PersistedRunState> {
  const now = Date.now()
  const run: PersistedRunState = {
    runId: input.runId,
    sessionKey: input.sessionKey,
    friendlyId: input.friendlyId || input.sessionKey,
    status: 'accepted',
    createdAt: now,
    updatedAt: now,
    lastEventAt: now,
    assistantText: '',
    thinkingText: '',
    toolCalls: [],
    lifecycleEvents: [],
  }
  await writeRun(run)
  return run
}

export async function getPersistedRun(
  sessionKey: string,
  runId: string,
): Promise<PersistedRunState | null> {
  try {
    const raw = await readFile(runPath(sessionKey, runId), 'utf8')
    return JSON.parse(raw) as PersistedRunState
  } catch {
    return null
  }
}

export async function updatePersistedRun(
  sessionKey: string,
  runId: string,
  updater: (run: PersistedRunState) => PersistedRunState,
): Promise<PersistedRunState | null> {
  return enqueueRunUpdate(sessionKey, runId, async () => {
    const current = await getPersistedRun(sessionKey, runId)
    if (!current) return null
    const next = updater(current)
    next.updatedAt = Date.now()
    await writeRun(next)
    return next
  })
}

export async function appendRunText(
  sessionKey: string,
  runId: string,
  text: string,
  options?: { replace?: boolean },
): Promise<PersistedRunState | null> {
  return updatePersistedRun(sessionKey, runId, (run) => ({
    ...run,
    status: 'active',
    lastEventAt: Date.now(),
    assistantText: options?.replace ? text : `${run.assistantText}${text}`,
  }))
}

export async function setRunThinking(
  sessionKey: string,
  runId: string,
  thinkingText: string,
): Promise<PersistedRunState | null> {
  return updatePersistedRun(sessionKey, runId, (run) => ({
    ...run,
    status: 'active',
    lastEventAt: Date.now(),
    thinkingText,
  }))
}

export async function upsertRunToolCall(
  sessionKey: string,
  runId: string,
  toolCall: PersistedRunToolCall,
): Promise<PersistedRunState | null> {
  return updatePersistedRun(sessionKey, runId, (run) => {
    const nextToolCalls = [...run.toolCalls]
    const idx = nextToolCalls.findIndex((entry) => entry.id === toolCall.id)
    if (idx >= 0) nextToolCalls[idx] = { ...nextToolCalls[idx], ...toolCall }
    else nextToolCalls.push(toolCall)
    return {
      ...run,
      status: toolCall.phase === 'error' ? 'error' : 'active',
      lastEventAt: Date.now(),
      toolCalls: nextToolCalls,
      ...(toolCall.phase === 'error' && toolCall.result
        ? { errorMessage: toolCall.result }
        : {}),
    }
  })
}

export async function addRunLifecycleEvent(
  sessionKey: string,
  runId: string,
  event: PersistedRunLifecycleEvent,
): Promise<PersistedRunState | null> {
  return updatePersistedRun(sessionKey, runId, (run) => ({
    ...run,
    lastEventAt: Date.now(),
    lifecycleEvents: [...run.lifecycleEvents, event].slice(-40),
  }))
}

export async function markRunStatus(
  sessionKey: string,
  runId: string,
  status: PersistedRunState['status'],
  errorMessage?: string,
): Promise<PersistedRunState | null> {
  return updatePersistedRun(sessionKey, runId, (run) => ({
    ...run,
    status,
    lastEventAt: Date.now(),
    ...(errorMessage ? { errorMessage } : {}),
  }))
}

export async function listRecentPersistedRuns(
  limit = 16,
): Promise<PersistedRunState[]> {
  try {
    const sessionEntries = await readdir(RUNS_ROOT, { withFileTypes: true })
    const runs: PersistedRunState[] = []
    await Promise.all(
      sessionEntries
        .filter((entry) => entry.isDirectory())
        .map(async (entry) => {
          const dir = path.join(RUNS_ROOT, entry.name)
          const files = (await readdir(dir).catch(() => [])).filter((name) =>
            name.endsWith('.json'),
          )
          await Promise.all(
            files.map(async (name) => {
              try {
                const raw = await readFile(path.join(dir, name), 'utf8')
                runs.push(JSON.parse(raw) as PersistedRunState)
              } catch {
                // Ignore corrupt partial run files.
              }
            }),
          )
        }),
    )
    return runs
      .sort((a, b) => {
        const bTime = Number.isFinite(b.lastEventAt)
          ? b.lastEventAt
          : b.updatedAt
        const aTime = Number.isFinite(a.lastEventAt)
          ? a.lastEventAt
          : a.updatedAt
        return bTime - aTime
      })
      .slice(0, limit)
  } catch {
    return []
  }
}

export async function getActiveRunForSession(
  sessionKey: string,
): Promise<PersistedRunState | null> {
  try {
    const dir = sessionDir(sessionKey)
    const files = (await readdir(dir)).filter((name) => name.endsWith('.json'))
    if (files.length === 0) return null
    const runs = await Promise.all(
      files.map(async (name) => {
        try {
          const raw = await readFile(path.join(dir, name), 'utf8')
          return JSON.parse(raw) as PersistedRunState
        } catch {
          return null
        }
      }),
    )
    const candidates = runs
      .filter((run): run is PersistedRunState => Boolean(run))
      .filter((run) => isPersistedRunRecoverable(run))
      .sort((a, b) => {
        const bLastEventAt = Number.isFinite(b.lastEventAt)
          ? b.lastEventAt
          : b.updatedAt
        const aLastEventAt = Number.isFinite(a.lastEventAt)
          ? a.lastEventAt
          : a.updatedAt
        return bLastEventAt - aLastEventAt
      })
    return candidates[0] ?? null
  } catch {
    return null
  }
}
