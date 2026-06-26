import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, ShieldCheck } from "lucide-react"
import { LINKS } from "@/lib/landing-data"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { CadastralMapBackdrop } from "@/components/landing/ui/CadastralMapBackdrop"

export function CTAFinalSection() {
  return (
    <section id="cta-final" className="py-24 md:py-32">
      <div className="container-landing">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0B1E39] px-6 py-20 ring-1 ring-white/10 sm:px-12 md:py-28">
          <CadastralMapBackdrop className="brand-map--dark opacity-90" />
          <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <ScrollReveal
            stagger
            className="relative flex flex-col items-center gap-7 text-center"
          >
            <span className="eyebrow eyebrow--center text-secondary">
              Do mapa à decisão · Fluxo real da sua equipe
            </span>

            <h2 className="font-heading text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance text-white sm:text-5xl md:text-6xl">
              Leve um terreno real para a demonstração.
            </h2>

            <p className="max-w-[45ch] text-lg leading-relaxed text-white/80">
              Mostramos análise, comitê, permissões e rastreabilidade em um
              cenário territorial próximo da sua operação.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group/cta h-13 gap-2 rounded-full bg-primary pr-2 pl-6 text-base font-semibold text-white shadow-[0_14px_40px_-12px_rgba(46,107,255,0.7)] hover:bg-primary/90 active:scale-[0.98]"
                nativeButton={false}
                render={
                  <a
                    href={LINKS.demo}
                    data-analytics-event="demo_request"
                    data-analytics-location="cta-final"
                  />
                }
              >
                Solicitar demonstração
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px">
                  <ArrowRight className="size-4" />
                </span>
              </Button>
              <Button
                variant="ghost-white"
                size="lg"
                className="h-13 gap-2.5 rounded-full border border-white/16 bg-white/6 px-6 text-base"
                nativeButton={false}
                render={
                  <a
                    href={LINKS.sales}
                    data-analytics-event="sales_contact_click"
                    data-analytics-location="cta-final"
                  />
                }
              >
                <CalendarDays className="size-4" />
                Construir caso de negócio
              </Button>
            </div>

            <p className="text-sm text-white/72">
              Demonstração guiada · Suporte em português · Dados e integrações
              em contexto
            </p>

            <div className="flex items-center gap-1.5 text-xs text-white/68">
              <ShieldCheck className="size-3.5 shrink-0 text-secondary" />
              <span>
                Permissões, histórico e arquitetura apresentados na mesma
                conversa comercial
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
