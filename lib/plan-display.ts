import type { ApiPlan } from "@/lib/api"
import { LINKS, type PlanConfig } from "@/lib/landing-data"

/**
 * Resolve um valor de feature no formato aninhado do backend.
 * Ex.: `ai` pode vir como `true` ou `{ enabled: true, contextual: false }`.
 * Espelha `PlanMatrixService::resolveFeatureValue` no Laravel.
 */
function resolveFeatureValue(
  source: Record<string, unknown>,
  path: string
): unknown {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined
    return (current as Record<string, unknown>)[key]
  }, source)

  if (value && typeof value === "object" && "enabled" in value) {
    return (value as { enabled: unknown }).enabled
  }

  return value
}

function nestedBoolean(source: Record<string, unknown>, path: string): boolean {
  return resolveFeatureValue(source, path) === true
}

function formatLimit(
  value: number | undefined,
  singular: string,
  plural: string
) {
  if (value === -1) return "Ilimitado"
  if (!value || value <= 0) return "Não incluso"
  return value === 1 ? `1 ${singular}` : `${value} ${plural}`
}

function formatStorage(value: number | undefined) {
  if (value === -1) return "Ilimitado"
  if (!value || value <= 0) return "Não incluso"
  return `${value} GB`
}

function formatAiBudget(value: number | undefined, hasAi: boolean) {
  if (!hasAi) return "Não incluso"
  if (value === -1) return "Ilimitado"
  if (!value || value <= 0) return "Não incluso"
  return `US$ ${value}/mês`
}

function shortPlanName(name: string): string {
  return name.replace(/^SIG\s*[-–—]\s*/i, "").trim() || name
}

/** Nível de viabilidade alinhado ao recorte A (`viabilities.*`). */
function formatViabilityLevel(features: Record<string, unknown>): string {
  if (hasCompleteViability(features)) {
    return "Completa · fluxo, gráficos e cenários"
  }

  if (hasKpiViability(features)) {
    return "DRE, KPIs e premissas"
  }

  if (hasCashFlowViability(features)) {
    return "DRE + fluxo de caixa"
  }

  if (hasDreViability(features)) {
    return "Resumo e DRE"
  }

  if (nestedBoolean(features, "viabilities.enabled")) {
    return "Habilitada"
  }

  return "Não incluso"
}

/** Nível de dashboard alinhado aos entitlements `dashboard.*` (texto curto para a matriz). */
function formatDashboardLevel(features: Record<string, unknown>): string {
  if (
    nestedBoolean(features, "dashboard.funnel") ||
    nestedBoolean(features, "dashboard.vgv")
  ) {
    return "Completo · funil e VGV"
  }

  if (nestedBoolean(features, "dashboard.overview")) {
    return "Visão geral"
  }

  if (nestedBoolean(features, "dashboard.enabled")) {
    return "Básico"
  }

  return "Não incluso"
}

/** Progressão de SIG_IA: ausente → conversacional → avançada e contextual. */
function formatAiLevel(features: Record<string, unknown>): string {
  const advanced = nestedBoolean(features, "ai.advanced")
  const contextual = nestedBoolean(features, "ai.contextual")

  if (advanced && contextual) return "Avançada e contextual"
  if (contextual) return "Contextual"
  if (advanced) return "Avançada"
  if (nestedBoolean(features, "ai")) return "Conversacional"

  return "Não incluso"
}

function formatAiLabel(features: Record<string, unknown>): string | null {
  if (!nestedBoolean(features, "ai")) return null

  const advanced = nestedBoolean(features, "ai.advanced")
  const contextual = nestedBoolean(features, "ai.contextual")

  if (advanced && contextual) return "SIG_IA avançada e contextual"
  if (contextual) return "SIG_IA contextual"
  if (advanced) return "SIG_IA avançada"
  return "SIG_IA conversacional"
}

/**
 * Posicionamento comercial do plano a partir dos entitlements.
 * Recorte A: Broker (captação) → Básico (análise) → Master (decisão) → Pro (ciclo).
 */
