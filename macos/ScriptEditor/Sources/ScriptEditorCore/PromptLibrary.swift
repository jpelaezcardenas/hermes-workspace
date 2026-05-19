import Foundation

public enum PromptLibrary {
    public static let version = "2026-05-18.short-form.v1"

    public struct Prompt: Equatable, Sendable {
        public var version: String
        public var system: String
        public var user: String

        public init(version: String = PromptLibrary.version, system: String, user: String) {
            self.version = version
            self.system = system
            self.user = user
        }

        public var messages: [ChatMessage] {
            [
                ChatMessage(role: "system", content: system),
                ChatMessage(role: "user", content: user)
            ]
        }
    }

    public static func researchBrief(project: Project, sources: [ResearchSource]) -> Prompt {
        Prompt(
            system: "You are a rigorous research editor. Extract specific, source-backed ideas and avoid unsupported claims.",
            user: """
            Build a short-form video research brief from the project and sources.
            Prompt version: \(version)
            Return only JSON with keys:
            distilledInsights, claims, angles, audienceTensions, citations.
            Each value must be an array of concise strings. Claims should cite source titles when possible.

            Project:
            \(projectSummary(project))

            Sources:
            \(sourceDigest(sources))
            """
        )
    }

    public static func candidateGeneration(project: Project, brief: ResearchBrief, count: Int) -> Prompt {
        Prompt(
            system: "You are a senior short-form video writer. Produce many distinct, specific, high-retention script options.",
            user: """
            Generate \(count) distinct short-form video script candidates.
            Prompt version: \(version)
            Return only JSON:
            { "candidates": [
              {
                "title": "...",
                "angle": "...",
                "tags": ["..."],
                "beats": {
                  "hook": "...",
                  "setup": "...",
                  "escalation": "...",
                  "payoff": "...",
                  "callToActionOrLoop": "...",
                  "timingNotes": "..."
                }
              }
            ]}

            Requirements:
            - Format every candidate as hook, setup, escalation, payoff, CTA or loop, timing notes.
            - Vary hook type, emotional frame, premise, pacing, angle, and payoff.
            - Stay grounded in the research brief and avoid generic creator advice.
            - Scripts should fit 30-90 seconds.

            Project:
            \(projectSummary(project))

            Research brief:
            \(briefDigest(brief))
            """
        )
    }

    public static func scoring(candidate: ScriptCandidate, brief: ResearchBrief) -> Prompt {
        Prompt(
            system: "You are a strict script quality judge. Reward specificity and source grounding; punish slop.",
            user: """
            Score this short-form script candidate on a 0-10 scale for each dimension.
            Prompt version: \(version)
            Return only JSON with keys:
            premiseStrength, originality, specificity, clarity, structure, sourceGrounding, hookQuality, payoffQuality, nonSlop, flags, rationale.
            Flags should identify generic phrasing, fake insight, weak premise, repetitive structure, unsupported claims, filler language, awkward hook, or low-effort hook.

            Research brief:
            \(briefDigest(brief))

            Candidate:
            Title: \(candidate.title)
            Angle: \(candidate.angle)
            Script:
            \(candidate.displayText)
            """
        )
    }

    public static func revisionChat(
        candidate: ScriptCandidate,
        brief: ResearchBrief,
        userMessage: String,
        history: [AgentMessage]
    ) -> Prompt {
        Prompt(
            system: "You are a collaborative script revision partner. Be specific, practical, and source-aware.",
            user: """
            Help revise this short-form script. Respond with concise, actionable suggestions.
            Prompt version: \(version)
            Do not overwrite the human's draft. Offer improved lines, stronger hooks, tighter wording, alternate endings, or source-grounded additions.

            Research brief:
            \(briefDigest(brief))

            Current script:
            \(candidate.displayText)

            Chat history:
            \(history.map { "\($0.role): \($0.content)" }.joined(separator: "\n"))

            Human request:
            \(userMessage)
            """
        )
    }

    public static func projectSummary(_ project: Project) -> String {
        """
        Title: \(project.title)
        Topic: \(project.topic)
        Audience: \(project.audience)
        Platform: \(project.platform.rawValue)
        Tone: \(project.tone)
        Goal: \(project.goal)
        Constraints: \(project.constraints)
        """
    }

    public static func sourceDigest(_ sources: [ResearchSource]) -> String {
        sources.prefix(12).map { source in
            """
            [\(source.kind.rawValue)] \(source.title)
            Locator: \(source.locator)
            Credibility: \(source.credibilityNote)
            Text:
            \(source.rawText.prefix(1800))
            """
        }.joined(separator: "\n\n---\n\n")
    }

    public static func briefDigest(_ brief: ResearchBrief) -> String {
        """
        Insights:
        \(brief.distilledInsights.joined(separator: "\n- "))

        Claims:
        \(brief.claims.joined(separator: "\n- "))

        Angles:
        \(brief.angles.joined(separator: "\n- "))

        Audience tensions:
        \(brief.audienceTensions.joined(separator: "\n- "))

        Citations:
        \(brief.citations.joined(separator: "\n- "))
        """
    }
}
