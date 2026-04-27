#!/usr/bin/env python3
"""Generate a lightweight SettleMint icon library as transparent PNGs."""
from __future__ import annotations

import json
from pathlib import Path
from PIL import Image, ImageDraw

SIZE = 128
STROKE = 8
NAVY = (27, 43, 101, 255)
BLUE = (59, 130, 246, 255)
GREEN = (16, 185, 129, 255)
AMBER = (245, 158, 11, 255)
GRAY = (100, 116, 139, 255)

OUT_DIR = Path(__file__).resolve().parent


def canvas():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    return img, ImageDraw.Draw(img)


def save(name, draw_fn):
    img, d = canvas()
    draw_fn(d)
    path = OUT_DIR / f"{name}.png"
    img.save(path)
    return path.name


def shield(d):
    d.rounded_rectangle((28, 16, 100, 52), radius=10, outline=NAVY, width=STROKE)
    d.polygon([(28, 42), (64, 112), (100, 42)], outline=NAVY, width=STROKE)

def check_circle(d):
    d.ellipse((20, 20, 108, 108), outline=GREEN, width=STROKE)
    d.line((40, 68, 58, 84, 88, 46), fill=GREEN, width=STROKE)

def lightning(d):
    d.polygon([(70, 14), (38, 66), (62, 66), (50, 114), (90, 52), (64, 52)], outline=AMBER, fill=None, width=STROKE)

def up_arrow(d):
    d.line((64, 108, 64, 26), fill=BLUE, width=STROKE)
    d.line((64, 26, 34, 56), fill=BLUE, width=STROKE)
    d.line((64, 26, 94, 56), fill=BLUE, width=STROKE)

def puzzle(d):
    d.rounded_rectangle((24, 24, 104, 104), radius=14, outline=PURPLE, width=STROKE)
    d.arc((46, 16, 82, 52), start=180, end=360, fill=PURPLE, width=STROKE)
    d.arc((76, 46, 112, 82), start=90, end=270, fill=PURPLE, width=STROKE)

PURPLE = (139, 92, 246, 255)
RED = (239, 68, 68, 255)


def chain(d):
    d.rounded_rectangle((22, 42, 62, 84), radius=16, outline=BLUE, width=STROKE)
    d.rounded_rectangle((66, 42, 106, 84), radius=16, outline=BLUE, width=STROKE)
    d.line((52, 64, 76, 64), fill=BLUE, width=STROKE)

def document_code(d):
    d.rounded_rectangle((28, 16, 96, 108), radius=8, outline=NAVY, width=STROKE)
    d.line((46, 54, 34, 64, 46, 74), fill=GREEN, width=6)
    d.line((78, 54, 90, 64, 78, 74), fill=GREEN, width=6)
    d.line((62, 50, 54, 78), fill=GREEN, width=6)

def coin(d):
    d.ellipse((24, 26, 104, 102), outline=AMBER, width=STROKE)
    d.ellipse((36, 38, 92, 90), outline=AMBER, width=6)
    d.line((64, 46, 64, 82), fill=AMBER, width=6)
    d.arc((46, 44, 82, 68), start=30, end=300, fill=AMBER, width=6)
    d.arc((46, 60, 82, 88), start=210, end=120, fill=AMBER, width=6)

def nodes(d):
    pts = [(28, 64), (64, 28), (100, 64), (64, 100)]
    for a, b in [(0,1), (1,2), (2,3), (3,0), (0,2)]:
        d.line((*pts[a], *pts[b]), fill=BLUE, width=5)
    for x,y in pts:
        d.ellipse((x-10, y-10, x+10, y+10), fill=BLUE)

def cloud(d):
    d.arc((24, 44, 62, 84), 90, 270, fill=BLUE, width=STROKE)
    d.arc((48, 28, 88, 72), 180, 360, fill=BLUE, width=STROKE)
    d.arc((70, 42, 104, 78), 270, 90, fill=BLUE, width=STROKE)
    d.line((34, 84, 96, 84), fill=BLUE, width=STROKE)

