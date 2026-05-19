// swift-tools-version: 5.9

import PackageDescription

let package = Package(
    name: "ScriptEditor",
    platforms: [
        .macOS(.v14)
    ],
    products: [
        .library(name: "ScriptEditorCore", targets: ["ScriptEditorCore"]),
        .executable(name: "ScriptEditorApp", targets: ["ScriptEditorApp"]),
    ],
    dependencies: [],
    targets: [
        .target(name: "ScriptEditorCore"),
        .executableTarget(
            name: "ScriptEditorApp",
            dependencies: ["ScriptEditorCore"]
        ),
        .testTarget(
            name: "ScriptEditorCoreTests",
            dependencies: ["ScriptEditorCore"]
        ),
    ]
)
