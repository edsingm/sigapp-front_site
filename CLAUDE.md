# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page do **SIGAPP** — plataforma SaaS de viabilidade e gestão imobiliária para incorporadoras brasileiras. Site puramente de marketing/conversão, sem autenticação nem área logada.

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
- Output `standalone` — projetado para deploy Docker

> **Atenção**: o Next.js 16 tem breaking changes em relação às versões anteriores. Consulte `node_modules/next/dist/docs/` antes de usar APIs de roteamento/metadados.

## Architecture

### Dados estáticos

Todo o conteúdo textual e de configuração da landing (planos, features, depoimentos, FAQ, métricas, comparativo) fica em **`lib/landing-data.ts`**. As seções apenas importam e renderizam — nunca defina copy inline nos componentes.

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

Seções em `sections/` são Server Components. Interatividade é isolada em sub-componentes em `client/`. Exemplo: `LandingNav` (Server) envolve `NavScrollClient` (Client) que lê scroll via `hooks/use-scroll-position.ts`.

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

### Cookie consent

`lib/cookie-consent.ts` gerencia consentimento via `localStorage` + cookie HTTP. Ao salvar, dispara fire-and-forget para `NEXT_PUBLIC_API_URL/api/v1/consent-log` (backend Laravel). O banner é montado em `app/layout.tsx` via `<CookieBanner />`.

### Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL do backend Laravel (ex: `http://localhost:8000`) |

### Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Landing page completa |
| `/sobre` | Página sobre |
| `/blog` | Listagem de posts |
| `/blog/[slug]` | Post individual |
| `/legal` | Hub de páginas legais |
| `/legal/privacidade`, `/legal/termos-de-uso`, `/legal/cookies`, `/legal/lgpd` | Páginas legais |
