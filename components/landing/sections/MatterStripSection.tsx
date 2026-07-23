import Image from "next/image"
import { Layers3, ScanLine } from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { MATTER_STRIP } from "@/lib/landing-data"

export function MatterStripSection() {
  return (
    <section className="matter-stage" aria-labelledby="matter-strip-title">
      <div className="matter-stage-grid" aria-hidden="true" />
      <div className="matter-stage-orbit" aria-hidden="true" />

      <div className="container-landing relative py-20 sm:py-24 lg:py-32">
        <ScrollReveal
          stagger
          className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10"
        >
          <div className="matter-heading lg:col-span-8">
            <p className="matter-eyebrow">
              <Layers3 aria-hidden="true" />
              {MATTER_STRIP.eyebrow}
            </p>
            <h2 id="matter-strip-title">
              <span>{MATTER_STRIP.titleLine1}</span>
              <strong>{MATTER_STRIP.titleLine2}</strong>
            </h2>
          </div>

          <p className="matter-description lg:col-span-4 lg:pb-2">
            {MATTER_STRIP.description}
          </p>
        </ScrollReveal>

        <ScrollReveal className="matter-visual mt-12 lg:mt-16">
          <figure className="matter-image-frame">
            <div className="relative aspect-4/5 sm:aspect-16/10 lg:aspect-[16/7]">
              <Image
                src={MATTER_STRIP.imageSrc}
                alt={MATTER_STRIP.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
                className="matter-image"
              />
              <div className="matter-image-shade" aria-hidden="true" />
              <div className="matter-image-scan" aria-hidden="true" />

              <div className="matter-status">
                <span aria-hidden="true" />
                {MATTER_STRIP.visualStatus}
              </div>

              <figcaption className="matter-caption">
                <p>
                  <ScanLine aria-hidden="true" />
                  {MATTER_STRIP.visualEyebrow}
                </p>
                <strong>{MATTER_STRIP.visualTitle}</strong>
              </figcaption>
            </div>
          </figure>

          <div className="matter-perspectives">
            <p>{MATTER_STRIP.perspectivesLabel}</p>
            <ul className="grid sm:grid-cols-3">
              {MATTER_STRIP.points.map((point, index) => (
                <li key={point.label}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{point.label}</strong>
                    <small>{point.text}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
