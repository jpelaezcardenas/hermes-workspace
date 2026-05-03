import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { ToolsMatrixScreen } from '@/screens/settings/tools-matrix-screen'

export const Route = createFileRoute('/settings/tools')({
  ssr: false,
  component: function SettingsToolsRoute() {
    usePageTitle('Tools')
    return <ToolsMatrixScreen />
  },
})
