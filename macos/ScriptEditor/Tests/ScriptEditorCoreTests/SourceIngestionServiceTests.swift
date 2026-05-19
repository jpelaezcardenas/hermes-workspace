import XCTest
@testable import ScriptEditorCore

final class SourceIngestionServiceTests: XCTestCase {
    func testIngestNoteBuildsResearchSourceWithFacts() throws {
        let projectId = UUID()
        let service = SourceIngestionService()

        let source = try service.ingestNote(
            projectId: projectId,
            title: "  Field notes  ",
            text: """
            Creators said vague hooks feel skippable.
            A 2025 internal review found specific proof points increased retention by 18%.
            """
        )

        XCTAssertEqual(source.projectId, projectId)
        XCTAssertEqual(source.kind, .note)
        XCTAssertEqual(source.title, "Field notes")
        XCTAssertEqual(source.credibilityNote, "User-provided local note")
        XCTAssertTrue(source.rawText.contains("specific proof points"))
        XCTAssertEqual(source.extractedFacts, [
            "A 2025 internal review found specific proof points increased retention by 18%."
        ])
    }

    func testIngestFileReadsSupportedPlainTextFile() throws {
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let fileURL = directory.appendingPathComponent("source.md")
        try """
        # Source

        According to the survey, 64% of viewers stayed longer when the hook named a concrete mistake.
        Generic sentence without evidence.
        """.write(to: fileURL, atomically: true, encoding: .utf8)

        let source = try SourceIngestionService().ingestFile(projectId: UUID(), fileURL: fileURL)

        XCTAssertEqual(source.kind, .file)
        XCTAssertEqual(source.title, "source")
        XCTAssertEqual(source.locator, fileURL.path)
        XCTAssertEqual(source.credibilityNote, "Imported from local .md file")
        XCTAssertEqual(source.extractedFacts.first, "According to the survey, 64% of viewers stayed longer when the hook named a concrete mistake.")
    }

    func testFactExtractionPrioritizesEvidenceHeavySentences() {
        let facts = SourceIngestionService.extractFacts(from: """
        This is an interesting but generic observation.
        Research showed completion increased by 22% after creators named the exact tradeoff.
        The team liked shorter scripts.
        According to interviews, 7 of 10 editors wanted more citation-ready claims.
        """, maxFacts: 2)

        XCTAssertEqual(facts, [
            "Research showed completion increased by 22% after creators named the exact tradeoff.",
            "According to interviews, 7 of 10 editors wanted more citation-ready claims."
        ])
    }

    func testIngestFileAcceptsFileURLStringLocator() throws {
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let fileURL = directory.appendingPathComponent("metrics.csv")
        try "label,value\nRetention increased,31%\n".write(to: fileURL, atomically: true, encoding: .utf8)

        let source = try SourceIngestionService().ingestFile(projectId: UUID(), locator: fileURL.absoluteString)

        XCTAssertEqual(source.kind, .file)
        XCTAssertEqual(source.title, "metrics")
        XCTAssertEqual(source.locator, fileURL.path)
        XCTAssertTrue(source.rawText.contains("Retention increased,31%"))
    }

    func testUnsupportedExtensionThrowsRecoverableError() {
        let fileURL = FileManager.default.temporaryDirectory.appendingPathComponent("clip.pdf")

        XCTAssertThrowsError(try SourceIngestionService().ingestFile(projectId: UUID(), fileURL: fileURL)) { error in
            XCTAssertEqual(error as? SourceIngestionService.IngestionError, .unsupportedExtension("pdf"))
            XCTAssertTrue((error as? SourceIngestionService.IngestionError)?.isRecoverable == true)
        }
    }
}
