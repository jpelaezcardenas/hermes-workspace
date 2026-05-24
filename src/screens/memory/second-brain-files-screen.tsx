import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

 type SecondBrainSource = {
  id: string
  label: string
  category: 'personal' | 'business' | 'receipts' | 'docs'
  description: string
  refPrefix: string
  writable: boolean
  exists: boolean
  status: 'available' | 'missing' | 'disabled'
}

type SecondBrainEntry = {
  name: string
  path: string
  ref: string
  type: 'file' | 'folder'
  size?: number
  modifiedAt?: string
}

type SourcesResponse = { ok: boolean; sources?: Array<SecondBrainSource>; error?: string }
type ListResponse = {
  ok: boolean
  source?: SecondBrainSource
  root?: string
  entries?: Array<SecondBrainEntry>
  error?: string
}
type ReadResponse = {
  ok: boolean
  source?: SecondBrainSource
  path?: string
  ref?: string
  content?: string
  hash?: string
  error?: string
}

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
  return data as T
}

async function postJson<T>(url: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await response.json().catch(() => ({}))) as T & { error?: string }
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`)
  return data as T
}

function formatBytes(size?: number): string {
  if (typeof size !== 'number') return ''
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function parentPath(path: string): string {
  const index = path.lastIndexOf('/')
  return index <= 0 ? '' : path.slice(0, index)
}

export function SecondBrainFilesScreen() {
  const queryClient = useQueryClient()
  const [sourceId, setSourceId] = useState<string>('')
  const [folderPath, setFolderPath] = useState('')
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [expectedHash, setExpectedHash] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const sourcesQuery = useQuery({
    queryKey: ['second-brain', 'sources'],
    queryFn: () => readJson<SourcesResponse>('/api/second-brain/sources'),
  })
  const sources = sourcesQuery.data?.sources ?? []
  const activeSource = sources.find((source) => source.id === sourceId) ?? null

  useEffect(() => {
    if (sourceId || sources.length === 0) return
    const firstAvailable = sources.find((source) => source.status === 'available') ?? sources[0]
    setSourceId(firstAvailable.id)
  }, [sourceId, sources])

  const listQuery = useQuery({
    queryKey: ['second-brain', 'list', sourceId, folderPath],
    queryFn: () =>
      readJson<ListResponse>(
        `/api/second-brain/list?source=${encodeURIComponent(sourceId)}&path=${encodeURIComponent(folderPath)}`,
      ),
    enabled: Boolean(sourceId),
  })

  const readQuery = useQuery({
    queryKey: ['second-brain', 'read', sourceId, selectedPath],
    queryFn: () =>
      readJson<ReadResponse>(
        `/api/second-brain/read?source=${encodeURIComponent(sourceId)}&path=${encodeURIComponent(selectedPath || '')}`,
      ),
    enabled: Boolean(sourceId && selectedPath),
  })

  useEffect(() => {
    if (!readQuery.data?.ok) return
    setDraft(readQuery.data.content ?? '')
    setExpectedHash(readQuery.data.hash ?? '')
    setMessage(null)
  }, [readQuery.data])

  const saveMutation = useMutation({
    mutationFn: () =>
      postJson<{ ok: boolean; hash: string }>('/api/second-brain/write', {
        source: sourceId,
        path: selectedPath,
        content: draft,
        expectedHash,
      }),
    onSuccess: (data) => {
      setExpectedHash(data.hash)
      setMessage('Saved with hash guard; audit log updated.')
      void queryClient.invalidateQueries({ queryKey: ['second-brain'] })
    },
    onError: (error) => setMessage(error instanceof Error ? error.message : 'Save failed'),
  })

  const dispatchMutation = useMutation({
    mutationFn: (operation: string) =>
      postJson<{ status: string; idempotencyKey: string }>('/api/second-brain/dispatch', {
        source: sourceId,
        path: selectedPath,
        hash: expectedHash,
        operation,
      }),
    onSuccess: (data) =>
      setMessage(`n8n ${data.status}; idempotency ${data.idempotencyKey.slice(0, 12)}…`),
    onError: (error) => setMessage(error instanceof Error ? error.message : 'Dispatch failed'),
  })

  const entries = listQuery.data?.entries ?? []
  const folders = useMemo(() => entries.filter((entry) => entry.type === 'folder'), [entries])
  const files = useMemo(() => entries.filter((entry) => entry.type === 'file'), [entries])

  return (
    <div className="min-h-full overflow-y-auto bg-surface text-ink">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Second Brain Files</h2>
              <p className="text-sm text-primary-500 dark:text-neutral-400">
                Curated source picker for Personal KV, Business KV, receipts, and docs. Markdown/text only; traversal, symlink escape, raw DBs, and secrets are denied server-side.
              </p>
            </div>
            <select
              value={sourceId}
              onChange={(event) => {
                setSourceId(event.target.value)
                setFolderPath('')
                setSelectedPath(null)
              }}
              className="rounded-xl border border-primary-200 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              {sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.label} — {source.status}{source.writable ? ' / writable' : ' / read-only'}
                </option>
              ))}
            </select>
          </div>
          {activeSource ? (
            <div className="mt-3 rounded-xl bg-primary-50 p-3 text-xs text-primary-600 dark:bg-neutral-900 dark:text-neutral-300">
              <strong>{activeSource.category}</strong>: {activeSource.description} Ref prefix: {activeSource.refPrefix}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={!folderPath}
                onClick={() => setFolderPath(parentPath(folderPath))}
                className="rounded-lg border border-primary-200 px-3 py-1 text-sm disabled:opacity-40 dark:border-neutral-700"
              >
                Up
              </button>
              <code className="truncate text-xs text-primary-500 dark:text-neutral-400">/{folderPath}</code>
            </div>
            {listQuery.isError ? (
              <div className="text-sm text-red-600">{String(listQuery.error)}</div>
            ) : null}
            <div className="space-y-1">
              {folders.map((entry) => (
                <button
                  key={entry.ref}
                  type="button"
                  onClick={() => setFolderPath(entry.path)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-primary-50 dark:hover:bg-neutral-900"
                >
                  <span>📁 {entry.name}</span>
                </button>
              ))}
              {files.map((entry) => (
                <button
                  key={entry.ref}
                  type="button"
                  onClick={() => setSelectedPath(entry.path)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-primary-50 dark:hover:bg-neutral-900 ${selectedPath === entry.path ? 'bg-primary-100 dark:bg-neutral-900' : ''}`}
                >
                  <span className="truncate">📄 {entry.name}</span>
                  <span className="ml-2 text-xs text-primary-500 dark:text-neutral-500">{formatBytes(entry.size)}</span>
                </button>
              ))}
              {!listQuery.isLoading && entries.length === 0 ? (
                <div className="rounded-xl bg-primary-50 p-3 text-sm text-primary-500 dark:bg-neutral-900 dark:text-neutral-400">
                  No allowed markdown/text entries here.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-primary-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            {selectedPath ? (
              <div className="flex h-full min-h-[520px] flex-col gap-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{selectedPath}</div>
                    <code className="text-xs text-primary-500 dark:text-neutral-400">{readQuery.data?.ref}</code>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['ingest', 'update', 'reclass', 'reingest', 'rank'] as const).map((operation) => (
                      <button
                        key={operation}
                        type="button"
                        onClick={() => dispatchMutation.mutate(operation)}
                        className="rounded-lg border border-primary-200 px-2 py-1 text-xs hover:bg-primary-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                      >
                        {operation}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={!activeSource?.writable || saveMutation.isPending}
                      onClick={() => saveMutation.mutate()}
                      className="rounded-lg bg-primary-900 px-3 py-1 text-xs font-medium text-white disabled:opacity-40 dark:bg-primary-100 dark:text-primary-950"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  spellCheck={false}
                  className="min-h-[440px] flex-1 rounded-xl border border-primary-200 bg-primary-50 p-3 font-mono text-sm outline-none focus:border-accent-500 dark:border-neutral-800 dark:bg-neutral-900"
                />
                <div className="flex flex-col gap-1 text-xs text-primary-500 dark:text-neutral-400 md:flex-row md:items-center md:justify-between">
                  <span>hash: {expectedHash ? `${expectedHash.slice(0, 16)}…` : 'not loaded'}</span>
                  <span>{message}</span>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[520px] items-center justify-center rounded-xl bg-primary-50 px-6 text-center text-sm text-primary-500 dark:bg-neutral-900 dark:text-neutral-400">
                Select an allowed markdown/text file. Raw databases, secrets, runtime stores, and symlink escapes are intentionally absent.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
