import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { PricingToggle } from "@/components/landing/client/PricingToggle"
import { PricingFeatureMatrix } from "@/components/landing/ui/PricingFeatureMatrix"

export function PricingSection() {
  return (
    <section
      id="precos"
      className="relative overflow-hidden border-y border-border/70 bg-[linear-gradient(180deg,var(--background)_0%,var(--color-brand-subtle)_48%,var(--background)_100%)] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute top-32 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 size-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-10 flex flex-col gap-4 text-center md:mb-12"
        >
          <SectionLabel className="text-center">Planos e preços</SectionLabel>
          <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-5xl">
            Um plano para cada estágio da sua operação
          </h2>
          <p className="mx-auto max-w-[56ch] text-muted-foreground md:text-lg">
            Comece com o que sua equipe precisa hoje e evolua sem trocar de
            sistema.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-foreground/75 sm:gap-3 sm:text-sm">
            <span className="rounded-full border border-border bg-card/80 px-3 py-1.5 shadow-sm">
              7 dias grátis
            </span>
            <span className="rounded-full border border-border bg-card/80 px-3 py-1.5 shadow-sm">
              Sem fidelidade
            </span>
            <span className="rounded-full border border-border bg-card/80 px-3 py-1.5 shadow-sm">
              Dados sempre exportáveis
            </span>
          </div>
        </ScrollReveal>

        <PricingToggle />

        <ScrollReveal>
          <PricingFeatureMatrix />
        </ScrollReveal>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Preços em reais · Cancele quando quiser · Suporte em português
        </p>
      </div>
    </section>
  )
}
