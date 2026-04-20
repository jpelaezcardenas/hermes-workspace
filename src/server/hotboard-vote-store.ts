import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { DatabaseSync } from 'node:sqlite'

export const VOTE_TYPES = ['like', 'dislike', 'bookmark'] as const

export type VoteType = (typeof VOTE_TYPES)[number]

export type VoteAggregateEntry = {
  like_count: number
  dislike_count: number
  bookmark_count: number
  my_vote: VoteType[]
}

export type VoteAggregateByEvent = Record<string, VoteAggregateEntry>

type ToggleVoteInput = {
  eventId: string
  userId: string
  voteType: VoteType
}

const storeByPath = new Map<string, HotboardVoteStore>()

function normalizeDbPath(dbPath?: string) {
  if (dbPath && dbPath.trim().length > 0) {
    return dbPath
  }
  const envPath = process.env.HOTBOARD_VOTE_DB_PATH?.trim()
  if (envPath) {
    return envPath
  }
  return path.join(os.homedir(), '.hermes', 'data', 'hotboard.sqlite')
}

function isVoteType(value: string): value is VoteType {
  return (VOTE_TYPES as readonly string[]).includes(value)
}

export function createHotboardVoteStore(options: { dbPath?: string } = {}) {
  const resolvedPath = normalizeDbPath(options.dbPath)
  const existing = storeByPath.get(resolvedPath)
  if (existing) {
    return existing
  }
  const next = new HotboardVoteStore(resolvedPath)
  storeByPath.set(resolvedPath, next)
  return next
}

class HotboardVoteStore {
  private readonly db: DatabaseSync

  constructor(private readonly dbPath: string) {
    fs.mkdirSync(path.dirname(this.dbPath), { recursive: true })
    this.db = new DatabaseSync(this.dbPath)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        vote_type TEXT NOT NULL CHECK (vote_type IN ('like', 'dislike', 'bookmark')),
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        UNIQUE(event_id, user_id, vote_type)
      );
      CREATE INDEX IF NOT EXISTS idx_votes_event_id ON votes(event_id);
      CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
    `)
  }

  toggleVote(input: ToggleVoteInput): { active: boolean } {
    const existsStmt = this.db.prepare(`
      SELECT 1 FROM votes WHERE event_id = ? AND user_id = ? AND vote_type = ? LIMIT 1
    `)
    const exists = existsStmt.get(input.eventId, input.userId, input.voteType)

    if (exists) {
      const deleteStmt = this.db.prepare(`
        DELETE FROM votes WHERE event_id = ? AND user_id = ? AND vote_type = ?
      `)
      deleteStmt.run(input.eventId, input.userId, input.voteType)
      return { active: false }
    }

    const insertStmt = this.db.prepare(`
      INSERT INTO votes (event_id, user_id, vote_type, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `)
    insertStmt.run(input.eventId, input.userId, input.voteType)
    return { active: true }
  }

  getAggregateForUser(userId: string): VoteAggregateByEvent {
    const countStmt = this.db.prepare(`
      SELECT event_id AS eventId, vote_type AS voteType, COUNT(*) AS total
      FROM votes
      GROUP BY event_id, vote_type
    `)
    const myVoteStmt = this.db.prepare(`
      SELECT event_id AS eventId, vote_type AS voteType
      FROM votes
      WHERE user_id = ?
    `)

    const aggregate: VoteAggregateByEvent = {}

    const counts = countStmt.all() as Array<{ eventId: string; voteType: VoteType; total: number }>
    for (const row of counts) {
      const entry = aggregate[row.eventId] ?? {
        like_count: 0,
        dislike_count: 0,
        bookmark_count: 0,
        my_vote: [],
      }

      if (row.voteType === 'like') entry.like_count = row.total
      if (row.voteType === 'dislike') entry.dislike_count = row.total
      if (row.voteType === 'bookmark') entry.bookmark_count = row.total
      aggregate[row.eventId] = entry
    }

    const myVotes = myVoteStmt.all(userId) as Array<{ eventId: string; voteType: string }>
    for (const row of myVotes) {
      if (!isVoteType(row.voteType)) continue
      const entry = aggregate[row.eventId] ?? {
        like_count: 0,
        dislike_count: 0,
        bookmark_count: 0,
        my_vote: [],
      }
      if (!entry.my_vote.includes(row.voteType)) {
        entry.my_vote.push(row.voteType)
        entry.my_vote.sort()
      }
      aggregate[row.eventId] = entry
    }

    return aggregate
  }
}
