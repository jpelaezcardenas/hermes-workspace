import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks/use-page-title'
import { ProvidersScreen } from '@/screens/settings/providers-screen'

export const Route = createFileRoute('/settings/providers')({
  ssr: false,
  component: function SettingsProvidersRoute() {
    const { t } = useTranslation('settings')
    usePageTitle(t('pageTitleProviderSetup', { defaultValue: 'Provider Setup' }))
    return <ProvidersScreen />
  },
})
