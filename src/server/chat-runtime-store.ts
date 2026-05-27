import { appendFile, mkdir, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

import { getHermesRoot } from './claude-paths'

export type ChatRuntimeEventRecord = {
  id: string
  cursor: string
  sequence: number
  event: string
  threadId: string
  runId?: string
  timestamp: number
  data: Record<string, unknown>
}

export type ChatRuntimeThreadSummary = {
  threadId: string
  updatedAt: number
  eventCount: number
  lastEvent?: string
  lastRunId?: string
}

const CHAT_RUNTIME_ROOT = path.join(
  getHermesRoot(),
  'webui-mvp',
  'chat-runtime',
)
const threadUpdateQueues = new Map<string, Promise<void>>()
const sequenceCache = new Map<string, number>()

function encodeThreadId(threadId: string): string {
  return encodeURIComponent(threadId || 'main')
}

function decodeThreadId(encoded: string): string {
  try {
    return decodeURIComponent(encoded)
  } catch {
    return encoded
  }
}

function threadDir(threadId: string): string {
  return path.join(CHAT_RUNTIME_ROOT, encodeThreadId(threadId))
}

function eventLogPath(threadId: string): string {
  return path.join(threadDir(threadId), 'events.jsonl')
}

async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true })
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function resolveRuntimeThreadId(data: Record<string, unknown>): string {
  return (
    readString(data.sessionKey) ||
    readString(data.threadId) ||
    readString(data.friendlyId) ||
    'main'
  )
}

function resolveRunId(data: Record<string, unknown>): string | undefined {
  return readString(data.runId) || readString(data.idempotencyKey) || undefined
}

async function readThreadEvents(
  threadId: string,
): Promise<ChatRuntimeEventRecord[]> {
  try {
    const raw = await readFile(eventLogPath(threadId), 'utf8')
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as ChatRuntimeEventRecord)
      .filter((event) => Number.isFinite(event.sequence))
  } catch {
    return []
  }
}

async function nextSequence(threadId: string): Promise<number> {
  const cached = sequenceCache.get(threadId)
  if (typeof cached === 'number') {
    const next = cached + 1
    sequenceCache.set(threadId, next)
    return next
  }
  const events = await readThreadEvents(threadId)
  const last = events.reduce(
    (max, event) => Math.max(max, event.sequence || 0),
    0,
  )
  const next = last + 1
  sequenceCache.set(threadId, next)
  return next
}

async function enqueueThreadUpdate<T>(
  threadId: string,
  work: () => Promise<T>,
): Promise<T> {
  const key = encodeThreadId(threadId)
  const previous = threadUpdateQueues.get(key) ?? Promise.resolve()
  const current = previous.catch(() => undefined).then(work)
  const marker = current.then(
    () => undefined,
    () => undefined,
  )
  threadUpdateQueues.set(key, marker)
  try {
    return await current
  } finally {
    if (threadUpdateQueues.get(key) === marker) {
      threadUpdateQueues.delete(key)
    }
  }
}

export async function appendChatRuntimeEvent(
  event: string,
  data: Record<string, unknown>,
): Promise<ChatRuntimeEventRecord> {
  const threadId = resolveRuntimeThreadId(data)
  return enqueueThreadUpdate(threadId, async () => {
    const sequence = await nextSequence(threadId)
    const timestamp = Date.now()
    const record: ChatRuntimeEventRecord = {
      id: crypto.randomUUID(),
      cursor: String(sequence),
      sequence,
      event,
      threadId,
      runId: resolveRunId(data),
      timestamp,
      data: {
        ...data,
        sessionKey: readString(data.sessionKey) || threadId,
      },
    }
    const dir = threadDir(threadId)
    await ensureDir(dir)
    const logPath = eventLogPath(threadId)
    await appendFile(logPath, `${JSON.stringify(record)}\n`, 'utf8')
    return record
  })
}

export async function listChatRuntimeEvents(
  threadId: string,
  options?: { afterCursor?: string; limit?: number },
): Promise<ChatRuntimeEventRecord[]> {
  const after = Number(options?.afterCursor || 0)
  const limit = Math.max(1, Math.min(options?.limit ?? 500, 2000))
  const events = await readThreadEvents(threadId)
  return events
    .filter((event) => !Number.isFinite(after) || event.sequence > after)
    .slice(-limit)
}

export async function getChatRuntimeSnapshot(
  threadId: string,
  limit = 500,
): Promise<{
  threadId: string
  cursor: string | null
  events: ChatRuntimeEventRecord[]
}> {
  const events = await listChatRuntimeEvents(threadId, { limit })
  const latest = events.at(-1)
  return {
    threadId,
    cursor: latest?.cursor ?? null,
    events,
  }
}

export async function listChatRuntimeThreads(
  limit = 100,
): Promise<ChatRuntimeThreadSummary[]> {
  try {
    const entries = await readdir(CHAT_RUNTIME_ROOT, { withFileTypes: true })
    const threads = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map(async (entry) => {
          const threadId = decodeThreadId(entry.name)
          const events = await readThreadEvents(threadId)
          const last = events.at(-1)
          return {
            threadId,
            updatedAt: last?.timestamp ?? 0,
            eventCount: events.length,
            lastEvent: last?.event,
            lastRunId: last?.runId,
          } satisfies ChatRuntimeThreadSummary
        }),
    )
    return threads
      .filter((thread) => thread.eventCount > 0)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit)
  } catch {
    return []
  }
}
