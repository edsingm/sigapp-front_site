# Canvas kit — Survey Silence

Filosofia: [DESIGN-PHILOSOPHY.md](./DESIGN-PHILOSOPHY.md)  
Render: `python3 render_kit.py` (Pillow + fonts em `canvas-design/canvas-fonts`)

Movimento visual: **Survey Silence** — tinta · papel · sinal, geometria cadastral, tipografia esparsa.

## Peças

| Arquivo | Tamanho | Canal |
|---|---|---|
| `01-key-art.png` | 1920×1080 | Key art, capa de apresentação, LinkedIn cover largo |
| `02-social-square.png` | 1080×1080 | Feed Instagram / LinkedIn |
| `03-story.png` | 1080×1920 | Stories, Reels, ads mobile |
| `04-email-header.png` | 1200×400 | Cabeçalho de e-mail |
| `05-ad-landscape.png` | 1200×628 | Meta / LinkedIn ads |
| `06-kit-cover.png` | 1080×1350 | Capa de brand kit / Pinterest |
| `07-banner-linkedin.png` | 1584×396 | Banner LinkedIn empresa |
| `08-open-graph.png` | 1200×630 | Open Graph / Twitter card |
| `09-plate-museum.png` | 1080×1080 | Peça “museu” / poster quieto |
| `sigapp-survey-silence-kit.pdf` | multi | Pacote único para envio |

## Uso

- **Redes / ads / e-mail:** export PNG direto; não esticar além do ratio nativo.  
- **Site:** copiar para `public/images/` se for hero/OG estático; OG dinâmico continua em `app/opengraph-image.tsx`.  
- **Tipografia nas peças:** Instrument Sans + IBM Plex Mono (+ Instrument Serif na plate 09).  
- **Copy mínima** integrada ao desenho — não acrescentar parágrafos sobre a arte.

## Relação com o resto da marca

| Fonte | Papel |
|---|---|
| `../` fotos editoriais | Matéria fotográfica |
| `./` canvases | Sistema gráfico Survey Silence |
| `../../color.md` | Tokens tinta / papel / sinal |

## Ética de craft

Cada placa foi tratada como artefato de observação sistemática: grid cadastral, rota tracejada, um sinal lime, labels clínicos. Texto é gesto, não explicação.
