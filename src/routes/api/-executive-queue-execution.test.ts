import { describe, expect, it } from 'vitest'

import {
  conciseTelegramBody,
  dispatchQueueWorkerInBackground,
  isMissingSessionError,
  queueExecutionSessionTitle,
  resultTextFromPayload,
} from './executive-queue-execution'

describe('Executive Queue execution session handling', () => {
  it('treats dashboard 404 Session not found errors as missing sessions', () => {
    const error = new Error(
      'Hermes dashboard /api/sessions/executive-command-center-smoke-safety-filter: 404 {"detail":"Session not found"}',
    )

    expect(
      isMissingSessionError(
        error,
        'executive-command-center-smoke-safety-filter',
      ),
    ).toBe(true)
  })

  it('does not swallow unrelated dashboard errors', () => {
    const error = new Error(
      'Hermes dashboard /api/sessions/executive-command-center: 500 {"detail":"Database unavailable"}',
    )

    expect(isMissingSessionError(error, 'executive-command-center')).toBe(false)
  })

  it('keeps the default session title stable and makes smoke-test session titles unique', () => {
    expect(queueExecutionSessionTitle('executive-command-center')).toBe(
      'Executive Command Center',
    )
    expect(
      queueExecutionSessionTitle('executive-command-center-smoke-session-404-fixed'),
    ).toBe('Executive Command Center: smoke-session-404-fixed')
  })

  it('extracts assistant content from Hermes chat completion payloads instead of raw JSON', () => {
    const text = resultTextFromPayload({
      object: 'hermes.session.chat.completion',
      session_id: '20260606_095234_38d673',
      message: {
        role: 'assistant',
        content: 'Done.\n\nReal result:\nFound 1 approval-needed draft.',
      },
      usage: {
        input_tokens: 677524,
        output_tokens: 6148,
        total_tokens: 683672,
      },
    })

    expect(text).toBe('Done.\n\nReal result:\nFound 1 approval-needed draft.')
    expect(text).not.toContain('hermes.session.chat.completion')
    expect(text).not.toContain('input_tokens')
  })

  it('trims noisy verification and artifact sections from Telegram updates', () => {
    const body = conciseTelegramBody(
      'Done.\\n\\nReal result:\\nFound 1 approval-needed draft.\\n\\nVerification output:\\napproval_receipt_mode: draft_only\\n\\nArtifacts created:\\n/path/to/report.md',
    )

    expect(body).toContain('Found 1 approval-needed draft.')
    expect(body).not.toContain('Verification output')
    expect(body).not.toContain('Artifacts created')
    expect(body).not.toContain('/path/to/report.md')
  })

  it('trims pilot-style verified details and artifact paths from Telegram updates', () => {
    const body = conciseTelegramBody(
      'Done.\\nReal result: PASS with one watch item.\\nVerified:\\nrecords reviewed: 8\\nroute check: sendTelegramStatus true\\nArtifacts:\\nMD: /Users/hermes/.hermes/profiles/executive/workspaces/report.md',
    )

    expect(body).toContain('PASS with one watch item.')
    expect(body).not.toContain('records reviewed')
    expect(body).not.toContain('route check')
    expect(body).not.toContain('/Users/hermes')
  })

  it('keeps draft-only started updates short and hides approval receipt paths', async () => {
    let releaseChat: (value: Record<string, unknown>) => void = () => undefined
    const chatPromise = new Promise<Record<string, unknown>>((resolve) => {
      releaseChat = resolve
    })
    const statuses: Array<{ status: string; subject: string; body: string }> = []
    const timers: Array<number> = []

    const accepted = await dispatchQueueWorkerInBackground(
      {
        item: {
          id: 'eq_noise_regression',
          title: 'Noise regression item',
          nextAction:
            'Review a long next action that should not be pasted into Telegram with receipt paths.',
        },
        record: {
          id: 'qexec_noise_regression',
          prompt: 'Slow worker prompt',
        },
        approvalReceiptPath: '/Users/hermes/.hermes/profiles/executive/executive-queue/approval-receipts/2026-06-06/qreceipt.json',
        mode: 'draft_only',
        sessionKey: 'executive-command-center',
        now: () => '2026-06-06T15:00:00.000Z',
      },
      {
        sendTelegramStatus: (status) => {
          statuses.push({
            status: status.status,
            subject: status.subject,
            body: status.body,
          })
          return Promise.resolve()
        },
        sendChat: () => chatPromise,
        updateExecutionRecord: () => Promise.resolve(),
        updateQueueStatus: () => Promise.resolve(),
        setTimeout: (_callback, ms) => {
          timers.push(ms)
          return undefined
        },
        clearTimeout: () => undefined,
      },
    )

    expect(accepted.completionPending).toBe(true)
    expect(statuses).toHaveLength(1)
    expect(statuses[0]).toMatchObject({
      status: 'started',
      subject: 'Workspace started: Noise regression item',
    })
    expect(statuses[0]?.body).toContain('Draft-only')
    expect(statuses[0]?.body).not.toContain('Approval receipt')
    expect(statuses[0]?.body).not.toContain('/Users/hermes')
    expect(timers).toEqual([600_000])

    releaseChat({ message: { content: 'Done cleanly.' } })
    await accepted.completion
  })

  it('starts worker dispatch without waiting for chat completion', async () => {
    let releaseChat: (value: Record<string, unknown>) => void = () => undefined
    const chatPromise = new Promise<Record<string, unknown>>((resolve) => {
      releaseChat = resolve
    })
    const events: Array<string> = []

    const accepted = await dispatchQueueWorkerInBackground(
      {
        item: {
          id: 'eq_timeout_regression',
          title: 'Timeout regression item',
          nextAction: 'Run a slow worker safely.',
        },
        record: {
          id: 'qexec_timeout_regression',
          prompt: 'Slow worker prompt',
        },
        approvalReceiptPath: '/tmp/qreceipt-timeout-regression.json',
        mode: 'draft_only',
        sessionKey: 'executive-command-center',
        now: () => '2026-06-06T15:00:00.000Z',
      },
      {
        sendTelegramStatus: (status) => {
          events.push(status.status)
          return Promise.resolve()
        },
        sendChat: () => chatPromise,
        updateExecutionRecord: () => Promise.resolve(),
        updateQueueStatus: () => Promise.resolve(),
        setTimeout: () => undefined,
        clearTimeout: () => undefined,
      },
    )

    expect(accepted.completionPending).toBe(true)
    expect(events).toEqual(['started'])

    releaseChat({ message: { content: 'Done cleanly.' } })
    await accepted.completion

    expect(events).toEqual(['started', 'completed'])
  })
})
