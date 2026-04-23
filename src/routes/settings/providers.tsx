import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { ProvidersScreen } from '@/screens/settings/providers-screen'
import { useCurrentUser } from '@/hooks/use-current-user'
import { AdminOnlyState } from '@/components/admin-only-state'

export const Route = createFileRoute('/settings/providers')({
  ssr: false,
  component: function SettingsProvidersRoute() {
    usePageTitle('Provider Setup')
    const { isAdmin, isReady } = useCurrentUser()
    if (!isReady) return null
    if (!isAdmin) {
      return <AdminOnlyState featureLabel="Provider setup" />
    }
    return <ProvidersScreen />
  },
})