function formatPlanHighlight(features: Record<string, unknown>): string {
  const hasFullOps =
    nestedBoolean(features, "negotiation") &&
    (nestedBoolean(features, "projects.enabled") ||
      nestedBoolean(features, "projects_room"))

  if (hasFullOps) {
    return "Operação completa sem teto de uso"
  }

  if (
    nestedBoolean(features, "committee") &&
    nestedBoolean(features, "negotiation") &&
    nestedBoolean(features, "ai")
  ) {
    return "Comitê, negociação e SIG_IA"
  }

  if (
    (nestedBoolean(features, "viabilities.dre") ||
      nestedBoolean(features, "viabilities.kpis")) &&
    !nestedBoolean(features, "viabilities.cash_flow")
  ) {
    return "Viabilidade com DRE e KPIs para times enxutos"
  }

  if (
    nestedBoolean(features, "prospection") &&
    !nestedBoolean(features, "viabilities.enabled")
  ) {
    return "Captação individual de terrenos"
  }

  return "Plano SIGAPP"
}

/** Master/Pro: fluxo + gráficos. Básico tem KPIs/premissas sem esse salto. */
function hasCompleteViability(features: Record<string, unknown>): boolean {
  return (
    nestedBoolean(features, "viabilities.charts") &&
    nestedBoolean(features, "viabilities.cash_flow")
  )
}

function hasKpiViability(features: Record<string, unknown>): boolean {
  return (
    nestedBoolean(features, "viabilities.kpis") ||
    nestedBoolean(features, "viabilities.premises")
  )
}

function hasCashFlowViability(features: Record<string, unknown>): boolean {
  return (
    nestedBoolean(features, "viabilities.cash_flow") ||
    nestedBoolean(features, "viabilities.comercial")
  )
}

function hasDreViability(features: Record<string, unknown>): boolean {
  return (
    nestedBoolean(features, "viabilities.dre") ||
    nestedBoolean(features, "viabilities.summary")
  )
}

function hasFunnelDashboard(features: Record<string, unknown>): boolean {
  return (
    nestedBoolean(features, "dashboard.funnel") ||
    nestedBoolean(features, "dashboard.vgv")
  )
}

function hasProjects(features: Record<string, unknown>): boolean {
  return (
    nestedBoolean(features, "projects.enabled") ||
    nestedBoolean(features, "projects_room")
  )
}

/**
 * Pacote base do funil (Broker): o que o plano de entrada entrega sozinho.
 */
function baseTierFeatures(features: Record<string, unknown>): string[] {
  const items: string[] = []

  if (nestedBoolean(features, "prospection")) {
    items.push("Prospecção de terrenos")
  }

  if (nestedBoolean(features, "dashboard.enabled")) {
    items.push("Dashboard operacional")
  }

  if (nestedBoolean(features, "territorial_base")) {
    items.push("Regionais e base territorial")
  }

  if (nestedBoolean(features, "collaboration.tasks")) {
    items.push("Tarefas e inbox operacional")
  }

  if (nestedBoolean(features, "exports.excel")) {
    items.push("Exportação Excel")
  }

  return items
}

/**
 * O que o plano atual adiciona em relação ao plano imediatamente inferior.
 * Modelo comercial: "Tudo do X, mais: …"
 */
