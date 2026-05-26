import { useCallback, useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { createFileRoute } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { Folder01Icon } from '@hugeicons/core-free-icons'
import { usePageTitle } from '@/hooks/use-page-title'
import { FileExplorerSidebar } from '@/components/file-explorer'
import { resolveTheme, useSettings } from '@/hooks/use-settings'

type ToolArtifactSummary = {
  id: string
  sessionId: string
  kind: string
  title: string
  summary: string
  preview: string
  contentSize: number
  createdAt: number
}

type ToolArtifactDetail = ToolArtifactSummary & {
  content: string
}

const INITIAL_EDITOR_VALUE = `// Files workspace
// Use the file tree on the left to browse and manage project files.
// "Insert as reference" actions appear here for quick context snippets.

function note() {
  return 'Ready to explore files.'
}
`

function formatArtifactSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) return '0 B'
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function formatArtifactTime(timestamp: number) {
  if (!Number.isFinite(timestamp)) return 'unknown'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

export const Route = createFileRoute('/files')({
  ssr: false,
  component: FilesRoute,
  errorComponent: function FilesError({ error }) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-primary-50">
        <h2 className="text-xl font-semibold text-primary-900 mb-3">
          Failed to Load Files
        </h2>
        <p className="text-sm text-primary-600 mb-4 max-w-md">
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    )
  },
  pendingComponent: function FilesPending() {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-accent-500 border-r-transparent mb-3" />
          <p className="text-sm text-primary-500">Loading file explorer...</p>
        </div>
      </div>
    )
  },
})

