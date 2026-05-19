import XCTest
@testable import ScriptEditorCore

final class ExportServiceTests: XCTestCase {
    func testRenderApprovedScriptMarkdownIncludesScriptMetadataScorecardAndCitations() {
        let fixture = ExportFixture.make()
        let markdown = ExportService().renderApprovedScriptMarkdown(
            project: fixture.project,
            candidate: fixture.candidate,
            brief: fixture.brief,
            sources: fixture.sources,
            exportedAt: fixture.exportedAt
        )

        XCTAssertTrue(markdown.contains("# Specific Proof Beats Vibes"))
        XCTAssertTrue(markdown.contains("> v1 approved script export"))
        XCTAssertTrue(markdown.contains("- Title: Creator Trust"))
        XCTAssertTrue(markdown.contains("- Topic: short-form evidence"))
        XCTAssertTrue(markdown.contains("- Audience: independent creators"))
        XCTAssertTrue(markdown.contains("- Platform: TikTok"))
        XCTAssertTrue(markdown.contains("- Goal: help creators approve sharper scripts"))
        XCTAssertTrue(markdown.contains("- Exported At: 2026-05-18T12:00:00Z"))

        XCTAssertTrue(markdown.contains("Cold open from final approved edit."))
        XCTAssertFalse(markdown.contains("Draft hook should not win."))
        XCTAssertTrue(markdown.contains("- Angle: receipts create retention"))
        XCTAssertTrue(markdown.contains("- Tags: approval, evidence"))

        XCTAssertTrue(markdown.contains("## Scorecard"))
        XCTAssertTrue(markdown.contains("- Total: 81/90"))
        XCTAssertTrue(markdown.contains("- Premise Strength: 9/10"))
        XCTAssertTrue(markdown.contains("- Flags: needs tighter CTA"))
        XCTAssertTrue(markdown.contains("Rationale:\nGrounded, specific, and clear."))

        XCTAssertTrue(markdown.contains("## Research Brief"))
        XCTAssertTrue(markdown.contains("- Specific proof points increase trust."))
        XCTAssertTrue(markdown.contains("- Interview notes: viewers pause for receipts."))
        XCTAssertTrue(markdown.contains("- Open with the receipt, not the advice."))
        XCTAssertTrue(markdown.contains("- Creators distrust vague growth claims."))

        XCTAssertTrue(markdown.contains("## Source Citations"))
        XCTAssertTrue(markdown.contains("- Brief citation: creator interview batch A"))
        XCTAssertTrue(markdown.contains("- Interview notes [Note] - local-note-1 (first-party interviews)"))
        XCTAssertTrue(markdown.contains("- Platform report [URL] - https://example.com/report"))
    }

    func testRenderApprovedScriptMarkdownDoesNotMutateStoredData() async throws {
        let fixture = ExportFixture.make()
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString)
            .appendingPathComponent("db.json")
        let database = await LocalScriptDatabase(fileURL: url)
        let project = try await database.upsertProject(fixture.project)
        try await database.saveBrief(fixture.brief)
        _ = try await database.addSource(fixture.sources[0])
        try await database.saveRun(
            GenerationRun(
                id: fixture.candidate.runId,
                projectId: fixture.project.id,
                model: "fixture-model",
                candidateCount: 1,
                promptSummary: "fixture"
            ),
            candidates: [fixture.candidate]
        )
        let before = await database.readSnapshot()

        _ = ExportService().renderApprovedScriptMarkdown(
            project: project,
            candidate: fixture.candidate,
            brief: fixture.brief,
            sources: fixture.sources,
            exportedAt: fixture.exportedAt
        )

        let after = await database.readSnapshot()
        XCTAssertEqual(after, before)
    }
}

private enum ExportFixture {
    static func make() -> (
        project: Project,
        candidate: ScriptCandidate,
        brief: ResearchBrief,
        sources: [ResearchSource],
        exportedAt: Date
    ) {
        let projectId = UUID(uuidString: "11111111-1111-1111-1111-111111111111")!
        let runId = UUID(uuidString: "22222222-2222-2222-2222-222222222222")!
        let candidateId = UUID(uuidString: "33333333-3333-3333-3333-333333333333")!
        let createdAt = Date(timeIntervalSince1970: 1_779_081_600)
        let exportedAt = Date(timeIntervalSince1970: 1_779_105_600)
        let project = Project(
            id: projectId,
            title: "Creator Trust",
            topic: "short-form evidence",
            audience: "independent creators",
            platform: .tiktok,
            tone: "smart and direct",
            goal: "help creators approve sharper scripts",
            constraints: "No unverifiable claims.",
            createdAt: createdAt,
            updatedAt: createdAt
        )
        let candidate = ScriptCandidate(
            id: candidateId,
            projectId: projectId,
            runId: runId,
            title: "Specific Proof Beats Vibes",
            angle: "receipts create retention",
            tags: ["approval", "evidence"],
            beats: ScriptBeats(
                hook: "Draft hook should not win.",
                setup: "Show the receipt first.",
                escalation: "Name the vague claim.",
                payoff: "Give the specific alternative.",
                callToActionOrLoop: "Save the checklist.",
                timingNotes: "45 seconds"
            ),
            scorecard: Scorecard(
                premiseStrength: 9,
                originality: 8,
                specificity: 10,
                clarity: 9,
                structure: 9,
                sourceGrounding: 10,
                hookQuality: 9,
                payoffQuality: 8,
                nonSlop: 9,
                flags: ["needs tighter CTA"],
                rationale: "Grounded, specific, and clear."
            ),
            humanEditedText: "Cold open from final approved edit.",
            createdAt: createdAt
        )
        let brief = ResearchBrief(
            projectId: projectId,
            distilledInsights: ["Specific proof points increase trust."],
            claims: ["Interview notes: viewers pause for receipts."],
            angles: ["Open with the receipt, not the advice."],
            audienceTensions: ["Creators distrust vague growth claims."],
            citations: ["Brief citation: creator interview batch A"],
            createdAt: createdAt
        )
        let sources = [
            ResearchSource(
                projectId: projectId,
                kind: .note,
                title: "Interview notes",
                locator: "local-note-1",
                rawText: "Creators trust receipts.",
                credibilityNote: "first-party interviews",
                createdAt: createdAt
            ),
            ResearchSource(
                projectId: projectId,
                kind: .url,
                title: "Platform report",
                locator: "https://example.com/report",
                rawText: "Retention favors specificity.",
                createdAt: createdAt
            )
        ]
        return (project, candidate, brief, sources, exportedAt)
    }
}
