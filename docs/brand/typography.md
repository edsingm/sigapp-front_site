# Tipografia

## Famílias (runtime)

Definidas em `app/layout.tsx` via `next/font/google`:

| Papel | Família | CSS variable | Pesos carregados |
|---|---|---|---|
| **Display / headings** | Space Grotesk | `--font-heading` | 500, 600, 700 |
| **Body / UI** | IBM Plex Sans | `--font-sans` | 400, 500, 600, 700 |
| **Dados / mono** | Geist Mono | `--font-mono` | default do pacote |

Fallbacks: `ui-sans-serif, system-ui, sans-serif` (display/body) e `ui-monospace, monospace` (mono).

> **Nota:** `Claude.md` ainda menciona Inter/Roboto em trecho legado. A implementação canônica é Space Grotesk + IBM Plex Sans + Geist Mono.

## Papéis tipográficos

| Papel | Família | Uso |
|---|---|---|
| Display | Space Grotesk 600–700 | H1/H2 de seção, hero, statements |
| Body | IBM Plex Sans 400–500 | Parágrafos, UI, forms |
| Emphasis UI | IBM Plex Sans 600–700 | Labels fortes, nav wordmark |
| Mono / outlier | Geist Mono | Eyebrows, coords, métricas, índices de etapa |

### Regras

- **Sem itálico em headings** (`font-style: normal` em h1–h6)  
- Display com tracking **apertado** em grandes tamanhos (`-0.03em` a `-0.055em`)  
- Mono só para **informação técnica**, não para prosa longa  
- `font-variant-numeric: tabular-nums` em `.data-mono`

## Escalas

### Tokens portáteis (`tokens.css`)

| Token | Tamanho |
|---|---|
| `--text-xs` | 0.75rem |
| `--text-sm` | 0.875rem |
| `--text-md` | 1.125rem |
| `--text-lg` | 1.375rem |
| `--text-xl` | 1.75rem |
| `--text-2xl` | 2.25rem |
| `--text-display` | `clamp(2.5rem, 6vw, 5.25rem)` |

### Landing semantic type (`:root` em `globals.css` — em uso nas seções)

| Token | Tamanho | Uso |
|---|---|---|
| `--landing-text-body` | 1rem | Corpo |
| `--landing-text-support` | 0.9375rem | Apoio |
| `--landing-text-ui` | 0.875rem | UI densa |
| `--landing-text-caption` | 0.8125rem | Caption |
| `--landing-text-label` | 0.75rem | Label |
| `--landing-text-micro` | 0.6875rem | Micro / eyebrow base |

Estes tokens **não** estão no `@theme inline`; consomem-se com `var(--landing-text-*)` no CSS de seção.

### Section display (classe `.section-display`)

```css
font-family: heading;
font-size: clamp(1.875rem, 1.4rem + 1.6vw, 3rem);
font-weight: 700;
line-height: 1.05;
letter-spacing: -0.035em;
text-wrap: balance;
```

### H2 de seção (padrão `design.md`)

`text-3xl md:text-4xl lg:text-5xl` com `leading-[1.05]`

## Classes de linguagem de marca

### `.eyebrow`

- Mono, 0.6875rem, weight 500  
- `letter-spacing: 0.22em`, uppercase  
- Pseudo-elemento `::before` = risca 1.5rem  
- Variante `.eyebrow--center`

### `.data-mono`

- Mono + tabular nums  
- Métricas financeiras e contagens

### `.coord`

- Mono, 0.625rem, uppercase, tracking 0.08em  
- Coordenadas e metadados de campo

### `.cta-link`

- 0.9375rem, weight 600, tracking −0.01em  
- CTA secundário tipográfico

## Hierarquia recomendada (marketing)

```
Eyebrow (mono micro)
  ↓
Display H1/H2 (Space Grotesk, tight)
  ↓
Lead / description (IBM Plex, ~1rem–1.125rem)
  ↓
Body / bullets
  ↓
Caption / data-mono / coord
```

## Pairing com conteúdo

| Tipo de página | Ênfase |
|---|---|
| Home | Display generoso + mono de campo |
| Cadastro / demo | Body legível; display contido |
| Blog / legal / sobre | Ritmo de long document; display só no hero |

## Acessibilidade tipográfica

- Corpo mínimo confortável ~16px na web  
- Não depender só de cor no texto de status  
- `text-wrap: balance` em displays longos; `overflow-wrap` onde necessário  
- Contraste ink/paper prioritário sobre “cinza fashion” baixo contraste  

## Proibido

- Misturar uma 4ª família sem decisão de sistema  
- Headings em mono  
- Letter-spacing largo em parágrafos de corpo  
- All-caps em blocos longos (só micro-labels)  
