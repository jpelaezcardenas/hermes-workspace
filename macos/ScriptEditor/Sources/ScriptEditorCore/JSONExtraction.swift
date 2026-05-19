import Foundation

public enum JSONExtraction {
    public static func decodeObject<T: Decodable>(_ type: T.Type, from text: String) throws -> T {
        let data = Data(extractJSON(from: text).utf8)
        return try JSONDecoder.scriptEditor.decode(T.self, from: data)
    }

    private static func extractJSON(from text: String) -> String {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.first == "{" || trimmed.first == "[" { return trimmed }
        if let fenced = trimmed.range(of: "```json") {
            let afterFence = trimmed[fenced.upperBound...]
            if let end = afterFence.range(of: "```") {
                return String(afterFence[..<end.lowerBound]).trimmingCharacters(in: .whitespacesAndNewlines)
            }
        }
        if let firstObject = trimmed.firstIndex(of: "{"), let lastObject = trimmed.lastIndex(of: "}"), firstObject < lastObject {
            return String(trimmed[firstObject...lastObject])
        }
        if let firstArray = trimmed.firstIndex(of: "["), let lastArray = trimmed.lastIndex(of: "]"), firstArray < lastArray {
            return String(trimmed[firstArray...lastArray])
        }
        return trimmed
    }
}
