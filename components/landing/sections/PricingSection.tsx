import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { PricingToggle } from "@/components/landing/client/PricingToggle"

export function PricingSection() {
  return (
    <section id="precos" className="py-16 md:py-24">
      <div className="container-landing">
        <div className="mb-12 flex flex-col gap-3 text-center">
          <SectionLabel className="text-center">Planos e preços</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Do corretor autônomo à grande incorporadora
          </h2>
          <p className="mx-auto max-w-[50ch] text-muted-foreground md:text-lg">
            4 planos escaláveis. Trial de 7 dias em todos. Sem cartão de crédito.
          </p>
        </div>

        <PricingToggle />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Sem cartão de crédito · Cancele quando quiser · Dados exportáveis a qualquer momento
        </p>
      </div>
    </section>
  )
}
