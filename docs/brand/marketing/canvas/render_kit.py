#!/usr/bin/env python3
"""Survey Silence — SIGAPP brand canvas kit (master craft render)."""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
OUT = ROOT
FONTS = Path("/Users/edsongmaldonado/.agents/skills/canvas-design/canvas-fonts")

# Brand climate (OKLCH-inspired sRGB)
PAPER = (247, 249, 253)
PAPER_2 = (242, 245, 240)
INK = (10, 24, 28)
INK_SOFT = (55, 72, 78)
INK_MUTED = (90, 105, 110)
LINE = (10, 24, 28, 28)
LINE_STRONG = (10, 24, 28, 48)
SIGNAL = (168, 230, 120)
SIGNAL_INK = (42, 96, 48)
ON_DARK = (244, 248, 246)
ON_DARK_MUTED = (180, 196, 190)

rng = random.Random(42)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / name
    return ImageFont.truetype(str(path), size=size)


def f_display(size: int) -> ImageFont.FreeTypeFont:
    return font("InstrumentSans-Regular.ttf", size)


def f_display_bold(size: int) -> ImageFont.FreeTypeFont:
    return font("InstrumentSans-Bold.ttf", size)


def f_mono(size: int) -> ImageFont.FreeTypeFont:
    return font("IBMPlexMono-Regular.ttf", size)


def f_mono_bold(size: int) -> ImageFont.FreeTypeFont:
    return font("IBMPlexMono-Bold.ttf", size)


def f_serif(size: int) -> ImageFont.FreeTypeFont:
    return font("InstrumentSerif-Regular.ttf", size)


def solid(w: int, h: int, color: tuple) -> Image.Image:
    return Image.new("RGB", (w, h), color[:3])


def paper_grain(img: Image.Image, amount: float = 0.035) -> Image.Image:
    """Subtle grain — fast noise via small tile upsample."""
    w, h = img.size
    tw, th = max(64, w // 8), max(64, h // 8)
    tile = Image.effect_noise((tw, th), 48).convert("L")
    noise = tile.resize((w, h), Image.Resampling.BILINEAR)
    noise = noise.filter(ImageFilter.GaussianBlur(0.8))
    base = img.convert("RGB")
    overlay = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(base, overlay, amount)


def draw_hairline(draw: ImageDraw.ImageDraw, xy, width=1, color=LINE_STRONG):
    draw.line(xy, fill=color, width=width)


def parcel_grid(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    cols: int,
    rows: int,
    color=LINE,
    accent_cells: list[tuple[int, int]] | None = None,
    signal_fill: tuple | None = None,
    gap: float = 0.0,
):
    """Orthogonal cadastral cells — crisp master grid, optical gap optional."""
    x0, y0, x1, y1 = box
    gw = (x1 - x0) / cols
    gh = (y1 - y0) / rows
    accent_cells = set(accent_cells or [])
    g = gap
    for r in range(rows):
        for c in range(cols):
            left = x0 + c * gw + g
            top = y0 + r * gh + g
            right = x0 + (c + 1) * gw - g
            bottom = y0 + (r + 1) * gh - g
            rect = [left, top, right, bottom]
            if (c, r) in accent_cells and signal_fill:
                draw.rectangle(rect, fill=signal_fill, outline=color)
            else:
                draw.rectangle(rect, outline=color)
            cx = (left + right) / 2
            cy = (top + bottom) / 2
            draw.ellipse([cx - 1.1, cy - 1.1, cx + 1.1, cy + 1.1], fill=color)


def dashed_route(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[float, float]],
    color=SIGNAL,
    width: int = 2,
    dash: int = 10,
    gap: int = 8,
):
    for i in range(len(points) - 1):
        x1, y1 = points[i]
        x2, y2 = points[i + 1]
        dx, dy = x2 - x1, y2 - y1
        dist = math.hypot(dx, dy) or 1
        ux, uy = dx / dist, dy / dist
        t = 0.0
        draw_on = True
        while t < dist:
            seg = dash if draw_on else gap
            t2 = min(dist, t + seg)
            if draw_on:
                draw.line(
                    [
                        (x1 + ux * t, y1 + uy * t),
                        (x1 + ux * t2, y1 + uy * t2),
                    ],
                    fill=color,
                    width=width,
                )
            t = t2
            draw_on = not draw_on


