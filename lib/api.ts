// Cliente HTTP do backend Laravel central. Todos os endpoints de signup/planos
// ficam sob o domínio central (localhost em dev) e seguem o envelope padrão
// { success, data, message } / { success: false, errors, error }.

function apiBaseUrl(): string {
  const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
  if (!url) throw new Error("API_URL não configurada")
  return url.replace(/\/$/, "")
}

export type ApiPlan = {
  id: number
  name: string
  slug: string
  description: string | null
  price: number
  formatted_price: string
  trial_days: number
  features: Record<string, unknown>
  limits: Record<string, number>
  is_active: boolean
  is_popular: boolean
  sort_order: number
}

type ApiSuccess<T> = { success: true; data: T; message: string }

/** Lista os planos ativos (Server Component / SSR). */
export async function fetchPlans(): Promise<ApiPlan[]> {
  const res = await fetch(`${apiBaseUrl()}/api/v1/plans`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Falha ao carregar planos (${res.status})`)
  const json = (await res.json()) as ApiSuccess<ApiPlan[]>
  return json.data
}

export type SignupPayload = {
  plan_slug: string
  organization_name: string
  slug: string
  admin_name: string
  admin_email: string
  admin_password: string
  accept_usage_contract: boolean
}

export type SignupSuccess = {
  checkout_url: string
  tenant_id: number
  session_id: string
  tenant_slug: string
}

export type SignupResult =
  | { ok: true; data: SignupSuccess }
  | { ok: false; fieldErrors: Record<string, string[]>; message: string }

/**
 * Cria o tenant pendente e devolve a URL de Checkout do Stripe.
 * Erros de validação (422) voltam como fieldErrors sem lançar exceção.
 */
export async function submitSignup(payload: SignupPayload): Promise<SignupResult> {
  let res: Response
  try {
    res = await fetch(`${apiBaseUrl()}/api/v1/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
  } catch {
    return {
      ok: false,
      fieldErrors: {},
      message: "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
    }
  }

  const json = await res.json().catch(() => null)

  if (res.ok && json?.success) {
    return { ok: true, data: json.data as SignupSuccess }
  }

  const fieldErrors = (json?.errors ?? json?.error?.details ?? {}) as Record<string, string[]>
  const message =
    json?.message ?? json?.error?.message ?? "Não foi possível concluir o cadastro. Tente novamente."

  return { ok: false, fieldErrors, message }
}

export type AvailabilityResult = { available: boolean; normalized_subdomain: string }

/** Verifica disponibilidade do subdomínio (slug). */
export async function checkSubdomain(slug: string): Promise<AvailabilityResult | null> {
  try {
    const res = await fetch(
      `${apiBaseUrl()}/api/v1/tenant/subdomain-availability/${encodeURIComponent(slug)}`,
      { headers: { Accept: "application/json" } }
    )
    const json = await res.json()
    return json?.success ? (json.data as AvailabilityResult) : null
  } catch {
    return null
  }
}

export type SignupStatusData = {
  status: string
  payment_status: string
  is_ready: boolean
  tenant_slug: string
}

/** Consulta o status do provisionamento do tenant após o checkout. */
export async function fetchSignupStatus(sessionId: string): Promise<SignupStatusData | null> {
  try {
    const res = await fetch(
      `${apiBaseUrl()}/api/v1/signup/${encodeURIComponent(sessionId)}/status`,
      { headers: { Accept: "application/json" } }
    )
    if (!res.ok) return null
    const json = await res.json()
    return json?.success ? (json.data as SignupStatusData) : null
  } catch {
    return null
  }
}
