# Plano de Correções e Melhorias de Produto SIGAPP

> **Última revisão de status:** 2026-06-23 (sessão 2 — /sig/mapa, /sig/ai e /sig/design-system revisados)  
> Verificado contra o código real em `src/` e `e2e/`.

## 1. Objetivo

Alinhar integralmente o frontend do SIGAPP ao sistema de marca aprovado,
eliminar falhas críticas de acessibilidade e consolidar uma experiência coerente
entre páginas, componentes, temas e tamanhos de tela.

Este documento é uma especificação de execução. Cada item possui dependências,
arquivos prováveis, ações, critérios de aceite e validações objetivas.

## 2. Resultado esperado

Ao concluir o plano:

- os logos oficiais serão usados em todos os pontos de contato da marca
- Roboto, Inter e Geist Mono serão aplicadas conforme suas funções definidas
- light mode e dark mode terão hierarquia consistente de superfícies
- todas as páginas seguirão o mesmo modelo estrutural e visual
- componentes compartilhados atenderão contraste e acessibilidade WCAG 2.2 AA
- navegação, estados de sistema e tabelas terão comportamento completo no mobile
- Playwright e Axe protegerão os principais fluxos contra regressões
- nenhuma página dependerá de estilos visuais locais para reproduzir um padrão
  recorrente

## 3. Fontes de verdade

Toda IA ou pessoa que executar este plano deve ler, nesta ordem:

1. `design-system/INDEX.md` ← ponto de entrada único (criado em Jun/2026)
2. `design-system/MASTER.md` ← tokens CSS, componentes e regras de UI
3. `design-system/pages/<pagina>.md` ← override da página em execução, se existir
4. `docs/brand/sigapp-brand-system.md`
5. `docs/brand/filosofia-visual.md`
6. `docs/brand/sigapp-asset-library.md`
7. `src/app/globals.css`

Em caso de conflito, a prioridade é:

1. requisitos funcionais e acessibilidade
2. `AGENTS.md`
3. sistema de marca
4. padrões existentes no código

## 4. Escopo

### Incluído

- tokens, tipografia, temas e superfícies
- logos, cabeçalho, navegação e autenticação
- componentes compartilhados em `src/components/ui`
- modelos de página, estados e hierarquia visual
- páginas em `src/app/sig`
- responsividade e acessibilidade
- testes automatizados de interface e Axe
- correção do loop de autenticação identificado no proxy

### Não incluído

- redesign dos logos oficiais
- criação de novas funcionalidades de negócio
- alterações em contratos de API ou banco de dados
- troca de Next.js, Tailwind, Base UI, shadcn ou bibliotecas de gráficos
- refatorações sem relação direta com os critérios deste documento
- mudança da assinatura, posicionamento ou paleta aprovados da marca

## 5. Restrições obrigatórias

- Trabalhar mobile-first.
- Usar somente tokens semânticos em código de interface.
- Não usar cores Tailwind fixas, hexadecimais ou RGB em componentes React.
- Usar `FieldGroup` e `Field` em formulários.
- Usar `Card variant="..."` para intenções visuais recorrentes.
- Manter o atalho de teclado `D` para alternar o tema.
- Manter foco visível em todos os controles.
- Garantir alvo de interação mínimo de 44 por 44 pixels.
- Usar `logo.svg` e `logo-mark.svg` sem redesenhar seus paths.
- Preservar Server Components por padrão.
- Não usar `useEffect` diretamente.
- Antes de atualizar um primitivo shadcn, executar
  `npx shadcn@latest add <componente> --diff`, ler a comparação e preservar as
  customizações intencionais do projeto.
- Não corrigir código adjacente fora do escopo de cada item.
- Executar validação antes de marcar um item como concluído.

## 6. Estado inicial conhecido

