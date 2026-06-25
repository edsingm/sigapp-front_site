import type { Metadata } from "next"
import Link from "next/link"
import { fetchPlans, type ApiPlan } from "@/lib/api"
import { SignupForm } from "@/components/landing/client/SignupForm"
import { SignupStatus } from "@/components/landing/client/SignupStatus"

export const metadata: Metadata = {
  title: "Criar conta · SIGAPP",
  description:
    "Crie sua conta no SIGAPP e comece com 7 dias grátis. Calcule viabilidade de incorporação com precisão de engenharia.",
  robots: { index: false, follow: false },
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function CadastroPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : undefined
  const success = params.success === "1"
  const cancelled = params.cancelled === "1"
  const planParam = typeof params.plan === "string" ? params.plan : undefined

  // Retorno do Stripe — provisionamento em andamento
  if (success && sessionId) {
    return <SignupStatus sessionId={sessionId} />
  }

  let plans: ApiPlan[] = []
  try {
    plans = await fetchPlans()
  } catch {
    plans = []
  }

  if (plans.length === 0) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-5 text-center">
        <h1 className="font-heading text-xl font-black text-foreground">
          Cadastro temporariamente indisponível
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Não conseguimos carregar os planos no momento. Atualize a página em
          instantes ou tente novamente mais tarde.
        </p>
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Voltar ao site
        </Link>
      </main>
    )
  }

  return (
    <SignupForm
      plans={plans}
      initialPlanSlug={planParam}
      cancelled={cancelled}
    />
  )
}
