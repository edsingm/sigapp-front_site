import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react"
import { LINKS } from "@/lib/landing-data"

export function CTAFinalSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="w-full">
        <div className="relative overflow-hidden bg-primary px-6 py-16 shadow-2xl shadow-primary/25 sm:px-12 sm:py-20 md:py-24">
          {/* Background decoration */}
          <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-[0.12]" />
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-secondary/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-7 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white">
              <span className="size-1.5 rounded-full bg-secondary" />
              7 dias de trial · Sem compromisso
            </span>

            <h2 className="font-heading text-3xl font-black leading-[1.05] tracking-tighter text-white text-balance sm:text-4xl md:text-5xl lg:text-6xl">
              Comece a calcular viabilidade hoje.
            </h2>

            <p className="max-w-[45ch] text-lg leading-relaxed text-white/75">
              Trial completo de 7 dias. Cancele antes do fim e não será cobrado. Dados exportáveis se mudar de ideia.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 bg-white px-6 text-base font-semibold text-primary shadow-sm hover:bg-white/90 active:scale-[0.98]"
                nativeButton={false}
                render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="cta-final" />}
              >
                Criar conta gratuita
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="ghost-white"
                size="lg"
                className="h-12 gap-2 px-6 text-base"
                nativeButton={false}
                render={<a href={LINKS.demo} data-analytics-event="demo_request" data-analytics-location="cta-final" />}
              >
                <CalendarDays className="size-4" />
                Agendar demonstração
              </Button>
            </div>

            <p className="text-sm text-white/55">
              Cancele antes do 7º dia e não paga nada · Suporte em português
            </p>

            <div className="flex items-center gap-1.5 text-xs text-white/45">
              <ShieldCheck className="size-3.5 shrink-0 text-secondary" />
              <span>Pagamento seguro processado via <span className="font-semibold text-secondary">Stripe</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
