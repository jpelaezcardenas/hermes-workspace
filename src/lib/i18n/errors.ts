import { initI18n, translateError } from './init'

export type ApiErrorPayload = {
  error?: string
  message?: string
  errorCode?: string
  code?: string
}

const MESSAGE_TO_CODE: Record<string, string> = {
  Unauthorized: 'unauthorized',
  'Invalid JSON': 'invalidJson',
  'message required': 'messageRequired',
  'session not found': 'sessionNotFound',
  'Stream timeout': 'streamTimeout',
  'Request timed out': 'requestTimedOut',
  'Gateway request failed': 'gatewayRequestFailed',
  'Gateway disconnected': 'gatewayDisconnected',
  'Failed to load models': 'failedToLoadModels',
  'Failed to switch model': 'failedToSwitchModel',
  'Failed to persist default model': 'failedToPersistDefaultModel',
  'Failed to send directive': 'failedToSendDirective',
  'Failed to terminate agent': 'failedToTerminateAgent',
  'Failed to update pause state': 'failedToUpdatePauseState',
  'Failed to send message': 'failedToSendMessage',
  'Invalid request body': 'invalidRequestBody',
  'column is required': 'columnRequired',
  'Invalid upload request': 'invalidUploadRequest',
  'Missing file': 'missingFile',
  'Network error': 'networkError',
}

export function toErrorCode(value: string | undefined): string | undefined {
  if (!value) return undefined
  if (value.includes('.')) return value
  const byMessage = MESSAGE_TO_CODE[value]
  if (byMessage) return byMessage
  return undefined
}

export function localizeApiError(payload: ApiErrorPayload, fallback: string): string {
  initI18n()
  const message =
    (typeof payload.error === 'string' && payload.error) ||
    (typeof payload.message === 'string' && payload.message) ||
    fallback

  const code =
    (typeof payload.errorCode === 'string' && payload.errorCode) ||
    (typeof payload.code === 'string' && payload.code) ||
    toErrorCode(message)

  return translateError(code || message, message)
}
