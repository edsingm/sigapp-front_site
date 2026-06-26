const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.sigapp.com.br"

// URL canônica do site de marketing (troque via NEXT_PUBLIC_SITE_URL por ambiente)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sigapp.com.br"

// Metadados de marca usados em SEO, OpenGraph e dados estruturados
export const SITE = {
  name: "SIGAPP",
  legalName: "SIGAPP Tecnologia Ltda.",
  url: SITE_URL,
  email: "contato@sigapp.com.br",
  title: "SIGAPP — Inteligência para incorporar",
  description:
    "Sistema de inteligência de incorporação para incorporadoras. Cadastro, viabilidade, DRE, fluxo de caixa, TIR, VPL e legalização em um só lugar.",
  locale: "pt_BR",
}

// Destinos centralizados de CTA — troque NEXT_PUBLIC_APP_URL para apontar a outro ambiente
export const LINKS = {
  signup: "/cadastro",
  login: `${APP_URL}/login`,
  sales:
    "mailto:contato@sigapp.com.br?subject=Falar%20com%20vendas%20%E2%80%94%20SIGAPP",
  demo: "mailto:contato@sigapp.com.br?subject=Agendar%20demonstra%C3%A7%C3%A3o%20%E2%80%94%20SIGAPP",
}

export type PlanConfig = {
  id: string
  name: string
  tagline: string
  monthlyPrice: number
  annualPrice: number
  users: string
  terrenos: string
  storage: string
  hasAI: boolean
  hasCommittee: boolean
  hasNegotiation: boolean
  hasLegal: boolean
  support: string
  features: string[]
  highlighted?: boolean
  cta: string
  ctaHref: string
}

export type PlanMatrixField =
  | "users"
  | "terrenos"
  | "storage"
  | "support"
  | "hasAI"
  | "hasCommittee"
  | "hasNegotiation"
  | "hasLegal"

export type PlanMatrixRow = {
  id: string
  label: string
  helper?: string
  kind: "text" | "boolean"
  field: PlanMatrixField
}

export type FeatureItem = {
  id: string
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  mock: "viability" | "chat" | "workflow" | "permissions"
  side: "left" | "right"
}

export type Testimonial = {
  id: string
  quote: string
  highlight: string
  author: string
  role: string
  company: string
  city: string
  size: "sm" | "lg"
}

export type FAQItem = {
  question: string
  answer: string
}

export type MetricItem = {
  value: string
  label: string
}

export const METRICS: MetricItem[] = [
  { value: "340+", label: "Incorporadoras ativas" },
  { value: "R$ 2,4B", label: "Em terrenos analisados" },
  { value: "12.800+", label: "Viabilidades calculadas" },
  { value: "50+", label: "Parâmetros por viabilidade" },
]

export const STICKY_MOBILE_CTA = {
  badge: "Do mapa a decisao",
  title: "Conheca o fluxo completo",
  description:
    "Veja como uma oportunidade territorial percorre analise, comite e legalizacao em um unico sistema.",
  cta: "Solicitar demonstracao",
}

export const PLANS: PlanConfig[] = [
  {
    id: "broker",
    name: "SIG Broker",
    tagline: "Para corretores autônomos",
    monthlyPrice: 97,
    annualPrice: 78,
    users: "1 usuário",
    terrenos: "50 terrenos",
    storage: "—",
    hasAI: false,
    hasCommittee: false,
    hasNegotiation: false,
    hasLegal: false,
    support: "E-mail",
    features: [
      "Prospecção de terrenos",
      "Motor de viabilidade básico",
      "Configuração de produtos",
      "Exportação Excel",
      "Regionais e base territorial",
    ],
    cta: "Começar avaliação",
    ctaHref: `${LINKS.signup}?plan=broker`,
  },
  {
    id: "basico",
    name: "SIG Básico",
    tagline: "Para pequenas equipes",
    monthlyPrice: 247,
    annualPrice: 198,
    users: "Até 3 usuários",
    terrenos: "100 terrenos",
    storage: "1 GB",
    hasAI: false,
    hasCommittee: false,
    hasNegotiation: false,
    hasLegal: false,
    support: "E-mail",
    features: [
      "Tudo do Broker",
      "Dashboard básico",
      "Viabilidade completa (DRE + fluxo)",
      "Exportação PDF",
      "Gestão de equipe",
    ],
    cta: "Começar avaliação",
    ctaHref: `${LINKS.signup}?plan=basico`,
  },
  {
    id: "master",
    name: "SIG Master",
    tagline: "Para equipes em crescimento",
    monthlyPrice: 597,
    annualPrice: 478,
    users: "Até 10 usuários",
    terrenos: "200 terrenos",
    storage: "3 GB",
    hasAI: true,
    hasCommittee: false,
    hasNegotiation: false,
    hasLegal: true,
    support: "Prioritário",
    features: [
      "Tudo do Básico",
      "SIG_IA conversacional",
      "Legalização end-to-end",
      "Dashboard completo",
      "Permissões avançadas (RBAC)",
    ],
    highlighted: true,
    cta: "Começar avaliação",
    ctaHref: `${LINKS.signup}?plan=master`,
  },
  {
    id: "pro",
    name: "SIG Pro",
    tagline: "Para grandes incorporadoras",
    monthlyPrice: 947,
    annualPrice: 758,
    users: "Ilimitado",
    terrenos: "Ilimitado",
    storage: "5 GB",
    hasAI: true,
    hasCommittee: true,
    hasNegotiation: true,
    hasLegal: true,
    support: "Dedicado",
    features: [
      "Tudo do Master",
      "Comitê de revisão",
      "Gestão de negociações",
      "Sala de projetos",
      "API de integração",
    ],
    cta: "Falar com vendas",
    ctaHref: LINKS.sales,
  },
]

