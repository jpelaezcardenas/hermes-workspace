import Foundation
import ScriptEditorCore

@MainActor
final class AppViewModel: ObservableObject {
    @Published var snapshot = ScriptEditorSnapshot()
    @Published var selectedProjectId: UUID?
    @Published var selectedCandidateId: UUID?
    @Published var projectDraft = Project()
    @Published var sourceTitle = ""
    @Published var sourceLocator = ""
    @Published var sourceBody = ""
    @Published var sourceKind: SourceKind = .note
    @Published var searchQuery = ""
    @Published var candidateCount = 24.0
    @Published var editorText = ""
    @Published var chatInput = ""
    @Published var isBusy = false
    @Published var status = "Ready"
    @Published var lastError: String?

    let configuration = AIBackendConfiguration()
    private var database: LocalScriptDatabase?
    private let webResearch = WebResearchService()
    private lazy var workflow = WorkflowEngine(ai: OpenAICompatibleClient(configuration: configuration))

    var selectedProject: Project? {
        guard let selectedProjectId else { return nil }
        return snapshot.projects.first { $0.id == selectedProjectId }
    }

    var selectedBrief: ResearchBrief? {
        guard let selectedProjectId else { return nil }
        return snapshot.briefs.first { $0.projectId == selectedProjectId }
    }

    var projectSources: [ResearchSource] {
        guard let selectedProjectId else { return [] }
        return snapshot.sources
            .filter { $0.projectId == selectedProjectId }
            .sorted { $0.createdAt > $1.createdAt }
    }

    var projectCandidates: [ScriptCandidate] {
        guard let selectedProjectId else { return [] }
        return snapshot.candidates
            .filter { $0.projectId == selectedProjectId && $0.scorecard != nil }
            .sorted { ($0.scorecard?.total ?? 0, $0.createdAt) > ($1.scorecard?.total ?? 0, $1.createdAt) }
    }

    var topCandidates: [ScriptCandidate] {
        Array(projectCandidates.prefix(10))
    }

    var selectedCandidate: ScriptCandidate? {
        guard let selectedCandidateId else { return topCandidates.first }
        return snapshot.candidates.first { $0.id == selectedCandidateId }
    }

    var selectedMessages: [AgentMessage] {
        guard let candidate = selectedCandidate else { return [] }
        return snapshot.agentMessages
            .filter { $0.candidateId == candidate.id }
            .sorted { $0.createdAt < $1.createdAt }
    }

    func load() {
        Task {
            let db = await LocalScriptDatabase()
            database = db
            snapshot = await db.readSnapshot()
            if selectedProjectId == nil {
                selectProject(snapshot.projects.first)
            }
            if snapshot.projects.isEmpty {
                createProject()
            }
        }
    }

    func createProject() {
        let project = Project(title: "Untitled Script Project")
        Task { await saveProject(project, selectAfterSave: true) }
    }

    func selectProject(_ project: Project?) {
        guard let project else { return }
        selectedProjectId = project.id
        projectDraft = project
        selectedCandidateId = topCandidates.first?.id
        editorText = selectedCandidate?.displayText ?? ""
        lastError = nil
    }

    func saveProjectDraft() {
        Task { await saveProject(projectDraft, selectAfterSave: true) }
    }

    func addSource() {
        guard let selectedProjectId, !sourceBody.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        setBusy("Saving source...")
        let source = ResearchSource(
            projectId: selectedProjectId,
            kind: sourceKind,
            title: sourceTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "Untitled source" : sourceTitle,
            locator: sourceLocator,
            rawText: sourceBody
        )
        Task {
            do {
                try await database?.addSource(source)
                await refresh(status: "Source saved")
                sourceTitle = ""
                sourceLocator = ""
                sourceBody = ""
            } catch {
                show(error)
            }
        }
    }

