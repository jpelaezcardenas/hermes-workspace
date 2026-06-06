import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/elevenlabs-token')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const response = await fetch('http://127.0.0.1:3192/api/token', {
            cache: 'no-store',
          })

          if (!response.ok) {
            return json(
              {
                ok: false,
                error: `Voice bridge token server returned ${response.status}`,
              },
              { status: 503 },
            )
          }

          const data = (await response.json()) as { token?: string }
          if (!data.token) {
            return json(
              { ok: false, error: 'Voice bridge token server returned no token' },
              { status: 503 },
            )
          }

          return json({ ok: true, token: data.token })
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Voice bridge token server unavailable',
            },
            { status: 503 },
          )
        }
      },
    },
  },
})