def pin(draw: ImageDraw.ImageDraw, x: float, y: float, r: float = 6, halo: bool = True):
    if halo:
        draw.ellipse([x - r * 2.4, y - r * 2.4, x + r * 2.4, y + r * 2.4], outline=(*SIGNAL, 80), width=1)
    draw.ellipse([x - r, y - r, x + r, y + r], fill=SIGNAL, outline=INK)
    draw.ellipse([x - r * 0.35, y - r * 0.35, x + r * 0.35, y + r * 0.35], fill=INK)


def micro_coords(draw: ImageDraw.ImageDraw, x: int, y: int, text: str):
    draw.text((x, y), text, font=f_mono(11), fill=INK_MUTED)


def label_eyebrow(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, dark: bool = False):
    color = ON_DARK_MUTED if dark else INK_MUTED
    ft = f_mono(12)
    # optical midline of cap-height mono
    draw.line([(x, y + 8), (x + 20, y + 8)], fill=color, width=1)
    draw.text((x + 28, y), text.upper(), font=ft, fill=color)


# ─── CANVASES ───────────────────────────────────────────────────────────────


def canvas_key_art() -> Image.Image:
    """1920×1080 — brand key art / LinkedIn cover / presentation open."""
    W, H = 1920, 1080
    img = solid(W, H, PAPER)
    draw = ImageDraw.Draw(img, "RGBA")

    # left ink mass
    draw.rectangle([0, 0, 720, H], fill=INK)

    # cadastral field on ink
    parcel_grid(
        draw,
        (48, 120, 680, 980),
        cols=6,
        rows=8,
        color=(255, 255, 255, 32),
        accent_cells=[(2, 3), (3, 3), (2, 4)],
        signal_fill=(*SIGNAL, 70),
        gap=1.5,
    )
    dashed_route(
        draw,
        [(90, 880), (180, 720), (320, 640), (410, 420), (520, 300), (620, 200)],
        color=SIGNAL,
        width=2,
    )
    pin(draw, 410, 420, r=7)
    pin(draw, 620, 200, r=5)

    # clinical index on dark
    draw.text((56, 48), "01  /  TERRITORY", font=f_mono(14), fill=ON_DARK_MUTED)
    draw.text((56, 78), "SIGAPP", font=f_display_bold(42), fill=ON_DARK)

    # paper side — quiet composition
    label_eyebrow(draw, 820, 160, "Cartografia decisiva")
    draw.text((820, 220), "Decisões que", font=f_display(72), fill=INK)
    draw.text((820, 310), "ganham território.", font=f_display(72), fill=INK)

    draw.line([(820, 430), (1180, 430)], fill=LINE_STRONG, width=1)
    draw.text(
        (820, 460),
        "Dossiê · viabilidade · comitê",
        font=f_mono(16),
        fill=INK_SOFT,
    )

    # right parcel diagram
    parcel_grid(
        draw,
        (820, 560, 1780, 960),
        cols=10,
        rows=5,
        color=LINE,
        accent_cells=[(6, 2), (7, 2)],
        signal_fill=(*SIGNAL, 55),
        gap=1.0,
    )
    dashed_route(
        draw,
        [(860, 900), (1020, 780), (1280, 720), (1500, 640), (1700, 600)],
        color=SIGNAL_INK,
        width=2,
    )
    pin(draw, 1280, 720, r=6)

    micro_coords(draw, 820, 1000, "23°31′57″S  ·  46°47′30″W  ·  PLATE 01")
    micro_coords(draw, 1500, 1000, "SURVEY SILENCE")

    img = paper_grain(img, 0.028)
    return img


def canvas_social_square() -> Image.Image:
    """1080×1080 — feed."""
    W, H = 1080, 1080
    img = solid(W, H, PAPER_2)
    draw = ImageDraw.Draw(img, "RGBA")

    # outer bezel
    m = 48
    draw.rounded_rectangle([m, m, W - m, H - m], radius=28, outline=LINE_STRONG, width=1)
    draw.rounded_rectangle([m + 10, m + 10, W - m - 10, H - m - 10], radius=22, outline=LINE, width=1)

    label_eyebrow(draw, 100, 110, "Sistema operacional")
    draw.text((100, 160), "Do terreno", font=f_display(64), fill=INK)
    draw.text((100, 240), "à decisão.", font=f_display(64), fill=INK)

    # central map mass
    draw.rounded_rectangle([100, 380, 980, 860], radius=18, fill=INK)
    parcel_grid(
        draw,
        (140, 420, 940, 820),
        cols=7,
        rows=5,
        color=(255, 255, 255, 34),
        accent_cells=[(3, 2)],
        signal_fill=(*SIGNAL, 90),
        gap=2.0,
    )
    dashed_route(
        draw,
        [(180, 760), (320, 640), (520, 580), (720, 500), (880, 460)],
        color=SIGNAL,
        width=2,
    )
    pin(draw, 520, 580, r=8)

    draw.text((100, 900), "SIGAPP", font=f_mono_bold(18), fill=INK)
    draw.text((100, 930), "sem planilha paralela", font=f_mono(14), fill=INK_MUTED)
    draw.text((720, 920), "02 / FEED", font=f_mono(12), fill=INK_MUTED)

    return paper_grain(img, 0.03)