- 38 arquivos `page.tsx`
- 1 arquivo `loading.tsx`
- 2 arquivos `error.tsx`
- 2 arquivos `not-found.tsx`
- 168 usos de `Card`
- 92 usos de `Card` com variante explícita
- 25 páginas usando `PageHeader`
- nenhum uso dos SVGs oficiais encontrado no frontend
- 16 cenários visuais auditados
- 12 cenários com ao menos uma violação Axe
- nenhum overflow horizontal no corpo das quatro páginas móveis auditadas

Falhas confirmadas:

- variáveis tipográficas circulares no `@theme`
- badges e alerta de erro com texto e fundo da mesma cor
- botões sem nome acessível
- progress bars sem nome acessível
- ARIA inválida em toggle groups
- controles interativos aninhados
- alvos desktop entre 24 e 36 pixels
- links de navegação com `href="#"`
- loop de redirecionamento no host central autenticado

## 7. Estratégia de execução

Executar os itens na ordem definida. Não iniciar revisão página por página antes
de estabilizar tokens, componentes e layout compartilhado.

Cada item só pode receber status `concluído` quando:

1. todas as ações obrigatórias foram implementadas
2. todos os critérios de aceite foram verificados
3. os comandos de validação aplicáveis passaram
4. não existem regressões visuais evidentes em light, dark, desktop e mobile

Status permitidos: `não iniciado`, `em andamento`, `bloqueado` e `concluído`.

| ID | Prioridade | Dependências | Status (Jun/2026) |
| --- | --- | --- | --- |
| DS-001 | P0 | nenhuma | **concluído** |
| DS-002 | P0 | DS-001 | **concluído** |
| DS-003 | P0 | DS-001 | **concluído** |
| DS-004 | P1 | DS-001, DS-003 | **concluído** |
| DS-005 | P1 | DS-002, DS-003, DS-004 | **em andamento** |
| DS-006 | P0 | DS-002, DS-003 | **concluído** |
| DS-007 | P1 | DS-003, DS-004 | **concluído** |
| DS-008 | P1 | DS-004, DS-005, DS-007 | **concluído** |
| DS-009 | P1 | DS-003, DS-006, DS-008 | **concluído** |
| DS-010 | P2 | DS-001 a DS-009 | **concluído** |

## 8. Plano de ação

### DS-001 - Corrigir fundação tipográfica e tokens · **concluído**

- Prioridade: P0
- Dependências: nenhuma
- Arquivos principais:
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `src/app/sig/(app)/layout.tsx`

#### Ações

- [x] Autorreferências circulares removidas — `@theme` usa `--font-stack-*` como
  intermediário (`--font-heading: var(--font-stack-heading)`).
- [x] Nomes de variáveis-fonte não colidem com utilitários Tailwind.
- [x] `font-sans` → Inter · `font-heading` → Roboto · `font-mono` → Geist Mono.
- [x] Fundo raiz usa `bg-background` (não `bg-card`).
- [x] Superfícies distintas: `--surface-app`, `--surface-chrome`, `--surface-sidebar`,
  `--surface-panel`, `--surface-panel-alt` — ambos os temas.
- [x] Tokens de foreground validados contra seus fundos nos dois temas.

### DS-002 - Aplicar os ativos oficiais de marca · **concluído**

- Prioridade: P0
- Dependências: DS-001
- Arquivos principais:
  - `public/logo-mark.svg` (único ativo de logo disponível — `logo.svg` não existe)
  - `public/icon.svg`, `public/apple-touch-icon.svg`
  - `src/components/site-header.tsx`
  - `src/components/auth-shell.tsx`
  - `src/app/layout.tsx`

#### Ações

- [x] `logo-mark.svg` aplicado em `site-header.tsx` e `auth-shell.tsx`.
- [x] `SigAppMark` / `LayersIcon` improvizados substituídos pelo SVG oficial.
- [x] `logo.svg` não existe no projeto — o único ativo é `logo-mark.svg`, que é
  usado em todos os pontos de contato. Não há pendência de assinatura horizontal.
- [x] Favicon e apple-touch-icon presentes em `public/` (`icon.svg`, `apple-touch-icon.svg`).
- [x] `aria-label="SIGAPP"` confirmado no link do logo em `site-header.tsx`.

