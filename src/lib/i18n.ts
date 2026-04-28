import { i18next, initI18n, LOCALE_LABELS, type LocaleId, getLocale, setLocale } from './i18n/init'

initI18n()

export { LOCALE_LABELS, getLocale, setLocale, type LocaleId }

export type TranslationKey = string

export function t(key: string): string {
  if (key.includes(':')) {
    return i18next.t(key, { defaultValue: key })
  }

  const [scope, ...rest] = key.split('.')
  if (rest.length > 0) {
    const nsKey = `${scope}:${rest.join('.')}`
    return i18next.t(nsKey, { defaultValue: key })
  }

  return i18next.t(key, { defaultValue: key })
}
