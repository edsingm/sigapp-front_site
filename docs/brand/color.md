w

# Cor

## Identidade visual (o que a marca *é*)

A cor de marca do SIGAPP **não** é “SaaS azul + navy”.

É **Cartografia Decisiva**:

| Papel de marca         | Sensação                                     | Tokens                               |
| ---------------------- | ---------------------------------------------- | ------------------------------------ |
| **Tinta**        | Quase-preto esverdeado/azulado (mapa, dossiê) | `--landing-ink*` (hue ~200)        |
| **Papel**        | Superfície fria, levemente vegetal            | `--landing-paper*` (hue ~145–190) |
| **Sinal**        | Lime de campo / leitura positiva               | `--landing-signal*` (hue ~145)     |
| **Sobre escuro** | Texto em painéis de comando                   | `--landing-on-dark*`               |

Isso é o que a **landing** pinta: hero, seções, labels, CTAs editoriais, estados “pronto / ok” de narrativa.

Espaço canônico: **OKLCH**. Hex ≈ sRGB só para tools que não leem OKLCH.

> Runtime: `app/globals.css` (`:root` / `.dark` / `@theme inline`)
> Espelho de design (não é a UI): `tokens.css`
> Layout: `design.md`

## Hierarquia (ler nesta ordem)

```
1. Landing semantic  →  rosto da marca no marketing
2. Data status       →  métrica (verde / âmbar / vermelho)
3. shadcn semantic   →  kit de UI (botões, forms, dark mode)
```

**Não** trate `--primary` azul ou o nome legado `--color-brand-navy` como “a paleta da marca”. São resíduos de kit / sombra / CTA utilitário ainda no código.

---

## 1. Landing semantic (marca de marketing)

Definidos em `:root`. Consumo: `var(--landing-*)` no CSS de seção (centenas de usos). **Não** passam pelo `@theme inline`.

### Superfície e texto

| Token                      | OKLCH                    | Hex ≈       | Papel                               |
| -------------------------- | ------------------------ | ------------ | ----------------------------------- |
| `--landing-ink`          | `oklch(15% 0.04 200)`  | ~`#001012` | Tinta profunda; base de hero escuro |
| `--landing-ink-soft`     | `oklch(37% 0.025 200)` | —           | Texto / UI de apoio                 |
| `--landing-ink-muted`    | `oklch(43% 0.025 200)` | —           | Mais suave ainda                    |
| `--landing-paper`        | `oklch(97% 0.012 145)` | —           | Papel de seção                    |
| `--landing-paper-raised` | `oklch(99% 0.004 190)` | —           | Card / elevação leve              |
| `--landing-line`         | ink 11% alpha            | —           | Hairline                            |
| `--landing-line-strong`  | ink 19% alpha            | —           | Divisor mais firme                  |

### Sinal (destaque de marca)

| Token                       | OKLCH                    | Papel                               |
| --------------------------- | ------------------------ | ----------------------------------- |
| `--landing-signal`        | `oklch(84% 0.18 145)`  | Ênfase editorial, accents de campo |
| `--landing-signal-ink`    | `oklch(38% 0.13 145)`  | Sinal legível sobre papel claro    |
| `--landing-on-dark`       | `oklch(96% 0.012 190)` | Texto principal em painel escuro    |
| `--landing-on-dark-muted` | `oklch(78% 0.018 190)` | Texto secundário em painel escuro  |

### Escala tipográfica da landing

| Token                      | Tamanho   |
| -------------------------- | --------- |
| `--landing-text-body`    | 1rem      |
| `--landing-text-support` | 0.9375rem |
| `--landing-text-ui`      | 0.875rem  |
| `--landing-text-caption` | 0.8125rem |
| `--landing-text-label`   | 0.75rem   |
| `--landing-text-micro`   | 0.6875rem |

### Princípio de uso (marketing)

| Papel                   | Regra                                                        |
| ----------------------- | ------------------------------------------------------------ |
| **Papel + tinta** | ~85–90% do viewport                                         |
| **Sinal**         | Pontual — label, status, micro-acento (não flood de fundo) |
| **Sobre escuro**  | Só em faixas/painéis de comando (nav, hero, statement)     |

---

## 2. Status de dados

Usados em mocks e indicadores com significado (não decoração).