function addedTierFeatures(
  current: Record<string, unknown>,
  previous: Record<string, unknown>
): string[] {
  const items: string[] = []

  if (
    nestedBoolean(current, "prospection.comparison") &&
    !nestedBoolean(previous, "prospection.comparison")
  ) {
    items.push("Comparação de oportunidades")
  }

  // Progressão de viabilidade (só o salto deste tier)
  if (hasCompleteViability(current) && !hasCompleteViability(previous)) {
    items.push("Viabilidade completa com fluxo, gráficos e cenários")
  } else if (hasKpiViability(current) && !hasKpiViability(previous)) {
    items.push("Viabilidade com DRE, KPIs e premissas")
  } else if (hasCashFlowViability(current) && !hasCashFlowViability(previous)) {
    items.push("DRE, comercial e fluxo de caixa")
  } else if (hasDreViability(current) && !hasDreViability(previous)) {
    items.push("Viabilidade com DRE")
  }

  if (
    nestedBoolean(current, "viabilities.scenarios") &&
    !nestedBoolean(previous, "viabilities.scenarios") &&
    !hasCompleteViability(current)
  ) {
    items.push("Cenários de viabilidade")
  }

  // Progressão de dashboard
  if (hasFunnelDashboard(current) && !hasFunnelDashboard(previous)) {
    items.push("Dashboard com funil e VGV")
  } else if (
    nestedBoolean(current, "dashboard.overview") &&
    !nestedBoolean(previous, "dashboard.overview")
  ) {
    items.push("Dashboard com visão geral")
  }

  // IA: chat no Master; avançada/contextual no Pro
  if (nestedBoolean(current, "ai") && !nestedBoolean(previous, "ai")) {
    items.push("SIG_IA conversacional")
  }
  if (
    (nestedBoolean(current, "ai.advanced") &&
      !nestedBoolean(previous, "ai.advanced")) ||
    (nestedBoolean(current, "ai.contextual") &&
      !nestedBoolean(previous, "ai.contextual"))
  ) {
    items.push("SIG_IA avançada e contextual")
  }

  if (
    nestedBoolean(current, "committee") &&
    !nestedBoolean(previous, "committee")
  ) {
    items.push("Comitê de revisão")
  }

  if (
    nestedBoolean(current, "legalizations") &&
    !nestedBoolean(previous, "legalizations")
  ) {
    items.push("Legalização end-to-end")
  }

  if (
    nestedBoolean(current, "negotiation") &&
    !nestedBoolean(previous, "negotiation")
  ) {
    items.push("Gestão de negociações")
  }

  if (
    nestedBoolean(current, "negotiation.deal_room") &&
    !nestedBoolean(previous, "negotiation.deal_room")
  ) {
    items.push("Deal room de negociação")
  }

  if (hasProjects(current) && !hasProjects(previous)) {
    items.push("Sala de projetos e planejamento")
  }

  if (
    nestedBoolean(current, "documents.intelligence") &&
    !nestedBoolean(previous, "documents.intelligence")
  ) {
    items.push("Documentos inteligentes")
  }

  if (
    nestedBoolean(current, "exports.pdf") &&
    !nestedBoolean(previous, "exports.pdf")
  ) {
    items.push("Exportação PDF")
  }

  return items
}

/**
 * Lista completa do que o plano entrega (para signup e textos longos).
 * No card, usamos o modelo cumulativo (base + deltas).
 */
export function planFeatureBullets(
  plan: Pick<ApiPlan, "features" | "limits">
): string[] {
  const features = plan.features
  const bullets: string[] = []

  if (nestedBoolean(features, "prospection")) {
    bullets.push(
      nestedBoolean(features, "prospection.comparison")
        ? "Prospecção com comparação de oportunidades"
        : "Prospecção de terrenos"
    )
  }

  if (hasCompleteViability(features)) {
    bullets.push("Viabilidade completa com fluxo, gráficos e cenários")
  } else if (hasKpiViability(features)) {
    bullets.push("Viabilidade com DRE, KPIs e premissas")
  } else if (hasCashFlowViability(features)) {
    bullets.push("DRE, comercial e fluxo de caixa")
  } else if (hasDreViability(features)) {
    bullets.push("Viabilidade com DRE")
  }

  if (hasFunnelDashboard(features)) {
    bullets.push("Dashboard completo com funil e VGV")
  } else if (nestedBoolean(features, "dashboard.overview")) {
    bullets.push("Dashboard com visão geral")
  } else if (nestedBoolean(features, "dashboard.enabled")) {
    bullets.push("Dashboard operacional")
  }

  const aiLabel = formatAiLabel(features)
  if (aiLabel) {
    bullets.push(aiLabel)
  }

  if (nestedBoolean(features, "committee")) {
    bullets.push("Comitê de revisão")
  }

  if (nestedBoolean(features, "negotiation.deal_room")) {
    bullets.push("Deal room de negociação")
  } else if (nestedBoolean(features, "negotiation")) {
    bullets.push("Gestão de negociações")
  }

  if (nestedBoolean(features, "legalizations")) {
    bullets.push("Legalização end-to-end")
  }

  if (hasProjects(features)) {
    bullets.push("Sala de projetos e planejamento")
  }

  if (nestedBoolean(features, "documents.intelligence")) {
    bullets.push("Documentos inteligentes")
  }

  if (nestedBoolean(features, "exports.pdf")) {
    bullets.push("Exportação PDF e Excel")
  } else if (nestedBoolean(features, "exports.excel")) {
    bullets.push("Exportação Excel")
  }

  if (bullets.length < 5 && nestedBoolean(features, "territorial_base")) {
    bullets.push("Regionais e base territorial")
  }

  if (bullets.length < 5 && nestedBoolean(features, "collaboration.tasks")) {
    bullets.push("Tarefas e inbox operacional")
  }

  return bullets.slice(0, 8)
}

