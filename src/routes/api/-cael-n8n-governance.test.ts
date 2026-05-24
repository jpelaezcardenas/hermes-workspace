import { describe, expect, it } from 'vitest'
import {
  getN8nCommandRegistry,
  scrubSensitiveText,
  summarizeReceiptPath,
} from '../../lib/cael-n8n-governance'

describe('cael n8n governance helpers', () => {
  it('keeps dangerous workflow actions approval gated', () => {
    const commands = getN8nCommandRegistry()
    const risky = commands.filter(
      (command) =>
        command.riskLevel !== 'read_only' &&
        command.riskLevel !== 'reversible_local',
    )

    expect(commands.length).toBeGreaterThan(0)
    expect(risky.length).toBeGreaterThan(0)
    expect(risky.every((command) => command.approvalRequired)).toBe(true)
    expect(
      commands.every(
        (command) => command.dryRunSupported || command.approvalRequired,
      ),
    ).toBe(true)
  })

  it('scrubs common secret patterns before text reaches the UI', () => {
    const scrubbed = scrubSensitiveText(
      'PGPASSWORD=hunter2 bearer abc.def token=raw secret: nope password=swordfish',
    )

    expect(scrubbed).not.toContain('hunter2')
    expect(scrubbed).not.toContain('abc.def')
    expect(scrubbed).not.toContain('raw')
    expect(scrubbed).not.toContain('swordfish')
  })

  it('classifies receipt paths without reading receipt contents', () => {
    const receipt = summarizeReceiptPath(
      '/Users/cderamos/.hermes/cael-workspace/n8n-business-promotion-receipt.md',
      new Date('2026-05-24T00:00:00.000Z'),
    )

    expect(receipt.instance).toBe('business-devserver')
    expect(receipt.title).toContain('n8n business promotion receipt')
  })
})
