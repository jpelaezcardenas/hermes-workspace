import Foundation

public struct BackendHealthStatus: Equatable, Sendable {
    public var baseURL: URL
    public var model: String
    public var reachable: Bool
    public var latency: TimeInterval
    public var message: String

    public init(baseURL: URL, model: String, reachable: Bool, latency: TimeInterval, message: String) {
        self.baseURL = baseURL
        self.model = model
        self.reachable = reachable
        self.latency = latency
        self.message = message
    }
}

public enum BackendHealthCheckMode: Sendable {
    case models
    case chatCompletions
    case modelsThenChatCompletions
}

public final class BackendHealthService: @unchecked Sendable {
    private let configuration: AIBackendConfiguration
    private let session: URLSession
    private let clock: any BackendHealthClock

    public init(
        configuration: AIBackendConfiguration = AIBackendConfiguration(),
        session: URLSession = .shared,
        clock: any BackendHealthClock = SystemBackendHealthClock()
    ) {
        self.configuration = configuration
        self.session = session
        self.clock = clock
    }

    public func check(mode: BackendHealthCheckMode = .modelsThenChatCompletions) async -> BackendHealthStatus {
        let startedAt = clock.now
        let result: HealthResult

        do {
            switch mode {
            case .models:
                result = try await checkModels()
            case .chatCompletions:
                result = try await checkChatCompletions()
            case .modelsThenChatCompletions:
                result = try await checkModelsThenChatCompletions()
            }
        } catch {
            result = .unhealthy(message: error.localizedDescription)
        }

        return BackendHealthStatus(
            baseURL: configuration.baseURL,
            model: configuration.model,
            reachable: result.reachable,
            latency: clock.now.timeIntervalSince(startedAt),
            message: result.message
        )
    }

    private func checkModelsThenChatCompletions() async throws -> HealthResult {
        do {
            return try await checkModels()
        } catch {
            return try await checkChatCompletions()
        }
    }

    private func checkModels() async throws -> HealthResult {
        var request = URLRequest(url: configuration.baseURL.appendingPathComponent("models"))
        request.httpMethod = "GET"
        applyAuthorization(to: &request)

        let (data, response) = try await session.data(for: request)
        try validate(response: response, data: data)

        guard let decoded = try? JSONDecoder().decode(ModelsResponse.self, from: data) else {
            return .healthy(message: "Backend responded to /models.")
        }

        let ids = decoded.data.map(\.id)
        if ids.contains(configuration.model) {
            return .healthy(message: "Backend is reachable and model is available.")
        }
        if ids.isEmpty {
            return .healthy(message: "Backend is reachable; /models returned no model ids.")
        }
        return .healthy(message: "Backend is reachable; configured model was not listed by /models.")
    }

    private func checkChatCompletions() async throws -> HealthResult {
        var request = URLRequest(url: configuration.baseURL.appendingPathComponent("chat/completions"))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        applyAuthorization(to: &request)
        request.httpBody = try JSONEncoder().encode(ChatHealthRequest(
            model: configuration.model,
            messages: [
                ChatMessage(role: "user", content: "Reply with OK.")
            ],
            temperature: 0,
            maxTokens: 4,
            stream: false
        ))

        let (data, response) = try await session.data(for: request)
        try validate(response: response, data: data)

        if let decoded = try? JSONDecoder().decode(ChatHealthResponse.self, from: data),
           let content = decoded.choices.first?.message.content.trimmingCharacters(in: .whitespacesAndNewlines),
           !content.isEmpty {
            return .healthy(message: "Backend responded to chat completions.")
        }
        return .healthy(message: "Backend accepted chat completions request.")
    }

    private func applyAuthorization(to request: inout URLRequest) {
        guard !configuration.apiKey.isEmpty else { return }
        request.setValue("Bearer \(configuration.apiKey)", forHTTPHeaderField: "Authorization")
    }

    private func validate(response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else {
            throw BackendHealthError.invalidResponse
        }
        guard (200..<300).contains(http.statusCode) else {
            let body = String(data: data, encoding: .utf8) ?? ""
            throw BackendHealthError.badStatus(http.statusCode, body)
        }
    }
}

public protocol BackendHealthClock: Sendable {
    var now: Date { get }
}

public struct SystemBackendHealthClock: BackendHealthClock {
    public init() {}

    public var now: Date {
        Date()
    }
}

public enum BackendHealthError: Error, LocalizedError, Equatable {
    case invalidResponse
    case badStatus(Int, String)

    public var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "The AI backend returned an invalid response."
        case .badStatus(let code, let body):
            let detail = body.trimmingCharacters(in: .whitespacesAndNewlines)
            if detail.isEmpty {
                return "The AI backend returned HTTP \(code)."
            }
            return "The AI backend returned HTTP \(code): \(detail)"
        }
    }
}

private enum HealthResult {
    case healthy(message: String)
    case unhealthy(message: String)

    var reachable: Bool {
        switch self {
        case .healthy:
            return true
        case .unhealthy:
            return false
        }
    }

    var message: String {
        switch self {
        case .healthy(let message), .unhealthy(let message):
            return message
        }
    }
}

private struct ModelsResponse: Decodable {
    var data: [Model]

    struct Model: Decodable {
        var id: String
    }
}

private struct ChatHealthRequest: Encodable {
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

private struct ChatHealthResponse: Decodable {
    var choices: [Choice]

    struct Choice: Decodable {
        var message: ChatMessage
    }
}
