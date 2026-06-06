import { describe, expect, it } from 'vitest'

import {
  brokerFieldCommandArgs,
  isXLoginTemporarilyLimited,
  shouldAttemptBrokerLogin,
  summarizeBrokerCredentialCheck,
} from './-x-article-browser-login-utils'

describe('x article browser login utils', () => {
  it('attempts broker login only for X login-wall extraction failures', () => {
    expect(
      shouldAttemptBrokerLogin(
        'Dedicated browser profile is not logged into X.',
      ),
    ).toBe(true)
    expect(shouldAttemptBrokerLogin('Sign in to X to continue')).toBe(true)
    expect(shouldAttemptBrokerLogin('Article unavailable')).toBe(false)
    expect(shouldAttemptBrokerLogin(undefined)).toBe(false)
  })

  it('builds restricted broker field commands without embedding secrets', () => {
    expect(brokerFieldCommandArgs('username')).toEqual([
      '/Users/hermes/.hermes/profiles/ai-dev/scripts/op_hermes_broker.py',
      'get-field',
      'x-tim',
      'username',
    ])
    expect(brokerFieldCommandArgs('password')).toEqual([
      '/Users/hermes/.hermes/profiles/ai-dev/scripts/op_hermes_broker.py',
      'get-field',
      'x-tim',
      'password',
    ])
  })

  it('summarizes credential checks without exposing values', () => {
    expect(
      summarizeBrokerCredentialCheck('tim@example.com', 'secret-password'),
    ).toEqual({
      usernamePresent: true,
      passwordPresent: true,
      usernameLength: 15,
      passwordLength: 15,
    })
  })

  it('detects X temporary login throttling', () => {
    expect(
      isXLoginTemporarilyLimited(
        'We’ve temporarily limited your login. Please try again later.',
      ),
    ).toBe(true)
    expect(isXLoginTemporarilyLimited('Sign in to X')).toBe(false)
  })
})
