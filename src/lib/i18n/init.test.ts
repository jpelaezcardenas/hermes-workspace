// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import {
  getLocale,
  i18next,
  initI18n,
  LOCALE_STORAGE_KEY,
  setLocale,
} from './init'

describe('i18n init', () => {
  beforeEach(() => {
    const bucket = new Map<string, string>()
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => bucket.get(key) ?? null,
        setItem: (key: string, value: string) => {
          bucket.set(key, value)
        },
        clear: () => {
          bucket.clear()
        },
      },
      configurable: true,
    })
    window.localStorage.clear()
    document.documentElement.lang = 'en'
    initI18n()
  })

  it('normalizes legacy zh locale to zh-CN', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'zh')
    expect(getLocale()).toBe('zh-CN')
  })

  it('updates i18next language and html lang on setLocale', async () => {
    setLocale('zh-CN')
    await i18next.changeLanguage('zh-CN')
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('zh-CN')
    expect(document.documentElement.lang).toBe('zh-CN')
    expect(i18next.t('settings:language', { defaultValue: 'Language' })).toBe('语言')
  })
})
