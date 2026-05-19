import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/script-editor')({
  ssr: false,
  component: ScriptEditorRoute,
})

type SourceKind = 'Note' | 'URL' | 'File' | 'Web Result'

type Project = {
  title: string
  topic: string
  audience: string
  platform: string
  tone: string
  goal: string
  constraints: string
}

type ResearchSource = {
  id: string
  kind: SourceKind
  title: string
  locator: string
  rawText: string
  extractedFacts: Array<string>
  credibilityNote: string
  createdAt: string
}

type ResearchBrief = {
  distilledInsights: Array<string>
  claims: Array<string>
  angles: Array<string>
  audienceTensions: Array<string>
  citations: Array<string>
}

type ScriptCandidate = {
  id: string
  title: string
  angle: string
  tags: Array<string>
  beats: {
    hook: string
    setup: string
    escalation: string
    payoff: string
    callToActionOrLoop: string
    timingNotes: string
  }
  scorecard: Scorecard
  humanEditedText: string
  versionHistory: Array<string>
}

type Scorecard = {
  premiseStrength: number
  originality: number
  specificity: number
  clarity: number
  structure: number
  sourceGrounding: number
  hookQuality: number
  payoffQuality: number
  nonSlop: number
  flags: Array<string>
  rationale: string
}

type AppState = {
  project: Project
  sources: Array<ResearchSource>
  brief: ResearchBrief | null
  candidates: Array<ScriptCandidate>
  selectedCandidateId: string | null
  approvedMarkdown: string
}

const STORAGE_KEY = 'hermes.script-editor.v1'
const DEFAULT_BACKEND = 'http://127.0.0.1:8081/v1'

const defaultProject: Project = {
  title: 'Untitled Script Project',
  topic: '',
  audience: '',
  platform: 'TikTok',
  tone: 'smart, direct, high-retention',
  goal: '',
  constraints: '',
}

const emptyBrief: ResearchBrief = {
  distilledInsights: [],
  claims: [],
  angles: [],
  audienceTensions: [],
  citations: [],
}

function ScriptEditorRoute() {
  usePageTitle('Script Editor')
  return <ScriptEditorScreen />
}