| Token                  | Light                                      | Dark | Significado  |
| ---------------------- | ------------------------------------------ | ---- | ------------ |
| `--color-data-green` | `oklch(56.3% 0.119 159)` ≈ `#1F8A5B`  | L↑  | Viável / ok |
| `--color-data-amber` | `oklch(63.5% 0.13 74.6)` ≈ `#B87D11`  | L↑  | Atenção    |
| `--color-data-red`   | `oklch(54.3% 0.174 29.7)` ≈ `#C0392B` | L↑  | Risco / erro |

Sempre **cor + label**. Não usar só cor.

---

## 3. shadcn semantic (kit de UI — não é o “rosto” da marca)

Mapeados em `@theme inline` → utilities (`bg-background`, `bg-primary`, …).

Servem a botões, forms, dark mode e mocks de produto. O **primary azul** (`hue ~258`) é convenience do kit shadcn / CTAs `Button` — **não** reescreve a identidade cartográfica acima.

| Token                                        | Utility                     | Light (resumo)         | Dark               |
| -------------------------------------------- | --------------------------- | ---------------------- | ------------------ |
| `--background`                             | `bg-background`           | papel frio`#F7F9FD`  | superfície escura |
| `--foreground`                             | `text-foreground`         | tinta densa`#0B1E39` | texto claro        |
| `--card`                                   | `bg-card`                 | branco                 | card elevado       |
| `--primary`                                | `bg-primary`              | azul ação kit        | azul mais claro    |
| `--primary-foreground`                     | `text-primary-foreground` | branco                 | branco             |
| `--secondary` / `--muted` / `--accent` | utilities                   | apoios de UI           | equivalentes dark  |
| `--destructive`                            | `text-destructive`        | ≈ data-red            | L↑                |
| `--border` / `--input` / `--ring`      | borda / focus               | hairline + focus       | alpha branco       |

### Alias legado no CSS

| Token                  | Valor light                           | O que é de verdade                                                                                                                                     |
| ---------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-brand-navy` | =`--foreground` light (`#0B1E39`) | **Não** é “cor de marca navy”. Nome legado. Usado em sombras tintadas e `.card-bezel--navy`. Preferir pensar: *tinta densa / foreground*. |

Se renomear no código, o alvo semântico é **ink denso**, não “navy corporativo”.

---

## 4. Motion (cor não, mas no mesmo globals)

| Token                 | Valor                              |
| --------------------- | ---------------------------------- |
| `--motion-fast`     | 250ms                              |
| `--motion-reveal`   | 620ms                              |
| `--motion-ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |

---

## Assets com hex antigo (dívida visual)

| Asset                            | Cores                     | Nota                                                          |
| -------------------------------- | ------------------------- | ------------------------------------------------------------- |
| `public/logo-mark.svg`         | `#2E6BFF` + `#0B1E39` | Wordmark ainda no kit azul;**não** é a paleta landing |
| `public/icon.svg`              | navy + pin azul           | Idem                                                          |
| `public/landing-logo-mark.svg` | `#102725` / `#F5FBF6` | Mais próximo da tinta cartográfica                          |
| Open Graph                       | fundo`#0B1E39`          | Pode migrar para`--landing-ink` se unificar                 |

Novos materiais de marca → **tinta + papel + sinal**, não pin azul SaaS.

---

## Elevação

Sombras usam `var(--color-brand-navy)` por histórico de nome (= tinta densa):

- `shadow-raise` · `shadow-panel` · `shadow-float`
- `shadow-cta` — mix de `--primary` (kit), não do sinal lime

---

## Removido (não reintroduzir sem consumer)

- `popover*`, `card-foreground`, `chart-*`, `sidebar*`
- `nav-bg`, `color-brand-sky/subtle/line/muted`, `surface-raised/sunken`
- `radius-4xl`, `motion-micro`

---

## Proibido

| ✗                                                  | Por quê                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Descrever a marca como “navy + azul de ação”    | Isso é kit shadcn residual, não identidade                      |
| Flood de`--primary` azul em seções de marketing | Conflita com sinal cartográfico                                  |
| Gradiente purple / neon SaaS                        | Fora do território                                               |
| Hex solto em seção nova                           | Usar`--landing-*` ou utilities shadcn com consciência do papel |
| Status só com cor                                  | Acessibilidade                                                    |

## Faça

| ✓                                                          |
| ----------------------------------------------------------- |
| Marketing novo →`--landing-ink` / `paper` / `signal` |
| Status de dado →`--color-data-*`                         |
| Form / button shadcn → utilities do kit, sem reinventar    |
| Dark mode → overrides shadcn em`.dark`                   |
