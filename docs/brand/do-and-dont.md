# Faça e não faça

Checklist rápido para conteúdo, design e código alinhados à marca SIGAPP.

## Identidade

| ✓ Faça | ✗ Não faça |
|---|---|
| Use **SIGAPP** em caixa alta no nome de produto | Sigapp / SigApp / “o app de sig” |
| Fale de **dossiê, terreno, comitê, perímetro** | Jargão startup vazio (“synergy”, “disrupt”) |
| Afirme domínio BR (CUB, INCC, permuta) quando couber | IA genérica sem ofício |
| Declare honestamente estágio (piloto, avaliação guiada) | Inventar logos e contagem de clientes |
| Prometa **contexto na mesma linha de decisão** | “Digitalizar a planilha” como visão |

## Voz

| ✓ Faça | ✗ Não faça |
|---|---|
| Títulos em 1–2 linhas assertivas | Parágrafos de hero com 5 claims |
| CTA = verbo + objeto | “Clique aqui” / “Saiba mais” |
| Prova operacional (parâmetros, etapas) | Vanity metrics sem base |
| Copy em `lib/landing-data.ts` | Strings hardcoded em componentes |
| Secundário tipográfico mais leve | Dois botões filled competindo |

## Cor

| ✓ Faça | ✗ Não faça |
|---|---|
| Marketing com `--landing-ink` / `paper` / `signal` | Contar a marca como “navy + azul SaaS” |
| Sinal lime pontual | Flood de `bg-primary` azul em seções editoriais |
| Data colors só para status | Verde/vermelho decorativos |
| shadcn primary só em UI kit / botões | Purple gradient / neon template |
| Reusar tokens vivos | Recriar `sidebar`/`chart`/`popover` sem componente |

## Tipografia

| ✓ Faça | ✗ Não faça |
|---|---|
| Space Grotesk nos displays | 4ª família “porque ficou bonito” |
| IBM Plex no corpo | Mono em parágrafos longos |
| Geist Mono em coords/métricas/eyebrows | All-caps em texto corrido |
| Tracking tight no display grande | Itálico em H1–H6 |
| `.section-display` / escala do design.md | Tamanhos arbitrários por seção |

## Logo

| ✓ Faça | ✗ Não faça |
|---|---|
| Clear space e contraste | Logo em foto sem scrim |
| Símbolo da nav como marca UI | Stretch / rotate / glow neon |
| Icon SVG para favicon | Wordmark completo em 16×16 |
| Novos assets em tinta cartográfica (`landing-ink` / papel / sinal) | Wordmark azul SaaS como “a marca” |

## Layout e UI

| ✓ Faça | ✗ Não faça |
|---|---|
| Server Component por padrão | `"use client"` por preguiça |
| `.container-landing` e ritmo de section | Max-width inventado |
| `.card-bezel` / eyebrow / data-mono | Cards genéricos sem linguagem de marca |
| Motion reveal + reduced-motion | Framer-motion / parallax pesado |
| shadcn + utilities curtas | Inline styles e class strings monstro |
| Analytics via `data-analytics-event` | Tracker ad-hoc por botão |

## Imagery e mocks

| ✓ Faça | ✗ Não faça |
|---|---|
| Foto de matéria (planta, mesa, mapa) | Stock de sorriso corporativo |
| Mocks com números de domínio (TIR, VGV) | UI fake de CRM genérico |
| Alt text territorial | Imagens sem alt em conteúdo |
| Grain sutil em dark | Noise forte que prejudica leitura |

## Conversão

| ✓ Faça | ✗ Não faça |
|---|---|
| Demo com “terreno real” | Tour genérico de telas |
| Trust: sem fidelidade, exportável, PT-BR | Dark patterns de trial |
| Form status silencioso e claro | Confetti / toasts de festa |
| Workbench limpo em `/cadastro` e `/demonstracao` | Marquee e bento de marketing na conversão |

## Antes de publicar

1. [ ] Texto revisado com `voice-and-tone.md`  
2. [ ] Tokens de cor/tipo do sistema  
3. [ ] Logo/símbolo com contraste  
4. [ ] CTA instrumentado e em `LINKS`  
5. [ ] `typecheck` + `lint`  
6. [ ] Visual mobile-first nos breakpoints Tailwind v4  
7. [ ] A11y: foco, labels, teclado  

## Referências cruzadas

- Identidade → [identity.md](./identity.md)  
- Voz → [voice-and-tone.md](./voice-and-tone.md)  
- Cor → [color.md](./color.md)  
- Tipo → [typography.md](./typography.md)  
- Logo → [logo.md](./logo.md)  
- Visual → [visual-system.md](./visual-system.md)  
- Design system de engenharia → `/design.md`  
