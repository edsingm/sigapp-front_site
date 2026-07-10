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
  title: "SIGAPP — Decisões que ganham território",
  description:
    "Dossiê de terreno com viabilidade, DRE, TIR, comitê e legalização para incorporadoras brasileiras — sem planilha paralela.",
  locale: "pt_BR",
}

// Destinos centralizados de CTA — troque NEXT_PUBLIC_APP_URL para apontar a outro ambiente
export const LINKS = {
  signup: "/cadastro",
  login: `${APP_URL}/login`,
  sales:
    "mailto:contato@sigapp.com.br?subject=Falar%20com%20vendas%20%E2%80%94%20SIGAPP",
  demo: "/demonstracao",
  demoEmail:
    "mailto:contato@sigapp.com.br?subject=Agendar%20demonstra%C3%A7%C3%A3o%20%E2%80%94%20SIGAPP",
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
  products: string
  aiBudget: string
  hasAI: boolean
  hasCommittee: boolean
  hasNegotiation: boolean
  hasLegal: boolean
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

// Hero — provas rápidas abaixo dos CTAs
export const HERO_PROOF_ITEMS = [
  { label: "Dossiê", value: "Único por terreno" },
  { label: "Viabilidade", value: "DRE · TIR · VPL" },
  { label: "Governança", value: "Comitê com trilha" },
]

// Hero — copy centralizado (nunca hardcode em seção)
export const HERO_COPY = {
  eyebrow: "Território que vira decisão",
  titleLine1: "O terreno inteiro.",
  titleLine2: "Uma decisão só.",
  description:
    "Mapa, parâmetros, DRE e parecer convergem em um dossiê vivo — para analista, direção e jurídico decidirem sobre o mesmo cenário.",
  primaryCta: "Solicitar demonstração",
  secondaryCta: "Ver como funciona",
  panel: {
    sector: "Parcela em leitura",
    sectorName: "Residencial · Setor Anhanguera",
    coords: "23°30′04″S  46°50′31″W",
    status: "Viável",
    tir: "18,4%",
    area: "12.480 m²",
    vgv: "R$ 28,4M",
    photoAlt:
      "Vista aérea de quarteirões urbanos com lotes e edificações — leitura territorial",
  },
}

export type NavLink = { label: string; href: string }

// Links do menu principal (desktop e mobile)
export const NAV_LINKS: NavLink[] = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Planos", href: "/#precos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Sobre", href: "/sobre" },
]

export type FooterLink = { label: string; href: string }
export type FooterGroup = { group: string; links: FooterLink[] }

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    group: "Produto",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
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

// Métricas operacionais do produto — sem contagem de clientes inventada
export const METRICS: MetricItem[] = [
  { value: "50+", label: "Parâmetros por viabilidade" },
  { value: "5", label: "Etapas no mesmo pipeline" },
  { value: "1", label: "Dossiê por oportunidade" },
  { value: "7", label: "Dias de avaliação guiada" },
]

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
  eyebrow: "Mesa de decisão",
  title: "O que o comitê precisa ver, no mesmo lugar.",
  description:
    "Planta, parâmetros, DRE e trilha de parecer deixam de viver em abas, e-mails e planilhas. O terreno vira um dossiê legível — para quem analisa e para quem aprova.",
  imageSrc: "/images/dossie-mesa.jpg",
  imageAlt:
    "Mesa de trabalho com plantas, mapa cadastral e documentos de análise imobiliária",
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
}

export const PRICING_MATRIX_COPY = {
  eyebrow: "Comparativo completo",
  title: "Veja exatamente o que muda em cada plano",
  description:
    "Limites, governança e capacidade operacional lado a lado para sua equipe decidir com critério.",
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
    id: "products",
    label: "Produtos por viabilidade",
    helper: "Quantidade de produtos imobiliários permitidos",
    kind: "text",
    field: "products",
  },
  {
    id: "ai-budget",
    label: "Orçamento mensal de IA",
    helper: "Budget mensal configurado no plano",
    kind: "text",
    field: "aiBudget",
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

/** @deprecated use DOMAIN_STRIP — mantido vazio para evitar import quebrado */
export const CLIENT_LOGOS: string[] = []

export type HowItWorksStep = {
  icon: string
  title: string
  description: string
}

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    icon: "MapPin",
    title: "Abra o dossiê do terreno",
    description:
      "Endereço, dono, documentos e fotos na mesma base. Importe a carteira atual por Excel ou CSV se precisar.",
  },
  {
    icon: "Calculator",
    title: "Feche o cenário de viabilidade",
    description:
      "Parâmetros do produto viram DRE, fluxo, TIR, VPL e Payback — prontos para a mesa do comitê.",
  },
  {
    icon: "Handshake",
    title: "Aprove e negocie com histórico",
    description:
      "Parecer, proposta e trilha de alteração no mesmo pipeline. Ninguém reabre a planilha paralela.",
  },
  {
    icon: "FileCheck",
    title: "Conduza a legalização",
    description:
      "Documentação, escritura e registro com status no dossiê — do parecer ao cartório sem mudar de ferramenta.",
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
    title: "Viabilidade que vive em planilha",
    description:
      "VGV desatualizado, fórmula frágil e versão errada na reunião. O comitê discute o arquivo, não o terreno.",
  },
  {
    icon: "FolderX",
    title: "Oportunidade que some no dia a dia",
    description:
      "Contato no WhatsApp, visita no e-mail, parecer na pasta. Sem trilha, o bom lote some e o medíocre ocupa a pauta.",
  },
  {
    icon: "BotOff",
    title: "Ferramenta genérica no ofício errado",
    description:
      "Chat e ERP sem CUB, permuta ou INCC forçam a reescrever o caso a cada análise — e o resultado ainda pede planilha.",
  },
]

export const PROBLEM_COPY = {
  eyebrow: "O atrito",
  title: "Incorporar ainda parece uma sequência de planilhas perdidas?",
  description:
    "O mercado avançou. O processo de muitos times ainda depende de arquivo, mensagem e memória.",
}

export const HOW_IT_WORKS_COPY = {
  eyebrow: "Como funciona",
  title: "Do cadastro ao registro, no mesmo dossiê",
  description:
    "Sem implantação eterna nem repasse de contexto entre planilha, comitê e jurídico. Cada etapa avança sobre a mesma oportunidade.",
}

export const TESTIMONIALS_COPY = {
  eyebrow: "Em avaliação com times de incorporação",
  title: "O que muda quando o dossiê é um só",
  description:
    "Relatos de quem está testando o fluxo de análise e comitê — sem números inflados nem logos de fachada.",
}

export const CTA_FINAL_COPY = {
  eyebrow: "Do mapa à decisão · fluxo da sua equipe",
  title: "Leve um terreno real para a demonstração.",
  description:
    "Mostramos análise, comitê, permissões e rastreabilidade em um cenário próximo da sua operação — não um tour genérico de telas.",
  primaryCta: "Solicitar demonstração",
  secondaryCta: "Falar com vendas",
  trust: "Sem fidelidade · dados exportáveis · suporte em português",
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
