import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  applyThemeMode,
  getSystemThemeMode,
  getTheme,
  resolveThemeMode,
  setTheme,
  type ThemeMode,
} from '@/lib/theme'

export type SettingsThemeMode = ThemeMode
export type AccentColor = 'orange' | 'purple' | 'blue' | 'green'

export type StudioSettings = {
  hermesUrl: string
  hermesToken: string
  theme: SettingsThemeMode
  accentColor: AccentColor
  editorFontSize: number
  editorWordWrap: boolean
  editorMinimap: boolean
  notificationsEnabled: boolean
  usageThreshold: number
  smartSuggestionsEnabled: boolean
  preferredBudgetModel: string
  preferredPremiumModel: string
  onlySuggestCheaper: boolean
  showSystemMetricsFooter: boolean
  /** Mobile chat nav mode: 'dock' = iMessage (no nav in chat), 'integrated' = chat input in nav pill, 'scroll-hide' = nav shows on scroll up */
  mobileChatNavMode: 'dock' | 'integrated' | 'scroll-hide'
}

type SettingsState = {
  settings: StudioSettings
  updateSettings: (updates: Partial<StudioSettings>) => void
}

export const defaultStudioSettings: StudioSettings = {
  hermesUrl: '',
  hermesToken: '',
  theme: 'system',
  accentColor: 'blue',
  editorFontSize: 13,
  editorWordWrap: true,
  editorMinimap: false,
  notificationsEnabled: true,
  usageThreshold: 80,
  smartSuggestionsEnabled: false,
  preferredBudgetModel: '',
  preferredPremiumModel: '',
  onlySuggestCheaper: false,
  showSystemMetricsFooter: false,
  mobileChatNavMode: 'dock',
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    function createSettingsStore(set) {
      return {
        settings: defaultStudioSettings,
        updateSettings: function updateSettings(updates) {
          set(function applyUpdates(state) {
            return {
              settings: {
                ...state.settings,
                ...updates,
              },
            }
          })
        },
      }
    },
    {
      name: 'hermes-settings',
      skipHydration: true,
    },
  ),
)

export function useSettings() {
  const settings = useSettingsStore(function selectSettings(state) {
    return state.settings
  })
  const updateSettings = useSettingsStore(function selectUpdateSettings(state) {
    return state.updateSettings
  })

  return {
    settings,
    updateSettings,
  }
}

export function resolveTheme(theme: SettingsThemeMode): 'light' | 'dark' {
  return theme === 'system' ? getSystemThemeMode() : resolveThemeMode(theme)
}

function applyStoredAccent() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  const storedAccent = localStorage.getItem('hermes-accent')
  document.documentElement.setAttribute(
    'data-accent',
    storedAccent || defaultStudioSettings.accentColor,
  )
}

export function applyTheme(theme: SettingsThemeMode = 'system') {
  applyThemeMode(theme)
  applyStoredAccent()
}

export function initializeSettingsAppearance() {
  setTheme(getTheme())
  applyStoredAccent()
}
