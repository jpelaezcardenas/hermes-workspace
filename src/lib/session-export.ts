/**
 * Session Export/Import utilities for Hermes Workspace.
 * Allows users to download their chat sessions as JSON and restore them.
 */

import type { ChatMessage, SessionMeta } from '@/screens/chat/types'

export type ExportedSession = {
  version: 1
  exportedAt: string
  sessionKey: string
  friendlyId: string
  title: string
  messages: Array<ChatMessage & { _exportedAt?: number }>
}

export type SessionExportData = {
  version: 1
  exportedAt: string
  appVersion: string
  sessions: Array<ExportedSession>
}

/**
 * Fetch and export a single session's messages.
 */
export async function exportSession(
  sessionKey: string,
  friendlyId: string,
  title: string,
): Promise<ExportedSession> {
  const res = await fetch(
    `/api/history?sessionKey=${encodeURIComponent(sessionKey)}`,
  )
  if (!res.ok) throw new Error(`Failed to fetch session: ${res.status}`)
  const data = (await res.json()) as { messages?: Array<ChatMessage> }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    sessionKey,
    friendlyId,
    title,
    messages: (data.messages ?? []).map((m) => ({
      ...m,
      _exportedAt: Date.now(),
    })),
  }
}

/**
 * Export all provided sessions as a single JSON file.
 */
export async function exportAllSessions(
  sessions: Array<SessionMeta>,
): Promise<SessionExportData> {
  const exportedSessions: Array<ExportedSession> = []
  for (const session of sessions) {
    try {
      const exported = await exportSession(
        session.key,
        session.friendlyId,
        session.title ||
          session.derivedTitle ||
          session.label ||
          session.friendlyId,
      )
      exportedSessions.push(exported)
    } catch {
      // Skip sessions that fail to export
    }
  }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    appVersion: '1.0.0',
    sessions: exportedSessions,
  }
}

/**
 * Download session data as a JSON file in the browser.
 */
export function downloadSessions(
  data: SessionExportData,
  filename?: string,
): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download =
    filename ?? `hermes-sessions-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Read a previously-exported JSON file.
 * Returns null if the file is invalid or wrong format.
 */
export function parseExportedFile(
  file: File,
): Promise<SessionExportData | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result
        if (typeof text !== 'string') {
          resolve(null)
          return
        }
        const data = JSON.parse(text) as SessionExportData
        if (data.version !== 1 || !Array.isArray(data.sessions)) {
          resolve(null)
          return
        }
        resolve(data)
      } catch {
        resolve(null)
      }
    }
    reader.onerror = () => resolve(null)
    reader.readAsText(file)
  })
}

/**
 * Validate that an imported session has the expected structure.
 */
export function validateImportedSession(
  session: unknown,
): session is ExportedSession {
  if (!session || typeof session !== 'object') return false
  const s = session as Record<string, unknown>
  return (
    s.version === 1 &&
    typeof s.sessionKey === 'string' &&
    typeof s.friendlyId === 'string' &&
    Array.isArray(s.messages)
  )
}
