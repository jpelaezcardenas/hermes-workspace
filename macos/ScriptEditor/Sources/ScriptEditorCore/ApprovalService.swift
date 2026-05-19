import Foundation

public struct ApprovedScript: Codable, Identifiable, Equatable {
    public let id: UUID
    public let project: Project
    public let candidate: ScriptCandidate
    public let brief: ResearchBrief?
    public let scriptText: String
    public let approvedAt: Date
    public let reviewerNote: String

    public var projectId: UUID { project.id }
    public var candidateId: UUID { candidate.id }

    public init(
        id: UUID = UUID(),
        project: Project,
        candidate: ScriptCandidate,
        brief: ResearchBrief? = nil,
        scriptText: String,
        approvedAt: Date = Date(),
        reviewerNote: String = ""
    ) {
        self.id = id
        self.project = project
        self.candidate = candidate
        self.brief = brief
        self.scriptText = scriptText
        self.approvedAt = approvedAt
        self.reviewerNote = reviewerNote
    }
}

public struct ApprovalService {
    public init() {}

    public func approve(
        project: Project,
        candidate: ScriptCandidate,
        brief: ResearchBrief? = nil,
        reviewerNote: String = "",
        approvedAt: Date = Date()
    ) -> ApprovedScript {
        ApprovedScript(
            project: project,
            candidate: candidate,
            brief: brief,
            scriptText: candidate.displayText,
            approvedAt: approvedAt,
            reviewerNote: reviewerNote
        )
    }
}
