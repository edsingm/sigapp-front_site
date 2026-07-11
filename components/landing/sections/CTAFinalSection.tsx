import Link from "next/link"
import {
  ArrowRight,
  Clock3,
  FileChartColumnIncreasing,
  MapPinned,
  UsersRound,
} from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { CadastralMapBackdrop } from "@/components/landing/ui/CadastralMapBackdrop"
import { Button } from "@/components/ui/button"
import { CTA_FINAL_COPY, DEMO_PAGE, LINKS } from "@/lib/landing-data"

const DEMO_ICONS = [MapPinned, UsersRound, FileChartColumnIncreasing]

export function CTAFinalSection() {
  const trustItems = CTA_FINAL_COPY.trust.split(" · ")

  return (
    <section
      id="cta-final"
      className="relative mt-8 overflow-hidden rounded-t-[2rem] bg-(--color-brand-navy) pt-20 pb-14 text-white md:mt-12 md:rounded-t-[2.75rem] md:pt-28 md:pb-16"
    >
      <CadastralMapBackdrop className="brand-map--dark opacity-70" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-28" />
      <div className="grain-overlay opacity-[0.06]" />

      <div className="container-landing relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <ScrollReveal
            stagger
            className="flex min-w-0 flex-col items-start lg:col-span-7"
          >
            <p className="eyebrow text-secondary">{CTA_FINAL_COPY.eyebrow}</p>

            <h2 className="mt-6 max-w-[14ch] font-heading text-4xl leading-[0.98] font-bold tracking-[-0.045em] text-balance text-white sm:text-5xl lg:text-6xl">
              {CTA_FINAL_COPY.title}
            </h2>

            <p className="mt-5 max-w-[40rem] text-base leading-relaxed text-white/65 sm:text-lg">
              {CTA_FINAL_COPY.description}
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="group/cta h-13 w-full gap-2 rounded-full bg-primary pr-2 pl-6 text-base font-semibold text-white shadow-cta hover:bg-primary/90 sm:w-auto"
                nativeButton={false}
                render={
                  <Link
                    href={LINKS.demo}
                    data-analytics-event="demo_request"
                    data-analytics-location="cta-final"
                  />
                }
              >
                {CTA_FINAL_COPY.primaryCta}
                <span className="flex size-9 items-center justify-center rounded-full bg-white/18 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </Button>

              <a
                href={LINKS.sales}
                data-analytics-event="sales_contact_click"
                data-analytics-location="cta-final"
                className="cta-link justify-center text-white/72 hover:text-white sm:justify-start"
              >
                {CTA_FINAL_COPY.secondaryCta}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className="min-w-0 lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

              <div className="relative flex items-start justify-between gap-4 border-b border-white/12 pb-5">
                <div className="min-w-0">
                  <p className="coord text-secondary">Demonstração guiada</p>
                  <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Um terreno. O fluxo inteiro.
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-2">
                  <Clock3 className="size-3.5 text-secondary" />
                  <span className="data-mono text-xs font-bold text-white">
                    ≈ 40 min
                  </span>
                </div>
              </div>

              <ol className="relative mt-1">
                {DEMO_PAGE.sidePoints.map((point, index) => {
                  const Icon = DEMO_ICONS[index]

                  return (
                    <li
                      key={point.title}
                      className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/10 py-4 last:border-0"
                    >
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/7 text-secondary">
                        <Icon className="size-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="data-mono text-[10px] text-white/32">
                            0{index + 1}
                          </span>
                          <p className="text-sm font-semibold text-white">
                            {point.title}
                          </p>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-white/50 sm:text-sm">
                          {point.text}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-0 border-y border-white/12 sm:grid-cols-3">
          {trustItems.map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 border-b border-white/10 py-4 last:border-0 sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0 first:sm:pl-0 last:sm:pr-0"
            >
              <span className="data-mono text-[10px] font-bold text-secondary">
                0{index + 1}
              </span>
              <span className="text-sm font-medium text-white/58">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
