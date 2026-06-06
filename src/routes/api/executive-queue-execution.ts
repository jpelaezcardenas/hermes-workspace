import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { createSession, getSession, sendChat } from '../../server/claude-api'
import { resolveSessionKey } from '../../server/session-utils'
import {
  applyQueueApproval,
  createQueueApprovalReceipt,
  createQueueExecutionRecord,
  readQueueItemById,
  updateQueueExecutionRecord,
  updateQueueItemStatus,
} from './-executive-queue-utils'
import { evaluateQueueExecutionSafety } from './-worker-safety-filter'
import type {
  ExecutiveQueueItem,
  QueueExecutionMode,
  QueueExecutionRecord,
} from './-executive-queue-utils'
import type { WorkerSafetyDecision } from './-worker-safety-filter'

function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback
}

function readExecutionMode(value: unknown): QueueExecutionMode | null {
  if (
    value === 'approve_and_run' ||
    value === 'draft_only' ||
    value === 'explain_more'
  )
    return value
  return null
}

const execFileAsync = promisify(execFile)

const HERMES_HOME =
  process.env.HERMES_HOME || '/Users/hermes/.hermes/profiles/executive'

function readNestedString(
  record: Record<string, unknown>,
  path: Array<string>,
): string {
  let current: unknown = record
  for (const key of path) {
    if (!current || typeof current !== 'object') return ''
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current.trim() : ''
}

export function resultTextFromPayload(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return String(payload ?? '')
  const record = payload as Record<string, unknown>
  for (const path of [
    ['final_response'],
    ['response'],
    ['message', 'content'],
    ['message'],
    ['content'],
    ['text'],
  ]) {
    const value = readNestedString(record, path)
    if (value) return value
  }
  return ''
}

export function conciseTelegramBody(body: string, maxLength = 500): string {
  const normalized = body
    .replace(/\\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const stopSections = [
    'Verification output:',
    'Artifacts created:',
    'Artifacts:',
    'Verified:',
    'Verification:',
    'JSON read-back:',
    'Source checked:',
    'Safety:',
  ]
  const kept: Array<string> = []
  for (const line of normalized) {
    if (stopSections.some((section) => line.startsWith(section))) break
    if (line.startsWith('{') || line.startsWith('"object":')) continue
    kept.push(line)
  }

  const text = kept.join('\n').trim() || 'Done.'
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 22).trimEnd()}\n…trimmed for Telegram.`
}

async function sendTelegramStatus(input: {
  itemTitle: string
  itemId: string
  executionId: string
  status: 'started' | 'running' | 'completed' | 'error' | 'explanation'
  timestamp: string
  sessionKey: string
  body: string
  error?: string
  subject: string
}): Promise<void> {
  const message = `${input.subject}\n\n${conciseTelegramBody(input.body)}`.trim()
  await execFileAsync('hermes', ['send', '--to', 'telegram', message], {
    env: {
      ...process.env,
      HERMES_HOME,
    },
    timeout: 30_000,
    maxBuffer: 256 * 1024,
  })
}

type WorkerDispatchStatusInput = Parameters<typeof sendTelegramStatus>[0]

type WorkerDispatchInput = {
  item: Pick<ExecutiveQueueItem, 'id' | 'title' | 'nextAction'>
  record: Pick<QueueExecutionRecord, 'id' | 'prompt'> & {
    localPath?: string
  }
  approvalReceiptPath?: string
  mode: QueueExecutionMode
  sessionKey: string
  now?: () => string
}

type WorkerTimer = Parameters<typeof clearTimeout>[0]

type WorkerDispatchDeps = {
  sendTelegramStatus?: (input: WorkerDispatchStatusInput) => Promise<void>
  sendChat?: (
    sessionKey: string,
    body: { message: string },
  ) => Promise<Record<string, unknown>>
  updateExecutionRecord?: (
    patch: Partial<QueueExecutionRecord>,
  ) => Promise<void>
  updateQueueStatus?: (input: {
    status: 'Done' | 'Blocked'
    resultSummary?: string
    blockedReason?: string
    actor: string
    now: string
  }) => Promise<void>
  setTimeout?: (callback: () => void, ms: number) => WorkerTimer
  clearTimeout?: (timer: WorkerTimer) => void
}

export type WorkerDispatchAccepted = {
  completionPending: true
  startedDelivered: boolean
  runningDelivered: boolean
  completion: Promise<void>
}

export async function dispatchQueueWorkerInBackground(
  input: WorkerDispatchInput,
  deps: WorkerDispatchDeps = {},
): Promise<WorkerDispatchAccepted> {
  const now = input.now ?? (() => new Date().toISOString())
  const sendStatus = deps.sendTelegramStatus ?? sendTelegramStatus
  const chat = deps.sendChat ?? sendChat
  const updateExecution =
    deps.updateExecutionRecord ??
    (async (patch) => {
      if (input.record.localPath) {
        await updateQueueExecutionRecord(input.record as QueueExecutionRecord, patch)
      }
    })
  const updateStatus =
    deps.updateQueueStatus ??
    (async (statusInput) => {
      await updateQueueItemStatus({
        id: input.item.id,
        status: statusInput.status,
        actor: statusInput.actor,
        now: statusInput.now,
        resultSummary: statusInput.resultSummary,
        blockedReason: statusInput.blockedReason,
      })
    })
  const schedule = deps.setTimeout ?? setTimeout
  const cancelTimer = deps.clearTimeout ?? clearTimeout

  await sendStatus({
    itemTitle: input.item.title,
    itemId: input.item.id,
    executionId: input.record.id,
    status: 'started',
    timestamp: now(),
    sessionKey: input.sessionKey,
    subject: `Workspace started: ${input.item.title}`,
    body:
      input.mode === 'draft_only'
        ? 'Draft-only. I’ll message again when it is done, blocked, or still running after 10 minutes.'
        : 'Running now. I’ll message again when it is done, blocked, or still running after 10 minutes.',
  })

  let runningDelivered = false
  const runningTimer = schedule(() => {
    void sendStatus({
      itemTitle: input.item.title,
      itemId: input.item.id,
      executionId: input.record.id,
      status: 'running',
      timestamp: now(),
      sessionKey: input.sessionKey,
      subject: `Workspace still running: ${input.item.title}`,
      body: 'Still running after 10 minutes. I’ll keep going and report when it is done or blocked.',
    })
      .then(() => {
        runningDelivered = true
      })
      .catch(() => undefined)
  }, 600_000)

  const completion = (async () => {
    try {
      const result = await chat(input.sessionKey, { message: input.record.prompt })
      cancelTimer(runningTimer)
      const resultSummary = resultTextFromPayload(result)
      await updateExecution({
        status: 'completed',
        completedAt: now(),
        resultSummary,
        runId: typeof result.run_id === 'string' ? result.run_id : null,
      })
      await updateStatus({
        status: 'Done',
        actor: 'Executive Queue Worker',
        now: now(),
        resultSummary: resultSummary || 'Worker completed from Workspace.',
      })
      await sendStatus({
        itemTitle: input.item.title,
        itemId: input.item.id,
        executionId: input.record.id,
        status: 'completed',
        timestamp: now(),
        sessionKey: input.sessionKey,
        subject: `Workspace done: ${input.item.title}`,
        body: resultSummary,
      })
    } catch (error) {
      cancelTimer(runningTimer)
      const message =
        error instanceof Error ? error.message : 'Failed to dispatch queue execution'
      await updateExecution({
        status: 'error',
        completedAt: now(),
        error: message,
      }).catch(() => undefined)
      await updateStatus({
        status: 'Blocked',
        actor: 'Executive Queue Worker',
        now: now(),
        blockedReason: message,
      }).catch(() => undefined)
      await sendStatus({
        itemTitle: input.item.title,
        itemId: input.item.id,
        executionId: input.record.id,
        status: 'error',
        timestamp: now(),
        sessionKey: input.sessionKey,
        subject: `Workspace blocked: ${input.item.title}`,
        body: message,
        error: message,
      }).catch(() => undefined)
    }
  })()

  void completion.catch(() => undefined)

  return {
    completionPending: true,
    startedDelivered: true,
    runningDelivered,
    completion,
  }
}

async function buildExplanation(prompt: string): Promise<string> {
  const env = {
    ...process.env,
    HERMES_HOME,
  }
  const { stdout } = await execFileAsync('hermes', ['-z', prompt], {
    env,
    timeout: 180_000,
    maxBuffer: 1024 * 1024,
  })
  const message = stdout.trim()
  if (!message)
    throw new Error('Explanation agent produced no Telegram message.')
  return message
}

export function isMissingSessionError(
  error: unknown,
  sessionKey: string,
): boolean {
  if (!(error instanceof Error)) return false
  const message = error.message.toLowerCase()
  const normalizedSessionKey = sessionKey.toLowerCase()
  return (
    message.includes('session_not_found') ||
    message.includes(`session not found: ${normalizedSessionKey}`) ||
    (message.includes('/api/sessions/') &&
      message.includes(normalizedSessionKey) &&
      message.includes('404') &&
      message.includes('session not found'))
  )
}

export function queueExecutionSessionTitle(sessionKey: string): string {
  if (sessionKey === 'executive-command-center') return 'Executive Command Center'
  return `Executive Command Center: ${sessionKey.replace(/^executive-command-center-/, '')}`
}

async function ensureQueueExecutionSession(sessionKey: string): Promise<void> {
  try {
    await getSession(sessionKey)
    return
  } catch (error) {
    if (!isMissingSessionError(error, sessionKey)) throw error
  }

  try {
    await createSession({
      id: sessionKey,
      title: queueExecutionSessionTitle(sessionKey),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    if (!message.toLowerCase().includes('session_exists')) throw error
  }
}
function safetyGateResponse(decision: WorkerSafetyDecision) {
  return json(
    {
      ok: false,
      error: 'Execution blocked by worker safety filter',
      safetyDecision: decision,
    },
    { status: 403 },
  )
}

export const Route = createFileRoute('/api/executive-queue-execution')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const payload = (await request.json()) as Record<string, unknown>
          const id = readString(payload.id)
          if (!id)
            return json({ ok: false, error: 'id is required' }, { status: 400 })

          const mode = readExecutionMode(payload.mode)
          if (!mode)
            return json(
              { ok: false, error: 'valid execution mode is required' },
              { status: 400 },
            )

          const actor = readString(payload.actor, 'Tim')
          const note = readString(payload.note)
          const now = new Date().toISOString()
          const { sessionKey } = await resolveSessionKey({
            rawSessionKey: readString(
              payload.sessionKey,
              'executive-command-center',
            ),
            friendlyId: 'executive-command-center',
            defaultKey: 'executive-command-center',
          })
          await ensureQueueExecutionSession(sessionKey)

          if (mode === 'explain_more') {
            const item = await readQueueItemById(id)
            if (!item)
              return json(
                { ok: false, error: `Queue item not found: ${id}` },
                { status: 404 },
              )
            const safetyDecision = evaluateQueueExecutionSafety({
              item,
              mode,
              approvedPhrase: note,
            })
            if (safetyDecision.verdict !== 'allow') {
              return safetyGateResponse(safetyDecision)
            }

            const record = await createQueueExecutionRecord({
              item,
              mode,
              actor,
              now,
              note: note || 'Explain this queue item before approval.',
              sessionKey,
            })
            const explanation = await buildExplanation(record.prompt)
            await sendTelegramStatus({
              itemTitle: item.title,
              itemId: item.id,
              executionId: record.id,
              status: 'explanation',
              timestamp: now,
              sessionKey,
              subject: `Executive Queue explanation ready: ${item.title}`,
              body: explanation,
            })
            const delivery = { ok: true, delivered: true, artifactPath: null }
            return json({
              ok: true,
              item,
              execution: record,
              delivery,
              sessionKey,
            })
          }

          const item = await readQueueItemById(id)
          if (!item)
            return json(
              { ok: false, error: `Queue item not found: ${id}` },
              { status: 404 },
            )

          const safetyDecision = evaluateQueueExecutionSafety({
            item,
            mode,
            approvedPhrase: note,
          })
          if (safetyDecision.verdict !== 'allow') {
            return safetyGateResponse(safetyDecision)
          }

          const approved =
            item.status === 'In Progress'
              ? item
              : await applyQueueApproval({
                  id,
                  decision: 'approve_action',
                  actor,
                  now,
                  note:
                    note ||
                    (mode === 'draft_only'
                      ? 'Approved draft-only execution from Command Center.'
                      : 'Approved and initiated from Command Center.'),
                })
          const reloadedItem = await readQueueItemById(approved.id)
          if (!reloadedItem)
            return json(
              { ok: false, error: 'approved queue item could not be reloaded' },
              { status: 500 },
            )

          const approvalReceipt = await createQueueApprovalReceipt({
            item: reloadedItem,
            mode,
            actor,
            now,
            note,
            sessionKey,
            approvedPhrase:
              note ||
              (mode === 'draft_only' ? 'Draft Only' : 'Approve and Run'),
            sourceChannel: 'Workspace',
            sourceReference: {
              fallbackReference: 'Workspace Executive Queue execution control',
            },
          })

          const record = await createQueueExecutionRecord({
            item: reloadedItem,
            mode,
            actor,
            now,
            note,
            sessionKey,
            approvalReceipt,
          })

          const delivery = await dispatchQueueWorkerInBackground({
            item: reloadedItem,
            record,
            approvalReceiptPath: approvalReceipt.localPath,
            mode,
            sessionKey,
          })
          return json(
            {
              ok: true,
              accepted: true,
              item: reloadedItem,
              execution: record,
              sessionKey,
              delivery: {
                startedArtifactPath: null,
                runningArtifactPath: null,
                completedArtifactPath: null,
                startedDelivered: delivery.startedDelivered,
                runningDelivered: delivery.runningDelivered,
                completedDelivered: false,
                completionPending: true,
              },
            },
            { status: 202 },
          )
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to dispatch queue execution',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
