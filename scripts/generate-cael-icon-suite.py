#!/usr/bin/env python3
"""Generate the complete Cael icon compatibility suite.

The Swift brand generator creates the art-directed source PNGs. This companion
script fills in web/PWA compatibility aliases that need JPEG, WebP, ICO, and
legacy names, then mirrors them into dist/client when that build output exists.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path

from PIL import Image


ICON_VERSION = "20260524"
ICONSET_SIZES = [
    ("icon_16x16.png", 16),
    ("icon_16x16@2x.png", 32),
    ("icon_32x32.png", 32),
    ("icon_32x32@2x.png", 64),
    ("icon_128x128.png", 128),
    ("icon_128x128@2x.png", 256),
    ("icon_256x256.png", 256),
    ("icon_256x256@2x.png", 512),
    ("icon_512x512.png", 512),
    ("icon_512x512@2x.png", 1024),
]


def load_rgba(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def square(image: Image.Image, size: int) -> Image.Image:
    return image.resize((size, size), Image.Resampling.LANCZOS)


def save_png(image: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    square(image, size).save(path, "PNG", optimize=True)


def save_jpeg(image: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    background = Image.new("RGB", (size, size), (2, 8, 18))
    resized = square(image, size)
    background.paste(resized, mask=resized.getchannel("A"))
    background.save(path, "JPEG", quality=92, optimize=True)


def save_webp(image: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    square(image, size).save(path, "WEBP", quality=92, method=6)


def save_ico(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    image.save(path, "ICO", sizes=sizes)


def mirror_to_dist(web_root: Path, relative_paths: list[Path]) -> None:
    dist = web_root / "dist" / "client"
    if not dist.exists():
        return
    for relative_path in relative_paths:
        source = web_root / "public" / relative_path
        target = dist / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)


def build_desktop_iconset(desktop_root: Path, icon: Image.Image) -> None:
    packaging = desktop_root / "packaging"
    iconset = packaging / "AppIcon.iconset"
    iconset.mkdir(parents=True, exist_ok=True)
    for filename, size in ICONSET_SIZES:
        save_png(icon, iconset / filename, size)

    icns_script = desktop_root / "scripts" / "build-icns.swift"
    if icns_script.exists():
        subprocess.run(
            ["swift", str(icns_script), str(iconset), str(packaging / "HermesDesktop.icns")],
            check=True,
        )


def run(web_root: Path, desktop_root: Path, version: str) -> None:
    public = web_root / "public"
    app_icon = load_rgba(public / "cael-icon-1024.png")
    avatar = load_rgba(public / "cael-avatar.png")

    png_outputs: list[tuple[Image.Image, Path, int]] = [
        (app_icon, Path("cael-icon-1024.png"), 1024),
        (app_icon, Path("cael-icon-512.png"), 512),
        (app_icon, Path("cael-icon-192.png"), 192),
        (app_icon, Path(f"cael-icon-1024-v{version}.png"), 1024),
        (app_icon, Path(f"cael-icon-512-v{version}.png"), 512),
        (app_icon, Path(f"cael-icon-192-v{version}.png"), 192),
        (app_icon, Path("apple-touch-icon.png"), 180),
        (app_icon, Path("apple-touch-icon-precomposed.png"), 180),
        (app_icon, Path(f"apple-touch-icon-v{version}.png"), 180),
        (app_icon, Path("favicon.png"), 512),
        (app_icon, Path("logo-icon.png"), 512),
        (app_icon, Path("claude-icon.png"), 512),
        (app_icon, Path("claude-icon-512.png"), 512),
        (app_icon, Path("claude-icon-192.png"), 192),
        (app_icon, Path("claude-logo.png"), 512),
        (app_icon, Path("cael-home/apple-touch-icon.png"), 180),
        (app_icon, Path("cael-home/apple-touch-icon-precomposed.png"), 180),
        (app_icon, Path("cael-home/favicon.png"), 512),
        (avatar, Path("cael-avatar.png"), 512),
        (avatar, Path("cael-avatar-small.png"), 128),
        (avatar, Path(f"cael-avatar-v{version}.png"), 512),
        (avatar, Path("cael-profile.png"), 1024),
        (avatar, Path("avatars/cael.png"), 512),
        (avatar, Path("claude-avatar.png"), 512),
    ]

    for image, relative_path, size in png_outputs:
        save_png(image, public / relative_path, size)

    save_jpeg(app_icon, public / "logo-icon.jpg", 512)
    save_webp(avatar, public / "claude-avatar.webp", 512)
    save_ico(app_icon, public / "favicon.ico")
    save_ico(app_icon, public / "claude-favicon.ico")
    save_ico(app_icon, public / "cael-home" / "favicon.ico")

    mirror_to_dist(web_root, [relative for _, relative, _ in png_outputs])
    mirror_to_dist(
        web_root,
        [
            Path("logo-icon.jpg"),
            Path("claude-avatar.webp"),
            Path("favicon.ico"),
            Path("claude-favicon.ico"),
            Path("cael-home/favicon.ico"),
        ],
    )

    build_desktop_iconset(desktop_root, load_rgba(desktop_root / "packaging" / "AppIcon-1024.png"))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--web-root", type=Path, default=Path.cwd())
    parser.add_argument("--desktop-root", type=Path, required=True)
    parser.add_argument("--version", default=ICON_VERSION)
    args = parser.parse_args()
    run(args.web_root.resolve(), args.desktop_root.resolve(), args.version)


if __name__ == "__main__":
    main()
