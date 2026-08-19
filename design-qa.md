# Design QA — hero com fundo territorial e navegação sobre foto

## Evidence

- Source visual truth: `/Users/edsongmaldonado/orca/workspaces/frontend_site/ajuste-site/public/images/fundo.jpg`
- Source pixels: `1792 × 1008` (16:9 raster image).
- Implementation screenshot: `/private/tmp/sigapp-hero-preview.rT1R4N/light-overlay.png`
- Dark-theme screenshot: `/private/tmp/sigapp-hero-preview.rT1R4N/desktop-dark-applied.png`
- Transparent-navigation screenshot: `/private/tmp/sigapp-hero-preview.rT1R4N/nav-transparent.png`
- Brighter-image and blurred-navigation screenshot: `/private/tmp/sigapp-hero-preview.rT1R4N/nav-blur-bright.png`
- Hero without opportunity card: `/private/tmp/sigapp-hero-preview.rT1R4N/no-radar-final.png`
- Consistent scrolled-navigation screenshot: `/private/tmp/sigapp-hero-preview.rT1R4N/nav-consistent-scrolled.png`
- Navigation without testing notice: `/private/tmp/sigapp-hero-preview.rT1R4N/nav-without-testing-notice.png`
- Scrolled-navigation screenshot: `/private/tmp/sigapp-hero-preview.rT1R4N/nav-scrolled.png`
- Combined comparison: `/private/tmp/sigapp-hero-preview.rT1R4N/source-preview-comparison-light.png`
- Browser: Orca embedded browser.
- Route and state: `/`, top of page, default light theme; dark theme checked separately.
- CSS viewport: `1154 × 920`, device pixel ratio `2`.
- Implementation pixels: `2308 × 1839`.
- Density normalization: the side-by-side comparison scales both images to `900px` high; the source becomes `1600 × 900` and the preview becomes `1130 × 900`.

## Findings

No actionable P0, P1, or P2 issues remain in the verified viewport.

- Fonts and typography: the existing Space Grotesk, IBM Plex Sans, and Geist Mono hierarchy was preserved. The title and support copy remain constrained to the ocean side for reliable contrast.
- Spacing and layout rhythm: removing the opportunity card opens the urban half of the photograph while the original left grid track keeps the copy from crossing the bright coastline.
- Colors and visual tokens: a light directional overlay protects text contrast without muting the photograph. The existing blue action color remains intact.
- Navigation: the home navigation uses translucent dark glass at the top, with `20px` backdrop blur, a light logo variant, higher-opacity light text, and subtle text shadows. After scroll it retains the same dark-glass language and light branding, becoming a denser rounded floating surface with `24px` blur.
- Image quality and asset fidelity: the supplied `1792 × 1008` image is rendered with `next/image`, `priority`, responsive sizing, `object-fit: cover`, restrained saturation, and breakpoint-specific focal positioning.
- Copy and content: the hero's primary copy and CTA destinations were preserved; the requested “Radar de oportunidade” interface was removed.
- Accessibility: the image is decorative (`alt=""` and `aria-hidden` wrapper); existing focus and interaction styles are unchanged.
- Responsiveness: no horizontal overflow was detected at the inspected viewport. The mobile crop uses `object-position: 48% center`; the Orca browser pane did not expose a viewport-resize control, so the mobile breakpoint was checked in code rather than captured visually.

## Primary interactions and runtime checks

- Primary CTA resolves to `/demonstracao`.
- Secondary CTA resolves to `/#como-funciona`.
- Theme switching was checked in light and dark states.
- The top-to-scrolled navigation transition was checked; `data-scrolled` changes density and opacity while preserving the light logo, light text, and dark-glass treatment.
- Testing-notice independence was checked by removing the notice in the Orca DOM: the navbar moved from `top: 40px` to `top: 0` with no residual gap.
- The background image completed loading.
- Browser console contained only Next.js Fast Refresh logs and no errors.

## Comparison history

1. Initial capture loaded a stale generated stylesheet, which left the new overlay and photo-specific text colors unapplied.
2. Removed the generated `.next` cache contents and restarted the development server.
3. Post-fix evidence: `/private/tmp/sigapp-hero-preview.rT1R4N/desktop-updated.png`; the overlay, typography contrast, focal crop, and panel treatment are all applied.
4. Reduced the overlay opacity after visual feedback and revalidated the brighter result in `/private/tmp/sigapp-hero-preview.rT1R4N/light-overlay.png`.
5. Added the transparent top navigation and verified both its overlay and scrolled states in Orca.
6. Increased the background brightness and added a stronger translucent blur to the top navigation; revalidated contrast and image detail in `/private/tmp/sigapp-hero-preview.rT1R4N/nav-blur-bright.png`.
7. Removed the opportunity card, retained the narrow text track, and verified the unobstructed territorial image in `/private/tmp/sigapp-hero-preview.rT1R4N/no-radar-final.png`.
8. Unified the scrolled navbar with the initial dark-glass state and verified it over later light and blue sections in `/private/tmp/sigapp-hero-preview.rT1R4N/nav-consistent-scrolled.png`.
9. Made the initial navbar offset conditional on the actual presence of `.landing-test-notice`; verified the notice-free state in `/private/tmp/sigapp-hero-preview.rT1R4N/nav-without-testing-notice.png`.

## Focused comparison

A separate crop was not required: the full screenshot was captured at device pixel ratio `2`, and the title, CTA group, coastline, unobstructed urban image, and scrolled navigation are readable at full-view scale. Dark-theme behavior has its own screenshot.

## Follow-up polish

- Optional P3: capture the hero in a narrower Orca browser pane if a future Orca release exposes viewport resizing; no code change is currently indicated.

final result: passed
