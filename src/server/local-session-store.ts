import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const HERMES_HOME =
  process.env.HERMES_HOME?.trim() || join(homedir(), '.hermes')
const DATA_DIR = join(HERMES_HOME, 'workspace')
const SESSIONS_FILE = join(DATA_DIR, 'local-sessions.json')
const LEGACY_SESSIONS_FILE = join(process.cwd(), '.runtime', 'local-sessions.json')
const MAX_MESSAGES_PER_SESSION = 500

export type LocalToolCall = {
  id?: string
  name?: string
  phase?: string
  args?: unknown
  preview?: string
  result?: string
}

export type LocalSession = {
  id: string
  title: string | null
  model: string | null
  createdAt: number
  updatedAt: number
  messageCount: number
}

export type LocalMessage = {
  id: string
  role: string
  content: string
  timestamp: number
  toolCalls?: Array<LocalToolCall>
  toolCallId?: string
  toolName?: string
}

type StoreData = {
  sessions: Record<string, LocalSession>
  messages: Record<string, Array<LocalMessage>>
}

let store: StoreData = { sessions: {}, messages: {} }

function loadFromDisk(): void {
  try {
    const targetFile = existsSync(SESSIONS_FILE)
      ? SESSIONS_FILE
      : existsSync(LEGACY_SESSIONS_FILE)
        ? LEGACY_SESSIONS_FILE
        : null

    if (targetFile) {
      const raw = readFileSync(targetFile, 'utf-8')
      const parsed = JSON.parse(raw) as StoreData
      if (parsed.sessions && parsed.messages) {
        store = parsed
      }
    }
  } catch {
    // ignore corrupt local cache
  }
}

function saveToDisk(): void {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(SESSIONS_FILE, JSON.stringify(store, null, 2))
  } catch {
    // ignore cache write failures
  }
}

loadFromDisk()

export function listLocalSessions(): Array<LocalSession> {
  return Object.values(store.sessions).sort((a, b) => b.updatedAt - a.updatedAt)
}

export function getLocalSession(sessionId: string): LocalSession | null {
  return store.sessions[sessionId] ?? null
}

export function ensureLocalSession(
  sessionId: string,
  model?: string,
): LocalSession {
  if (!store.sessions[sessionId]) {
    store.sessions[sessionId] = {
      id: sessionId,
      title: null,
      model: model ?? null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messageCount: 0,
    }
    store.messages[sessionId] = []
    saveToDisk()
  }
  return store.sessions[sessionId]
}

export function updateLocalSessionTitle(
  sessionId: string,
  title: string,
): void {
  const session = store.sessions[sessionId]
  if (session) {
    session.title = title
    session.updatedAt = Date.now()
    saveToDisk()
  }
}

export function deleteLocalSession(sessionId: string): void {
  delete store.sessions[sessionId]
  delete store.messages[sessionId]
  saveToDisk()
}

export function getLocalMessages(sessionId: string): Array<LocalMessage> {
  return store.messages[sessionId] ?? []
}

export function appendLocalMessage(
  sessionId: string,
  message: LocalMessage,
): void {
  ensureLocalSession(sessionId)
  if (!store.messages[sessionId]) store.messages[sessionId] = []
  store.messages[sessionId].push(message)
  if (store.messages[sessionId].length > MAX_MESSAGES_PER_SESSION) {
    store.messages[sessionId] = store.messages[sessionId].slice(
      -MAX_MESSAGES_PER_SESSION,
    )
  }
  const session = store.sessions[sessionId]
  if (session) {
    session.messageCount = store.messages[sessionId].length
    session.updatedAt = Date.now()
  }
  saveToDisk()
}
