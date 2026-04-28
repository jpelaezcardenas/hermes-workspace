export type ApiErrorCode =
  | 'unauthorized'
  | 'invalidJson'
  | 'messageRequired'
  | 'sessionNotFound'
  | 'streamTimeout'
  | 'invalidRequestBody'
  | 'unsupportedAction'
  | 'columnRequired'
  | 'invalidUploadRequest'
  | 'missingFile'
  | 'networkError'
  | 'oauthUnsupportedProvider'

type JsonErrorShape = {
  ok?: false
  error: string
  errorCode: ApiErrorCode
}

export function jsonError(
  errorCode: ApiErrorCode,
  error: string,
  status: number,
  extras?: Record<string, unknown>,
): Response {
  const payload: JsonErrorShape & Record<string, unknown> = {
    ok: false,
    error,
    errorCode,
    ...extras,
  }

  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
