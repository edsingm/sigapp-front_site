# SIGAPP — Brand Brief para Geração de Imagens

Use este documento como system prompt / referência de estilo para qualquer IA de imagem (Midjourney, Flux, Imagen, Firefly, etc.).

**Fontes de verdade no código:** `app/globals.css`, `tokens.css`, `lib/landing-data.ts`, `docs/brand/*`.

---

## 1. O que é o SIGAPP

**SIGAPP** (sempre em caixa alta) é uma plataforma SaaS B2B de **viabilidade e gestão territorial** para o mercado imobiliário brasileiro.

É o **sistema operacional da incorporação**: um **dossiê único** da oportunidade imobiliária — da prospecção do terreno até a legalização — com:

- viabilidade financeira (DRE, TIR, VPL, ROI, Payback)
- comitê de aprovação com trilha auditável
- negociação e legalização no mesmo contexto

**Não é:** Excel no navegador, ERP genérico, CRM genérico, chatbot sem ofício, dashboard “bonito” sem número discutível.

**Promessa de marca:** *Decisões que ganham território.*  
**Hero:** *Do terreno à decisão. Sem pontos cegos.*  
**Assinatura:** *Do terreno ao registro · Brasil*

**Descrição curta:**  
Dossiê de terreno com viabilidade, DRE, TIR, comitê e legalização para incorporadoras brasileiras — sem planilha paralela.

---

## 2. Para quem é

**Audiência principal:** incorporadoras, loteadoras e construtoras no Brasil.

| Persona | O que a imagem deve evocar |
|---|---|
| **Direção / sócio** | Decisão com risco legível; mesa de comitê; território e capital |
| **Incorporação / prospecção** | Carteira de terrenos, mapa, estágio da oportunidade |
| **Viabilidade / estudos** | Plantas, DRE, cenários, parâmetros técnicos |
| **Jurídico / legalização** | Documentos, parecer, continuidade do dossiê |

**Ambiente cultural:** escritório de incorporação brasileiro, matéria real (planta, mapa cadastral, documentos), não “startup de Silicon Valley”.

---

## 3. Personalidade visual da marca

| Traço | Como deve parecer na imagem |
|---|---|
| **Preciso** | Números, grades, coordenadas, enquadramento limpo |
| **Austero** | Poucas cores, muito espaço negativo, sem confete visual |
| **Territorial / cartográfico** | Mapas, parcelas, pins, rotas, dossiê, mesa de análise |
| **Técnico editorial** | Como um parecer bem impresso, não como anúncio hype |
| **Honesto** | Realista, documental; sem glamour falso nem “enterprise fake” |

**Filosofia visual (nome interno):** *Cartografia Decisiva* / *Survey Silence*  
Espaço vazio = território medido. Formas = parcelas e dobras de mapa. Cor de destaque = sinal raro, nunca enxurrada.

**Gênero:** modern-minimal B2B + cartografia austera.  
**Tom:** técnico, silencioso, autoridade quieta — “mede, marca e segura”, não grita.

---

## 4. Paleta de cores (runtime atual)

Espaço canônico: **OKLCH**. Hex aproximados para IAs que pedem hex.  
Runtime: `app/globals.css` e `tokens.css` — hue de marca `264.376`.

### Cores de marca (eixo hue ≈ 264° — azul-índigo violeta)

| Papel | Hex ≈ | OKLCH | Uso na imagem |
|---|---|---|---|
| **Primary / accent** | `#1447E6` | `oklch(0.488 0.243 264.376)` | Acento de ação: pin, botão, rota, status “ativo” — **pontual (≤ ~5% da cena)** |
| **Accent strong** | `#0931B6` | `oklch(0.4 0.21 264.376)` | Ênfase mais densa sobre fundo claro |
| **Accent soft** | `#DEECFF` | `oklch(0.94 0.04 264.376)` | Superfícies leves, highlight suave |
| **Brand ink (tinta)** | `#050F2C` | `oklch(0.18 0.06 264.376)` | Massa escura, hero dark, tipografia densa, gravidade |
| **Text** | `#0F1A32` | `oklch(0.22 0.05 264.376)` | Texto principal / silhuetas escuras |
| **Text soft** | `#434D61` | `oklch(0.42 0.035 264.376)` | Apoio, labels secundários |
| **Canvas / paper** | `#F7FAFF` | `oklch(0.985 0.008 264.376)` | Fundo claro frio (nunca branco puro 100%) |
| **Surface** | `#F4F8FF` | `oklch(0.978 0.01 264.376)` | Planos médios claros |
| **Surface soft** | `#E8EFFC` | `oklch(0.95 0.02 264.376)` | Cards, painéis leves |
| **On brand (sobre escuro)** | `#F2F5FC` | `oklch(0.97 0.01 264.376)` | Texto/ícones claros em painel dark |

### Status de dados (só com significado, nunca decoração)

