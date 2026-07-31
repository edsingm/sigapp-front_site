# Graph Report - .  (2026-07-31)

## Corpus Check
- 125 files · ~250,834 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 642 nodes · 1292 edges · 37 communities (32 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.66)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Blog routes and OG
- Landing architecture & brand docs
- Brand canvas render kit
- Dependencies and theming
- Root layout and analytics
- Pricing plans and matrix
- Feature demo mocks
- shadcn component config
- Plan entitlements mapping
- Marketing photo assets
- Canvas and product imagery
- TypeScript config
- Home page composition
- Demo form and UI primitives
- Brand canvas formats
- Landing data models
- Plans API and signup
- Problem and testimonials sections
- Signup status and theme toggle
- Demo page and footer
- Nav and cadastral backdrop
- Signup form flow
- Public logos and icons
- Bento section modules
- Navigation and scroll
- FAQ accordion
- Hero showcase and dashboard mock
- Hero background video
- Testimonials carousel
- SIGAPP vs planilha comparison
- Hero section
- Demo API route
- OpenGraph image brand
- MCP shadcn config
- ESLint config
- Next.js config
- PostCSS config

## God Nodes (most connected - your core abstractions)
1. `cn()` - 49 edges
2. `LINKS` - 17 edges
3. `compilerOptions` - 16 edges
4. `nestedBoolean()` - 15 edges
5. `f_mono()` - 14 edges
6. `canvas_key_art()` - 14 edges
7. `design.md — locked design system` - 14 edges
8. `canvas_ad_landscape()` - 13 edges
9. `ScrollReveal()` - 12 edges
10. `paper_grain()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Survey Silence visual philosophy` --semantically_similar_to--> `Cartografia Decisiva brand lock`  [INFERRED] [semantically similar]
  docs/brand/marketing/canvas/DESIGN-PHILOSOPHY.md → design.md
- `Landing semantic --landing-* tokens` --semantically_similar_to--> `Brand-locked OKLCH theme tokens`  [INFERRED] [semantically similar]
  docs/brand/color.md → design.md
- `Production front service (runner target)` --semantically_similar_to--> `Dev front service sigapp-front-site`  [INFERRED] [semantically similar]
  docker-compose.prod.yml → docker-compose.yml
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `Page()` --indirect_call--> `mapApiPlansToLandingPlans()`  [INFERRED]
  app/page.tsx → lib/plan-display.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Brand system core documentation set** — docs_brand_identity, docs_brand_voice_and_tone, docs_brand_color, docs_brand_typography, docs_brand_logo, docs_brand_visual_system, docs_brand_do_and_dont [EXTRACTED 1.00]
- **Page macrostructure families (Map/Workbench/Long Document)** — design_md_macro_map_diagram, design_md_macro_workbench, design_md_macro_long_document [EXTRACTED 1.00]
- **Cartographic brand lock: palette + Survey Silence + identity territory** — design_md_cartografia_decisiva, docs_brand_color_tinta_papel_sinal, docs_brand_marketing_canvas_design_philosophy_survey_silence [INFERRED 0.90]

## Communities (37 total, 5 thin omitted)

### Community 0 - "Blog routes and OG"
Cohesion: 0.06
Nodes (52): ArchivePostRow(), BlogPage(), FeaturedPostCard(), metadata, BlogPostOpenGraphImage(), BRAND, size, ArticleHeading (+44 more)

### Community 1 - "Landing architecture & brand docs"
Cohesion: 0.06
Nodes (56): CLAUDE.md — project guidance for Claude, Conversion tracking (data-analytics-event), Cookie consent + GA4/Meta Pixel gating, lib/landing-data.ts centralized copy + LINKS, Landing page marketing/conversão (sem auth), Lighthouse targets (Perf≥95 A11y≥98 BP/SEO 100), Server-first components, SIGAPP (+48 more)

