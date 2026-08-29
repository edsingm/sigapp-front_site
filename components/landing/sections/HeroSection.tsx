import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"

import { RotatingHeroText } from "@/components/landing/client/RotatingHeroText"
import { HERO_COPY, HERO_PROOF_ITEMS, LINKS } from "@/lib/landing-data"

export function HeroSection() {
  return (
    <section id="hero" className="hero-stage">
      <div className="hero-ambient hero-ambient--lime" aria-hidden="true" />
      <div className="hero-ambient hero-ambient--cyan" aria-hidden="true" />
      <div className="hero-background-grid" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="hero-background-routes"
        aria-hidden="true"
        fill="none"
      >
        <path d="M-80 744C244 568 394 741 675 570c263-160 424-78 622-218 110-78 188-130 253-254" />
        <path d="M-65 798C259 622 434 816 718 635c249-159 407-86 621-249" />
      </svg>

      <div className="container-landing relative z-10 flex min-h-[100svh] flex-col pt-24 pb-6 sm:pt-28 sm:pb-8 lg:pt-18">
        <div className="flex flex-1 items-center justify-center py-10 lg:py-14">
          <div className="hero-copy w-full max-w-[58rem] text-center">
            <p className="hero-eyebrow hero-enter">
              <span aria-hidden="true" />
              {HERO_COPY.eyebrow}
            </p>

            <h1 className="hero-title hero-enter hero-enter--delay-1">
              <span>{HERO_COPY.titleLine1}</span>
              <RotatingHeroText items={HERO_COPY.titleRotations} />
            </h1>

            <p className="hero-description hero-enter hero-enter--delay-2">
              {HERO_COPY.description}
            </p>

            <div className="hero-actions hero-enter hero-enter--delay-3">
              <Link
                href={LINKS.demo}
                data-analytics-event="demo_request"
                data-analytics-location="hero"
                className="hero-primary-action"
              >
                {HERO_COPY.primaryCta}
                <span aria-hidden="true">
                  <ArrowRight />
                </span>
              </Link>

              <Link
                href="/#como-funciona"
                data-analytics-event="features_view_click"
                data-analytics-location="hero"
                className="hero-secondary-action"
              >
                {HERO_COPY.secondaryCta}
                <ArrowDown aria-hidden="true" />
              </Link>
            </div>

            <p className="hero-audience hero-enter hero-enter--delay-4">
              <span aria-hidden="true" />
              {HERO_COPY.audience}
            </p>
          </div>

        </div>

        <div className="hero-bottom-rail hidden lg:flex">
          <dl className="hero-proof-list">
            {HERO_PROOF_ITEMS.map((item, index) => (
              <div key={item.label}>
                <dt>0{index + 1}</dt>
                <dd>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </dd>
              </div>
            ))}
          </dl>

          <Link href="/#como-funciona" className="hero-scroll-action">
            {HERO_COPY.scrollLabel}
            <ArrowDown aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
