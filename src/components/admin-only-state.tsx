import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { LockIcon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'

type Props = {
  featureLabel?: string
}

export function AdminOnlyState({
  featureLabel = 'This area',
}: Props) {
  const { email } = useCurrentUser()

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-primary-200 bg-primary-50/80 p-8 text-center shadow-sm backdrop-blur-xl">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-primary-200 bg-primary-100/70">
          <HugeiconsIcon icon={LockIcon} size={24} strokeWidth={1.5} />
        </span>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-primary-900">
            Admin only
          </h2>
          <p className="text-sm text-primary-600 text-pretty">
            {featureLabel} is restricted to Hermes administrators. Ask an admin
            to adjust the <code className="font-mono text-xs">HERMES_ADMIN_EMAILS</code>{' '}
            allowlist if you need access.
          </p>
          {email ? (
            <p className="text-xs text-primary-500">
              Signed in as <span className="font-mono">{email}</span>
            </p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Link to="/chat/$sessionKey" params={{ sessionKey: 'main' }}>
            <Button size="sm">Back to chat</Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" variant="outline">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
