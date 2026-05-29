import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'
import {
  listCompiledMemoryArtifacts,
  markCompiledMemoryGbrainExported,
  routeMemoryRequest,
  updateCompiledMemoryArtifactState,
} from '../../../../server/knowledge-memory-fabric'
import { requireJsonContentType } from '../../../../server/rate-limit'

export const Route = createFileRoute('/api/knowledge/fabric')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const contentTypeCheck = requireJsonContentType(request)
        if (contentTypeCheck) return contentTypeCheck
        try {
          const body = (await request.json()) as Record<string, unknown>
          const action = typeof body.action === 'string' ? body.action : 'route'
          if (action === 'listCompiledMemoryArtifacts') {
            return json(await listCompiledMemoryArtifacts({
              memoryScope: body.memoryScope ?? body.memory_scope,
              workspace: body.workspace,
              truthStatus: body.truthStatus ?? body.truth_status,
              gbrainExportState: body.gbrainExportState ?? body.gbrain_export_state,
              limit: body.limit,
            }))
          }
          if (action === 'updateCompiledMemoryArtifactState') {
            return json(await updateCompiledMemoryArtifactState({
              compiledArtifactId: body.compiledArtifactId ?? body.compiled_artifact_id,
              memoryScope: body.memoryScope ?? body.memory_scope,
              truthStatus: body.truthStatus ?? body.truth_status,
              freshnessState: body.freshnessState ?? body.freshness_state,
              gbrainExportState: body.gbrainExportState ?? body.gbrain_export_state,
              reviewNote: body.reviewNote ?? body.review_note,
            }))
          }
          if (action === 'markCompiledMemoryGbrainExported') {
            return json(await markCompiledMemoryGbrainExported({
              compiledArtifactId: body.compiledArtifactId ?? body.compiled_artifact_id,
              memoryScope: body.memoryScope ?? body.memory_scope,
              exportState: body.exportState ?? body.export_state,
            }))
          }
          return json(await routeMemoryRequest({
            memoryScope: body.memoryScope ?? body.memory_scope,
            operation: typeof body.operation === 'string' ? body.operation : 'query',
            defaultScope: body.defaultScope ?? body.default_scope,
          }))
        } catch (error) {
          return json({ ok: false, error: error instanceof Error ? error.message : 'Memory route failed' }, { status: 400 })
        }
      },
    },
  },
})
