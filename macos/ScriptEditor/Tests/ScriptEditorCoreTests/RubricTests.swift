import XCTest
@testable import ScriptEditorCore

final class RubricTests: XCTestCase {
    func testDefaultRubricDefinesScoreDimensionsAndMaximumTotal() {
        let rubric = Rubric.default

        XCTAssertEqual(rubric.dimensions.map(\.id), [
            "premiseStrength",
            "originality",
            "specificity",
            "clarity",
            "structure",
            "sourceGrounding",
            "hookQuality",
            "payoffQuality",
            "nonSlop"
        ])
        XCTAssertEqual(rubric.maximumTotalScore, 90)
    }

    func testDefaultRubricDefinesNonSlopFlags() {
        let labels = Set(Rubric.default.nonSlopFlags.map(\.label))

        XCTAssertTrue(labels.contains("generic phrasing"))
        XCTAssertTrue(labels.contains("unsupported claims"))
        XCTAssertTrue(labels.contains("filler language"))
        XCTAssertTrue(labels.contains("fake insight"))
    }

    func testScorecardTotalUsesAllRubricDimensions() {
        let scorecard = Scorecard(
            premiseStrength: 1,
            originality: 2,
            specificity: 3,
            clarity: 4,
            structure: 5,
            sourceGrounding: 6,
            hookQuality: 7,
            payoffQuality: 8,
            nonSlop: 9
        )

        XCTAssertEqual(Rubric.default.totalScore(for: scorecard), 45)
    }

    func testHeuristicEvaluatorFlagsGenericUnsupportedSlop() {
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

        let score = Rubric.default.evaluate(candidate: candidate, brief: brief)

        XCTAssertTrue(score.flags.contains("generic phrasing"))
        XCTAssertTrue(score.flags.contains("unsupported claims"))
        XCTAssertTrue(score.flags.contains("filler language"))
        XCTAssertLessThan(score.nonSlop, 8)
    }

    func testHeuristicEvaluatorRewardsSourceGroundingAndStructure() {
        let candidate = ScriptCandidate(
            projectId: UUID(),
            runId: UUID(),
            title: "Proof Beats Vague Advice",
            angle: "Specific proof points beat generic hooks for skeptical viewers",
            beats: ScriptBeats(
                hook: "Why do specific hooks beat generic advice before viewers trust you?",
                setup: "Platform data shows specific hooks outperform generic hooks when viewers need proof quickly.",
                escalation: "The turn is simple: a named proof point gives the viewer something to test, not just a slogan.",
                payoff: "So instead of promising better content, show one concrete before-and-after claim and let the result carry the lesson.",
                callToActionOrLoop: "Save the proof point before you write the next hook."
            )
        )
        let brief = ResearchBrief(
            projectId: candidate.projectId,
            claims: ["Platform data shows specific hooks outperform generic hooks."]
        )

        let score = Rubric.default.evaluate(candidate: candidate, brief: brief)

        XCTAssertGreaterThanOrEqual(score.structure, 8)
        XCTAssertGreaterThanOrEqual(score.sourceGrounding, 6)
        XCTAssertFalse(score.flags.contains("unsupported claims"))
    }
}
