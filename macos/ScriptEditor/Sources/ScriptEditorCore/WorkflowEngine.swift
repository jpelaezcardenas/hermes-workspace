import Foundation

public struct WorkflowEngine: Sendable {
    private let ai: AITextGenerating

    public init(ai: AITextGenerating) {
        self.ai = ai
    }

    public func buildResearchBrief(project: Project, sources: [ResearchSource]) async -> ResearchBrief {
        let prompt = """
        Build a short-form video research brief from the project and sources.
        Return only JSON with keys:
        distilledInsights, claims, angles, audienceTensions, citations.
        Each value must be an array of concise strings. Claims should cite source titles when possible.

        Project:
        \(projectSummary(project))

        Sources:
        \(sourceDigest(sources))
        """

        do {
            let text = try await ai.complete(
                messages: [
                    ChatMessage(role: "system", content: "You are a rigorous research editor. Extract specific, source-backed ideas and avoid unsupported claims."),
                    ChatMessage(role: "user", content: prompt)
                ],
                temperature: 0.25,
                maxTokens: 1800
            )
            let decoded = try JSONExtraction.decodeObject(BriefPayload.self, from: text)
            return decoded.brief(projectId: project.id)
        } catch {
            return fallbackBrief(project: project, sources: sources)
        }
    }

    public func generateCandidates(project: Project, brief: ResearchBrief, count: Int, model: String) async -> (GenerationRun, [ScriptCandidate]) {
        let clampedCount = min(max(count, 20), 40)
        let run = GenerationRun(
            projectId: project.id,
            model: model,
            candidateCount: clampedCount,
            promptSummary: "Generated \(clampedCount) short-form candidates from research brief"
        )
        let prompt = """
        Generate \(clampedCount) distinct short-form video script candidates.
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

        do {
            let text = try await ai.complete(
                messages: [
                    ChatMessage(role: "system", content: "You are a senior short-form video writer. Produce many distinct, specific, high-retention script options."),
                    ChatMessage(role: "user", content: prompt)
                ],
                temperature: 0.85,
                maxTokens: 7000
            )
            let payload = try JSONExtraction.decodeObject(CandidatesPayload.self, from: text)
            let candidates = payload.candidates.prefix(clampedCount).map {
                $0.candidate(projectId: project.id, runId: run.id)
            }
            if candidates.count >= 10 {
                return (run, candidates)
            }
        } catch {
            // Fall through to deterministic candidates.
        }
        return (run, fallbackCandidates(project: project, brief: brief, run: run, count: clampedCount))
    }

    public func scoreCandidates(_ candidates: [ScriptCandidate], brief: ResearchBrief) async -> [ScriptCandidate] {
        var scored: [ScriptCandidate] = []
        for candidate in candidates {
            scored.append(await scoreCandidate(candidate, brief: brief))
        }
        return scored.sorted {
            ($0.scorecard?.total ?? 0, $0.title) > ($1.scorecard?.total ?? 0, $1.title)
        }
    }

    public func topCandidates(from candidates: [ScriptCandidate], limit: Int = 10) -> [ScriptCandidate] {
        Array(candidates.sorted {
            ($0.scorecard?.total ?? 0, $0.title) > ($1.scorecard?.total ?? 0, $1.title)
        }.prefix(limit))
    }

    public func revise(candidate: ScriptCandidate, brief: ResearchBrief, userMessage: String, history: [AgentMessage]) async -> String {
        let prompt = """
        Help revise this short-form script. Respond with concise, actionable suggestions.
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
        do {
            return try await ai.complete(
                messages: [
                    ChatMessage(role: "system", content: "You are a collaborative script revision partner. Be specific, practical, and source-aware."),
                    ChatMessage(role: "user", content: prompt)
                ],
                temperature: 0.55,
                maxTokens: 1200
            )
        } catch {
            return fallbackRevision(candidate: candidate, userMessage: userMessage)
        }
    }

