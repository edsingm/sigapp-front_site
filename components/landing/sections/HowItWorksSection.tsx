import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  FileCheck,
  Handshake,
  MapPin,
} from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { HOW_IT_WORKS, HOW_IT_WORKS_COPY, LINKS } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

const STEP_ICONS = {
  MapPin,
  Calculator,
  Handshake,
  FileCheck,
}

/** Alternating elevations — spatial path, not equal card row */
const STEP_OFFSET = ["md:mt-0", "md:mt-10", "md:mt-4", "md:mt-14"] as const

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden border-y border-border bg-muted/30 py-16 sm:py-20 md:py-28"
    >
      <div className="brand-map__grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-10"
        >
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <SectionLabel>{HOW_IT_WORKS_COPY.eyebrow}</SectionLabel>
            <h2 className="section-display text-foreground">
              {HOW_IT_WORKS_COPY.title}
            </h2>
          </div>
          <p className="max-w-[48ch] text-pretty text-muted-foreground md:text-lg lg:col-span-7 lg:pb-1">
            {HOW_IT_WORKS_COPY.description}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative">
            {/* Spatial route — desktop */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute top-16 right-[6%] left-[6%] hidden h-24 w-[88%] xl:block"
              viewBox="0 0 1000 96"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                className="hiw-route"
                d="M40 48 C 180 12, 280 84, 420 40 S 700 12, 960 52"
              />
              {[40, 340, 640, 960].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy={x === 40 ? 48 : x === 340 ? 52 : x === 640 ? 36 : 52}
                  r="4"
                  className="fill-primary"
                />
              ))}
            </svg>

            <ol className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {HOW_IT_WORKS.map((step, i) => {
                const Icon = STEP_ICONS[step.icon as keyof typeof STEP_ICONS]

                return (
                  <li
                    key={step.title}
                    className={cn(
                      "hiw-node flex min-h-64 flex-col rounded-2xl border border-border bg-card p-5 shadow-raise sm:p-6",
                      STEP_OFFSET[i]
                    )}
                  >
                    <div className="mb-8 flex items-center justify-between gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="data-mono text-[11px] font-bold text-muted-foreground/55">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <p className="coord mb-2 text-primary">Etapa {i + 1}</p>
                      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex flex-col items-start gap-2 md:mt-14">
          <Button
            variant="brand"
            size="lg"
            className="group/cta h-12 gap-2 rounded-full pr-2 pl-5 text-sm font-semibold sm:h-13 sm:pl-6 sm:text-base"
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
            <span className="flex size-8 items-center justify-center rounded-full bg-white/18 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5 sm:size-9">
              <ArrowRight className="size-3.5 sm:size-4" />
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
