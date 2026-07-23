# Voz e tom

## Voz (constante)

A voz do SIGAPP é **operacional, precisa e territorial**.

Escreve como quem já esteve em comitê com número errado na mesa — e quer evitar isso.

| Atributo | Sim | Não |
|---|---|---|
| Clareza | “Um terreno. Uma rota inteira de decisão.” | “Solução end-to-end disruptiva” |
| Domínio | CUB, INCC, permuta, TIR, VPL, dossiê | “AI-powered insights” sem ofício |
| Honestidade | “Programa piloto · relatos anonimizados” | “+10.000 clientes confiam” (sem base) |
| Ação | Verbo + objeto | “Saiba mais” genérico |
| Densidade | Frases curtas, dois eixos no título | Parágrafos marketing inchados |

## Tom (varia por contexto)

| Contexto | Tom | Exemplo |
|---|---|---|
| **Hero / manifesto** | Assertivo, editorial | “Do terreno à decisão. Sem pontos cegos.” |
| **Problema** | Diagnóstico seco | “Sua operação cresceu. A decisão ficou fragmentada.” |
| **Produto / features** | Concreto, resultado na mesma frase | “Feche o cenário de viabilidade… pronto para a mesa do comitê.” |
| **Pricing** | Capacidade, não “pacotes” | “Escolha o perímetro. O contexto continua inteiro.” |
| **FAQ / legal** | Direto, sem metáfora forçada | Respostas objetivas, termos claros |
| **Sobre** | Tese + ofício | “Não queremos digitalizar o Excel. Queremos reorganizar o ofício.” |
| **Erro / vazio** | Calmo, útil | Planos indisponíveis → oferecer conversa, não culpa |

## Padrões de copy da landing

### Estrutura de seção

1. **Eyebrow** (mono, uppercase, com risca) — rótulo de domínio  
2. **Título em 1–2 linhas** — afirmação + tensão ou consequência  
3. **Descrição** — uma frase que amarra benefício operacional  
4. **CTA** — verbo + objeto; secundário tipográfico  

### Eyebrows em uso (vocabulário de marca)

- Sistema operacional da incorporação  
- Inteligência operacional / imobiliária  
- O custo da fragmentação  
- Da entrada ao registro  
- Prova operacional  
- Decisão lado a lado  
- Do mapa à decisão  
- Notas de campo  
- Planos e capacidade  

### Vocabulário preferido

| Preferir | Evitar / substituir |
|---|---|
| Dossiê | “workspace genérico” |
| Terreno / oportunidade | “deal” / “lead” (salvo se o público usar) |
| Perímetro (planos) | “tier” / “SKU” |
| Comitê / parecer | “approval flow” solto |
| Cenário | “simulation magic” |
| Trilha / auditoria | “compliance theater” |
| Viabilidade | “feasibility suite” |
| Avaliação guiada | “free trial forever” sem contexto |
| Radar / carteira | “pipeline CRM” genérico |

### Metáforas permitidas (controladas)

- Mapa, coordenadas, estágio, rota, perímetro, mesa, dossiê, radar  
- **Evitar:** foguetes, unicórnios, “superpoderes”, gamificação infantil  

## CTAs

Padrão: **verbo + objeto**. Primário com peso visual; secundário tipográfico.

| Uso | Copy canônica |
|---|---|
| Hero primário | Ver o SIGAPP em ação |
| Hero secundário | Explorar a jornada |
| Demo | Solicitar demonstração / Agendar demonstração |
| Vendas | Falar com vendas / Falar com a equipe |
| Pricing (Pro etc.) | Conforme plano em `landing-data` |
| Sticky mobile | Solicitar demonstração |
| Comparativo | Construir o caso de negócio |
| Nav login | Entrar |

### Regras de CTA

- Primário: fill `primary`, preferencialmente `rounded-full` em landing  
- Secundário: nunca competir em peso com o primário (outline / link tipográfico)  
- Instrumentar com `data-analytics-event` (ver `lib/analytics.ts`)  
- Destinos centralizados em `LINKS` (`lib/landing-data.ts`)

## Microcopy de UI de marca

| Elemento | Padrão |
|---|---|
| Índices editoriais | `01 / Tese`, `03 / 05`, `04 etapas · 01 dossiê` |
| Coordenadas | `23°31′57″S · 46°47′30″W` |
| Status de produto | Pronto para comitê · Validada · Em análise |
| Métricas demo | TIR 18,4% · VGV R$ 28,4M · payback em meses |
| Labels de domínio | Motor DRE · Radar territorial · Mesa de inteligência |

## SEO e mensagens curtas

| Campo | Texto |
|---|---|
| Title default | SIGAPP — Decisões que ganham território |
| Template | `%s · SIGAPP` |
| Description | Dossiê de terreno com viabilidade, DRE, TIR, comitê e legalização para incorporadoras brasileiras — sem planilha paralela. |
| OG alt (imagem) | SIGAPP — Inteligência para incorporar |

## O que a voz **não** faz

- Inventar número de clientes, logos de clientes ou “líder de mercado”  
- Prometer IA mágica sem domínio de incorporação  
- Usar inglês desnecessário quando existe termo de ofício em PT  
- Tom de “hype SaaS” (scale, crush, 10x, ninja)  
- Soften excessivo (“talvez”, “meio que”, “basicamente”) em claims de produto  

## Checklist de revisão de texto

- [ ] Afirmação verificável ou claramente de produto (não de mercado inventado)?  
- [ ] Verbo de ação no CTA?  
- [ ] Domínio BR presente quando o tema é viabilidade?  
- [ ] Título ≤ 2 linhas conceituais?  
- [ ] Copy centralizada em `lib/landing-data.ts` (nunca hardcoded em componente)?  
