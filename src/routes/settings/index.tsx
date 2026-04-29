import { HugeiconsIcon } from '@hugeicons/react'
import {
  CheckmarkCircle02Icon,
  CloudIcon,
  Link01Icon,
  MessageMultiple01Icon,
  Mic01Icon,
  Notification03Icon,
  PaintBoardIcon,
  Settings02Icon,
  SourceCodeSquareIcon,
  SparklesIcon,
  UserIcon,
  VolumeHighIcon,
} from '@hugeicons/core-free-icons'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import type * as React from 'react'
import { useTranslation } from 'react-i18next'
import type { LoaderStyle } from '@/hooks/use-chat-settings'
import type { BrailleSpinnerPreset } from '@/components/ui/braille-spinner'
import type { ThemeId } from '@/lib/theme'

function themeCardLabelKey(id: ThemeId): string {
  return `themeCard_${id.replace(/-/g, '_')}_label`
}

function themeCardDescKey(id: ThemeId): string {
  return `themeCard_${id.replace(/-/g, '_')}_desc`
}
import type { SettingsNavId } from '@/components/settings/settings-sidebar'
import {
  SETTINGS_NAV_ITEMS,
  SettingsMobilePills,
  SettingsSidebar,
} from '@/components/settings/settings-sidebar'
import { usePageTitle } from '@/hooks/use-page-title'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/hooks/use-settings'
import { getLocale, setLocale, LOCALE_LABELS, type LocaleId } from '@/lib/i18n'
import { THEMES, getTheme, isDarkTheme, setTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'
import {
  getChatProfileDisplayName,
  useChatSettingsStore,
} from '@/hooks/use-chat-settings'
import { UserAvatar } from '@/components/avatars'
import { Input } from '@/components/ui/input'
import { LogoLoader } from '@/components/logo-loader'
import { BrailleSpinner } from '@/components/ui/braille-spinner'
import { ThreeDotsSpinner } from '@/components/ui/three-dots-spinner'
// useWorkspaceStore removed — hamburger eliminated on mobile

const VALID_SECTION_IDS: ReadonlyArray<SettingsNavId> = SETTINGS_NAV_ITEMS.map(
  (item) => item.id,
)

export const Route = createFileRoute('/settings/')({
  ssr: false,
  validateSearch: (
    search: Record<string, unknown>,
  ): { section?: SettingsNavId } => {
    const raw = typeof search.section === 'string' ? search.section : undefined
    if (raw && (VALID_SECTION_IDS as ReadonlyArray<string>).includes(raw)) {
      return { section: raw as SettingsNavId }
    }
    return {}
  },
  component: SettingsRoute,
})

function PageThemeSwatch({
  colors,
}: {
  colors: {
    bg: string
    panel: string
    border: string
    accent: string
    text: string
  }
}) {
  return (
    <div
      className="flex h-10 w-full overflow-hidden rounded-md border"
      style={{ borderColor: colors.border, backgroundColor: colors.bg }}
    >
      <div
        className="flex h-full w-4 flex-col gap-0.5 p-0.5"
        style={{ backgroundColor: colors.panel }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 w-full rounded-sm"
            style={{ backgroundColor: colors.border }}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-1">
        <div
          className="h-1.5 w-3/4 rounded"
          style={{ backgroundColor: colors.text, opacity: 0.8 }}
        />
        <div
          className="h-1 w-1/2 rounded"
          style={{ backgroundColor: colors.text, opacity: 0.3 }}
        />
        <div
          className="mt-0.5 h-1.5 w-6 rounded-full"
          style={{ backgroundColor: colors.accent }}
        />
      </div>
    </div>
  )
}

const THEME_PREVIEWS: Record<
  ThemeId,
  { bg: string; panel: string; border: string; accent: string; text: string }
> = {
  'hermes-nous': {
    bg: '#031a1a',
    panel: '#082224',
    border: 'rgba(255,255,255,0.12)',
    accent: '#ffac02',
    text: '#f8f1e3',
  },
  'hermes-nous-light': {
    bg: '#F8FAF8',
    panel: '#FBFDFB',
    border: 'rgba(30,74,92,0.18)',
    accent: '#2557B7',
    text: '#16315F',
  },
  'hermes-official': {
    bg: '#0A0E1A',
    panel: '#11182A',
    border: '#24304A',
    accent: '#6366F1',
    text: '#E6EAF2',
  },
  'hermes-official-light': {
    bg: '#F7F7F1',
    panel: '#FAFBF6',
    border: '#CDD5DA',
    accent: '#2557B7',
    text: '#16315F',
  },
  'hermes-classic': {
    bg: '#0d0f12',
    panel: '#1a1f26',
    border: '#2a313b',
    accent: '#b98a44',
    text: '#eceff4',
  },
  'hermes-slate': {
    bg: '#0d1117',
    panel: '#1c2128',
    border: '#30363d',
    accent: '#7eb8f6',
    text: '#c9d1d9',
  },
  'hermes-classic-light': {
    bg: '#F5F2ED',
    panel: '#FFFFFF',
    border: '#D9D0C4',
    accent: '#b98a44',
    text: '#1a1f26',
  },
  'hermes-slate-light': {
    bg: '#F6F8FA',
    panel: '#FFFFFF',
    border: '#D0D7DE',
    accent: '#3b82f6',
    text: '#1F2328',
  },
  qclaw: {
    bg: '#17191D',
    panel: '#242832',
    border: 'rgba(255,255,255,0.1)',
    accent: '#34A8FF',
    text: '#F4F6F8',
  },
  'qclaw-light': {
    bg: '#FFFFFF',
    panel: '#F7F7F8',
    border: '#E7E8EA',
    accent: '#168BFF',
    text: '#202124',
  },
}

function WorkspaceThemePicker() {
  const { t } = useTranslation('settings')
  const { updateSettings } = useSettings()
  const [current, setCurrent] = useState<ThemeId>(() => getTheme())

  function applyWorkspaceTheme(id: ThemeId) {
    setTheme(id)
    updateSettings({ theme: isDarkTheme(id) ? 'dark' : 'light' })
    setCurrent(id)
  }

  return (
    <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
      {THEMES.map((themeEntry) => {
        const isActive = current === themeEntry.id
        const label = t(themeCardLabelKey(themeEntry.id), {
          defaultValue: themeEntry.label,
        })
        const description = t(themeCardDescKey(themeEntry.id), {
          defaultValue: themeEntry.description,
        })
        return (
          <button
            key={themeEntry.id}
            type="button"
            onClick={() => applyWorkspaceTheme(themeEntry.id)}
            className={cn(
              'flex min-h-[112px] flex-col gap-2.5 rounded-xl border p-3.5 text-left transition-all',
              isActive
                ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-subtle)] text-[var(--theme-text)] shadow-sm'
                : 'border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-text)] hover:-translate-y-0.5 hover:bg-[var(--theme-card2)]',
            )}
          >
            <PageThemeSwatch colors={THEME_PREVIEWS[themeEntry.id]} />
            <div className="flex items-center gap-1.5">
              <span className="text-xs">{themeEntry.icon}</span>
              <span className="text-xs font-semibold">{label}</span>
              {isActive && (
                <span className="ml-auto text-[9px] font-bold uppercase tracking-wide text-[var(--theme-accent)]">
                  {t('themePickerActive', { defaultValue: 'Active' })}
                </span>
              )}
            </div>
            <p className="text-[10px] leading-tight text-[var(--theme-muted)]">
              {description}
            </p>
          </button>
        )
      })}
    </div>
  )
}

type SectionProps = {
  title: string
  description: string
  icon: React.ComponentProps<typeof HugeiconsIcon>['icon']
  children: React.ReactNode
}

