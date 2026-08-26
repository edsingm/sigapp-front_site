# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page do **SIGAPP** — plataforma SaaS de viabilidade e gestão imobiliária para incorporadoras brasileiras. Site puramente de marketing/conversão, sem autenticação nem área logada.

## Imperative Rules for Claude

Always follow these rules (in order of priority):

1. **Server-first**: Every new component must be a Server Component by default. Only use `"use client"` when absolutely necessary.
2. **Zero inline styles or long Tailwind classes** — use global utilities + shadcn. Exception: dynamic percentage-based positioning calculated from data arrays is allowed (e.g. map pins in `BentoSection`).
3. **All textual content comes from `lib/landing-data.ts`** (never hardcode). CTA destinations are also centralized there via the `LINKS` constant.
4. **Performance > aesthetics**: Prioritize `next/image`, `loading="lazy"`, `fetchPriority`, and lightweight CSS animations.
5. **Accessibility**: Every component must be keyboard navigable and have correct labels.
6. **Mobile-first + exact breakpoints**: Use Tailwind v4 breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`). Never use custom media queries.

## SEO & Performance

- Every page must export `metadata` (or `generateMetadata` for dynamic routes).
- Use `next/image` with explicit `sizes` on all images.
- Hero image must have `priority={true}`.
- Target Lighthouse metrics:
  - Performance ≥ 95
  - Accessibility ≥ 98
  - Best Practices ≥ 100
  - SEO ≥ 100

## Commands

```bash
npm run dev        # servidor de desenvolvimento (porta 3000)
npm run build      # build de produção (output: standalone)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier em todos os .ts/.tsx
```

Sem suite de testes. Validação: `typecheck` + `lint` + verificação visual no browser.

## Stack

- **Next.js 16** (App Router) + **React 19** + TypeScript strict
- **Tailwind CSS v4** — sem `tailwind.config.js`; toda configuração fica em `app/globals.css` via `@import "tailwindcss"`
- **shadcn/ui** — estilo `base-nova`, cor base `mist`, ícones `lucide-react`
- Fontes: Inter (`--font-sans`), Roboto (`--font-heading`), Geist Mono (`--font-mono`)
- Cores em **oklch**; dark mode via `next-themes`
- Output `standalone` — imagem Docker no **Dokploy** (única plataforma de deploy)

## Deploy

Runbook: [`docs/deploy-dokploy.md`](docs/deploy-dokploy.md).

Cenário B: auto-deploy de `main` só em staging (`docker-compose.staging.yml`);
produção (`docker-compose.prod.yml`) é deploy **manual** da mesma revisão.
Coolify, AWS ECS/EKS e equivalentes não são usados.

> **Atenção**: o Next.js 16 tem breaking changes em relação às versões anteriores. Consulte `node_modules/next/dist/docs/` antes de usar APIs de roteamento/metadados.

## Coding Standards

### Naming Conventions
- Components: `PascalCase.tsx`
- Section files: `HeroSection.tsx`, `PricingSection.tsx` (sufixo `Section`, ou nome descritivo como `FeaturesZigzag.tsx`)
- Hooks: kebab-case — `use-scroll-position.ts`, `use-cookie-consent.ts`
- Data constants: `lib/landing-data.ts`
- Folders: `kebab-case` (except `components/landing/`)

### TypeScript
- Always use `type` instead of `interface` (except for shadcn component props).
- Every component must have explicit types for props.
- Never use `any`.

### Tailwind
- Prefer short classes + `@apply` only in `globals.css` for reusable components.
- Colors must always be in `oklch` (never hex or rgb).

### Animations
- Use only the classes `.reveal`, `.reveal-delay-{1-4}` and `animate-marquee`.
- Never use `framer-motion` or heavy libraries (performance).

## Architecture

### Dados estáticos

Todo o conteúdo textual e de configuração da landing (planos, features, depoimentos, FAQ, métricas, comparativo, destinos de CTA) fica em **`lib/landing-data.ts`**. As seções apenas importam e renderizam — nunca defina copy inline nos componentes.

O objeto `LINKS` centraliza todos os destinos de CTA (`signup`, `login`, `sales`, `demo`) e é alimentado por `NEXT_PUBLIC_APP_URL`.

### Componentes da landing

```
components/landing/
  sections/   — seções da página (Server Components por padrão)
  client/     — componentes interativos com "use client"
  layout/     — LandingNav, LandingFooter, LegalLayout
  ui/         — primitivos visuais específicos da landing
  mocks/      — UIs de demonstração usadas dentro das seções de features
