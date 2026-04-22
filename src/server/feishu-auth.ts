import { getFeishuAuthConfig, resolveWhitelistedUserByOpenId } from './auth-middleware'

const FEISHU_BASE_URL = 'https://open.feishu.cn'

type FeishuTokenResponse = {
  // Standard OAuth2 flat format (v1 oidc endpoint returns this):
  access_token?: string
  token_type?: string
  expires_in?: number
  refresh_token?: string
  scope?: string
  // Error response:
  error?: string
  error_description?: string
  // Legacy Feishu-wrapped format (fallback):
  code?: number
  msg?: string
  data?: {
    access_token?: string
  }
}

type FeishuAppAccessTokenResponse = {
  code?: number
  msg?: string
  app_access_token?: string
}

type FeishuUserInfoResponse = {
  code: number
  msg?: string
  data?: {
    open_id?: string
    union_id?: string
    name?: string
    en_name?: string
    avatar_url?: string
    email?: string
  }
}

export type FeishuResolvedUser = {
  openId: string
  unionId: string | null
  displayName: string
  role: 'owner' | 'member'
}

function resolveCallbackUri(request: Request) {
  const config = getFeishuAuthConfig()
  if (!config) return null

  const redirectUri = config.redirectUri
  if (redirectUri.startsWith('http://') || redirectUri.startsWith('https://')) {
    return redirectUri
  }

  const origin = new URL(request.url).origin
  return `${origin}${redirectUri.startsWith('/') ? redirectUri : `/${redirectUri}`}`
}

export function buildFeishuAuthorizeUrl(request: Request, state: string) {
  const config = getFeishuAuthConfig()
  if (!config) {
    throw new Error('Feishu SSO is not configured')
  }

  const redirectUri = resolveCallbackUri(request)
  if (!redirectUri) {
    throw new Error('Feishu callback URI is unavailable')
  }

  const url = new URL(`${FEISHU_BASE_URL}/open-apis/authen/v1/index`)
  url.searchParams.set('app_id', config.appId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'contact:user.base:readonly')
  url.searchParams.set('state', state)
  return url.toString()
}

async function exchangeCodeForUserAccessToken(request: Request, code: string) {
  const config = getFeishuAuthConfig()
  if (!config) {
    throw new Error('Feishu SSO is not configured')
  }

  const redirectUri = resolveCallbackUri(request)
  if (!redirectUri) {
    throw new Error('Feishu callback URI is unavailable')
  }

  const appAccessResponse = await fetch(`${FEISHU_BASE_URL}/open-apis/auth/v3/app_access_token/internal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      app_id: config.appId,
      app_secret: config.appSecret,
    }),
  })

  const appAccessRawText = await appAccessResponse.text()
  let appAccessBody: FeishuAppAccessTokenResponse = {}
  try {
    appAccessBody = JSON.parse(appAccessRawText) as FeishuAppAccessTokenResponse
  } catch {
    // non-json
  }

  const appAccessToken = appAccessBody.app_access_token
  if (!appAccessResponse.ok || appAccessBody.code !== 0 || !appAccessToken) {
    console.error('[feishu app access token FAILED]', {
      httpStatus: appAccessResponse.status,
      httpStatusText: appAccessResponse.statusText,
      rawBody: appAccessRawText.slice(0, 500),
      parsedBody: appAccessBody,
    })
    const err = appAccessBody.msg || appAccessResponse.statusText
    throw new Error(`Failed to fetch Feishu app access token: ${err}`)
  }

  const response = await fetch(`${FEISHU_BASE_URL}/open-apis/authen/v1/access_token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appAccessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
    }),
  })

  const rawText = await response.text()
  let body: FeishuTokenResponse = {}
  try {
    body = JSON.parse(rawText) as FeishuTokenResponse
  } catch {
    // non-json
  }

  const accessToken = body.data?.access_token || body.access_token
  if (!response.ok || body.code !== 0 || !accessToken) {
    console.error('[feishu token exchange FAILED]', {
      httpStatus: response.status,
      httpStatusText: response.statusText,
      rawBody: rawText.slice(0, 500),
      parsedBody: body,
    })
    const err = body.error_description || body.error || body.msg || response.statusText
    throw new Error(`Failed to exchange Feishu OAuth code: ${err}`)
  }

  return accessToken
}

async function fetchCurrentFeishuUser(accessToken: string) {
  const response = await fetch(`${FEISHU_BASE_URL}/open-apis/authen/v1/user_info`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  const body = (await response.json().catch(() => ({}))) as FeishuUserInfoResponse
  if (!response.ok || body.code !== 0 || !body.data?.open_id) {
    throw new Error(`Failed to fetch Feishu user profile: ${body.msg || response.statusText}`)
  }

  return body.data
}

export async function resolveFeishuUserFromCallback(request: Request, code: string): Promise<FeishuResolvedUser> {
  const accessToken = await exchangeCodeForUserAccessToken(request, code)
  const profile = await fetchCurrentFeishuUser(accessToken)

  const openId = String(profile.open_id || '').trim()
  if (!openId) {
    throw new Error('Feishu user profile missing open_id')
  }

  const allowed = resolveWhitelistedUserByOpenId(openId)
  if (!allowed) {
    console.error('[feishu whitelist MISS]', {
      openId,
      unionId: profile.union_id,
      name: profile.name,
      hint: '将 openId 加入 EMPLOYEE_WHITELIST 或改用 union_id 匹配',
    })
    throw new Error('UNAUTHORIZED_WHITELIST')
  }

  const displayName = String(profile.name || allowed.displayName).trim() || allowed.displayName

  return {
    openId,
    unionId: profile.union_id?.trim() || null,
    displayName,
    role: allowed.role,
  }
}
