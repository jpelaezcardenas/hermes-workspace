import { appendFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { createQueueItemFromVoiceLab } from './-executive-queue-utils'
import { buildVoiceLedgerRecord, readString } from './-voice-lab-ledger-utils'

type VoiceLabLedgerRequest = {
  conversationId?: unknown
  sessionKey?: unknown
  status?: unknown
  turns?: unknown
  elevenLabsLog?: unknown
  createQueueItem?: unknown
}

function sanitizeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 96) || `voice-${Date.now()}`
}

function profileHome(): string {
  return process.env.HERMES_HOME || join(process.env.HOME || '/Users/hermes', '.hermes', 'profiles', 'executive')
}

export const Route = createFileRoute('/api/voice-lab-ledger')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const payload = (await request.json()) as VoiceLabLedgerRequest
          const conversationId = sanitizeId(readString(payload.conversationId))
          const sessionKey = readString(payload.sessionKey, 'new')
          const status = readString(payload.status, 'active')
          const now = new Date()
          const date = now.toISOString().slice(0, 10)
          const dir = join(profileHome(), 'voice-conversations', 'voice-lab', date)
          const filePath = join(dir, `${conversationId}.json`)
          const indexPath = join(profileHome(), 'voice-conversations', 'voice-lab', 'index.jsonl')

          const record = buildVoiceLedgerRecord({
            conversationId,
            sessionKey,
            status,
            updatedAt: now.toISOString(),
            turns: payload.turns,
            elevenLabsLog: payload.elevenLabsLog,
          })

          await mkdir(dir, { recursive: true, mode: 0o700 })
          await mkdir(join(profileHome(), 'voice-conversations', 'voice-lab'), {
            recursive: true,
            mode: 0o700,
          })
          await writeFile(filePath, `${JSON.stringify(record, null, 2)}\n`, { mode: 0o600 })
          await appendFile(
            indexPath,
            `${JSON.stringify({ conversationId, sessionKey, status, updatedAt: record.updatedAt, filePath })}\n`,
            { mode: 0o600 },
          )

          const queueItem =
            payload.createQueueItem === true
              ? await createQueueItemFromVoiceLab({
                  now: now.toISOString(),
                  conversationId,
                  ledgerPath: filePath,
                  delegation: record.delegation,
                  review: record.review,
                })
              : null

          return json({
            ok: true,
            conversationId,
            filePath,
            turnCount: record.turns.length,
            summary: record.summary,
            decisions: record.decisions,
            followUpActions: record.followUpActions,
            review: record.review,
            delegation: record.delegation,
            queueItem,
          })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : 'Failed to save voice ledger',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