function FilesRoute() {
  usePageTitle('Files')
  const { settings } = useSettings()
  const [isMobile, setIsMobile] = useState(false)
  const [fileExplorerCollapsed, setFileExplorerCollapsed] = useState(false)
  const [editorValue, setEditorValue] = useState(INITIAL_EDITOR_VALUE)
  const [artifacts, setArtifacts] = useState<Array<ToolArtifactSummary>>([])
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(
    null,
  )
  const [selectedArtifactDetail, setSelectedArtifactDetail] =
    useState<ToolArtifactDetail | null>(null)
  const [artifactsLoading, setArtifactsLoading] = useState(false)
  const [artifactDetailLoading, setArtifactDetailLoading] = useState(false)
  const [artifactsError, setArtifactsError] = useState<string | null>(null)
  const resolvedTheme = resolveTheme(settings.theme)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    setFileExplorerCollapsed(true)
  }, [isMobile])

  const handleInsertReference = useCallback(function handleInsertReference(
    reference: string,
  ) {
    setEditorValue((prev) => `${prev}\n${reference}\n`)
  }, [])

  const loadArtifacts = useCallback(async function loadArtifacts() {
    setArtifactsLoading(true)
    setArtifactsError(null)
    try {
      const response = await fetch('/api/artifacts?limit=100', {
        headers: { Accept: 'application/json' },
      })
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean
        error?: string
        artifacts?: Array<ToolArtifactSummary>
      } | null
      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.error || `HTTP ${response.status}`)
      }
      const nextArtifacts = Array.isArray(payload?.artifacts)
        ? payload.artifacts
        : []
      setArtifacts(nextArtifacts)
      setSelectedArtifactId((current) => {
        if (
          current &&
          nextArtifacts.some((artifact) => artifact.id === current)
        ) {
          return current
        }
        return nextArtifacts[0]?.id ?? null
      })
    } catch (error) {
      setArtifacts([])
      setSelectedArtifactDetail(null)
      setSelectedArtifactId(null)
      setArtifactsError(error instanceof Error ? error.message : String(error))
    } finally {
      setArtifactsLoading(false)
    }
  }, [])

  const loadArtifactDetail = useCallback(async function loadArtifactDetail(
    artifactId: string,
  ) {
    setArtifactDetailLoading(true)
    setArtifactsError(null)
    try {
      const response = await fetch(
        `/api/artifacts/${encodeURIComponent(artifactId)}`,
        { headers: { Accept: 'application/json' } },
      )
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean
        error?: string
        artifact?: ToolArtifactDetail
      } | null
      if (!response.ok || payload?.ok === false || !payload?.artifact) {
        throw new Error(payload?.error || `HTTP ${response.status}`)
      }
      setSelectedArtifactDetail(payload.artifact)
    } catch (error) {
      setSelectedArtifactDetail(null)
      setArtifactsError(error instanceof Error ? error.message : String(error))
    } finally {
      setArtifactDetailLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadArtifacts()
  }, [loadArtifacts])

  useEffect(() => {
    if (!selectedArtifactId) {
      setSelectedArtifactDetail(null)
      return
    }
    void loadArtifactDetail(selectedArtifactId)
  }, [loadArtifactDetail, selectedArtifactId])

  return (
    <div className="h-full min-h-0 overflow-hidden bg-surface text-primary-900">
      <div className="flex h-full min-h-0 overflow-hidden">
        <FileExplorerSidebar
          collapsed={fileExplorerCollapsed}
          onToggle={function onToggleFileExplorer() {
            setFileExplorerCollapsed((prev) => !prev)
          }}
          onInsertReference={handleInsertReference}
        />
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex items-center gap-3 border-b border-primary-200 px-3 py-2 md:px-4 md:py-3">
            <button
              type="button"
              onClick={function onToggleFileExplorerHeader() {
                setFileExplorerCollapsed((prev) => !prev)
              }}
              className="rounded-lg p-1.5 text-primary-600 hover:bg-primary-100 transition-colors"
              aria-label={fileExplorerCollapsed ? 'Show files' : 'Hide files'}
              title={fileExplorerCollapsed ? 'Show files' : 'Hide files'}
            >
              <HugeiconsIcon icon={Folder01Icon} size={20} strokeWidth={1.5} />
            </button>
            <div>
              <h1 className="text-base font-medium text-balance md:text-lg">
                Files
              </h1>
              <p className="hidden text-sm text-primary-600 text-pretty sm:block">
                Explore your workspace and draft notes in the editor.
              </p>
            </div>
          </header>
          <div className="min-h-0 flex-1 pb-24 md:pb-0">
            <Editor
              height="100%"
              theme={resolvedTheme === 'dark' ? 'vs-dark' : 'vs-light'}
              language="typescript"
              value={editorValue}
              onChange={function onEditorChange(value) {
                setEditorValue(value || '')
              }}
              options={{
                minimap: { enabled: settings.editorMinimap },
                fontSize: settings.editorFontSize,
                scrollBeyondLastLine: false,
                wordWrap: settings.editorWordWrap ? 'on' : 'off',
              }}
            />
          </div>
        </main>
        <aside className="hidden w-[340px] shrink-0 flex-col border-l border-primary-200 bg-primary-100 xl:flex">
          <div className="flex h-12 items-center justify-between border-b border-primary-200 px-3">
            <div>
              <h2 className="text-sm font-semibold text-primary-900">
                Tool Artifacts
              </h2>
              <p className="text-xs text-primary-500">
                Full tool outputs and receipts
              </p>
            </div>
            <button
              type="button"
              onClick={() => void loadArtifacts()}
              disabled={artifactsLoading}
              className="rounded-md px-2 py-1 text-xs font-medium text-primary-700 hover:bg-primary-200 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {artifactsError ? (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {artifactsError}
              </div>
            ) : artifactsLoading && artifacts.length === 0 ? (
              <div className="text-sm text-primary-500">
                Loading artifacts...
              </div>
            ) : artifacts.length === 0 ? (
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-500">
                No tool artifacts found yet.
              </div>
            ) : (
              <div className="space-y-2">
                {artifacts.slice(0, 12).map((artifact) => {
                  const selected = artifact.id === selectedArtifactId
                  return (
                    <button
                      key={artifact.id}
                      type="button"
                      onClick={() => setSelectedArtifactId(artifact.id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                        selected
                          ? 'border-accent-500/50 bg-accent-500/10'
                          : 'border-primary-200 bg-primary-50 hover:bg-primary-200/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-primary-900">
                          {artifact.title}
                        </span>
                        <span className="ml-auto shrink-0 rounded-full bg-primary-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-600">
                          {artifact.kind}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-primary-500">
                        {artifact.preview || artifact.summary}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="max-h-[42%] border-t border-primary-200 p-3">
            {selectedArtifactDetail ? (
              <div className="flex h-full min-h-0 flex-col gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-primary-900">
                    {selectedArtifactDetail.title}
                  </div>
                  <div className="text-xs text-primary-500">
                    {formatArtifactSize(selectedArtifactDetail.contentSize)} -{' '}
                    {formatArtifactTime(selectedArtifactDetail.createdAt)}
                  </div>
                </div>
                <p className="line-clamp-2 text-xs text-primary-500">
                  {selectedArtifactDetail.summary}
                </p>
                <pre className="min-h-0 flex-1 overflow-auto rounded-lg border border-primary-200 bg-primary-50 p-3 text-xs leading-relaxed text-primary-800">
                  {selectedArtifactDetail.content ||
                    selectedArtifactDetail.preview}
                </pre>
              </div>
            ) : artifactDetailLoading ? (
              <div className="text-sm text-primary-500">
                Loading artifact...
              </div>
            ) : (
              <div className="text-sm text-primary-500">
                Select an artifact to inspect its saved output.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
