export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  author: BlogAuthor
  publishedAt: string
  readTime: number
  category: BlogCategory
  coverColor: string
  tags: string[]
  featured?: boolean
}

export type BlogAuthor = {
  name: string
  role: string
  initials: string
}

export type BlogCategory =
  | "Mercado Imobiliário"
  | "Tecnologia"
  | "Inteligência Artificial"
  | "Produto"
  | "Dicas"

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Mercado Imobiliário",
  "Tecnologia",
  "Inteligência Artificial",
  "Produto",
  "Dicas",
]

const AUTHORS: Record<string, BlogAuthor> = {
  rafael: {
    name: "Equipe SIGAPP",
    role: "Produto e engenharia",
    initials: "SG",
  },
  carla: {
    name: "Equipe SIGAPP",
    role: "Produto",
    initials: "SG",
  },
  bruno: {
    name: "Equipe SIGAPP",
    role: "Incorporação",
    initials: "SG",
  },
  luciana: {
    name: "Equipe SIGAPP",
    role: "Inteligência de domínio",
    initials: "SG",
  },
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-calcular-tir-projetos-imobiliarios",
    title: "Como calcular TIR em projetos imobiliários sem planilha frágil",
    excerpt:
      "A TIR considera o tempo do fluxo — ROI não. O que entra no cálculo, onde a planilha falha e como manter o comitê no mesmo número.",
    content: `
A Taxa Interna de Retorno (TIR) é o principal indicador que um investidor ou incorporador utiliza para avaliar se um projeto imobiliário vale a pena. Ela representa a taxa de desconto que iguala o Valor Presente Líquido (VPL) de um fluxo de caixa a zero.

## Por que a TIR importa mais que o ROI

O ROI (Retorno sobre Investimento) é simples: divide o lucro pelo custo. Mas ele não considera o tempo. Uma incorporação que dura 36 meses com ROI de 25% é muito diferente de uma que dura 60 meses com o mesmo retorno.

A TIR resolve isso. Ela considera o fluxo de caixa mês a mês, o prazo total do projeto e o momento em que cada entrada e saída acontece.

## Os parâmetros que afetam a TIR em projetos imobiliários

No SIGAPP, o motor de viabilidade considera:

- **VGV (Valor Geral de Vendas)**: calculado com base na tipologia, área privativa e preço/m²
- **Curva de vendas**: quando as unidades são vendidas ao longo do tempo
- **Custo de obra**: distribuído conforme a curva de construção (S-curve)
- **Permutas**: física ou financeira, com impactos tributários diferentes
- **INCC**: correção monetária sobre saldos devedores durante a obra
- **Comissões**: corretagem, marketing e despesas de lançamento
- **Impostos**: IRPJ, CSLL, PIS/COFINS conforme regime tributário

## O problema das planilhas manuais

Em uma planilha Excel, qualquer um desses parâmetros pode conter um erro que se propaga silenciosamente. Uma correção de INCC aplicada ao período errado pode reduzir a TIR calculada em 3 pontos percentuais — a diferença entre aprovar e rejeitar um projeto no comitê.

O motor do SIGAPP valida as premissas antes de calcular e mantém histórico de versões, permitindo comparar cenários lado a lado.

## Exemplo prático

Para um terreno de R$ 4,2M com produto residencial de 120 unidades (área privativa média de 85m², preço de R$ 9.800/m²):

- VGV bruto: R$ 99,96M
- Após deduções e custos: Lucro Líquido de R$ 18,2M
- **TIR calculada: 22,4% ao ano**
- Payback: 34 meses

Essa análise, que levaria um dia inteiro em Excel, o SIGAPP produz em minutos.
    `.trim(),
    author: AUTHORS.rafael,
    publishedAt: "2026-05-28",
    readTime: 7,
    category: "Mercado Imobiliário",
    coverColor: "from-secondary/20 to-primary/8",
    tags: ["TIR", "Viabilidade", "Análise Financeira"],
    featured: true,
  },
  {
    slug: "sig-ia-inteligencia-artificial-mercado-imobiliario",
    title: "SIG_IA: Por que IA Genérica Falha no Mercado Imobiliário",
    excerpt:
      "ChatGPT e ferramentas genéricas de IA não entendem permuta com pessoa física, CUB, ou como estruturar uma curva de venda. A SIG_IA foi construída para isso.",
    content: `
Quando perguntamos ao ChatGPT "qual é o impacto fiscal de uma permuta com pessoa física em uma incorporação imobiliária?", a resposta é vaga, genérica e frequentemente incorreta para o contexto brasileiro.

Esse é o problema fundamental com IA genérica no mercado imobiliário: ela não tem o contexto específico, os parâmetros do seu negócio, nem o conhecimento técnico de domínio.

## O que diferencia a SIG_IA

A SIG_IA não é um chatbot que responde perguntas. É um agente com 25+ ferramentas especializadas que pode:

1. **Acessar seus dados reais** — terrenos, viabilidades, contratos, histórico de negociações
2. **Executar cálculos** — não apenas explicar TIR, mas calculá-la com os seus parâmetros
3. **Gerar documentos** — rascunhar parecer técnico de comitê, exportar análise em PDF
4. **Detectar anomalias** — identificar viabilidades com premissas fora do padrão da sua empresa

## Exemplos de consultas que funcionam

"Quais terrenos do pipeline têm TIR acima de 18% e estão na fase de comitê?"

"Compare o VGV das três viabilidades do terreno Batel e diga qual tem melhor margem líquida."

"A viabilidade v2 do terreno Paulista tem algum parâmetro fora do padrão dos últimos 6 meses?"

"Gere um resumo executivo do comitê de aprovação de junho para enviar ao conselho."

Nenhuma dessas consultas funciona bem em um assistente de IA genérico, porque ele não tem acesso aos seus dados.
    `.trim(),
    author: AUTHORS.luciana,
    publishedAt: "2026-05-15",
    readTime: 6,
    category: "Inteligência Artificial",
    coverColor: "from-primary/18 to-secondary/10",
    tags: ["IA", "SIG_IA", "Automação"],
    featured: true,
  },
  {
    slug: "multi-tenancy-dados-incorporadoras",
    title:
      "Multi-tenancy: Por que Isolamento de Dados Importa para Incorporadoras",
    excerpt:
      "Quando múltiplas empresas compartilham um banco de dados, o risco de vazamento de dados estratégicos é real. Entenda a arquitetura database-per-tenant do SIGAPP.",
    content: `
Dados de terrenos prospectados, viabilidades financeiras, estratégias de precificação e contatos de proprietários são ativos estratégicos de altíssimo valor para qualquer incorporadora.

Em plataformas SaaS que usam arquitetura multi-tenant com banco de dados compartilhado (shared schema), um bug de autorização pode expor dados de uma empresa para outra. Já aconteceu com plataformas grandes.

## Database-per-tenant: o modelo do SIGAPP

O SIGAPP usa isolamento completo: cada empresa tem seu próprio banco de dados PostgreSQL. Isso significa:

- **Zero risco de cross-contamination**: não existe query que retorne dados de outro tenant por acidente
- **Backup independente**: o banco de uma empresa pode ser restaurado sem afetar outros
- **Escala independente**: uma empresa com 10.000 terrenos não prejudica a performance de outra com 100
- **Compliance facilitado**: LGPD e auditoria por empresa ficam matematicamente isoladas

## O custo desse isolamento

É mais caro operar. Mais bancos = mais infraestrutura. Por isso muitos SaaS escolhem shared schema.

No SIGAPP, entendemos que para dados tão sensíveis quanto prospecções imobiliárias, esse custo é justificado e necessário.
    `.trim(),
    author: AUTHORS.rafael,
    publishedAt: "2026-05-02",
    readTime: 5,
    category: "Tecnologia",
    coverColor: "from-muted-foreground/15 to-primary/8",
    tags: ["Segurança", "Multi-tenant", "Dados"],
  },
  {
    slug: "estruturar-comite-aprovacao-terrenos",
    title: "Como Estruturar um Comitê de Aprovação de Terrenos Eficiente",
    excerpt:
      "Empresas que aprovam terrenos sem processo estruturado cometem erros caros. Veja como organizar um comitê com papéis claros, critérios objetivos e histórico auditável.",
    content: `
O comitê de aprovação de terrenos é onde decisões de dezenas ou centenas de milhões de reais são tomadas. Surpreendentemente, a maioria das incorporadoras opera esse processo com apresentações PowerPoint por e-mail e aprovações por WhatsApp.

## Os problemas do processo informal

1. **Sem critérios objetivos**: cada membro avalia com critérios diferentes
2. **Sem histórico**: não sabe quem aprovou o quê e por quê
3. **Sem rastreabilidade de versões**: qual viabilidade foi apresentada no comitê?
4. **Aprovações fracionadas**: "aprovado com ressalvas" sem definição clara do que são as ressalvas

## A estrutura que funciona

### Papéis definidos

Cada membro do comitê deve ter um papel claro:
- **Financeiro**: valida TIR, VPL e estrutura de capital
- **Engenharia**: valida custo de obra e cronograma
- **Comercial**: valida curva de vendas e precificação
- **Jurídico**: valida regularidade do terreno e riscos

### Critérios de aprovação

Defina thresholds mínimos antes de qualquer reunião:
- TIR mínima: ex. 18% ao ano
- Margem líquida mínima: ex. 15%
- Payback máximo: ex. 36 meses
- Score de risco máximo: ex. 7/10

### Registro e histórico

Cada decisão deve registrar: data, versão da viabilidade apresentada, parecer de cada departamento, condicionantes e quem aprovou/rejeitou.

No SIGAPP, o módulo de Comitê faz exatamente isso, com rastreabilidade completa.
    `.trim(),
    author: AUTHORS.bruno,
    publishedAt: "2026-04-20",
    readTime: 8,
    category: "Dicas",
    coverColor: "from-emerald-500/16 to-primary/8",
    tags: ["Comitê", "Gestão", "Processo"],
  },
  {
    slug: "incc-cub-permuta-parametros-viabilidade",
    title:
      "INCC, CUB e Permuta: Os Parâmetros que Definem uma Viabilidade Precisa",
    excerpt:
      "Uma análise de viabilidade imobiliária brasileira que ignora INCC, CUB ou a estrutura tributária da permuta estará sempre errada. Entenda cada um.",
    content: `
Viabilidade imobiliária no Brasil tem peculiaridades que modelos internacionais simplesmente não contemplam. Quem tenta usar uma planilha genérica de "real estate analysis" americana vai errar feio.

## INCC: o índice que corrói a margem

O INCC (Índice Nacional de Custo da Construção) é o índice de correção monetária dos saldos de prestações durante a obra. Ele corrige tanto o saldo devedor dos compradores quanto os contratos de construção.

Em um cenário de INCC médio de 6% ao ano durante uma obra de 30 meses, o impacto no custo final pode ser de 15% sobre o custo de construção. Uma viabilidade que ignora isso está sistematicamente subestimando custos.

## CUB: referência de custo de construção

O CUB (Custo Unitário Básico) é publicado mensalmente pelo SINDUSCON de cada estado. É o benchmark de custo por m² de área construída.

Para um produto residencial padrão em São Paulo, o CUB R8-N (residencial 8 pavimentos normal) em maio/2026 está em R$ 2.847/m². Uma incorporadora com processo produtivo eficiente constroe abaixo do CUB; uma ineficiente, acima.

## Permuta: física vs. financeira

A permuta é a forma mais comum de negociar terrenos no Brasil. O proprietário cede o terreno em troca de unidades prontas (permuta física) ou de um percentual do VGV (permuta financeira).

**Permuta física** — entrega de unidades. Tributariamente, é uma permuta de bens. A incorporadora não precisa desembolsar caixa na compra do terreno, mas entrega unidades com custo.

**Permuta financeira** — pagamento em percentual do VGV ao longo do tempo. Tem tratamento tributário diferente: o terreno é reconhecido como custo à medida que as unidades são vendidas.

O SIGAPP calcula corretamente as duas modalidades, incluindo os impactos em IRPJ e CSLL.
    `.trim(),
    author: AUTHORS.bruno,
    publishedAt: "2026-04-08",
    readTime: 9,
    category: "Mercado Imobiliário",
    coverColor: "from-secondary/18 to-accent",
    tags: ["INCC", "CUB", "Permuta", "Tributação"],
  },
  {
    slug: "digitalizacao-incorporadora-excel-saas",
    title: "Do Excel ao SaaS: A Jornada de Digitalização de uma Incorporadora",
    excerpt:
      "Como a Construtora Terraplan migrou 200 terrenos prospectados de planilhas para o SIGAPP em 8 semanas — e o que aprenderam no processo.",
    content: `
"A gente sabia que tinha um problema. Não sabia como era grande até tentar consertar."

Rodrigo Menezes, Diretor de Incorporação da Construtora Terraplan, descreve assim o início da transformação digital da empresa.

## O estado inicial

Quando a Terraplan começou a mapear seus processos em 2025, encontrou:
- 47 arquivos Excel para viabilidade, cada um com estrutura diferente
- 3 planilhas de controle de terrenos que nunca estavam sincronizadas
- Histórico de prospecções espalhado entre WhatsApp, e-mail e um drive compartilhado
- Nenhum processo formal de aprovação — comitê por reunião semanal com PowerPoint

## A decisão pelo SIGAPP

"A gente avaliou três plataformas. O diferencial do SIGAPP foi o motor de viabilidade. Os outros eram CRMs imobiliários com viabilidade colada. O SIGAPP é o contrário: começa pelo financeiro."

O plano escolhido foi o **SIG Master**, pelos 10 usuários e a SIG_IA.

## A migração

Semanas 1-2: mapeamento de terrenos ativos (47 → 38 após depuração)

Semanas 3-4: configuração de produtos (a Terraplan tem 4 tipologias padrão)

Semanas 5-6: migração de viabilidades — as 12 mais recentes foram recriadas no motor do SIGAPP

Semanas 7-8: treinamento da equipe e go-live

## 90 dias depois

"Nossa última reunião de comitê durou 1h40. Antes durava 4h. O pessoal chega com a viabilidade aberta no sistema, todos veem o mesmo número."

A TIR do terreno aprovado nessa reunião: 19,3%. A meta da empresa: 17%.
    `.trim(),
    author: AUTHORS.carla,
    publishedAt: "2026-03-25",
    readTime: 6,
    category: "Produto",
    coverColor: "from-primary/20 to-secondary/12",
    tags: ["Case", "Digitalização", "Onboarding"],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category)
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.featured)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00")
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