| Papel | Hex ≈ | Significado |
|---|---|---|
| **Success / viável** | `#1F8A5B` | OK, aprovado, viável |
| **Warning** | `#B87D11` | Atenção, prazo, pendência |
| **Danger / risco** | `#C0392B` | Risco, erro, bloqueio |

### Dark mode (painéis de comando)

| Papel | Hex ≈ |
|---|---|
| Dark canvas | `#040919` |
| Dark surface | `#081021` |
| Dark text | `#EEF2FA` |

### Proporção de cor na imagem

1. **85–90%** papel frio + tinta densa (neutros azuis)
2. **~5%** primary azul-índigo (sinal de decisão)
3. **Opcional e mínimo** verde/âmbar/vermelho só se a cena for “status de dado”
4. **Proibido:** purple gradient neon, ciano cyberpunk, rosa SaaS, flood de azul em todo o frame, verde-lima como cor dominante (a menos que seja um pin pontual de sinal em kit legado)

---

## 5. Tipografia (se a imagem tiver texto)

| Papel | Família | Uso |
|---|---|---|
| **Display** | Space Grotesk (600–700) | Títulos curtos, statements |
| **Body** | IBM Plex Sans | Corpo, UI |
| **Mono / dados** | Geist Mono | Coordenadas, métricas, eyebrows |

**Regras de texto em imagem:**

- Títulos curtos (1–2 linhas), tracking apertado
- Eyebrow em mono, uppercase, letter-spacing largo (ex.: `SISTEMA OPERACIONAL DA INCORPORAÇÃO`)
- Sem itálico em headings
- Preferir poucas palavras; hierarquia espacial > bloco de parágrafo
- Wordmark: **SIGAPP** em caixa alta

**Frases âncora úteis em mockups:**

- Decisões que ganham território  
- Do terreno à decisão. Sem pontos cegos.  
- Do terreno ao registro · Brasil  
- Radar de oportunidade  
- Pronto para comitê  
- TIR 18,4% · VGV R$ 28,4M · 12.480 m²  

---

## 6. Símbolo e logo (descrição para IA)

**Não inventar um logo novo.** Se precisar de marca, descrever assim:

- **Símbolo:** hexágono/parcela em outline (lote no mapa), linhas internas sugerindo dobra de mapa/dossiê, círculo central (ponto de decisão)
- **Wordmark:** `SIGAPP` limpo, geométrico, sem glow
- **Product label opcional:** “Tecnologia imobiliária” ou “Inteligência imobiliária”
- Clear space generoso; sem distorção, rotação, sombra neon ou bounce

Assets de referência: `public/logo-mark.svg`, `public/icon.svg`, `public/landing-logo-mark.svg`.

---

## 7. Features do produto (o que a imagem pode “mostrar” conceitualmente)

### Pipeline (5 etapas)

1. **Prospecção / captação** — terreno, mapa, carteira  
2. **Viabilidade** — DRE, TIR, VPL, cenários  
3. **Comitê** — parecer, mesa, aprovação  
4. **Negociação** — proposta, pipeline comercial  
5. **Legalização** — documentos, registro  

### Capacidades principais

| Feature | Visualização sugerida |
|---|---|
| **Motor de viabilidade** | DRE com CUB, impostos, permuta; KPIs TIR/ROI/VPL/Payback; cenários lado a lado |
| **SIG_IA** (assistente de domínio) | Consulta contextual sobre o dossiê — **não** robô genérico / bolhas de chat neon |
| **Pipeline operacional** | Rota do terreno ao registro, status, alertas, responsáveis |
| **Radar territorial / mapa** | Terrenos georreferenciados, pins, concentração regional |
| **Comitê** | Mesa com o mesmo DRE e o mesmo risco para todos |
| **Export PDF/Excel** | Parecer pronto para circular |
| **Isolamento multi-tenant** | Perímetro de dados por empresa, papéis, auditoria |
| **Parâmetros BR** | CUB, INCC, permuta, VGV, ITBI — linguagem de ofício |

### Métricas de prova (não inventar clientes)

- 50+ parâmetros por viabilidade  
- 5 etapas no mesmo pipeline  
- 1 dossiê por oportunidade  
- 7 dias de avaliação guiada  

---

## 8. Motivos e temas de imagem (o que gerar)

### Preferir (sim)

- Vista aérea urbana brasileira com leitura de quarteirões/parcelas  
- Mesa de trabalho com planta, mapa cadastral, documentos, caneta, luz natural  
- Comitê / dossiê aberto (sem faces sorridentes de stock)  
- Mapa impresso com **um** pin de acento  
- Terreno urbano vazio ou “hora azul” como oportunidade antes da obra  
- Textura cartográfica abstrata: parcelas, linhas tracejadas, grades  
- Painéis dark de “comando” com tipografia mono e métricas  
- Composição editorial assimétrica, hairlines, índices `01 /`, `03 / 05`  
- Bezel de card usinado, cantos contidos (radius ~10–16px em UI; pills em CTA)

