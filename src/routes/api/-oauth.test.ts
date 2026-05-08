import { describe, expect, it } from 'vitest'
import { mapDashboardOAuthStart } from './oauth.device-code'
import { mapDashboardOAuthPoll } from './oauth.poll-token'

describe('OAuth dashboard response mapping', () => {
  it('maps device-code start response to the WebUI contract', () => {
    expect(
      mapDashboardOAuthStart({
        session_id: 'session-123',
        flow: 'device_code',
        user_code: 'ABCD-EFGH',
        verification_url: 'https://auth.openai.com/codex/device',
        expires_in: 900,
        poll_interval: 5,
      }),
    ).toEqual({
      device_code: 'session-123',
      session_id: 'session-123',
      flow: 'device_code',
      user_code: 'ABCD-EFGH',
      verification_uri: 'https://auth.openai.com/codex/device',
      verification_uri_complete: 'https://auth.openai.com/codex/device',
      interval: 5,
      expires_in: 900,
    })
  })

  it('maps poll status approved/pending/error to the WebUI contract', () => {
    expect(mapDashboardOAuthPoll({ status: 'approved' })).toEqual({ status: 'success' })
    expect(mapDashboardOAuthPoll({ status: 'pending' })).toEqual({ status: 'pending' })
    expect(
      mapDashboardOAuthPoll({ status: 'error', error_message: 'token exchange returned 400' }),
    ).toEqual({ status: 'error', message: 'token exchange returned 400' })
  })
})