### Community 2 - "Brand canvas render kit"
Cohesion: 0.20
Nodes (37): canvas_ad_landscape(), canvas_banner_linkedin(), canvas_email_header(), canvas_key_art(), canvas_kit_cover(), canvas_og(), canvas_poster_minimal(), canvas_social_square() (+29 more)

### Community 3 - "Dependencies and theming"
Cohesion: 0.06
Nodes (35): ThemeColorSync(), dependencies, @base-ui/react, class-variance-authority, clsx, lucide-react, next, next-themes (+27 more)

### Community 4 - "Root layout and analytics"
Cohesion: 0.09
Nodes (28): fontMono, ibmPlexSans, metadata, RootLayout(), spaceGrotesk, viewport, AnalyticsScripts(), resolveConsent() (+20 more)

### Community 5 - "Pricing plans and matrix"
Cohesion: 0.11
Nodes (21): PricingToggle(), PricingToggleProps, PricingSection(), PricingSectionProps, PlanCard(), PlanCardProps, BooleanValue(), criterionNumber() (+13 more)

### Community 6 - "Feature demo mocks"
Cohesion: 0.10
Nodes (19): MockReveal(), Props, ChatMock(), MESSAGES, ALL_MODULES, MODULE_LABELS, MODULE_SHORT_LABELS, PermissionsMock() (+11 more)

### Community 7 - "shadcn component config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 8 - "Plan entitlements mapping"
Cohesion: 0.25
Nodes (21): PlanSummary(), addedTierFeatures(), baseTierFeatures(), formatAiBudget(), formatAiLevel(), formatDashboardLevel(), formatLimit(), formatPlanHighlight() (+13 more)

### Community 9 - "Marketing photo assets"
Cohesion: 0.17
Nodes (17): Mapas cadastrais APROVADO, Dossiê Comissão Avaliadora, Matrícula 28471-SP, Workspace de viabilidade imobiliária, Mapa topográfico com curvas de nível, Pin de localização verde, Régua de escala, Livreto-mapa dossiê vertical (+9 more)

### Community 10 - "Canvas and product imagery"
Cohesion: 0.20
Nodes (20): Análise de Viabilidade, Brasil market, Brand canvas grid system, LinkedIn Banner 07, Open Graph Share Image 08, Museum Plate 09 Quiet Parcel, Committee Meeting Table, Dossier Desk Overhead (+12 more)

### Community 11 - "TypeScript config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 12 - "Home page composition"
Cohesion: 0.14
Nodes (14): homeJsonLd, metadata, BezelSpotlight(), StickyMobileCTA(), CTAFinalSection(), DEMO_ICONS, HowItWorksSection(), STEP_ICONS (+6 more)

### Community 13 - "Demo form and UI primitives"
Cohesion: 0.18
Nodes (10): EyebrowBadge(), EyebrowBadgeProps, MetricDisplay(), MetricDisplayProps, SectionLabel(), SectionLabelProps, Input(), Label() (+2 more)

### Community 14 - "Brand canvas formats"
Cohesion: 0.20
Nodes (12): Landscape ad format, Brand color tokens, Demonstração CTA, Email header format, Cartographic grid map motif, Brand kit master plate, SIGAPP brand, Social feed square format (+4 more)

### Community 15 - "Landing data models"
Cohesion: 0.13
Nodes (14): SocialProofBar(), BentoAlert, CLIENT_LOGOS, ComparisonRow, DOMAIN_STRIP, FeatureItem, FooterGroup, FooterLink (+6 more)

### Community 16 - "Plans API and signup"
Cohesion: 0.15
Nodes (15): CadastroPage(), Page(), apiBaseUrl(), ApiPlan, ApiSuccess, AvailabilityResult, DemoRequestPayload, DemoRequestResult (+7 more)

### Community 17 - "Problem and testimonials sections"
Cohesion: 0.16
Nodes (11): Props, ScrollReveal(), MatterStripSection(), PAIN_ICONS, ProblemSection(), TestimonialsSection(), MATTER_STRIP, PAIN_POINTS (+3 more)

