import { HOW_IT_WORKS, LINKS } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Button } from "@/components/ui/button"
import { MapPin, Calculator, Handshake, ArrowRight } from "lucide-react"

const ICON_MAP = {
  MapPin,
  Calculator,
  Handshake,
}

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-muted/20 py-18 md:py-28">
      <div className="container-landing">
        <ScrollReveal stagger className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-20">
          <SectionLabel className="text-center">Como funciona</SectionLabel>
          <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            Do cadastro à viabilidade aprovada em 3 passos
          </h2>
          <p className="text-pretty text-muted-foreground md:text-lg">
            Sem implantação demorada, sem consultoria obrigatória. Configure e
            comece a analisar no mesmo dia.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="grid gap-7 md:grid-cols-3 lg:gap-12">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICON_MAP[step.icon as keyof typeof ICON_MAP]
            return (
              <div key={step.title} className="relative flex flex-col gap-3.5 sm:gap-4">
                {/* Linha conectora entre passos (desktop) */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute left-14 right-0 top-6 hidden h-px bg-border md:block" />
                )}
                <div className="relative flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
                    {Icon && <Icon className="size-5" strokeWidth={1.75} />}
                  </span>
                  <span className="font-mono text-sm font-bold text-secondary">
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

        <div className="mt-16 flex flex-col items-center gap-3 md:mt-20">
          <Button
            variant="brand"
            size="lg"
            className="h-12 gap-2 px-6 text-base font-semibold"
            nativeButton={false}
            render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="how-it-works" />}
          >
            Começar trial gratuito
            <ArrowRight className="size-4" />
          </Button>
          <p className="text-sm text-muted-foreground">
            7 dias grátis · Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  )
}
