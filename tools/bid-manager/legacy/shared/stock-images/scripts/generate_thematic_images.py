from __future__ import annotations

from pathlib import Path
from math import cos, sin, pi
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SIZE = (1600, 900)

PALETTES = {
    "digital-assets": [(9, 20, 43), (0, 102, 255), (45, 212, 191), (165, 243, 252)],
    "dalp": [(14, 24, 42), (37, 99, 235), (139, 92, 246), (56, 189, 248)],
    "compliance": [(19, 33, 68), (16, 185, 129), (250, 204, 21), (226, 232, 240)],
    "software": [(15, 23, 42), (59, 130, 246), (99, 102, 241), (148, 163, 184)],
    "tokenization": [(30, 41, 59), (14, 165, 233), (244, 114, 182), (251, 191, 36)],
}

ASSETS = [
    ("digital-assets", "digital-assets-01.jpg", "network"),
    ("digital-assets", "digital-assets-02.jpg", "wallet"),
    ("digital-assets", "digital-assets-03.jpg", "market"),
    ("dalp", "dalp-01.jpg", "lifecycle"),
    ("dalp", "dalp-02.jpg", "orchestration"),
    ("dalp", "dalp-03.jpg", "platform"),
    ("compliance", "compliance-01.jpg", "shield"),
    ("compliance", "compliance-02.jpg", "checks"),
    ("compliance", "compliance-03.jpg", "jurisdiction"),
    ("software", "software-01.jpg", "code"),
    ("software", "software-02.jpg", "dashboard"),
    ("software", "software-03.jpg", "integration"),
    ("tokenization", "tokenization-01.jpg", "fractional"),
    ("tokenization", "tokenization-02.jpg", "issuance"),
    ("tokenization", "tokenization-03.jpg", "settlement"),
]


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def gradient_background(size, colors):
    w, h = size
    img = Image.new("RGB", size, colors[0])
    px = img.load()
    for y in range(h):
        for x in range(w):
            tx = x / max(1, w - 1)
            ty = y / max(1, h - 1)
            t = (tx * 0.55 + ty * 0.45)
            c1, c2 = colors[0], colors[1]
            c = tuple(lerp(c1[i], c2[i], t) for i in range(3))
            px[x, y] = c
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    g = ImageDraw.Draw(glow)
    g.ellipse((w * 0.55, h * -0.05, w * 1.05, h * 0.65), fill=colors[2] + (90,))
    g.ellipse((w * -0.15, h * 0.35, w * 0.55, h * 1.15), fill=colors[3] + (70,))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    return Image.alpha_composite(img.convert("RGBA"), glow)


def draw_grid(draw, size, color=(255, 255, 255, 22), step=60):
    w, h = size
    for x in range(0, w, step):
        draw.line((x, 0, x, h), fill=color, width=1)
    for y in range(0, h, step):
        draw.line((0, y, w, y), fill=color, width=1)


def node(draw, x, y, r, fill, outline=(255, 255, 255, 160)):
    draw.ellipse((x-r, y-r, x+r, y+r), fill=fill, outline=outline, width=3)


def flow_curve(draw, pts, fill, width=6):
    draw.line(pts, fill=fill, width=width, joint="curve")


def motif_network(draw, size, colors):
    w, h = size
    pts = [(260, 660), (500, 470), (760, 620), (950, 360), (1240, 500)]
    flow_curve(draw, pts, fill=colors[3] + (160,), width=8)
    extra = [(360, 280), (540, 360), (760, 240), (1070, 290), (1320, 220)]
    flow_curve(draw, extra, fill=colors[2] + (140,), width=5)
    for p in pts + extra:
        node(draw, p[0], p[1], 20, fill=colors[1] + (210,))


def motif_wallet(draw, size, colors):
    w, h = size
    draw.rounded_rectangle((360, 260, 1180, 680), radius=36, outline=(255,255,255,110), width=4, fill=(8,20,38,70))
    draw.rounded_rectangle((920, 380, 1225, 560), radius=30, outline=(255,255,255,120), width=3, fill=(255,255,255,18))
    for cx, cy, rr in [(540, 470, 88), (720, 470, 88), (900, 470, 88)]:
        draw.ellipse((cx-rr, cy-rr, cx+rr, cy+rr), outline=colors[3] + (140,), width=4)
        draw.ellipse((cx-36, cy-36, cx+36, cy+36), fill=colors[2] + (160,), outline=(255,255,255,120), width=2)


