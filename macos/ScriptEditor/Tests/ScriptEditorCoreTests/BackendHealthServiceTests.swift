import Foundation
import XCTest
@testable import ScriptEditorCore

final class BackendHealthServiceTests: XCTestCase {
    override func tearDown() {
        MockURLProtocol.handler = nil
        super.tearDown()
    }

    func testModelsHealthReportsReachableBackend() async {
        MockURLProtocol.handler = { request in
            XCTAssertEqual(request.url?.path, "/v1/models")
            XCTAssertEqual(request.httpMethod, "GET")

            let data = """
            {
              "object": "list",
              "data": [
                { "id": "mlx-community/Qwen3-1.7B-4bit", "object": "model" }
              ]
            }
            """.data(using: .utf8)!
            return (
                HTTPURLResponse(
                    url: request.url!,
                    statusCode: 200,
                    httpVersion: nil,
                    headerFields: ["Content-Type": "application/json"]
                )!,
                data
            )
        }

        let service = BackendHealthService(
            configuration: AIBackendConfiguration(),
            session: makeMockSession(),
            clock: FixedStepClock(times: [
                Date(timeIntervalSince1970: 100),
                Date(timeIntervalSince1970: 100.125)
            ])
        )

        let status = await service.check(mode: .models)

        XCTAssertEqual(status.baseURL, URL(string: "http://127.0.0.1:8081/v1")!)
        XCTAssertEqual(status.model, "mlx-community/Qwen3-1.7B-4bit")
        XCTAssertTrue(status.reachable)
        XCTAssertEqual(status.latency, 0.125, accuracy: 0.001)
        XCTAssertEqual(status.message, "Backend is reachable and model is available.")
    }

    func testChatCompletionsFailureReportsUnreachableBackend() async {
        MockURLProtocol.handler = { request in
            XCTAssertEqual(request.url?.path, "/v1/chat/completions")
            XCTAssertEqual(request.httpMethod, "POST")
            XCTAssertEqual(request.value(forHTTPHeaderField: "Content-Type"), "application/json")

            let data = #"{"error":"model not loaded"}"#.data(using: .utf8)!
            return (
                HTTPURLResponse(
                    url: request.url!,
                    statusCode: 503,
                    httpVersion: nil,
                    headerFields: ["Content-Type": "application/json"]
                )!,
                data
            )
        }

        let service = BackendHealthService(
            configuration: AIBackendConfiguration(),
            session: makeMockSession(),
            clock: FixedStepClock(times: [
                Date(timeIntervalSince1970: 200),
                Date(timeIntervalSince1970: 200.25)
            ])
        )

        let status = await service.check(mode: .chatCompletions)

        XCTAssertFalse(status.reachable)
        XCTAssertEqual(status.latency, 0.25, accuracy: 0.001)
        XCTAssertEqual(status.message, #"The AI backend returned HTTP 503: {"error":"model not loaded"}"#)
    }

    private func makeMockSession() -> URLSession {
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [MockURLProtocol.self]
        return URLSession(configuration: configuration)
    }
}

private final class MockURLProtocol: URLProtocol {
    static var handler: ((URLRequest) throws -> (HTTPURLResponse, Data))?

    override class func canInit(with request: URLRequest) -> Bool {
        true
    }

    override class func canonicalRequest(for request: URLRequest) -> URLRequest {
        request
    }

    override func startLoading() {
        guard let handler = Self.handler else {
            client?.urlProtocol(self, didFailWithError: URLError(.badServerResponse))
            return
        }

        do {
            let (response, data) = try handler(request)
            client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
            client?.urlProtocol(self, didLoad: data)
            client?.urlProtocolDidFinishLoading(self)
        } catch {
            client?.urlProtocol(self, didFailWithError: error)
        }
    }

    override func stopLoading() {}
}

private final class FixedStepClock: BackendHealthClock, @unchecked Sendable {
    private var times: [Date]

    init(times: [Date]) {
        self.times = times
    }

    var now: Date {
        if times.count > 1 {
            return times.removeFirst()
        }
        return times.first ?? Date()
    }
}
