import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export type SettingsNavId =
  | 'connection'
  | 'hermes'
  | 'agent'
  | 'routing'
  | 'voice'
  | 'display'
  | 'appearance'
  | 'chat'
  | 'notifications'
  | 'mcp'
  | 'language'

type NavItem = { id: SettingsNavId; labelKey: string }

export const SETTINGS_NAV_ITEMS: Array<NavItem> = [
  { id: 'connection', labelKey: 'navConnection' },
  { id: 'hermes', labelKey: 'navModelProvider' },
  { id: 'agent', labelKey: 'navAgentBehavior' },
  { id: 'routing', labelKey: 'navSmartRouting' },
  { id: 'voice', labelKey: 'navVoice' },
  { id: 'display', labelKey: 'navDisplay' },
  { id: 'appearance', labelKey: 'navAppearance' },
  { id: 'chat', labelKey: 'navChat' },
  { id: 'notifications', labelKey: 'navNotifications' },
  { id: 'mcp', labelKey: 'navMcpServers' },
  { id: 'language', labelKey: 'language' },
]

type ItemRendererArgs = {
  item: NavItem
  label: string
  isActive: boolean
  activeClass: string
  inactiveClass: string
  indicator: ReactNode
}

function renderItem({
  item,
  label,
  isActive,
  activeClass,
  inactiveClass,
  indicator,
}: ItemRendererArgs) {
  const className = cn(
    'relative rounded-lg px-3 py-2 text-left text-sm transition-colors',
    isActive ? activeClass : inactiveClass,
  )
  const content = (
    <>
      {isActive ? indicator : null}
      {label}
    </>
  )
  if (item.id === 'mcp') {
    return (
      <Link key={item.id} to="/settings/mcp" className={className}>
        {content}
      </Link>
    )
  }
  return (
    <Link
      key={item.id}
      to="/settings"
      search={{ section: item.id }}
      className={className}
    >
      {content}
    </Link>
  )
}

export function SettingsSidebar({ activeId }: { activeId: SettingsNavId }) {
  const { t } = useTranslation('settings')
  const activeClass =
    'bg-[var(--theme-accent-subtle)] text-[var(--theme-accent)] font-semibold'
  const inactiveClass =
    'text-primary-600 hover:bg-primary-100 hover:text-primary-900'
  const indicator = (
    <span
      aria-hidden
      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[var(--theme-accent)]"
    />
  )

  return (
    <nav className="hidden w-48 shrink-0 md:block">
      <div className="sticky top-8">
        <h1 className="mb-4 px-3 text-lg font-semibold text-primary-900">
          {t('title', { defaultValue: 'Settings' })}
        </h1>
        <div className="flex flex-col gap-0.5">
          {SETTINGS_NAV_ITEMS.map((item) =>
            renderItem({
              item,
              label: t(item.labelKey, { defaultValue: item.labelKey }),
              isActive: activeId === item.id,
              activeClass,
              inactiveClass,
              indicator,
            }),
          )}
        </div>
      </div>
    </nav>
  )
}

export function SettingsMobilePills({ activeId }: { activeId: SettingsNavId }) {
  const { t } = useTranslation('settings')
  const activeClass =
    'bg-[var(--theme-accent)] text-[var(--theme-bg)] font-semibold'
  const inactiveClass =
    'bg-primary-100 text-primary-600 hover:bg-primary-200'
  return (
    <div className="scrollbar-none flex gap-1.5 overflow-x-auto pb-2 md:hidden">
      {SETTINGS_NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id
        const className = cn(
          'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          isActive ? activeClass : inactiveClass,
        )
        if (item.id === 'mcp') {
          return (
            <Link key={item.id} to="/settings/mcp" className={className}>
              {t(item.labelKey, { defaultValue: item.labelKey })}
            </Link>
          )
        }
        return (
          <Link
            key={item.id}
            to="/settings"
            search={{ section: item.id }}
            className={className}
          >
            {t(item.labelKey, { defaultValue: item.labelKey })}
          </Link>
        )
      })}
    </div>
  )
}
