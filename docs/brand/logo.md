# Logo e marcas

O SIGAPP opera com **wordmark tipográfico + símbolo de dossiê/parcela** e assets SVG legados. Preferir o símbolo inline da nav para UI do site; os SVGs de `public/` para favicon, OG e export.

## Sistema de marcas

| Marca | Onde | Descrição |
|---|---|---|
| **Símbolo (nav / signup)** | `LandingNav`, `SignupBrand` | Hexágono/parcela em outline + nó central — “lote no mapa” |
| **Wordmark texto** | Nav, footer | `SIGAPP` em strong + product label “Inteligência imobiliária” |
| **Logo-mark SVG** | `public/logo-mark.svg` | “SIG” azul + pílula navy “APP” |
| **Landing logo SVG** | `public/landing-logo-mark.svg` | Variante tinta escura (legado) |
| **App icon** | `public/icon.svg`, `apple-touch-icon.svg` | Monograma S + pin + G em navy |

## Símbolo de interface (canônico no site)

SVG 32×32 usado na navegação:

- Contorno de **hexágono / parcela**  
- Linhas internas que sugerem **dobra de mapa / dossiê**  
- **Círculo central** (ponto de decisão / pin abstrato)  

**Aria:** o link carrega `aria-label="SIGAPP — início"`; o SVG é `aria-hidden`.

### Cores do símbolo

- Sobre nav escura: traço claro (herda `currentColor` do brand row)  
- Sobre fundo claro (`SignupBrand` on-light): navy / foreground  
- Sobre fundo escuro (`is-on-dark`): claro  

Não recolorir com primary azul saturado em áreas grandes do símbolo — o azul fica para CTAs e o pin do app icon.

## Wordmark SVG (`logo-mark.svg`)

```
[ SIG ][ APP ]
  azul   pílula navy + texto branco
```

| Elemento | Cor |
|---|---|
| Texto SIG | `#2E6BFF` (focus/brand blue) |
| Fundo APP | `#0B1E39` (ink/navy) |
| Texto APP | branco |
| Letter-spacing SIG | apertado (−2.5 no SVG) |
| Letter-spacing APP | +1.5 |

**Uso:** Open Graph, exports, materiais onde o SVG completo é necessário.  
**Não** usar o SVG de logo com Inter hardcoded se houver wordmark em Space Grotesk disponível no layout — a nav já tipografa com as fontes do sistema.

## App icon (`icon.svg`)

- Fundo arredondado navy `#0B1E39`  
- Letras S e G brancas  
- Pino/gota central em `#2E6BFF` com núcleo navy  

Tamanhos típicos: 64 base; gerar 180/192/512 conforme plataforma.

## Clear space e tamanho mínimo

| Contexto | Guia |
|---|---|
| Clear space | ≥ altura do “S” do wordmark em todos os lados |
| Mínimo digital (wordmark full) | ~120px de largura |
| Mínimo símbolo sozinho | 24px (touch targets ≥ 44px com hit area) |
| Favicon | usar icon mono/app icon, não wordmark completo |

## Fundos permitidos

| Fundo | Wordmark / símbolo |
|---|---|
| Paper `#F7F9FD` / branco | Navy + azul conforme asset |
| Navy `#0B1E39` | Versão clara / outline branco |
| Foto escura (hero) | Símbolo + wordmark claros (nav overlay) |
| Primary azul full-bleed | Evitar — contraste e “logo em botão” |

## Proibido

- Distorcer proporção ou rotacionar o símbolo  
- Adicionar sombra drop genérica ou glow neon  
- Recriar “SIGAPP” em fonte display diferente do sistema sem brief  
- Usar `landing-logo-mark.svg` (verde-tinta) junto com a paleta navy atual sem unificar  
- Colocar logo sobre mapa/foto sem scrim de contraste  
- Animar o logo de forma lúdica (bounce, spin)  

## Coexistência texto + símbolo

Padrão do site:

```
[◆ símbolo]  SIGAPP
             Inteligência imobiliária   ← oculto em xs no nav
```

Footer statement pode usar só wordmark textual + frase de marca (“Decisões que ganham território”).

## Arquivos

```
public/
  logo-mark.svg           # wordmark SIG + APP
  landing-logo-mark.svg   # variante legada
  icon.svg                # app icon
  apple-touch-icon.svg
  brand/                  # reservado para exports oficiais (PDF/SVG limpos)
```

## Próximos exports recomendados (backlog)

Colocar em `public/brand/` quando produzidos:

- `sigapp-symbol.svg` (só o hexágono, 1 cor)  
- `sigapp-wordmark.svg` (Space Grotesk outline)  
- `sigapp-lockup-h.svg` / `sigapp-lockup-v.svg`  
- Versões mono preto / mono branco  
- Guia de área de proteção em PNG de referência  