### Evitar (não)

- Aperto de mão sorridente / stock corporativo  
- Equipe diversa genérica em open office de SaaS  
- Neon cyberpunk, glassmorphism exagerado, 3D glossy genérico  
- UI inventada legível do produto (nunca “screenshot fake”)  
- Logos de clientes inventados  
- Foguetes, unicórnios, confetti, gamificação  
- Purple/pink gradients de template SaaS  
- Texto longo em português mal gerado pela IA (preferir sem texto ou palavras curtas)

---

## 9. Estilo fotográfico / render

| Atributo | Direção |
|---|---|
| **Luz** | Natural / documental / “map lamp”; hora azul suave ok |
| **Material** | Papel, tinta, mesa de madeira ou concreto frio, metal usinado leve |
| **Grain** | Muito sutil em dark (quase imperceptível) |
| **Profundidade** | Realismo editorial ou flat cartográfico — não cartoon |
| **Composição** | Campos grandes quietos + módulos densos; assimetria ancorada |
| **Mood** | Silêncio autoritário, precisão de topógrafo + sofisticação B2B |

---

## 10. Vocabulário visual e de copy para prompts

**Usar:** dossiê, terreno, oportunidade, perímetro, comitê, parecer, radar, carteira, rota, estágio, coordenadas, parcela, mapa cadastral, viabilidade, DRE, TIR, VGV, CUB, INCC, permuta, legalização, trilha auditável.

**Não usar:** disruptivo, synergy, AI-powered magic, 10x, crush, ninja, growth hacking.

---

## 11. Templates de prompt prontos

### A) Hero aéreo (território)

```
Editorial aerial photograph of a Brazilian urban fabric at soft blue hour,
cadastral reading of city blocks and parcels, cool paper-white atmosphere
with deep indigo-ink shadows (#050F2C), a single precise indigo-blue pin
(#1447E6) marking one opportunity plot, austere cartographic minimalism,
no people, no neon, no stock corporate look, photoreal, high detail,
16:9, quiet authority, SIGAPP brand mood "decisions that win territory"
```

### B) Dossiê na mesa

```
Overhead documentary photo of a work desk with cadastral map, architectural
site plan, financial dossier pages, thin hairline rules, cool off-white paper
(#F7FAFF), deep ink navy shadows (#050F2C), one indigo accent tab (#1447E6),
Brazilian real-estate underwriting atmosphere, no smiling stock models,
natural window light, modern-minimal B2B editorial, photoreal 3:2
```

### C) Social 1:1 (mapa + pin)

```
Square brand image: printed cadastral map texture, geometric parcel outlines,
one small indigo map pin as rare signal color (#1447E6), deep teal-navy ink
field, restrained palette, Survey Silence aesthetic, space as surveyed land,
no logos invented, no UI screenshots, clean margins, LinkedIn feed ready
```

### D) Dark command / product mood (sem UI legível)

```
Dark product atmosphere panel, near-black indigo canvas (#040919), subtle
grid and dashed route lines, mono coordinate ticks, sparse metrics as abstract
shapes not readable fake UI, one indigo signal (#1447E6), machined card bezel
feel, austere technical B2B, grain almost none, modern-minimal cartography
```

### E) Key art tipográfico (se a IA suportar texto bem)

```
Museum plate layout, large quiet paper field (#F7FAFF), heavy dark indigo band
(#050F2C) holding the word "SIGAPP", micro mono caption "Do terreno ao registro · Brasil",
hairline cadastral marks, one lime-free indigo signal route terminus,
master-level graphic design, Survey Silence, asymmetric balance, no clutter
```

---

## 12. Checklist rápido antes de gerar

- [ ] Nome **SIGAPP** em caixa alta (se aparecer)
- [ ] Paleta: papel frio + tinta densa + primary índigo pontual
- [ ] Tema: território / dossiê / comitê / viabilidade
- [ ] Público: incorporação BR (não SaaS genérico)
- [ ] Sem stock de sorriso, sem neon, sem UI inventada legível
- [ ] Accent ≤ ~5% da imagem
- [ ] Sensação: austera, precisa, cartográfica

---

## 13. Dados de marca (referência)

| Campo | Valor |
|---|---|
| Nome | SIGAPP |
| Razão social | SIGAPP Tecnologia Imobiliária |
| Tagline | Decisões que ganham território |
| Site | https://sigapp.com.br |
| App | https://app.sigapp.com.br |
| Contato | contato@sigapp.com.br |
| Locale | pt_BR |

---

## Ver também

- [identity.md](./identity.md) — essência e posicionamento  
- [color.md](./color.md) — paleta documentada (revisar se divergir do runtime)  
- [visual-system.md](./visual-system.md) — layout, motion, imagery  
- [voice-and-tone.md](./voice-and-tone.md) — voz e CTAs  
- [marketing/](./marketing/) — assets e kit Survey Silence  