def database(d):
    d.ellipse((28, 18, 100, 40), outline=NAVY, width=STROKE)
    d.line((28, 30, 28, 94), fill=NAVY, width=STROKE)
    d.line((100, 30, 100, 94), fill=NAVY, width=STROKE)
    d.arc((28, 72, 100, 116), 0, 180, fill=NAVY, width=STROKE)
    d.arc((28, 48, 100, 92), 0, 180, fill=NAVY, width=STROKE)

def users(d):
    d.ellipse((24, 28, 56, 60), outline=GREEN, width=6)
    d.ellipse((72, 28, 104, 60), outline=GREEN, width=6)
    d.ellipse((42, 18, 86, 62), outline=GREEN, width=6)
    d.arc((18, 56, 62, 102), 200, 340, fill=GREEN, width=6)
    d.arc((66, 56, 110, 102), 200, 340, fill=GREEN, width=6)
    d.arc((34, 50, 94, 108), 200, 340, fill=GREEN, width=6)

def globe(d):
    d.ellipse((20, 20, 108, 108), outline=BLUE, width=STROKE)
    d.arc((34, 20, 94, 108), 90, 270, fill=BLUE, width=5)
    d.arc((34, 20, 94, 108), 270, 90, fill=BLUE, width=5)
    d.line((24, 64, 104, 64), fill=BLUE, width=5)
    d.arc((20, 40, 108, 88), 180, 360, fill=BLUE, width=5)
    d.arc((20, 40, 108, 88), 0, 180, fill=BLUE, width=5)

def lock(d):
    d.rounded_rectangle((30, 54, 98, 108), radius=10, outline=RED, width=STROKE)
    d.arc((40, 18, 88, 70), 180, 360, fill=RED, width=STROKE)

def gear(d):
    d.ellipse((40, 40, 88, 88), outline=GRAY, width=STROKE)
    for x1,y1,x2,y2 in [(62,12,66,32),(62,96,66,116),(12,62,32,66),(96,62,116,66),(24,24,38,38),(90,90,104,104),(24,104,38,90),(90,38,104,24)]:
        d.line((x1,y1,x2,y2), fill=GRAY, width=6)

def chart_icon(d):
    d.line((24, 102, 104, 102), fill=NAVY, width=5)
    d.rectangle((32, 62, 46, 102), outline=GREEN, width=STROKE)
    d.rectangle((56, 46, 70, 102), outline=BLUE, width=STROKE)
    d.rectangle((80, 28, 94, 102), outline=AMBER, width=STROKE)

def wallet(d):
    d.rounded_rectangle((20, 38, 108, 96), radius=12, outline=NAVY, width=STROKE)
    d.rounded_rectangle((66, 50, 112, 84), radius=8, outline=NAVY, width=STROKE)
    d.ellipse((82, 62, 90, 70), fill=BLUE)

def exchange(d):
    d.line((20, 42, 92, 42), fill=GREEN, width=STROKE)
    d.line((78, 28, 92, 42, 78, 56), fill=GREEN, width=STROKE)
    d.line((108, 86, 36, 86), fill=BLUE, width=STROKE)
    d.line((50, 72, 36, 86, 50, 100), fill=BLUE, width=STROKE)

def governance(d):
    d.polygon([(64, 20), (24, 42), (104, 42)], outline=PURPLE, width=STROKE)
    d.line((30, 46, 30, 86), fill=PURPLE, width=6)
    d.line((64, 46, 64, 86), fill=PURPLE, width=6)
    d.line((98, 46, 98, 86), fill=PURPLE, width=6)
    d.line((18, 94, 110, 94), fill=PURPLE, width=STROKE)

def audit(d):
    d.rounded_rectangle((18, 18, 82, 110), radius=8, outline=GRAY, width=STROKE)
    d.line((32, 44, 68, 44), fill=GRAY, width=5)
    d.line((32, 62, 68, 62), fill=GRAY, width=5)
    d.line((32, 80, 58, 80), fill=GRAY, width=5)
    d.ellipse((70, 74, 104, 108), outline=BLUE, width=6)
    d.line((94, 98, 112, 116), fill=BLUE, width=6)