### Community 18 - "Signup status and theme toggle"
Cohesion: 0.26
Nodes (9): metadata, SearchParams, Phase, Props, SignupStatus(), subscribeToHydration(), ThemeToggleButton(), ThemeToggleButtonProps (+1 more)

### Community 19 - "Demo page and footer"
Cohesion: 0.21
Nodes (9): metadata, CookiePreferencesButton(), DemoRequestForm(), isExternal(), LandingFooter(), openCookiePrefs(), DEMO_PAGE, FOOTER_COPY (+1 more)

### Community 20 - "Nav and cadastral backdrop"
Cohesion: 0.21
Nodes (8): metadata, LandingNav(), CadastralMapBackdrop(), CadastralParcel, PARCELS, PINS, Button(), buttonVariants

### Community 21 - "Signup form flow"
Cohesion: 0.21
Nodes (7): Props, SignupForm(), SignupProgress(), slugify(), SlugStatus, checkSubdomain(), METRICS

### Community 22 - "Public logos and icons"
Cohesion: 0.29
Nodes (6): Apple touch icon purpose, Favicon and app icon purpose, Real estate dossier desk scene, SIGAPP brand identity, SIGAPP geometric logo mark, SIGAPP wordmark

### Community 23 - "Bento section modules"
Cohesion: 0.20
Nodes (6): BentoSection(), MAP_PINS, BENTO_ALERTS, BENTO_COPY, BENTO_DRE, BENTO_EXPORT_FILES

### Community 24 - "Navigation and scroll"
Cohesion: 0.31
Nodes (5): NavScrollClient(), NavScrollClientProps, useScrollPosition(), NAV_COPY, NAV_LINKS

### Community 25 - "FAQ accordion"
Cohesion: 0.29
Nodes (6): FAQAccordion(), FAQAccordionProps, FAQSection(), FAQ_COPY, FAQ_ITEMS, FAQItem

### Community 26 - "Hero showcase and dashboard mock"
Cohesion: 0.29
Nodes (4): DashboardPreviewMock(), SPARKLINE_POINTS, STATUS_COLORS, TERRENOS

### Community 27 - "Hero background video"
Cohesion: 0.53
Nodes (5): getReducedMotionServerSnapshot(), getReducedMotionSnapshot(), HeroBackgroundVideo(), subscribeReducedMotion(), HERO_COPY

### Community 28 - "Testimonials carousel"
Cohesion: 0.47
Nodes (3): TestimonialCard(), TestimonialCardProps, Testimonial

### Community 29 - "SIGAPP vs planilha comparison"
Cohesion: 0.33
Nodes (5): ComparisonSection(), MatrixCell(), COMPARISON_COLUMNS, COMPARISON_COPY, COMPARISON_ROWS

### Community 30 - "Hero section"
Cohesion: 0.33
Nodes (3): HeroSection(), StageNodeProps, HERO_PROOF_ITEMS

### Community 31 - "Demo API route"
Cohesion: 0.60
Nodes (4): apiBaseUrl(), DemoBody, POST(), validate()

## Knowledge Gaps
- **190 isolated node(s):** `npx`, `DemoBody`, `size`, `BRAND`, `Props` (+185 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ThemeColorSync()` connect `Dependencies and theming` to `Root layout and analytics`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `npx`, `DemoBody`, `size` to the rest of the system?**
  _200 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Blog routes and OG` be split into smaller, more focused modules?**
  _Cohesion score 0.055135135135135134 - nodes in this community are weakly interconnected._
- **Should `Landing architecture & brand docs` be split into smaller, more focused modules?**
  _Cohesion score 0.05786090005844535 - nodes in this community are weakly interconnected._
- **Should `Dependencies and theming` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `Root layout and analytics` be split into smaller, more focused modules?**
  _Cohesion score 0.08907563025210084 - nodes in this community are weakly interconnected._
- **Should `Pricing plans and matrix` be split into smaller, more focused modules?**
  _Cohesion score 0.11384615384615385 - nodes in this community are weakly interconnected._