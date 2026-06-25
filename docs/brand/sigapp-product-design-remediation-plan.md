# Plano de Correções e Melhorias de Produto SIGAPP

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

1. `AGENTS.md`
2. `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md`
3. `.agents/skills/shadcn/SKILL.md`
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

| ID | Prioridade | Dependências | Status inicial |
| --- | --- | --- | --- |
| DS-001 | P0 | nenhuma | não iniciado |
| DS-002 | P0 | DS-001 | não iniciado |
| DS-003 | P0 | DS-001 | não iniciado |
| DS-004 | P1 | DS-001, DS-003 | não iniciado |
| DS-005 | P1 | DS-002, DS-003, DS-004 | não iniciado |
| DS-006 | P0 | DS-002, DS-003 | não iniciado |
| DS-007 | P1 | DS-003, DS-004 | não iniciado |
| DS-008 | P1 | DS-004, DS-005, DS-007 | não iniciado |
| DS-009 | P1 | DS-003, DS-006, DS-008 | não iniciado |
| DS-010 | P2 | DS-001 a DS-009 | não iniciado |

## 8. Plano de ação

### DS-001 - Corrigir fundação tipográfica e tokens

- Prioridade: P0
- Dependências: nenhuma
- Arquivos principais:
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `src/app/sig/(app)/layout.tsx`

#### Ações

- [ ] Remover autorreferências como `--font-heading: var(--font-heading)` do
  bloco `@theme`.
- [ ] Criar nomes de variáveis-fonte que não colidam com os utilitários gerados
  pelo Tailwind.
- [ ] Garantir `font-sans` com Inter, `font-heading` com Roboto e `font-mono`
  com Geist Mono.
- [ ] Trocar o fundo raiz da aplicação de `bg-card` para o token de superfície
  da aplicação.
- [ ] Confirmar que cards, chrome, sidebar e página usam superfícies distintas.
- [ ] Validar todos os tokens de foreground contra seus fundos nos dois temas.

#### Critérios de aceite

- `getComputedStyle` de um título `font-heading` contém Roboto.
- `getComputedStyle` do corpo contém Inter.
- um elemento `font-mono` contém Geist Mono.
- página e card possuem cores computadas diferentes em light e dark.
- não existem variáveis CSS circulares.
- o atalho `D` continua funcional.

#### Validação

```bash
npm run typecheck
npm run lint
```

Executar Playwright em `/login`, `/sig/dashboard` e `/sig/design-system` nos
temas light e dark e verificar as fontes computadas.

### DS-002 - Aplicar os ativos oficiais de marca

- Prioridade: P0
- Dependências: DS-001
- Arquivos principais:
  - `public/logo.svg`
  - `public/logo-mark.svg`
  - `src/components/site-header.tsx`
  - `src/components/auth-shell.tsx`
  - `src/app/layout.tsx`

#### Ações

- [ ] Substituir `SigAppMark` e `LayersIcon` usados como marca pelo SVG oficial.
- [ ] Usar `logo-mark.svg` em espaços compactos e `logo.svg` quando houver área
  horizontal suficiente.
- [ ] Aplicar dimensões e área de proteção descritas no sistema de marca.
- [ ] Configurar favicon, ícone e metadata usando os ativos oficiais.
- [ ] Garantir uma alternativa textual acessível sem duplicar o nome no leitor
  de tela.
- [ ] Confirmar legibilidade dos ativos em light e dark sem alterar os paths.

#### Critérios de aceite

- não existe marca improvisada com letra ou ícone Lucide
- header desktop, header mobile e login usam arquivos oficiais
- o nome acessível do link principal é `SIGAPP`
- o logo não sofre distorção, corte ou recoloração proibida

### DS-003 - Corrigir primitivos e acessibilidade compartilhada

- Prioridade: P0
- Dependências: DS-001
- Arquivos principais:
  - `src/components/ui/badge.tsx`
  - `src/components/ui/alert.tsx`
  - `src/components/ui/button.tsx`
  - `src/components/ui/progress.tsx`
  - `src/components/ui/toggle-group.tsx`
  - `src/components/ui/tabs.tsx`
  - `src/components/ui/card.tsx`

#### Ações

- [ ] Corrigir foregrounds das variantes `info`, `success`, `danger` e
  `destructive` de Badge.
- [ ] Definir tratamento de Alert destrutivo com fundo, borda e texto que
  atinjam contraste AA.
- [ ] Garantir 44 por 44 pixels para controles interativos em todos os
  breakpoints.
- [ ] Exigir nome acessível em botões somente com ícone.
- [ ] Associar `ProgressLabel` ou `aria-label` a toda progress bar.
- [ ] Corrigir atributos ARIA emitidos por ToggleGroup conforme a API Base UI.
- [ ] Remover controles interativos aninhados.
- [ ] Remover `bg-white`, cores brutas e foreground igual ao background.
- [ ] Trocar `transition-all` por propriedades específicas.
- [ ] Remover variantes `neon`, `premium` e `glass` que não pertencem à marca.
- [ ] Reduzir variantes IA às intenções aprovadas no design system.