```

### Padrão Server/Client

Seções em `sections/` são Server Components por padrão. A única exceção atual é `StatsSection` (client por causa da animação count-up via `requestAnimationFrame`). Interatividade é isolada em sub-componentes em `client/` — ex.: `PricingSection` (Server) renderiza `PricingToggle` (Client).

`LandingNav` é um Client Component (necessário para o estado do menu mobile) e envolve `NavScrollClient` para leitura de scroll.

### CSS utilitários globais

Definidos em `app/globals.css`:

- `.container-landing` — max-width 1320px com padding responsivo
- `.reveal` / `.reveal-delay-{1-4}` — animação de entrada por scroll
- `.animate-marquee` — loop infinito de logos
- `.bg-dot-pattern` — padrão pontilhado de fundo

### Adicionando componentes shadcn

```bash
npx shadcn@latest add <component>
# instala em components/ui/
```

### Conversion Tracking

Implementado em `lib/analytics.ts` + `components/landing/client/AnalyticsScripts.tsx`.

**Mecanismo**: listener de clique delegado no `document`. Qualquer elemento com `data-analytics-event` dispara automaticamente um evento — sem necessidade de tornar Server Components em Client Components.

```tsx
// Exemplo de CTA instrumentado (funciona em Server Components)
<a
  href={LINKS.signup}
  data-analytics-event="trial_signup_click"
  data-analytics-location="hero"
/>
```

**Eventos disponíveis** (definidos como constantes em `lib/analytics.ts`):
- `trial_signup_click` — todos os CTAs de trial/cadastro
- `demo_request` — "Agendar demonstração"
- `sales_contact_click` — "Falar com vendas" e plano Pro
- `login_click` — link "Entrar" no nav

**Consentimento (Consent Mode v2)**: o `app/layout.tsx` injeta um script `beforeInteractive` com `gtag('consent', 'default', …)` em denied (exceto `security_storage`). `lib/consent-mode.ts` aplica o `consent update` a partir das categorias. O `gtag/js` carrega quando `NEXT_PUBLIC_GA4_ID` está definido, mesmo com analytics negado (Consent Mode avançado). O Meta Pixel só é injetado com marketing concedido. Se analytics/marketing passam de true→false, o banner limpa cookies de fornecedor e recarrega; a primeira escolha “somente necessários” não é revogação.

### Cookie consent

`lib/cookie-consent.ts` gerencia consentimento via `localStorage` + cookie HTTP (`CONSENT_VERSION` atual: `1.1`). Ao salvar, dispara `sigapp:consent-changed` (CustomEvent) e fire-and-forget para `NEXT_PUBLIC_API_URL/api/v1/consent-log` (backend Laravel). O banner é montado em `app/layout.tsx` via `<CookieBanner />`. URLs antigas `/juridico/*` redirecionam em 308 para `/legal/*`.

### Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL do backend Laravel (ex: `http://localhost:8000`) |
| `NEXT_PUBLIC_APP_URL` | Base URL do app SaaS (ex: `https://app.sigapp.com.br`) — alimenta `LINKS` |
| `NEXT_PUBLIC_GA4_ID` | ID de medição do Google Analytics 4 (ex: `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Meta Pixel (ex: `1234567890`) |

### Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Landing page completa |
| `/sobre` | Página sobre |
| `/blog` | Listagem de posts |
| `/blog/[slug]` | Post individual |
| `/legal` | Hub de páginas legais |
| `/legal/privacidade`, `/legal/termos-de-uso`, `/legal/cookies`, `/legal/lgpd` | Páginas legais |

## When Claude Should Ask Before Changing

- Changing copy or section structure (always validate against `lib/landing-data.ts`)
- Adding a new dependency
- Changing section layout (Hero, Features, Pricing, FAQ)
- Changing colors or typography of the design system
- Any change that affects conversion (CTAs, forms, section order)