def certificate(d):
    d.rounded_rectangle((26, 18, 102, 92), radius=8, outline=AMBER, width=STROKE)
    d.ellipse((44, 34, 84, 74), outline=AMBER, width=6)
    d.line((56, 72, 48, 104), fill=AMBER, width=6)
    d.line((72, 72, 80, 104), fill=AMBER, width=6)

def building(d):
    d.rectangle((30, 18, 98, 108), outline=NAVY, width=STROKE)
    for x in (42, 58, 74):
        for y in (32, 50, 68):
            d.rectangle((x, y, x+8, y+8), outline=NAVY, width=4)
    d.rectangle((56, 86, 72, 108), outline=NAVY, width=5)

def handshake(d):
    d.line((18, 50, 48, 50, 60, 64), fill=GREEN, width=6)
    d.line((110, 78, 80, 78, 68, 64), fill=BLUE, width=6)
    d.line((48, 50, 62, 62, 80, 46), fill=GREEN, width=6)
    d.line((80, 78, 66, 66, 48, 82), fill=BLUE, width=6)

def clock(d):
    d.ellipse((20, 20, 108, 108), outline=GRAY, width=STROKE)
    d.line((64, 64, 64, 36), fill=GRAY, width=6)
    d.line((64, 64, 86, 74), fill=GRAY, width=6)

def document(d):
    d.rounded_rectangle((28, 16, 96, 110), radius=8, outline=NAVY, width=STROKE)
    d.line((42, 46, 82, 46), fill=GRAY, width=5)
    d.line((42, 64, 82, 64), fill=GRAY, width=5)
    d.line((42, 82, 72, 82), fill=GRAY, width=5)

def bell(d):
    d.arc((30, 24, 98, 92), 200, 340, fill=AMBER, width=STROKE)
    d.line((36, 78, 92, 78), fill=AMBER, width=STROKE)
    d.line((42, 78, 32, 96), fill=AMBER, width=STROKE)
    d.line((86, 78, 96, 96), fill=AMBER, width=STROKE)
    d.ellipse((58, 96, 70, 108), fill=AMBER)

def stack(d):
    d.polygon([(64, 18), (20, 40), (64, 62), (108, 40)], outline=BLUE, width=STROKE)
    d.polygon([(64, 46), (20, 68), (64, 90), (108, 68)], outline=BLUE, width=STROKE)

def timeline(d):
    d.line((24, 64, 104, 64), fill=PURPLE, width=6)
    for x in (32, 64, 96):
        d.ellipse((x-8, 56, x+8, 72), fill=PURPLE)

def contract(d):
    d.rounded_rectangle((28, 16, 96, 110), radius=8, outline=NAVY, width=STROKE)
    d.line((42, 44, 82, 44), fill=GRAY, width=5)
    d.line((42, 60, 82, 60), fill=GRAY, width=5)
    d.line((42, 76, 68, 76), fill=GRAY, width=5)
    d.line((70, 88, 92, 96), fill=BLUE, width=5)

def privacy(d):
    lock(d)
    d.line((52, 74, 58, 82, 74, 62), fill=RED, width=5)


def registry():
    icons = {
        "security": shield,
        "compliance": check_circle,
        "speed": lightning,
        "scale": up_arrow,
        "integration": puzzle,
        "blockchain": chain,
        "smart_contracts": document_code,
        "tokenization": coin,
        "api": nodes,
        "cloud": cloud,
        "database": database,
        "users": users,
        "globe": globe,
        "lock": lock,
        "privacy": privacy,
        "settings": gear,
        "analytics": chart_icon,
        "wallet": wallet,
        "exchange": exchange,
        "governance": governance,
        "audit_trail": audit,
        "certificate": certificate,
        "enterprise": building,
        "partnership": handshake,
        "clock": clock,
        "timeline": timeline,
        "document": document,
        "notification": bell,
        "platform": stack,
        "contract": contract,
    }
    mapping = {name: save(name, fn) for name, fn in icons.items()}
    (OUT_DIR / "icon_registry.json").write_text(json.dumps(mapping, indent=2), encoding="utf-8")

if __name__ == "__main__":
    registry()
