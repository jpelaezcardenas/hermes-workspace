// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { localizeApiError, toErrorCode } from './errors'
import { i18next, initI18n, setLocale } from './init'

describe('i18n error mapping', () => {
  beforeEach(async () => {
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
    initI18n()
    setLocale('zh-CN')
    await i18next.changeLanguage('zh-CN')
  })

  it('maps known english messages to stable error codes', () => {
    expect(toErrorCode('Unauthorized')).toBe('unauthorized')
    expect(toErrorCode('message required')).toBe('messageRequired')
  })

  it('localizes payload using errorCode first', () => {
    const text = localizeApiError(
      { error: 'Unauthorized', errorCode: 'unauthorized' },
      'Gateway request failed',
    )
    expect(text).toBe('未授权')
  })

  it('falls back to message when code is unknown', () => {
    const text = localizeApiError(
      { error: 'Custom upstream error' },
      'Gateway request failed',
    )
    expect(text).toBe('Custom upstream error')
  })
})
