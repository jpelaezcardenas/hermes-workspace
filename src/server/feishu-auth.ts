import { getFeishuAuthConfig, resolveWhitelistedUserByOpenId } from './auth-middleware'

const FEISHU_BASE_URL = 'https://open.feishu.cn'

type FeishuTokenResponse = {
  code: number
  msg?: string
  data?: {
    access_token?: string
  }
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

  const response = await fetch(`${FEISHU_BASE_URL}/open-apis/authen/v1/oidc/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      app_id: config.appId,
      app_secret: config.appSecret,
      redirect_uri: redirectUri,
    }),
  })

  const body = (await response.json().catch(() => ({}))) as FeishuTokenResponse
  if (!response.ok || body.code !== 0 || !body.data?.access_token) {
    throw new Error(`Failed to exchange Feishu OAuth code: ${body.msg || response.statusText}`)
  }

  return body.data.access_token
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
