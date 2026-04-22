import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildFeishuAuthorizeUrl, resolveFeishuUserFromCallback } from './feishu-auth'

const originalEnv = {
  FEISHU_APP_ID: process.env.FEISHU_APP_ID,
  FEISHU_APP_SECRET: process.env.FEISHU_APP_SECRET,
  FEISHU_REDIRECT_URI: process.env.FEISHU_REDIRECT_URI,
}

afterEach(() => {
  vi.restoreAllMocks()

  if (originalEnv.FEISHU_APP_ID === undefined) {
    delete process.env.FEISHU_APP_ID
  } else {
    process.env.FEISHU_APP_ID = originalEnv.FEISHU_APP_ID
  }

  if (originalEnv.FEISHU_APP_SECRET === undefined) {
    delete process.env.FEISHU_APP_SECRET
  } else {
    process.env.FEISHU_APP_SECRET = originalEnv.FEISHU_APP_SECRET
  }

  if (originalEnv.FEISHU_REDIRECT_URI === undefined) {
    delete process.env.FEISHU_REDIRECT_URI
  } else {
    process.env.FEISHU_REDIRECT_URI = originalEnv.FEISHU_REDIRECT_URI
  }
})

describe('feishu auth helpers', () => {
  it('builds authorize url with required parameters', () => {
    process.env.FEISHU_APP_ID = 'cli_a908948c53f89bb4'
    process.env.FEISHU_APP_SECRET = 'secret'
    process.env.FEISHU_REDIRECT_URI = '/auth/feishu/callback'

    const request = new Request('http://localhost:3000/api/auth')
    const url = new URL(buildFeishuAuthorizeUrl(request, 'state-1'))

    expect(url.origin).toBe('https://open.feishu.cn')
    expect(url.pathname).toBe('/open-apis/authen/v1/index')
    expect(url.searchParams.get('app_id')).toBe('cli_a908948c53f89bb4')
    expect(url.searchParams.get('response_type')).toBe('code')
    expect(url.searchParams.get('scope')).toBe('contact:user.base:readonly')
    expect(url.searchParams.get('state')).toBe('state-1')
    expect(url.searchParams.get('redirect_uri')).toBe('http://localhost:3000/auth/feishu/callback')
  })

  it('exchanges oauth code via app_access_token then authen access_token endpoint', async () => {
    process.env.FEISHU_APP_ID = 'cli_a908948c53f89bb4'
    process.env.FEISHU_APP_SECRET = 'secret'
    process.env.FEISHU_REDIRECT_URI = '/auth/feishu/callback'

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          code: 0,
          app_access_token: 'app-token-1',
          expire: 7200,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    ).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          code: 0,
          data: { access_token: 'user-token-1' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    ).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          code: 0,
          data: {
            open_id: 'ou_01e621b00ca6ba95e9a1e10bb444c9ae',
            union_id: 'on_union_1',
            name: 'JC',
          },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const request = new Request(
      'http://localhost:3000/auth/feishu/callback?code=oauth-code-1',
    )
    const resolved = await resolveFeishuUserFromCallback(request, 'oauth-code-1')

    expect(fetchMock).toHaveBeenCalledTimes(3)
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal',
    )
    expect(fetchMock.mock.calls[1]?.[0]).toBe(
      'https://open.feishu.cn/open-apis/authen/v1/access_token',
    )
    expect(fetchMock.mock.calls[2]?.[0]).toBe(
      'https://open.feishu.cn/open-apis/authen/v1/user_info',
    )

    const firstRequestInit = fetchMock.mock.calls[0]?.[1] as RequestInit
    expect(firstRequestInit.method).toBe('POST')
    expect(firstRequestInit.body).toBe(
      JSON.stringify({
        app_id: 'cli_a908948c53f89bb4',
        app_secret: 'secret',
      }),
    )

    const secondRequestInit = fetchMock.mock.calls[1]?.[1] as RequestInit
    expect(secondRequestInit.method).toBe('POST')
    expect(secondRequestInit.headers).toMatchObject({
      Authorization: 'Bearer app-token-1',
    })
    expect(secondRequestInit.body).toBe(
      JSON.stringify({
        grant_type: 'authorization_code',
        code: 'oauth-code-1',
      }),
    )

    expect(resolved).toEqual({
      openId: 'ou_01e621b00ca6ba95e9a1e10bb444c9ae',
      unionId: 'on_union_1',
      displayName: 'JC',
      role: 'owner',
    })
  })
})
