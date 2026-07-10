import Link from "next/link"
import { HOW_IT_WORKS, HOW_IT_WORKS_COPY, LINKS } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Calculator,
  FileCheck,
  Handshake,
  MapPin,
} from "lucide-react"

const STEP_ICONS = {
  MapPin,
  Calculator,
  Handshake,
  FileCheck,
}

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden border-b border-border bg-muted/35 py-16 sm:py-20 md:py-32"
    >
      <div className="brand-map__grid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-5 lg:col-span-5">
            <SectionLabel>{HOW_IT_WORKS_COPY.eyebrow}</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              {HOW_IT_WORKS_COPY.title}
            </h2>
          </div>
          <p className="max-w-[52ch] text-pretty text-muted-foreground md:text-lg lg:col-span-7 lg:pb-1">
            {HOW_IT_WORKS_COPY.description}
          </p>
        </ScrollReveal>

        <ScrollReveal stagger>
          <ol className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div
              aria-hidden="true"
              className="absolute top-8 right-[10%] left-[10%] hidden border-t border-dashed border-primary/25 xl:block"
            />

            {HOW_IT_WORKS.map((step, i) => {
              const Icon = STEP_ICONS[step.icon as keyof typeof STEP_ICONS]

              return (
                <li
                  key={step.title}
                  className="group relative flex min-h-72 flex-col rounded-3xl border border-border bg-card p-6 shadow-raise transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-float"
                >
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="relative z-10 flex size-13 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="data-mono text-xs font-bold text-muted-foreground/50">
                      0{i + 1} / 04
                    </span>
                  </div>
                  <div className="mt-auto">
                    <p className="coord mb-3 text-primary">Etapa {i + 1}</p>
                    <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </ScrollReveal>

        <div className="mt-12 flex flex-col items-start gap-3 md:mt-16 md:items-center">
          <Button
            variant="brand"
            size="lg"
            className="group/cta h-13 gap-2 rounded-full pr-2 pl-6 text-base font-semibold"
            nativeButton={false}
            render={
              <Link
                href={LINKS.demo}
                data-analytics-event="demo_request"
                data-analytics-location="how-it-works"
              />
            }
          >
            Solicitar demonstração
            <span className="flex size-9 items-center justify-center rounded-full bg-white/18 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <p className="coord text-muted-foreground">
            Preferimos um terreno real da sua carteira
          </p>
        </div>
      </div>
    </section>
  )
}
