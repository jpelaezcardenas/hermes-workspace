import Foundation

public struct SourceIngestionService: Sendable {
    public enum IngestionError: Error, Equatable, LocalizedError {
        case emptyNote
        case unreadableFile(URL)
        case unsupportedExtension(String)

        public var errorDescription: String? {
            switch self {
            case .emptyNote:
                return "The note is empty."
            case .unreadableFile(let url):
                return "Could not read text from \(url.lastPathComponent)."
            case .unsupportedExtension(let fileExtension):
                return "Unsupported source type: .\(fileExtension)"
            }
        }

        public var isRecoverable: Bool {
            switch self {
            case .unsupportedExtension:
                return true
            case .emptyNote, .unreadableFile:
                return false
            }
        }
    }

    public static let supportedExtensions: Set<String> = ["txt", "md", "csv", "json"]

    public init() {}

    public func ingestNote(
        projectId: UUID,
        title: String,
        text: String,
        locator: String = ""
    ) throws -> ResearchSource {
        let normalizedText = Self.normalized(text)
        guard !normalizedText.isEmpty else {
            throw IngestionError.emptyNote
        }

        return ResearchSource(
            projectId: projectId,
            kind: .note,
            title: title.trimmedOr("Untitled note"),
            locator: locator,
            rawText: normalizedText,
            extractedFacts: Self.extractFacts(from: normalizedText),
            credibilityNote: "User-provided local note"
        )
    }

    public func ingestFile(
        projectId: UUID,
        fileURL: URL,
        title: String? = nil
    ) throws -> ResearchSource {
        let fileExtension = fileURL.pathExtension.lowercased()
        guard Self.supportedExtensions.contains(fileExtension) else {
            throw IngestionError.unsupportedExtension(fileExtension.isEmpty ? "unknown" : fileExtension)
        }

        let rawText: String
        do {
            rawText = try String(contentsOf: fileURL, encoding: .utf8)
        } catch {
            do {
                rawText = try String(contentsOf: fileURL)
            } catch {
                throw IngestionError.unreadableFile(fileURL)
            }
        }

        let normalizedText = Self.normalized(rawText)
        guard !normalizedText.isEmpty else {
            throw IngestionError.unreadableFile(fileURL)
        }

        return ResearchSource(
            projectId: projectId,
            kind: .file,
            title: title?.trimmedOr(fileURL.deletingPathExtension().lastPathComponent) ?? fileURL.deletingPathExtension().lastPathComponent,
            locator: fileURL.path,
            rawText: normalizedText,
            extractedFacts: Self.extractFacts(from: normalizedText),
            credibilityNote: "Imported from local .\(fileExtension) file"
        )
    }

    public func ingestFile(
        projectId: UUID,
        path: String,
        title: String? = nil
    ) throws -> ResearchSource {
        try ingestFile(projectId: projectId, fileURL: URL(fileURLWithPath: path), title: title)
    }

    public func ingestFile(
        projectId: UUID,
        locator: String,
        title: String? = nil
    ) throws -> ResearchSource {
        let url = URL(string: locator).flatMap { $0.isFileURL ? $0 : nil } ?? URL(fileURLWithPath: locator)
        return try ingestFile(projectId: projectId, fileURL: url, title: title)
    }

    public static func extractFacts(from text: String, maxFacts: Int = 8) -> [String] {
        let candidates = normalized(text)
            .components(separatedBy: CharacterSet(charactersIn: ".!?\n"))
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { $0.count >= 24 }
            .enumerated()
            .sorted {
                let leftScore = factScore($0.element)
                let rightScore = factScore($1.element)
                return leftScore == rightScore ? $0.offset < $1.offset : leftScore > rightScore
            }
            .map(\.element)

        var facts: [String] = []
        var seen = Set<String>()
        for candidate in candidates where factScore(candidate) > 0 {
            let fact = candidate.finishedSentence
            let key = fact.lowercased()
            guard !seen.contains(key) else { continue }
            facts.append(fact)
            seen.insert(key)
            if facts.count == maxFacts { break }
        }
        return facts
    }

    private static func normalized(_ text: String) -> String {
        text.replacingOccurrences(of: "\r\n", with: "\n")
            .replacingOccurrences(of: "\r", with: "\n")
            .components(separatedBy: .newlines)
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
            .joined(separator: "\n")
    }

    private static func factScore(_ text: String) -> Int {
        let lowercased = text.lowercased()
        let evidenceTerms = [
            "according to", "reported", "found", "shows", "showed", "study",
            "survey", "research", "because", "therefore", "increased", "decreased"
        ]
        var score = evidenceTerms.reduce(0) { partial, term in
            partial + (lowercased.contains(term) ? 2 : 0)
        }
        if text.rangeOfCharacter(from: .decimalDigits) != nil {
            score += 3
        }
        if lowercased.contains("%") || lowercased.contains("$") {
            score += 2
        }
        if lowercased.contains(":") || lowercased.contains(",") {
            score += 1
        }
        return score
    }
}

private extension String {
    func trimmedOr(_ fallback: String) -> String {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? fallback : trimmed
    }

    var finishedSentence: String {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        guard let last = trimmed.last, ".!?".contains(last) else {
            return "\(trimmed)."
        }
        return trimmed
    }
}
