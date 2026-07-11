import Link from "next/link"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { PricingToggle } from "@/components/landing/client/PricingToggle"
import { PricingFeatureMatrix } from "@/components/landing/ui/PricingFeatureMatrix"
import { Button } from "@/components/ui/button"
import { LINKS } from "@/lib/landing-data"
import type { PlanConfig } from "@/lib/landing-data"

type PricingSectionProps = {
  plans: PlanConfig[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  const hasPlans = plans.length > 0

  return (
    <section
      id="precos"
      className="relative overflow-hidden border-y border-border bg-background py-16 sm:py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-(--color-brand-navy) sm:h-[42rem]">
        <div className="grain-overlay opacity-[0.065]" />
        <div className="bg-blueprint-grid absolute inset-0 opacity-35" />
        <div className="absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-b from-transparent to-background" />
      </div>
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-10 grid gap-7 md:mb-12 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SectionLabel className="text-secondary">
              Planos e preços
            </SectionLabel>
            <h2 className="section-display text-white">
              Escolha o ritmo certo para sua operação
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-7 lg:justify-self-end">
            <p className="max-w-[55ch] text-white/66 md:text-lg">
              Comece com a capacidade que sua equipe precisa hoje. Todos os
              planos preservam seus dados e permitem evoluir sem reconstruir a
              operação.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              {[
                "Avaliação guiada",
                "Sem fidelidade",
                "Dados sempre exportáveis",
              ].map((chip) => (
                <span
                  key={chip}
                  className="coord rounded-full border border-white/14 bg-white/7 px-3 py-1.5 text-white/62 backdrop-blur"
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
            <Button
              variant="brand"
              className="mt-5"
              nativeButton={false}
              render={<Link href={LINKS.demo} />}
            >
              Solicitar demonstração
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
