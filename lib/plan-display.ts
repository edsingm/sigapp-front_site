import type { ApiPlan } from "@/lib/api"
import { LINKS, type PlanConfig } from "@/lib/landing-data"

function nestedBoolean(source: Record<string, unknown>, path: string): boolean {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined
    return (current as Record<string, unknown>)[key]
  }, source)

  return value === true
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
  if (!value || value <= 0) return "Sem armazenamento extra"
  return `${value} GB`
}

function formatAiBudget(value: number | undefined) {
  if (value === -1) return "Ilimitado"
  if (!value || value <= 0) return "Não incluso"
  return `US$ ${value}/mês`
}

export function planFeatureBullets(
  plan: Pick<ApiPlan, "features" | "limits">
): string[] {
  const bullets: string[] = []

  if (nestedBoolean(plan.features, "prospection")) {
    bullets.push("Prospecção de terrenos")
  }

  if (nestedBoolean(plan.features, "dashboard.funnel")) {
    bullets.push("Dashboard completo com funil e VGV")
  } else if (nestedBoolean(plan.features, "dashboard.enabled")) {
    bullets.push("Dashboard operacional")
  }

  if (nestedBoolean(plan.features, "viabilities.cash_flow")) {
    bullets.push("DRE e fluxo de caixa")
  } else if (nestedBoolean(plan.features, "viabilities.dre")) {
    bullets.push("Viabilidade com DRE")
  } else if (nestedBoolean(plan.features, "viabilities.summary")) {
    bullets.push("Resumo de viabilidade")
  }

  if (nestedBoolean(plan.features, "ai")) {
    bullets.push("SIG_IA conversacional")
  }

  if (nestedBoolean(plan.features, "committee")) {
    bullets.push("Comitê de revisão")
  }

  if (nestedBoolean(plan.features, "negotiation")) {
    bullets.push("Gestão de negociações")
  }

  if (nestedBoolean(plan.features, "legalizations")) {
    bullets.push("Legalização end-to-end")
  }

  if (nestedBoolean(plan.features, "projects_room")) {
    bullets.push("Sala de projetos")
  }

  if (nestedBoolean(plan.features, "exports.pdf")) {
    bullets.push("Exportação PDF e Excel")
  } else if (nestedBoolean(plan.features, "exports.excel")) {
    bullets.push("Exportação Excel")
  }

  if (bullets.length < 5 && nestedBoolean(plan.features, "territorial_base")) {
    bullets.push("Regionais e base territorial")
  }

  return bullets.slice(0, 5)
}

export function mapApiPlanToLandingPlan(plan: ApiPlan): PlanConfig {
  return {
    id: plan.slug,
    name: plan.name,
    tagline: plan.description ?? "Plano SIGAPP",
    monthlyPrice: plan.price,
    annualPrice: Math.round(plan.price * 0.8),
    users: formatLimit(plan.limits.users, "usuário", "usuários"),
    terrenos: formatLimit(plan.limits.terrenos, "terreno", "terrenos"),
    products: formatLimit(plan.limits.products, "produto", "produtos"),
    storage: formatStorage(plan.limits.storage_gb),
    aiBudget: formatAiBudget(plan.limits.ai_budget),
    hasAI: nestedBoolean(plan.features, "ai"),
    hasCommittee: nestedBoolean(plan.features, "committee"),
    hasNegotiation: nestedBoolean(plan.features, "negotiation"),
    hasLegal: nestedBoolean(plan.features, "legalizations"),
    features: planFeatureBullets(plan),
    highlighted: plan.is_popular,
    cta: "Começar avaliação",
    ctaHref: `${LINKS.signup}?plan=${encodeURIComponent(plan.slug)}`,
  }
}

export function mapApiPlansToLandingPlans(plans: ApiPlan[]): PlanConfig[] {
  return plans.map(mapApiPlanToLandingPlan)
}
