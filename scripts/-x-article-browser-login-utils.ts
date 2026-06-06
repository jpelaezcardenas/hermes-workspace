export type BrokerField = 'username' | 'password'

export type BrokerCredentialSummary = {
  usernamePresent: boolean
  passwordPresent: boolean
  usernameLength: number
  passwordLength: number
}

const BROKER_SCRIPT =
  '/Users/hermes/.hermes/profiles/ai-dev/scripts/op_hermes_broker.py'
const BROKER_ALIAS = 'x-tim'

export function shouldAttemptBrokerLogin(error?: string): boolean {
  if (!error) return false
  const normalized = error.toLowerCase()
  return (
    normalized.includes('not logged into x') ||
    normalized.includes('sign in to x')
  )
}

export function isXLoginTemporarilyLimited(bodyText: string): boolean {
  return /temporarily limited your login/i.test(bodyText)
}

export function brokerFieldCommandArgs(field: BrokerField): Array<string> {
  return [BROKER_SCRIPT, 'get-field', BROKER_ALIAS, field]
}

export function summarizeBrokerCredentialCheck(
  username: string,
  password: string,
): BrokerCredentialSummary {
  return {
    usernamePresent: username.trim().length > 0,
    passwordPresent: password.trim().length > 0,
    usernameLength: username.trim().length,
    passwordLength: password.trim().length,
  }
}
