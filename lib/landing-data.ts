const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.sigapp.com.br"

const DEFAULT_SITE_URL = "https://sigapp.com.br"

function resolvePublicSiteUrl(value?: string) {
  try {
    const url = new URL(value ?? DEFAULT_SITE_URL)
    const localHosts = new Set(["localhost", "127.0.0.1", "::1"])

    if (url.protocol !== "https:" || localHosts.has(url.hostname)) {
      return DEFAULT_SITE_URL
    }

    return url.origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

// Canonicals nunca devem apontar para localhost, mesmo em builds locais.
export const SITE_URL = resolvePublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

// Metadados de marca usados em SEO, OpenGraph e dados estruturados
export const SITE = {
  name: "SIGAPP",
  legalName: "SIGAPP Tecnologia Imobiliária",
  cnpj: "68.410.328/0001-10",
  url: SITE_URL,
  email: "contato@sigapp.com.br",
  dpoEmail: "dpo@sigapp.com.br",
  title: "SIGAPP — Decisões que ganham território",
  description:
    "Dossiê de terreno com viabilidade, DRE, TIR, comitê e legalização para incorporadoras brasileiras — sem planilha paralela.",
  locale: "pt_BR",
}

// Destinos centralizados de CTA — troque NEXT_PUBLIC_APP_URL para apontar a outro ambiente
export const LINKS = {
  signup: "/cadastro",
  features: "/#funcionalidades",
  login: `${APP_URL}/login`,
  sales: `mailto:${SITE.email}?subject=Falar%20com%20vendas%20%E2%80%94%20SIGAPP`,
  demo: "/demonstracao",
  demoEmail: `mailto:${SITE.email}?subject=Agendar%20demonstra%C3%A7%C3%A3o%20%E2%80%94%20SIGAPP`,
}

export type PlanConfig = {
  id: string
  name: string
  /** Nome curto para o modelo cumulativo (ex.: "Broker") */
  shortName: string
  tagline: string
  /** Frase curta do diferencial comercial do plano */
  highlight: string
  /**
   * Plano imediatamente inferior no funil comercial.
   * Quando preenchido, o card usa o modelo "Tudo do X, mais:".
   */
  includesFrom: string | null
  monthlyPrice: number
  annualPrice: number
  users: string
  terrenos: string
  storage: string
  products: string
  aiBudget: string
  /** Nível de viabilidade (entitlements viabilities.*) */
  viability: string
  /** Nível de dashboard (entitlements dashboard.*) */
  dashboard: string
  /** Nível de SIG_IA: Não incluso | Conversacional | Avançada e contextual */
  aiLevel: string
  hasProspection: boolean
  hasOpportunityCompare: boolean
  hasScenarios: boolean
  hasAI: boolean
  hasCommittee: boolean
  hasNegotiation: boolean
  hasDealRoom: boolean
  hasLegal: boolean
  hasProjects: boolean
  hasDocumentIntelligence: boolean
  hasExportPdf: boolean
  hasExportExcel: boolean
  /**
   * No plano base: pacote completo.
   * Nos demais: apenas o que este plano adiciona sobre o anterior.
   */
  features: string[]
  highlighted?: boolean
  cta: string
  ctaHref: string
}

export type PlanMatrixField =
  | "users"
  | "terrenos"
  | "storage"
  | "products"
  | "aiBudget"
  | "viability"
  | "dashboard"
  | "aiLevel"
  | "hasProspection"
  | "hasOpportunityCompare"
  | "hasScenarios"
  | "hasAI"
  | "hasCommittee"
  | "hasNegotiation"
  | "hasDealRoom"
  | "hasLegal"
  | "hasProjects"
  | "hasDocumentIntelligence"
  | "hasExportPdf"
  | "hasExportExcel"

export type PlanMatrixRow = {
  id: string
  label: string
  helper?: string
  kind: "text" | "boolean"
  field: PlanMatrixField
}

export type PlanMatrixGroup = {
  id: string
  label: string
  rows: PlanMatrixRow[]
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

// Hero — provas rápidas abaixo dos CTAs
export const HERO_PROOF_ITEMS = [
  { label: "Ciclo completo", value: "Do terreno à legalização" },
  { label: "Decisão financeira", value: "DRE · TIR · VPL · cenários" },
  { label: "Governança real", value: "Comitê e trilha auditável" },
]

// Hero — copy centralizado (nunca hardcode em seção)
export const HERO_COPY = {
  eyebrow: "Sistema operacional da incorporação",
  titleLine1: "Viabilidade do terreno à decisão —",
  titleLine2: "sem pontos cegos.",
  description:
    "Captação, viabilidade, comitê, negociação e legalização conectados em uma inteligência operacional — para sua equipe decidir com contexto, velocidade e segurança.",
  primaryCta: "Ver o SIGAPP em ação",
  secondaryCta: "Explorar a jornada",
  audience: "Para incorporadoras, loteadoras e construtoras.",
  scrollLabel: "Descobrir a plataforma",
  panel: {
    eyebrow: "Radar de oportunidade",
    sectorName: "Residencial Aurora · Osasco/SP",
    coords: "23°31′57″S · 46°47′30″W",
    status: "Pronto para comitê",
    signal: "Cenário recomendado",
    progress: "5 etapas sincronizadas",
    progressIndex: "03 / 05",
    tir: "18,4%",
    area: "12.480 m²",
    vgv: "R$ 28,4M",
    photoAlt:
      "Vista aérea de quarteirões urbanos com lotes e edificações — leitura territorial",
    metrics: [
      { label: "TIR projetada", value: "18,4%" },
      { label: "Área computável", value: "12.480 m²" },
      { label: "VGV estimado", value: "R$ 28,4M" },
    ],
    stages: [
      { label: "Captação", state: "Concluída" },
      { label: "Viabilidade", state: "Validada" },
      { label: "Comitê", state: "Agora" },
      { label: "Negociação", state: "Próxima" },
      { label: "Legalização", state: "Planejada" },
    ],
  },
}

export type NavLink = { label: string; href: string }

// Links do menu principal (desktop e mobile)
export const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "/#como-funciona" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Planos", href: "/#precos" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
]

export const NAV_COPY = {
  productLabel: "Tecnologia imobiliária",
  menuLabel: "Menu",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
  login: "Entrar",
  mobileLogin: "Entrar na conta",
  demo: "Agendar demonstração",
  mobileKicker: "Plataforma para decisões imobiliárias",
}

export type FooterLink = { label: string; href: string }
export type FooterGroup = { group: string; links: FooterLink[] }

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    group: "Produto",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
      { label: "Soluções", href: "/solucoes" },
      { label: "Planos", href: "/#precos" },
      { label: "Perguntas frequentes", href: "/#faq" },
      { label: "Entrar", href: LINKS.login },
    ],
  },
  {
    group: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    group: "Contato",
    links: [
      { label: "Falar com vendas", href: LINKS.sales },
      { label: "Agendar demonstração", href: LINKS.demo },
    ],
  },
  {
    group: "Legal",
    links: [
      { label: "Termos de Uso", href: "/legal/termos-de-uso" },
      { label: "Privacidade", href: "/legal/privacidade" },
      { label: "LGPD", href: "/legal/lgpd" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
]

export const FOOTER_COPY = {
  logoLabel: "SIGAPP — início",
  eyebrow: "Tecnologia imobiliária",
  titleLine1: "Decisões que ganham",
  titleLine2: "território.",
  description:
    "Gestão territorial inteligente para analisar, aprovar e conduzir cada oportunidade com critério.",
  contactLabel: "Canal direto",
  navigationLabel: "Navegação do rodapé",
  copyright: `© 2026 ${SITE.legalName}.`,
  signature: "Do terreno ao registro · Brasil",
  cookiePreferences: "Gerenciar cookies",
  wordmark: "SIGAPP",
}

// BentoSection — dados de demonstração dos cards
export const BENTO_DRE = {
  project: {
    label: "Projeto em análise",
    name: "Residencial Av. Paulista · 120 un.",
    status: "Viável",
  },
  receitas: [
    { label: "Receita Bruta (VGV)", value: "R$ 28,4M" },
    { label: "(-) Deduções e impostos", value: "(R$ 1,7M)" },
  ],
  custos: [
    { label: "Custo de Obra (CUB)", value: "(R$ 14,9M)" },
    { label: "Marketing e Corretagem", value: "(R$ 1,1M)" },
    { label: "Despesas Operacionais", value: "(R$ 5,8M)" },
  ],
  lucro: { label: "Lucro Líquido", value: "R$ 4,9M", margin: "17,3%" },
  kpis: [
    { label: "TIR", value: "18,4%" },
    { label: "ROI", value: "17,5%" },
    { label: "Payback", value: "28 meses" },
    { label: "VPL", value: "R$ 2,1M" },
  ],
}

export const BENTO_EXPORT_FILES = [
  { name: "Viabilidade_Paulista_v3.pdf", ext: "pdf" },
  { name: "Terrenos_Q2_2026.xlsx", ext: "xlsx" },
  { name: "Parecer_Comite_Jun.pdf", ext: "pdf" },
]

export type BentoAlert = { msg: string; type: "warn" | "ok" }

export const BENTO_ALERTS: BentoAlert[] = [
  { msg: "Viabilidade pendente há 3 dias", type: "warn" },
  { msg: "Comitê aprovado: Av. Paulista", type: "ok" },
  { msg: "Prazo de legalização em 5 dias", type: "warn" },
]

export const BENTO_COPY = {
  eyebrow: "Inteligência operacional",
  titleLine1: "O dossiê deixa de ser arquivo.",
  titleLine2: "Vira superfície de decisão.",
  description:
    "Financeiro, território, documentos e alertas trabalham sobre a mesma oportunidade. Cada módulo adiciona contexto — sem criar outra fonte de verdade.",
  consoleLabel: "Mesa de inteligência · Residencial Paulista",
  consoleStatus: "05 módulos sincronizados",
  anchor: {
    eyebrow: "Leitura consolidada",
    title: "Um terreno inteiro cabe na mesma conversa.",
    description:
      "O indicador financeiro chega ao comitê junto do mapa, do documento e do prazo que explicam a decisão.",
    metric: "82%",
    metricLabel: "confiança da análise",
    signal: "Potencial alto",
  },
  dre: {
    eyebrow: "Motor DRE",
    title: "Resultado calculado no contexto",
    description:
      "Receitas, custos e retorno se atualizam no mesmo cenário do terreno.",
    revenuesLabel: "Receitas",
    costsLabel: "Custos",
  },
  map: {
    eyebrow: "Radar territorial",
    title: "Carteira visível por região",
    description:
      "Terrenos georreferenciados com estágio e leitura de concentração.",
    activeLabel: "Ativo",
    prospectedLabel: "Prospectado",
    summary: "47 terrenos · 12 regiões",
  },
  exports: {
    eyebrow: "Saídas do dossiê",
    title: "Parecer pronto para circular",
    description: "PDF e Excel preservam a leitura apresentada ao comitê.",
  },
  alerts: {
    eyebrow: "Pulso da operação",
    title: "O próximo risco aparece antes",
    description: "Prazos, pendências e aprovações entram na mesma leitura.",
  },
}

// Métricas operacionais do produto — sem contagem de clientes inventada
export const METRICS: MetricItem[] = [
  { value: "50+", label: "Parâmetros por viabilidade" },
  { value: "5", label: "Etapas no mesmo pipeline" },
  { value: "1", label: "Dossiê por oportunidade" },
  { value: "7", label: "Dias de avaliação guiada" },
]

export const SOCIAL_PROOF_COPY = {
  eyebrow: "Prova operacional",
  title: "Feito para o trabalho real da incorporação.",
  description:
    "Parâmetros, etapas e governança que já falam a língua da sua operação.",
  metricsLabel: "Indicadores de cobertura operacional do SIGAPP",
  tickerLabel: "Domínio imobiliário nativo",
  tickerAriaLabel: "Capacidades do domínio de incorporação",
}

// Faixa de domínio (substitui marquee de logos fictícios)
export const DOMAIN_STRIP = [
  "CUB e INCC nativos",
  "Permuta e VGV",
  "Comitê com parecer",
  "Legalização no dossiê",
  "Auditoria por etapa",
  "Isolamento por empresa",
]

// Bloco editorial com foto (matéria real, não UI abstrata)
export const MATTER_STRIP = {
  eyebrow: "Uma fonte de verdade",
  titleLine1: "O comitê vê o terreno inteiro.",
  titleLine2: "No mesmo contexto.",
  description:
    "Planta, parâmetros, DRE e trilha de parecer deixam de viver em abas, e-mails e planilhas. O terreno vira um dossiê legível — para quem analisa e para quem aprova.",
  imageSrc: "/images/dossie-mesa.jpg",
  imageAlt:
    "Mesa de trabalho com plantas, mapa cadastral e documentos de análise imobiliária",
  visualEyebrow: "Campo · dossiê · parecer",
  visualTitle: "A matéria da decisão, não só a interface.",
  visualStatus: "Dossiê 01 · em análise",
  perspectivesLabel: "Um fluxo · três perspectivas",
  points: [
    { label: "Analista", text: "Sobe o terreno e fecha o cenário" },
    { label: "Comitê", text: "Lê o mesmo DRE e o mesmo risco" },
    { label: "Jurídico", text: "Segue a legalização sem reabrir planilha" },
  ],
}

export const STICKY_MOBILE_CTA = {
  badge: "Dossiê do terreno",
  title: "Veja análise e comitê juntos",
  description:
    "Uma demonstração com terreno real — não um tour genérico de telas.",
  cta: "Solicitar demonstração",
  shortCta: "Demonstração",
}

export const PRICING_MATRIX_COPY = {
  eyebrow: "Comparativo completo",
  title: "O que muda — e o que você ganha — em cada plano",
  description:
    "Capacidade, módulos e profundidade operacional lado a lado. Valores alinhados aos entitlements reais do produto.",
  mobileSummary: "Comparar recursos dos planos",
  resourceLabel: "Critério",
  tableDescription: "Matriz de planos e entitlements",
  recommended: "Recomendado",
  mobileHint: "Abra para comparar item por item, por bloco",
  criteriaLabel: "critérios",
  includedLabel: "Incluído",
  notIncludedLabel: "Não incluso",
  scrollHint: "Deslize para ver todos os planos",
  scrollRegionLabel: "Tabela comparativa de planos com rolagem horizontal",
}

export const PRICING_COPY = {
  eyebrow: "Planos e capacidade",
  titleLine1: "Escolha o perímetro.",
  titleLine2: "O contexto continua inteiro.",
  description:
    "Comece com a capacidade que sua equipe precisa hoje. A operação evolui de plano sem reconstruir dados, histórico ou governança.",
  chips: ["Avaliação guiada", "Sem fidelidade", "Dados exportáveis"],
  consoleLabel: "Configuração de capacidade",
  consoleStatus: "4 perímetros operacionais",
  monthlyLabel: "Mensal",
  annualLabel: "Anual",
  annualDiscount: "−20%",
  annualHint: "No anual, você economiza 20% durante todo o período.",
  swipeLabel: "Deslize",
  planAriaLabel: "Ir para plano",
  footerNote:
    "Preços em reais · suporte em português · avaliação no contexto da sua operação",
  unavailableTitle: "Planos temporariamente indisponíveis",
  unavailableDescription:
    "Não conseguimos carregar os planos agora. Você ainda pode agendar uma conversa e dimensionar a operação com nosso time.",
  unavailableCta: "Dimensionar com o time",
}

export const PRICING_CARD_COPY = {
  planLabel: "Perímetro",
  recommended: "Recomendado",
  currency: "R$",
  monthlySuffix: "/mês",
  monthlyNote: "Cobrança mensal · sem fidelidade",
  annualSavingsPrefix: "Economia anual de",
  capacityLabel: "Capacidade principal",
  usersLabel: "Usuários",
  landLabel: "Terrenos",
  productsLabel: "Produtos",
  storageLabel: "Armazenamento",
  aiLabel: "Orçamento SIG_IA",
  viabilityLabel: "Viabilidade",
  dashboardLabel: "Dashboard",
  depthLabel: "Profundidade operacional",
  /** Plano base (Broker) */
  baseFeaturesLabel: "Inclui",
  /** Prefixos do modelo cumulativo: "Tudo do Broker, mais:" */
  includesFromPrefix: "Tudo do",
  includesFromSuffix: ", mais:",
  featuresLabel: "Inclui neste perímetro",
  additionalFeatures: "recursos adicionais no comparativo",
  notIncluded: "Não incluso",
  trust: "Dados exportáveis · pagamento seguro",
}

/**
 * Comparativo alinhado ao recorte A do backend
 * (EntitlementSeeder / PlanMatrixService).
 *
 * Broker: captação. Básico: análise usável. Master: decisão e fechamento.
 * Pro: operação completa (deal room, legalização, projetos, IA avançada).
 *
 * Agrupado por bloco comercial:
 * Capacidade → Operação → Governança → Entrega.
 */
export const PLAN_MATRIX_GROUPS: PlanMatrixGroup[] = [
  {
    id: "capacity",
    label: "Capacidade",
    rows: [
      {
        id: "users",
        label: "Usuários incluídos",
        helper: "Limite de usuários ativos no tenant",
        kind: "text",
        field: "users",
      },
      {
        id: "terrenos",
        label: "Terrenos na carteira",
        helper: "Capacidade de terrenos no plano",
        kind: "text",
        field: "terrenos",
      },
      {
        id: "products",
        label: "Produtos imobiliários",
        helper: "Limite de produtos configuráveis",
        kind: "text",
        field: "products",
      },
      {
        id: "storage",
        label: "Armazenamento",
        helper: "Documentos, anexos e históricos",
        kind: "text",
        field: "storage",
      },
      {
        id: "ai-budget",
        label: "Orçamento SIG_IA",
        helper: "Budget mensal em USD, quando a IA está inclusa",
        kind: "text",
        field: "aiBudget",
      },
    ],
  },
  {
    id: "operation",
    label: "Operação territorial e financeira",
    rows: [
      {
        id: "prospection",
        label: "Prospecção de terrenos",
        helper: "Captação e gestão da carteira territorial",
        kind: "boolean",
        field: "hasProspection",
      },
      {
        id: "opportunity-compare",
        label: "Comparação de oportunidades",
        helper: "Avaliação lado a lado de terrenos e cenários",
        kind: "boolean",
        field: "hasOpportunityCompare",
      },
      {
        id: "viability",
        label: "Motor de viabilidade",
        helper: "Profundidade do DRE, KPIs, fluxo, gráficos e cenários",
        kind: "text",
        field: "viability",
      },
      {
        id: "scenarios",
        label: "Cenários de viabilidade",
        helper: "Comparação de cenários no mesmo terreno",
        kind: "boolean",
        field: "hasScenarios",
      },
      {
        id: "dashboard",
        label: "Dashboard operacional",
        helper: "Visão geral, funil, unidades e VGV",
        kind: "text",
        field: "dashboard",
      },
      {
        id: "negotiation",
        label: "Gestão de negociações",
        helper: "Pipeline comercial e histórico de propostas",
        kind: "boolean",
        field: "hasNegotiation",
      },
      {
        id: "deal-room",
        label: "Deal room",
        helper: "Sala de fechamento da negociação",
        kind: "boolean",
        field: "hasDealRoom",
      },
      {
        id: "projects",
        label: "Sala de projetos",
        helper: "Projetos, planejamento e sala operacional",
        kind: "boolean",
        field: "hasProjects",
      },
    ],
  },
  {
    id: "governance",
    label: "Governança e inteligência",
    rows: [
      {
        id: "ai",
        label: "SIG_IA",
        helper: "Chat no Master; avançada e contextual no Pro",
        kind: "text",
        field: "aiLevel",
      },
      {
        id: "committee",
        label: "Comitê de revisão",
        helper: "Aprovação estruturada da viabilidade",
        kind: "boolean",
        field: "hasCommittee",
      },
      {
        id: "legal",
        label: "Legalização end-to-end",
        helper: "Fluxo completo até documentação e registro",
        kind: "boolean",
        field: "hasLegal",
      },
      {
        id: "documents",
        label: "Documentos inteligentes",
        helper: "Leitura e inteligência sobre documentos do dossiê",
        kind: "boolean",
        field: "hasDocumentIntelligence",
      },
    ],
  },
  {
    id: "delivery",
    label: "Exportação e entrega",
    rows: [
      {
        id: "export-excel",
        label: "Exportação Excel",
        helper: "Exportação tabular de dados e relatórios",
        kind: "boolean",
        field: "hasExportExcel",
      },
      {
        id: "export-pdf",
        label: "Exportação PDF",
        helper: "Dossiês e relatórios em PDF",
        kind: "boolean",
        field: "hasExportPdf",
      },
    ],
  },
]

/** Lista plana (compat e contagem de critérios). */
export const PLAN_MATRIX_ROWS: PlanMatrixRow[] = PLAN_MATRIX_GROUPS.flatMap(
  (group) => group.rows
)

export const FEATURES: FeatureItem[] = [
  {
    id: "viability",
    eyebrow: "Motor de viabilidade",
    title: "O DRE que o comitê consegue ler de primeira",
    description:
      "Parâmetros do produto brasileiro — CUB, curvas de venda, impostos e permuta — viram DRE, fluxo de caixa e indicadores sem planilha paralela.",
    bullets: [
      "TIR, ROI, VPL e Payback no mesmo cálculo",
      "Cenários lado a lado para o mesmo terreno",
      "Curvas de venda e obra ajustáveis",
      "Parecer de comitê sobre o mesmo dossiê",
    ],
    mock: "viability",
    side: "right",
  },
  {
    id: "ai",
    eyebrow: "Assistente de incorporação",
    title: "Perguntas de domínio, não de chatbot genérico",
    description:
      "A SIG_IA responde em contexto de terreno, viabilidade e documentos do projeto — permuta, risco e parecer, sem reexplicar o caso a cada prompt.",
    bullets: [
      "Consulta em linguagem natural sobre o dossiê",
      "Leitura de risco sobre a viabilidade aberta",
      "Busca em documentos do próprio projeto",
      "Orçamento de uso por plano",
    ],
    mock: "chat",
    side: "left",
  },
  {
    id: "workflow",
    eyebrow: "Pipeline operacional",
    title: "Do terreno ao registro, sem saltar etapa",
    description:
      "Cada transição tem responsável, status e histórico. A oportunidade não some entre WhatsApp, e-mail e pasta compartilhada.",
    bullets: [
      "Prospecção → Viabilidade → Comitê → Negociação → Legalização",
      "Histórico com trilha de alteração",
      "Alertas por prazo e responsável",
      "Visão única do pipeline da carteira",
    ],
    mock: "workflow",
    side: "right",
  },
  {
    id: "multitenant",
    eyebrow: "Acesso e isolamento",
    title: "Cada empresa no seu perímetro de dados",
    description:
      "Isolamento por empresa, papéis claros e permissão por módulo. Quem vê o dossiê e quem só lê o parecer fica explícito.",
    bullets: [
      "Banco dedicado por empresa",
      "Papéis: Owner, Diretor, Gerente, Supervisor, Viewer",
      "Permissão por módulo (ex.: viabilities.editor)",
      "Logs de auditoria exportáveis",
    ],
    mock: "permissions",
    side: "left",
  },
]

export const FEATURES_COPY = {
  eyebrow: "Capacidades conectadas",
  titleLine1: "Quatro camadas.",
  titleLine2: "Nenhum contexto perdido.",
  description:
    "O produto financeiro, a inteligência, o fluxo e o acesso trabalham como partes do mesmo dossiê — não como módulos que exigem reconciliação.",
  railLabel: "Arquitetura do dossiê",
  layerLabel: "Camada",
  evidenceLabel: "Evidências no fluxo",
}

// Depoimentos em tom de early access — sem métricas milagrosas nem empresas inventadas como “logos”
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "O que mais pesava era reabrir a planilha a cada comitê. Com o dossiê no SIGAPP, a discussão passa a ser o cenário — não onde está a aba certa.",
    highlight: "Comitê sobre o mesmo DRE",
    author: "Diretor de Incorporação",
    role: "Operação residencial vertical",
    company: "Pilotos em andamento",
    city: "São Paulo, SP",
    size: "lg",
  },
  {
    id: "2",
    quote:
      "Ainda estamos migrando o histórico antigo, mas a leitura de risco e permuta no contexto do terreno já corta ida e volta com o jurídico.",
    highlight: "Contexto de domínio",
    author: "Analista de Viabilidade",
    role: "Time de estudos",
    company: "Programa piloto",
    city: "Curitiba, PR",
    size: "sm",
  },
  {
    id: "3",
    quote:
      "O pipeline deixa claro quem está com a oportunidade. Menos terreno perdido entre WhatsApp e planilha compartilhada.",
    highlight: "Carteira legível",
    author: "Sócio de incorporação",
    role: "Gestão de prospecção",
    company: "Avaliação guiada",
    city: "Porto Alegre, RS",
    size: "sm",
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Os 7 dias grátis têm todas as funcionalidades do plano?",
    answer:
      "Sim. Os 7 dias grátis ativam exatamente os módulos e limites do plano escolhido — sem restrições artificiais. SIG_IA (chat) e comitê entram no Master e no Pro; legalização, deal room e IA avançada ficam no Pro. Você precisa escolher um plano e informar dados de pagamento no cadastro — a cobrança só ocorre após o 7º dia, e você pode cancelar antes sem custo algum.",
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
      "Sim. A exportação em Excel está disponível em todos os planos; o PDF entra a partir do Básico. Após o cancelamento, seus dados ficam disponíveis por 30 dias para exportação.",
  },
  {
    question: "O pagamento é seguro? Quais formas de pagamento são aceitas?",
    answer:
      "Sim. Todos os pagamentos são processados pelo Stripe, líder mundial em infraestrutura de pagamentos. Seus dados de cartão nunca passam pelos nossos servidores — tudo é criptografado e tokenizado diretamente pelo Stripe. Aceitamos cartões de crédito das bandeiras Visa, Mastercard e American Express, além de boleto bancário.",
  },
]