export const PRICING_MATRIX_COPY = {
  eyebrow: "Comparativo completo",
  title: "Veja exatamente o que muda em cada plano",
  description:
    "Limites, governanca e capacidade operacional lado a lado para sua equipe decidir com criterio.",
  mobileSummary: "Comparar recursos dos planos",
}

export const PLAN_MATRIX_ROWS: PlanMatrixRow[] = [
  {
    id: "users",
    label: "Usuários incluídos",
    helper: "Quantidade de acessos simultâneos no plano",
    kind: "text",
    field: "users",
  },
  {
    id: "terrenos",
    label: "Capacidade de terrenos",
    helper: "Carteira ativa suportada em cada plano",
    kind: "text",
    field: "terrenos",
  },
  {
    id: "storage",
    label: "Armazenamento",
    helper: "Espaço para documentos, anexos e históricos",
    kind: "text",
    field: "storage",
  },
  {
    id: "support",
    label: "Suporte",
    helper: "Canal e prioridade de atendimento",
    kind: "text",
    field: "support",
  },
  {
    id: "ai",
    label: "SIG_IA conversacional",
    helper: "Assistente especializada em incorporação",
    kind: "boolean",
    field: "hasAI",
  },
  {
    id: "committee",
    label: "Comitê de revisão",
    helper: "Aprovação estruturada da viabilidade",
    kind: "boolean",
    field: "hasCommittee",
  },
  {
    id: "negotiation",
    label: "Gestão de negociações",
    helper: "Pipeline comercial e histórico de propostas",
    kind: "boolean",
    field: "hasNegotiation",
  },
  {
    id: "legal",
    label: "Legalização end-to-end",
    helper: "Fluxo completo até documentação e registro",
    kind: "boolean",
    field: "hasLegal",
  },
]