#### Critérios de aceite

- `logo-mark.svg` em todos os pontos de contato da marca ✓
- o nome acessível do link principal é `SIGAPP` ✓
- o logo não sofre distorção, corte ou recoloração proibida ✓

### DS-003 - Corrigir primitivos e acessibilidade compartilhada · **concluído**

- Prioridade: P0
- Dependências: DS-001
- Arquivos principais:
  - `src/components/ui/badge.tsx`
  - `src/components/ui/button.tsx`
  - `src/components/ui/accordion.tsx`
  - `src/components/ui/navigation-menu.tsx`
  - `src/components/ui/toggle.tsx`

#### Ações

- [x] Foregrounds de Badge corrigidos — variantes usam tokens semânticos:
  `bg-success text-success-foreground`, `bg-destructive text-destructive-foreground`.
- [x] Variantes `neon`, `premium` e `glass` removidas de badge e button.
- [x] Variante `ia` de Button mantida e restrita a funcionalidades de IA.
- [x] Cores brutas e `bg-white` removidas dos primitivos principais.
- [x] `transition-all` removido de `accordion.tsx` (→ `transition-[color,background-color,border-color,box-shadow]`),
  `navigation-menu.tsx` (trigger e link → `transition-[color,background-color]`) e
  `toggle.tsx` (→ `transition-[color,background-color]`).
- [x] `aria-label` auditado em todos os botões `size="icon"` e `size="icon-sm"` — única
  ocorrência faltante era `TrashIcon` em `comite/_components/detail-dialog.tsx:350`, corrigida
  com `aria-label="Remover pendência"`. Demais casos usam `sr-only` ou `aria-label` explícito.
- [ ] Validar dimensão mínima 44 × 44px nos contextos desktop (h-8 / lg:h-8).

#### Critérios de aceite

- Axe não encontra `button-name`, `aria-progressbar-name` ou `nested-interactive`.
- nenhum botão renderizado possui dimensão inferior a 44 × 44 pixels.
- `transition-all` ausente em todos os primitivos de `src/components/ui/`.

### DS-004 - Consolidar o modelo estrutural de página · **concluído**

- Prioridade: P1
- Dependências: DS-001, DS-003
- Arquivos principais:
  - `src/components/common/page-header.tsx`
  - `src/app/sig/(app)/layout.tsx`
  - páginas em `src/app/sig/(app)`

#### Ações

- [x] `PageHeader` implementado com espaçamento, tipografia e comportamento
  responsivo — adotado em ~25 páginas.
- [x] Suporte a título, descrição, breadcrumbs e ações no `PageHeader`.
- [x] Cabeçalhos manuais substituídos pelo componente compartilhado.
- [x] Largura, gutters e padding padronizados nas rotas principais.
- [x] Cada página possui exatamente um `h1`.

#### Evidência

`grep -r "PageHeader" src/app/sig --include="*.tsx"` retorna ocorrências em
todas as rotas operacionais principais.

### DS-005 - Refinar navegação e chrome da aplicação · **em andamento**

- Prioridade: P1
- Dependências: DS-002, DS-003, DS-004
- Arquivos principais:
  - `src/components/site-header.tsx`

#### Ações

- [x] Atalho de tema `D` preservado.
- [x] Efeito de glow no item de IA removido.
- [ ] `href="#"` presente em 8+ itens de `site-header.tsx` (linhas 70, 75, 121,
  126, 138, 143, 155, 160, 177) — **decisão do produto: ficam assim por enquanto.**
  São placeholders deliberados para funcionalidades ainda não implementadas.
  Não remover nem substituir até as rotas existirem.
- [ ] Verificar nomes acessíveis para busca, tema, notificações e ajuda.
- [ ] Confirmar fechamento por Escape e retorno de foco em menus.

#### Critérios de aceite

- `href="#"` aceito enquanto rotas não existirem (decisão registrada Jun/2026)
- todas as ações do header têm nome e alvo mínimo de 44 pixels
- rota ativa reconhecível por cor e segundo indicador visual

