import { describe, expect, it } from 'vitest'
import { handleHotboardVotePost } from './hotboard-vote-api'
import { createSessionStore, storeSessionToken } from './auth-middleware'

describe('hotboard vote api identity from auth session', () => {
  it('ignores user_id in request body and uses authenticated feishu open_id', async () => {
    const store = createSessionStore()
    store.upsertUser({
      feishuOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
      feishuUnionId: 'on_owner',
      displayName: 'JC',
      role: 'owner',
    })

    storeSessionToken('session-token-1', {
      userId: 'ou_40ece573ca861adce640dc9ea5054460',
      ttlSeconds: 7 * 24 * 60 * 60,
    })

    const request = new Request('http://localhost/api/hotboard/vote', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
        cookie: 'hermes-auth=session-token-1',
      },
      body: JSON.stringify({
        event_id: 'event-auth-1',
        vote_type: 'like',
        user_id: 'spoofed-user',
      }),
    })

    const response = await handleHotboardVotePost(request)
    expect(response.status).toBe(200)

    const payload = (await response.json()) as {
      ok: boolean
      user_id: string
    }
    expect(payload.ok).toBe(true)
    expect(payload.user_id).toBe('ou_40ece573ca861adce640dc9ea5054460')
  })
})