def canvas_story() -> Image.Image:
    """1080×1920 — stories / reels cover."""
    W, H = 1080, 1920
    img = solid(W, H, INK)
    draw = ImageDraw.Draw(img, "RGBA")

    # top quiet zone for UI safe area
    draw.text((72, 96), "SIGAPP", font=f_mono(14), fill=ON_DARK_MUTED)
    draw.line([(72, 130), (200, 130)], fill=SIGNAL, width=2)

    parcel_grid(
        draw,
        (72, 220, 1008, 1100),
        cols=5,
        rows=8,
        color=(255, 255, 255, 22),
        accent_cells=[(2, 3), (2, 4), (1, 4)],
        signal_fill=(*SIGNAL, 50),
    )
    dashed_route(
        draw,
        [(160, 1000), (280, 820), (480, 700), (620, 520), (800, 380), (920, 280)],
        color=SIGNAL,
        width=2,
    )
    pin(draw, 620, 520, r=9)

    draw.text((72, 1220), "Traga um", font=f_display(70), fill=ON_DARK)
    draw.text((72, 1310), "terreno real.", font=f_display(70), fill=ON_DARK)
    draw.text((72, 1440), "Fluxo inteiro em ação.", font=f_mono(18), fill=ON_DARK_MUTED)

    draw.rounded_rectangle([72, 1580, 420, 1650], radius=999, fill=SIGNAL)
    draw.text((120, 1600), "Demonstração", font=f_mono_bold(18), fill=INK)

    draw.text((72, 1780), "03  /  STORY", font=f_mono(12), fill=ON_DARK_MUTED)
    draw.text((72, 1810), "23°31′S · 46°47′W", font=f_mono(12), fill=ON_DARK_MUTED)

    return paper_grain(img, 0.025)


def canvas_email_header() -> Image.Image:
    """1200×400 — email header."""
    W, H = 1200, 400
    img = solid(W, H, PAPER)
    draw = ImageDraw.Draw(img, "RGBA")

    draw.rectangle([0, 0, 360, H], fill=INK)
    parcel_grid(
        draw,
        (28, 40, 332, 360),
        cols=4,
        rows=5,
        color=(255, 255, 255, 28),
        accent_cells=[(1, 2)],
        signal_fill=(*SIGNAL, 60),
    )
    pin(draw, 160, 200, r=6)

    label_eyebrow(draw, 420, 90, "Inteligência imobiliária")
    draw.text((420, 140), "Um dossiê.", font=f_display(48), fill=INK)
    draw.text((420, 200), "Uma rota de decisão.", font=f_display(48), fill=INK)
    draw.text((420, 290), "SIGAPP  ·  do terreno ao registro", font=f_mono(14), fill=INK_MUTED)
    draw.line([(420, 330), (900, 330)], fill=LINE_STRONG, width=1)
    draw.ellipse([1100, 40, 1140, 80], fill=SIGNAL)

    return paper_grain(img, 0.022)


def canvas_ad_landscape() -> Image.Image:
    """1200×628 — Meta / LinkedIn ad."""
    W, H = 1200, 628
    img = solid(W, H, PAPER)
    draw = ImageDraw.Draw(img, "RGBA")

    # full field grid faint
    parcel_grid(draw, (40, 40, 1160, 588), cols=14, rows=7, color=LINE)

    # dark card
    draw.rounded_rectangle([80, 90, 700, 538], radius=20, fill=INK)
    label_eyebrow(draw, 120, 130, "Sem pontos cegos", dark=True)
    draw.text((120, 190), "Feche o ciclo", font=f_display(52), fill=ON_DARK)
    draw.text((120, 260), "do terreno ao", font=f_display(52), fill=ON_DARK)
    draw.text((120, 330), "registro.", font=f_display(52), fill=ON_DARK)
    dashed_route(
        draw,
        [(120, 460), (220, 430), (340, 450), (480, 400), (620, 420)],
        color=SIGNAL,
        width=2,
    )
    pin(draw, 480, 400, r=6)

    # signal panel
    draw.rounded_rectangle([760, 160, 1120, 460], radius=16, fill=PAPER_2, outline=LINE_STRONG, width=1)
    draw.text((800, 210), "TIR", font=f_mono(12), fill=INK_MUTED)
    draw.text((800, 235), "18,4%", font=f_display_bold(48), fill=INK)
    draw.line([(800, 310), (1080, 310)], fill=LINE_STRONG, width=1)
    draw.text((800, 340), "Cenário", font=f_mono(12), fill=INK_MUTED)
    draw.text((800, 365), "recomendado", font=f_display(28), fill=SIGNAL_INK)
    draw.text((800, 420), "05  /  AD", font=f_mono(11), fill=INK_MUTED)

    return paper_grain(img, 0.025)


