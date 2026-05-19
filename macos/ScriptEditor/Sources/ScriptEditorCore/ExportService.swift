import Foundation

public struct ExportService {
    public init() {}

    public func renderApprovedScriptMarkdown(
        approvedScript: ApprovedScript,
        sources: [ResearchSource] = [],
        exportedAt: Date? = nil
    ) -> String {
        var candidate = approvedScript.candidate
        candidate.humanEditedText = approvedScript.scriptText

        renderApprovedScriptMarkdown(
            project: approvedScript.project,
            candidate: candidate,
            brief: approvedScript.brief,
            sources: sources,
            exportedAt: exportedAt ?? approvedScript.approvedAt
        )
    }

    public func renderApprovedScriptMarkdown(
        project: Project,
        candidate: ScriptCandidate,
        brief: ResearchBrief? = nil,
        sources: [ResearchSource] = [],
        exportedAt: Date = Date()
    ) -> String {
        let citationItems = Self.citationItems(brief: brief, sources: sources)
        var sections: [String] = []

        sections.append("# \(candidate.title)")
        sections.append("""
        > v1 approved script export

        ## Project
        - Title: \(project.title)
        - Topic: \(project.topic)
        - Audience: \(project.audience)
        - Platform: \(project.platform.rawValue)
        - Tone: \(project.tone)
        - Goal: \(project.goal)
        - Constraints: \(Self.fallback(project.constraints))
        - Project ID: \(project.id.uuidString)
        - Candidate ID: \(candidate.id.uuidString)
        - Exported At: \(Self.iso8601String(from: exportedAt))
        """)
        sections.append("""
        ## Script
        \(candidate.displayText)
        """)
        sections.append("""
        ## Candidate Metadata
        - Angle: \(candidate.angle)
        - Tags: \(Self.list(candidate.tags))
        - Created At: \(Self.iso8601String(from: candidate.createdAt))
        """)
        sections.append(Self.beatsSection(candidate.beats))
        sections.append(Self.scorecardSection(candidate.scorecard))
        sections.append(Self.briefSection(brief))
        sections.append(Self.citationsSection(citationItems))

        return sections
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .joined(separator: "\n\n") + "\n"
    }

    private static func beatsSection(_ beats: ScriptBeats) -> String {
        """
        ## Beats
        - Hook: \(fallback(beats.hook))
        - Setup: \(fallback(beats.setup))
        - Escalation: \(fallback(beats.escalation))
        - Payoff: \(fallback(beats.payoff))
        - CTA or Loop: \(fallback(beats.callToActionOrLoop))
        - Timing Notes: \(fallback(beats.timingNotes))
        """
    }

    private static func scorecardSection(_ scorecard: Scorecard?) -> String {
        guard let scorecard else {
            return """
            ## Scorecard
            No scorecard available.
            """
        }

        return """
        ## Scorecard
        - Total: \(scorecard.total)/90
        - Premise Strength: \(scorecard.premiseStrength)/10
        - Originality: \(scorecard.originality)/10
        - Specificity: \(scorecard.specificity)/10
        - Clarity: \(scorecard.clarity)/10
        - Structure: \(scorecard.structure)/10
        - Source Grounding: \(scorecard.sourceGrounding)/10
        - Hook Quality: \(scorecard.hookQuality)/10
        - Payoff Quality: \(scorecard.payoffQuality)/10
        - Non-Slop: \(scorecard.nonSlop)/10
        - Flags: \(list(scorecard.flags))

        Rationale:
        \(fallback(scorecard.rationale))
        """
    }

    private static func briefSection(_ brief: ResearchBrief?) -> String {
        guard let brief else { return "" }

        return """
        ## Research Brief
        ### Distilled Insights
        \(markdownList(brief.distilledInsights))

        ### Claims
        \(markdownList(brief.claims))

        ### Angles
        \(markdownList(brief.angles))

        ### Audience Tensions
        \(markdownList(brief.audienceTensions))
        """
    }

    private static func citationsSection(_ citations: [String]) -> String {
        """
        ## Source Citations
        \(markdownList(citations))
        """
    }

    private static func citationItems(brief: ResearchBrief?, sources: [ResearchSource]) -> [String] {
        var items = brief?.citations ?? []
        items.append(contentsOf: sources.map { source in
            let locator = source.locator.trimmingCharacters(in: .whitespacesAndNewlines)
            let credibilityNote = source.credibilityNote.trimmingCharacters(in: .whitespacesAndNewlines)
            let locationText = locator.isEmpty ? "" : " - \(locator)"
            let credibilityText = credibilityNote.isEmpty ? "" : " (\(credibilityNote))"
            return "\(source.title) [\(source.kind.rawValue)]\(locationText)\(credibilityText)"
        })
        return items
    }

    private static func markdownList(_ values: [String]) -> String {
        let cleaned = values
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }

        guard !cleaned.isEmpty else { return "- None" }
        return cleaned.map { "- \($0)" }.joined(separator: "\n")
    }

    private static func list(_ values: [String]) -> String {
        let cleaned = values
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }

        guard !cleaned.isEmpty else { return "None" }
        return cleaned.joined(separator: ", ")
    }

    private static func fallback(_ value: String) -> String {
        let trimmed = value.trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? "None" : trimmed
    }

    private static func iso8601String(from date: Date) -> String {
        ISO8601DateFormatter().string(from: date)
    }
}