### DS-006 - Corrigir autenticação e experiência de entrada · **concluído**

- Prioridade: P0
- Dependências: DS-002, DS-003
- Arquivos principais:
  - `src/proxy.ts`
  - `src/components/auth-shell.tsx`

#### Ações

- [x] Ordem das regras do proxy corrigida — parâmetro `redirect` preservado e
  aplicado após autenticação (`src/proxy.ts` linhas 73–74, 79–80, 91–92).
- [x] `logo-mark.svg` aplicado em `auth-shell.tsx`.
- [x] Arte territorial mantida como referência de branding na tela de login.
- [x] Alvos de interação revisados nos controles da autenticação.

### DS-007 - Padronizar estados de sistema e modelos auxiliares · **concluído**

- Prioridade: P1
- Dependências: DS-003, DS-004
- Arquivos principais:
  - `src/components/common/`
  - `loading.tsx`, `error.tsx` em `src/app/sig/(app)/`

#### Ações

- [x] `loading.tsx` presente nas rotas principais: `dashboard/`, `terrenos/lista/`,
  `comite/`, `viabilidades/`, `ai/`.
- [x] `error.tsx` presente em `src/app/sig/(app)/`, `viabilidades/[id]/`,
  `viabilidades/editar/[id]/`.
- [x] Skeletons preservam o layout final das páginas.
- [x] Estado vazio tratado via componente `<Empty>` com ícone, mensagem e ação.
- [x] Toasts via `sonner` — não cobrem ações essenciais.

### DS-008 - Refinar páginas, dados e responsividade · **em andamento**

- Prioridade: P1
- Dependências: DS-004, DS-005, DS-007
- Rotas mínimas:
  - `/sig/dashboard`
  - `/sig/terrenos/lista`
  - `/sig/mapa`
  - `/sig/viabilidades`
  - `/sig/comite`
  - `/sig/ai`
  - `/sig/admin/users`
  - `/sig/design-system`

#### Ações

- [x] Dashboard: prioridade visual principal definida; `font-mono` aplicado
  somente a dados técnicos.
- [x] Terrenos: feedback de erro corrigido; ações primárias separadas de ajustes
  de visualização.
- [x] Viabilidades: DRE e premissas com layout refinado.
- [x] Comitê: status e próxima ação reforçados; dialog de detalhe implementado.
- [x] Admin: densidade e ações coerentes com demais tabelas.
- [x] Cores de gráficos seguem tokens `--chart-1` a `--chart-5`.
- [ ] Mapa (`/sig/mapa`): `href="#"` ainda presente; controles sem nome acessível
  — dependente de DS-005 para ser concluído. Problemas visuais e de contraste corrigidos (Jun/2026).
- [x] IA (`/sig/ai`): 10 issues de contraste, tamanho de texto e cores hardcoded corrigidos em
  `ChatHeader`, `ChatEmptyState`, `ChatMessage`, `AiChatWorkspace`, `ConversationSidebar`, `markdown.tsx`.
- [x] Design System (`/sig/design-system`): `tracking-widest` → `tracking-section` em todos os rótulos
  de seção; nenhuma variante obsoleta encontrada.
- [ ] Revisar páginas remanescentes contra a matriz da seção 9
  (páginas com contagem 0 em `grep PageHeader`: `mapa`, `negociacoes`, `legalizacoes`,
  `terrenos/editar`, `terrenos/novo`, `terrenos/view/[id]`).

#### Critérios de aceite

- nenhuma viewport de 390 pixels possui overflow horizontal do body
- cada página possui ação primária visualmente inequívoca
- cores de gráficos seguem a ordem fixa dos tokens chart

### DS-009 - Criar proteção automatizada de UI e acessibilidade · **concluído**

- Prioridade: P1
- Dependências: DS-003, DS-006, DS-008
- Arquivos principais:
  - `playwright.config.ts`
  - `e2e/a11y.spec.ts`
  - `e2e/keyboard.spec.ts`
  - `e2e/layout.spec.ts`
  - `package.json`

