import { describe, expect, it } from 'vitest'

import { buildVoiceLedgerRecord } from './-voice-lab-ledger-utils'

describe('buildVoiceLedgerRecord', () => {
  it('creates a delegation handoff from a voice conversation', () => {
    const record = buildVoiceLedgerRecord({
      conversationId: 'voice-test',
      sessionKey: 'session-test',
      status: 'ended',
      updatedAt: '2026-05-22T20:00:00.000Z',
      turns: [
        {
          id: '1',
          role: 'tim',
          text: 'I need someone to prepare my May 28 Travel Multiplier webinar so attendees believe travel hacking is real and buy the course.',
          timestamp: '2026-05-22T19:59:00.000Z',
        },
        {
          id: '2',
          role: 'executive',
          text: 'Decision: delegate this to the sales webinar prep workflow. Next action: draft the webinar outline and offer bridge. Needs approval before publishing or sending anything.',
          timestamp: '2026-05-22T20:00:00.000Z',
        },
      ],
      elevenLabsLog: ['connected'],
    })

    expect(record.review.summary).toContain('sales webinar prep workflow')
    expect(record.review.decisions).toContain('Decision: delegate this to the sales webinar prep workflow.')
    expect(record.review.followUpActions).toContain('Next action: draft the webinar outline and offer bridge.')
    expect(record.review.openQuestions).toContain('No open questions detected.')
    expect(record.review.needsApproval).toContain('Needs approval before publishing or sending anything.')
    expect(record.delegation).toMatchObject({
      outcome: 'prepare my May 28 Travel Multiplier webinar so attendees believe travel hacking is real and buy the course',
      owner: 'sales webinar prep workflow',
      nextAction: 'draft the webinar outline and offer bridge',
      approvalRequired: true,
    })
    expect(record.delegation.context).toContain('May 28 Travel Multiplier webinar')
    expect(record.delegation.constraints).toContain('No side effects without explicit confirmation.')
  })
})
