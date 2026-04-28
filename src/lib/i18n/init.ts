import i18next, { type TOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  CHINESE_LOCALE,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  resources,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from './resources'

export { LOCALE_LABELS }
export type LocaleId = SupportedLocale

export const LOCALE_STORAGE_KEY = 'hermes-workspace-locale'

const LEGACY_LOCALE_MAP: Record<string, SupportedLocale> = {
  zh: CHINESE_LOCALE,
  'zh-cn': CHINESE_LOCALE,
  en: DEFAULT_LOCALE,
}

function normalizeLocale(value: string | null | undefined): SupportedLocale {
  if (!value) return DEFAULT_LOCALE
  const lower = value.toLowerCase()
  if (lower in LEGACY_LOCALE_MAP) return LEGACY_LOCALE_MAP[lower]
  if ((SUPPORTED_LOCALES as ReadonlyArray<string>).includes(value)) {
    return value as SupportedLocale
  }
  const base = lower.split('-')[0]
  if (base in LEGACY_LOCALE_MAP) return LEGACY_LOCALE_MAP[base]
  return DEFAULT_LOCALE
}

function getStorage():
  | Pick<Storage, 'getItem' | 'setItem'>
  | undefined {
  if (typeof window === 'undefined') return undefined
  const storage = window.localStorage as Partial<Storage> | undefined
  if (!storage) return undefined
  if (typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    return undefined
  }
  return storage as Pick<Storage, 'getItem' | 'setItem'>
}

export function getLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = getStorage()?.getItem(LOCALE_STORAGE_KEY)
  if (stored) return normalizeLocale(stored)
  return normalizeLocale(window.navigator.language)
}

function applyDocumentLanguage(locale: SupportedLocale): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
}

export function setLocale(locale: SupportedLocale): void {
  if (typeof window === 'undefined') return
  const normalized = normalizeLocale(locale)
  getStorage()?.setItem(LOCALE_STORAGE_KEY, normalized)
  void i18next.changeLanguage(normalized)
  applyDocumentLanguage(normalized)
  window.dispatchEvent(new CustomEvent('locale-change', { detail: normalized }))
}

export function getLocaleBootstrapScript(): string {
  return `
    (() => {
      try {
        const raw = localStorage.getItem('${LOCALE_STORAGE_KEY}') || navigator.language || '${DEFAULT_LOCALE}';
        const lower = String(raw).toLowerCase();
        const locale = lower === 'zh' || lower === 'zh-cn' || lower.startsWith('zh-')
          ? '${CHINESE_LOCALE}'
          : '${DEFAULT_LOCALE}';
        document.documentElement.lang = locale;
      } catch {}
    })();
  `
}

let initialized = false

export function initI18n(): void {
  if (initialized || i18next.isInitialized) {
    applyDocumentLanguage(getLocale())
    return
  }

  void i18next.use(initReactI18next).init({
    resources,
    lng: getLocale(),
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    defaultNS: 'common',
    ns: [
      'common',
      'nav',
      'settings',
      'chat',
      'tasks',
      'operations',
      'jobs',
      'gateway',
      'memory',
      'errors',
    ],
    returnNull: false,
  })

  initialized = true
  applyDocumentLanguage(getLocale())
}

export function translateError(
  codeOrMessage: string,
  fallbackMessage?: string,
): string {
  if (!codeOrMessage) {
    return fallbackMessage || i18next.t('errors:gatewayRequestFailed')
  }
  const key = codeOrMessage.includes(':')
    ? codeOrMessage
    : codeOrMessage.includes('.')
      ? codeOrMessage.replace(/^errors\./, 'errors:')
      : `errors:${codeOrMessage}`
  const defaultValue = fallbackMessage || codeOrMessage
  return i18next.t(key, { defaultValue } as TOptions)
}

export { i18next }
