import ScriptEditorCore
import SwiftUI

struct ContentView: View {
    @StateObject private var model = AppViewModel()
    @State private var stage = Stage.research

    var body: some View {
        NavigationSplitView {
            sidebar
                .navigationSplitViewColumnWidth(min: 240, ideal: 280)
        } content: {
            workflow
                .navigationSplitViewColumnWidth(min: 480, ideal: 620)
        } detail: {
            ReviewEditor(model: model)
                .navigationSplitViewColumnWidth(min: 420, ideal: 560)
        }
        .onAppear { model.load() }
        .toolbar {
            ToolbarItemGroup {
                Label(model.configuration.model, systemImage: "cpu")
                    .labelStyle(.titleAndIcon)
                if model.isBusy {
                    ProgressView()
                        .controlSize(.small)
                }
            }
        }
    }

    private var sidebar: some View {
        VStack(spacing: 0) {
            List(selection: $model.selectedProjectId) {
                ForEach(model.snapshot.projects) { project in
                    Button {
                        model.selectProject(project)
                    } label: {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(project.title)
                                .font(.headline)
                                .lineLimit(1)
                            Text(project.topic.isEmpty ? "No topic yet" : project.topic)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .lineLimit(2)
                        }
                    }
                    .buttonStyle(.plain)
                    .tag(project.id)
                }
            }
            .listStyle(.sidebar)

            Button {
                model.createProject()
            } label: {
                Label("New Project", systemImage: "plus")
                    .frame(maxWidth: .infinity)
            }
            .padding()
        }
    }

    private var workflow: some View {
        VStack(spacing: 0) {
            Picker("Stage", selection: $stage) {
                ForEach(Stage.allCases) { stage in
                    Label(stage.title, systemImage: stage.symbol).tag(stage)
                }
            }
            .pickerStyle(.segmented)
            .padding()

            Divider()

            Group {
                switch stage {
                case .research:
                    ResearchWorkspace(model: model)
                case .generation:
                    GenerationWorkspace(model: model)
                case .review:
                    ReviewBoard(model: model)
                }
            }
        }
        .overlay(alignment: .bottomLeading) {
            StatusBar(status: model.status, error: model.lastError)
        }
    }
}

private enum Stage: String, CaseIterable, Identifiable {
    case research
    case generation
    case review

    var id: String { rawValue }

    var title: String {
        switch self {
        case .research: "Research"
        case .generation: "Generation"
        case .review: "Review"
        }
    }

    var symbol: String {
        switch self {
        case .research: "doc.text.magnifyingglass"
        case .generation: "sparkles"
        case .review: "checklist.checked"
        }
    }
}

private struct ResearchWorkspace: View {
    @ObservedObject var model: AppViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                projectFields
                Divider()
                sourceInput
                Divider()
                briefSection
                sourcesList
            }
            .padding(22)
        }
    }

    private var projectFields: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionTitle("Project Setup", systemImage: "slider.horizontal.3")
            TextField("Title", text: $model.projectDraft.title)
                .textFieldStyle(.roundedBorder)
            TextField("Topic", text: $model.projectDraft.topic)
                .textFieldStyle(.roundedBorder)
            HStack {
                TextField("Audience", text: $model.projectDraft.audience)
                    .textFieldStyle(.roundedBorder)
                Picker("Platform", selection: $model.projectDraft.platform) {
                    ForEach(Platform.allCases) { platform in
                        Text(platform.rawValue).tag(platform)
                    }
                }
                .frame(width: 190)
            }
            HStack {
                TextField("Tone", text: $model.projectDraft.tone)
                    .textFieldStyle(.roundedBorder)
                TextField("Goal", text: $model.projectDraft.goal)
                    .textFieldStyle(.roundedBorder)
            }
            TextField("Constraints", text: $model.projectDraft.constraints, axis: .vertical)
                .lineLimit(2...4)
                .textFieldStyle(.roundedBorder)
            Button {
                model.saveProjectDraft()
            } label: {
                Label("Save Project", systemImage: "square.and.arrow.down")
            }
        }
    }

    private var sourceInput: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionTitle("Research Inputs", systemImage: "tray.and.arrow.down")
            HStack {
                Picker("Type", selection: $model.sourceKind) {
                    ForEach(SourceKind.allCases) { kind in
                        Text(kind.rawValue).tag(kind)
                    }
                }
                TextField("Source title", text: $model.sourceTitle)
                    .textFieldStyle(.roundedBorder)
            }
            TextField("URL, file path, or source locator", text: $model.sourceLocator)
                .textFieldStyle(.roundedBorder)
            TextField("Paste notes, excerpts, or fetched content", text: $model.sourceBody, axis: .vertical)
                .lineLimit(7...12)
                .textFieldStyle(.roundedBorder)
            HStack {
                Button { model.addSource() } label: {
                    Label("Add Notes", systemImage: "text.badge.plus")
                }
                Button { model.fetchURLSource() } label: {
                    Label("Fetch URL", systemImage: "link")
                }
                Spacer()
            }
            HStack {
                TextField("Search query", text: $model.searchQuery)
                    .textFieldStyle(.roundedBorder)
                Button { model.runSearch() } label: {
                    Label("Search", systemImage: "magnifyingglass")
                }
            }
        }
    }

    private var briefSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                SectionTitle("Research Brief", systemImage: "doc.plaintext")
                Spacer()
                Button { model.buildBrief() } label: {
                    Label("Build Brief", systemImage: "wand.and.stars")
                }
                .disabled(model.projectSources.isEmpty)
            }
            if let brief = model.selectedBrief {
                BriefGrid(brief: brief)
            } else {
                EmptyState(text: "Add sources, then build a structured research brief with citations.")
            }
        }
    }

    private var sourcesList: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionTitle("Sources", systemImage: "books.vertical")
            ForEach(model.projectSources) { source in
                SourceRow(source: source)
            }
            if model.projectSources.isEmpty {
                EmptyState(text: "No research sources yet.")
            }
        }
    }
}

