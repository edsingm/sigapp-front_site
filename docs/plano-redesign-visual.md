# Plano de refinamento visual — Landing SIGAPP

> Auditoria de design realizada em 01/07/2026 sobre a landing page completa
> (`app/page.tsx` + `components/landing/`). Objetivo: elevar a sofisticação
> visual sem quebrar funcionalidade, mantendo a stack atual (Next.js 16,
> Tailwind v4, shadcn) e as regras do `CLAUDE.md`.

> **STATUS: implementado em 01/07/2026** (fases 1–4 completas). Decisões
> pendentes resolvidas pelas recomendações: Space Grotesk, faixa de métricas
> do Hero removida, rota cartográfica no HowItWorks, FAQ em 2 colunas,
> `StatsSection` órfã removida, linha do CNPJ removida até haver o dado real.
> Segue em aberto: confirmar veracidade das métricas de prova social e obter
> o CNPJ real.

---

## 1. O que já está forte (não mexer)

A landing está acima da média e tem uma linguagem de marca própria — o plano
é refinar, não reconstruir:

- **Linguagem "Cartografia Decisiva"** — eyebrows mono com risca, classe
  `.coord`, `card-bezel` de moldura dupla, backdrop cadastral animado. É um
  sistema coeso e diferenciado; deve ser **amplificado**, não substituído.
- **Cabeçalhos assimétricos** (grid 5/7 colunas com título à esquerda e
  descrição à direita) — já evita o padrão genérico "tudo centralizado".
- **Bento grid** com âncora navy + DRE real como prova — composição madura.
- **Motion system** — tokens de movimento, `prefers-reduced-motion` em tudo,
  reveals escalonados por CSS puro. Nada disso precisa de biblioteca.
- **Fundamentos técnicos** — dark mode, JSON-LD, analytics delegado,
  acessibilidade nos controles de navegação.

---

## 2. Diagnóstico — problemas encontrados

### 2.1 Bugs de conteúdo (corrigir primeiro, custo zero, impacto alto)

| Problema | Onde |
|---|---|
| Copy sem acentuação: "Solicitar demonstracao", "Analise em contexto", "Governanca por etapa" | `HeroSection.tsx` (PROOF_ITEMS e CTA), `LandingNav.tsx` (2 ocorrências) |
| "Do cadastro ao registro imobiliario", "Sem implantacao demorada", "Ver analise territorial" | `HowItWorksSection.tsx`, `HeroSection.tsx` |
| CNPJ placeholder `00.000.000/0001-00` visível no footer | `LandingFooter.tsx` |
| Copy hardcoded em componentes viola a regra 3 do CLAUDE.md (todo texto em `lib/landing-data.ts`): `PROOF_ITEMS`, `HERO_METRICS` no Hero; `EXPORT_FILES`, `ALERT_ITEMS`, dados do `MiniDRE` no Bento; `NAV_LINKS` no nav; `FOOTER_GROUPS` no footer | `HeroSection.tsx`, `BentoSection.tsx`, `LandingNav.tsx`, `LandingFooter.tsx` |

### 2.2 Cor e superfícies

