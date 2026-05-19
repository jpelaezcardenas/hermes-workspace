import Foundation

public struct Rubric: Sendable {
    public struct ScoreDimension: Codable, Equatable, Identifiable, Sendable {
        public var id: String
        public var name: String
        public var description: String
        public var maximumScore: Int

        public init(id: String, name: String, description: String, maximumScore: Int = 10) {
            self.id = id
            self.name = name
            self.description = description
            self.maximumScore = maximumScore
        }
    }

    public struct NonSlopFlagDefinition: Codable, Equatable, Identifiable, Sendable {
        public var id: String
        public var label: String
        public var description: String

        public init(id: String, label: String, description: String) {
            self.id = id
            self.label = label
            self.description = description
        }
    }

    public static let `default` = Rubric()

    public let dimensions: [ScoreDimension]
    public let nonSlopFlags: [NonSlopFlagDefinition]
    public let genericTerms: [String]
    public let fillerTerms: [String]

    public init(
        dimensions: [ScoreDimension] = Rubric.defaultDimensions,
        nonSlopFlags: [NonSlopFlagDefinition] = Rubric.defaultNonSlopFlags,
        genericTerms: [String] = Rubric.defaultGenericTerms,
        fillerTerms: [String] = Rubric.defaultFillerTerms
    ) {
        self.dimensions = dimensions
        self.nonSlopFlags = nonSlopFlags
        self.genericTerms = genericTerms
        self.fillerTerms = fillerTerms
    }

    public var maximumTotalScore: Int {
        dimensions.reduce(0) { $0 + $1.maximumScore }
    }

    public func totalScore(for scorecard: Scorecard) -> Int {
        scorecard.total
    }

    public func evaluate(candidate: ScriptCandidate, brief: ResearchBrief) -> Scorecard {
        let text = candidate.displayText
        let lower = text.lowercased()
        let words = lower.split { !$0.isLetter && !$0.isNumber }
        let uniqueRatio = words.isEmpty ? 0 : Double(Set(words).count) / Double(words.count)
        let sourceHits = sourceHitCount(in: lower, brief: brief)
        let flags = evaluateNonSlopFlags(text: text, sourceHits: sourceHits, uniqueRatio: uniqueRatio)
        let weakPremiseFlag = flagLabel(for: "weakPremise", fallback: "weak premise")

        let hookHasTension = ["why", "stop", "nobody", "mistake", "truth", "before", "after", "?"].contains { lower.contains($0) }
        let payoffHasTurn = ["so", "but", "because", "instead", "that means", "the result"].contains { lower.contains($0) }

        return Scorecard(
            premiseStrength: Self.clampScore(5 + min(3, candidate.angle.split(separator: " ").count / 4) - (flags.contains(weakPremiseFlag) ? 2 : 0)),
            originality: Self.clampScore(Int((uniqueRatio * 10).rounded()) - (containsAny(lower, genericTerms) ? 2 : 0)),
            specificity: Self.clampScore(4 + min(4, sourceHits * 2) + (lower.contains(where: { $0.isNumber }) ? 1 : 0)),
            clarity: Self.clampScore(text.count > 160 ? 8 : 5),
            structure: Self.clampScore([candidate.beats.hook, candidate.beats.setup, candidate.beats.escalation, candidate.beats.payoff].filter { !$0.isEmpty }.count * 2),
            sourceGrounding: Self.clampScore(3 + min(6, sourceHits * 3)),
            hookQuality: Self.clampScore(5 + (hookHasTension ? 3 : 0) - (candidate.beats.hook.count < 18 ? 2 : 0)),
            payoffQuality: Self.clampScore(5 + (payoffHasTurn ? 2 : 0) - (candidate.beats.payoff.count < 24 ? 2 : 0)),
            nonSlop: Self.clampScore(9 - flags.count),
            flags: flags,
            rationale: flags.isEmpty
                ? "Specific, structured, and grounded enough to reach human review."
                : "Needs attention on: \(flags.joined(separator: ", "))."
        )
    }

    public static func clampScore(_ score: Int) -> Int {
        min(max(score, 0), 10)
    }
}