export const FAQ_COPY = {
  eyebrow: "Antes de avançar",
  titleLine1: "As perguntas difíceis.",
  titleLine2: "Respondidas sem rodeio.",
  description:
    "Segurança, migração, cobrança e operação explicadas para sua equipe avaliar o SIGAPP com o mesmo critério usado em um terreno.",
  panelLabel: "Central de decisão",
  panelCount: "12 tópicos operacionais",
  cta: "Falar com vendas",
  ctaNote: "Se o seu cenário não estiver aqui, abrimos juntos.",
}

/** @deprecated use DOMAIN_STRIP — mantido vazio para evitar import quebrado */
export const CLIENT_LOGOS: string[] = []

export type HowItWorksStep = {
  icon: string
  stage: string
  title: string
  description: string
  result: string
}

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    icon: "MapPin",
    stage: "Entrada",
    title: "Abra o dossiê do terreno",
    description:
      "Endereço, dono, documentos e fotos na mesma base. Importe a carteira atual por Excel ou CSV se precisar.",
    result: "Oportunidade centralizada",
  },
  {
    icon: "Calculator",
    stage: "Análise",
    title: "Feche o cenário de viabilidade",
    description:
      "Parâmetros do produto viram DRE, fluxo, TIR, VPL e Payback — prontos para a mesa do comitê.",
    result: "Cenário comparável",
  },
  {
    icon: "Handshake",
    stage: "Governança",
    title: "Aprove e negocie com histórico",
    description:
      "Parecer, proposta e trilha de alteração no mesmo pipeline. Ninguém reabre a planilha paralela.",
    result: "Decisão registrada",
  },
  {
    icon: "FileCheck",
    stage: "Execução",
    title: "Conduza a legalização",
    description:
      "Documentação, escritura e registro com status no dossiê — do parecer ao cartório sem mudar de ferramenta.",
    result: "Registro acompanhado",
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

export const COMPARISON_COLUMNS = [
  { key: "sigapp" as const, label: "SIGAPP", note: "Contexto nativo" },
  { key: "planilha" as const, label: "Planilha", note: "Cálculo isolado" },
  { key: "erp" as const, label: "ERP genérico", note: "Processo adaptado" },
]

export const COMPARISON_COPY = {
  eyebrow: "Decisão lado a lado",
  titleLine1: "Não é sobre ter mais telas.",
  titleLine2: "É sobre fechar o ciclo.",
  description:
    "Planilha calcula. ERP registra. O SIGAPP conecta território, viabilidade e governança na mesma linha de decisão.",
  tableLabel: "Matriz de aderência operacional",
  scrollHint: "Deslize para comparar todos os cenários",
  scrollRegionLabel: "Tabela comparativa com rolagem horizontal",
  resourceLabel: "Capacidade de decisão",
  availableLabel: "Nativo",
  unavailableLabel: "Ausente",
  cta: "Construir o caso de negócio",
  ctaNote:
    "Compare o fluxo atual da sua equipe com uma operação territorial centralizada.",
}

export const PAIN_POINTS = [
  {
    icon: "FileSpreadsheet",
    title: "Viabilidade que vive em planilha",
    description:
      "VGV desatualizado, fórmula frágil e versão errada na reunião. O comitê discute o arquivo, não o terreno.",
    signal: "VERSÃO_FINAL_04.xlsx",
    status: "Fonte divergente",
  },
  {
    icon: "FolderX",
    title: "Oportunidade que some no dia a dia",
    description:
      "Contato no WhatsApp, visita no e-mail, parecer na pasta. Sem trilha, o bom lote some e o medíocre ocupa a pauta.",
    signal: "PARECER: onde está?",
    status: "Contexto disperso",
  },
  {
    icon: "BotOff",
    title: "Ferramenta genérica no ofício errado",
    description:
      "Chat e ERP sem CUB, permuta ou INCC forçam a reescrever o caso a cada análise — e o resultado ainda pede planilha.",
    signal: "CUB: não disponível",
    status: "Domínio ausente",
  },
]

export const PROBLEM_COPY = {
  eyebrow: "O custo da fragmentação",
  titleLine1: "Sua operação cresceu.",
  titleLine2: "A decisão ficou fragmentada.",
  description:
    "Quando terreno, viabilidade e parecer vivem em lugares diferentes, contexto vira retrabalho — e cada reunião recomeça a análise.",
  counter: "03 rupturas críticas",
  matrixLabel: "Onde a decisão perde força",
}

export const HOW_IT_WORKS_COPY = {
  eyebrow: "Da entrada ao registro",
  titleLine1: "Um terreno.",
  titleLine2: "Uma rota inteira de decisão.",
  description:
    "Sem implantação eterna nem repasse de contexto entre planilha, comitê e jurídico. Cada etapa avança sobre a mesma oportunidade.",
  routeLabel: "Fluxo operacional sincronizado",
  routeProgress: "04 etapas · 01 dossiê",
  stepLabel: "Etapa",
  cta: "Ver essa jornada em ação",
  ctaNote: "Preferimos um terreno real da sua carteira",
}

export const TESTIMONIALS_COPY = {
  eyebrow: "Notas de campo",
  titleLine1: "A mudança aparece",
  titleLine2: "na conversa da equipe.",
  description:
    "Relatos de quem está testando o fluxo de análise e comitê — sem números inflados nem logos de fachada.",
  recordLabel: "Registro de avaliação",
  contextLabel: "Contexto observado",
  status: "Programa piloto · relatos anonimizados",
}

export const CTA_FINAL_COPY = {
  eyebrow: "Do mapa à decisão",
  titleLine1: "Traga um terreno real.",
  titleLine2: "Veja o fluxo inteiro em ação.",
  description:
    "Mostramos análise, comitê, permissões e rastreabilidade em um cenário próximo da sua operação — não um tour genérico de telas.",
  primaryCta: "Solicitar demonstração",
  secondaryCta: "Falar com vendas",
  panelEyebrow: "Demonstração guiada",
  panelTitle: "Um terreno. O fluxo inteiro.",
  panelDuration: "≈ 40 min",
  panelProgress: "03 pontos · 01 caso real",
  trust: ["Sem fidelidade", "Dados exportáveis", "Suporte em português"],
}

export const DEMO_PAGE = {
  eyebrow: "Demonstração guiada",
  title: "Mostre um terreno. Nós abrimos o dossiê.",
  description:
    "Em cerca de 40 minutos percorremos viabilidade, comitê e legalização com um caso real da sua carteira — ou um cenário próximo da sua operação.",
  formTitle: "Solicitar demonstração",
  formHint:
    "Respondemos em horário comercial. Sem compromisso e sem cadastro obrigatório de cartão.",
  fields: {
    name: "Nome",
    email: "E-mail de trabalho",
    company: "Empresa / incorporadora",
    city: "Cidade",
    role: "Seu papel",
    land: "Terreno ou carteira (opcional)",
    landPlaceholder:
      "Ex.: residencial vertical em SP, 120 un., ou “ainda sem terreno específico”",
    submit: "Enviar solicitação",
    submitting: "Enviando…",
  },
  privacyLabel:
    "Li e aceito a Política de Privacidade para o tratamento dos dados desta solicitação.",
  privacyError:
    "Aceite a Política de Privacidade para enviar a solicitação.",
  roles: [
    "Direção / sócio",
    "Incorporação",
    "Viabilidade / estudos",
    "Jurídico",
    "Operações",
    "Outro",
  ],
  sidePoints: [
    {
      title: "Caso real de preferência",
      text: "Se puder, traga um terreno da carteira. A conversa fica objetiva.",
    },
    {
      title: "Público certo",
      text: "Quem analisa, quem aprova e quem legaliza — juntos ou em rodadas.",
    },
    {
      title: "Sem pitch genérico",
      text: "Mostramos o dossiê, o DRE e a trilha de parecer — não um deck de 40 slides.",
    },
  ],
  successTitle: "Solicitação enviada",
  successBody:
    "Recebemos seus dados. A equipe entra em contato pelo e-mail informado para combinar horário.",
  successSecondary: "Enquanto isso, veja como o fluxo se organiza",
}

export const ABOUT_PAGE = {
  metaTitle: "Sobre — SIGAPP",
  metaDescription:
    "O SIGAPP é a plataforma de dossiê territorial e viabilidade para incorporadoras brasileiras — mapa, DRE, comitê e legalização no mesmo lugar.",
  eyebrow: "Sobre o SIGAPP",
  title: "Feito para quem decide terreno com critério",
  description:
    "Nascemos da rotina de planilha frágil, comitê com abas diferentes e jurídico reabrindo o caso. O SIGAPP é o dossiê único da oportunidade — da prospecção ao registro.",
  location: "Brasil · produto em evolução com times de incorporação",
  missionTitle: "O que estamos construindo",
  missionLead:
    "Um sistema em que analista, comitê e jurídico leem o mesmo terreno — com premissas, DRE e trilha de parecer no mesmo dossiê.",
  missionBody: [
    "A maior parte da viabilidade no Brasil ainda vive em arquivos sem histórico, sem dono claro da premissa e sem caminho auditável até a aprovação. O custo aparece tarde: comitê que discute número errado, lote bom que some no WhatsApp, jurídico que recomeça do zero.",
    "Não queremos “digitalizar o Excel”. Queremos reorganizar o ofício: território legível, cálculo verificável e governança por etapa — com assistente de domínio quando o caso pede contexto, não chatbot genérico.",
  ],
  principles: [
    {
      title: "Precisão antes de teatro",
      description:
        "Número de viabilidade precisa ser legível e discutível. Preferimos clareza a dashboard enfeitado.",
    },
    {
      title: "Um dossiê, várias funções",
      description:
        "Analista sobe o cenário; comitê lê o parecer; jurídico segue a legalização — sem repasse manual de contexto.",
    },
    {
      title: "Dados no perímetro da empresa",
      description:
        "Isolamento por empresa, papéis e exportação. O dossiê é de quem incorpora — não um ativo de treino genérico.",
    },
    {
      title: "IA de ofício, não de moda",
      description:
        "Assistente só vale se entende CUB, permuta, INCC e o caso aberto. Caso contrário, é ruído.",
    },
  ],
  stageTitle: "Onde estamos",
  stageBody:
    "Estamos em evolução ativa com times de incorporação em avaliação guiada. Preferimos demonstração com terreno real a prometer escala que ainda não é o foco da conversa.",
  stagePoints: [
    "Motor de viabilidade com parâmetros do mercado BR",
    "Pipeline do terreno ao registro",
    "Comitê e trilha de parecer no dossiê",
    "Assistente de incorporação no contexto do projeto",
  ],
  ctaTitle: "Quer ver o dossiê com o seu terreno?",
  ctaDescription:
    "Agende uma demonstração guiada — sem contagem inflada de clientes e sem tour genérico de telas.",
  ctaPrimary: "Solicitar demonstração",
  ctaSecondary: "Falar com a equipe",
}

// Páginas pillar de soluções — conteúdo SEO e conversão
export type SolutionPage = {
  slug: string
  title: string
  seoTitle: string
  metaDescription: string
  eyebrow: string
  description: string
  problemTitle: string
  problemLead: string
  problemBody: string[]
  outcomesTitle: string
  outcomes: Array<{ title: string; description: string }>
  howTitle: string
  howSteps: Array<{ title: string; description: string }>
  relatedBlogSlugs: string[]
  ctaTitle: string
  ctaDescription: string
}

export const SOLUTION_PAGES: SolutionPage[] = [
  {
    slug: "viabilidade-imobiliaria",
    title: "Software de viabilidade imobiliária para incorporadoras",
    seoTitle: "Viabilidade imobiliária para incorporadoras",
    metaDescription:
      "Calcule DRE, TIR, VPL e cenários de terreno no mesmo dossiê. Software de viabilidade imobiliária para incorporadoras brasileiras — sem planilha paralela.",
    eyebrow: "Solução · Viabilidade",
    description:
      "Do terreno ao número que o comitê discute: premissas, fluxo de caixa, indicadores e versões auditáveis em um único dossiê de viabilidade.",
    problemTitle: "O problema",
    problemLead: "A planilha decide o projeto — e quase ninguém confia nela.",
    problemBody: [
      "Estudos de viabilidade ainda vivem em arquivos soltos, com fórmulas copiadas, INCC no período errado e abas diferentes para cada área. No comitê, o debate vira “qual versão é a certa?” em vez de “este terreno vale a pena?”.",
      "O SIGAPP centraliza o estudo: parâmetros do mercado brasileiro (CUB, permuta, impostos, curva de vendas), DRE legível e indicadores (TIR, VPL, ROI, payback) com histórico de cenário — para analista e diretoria lerem o mesmo número.",
    ],
    outcomesTitle: "O que muda na operação",
    outcomes: [
      {
        title: "Um motor, vários cenários",
        description:
          "Compare premissas lado a lado sem clonar planilhas. Cada versão fica registrada no dossiê do terreno.",
      },
      {
        title: "DRE que o comitê entende",
        description:
          "Receitas, custos e margens no formato da decisão — não só na lógica da célula.",
      },
      {
        title: "Indicadores no contexto do terreno",
        description:
          "TIR, VPL e payback ligados ao mapa, à tipologia e à trilha de aprovação.",
      },
      {
        title: "Menos retrabalho entre áreas",
        description:
          "Viabilidade, comercial e jurídico partem do mesmo caso — sem reexportar Excel a cada rodada.",
      },
    ],
    howTitle: "Como a viabilidade entra no fluxo",
    howSteps: [
      {
        title: "Abra o dossiê do terreno",
        description:
          "Cadastre a oportunidade com localização, área e premissas iniciais de produto.",
      },
      {
        title: "Modele o cenário",
        description:
          "Ajuste VGV, curva de vendas, obra, permuta e tributos com parâmetros do mercado BR.",
      },
      {
        title: "Leve o parecer ao comitê",
        description:
          "Exporte ou compartilhe o mesmo DRE e a trilha de versão usada na análise.",
      },
    ],
    relatedBlogSlugs: [
      "como-calcular-tir-projetos-imobiliarios",
      "incc-cub-permuta-parametros-viabilidade",
      "digitalizacao-incorporadora-excel-saas",
    ],
    ctaTitle: "Quer ver a viabilidade com o seu terreno?",
    ctaDescription:
      "Agende uma demonstração com um caso da carteira — ou um cenário próximo da sua operação.",
  },
  {
    slug: "comite-de-terrenos",
    title: "Comitê de aprovação de terrenos com trilha auditável",
    seoTitle: "Comitê de aprovação de terrenos",
    metaDescription:
      "Organize o comitê de terrenos com parecer, versões de viabilidade e histórico de decisão. Governança de aprovação para incorporadoras — no mesmo dossiê.",
    eyebrow: "Solução · Comitê",
    description:
      "Parecer, número e decisão no mesmo lugar: o comitê deixa de ser reunião de planilhas e vira trilha de aprovação do terreno.",
    problemTitle: "O problema",
    problemLead: "O comitê discute slides. A decisão some no e-mail.",
    problemBody: [
      "Quando cada área chega com seu Excel, o comitê gasta tempo reconciliando premissas em vez de decidir risco e retorno. Depois da reunião, o “aprovado com ressalvas” vira mensagem solta — sem vínculo claro com a versão do estudo.",
      "No SIGAPP, o dossiê carrega o cenário de viabilidade, o parecer e o registro da deliberação. Quem aprova, quem pede ajuste e o que mudou entre versões fica legível para a próxima rodada e para a auditoria interna.",
    ],
    outcomesTitle: "O que o comitê ganha",
    outcomes: [
      {
        title: "Mesma base para todos",
        description:
          "Analista, diretoria e jurídico abrem o mesmo dossiê — com o cenário que será votado.",
      },
      {
        title: "Parecer no contexto do número",
        description:
          "Comentários e ressalvas ficam ligados ao terreno e à versão do estudo, não a um PDF órfão.",
      },
      {
        title: "Histórico de deliberação",
        description:
          "Aprovação, rejeição ou pedido de revisão com rastro — útil para governança e compliance.",
      },
      {
        title: "Handoff limpo para negociação",
        description:
          "O que foi aprovado segue para a etapa seguinte sem reabrir o caso do zero.",
      },
    ],
    howTitle: "Do estudo à deliberação",
    howSteps: [
      {
        title: "Feche o cenário de viabilidade",
        description:
          "Valide premissas e indicadores antes de convocar o comitê.",
      },
      {
        title: "Monte o parecer",
        description:
          "Registre riscos, condições e o que precisa de atenção da diretoria.",
      },
      {
        title: "Delibere e registre",
        description:
          "A decisão fica no dossiê — pronta para negociação ou nova versão do estudo.",
      },
    ],
    relatedBlogSlugs: [
      "estruturar-comite-aprovacao-terrenos",
      "como-calcular-tir-projetos-imobiliarios",
      "digitalizacao-incorporadora-excel-saas",
    ],
    ctaTitle: "Quer ver o fluxo de comitê no dossiê?",
    ctaDescription:
      "Mostre um terreno real ou um caso anônimo. Abrimos o caminho da análise à deliberação.",
  },
  {
    slug: "gestao-territorial",
    title: "Gestão territorial e carteira de terrenos",
    seoTitle: "Gestão territorial para incorporadoras",
    metaDescription:
      "Visualize a carteira de terrenos, oportunidades e status por região. Gestão territorial para incorporadoras — mapa, dossiê e próximos passos no mesmo sistema.",
    eyebrow: "Solução · Território",
    description:
      "A carteira deixa de ser planilha de status: mapa, oportunidade e próximo risco no mesmo dossiê territorial.",
    problemTitle: "O problema",
    problemLead: "O bom terreno some no dia a dia. O mapa vive em outra aba.",
    problemBody: [
      "Prospecção em planilha, mapa no Google, contatos no WhatsApp e viabilidade em arquivo local: a carteira fragmentada esconde prioridade. Quem capta não vê o que o comitê travou; quem decide não vê o que está parado na legalização.",
      "O SIGAPP une leitura territorial e operação: oportunidades por região, status do pipeline e dossiê com o que importa para a próxima decisão — da captação ao registro.",
    ],
    outcomesTitle: "Leitura de carteira com critério",
    outcomes: [
      {
        title: "Carteira visível por região",
        description:
          "Enxergue concentração, gaps e oportunidades no território em que você opera.",
      },
      {
        title: "Status que acompanha o ofício",
        description:
          "Captação, viabilidade, comitê, negociação e legalização no mesmo fluxo — não em colunas genéricas de CRM.",
      },
      {
        title: "Contexto no pin",
        description:
          "Do mapa ao dossiê: área, cenário e pendências sem caçar arquivo.",
      },
      {
        title: "Risco antes do atraso",
        description:
          "Prazos, pendências e próximos passos entram na mesma leitura da carteira.",
      },
    ],
    howTitle: "Território no fluxo da decisão",
    howSteps: [
      {
        title: "Mapeie a oportunidade",
        description:
          "Registre o terreno com localização e dados cadastrais essenciais.",
      },
      {
        title: "Conecte ao dossiê",
        description:
          "Vincule viabilidade, contatos e documentos ao mesmo caso territorial.",
      },
      {
        title: "Priorize o pipeline",
        description:
          "Use status e região para decidir o que avança, o que espera e o que sai da carteira.",
      },
    ],
    relatedBlogSlugs: [
      "digitalizacao-incorporadora-excel-saas",
      "estruturar-comite-aprovacao-terrenos",
      "multi-tenancy-dados-incorporadoras",
    ],
    ctaTitle: "Quer ver a carteira no mapa do dossiê?",
    ctaDescription:
      "Em demonstração, abrimos a leitura territorial com um cenário próximo da sua operação.",
  },
]

export const SOLUTIONS_HUB = {
  seoTitle: "Soluções para incorporadoras",
  metaDescription:
    "Viabilidade imobiliária, comitê de terrenos e gestão territorial no mesmo dossiê. Conheça as soluções do SIGAPP para incorporadoras brasileiras.",
  eyebrow: "Soluções",
  title: "Três frentes. Um dossiê de decisão.",
  description:
    "Viabilidade, comitê e território não são módulos isolados — são etapas do mesmo ofício. Escolha a frente que mais dói hoje; o restante do fluxo já está no caminho.",
  ctaTitle: "Prefere ver o fluxo completo?",
  ctaDescription:
    "Solicite uma demonstração guiada com um terreno da carteira — ou um caso anônimo.",
}

export function getSolutionBySlug(slug: string): SolutionPage | undefined {
  return SOLUTION_PAGES.find((page) => page.slug === slug)
}