#### Critérios de aceite

- Axe não encontra `button-name`, `aria-progressbar-name`,
  `aria-allowed-attr` ou `nested-interactive` nas rotas auditadas.
- todas as variantes do Design System são visualmente legíveis nos dois temas.
- nenhum botão renderizado possui dimensão inferior a 44 por 44 pixels.
- não há uso de `transition-all` nos primitivos alterados.

### DS-004 - Consolidar o modelo estrutural de página

- Prioridade: P1
- Dependências: DS-001, DS-003
- Arquivos principais:
  - `src/components/common/page-header.tsx`
  - `src/app/sig/(app)/layout.tsx`
  - páginas em `src/app/sig/(app)`

#### Ações

- [ ] Implementar no `PageHeader` o gradiente sutil, espaçamento, tipografia e
  comportamento responsivo definidos em `AGENTS.md`.
- [ ] Incluir suporte consistente para título, descrição, breadcrumbs, ações e
  conteúdo complementar sem criar variantes especulativas.
- [ ] Substituir cabeçalhos manuais quando representarem o mesmo padrão.
- [ ] Manter cabeçalho próprio somente em experiências justificadas, como mapa
  em tela cheia.
- [ ] Padronizar largura, gutters, distância entre header e conteúdo e padding
  inferior.
- [ ] Garantir exatamente um `h1` por página.

#### Critérios de aceite

- páginas operacionais compartilham a mesma anatomia visual
- ações descem abaixo do título no mobile sem colisão
- não existem gradientes saturados usados apenas para compensar hierarquia
- todas as páginas têm um único `h1` e ordem correta de headings

### DS-005 - Refinar navegação e chrome da aplicação

- Prioridade: P1
- Dependências: DS-002, DS-003, DS-004
- Arquivos principais:
  - `src/components/site-header.tsx`
  - componentes de busca, tema, notificações e menu móvel

#### Ações

- [ ] Remover destinos `href="#"`; ocultar itens indisponíveis ou usar rotas
  reais.
- [ ] Reduzir o ruído visual do header e reforçar a indicação de seção ativa.
- [ ] Aplicar o mesmo modelo de marca no desktop e no menu móvel.
- [ ] Garantir nomes acessíveis para busca, tema, notificações e ajuda.
- [ ] Revisar ordem de foco, fechamento por Escape e retorno do foco em menus.
- [ ] Preservar navegação por teclado e o atalho de tema.
- [ ] Remover efeitos de glow do item de IA e usar destaque semântico sóbrio.

#### Critérios de aceite

- não existe link que navegue para `#`
- todas as ações do header têm nome e alvo mínimo de 44 pixels
- rota ativa é reconhecível por cor e por um segundo indicador visual
- navegação completa funciona com teclado no desktop e no mobile

### DS-006 - Corrigir autenticação e experiência de entrada

- Prioridade: P0
- Dependências: DS-002, DS-003
- Arquivos principais:
  - `src/proxy.ts`
  - `src/components/auth-shell.tsx`
  - `src/components/login-background.tsx`
  - páginas de autenticação

#### Ações

- [ ] Corrigir a ordem das regras do proxy para impedir loop entre dashboard e
  login no host central.
- [ ] Preservar o parâmetro de redirecionamento após autenticação.
- [ ] Substituir links legais `href="#"` por rotas reais ou texto não
  interativo até as páginas existirem.
- [ ] Aplicar o logo oficial e manter a arte territorial como referência de
  branding.
- [ ] Garantir respeito a `prefers-reduced-motion` em todas as animações.
- [ ] Aumentar alvos de links, campos, revelar senha e botão principal.
- [ ] Validar mensagens de erro, loading e credenciais inválidas.

#### Critérios de aceite

- sessão existente não produz `ERR_TOO_MANY_REDIRECTS`
- usuário sem sessão retorna à rota originalmente solicitada após login
- login light e dark passam no Axe
- todos os controles do login possuem 44 pixels de altura ou área clicável

### DS-007 - Padronizar estados de sistema e modelos auxiliares

- Prioridade: P1
- Dependências: DS-003, DS-004
- Arquivos principais:
  - `src/components/common`
  - `loading.tsx`, `error.tsx` e `not-found.tsx` em `src/app`
  - páginas com fetch assíncrono

#### Ações

- [ ] Definir modelos reutilizáveis para loading, vazio, sem resultados, erro,
  sem permissão, backend indisponível e modo demonstração.
- [ ] Diferenciar claramente estado vazio real de falha de carregamento.
- [ ] Incluir título, explicação curta e ação de recuperação quando aplicável.
- [ ] Usar linguagem territorial discreta em estados vazios relevantes.
- [ ] Adicionar `loading.tsx` e `error.tsx` nos limites assíncronos relevantes.
- [ ] Evitar barras vazias, toasts sobre conteúdo crítico e mensagens técnicas.
- [ ] Garantir que skeletons preservem o layout final.

