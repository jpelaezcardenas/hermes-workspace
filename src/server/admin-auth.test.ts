import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  getAdminEmails,
  getCurrentUserEmail,
  isAdminAllowlistConfigured,
  isAdminEmail,
  isAdminRequest,
} from './admin-auth'

const ORIGINAL_ENV = process.env.HERMES_ADMIN_EMAILS

function makeRequest(headers: Record<string, string>): Request {
  return new Request('http://localhost/api/me', { headers })
}

describe('admin-auth', () => {
  beforeEach(() => {
    delete process.env.HERMES_ADMIN_EMAILS
  })
  afterEach(() => {
    if (ORIGINAL_ENV === undefined) {
      delete process.env.HERMES_ADMIN_EMAILS
    } else {
      process.env.HERMES_ADMIN_EMAILS = ORIGINAL_ENV
    }
  })

  it('treats everyone as admin when allowlist is unset', () => {
    expect(isAdminAllowlistConfigured()).toBe(false)
    expect(isAdminEmail(null)).toBe(true)
    expect(isAdminEmail('anyone@example.com')).toBe(true)
    expect(isAdminRequest(makeRequest({}))).toBe(true)
  })

  it('parses the allowlist case-insensitively and ignores empty entries', () => {
    process.env.HERMES_ADMIN_EMAILS = ' Alice@Example.COM,,  bob@example.com '
    expect(isAdminAllowlistConfigured()).toBe(true)
    expect(getAdminEmails()).toEqual(['alice@example.com', 'bob@example.com'])
    expect(isAdminEmail('alice@example.com')).toBe(true)
    expect(isAdminEmail('ALICE@example.com')).toBe(true)
    expect(isAdminEmail('bob@example.com')).toBe(true)
    expect(isAdminEmail('carol@example.com')).toBe(false)
    expect(isAdminEmail(null)).toBe(false)
  })

  it('reads identity from X-Forwarded-User, X-SSO-Email, X-Forwarded-Email', () => {
    process.env.HERMES_ADMIN_EMAILS = 'admin@example.com'
    expect(
      getCurrentUserEmail(
        makeRequest({ 'x-forwarded-user': 'Admin@Example.COM' }),
      ),
    ).toBe('admin@example.com')
    expect(
      getCurrentUserEmail(makeRequest({ 'x-sso-email': 'user@example.com' })),
    ).toBe('user@example.com')
    expect(
      getCurrentUserEmail(
        makeRequest({ 'x-forwarded-email': 'user@example.com' }),
      ),
    ).toBe('user@example.com')
    expect(getCurrentUserEmail(makeRequest({}))).toBeNull()
  })

  it('admits admin-allowlisted requests and rejects others', () => {
    process.env.HERMES_ADMIN_EMAILS = 'admin@example.com'
    expect(
      isAdminRequest(makeRequest({ 'x-sso-email': 'admin@example.com' })),
    ).toBe(true)
    expect(
      isAdminRequest(makeRequest({ 'x-sso-email': 'user@example.com' })),
    ).toBe(false)
    expect(isAdminRequest(makeRequest({}))).toBe(false)
  })
})