- **Tokens em hex, não oklch** — `globals.css` define toda a paleta em hex
  (`#2e6bff`, `#0b1e39`…), violando o próprio padrão do projeto ("Colors must
  always be in oklch"). Migrar 1:1 (mesma cor, notação oklch) é seguro e abre
  caminho para `color-mix()` consistente.
- **Hex hardcoded em componentes** — `bg-[#0B1E39]` (CTAFinal), `bg-[#07182E]`
  (footer), `text-[#0B1E39]` (link do Bento), `fill: #2e6bff` no CSS do mapa.
  O footer usa um segundo tom escuro (`#07182E`) quase igual ao navy da marca
  (`#0B1E39`) — dois escuros concorrentes sem hierarquia intencional.
- **Sombras arbitrárias longas e repetidas** — a mesma
  `shadow-[0_28px_80px_-42px_rgba(11,30,57,…)]` aparece com pequenas variações
  em Hero, PlanCard, ProblemSection, HowItWorks. Viola a regra "zero long
  Tailwind classes". As sombras já são tintadas de navy (ótimo) — falta só
  centralizá-las em 2–3 utilitários (`.shadow-raise`, `.shadow-float`,
  `.shadow-panel`).
- **Superfícies escuras 100% lisas** — CTA final e footer são planos. Um
  overlay de grain/noise sutil (SVG `feTurbulence` inline, `opacity` ~3%,
  `pointer-events-none`) quebraria a esterilidade digital sem custo de
  performance.

### 2.3 Tipografia

- **Roboto como heading é a escolha mais neutra possível** — não briga com o
  Inter do corpo, mas também não dá personalidade. O restante da marca
  (mono cartográfico, bezels usinados) pede um heading com mais caráter
  técnico. Candidatas que conversam com "cartografia/engenharia":
  **Space Grotesk**, **Sora** ou **Bricolage Grotesque** (todas no Google
  Fonts, troca de 3 linhas em `layout.tsx`).
  ⚠️ *Mudança de design system — requer aprovação antes de aplicar.*
- **Escala de heading inconsistente entre seções** — H2 varia entre
  `md:text-4xl` e `md:text-5xl` sem critério aparente (Problem/HowItWorks/
  Comparison usam `lg:text-5xl`; Bento/Testimonials param em `4xl`;
  Features/Pricing usam `md:text-5xl` sem passo `lg`). Definir uma escala
  única de H2 e aplicar em todas as seções.
- **Pesos**: bom uso de 500–700. Sem problema.

### 2.4 Layout e composição

- **HowItWorksSection é a seção mais genérica da página** — 4 colunas iguais,
  centradas, com linha tracejada reta. É exatamente o padrão "AI default".
  Proposta coerente com a marca: transformar a linha reta em **rota
  cartográfica** (path SVG curvo com `stroke-dasharray`, desenhado no scroll,
  reutilizando o estilo `brand-map__route` que já existe), com os passos em
  alturas levemente alternadas (offset vertical em md+). Mantém os 4 passos e
  o conteúdo — muda só a geometria.
  ⚠️ *Mudança de layout de seção — requer aprovação.*
- **Métricas duplicadas em sequência** — o Hero termina com uma faixa de 3
  métricas (`HERO_METRICS`) e a seção imediatamente seguinte (SocialProofBar)
  abre com 4 métricas no mesmo estilo visual (grid + hairline + mono). Duas
  faixas de números coladas diluem o impacto de ambas. Recomendação: remover a
  faixa do Hero (a prova social fica concentrada no SocialProofBar) ou
  reduzi-la a uma linha de texto discreta.
  ⚠️ *Afeta estrutura de seção — requer aprovação.*
- **Ícone repetido sem significado** — `ShieldCheck` idêntico nas 3 métricas
  do Hero. Se a faixa ficar, cada métrica deveria ter ícone próprio ou nenhum.
- **Coluna SIGAPP na tabela comparativa** — destacada só com `bg-primary/6`.
  Merece mais peso: ring, leve elevação ou header com fundo navy, formando a
  "torre vencedora" sem exagero.

### 2.5 Componentes genéricos (fingerprints de padrão comum)

- **Marquee de logos em texto puro** — `CLIENT_LOGOS` são strings renderizadas
  em `font-heading`. Todos os "logos" têm exatamente a mesma cara, o que
  denuncia placeholder. Transformar cada nome em um pequeno wordmark SVG com
  tratamento tipográfico distinto (serif, condensed, caps espaçado, com
  símbolo) — ainda fictícios, mas visualmente críveis.
- **Depoimentos com 5 estrelas em todos os cards** — uniformidade perfeita
  parece fake. Remover as estrelas (o badge de highlight já cumpre o papel) ou
  substituí-las por um dado concreto ("cliente desde 2024").
- **FAQ em accordion** — padrão mais comum que existe. Alternativa de baixo
  risco: manter o accordion mas em **duas colunas** em lg+ (6 itens ficam com
  metade da altura), com o primeiro item aberto por padrão.
  ⚠️ *Mudança de layout de seção — requer aprovação.*
- **Stroke width inconsistente nos ícones lucide** — mistura de 1.5, 1.7 e 2.5
  pela página. Padronizar em 1.5 (decorativos/features) e 2.5 (checks).

### 2.6 Interatividade e estados

- **Falta feedback de pressão** — só o CTA final tem `active:scale-[0.98]`.
  Aplicar a todos os botões primários (idealmente no próprio variant do
  `Button`, um lugar só).
- **Spotlight border nos bezels** — upgrade sofisticado e barato: borda dos
  `card-bezel` que ilumina sob o cursor (gradiente radial em
  `--x/--y` via um único listener). Coerente com o tema "scan" que já existe
  no backdrop cadastral. Progressivo: sem JS, o card fica como está.

### 2.7 Omissões estratégicas

- **Sem 404 customizado** — não existe `app/not-found.tsx`. Oportunidade de
  marca perfeita: "Coordenada não encontrada" com o `CadastralMapBackdrop` e
  um pin fora da parcela. Baixo esforço, alto charme.
- **`StatsSection.tsx` é código órfão** — existe em `sections/` mas não é
  importado em `page.tsx` (e duplica as métricas do SocialProofBar). Não será
  removido neste plano; decidir se apaga ou reaproveita.
- **Métricas de prova social ("340+ incorporadoras", "R$ 2,4B")** — confirmar
  se são reais. Números inflados em landing B2B são risco de credibilidade na
  primeira call de vendas. *Decisão de negócio, não de código.*

---

## 3. Plano de execução

Ordem de prioridade = impacto visual ÷ risco. Cada fase é individualmente
entregável e verificável.

### Fase 1 — Higiene de base (sem mudança visual perceptível)
*Risco baixo · não requer aprovação*

1. Corrigir toda a acentuação faltante na copy (seção 2.1) → verificar: grep
   por palavras sem acento + revisão visual.
2. Mover copy hardcoded para `lib/landing-data.ts` (`PROOF_ITEMS`,
   `HERO_METRICS`, `NAV_LINKS`, `FOOTER_GROUPS`, dados dos mocks do Bento)
   → verificar: `npm run typecheck` + página idêntica no preview.
3. Migrar tokens de `globals.css` de hex para oklch (conversão 1:1) e
   substituir hex hardcoded nos componentes por tokens/variáveis
   → verificar: comparação visual light/dark antes e depois.
4. Criar utilitários de sombra (`.shadow-raise`, `.shadow-float`,
   `.shadow-panel`) em `globals.css` e substituir as arbitrárias repetidas
   → verificar: `npm run lint` + preview.
5. Trocar o CNPJ placeholder pelo real (ou remover a linha até ter o dado).

### Fase 2 — Tipografia
*Risco baixo · **requer aprovação** (design system)*

6. Trocar Roboto → Space Grotesk (ou Sora/Bricolage, a decidir) como
   `--font-heading` em `app/layout.tsx` → verificar: preview de todas as
   seções + dark mode + Lighthouse (fonte com `display: swap` mantém CLS).
7. Unificar a escala de H2 das seções (um único conjunto
   `text-3xl md:text-4xl lg:text-5xl`) → verificar: preview seção a seção.

### Fase 3 — Refinamento por seção
*Risco médio · **requer aprovação** (layout de seções e conversão)*

8. **Hero**: remover (ou reduzir a uma linha) a faixa `HERO_METRICS`,
   eliminando a duplicação com o SocialProofBar → verificar: preview +
   confirmar que nenhum CTA mudou.
9. **HowItWorks**: substituir a linha tracejada reta por rota cartográfica
   SVG (path curvo, dash animado no scroll, estilo `brand-map__route`) com
   offsets verticais alternados nos passos → verificar: preview em
   mobile/tablet/desktop + `prefers-reduced-motion`.
10. **Comparison**: dar peso real à coluna SIGAPP (ring + header navy)
    → verificar: preview light/dark.
11. **SocialProofBar**: wordmarks SVG diferenciados no marquee no lugar das
    strings uniformes → verificar: preview + contraste ≥ AA.
12. **Testimonials**: remover as 5 estrelas uniformes; manter badge de
    highlight → verificar: preview do grid e do carousel mobile.
13. **FAQ**: accordion em duas colunas em lg+ → verificar: navegação por
    teclado + preview.

### Fase 4 — Sofisticação (o toque final)
*Risco baixo · itens independentes entre si*

14. `active:scale-[0.98]` + `translateY(1px)` nos variants do `Button`
    → verificar: interação no preview.
15. Grain overlay sutil nas superfícies escuras (CTA final, footer, card navy
    do Bento) → verificar: preview + screenshot antes/depois.
16. Spotlight border nos `card-bezel` (progressivo, um listener global)
    → verificar: hover no preview + sem JS continua íntegro.
17. Padronizar `strokeWidth` dos ícones lucide (1.5 decorativo / 2.5 checks)
    → verificar: grep por `strokeWidth`.
18. Criar `app/not-found.tsx` — 404 "Coordenada não encontrada" com backdrop
    cadastral e CTA de volta à home → verificar: acessar rota inexistente.

### Verificação global (ao fim de cada fase)

```bash
npm run typecheck && npm run lint
```

Preview visual (light + dark + mobile 375px) e, ao final do plano completo,
Lighthouse com as metas do projeto (Perf ≥ 95, A11y ≥ 98, BP = 100, SEO = 100).

---

## 4. Decisões pendentes (aguardando o Edson)

| # | Decisão | Recomendação |
|---|---|---|
| 1 | Fonte de heading: Space Grotesk, Sora ou Bricolage Grotesque? | Space Grotesk — geométrica com detalhes técnicos, par natural do Geist Mono |
| 2 | Faixa de métricas do Hero: remover ou reduzir? | Remover — SocialProofBar assume a prova social sozinho |
| 3 | Redesign do HowItWorks (rota cartográfica): aprovar? | Sim — é a seção que mais destoa da linguagem da marca |
| 4 | FAQ em duas colunas: aprovar? | Sim — baixo risco, melhora densidade |
| 5 | Métricas "340+ / R$ 2,4B / 12.800+" são reais? | Confirmar antes de qualquer campanha paga |
| 6 | CNPJ real para o footer | Necessário para conformidade |
| 7 | `StatsSection.tsx` órfã: apagar ou reaproveitar? | Apagar (duplica SocialProofBar) |
