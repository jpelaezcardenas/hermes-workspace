import Foundation

public struct ChatMessage: Codable, Equatable {
    public var role: String
    public var content: String

    public init(role: String, content: String) {
        self.role = role
        self.content = content
    }
}

public struct AIBackendConfiguration: Codable, Equatable {
    public var baseURL: URL
    public var model: String
    public var apiKey: String

    public init(
        baseURL: URL = URL(string: "http://127.0.0.1:8081/v1")!,
        model: String = "mlx-community/Qwen3-1.7B-4bit",
        apiKey: String = ""
    ) {
        self.baseURL = baseURL
        self.model = model
        self.apiKey = apiKey
    }
}

public protocol AITextGenerating: Sendable {
    func complete(messages: [ChatMessage], temperature: Double, maxTokens: Int) async throws -> String
}

public final class OpenAICompatibleClient: AITextGenerating, @unchecked Sendable {
    private let configuration: AIBackendConfiguration
    private let session: URLSession

    public init(configuration: AIBackendConfiguration = AIBackendConfiguration(), session: URLSession = .shared) {
        self.configuration = configuration
        self.session = session
    }

    public func complete(messages: [ChatMessage], temperature: Double = 0.7, maxTokens: Int = 1400) async throws -> String {
        let endpoint = configuration.baseURL.appendingPathComponent("chat/completions")
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if !configuration.apiKey.isEmpty {
            request.setValue("Bearer \(configuration.apiKey)", forHTTPHeaderField: "Authorization")
        }
        request.httpBody = try JSONEncoder().encode(ChatCompletionRequest(
            model: configuration.model,
            messages: messages,
            temperature: temperature,
            maxTokens: maxTokens,
            stream: false
        ))

        let (data, response) = try await session.data(for: request)
        guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
            let body = String(data: data, encoding: .utf8) ?? ""
            throw AIClientError.badResponse(body)
        }

        let decoded = try JSONDecoder().decode(ChatCompletionResponse.self, from: data)
        guard let content = decoded.choices.first?.message.content, !content.isEmpty else {
            throw AIClientError.emptyResponse
        }
        return content
    }
}

public enum AIClientError: Error, LocalizedError, Equatable {
    case badResponse(String)
    case emptyResponse

    public var errorDescription: String? {
        switch self {
        case .badResponse(let body):
            return "The AI backend returned an error: \(body)"
        case .emptyResponse:
            return "The AI backend returned an empty response."
        }
    }
}

private struct ChatCompletionRequest: Codable {
    var model: String
    var messages: [ChatMessage]
    var temperature: Double
    var maxTokens: Int
    var stream: Bool

    enum CodingKeys: String, CodingKey {
        case model, messages, temperature, stream
        case maxTokens = "max_tokens"
    }
}

private struct ChatCompletionResponse: Codable {
    var choices: [Choice]

    struct Choice: Codable {
        var message: ChatMessage
    }
}
