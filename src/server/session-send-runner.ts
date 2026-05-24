type SessionSendPayload = Record<string, unknown> & {
  sessionKey: string
  message: string
}

export type ServerSideSessionSendInput = {
  requestUrl: string
  cookie?: string
  payload: SessionSendPayload
}

const MAX_ERROR_PREVIEW_LENGTH = 400

function truncateErrorPreview(value: string): string {
  const trimmed = value.trim()
  if (trimmed.length <= MAX_ERROR_PREVIEW_LENGTH) return trimmed
  return `${trimmed.slice(0, MAX_ERROR_PREVIEW_LENGTH)}...`
}

function errorMessageFromUnknown(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

function readSseError(block: string): string | null {
  let event = ''
  let data = ''
  for (const line of block.split('\n')) {
    if (line.startsWith('event: ')) event = line.slice(7).trim()
    else if (line.startsWith('data: ')) data += line.slice(6)
    else if (line.startsWith('data:')) data += line.slice(5)
  }
  if (event !== 'error') return null
  try {
    const parsed = JSON.parse(data) as { message?: unknown; error?: unknown }
    const message = parsed.message ?? parsed.error
    return typeof message === 'string' && message.trim().length > 0
      ? message
      : 'send-stream emitted an error event'
  } catch {
    return data.trim() || 'send-stream emitted an error event'
  }
}

export async function drainServerSideSessionSend(
  input: ServerSideSessionSendInput,
): Promise<void> {
  const url = new URL('/api/send-stream', input.requestUrl)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(input.cookie ? { cookie: input.cookie } : {}),
    },
    body: JSON.stringify(input.payload),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    throw new Error(
      `send-stream failed (${response.status})${
        errorText ? `: ${truncateErrorPreview(errorText)}` : ''
      }`,
    )
  }

  const reader = response.body?.getReader()
  if (!reader) return

  const decoder = new TextDecoder()
  let buffer = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const blocks = buffer.split('\n\n')
    buffer = blocks.pop() ?? ''
    for (const block of blocks) {
      if (!block.trim()) continue
      const streamError = readSseError(block)
      if (streamError) throw new Error(streamError)
    }
  }
}

export function startServerSideSessionSend(
  input: ServerSideSessionSendInput,
): void {
  void drainServerSideSessionSend(input).catch((error: unknown) => {
    console.warn(
      '[session-send] background send failed:',
      truncateErrorPreview(errorMessageFromUnknown(error)),
    )
  })
}
