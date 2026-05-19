import SwiftUI

@main
struct ScriptEditorApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .frame(minWidth: 1180, minHeight: 760)
        }
        .windowStyle(.titleBar)
        .windowToolbarStyle(.unified)
    }
}