    public static func heuristicScore(for candidate: ScriptCandidate, brief: ResearchBrief) -> Scorecard {
        let text = candidate.displayText
        let lower = text.lowercased()
        let words = lower.split { !$0.isLetter && !$0.isNumber }
        let uniqueRatio = words.isEmpty ? 0 : Double(Set(words).count) / Double(words.count)
        let sourceHits = brief.claims.filter { claim in
            let significant = claim.split(separator: " ").filter { $0.count > 5 }.prefix(4)
            return significant.contains { lower.contains($0.lowercased()) }
        }.count
        let genericTerms = ["game changer", "secret", "unlock", "you need to know", "in today's world", "life hack", "mindset", "crushing it"]
        let fillerTerms = ["really", "basically", "actually", "literally", "just", "very", "kind of", "sort of"]
        let flags = Self.nonSlopFlags(text: text, sourceHits: sourceHits, uniqueRatio: uniqueRatio, genericTerms: genericTerms, fillerTerms: fillerTerms)

        let hookHasTension = ["why", "stop", "nobody", "mistake", "truth", "before", "after", "?"].contains { lower.contains($0) }
        let payoffHasTurn = ["so", "but", "because", "instead", "that means", "the result"].contains { lower.contains($0) }

        return Scorecard(
            premiseStrength: Self.clampScore(5 + min(3, candidate.angle.split(separator: " ").count / 4) - (flags.contains("weak premise") ? 2 : 0)),
            originality: Self.clampScore(Int((uniqueRatio * 10).rounded()) - (Self.containsAny(lower, genericTerms) ? 2 : 0)),
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

    private func scoreCandidate(_ candidate: ScriptCandidate, brief: ResearchBrief) async -> ScriptCandidate {
        let prompt = """
        Score this short-form script candidate on a 0-10 scale for each dimension.
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
        var next = candidate
        do {
            let text = try await ai.complete(
                messages: [
                    ChatMessage(role: "system", content: "You are a strict script quality judge. Reward specificity and source grounding; punish slop."),
                    ChatMessage(role: "user", content: prompt)
                ],
                temperature: 0.2,
                maxTokens: 900
            )
            let payload = try JSONExtraction.decodeObject(ScorecardPayload.self, from: text)
            next.scorecard = payload.scorecard
        } catch {
            next.scorecard = Self.heuristicScore(for: candidate, brief: brief)
        }
        return next
    }
}

private struct BriefPayload: Codable {
    var distilledInsights: [String]
    var claims: [String]
    var angles: [String]
    var audienceTensions: [String]
    var citations: [String]

    func brief(projectId: UUID) -> ResearchBrief {
        ResearchBrief(
            projectId: projectId,
            distilledInsights: distilledInsights.cleaned(max: 12),
            claims: claims.cleaned(max: 16),
            angles: angles.cleaned(max: 12),
            audienceTensions: audienceTensions.cleaned(max: 10),
            citations: citations.cleaned(max: 20)
        )
    }
}

private struct CandidatesPayload: Codable {
    var candidates: [CandidatePayload]
}

private struct CandidatePayload: Codable {
    var title: String
    var angle: String
    var tags: [String]
    var beats: ScriptBeats

    func candidate(projectId: UUID, runId: UUID) -> ScriptCandidate {
        ScriptCandidate(
            projectId: projectId,
            runId: runId,
            title: title.trimmedOr("Untitled angle"),
            angle: angle.trimmedOr("Source-backed angle"),
            tags: tags.cleaned(max: 8),
            beats: beats
        )
    }
}

private struct ScorecardPayload: Codable {
    var premiseStrength: Int
    var originality: Int
    var specificity: Int
    var clarity: Int
    var structure: Int
    var sourceGrounding: Int
    var hookQuality: Int
    var payoffQuality: Int
    var nonSlop: Int
    var flags: [String]
    var rationale: String

    var scorecard: Scorecard {
        Scorecard(
            premiseStrength: WorkflowEngine.clampScore(premiseStrength),
            originality: WorkflowEngine.clampScore(originality),
            specificity: WorkflowEngine.clampScore(specificity),
            clarity: WorkflowEngine.clampScore(clarity),
            structure: WorkflowEngine.clampScore(structure),
            sourceGrounding: WorkflowEngine.clampScore(sourceGrounding),
            hookQuality: WorkflowEngine.clampScore(hookQuality),
            payoffQuality: WorkflowEngine.clampScore(payoffQuality),
            nonSlop: WorkflowEngine.clampScore(nonSlop),
            flags: flags.cleaned(max: 8),
            rationale: rationale
        )
    }
}

fileprivate extension WorkflowEngine {
    static func clampScore(_ score: Int) -> Int {
        min(max(score, 0), 10)
    }

    static func containsAny(_ text: String, _ terms: [String]) -> Bool {
        terms.contains { text.contains($0) }
    }

    static func nonSlopFlags(text: String, sourceHits: Int, uniqueRatio: Double, genericTerms: [String], fillerTerms: [String]) -> [String] {
        let lower = text.lowercased()
        var flags: [String] = []
        if containsAny(lower, genericTerms) { flags.append("generic phrasing") }
        if lower.count < 220 { flags.append("weak premise") }
        if sourceHits == 0 { flags.append("unsupported claims") }
        if uniqueRatio < 0.55 { flags.append("repetitive structure") }
        let fillerCount = fillerTerms.reduce(0) { $0 + lower.components(separatedBy: $1).count - 1 }
        if fillerCount >= 4 { flags.append("filler language") }
        let firstLine = lower.components(separatedBy: .newlines).first ?? lower
        if firstLine.count < 18 || firstLine.contains("here are") { flags.append("awkward or low-effort hook") }
        if lower.contains("everyone knows") || lower.contains("studies show") { flags.append("fake insight") }
        return flags
    }

    func projectSummary(_ project: Project) -> String {
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

    func sourceDigest(_ sources: [ResearchSource]) -> String {
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

    func briefDigest(_ brief: ResearchBrief) -> String {
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

    func fallbackBrief(project: Project, sources: [ResearchSource]) -> ResearchBrief {
        let sourceSentences = sources.flatMap { source in
            sentenceCandidates(from: source.rawText).prefix(4).map { "\(source.title): \($0)" }
        }
        let topic = project.topic.trimmedOr(project.title)
        return ResearchBrief(
            projectId: project.id,
            distilledInsights: Array(sourceSentences.prefix(8)).ifEmpty(["The strongest angle should connect \(topic) to a specific audience tension."]),
            claims: Array(sourceSentences.prefix(10)).ifEmpty(["Use source-backed claims before making a strong assertion about \(topic)."]),
            angles: [
                "Counterintuitive lesson about \(topic)",
                "Common mistake the audience makes with \(topic)",
                "Before/after transformation tied to \(project.goal.trimmedOr("the project goal"))",
                "Myth versus source-backed reality"
            ],
            audienceTensions: [
                "\(project.audience.trimmedOr("The audience")) wants a fast answer without being talked down to.",
                "The content must feel useful, not generic."
            ],
            citations: sources.map { "\($0.title) \($0.locator)" }.cleaned(max: 20)
        )
    }

    func fallbackCandidates(project: Project, brief: ResearchBrief, run: GenerationRun, count: Int) -> [ScriptCandidate] {
        let hookFrames = [
            "Stop saying \(project.topic.trimmedOr("this topic")) is simple.",
            "The mistake most people make with \(project.topic.trimmedOr("this")) starts before they begin.",
            "Here is the uncomfortable part nobody puts in the headline.",
            "If you only remember one thing, make it this.",
            "The obvious answer is the trap."
        ]
        let angles = brief.angles.ifEmpty(["Counterintuitive angle", "Common mistake", "Source-backed reframing"])
        let claims = brief.claims.ifEmpty(["Use a concrete source-backed proof point before making the argument."])
        return (0..<count).map { index in
            let angle = angles[index % angles.count]
            let claim = claims[index % claims.count]
            let hook = hookFrames[index % hookFrames.count]
            let beats = ScriptBeats(
                hook: hook,
                setup: "Most \(project.audience.trimmedOr("viewers")) hear the surface version: \(angle).",
                escalation: "But the detail that changes the story is this: \(claim)",
                payoff: "So the better move is to turn that tension into one clear decision, then show the consequence immediately.",
                callToActionOrLoop: index.isMultiple(of: 2) ? "Save this before you build the next version." : "Now rewatch the hook and notice what changed.",
                timingNotes: index.isMultiple(of: 3) ? "Fast 35-45 seconds, tight jump cuts." : "60-75 seconds with one visual proof point."
            )
            return ScriptCandidate(
                projectId: project.id,
                runId: run.id,
                title: "Angle \(index + 1): \(angle.prefix(48))",
                angle: angle,
                tags: ["fallback", project.platform.rawValue, index.isMultiple(of: 2) ? "high-tension" : "source-led"],
                beats: beats
            )
        }
    }

    func fallbackRevision(candidate: ScriptCandidate, userMessage: String) -> String {
        """
        Qwen is not reachable, so here is a local revision pass:

        - Sharpen the hook by naming the exact tension in the first sentence.
        - Replace any broad claim with a source-backed detail from the research brief.
        - Keep the payoff concrete: show the consequence, not just the lesson.

        A stronger hook direction:
        "\(candidate.angle) sounds obvious until you notice what it makes people do next."

        Your request was: \(userMessage)
        """
    }

    func sentenceCandidates(from text: String) -> [String] {
        text.replacingOccurrences(of: "\n", with: " ")
            .components(separatedBy: CharacterSet(charactersIn: ".!?"))
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { $0.count > 32 }
    }
}

private extension Array where Element == String {
    func cleaned(max: Int) -> [String] {
        Array(self.map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .prefix(max))
    }

    func ifEmpty(_ fallback: [String]) -> [String] {
        isEmpty ? fallback : self
    }
}

private extension String {
    func trimmedOr(_ fallback: String) -> String {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? fallback : trimmed
    }
}