def motif_market(draw, size, colors):
    bars = [260, 340, 500, 430, 710, 520, 910, 390, 1120, 250, 1300, 320]
    base = 700
    for i in range(0, len(bars), 2):
        x = bars[i]
        top = bars[i+1]
        draw.rounded_rectangle((x, top, x+70, base), radius=14, fill=colors[2] + (150,), outline=(255,255,255,100), width=2)
    draw.line((220, 600, 450, 520, 650, 560, 850, 430, 1060, 310, 1360, 250), fill=colors[3] + (190,), width=8)
    for p in [(220,600),(450,520),(650,560),(850,430),(1060,310),(1360,250)]:
        node(draw, p[0], p[1], 16, fill=colors[1] + (220,))


def motif_lifecycle(draw, size, colors):
    center = (800, 450)
    radii = [150, 250]
    for r in radii:
        draw.ellipse((center[0]-r, center[1]-r, center[0]+r, center[1]+r), outline=(255,255,255,90), width=4)
    for a in [0, 72, 144, 216, 288]:
        rad = a * pi / 180
        x = center[0] + int(cos(rad) * 250)
        y = center[1] + int(sin(rad) * 250)
        node(draw, x, y, 34, fill=colors[2] + (170,))
        draw.line((center[0], center[1], x, y), fill=colors[3] + (120,), width=4)
    node(draw, center[0], center[1], 48, fill=colors[1] + (220,))


def motif_orchestration(draw, size, colors):
    boxes = [(270, 220, 560, 380), (660, 160, 980, 340), (1060, 260, 1330, 430), (520, 500, 860, 700), (980, 520, 1330, 720)]
    for box in boxes:
        draw.rounded_rectangle(box, radius=26, fill=(255,255,255,18), outline=(255,255,255,110), width=3)
    links = [((560,300),(660,250)), ((980,260),(1060,340)), ((720,340),(690,500)), ((1180,430),(1160,520)), ((860,600),(980,600))]
    for a, b in links:
        draw.line((*a, *b), fill=colors[3] + (180,), width=6)
        node(draw, a[0], a[1], 10, fill=colors[2] + (220,))
        node(draw, b[0], b[1], 10, fill=colors[2] + (220,))


def motif_platform(draw, size, colors):
    layers = [(320, 560, 1280, 680), (380, 400, 1220, 520), (460, 250, 1140, 360)]
    fills = [colors[1] + (110,), colors[2] + (100,), colors[3] + (90,)]
    for box, fill in zip(layers, fills):
        draw.rounded_rectangle(box, radius=28, fill=fill, outline=(255,255,255,120), width=3)
    for x in [520, 760, 1000]:
        draw.line((x, 250, x, 680), fill=(255,255,255,60), width=2)


def motif_shield(draw, size, colors):
    points = [(800, 180), (1080, 290), (1020, 610), (800, 760), (580, 610), (520, 290)]
    draw.polygon(points, fill=colors[2] + (110,), outline=(255,255,255,130))
    draw.line((670, 470, 760, 560, 960, 340), fill=(255,255,255,220), width=18)


def motif_checks(draw, size, colors):
    for i, y in enumerate([250, 400, 550]):
        draw.rounded_rectangle((360, y, 1240, y+90), radius=24, fill=(255,255,255,18), outline=(255,255,255,120), width=3)
        draw.line((430, y+45, 470, y+85, 540, y+10), fill=colors[2] + (220,), width=10)
        draw.line((610, y+45, 1120, y+45), fill=(255,255,255,150), width=6)


def motif_jurisdiction(draw, size, colors):
    draw.ellipse((420, 170, 1180, 730), outline=(255,255,255,120), width=4)
    for lon in [0.2, 0.4, 0.6, 0.8]:
        x = int(420 + (1180-420)*lon)
        draw.line((x, 200, x, 700), fill=(255,255,255,60), width=2)
    for lat in [0.25, 0.5, 0.75]:
        y = int(170 + (730-170)*lat)
        draw.line((470, y, 1130, y), fill=(255,255,255,60), width=2)
    for p in [(620, 360), (800, 300), (980, 430), (760, 540)]:
        node(draw, p[0], p[1], 18, fill=colors[2] + (220,))


def motif_code(draw, size, colors):
    for i in range(8):
        y = 180 + i*70
        draw.line((350, y, 550 + (i%3)*110, y), fill=(255,255,255,120), width=6)
        draw.line((760, y, 1240 - (i%4)*60, y), fill=colors[2] + (140,), width=6)
    draw.line((620, 260, 520, 450, 620, 640), fill=colors[3] + (210,), width=12)
    draw.line((980, 260, 1080, 450, 980, 640), fill=colors[3] + (210,), width=12)


