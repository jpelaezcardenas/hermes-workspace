import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowMoveRightDownIcon,
  ArrowRight01Icon,
  Delete01Icon,
  File01Icon,
  Folder01Icon,
  Image01Icon,
  Pen01Icon,
  PlusSignIcon,
  RefreshIcon,
  Sorting01Icon,
  SortingAZ01Icon,
  SortingZA01Icon,
  Upload01Icon,
} from '@hugeicons/core-free-icons'
import FilePreviewDialog from './file-preview-dialog'
import { cn } from '@/lib/utils'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/ui/scroll-area'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export type FileEntry = {
  name: string
  path: string
  type: 'file' | 'folder'
  children?: Array<FileEntry>
}

type FileExplorerSidebarProps = {
  collapsed: boolean
  width?: number
  onToggle: () => void
  onInsertReference: (reference: string) => void
  hidden?: boolean
  className?: string
}

type ContextMenuState = {
  x: number
  y: number
  entry: FileEntry
  entries: Array<FileEntry>
}

type PromptState = {
  mode: 'rename' | 'new-file' | 'new-folder' | 'move'
  targetPath: string
  targetPaths?: Array<string>
  defaultValue?: string
}

type SortMode = 'none' | 'asc' | 'desc'

type VisibleEntry = {
  entry: FileEntry
  depth: number
}

type ContextMenuProps = {
  contextMenu: ContextMenuState
  onOpenEntry: (entry: FileEntry) => void
  onRename: (entry: FileEntry) => void
  onMove: (entries: Array<FileEntry>) => void
  onDelete: (entries: Array<FileEntry>) => void
  onClose: () => void
}

const ROOT_LABEL = 'Workspace'
const SORT_STORAGE_KEY = 'hermes.files.sortMode'
const sortModes: Array<SortMode> = ['none', 'asc', 'desc']
const fileNameCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
})

function isImageFile(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)
}

function getFileIcon(entry: FileEntry) {
  if (entry.type === 'folder') return Folder01Icon
  if (isImageFile(entry.name)) return Image01Icon
  return File01Icon
}

function normalizePath(pathValue: string) {
  return pathValue.replace(/\\/g, '/')
}

function getParentPath(pathValue: string) {
  const normalized = normalizePath(pathValue)
  const parts = normalized.split('/').filter(Boolean)
  if (parts.length <= 1) return ''
  return parts.slice(0, -1).join('/')
}

function getBaseName(pathValue: string) {
  const normalized = normalizePath(pathValue)
  return normalized.split('/').filter(Boolean).at(-1) || normalized
}

function buildReference(pathValue: string) {
  const normalized = normalizePath(pathValue)
  return `See file: workspace/${normalized}`
}

function getInitialSortMode(): SortMode {
  if (typeof window === 'undefined') return 'none'
  const saved = window.localStorage.getItem(SORT_STORAGE_KEY)
  return saved === 'asc' || saved === 'desc' ? saved : 'none'
}

function getNextSortMode(mode: SortMode): SortMode {
  const index = sortModes.indexOf(mode)
  return sortModes[(index + 1) % sortModes.length]
}

function compareEntries(a: FileEntry, b: FileEntry, sortMode: SortMode) {
  if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
  const result = fileNameCollator.compare(a.name, b.name)
  return sortMode === 'desc' ? -result : result
}

function sortTree(entries: Array<FileEntry>, sortMode: SortMode): Array<FileEntry> {
  const withChildren = entries.map((entry) => ({
    ...entry,
    children: entry.children ? sortTree(entry.children, sortMode) : undefined,
  }))

  if (sortMode === 'none') return withChildren
  return [...withChildren].sort((a, b) => compareEntries(a, b, sortMode))
}

function flattenEntries(entries: Array<FileEntry>) {
  const flattened: Array<FileEntry> = []
  const visit = (entry: FileEntry) => {
    flattened.push(entry)
    entry.children?.forEach(visit)
  }
  entries.forEach(visit)
  return flattened
}

