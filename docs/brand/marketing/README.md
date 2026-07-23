# Marketing assets — SIGAPP

Imagens de marketing alinhadas a **Cartografia Decisiva** (tinta · papel · sinal).

Esta pasta é **brand kit / campanha**. Não é servida pelo Next automaticamente.  
Para o site: copie o arquivo para `public/images/` (ou CDN) e use com `next/image`.

## Paleta destas imagens

| Papel | Na foto |
|---|---|
| **Papel** | Mapas, mesas, fundos claros |
| **Tinta** | Sombras, superfícies escuras, gravidade editorial |
| **Sinal (lime)** | Pino, tab, status pontual — nunca flood de cor |

**Fora de tom:** aperto de mão, sorriso corporativo, purple SaaS, neon, logos inventados, UI falsa legível.

## Catálogo

| Arquivo | Dimensão | Uso sugerido | Alt text sugerido |
|---|---|---|---|
| [`hero-territorio-aereo.jpg`](./hero-territorio-aereo.jpg) | 1280×720 (16:9) | Hero, OG, LinkedIn cover | Vista aérea urbana com leitura de parcelas e rotas |
| [`dossie-mesa-overhead.jpg`](./dossie-mesa-overhead.jpg) | 1248×832 (~3:2) | Matter strip, blog, prova editorial | Mesa com mapa cadastral, plantas e dossiê |
| [`comite-mesa.jpg`](./comite-mesa.jpg) | 1280×720 (16:9) | Seção comitê, demo, e-mail | Mesa de comitê com dossiê e pareceres |
| [`terreno-oportunidade.jpg`](./terreno-oportunidade.jpg) | 1248×832 (~3:2) | Problem/opportunity, sobre | Lote urbano à hora azul — oportunidade antes da obra |
| [`textura-cartografica.jpg`](./textura-cartografica.jpg) | 1280×720 (16:9) | Fundo de seção, header blog, slides | Textura abstrata de parcelas e rotas |
| [`social-mapa-pin.jpg`](./social-mapa-pin.jpg) | 1024×1024 (1:1) | Feed LinkedIn / Instagram, ads | Mapa impresso com pino de sinal |
| [`story-dossie-vertical.jpg`](./story-dossie-vertical.jpg) | 720×1280 (9:16) | Stories, Reels, ads mobile | Dossiê/mapa em composição vertical |
| [`referencia-site-dossie-mesa.jpg`](./referencia-site-dossie-mesa.jpg) | 1248×832 | Já em produção (`public/images/dossie-mesa.jpg`) | Mesa de trabalho com plantas e documentos |

## Pares copy + imagem

| Imagem | Linha de marca |
|---|---|
| `hero-territorio-aereo` | Decisões que ganham território |
| `dossie-mesa-overhead` | O dossiê deixa de ser arquivo. Vira superfície de decisão. |
| `comite-mesa` | O comitê vê o terreno inteiro. No mesmo contexto. |
| `terreno-oportunidade` | Do terreno à decisão. Sem pontos cegos. |
| `social-mapa-pin` | Radar de oportunidade |
| `story-dossie-vertical` | Traga um terreno real. |

## Uso no site

```tsx
import Image from "next/image"

// 1. cp docs/brand/marketing/hero-territorio-aereo.jpg public/images/
// 2. referenciar:

<Image
  src="/images/hero-territorio-aereo.jpg"
  alt="Vista aérea urbana com leitura de parcelas e rotas"
  width={1280}
  height={720}
  sizes="100vw"
  priority // só se for LCP / hero
/>
```

## Direitos

- Geradas para marketing do SIGAPP (kit de marca).  
- Não apresentar como foto de cliente ou case real.  
- Revisar requisitos de direito de imagem antes de ads pagos.

## Backlog

- [ ] Wordmark/símbolo PNG transparente (export de design, não IA)  
- [ ] OG 1200×630 com tipografia real via `opengraph-image.tsx`  
- [ ] Screenshot real do produto (nunca inventar UI com IA)  
- [ ] Variante dark do hero aéreo  

## Canvas kit (Survey Silence)

Sistema gráfico tipográfico + cartográfico em [canvas/](./canvas/):

- Filosofia: [canvas/DESIGN-PHILOSOPHY.md](./canvas/DESIGN-PHILOSOPHY.md)
- Peças PNG + PDF: key art, social, story, e-mail, ads, banner, OG, plate museu
- Pacote: [canvas/sigapp-survey-silence-kit.pdf](./canvas/sigapp-survey-silence-kit.pdf)

## Ver também

- [../color.md](../color.md) · [../voice-and-tone.md](../voice-and-tone.md) · [../visual-system.md](../visual-system.md) · [../identity.md](../identity.md)