def canvas_kit_cover() -> Image.Image:
    """1080×1350 — brand kit cover / Pinterest / portrait poster."""
    W, H = 1080, 1350
    img = solid(W, H, PAPER)
    draw = ImageDraw.Draw(img, "RGBA")

    # top ink band
    draw.rectangle([0, 0, W, 420], fill=INK)
    draw.text((72, 72), "BRAND  ·  PLATE A", font=f_mono(12), fill=ON_DARK_MUTED)
    draw.text((72, 140), "Survey", font=f_display(80), fill=ON_DARK)
    draw.text((72, 240), "Silence", font=f_display(80), fill=ON_DARK)
    draw.text((72, 350), "SIGAPP visual system", font=f_mono(16), fill=SIGNAL)

    # palette swatches
    swatches = [
        (PAPER, "PAPER"),
        (INK, "INK"),
        (SIGNAL, "SIGNAL"),
        (SIGNAL_INK, "SIGNAL INK"),
        (PAPER_2, "PAPER 2"),
    ]
    x = 72
    for color, name in swatches:
        draw.rectangle([x, 480, x + 160, 640], fill=color, outline=LINE_STRONG, width=1)
        draw.text((x, 660), name, font=f_mono(11), fill=INK_MUTED)
        x += 190

    # modular diagram
    parcel_grid(
        draw,
        (72, 760, 1008, 1180),
        cols=8,
        rows=5,
        color=LINE,
        accent_cells=[(3, 2), (4, 2), (3, 3)],
        signal_fill=(*SIGNAL, 45),
    )
    dashed_route(
        draw,
        [(120, 1120), (280, 1000), (480, 960), (720, 880), (920, 820)],
        color=SIGNAL_INK,
        width=2,
    )
    pin(draw, 480, 960, r=7)

    draw.text((72, 1240), "Tinta  ·  Papel  ·  Sinal", font=f_mono(14), fill=INK_SOFT)
    draw.text((72, 1280), "06  /  KIT  ·  master plate", font=f_mono(12), fill=INK_MUTED)

    return paper_grain(img, 0.028)


def canvas_banner_linkedin() -> Image.Image:
    """1584×396 — LinkedIn personal/company banner crop-safe."""
    W, H = 1584, 396
    img = solid(W, H, INK)
    draw = ImageDraw.Draw(img, "RGBA")

    parcel_grid(
        draw,
        (40, 40, 1544, 356),
        cols=18,
        rows=4,
        color=(255, 255, 255, 20),
        accent_cells=[(8, 1), (9, 1), (10, 2)],
        signal_fill=(*SIGNAL, 45),
    )
    dashed_route(
        draw,
        [(80, 300), (280, 220), (520, 240), (800, 160), (1100, 180), (1400, 120)],
        color=SIGNAL,
        width=2,
    )
    pin(draw, 800, 160, r=6)
    draw.text((64, 48), "SIGAPP", font=f_display_bold(36), fill=ON_DARK)
    draw.text((64, 100), "Decisões que ganham território", font=f_mono(16), fill=ON_DARK_MUTED)
    draw.text((1280, 320), "07  /  BANNER", font=f_mono(11), fill=ON_DARK_MUTED)

    return paper_grain(img, 0.02)


