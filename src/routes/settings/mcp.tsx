import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { McpSettingsScreen } from '@/screens/settings/mcp-settings-screen'
import { useCurrentUser } from '@/hooks/use-current-user'
import { AdminOnlyState } from '@/components/admin-only-state'

export const Route = createFileRoute('/settings/mcp')({
  ssr: false,
  component: function SettingsMcpRoute() {
    usePageTitle('MCP Servers')
    const { isAdmin, isReady } = useCurrentUser()
    if (!isReady) return null
    if (!isAdmin) {
      return <AdminOnlyState featureLabel="MCP server configuration" />
    }
    return <McpSettingsScreen />
  },
})