function flattenVisibleEntries(
  entries: Array<FileEntry>,
  expanded: Set<string>,
  forceExpanded: boolean,
  depth = 0,
): Array<VisibleEntry> {
  const rows: Array<VisibleEntry> = []
  for (const entry of entries) {
    rows.push({ entry, depth })
    if (
      entry.type === 'folder' &&
      entry.children?.length &&
      (forceExpanded || expanded.has(entry.path))
    ) {
      rows.push(
        ...flattenVisibleEntries(entry.children, expanded, forceExpanded, depth + 1),
      )
    }
  }
  return rows
}

async function fetchFileTree(): Promise<Array<FileEntry>> {
  const res = await fetch('/api/files?action=list')
  if (!res.ok) throw new Error('Failed to load files')
  const data = (await res.json()) as { entries?: Array<FileEntry> }
  return Array.isArray(data.entries) ? data.entries : []
}

function filterTree(entries: Array<FileEntry>, term: string): Array<FileEntry> {
  if (!term.trim()) return entries
  const lower = term.toLowerCase()
  const filterEntry = (entry: FileEntry): FileEntry | null => {
    if (entry.type === 'file') {
      return entry.name.toLowerCase().includes(lower) ? entry : null
    }
    const children = (entry.children || [])
      .map(filterEntry)
      .filter((child): child is FileEntry => child !== null)
    if (entry.name.toLowerCase().includes(lower) || children.length > 0) {
      return { ...entry, children }
    }
    return null
  }

  return entries
    .map(filterEntry)
    .filter((entry): entry is FileEntry => entry !== null)
}

function isNestedPath(candidatePath: string, parentPath: string) {
  const candidate = normalizePath(candidatePath)
  const parent = normalizePath(parentPath)
  return candidate.startsWith(`${parent}/`)
}

function getTopLevelEntries(entries: Array<FileEntry>) {
  const sorted = [...entries].sort((a, b) => a.path.length - b.path.length)
  const topLevel: Array<FileEntry> = []
  for (const entry of sorted) {
    if (topLevel.some((parent) => isNestedPath(entry.path, parent.path))) {
      continue
    }
    topLevel.push(entry)
  }
  return topLevel
}

function hasHermesDrag(event: React.DragEvent) {
  return Array.from(event.dataTransfer.types).includes(
    'application/x-hermes-file-paths',
  )
}

function readDragPaths(event: React.DragEvent) {
  try {
    const raw = event.dataTransfer.getData('application/x-hermes-file-paths')
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed)
      ? parsed.filter((pathValue): pathValue is string => typeof pathValue === 'string')
      : []
  } catch {
    return []
  }
}

function FileExplorerContextMenu({
  contextMenu,
  onOpenEntry,
  onRename,
  onMove,
  onDelete,
  onClose,
}: ContextMenuProps) {
  const menuWidth = 176
  const menuHeight = contextMenu.entries.length === 1 ? 144 : 84
  const left =
    typeof window === 'undefined'
      ? contextMenu.x
      : Math.min(contextMenu.x, window.innerWidth - menuWidth - 8)
  const top =
    typeof window === 'undefined'
      ? contextMenu.y
      : Math.min(contextMenu.y, window.innerHeight - menuHeight - 8)

  return createPortal(
    <div
      className="fixed min-w-[176px] rounded-lg border border-primary-200 p-1 text-sm text-primary-900 shadow-xl"
      style={{
        top: Math.max(8, top),
        left: Math.max(8, left),
        zIndex: 100000,
        backgroundColor: 'var(--color-primary-50)',
        opacity: 1,
      }}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      {contextMenu.entries.length === 1 ? (
        <>
          <button
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-primary-900 hover:bg-primary-100"
            onClick={() => {
              onOpenEntry(contextMenu.entry)
              onClose()
            }}
          >
            <HugeiconsIcon icon={File01Icon} size={16} /> Open
          </button>
          <button
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-primary-900 hover:bg-primary-100"
            onClick={() => {
              onRename(contextMenu.entry)
              onClose()
            }}
          >
            <HugeiconsIcon icon={Pen01Icon} size={16} /> Rename
          </button>
        </>
      ) : null}
      <button
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-primary-900 hover:bg-primary-100"
        onClick={() => {
          onMove(contextMenu.entries)
          onClose()
        }}
      >
        <HugeiconsIcon icon={ArrowMoveRightDownIcon} size={16} /> Move
      </button>
      <button
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-red-700 hover:bg-red-50/80"
        onClick={() => {
          onDelete(contextMenu.entries)
          onClose()
        }}
      >
        <HugeiconsIcon icon={Delete01Icon} size={16} /> Delete
      </button>
    </div>,
    document.body,
  )
}

