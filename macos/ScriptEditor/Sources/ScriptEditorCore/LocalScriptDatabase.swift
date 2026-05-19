import Foundation

public struct ScriptEditorSnapshot: Codable, Equatable {
    public var projects: [Project]
    public var sources: [ResearchSource]
    public var briefs: [ResearchBrief]
    public var runs: [GenerationRun]
    public var candidates: [ScriptCandidate]
    public var agentMessages: [AgentMessage]

    public init(
        projects: [Project] = [],
        sources: [ResearchSource] = [],
        briefs: [ResearchBrief] = [],
        runs: [GenerationRun] = [],
        candidates: [ScriptCandidate] = [],
        agentMessages: [AgentMessage] = []
    ) {
        self.projects = projects
        self.sources = sources
        self.briefs = briefs
        self.runs = runs
        self.candidates = candidates
        self.agentMessages = agentMessages
    }
}

public actor LocalScriptDatabase {
    public let fileURL: URL
    private var snapshot: ScriptEditorSnapshot

    public init(fileURL: URL? = nil) async {
        let resolvedURL = fileURL ?? Self.defaultDatabaseURL()
        self.fileURL = resolvedURL
        self.snapshot = Self.load(from: resolvedURL)
    }

    public static func defaultDatabaseURL() -> URL {
        let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
            ?? URL(fileURLWithPath: NSTemporaryDirectory())
        return base
            .appendingPathComponent("NativeScriptEditor", isDirectory: true)
            .appendingPathComponent("script-editor-db.json")
    }

    public func readSnapshot() -> ScriptEditorSnapshot {
        snapshot
    }

    @discardableResult
    public func upsertProject(_ project: Project) async throws -> Project {
        var next = project
        next.updatedAt = Date()
        if let index = snapshot.projects.firstIndex(where: { $0.id == project.id }) {
            snapshot.projects[index] = next
        } else {
            snapshot.projects.append(next)
        }
        try persist()
        return next
    }

    @discardableResult
    public func addSource(_ source: ResearchSource) async throws -> ResearchSource {
        snapshot.sources.append(source)
        try persist()
        return source
    }

    public func saveBrief(_ brief: ResearchBrief) async throws {
        if let index = snapshot.briefs.lastIndex(where: { $0.projectId == brief.projectId }) {
            snapshot.briefs[index] = brief
        } else {
            snapshot.briefs.append(brief)
        }
        try persist()
    }

    public func saveRun(_ run: GenerationRun, candidates: [ScriptCandidate]) async throws {
        if let index = snapshot.runs.firstIndex(where: { $0.id == run.id }) {
            snapshot.runs[index] = run
        } else {
            snapshot.runs.append(run)
        }
        for candidate in candidates {
            if let index = snapshot.candidates.firstIndex(where: { $0.id == candidate.id }) {
                snapshot.candidates[index] = candidate
            } else {
                snapshot.candidates.append(candidate)
            }
        }
        try persist()
    }

    public func updateCandidate(_ candidate: ScriptCandidate) async throws {
        if let index = snapshot.candidates.firstIndex(where: { $0.id == candidate.id }) {
            snapshot.candidates[index] = candidate
        } else {
            snapshot.candidates.append(candidate)
        }
        try persist()
    }

    public func addAgentMessage(_ message: AgentMessage) async throws {
        snapshot.agentMessages.append(message)
        try persist()
    }

    private static func load(from url: URL) -> ScriptEditorSnapshot {
        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder.scriptEditor.decode(ScriptEditorSnapshot.self, from: data)
        } catch {
            return ScriptEditorSnapshot()
        }
    }

    private func persist() throws {
        let directory = fileURL.deletingLastPathComponent()
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let data = try JSONEncoder.scriptEditor.encode(snapshot)
        try data.write(to: fileURL, options: [.atomic])
    }
}

public extension JSONEncoder {
    static var scriptEditor: JSONEncoder {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        return encoder
    }
}

public extension JSONDecoder {
    static var scriptEditor: JSONDecoder {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return decoder
    }
}
