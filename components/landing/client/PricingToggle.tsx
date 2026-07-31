"use client"

import { useRef, useState } from "react"

import { PlanCard } from "@/components/landing/ui/PlanCard"
import { PRICING_COPY, type PlanConfig } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

type PricingToggleProps = {
  plans: PlanConfig[]
}

export function PricingToggle({ plans }: PricingToggleProps) {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly")
  const [active, setActive] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const mobilePlans = [...plans].sort(
    (a, b) => Number(Boolean(b.highlighted)) - Number(Boolean(a.highlighted))
  )

  function goTo(index: number) {
    setActive(index)
    carouselRef.current?.scrollTo({
      left: index * carouselRef.current.clientWidth,
      behavior: "smooth",
    })
  }

  function onCarouselScroll() {
    if (!carouselRef.current) return
    setActive(
      Math.round(
        carouselRef.current.scrollLeft / carouselRef.current.clientWidth
      )
    )
  }

  return (
    <div className="pricing-selector">
      <div className="pricing-cycle-wrap">
        <div
          className="pricing-cycle"
          role="group"
          aria-label={PRICING_COPY.eyebrow}
        >
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            aria-pressed={cycle === "monthly"}
            className={cn(cycle === "monthly" && "is-active")}
          >
            {PRICING_COPY.monthlyLabel}
          </button>
          <button
            type="button"
            onClick={() => setCycle("annual")}
            aria-pressed={cycle === "annual"}
            className={cn(cycle === "annual" && "is-active")}
          >
            {PRICING_COPY.annualLabel}
            <span>{PRICING_COPY.annualDiscount}</span>
          </button>
        </div>
        <p>{PRICING_COPY.annualHint}</p>
      </div>

      <div className="pricing-mobile-plans sm:hidden">
        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          className="pricing-mobile-carousel"
        >
          {mobilePlans.map((plan) => (
            <div key={plan.id} className="pricing-plan-slide">
              <PlanCard plan={plan} billingCycle={cycle} />
            </div>
          ))}
        </div>
        <div className="pricing-plan-dots">
          <span>{PRICING_COPY.swipeLabel}</span>
          {mobilePlans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${PRICING_COPY.planAriaLabel} ${index + 1}`}
              className={index === active ? "is-active" : undefined}
            >
              <i />
            </button>
          ))}
        </div>
      </div>

      <div className="pricing-plan-grid hidden sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingCycle={cycle} />
        ))}
      </div>
    </div>
  )
}
