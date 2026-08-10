#!/usr/bin/env python3
"""Renderiza o brand board SIGAPP em alta definição.

Reconstrução editorial da referência aurora-upscaler-precise_-0.jpg usando
fotografia real do acervo, desenho vetorial e texto rasterizado em 3200 px.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parent
MARKETING = ROOT.parent
OUT = ROOT / "10-brand-board-hd.png"
PREVIEW = ROOT / "10-brand-board-preview.jpg"

W = H = 3200
INK = (0, 16, 18)
INK_2 = (8, 31, 34)
PAPER = (247, 249, 246)
PAPER_2 = (235, 241, 238)
WHITE = (247, 251, 249)
MUTED = (174, 194, 190)
LINE = (66, 92, 94)
SIGNAL = (168, 230, 120)
SIGNAL_DARK = (42, 96, 48)
GREEN = (31, 138, 91)
AMBER = (184, 125, 17)
RED = (192, 57, 43)

FONT_SANS = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_MONO = "/System/Library/Fonts/SFNSMono.ttf"


def sans(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_SANS, size=size, index=1 if bold else 0)


def mono(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_MONO, size=size)


def cover(path: Path, size: tuple[int, int], focus: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    img = Image.open(path).convert("RGB")
    tw, th = size
    scale = max(tw / img.width, th / img.height)
    nw, nh = round(img.width * scale), round(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = max(0, min(nw - tw, round((nw - tw) * focus[0])))
    top = max(0, min(nh - th, round((nh - th) * focus[1])))
    return img.crop((left, top, left + tw, top + th))


def grade(img: Image.Image, darkness: float = 0.0, cool: float = 0.10) -> Image.Image:
    img = ImageEnhance.Contrast(img).enhance(1.09)
    img = ImageEnhance.Color(img).enhance(0.78)
    tint = Image.new("RGB", img.size, INK_2)
    img = Image.blend(img, tint, cool)
    if darkness:
        img = Image.blend(img, Image.new("RGB", img.size, INK), darkness)
    return img


def paste_panel(base: Image.Image, path: Path, box: tuple[int, int, int, int], *, focus=(0.5, 0.5), darkness=0.0):
    x0, y0, x1, y1 = box
    photo = grade(cover(path, (x1 - x0, y1 - y0), focus), darkness)
    base.paste(photo, (x0, y0))


def tracked_text(draw: ImageDraw.ImageDraw, pos: tuple[int, int], text: str, ft, fill, tracking: int = 0):
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=ft, fill=fill)
        x += draw.textlength(ch, font=ft) + tracking


def logo_symbol(draw: ImageDraw.ImageDraw, center: tuple[int, int], radius: int, color=WHITE, width: int = 8):
    cx, cy = center
    outer = []
    inner = []
    for i in range(6):
        a = math.radians(-90 + i * 60)
        outer.append((cx + math.cos(a) * radius, cy + math.sin(a) * radius))
        inner.append((cx + math.cos(a) * radius * 0.50, cy + math.sin(a) * radius * 0.50))
    draw.line(outer + [outer[0]], fill=color, width=width, joint="curve")
    draw.line(inner + [inner[0]], fill=color, width=width, joint="curve")
    draw.line([outer[0], inner[0]], fill=color, width=width)
    draw.line([outer[2], inner[2]], fill=color, width=width)
    draw.line([outer[4], inner[4]], fill=color, width=width)
    r = radius * 0.12
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)


def pin(draw: ImageDraw.ImageDraw, x: int, y: int, r: int = 34):
    draw.ellipse((x - r, y - r, x + r, y + r), fill=SIGNAL, outline=INK, width=5)
    draw.polygon([(x - r * 0.62, y + r * 0.52), (x + r * 0.62, y + r * 0.52), (x, y + r * 1.65)], fill=SIGNAL)
    draw.ellipse((x - r * 0.30, y - r * 0.30, x + r * 0.30, y + r * 0.30), fill=INK)


def divider(draw: ImageDraw.ImageDraw, y: int):
    draw.line((0, y, W, y), fill=WHITE, width=10)


def process_icon(draw: ImageDraw.ImageDraw, cx: int, cy: int, kind: int):
    color = INK
    lw = 7
    if kind == 0:
        for i, h in enumerate((36, 58, 82)):
            x = cx - 64 + i * 48
            draw.rectangle((x, cy + 40 - h, x + 28, cy + 40), outline=color, width=lw)
        draw.line((cx - 72, cy + 20, cx - 20, cy - 18, cx + 12, cy - 4, cx + 70, cy - 72), fill=SIGNAL_DARK, width=lw)
    elif kind == 1:
        for ox, oy in ((-38, -25), (38, -25), (0, -55)):
            draw.ellipse((cx + ox - 18, cy + oy - 18, cx + ox + 18, cy + oy + 18), outline=color, width=lw)
            draw.arc((cx + ox - 30, cy + oy + 12, cx + ox + 30, cy + oy + 64), 190, 350, fill=color, width=lw)
    elif kind == 2:
        draw.arc((cx - 72, cy - 58, cx + 5, cy + 36), 215, 30, fill=color, width=lw)
        draw.arc((cx - 5, cy - 58, cx + 72, cy + 36), 150, 325, fill=color, width=lw)
        draw.line((cx - 34, cy + 2, cx, cy + 38, cx + 35, cy + 2), fill=SIGNAL_DARK, width=lw)
    else:
        draw.rounded_rectangle((cx - 52, cy - 68, cx + 52, cy + 55), radius=8, outline=color, width=lw)
        draw.line((cx - 28, cy - 30, cx + 28, cy - 30), fill=color, width=lw)
        draw.line((cx - 28, cy - 2, cx + 14, cy - 2), fill=color, width=lw)
        draw.ellipse((cx + 22, cy + 20, cx + 62, cy + 60), fill=SIGNAL, outline=color, width=5)


def render() -> Image.Image:
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    # 1. Hero territorial
    hero_box = (0, 0, W, 1090)
    paste_panel(img, MARKETING / "hero-territorio-aereo.jpg", hero_box, focus=(0.48, 0.43), darkness=0.18)
    overlay = Image.new("RGBA", (W, 1090), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(1500):
        a = int(230 * (1 - x / 1500) ** 1.5)
        od.line((x, 0, x, 1090), fill=(*INK, a))
    img.paste(overlay, (0, 0), overlay)
    draw = ImageDraw.Draw(img)

    logo_symbol(draw, (300, 270), 120, WHITE, 10)
    tracked_text(draw, (150, 430), "SIGAPP", sans(170, True), WHITE, 2)
    draw.text((152, 630), "Decisões que", font=sans(66), fill=WHITE)
    draw.text((152, 710), "ganham território.", font=sans(66), fill=WHITE)
    draw.rounded_rectangle((152, 830, 298, 844), radius=7, fill=SIGNAL)
    tracked_text(draw, (152, 880), "DO TERRENO AO REGISTRO  ·  BRASIL", mono(28), WHITE, 2)

    # lote destacado — mantém o gesto cartográfico da referência
    lot = [(1760, 610), (2065, 545), (2250, 690), (1930, 810)]
    draw.polygon(lot, fill=(168, 230, 120, 38), outline=WHITE)
    draw.line(lot + [lot[0]], fill=WHITE, width=10, joint="curve")
    pin(draw, 2020, 535, 38)
    draw.text((2280, 660), "OPORTUNIDADE", font=mono(24), fill=WHITE)
    draw.text((2280, 706), "lote em análise", font=sans(30), fill=WHITE)

    divider(draw, 1090)

    # 2. Dossiê + placa central + dashboard
    y0, y1 = 1100, 2040
    paste_panel(img, MARKETING / "dossie-mesa-overhead.jpg", (0, y0, 1260, y1), focus=(0.40, 0.48), darkness=0.04)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((735, 1290, 1160, 1905), radius=18, fill=INK)
    draw.text((795, 1380), "Dossiê de", font=sans(49), fill=WHITE)
    draw.text((795, 1440), "Oportunidade", font=sans(49, True), fill=WHITE)
    draw.rounded_rectangle((795, 1535, 900, 1545), radius=5, fill=SIGNAL)
    draw.text((795, 1600), "LEITURA TERRITORIAL", font=mono(20), fill=MUTED)
    draw.text((795, 1640), "VIABILIDADE EXECUTIVA", font=mono(20), fill=MUTED)
    logo_symbol(draw, (838, 1805), 44, WHITE, 4)
    draw.text((905, 1777), "SIGAPP", font=sans(34, True), fill=WHITE)

    draw.rectangle((1260, y0, 2040, y1), fill=PAPER)
    logo_symbol(draw, (1650, 1420), 118, INK, 9)
    tracked_text(draw, (1400, 1605), "SIGAPP", sans(104, True), INK, 2)
    draw.rounded_rectangle((1565, 1760, 1735, 1772), radius=6, fill=SIGNAL_DARK)
    tracked_text(draw, (1410, 1835), "INTELIGÊNCIA IMOBILIÁRIA", mono(25), INK_SOFT := (55, 72, 78), 2)

    draw.rectangle((2040, y0, W, y1), fill=INK)
    draw.text((2130, 1200), "Painel de oportunidade", font=sans(43, True), fill=WHITE)
    draw.text((2130, 1260), "Leitura executiva do território", font=sans(25), fill=MUTED)
    metrics = [("TIR", "18,4%"), ("VGV", "R$ 28,4 mi"), ("ÁREA", "12.480 m²"), ("PAYBACK", "24 meses")]
    for i, (label, value) in enumerate(metrics):
        x = 2130 + (i % 2) * 500
        y = 1360 + (i // 2) * 185
        draw.text((x, y), label, font=mono(22), fill=MUTED)
        draw.text((x, y + 42), value, font=sans(42, True), fill=WHITE)
    draw.line((2130, 1780, 3060, 1780), fill=LINE, width=3)
    steps = [("CAPTAÇÃO", 0.22), ("VIABILIDADE", 0.48), ("COMITÊ", 0.72), ("REGISTRO", 0.92)]
    for i, (label, pct) in enumerate(steps):
        x = 2130 + int(930 * pct)
        draw.ellipse((x - 15, 1850 - 15, x + 15, 1850 + 15), fill=SIGNAL if i < 3 else INK_2, outline=WHITE, width=3)
        draw.text((x - 70, 1900), label, font=mono(18), fill=WHITE if i < 3 else MUTED)
    draw.line((2130, 1850, 2990, 1850), fill=SIGNAL_DARK, width=7)

    divider(draw, 2040)

    # 3. Comitê + statement + processo
    y0, y1 = 2050, 2770
    paste_panel(img, MARKETING / "comite-mesa.jpg", (0, y0, 1080, y1), focus=(0.45, 0.50), darkness=0.08)
    draw = ImageDraw.Draw(img)
    draw.rectangle((1080, y0, 2050, y1), fill=INK)
    tracked_text(draw, (1175, 2185), "DO TERRENO", mono(31), WHITE, 4)
    tracked_text(draw, (1175, 2245), "À DECISÃO.", mono(31), WHITE, 4)
    draw.text((1175, 2375), "Sem pontos", font=sans(70), fill=WHITE)
    draw.text((1175, 2455), "cegos.", font=sans(70, True), fill=WHITE)
    draw.rounded_rectangle((1175, 2575, 1305, 2587), radius=6, fill=SIGNAL)
    draw.text((1175, 2630), "DO TERRENO AO REGISTRO  ·  BRASIL", font=mono(20), fill=MUTED)

    draw.rectangle((2050, y0, W, y1), fill=PAPER)
    draw.text((2140, 2135), "Uma decisão, quatro leituras.", font=sans(38, True), fill=INK)
    labels = ["Viabilidade", "Comitê", "Negociação", "Legalização"]
    xs = [2210, 2490, 2770, 3050]
    for i, (x, label) in enumerate(zip(xs, labels)):
        process_icon(draw, x, 2325, i)
        bbox = draw.textbbox((0, 0), label, font=sans(23, True))
        draw.text((x - (bbox[2] - bbox[0]) / 2, 2455), label, font=sans(23, True), fill=INK)
    draw.line((2140, 2555, 3110, 2555), fill=(166, 177, 174), width=2)
    draw.text((2140, 2605), "Dados claros para decisões defensáveis.", font=sans(31), fill=INK_SOFT)

    divider(draw, 2770)

    # 4. Rodapé de sistema visual — leitura limpa em tamanho reduzido
    draw.rectangle((0, 2780, W, H), fill=PAPER)
    draw.rectangle((0, 2780, 610, H), fill=INK)
    logo_symbol(draw, (305, 2990), 106, WHITE, 8)
    draw.ellipse((160, 2845, 450, 3135), outline=SIGNAL, width=8)

    draw.text((720, 2860), "Sistema visual", font=sans(34, True), fill=INK)
    palette = [INK, INK_2, PAPER_2, PAPER, SIGNAL, GREEN, AMBER, RED]
    names = ["TINTA", "TINTA 02", "PAPEL 02", "PAPEL", "SINAL", "VIÁVEL", "ATENÇÃO", "RISCO"]
    for i, (color, name) in enumerate(zip(palette, names)):
        x = 720 + i * 290
        draw.rounded_rectangle((x, 2940, x + 230, 3070), radius=8, fill=color, outline=(205, 213, 210), width=2)
        draw.text((x, 3090), name, font=mono(17), fill=INK)
    draw.text((2520, 2838), "CARTOGRAFIA DECISIVA", font=mono(18), fill=INK_SOFT)

    # acabamento: microgrão e sharpen leve sem comprometer os textos
    grain = Image.effect_noise((W // 8, H // 8), 18).resize((W, H), Image.Resampling.BILINEAR).convert("RGB")
    img = Image.blend(img, grain, 0.012)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.1, percent=75, threshold=4))
    return img


if __name__ == "__main__":
    board = render()
    board.save(OUT, "PNG", optimize=True)
    board.resize((1600, 1600), Image.Resampling.LANCZOS).save(PREVIEW, "JPEG", quality=94, optimize=True, progressive=True)
    print(f"HD: {OUT} ({board.width}x{board.height})")
    print(f"Preview: {PREVIEW} (1600x1600)")