#### Critérios de aceite

- toda página que depende de rede possui loading, erro e vazio distinguíveis
- erros oferecem repetir, voltar ou contato conforme o contexto
- nenhuma mensagem fica invisível por contraste
- toasts não cobrem ações essenciais no mobile

### DS-008 - Refinar páginas, dados e responsividade

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

- [ ] Dashboard: definir uma prioridade visual principal e reduzir bordas
  coloridas concorrentes.
- [ ] Dashboard: aplicar `font-mono` somente aos dados técnicos definidos pela
  marca e garantir nomes acessíveis nos gráficos.
- [ ] Tabelas: fornecer indicação de rolagem, coluna principal persistente ou
  representação compacta quando a leitura tabular não couber.
- [ ] Terrenos: corrigir feedback de erro e separar ações primárias de ajustes
  de visualização.
- [ ] Mapa: manter o mapa como prioridade, aproximar filtros dos resultados e
  nomear todos os controles.
- [ ] Viabilidades e Comitê: reduzir caixas explicativas concorrentes e reforçar
  fila, status e próxima ação.
- [ ] IA: remover linguagem neon, diminuir elevação e aproximar a interface da
  sobriedade do produto operacional.
- [ ] Admin: manter densidade, filtros e ações coerentes com as demais tabelas.
- [ ] Design System: transformá-lo em referência fiel, sem variantes obsoletas.
- [ ] Revisar todas as demais páginas usando a matriz da seção 9.

#### Critérios de aceite

- nenhuma viewport de 390 pixels possui overflow horizontal do body
- nenhum conteúdo essencial fica cortado sem indicação de rolagem
- cada página possui uma ação primária visualmente inequívoca
- cores de gráficos seguem a ordem fixa dos tokens chart
- estados hover não são o único meio de revelar informação

### DS-009 - Criar proteção automatizada de UI e acessibilidade

- Prioridade: P1
- Dependências: DS-003, DS-006, DS-008
- Arquivos principais:
  - `playwright.config.ts`
  - testes E2E a criar em diretório compatível com o projeto
  - `package.json`

#### Ações

- [ ] Configurar Playwright sem substituir Vitest.
- [ ] Criar projeto desktop 1440 por 900 e mobile 390 por 844.
- [ ] Criar testes light e dark para as rotas mínimas de DS-008.
- [ ] Integrar `@axe-core/playwright` e falhar em impactos critical e serious.
- [ ] Testar navegação por teclado, foco visível, menu móvel e alternância de
  tema.
- [ ] Testar ausência de overflow horizontal e dimensões dos controles.
- [ ] Adicionar snapshots somente para regiões estáveis e determinísticas.
- [ ] Documentar estratégia de autenticação e tenant para os testes.
- [ ] Adicionar scripts explícitos para E2E e acessibilidade.

#### Critérios de aceite

- suite roda localmente com um único comando documentado
- rotas mínimas passam em desktop, mobile, light e dark
- zero violações Axe critical ou serious
- falha de contraste ou botão sem nome quebra a suite
- testes não dependem de dados aleatórios nem de estado manual do navegador

### DS-010 - Validar, documentar e encerrar a migração

- Prioridade: P2
- Dependências: DS-001 a DS-009
- Arquivos principais:
  - `docs/brand/sigapp-brand-system.md`
  - `docs/brand/sigapp-asset-library.md`
  - este documento

#### Ações

- [ ] Executar todos os comandos de qualidade.
- [ ] Auditar as 38 páginas usando a matriz da seção 9.
- [ ] Atualizar documentação apenas quando o código final divergir de exemplos
  antigos.
- [ ] Remover variantes obsoletas somente após confirmar ausência de usos.
- [ ] Registrar limitações reais que dependam de backend ou conteúdo.
- [ ] Marcar cada item deste plano com evidência de validação.

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

- [ ] DS-001 a DS-010 estão concluídos na ordem definida.
- [ ] Os logos oficiais são os únicos ativos usados como marca do produto.
- [ ] As três famílias tipográficas são confirmadas por estilo computado.
- [ ] Não existem violações Axe critical ou serious nas rotas mínimas.
- [ ] Não existem loops de autenticação.
- [ ] Não existem links de interface com `href="#"`.
- [ ] Não existem controles interativos menores que 44 por 44 pixels.
- [ ] As 38 páginas foram registradas na matriz de revisão.
- [ ] Nenhuma página possui overflow horizontal do body em 390 pixels.
- [ ] Dark e light modes possuem contraste e hierarquia equivalentes.
- [ ] Design System, documentação e aplicação usam as mesmas variantes.
- [ ] Todos os comandos de validação passam.

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
