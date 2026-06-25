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
    <section id="como-funciona" className="bg-muted/20 py-18 md:py-28">
      <div className="container-landing">
        <ScrollReveal
          stagger
          className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-20"
        >
          <SectionLabel className="text-center">Como funciona</SectionLabel>
          <h2 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
            Do cadastro ao registro imobiliário em 4 passos
          </h2>
          <p className="text-pretty text-muted-foreground md:text-lg">
            Sem implantação demorada, sem consultoria obrigatória. Configure e
            comece a analisar no mesmo dia.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger className="grid gap-7 md:grid-cols-4 lg:gap-12">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICON_MAP[step.icon as keyof typeof ICON_MAP]
            return (
              <div
                key={`${step.title}-${i}`}
                className="relative flex flex-col items-center gap-3.5 text-center sm:gap-4"
              >
                {i > 0 && (
                  <div className="absolute top-6 right-1/2 left-0 hidden h-px bg-border md:block" />
                )}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-6 right-0 left-1/2 hidden h-px bg-border md:block" />
                )}
                <div className="relative z-10">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
                    {Icon && <Icon className="size-5" strokeWidth={1.75} />}
                  </span>
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-muted font-mono text-[10px] font-bold text-primary ring-1 ring-border">
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
            render={
              <a
                href={LINKS.signup}
                data-analytics-event="trial_signup_click"
                data-analytics-location="how-it-works"
              />
            }
          >
            Começar 7 dias grátis
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
