# Sistema visual

Síntese operacional do que o site **já implementa**. Detalhe de engenharia: `design.md`.

## Gênero e tom visual

- **Genre:** modern-minimal B2B  
- **Tom:** technical + austere cartography  
- **Brand lock:** Cartografia Decisiva  
- **Enrichment:** mapa / dossiê (Tier A/B), grain sutil em superfícies escuras  

## Grid e layout

| Token / classe | Valor |
|---|---|
| Container | `.container-landing` — max-width **1320px** |
| Padding container | 1rem → 1.5rem (sm) → 2.5rem (lg) → 4rem (xl) |
| Section Y | `py-16 sm:py-20 md:py-28` (default); `md:py-32` só marcos |
| Spacing scale | 4-point (`--space-3xs` … `--space-3xl` em `tokens.css`) |

### Macrostruturas

| Família | Páginas | Comportamento |
|---|---|---|
| Map / Diagram | `/` | Estratos, bento, zigzag, radar |
| Workbench | `/cadastro`, `/demonstracao` | Form + prova, sem marquee |
| Long Document | `/blog`, `/legal/*`, `/sobre` | Tipografia, hairlines, índices `01 /` |

## Radius

| Token / classe | Valor | Uso |
|---|---|---|
| `--radius` | 0.625rem | Base; mapeia `rounded-lg` via theme |
| `radius-sm` … `radius-3xl` | ×0.6 … ×2.2 | `rounded-sm` … `rounded-3xl` |
| Pill | 9999px | CTAs primários de marketing, chips |
| Card bezel outer | 1.75rem | `.card-bezel` |
| Card bezel core | 1.4rem | Núcleo interno |
| Nav scrolled | 1rem | Frame flutuante |

> Não há `radius-4xl` no theme — não usar `rounded-4xl` sem reintroduzir o token.

## Superfícies e componentes de marca

### `.card-bezel`

Casca dupla (hardware usinado):

- Padding 0.4rem, borda sutil  
- Spotlight radial no hover (coords via `BezelSpotlight`)  
- Variante `.card-bezel--navy` — nome legado; visualmente é **tinta densa** (foreground), não “marca navy”  

### Sombras

Tint de tinta densa (`--color-brand-navy` = alias legado) — ver `color.md` (`shadow-raise`, `shadow-panel`, `shadow-float`, `shadow-cta`).

### Grain

`.grain-overlay` — opacidade ~0.05, noise SVG, **só** para quebrar esterilidade em dark panels.

### Mapa / cartografia

- `CadastralMapBackdrop` e SVG de rotas tracejadas (OG e hero)  
- Pins e estágios como dados, não decoração solta  
- Coordinates em `.coord`  

### Fotografia

Exemplo em uso: `/images/dossie-mesa.jpg` — matéria real (plantas, mapa, documentos).

| Sim | Não |
|---|---|
| Mesa de trabalho, dossiê, planta, cidade real BR | Stock “aperto de mão sorridente” |
| Luz natural / documental | Neon cyberpunk / 3D glossy genérico |
| Alt text descritivo territorial | “Imagem decorativa” em conteúdo semântico |

## Motion

| Token | Valor |
|---|---|
| `--motion-ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `--motion-fast` | 250ms |
| `--motion-reveal` | 620ms |
| Reveal | opacity + leve translate (`ScrollReveal`, classes `.reveal`) |
| Reduced motion | opacity-only ≤ 150ms; pausar marquee e dash de rota |

### Postura de microinteração

- Sucesso de form: **silencioso** (status inline, sem toast celebratório)  
- Hover tooltip delay 800ms; focus 0ms  
- Botões: estados completos via shadcn `Button`  
- Analytics: clique delegado `data-analytics-event` (server components permanecem server)

## Navegação e footer

| Peça | Padrão |
|---|---|
| Nav | **N10 scroll-morph** — full-bleed no topo; frame denso/flutuante após scroll |
| Footer | **Ft5 Statement** — statement de marca + grupos de links (não “link farm” de 4 colunas vazias) |

Nav: fundo near-black/teal-ink com blur; símbolo + wordmark claros.

## CTAs e botões

| Variante | Quando |
|---|---|
| `default` / `brand` | Primário de conversão |
| `brand-outline` | Secundário com borda primary |
| `outline` / `ghost` | UI terciária |
| `.cta-link` | Secundário tipográfico em seções |

Landing primário: filled primary, frequentemente **pill** (`rounded-full`), peso medium/semibold, opcional chip de seta.

## Ícones

- Biblioteca: **lucide-react** (`components.json`)  
- Traço consistente com UI austera  
- Não misturar packs de ícones coloridos 3D  

## UI kit

- **shadcn/ui** style `base-nova`, base color `mist`  
- CSS variables ON  
- Server Components por padrão; `"use client"` só quando necessário  

## Dark mode

- Via `next-themes`  
- Mesmo eixo de hue; primary mais claro  
- Bezel e cards sobem luminosidade de superfície, não viram “OLED pure black” sem matiz  

## Performance (marca = percepção de qualidade)

- `next/image` com `sizes` explícitos  
- Hero: `priority` quando imagem LCP  
- Animações leves CSS — **sem** framer-motion  
- Alvos Lighthouse do projeto: Perf ≥ 95, A11y ≥ 98, BP 100, SEO 100  

## O que páginas devem compartilhar

1. Wordmark / logo-mark  
2. Navy + primary com a proporção correta  
3. Trinca tipográfica Space Grotesk + IBM Plex + Geist Mono  
4. Voz de CTA (radius, padding, copy)  
5. Micro-linguagem: `.eyebrow`, `.coord`, `.data-mono`, `.card-bezel` em prova de produto  

## O que pode divergir

- Macroestrutura dentro da família  
- Arquétipo de hero (map fold vs form workbench)  
- Densidade de enrichment (home rica; legal nenhuma)  
