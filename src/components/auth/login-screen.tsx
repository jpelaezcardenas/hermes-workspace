import { useMemo, useState } from 'react'

const FEISHU_OAUTH_START_URL = '/api/auth'
const EMAIL_MAGIC_LINK_START_URL = '/api/auth/email'

function readAuthErrorFromUrl() {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  return String(params.get('auth_error') || '').trim()
}

export function LoginScreen() {
  const authError = useMemo(() => readAuthErrorFromUrl(), [])
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)

  const errorText =
    authError.length > 0
      ? authError
      : '未授权访问 ai-hotboard，请联系 JC'

  async function submitEmailMagicLink() {
    const normalized = email.trim().toLowerCase()
    if (!normalized) {
      setRequestError('请输入邮箱')
      return
    }

    setSubmitting(true)
    setRequestError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch(EMAIL_MAGIC_LINK_START_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalized }),
      })

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }

      if (!response.ok || !payload.ok) {
        setRequestError(payload.error || `发送失败（HTTP ${response.status}）`)
        return
      }

      setRequestSuccess(`已发邮件到 ${normalized}，请点击链接登录（15 分钟有效）`)
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : '发送失败，请稍后再试')
    } finally {
      setSubmitting(false)
    }
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

          <h2 className="mb-2 text-center text-lg font-semibold text-primary-900">邮箱登录</h2>
          <p className="mb-6 text-center text-sm text-primary-600">
            仅白名单员工可访问 AI Hotboard（Magic Link，15 分钟有效）
          </p>

          <div className="space-y-4">
            {authError ? (
              <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-red-200">
                {errorText}
              </div>
            ) : null}

            <div className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (requestError) setRequestError(null)
                  if (requestSuccess) setRequestSuccess(null)
                }}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-primary-900 outline-none focus:border-accent-500/60"
                autoComplete="email"
              />
              <button
                type="button"
                onClick={() => {
                  void submitEmailMagicLink()
                }}
                disabled={submitting}
                className="block w-full rounded-lg bg-accent-500 px-4 py-2.5 text-center font-medium text-white transition-all hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? '发送中...' : '发送登录链接'}
              </button>
            </div>

            {requestError ? (
              <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-red-200">
                {requestError}
              </div>
            ) : null}

            {requestSuccess ? (
              <div className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 ring-1 ring-emerald-200">
                {requestSuccess}
              </div>
            ) : null}

            <div className="pt-2">
              <div className="mb-2 text-center text-xs text-primary-500">或使用飞书 SSO</div>
              <a
                href={FEISHU_OAUTH_START_URL}
                className="block w-full rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-center font-medium text-primary-700 transition-all hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
              >
                使用飞书登录
              </a>
            </div>

            <p className="text-center text-xs text-primary-500">
              若账号未授权，请联系 JC 开通白名单
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
