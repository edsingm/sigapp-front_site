import Image from "next/image"

import { MATTER_STRIP } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"

export function MatterStripSection() {
  return (
    <section className="relative overflow-hidden bg-(--color-brand-navy) py-24 text-white md:py-28">
      <div className="grain-overlay opacity-[0.07]" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -top-40 -right-28 size-[34rem] rounded-full border border-white/8" />
      <div className="pointer-events-none absolute -top-24 -right-12 size-[24rem] rounded-full border border-secondary/10" />

      <div className="container-landing relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal stagger className="flex flex-col gap-6 lg:col-span-5">
            <SectionLabel className="text-secondary">
              {MATTER_STRIP.eyebrow}
            </SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
              {MATTER_STRIP.title}
            </h2>
            <p className="max-w-[42ch] text-base leading-relaxed text-white/70 md:text-lg">
              {MATTER_STRIP.description}
            </p>

            <ul className="mt-2 flex flex-col gap-4 border-t border-white/12 pt-6">
              {MATTER_STRIP.points.map((point) => (
                <li
                  key={point.label}
                  className="grid grid-cols-[6.5rem_1fr] gap-3"
                >
                  <span className="coord text-secondary">{point.label}</span>
                  <span className="text-sm leading-snug text-white/80">
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-7 lg:pl-4">
            <div className="card-bezel card-bezel--navy shadow-float">
              <div className="card-bezel__core relative aspect-4/3 overflow-hidden sm:aspect-16/10">
                <Image
                  src={MATTER_STRIP.imageSrc}
                  alt={MATTER_STRIP.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-(--color-brand-navy)/80 to-transparent p-5 pt-16">
                  <p className="coord text-white/55">
                    Campo · dossiê · parecer
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold text-white">
                    A matéria da decisão, não só a interface
                  </p>
                </div>
                <div className="coord absolute top-4 right-4 rounded-full border border-white/16 bg-(--color-brand-navy)/55 px-3 py-1.5 text-white/70 backdrop-blur-md">
                  Dossiê 01 · em análise
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
