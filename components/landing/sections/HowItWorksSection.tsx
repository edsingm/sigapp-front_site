import Link from "next/link"
import {
  ArrowUpRight,
  Calculator,
  Check,
  FileCheck,
  Handshake,
  MapPin,
  Route,
  type LucideIcon,
} from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { HOW_IT_WORKS, HOW_IT_WORKS_COPY, LINKS } from "@/lib/landing-data"

const STEP_ICONS: Record<string, LucideIcon> = {
  Calculator,
  FileCheck,
  Handshake,
  MapPin,
}

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="how-stage"
      aria-labelledby="how-it-works-title"
    >
      <div className="how-stage-grid" aria-hidden="true" />
      <div className="how-stage-glow" aria-hidden="true" />

      <div className="container-landing relative py-20 sm:py-24 lg:py-32">
        <ScrollReveal
          stagger
          className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10"
        >
          <div className="how-heading lg:col-span-8">
            <p className="how-eyebrow">
              <Route aria-hidden="true" />
              {HOW_IT_WORKS_COPY.eyebrow}
            </p>
            <h2 id="how-it-works-title">
              <span>{HOW_IT_WORKS_COPY.titleLine1}</span>
              <strong>{HOW_IT_WORKS_COPY.titleLine2}</strong>
            </h2>
          </div>

          <p className="how-description lg:col-span-4 lg:pb-2">
            {HOW_IT_WORKS_COPY.description}
          </p>
        </ScrollReveal>

        <ScrollReveal className="how-route mt-12 lg:mt-16">
          <div className="how-route-heading">
            <span>{HOW_IT_WORKS_COPY.routeLabel}</span>
            <span>{HOW_IT_WORKS_COPY.routeProgress}</span>
          </div>

          <ol aria-label={HOW_IT_WORKS_COPY.routeLabel}>
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = STEP_ICONS[step.icon] ?? MapPin

              return (
                <li
                  key={step.title}
                  className="how-route-step grid grid-cols-[2.75rem_minmax(0,1fr)] lg:grid-cols-[4rem_3rem_minmax(0,1.25fr)_minmax(12rem,0.55fr)]"
                >
                  <div className="how-step-marker row-span-3 lg:row-auto">
                    <span>0{index + 1}</span>
                    <i aria-hidden="true" />
                  </div>

                  <div className="how-step-icon">
                    <Icon aria-hidden="true" />
                  </div>

                  <div className="how-step-copy">
                    <p>
                      {HOW_IT_WORKS_COPY.stepLabel} {index + 1} · {step.stage}
                    </p>
                    <h3>{step.title}</h3>
                    <small>{step.description}</small>
                  </div>

                  <div className="how-step-result col-start-2 lg:col-start-auto">
                    <Check aria-hidden="true" />
                    <span>{step.result}</span>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="how-route-footer">
            <p>{HOW_IT_WORKS_COPY.ctaNote}</p>
            <Link
              href={LINKS.demo}
              data-analytics-event="demo_request"
              data-analytics-location="how-it-works"
              className="how-route-action"
            >
              {HOW_IT_WORKS_COPY.cta}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
