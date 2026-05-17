import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  CodeIcon,
  Folder01Icon,
  GitBranchIcon,
  Link01Icon,
  PlayIcon,
  TaskDone01Icon,
  TimeQuarterPassIcon,
} from '@hugeicons/core-free-icons'

import {
  buildProjectMissionTraceIntent,
  getMissionTraceSessionKey,
} from './project-mission-trace'
import type { MissionHistoryEntry } from '@/screens/gateway/hooks/mission-history'
import { Button } from '@/components/ui/button'
import { persistConductorLaunchIntent } from '@/screens/gateway/conductor-launch-intent'
import {
  filterMissionHistoryByProject,
  loadMissionHistory,
  summarizeProjectMissionHistory,
} from '@/screens/gateway/hooks/mission-history'

type ProjectFile = {
  name: string
  path: string
  excerpt: string
}

type ProjectStatus = {
  gitDirty: boolean | null
  changedFiles: number | null
  lastCommit: string | null
  lastCommitAt: string | null
  detectedStack: Array<string>
  packageManager: string | null
}

type ProjectContextPreview = {
  summary: string
  files: Array<{ name: string; path: string; chars: number }>
}

type ProjectEntry = {
  id: string
  name: string
  path: string
  source: 'shared' | 'discovered'
  active: boolean
  gitRemote: string | null
  gitBranch: string | null
  status: ProjectStatus
  contextPreview: ProjectContextPreview
  instructionFiles: Array<ProjectFile>
  readme: ProjectFile | null
}

type ProjectsResponse = {
  activeProjectId: string | null
  projects: Array<ProjectEntry>
  fetchedAt: number
  error?: string
}

const PROJECT_HISTORY_LIMIT = 4

function getFirstProject(projects: Array<ProjectEntry>): ProjectEntry | null {
  return projects.length > 0 ? projects[0] : null
}

async function fetchProjects(): Promise<ProjectsResponse> {
  const response = await fetch('/api/projects', { cache: 'no-store' })
  const data = (await response.json().catch(() => ({}))) as ProjectsResponse
  if (!response.ok) {
    throw new Error(data.error || 'Failed to load projects')
  }
  return data
}

async function selectActiveProject(
  projectId: string,
): Promise<ProjectsResponse> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activeProjectId: projectId }),
  })
  const data = (await response.json().catch(() => ({}))) as ProjectsResponse
  if (!response.ok) {
    throw new Error(data.error || 'Failed to select project')
  }
  return data
}