export const FEATURES: FeatureItem[] = [
  {
    id: "viability",
    eyebrow: "Motor Financeiro",
    title: "Viabilidade com precisão de engenharia",
    description:
      "50+ parâmetros financeiros em um motor de cálculo robusto que gera DRE, fluxo de caixa mensal e indicadores de retorno em segundos.",
    bullets: [
      "TIR, ROI, VPL e Payback calculados automaticamente",
      "Simulação de cenários múltiplos para o mesmo terreno",
      "Curvas de venda e construção parametrizáveis",
      "Workflow de aprovação com comitê integrado",
    ],
    mock: "viability",
    side: "right",
  },
  {
    id: "ai",
    eyebrow: "Inteligência Artificial",
    title: "SIG_IA: a IA que entende incorporação",
    description:
      "25+ ferramentas especializadas no domínio imobiliário. Analisa viabilidades, calcula TIR, revisa pareceres e detecta anomalias — direto no chat.",
    bullets: [
      "Consultas em linguagem natural sobre terrenos",
      "Análise automática de risco de viabilidade",
      "Busca semântica em documentos do projeto",
      "Budget de uso configurável por plano",
    ],
    mock: "chat",
    side: "left",
  },
  {
    id: "workflow",
    eyebrow: "Workflow Completo",
    title: "Do terreno ao contrato, sem saltar etapas",
    description:
      "Pipeline end-to-end com status, histórico e responsáveis em cada transição. Nunca perca o fio da prospecção até a legalização.",
    bullets: [
      "Prospecção → Viabilidade → Comitê → Negociação → Legalização",
      "Histórico de mudanças com audit log completo",
      "Notificações por responsável e prazo",
      "Visibilidade total do pipeline imobiliário",
    ],
    mock: "workflow",
    side: "right",
  },
  {
    id: "multitenant",
    eyebrow: "Segurança Enterprise",
    title: "Controle granular de acesso e dados",
    description:
      "Isolamento total de dados por empresa. Permissões em dot-notation por módulo, roles hierárquicas e audit completo de todas as ações.",
    bullets: [
      "Database-per-tenant — isolamento total garantido",
      "RBAC: Owner, Diretor, Gerente, Supervisor, Viewer",
      "Permissões granulares por módulo (ex: viabilities.editor)",
      "Logs de auditoria completos e exportáveis",
    ],
    mock: "permissions",
    side: "left",
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "O motor de viabilidade do SIGAPP substituiu três planilhas diferentes que mantínhamos em paralelo. A precisão do cálculo de TIR reduziu nossas revisões de comitê de 4 para 1 rodada.",
    highlight: "4 para 1 rodada no comitê",
    author: "Rodrigo Menezes",
    role: "Diretor de Incorporação",
    company: "Construtora Terraplan",
    city: "São Paulo, SP",
    size: "lg",
  },
  {
    id: "2",
    quote:
      "A SIG_IA entende termos técnicos que outros modelos nunca acertam. Pergunto sobre permuta com pessoa física e ela já calcula o imposto correto.",
    highlight: "Consultas técnicas em segundos",
    author: "Fernanda Carvalho",
    role: "Analista de Viabilidade",
    company: "Grupo Habitare",
    city: "Curitiba, PR",
    size: "sm",
  },
  {
    id: "3",
    quote:
      "Em 3 meses migramos 180 terrenos prospectados de planilhas para o SIGAPP. O histórico centralizado mudou completamente nossa dinâmica de negociação.",
    highlight: "180 terrenos migrados em 3 meses",
    author: "Caio Drummond",
    role: "Sócio-fundador",
    company: "Incorporadora Leste Sul",
    city: "Porto Alegre, RS",
    size: "sm",
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Os 7 dias grátis têm todas as funcionalidades do plano?",
    answer:
      "Sim. Os 7 dias grátis ativam o plano completo escolhido, incluindo SIG_IA (nos planos que oferecem), legalização, comitê e todas as funcionalidades. Sem restrições artificiais. Você precisa escolher um plano e informar dados de pagamento no cadastro — a cobrança só ocorre após o 7º dia, e você pode cancelar antes sem custo algum.",
  },
  {
    question: "Posso migrar meus dados de planilhas Excel existentes?",
    answer:
      "Oferecemos importação de terrenos e parâmetros básicos via Excel/CSV. Nosso time de onboarding auxilia na migração de dados históricos durante os primeiros 30 dias para planos Master e Pro.",
  },
  {
    question: "Como funciona a segurança e a adequação à LGPD?",
    answer:
      "Cada empresa opera em ambiente isolado, com banco de dados dedicado, logs de auditoria e controle granular de permissões por módulo. Os dados permanecem sob sua titularidade e seguimos práticas compatíveis com a LGPD para armazenamento, acesso e exportação das informações.",
  },
  {
    question: "Como funciona o isolamento de dados multi-tenant?",
    answer:
      "Cada empresa tem seu próprio banco de dados PostgreSQL isolado. Não há dados compartilhados entre tenants. Isso garante privacidade total e elimina riscos de vazamento por cross-contamination.",
  },
  {
    question: "A SIG_IA é treinada com dados do meu negócio?",
    answer:
      "Não. A SIG_IA usa modelos de linguagem externos com acesso apenas aos dados da sua empresa no momento da consulta. Seus dados nunca são usados para treinar modelos de IA.",
  },
  {
    question:
      "O motor financeiro atende normas do mercado imobiliário brasileiro?",
    answer:
      "Sim. O motor calcula com INCC, CUB, permuta com pessoa física/jurídica, ITBI, impostos sobre ganho de capital e outros parâmetros específicos do mercado imobiliário brasileiro.",
  },
  {
    question: "Quantos usuários posso adicionar durante os 7 dias grátis?",
    answer:
      "Durante os 7 dias grátis você tem acesso ao limite do plano escolhido: Broker (1 usuário), Básico (3), Master (10) e Pro (ilimitado).",
  },
  {
    question:
      "Posso convidar outras áreas da empresa, como comitê, jurídico e diretoria?",
    answer:
      "Sim. Você pode adicionar usuários por perfil e distribuir permissões conforme a função de cada área. Isso permite envolver viabilidade, comercial, jurídico e diretoria sem expor tudo para toda a empresa.",
  },
  {
    question: "Como é feito o suporte ao cliente?",
    answer:
      "Planos Broker e Básico têm suporte por e-mail (SLA 48h). O Master tem suporte prioritário (24h). O Pro tem gerente de conta dedicado e suporte via WhatsApp em horário comercial.",
  },
  {
    question:
      "Quanto tempo leva para sair da planilha e começar a operar no SIGAPP?",
    answer:
      "Na maioria dos casos, a equipe começa no mesmo dia. O cadastro leva poucos minutos e a importação inicial pode ser feita por planilha. Para operações maiores, nosso onboarding ajuda a estruturar a carteira e os parâmetros financeiros nas primeiras semanas.",
  },
  {
    question: "Posso exportar os dados se cancelar o plano?",
    answer:
      "Sim. Oferecemos exportação completa em Excel e PDF: terrenos, viabilidades, histórico de negociações e documentos. Após o cancelamento, seus dados ficam disponíveis por 30 dias para exportação.",
  },
  {
    question: "O pagamento é seguro? Quais formas de pagamento são aceitas?",
    answer:
      "Sim. Todos os pagamentos são processados pelo Stripe, líder mundial em infraestrutura de pagamentos. Seus dados de cartão nunca passam pelos nossos servidores — tudo é criptografado e tokenizado diretamente pelo Stripe. Aceitamos cartões de crédito das bandeiras Visa, Mastercard e American Express, além de boleto bancário.",
  },
]

