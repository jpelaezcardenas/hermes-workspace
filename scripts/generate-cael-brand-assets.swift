#!/usr/bin/swift

import AppKit
import Foundation

enum AssetError: Error {
    case badArguments
    case cannotLoadImage(String)
    case cannotCreateBitmap
    case cannotEncodePNG
}

struct Output {
    let url: URL
    let size: CGSize
    let kind: Kind

    enum Kind {
        case appIcon
        case avatar
        case cover
    }
}

func writePNG(_ image: NSImage, to url: URL) throws {
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

func sourceImage(_ url: URL) throws -> NSImage {
    guard let image = NSImage(contentsOf: url) else {
        throw AssetError.cannotLoadImage(url.path)
    }
    return image
}

func makeImage(size: CGSize, draw: (CGRect) -> Void) throws -> NSImage {
    let image = NSImage(size: size)
    image.lockFocus()
    defer { image.unlockFocus() }
    guard NSGraphicsContext.current != nil else {
        throw AssetError.cannotCreateBitmap
    }
    draw(CGRect(origin: .zero, size: size))
    return image
}

func drawSource(_ source: NSImage, crop: CGRect, in rect: CGRect) {
    source.draw(
        in: rect,
        from: crop,
        operation: .copy,
        fraction: 1.0,
        respectFlipped: true,
        hints: [.interpolation: NSImageInterpolation.high]
    )
}

func makeAvatar(source: NSImage, size: CGSize) throws -> NSImage {
    let crop = CGRect(x: 342, y: 142, width: 340, height: 340)
    return try makeImage(size: size) { canvas in
        NSColor.clear.setFill()
        canvas.fill()

        let inset = canvas.width * 0.045
        let ringRect = canvas.insetBy(dx: inset, dy: inset)
        let outer = NSBezierPath(ovalIn: ringRect)
        NSColor(calibratedRed: 0.06, green: 0.86, blue: 0.94, alpha: 0.92).setFill()
        outer.fill()

        let goldRing = NSBezierPath(ovalIn: ringRect.insetBy(dx: canvas.width * 0.035, dy: canvas.height * 0.035))
        NSColor(calibratedRed: 0.94, green: 0.74, blue: 0.34, alpha: 0.96).setFill()
        goldRing.fill()

        let imageRect = ringRect.insetBy(dx: canvas.width * 0.075, dy: canvas.height * 0.075)
        let clip = NSBezierPath(ovalIn: imageRect)
        NSGraphicsContext.saveGraphicsState()
        clip.addClip()
        drawSource(source, crop: crop, in: imageRect)
        NSGraphicsContext.restoreGraphicsState()

        let stroke = NSBezierPath(ovalIn: imageRect)
        NSColor(calibratedRed: 0.68, green: 1.0, blue: 0.95, alpha: 0.75).setStroke()
        stroke.lineWidth = max(3, canvas.width * 0.012)
        stroke.stroke()
    }
}

func makeAppIcon(source: NSImage, size: CGSize) throws -> NSImage {
    let crop = CGRect(x: 342, y: 142, width: 340, height: 340)
    return try makeImage(size: size) { canvas in
        NSColor.clear.setFill()
        canvas.fill()

        let shadow = NSShadow()
        shadow.shadowColor = NSColor.black.withAlphaComponent(0.38)
        shadow.shadowBlurRadius = canvas.width * 0.055
        shadow.shadowOffset = CGSize(width: 0, height: -canvas.height * 0.018)
        shadow.set()

        let tile = canvas.insetBy(dx: canvas.width * 0.075, dy: canvas.height * 0.075)
        let tilePath = NSBezierPath(roundedRect: tile, xRadius: canvas.width * 0.18, yRadius: canvas.height * 0.18)
        let bg = NSGradient(colorsAndLocations:
            (NSColor(calibratedRed: 0.015, green: 0.055, blue: 0.13, alpha: 1), 0),
            (NSColor(calibratedRed: 0.035, green: 0.18, blue: 0.32, alpha: 1), 0.45),
            (NSColor(calibratedRed: 0.06, green: 0.42, blue: 0.55, alpha: 1), 1)
        )!
        bg.draw(in: tilePath, angle: 135)

        NSGraphicsContext.saveGraphicsState()
        tilePath.addClip()
        for i in 0..<8 {
            let y = tile.minY + CGFloat(i) * tile.height / 7
            let line = NSBezierPath()
            line.move(to: CGPoint(x: tile.minX + tile.width * 0.12, y: y))
            line.line(to: CGPoint(x: tile.maxX - tile.width * 0.12, y: y + tile.height * 0.08))
            NSColor(calibratedRed: 0.18, green: 0.92, blue: 1.0, alpha: 0.08).setStroke()
            line.lineWidth = max(2, canvas.width * 0.006)
            line.stroke()
        }
        NSGraphicsContext.restoreGraphicsState()

        let portraitRect = tile.insetBy(dx: canvas.width * 0.16, dy: canvas.height * 0.16)
        let outer = NSBezierPath(ovalIn: portraitRect)
        NSColor(calibratedRed: 0.06, green: 0.86, blue: 0.94, alpha: 0.96).setFill()
        outer.fill()
        let gold = NSBezierPath(ovalIn: portraitRect.insetBy(dx: canvas.width * 0.024, dy: canvas.height * 0.024))
        NSColor(calibratedRed: 0.94, green: 0.72, blue: 0.32, alpha: 0.96).setFill()
        gold.fill()

        let imageRect = portraitRect.insetBy(dx: canvas.width * 0.055, dy: canvas.height * 0.055)
        let imageClip = NSBezierPath(ovalIn: imageRect)
        NSGraphicsContext.saveGraphicsState()
        imageClip.addClip()
        drawSource(source, crop: crop, in: imageRect)
        NSGraphicsContext.restoreGraphicsState()

        let wordmark = "CAEL" as NSString
        let attrs: [NSAttributedString.Key: Any] = [
            .font: NSFont.systemFont(ofSize: canvas.width * 0.13, weight: .black),
            .foregroundColor: NSColor.white,
            .kern: 4.0
        ]
        let wordSize = wordmark.size(withAttributes: attrs)
        wordmark.draw(
            at: CGPoint(x: canvas.midX - wordSize.width / 2, y: tile.minY + canvas.height * 0.12),
            withAttributes: attrs
        )
    }
}

func makeCover(source: NSImage, size: CGSize) throws -> NSImage {
    let sourceSize = source.size
    let sourceAspect = sourceSize.width / sourceSize.height
    let targetAspect = size.width / size.height
    let crop: CGRect
    if sourceAspect > targetAspect {
        let width = sourceSize.height * targetAspect
        crop = CGRect(x: (sourceSize.width - width) / 2, y: 0, width: width, height: sourceSize.height)
    } else {
        let height = sourceSize.width / targetAspect
        crop = CGRect(x: 0, y: (sourceSize.height - height) / 2, width: sourceSize.width, height: height)
    }
    return try makeImage(size: size) { canvas in
        drawSource(source, crop: crop, in: canvas)
    }
}

func run() throws {
    let args = CommandLine.arguments
    guard args.count == 4 else {
        fputs("usage: generate-cael-brand-assets.swift /path/to/source.jpg /desktop/root /web/root\n", stderr)
        throw AssetError.badArguments
    }

    let source = try sourceImage(URL(fileURLWithPath: args[1]))
    let desktopRoot = URL(fileURLWithPath: args[2], isDirectory: true)
    let webRoot = URL(fileURLWithPath: args[3], isDirectory: true)

    let outputs: [Output] = [
        Output(url: desktopRoot.appendingPathComponent("packaging/AppIcon-1024.png"), size: CGSize(width: 1024, height: 1024), kind: .appIcon),
        Output(url: desktopRoot.appendingPathComponent("Sources/HermesDesktop/Resources/CaelProfile.png"), size: CGSize(width: 512, height: 512), kind: .avatar),
        Output(url: webRoot.appendingPathComponent("public/cael-avatar.png"), size: CGSize(width: 512, height: 512), kind: .avatar),
        Output(url: webRoot.appendingPathComponent("public/cael-avatar-small.png"), size: CGSize(width: 128, height: 128), kind: .avatar),
        Output(url: webRoot.appendingPathComponent("public/cael-icon-192.png"), size: CGSize(width: 192, height: 192), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("public/cael-icon-512.png"), size: CGSize(width: 512, height: 512), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("assets/icon.png"), size: CGSize(width: 1024, height: 1024), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("public/apple-touch-icon.png"), size: CGSize(width: 180, height: 180), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("public/logo-icon.png"), size: CGSize(width: 512, height: 512), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("public/claude-avatar.png"), size: CGSize(width: 512, height: 512), kind: .avatar),
        Output(url: webRoot.appendingPathComponent("public/claude-icon-192.png"), size: CGSize(width: 192, height: 192), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("public/claude-icon-512.png"), size: CGSize(width: 512, height: 512), kind: .appIcon),
        Output(url: webRoot.appendingPathComponent("public/cover.png"), size: CGSize(width: 1200, height: 630), kind: .cover),
        Output(url: webRoot.appendingPathComponent("public/social-preview.png"), size: CGSize(width: 1200, height: 630), kind: .cover)
    ]

    for output in outputs {
        let image: NSImage
        switch output.kind {
        case .appIcon:
            image = try makeAppIcon(source: source, size: output.size)
        case .avatar:
            image = try makeAvatar(source: source, size: output.size)
        case .cover:
            image = try makeCover(source: source, size: output.size)
        }
        try writePNG(image, to: output.url)
        print("wrote \(output.url.path)")
    }
}

do {
    try run()
} catch {
    fputs("error: \(error)\n", stderr)
    exit(1)
}