def canvas_og() -> Image.Image:
    """1200×630 — Open Graph."""
    W, H = 1200, 630
    img = solid(W, H, INK)
    draw = ImageDraw.Draw(img, "RGBA")

    # contour-like curves via polylines
    for i, y0 in enumerate(range(80, 560, 70)):
        pts = []
        for x in range(0, W + 40, 40):
            y = y0 + math.sin(x * 0.008 + i) * 18 + i * 2
            pts.append((x, y))
        dashed_route(draw, pts, color=(255, 255, 255, 18), width=1, dash=6, gap=12)

    parcel_grid(
        draw,
        (80, 100, 520, 520),
        cols=5,
        rows=5,
        color=(255, 255, 255, 30),
        accent_cells=[(2, 2)],
        signal_fill=(*SIGNAL, 55),
    )
    pin(draw, 300, 310, r=8)

    draw.text((600, 160), "SIGAPP", font=f_mono(14), fill=ON_DARK_MUTED)
    draw.text((600, 210), "Decisões que", font=f_display(54), fill=ON_DARK)
    draw.text((600, 280), "ganham", font=f_display(54), fill=ON_DARK)
    draw.text((600, 350), "território.", font=f_display(54), fill=ON_DARK)
    draw.line([(600, 440), (900, 440)], fill=SIGNAL, width=2)
    draw.text((600, 470), "Dossiê de terreno  ·  Brasil", font=f_mono(14), fill=ON_DARK_MUTED)
    draw.text((600, 540), "08  /  OG", font=f_mono(11), fill=ON_DARK_MUTED)

    return paper_grain(img, 0.022)


def canvas_poster_minimal() -> Image.Image:
    """Second-pass masterpiece plate — museum quiet 1080×1080."""
    W, H = 1080, 1080
    img = solid(W, H, PAPER)
    draw = ImageDraw.Draw(img, "RGBA")

    # vast quiet field
    # single large parcel figure offset
    poly = [
        (180, 220),
        (720, 180),
        (860, 520),
        (780, 860),
        (240, 820),
        (140, 480),
    ]
    draw.polygon(poly, outline=INK, width=2)
    # inner subdivision lines
    draw.line([(180, 220), (240, 820)], fill=LINE_STRONG, width=1)
    draw.line([(720, 180), (240, 820)], fill=LINE, width=1)
    draw.line([(140, 480), (860, 520)], fill=LINE, width=1)
    draw.line([(180, 220), (780, 860)], fill=LINE, width=1)

    # signal only once
    pin(draw, 420, 480, r=10)

    # micro system around edge
    for i in range(24):
        x = 60 + i * 40
        draw.line([(x, 1000), (x, 1012)], fill=INK_MUTED, width=1)
    draw.text((60, 1020), "0     10     20     30     40     50     60     70     80", font=f_mono(10), fill=INK_MUTED)

    draw.text((60, 60), "PLATE 09", font=f_mono(12), fill=INK_MUTED)
    draw.text((60, 90), "Quiet parcel", font=f_serif(42), fill=INK)
    draw.text((860, 60), "SIGAPP", font=f_mono_bold(14), fill=INK)

    # corner registration marks
    for cx, cy in [(40, 40), (W - 40, 40), (40, H - 40), (W - 40, H - 40)]:
        draw.line([(cx - 12, cy), (cx + 12, cy)], fill=INK_SOFT, width=1)
        draw.line([(cx, cy - 12), (cx, cy + 12)], fill=INK_SOFT, width=1)

    return paper_grain(img, 0.02)


def main():
    pieces = [
        ("01-key-art.png", canvas_key_art),
        ("02-social-square.png", canvas_social_square),
        ("03-story.png", canvas_story),
        ("04-email-header.png", canvas_email_header),
        ("05-ad-landscape.png", canvas_ad_landscape),
        ("06-kit-cover.png", canvas_kit_cover),
        ("07-banner-linkedin.png", canvas_banner_linkedin),
        ("08-open-graph.png", canvas_og),
        ("09-plate-museum.png", canvas_poster_minimal),
    ]

    saved = []
    for name, fn in pieces:
        im = fn()
        # second-pass: slight unsharp for crisp edges
        im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=80, threshold=2))
        path = OUT / name
        im.save(path, "PNG", optimize=True)
        saved.append(path)
        print(f"wrote {path.name}  {im.size[0]}×{im.size[1]}")

    # multipage PDF
    pdf_path = OUT / "sigapp-survey-silence-kit.pdf"
    rgb_pages = []
    for p in saved:
        im = Image.open(p).convert("RGB")
        rgb_pages.append(im)
    first, rest = rgb_pages[0], rgb_pages[1:]
    first.save(pdf_path, "PDF", save_all=True, append_images=rest, resolution=150.0)
    print(f"wrote {pdf_path.name}")


if __name__ == "__main__":
    main()
