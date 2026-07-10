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
      className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-(--color-brand-navy) pt-24 pb-16 text-white md:mt-16 md:rounded-t-[3.5rem] md:pt-28 md:pb-20"
    >
      <CadastralMapBackdrop className="brand-map--dark opacity-75" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-35" />
      <div className="grain-overlay opacity-[0.07]" />
      <div className="pointer-events-none absolute -top-32 left-1/3 size-[34rem] rounded-full bg-primary/16 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 h-px w-2/3 bg-linear-to-l from-secondary/60 to-transparent" />

      <div className="container-landing relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal
            stagger
            className="flex flex-col items-start lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-secondary">
                {CTA_FINAL_COPY.eyebrow}
              </span>
              <span className="coord rounded-full border border-white/14 bg-white/7 px-3 py-1.5 text-white/50 backdrop-blur">
                Demo 01 · caso real
              </span>
            </div>

            <h2 className="mt-7 max-w-[12ch] font-heading text-4xl leading-[0.98] font-bold tracking-[-0.045em] text-balance text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {CTA_FINAL_COPY.title}
            </h2>

            <p className="mt-6 max-w-[46rem] text-base leading-relaxed text-white/68 sm:text-lg">
              {CTA_FINAL_COPY.description}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                className="group/cta h-13 w-full gap-2 rounded-full bg-primary pr-2 pl-6 text-base font-semibold text-white shadow-[0_18px_50px_-18px_rgba(46,107,255,0.9)] hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
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

              <Button
                variant="ghost-white"
                size="lg"
                className="h-13 w-full gap-2.5 rounded-full border border-white/16 bg-white/6 px-6 text-base backdrop-blur sm:w-auto"
                nativeButton={false}
                render={
                  <a
                    href={LINKS.sales}
                    data-analytics-event="sales_contact_click"
                    data-analytics-location="cta-final"
                  />
                }
              >
                {CTA_FINAL_COPY.secondaryCta}
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.065] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-primary/8" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/45 to-transparent" />

              <div className="relative flex items-start justify-between gap-5 border-b border-white/12 pb-5">
                <div>
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

              <ol className="relative mt-2">
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
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="data-mono text-[10px] text-white/32">
                            0{index + 1}
                          </span>
                          <p className="text-sm font-semibold text-white">
                            {point.title}
                          </p>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-white/52 sm:text-sm">
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

        <ScrollReveal
          stagger
          className="mt-16 grid divide-y divide-white/10 border-y border-white/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {trustItems.map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 py-4 sm:px-6 first:sm:pl-0 last:sm:pr-0"
            >
              <span className="data-mono text-[10px] font-bold text-secondary">
                0{index + 1}
              </span>
              <span className="text-sm font-medium text-white/62">{item}</span>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
