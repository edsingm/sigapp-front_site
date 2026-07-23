import { ArrowUpRight, BadgeDollarSign, Radio } from "lucide-react"
import Link from "next/link"

import { PricingToggle } from "@/components/landing/client/PricingToggle"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { PricingFeatureMatrix } from "@/components/landing/ui/PricingFeatureMatrix"
import { LINKS, PRICING_COPY, type PlanConfig } from "@/lib/landing-data"

type PricingSectionProps = {
  plans: PlanConfig[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  const hasPlans = plans.length > 0

  return (
    <section
      id="precos"
      className="pricing-stage"
      aria-labelledby="pricing-title"
    >
      <div className="pricing-stage-glow" aria-hidden="true" />
      <div className="container-landing pricing-shell">
        <ScrollReveal
          stagger
          className="pricing-intro lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="pricing-eyebrow">
              <BadgeDollarSign aria-hidden="true" />
              {PRICING_COPY.eyebrow}
            </span>
            <h2 id="pricing-title" className="pricing-heading">
              <span>{PRICING_COPY.titleLine1}</span>
              <strong>{PRICING_COPY.titleLine2}</strong>
            </h2>
          </div>
          <div className="pricing-intro-note lg:col-span-5">
            <p>{PRICING_COPY.description}</p>
            <ul>
              {PRICING_COPY.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal className="pricing-console">
          <div className="pricing-console-bar">
            <span>{PRICING_COPY.consoleLabel}</span>
            <strong>
              <Radio aria-hidden="true" />
              {PRICING_COPY.consoleStatus}
            </strong>
          </div>

          {hasPlans ? (
            <div className="pricing-console-body">
              <PricingToggle plans={plans} />
            </div>
          ) : (
            <div className="pricing-unavailable">
              <span>
                <BadgeDollarSign aria-hidden="true" />
              </span>
              <div>
                <h3>{PRICING_COPY.unavailableTitle}</h3>
                <p>{PRICING_COPY.unavailableDescription}</p>
              </div>
              <Link href={LINKS.demo}>
                {PRICING_COPY.unavailableCta}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          )}
        </ScrollReveal>

        {hasPlans ? (
          <ScrollReveal>
            <PricingFeatureMatrix plans={plans} />
          </ScrollReveal>
        ) : null}

        <p className="pricing-footer-note">{PRICING_COPY.footerNote}</p>
      </div>
    </section>
  )
}