function mapApiPlanToLandingPlan(
  plan: ApiPlan,
  options: {
    includesFrom: string | null
    features: string[]
  }
): PlanConfig {
  const hasAI = nestedBoolean(plan.features, "ai")

  return {
    id: plan.slug,
    name: plan.name,
    shortName: shortPlanName(plan.name),
    tagline: plan.description ?? "Plano SIGAPP",
    highlight: formatPlanHighlight(plan.features),
    includesFrom: options.includesFrom,
    monthlyPrice: plan.price,
    annualPrice: Math.round(plan.price * 0.8),
    users: formatLimit(plan.limits.users, "usuário", "usuários"),
    terrenos: formatLimit(plan.limits.terrenos, "terreno", "terrenos"),
    products: formatLimit(plan.limits.products, "produto", "produtos"),
    storage: formatStorage(plan.limits.storage_gb),
    aiBudget: formatAiBudget(plan.limits.ai_budget, hasAI),
    viability: formatViabilityLevel(plan.features),
    dashboard: formatDashboardLevel(plan.features),
    aiLevel: formatAiLevel(plan.features),
    hasProspection: nestedBoolean(plan.features, "prospection"),
    hasOpportunityCompare: nestedBoolean(
      plan.features,
      "prospection.comparison"
    ),
    hasScenarios: nestedBoolean(plan.features, "viabilities.scenarios"),
    hasAI,
    hasCommittee: nestedBoolean(plan.features, "committee"),
    hasNegotiation: nestedBoolean(plan.features, "negotiation"),
    hasDealRoom: nestedBoolean(plan.features, "negotiation.deal_room"),
    hasLegal: nestedBoolean(plan.features, "legalizations"),
    hasProjects: hasProjects(plan.features),
    hasDocumentIntelligence: nestedBoolean(
      plan.features,
      "documents.intelligence"
    ),
    hasExportPdf: nestedBoolean(plan.features, "exports.pdf"),
    hasExportExcel: nestedBoolean(plan.features, "exports.excel"),
    features: options.features,
    highlighted: plan.is_popular,
    cta: "Começar avaliação",
    ctaHref: `${LINKS.signup}?plan=${encodeURIComponent(plan.slug)}`,
  }
}

/**
 * Monta os planos no modelo cumulativo comercial (recorte A):
 * Broker (captação) → Básico (análise) → Master (decisão) → Pro (ciclo)
 */
export function mapApiPlansToLandingPlans(plans: ApiPlan[]): PlanConfig[] {
  const ordered = [...plans].sort((a, b) => a.sort_order - b.sort_order)

  return ordered.map((plan, index) => {
    const previous = index > 0 ? ordered[index - 1] : null
    const features = previous
      ? addedTierFeatures(plan.features, previous.features)
      : baseTierFeatures(plan.features)

    return mapApiPlanToLandingPlan(plan, {
      includesFrom: previous ? shortPlanName(previous.name) : null,
      features,
    })
  })
}