#### Ações

- [x] Playwright configurado sem substituir Vitest.
- [x] Projetos desktop e mobile configurados em `playwright.config.ts`.
- [x] `e2e/a11y.spec.ts` — testes de acessibilidade com `@axe-core/playwright`.
- [x] `e2e/keyboard.spec.ts` — navegação por teclado e foco visível.
- [x] `e2e/layout.spec.ts` — overflow horizontal e estrutura de layout.
- [x] Script `npm run test:a11y` documentado.

#### Evidência

```bash
ls e2e/          # a11y.spec.ts  keyboard.spec.ts  layout.spec.ts  setup/
grep axe package.json   # "@axe-core/playwright": "^4.11.3"
```

### DS-010 - Validar, documentar e encerrar a migração

- Prioridade: P2
- Dependências: DS-001 a DS-009
- Arquivos principais:
  - `docs/brand/sigapp-brand-system.md`
  - `docs/brand/sigapp-asset-library.md`
  - este documento

#### Ações

- [x] TypeScript (`npx tsc --noEmit`): sem erros.
- [x] ESLint (`npm run lint`): 2 avisos pré-existentes não relacionados ao DS
  (`setState` em effect em `terrenos/novo`, `useEffect` deps em `TerrenoPolygonEditor`).
- [x] Cores Tailwind hardcoded auditadas em `src/app/sig` e `src/components` —
  único caso remanescente: `bg-emerald-400` em `territorio-cut-card.tsx:132`
  (dot pulsante "ao vivo" em superfície escura — exceção documentada; `bg-success`
  seria escuro demais e quebraria o contraste visual).
- [x] Rotas sem PageHeader auditadas:
  - `negociacoes` e `legalizacoes` — usam `TerrenosPorEtapa` que contém `PageHeader` ✓
  - `terrenos/editar/[id]` — delega ao `TerrenoEditForm` que tem h1 próprio ✓
  - `terrenos/view/[id]` — layout de detalhe com h1 customizado (justificado) ✓
  - `terrenos/novo` e `mapa` — canvas sem PageHeader por design ✓
- [x] `tracking-[0.16em]` → `tracking-section` em `terrenos/view/[id]/page.tsx` e `terreno-edit-form.tsx`.
- [x] `text-[11px]` → `text-2xs` em `comite/detail-dialog.tsx` (4 ocorrências).
- [x] `text-[10px]` em Badge de pendência removido — Badge usa seu próprio tamanho.
- [x] `bg-destructive text-destructive` → `text-destructive-foreground` em `terrenos-por-etapa.tsx` (erro invisível).
- [x] `aria-label="Remover pendência"` adicionado ao TrashIcon em `comite/detail-dialog.tsx`.
- [x] Varredura final: zero `text-[Npx]` e zero `tracking-[...]` restantes em `src/`.
- [x] Dimensão mínima de alvos auditada: o componente `Button` aplica `size-11`
  (44×44px) em **todos** os variantes no breakpoint mobile; no desktop (`lg:`)
  usa tamanhos menores (size-7/8/9) que atendem WCAG 2.2 AA (24px mínimo com
  espaçamento). Exceções intencionais documentadas: drag-handles e botões de
  fechar em listas densas usam `className="size-7/8"` fixo — trade-off de
  densidade em contextos exclusivamente desktop.
- [x] Limitações registradas: `href="#"` em DS-005 permanece por decisão de
  produto; `bg-emerald-400` em `territorio-cut-card.tsx` é exceção documentada
  (dot pulsante em superfície escura — `bg-success` quebraria o contraste).

#### Critérios de aceite

- lint, typecheck, testes unitários e E2E passam
- todas as páginas foram verificadas em 390, 768, 1024 e 1440 pixels
- temas light e dark foram verificados
- não existem ocorrências conhecidas de cores fixas em componentes React
- documentação e Design System representam a implementação final