export function FileExplorerSidebar({
  collapsed,
  width = 260,
  onToggle,
  onInsertReference,
  hidden = false,
  className,
}: FileExplorerSidebarProps) {
  const [entries, setEntries] = useState<Array<FileEntry>>([])
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>(getInitialSortMode)
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(
    () => new Set(),
  )
  const [anchorPath, setAnchorPath] = useState<string | null>(null)
  const [isMouseSelecting, setIsMouseSelecting] = useState(false)
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const [promptState, setPromptState] = useState<PromptState | null>(null)
  const [promptValue, setPromptValue] = useState('')
  const [previewPath, setPreviewPath] = useState<string | null>(null)
  const [dropTargetPath, setDropTargetPath] = useState<string | null>(null)
  const uploadTargetRef = useRef<string>('')
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const dragSelectAnchorRef = useRef<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const nextEntries = await fetchFileTree()
      setEntries(nextEntries)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(SORT_STORAGE_KEY, sortMode)
  }, [sortMode])

  useEffect(() => {
    const handleMouseUp = () => {
      setIsMouseSelecting(false)
      dragSelectAnchorRef.current = null
    }
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  useEffect(() => {
    if (!contextMenu) return
    const handleClick = () => setContextMenu(null)
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContextMenu(null)
    }
    window.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [contextMenu])

  const filteredEntries = useMemo(
    () => filterTree(entries, search),
    [entries, search],
  )

  const sortedEntries = useMemo(
    () => sortTree(filteredEntries, sortMode),
    [filteredEntries, sortMode],
  )

  const isSearchActive = search.trim().length > 0

  const visibleEntries = useMemo(
    () => flattenVisibleEntries(sortedEntries, expanded, isSearchActive),
    [expanded, isSearchActive, sortedEntries],
  )

  const entryByPath = useMemo(() => {
    const map = new Map<string, FileEntry>()
    flattenEntries(entries).forEach((entry) => map.set(entry.path, entry))
    return map
  }, [entries])

  const selectedEntries = useMemo(
    () =>
      Array.from(selectedPaths)
        .map((pathValue) => entryByPath.get(pathValue))
        .filter((entry): entry is FileEntry => Boolean(entry)),
    [entryByPath, selectedPaths],
  )

  const selectedCount = selectedEntries.length
  const SortIcon =
    sortMode === 'asc'
      ? SortingAZ01Icon
      : sortMode === 'desc'
        ? SortingZA01Icon
        : Sorting01Icon
  const sortTitle =
    sortMode === 'asc'
      ? 'Sort: A-Z'
      : sortMode === 'desc'
        ? 'Sort: Z-A'
        : 'Sort: default'

  const toggleFolder = useCallback((pathValue: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(pathValue)) next.delete(pathValue)
      else next.add(pathValue)
      return next
    })
  }, [])

  const openEntry = useCallback(
    (entry: FileEntry) => {
      if (entry.type === 'folder') {
        toggleFolder(entry.path)
        return
      }
      onInsertReference(buildReference(entry.path))
      setPreviewPath(entry.path)
    },
    [onInsertReference, toggleFolder],
  )

  const selectRange = useCallback(
    (fromPath: string, toPath: string, additive = false) => {
      const startIndex = visibleEntries.findIndex(
        ({ entry }) => entry.path === fromPath,
      )
      const endIndex = visibleEntries.findIndex(({ entry }) => entry.path === toPath)
      if (startIndex < 0 || endIndex < 0) {
        setSelectedPaths(new Set([toPath]))
        setAnchorPath(toPath)
        return
      }
      const [start, end] =
        startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex]
      const rangePaths = visibleEntries
        .slice(start, end + 1)
        .map(({ entry }) => entry.path)
      setSelectedPaths((prev) => {
        const next = additive ? new Set(prev) : new Set<string>()
        rangePaths.forEach((pathValue) => next.add(pathValue))
        return next
      })
      setAnchorPath(fromPath)
    },
    [visibleEntries],
  )

  const openPrompt = useCallback((state: PromptState) => {
    setPromptState(state)
    setPromptValue(state.defaultValue || '')
  }, [])

  const moveEntriesTo = useCallback(
    async (entriesToMove: Array<FileEntry>, targetPath: string) => {
      const normalizedTarget = normalizePath(targetPath.trim())
      const topLevelEntries = getTopLevelEntries(entriesToMove)
      const movableEntries = topLevelEntries.filter((entry) => {
        if (entry.type !== 'folder') return true
        return (
          normalizedTarget !== normalizePath(entry.path) &&
          !isNestedPath(normalizedTarget, entry.path)
        )
      })

      if (movableEntries.length === 0) {
        window.alert('Nothing can be moved to that folder.')
        return
      }

      const movedPaths: Array<string> = []
      for (const entry of movableEntries) {
        const nextPath = normalizedTarget
          ? `${normalizedTarget}/${getBaseName(entry.path)}`
          : getBaseName(entry.path)
        if (normalizePath(nextPath) === normalizePath(entry.path)) continue

        const res = await fetch('/api/files', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'rename',
            from: entry.path,
            to: nextPath,
          }),
        })

        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          throw new Error(data.error || `Failed to move ${entry.name}`)
        }
        movedPaths.push(nextPath)
      }

      if (normalizedTarget) {
        setExpanded((prev) => new Set(prev).add(normalizedTarget))
      }
      if (movedPaths.length > 0) {
        setSelectedPaths(new Set(movedPaths))
        setAnchorPath(movedPaths.at(-1) || null)
      }
      await refresh()
    },
    [refresh],
  )

  const handleRename = useCallback(
    (entry: FileEntry) => {
      openPrompt({
        mode: 'rename',
        targetPath: entry.path,
        defaultValue: entry.name,
      })
    },
    [openPrompt],
  )

  const handleNewFile = useCallback(
    (entry: FileEntry) => {
      openPrompt({ mode: 'new-file', targetPath: entry.path })
    },
    [openPrompt],
  )

  const handleNewFolder = useCallback(
    (entry: FileEntry) => {
      openPrompt({ mode: 'new-folder', targetPath: entry.path })
    },
    [openPrompt],
  )

  const handleMove = useCallback(
    (entriesToMove: Array<FileEntry>) => {
      openPrompt({
        mode: 'move',
        targetPath: '',
        targetPaths: entriesToMove.map((entry) => entry.path),
      })
    },
    [openPrompt],
  )

  const handleDeleteEntries = useCallback(
    async (entriesToDelete: Array<FileEntry>) => {
      const topLevelEntries = getTopLevelEntries(entriesToDelete)
      const label =
        topLevelEntries.length === 1
          ? topLevelEntries[0].name
          : `${topLevelEntries.length} selected items`
      if (!window.confirm(`Move ${label} to trash?`)) return
      for (const entry of topLevelEntries) {
        await fetch('/api/files', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'delete', path: entry.path }),
        })
      }
      setSelectedPaths(new Set())
      setAnchorPath(null)
      await refresh()
    },
    [refresh],
  )

  const handleUploadClick = useCallback((targetPath: string) => {
    uploadTargetRef.current = targetPath
    uploadInputRef.current?.click()
  }, [])

  const handleUploadChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])
      if (files.length === 0) return
      for (const file of files) {
        const form = new FormData()
        form.append('action', 'upload')
        form.append('path', uploadTargetRef.current || '')
        form.append('file', file)
        await fetch('/api/files', { method: 'POST', body: form })
      }
      event.target.value = ''
      await refresh()
    },
    [refresh],
  )

  const handlePromptSubmit = useCallback(async () => {
    if (!promptState) return
    const value = promptValue.trim()
    if (!value && promptState.mode !== 'move') return

    try {
      if (promptState.mode === 'rename') {
        const parent = getParentPath(promptState.targetPath)
        const nextPath = parent ? `${parent}/${value}` : value
        await fetch('/api/files', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'rename',
            from: promptState.targetPath,
            to: nextPath,
          }),
        })
      } else if (promptState.mode === 'new-folder') {
        const nextPath = promptState.targetPath
          ? `${promptState.targetPath}/${value}`
          : value
        await fetch('/api/files', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'mkdir', path: nextPath }),
        })
      } else if (promptState.mode === 'move') {
        const entriesToMove = (promptState.targetPaths || [])
          .map((pathValue) => entryByPath.get(pathValue))
          .filter((entry): entry is FileEntry => Boolean(entry))
        await moveEntriesTo(entriesToMove, value)
      } else {
        const nextPath = promptState.targetPath
          ? `${promptState.targetPath}/${value}`
          : value
        await fetch('/api/files', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'write', path: nextPath, content: '' }),
        })
      }

      setPromptState(null)
      setPromptValue('')
      if (promptState.mode !== 'move') await refresh()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : String(err))
    }
  }, [entryByPath, moveEntriesTo, promptState, promptValue, refresh])

  const handleEntryMouseDown = useCallback(
    (event: React.MouseEvent, entry: FileEntry) => {
      if (event.button !== 0) return
      if (event.shiftKey) {
        const rangeAnchor = anchorPath || entry.path
        selectRange(rangeAnchor, entry.path, event.ctrlKey || event.metaKey)
        dragSelectAnchorRef.current = rangeAnchor
        setIsMouseSelecting(true)
        return
      }
      if (event.ctrlKey || event.metaKey) {
        setSelectedPaths((prev) => {
          const next = new Set(prev)
          if (next.has(entry.path)) next.delete(entry.path)
          else next.add(entry.path)
          return next
        })
        setAnchorPath(entry.path)
        dragSelectAnchorRef.current = null
        setIsMouseSelecting(false)
        return
      }
      if (selectedPaths.has(entry.path) && selectedPaths.size > 1) {
        dragSelectAnchorRef.current = null
        setIsMouseSelecting(false)
        return
      }

      setSelectedPaths(new Set([entry.path]))
      setAnchorPath(entry.path)
      dragSelectAnchorRef.current = entry.path
      setIsMouseSelecting(true)
    },
    [anchorPath, selectRange, selectedPaths],
  )

  const handleEntryMouseEnter = useCallback(
    (event: React.MouseEvent, entry: FileEntry) => {
      if (!isMouseSelecting || event.buttons !== 1 || !dragSelectAnchorRef.current) {
        return
      }
      selectRange(dragSelectAnchorRef.current, entry.path)
    },
    [isMouseSelecting, selectRange],
  )

  const handleEntryContextMenu = useCallback(
    (event: React.MouseEvent, entry: FileEntry) => {
      event.preventDefault()
      const contextEntries =
        selectedPaths.has(entry.path) && selectedEntries.length > 1
          ? selectedEntries
          : [entry]
      if (!selectedPaths.has(entry.path)) {
        setSelectedPaths(new Set([entry.path]))
        setAnchorPath(entry.path)
      }
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        entry,
        entries: contextEntries,
      })
    },
    [selectedEntries, selectedPaths],
  )

  const handleDragStart = useCallback(
    (event: React.DragEvent, entry: FileEntry) => {
      const dragEntries =
        selectedPaths.has(entry.path) && selectedEntries.length > 0
          ? selectedEntries
          : [entry]
      if (!selectedPaths.has(entry.path)) {
        setSelectedPaths(new Set([entry.path]))
        setAnchorPath(entry.path)
      }
      const dragPaths = dragEntries.map((dragEntry) => dragEntry.path)
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData(
        'application/x-hermes-file-paths',
        JSON.stringify(dragPaths),
      )
      event.dataTransfer.setData('text/plain', dragPaths.join('\n'))
    },
    [selectedEntries, selectedPaths],
  )

  const handleDrop = useCallback(
    async (event: React.DragEvent, targetPath: string) => {
      if (!hasHermesDrag(event)) return
      event.preventDefault()
      event.stopPropagation()
      setDropTargetPath(null)
      const entriesToMove = readDragPaths(event)
        .map((pathValue) => entryByPath.get(pathValue))
        .filter((entry): entry is FileEntry => Boolean(entry))
      try {
        await moveEntriesTo(entriesToMove, targetPath)
      } catch (err) {
        window.alert(err instanceof Error ? err.message : String(err))
      }
    },
    [entryByPath, moveEntriesTo],
  )

  const renderEntry = useCallback(
    ({ entry, depth }: VisibleEntry) => {
      const Icon = getFileIcon(entry)
      const isExpanded = isSearchActive ? true : expanded.has(entry.path)
      const isSelected = selectedPaths.has(entry.path)
      const isDropTarget = dropTargetPath === entry.path
      const padding = 12 + depth * 14

      return (
        <button
          key={entry.path}
          type="button"
          draggable={isSelected}
          aria-selected={isSelected}
          onMouseDown={(event) => handleEntryMouseDown(event, entry)}
          onMouseEnter={(event) => handleEntryMouseEnter(event, entry)}
          onDoubleClick={() => openEntry(entry)}
          onContextMenu={(event) => handleEntryContextMenu(event, entry)}
          onDragStart={(event) => handleDragStart(event, entry)}
          onDragEnd={() => setDropTargetPath(null)}
          onDragOver={(event) => {
            if (!hasHermesDrag(event)) return
            event.stopPropagation()
            if (entry.type !== 'folder') return
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
            setDropTargetPath(entry.path)
          }}
          onDrop={(event) => {
            if (!hasHermesDrag(event)) return
            event.stopPropagation()
            if (entry.type === 'folder') void handleDrop(event, entry.path)
          }}
          className={cn(
            'group flex w-full items-center gap-2 rounded-md py-1.5 text-left text-sm text-primary-900',
            'hover:bg-primary-200',
            isSelected &&
              'bg-accent-500/15 text-primary-950 ring-1 ring-accent-500/40',
            isDropTarget && 'bg-accent-500/25 ring-1 ring-accent-500',
          )}
          style={{ paddingLeft: padding }}
        >
          {entry.type === 'folder' ? (
            <span
              className={cn(
                'transition-transform',
                isExpanded ? 'rotate-90' : 'rotate-0',
              )}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </span>
          ) : (
            <span className="w-4" />
          )}
          {depth > 0 ? (
            <span className="text-primary-400" aria-hidden="true">
              -
            </span>
          ) : null}
          <HugeiconsIcon icon={Icon} size={18} strokeWidth={1.6} />
          <span className="truncate">{entry.name}</span>
        </button>
      )
    },
    [
      dropTargetPath,
      expanded,
      handleDragStart,
      handleDrop,
      handleEntryContextMenu,
      handleEntryMouseDown,
      handleEntryMouseEnter,
      isSearchActive,
      openEntry,
      selectedPaths,
    ],
  )

  if (hidden) return null

  return (
    <aside
      className={cn(
        'border-r border-primary-200 bg-primary-100 h-full flex flex-col transition-opacity duration-200 ease-out',
        collapsed
          ? 'w-0 opacity-0 pointer-events-none'
          : 'opacity-100',
        className,
      )}
      style={{ width: collapsed ? 0 : width }}
    >
      <div
        className={cn(
          'flex items-center justify-between h-12 px-3 border-b border-primary-200',
          dropTargetPath === '' && 'bg-accent-500/10',
        )}
        onDragOver={(event) => {
          if (!hasHermesDrag(event)) return
          event.preventDefault()
          event.dataTransfer.dropEffect = 'move'
          setDropTargetPath('')
        }}
        onDrop={(event) => void handleDrop(event, '')}
      >
        <div className="text-sm font-semibold text-primary-900">
          {ROOT_LABEL}
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={refresh}
            title="Refresh"
          >
            <HugeiconsIcon icon={RefreshIcon} size={18} />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => setSortMode((mode) => getNextSortMode(mode))}
            title={sortTitle}
          >
            <HugeiconsIcon icon={SortIcon} size={18} />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => handleUploadClick('')}
            title="Upload"
          >
            <HugeiconsIcon icon={Upload01Icon} size={18} />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => openPrompt({ mode: 'new-folder', targetPath: '' })}
            title="New folder"
          >
            <HugeiconsIcon icon={Folder01Icon} size={18} />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => openPrompt({ mode: 'new-file', targetPath: '' })}
            title="New file"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={18} />
          </Button>
        </div>
      </div>

      <div className="px-3 py-2">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search files"
          className="w-full rounded-md border border-primary-200 bg-primary-50 px-2 py-1 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>

      {selectedCount > 0 ? (
        <div className="border-y border-primary-200 bg-primary-50 px-3 py-1.5 text-xs text-primary-600">
          {selectedCount} selected
        </div>
      ) : null}

      <ScrollAreaRoot className="flex-1 min-h-0">
        <ScrollAreaViewport
          className="px-1"
          onDragOver={(event) => {
            if (!hasHermesDrag(event)) return
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
            setDropTargetPath('')
          }}
          onDrop={(event) => void handleDrop(event, '')}
        >
          {loading ? (
            <div className="px-3 py-2 text-xs text-primary-500">Loading…</div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary-200 bg-primary-100/60">
                <HugeiconsIcon
                  icon={Folder01Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary-500"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-800">
                  No workspace selected
                </p>
                <p className="mt-1 text-xs text-primary-500 text-pretty">
                  Select a folder to browse and edit files.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={refresh}
                className="mt-1"
              >
                <HugeiconsIcon icon={RefreshIcon} size={16} />
                Retry
              </Button>
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary-200 bg-primary-100/60">
                <HugeiconsIcon
                  icon={Folder01Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary-500"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-800">
                  Workspace is empty
                </p>
                <p className="mt-1 text-xs text-primary-500 text-pretty">
                  Create files or upload content to get started.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    openPrompt({ mode: 'new-folder', targetPath: '' })
                  }
                >
                  <HugeiconsIcon icon={Folder01Icon} size={16} />
                  New folder
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    openPrompt({ mode: 'new-file', targetPath: '' })
                  }
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                  New file
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUploadClick('')}
                >
                  <HugeiconsIcon icon={Upload01Icon} size={16} />
                  Upload
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'min-h-full rounded-md pb-4',
                dropTargetPath === '' && 'bg-accent-500/10',
              )}
            >
              {visibleEntries.map(renderEntry)}
            </div>
          )}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>

      <input
        ref={uploadInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleUploadChange}
      />

      {contextMenu ? (
        <FileExplorerContextMenu
          contextMenu={contextMenu}
          onOpenEntry={openEntry}
          onRename={handleRename}
          onMove={handleMove}
          onDelete={(entriesToDelete) => void handleDeleteEntries(entriesToDelete)}
          onClose={() => setContextMenu(null)}
        />
      ) : null}

      <DialogRoot
        open={Boolean(promptState)}
        onOpenChange={(open) => {
          if (!open) setPromptState(null)
        }}
      >
        <DialogContent>
          <div className="p-5 space-y-3">
            <DialogTitle>
              {promptState?.mode === 'rename'
                ? 'Rename'
                : promptState?.mode === 'new-folder'
                  ? 'New Folder'
                  : promptState?.mode === 'move'
                    ? 'Move'
                    : 'New File'}
            </DialogTitle>
            <DialogDescription>
              {promptState?.mode === 'rename'
                ? 'Enter a new name.'
                : promptState?.mode === 'move'
                  ? 'Enter a destination folder path. Leave blank for the workspace root.'
                  : 'Enter a name to create.'}
            </DialogDescription>
            <input
              value={promptValue}
              onChange={(event) => setPromptValue(event.target.value)}
              className="w-full rounded-md border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-2">
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button onClick={handlePromptSubmit}>
                {promptState?.mode === 'move' ? 'Move' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogRoot>

      <FilePreviewDialog
        path={previewPath}
        onClose={() => setPreviewPath(null)}
        onSaved={refresh}
      />

      <button
        type="button"
        onClick={onToggle}
        className="sr-only"
        aria-label="Toggle file explorer"
      />
    </aside>
  )
}
