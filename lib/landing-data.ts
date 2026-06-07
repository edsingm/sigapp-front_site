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
  { value: "98,3%", label: "Precisão do motor financeiro" },
]

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
    cta: "Começar trial grátis",
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
    cta: "Começar trial grátis",
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
    cta: "Começar trial grátis",
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
    author: "Caio Drummond",
    role: "Sócio-fundador",
    company: "Incorporadora Leste Sul",
    city: "Porto Alegre, RS",
    size: "sm",
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "O trial de 7 dias tem todas as funcionalidades do plano?",
    answer:
      "Sim. O trial ativa o plano completo escolhido por 7 dias, incluindo SIG_IA (nos planos que oferecem), legalização, comitê e todas as funcionalidades. Sem restrições artificiais.",
  },
  {
    question: "Posso migrar meus dados de planilhas Excel existentes?",
    answer:
      "Oferecemos importação de terrenos e parâmetros básicos via Excel/CSV. Nosso time de onboarding auxilia na migração de dados históricos durante os primeiros 30 dias para planos Master e Pro.",
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
    question: "O motor financeiro atende normas do mercado imobiliário brasileiro?",
    answer:
      "Sim. O motor calcula com INCC, CUB, permuta com pessoa física/jurídica, ITBI, impostos sobre ganho de capital e outros parâmetros específicos do mercado imobiliário brasileiro.",
  },
  {
    question: "Quantos usuários posso adicionar durante o trial?",
    answer:
      "Durante o trial você tem acesso ao limite do plano escolhido: Broker (1 usuário), Básico (3), Master (10) e Pro (ilimitado).",
  },
  {
    question: "Como é feito o suporte ao cliente?",
    answer:
      "Planos Broker e Básico têm suporte por e-mail (SLA 48h). O Master tem suporte prioritário (24h). O Pro tem gerente de conta dedicado e suporte via WhatsApp em horário comercial.",
  },
  {
    question: "Posso exportar os dados se cancelar o plano?",
    answer:
      "Sim. Oferecemos exportação completa em Excel e PDF: terrenos, viabilidades, histórico de negociações e documentos. Após o cancelamento, seus dados ficam disponíveis por 30 dias para exportação.",
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
