import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { PricingToggle } from "@/components/landing/client/PricingToggle"
import { PricingFeatureMatrix } from "@/components/landing/ui/PricingFeatureMatrix"
import type { PlanConfig } from "@/lib/landing-data"

type PricingSectionProps = {
  plans: PlanConfig[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  const hasPlans = plans.length > 0

  return (
    <section
      id="precos"
      className="relative overflow-hidden border-y border-border py-24 md:py-32"
    >
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-10 grid gap-6 md:mb-12 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SectionLabel>Planos e preços</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Um plano para cada estágio da sua operação
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-7 lg:justify-self-end">
            <p className="max-w-[56ch] text-muted-foreground md:text-lg">
              Compare capacidade operacional, governança e suporte para escolher
              o ritmo certo da sua equipe hoje sem trocar de sistema amanhã.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                "Avaliação guiada",
                "Sem fidelidade",
                "Dados sempre exportáveis",
              ].map((chip) => (
                <span
                  key={chip}
                  className="coord rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {hasPlans ? (
          <>
            <PricingToggle plans={plans} />

            <ScrollReveal>
              <PricingFeatureMatrix plans={plans} />
            </ScrollReveal>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Preços em reais · Suporte em português · Avaliação no contexto da
              sua operação
            </p>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-raise">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Planos temporariamente indisponíveis
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Não conseguimos carregar os planos do backend agora. Tente
              atualizar a página em instantes ou fale com vendas.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