public extension Rubric {
    static let defaultDimensions: [ScoreDimension] = [
        ScoreDimension(id: "premiseStrength", name: "Premise Strength", description: "The candidate has a clear, compelling premise with enough tension to sustain attention."),
        ScoreDimension(id: "originality", name: "Originality", description: "The angle avoids familiar creator-advice tropes and feels meaningfully distinct."),
        ScoreDimension(id: "specificity", name: "Specificity", description: "The script uses concrete details, numbers, examples, or named proof points."),
        ScoreDimension(id: "clarity", name: "Clarity", description: "The script is easy to follow and keeps the viewer oriented."),
        ScoreDimension(id: "structure", name: "Structure", description: "The script has complete hook, setup, escalation, and payoff beats."),
        ScoreDimension(id: "sourceGrounding", name: "Source Grounding", description: "The candidate visibly draws from the research brief instead of free-floating claims."),
        ScoreDimension(id: "hookQuality", name: "Hook Quality", description: "The opening creates tension quickly without feeling cheap or vague."),
        ScoreDimension(id: "payoffQuality", name: "Payoff Quality", description: "The ending resolves the premise with a turn, consequence, or useful decision."),
        ScoreDimension(id: "nonSlop", name: "Non-Slop", description: "The script avoids generic phrasing, fake insight, filler, and low-effort structure.")
    ]

    static let defaultNonSlopFlags: [NonSlopFlagDefinition] = [
        NonSlopFlagDefinition(id: "genericPhrasing", label: "generic phrasing", description: "Uses broad hype phrases or interchangeable creator-advice language."),
        NonSlopFlagDefinition(id: "weakPremise", label: "weak premise", description: "Does not develop enough substance or tension to justify the script."),
        NonSlopFlagDefinition(id: "unsupportedClaims", label: "unsupported claims", description: "Makes claims without matching evidence from the research brief."),
        NonSlopFlagDefinition(id: "repetitiveStructure", label: "repetitive structure", description: "Repeats too many words or ideas relative to script length."),
        NonSlopFlagDefinition(id: "fillerLanguage", label: "filler language", description: "Leans on hedges and intensifiers instead of sharper wording."),
        NonSlopFlagDefinition(id: "awkwardOrLowEffortHook", label: "awkward or low-effort hook", description: "Opens too weakly, too generically, or without a real hook."),
        NonSlopFlagDefinition(id: "fakeInsight", label: "fake insight", description: "Signals authority with vague proof language instead of a sourced idea.")
    ]

    static let defaultGenericTerms = [
        "game changer",
        "secret",
        "unlock",
        "you need to know",
        "in today's world",
        "life hack",
        "mindset",
        "crushing it"
    ]

    static let defaultFillerTerms = [
        "really",
        "basically",
        "actually",
        "literally",
        "just",
        "very",
        "kind of",
        "sort of"
    ]
}

private extension Rubric {
    func sourceHitCount(in lowercasedText: String, brief: ResearchBrief) -> Int {
        brief.claims.filter { claim in
            let significant = claim.split(separator: " ").filter { $0.count > 5 }.prefix(4)
            return significant.contains { lowercasedText.contains($0.lowercased()) }
        }.count
    }

    func evaluateNonSlopFlags(text: String, sourceHits: Int, uniqueRatio: Double) -> [String] {
        let lower = text.lowercased()
        var flags: [String] = []
        if containsAny(lower, genericTerms) { flags.append(flagLabel(for: "genericPhrasing", fallback: "generic phrasing")) }
        if lower.count < 220 { flags.append(flagLabel(for: "weakPremise", fallback: "weak premise")) }
        if sourceHits == 0 { flags.append(flagLabel(for: "unsupportedClaims", fallback: "unsupported claims")) }
        if uniqueRatio < 0.55 { flags.append(flagLabel(for: "repetitiveStructure", fallback: "repetitive structure")) }
        let fillerCount = fillerTerms.reduce(0) { $0 + lower.components(separatedBy: $1).count - 1 }
        if fillerCount >= 4 { flags.append(flagLabel(for: "fillerLanguage", fallback: "filler language")) }
        let firstLine = lower.components(separatedBy: .newlines).first ?? lower
        if firstLine.count < 18 || firstLine.contains("here are") {
            flags.append(flagLabel(for: "awkwardOrLowEffortHook", fallback: "awkward or low-effort hook"))
        }
        if lower.contains("everyone knows") || lower.contains("studies show") {
            flags.append(flagLabel(for: "fakeInsight", fallback: "fake insight"))
        }
        return flags
    }

    func containsAny(_ text: String, _ terms: [String]) -> Bool {
        terms.contains { text.contains($0) }
    }

    func flagLabel(for id: String, fallback: String) -> String {
        nonSlopFlags.first { $0.id == id }?.label ?? fallback
    }
}