function shortenRemote(remote: string | null): string {
  if (!remote) return 'No git remote'
  return remote
    .replace(/^git@github.com:/, 'github.com/')
    .replace(/^https:\/\/github.com\//, 'github.com/')
    .replace(/\.git$/, '')
}

function formatMissionDate(value: string): string {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return 'Unknown date'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatProjectStatus(status: ProjectStatus): string {
  if (status.gitDirty === null) return 'Git status unavailable'
  if (!status.gitDirty) return 'Clean worktree'
  return `${status.changedFiles ?? 0} changed file${status.changedFiles === 1 ? '' : 's'}`
}

function formatLastCommit(status: ProjectStatus): string {
  if (!status.lastCommit) return 'No commits detected'
  if (!status.lastCommitAt) return status.lastCommit
  return `${status.lastCommit} · ${formatMissionDate(status.lastCommitAt)}`
}

function buildProjectMissionDraft(project: ProjectEntry): string {
  return [
    `Build: continue work in project ${project.name}.`,
    '',
    `Project path: ${project.path}`,
    project.gitBranch ? `Current branch: ${project.gitBranch}` : null,
    project.gitRemote
      ? `Git remote: ${shortenRemote(project.gitRemote)}`
      : null,
    '',
    'Inspect the project first, respect local instructions, then implement the requested slice. Desired outcome:',
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
}

function ProjectFileCard({ file }: { file: ProjectFile }) {
  return (
    <div className="rounded-2xl border border-primary-200 bg-primary-50/80 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <HugeiconsIcon
            icon={BookOpen01Icon}
            size={16}
            strokeWidth={1.7}
            className="shrink-0 text-accent-600"
          />
          <p className="truncate text-sm font-semibold text-primary-900">
            {file.name}
          </p>
        </div>
        <p className="truncate text-[11px] text-primary-500">{file.path}</p>
      </div>
      <pre className="max-h-36 overflow-hidden whitespace-pre-wrap rounded-xl bg-primary-100/70 p-3 text-xs leading-relaxed text-primary-700">
        {file.excerpt}
      </pre>
    </div>
  )
}

function ProjectCard({
  project,
  history,
  selected,
  onSelect,
  onStartMission,
  onMakeActive,
  onOpenTrace,
}: {
  project: ProjectEntry
  history: Array<MissionHistoryEntry>
  selected: boolean
  onSelect: () => void
  onStartMission: () => void
  onMakeActive: () => void
  onOpenTrace: (entry: MissionHistoryEntry) => void
}) {
  const files =
    project.instructionFiles.length > 0
      ? project.instructionFiles
      : project.readme
        ? [project.readme]
        : []
  const recentHistory = filterMissionHistoryByProject(history, {
    id: project.id,
    path: project.path,
  }).slice(0, PROJECT_HISTORY_LIMIT)

  return (
    <article
      className={`rounded-3xl border bg-[var(--theme-card)] p-5 shadow-sm transition-colors ${selected ? 'border-accent-500 ring-2 ring-accent-500/15' : 'border-primary-200'}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <button
          type="button"
          onClick={onSelect}
          className="min-w-0 flex-1 space-y-2 text-left"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-semibold text-primary-950">
              {project.name}
            </h2>
            {project.active ? (
              <span className="rounded-full bg-accent-500/15 px-2.5 py-1 text-xs font-semibold text-accent-700">
                Active
              </span>
            ) : null}
            {project.source === 'shared' ? (
              <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                Shared
              </span>
            ) : null}
            {selected && !project.active ? (
              <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                Selected
              </span>
            ) : null}
          </div>
          <div className="flex min-w-0 items-center gap-2 text-sm text-primary-600">
            <HugeiconsIcon
              icon={Folder01Icon}
              size={16}
              strokeWidth={1.7}
              className="shrink-0"
            />
            <span className="truncate">{project.path}</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-primary-600">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1">
              <HugeiconsIcon icon={GitBranchIcon} size={14} strokeWidth={1.7} />
              {project.gitBranch ?? 'No branch'}
            </span>
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1">
              <HugeiconsIcon icon={Link01Icon} size={14} strokeWidth={1.7} />
              <span className="truncate">
                {shortenRemote(project.gitRemote)}
              </span>
            </span>
          </div>
        </button>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
          {!project.active ? (
            <Button type="button" variant="outline" onClick={onMakeActive}>
              Make active
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={onStartMission}
            className="bg-accent-500 text-primary-950 hover:bg-accent-400"
          >
            <HugeiconsIcon icon={PlayIcon} size={16} strokeWidth={1.7} />
            Open in Conductor
          </Button>
        </div>
      </div>

      {selected ? (
        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-primary-200 bg-primary-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                  Status
                </p>
                <p
                  className={`mt-2 text-sm font-semibold ${project.status.gitDirty ? 'text-amber-700' : 'text-emerald-700'}`}
                >
                  {formatProjectStatus(project.status)}
                </p>
              </div>
              <div className="rounded-2xl border border-primary-200 bg-primary-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                  Last commit
                </p>
                <p className="mt-2 truncate text-sm font-semibold text-primary-900">
                  {formatLastCommit(project.status)}
                </p>
              </div>
              <div className="rounded-2xl border border-primary-200 bg-primary-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                  Stack
                </p>
                <p className="mt-2 truncate text-sm font-semibold text-primary-900">
                  {project.status.detectedStack.length
                    ? project.status.detectedStack.join(', ')
                    : 'Not detected'}
                </p>
                {project.status.packageManager ? (
                  <p className="mt-1 text-xs text-primary-500">
                    {project.status.packageManager}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                    Auto-context preview
                  </p>
                  <p className="mt-1 text-sm text-primary-600">
                    This is the bounded context Conductor will attach to
                    project-aware launches.
                  </p>
                </div>
                <HugeiconsIcon
                  icon={TimeQuarterPassIcon}
                  size={20}
                  strokeWidth={1.7}
                  className="text-accent-600"
                />
              </div>
              <pre className="whitespace-pre-wrap rounded-xl bg-[var(--theme-card)] p-3 text-xs leading-relaxed text-primary-700">
                {project.contextPreview.summary}
              </pre>
              {project.contextPreview.files.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.contextPreview.files.map((file) => (
                    <span
                      key={`${project.id}-${file.path}`}
                      className="rounded-full border border-primary-200 bg-[var(--theme-card)] px-2.5 py-1 text-[11px] text-primary-600"
                    >
                      {file.name} · {file.chars.toLocaleString()} chars
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-primary-900">
                Local context
              </h3>
              <span className="text-xs text-primary-500">
                {files.length} files
              </span>
            </div>
            {files.length > 0 ? (
              files.map((file) => (
                <ProjectFileCard
                  key={`${project.id}-${file.name}`}
                  file={file}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/60 p-4 text-sm text-primary-600">
                No AGENTS.md, CLAUDE.md, .cursorrules, or README.md found at
                project root.
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-primary-200 bg-primary-50/70 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                  Mission history
                </p>
                <p className="mt-1 text-sm font-semibold text-primary-900">
                  {recentHistory.length
                    ? `${recentHistory.length} recent`
                    : 'No local missions'}
                </p>
              </div>
              <HugeiconsIcon
                icon={TaskDone01Icon}
                size={20}
                strokeWidth={1.7}
                className="text-accent-600"
              />
            </div>
            <div className="space-y-2">
              {recentHistory.length > 0 ? (
                recentHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-primary-200 bg-[var(--theme-card)] p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="line-clamp-2 text-sm font-medium text-primary-900">
                        {entry.goal}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${entry.status === 'completed' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-red-500/10 text-red-700'}`}
                      >
                        {entry.status === 'completed' ? 'Done' : 'Failed'}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-primary-500">
                      <span>
                        {formatMissionDate(entry.completedAt)} ·{' '}
                        {entry.workerCount} workers ·{' '}
                        {entry.totalTokens.toLocaleString()} tok
                      </span>
                      {getMissionTraceSessionKey(entry) ? (
                        <button
                          type="button"
                          onClick={() => onOpenTrace(entry)}
                          className="font-semibold text-accent-700 hover:text-accent-600"
                        >
                          Open trace
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-primary-200 bg-[var(--theme-card)] p-4 text-sm text-primary-600">
                  Launch a Conductor mission from this project and completed
                  runs will appear here.
                </div>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </article>
  )
}

export function ProjectsScreen() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const projectsQuery = useQuery({
    queryKey: ['projects', 'registry'],
    queryFn: fetchProjects,
    staleTime: 30_000,
  })

  const selectProjectMutation = useMutation({
    mutationFn: selectActiveProject,
    onSuccess: (data) => {
      queryClient.setQueryData(['projects', 'registry'], data)
      setSelectedProjectId(data.activeProjectId)
    },
  })

  const projects = projectsQuery.data?.projects ?? []
  const activeProject = useMemo(
    () =>
      projects.find(
        (project) => project.id === projectsQuery.data?.activeProjectId,
      ) ?? projects.find((project) => project.active),
    [projects, projectsQuery.data?.activeProjectId],
  )
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  )
  const [missionHistory, setMissionHistory] = useState<
    Array<MissionHistoryEntry>
  >([])
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ??
    activeProject ??
    getFirstProject(projects)
  const selectedProjectMissionSummary = selectedProject
    ? summarizeProjectMissionHistory(missionHistory, {
        id: selectedProject.id,
        path: selectedProject.path,
      })
    : null
  const totalProjectMissions = selectedProjectMissionSummary?.total ?? 0
  const selectedProjectName = selectedProject?.name ?? 'Not detected'
  const selectedProjectPath =
    selectedProject?.path ?? 'Choose workspace in Files/Workspace first.'

  useEffect(() => {
    setMissionHistory(loadMissionHistory())
  }, [])

  useEffect(() => {
    if (!projects.length) {
      setSelectedProjectId(null)
      return
    }
    setSelectedProjectId((current) =>
      current && projects.some((project) => project.id === current)
        ? current
        : (activeProject?.id ?? getFirstProject(projects)?.id ?? null),
    )
  }, [activeProject?.id, projects])

  const startProjectMission = (project: ProjectEntry) => {
    const draft = buildProjectMissionDraft(project)
    persistConductorLaunchIntent({
      source: 'projects',
      draft,
      projectOverride: {
        activeProjectId: project.id,
        activeProjectName: project.name,
        activeProjectPath: project.path,
        effectiveWorkingDirectory: project.path,
        contextPreview: project.contextPreview,
        status: project.status,
      },
    })
    void navigate({ to: '/conductor' })
  }

  const openMissionTrace = (entry: MissionHistoryEntry) => {
    const traceIntent = buildProjectMissionTraceIntent(entry)
    if (!traceIntent) return
    void navigate({
      to: '/conductor',
      search: { traceSessionKey: traceIntent.sessionKey },
    })
  }

  return (
    <div className="min-h-full bg-[var(--theme-bg)] px-4 py-6 text-primary-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-primary-200 bg-[var(--theme-card)] p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
                Project context
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-primary-950">
                Projects
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-600">
                Read-only registry for active workspaces. Slice 1 surfaces
                project root, git remote, branch, and local instruction files
                for future Conductor routing.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => void projectsQuery.refetch()}
              disabled={projectsQuery.isFetching}
            >
              {projectsQuery.isFetching ? 'Refreshing…' : 'Refresh'}
            </Button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                Projects
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary-950">
                {projects.length}
              </p>
            </div>
            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                Project missions
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary-950">
                {totalProjectMissions}
              </p>
              <p className="mt-1 text-xs text-primary-600">
                {selectedProjectMissionSummary
                  ? `${selectedProjectMissionSummary.completed} done · ${selectedProjectMissionSummary.failed} failed`
                  : 'No project selected'}
              </p>
            </div>
            <div className="rounded-2xl border border-primary-200 bg-primary-50 p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-500">
                Selected project
              </p>
              <p className="mt-2 truncate text-lg font-semibold text-primary-950">
                {selectedProjectName}
              </p>
              <p className="mt-1 truncate text-xs text-primary-600">
                {selectedProjectPath}
              </p>
            </div>
          </div>
          {selectedProject ? (
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-accent-500/25 bg-accent-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-950">
                  Project dashboard ready
                </p>
                <p className="mt-1 text-xs text-primary-600">
                  Review local context and open Conductor with a prefilled
                  mission draft for {selectedProjectName}.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => startProjectMission(selectedProject)}
                className="shrink-0 bg-accent-500 text-primary-950 hover:bg-accent-400"
              >
                Open in Conductor
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  strokeWidth={1.7}
                />
              </Button>
            </div>
          ) : null}
        </header>

        {projectsQuery.isLoading ? (
          <div className="rounded-3xl border border-primary-200 bg-[var(--theme-card)] p-8 text-sm text-primary-600">
            Loading projects…
          </div>
        ) : projectsQuery.error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-sm text-red-700">
            {projectsQuery.error instanceof Error
              ? projectsQuery.error.message
              : 'Failed to load projects'}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary-200 bg-[var(--theme-card)] p-8 text-center">
            <HugeiconsIcon
              icon={CodeIcon}
              size={28}
              strokeWidth={1.7}
              className="mx-auto text-primary-500"
            />
            <p className="mt-3 font-semibold text-primary-900">
              No projects detected
            </p>
            <p className="mt-1 text-sm text-primary-600">
              Add or select a workspace that contains git repos or files like
              README.md / package.json.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                history={missionHistory}
                selected={selectedProject?.id === project.id}
                onSelect={() => setSelectedProjectId(project.id)}
                onStartMission={() => startProjectMission(project)}
                onMakeActive={() => selectProjectMutation.mutate(project.id)}
                onOpenTrace={openMissionTrace}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
