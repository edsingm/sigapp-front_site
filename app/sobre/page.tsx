import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { ABOUT_PAGE, LINKS } from "@/lib/landing-data"

export const metadata: Metadata = {
  title: ABOUT_PAGE.metaTitle.replace(" — SIGAPP", ""),
  description: ABOUT_PAGE.metaDescription,
  alternates: { canonical: "/sobre" },
}

export default function SobrePage() {
  return (
    <>
      <LandingNav />
      <main>
        <SecondaryPageHero
          eyebrow={ABOUT_PAGE.eyebrow}
          title={ABOUT_PAGE.title}
          description={ABOUT_PAGE.description}
          meta={
            <div className="flex items-center justify-center gap-2 text-sm text-white/62">
              <MapPin className="size-4 text-secondary" strokeWidth={1.5} />
              <span>{ABOUT_PAGE.location}</span>
            </div>
          }
        />

        <section className="border-b border-border py-20 md:py-28">
          <div className="container-landing">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-5 lg:col-span-5">
                <SectionLabel>{ABOUT_PAGE.missionTitle}</SectionLabel>
                <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl">
                  {ABOUT_PAGE.missionLead}
                </h2>
              </div>
              <div className="flex flex-col gap-5 lg:col-span-7">
                {ABOUT_PAGE.missionBody.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="max-w-[54ch] text-base leading-relaxed text-muted-foreground md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-20 md:py-28">
          <div className="container-landing">
            <div className="mb-12 max-w-xl">
              <SectionLabel>Princípios</SectionLabel>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Como decidimos o produto
              </h2>
            </div>
            <ol className="grid gap-0 border-y border-border md:grid-cols-2">
              {ABOUT_PAGE.principles.map((item, i) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-3 border-border py-8 md:px-8 md:odd:border-r md:odd:pl-0 md:even:pr-0 [&:nth-child(-n+2)]:border-b"
                >
                  <span className="data-mono text-sm text-muted-foreground/60">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative overflow-hidden bg-(--color-brand-navy) py-20 text-white md:py-28">
          <div className="grain-overlay opacity-[0.07]" />
          <div className="container-landing relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-5 lg:col-span-5">
              <p className="eyebrow text-secondary">{ABOUT_PAGE.stageTitle}</p>
              <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance md:text-4xl">
                {ABOUT_PAGE.stageBody}
              </h2>
              <ul className="mt-2 flex flex-col gap-3 border-t border-white/12 pt-6">
                {ABOUT_PAGE.stagePoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-white/75"
                  >
                    <span className="mt-2 h-px w-4 shrink-0 bg-secondary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="card-bezel card-bezel--navy">
                <div className="card-bezel__core relative aspect-16/10 overflow-hidden">
                  <Image
                    src="/images/dossie-mesa.jpg"
                    alt="Mesa de trabalho com plantas e documentos de análise imobiliária"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-(--color-brand-navy)/85 to-transparent p-5 pt-16">
                    <p className="coord text-white/55">Ofício · não teatro</p>
                    <p className="mt-1 font-heading text-lg font-semibold">
                      Matéria da decisão no centro da marca
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container-landing">
            <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 md:items-center md:text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {ABOUT_PAGE.ctaTitle}
              </h2>
              <p className="max-w-[46ch] text-muted-foreground md:text-lg">
                {ABOUT_PAGE.ctaDescription}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="brand"
                  size="lg"
                  className="group/cta h-12 gap-2 rounded-full pr-2 pl-6 font-semibold"
                  nativeButton={false}
                  render={
                    <Link
                      href={LINKS.demo}
                      data-analytics-event="demo_request"
                      data-analytics-location="about-cta"
                    />
                  }
                >
                  {ABOUT_PAGE.ctaPrimary}
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/18 transition-transform group-hover/cta:translate-x-0.5">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-6"
                  nativeButton={false}
                  render={
                    <a
                      href={LINKS.sales}
                      data-analytics-event="sales_contact_click"
                      data-analytics-location="about-cta"
                    />
                  }
                >
                  {ABOUT_PAGE.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
