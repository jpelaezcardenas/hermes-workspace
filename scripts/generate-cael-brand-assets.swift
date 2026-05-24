#!/usr/bin/swift

import AppKit
import Foundation

enum AssetError: Error {
    case badArguments
    case cannotLoadImage(String)
    case cannotEncodePNG
}

private func writePNG(_ image: NSImage, to url: URL) throws {
    guard
        let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let data = bitmap.representation(using: .png, properties: [:])
    else {
        throw AssetError.cannotEncodePNG
    }

    try FileManager.default.createDirectory(
        at: url.deletingLastPathComponent(),
        withIntermediateDirectories: true
    )
    try data.write(to: url, options: [.atomic])
}

private func loadSource(_ path: String) throws -> NSImage {
    let url = URL(fileURLWithPath: path)
    guard let image = NSImage(contentsOf: url) else {
        throw AssetError.cannotLoadImage(path)
    }
    return image
}

private func image(size: CGSize, drawing: (CGRect) -> Void) -> NSImage {
    let output = NSImage(size: size)
    output.lockFocus()
    drawing(CGRect(origin: .zero, size: size))
    output.unlockFocus()
    return output
}

private func cropRect(for source: NSImage, mode: CropMode) -> CGRect {
    let width = source.size.width
    let height = source.size.height
    let side = min(width, height)

    switch mode {
    case .full:
        return CGRect(x: (width - side) / 2, y: (height - side) / 2, width: side, height: side)
    case .portrait:
        let cropSide = side * 0.69
        return CGRect(
            x: (width - cropSide) / 2,
            y: (height - cropSide) / 2 + side * 0.035,
            width: cropSide,
            height: cropSide
        )
    case .cover:
        let targetAspect: CGFloat = 1200.0 / 630.0
        let sourceAspect = width / height
        if sourceAspect > targetAspect {
            let cropWidth = height * targetAspect
            return CGRect(x: (width - cropWidth) / 2, y: 0, width: cropWidth, height: height)
        }
        let cropHeight = width / targetAspect
        return CGRect(x: 0, y: (height - cropHeight) / 2, width: width, height: cropHeight)
    }
}

private enum CropMode {
    case full
    case portrait
    case cover
}

private func drawSource(_ source: NSImage, crop: CGRect, in rect: CGRect) {
    source.draw(
        in: rect,
        from: crop,
        operation: .copy,
        fraction: 1.0,
        respectFlipped: false,
        hints: [.interpolation: NSImageInterpolation.high]
    )
}

private func appIcon(from source: NSImage, size: CGSize) -> NSImage {
    image(size: size) { canvas in
        NSColor.clear.setFill()
        canvas.fill()
        drawSource(source, crop: cropRect(for: source, mode: .full), in: canvas)
    }
}

private func avatar(from source: NSImage, size: CGSize) -> NSImage {
    image(size: size) { canvas in
        NSColor.clear.setFill()
        canvas.fill()

        let crop = cropRect(for: source, mode: .portrait)
        drawSource(source, crop: crop, in: canvas)

        let ringInset = canvas.width * 0.025
        let ring = NSBezierPath(ovalIn: canvas.insetBy(dx: ringInset, dy: ringInset))
        NSColor(calibratedRed: 0.20, green: 0.92, blue: 1.0, alpha: 0.72).setStroke()
        ring.lineWidth = max(2, canvas.width * 0.018)
        ring.stroke()
    }
}

private func cover(from source: NSImage, size: CGSize) -> NSImage {
    image(size: size) { canvas in
        let bg = NSGradient(colorsAndLocations:
            (NSColor(calibratedRed: 0.01, green: 0.03, blue: 0.08, alpha: 1), 0.0),
            (NSColor(calibratedRed: 0.02, green: 0.10, blue: 0.18, alpha: 1), 0.55),
            (NSColor(calibratedRed: 0.01, green: 0.02, blue: 0.05, alpha: 1), 1.0)
        )!
        bg.draw(in: NSBezierPath(rect: canvas), angle: 0)

        let iconSize = canvas.height * 0.63
        let iconRect = CGRect(
            x: canvas.midX - iconSize / 2,
            y: canvas.midY - iconSize / 2 + canvas.height * 0.12,
            width: iconSize,
            height: iconSize
        )

        NSGraphicsContext.current?.saveGraphicsState()
        NSShadow().apply {
            $0.shadowColor = NSColor(calibratedRed: 0.12, green: 0.78, blue: 1.0, alpha: 0.45)
            $0.shadowBlurRadius = canvas.height * 0.035
            $0.shadowOffset = .zero
        }
        let iconMask = NSBezierPath(roundedRect: iconRect, xRadius: iconSize * 0.18, yRadius: iconSize * 0.18)
        iconMask.addClip()
        drawSource(source, crop: cropRect(for: source, mode: .full), in: iconRect)
        NSGraphicsContext.current?.restoreGraphicsState()

        NSColor(calibratedRed: 0.20, green: 0.86, blue: 1.0, alpha: 0.65).setStroke()
        iconMask.lineWidth = max(3, canvas.height * 0.006)
        iconMask.stroke()

        let title = "CAEL" as NSString
        let attrs: [NSAttributedString.Key: Any] = [
            .font: NSFont.systemFont(ofSize: canvas.height * 0.11, weight: .black),
            .foregroundColor: NSColor.white,
            .kern: 7.0
        ]
        let titleSize = title.size(withAttributes: attrs)
        title.draw(
            at: CGPoint(x: canvas.midX - titleSize.width / 2, y: canvas.height * 0.08),
            withAttributes: attrs
        )

        let subtitle = "HERMES AI AGENT" as NSString
        let subAttrs: [NSAttributedString.Key: Any] = [
            .font: NSFont.systemFont(ofSize: canvas.height * 0.035, weight: .semibold),
            .foregroundColor: NSColor(calibratedRed: 0.35, green: 0.86, blue: 1.0, alpha: 0.88),
            .kern: 3.0
        ]
        let subtitleSize = subtitle.size(withAttributes: subAttrs)
        subtitle.draw(
            at: CGPoint(x: canvas.midX - subtitleSize.width / 2, y: canvas.height * 0.045),
            withAttributes: subAttrs
        )
    }
}