function ScriptEditorScreen() {
  const [state, setState] = useStoredState()
  const [stage, setStage] = useState<'research' | 'generation' | 'review'>(
    'research',
  )
  const [sourceKind, setSourceKind] = useState<SourceKind>('Note')
  const [sourceTitle, setSourceTitle] = useState('')
  const [sourceLocator, setSourceLocator] = useState('')
  const [sourceText, setSourceText] = useState('')
  const [candidateCount, setCandidateCount] = useState(24)
  const [editorText, setEditorText] = useState('')
  const [reviewerNote, setReviewerNote] = useState('')
  const [backendStatus, setBackendStatus] = useState<string>('Not checked')
  const [backendReachable, setBackendReachable] = useState<boolean | null>(null)

  const selectedCandidate = useMemo(
    () =>
      state.candidates.find(
        (candidate) => candidate.id === state.selectedCandidateId,
      ) ??
      state.candidates.at(0) ??
      null,
    [state.candidates, state.selectedCandidateId],
  )

  useEffect(() => {
    if (selectedCandidate) setEditorText(displayText(selectedCandidate))
  }, [selectedCandidate?.id])

  const topCandidates = useMemo(
    () =>
      [...state.candidates]
        .sort((a, b) => totalScore(b.scorecard) - totalScore(a.scorecard))
        .slice(0, 10),
    [state.candidates],
  )

  function updateProject(patch: Partial<Project>) {
    setState((current) => ({
      ...current,
      project: { ...current.project, ...patch },
    }))
  }

  function addSource() {
    const text = normalize(sourceText)
    if (!text) return
    const source: ResearchSource = {
      id: crypto.randomUUID(),
      kind: sourceKind,
      title: sourceTitle.trim() || `${sourceKind} source`,
      locator: sourceLocator.trim(),
      rawText: text,
      extractedFacts: extractFacts(text),
      credibilityNote:
        sourceKind === 'Note'
          ? 'User-provided note'
          : sourceKind === 'URL'
            ? 'User-provided URL excerpt'
            : sourceKind === 'File'
              ? 'User-provided file excerpt'
              : 'Search result snippet',
      createdAt: new Date().toISOString(),
    }
    setState((current) => ({
      ...current,
      sources: [source, ...current.sources],
    }))
    setSourceTitle('')
    setSourceLocator('')
    setSourceText('')
  }

  async function fetchURL() {
    if (!sourceLocator.trim()) return
    try {
      const response = await fetch(sourceLocator.trim())
      const html = await response.text()
      setSourceKind('URL')
      setSourceText(plainText(html))
      if (!sourceTitle.trim()) setSourceTitle(new URL(sourceLocator).hostname)
    } catch (error) {
      setBackendStatus(
        error instanceof Error ? error.message : 'Could not fetch URL',
      )
      setBackendReachable(false)
    }
  }

  function buildBrief() {
    const facts = state.sources.flatMap((source) =>
      source.extractedFacts.length
        ? source.extractedFacts
        : extractFacts(source.rawText),
    )
    const topic = state.project.topic || state.project.title
    const brief: ResearchBrief = {
      distilledInsights: take(
        facts,
        8,
        `The strongest scripts should connect ${topic} to a concrete audience tension.`,
      ),
      claims: take(
        facts.map((fact, index) => {
          const source = state.sources[index % state.sources.length]
          return `${source.title}: ${fact}`
        }),
        10,
        `Use source-backed claims before making a strong assertion about ${topic}.`,
      ),
      angles: [
        `The common mistake people make with ${topic}`,
        `The counterintuitive truth about ${topic}`,
        `Why ${state.project.audience || 'the audience'} distrusts generic advice`,
        `A before/after transformation tied to ${state.project.goal || 'the project goal'}`,
      ],
      audienceTensions: [
        `${state.project.audience || 'The audience'} wants a fast answer without vague advice.`,
        'The script must feel useful, specific, and grounded.',
      ],
      citations: state.sources.map((source) =>
        [source.title, source.locator].filter(Boolean).join(' - '),
      ),
    }
    setState((current) => ({ ...current, brief }))
    setStage('generation')
  }

  async function checkBackend() {
    const startedAt = performance.now()
    try {
      const response = await fetch(`${DEFAULT_BACKEND}/models`)
      const elapsed = ((performance.now() - startedAt) / 1000).toFixed(2)
      setBackendReachable(response.ok)
      setBackendStatus(
        response.ok
          ? `Local Qwen endpoint responded in ${elapsed}s`
          : `Backend returned HTTP ${response.status}`,
      )
    } catch (error) {
      setBackendReachable(false)
      setBackendStatus(
        error instanceof Error ? error.message : 'Backend is not reachable',
      )
    }
  }

  function generateCandidates() {
    const brief = state.brief ?? emptyBrief
    const nextCandidates = Array.from({ length: candidateCount }, (_, index) =>
      makeCandidate(state.project, brief, index),
    )
    setState((current) => ({
      ...current,
      candidates: nextCandidates,
      selectedCandidateId: nextCandidates[0]?.id ?? null,
      approvedMarkdown: '',
    }))
    setStage('review')
  }

  function selectCandidate(candidate: ScriptCandidate) {
    setState((current) => ({
      ...current,
      selectedCandidateId: candidate.id,
      approvedMarkdown: '',
    }))
    setEditorText(displayText(candidate))
  }

  function saveRevision() {
    if (!selectedCandidate) return
    setState((current) => ({
      ...current,
      candidates: current.candidates.map((candidate) =>
        candidate.id === selectedCandidate.id
          ? {
              ...candidate,
              versionHistory: [
                ...candidate.versionHistory,
                displayText(candidate),
              ],
              humanEditedText: editorText,
            }
          : candidate,
      ),
    }))
  }

  function approveAndRender() {
    if (!selectedCandidate) return
    const approvedCandidate = {
      ...selectedCandidate,
      humanEditedText: editorText,
    }
    const markdown = renderMarkdown({
      project: state.project,
      candidate: approvedCandidate,
      brief: state.brief,
      sources: state.sources,
      reviewerNote,
    })
    setState((current) => ({ ...current, approvedMarkdown: markdown }))
  }

  return (
    <div className="min-h-full bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-5 py-5 lg:px-7">
        <header className="flex flex-col gap-4 border-b border-[var(--theme-border)] pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--theme-muted)]">
              Native Script Editor
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-normal">
              Research, generate, score, and approve short-form scripts
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span
              className={[
                'rounded-full border px-3 py-1',
                backendReachable === false
                  ? 'border-red-500/40 text-red-300'
                  : backendReachable
                    ? 'border-emerald-500/40 text-emerald-300'
                    : 'border-[var(--theme-border)] text-[var(--theme-muted)]',
              ].join(' ')}
            >
              {backendStatus}
            </span>
            <button className="script-editor-button" onClick={checkBackend}>
              Check Qwen
            </button>
          </div>
        </header>

        <nav className="grid grid-cols-3 overflow-hidden rounded-lg border border-[var(--theme-border)]">
          {(['research', 'generation', 'review'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStage(item)}
              className={[
                'px-3 py-2 text-sm font-medium capitalize transition-colors',
                stage === item
                  ? 'bg-[var(--theme-accent)] text-black'
                  : 'bg-[var(--theme-surface)] text-[var(--theme-muted)] hover:text-[var(--theme-text)]',
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </nav>

        {stage === 'research' ? (
          <ResearchStage
            project={state.project}
            sources={state.sources}
            sourceKind={sourceKind}
            sourceTitle={sourceTitle}
            sourceLocator={sourceLocator}
            sourceText={sourceText}
            brief={state.brief}
            onProjectChange={updateProject}
            onSourceKindChange={setSourceKind}
            onSourceTitleChange={setSourceTitle}
            onSourceLocatorChange={setSourceLocator}
            onSourceTextChange={setSourceText}
            onAddSource={addSource}
            onFetchURL={fetchURL}
            onBuildBrief={buildBrief}
          />
        ) : null}

        {stage === 'generation' ? (
          <GenerationStage
            candidateCount={candidateCount}
            sourcesCount={state.sources.length}
            brief={state.brief}
            candidatesCount={state.candidates.length}
            topTenCount={topCandidates.length}
            onCandidateCountChange={setCandidateCount}
            onGenerate={generateCandidates}
            onCheckBackend={checkBackend}
          />
        ) : null}

        {stage === 'review' ? (
          <ReviewStage
            candidates={topCandidates}
            selectedCandidate={selectedCandidate}
            editorText={editorText}
            reviewerNote={reviewerNote}
            approvedMarkdown={state.approvedMarkdown}
            onSelectCandidate={selectCandidate}
            onEditorTextChange={setEditorText}
            onReviewerNoteChange={setReviewerNote}
            onSaveRevision={saveRevision}
            onApproveAndRender={approveAndRender}
          />
        ) : null}
      </div>
    </div>
  )
}

function ResearchStage({
  project,
  sources,
  sourceKind,
  sourceTitle,
  sourceLocator,
  sourceText,
  brief,
  onProjectChange,
  onSourceKindChange,
  onSourceTitleChange,
  onSourceLocatorChange,
  onSourceTextChange,
  onAddSource,
  onFetchURL,
  onBuildBrief,
}: {
  project: Project
  sources: Array<ResearchSource>
  sourceKind: SourceKind
  sourceTitle: string
  sourceLocator: string
  sourceText: string
  brief: ResearchBrief | null
  onProjectChange: (patch: Partial<Project>) => void
  onSourceKindChange: (value: SourceKind) => void
  onSourceTitleChange: (value: string) => void
  onSourceLocatorChange: (value: string) => void
  onSourceTextChange: (value: string) => void
  onAddSource: () => void
  onFetchURL: () => void
  onBuildBrief: () => void
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
      <section className="script-editor-panel">
        <h2 className="script-editor-heading">Project</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Title"
            value={project.title}
            onChange={(title) => onProjectChange({ title })}
          />
          <Field
            label="Topic"
            value={project.topic}
            onChange={(topic) => onProjectChange({ topic })}
          />
          <Field
            label="Audience"
            value={project.audience}
            onChange={(audience) => onProjectChange({ audience })}
          />
          <Field
            label="Platform"
            value={project.platform}
            onChange={(platform) => onProjectChange({ platform })}
          />
          <Field
            label="Tone"
            value={project.tone}
            onChange={(tone) => onProjectChange({ tone })}
          />
          <Field
            label="Goal"
            value={project.goal}
            onChange={(goal) => onProjectChange({ goal })}
          />
          <label className="md:col-span-2">
            <span className="script-editor-label">Constraints</span>
            <textarea
              className="script-editor-input min-h-20"
              value={project.constraints}
              onChange={(event) =>
                onProjectChange({ constraints: event.target.value })
              }
            />
          </label>
        </div>
      </section>

      <section className="script-editor-panel">
        <h2 className="script-editor-heading">Research Input</h2>
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
            <label>
              <span className="script-editor-label">Kind</span>
              <select
                className="script-editor-input"
                value={sourceKind}
                onChange={(event) =>
                  onSourceKindChange(event.target.value as SourceKind)
                }
              >
                {(['Note', 'URL', 'File', 'Web Result'] as const).map(
                  (kind) => (
                    <option key={kind}>{kind}</option>
                  ),
                )}
              </select>
            </label>
            <Field
              label="Title"
              value={sourceTitle}
              onChange={onSourceTitleChange}
            />
          </div>
          <Field
            label="URL, file path, or locator"
            value={sourceLocator}
            onChange={onSourceLocatorChange}
          />
          <label>
            <span className="script-editor-label">Notes or excerpt</span>
            <textarea
              className="script-editor-input min-h-36"
              value={sourceText}
              onChange={(event) => onSourceTextChange(event.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button className="script-editor-button" onClick={onAddSource}>
              Add Source
            </button>
            <button
              className="script-editor-button-secondary"
              onClick={onFetchURL}
            >
              Fetch URL Text
            </button>
            <button
              className="script-editor-button"
              onClick={onBuildBrief}
              disabled={sources.length === 0}
            >
              Build Brief
            </button>
          </div>
        </div>
      </section>

      <section className="script-editor-panel xl:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="script-editor-heading">Research Brief</h2>
          <span className="text-sm text-[var(--theme-muted)]">
            {sources.length} sources
          </span>
        </div>
        {brief ? (
          <BriefGrid brief={brief} />
        ) : (
          <EmptyText text="Add sources and build a brief to create structured insights, claims, angles, tensions, and citations." />
        )}
      </section>

      <section className="script-editor-panel xl:col-span-2">
        <h2 className="script-editor-heading">Sources</h2>
        <div className="grid gap-3 lg:grid-cols-2">
          {sources.map((source) => (
            <article
              key={source.id}
              className="rounded-lg border border-[var(--theme-border)] bg-black/10 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{source.title}</h3>
                  <p className="text-xs text-[var(--theme-muted)]">
                    {source.kind} · {source.locator || 'local note'}
                  </p>
                </div>
                <span className="rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-muted)]">
                  {source.extractedFacts.length} facts
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--theme-muted)]">
                {source.rawText}
              </p>
              {source.extractedFacts.length ? (
                <ul className="mt-2 space-y-1 text-xs text-[var(--theme-muted)]">
                  {source.extractedFacts.slice(0, 2).map((fact) => (
                    <li key={fact}>- {fact}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
          {sources.length === 0 ? (
            <EmptyText text="No research sources yet." />
          ) : null}
        </div>
      </section>
    </div>
  )
}

function GenerationStage({
  candidateCount,
  sourcesCount,
  brief,
  candidatesCount,
  topTenCount,
  onCandidateCountChange,
  onGenerate,
  onCheckBackend,
}: {
  candidateCount: number
  sourcesCount: number
  brief: ResearchBrief | null
  candidatesCount: number
  topTenCount: number
  onCandidateCountChange: (value: number) => void
  onGenerate: () => void
  onCheckBackend: () => void
}) {
  return (
    <section className="script-editor-panel">
      <h2 className="script-editor-heading">Generation Run</h2>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <label>
            <span className="script-editor-label">
              Candidates: {candidateCount}
            </span>
            <input
              className="w-full accent-[var(--theme-accent)]"
              type="range"
              min={20}
              max={40}
              step={1}
              value={candidateCount}
              onChange={(event) =>
                onCandidateCountChange(Number(event.target.value))
              }
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              className="script-editor-button-secondary"
              onClick={onCheckBackend}
            >
              Check Local Qwen
            </button>
            <button className="script-editor-button" onClick={onGenerate}>
              Generate and Score
            </button>
          </div>
          <p className="max-w-2xl text-sm text-[var(--theme-muted)]">
            The web section runs the same planned workflow inside Hermes
            Workspace: generate a wide candidate set, score every draft, then
            show only the strongest ten for human review.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Metric label="Sources" value={sourcesCount} />
          <Metric label="Brief" value={brief ? 'Ready' : 'Needed'} />
          <Metric label="Scored" value={candidatesCount} />
          <Metric label="Surfaced" value={topTenCount} />
        </div>
      </div>
    </section>
  )
}

function ReviewStage({
  candidates,
  selectedCandidate,
  editorText,
  reviewerNote,
  approvedMarkdown,
  onSelectCandidate,
  onEditorTextChange,
  onReviewerNoteChange,
  onSaveRevision,
  onApproveAndRender,
}: {
  candidates: Array<ScriptCandidate>
  selectedCandidate: ScriptCandidate | null
  editorText: string
  reviewerNote: string
  approvedMarkdown: string
  onSelectCandidate: (candidate: ScriptCandidate) => void
  onEditorTextChange: (value: string) => void
  onReviewerNoteChange: (value: string) => void
  onSaveRevision: () => void
  onApproveAndRender: () => void
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
      <section className="script-editor-panel">
        <h2 className="script-editor-heading">Top 10 Review Board</h2>
        <div className="space-y-3">
          {candidates.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              className={[
                'block w-full rounded-lg border p-3 text-left transition-colors',
                selectedCandidate?.id === candidate.id
                  ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10'
                  : 'border-[var(--theme-border)] bg-black/10 hover:bg-white/5',
              ].join(' ')}
              onClick={() => onSelectCandidate(candidate)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{candidate.title}</h3>
                  <p className="mt-1 text-xs text-[var(--theme-muted)]">
                    {candidate.angle}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--theme-accent)] px-2 py-1 text-sm font-semibold text-black">
                  {totalScore(candidate.scorecard)}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-[var(--theme-muted)]">
                {candidate.scorecard.rationale}
              </p>
            </button>
          ))}
          {candidates.length === 0 ? (
            <EmptyText text="Generate candidates to populate the board." />
          ) : null}
        </div>
      </section>

      <section className="script-editor-panel">
        {selectedCandidate ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedCandidate.title}
                </h2>
                <p className="text-sm text-[var(--theme-muted)]">
                  {selectedCandidate.angle}
                </p>
              </div>
              <span className="rounded-full border border-[var(--theme-border)] px-3 py-1 text-sm">
                {totalScore(selectedCandidate.scorecard)}/90
              </span>
            </div>
            <textarea
              className="script-editor-input min-h-80 font-serif text-base"
              value={editorText}
              onChange={(event) => onEditorTextChange(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <button
                className="script-editor-button-secondary"
                onClick={onSaveRevision}
              >
                Save Revision
              </button>
              <button
                className="script-editor-button"
                onClick={onApproveAndRender}
              >
                Approve and Render
              </button>
            </div>
            <label>
              <span className="script-editor-label">Reviewer note</span>
              <textarea
                className="script-editor-input min-h-20"
                value={reviewerNote}
                onChange={(event) => onReviewerNoteChange(event.target.value)}
              />
            </label>
            <ScorecardView scorecard={selectedCandidate.scorecard} />
            {approvedMarkdown ? (
              <label>
                <span className="script-editor-label">Approved Markdown</span>
                <textarea
                  className="script-editor-input min-h-72 font-mono text-xs"
                  readOnly
                  value={approvedMarkdown}
                />
              </label>
            ) : null}
          </div>
        ) : (
          <EmptyText text="Select a generated script to edit." />
        )}
      </section>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label>
      <span className="script-editor-label">{label}</span>
      <input
        className="script-editor-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function BriefGrid({ brief }: { brief: ResearchBrief }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <BriefColumn title="Insights" items={brief.distilledInsights} />
      <BriefColumn title="Claims" items={brief.claims} />
      <BriefColumn title="Angles" items={brief.angles} />
      <BriefColumn title="Tensions" items={brief.audienceTensions} />
    </div>
  )
}

function BriefColumn({
  title,
  items,
}: {
  title: string
  items: Array<string>
}) {
  return (
    <div className="rounded-lg border border-[var(--theme-border)] bg-black/10 p-3">
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <ul className="space-y-1 text-sm text-[var(--theme-muted)]">
        {items.slice(0, 5).map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  )
}

function ScorecardView({ scorecard }: { scorecard: Scorecard }) {
  const rows = [
    ['Premise', scorecard.premiseStrength],
    ['Originality', scorecard.originality],
    ['Specificity', scorecard.specificity],
    ['Clarity', scorecard.clarity],
    ['Structure', scorecard.structure],
    ['Grounding', scorecard.sourceGrounding],
    ['Hook', scorecard.hookQuality],
    ['Payoff', scorecard.payoffQuality],
    ['Non-slop', scorecard.nonSlop],
  ] as const
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="rounded-lg border border-[var(--theme-border)] bg-black/10 p-2 text-sm"
        >
          <span className="text-[var(--theme-muted)]">{label}</span>
          <span className="float-right font-semibold">{value}</span>
        </div>
      ))}
      {scorecard.flags.length ? (
        <p className="sm:col-span-3 text-sm text-[var(--theme-muted)]">
          Flags: {scorecard.flags.join(', ')}
        </p>
      ) : null}
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[var(--theme-border)] bg-black/10 p-3">
      <p className="text-xs text-[var(--theme-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  )
}

function EmptyText({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--theme-border)] p-4 text-sm text-[var(--theme-muted)]">
      {text}
    </div>
  )
}

function useStoredState() {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window === 'undefined') return initialState()
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored
        ? { ...initialState(), ...JSON.parse(stored) }
        : initialState()
    } catch {
      return initialState()
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return [state, setState] as const
}

function initialState(): AppState {
  return {
    project: defaultProject,
    sources: [],
    brief: null,
    candidates: [],
    selectedCandidateId: null,
    approvedMarkdown: '',
  }
}

function makeCandidate(
  project: Project,
  brief: ResearchBrief,
  index: number,
): ScriptCandidate {
  const angle =
    brief.angles[index % Math.max(1, brief.angles.length)] ??
    `A sharper angle on ${project.topic || 'this topic'}`
  const claim =
    brief.claims[index % Math.max(1, brief.claims.length)] ??
    'Use a concrete proof point before making the claim.'
  const hooks = [
    `Stop making ${project.topic || 'this'} sound easier than it is.`,
    'The obvious answer is the trap.',
    'Here is the detail that changes the whole script.',
    'Most people miss the part that actually earns trust.',
  ]
  const beats = {
    hook: hooks[index % hooks.length],
    setup: `${project.audience || 'The audience'} usually hears the surface version: ${angle}.`,
    escalation: `But the proof point that changes the story is: ${claim}`,
    payoff:
      'So the stronger script names the tension first, shows the evidence second, and ends with one concrete decision.',
    callToActionOrLoop:
      index % 2 === 0
        ? 'Save this before you write the next version.'
        : 'Now replay the hook and notice what it promised.',
    timingNotes:
      index % 3 === 0
        ? '35-45 seconds, tight pacing.'
        : '60-75 seconds with one proof visual.',
  }
  const candidate: ScriptCandidate = {
    id: crypto.randomUUID(),
    title: `Angle ${index + 1}: ${angle.slice(0, 44)}`,
    angle,
    tags: [project.platform, index % 2 === 0 ? 'source-led' : 'high-tension'],
    beats,
    scorecard: {
      premiseStrength: 0,
      originality: 0,
      specificity: 0,
      clarity: 0,
      structure: 0,
      sourceGrounding: 0,
      hookQuality: 0,
      payoffQuality: 0,
      nonSlop: 0,
      flags: [],
      rationale: '',
    },
    humanEditedText: '',
    versionHistory: [],
  }
  return { ...candidate, scorecard: scoreCandidate(candidate, brief) }
}

function scoreCandidate(
  candidate: ScriptCandidate,
  brief: ResearchBrief,
): Scorecard {
  const text = displayText(candidate)
  const lower = text.toLowerCase()
  const flags: Array<string> = []
  if (
    [
      'game changer',
      'secret',
      'unlock',
      'you need to know',
      "in today's world",
    ].some((term) => lower.includes(term))
  )
    flags.push('generic phrasing')
  if (text.length < 220) flags.push('weak premise')
  if (
    !brief.claims.some((claim) =>
      claim
        .split(' ')
        .some((word) => word.length > 6 && lower.includes(word.toLowerCase())),
    )
  )
    flags.push('unsupported claims')
  if (
    ['really', 'basically', 'actually', 'literally', 'very'].filter((term) =>
      lower.includes(term),
    ).length >= 3
  )
    flags.push('filler language')
  const sourceGrounding = flags.includes('unsupported claims') ? 4 : 8
  return {
    premiseStrength: clamp(7 - (flags.includes('weak premise') ? 2 : 0)),
    originality: clamp(7 - (flags.includes('generic phrasing') ? 2 : 0)),
    specificity: clamp(5 + (sourceGrounding >= 8 ? 3 : 0)),
    clarity: 8,
    structure: 8,
    sourceGrounding,
    hookQuality: clamp(
      candidate.beats.hook.includes('?') || lower.includes('stop') ? 8 : 6,
    ),
    payoffQuality: 7,
    nonSlop: clamp(9 - flags.length),
    flags,
    rationale: flags.length
      ? `Needs attention on: ${flags.join(', ')}.`
      : 'Specific, structured, and grounded enough to reach human review.',
  }
}

function renderMarkdown({
  project,
  candidate,
  brief,
  sources,
  reviewerNote,
}: {
  project: Project
  candidate: ScriptCandidate
  brief: ResearchBrief | null
  sources: Array<ResearchSource>
  reviewerNote: string
}) {
  return [
    `# ${candidate.title}`,
    `> v1 approved script export`,
    `## Project\n- Topic: ${project.topic}\n- Audience: ${project.audience}\n- Platform: ${project.platform}\n- Tone: ${project.tone}\n- Goal: ${project.goal}`,
    reviewerNote.trim() ? `## Reviewer Note\n${reviewerNote.trim()}` : '',
    `## Script\n${displayText(candidate)}`,
    `## Scorecard\n- Total: ${totalScore(candidate.scorecard)}/90\n- Flags: ${candidate.scorecard.flags.join(', ') || 'None'}\n\n${candidate.scorecard.rationale}`,
    brief
      ? `## Research Brief\n${brief.claims.map((claim) => `- ${claim}`).join('\n')}`
      : '',
    `## Sources\n${sources.map((source) => `- ${source.title}${source.locator ? ` - ${source.locator}` : ''}`).join('\n') || '- None'}`,
  ]
    .filter(Boolean)
    .join('\n\n')
}

function displayText(candidate: ScriptCandidate) {
  return (
    candidate.humanEditedText.trim() ||
    [
      candidate.beats.hook,
      candidate.beats.setup,
      candidate.beats.escalation,
      candidate.beats.payoff,
      candidate.beats.callToActionOrLoop,
    ]
      .filter(Boolean)
      .join('\n\n')
  )
}

function extractFacts(text: string) {
  return normalize(text)
    .split(/[.!?\n]/)
    .map((item) => item.trim())
    .filter((item) => item.length > 28)
    .sort((a, b) => factScore(b) - factScore(a))
    .slice(0, 8)
    .map((item) => (/[.!?]$/.test(item) ? item : `${item}.`))
}

function factScore(text: string) {
  const lower = text.toLowerCase()
  let score = 0
  for (const term of [
    'according to',
    'reported',
    'found',
    'shows',
    'study',
    'survey',
    'because',
    'increased',
    'decreased',
  ]) {
    if (lower.includes(term)) score += 2
  }
  if (/\d/.test(text)) score += 3
  if (/%|\$/.test(text)) score += 2
  return score
}

function totalScore(scorecard: Scorecard) {
  return (
    scorecard.premiseStrength +
    scorecard.originality +
    scorecard.specificity +
    scorecard.clarity +
    scorecard.structure +
    scorecard.sourceGrounding +
    scorecard.hookQuality +
    scorecard.payoffQuality +
    scorecard.nonSlop
  )
}

function normalize(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
}

function plainText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .slice(0, 20_000)
    .trim()
}

function take(values: Array<string>, count: number, fallback: string) {
  const cleaned = values.map((value) => value.trim()).filter(Boolean)
  return cleaned.length ? cleaned.slice(0, count) : [fallback]
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 10)
}
