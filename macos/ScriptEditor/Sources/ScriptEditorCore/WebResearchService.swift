import Foundation

public struct SearchResult: Codable, Identifiable, Equatable {
    public var id: UUID
    public var title: String
    public var url: String
    public var snippet: String

    public init(id: UUID = UUID(), title: String, url: String, snippet: String) {
        self.id = id
        self.title = title
        self.url = url
        self.snippet = snippet
    }
}

public protocol WebResearching: Sendable {
    func fetchURL(_ url: URL) async throws -> String
    func search(query: String, limit: Int) async throws -> [SearchResult]
}

public final class WebResearchService: WebResearching, @unchecked Sendable {
    private let session: URLSession

    public init(session: URLSession = .shared) {
        self.session = session
    }

    public func fetchURL(_ url: URL) async throws -> String {
        let (data, response) = try await session.data(from: url)
        guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
            throw URLError(.badServerResponse)
        }
        let html = String(data: data, encoding: .utf8) ?? ""
        return Self.plainText(fromHTML: html)
    }

    public func search(query: String, limit: Int = 6) async throws -> [SearchResult] {
        var components = URLComponents(string: "https://duckduckgo.com/html/")!
        components.queryItems = [URLQueryItem(name: "q", value: query)]
        let url = components.url!
        let html = try await fetchURL(url)
        let lines = html
            .components(separatedBy: .newlines)
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .filter { !$0.isEmpty }
        return Array(lines.prefix(limit)).enumerated().map { index, line in
            SearchResult(title: "Search note \(index + 1)", url: url.absoluteString, snippet: line)
        }
    }

    static func plainText(fromHTML html: String) -> String {
        var text = html.replacingOccurrences(of: "<script[\\s\\S]*?</script>", with: " ", options: .regularExpression)
        text = text.replacingOccurrences(of: "<style[\\s\\S]*?</style>", with: " ", options: .regularExpression)
        text = text.replacingOccurrences(of: "<[^>]+>", with: " ", options: .regularExpression)
        text = text.replacingOccurrences(of: "&nbsp;", with: " ")
        text = text.replacingOccurrences(of: "&amp;", with: "&")
        text = text.replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
        return String(text.prefix(20_000)).trimmingCharacters(in: .whitespacesAndNewlines)
    }
}
