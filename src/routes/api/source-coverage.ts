import { readFile } from 'node:fs/promises'

import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { sanitizeSourceCoverageSnapshot } from './-worker-safety-filter'

const SOURCE_COVERAGE_PATH =
  '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/reports/ai-stack-sprint-2026-06-05/source-coverage-snapshot.json'

export const Route = createFileRoute('/api/source-coverage')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const raw = await readFile(SOURCE_COVERAGE_PATH, 'utf8')
          const snapshot = sanitizeSourceCoverageSnapshot(
            JSON.parse(raw) as Record<string, unknown>,
          )
          return json({ ok: true, snapshot })
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to load source coverage snapshot',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