function SettingsSection({ title, description, icon, children }: SectionProps) {
  return (
    <section className="rounded-2xl border border-primary-200 bg-primary-50/80 p-4 shadow-sm backdrop-blur-xl md:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-xl border border-primary-200 bg-primary-100/70">
          <HugeiconsIcon icon={icon} size={20} strokeWidth={1.5} />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-medium text-primary-900 text-balance">
            {title}
          </h2>
          <p className="text-sm text-primary-600 text-pretty">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

type RowProps = {
  label: string
  description?: string
  children: React.ReactNode
}

function SettingsRow({ label, description, children }: RowProps) {
  return (
    <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-primary-900 text-balance">
          {label}
        </p>
        {description ? (
          <p className="text-xs text-primary-600 text-pretty">{description}</p>
        ) : null}
      </div>
      <div className="flex w-full items-center gap-2 md:w-auto md:justify-end">
        {children}
      </div>
    </div>
  )
}

type SettingsSectionId = SettingsNavId

function SettingsRoute() {
  const { t: tr } = useTranslation(['settings', 'common'])
  usePageTitle(tr('settings:title', { defaultValue: 'Settings' }))
  const { settings, updateSettings } = useSettings()

  // Phase 4.2: Fetch models for preferred model dropdowns
  const [availableModels, setAvailableModels] = useState<
    Array<{ id: string; label: string }>
  >([])
  const [modelsError, setModelsError] = useState(false)

  useEffect(() => {
    async function fetchModels() {
      setModelsError(false)
      try {
        const res = await fetch('/api/models')
        if (!res.ok) {
          setModelsError(true)
          return
        }
        const data = await res.json()
        const models = Array.isArray(data.models) ? data.models : []
        setAvailableModels(
          models.map((m: any) => ({
            id: m.id || '',
            label: m.id?.split('/').pop() || m.id || '',
          })),
        )
      } catch {
        setModelsError(true)
      }
    }
    void fetchModels()
  }, [])

  const { section } = Route.useSearch()
  const activeSection: SettingsSectionId = section ?? 'hermes'

  return (
    <div className="min-h-screen bg-surface text-primary-900">
      <div className="pointer-events-none fixed inset-0 bg-radial from-primary-400/20 via-transparent to-transparent" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-primary-100/25 via-transparent to-primary-300/20" />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pt-6 pb-24 sm:px-6 md:flex-row md:gap-6 md:pb-8 lg:pt-8">
        <SettingsSidebar activeId={activeSection} />

        <SettingsMobilePills activeId={activeSection} />

        {/* Content area */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* -- Connection ------------------ */}
          {activeSection === 'connection' && <ConnectionSection />}

          {/* ── Hermes Agent ──────────────────────────────────── */}
          {activeSection === 'hermes' && (
            <HermesConfigSection activeView="hermes" />
          )}
          {activeSection === 'agent' && (
            <HermesConfigSection activeView="agent" />
          )}
          {activeSection === 'routing' && (
            <HermesConfigSection activeView="routing" />
          )}
          {activeSection === 'voice' && (
            <HermesConfigSection activeView="voice" />
          )}
          {activeSection === 'display' && (
            <HermesConfigSection activeView="display" />
          )}

          {/* ── Appearance ──────────────────────────────────────── */}
          {activeSection === 'appearance' && (
            <>
              <SettingsSection
                title={tr('settings:appearanceTitle', { defaultValue: 'Appearance' })}
                description={tr('settings:appearanceDesc', { defaultValue: 'Choose a workspace theme and accent color.' })}
                icon={PaintBoardIcon}
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-primary-900">
                      {tr('settings:theme', { defaultValue: 'Theme' })}
                    </p>
                    <p className="text-xs text-primary-600 text-pretty">
                      {tr('settings:themeDesc', {
                        defaultValue: 'Choose the workspace palette. Light and dark variants are both available.',
                      })}
                    </p>
                  </div>
                  <WorkspaceThemePicker />
                </div>
              </SettingsSection>
            </>
          )}

          {/* ── Chat ────────────────────────────────────────────── */}
          {activeSection === 'chat' && <ChatDisplaySection />}

          {/* ── Editor ──────────────────────────────────────────── */}
          {activeSection === ('editor' as SettingsSectionId) && (
            <SettingsSection
              title="Editor"
              description="Configure Monaco defaults for the files workspace."
              icon={SourceCodeSquareIcon}
            >
              <SettingsRow
                label="Font size"
                description="Adjust editor font size between 12 and 20."
              >
                <div className="flex w-full items-center gap-2 md:max-w-xs">
                  <input
                    type="range"
                    min={12}
                    max={20}
                    value={settings.editorFontSize}
                    onChange={(e) =>
                      updateSettings({ editorFontSize: Number(e.target.value) })
                    }
                    className="w-full accent-primary-900 dark:accent-primary-400"
                    aria-label={`Editor font size: ${settings.editorFontSize} pixels`}
                    aria-valuemin={12}
                    aria-valuemax={20}
                    aria-valuenow={settings.editorFontSize}
                  />
                  <span className="w-12 text-right text-sm tabular-nums text-primary-700">
                    {settings.editorFontSize}px
                  </span>
                </div>
              </SettingsRow>
              <SettingsRow
                label="Word wrap"
                description="Wrap long lines in the editor by default."
              >
                <Switch
                  checked={settings.editorWordWrap}
                  onCheckedChange={(checked) =>
                    updateSettings({ editorWordWrap: checked })
                  }
                  aria-label="Word wrap"
                />
              </SettingsRow>
              <SettingsRow
                label="Minimap"
                description="Show minimap preview in Monaco editor."
              >
                <Switch
                  checked={settings.editorMinimap}
                  onCheckedChange={(checked) =>
                    updateSettings({ editorMinimap: checked })
                  }
                  aria-label="Show minimap"
                />
              </SettingsRow>
            </SettingsSection>
          )}

          {/* ── Notifications ───────────────────────────────────── */}
          {activeSection === ('language' as SettingsSectionId) && (
            <SettingsSection
              title={tr('settings:language', { defaultValue: 'Language' })}
              description={tr('settings:languageDescription', {
                defaultValue: 'Choose the display language for the workspace UI.',
              })}
              icon={Settings02Icon}
            >
              <SettingsRow
                label={tr('settings:interfaceLanguage', {
                  defaultValue: 'Interface Language',
                })}
                description={tr('settings:languageHint', {
                  defaultValue:
                    "Translates navigation, labels, and buttons. Content from the agent remains in the agent's language.",
                })}
              >
                <select
                  value={getLocale()}
                  onChange={(e) => {
                    setLocale(e.target.value as LocaleId)
                  }}
                  className="h-9 w-full rounded-lg border border-primary-200 dark:border-gray-600 bg-primary-50 dark:bg-gray-800 px-3 text-sm text-primary-900 dark:text-gray-100 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 md:max-w-xs"
                >
                  {(Object.entries(LOCALE_LABELS) as Array<[LocaleId, string]>).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </SettingsRow>
            </SettingsSection>
          )}

          {activeSection === 'notifications' && (
            <>
              <SettingsSection
                title={tr('settings:notificationsSectionTitle', {
                  defaultValue: 'Notifications',
                })}
                description={tr('settings:notificationsSectionDesc', {
                  defaultValue: 'Control alert delivery and usage warning threshold.',
                })}
                icon={Notification03Icon}
              >
                <SettingsRow
                  label={tr('settings:enableAlertsLabel', { defaultValue: 'Enable alerts' })}
                  description={tr('settings:enableAlertsDesc', {
                    defaultValue: 'Show usage and system alert notifications.',
                  })}
                >
                  <Switch
                    checked={settings.notificationsEnabled}
                    onCheckedChange={(checked) =>
                      updateSettings({ notificationsEnabled: checked })
                    }
                    aria-label={tr('settings:enableAlertsLabel', {
                      defaultValue: 'Enable alerts',
                    })}
                  />
                </SettingsRow>
                <SettingsRow
                  label={tr('settings:usageThresholdLabel', { defaultValue: 'Usage threshold' })}
                  description={tr('settings:usageThresholdDesc', {
                    defaultValue: 'Set usage warning trigger between 50% and 100%.',
                  })}
                >
                  <div className="flex w-full items-center gap-2 md:max-w-xs">
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={settings.usageThreshold}
                      onChange={(e) =>
                        updateSettings({
                          usageThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full accent-primary-900 dark:accent-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!settings.notificationsEnabled}
                      aria-label={`${tr('settings:usageThresholdLabel', { defaultValue: 'Usage threshold' })}: ${settings.usageThreshold}%`}
                      aria-valuemin={50}
                      aria-valuemax={100}
                      aria-valuenow={settings.usageThreshold}
                    />
                    <span className="w-12 text-right text-sm tabular-nums text-primary-700">
                      {settings.usageThreshold}%
                    </span>
                  </div>
                </SettingsRow>
              </SettingsSection>

              <SettingsSection
                title={tr('settings:smartSuggestionsSectionTitle', {
                  defaultValue: 'Smart Suggestions',
                })}
                description={tr('settings:smartSuggestionsSectionDesc', {
                  defaultValue:
                    'Get proactive model suggestions to optimize cost and quality.',
                })}
                icon={Settings02Icon}
              >
                <SettingsRow
                  label={tr('settings:enableSmartSuggestionsLabel', {
                    defaultValue: 'Enable smart suggestions',
                  })}
                  description={tr('settings:enableSmartSuggestionsDesc', {
                    defaultValue:
                      'Suggest cheaper models for simple tasks or better models for complex work.',
                  })}
                >
                  <Switch
                    checked={settings.smartSuggestionsEnabled}
                    onCheckedChange={(checked) =>
                      updateSettings({ smartSuggestionsEnabled: checked })
                    }
                    aria-label={tr('settings:enableSmartSuggestionsLabel', {
                      defaultValue: 'Enable smart suggestions',
                    })}
                  />
                </SettingsRow>
                <SettingsRow
                  label={tr('settings:preferredBudgetModelLabel', {
                    defaultValue: 'Preferred budget model',
                  })}
                  description={tr('settings:preferredBudgetModelDesc', {
                    defaultValue:
                      'Default model for cheaper suggestions (leave empty for auto-detect).',
                  })}
                >
                  <select
                    value={settings.preferredBudgetModel}
                    onChange={(e) =>
                      updateSettings({ preferredBudgetModel: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border border-primary-200 dark:border-gray-600 bg-primary-50 dark:bg-gray-800 px-3 text-sm text-primary-900 dark:text-gray-100 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-500 md:max-w-xs"
                    aria-label={tr('settings:preferredBudgetModelLabel', {
                      defaultValue: 'Preferred budget model',
                    })}
                  >
                    <option value="">
                      {tr('settings:autoDetectOption', { defaultValue: 'Auto-detect' })}
                    </option>
                    {modelsError && (
                      <option disabled>
                        {tr('settings:modelsLoadFailedOption', {
                          defaultValue: 'Failed to load models',
                        })}
                      </option>
                    )}
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </SettingsRow>
                <SettingsRow
                  label={tr('settings:preferredPremiumModelLabel', {
                    defaultValue: 'Preferred premium model',
                  })}
                  description={tr('settings:preferredPremiumModelDesc', {
                    defaultValue:
                      'Default model for upgrade suggestions (leave empty for auto-detect).',
                  })}
                >
                  <select
                    value={settings.preferredPremiumModel}
                    onChange={(e) =>
                      updateSettings({ preferredPremiumModel: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border border-primary-200 dark:border-gray-600 bg-primary-50 dark:bg-gray-800 px-3 text-sm text-primary-900 dark:text-gray-100 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-500 md:max-w-xs"
                    aria-label={tr('settings:preferredPremiumModelLabel', {
                      defaultValue: 'Preferred premium model',
                    })}
                  >
                    <option value="">
                      {tr('settings:autoDetectOption', { defaultValue: 'Auto-detect' })}
                    </option>
                    {modelsError && (
                      <option disabled>
                        {tr('settings:modelsLoadFailedOption', {
                          defaultValue: 'Failed to load models',
                        })}
                      </option>
                    )}
                    {availableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </SettingsRow>
                <SettingsRow
                  label={tr('settings:onlySuggestCheaperLabel', {
                    defaultValue: 'Only suggest cheaper models',
                  })}
                  description={tr('settings:onlySuggestCheaperDesc', {
                    defaultValue:
                      'Never suggest upgrades, only suggest cheaper alternatives.',
                  })}
                >
                  <Switch
                    checked={settings.onlySuggestCheaper}
                    onCheckedChange={(checked) =>
                      updateSettings({ onlySuggestCheaper: checked })
                    }
                    aria-label={tr('settings:onlySuggestCheaperLabel', {
                      defaultValue: 'Only suggest cheaper models',
                    })}
                  />
                </SettingsRow>
              </SettingsSection>
            </>
          )}

          <footer className="mt-auto pt-4">
            <div className="flex items-center gap-2 rounded-2xl border border-primary-200 bg-primary-50/70 p-3 text-sm text-primary-600 backdrop-blur-sm">
              <HugeiconsIcon
                icon={Settings02Icon}
                size={20}
                strokeWidth={1.5}
              />
              <span className="text-pretty">
                {tr('settings:localStorageAutosave', {
                  defaultValue: 'Changes are saved automatically to local storage.',
                })}
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

// ── Profile Section ─────────────────────────────────────────────────────

const PROFILE_IMAGE_MAX_DIMENSION = 128
const PROFILE_IMAGE_MAX_FILE_SIZE = 10 * 1024 * 1024

function _ProfileSection() {
  const { settings: chatSettings, updateSettings: updateChatSettings } =
    useChatSettingsStore()
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileProcessing, setProfileProcessing] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)
  const displayName = getChatProfileDisplayName(chatSettings.displayName)

  function handleNameChange(value: string) {
    if (value.length > 50) {
      setNameError('Display name too long (max 50 characters)')
      return
    }
    setNameError(null)
    updateChatSettings({ displayName: value })
  }

  async function handleAvatarUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setProfileError('Unsupported file type.')
      return
    }
    if (file.size > PROFILE_IMAGE_MAX_FILE_SIZE) {
      setProfileError('Image too large (max 10MB).')
      return
    }
    setProfileError(null)
    setProfileProcessing(true)
    try {
      const url = URL.createObjectURL(file)
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image()
        i.onload = () => resolve(i)
        i.onerror = () => reject(new Error('Failed to load image'))
        i.src = url
      })
      const max = PROFILE_IMAGE_MAX_DIMENSION
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      updateChatSettings({ avatarDataUrl: canvas.toDataURL(outputType, 0.82) })
    } catch {
      setProfileError('Failed to process image.')
    } finally {
      setProfileProcessing(false)
    }
  }

  return (
    <SettingsSection
      title="Profile"
      description="Your display name and avatar for chat."
      icon={UserIcon}
    >
      <div className="flex items-center gap-4">
        <UserAvatar
          size={56}
          src={chatSettings.avatarDataUrl}
          alt={displayName}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-primary-900">{displayName}</p>
          <p className="text-xs text-primary-500">
            Shown in the sidebar and chat messages.
          </p>
        </div>
      </div>
      <SettingsRow label="Display name" description="Leave blank for default.">
        <div className="w-full md:max-w-xs">
          <Input
            value={chatSettings.displayName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="User"
            className="h-9 w-full"
            maxLength={50}
            aria-label="Display name"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'profile-name-error' : undefined}
          />
          {nameError && (
            <p
              id="profile-name-error"
              className="mt-1 text-xs text-red-600"
              role="alert"
            >
              {nameError}
            </p>
          )}
        </div>
      </SettingsRow>
      <SettingsRow
        label="Profile picture"
        description="Resized to 128×128, stored locally."
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={profileProcessing}
                aria-label="Upload profile picture"
                className="block w-full cursor-pointer text-xs text-primary-700 dark:text-gray-300 md:max-w-xs file:mr-2 file:cursor-pointer file:rounded-md file:border file:border-primary-200 dark:file:border-gray-600 file:bg-primary-100 dark:file:bg-gray-700 file:px-2.5 file:py-1.5 file:text-xs file:font-medium file:text-primary-900 dark:file:text-gray-100 file:transition-colors hover:file:bg-primary-200 dark:hover:file:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateChatSettings({ avatarDataUrl: null })}
              disabled={!chatSettings.avatarDataUrl || profileProcessing}
            >
              Remove
            </Button>
          </div>
          {profileError && (
            <p className="text-xs text-red-600" role="alert">
              {profileError}
            </p>
          )}
        </div>
      </SettingsRow>
    </SettingsSection>
  )
}

// ── Chat Display Section ────────────────────────────────────────────────

function ChatDisplaySection() {
  const { t } = useTranslation('settings')
  const { settings: chatSettings, updateSettings: updateChatSettings } =
    useChatSettingsStore()

  return (
    <>
      <SettingsSection
        title={t('chatDisplaySectionTitle', { defaultValue: 'Chat Display' })}
        description={t('chatDisplaySectionDesc', {
          defaultValue: "Control what's visible in chat messages.",
        })}
        icon={MessageMultiple01Icon}
      >
        <SettingsRow
          label={t('chatShowToolMessagesLabel', { defaultValue: 'Show tool messages' })}
          description={t('chatShowToolMessagesDesc', {
            defaultValue: 'Display tool call details when the agent uses tools.',
          })}
        >
          <Switch
            checked={chatSettings.showToolMessages}
            onCheckedChange={(checked) =>
              updateChatSettings({ showToolMessages: checked })
            }
            aria-label={t('chatShowToolMessagesLabel', { defaultValue: 'Show tool messages' })}
          />
        </SettingsRow>
        <SettingsRow
          label={t('chatShowReasoningLabel', { defaultValue: 'Show reasoning blocks' })}
          description={t('chatShowReasoningDesc', {
            defaultValue: 'Display model thinking and reasoning process.',
          })}
        >
          <Switch
            checked={chatSettings.showReasoningBlocks}
            onCheckedChange={(checked) =>
              updateChatSettings({ showReasoningBlocks: checked })
            }
            aria-label={t('chatShowReasoningLabel', { defaultValue: 'Show reasoning blocks' })}
          />
        </SettingsRow>
        <SettingsRow
          label={t('chatSoundCompleteLabel', {
            defaultValue: 'Sound on response complete',
          })}
          description={t('chatSoundCompleteDesc', {
            defaultValue:
              'Play a short sound in the browser when the agent finishes replying.',
          })}
        >
          <Switch
            checked={chatSettings.soundOnChatComplete}
            onCheckedChange={(checked) =>
              updateChatSettings({ soundOnChatComplete: checked })
            }
            aria-label={t('chatSoundCompleteLabel', {
              defaultValue: 'Sound on response complete',
            })}
          />
        </SettingsRow>
        <SettingsRow
          label={t('chatEnterBehaviorLabel', { defaultValue: 'Enter key behavior' })}
          description={
            chatSettings.enterBehavior === 'newline'
              ? t('chatEnterNewlineHint', {
                  defaultValue: 'Enter inserts a newline. Use ⌘/Ctrl+Enter to send.',
                })
              : t('chatEnterSendHint', {
                  defaultValue: 'Enter sends the message. Use Shift+Enter for a newline.',
                })
          }
        >
          <Switch
            checked={chatSettings.enterBehavior === 'newline'}
            onCheckedChange={(checked) =>
              updateChatSettings({
                enterBehavior: checked ? 'newline' : 'send',
              })
            }
            aria-label={t('chatEnterBehaviorLabel', { defaultValue: 'Enter key behavior' })}
          />
        </SettingsRow>
        <SettingsRow
          label={t('chatWidthLabel', { defaultValue: 'Chat content width' })}
          description={t('chatWidthDesc', {
            defaultValue: 'Controls the max-width of the message column on wide screens.',
          })}
        >
          <select
            value={chatSettings.chatWidth}
            onChange={(e) =>
              updateChatSettings({
                chatWidth: e.target.value as
                  | 'comfortable'
                  | 'wide'
                  | 'full',
              })
            }
            className="h-8 rounded-md border border-primary-200 bg-primary-50 px-2 text-sm text-primary-900 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label={t('chatWidthLabel', { defaultValue: 'Chat content width' })}
          >
            <option value="comfortable">
              {t('chatWidthComfortable', { defaultValue: 'Comfortable (900px)' })}
            </option>
            <option value="wide">{t('chatWidthWide', { defaultValue: 'Wide (1200px)' })}</option>
            <option value="full">{t('chatWidthFull', { defaultValue: 'Full width' })}</option>
          </select>
        </SettingsRow>
        <SettingsRow
          label={t('chatSidebarHoverLabel', { defaultValue: 'Expand sidebar on hover' })}
          description={
            chatSettings.sidebarHoverExpand
              ? t('chatSidebarHoverOnHint', {
                  defaultValue:
                    'Collapsed sidebar expands temporarily when you hover over it.',
                })
              : t('chatSidebarHoverOffHint', {
                  defaultValue:
                    'Collapsed sidebar stays at 48px. Click the toggle to open (default).',
                })
          }
        >
          <Switch
            checked={chatSettings.sidebarHoverExpand}
            onCheckedChange={(checked) =>
              updateChatSettings({ sidebarHoverExpand: checked })
            }
            aria-label={t('chatSidebarHoverLabel', {
              defaultValue: 'Expand sidebar on hover',
            })}
          />
        </SettingsRow>
      </SettingsSection>
      {/* Mobile Navigation removed — not relevant for Hermes Workspace */}
    </>
  )
}

// ── Loader Style Section ────────────────────────────────────────────────

type LoaderStyleOption = { value: LoaderStyle; label: string }

const LOADER_STYLES: Array<LoaderStyleOption> = [
  { value: 'dots', label: 'Dots' },
  { value: 'braille-hermes', label: 'Hermes' },
  { value: 'braille-orbit', label: 'Orbit' },
  { value: 'braille-breathe', label: 'Breathe' },
  { value: 'braille-pulse', label: 'Pulse' },
  { value: 'braille-wave', label: 'Wave' },
  { value: 'lobster', label: 'Lobster' },
  { value: 'logo', label: 'Logo' },
]

function getPreset(style: LoaderStyle): BrailleSpinnerPreset | null {
  const map: Record<string, BrailleSpinnerPreset> = {
    'braille-hermes': 'hermes',
    'braille-orbit': 'orbit',
    'braille-breathe': 'breathe',
    'braille-pulse': 'pulse',
    'braille-wave': 'wave',
  }
  return map[style] ?? null
}

function LoaderPreview({ style }: { style: LoaderStyle }) {
  if (style === 'dots') return <ThreeDotsSpinner />
  if (style === 'lobster')
    return <span className="inline-block text-sm animate-pulse">🦞</span>
  if (style === 'logo') return <LogoLoader />
  const preset = getPreset(style)
  return preset ? (
    <BrailleSpinner
      preset={preset}
      size={16}
      speed={120}
      className="text-primary-500"
    />
  ) : (
    <ThreeDotsSpinner />
  )
}

function _LoaderStyleSection() {
  const { settings: chatSettings, updateSettings: updateChatSettings } =
    useChatSettingsStore()

  return (
    <SettingsSection
      title="Loading Animation"
      description="Choose the animation while the assistant is streaming."
      icon={Settings02Icon}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {LOADER_STYLES.map((option) => {
          const active = chatSettings.loaderStyle === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => updateChatSettings({ loaderStyle: option.value })}
              className={cn(
                'flex min-h-16 flex-col items-center justify-center gap-2 rounded-xl border px-2 py-2 transition-colors',
                active
                  ? 'border-primary-500 bg-primary-200/60 text-primary-900'
                  : 'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100',
              )}
              aria-pressed={active}
            >
              <span className="flex h-5 items-center justify-center">
                <LoaderPreview style={option.value} />
              </span>
              <span className="text-[11px] font-medium text-center leading-4">
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </SettingsSection>
  )
}

// ── Hermes Agent Configuration ──────────────────────────────────────

type HermesProvider = {
  id: string
  name: string
  authType: string
  envKeys: Array<string>
  configured: boolean
  maskedKeys: Record<string, string>
}

type HermesConfigData = {
  config: Record<string, unknown>
  providers: Array<HermesProvider>
  activeProvider: string
  activeModel: string
  hermesHome: string
}

const HERMES_API = process.env.HERMES_API_URL || 'http://127.0.0.1:8642'

type AvailableModelsResponse = {
  provider: string
  models: Array<{ id: string; description: string }>
  providers: Array<{ id: string; label: string; authenticated: boolean }>
}

function HermesConfigSection({
  activeView = 'hermes',
}: {
  activeView?: 'hermes' | 'agent' | 'routing' | 'voice' | 'display'
}) {
  const { t } = useTranslation('settings')
  const [data, setData] = useState<HermesConfigData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveBanner, setSaveBanner] = useState<'success' | 'error' | null>(null)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [keyInput, setKeyInput] = useState('')
  const [modelInput, setModelInput] = useState('')
  const [providerInput, setProviderInput] = useState('')
  const [baseUrlInput, setBaseUrlInput] = useState('')

  const [availableProviders, setAvailableProviders] = useState<
    Array<{ id: string; label: string; authenticated: boolean }>
  >([])
  const [availableModels, setAvailableModels] = useState<
    Array<{ id: string; description: string }>
  >([])
  const [loadingModels, setLoadingModels] = useState(false)

  const syncInputsFromData = useCallback((configData: HermesConfigData) => {
    setModelInput(configData.activeModel || '')
    setProviderInput(configData.activeProvider || '')
    setBaseUrlInput((configData.config?.base_url as string) || '')
  }, [])

  const fetchConfig = useCallback(async () => {
    const res = await fetch('/api/hermes-config')
    const configData = (await res.json()) as HermesConfigData
    setData(configData)
    syncInputsFromData(configData)
    return configData
  }, [syncInputsFromData])

  const fetchModelsForProvider = useCallback(async (provider: string) => {
    if (!provider) {
      setAvailableModels([])
      return
    }
    setLoadingModels(true)
    try {
      const res = await fetch(
        `/api/hermes-proxy/api/available-models?provider=${encodeURIComponent(provider)}`,
      )
      if (res.ok) {
        const result = (await res.json()) as AvailableModelsResponse
        setAvailableModels(result.models || [])
        if (result.providers?.length) setAvailableProviders(result.providers)
      }
    } catch {
      // ignore
    }
    setLoadingModels(false)
  }, [])

  useEffect(() => {
    fetchConfig()
      .then((configData) => {
        setLoading(false)
        if (configData.activeProvider) {
          void fetchModelsForProvider(configData.activeProvider)
        }
      })
      .catch(() => setLoading(false))
  }, [fetchConfig, fetchModelsForProvider])

  const saveConfig = async (updates: {
    config?: Record<string, unknown>
    env?: Record<string, string>
  }) => {
    setSaving(true)
    setSaveBanner(null)
    try {
      const res = await fetch('/api/hermes-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      await res.json() as { message?: string }
      setSaveBanner(res.ok ? 'success' : 'error')
      const refreshData = await fetchConfig()
      if (refreshData.activeProvider) {
        void fetchModelsForProvider(refreshData.activeProvider)
      }
      setTimeout(() => setSaveBanner(null), 3000)
    } catch {
      setSaveBanner('error')
    }
    setSaving(false)
  }

  const selectClassName =
    'h-9 w-full rounded-lg border border-primary-200 bg-primary-50 px-3 text-sm text-primary-900 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400 md:max-w-sm'

  const readNumber = (value: unknown, fallback: number) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }

  const readBoolean = (value: unknown, fallback: boolean) => {
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') return value === 'true'
    return fallback
  }

  const saveNumberField = (
    section: string,
    field: string,
    rawValue: string,
    fallback: number,
  ) => {
    const value = rawValue === '' ? fallback : Number(rawValue)
    if (!Number.isFinite(value)) return
    void saveConfig({ config: { [section]: { [field]: value } } })
  }

  if (loading) {
    return (
      <SettingsSection
        title={t('hermesSectionLoadingTitle', { defaultValue: 'Hermes Agent' })}
        description={t('hermesSectionLoadingDesc', {
          defaultValue: 'Loading configuration...',
        })}
        icon={Settings02Icon}
      >
        <div
          className="h-20 animate-pulse rounded-lg"
          style={{ backgroundColor: 'var(--theme-panel)' }}
        />
      </SettingsSection>
    )
  }

  if (!data) {
    return (
      <SettingsSection
        title={t('hermesSectionErrorTitle', { defaultValue: 'Hermes Agent' })}
        description={t('hermesSectionErrorDesc', {
          defaultValue: 'Could not load Hermes configuration.',
        })}
        icon={Settings02Icon}
      >
        <p className="text-sm" style={{ color: 'var(--theme-muted)' }}>
          {t('hermesSectionErrorHint', {
            defaultValue: 'Make sure Hermes Agent is running on localhost:8642',
          })}
        </p>
      </SettingsSection>
    )
  }

  const memoryConfig = (data.config.memory as Record<string, unknown>) || {}
  const terminalConfig = (data.config.terminal as Record<string, unknown>) || {}
  const displayConfig = (data.config.display as Record<string, unknown>) || {}
  const agentConfig = (data.config.agent as Record<string, unknown>) || {}
  const smartRouting =
    (data.config.smart_model_routing as Record<string, unknown>) || {}
  const ttsConfig = (data.config.tts as Record<string, unknown>) || {}
  const sttConfig = (data.config.stt as Record<string, unknown>) || {}
  const customProviders = Array.isArray(data.config.custom_providers)
    ? (data.config.custom_providers as Array<Record<string, unknown>>)
    : []

  const ttsProvider = (ttsConfig.provider as string) || 'edge'
  const ttsEdge = (ttsConfig.edge as Record<string, unknown>) || {}
  const ttsElevenLabs = (ttsConfig.elevenlabs as Record<string, unknown>) || {}
  const ttsOpenAi = (ttsConfig.openai as Record<string, unknown>) || {}
  const sttProvider = (sttConfig.provider as string) || 'local'
  const sttLocal = (sttConfig.local as Record<string, unknown>) || {}

  const renderHermesOverview = () => (
    <>
      <SettingsSection
        title={t('modelProviderSectionTitle', { defaultValue: 'Model & Provider' })}
        description={t('modelProviderSectionDesc', {
          defaultValue: 'Configure the default AI model for Hermes Agent.',
        })}
        icon={SourceCodeSquareIcon}
      >
        <SettingsRow
          label={t('rowProvider', { defaultValue: 'Provider' })}
          description={t('rowProviderDesc', {
            defaultValue: 'Select the inference provider.',
          })}
        >
          <div className="flex w-full max-w-sm gap-2">
            {availableProviders.length > 0 ? (
              <select
                value={providerInput}
                onChange={(e) => {
                  const newProvider = e.target.value
                  setProviderInput(newProvider)
                  setModelInput('')
                  void fetchModelsForProvider(newProvider)
                }}
                className={selectClassName}
              >
                {availableProviders.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                    {p.authenticated ? ' ✓' : ''}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                value={providerInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProviderInput(e.target.value)
                }
                placeholder={t('placeholderProviderFreeform', {
                  defaultValue: 'e.g. ollama, anthropic, openai-codex',
                })}
                className="flex-1"
              />
            )}
          </div>
        </SettingsRow>
        <SettingsRow
          label={t('rowModel', { defaultValue: 'Model' })}
          description={t('rowModelDesc', {
            defaultValue: 'The model Hermes uses for conversations.',
          })}
        >
          <div className="flex w-full max-w-sm gap-2">
            {availableModels.length > 0 ? (
              <select
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                className={`${selectClassName} font-mono`}
              >
                {!availableModels.some((m) => m.id === modelInput) &&
                  modelInput && (
                    <option value={modelInput}>
                      {t('modelCurrentOption', {
                        id: modelInput,
                        defaultValue: `${modelInput} (current)`,
                      })}
                    </option>
                  )}
                {availableModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.id}
                    {m.description ? ` — ${m.description}` : ''}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                value={modelInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setModelInput(e.target.value)
                }
                placeholder={
                  loadingModels
                    ? t('placeholderModelLoading', { defaultValue: 'Loading models...' })
                    : t('placeholderModelFreeform', { defaultValue: 'e.g. qwen3.5:35b' })
                }
                className="flex-1 font-mono"
              />
            )}
          </div>
        </SettingsRow>
        <SettingsRow
          label={t('rowBaseUrl', { defaultValue: 'Base URL' })}
          description={t('rowBaseUrlDesc', {
            defaultValue: 'For local providers (Ollama, LM Studio, MLX). Leave blank for cloud.',
          })}
        >
          <div className="flex w-full max-w-sm gap-2">
            <Input
              value={baseUrlInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBaseUrlInput(e.target.value)
              }
              placeholder={t('placeholderBaseUrl', {
                defaultValue: 'e.g. http://localhost:11434/v1',
              })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </SettingsRow>
        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            disabled={saving}
            onClick={() => {
              const configUpdate: Record<string, unknown> = {
                model: modelInput.trim(),
                provider: providerInput.trim(),
                base_url: baseUrlInput.trim() || null,
              }
              void saveConfig({ config: configUpdate })
            }}
          >
            {saving
              ? t('saveSaving', { defaultValue: 'Saving...' })
              : t('saveModelBtn', { defaultValue: 'Save Model' })}
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection
        title={t('apiKeysSectionTitle', { defaultValue: 'API Keys' })}
        description={t('apiKeysSectionDesc', {
          defaultValue: 'Manage provider API keys stored in ~/.hermes/.env',
        })}
        icon={CloudIcon}
      >
        {data.providers
          .filter((p) => p.envKeys.length > 0)
          .map((provider) => (
            <SettingsRow
              key={provider.id}
              label={provider.name}
              description={
                provider.configured
                  ? t('keyStatusConfigured', { defaultValue: '✅ Configured' })
                  : t('keyStatusNotConfigured', { defaultValue: '❌ Not configured' })
              }
            >
              <div className="flex w-full max-w-sm items-center gap-2">
                {provider.envKeys.map((envKey) => (
                  <div key={envKey} className="flex-1">
                    {editingKey === envKey ? (
                      <div className="flex gap-2">
                        <Input
                          type="password"
                          value={keyInput}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setKeyInput(e.target.value)
                          }
                          placeholder={t('enterKeyPlaceholder', {
                            key: envKey,
                            defaultValue: `Enter ${envKey}`,
                          })}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            void saveConfig({ env: { [envKey]: keyInput } })
                            setEditingKey(null)
                            setKeyInput('')
                          }}
                        >
                          {t('btnSave', { defaultValue: 'Save' })}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingKey(null)
                            setKeyInput('')
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-mono"
                          style={{ color: 'var(--theme-muted)' }}
                        >
                          {provider.maskedKeys[envKey] ||
                            t('keyValueNotSet', { defaultValue: 'Not set' })}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingKey(envKey)
                            setKeyInput('')
                          }}
                        >
                          {provider.configured
                            ? t('btnChange', { defaultValue: 'Change' })
                            : t('btnAdd', { defaultValue: 'Add' })}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SettingsRow>
          ))}
      </SettingsSection>

      <SettingsSection
        title={t('memorySectionTitle', { defaultValue: 'Memory' })}
        description={t('memorySectionDesc', {
          defaultValue: 'Configure Hermes Agent memory and user profiles.',
        })}
        icon={UserIcon}
      >
        <SettingsRow
          label={t('memoryEnabledLabel', { defaultValue: 'Memory enabled' })}
          description={t('memoryEnabledDesc', {
            defaultValue: 'Store and recall memories across sessions.',
          })}
        >
          <Switch
            checked={memoryConfig.memory_enabled !== false}
            onCheckedChange={(checked: boolean) =>
              void saveConfig({
                config: { memory: { memory_enabled: checked } },
              })
            }
          />
        </SettingsRow>
        <SettingsRow
          label={t('userProfileLabel', { defaultValue: 'User profile' })}
          description={t('userProfileDesc', {
            defaultValue: 'Remember user preferences and context.',
          })}
        >
          <Switch
            checked={memoryConfig.user_profile_enabled !== false}
            onCheckedChange={(checked: boolean) =>
              void saveConfig({
                config: { memory: { user_profile_enabled: checked } },
              })
            }
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title={t('terminalSectionTitle', { defaultValue: 'Terminal' })}
        description={t('terminalSectionDesc', {
          defaultValue: 'Shell execution settings.',
        })}
        icon={SourceCodeSquareIcon}
      >
        <SettingsRow
          label={t('terminalBackendLabel', { defaultValue: 'Backend' })}
          description={t('terminalBackendDesc', {
            defaultValue: 'Terminal execution backend.',
          })}
        >
          <span
            className="text-sm font-mono"
            style={{ color: 'var(--theme-muted)' }}
          >
            {(terminalConfig.backend as string) || 'local'}
          </span>
        </SettingsRow>
        <SettingsRow
          label={t('terminalTimeoutLabel', { defaultValue: 'Timeout' })}
          description={t('terminalTimeoutDesc', {
            defaultValue: 'Max seconds for terminal commands.',
          })}
        >
          <Input
            type="number"
            min={10}
            value={readNumber(terminalConfig.timeout, 180)}
            onChange={(e) =>
              saveNumberField('terminal', 'timeout', e.target.value, 180)
            }
            className="md:w-28"
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title={t('customProvidersTitle', { defaultValue: 'Custom Providers' })}
        description={t('customProvidersDesc', {
          defaultValue: 'Read-only provider details loaded from config.yaml.',
        })}
        icon={CloudIcon}
      >
        <div className="space-y-3">
          {customProviders.length === 0 ? (
            <div className="rounded-xl border border-primary-200 bg-primary-100/40 p-3 text-sm text-primary-600">
              {t('customProvidersEmpty', {
                defaultValue: 'No custom providers configured.',
              })}
            </div>
          ) : (
            customProviders.map((provider, index) => (
              <div
                key={`${String(provider.name || provider.base_url || index)}`}
                className="rounded-xl border border-primary-200 bg-primary-100/40 p-3"
              >
                <div className="grid gap-2 text-sm md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary-500">
                      {t('fieldName', { defaultValue: 'Name' })}
                    </p>
                    <p className="font-medium text-primary-900">
                      {String(
                        provider.name || t('customProvidersUnnamed', { defaultValue: 'Unnamed' }),
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary-500">
                      {t('fieldBaseUrl', { defaultValue: 'Base URL' })}
                    </p>
                    <p className="font-mono text-xs text-primary-700 break-all">
                      {String(
                        provider.base_url ||
                          t('keyValueNotSet', { defaultValue: 'Not set' }),
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary-500">
                      {t('fieldType', { defaultValue: 'Type' })}
                    </p>
                    <p className="text-primary-700">
                      {String(
                        provider.type ||
                          provider.auth_type ||
                          t('customProvidersUnknown', { defaultValue: 'Unknown' }),
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="flex flex-col gap-3 rounded-xl border border-primary-200 bg-primary-100/40 p-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-primary-600">
              {t('customProvidersEditHint', {
                defaultValue: 'Edit custom providers in config.yaml for security.',
              })}
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                void navigator.clipboard?.writeText(data.hermesHome)
              }
            >
              {t('copyConfigPathBtn', { defaultValue: 'Copy config path' })}
            </Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title={t('aboutSectionTitle', { defaultValue: 'About' })}
        description={t('aboutSectionDesc', {
          defaultValue: 'Hermes Agent runtime information.',
        })}
        icon={Notification03Icon}
      >
        <SettingsRow
          label={t('configLocationLabel', { defaultValue: 'Config location' })}
          description={t('configLocationDesc', {
            defaultValue: 'Where Hermes stores its configuration.',
          })}
        >
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--theme-muted)' }}
          >
            {data.hermesHome}
          </span>
        </SettingsRow>
        <SettingsRow
          label={t('activeProviderLabel', { defaultValue: 'Active provider' })}
          description={t('activeProviderDesc', {
            defaultValue: 'Current inference provider.',
          })}
        >
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--theme-accent)' }}
          >
            {data.providers.find((p) => p.id === data.activeProvider)?.name ||
              data.activeProvider}
          </span>
        </SettingsRow>
      </SettingsSection>
    </>
  )

  const renderAgentBehavior = () => (
    <SettingsSection
      title={t('agentBehaviorTitle', { defaultValue: 'Agent Behavior' })}
      description={t('agentBehaviorDesc', {
        defaultValue: 'Control agent execution limits and tool access.',
      })}
      icon={Settings02Icon}
    >
      <SettingsRow
        label={t('maxTurnsLabel', { defaultValue: 'Max turns' })}
        description={t('maxTurnsDesc', {
          defaultValue: 'Maximum agent turns per request (1-100).',
        })}
      >
        <Input
          type="number"
          min={1}
          max={100}
          value={readNumber(agentConfig.max_turns, 50)}
          onChange={(e) =>
            saveNumberField('agent', 'max_turns', e.target.value, 50)
          }
          className="md:w-28"
        />
      </SettingsRow>
      <SettingsRow
        label={t('gatewayTimeoutLabel', { defaultValue: 'Gateway timeout' })}
        description={t('gatewayTimeoutDesc', {
          defaultValue: 'Seconds before gateway times out a request.',
        })}
      >
        <Input
          type="number"
          min={10}
          max={600}
          value={readNumber(agentConfig.gateway_timeout, 120)}
          onChange={(e) =>
            saveNumberField('agent', 'gateway_timeout', e.target.value, 120)
          }
          className="md:w-28"
        />
      </SettingsRow>
      <SettingsRow
        label={t('toolUseEnforcementLabel', { defaultValue: 'Tool use enforcement' })}
        description={t('toolUseEnforcementDesc', {
          defaultValue: 'Whether the agent must use tools when available.',
        })}
      >
        <select
          value={(agentConfig.tool_use_enforcement as string) || 'auto'}
          onChange={(e) =>
            void saveConfig({
              config: { agent: { tool_use_enforcement: e.target.value } },
            })
          }
          className={selectClassName}
        >
          <option value="auto">{t('toolUseAuto', { defaultValue: 'auto' })}</option>
          <option value="required">
            {t('toolUseRequired', { defaultValue: 'required' })}
          </option>
          <option value="none">{t('toolUseNone', { defaultValue: 'none' })}</option>
        </select>
      </SettingsRow>
    </SettingsSection>
  )

  const renderSmartRouting = () => (
    <SettingsSection
      title={t('smartRoutingTitle', { defaultValue: 'Smart Model Routing' })}
      description={t('smartRoutingDesc', {
        defaultValue: 'Automatically route simple queries to cheaper models.',
      })}
      icon={SparklesIcon}
    >
      <SettingsRow
        label={t('enableSmartRoutingLabel', { defaultValue: 'Enable smart routing' })}
        description={t('enableSmartRoutingDesc', {
          defaultValue: 'Route simple queries to a cheaper model automatically.',
        })}
      >
        <Switch
          checked={readBoolean(smartRouting.enabled, false)}
          onCheckedChange={(checked) =>
            void saveConfig({
              config: { smart_model_routing: { enabled: checked } },
            })
          }
        />
      </SettingsRow>
      <SettingsRow
        label={t('cheapModelLabel', { defaultValue: 'Cheap model' })}
        description={t('cheapModelDesc', {
          defaultValue: 'Model to use for simple queries.',
        })}
      >
        <select
          value={(smartRouting.cheap_model as string) || ''}
          onChange={(e) =>
            void saveConfig({
              config: { smart_model_routing: { cheap_model: e.target.value } },
            })
          }
          className={selectClassName}
        >
          <option value="">
            {t('selectModelPlaceholder', { defaultValue: 'Select model' })}
          </option>
          {availableModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.id}
            </option>
          ))}
        </select>
      </SettingsRow>
      <SettingsRow
        label={t('maxSimpleCharsLabel', { defaultValue: 'Max simple chars' })}
        description={t('maxSimpleCharsDesc', {
          defaultValue: 'Messages shorter than this use the cheap model.',
        })}
      >
        <Input
          type="number"
          min={1}
          value={readNumber(smartRouting.max_simple_chars, 500)}
          onChange={(e) =>
            saveNumberField(
              'smart_model_routing',
              'max_simple_chars',
              e.target.value,
              500,
            )
          }
          className="md:w-32"
        />
      </SettingsRow>
      <SettingsRow
        label={t('maxSimpleWordsLabel', { defaultValue: 'Max simple words' })}
        description={t('maxSimpleWordsDesc', {
          defaultValue: 'Messages with fewer words use the cheap model.',
        })}
      >
        <Input
          type="number"
          min={1}
          value={readNumber(smartRouting.max_simple_words, 80)}
          onChange={(e) =>
            saveNumberField(
              'smart_model_routing',
              'max_simple_words',
              e.target.value,
              80,
            )
          }
          className="md:w-32"
        />
      </SettingsRow>
    </SettingsSection>
  )

  const renderVoice = () => (
    <div className="space-y-4">
      <SettingsSection
        title={t('ttsSectionTitle', { defaultValue: 'Text-to-Speech' })}
        description={t('ttsSectionDesc', {
          defaultValue: 'Configure voice output for agent responses.',
        })}
        icon={VolumeHighIcon}
      >
        <SettingsRow
          label={t('ttsProviderLabel', { defaultValue: 'TTS provider' })}
          description={t('ttsProviderDesc', { defaultValue: 'Which TTS engine to use.' })}
        >
          <select
            value={ttsProvider}
            onChange={(e) =>
              void saveConfig({ config: { tts: { provider: e.target.value } } })
            }
            className={selectClassName}
          >
            <option value="edge">{t('ttsOptionEdge', { defaultValue: 'Edge TTS (free)' })}</option>
            <option value="elevenlabs">
              {t('ttsOptionElevenlabs', { defaultValue: 'ElevenLabs' })}
            </option>
            <option value="openai">{t('ttsOptionOpenai', { defaultValue: 'OpenAI TTS' })}</option>
            <option value="neutts">{t('ttsOptionNeutts', { defaultValue: 'NeuTTS' })}</option>
          </select>
        </SettingsRow>

        {ttsProvider === 'edge' && (
          <SettingsRow
            label={t('ttsVoiceLabel', { defaultValue: 'Voice' })}
            description={t('ttsVoiceDescEdge', { defaultValue: 'Edge voice name.' })}
          >
            <Input
              value={(ttsEdge.voice as string) || ''}
              onChange={(e) =>
                void saveConfig({
                  config: { tts: { edge: { voice: e.target.value } } },
                })
              }
              placeholder={t('ttsVoicePlaceholderEdge', {
                defaultValue: 'en-US-AriaNeural',
              })}
              className="md:w-64"
            />
          </SettingsRow>
        )}

        {ttsProvider === 'elevenlabs' && (
          <>
            <SettingsRow
              label={t('ttsVoiceIdLabel', { defaultValue: 'Voice ID' })}
              description={t('ttsVoiceIdDesc', { defaultValue: 'ElevenLabs voice_id.' })}
            >
              <Input
                value={(ttsElevenLabs.voice_id as string) || ''}
                onChange={(e) =>
                  void saveConfig({
                    config: {
                      tts: { elevenlabs: { voice_id: e.target.value } },
                    },
                  })
                }
                className="md:w-64"
              />
            </SettingsRow>
            <SettingsRow
              label={t('ttsModelElevenLabel', { defaultValue: 'Model' })}
              description={t('ttsModelElevenDesc', {
                defaultValue: 'ElevenLabs model name.',
              })}
            >
              <Input
                value={(ttsElevenLabs.model as string) || ''}
                onChange={(e) =>
                  void saveConfig({
                    config: { tts: { elevenlabs: { model: e.target.value } } },
                  })
                }
                className="md:w-64"
              />
            </SettingsRow>
          </>
        )}

        {ttsProvider === 'openai' && (
          <>
            <SettingsRow
              label={t('ttsVoiceLabel', { defaultValue: 'Voice' })}
              description={t('ttsVoiceOpenaiDesc', {
                defaultValue: 'alloy, echo, fable, onyx, nova, shimmer',
              })}
            >
              <select
                value={(ttsOpenAi.voice as string) || 'alloy'}
                onChange={(e) =>
                  void saveConfig({
                    config: { tts: { openai: { voice: e.target.value } } },
                  })
                }
                className={selectClassName}
              >
                {['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'].map(
                  (voice) => (
                    <option key={voice} value={voice}>
                      {voice}
                    </option>
                  ),
                )}
              </select>
            </SettingsRow>
            <SettingsRow
              label={t('ttsModelOpenaiLabel', { defaultValue: 'Model' })}
              description={t('ttsModelOpenaiDesc', { defaultValue: 'OpenAI TTS model.' })}
            >
              <Input
                value={(ttsOpenAi.model as string) || ''}
                onChange={(e) =>
                  void saveConfig({
                    config: { tts: { openai: { model: e.target.value } } },
                  })
                }
                placeholder={t('ttsModelPlaceholderOpenai', { defaultValue: 'tts-1' })}
                className="md:w-64"
              />
            </SettingsRow>
          </>
        )}
      </SettingsSection>

      <SettingsSection
        title={t('sttSectionTitle', { defaultValue: 'Speech-to-Text' })}
        description={t('sttSectionDesc', {
          defaultValue: 'Configure voice input recognition.',
        })}
        icon={Mic01Icon}
      >
        <SettingsRow
          label={t('sttEnableLabel', { defaultValue: 'Enable STT' })}
          description={t('sttEnableDesc', { defaultValue: 'Turn on voice input.' })}
        >
          <Switch
            checked={readBoolean(sttConfig.enabled, false)}
            onCheckedChange={(checked) =>
              void saveConfig({ config: { stt: { enabled: checked } } })
            }
          />
        </SettingsRow>
        <SettingsRow
          label={t('sttProviderLabel', { defaultValue: 'STT provider' })}
          description={t('sttProviderDesc', {
            defaultValue: 'Which speech engine to use.',
          })}
        >
          <select
            value={sttProvider}
            onChange={(e) =>
              void saveConfig({ config: { stt: { provider: e.target.value } } })
            }
            className={selectClassName}
          >
            <option value="local">{t('sttOptionLocal', { defaultValue: 'Local (Whisper)' })}</option>
            <option value="openai">
              {t('sttOptionOpenai', { defaultValue: 'OpenAI Whisper API' })}
            </option>
          </select>
        </SettingsRow>
        {sttProvider === 'local' && (
          <SettingsRow
            label={t('sttModelSizeLabel', { defaultValue: 'Model size' })}
            description={t('sttModelSizeDesc', {
              defaultValue: 'tiny, base, small, medium, large',
            })}
          >
            <select
              value={(sttLocal.model_size as string) || 'base'}
              onChange={(e) =>
                void saveConfig({
                  config: { stt: { local: { model_size: e.target.value } } },
                })
              }
              className={selectClassName}
            >
              {['tiny', 'base', 'small', 'medium', 'large'].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </SettingsRow>
        )}
      </SettingsSection>
    </div>
  )

  const renderDisplay = () => (
    <SettingsSection
      title={t('displaySectionTitle', { defaultValue: 'Display' })}
      description={t('displaySectionDesc', {
        defaultValue: 'CLI display preferences reflected in the agent UI.',
      })}
      icon={PaintBoardIcon}
    >
      <SettingsRow
        label={t('displayPersonalityLabel', { defaultValue: 'Personality' })}
        description={t('displayPersonalityDesc', { defaultValue: 'Agent response style.' })}
      >
        <select
          value={(displayConfig.personality as string) || 'default'}
          onChange={(e) =>
            void saveConfig({
              config: { display: { personality: e.target.value } },
            })
          }
          className={selectClassName}
        >
          {['default', 'concise', 'verbose', 'creative'].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </SettingsRow>
      <SettingsRow
        label={t('displayStreamingLabel', { defaultValue: 'Streaming' })}
        description={t('displayStreamingDesc', {
          defaultValue: 'Stream tokens as they arrive.',
        })}
      >
        <Switch
          checked={readBoolean(displayConfig.streaming, true)}
          onCheckedChange={(checked) =>
            void saveConfig({ config: { display: { streaming: checked } } })
          }
        />
      </SettingsRow>
      <SettingsRow
        label={t('displayShowReasoningLabel', { defaultValue: 'Show reasoning' })}
        description={t('displayShowReasoningDesc', {
          defaultValue: 'Expose model reasoning blocks in the UI.',
        })}
      >
        <Switch
          checked={readBoolean(displayConfig.show_reasoning, false)}
          onCheckedChange={(checked) =>
            void saveConfig({
              config: { display: { show_reasoning: checked } },
            })
          }
        />
      </SettingsRow>
      <SettingsRow
        label={t('displayShowCostLabel', { defaultValue: 'Show cost' })}
        description={t('displayShowCostDesc', {
          defaultValue: 'Display usage cost metadata.',
        })}
      >
        <Switch
          checked={readBoolean(displayConfig.show_cost, false)}
          onCheckedChange={(checked) =>
            void saveConfig({ config: { display: { show_cost: checked } } })
          }
        />
      </SettingsRow>
      <SettingsRow
        label={t('displayCompactLabel', { defaultValue: 'Compact' })}
        description={t('displayCompactDesc', {
          defaultValue: 'Use a denser display layout.',
        })}
      >
        <Switch
          checked={readBoolean(displayConfig.compact, false)}
          onCheckedChange={(checked) =>
            void saveConfig({ config: { display: { compact: checked } } })
          }
        />
      </SettingsRow>
      <SettingsRow
        label={t('displaySkinLabel', { defaultValue: 'Skin' })}
        description={t('displaySkinDesc', { defaultValue: 'CLI theme skin.' })}
      >
        <span
          className="text-sm font-mono"
          style={{ color: 'var(--theme-muted)' }}
        >
          {(displayConfig.skin as string) || 'default'}
        </span>
      </SettingsRow>
    </SettingsSection>
  )

  const sectionContent = {
    hermes: renderHermesOverview(),
    agent: renderAgentBehavior(),
    routing: renderSmartRouting(),
    voice: renderVoice(),
    display: renderDisplay(),
  } as const

  return (
    <>
      {saveBanner && (
        <div
          className="rounded-lg px-3 py-2 text-sm font-medium"
          style={{
            backgroundColor:
              saveBanner === 'error'
                ? 'rgba(239,68,68,0.15)'
                : 'rgba(34,197,94,0.15)',
            color: saveBanner === 'error' ? '#ef4444' : '#22c55e',
          }}
        >
          {saveBanner === 'error'
            ? t('saveToastFailed', { defaultValue: 'Failed to save' })
            : t('saveToastSaved', { defaultValue: 'Saved' })}
        </div>
      )}
      {sectionContent[activeView]}
    </>
  )
}

// ── Connection Section ──────────────────────────────────────────────────

type ConnectionSettings = {
  gateway: string
  dashboard: string
  source: 'override' | 'env' | 'default'
}

function ConnectionSection() {
  const { t } = useTranslation('settings')
  const [current, setCurrent] = useState<ConnectionSettings | null>(null)
  const [gatewayInput, setGatewayInput] = useState('')
  const [dashboardInput, setDashboardInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/connection-settings')
      if (!res.ok) return
      const data = (await res.json()) as ConnectionSettings
      setCurrent(data)
      setGatewayInput(data.gateway)
      setDashboardInput(data.dashboard)
    } catch {
      // non-fatal
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const save = async () => {
    setSaving(true)
    setMessage(null)
    setIsError(false)
    try {
      const res = await fetch('/api/connection-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateway: gatewayInput.trim(),
          dashboard: dashboardInput.trim(),
        }),
      })
      const data = (await res.json()) as ConnectionSettings & { error?: string }
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      setCurrent(data)
      setMessage(
        t('connectionSavedMsg', {
          defaultValue: 'Saved. Connection updated — no restart needed.',
        }),
      )
    } catch (err) {
      setIsError(true)
      setMessage(
        err instanceof Error
          ? err.message
          : t('hermesSaveFailed', { defaultValue: 'Failed to save' }),
      )
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 6000)
    }
  }

  const reset = async () => {
    setGatewayInput('')
    setDashboardInput('')
    setSaving(true)
    try {
      const res = await fetch('/api/connection-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gateway: '', dashboard: '' }),
      })
      const data = (await res.json()) as ConnectionSettings
      setCurrent(data)
      setGatewayInput(data.gateway)
      setDashboardInput(data.dashboard)
      setMessage(t('connectionResetMsg', { defaultValue: 'Reset to env / default URLs.' }))
    } catch {
      setIsError(true)
      setMessage(t('connectionResetFailed', { defaultValue: 'Reset failed' }))
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 6000)
    }
  }

  const inputClass =
    'h-9 w-full rounded-lg border border-primary-200 bg-primary-50 px-3 text-sm text-primary-900 font-mono outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-400'

  const sourceLabel: Record<ConnectionSettings['source'], string> = {
    override: t('connectionSourceOverride', {
      defaultValue: 'Runtime override (saved in workspace-overrides.json)',
    }),
    env: t('connectionSourceEnv', {
      defaultValue: 'From HERMES_API_URL / HERMES_DASHBOARD_URL env vars',
    }),
    default: t('connectionSourceDefault', { defaultValue: 'Defaults — no override set' }),
  }

  return (
    <SettingsSection
      title={t('connectionSectionTitle', { defaultValue: 'Connection' })}
      description={t('connectionSectionDesc', {
        defaultValue:
          'Point the workspace at your Project Agent services. Useful for Tailscale, LAN, or remote-server setups (#101).',
      })}
      icon={Link01Icon}
    >
      <div className="text-xs text-primary-600">
        {current
          ? sourceLabel[current.source]
          : t('connectionLoadingSource', { defaultValue: 'Loading…' })}
      </div>

      <SettingsRow
        label={t('connectionGatewayLabel', { defaultValue: 'Gateway URL' })}
        description={t('connectionGatewayDesc', {
          defaultValue: 'Core chat + completions + health. Default http://127.0.0.1:8645.',
        })}
      >
        <input
          className={inputClass}
          value={gatewayInput}
          onChange={(e) => setGatewayInput(e.target.value)}
          placeholder={t('connectionGatewayPlaceholder', {
            defaultValue: 'http://100.x.y.z:8642',
          })}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </SettingsRow>

      <SettingsRow
        label={t('connectionDashboardLabel', { defaultValue: 'Dashboard URL' })}
        description={t('connectionDashboardDesc', {
          defaultValue:
            'Extended APIs — sessions, skills, config, jobs. Default http://127.0.0.1:9119.',
        })}
      >
        <input
          className={inputClass}
          value={dashboardInput}
          onChange={(e) => setDashboardInput(e.target.value)}
          placeholder={t('connectionDashboardPlaceholder', {
            defaultValue: 'http://100.x.y.z:9119',
          })}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </SettingsRow>

      <div className="flex items-center gap-2 pt-2">
        <Button size="sm" onClick={save} disabled={saving}>
          {saving
            ? t('connectionSavingBtn', { defaultValue: 'Saving…' })
            : t('connectionSaveBtn', { defaultValue: 'Save & reprobe' })}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={reset}
          disabled={saving || current?.source === 'default'}
        >
          {t('connectionResetBtn', { defaultValue: 'Reset to defaults' })}
        </Button>
        {message ? (
          <span
            className={cn(
              'text-xs',
              isError ? 'text-red-500' : 'text-emerald-600',
            )}
          >
            {message}
          </span>
        ) : null}
      </div>

      <div className="mt-3 rounded-lg border border-primary-200 bg-primary-100/50 p-3 text-xs text-primary-600">
        <strong className="font-semibold">
          {t('connectionTipTitle', { defaultValue: 'Tailscale / remote tip:' })}
        </strong>{' '}
        {t('connectionTipBody', {
          defaultValue:
            'Set the gateway to its Tailscale IP (e.g. http://100.x.y.z:8642) and ensure the gateway listens on 0.0.0.0 (set API_SERVER_HOST=0.0.0.0 in the agent-side .env). No workspace restart needed — capabilities reprobe on save.',
        })}
      </div>
    </SettingsSection>
  )
}
