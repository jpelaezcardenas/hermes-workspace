import Foundation

public struct WorkflowEngine: Sendable {
    private let ai: AITextGenerating

    public init(ai: AITextGenerating) {
        self.ai = ai
    }

    public func buildResearchBrief(project: Project, sources: [ResearchSource]) async -> ResearchBrief {
        let prompt = PromptLibrary.researchBrief(project: project, sources: sources)

        do {
            let text = try await ai.complete(
                messages: prompt.messages,
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
        let prompt = PromptLibrary.candidateGeneration(project: project, brief: brief, count: clampedCount)

        do {
            let text = try await ai.complete(
                messages: prompt.messages,
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
        let prompt = PromptLibrary.revisionChat(candidate: candidate, brief: brief, userMessage: userMessage, history: history)
        do {
            return try await ai.complete(
                messages: prompt.messages,
                temperature: 0.55,
                maxTokens: 1200
            )
        } catch {
            return fallbackRevision(candidate: candidate, userMessage: userMessage)
        }
    }

    public static func heuristicScore(for candidate: ScriptCandidate, brief: ResearchBrief) -> Scorecard {
        Rubric.default.evaluate(candidate: candidate, brief: brief)
    }

    private func scoreCandidate(_ candidate: ScriptCandidate, brief: ResearchBrief) async -> ScriptCandidate {
        let prompt = PromptLibrary.scoring(candidate: candidate, brief: brief)
        var next = candidate
        do {
            let text = try await ai.complete(
                messages: prompt.messages,
                temperature: 0.2,
                maxTokens: 900
            )
            let payload = try JSONExtraction.decodeObject(ScorecardPayload.self, from: text)
            next.scorecard = payload.scorecard
        } catch {
            next.scorecard = Rubric.default.evaluate(candidate: candidate, brief: brief)
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
            premiseStrength: Rubric.clampScore(premiseStrength),
            originality: Rubric.clampScore(originality),
            specificity: Rubric.clampScore(specificity),
            clarity: Rubric.clampScore(clarity),
            structure: Rubric.clampScore(structure),
            sourceGrounding: Rubric.clampScore(sourceGrounding),
            hookQuality: Rubric.clampScore(hookQuality),
            payoffQuality: Rubric.clampScore(payoffQuality),
            nonSlop: Rubric.clampScore(nonSlop),
            flags: flags.cleaned(max: 8),
            rationale: rationale
        )
    }
}

fileprivate extension WorkflowEngine {
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