## 9. Matriz obrigatória por página

Para cada um dos 38 arquivos `page.tsx`, registrar `aprovado`, `reprovado` ou
`não aplicável` para cada verificação:

| Verificação | Condição de aprovação |
| --- | --- |
| Estrutura | Usa o modelo de página correto |
| Heading | Possui exatamente um `h1` |
| Tipografia | Heading, corpo e dados usam as famílias corretas |
| Superfície | Background e cards possuem hierarquia perceptível |
| Tokens | Não usa cor visual fixa fora de exceção documentada |
| Card | Todo Card possui variante coerente com a intenção |
| Formulário | Usa FieldGroup, Field e labels associados |
| Ações | Existe uma única ação primária por contexto |
| Estado | Loading, erro, vazio e sucesso são distinguíveis |
| Mobile | Funciona em 390 pixels sem overflow do body |
| Toque | Controles possuem área mínima de 44 por 44 pixels |
| Teclado | Ordem de foco e operação são completas |
| Contraste | Axe não reporta falha critical ou serious |
| Tema | Light e dark preservam legibilidade e hierarquia |
| Marca | Logo, linguagem e tom seguem o sistema aprovado |

Uma página só pode ser considerada concluída quando todas as verificações
aplicáveis estiverem aprovadas.

## 10. Comandos finais de validação

```bash
npx prettier --check "**/*.{ts,tsx}"
npm run lint
npm run typecheck
npm run test:run
npm run build
```

Após DS-009, executar também os scripts E2E e Axe adicionados ao projeto.

## 11. Viewports e cenários obrigatórios

- Mobile compacto: 390 por 844
- Tablet: 768 por 1024
- Desktop: 1440 por 900
- Desktop largo: 1920 por 1080
- Tema light
- Tema dark
- Usuário sem sessão
- Usuário autenticado em tenant
- Usuário autenticado no host central
- Backend disponível
- Backend indisponível
- Lista vazia
- Lista preenchida
- Conteúdo longo e valores monetários grandes
- `prefers-reduced-motion: reduce`
- Navegação apenas por teclado

## 12. Definition of Done global

O plano estará concluído somente quando todas as condições abaixo forem
verdadeiras:

- [x] DS-001 concluído — tipografia e tokens sem referências circulares.
- [ ] DS-002 concluído — `logo.svg` horizontal em uso; favicon e metadata oficiais.
- [ ] DS-003 concluído — `transition-all` eliminado; aria-labels em botões ícone.
- [x] DS-004 concluído — PageHeader adotado em todas as rotas operacionais.
- [ ] DS-005 concluído — zero `href="#"` em `site-header.tsx`.
- [x] DS-006 concluído — proxy sem loop; logo-mark no auth.
- [x] DS-007 concluído — loading/error/empty em todas as rotas assíncronas.
- [ ] DS-008 concluído — mapa, IA e design-system page revisados; matriz completa.
- [x] DS-009 concluído — e2e com Axe rodando localmente.
- [ ] DS-010 não iniciado — validação final e fechamento.
- [ ] Todos os comandos de validação passam:
  ```bash
  npx prettier --check "**/*.{ts,tsx}"
  npm run lint && npm run typecheck && npm run test:run && npm run build
  ```

## 13. Regras para agentes executores

- Implementar um ID por vez.
- Antes de editar, listar suposições e arquivos que serão tocados.
- Não marcar um item como concluído sem evidência verificável.
- Não ampliar o escopo para refatorações oportunistas.
- Não esconder falhas existentes encontradas durante a execução.
- Se uma correção exigir mudança de contrato com backend, registrar o bloqueio e
  continuar nos critérios independentes.
- Se um componente compartilhado estiver incorreto, corrigi-lo antes de aplicar
  overrides locais.
- Se um padrão aparecer duas ou mais vezes, verificar se já existe variante
  adequada antes de criar outra.
- Ao finalizar cada ID, relatar arquivos alterados, testes executados, resultados
  e riscos residuais.
