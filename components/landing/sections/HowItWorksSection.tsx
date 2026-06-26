import { HOW_IT_WORKS, LINKS } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Calculator,
  Handshake,
  FileCheck,
  ArrowRight,
} from "lucide-react"

const ICON_MAP = {
  MapPin,
  Calculator,
  Handshake,
  FileCheck,
}

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-muted/30 py-24 md:py-32">
      <div className="container-landing">
        <ScrollReveal
          stagger
          className="mb-16 grid gap-6 lg:grid-cols-12 lg:items-end md:mb-24"
        >
          <div className="flex flex-col gap-5 lg:col-span-5">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Do cadastro ao registro imobiliario em 4 passos
            </h2>
          </div>
          <p className="max-w-[52ch] text-pretty text-muted-foreground md:text-lg lg:col-span-7 lg:pb-1">
            Sem implantacao demorada nem repasse de contexto entre planilha,
            comite e juridico. Cada etapa avanca sobre a mesma oportunidade.
          </p>
        </ScrollReveal>

        {/* Linha de decisão — rota conectando os passos */}
        <ScrollReveal stagger className="grid gap-10 md:grid-cols-4 md:gap-6">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICON_MAP[step.icon as keyof typeof ICON_MAP]
            return (
              <div
                key={`${step.title}-${i}`}
                className="relative flex flex-col items-center gap-4 text-center"
              >
                {/* Rota entre os nós (md+) */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-7 left-1/2 hidden h-px w-full border-t border-dashed border-primary/30 md:block"
                  />
                )}
                <div className="relative z-10">
                  <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-card text-primary shadow-[0_12px_24px_-18px_rgba(11,30,57,0.45)] ring-4 ring-muted/30">
                    {Icon && <Icon className="size-6" strokeWidth={1.5} />}
                  </span>
                  <span className="data-mono absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-card text-[11px] font-bold text-primary ring-1 ring-border">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </ScrollReveal>

        <div className="mt-18 flex flex-col items-center gap-3 md:mt-24">
          <Button
            variant="brand"
            size="lg"
            className="group/cta h-13 gap-2 rounded-full pr-2 pl-6 text-base font-semibold"
            nativeButton={false}
            render={
              <a
                href={LINKS.demo}
                data-analytics-event="demo_request"
                data-analytics-location="how-it-works"
              />
            }
          >
            Solicitar demonstracao
            <span className="flex size-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <p className="coord text-muted-foreground">
            Veja o fluxo completo com um terreno real
          </p>
        </div>
      </div>
    </section>
  )
}