private extension NSShadow {
    func apply(_ configure: (NSShadow) -> Void) {
        configure(self)
        set()
    }
}

private struct Output {
    let path: String
    let size: CGSize
    let renderer: (NSImage, CGSize) -> NSImage
}

func run() throws {
    guard CommandLine.arguments.count == 4 else {
        fputs("usage: generate-cael-brand-assets.swift /path/to/generated-master.png /desktop-root /web-root\n", stderr)
        throw AssetError.badArguments
    }

    let sourcePath = CommandLine.arguments[1]
    let desktopRoot = CommandLine.arguments[2]
    let webRoot = CommandLine.arguments[3]
    let source = try loadSource(sourcePath)

    let fileManager = FileManager.default
    try? fileManager.removeItem(atPath: "\(webRoot)/public/cael-imagegen-master.png")
    try fileManager.copyItem(
        at: URL(fileURLWithPath: sourcePath),
        to: URL(fileURLWithPath: "\(webRoot)/public/cael-imagegen-master.png")
    )
    try? fileManager.removeItem(atPath: "\(desktopRoot)/packaging/CaelImageGenMaster.png")
    try fileManager.copyItem(
        at: URL(fileURLWithPath: sourcePath),
        to: URL(fileURLWithPath: "\(desktopRoot)/packaging/CaelImageGenMaster.png")
    )

    let outputs = [
        Output(path: "\(desktopRoot)/packaging/AppIcon-1024.png", size: CGSize(width: 1024, height: 1024), renderer: appIcon),
        Output(path: "\(desktopRoot)/Sources/HermesDesktop/Resources/CaelProfile.png", size: CGSize(width: 512, height: 512), renderer: avatar),
        Output(path: "\(webRoot)/assets/icon.png", size: CGSize(width: 1024, height: 1024), renderer: appIcon),
        Output(path: "\(webRoot)/public/cael-icon-1024.png", size: CGSize(width: 1024, height: 1024), renderer: appIcon),
        Output(path: "\(webRoot)/public/cael-icon-512.png", size: CGSize(width: 512, height: 512), renderer: appIcon),
        Output(path: "\(webRoot)/public/cael-icon-192.png", size: CGSize(width: 192, height: 192), renderer: appIcon),
        Output(path: "\(webRoot)/public/apple-touch-icon.png", size: CGSize(width: 180, height: 180), renderer: appIcon),
        Output(path: "\(webRoot)/public/logo-icon.png", size: CGSize(width: 512, height: 512), renderer: appIcon),
        Output(path: "\(webRoot)/public/cael-avatar.png", size: CGSize(width: 512, height: 512), renderer: avatar),
        Output(path: "\(webRoot)/public/cael-avatar-small.png", size: CGSize(width: 128, height: 128), renderer: avatar),
        Output(path: "\(webRoot)/public/cael-profile.png", size: CGSize(width: 1024, height: 1024), renderer: avatar),
        Output(path: "\(webRoot)/public/avatars/cael.png", size: CGSize(width: 512, height: 512), renderer: avatar),
        Output(path: "\(webRoot)/public/claude-avatar.png", size: CGSize(width: 512, height: 512), renderer: avatar),
        Output(path: "\(webRoot)/public/claude-icon-192.png", size: CGSize(width: 192, height: 192), renderer: appIcon),
        Output(path: "\(webRoot)/public/claude-icon-512.png", size: CGSize(width: 512, height: 512), renderer: appIcon),
        Output(path: "\(webRoot)/public/cover.png", size: CGSize(width: 1200, height: 630), renderer: cover),
        Output(path: "\(webRoot)/public/social-preview.png", size: CGSize(width: 1200, height: 630), renderer: cover)
    ]

    for output in outputs {
        let rendered = output.renderer(source, output.size)
        try writePNG(rendered, to: URL(fileURLWithPath: output.path))
        print("wrote \(output.path)")
    }
}

do {
    try run()
} catch {
    fputs("error: \(error)\n", stderr)
    exit(1)
}
