import { describe, expect, it } from 'vitest'
import { buildFeishuAuthorizeUrl } from './feishu-auth'

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
})
