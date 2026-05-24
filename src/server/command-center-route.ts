import { requireLocalOrAuth } from './auth-middleware'
import type { CommandCenterEnvelope } from './command-center-summary'

type CommandCenterBuildOptions = {
  requestUrl: string
  cookie?: string | null
}

type CommandCenterBuilder<T> = (
  options: CommandCenterBuildOptions,
) => Promise<CommandCenterEnvelope<T>>

export async function commandCenterJson<T>(
  request: Request,
  builder: CommandCenterBuilder<T>,
): Promise<Response> {
  if (!requireLocalOrAuth(request)) {
    return Response.json(
      { ok: false, error: 'Authentication required' },
      { status: 401 },
    )
  }

  const envelope = await builder({
    requestUrl: request.url,
    cookie: request.headers.get('cookie'),
  })

  return Response.json(envelope, {
    status: 200,
    headers: {
      'Cache-Control': 'private, max-age=5, stale-while-revalidate=20',
    },
  })
}
