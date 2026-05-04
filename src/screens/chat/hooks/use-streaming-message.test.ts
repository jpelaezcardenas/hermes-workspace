import { describe, expect, it } from 'vitest'
import {
  buildSendStreamErrorMessage,
  isFetchAbortError,
} from './use-streaming-message'

// Pure helpers extracted from useStreamingMessage. The hook itself can't be
// rendered under vitest in this repo (TanStack Start's SSR plugin chain
// breaks React's hook dispatcher — see
// src/screens/agents/__tests__/live-workers-card.test.tsx for the same
// constraint). Testing these helpers covers the behavior the kanban task
// asked for: error state population on 503 / network failure, plus correct
// classification of user-initiated AbortError.

describe('buildSendStreamErrorMessage', () => {
  it('extracts the structured `error` key from a 503 SESSIONS_API_UNAVAILABLE body', () => {
    const body = JSON.stringify({
      ok: false,
      error:
        'Your Hermes backend does not support the sessions API. Update Hermes Agent.',
    })
    const msg = buildSendStreamErrorMessage(503, 'Service Unavailable', body)
    expect(msg).toMatch(/^HTTP 503: /)
    expect(msg).toMatch(/Your Hermes backend does not support the sessions API/)
  })

  it('extracts the `message` key when `error` is absent', () => {
    const body = JSON.stringify({ ok: false, message: 'session not found' })
    expect(
      buildSendStreamErrorMessage(404, 'Not Found', body),
    ).toBe('HTTP 404: session not found')
  })

  it('falls back to the raw body slice when JSON parse fails', () => {
    const msg = buildSendStreamErrorMessage(
      500,
      'Internal Server Error',
      'gateway timed out talking to upstream',
    )
    expect(msg).toBe('HTTP 500: gateway timed out talking to upstream')
  })

  it('falls back to statusText when body is empty', () => {
    expect(buildSendStreamErrorMessage(401, 'Unauthorized', '')).toBe(
      'HTTP 401: Unauthorized',
    )
  })

  it('truncates pathologically long raw bodies to 200 chars', () => {
    const huge = 'x'.repeat(5000)
    const msg = buildSendStreamErrorMessage(502, 'Bad Gateway', huge)
    expect(msg.length).toBeLessThanOrEqual(`HTTP 502: ${'x'.repeat(200)}`.length)
  })

  it('uses generic fallback when body parses to JSON with no recognized fields and is otherwise empty', () => {
    // An empty string body + empty statusText hits the final fallback branch.
    expect(buildSendStreamErrorMessage(500, '', '')).toBe(
      'HTTP 500: Stream request failed',
    )
  })

  it('ignores empty `error` strings and falls through', () => {
    const body = JSON.stringify({ ok: false, error: '   ' })
    // Whitespace-only error key is ignored; falls through to body slice.
    const msg = buildSendStreamErrorMessage(503, 'Service Unavailable', body)
    expect(msg).toContain('HTTP 503: ')
    // Either the raw body slice or the statusText, but not the empty `error`.
    expect(msg).not.toMatch(/^HTTP 503:\s*$/)
  })
})

describe('isFetchAbortError', () => {
  it('returns true for a real DOMException AbortError', () => {
    const err =
      typeof DOMException !== 'undefined'
        ? new DOMException('aborted', 'AbortError')
        : Object.assign(new Error('aborted'), { name: 'AbortError' })
    expect(isFetchAbortError(err)).toBe(true)
  })

  it('returns true for a plain Error renamed to AbortError', () => {
    const err = Object.assign(new Error('user cancelled'), {
      name: 'AbortError',
    })
    expect(isFetchAbortError(err)).toBe(true)
  })

  it('returns true for a plain object with name=AbortError (some polyfills)', () => {
    expect(isFetchAbortError({ name: 'AbortError' })).toBe(true)
  })

  it('returns false for a generic network TypeError ("Failed to fetch")', () => {
    expect(isFetchAbortError(new TypeError('Failed to fetch'))).toBe(false)
  })

  it('returns false for null / undefined / primitive errors', () => {
    expect(isFetchAbortError(null)).toBe(false)
    expect(isFetchAbortError(undefined)).toBe(false)
    expect(isFetchAbortError('aborted')).toBe(false)
    expect(isFetchAbortError(42)).toBe(false)
  })
})
