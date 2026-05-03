import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { GatewayConfigScreen } from '@/screens/settings/gateway-config-screen'

export const Route = createFileRoute('/settings/gateway')({
  ssr: false,
  component: function SettingsGatewayRoute() {
    usePageTitle('Gateway Config')
    return <GatewayConfigScreen />
  },
})