export const CLIENT_LOGOS = [
  "Terraplan",
  "Grupo Habitare",
  "Incorp. Leste Sul",
  "Construtora Meridian",
  "Grupo Imobiliare",
  "Incorp. Vitória",
  "Construtora Nobre",
  "Grupo Panorama",
]

export type HowItWorksStep = {
  icon: string
  title: string
  description: string
}

// "Como funciona" — 3 passos do cadastro ao fechamento
export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    icon: "MapPin",
    title: "Cadastre o terreno",
    description:
      "Endereço, proprietário, documentos e fotos em uma base georreferenciada única. Importe sua carteira atual via Excel/CSV.",
  },
  {
    icon: "Calculator",
    title: "Calcule a viabilidade",
    description:
      "Informe os parâmetros do produto e o motor gera DRE, fluxo de caixa, TIR, VPL e Payback em segundos.",
  },
  {
    icon: "Handshake",
    title: "Aprove e feche",
    description:
      "Envie ao comitê, negocie com histórico completo e conduza a legalização no mesmo pipeline — sem trocar de ferramenta.",
  },
  {
    icon: "FileCheck",
    title: "Legalize e registre",
    description:
      "Acompanhe toda a documentação, escritura e registro imobiliário dentro da plataforma, com status em tempo real.",
  },
]

export type ComparisonRow = {
  label: string
  sigapp: boolean
  planilha: boolean
  erp: boolean
}

// Tabela comparativa (estilo "taxas vs concorrentes")
export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Prospecção territorial centralizada",
    sigapp: true,
    planilha: false,
    erp: true,
  },
  {
    label: "Motor de viabilidade (TIR, VPL, Payback)",
    sigapp: true,
    planilha: true,
    erp: false,
  },
  {
    label: "IA especializada em incorporação",
    sigapp: true,
    planilha: false,
    erp: false,
  },
  {
    label: "Comitê de aprovação com workflow",
    sigapp: true,
    planilha: false,
    erp: false,
  },
  {
    label: "Legalização end-to-end",
    sigapp: true,
    planilha: false,
    erp: false,
  },
  {
    label: "Histórico e auditoria completos",
    sigapp: true,
    planilha: false,
    erp: true,
  },
  {
    label: "Parâmetros do mercado BR (INCC, CUB, permuta)",
    sigapp: true,
    planilha: false,
    erp: false,
  },
]

export const PAIN_POINTS = [
  {
    icon: "FileSpreadsheet",
    title: "Planilhas frágeis para viabilidade",
    description:
      "Uma fórmula errada ou um VGV desatualizado compromete a aprovação do comitê. Sem histórico, sem rastreabilidade, sem controle.",
  },
  {
    icon: "FolderX",
    title: "Prospecções perdidas no caos",
    description:
      "Terrenos bons desaparecem entre WhatsApp, e-mail e cadernos. Nenhum histórico centralizado de contatos, visitas ou pareceres técnicos.",
  },
  {
    icon: "BotOff",
    title: "IA genérica não entende incorporação",
    description:
      "Ferramentas genéricas não sabem calcular permuta com pessoa física nem TIR com INCC. Você reescreve o contexto toda vez — e o resultado ainda é impreciso.",
  },
]
