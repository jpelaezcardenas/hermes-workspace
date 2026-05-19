import XCTest
@testable import ScriptEditorCore

final class PromptLibraryTests: XCTestCase {
    func testResearchBriefPromptIncludesRequiredJSONKeysAndSourceGrounding() {
        let project = Project(title: "Hook Lab", topic: "creator retention", audience: "solo creators")
        let sources = [
            ResearchSource(
                projectId: project.id,
                kind: .note,
                title: "Interview notes",
                locator: "notebook",
                rawText: "Creators trust concrete proof points more than generic advice.",
                credibilityNote: "first-party interviews"
            )
        ]

        let prompt = PromptLibrary.researchBrief(project: project, sources: sources)

        XCTAssertEqual(prompt.version, PromptLibrary.version)
        XCTAssertTrue(prompt.system.contains("source-backed ideas"))
        XCTAssertTrue(prompt.user.contains("Return only JSON"))
        XCTAssertTrue(prompt.user.contains("distilledInsights, claims, angles, audienceTensions, citations"))
        XCTAssertTrue(prompt.user.contains("Claims should cite source titles"))
        XCTAssertTrue(prompt.user.contains("[Note] Interview notes"))
        XCTAssertTrue(prompt.user.contains("Prompt version: \(PromptLibrary.version)"))
    }

    func testCandidateGenerationPromptIncludesFormatAndVariationRequirements() {
        let project = Project(topic: "local AI workflows", audience: "indie creators")
        let brief = ResearchBrief(
            projectId: project.id,
            claims: ["Benchmarks show local drafts return faster than hosted calls."],
            angles: ["Local AI changes the drafting loop."]
        )

        let prompt = PromptLibrary.candidateGeneration(project: project, brief: brief, count: 24)

        XCTAssertTrue(prompt.system.contains("senior short-form video writer"))
        XCTAssertTrue(prompt.user.contains("Generate 24 distinct short-form video script candidates"))
        XCTAssertTrue(prompt.user.contains("\"candidates\""))
        XCTAssertTrue(prompt.user.contains("\"callToActionOrLoop\""))
        XCTAssertTrue(prompt.user.contains("Format every candidate as hook, setup, escalation, payoff, CTA or loop, timing notes"))
        XCTAssertTrue(prompt.user.contains("Vary hook type, emotional frame, premise, pacing, angle, and payoff"))
        XCTAssertTrue(prompt.user.contains("Stay grounded in the research brief"))
        XCTAssertTrue(prompt.user.contains("30-90 seconds"))
    }

    func testScoringPromptIncludesRubricDimensionsAndFlagTaxonomy() {
        let projectId = UUID()
        let runId = UUID()
        let candidate = ScriptCandidate(
            projectId: projectId,
            runId: runId,
            title: "Specific Hook",
            angle: "Proof beats vague advice",
            beats: ScriptBeats(
                hook: "Stop opening with generic advice.",
                setup: "Creators lose trust when the proof arrives late.",
                escalation: "Interview notes show concrete proof points create faster confidence.",
                payoff: "Lead with the evidence, then name the decision it changes."
            )
        )
        let brief = ResearchBrief(
            projectId: projectId,
            claims: ["Interview notes: concrete proof points create faster confidence."]
        )

        let prompt = PromptLibrary.scoring(candidate: candidate, brief: brief)

        XCTAssertTrue(prompt.system.contains("strict script quality judge"))
        XCTAssertTrue(prompt.user.contains("0-10 scale"))
        XCTAssertTrue(prompt.user.contains("premiseStrength, originality, specificity, clarity, structure, sourceGrounding, hookQuality, payoffQuality, nonSlop, flags, rationale"))
        XCTAssertTrue(prompt.user.contains("generic phrasing, fake insight, weak premise, repetitive structure, unsupported claims, filler language, awkward hook, or low-effort hook"))
        XCTAssertTrue(prompt.user.contains("Title: Specific Hook"))
        XCTAssertTrue(prompt.user.contains("Script:"))
    }

    func testRevisionPromptIncludesDraftProtectionAndChatContext() {
        let projectId = UUID()
        let candidateId = UUID()
        let candidate = ScriptCandidate(
            id: candidateId,
            projectId: projectId,
            runId: UUID(),
            title: "Draft",
            angle: "Make the payoff concrete",
            beats: ScriptBeats(hook: "The obvious answer is the trap.", setup: "Setup", escalation: "Escalation", payoff: "Payoff")
        )
        let brief = ResearchBrief(
            projectId: projectId,
            claims: ["Source A: stronger payoffs show the consequence."],
            citations: ["Source A"]
        )
        let history = [
            AgentMessage(candidateId: candidateId, role: "user", content: "Can this feel less broad?")
        ]

        let prompt = PromptLibrary.revisionChat(
            candidate: candidate,
            brief: brief,
            userMessage: "Give me three sharper hooks.",
            history: history
        )

        XCTAssertTrue(prompt.system.contains("collaborative script revision partner"))
        XCTAssertTrue(prompt.user.contains("Do not overwrite the human's draft"))
        XCTAssertTrue(prompt.user.contains("improved lines, stronger hooks, tighter wording, alternate endings, or source-grounded additions"))
        XCTAssertTrue(prompt.user.contains("user: Can this feel less broad?"))
        XCTAssertTrue(prompt.user.contains("Give me three sharper hooks."))
        XCTAssertTrue(prompt.user.contains("Current script:"))
    }
}
