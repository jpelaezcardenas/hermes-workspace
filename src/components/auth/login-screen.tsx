import { useMemo } from 'react'

const FEISHU_OAUTH_START_URL = '/api/auth'

function readAuthErrorFromUrl() {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  return String(params.get('auth_error') || '').trim()
}

export function LoginScreen() {
  const authError = useMemo(() => readAuthErrorFromUrl(), [])
  const shouldAutoRedirect = authError.length === 0

  const errorText =
    authError.length > 0
      ? authError
      : '未授权访问 ai-hotboard，请联系 JC'

  if (shouldAutoRedirect && typeof window !== 'undefined') {
    window.location.href = FEISHU_OAUTH_START_URL
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white px-8 py-10 shadow-xl shadow-primary-900/5 ring-1 ring-primary-900/5">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2.5">
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent-500"
              >
                <path
                  d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                  fill="currentColor"
                  opacity="0.15"
                />
                <path
                  d="M50 25 L75 38 L75 62 L50 75 L25 62 L25 38 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <circle cx="50" cy="50" r="15" fill="currentColor" />
              </svg>
              <h1 className="text-2xl font-bold tracking-tight text-primary-900">
                Hermes Workspace
              </h1>
            </div>
          </div>

          <h2 className="mb-2 text-center text-lg font-semibold text-primary-900">
            飞书单点登录
          </h2>
          <p className="mb-6 text-center text-sm text-primary-600">
            仅白名单员工可访问 AI Hotboard
          </p>

          <div className="space-y-4">
            {authError ? (
              <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-red-200">
                {errorText}
              </div>
            ) : null}

            <a
              href={FEISHU_OAUTH_START_URL}
              className="block w-full rounded-lg bg-accent-500 px-4 py-2.5 text-center font-medium text-white transition-all hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50"
            >
              使用飞书登录
            </a>

            <p className="text-center text-xs text-primary-500">
              若账号未授权，请联系 JC 开通白名单
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
