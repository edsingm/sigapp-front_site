import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, WifiOff } from "lucide-react"

import { SignupBrand } from "@/components/landing/ui/SignupBrand"
import { fetchPlans, type ApiPlan } from "@/lib/api"
import { SignupForm } from "@/components/landing/client/SignupForm"
import { SignupStatus } from "@/components/landing/client/SignupStatus"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Criar conta",
    description:
      "Crie sua conta no SIGAPP e comece com 7 dias grátis. Calcule viabilidade de incorporação com precisão de engenharia.",
    path: "/cadastro",
  }),
  robots: { index: false, follow: false },
}

// Esta rota depende da API interna, indisponível durante o build do container.
export const dynamic = "force-dynamic"

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
      <main className="signup-unavailable-stage">
        <div className="signup-status-grid" aria-hidden="true" />
        <header>
          <SignupBrand tone="on-dark" />
          <span>Ativação indisponível</span>
        </header>

        <section aria-labelledby="signup-unavailable-title">
          <span>
            <WifiOff aria-hidden="true" />
          </span>
          <p>Conexão com os planos</p>
          <h1 id="signup-unavailable-title">
            O cadastro está temporariamente pausado.
          </h1>
          <p>
            Não conseguimos carregar os planos agora. Aguarde alguns instantes e
            tente novamente; nenhum dado foi enviado.
          </p>
          <Link href="/" className="signup-status-action">
            <ArrowLeft aria-hidden="true" />
            Voltar ao site
          </Link>
        </section>

        <footer>
          <span>Serviço monitorado</span>
          <strong>SIGAPP / Cadastro</strong>
        </footer>
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
