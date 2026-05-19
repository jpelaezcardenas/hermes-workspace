import Foundation

public enum Platform: String, Codable, CaseIterable, Identifiable {
    case tiktok = "TikTok"
    case reels = "Instagram Reels"
    case shorts = "YouTube Shorts"

    public var id: String { rawValue }
}

public enum SourceKind: String, Codable, CaseIterable, Identifiable {
    case note = "Note"
    case url = "URL"
    case file = "File"
    case webResult = "Web Result"

    public var id: String { rawValue }
}

public struct Project: Codable, Identifiable, Equatable {
    public var id: UUID
    public var title: String
    public var topic: String
    public var audience: String
    public var platform: Platform
    public var tone: String
    public var goal: String
    public var constraints: String
    public var createdAt: Date
    public var updatedAt: Date

    public init(
        id: UUID = UUID(),
        title: String = "Untitled Script Project",
        topic: String = "",
        audience: String = "",
        platform: Platform = .tiktok,
        tone: String = "smart, direct, high-retention",
        goal: String = "",
        constraints: String = "",
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.title = title
        self.topic = topic
        self.audience = audience
        self.platform = platform
        self.tone = tone
        self.goal = goal
        self.constraints = constraints
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

public struct ResearchSource: Codable, Identifiable, Equatable {
    public var id: UUID
    public var projectId: UUID
    public var kind: SourceKind
    public var title: String
    public var locator: String
    public var rawText: String
    public var extractedFacts: [String]
    public var credibilityNote: String
    public var createdAt: Date

    public init(
        id: UUID = UUID(),
        projectId: UUID,
        kind: SourceKind,
        title: String,
        locator: String = "",
        rawText: String,
        extractedFacts: [String] = [],
        credibilityNote: String = "",
        createdAt: Date = Date()
    ) {
        self.id = id
        self.projectId = projectId
        self.kind = kind
        self.title = title
        self.locator = locator
        self.rawText = rawText
        self.extractedFacts = extractedFacts
        self.credibilityNote = credibilityNote
        self.createdAt = createdAt
    }
}

public struct ResearchBrief: Codable, Identifiable, Equatable {
    public var id: UUID
    public var projectId: UUID
    public var distilledInsights: [String]
    public var claims: [String]
    public var angles: [String]
    public var audienceTensions: [String]
    public var citations: [String]
    public var createdAt: Date

    public init(
        id: UUID = UUID(),
        projectId: UUID,
        distilledInsights: [String] = [],
        claims: [String] = [],
        angles: [String] = [],
        audienceTensions: [String] = [],
        citations: [String] = [],
        createdAt: Date = Date()
    ) {
        self.id = id
        self.projectId = projectId
        self.distilledInsights = distilledInsights
        self.claims = claims
        self.angles = angles
        self.audienceTensions = audienceTensions
        self.citations = citations
        self.createdAt = createdAt
    }
}

public struct ScriptBeats: Codable, Equatable {
    public var hook: String
    public var setup: String
    public var escalation: String
    public var payoff: String
    public var callToActionOrLoop: String
    public var timingNotes: String

    public init(
        hook: String = "",
        setup: String = "",
        escalation: String = "",
        payoff: String = "",
        callToActionOrLoop: String = "",
        timingNotes: String = "30-90 seconds"
    ) {
        self.hook = hook
        self.setup = setup
        self.escalation = escalation
        self.payoff = payoff
        self.callToActionOrLoop = callToActionOrLoop
        self.timingNotes = timingNotes
    }

    public var transcript: String {
        [hook, setup, escalation, payoff, callToActionOrLoop]
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .joined(separator: "\n\n")
    }
}

public struct Scorecard: Codable, Equatable {
    public var premiseStrength: Int
    public var originality: Int
    public var specificity: Int
    public var clarity: Int
    public var structure: Int
    public var sourceGrounding: Int
    public var hookQuality: Int
    public var payoffQuality: Int
    public var nonSlop: Int
    public var flags: [String]
    public var rationale: String

    public init(
        premiseStrength: Int = 0,
        originality: Int = 0,
        specificity: Int = 0,
        clarity: Int = 0,
        structure: Int = 0,
        sourceGrounding: Int = 0,
        hookQuality: Int = 0,
        payoffQuality: Int = 0,
        nonSlop: Int = 0,
        flags: [String] = [],
        rationale: String = ""
    ) {
        self.premiseStrength = premiseStrength
        self.originality = originality
        self.specificity = specificity
        self.clarity = clarity
        self.structure = structure
        self.sourceGrounding = sourceGrounding
        self.hookQuality = hookQuality
        self.payoffQuality = payoffQuality
        self.nonSlop = nonSlop
        self.flags = flags
        self.rationale = rationale
    }

    public var total: Int {
        premiseStrength + originality + specificity + clarity + structure + sourceGrounding + hookQuality + payoffQuality + nonSlop
    }
}

public struct ScriptCandidate: Codable, Identifiable, Equatable {
    public var id: UUID
    public var projectId: UUID
    public var runId: UUID
    public var title: String
    public var angle: String
    public var tags: [String]
    public var beats: ScriptBeats
    public var scorecard: Scorecard?
    public var humanEditedText: String
    public var versionHistory: [String]
    public var createdAt: Date

    public init(
        id: UUID = UUID(),
        projectId: UUID,
        runId: UUID,
        title: String,
        angle: String,
        tags: [String] = [],
        beats: ScriptBeats,
        scorecard: Scorecard? = nil,
        humanEditedText: String = "",
        versionHistory: [String] = [],
        createdAt: Date = Date()
    ) {
        self.id = id
        self.projectId = projectId
        self.runId = runId
        self.title = title
        self.angle = angle
        self.tags = tags
        self.beats = beats
        self.scorecard = scorecard
        self.humanEditedText = humanEditedText
        self.versionHistory = versionHistory
        self.createdAt = createdAt
    }

    public var displayText: String {
        humanEditedText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? beats.transcript : humanEditedText
    }
}

public struct GenerationRun: Codable, Identifiable, Equatable {
    public var id: UUID
    public var projectId: UUID
    public var model: String
    public var candidateCount: Int
    public var promptSummary: String
    public var createdAt: Date

    public init(
        id: UUID = UUID(),
        projectId: UUID,
        model: String,
        candidateCount: Int,
        promptSummary: String,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.projectId = projectId
        self.model = model
        self.candidateCount = candidateCount
        self.promptSummary = promptSummary
        self.createdAt = createdAt
    }
}

public struct AgentMessage: Codable, Identifiable, Equatable {
    public var id: UUID
    public var candidateId: UUID
    public var role: String
    public var content: String
    public var createdAt: Date

    public init(id: UUID = UUID(), candidateId: UUID, role: String, content: String, createdAt: Date = Date()) {
        self.id = id
        self.candidateId = candidateId
        self.role = role
        self.content = content
        self.createdAt = createdAt
    }
}
