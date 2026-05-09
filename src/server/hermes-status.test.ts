import { describe, expect, it } from 'vitest'
import { normalizeHermesStatusPayload, sanitizeHermesStatusText } from './hermes-status'

describe('hermes status normalization', () => {
  it('keeps optional failures as warnings while overall remains ok', () => {
    const status = normalizeHermesStatusPayload({
      overall_ok: true,
      components: [
        { name: 'frontend_http', ok: true, required: true, detail: 'HTTP 200' },
        { name: 'user_systemd', ok: false, required: false, detail: 'No medium found' },
      ],
    })

    expect(status.overallOk).toBe(true)
    expect(status.summary.ok).toBe(1)
    expect(status.summary.warn).toBe(1)
    expect(status.summary.fail).toBe(0)
    expect(status.components[1]).toMatchObject({ severity: 'warn' })
  })

  it('redacts token-like detail text before returning status payloads', () => {
    const status = normalizeHermesStatusPayload({
      overall_ok: false,
      components: [
        { name: 'gateway_status', ok: false, required: true, detail: 'Authorization: Bearer secret-token token=abc123' },
      ],
    })

    const serialized = JSON.stringify(status)
    expect(serialized).not.toContain('secret-token')
    expect(serialized).not.toContain('abc123')
    expect(serialized).toContain('[REDACTED]')
  })

  it('sanitizes common secret patterns', () => {
    expect(sanitizeHermesStatusText('OPENAI_API_KEY=abc Authorization: Bearer xyz')).toContain('[REDACTED]')
  })
})
