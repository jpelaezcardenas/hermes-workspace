import XCTest
@testable import ScriptEditorCore

final class ApprovalServiceTests: XCTestCase {
    func testApproveUsesHumanEditedTextWhenPresent() {
        let fixture = ApprovalFixture.make(humanEditedText: "Final human pass wins.")
        let approvedAt = Date(timeIntervalSince1970: 1_779_105_600)

        let approved = ApprovalService().approve(
            project: fixture.project,
            candidate: fixture.candidate,
            brief: fixture.brief,
            reviewerNote: "Ready for export.",
            approvedAt: approvedAt
        )

        XCTAssertEqual(approved.project, fixture.project)
        XCTAssertEqual(approved.candidate, fixture.candidate)
        XCTAssertEqual(approved.brief, fixture.brief)
        XCTAssertEqual(approved.scriptText, "Final human pass wins.")
        XCTAssertEqual(approved.approvedAt, approvedAt)
        XCTAssertEqual(approved.reviewerNote, "Ready for export.")
        XCTAssertEqual(approved.projectId, fixture.project.id)
        XCTAssertEqual(approved.candidateId, fixture.candidate.id)
    }

    func testApproveFallsBackToBeatTranscriptWithoutHumanEditedText() {
        let fixture = ApprovalFixture.make(humanEditedText: " \n\t ")

        let approved = ApprovalService().approve(
            project: fixture.project,
            candidate: fixture.candidate,
            brief: fixture.brief
        )

        XCTAssertEqual(
            approved.scriptText,
            """
            Draft hook.

            Draft setup.

            Draft escalation.

            Draft payoff.

            Draft loop.
            """
        )
    }

    func testApprovePreservesCandidateDataImmutably() {
        let fixture = ApprovalFixture.make(humanEditedText: "Approved version.")
        var candidate = fixture.candidate
        let approved = ApprovalService().approve(
            project: fixture.project,
            candidate: candidate,
            brief: fixture.brief
        )

        candidate.title = "Mutated After Approval"
        candidate.angle = "mutated angle"
        candidate.tags.append("mutated")
        candidate.beats.hook = "Mutated hook."
        candidate.humanEditedText = "Mutated approved text."
        candidate.versionHistory.append("mutated history")

        XCTAssertEqual(approved.candidate, fixture.candidate)
        XCTAssertEqual(approved.scriptText, "Approved version.")
        XCTAssertNotEqual(approved.candidate, candidate)
        XCTAssertNotEqual(approved.scriptText, candidate.displayText)
    }
}

private enum ApprovalFixture {
    static func make(humanEditedText: String) -> (
        project: Project,
        candidate: ScriptCandidate,
        brief: ResearchBrief
    ) {
        let projectId = UUID(uuidString: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")!
        let runId = UUID(uuidString: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")!
        let candidateId = UUID(uuidString: "cccccccc-cccc-cccc-cccc-cccccccccccc")!
        let createdAt = Date(timeIntervalSince1970: 1_779_081_600)

        let project = Project(
            id: projectId,
            title: "Approval Flow",
            topic: "human review",
            audience: "script editors",
            platform: .shorts,
            tone: "precise",
            goal: "approve without posting",
            constraints: "Keep approval local.",
            createdAt: createdAt,
            updatedAt: createdAt
        )
        let candidate = ScriptCandidate(
            id: candidateId,
            projectId: projectId,
            runId: runId,
            title: "Local Approval",
            angle: "approval is separate from publishing",
            tags: ["approval", "review"],
            beats: ScriptBeats(
                hook: "Draft hook.",
                setup: "Draft setup.",
                escalation: "Draft escalation.",
                payoff: "Draft payoff.",
                callToActionOrLoop: "Draft loop.",
                timingNotes: "60 seconds"
            ),
            scorecard: Scorecard(
                premiseStrength: 8,
                originality: 7,
                specificity: 9,
                clarity: 8,
                structure: 8,
                sourceGrounding: 7,
                hookQuality: 8,
                payoffQuality: 8,
                nonSlop: 9,
                flags: ["reviewed"],
                rationale: "Ready after human pass."
            ),
            humanEditedText: humanEditedText,
            versionHistory: ["agent draft", "human edit"],
            createdAt: createdAt
        )
        let brief = ResearchBrief(
            projectId: projectId,
            distilledInsights: ["Approval should be explicit."],
            claims: ["Publishing remains a later action."],
            angles: ["Separate approval from distribution."],
            audienceTensions: ["Editors want control."],
            citations: ["Internal workflow note"],
            createdAt: createdAt
        )

        return (project, candidate, brief)
    }
}
