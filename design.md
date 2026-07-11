# Design — SIGAPP

A locked design system for this marketing site. Every page redesign reads this
file before emitting code. Do not regenerate per page — extend or amend this
file when the system needs to grow.

/* Hallmark · genre: modern-minimal · designed-as-app · design-system: design.md
 * marketing macro: Map / Diagram · conversion: Workbench · content: Long Document
 * nav: N10 scroll-morph · footer: Ft5 Statement · enrichment: map/dossier (Tier A/B)
 * tone: technical + austere cartography · brand: Cartografia Decisiva
 */

## Genre

modern-minimal (B2B SaaS) with cartographic editorial restraint.

## Macrostructure family

- Marketing pages (`/`): **Map / Diagram** — spatial strata, decision path, parcel language.
- Conversion pages (`/cadastro`, `/demonstracao`): **Workbench** — form + product proof.
- Content pages (`/blog`, `/legal/*`, `/sobre`): **Long Document** — memo-like reading.

## Theme

Brand-locked OKLCH (do not rotate catalog themes across pages):

- `--color-paper` · oklch(98.2% 0.006 264.5)
- `--color-paper-2` · oklch(97.3% 0.007 268.5)
- `--color-ink` · oklch(23.6% 0.058 257.5) — brand navy
- `--color-ink-2` · oklch(49.4% 0.042 261.1)
- `--color-rule` · oklch(93.6% 0.013 262.4)
- `--color-accent` · oklch(52% 0.17 258) — action blue, ≤ ~5% per viewport
- `--color-accent-sky` · oklch(71.2% 0.15 261.6) — routes / secondary map signal
- `--color-focus` · oklch(58% 0.229 263.7)

Maps to existing shadcn tokens: paper→background, ink→foreground / brand-navy, accent→primary.

## Typography

- Display: Space Grotesk, weight 600–700, style normal (no italic headers)
- Body: IBM Plex Sans, weight 400–500
- Mono: Geist Mono — coords, metrics, stage indices only
- Display tracking: tight (−0.03em to −0.055em on large display)
- H2 scale: `text-3xl md:text-4xl lg:text-5xl` with `leading-[1.05]`

## Spacing

4-point scale. Prefer section vertical rhythm:

- Section y: `py-16 sm:py-20 md:py-28` (default), `md:py-32` only for major landmarks
- Container: `.container-landing` (max 1320px)

## Motion

- Easings: `--motion-ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`
- Reveal: opacity + slight translate via ScrollReveal; cut decorative ping where non-informational
- Reduced-motion: opacity-only, ≤ 150 ms; pause marquees and route dash

## Microinteractions stance

- Silent success on forms (inline status, no celebratory toasts)
- Hover delay on tooltips 800 ms · focus 0 ms
- Buttons: full 8-state via shadcn Button
- Analytics via delegated `data-analytics-event` (server components stay server)

## CTA voice

- Primary: filled `primary`, `rounded-full`, medium weight, optional trailing arrow chip
- Secondary: typographic / outline hairline — never equal visual weight to primary
- Copy pattern: verb + object (“Solicitar demonstração”, “Ver como funciona”)

## Nav · Footer

- Nav: **N10 scroll-morph** — full-bleed on hero; denser floating surface after scroll
- Footer: **Ft5 Statement** — brand statement + compact link row (not 4-column farm)

## Per-page allowances

- Marketing MAY use map SVG, cadastral backdrops, grain, Tier-A CSS art, real photography
- Conversion: workbench layout, no marketing marquee noise
- Content: typography only; hairline rules; no bento showcases

## What pages MUST share

- Wordmark / logo-mark
- Navy + primary accent placement
- Space Grotesk + IBM Plex + Geist Mono
- CTA voice (radius, padding rhythm)
- Cartographic micro-language: `.eyebrow`, `.coord`, `.data-mono`, `.card-bezel` when framing product proof

## What pages MAY differ on

- Macrostructure within family
- Hero archetype (map fold vs form-led workbench)
- Enrichment density (home richest; legal none)

## Exports

Tokens live in `app/globals.css` (`:root` + `@theme inline`). Portable mirror: `tokens.css`.
