import Link from "next/link"
import { HOW_IT_WORKS, HOW_IT_WORKS_COPY, LINKS } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 md:py-32">
      <div className="container-landing">
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

        {/* Dossiê em trilha vertical — evita o grid 4 colunas genérico */}
        <ScrollReveal stagger className="mx-auto max-w-3xl">
          <ol className="relative flex flex-col">
            <div
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-border md:left-[1.35rem]"
            />

            {HOW_IT_WORKS.map((step, i) => (
              <li
                key={step.title}
                className="relative grid gap-4 py-6 pl-12 md:grid-cols-[5.5rem_1fr] md:gap-8 md:pl-16 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-0 flex size-9 items-center justify-center rounded-full border border-border bg-background font-mono text-xs font-bold text-foreground md:top-8 md:size-11 md:text-sm"
                >
                  0{i + 1}
                </span>
                <p className="coord hidden pt-1 text-muted-foreground md:block">
                  Etapa
                </p>
                <div className="flex flex-col gap-2 border-b border-border pb-6 md:border-0 md:pb-0">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
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