private struct GenerationWorkspace: View {
    @ObservedObject var model: AppViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                SectionTitle("Generation Run", systemImage: "sparkles")
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Candidates")
                        Slider(value: $model.candidateCount, in: 20...40, step: 1)
                        Text("\(Int(model.candidateCount))")
                            .monospacedDigit()
                            .frame(width: 34, alignment: .trailing)
                    }
                    HStack {
                        Label("Default backend", systemImage: "cpu")
                        Text(model.configuration.baseURL.absoluteString)
                            .foregroundStyle(.secondary)
                        Text(model.configuration.model)
                            .foregroundStyle(.secondary)
                    }
                    Button {
                        model.generateAndScore()
                    } label: {
                        Label("Generate and Score", systemImage: "play.fill")
                    }
                    .disabled(model.selectedProject == nil)
                }

                Divider()

                SectionTitle("Run Output", systemImage: "chart.bar.doc.horizontal")
                MetricsRow(
                    sources: model.projectSources.count,
                    briefReady: model.selectedBrief != nil,
                    candidates: model.projectCandidates.count,
                    topTen: model.topCandidates.count
                )
                Text("The review board surfaces only the ten highest-scored scripts. Lower-scoring drafts remain stored locally for auditing and reruns.")
                    .font(.callout)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .padding(22)
        }
    }
}

private struct ReviewBoard: View {
    @ObservedObject var model: AppViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                SectionTitle("Top 10 Review Board", systemImage: "rosette")
                if model.topCandidates.isEmpty {
                    EmptyState(text: "Generate and score candidates to populate the board.")
                }
                ForEach(model.topCandidates) { candidate in
                    CandidateRow(
                        candidate: candidate,
                        selected: candidate.id == model.selectedCandidate?.id
                    ) {
                        model.selectCandidate(candidate)
                    }
                }
            }
            .padding(18)
        }
    }
}

private struct ReviewEditor: View {
    @ObservedObject var model: AppViewModel

    var body: some View {
        VStack(spacing: 0) {
            if let candidate = model.selectedCandidate {
                editor(candidate)
            } else {
                EmptyState(text: "Select a top script to edit with the revision agent.")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
    }

    private func editor(_ candidate: ScriptCandidate) -> some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(candidate.title)
                                .font(.title3.bold())
                            Text(candidate.angle)
                                .font(.callout)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        ScorePill(score: candidate.scorecard?.total ?? 0)
                    }

                    TextEditor(text: $model.editorText)
                        .font(.system(.body, design: .serif))
                        .scrollContentBackground(.hidden)
                        .padding(10)
                        .frame(minHeight: 270)
                        .background(.regularMaterial)
                        .clipShape(RoundedRectangle(cornerRadius: 8))

                    HStack {
                        Button { model.saveRevision() } label: {
                            Label("Save Revision", systemImage: "square.and.arrow.down")
                        }
                        Spacer()
                        Text("\(candidate.versionHistory.count) saved versions")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    if let scorecard = candidate.scorecard {
                        ScorecardView(scorecard: scorecard)
                    }

                    AgentChat(model: model)
                }
                .padding(22)
            }
        }
    }
}

private struct AgentChat: View {
    @ObservedObject var model: AppViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionTitle("Revision Agent", systemImage: "bubble.left.and.text.bubble.right")
            VStack(alignment: .leading, spacing: 10) {
                ForEach(model.selectedMessages) { message in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(message.role == "human" ? "You" : "Agent")
                            .font(.caption.bold())
                            .foregroundStyle(message.role == "human" ? .primary : .blue)
                        Text(message.content)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(.thinMaterial)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                }
                if model.selectedMessages.isEmpty {
                    EmptyState(text: "Ask for stronger hooks, tighter wording, alternate endings, or source-grounded improvements.")
                }
            }
            HStack(alignment: .bottom) {
                TextField("Ask for a revision suggestion", text: $model.chatInput, axis: .vertical)
                    .lineLimit(2...5)
                    .textFieldStyle(.roundedBorder)
                Button { model.askAgent() } label: {
                    Image(systemName: "paperplane.fill")
                }
                .help("Send")
                .disabled(model.chatInput.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }
        }
    }
}