def motif_dashboard(draw, size, colors):
    cards = [(250, 190, 650, 420), (720, 190, 1350, 420), (250, 480, 850, 740), (920, 480, 1350, 740)]
    for box in cards:
        draw.rounded_rectangle(box, radius=24, fill=(255,255,255,18), outline=(255,255,255,110), width=3)
    draw.arc((310, 230, 590, 510), start=180, end=330, fill=colors[2] + (190,), width=16)
    draw.line((820, 360, 900, 300, 1000, 340, 1120, 240, 1260, 280), fill=colors[3] + (210,), width=8)
    for p in [(820,360),(900,300),(1000,340),(1120,240),(1260,280)]:
        node(draw, p[0], p[1], 12, fill=colors[1] + (220,))
    for i, h in enumerate([110, 180, 140, 220, 190]):
        x = 340 + i*90
        draw.rounded_rectangle((x, 700-h, x+50, 700), radius=12, fill=colors[2] + (150,))


def motif_integration(draw, size, colors):
    cx, cy = 800, 450
    for a in range(0, 360, 60):
        rad = a * pi / 180
        x = cx + int(cos(rad) * 250)
        y = cy + int(sin(rad) * 180)
        node(draw, x, y, 30, fill=colors[2] + (170,))
        draw.line((cx, cy, x, y), fill=(255,255,255,110), width=5)
    draw.rounded_rectangle((710, 360, 890, 540), radius=26, fill=colors[1] + (180,), outline=(255,255,255,120), width=3)


def motif_fractional(draw, size, colors):
    draw.rounded_rectangle((300, 220, 1300, 680), radius=32, outline=(255,255,255,120), width=3, fill=(255,255,255,16))
    sizes = [220, 170, 130, 90]
    x = 420
    for s in sizes:
        draw.rectangle((x, 280, x+s, 280+s), fill=colors[2] + (120,), outline=(255,255,255,120), width=3)
        x += s + 30


def motif_issuance(draw, size, colors):
    for i in range(5):
        cx = 420 + i*180
        draw.ellipse((cx-70, 300, cx+70, 440), fill=colors[1] + (110,), outline=(255,255,255,110), width=3)
        draw.ellipse((cx-70, 240, cx+70, 380), outline=(255,255,255,90), width=3)
    draw.line((320, 560, 1280, 560), fill=colors[3] + (180,), width=8)
    for p in [(420,560),(600,560),(780,560),(960,560),(1140,560)]:
        node(draw, p[0], p[1], 16, fill=colors[2] + (220,))


def motif_settlement(draw, size, colors):
    left = (430, 450)
    right = (1170, 450)
    node(draw, *left, 58, fill=colors[1] + (200,))
    node(draw, *right, 58, fill=colors[2] + (200,))
    draw.line((520, 450, 1080, 450), fill=(255,255,255,180), width=10)
    draw.polygon([(1080,450),(1030,420),(1030,480)], fill=(255,255,255,200))
    draw.line((1080, 510, 520, 510), fill=colors[3] + (180,), width=8)
    draw.polygon([(520,510),(570,480),(570,540)], fill=colors[3] + (200,))


MOTIFS = {
    "network": motif_network,
    "wallet": motif_wallet,
    "market": motif_market,
    "lifecycle": motif_lifecycle,
    "orchestration": motif_orchestration,
    "platform": motif_platform,
    "shield": motif_shield,
    "checks": motif_checks,
    "jurisdiction": motif_jurisdiction,
    "code": motif_code,
    "dashboard": motif_dashboard,
    "integration": motif_integration,
    "fractional": motif_fractional,
    "issuance": motif_issuance,
    "settlement": motif_settlement,
}


def create_asset(category: str, filename: str, motif: str):
    colors = PALETTES[category]
    img = gradient_background(SIZE, colors)
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")
    draw_grid(draw, SIZE)
    MOTIFS[motif](draw, SIZE, colors)

    vignette = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette, "RGBA")
    vd.rectangle((0, 0, SIZE[0], SIZE[1]), outline=(0, 0, 0, 90), width=70)
    vignette = vignette.filter(ImageFilter.GaussianBlur(60))

    out = Image.alpha_composite(img, overlay)
    out = Image.alpha_composite(out, vignette).convert("RGB")
    path = ROOT / category / filename
    path.parent.mkdir(parents=True, exist_ok=True)
    out.save(path, quality=92, optimize=True)
    print(path.relative_to(ROOT))


if __name__ == "__main__":
    for category, filename, motif in ASSETS:
        create_asset(category, filename, motif)
