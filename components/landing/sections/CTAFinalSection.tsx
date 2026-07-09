import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CTA_FINAL_COPY, LINKS } from "@/lib/landing-data"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { CadastralMapBackdrop } from "@/components/landing/ui/CadastralMapBackdrop"

export function CTAFinalSection() {
  return (
    <section id="cta-final" className="py-24 md:py-32">
      <div className="container-landing">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-(--color-brand-navy) px-6 py-20 ring-1 ring-white/10 sm:px-12 md:py-28">
          <CadastralMapBackdrop className="brand-map--dark opacity-90" />
          <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="grain-overlay" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <ScrollReveal
            stagger
            className="relative flex flex-col items-center gap-7 text-center"
          >
            <span className="eyebrow eyebrow--center text-secondary">
              {CTA_FINAL_COPY.eyebrow}
            </span>

            <h2 className="font-heading text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance text-white sm:text-5xl md:text-6xl">
              {CTA_FINAL_COPY.title}
            </h2>

            <p className="max-w-[42ch] text-lg leading-relaxed text-white/75">
              {CTA_FINAL_COPY.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group/cta h-13 gap-2 rounded-full bg-primary pr-2 pl-6 text-base font-semibold text-white shadow-cta hover:bg-primary/90 active:scale-[0.98]"
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
                {CTA_FINAL_COPY.secondaryCta}
              </Button>
            </div>

            <p className="coord text-white/45">{CTA_FINAL_COPY.trust}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