private struct SectionTitle: View {
    let title: String
    let systemImage: String

    init(_ title: String, systemImage: String) {
        self.title = title
        self.systemImage = systemImage
    }

    var body: some View {
        Label(title, systemImage: systemImage)
            .font(.headline)
    }
}

private struct BriefGrid: View {
    let brief: ResearchBrief

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 220), spacing: 12)], alignment: .leading, spacing: 12) {
            BriefColumn(title: "Insights", items: brief.distilledInsights)
            BriefColumn(title: "Claims", items: brief.claims)
            BriefColumn(title: "Angles", items: brief.angles)
            BriefColumn(title: "Tensions", items: brief.audienceTensions)
        }
    }
}

private struct BriefColumn: View {
    let title: String
    let items: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline.bold())
            ForEach(items.prefix(5), id: \.self) { item in
                Text("• \(item)")
                    .font(.caption)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .topLeading)
        .background(.thinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

private struct SourceRow: View {
    let source: ResearchSource

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                Text(source.title)
                    .font(.subheadline.bold())
                    .lineLimit(1)
                Spacer()
                Text(source.kind.rawValue)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            Text(source.locator)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(1)
            Text(source.rawText)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(3)
        }
        .padding(10)
        .background(.thinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

private struct CandidateRow: View {
    let candidate: ScriptCandidate
    let selected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 8) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 3) {
                        Text(candidate.title)
                            .font(.headline)
                            .lineLimit(2)
                        Text(candidate.angle)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(2)
                    }
                    Spacer()
                    ScorePill(score: candidate.scorecard?.total ?? 0)
                }
                Text(candidate.scorecard?.rationale ?? "Awaiting score")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
                HStack {
                    ForEach((candidate.scorecard?.flags ?? []).prefix(3), id: \.self) { flag in
                        Text(flag)
                            .font(.caption2)
                            .padding(.horizontal, 7)
                            .padding(.vertical, 3)
                            .background(Color.secondary.opacity(0.12))
                            .clipShape(Capsule())
                    }
                    Spacer()
                }
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(selected ? Color.accentColor.opacity(0.13) : Color(nsColor: .controlBackgroundColor))
            .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .buttonStyle(.plain)
    }
}

private struct ScorecardView: View {
    let scorecard: Scorecard

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionTitle("Scorecard", systemImage: "gauge.with.dots.needle.67percent")
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 10)], alignment: .leading, spacing: 10) {
                Metric("Premise", scorecard.premiseStrength)
                Metric("Originality", scorecard.originality)
                Metric("Specificity", scorecard.specificity)
                Metric("Clarity", scorecard.clarity)
                Metric("Structure", scorecard.structure)
                Metric("Grounding", scorecard.sourceGrounding)
                Metric("Hook", scorecard.hookQuality)
                Metric("Payoff", scorecard.payoffQuality)
                Metric("Non-slop", scorecard.nonSlop)
            }
            Text(scorecard.rationale)
                .font(.callout)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

private struct Metric: View {
    let title: String
    let value: Int

    init(_ title: String, _ value: Int) {
        self.title = title
        self.value = value
    }

    var body: some View {
        HStack {
            Text(title)
                .lineLimit(1)
            Spacer()
            Text("\(value)")
                .monospacedDigit()
                .foregroundStyle(value >= 7 ? .green : value >= 4 ? .orange : .red)
        }
        .font(.caption)
        .padding(8)
        .background(.thinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

private struct ScorePill: View {
    let score: Int

    var body: some View {
        Text("\(score)")
            .font(.headline.monospacedDigit())
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(score >= 68 ? .green.opacity(0.18) : .orange.opacity(0.18))
            .clipShape(Capsule())
            .help("Total rubric score")
    }
}

private struct MetricsRow: View {
    let sources: Int
    let briefReady: Bool
    let candidates: Int
    let topTen: Int

    var body: some View {
        HStack(spacing: 12) {
            MetricTile(title: "Sources", value: "\(sources)")
            MetricTile(title: "Brief", value: briefReady ? "Ready" : "Needed")
            MetricTile(title: "Scored", value: "\(candidates)")
            MetricTile(title: "Surfaced", value: "\(topTen)")
        }
    }
}

private struct MetricTile: View {
    let title: String
    let value: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(value)
                .font(.title3.bold())
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(.thinMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

private struct EmptyState: View {
    let text: String

    var body: some View {
        Text(text)
            .font(.callout)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(14)
            .background(Color.secondary.opacity(0.08))
            .clipShape(RoundedRectangle(cornerRadius: 8))
    }
}

private struct StatusBar: View {
    let status: String
    let error: String?

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: error == nil ? "checkmark.circle" : "exclamationmark.triangle")
            Text(error ?? status)
                .lineLimit(2)
        }
        .font(.caption)
        .padding(.horizontal, 10)
        .padding(.vertical, 7)
        .background(.regularMaterial)
        .clipShape(Capsule())
        .padding(12)
    }
}
