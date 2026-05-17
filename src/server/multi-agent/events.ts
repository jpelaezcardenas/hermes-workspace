import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { MultiAgentEvent } from './types'

export const DEFAULT_MULTI_AGENT_EVENTS_DIR = join(process.cwd(), '.runtime', 'multi-agent', 'events')

export type MultiAgentEventLog = {
  eventsDir: string
}

type EventLogOptions = {
  eventsDir?: string
}

const SAFE_TASK_ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,159}$/

export function createMultiAgentEventLog(options: EventLogOptions = {}): MultiAgentEventLog {
  return {
    eventsDir: options.eventsDir ?? DEFAULT_MULTI_AGENT_EVENTS_DIR,
  }
}

function assertSafeTaskId(taskId: string): void {
  if (!SAFE_TASK_ID_PATTERN.test(taskId)) {
    throw new Error(`Unsafe task id: ${taskId}`)
  }
}

function eventFilePath(log: MultiAgentEventLog, taskId: string): string {
  assertSafeTaskId(taskId)
  return join(log.eventsDir, `${taskId}.jsonl`)
}

export function appendTaskEvent(log: MultiAgentEventLog, event: MultiAgentEvent): void {
  const filePath = eventFilePath(log, event.taskId)
  mkdirSync(log.eventsDir, { recursive: true })
  appendFileSync(filePath, `${JSON.stringify(event)}\n`, 'utf-8')
}

function parseEventLine(line: string): MultiAgentEvent | null {
  try {
    const parsed = JSON.parse(line) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const record = parsed as Partial<MultiAgentEvent>
    if (
      typeof record.id !== 'string' ||
      typeof record.taskId !== 'string' ||
      typeof record.type !== 'string' ||
      typeof record.message !== 'string' ||
      typeof record.createdAt !== 'string'
    ) {
      return null
    }
    return record as MultiAgentEvent
  } catch {
    return null
  }
}

export function listTaskEvents(log: MultiAgentEventLog, taskId: string): MultiAgentEvent[] {
  const filePath = eventFilePath(log, taskId)
  if (!existsSync(filePath)) return []

  return readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseEventLine)
    .filter((event): event is MultiAgentEvent => Boolean(event))
}

export function getLatestTaskEvent(log: MultiAgentEventLog, taskId: string): MultiAgentEvent | null {
  const events = listTaskEvents(log, taskId)
  return events.at(-1) ?? null
}
