import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks/use-page-title'
import { McpSettingsScreen } from '@/screens/settings/mcp-settings-screen'

export const Route = createFileRoute('/settings/mcp')({
  ssr: false,
  component: function SettingsMcpRoute() {
    const { t } = useTranslation('settings')
    usePageTitle(t('pageTitleMcpServers', { defaultValue: 'MCP Servers' }))
    return <McpSettingsScreen />
  },
})
