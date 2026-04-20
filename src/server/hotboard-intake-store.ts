import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'

export const INTAKE_AGENT_KEYS = ['hermes', 'xiaoj'] as const

export type IntakeAgentKey = (typeof INTAKE_AGENT_KEYS)[number]

export type IntakeItem = {
  id: string
  author_agent_id: IntakeAgentKey
  title: string
  body: string
  tags: string[]
  submitted_by_open_id: string
  submitted_by_name: string
  created_at: string
}

type CreateItemInput = {
  authorAgent: IntakeAgentKey
  title: string
  body: string
  tags: string[]
  submittedByOpenId: string
  submittedByName: string
}

type IntakeRow = {
  id: string
  author_agent_id: IntakeAgentKey
  title: string
  body: string
  tags: string
  submitted_by_open_id: string
  submitted_by_name: string
  created_at: string
}

const storeByPath = new Map<string, HotboardIntakeStore>()

function normalizeDbPath(dbPath?: string) {
  if (dbPath && dbPath.trim().length > 0) {
    return dbPath
  }

  const envPath = process.env.HOTBOARD_INTAKE_DB_PATH?.trim()
  if (envPath) {
    return envPath
  }

  return path.join(os.homedir(), '.hermes', 'data', 'hotboard.sqlite')
}

function parseTags(value: string) {
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0)
  } catch {
    return []
  }
}

function stringifyTags(tags: string[]) {
  const normalized = tags
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .slice(0, 16)
  return JSON.stringify(normalized)
}

export function createHotboardIntakeStore(options: { dbPath?: string } = {}) {
  const resolvedPath = normalizeDbPath(options.dbPath)
  const existing = storeByPath.get(resolvedPath)
  if (existing) return existing

  const next = new HotboardIntakeStore(resolvedPath)
  storeByPath.set(resolvedPath, next)
  return next
}

class HotboardIntakeStore {
  private readonly db: DatabaseSync

  constructor(private readonly dbPath: string) {
    fs.mkdirSync(path.dirname(this.dbPath), { recursive: true })
    this.db = new DatabaseSync(this.dbPath)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS intake_items (
        id TEXT PRIMARY KEY,
        author_agent_id TEXT NOT NULL CHECK (author_agent_id IN ('hermes', 'xiaoj')),
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        tags TEXT NOT NULL DEFAULT '[]',
        submitted_by_open_id TEXT NOT NULL,
        submitted_by_name TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE INDEX IF NOT EXISTS idx_intake_items_agent_created
        ON intake_items(author_agent_id, created_at DESC);
    `)
  }

  createItem(input: CreateItemInput): IntakeItem {
    const id = randomUUID()
    const insertStmt = this.db.prepare(`
      INSERT INTO intake_items (
        id,
        author_agent_id,
        title,
        body,
        tags,
        submitted_by_open_id,
        submitted_by_name,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `)

    insertStmt.run(
      id,
      input.authorAgent,
      input.title.trim(),
      input.body.trim(),
      stringifyTags(input.tags),
      input.submittedByOpenId,
      input.submittedByName,
    )

    const row = this.db
      .prepare(
        `
        SELECT id, author_agent_id, title, body, tags, submitted_by_open_id, submitted_by_name, created_at
        FROM intake_items
        WHERE id = ?
        LIMIT 1
      `,
      )
      .get(id) as IntakeRow | undefined

    if (!row) {
      throw new Error('Failed to create intake item')
    }

    return {
      ...row,
      tags: parseTags(row.tags),
    }
  }

  listItems(authorAgent: IntakeAgentKey): IntakeItem[] {
    const rows = this.db
      .prepare(
        `
        SELECT id, author_agent_id, title, body, tags, submitted_by_open_id, submitted_by_name, created_at
        FROM intake_items
        WHERE author_agent_id = ?
        ORDER BY datetime(created_at) DESC, rowid DESC
      `,
      )
      .all(authorAgent) as IntakeRow[]

    return rows.map((row) => ({
      ...row,
      tags: parseTags(row.tags),
    }))
  }
}
