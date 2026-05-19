import XCTest
@testable import ScriptEditorCore

final class WorkflowEngineTests: XCTestCase {
    func testDatabasePersistsProjectsSourcesAndBriefs() async throws {
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
            .appendingPathComponent("db.json")
        let database = await LocalScriptDatabase(fileURL: url)
        let project = try await database.upsertProject(Project(title: "Retention Test", topic: "short-form hooks"))
        _ = try await database.addSource(ResearchSource(
            projectId: project.id,
            kind: .note,
            title: "Interview notes",
            rawText: "Specific proof points beat vague creator advice when viewers need trust quickly."
        ))
        try await database.saveBrief(ResearchBrief(
            projectId: project.id,
            distilledInsights: ["Specific proof points increase trust."],
            claims: ["Interview notes: proof points beat vague advice."],
            angles: ["Specificity beats generic hooks."]
        ))

        let reloaded = await LocalScriptDatabase(fileURL: url)
        let snapshot = await reloaded.readSnapshot()

        XCTAssertEqual(snapshot.projects.count, 1)
        XCTAssertEqual(snapshot.sources.count, 1)
        XCTAssertEqual(snapshot.briefs.count, 1)
    }

    func testHeuristicScoreFlagsGenericUnsupportedSlop() {
        let candidate = ScriptCandidate(
            projectId: UUID(),
            runId: UUID(),
            title: "Generic",
            angle: "Do better",
            beats: ScriptBeats(
                hook: "Here are tips",
                setup: "In today's world you need to know this game changer.",
                escalation: "Everyone knows it is really basically actually very important.",
                payoff: "Unlock success.",
                callToActionOrLoop: "Follow for more."
            )
        )
        let brief = ResearchBrief(
            projectId: candidate.projectId,
            claims: ["Platform data shows specific hooks outperform generic hooks."]
        )

        let score = WorkflowEngine.heuristicScore(for: candidate, brief: brief)

        XCTAssertTrue(score.flags.contains("generic phrasing"))
        XCTAssertTrue(score.flags.contains("unsupported claims"))
        XCTAssertTrue(score.flags.contains("filler language"))
        XCTAssertLessThan(score.nonSlop, 8)
    }

    func testTopCandidatesReturnsTenHighestRanked() {
        let engine = WorkflowEngine(ai: FakeAI(response: "{}"))
        let projectId = UUID()
        let runId = UUID()
        let candidates = (0..<15).map { index in
            ScriptCandidate(
                projectId: projectId,
                runId: runId,
                title: "Candidate \(index)",
                angle: "Angle \(index)",
                beats: ScriptBeats(hook: "Hook \(index)", setup: "Setup", escalation: "Escalation", payoff: "Payoff"),
                scorecard: Scorecard(
                    premiseStrength: index,
                    originality: index,
                    specificity: index,
                    clarity: index,
                    structure: index,
                    sourceGrounding: index,
                    hookQuality: index,
                    payoffQuality: index,
                    nonSlop: index
                )
            )
        }

        let top = engine.topCandidates(from: candidates)

        XCTAssertEqual(top.count, 10)
        XCTAssertEqual(top.first?.title, "Candidate 14")
        XCTAssertEqual(top.last?.title, "Candidate 5")
    }

    func testGenerateCandidatesFallsBackToRequestedRange() async {
        let engine = WorkflowEngine(ai: FakeAI(response: "not json"))
        let project = Project(topic: "local AI workflows", audience: "indie creators", goal: "make script decisions sharper")
        let brief = ResearchBrief(
            projectId: project.id,
            claims: ["Local endpoints let the app keep working without hosted model calls."],
            angles: ["Local AI as a faster drafting loop."]
        )

        let (run, candidates) = await engine.generateCandidates(project: project, brief: brief, count: 41, model: "qwen-local")

        XCTAssertEqual(run.candidateCount, 40)
        XCTAssertEqual(candidates.count, 40)
        XCTAssertTrue(candidates.allSatisfy { !$0.beats.hook.isEmpty })
    }
}

private struct FakeAI: AITextGenerating {
    var response: String

    func complete(messages: [ChatMessage], temperature: Double, maxTokens: Int) async throws -> String {
        response
    }
}
