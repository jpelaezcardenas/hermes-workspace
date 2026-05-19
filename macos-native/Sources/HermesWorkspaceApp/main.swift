import AppKit
import WebKit

private enum HermesEndpoint {
    static let workspace = URL(string: "http://127.0.0.1:3000")!
    static let console = URL(string: "http://127.0.0.1:5128")!
    static let dashboardStatus = URL(string: "http://127.0.0.1:9119/api/status")!

    static let launchAgents = [
        "ai.hermes.gateway",
        "dev.hermes.local-dashboard",
        "dev.hermes.workspace",
        "dev.hermes.local-console",
    ]
}

@main
final class HermesWorkspaceApp: NSObject, NSApplicationDelegate {
    private var window: NSWindow!
    private var webView: WKWebView!
    private var statusItem: NSToolbarItem!

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.regular)
        buildWindow()
        kickstartHermesServices()
        load(HermesEndpoint.workspace)
        refreshStatus()
        NSApp.activate(ignoringOtherApps: true)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        true
    }

    private func buildWindow() {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        configuration.websiteDataStore = .default()

        webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = self
        webView.allowsBackForwardNavigationGestures = true

        window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 1280, height: 820),
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered,
            defer: false
        )
        window.center()
        window.minSize = NSSize(width: 980, height: 640)
        window.title = "Hermes Workspace"
        window.titlebarAppearsTransparent = true
        window.toolbarStyle = .unifiedCompact
        window.contentView = webView
        window.toolbar = buildToolbar()
        window.makeKeyAndOrderFront(nil)
    }

    private func buildToolbar() -> NSToolbar {
        let toolbar = NSToolbar(identifier: "HermesWorkspaceToolbar")
        toolbar.displayMode = .iconAndLabel
        toolbar.delegate = self
        return toolbar
    }

    private func load(_ url: URL) {
        webView.load(URLRequest(url: url))
    }

    @objc private func openWorkspace() {
        load(HermesEndpoint.workspace)
    }

    @objc private func openConsole() {
        load(HermesEndpoint.console)
    }

    @objc private func reloadPage() {
        webView.reload()
        refreshStatus()
    }

    @objc private func openInBrowser() {
        NSWorkspace.shared.open(webView.url ?? HermesEndpoint.workspace)
    }

    @objc private func restartServices() {
        kickstartHermesServices()
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { [weak self] in
            self?.refreshStatus()
            self?.webView.reload()
        }
    }

    private func refreshStatus() {
        setStatus("Checking...")
        var request = URLRequest(url: HermesEndpoint.dashboardStatus)
        request.timeoutInterval = 2

        URLSession.shared.dataTask(with: request) { [weak self] _, response, error in
            DispatchQueue.main.async {
                if error == nil, let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) {
                    self?.setStatus("Connected")
                } else {
                    self?.setStatus("Starting")
                }
            }
        }.resume()
    }

    private func setStatus(_ value: String) {
        statusItem.label = value
        statusItem.toolTip = "Hermes dashboard status: \(value)"
    }

    private func kickstartHermesServices() {
        let userDomain = "gui/\(getuid())"

        DispatchQueue.global(qos: .utility).async {
            for label in HermesEndpoint.launchAgents {
                _ = Self.run("/bin/launchctl", arguments: ["kickstart", "\(userDomain)/\(label)"])
            }
        }
    }

    private static func run(_ launchPath: String, arguments: [String]) -> Int32 {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: launchPath)
        process.arguments = arguments
        process.standardOutput = Pipe()
        process.standardError = Pipe()

        do {
            try process.run()
            process.waitUntilExit()
            return process.terminationStatus
        } catch {
            return -1
        }
    }
}

extension HermesWorkspaceApp: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        window.title = webView.title?.isEmpty == false ? webView.title! : "Hermes Workspace"
        refreshStatus()
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        setStatus("Offline")
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        setStatus("Offline")
    }
}

extension HermesWorkspaceApp: NSToolbarDelegate {
    func toolbarAllowedItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier] {
        [
            .workspace,
            .console,
            .reload,
            .restartServices,
            .openInBrowser,
            .flexibleSpace,
            .status,
        ]
    }

    func toolbarDefaultItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier] {
        [
            .workspace,
            .console,
            .reload,
            .restartServices,
            .flexibleSpace,
            .status,
            .openInBrowser,
        ]
    }

    func toolbar(_ toolbar: NSToolbar, itemForItemIdentifier identifier: NSToolbarItem.Identifier, willBeInsertedIntoToolbar flag: Bool) -> NSToolbarItem? {
        switch identifier {
        case .workspace:
            return button(identifier, label: "Workspace", symbol: "rectangle.grid.2x2", action: #selector(openWorkspace))
        case .console:
            return button(identifier, label: "Console", symbol: "terminal", action: #selector(openConsole))
        case .reload:
            return button(identifier, label: "Reload", symbol: "arrow.clockwise", action: #selector(reloadPage))
        case .restartServices:
            return button(identifier, label: "Start", symbol: "bolt.circle", action: #selector(restartServices))
        case .openInBrowser:
            return button(identifier, label: "Browser", symbol: "safari", action: #selector(openInBrowser))
        case .status:
            statusItem = NSToolbarItem(itemIdentifier: identifier)
            statusItem.label = "Checking..."
            statusItem.paletteLabel = "Hermes Status"
            return statusItem
        default:
            return nil
        }
    }

    private func button(_ identifier: NSToolbarItem.Identifier, label: String, symbol: String, action: Selector) -> NSToolbarItem {
        let item = NSToolbarItem(itemIdentifier: identifier)
        item.label = label
        item.paletteLabel = label
        item.toolTip = label
        item.target = self
        item.action = action

        if #available(macOS 11.0, *) {
            item.image = NSImage(systemSymbolName: symbol, accessibilityDescription: label)
        }

        return item
    }
}

private extension NSToolbarItem.Identifier {
    static let workspace = NSToolbarItem.Identifier("HermesWorkspace")
    static let console = NSToolbarItem.Identifier("HermesConsole")
    static let reload = NSToolbarItem.Identifier("HermesReload")
    static let restartServices = NSToolbarItem.Identifier("HermesRestartServices")
    static let openInBrowser = NSToolbarItem.Identifier("HermesOpenInBrowser")
    static let status = NSToolbarItem.Identifier("HermesStatus")
}
