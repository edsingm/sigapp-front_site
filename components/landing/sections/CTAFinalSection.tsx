import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays } from "lucide-react"

export function CTAFinalSection() {
  return (
    <section className="overflow-hidden bg-foreground py-24">
      <div className="container-landing relative">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            7 dias de trial · Sem compromisso
          </span>

          <h2 className="font-heading max-w-[16ch] text-4xl font-black tracking-tight text-background md:text-5xl lg:text-6xl">
            Comece a calcular viabilidade hoje.
          </h2>

          <p className="max-w-[45ch] text-lg text-background/60">
            Trial completo de 7 dias. Sem cartão de crédito. Dados exportáveis se mudar de ideia.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="amber"
              size="lg"
              className="h-12 gap-2 px-6 text-base font-semibold"
            >
              Criar conta gratuita
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="ghost-white"
              size="lg"
              className="h-12 gap-2 px-6 text-base"
            >
              <CalendarDays className="size-4" />
              Agendar demonstração
            </Button>
          </div>

          <p className="text-sm text-background/40">
            Sem cartão de crédito · Cancele quando quiser · Suporte em português
          </p>
        </div>
      </div>
    </section>
  )
}