    func fetchURLSource() {
        guard let selectedProjectId, let url = URL(string: sourceLocator), !sourceLocator.isEmpty else { return }
        setBusy("Fetching URL...")
        Task {
            do {
                let text = try await webResearch.fetchURL(url)
                let source = ResearchSource(
                    projectId: selectedProjectId,
                    kind: .url,
                    title: sourceTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? url.host ?? url.absoluteString : sourceTitle,
                    locator: url.absoluteString,
                    rawText: text,
                    credibilityNote: "Fetched directly from URL"
                )
                try await database?.addSource(source)
                await refresh(status: "URL source added")
                sourceTitle = ""
                sourceLocator = ""
                sourceBody = ""
            } catch {
                show(error)
            }
        }
    }

    func runSearch() {
        guard let selectedProjectId, !searchQuery.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        setBusy("Searching...")
        Task {
            do {
                let results = try await webResearch.search(query: searchQuery, limit: 5)
                for result in results {
                    let source = ResearchSource(
                        projectId: selectedProjectId,
                        kind: .webResult,
                        title: result.title,
                        locator: result.url,
                        rawText: result.snippet,
                        credibilityNote: "Search result snippet"
                    )
                    try await database?.addSource(source)
                }
                await refresh(status: "Search results added")
            } catch {
                show(error)
            }
        }
    }

    func buildBrief() {
        guard let project = selectedProject else { return }
        setBusy("Building research brief...")
        let sources = projectSources
        Task {
            let brief = await workflow.buildResearchBrief(project: project, sources: sources)
            do {
                try await database?.saveBrief(brief)
                await refresh(status: "Research brief ready")
            } catch {
                show(error)
            }
        }
    }

    func generateAndScore() {
        guard let project = selectedProject else { return }
        let brief = selectedBrief ?? ResearchBrief(projectId: project.id)
        setBusy("Generating and scoring candidates...")
        Task {
            let (run, candidates) = await workflow.generateCandidates(
                project: project,
                brief: brief,
                count: Int(candidateCount.rounded()),
                model: configuration.model
            )
            let scored = await workflow.scoreCandidates(candidates, brief: brief)
            do {
                try await database?.saveRun(run, candidates: scored)
                await refresh(status: "Top 10 review board ready")
                selectedCandidateId = topCandidates.first?.id
                editorText = selectedCandidate?.displayText ?? ""
            } catch {
                show(error)
            }
        }
    }

    func selectCandidate(_ candidate: ScriptCandidate) {
        selectedCandidateId = candidate.id
        editorText = candidate.displayText
        lastError = nil
    }

    func saveRevision() {
        guard var candidate = selectedCandidate else { return }
        candidate.versionHistory.append(candidate.displayText)
        candidate.humanEditedText = editorText
        setBusy("Saving revision...")
        Task {
            do {
                try await database?.updateCandidate(candidate)
                await refresh(status: "Revision saved")
            } catch {
                show(error)
            }
        }
    }

    func askAgent() {
        guard let candidate = selectedCandidate, let brief = selectedBrief, !chatInput.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        let userText = chatInput
        chatInput = ""
        setBusy("Asking revision agent...")
        Task {
            do {
                try await database?.addAgentMessage(AgentMessage(candidateId: candidate.id, role: "human", content: userText))
                let freshSnapshot = await database?.readSnapshot()
                let freshHistory = freshSnapshot?.agentMessages.filter { $0.candidateId == candidate.id } ?? selectedMessages
                let response = await workflow.revise(candidate: candidate, brief: brief, userMessage: userText, history: freshHistory)
                try await database?.addAgentMessage(AgentMessage(candidateId: candidate.id, role: "agent", content: response))
                await refresh(status: "Agent suggestion ready")
            } catch {
                show(error)
            }
        }
    }

    private func saveProject(_ project: Project, selectAfterSave: Bool) async {
        setBusy("Saving project...")
        do {
            let saved = try await database?.upsertProject(project)
            await refresh(status: "Project saved")
            if selectAfterSave, let saved {
                selectProject(saved)
            }
        } catch {
            show(error)
        }
    }

    private func refresh(status: String) async {
        snapshot = await database?.readSnapshot() ?? ScriptEditorSnapshot()
        self.status = status
        isBusy = false
    }

    private func setBusy(_ message: String) {
        isBusy = true
        status = message
        lastError = nil
    }

    private func show(_ error: Error) {
        lastError = error.localizedDescription
        status = "Needs attention"
        isBusy = false
    }
}
