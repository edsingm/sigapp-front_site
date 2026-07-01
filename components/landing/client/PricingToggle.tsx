"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { PlanConfig } from "@/lib/landing-data"
import { PlanCard } from "@/components/landing/ui/PlanCard"

type PricingToggleProps = {
  plans: PlanConfig[]
}

export function PricingToggle({ plans }: PricingToggleProps) {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly")
  const [active, setActive] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  function goTo(i: number) {
    setActive(i)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: i * carouselRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  function onCarouselScroll() {
    if (!carouselRef.current) return
    const idx = Math.round(
      carouselRef.current.scrollLeft / carouselRef.current.clientWidth
    )
    setActive(idx)
  }

  return (
    <div>
      <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:mb-10">
        <div className="inline-flex w-full max-w-sm items-center gap-1 rounded-2xl border border-border bg-card/90 p-1.5 shadow-sm backdrop-blur sm:w-auto sm:max-w-none">
          <button
            onClick={() => setCycle("monthly")}
            aria-pressed={cycle === "monthly"}
            className={cn(
              "flex min-h-11 flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-7",
              cycle === "monthly"
                ? "bg-[var(--color-brand-navy)] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Mensal
          </button>
          <button
            onClick={() => setCycle("annual")}
            aria-pressed={cycle === "annual"}
            className={cn(
              "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-7",
              cycle === "annual"
                ? "bg-[var(--color-brand-navy)] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Anual
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                cycle === "annual"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              −20%
            </span>
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          No anual, você economiza dois meses de assinatura.
        </p>
      </div>

      {/* Mobile: carousel */}
      <div className="sm:hidden">
        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          className="-mx-4 flex snap-x snap-mandatory scrollbar-none overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
        >
          {plans.map((plan) => (
            <div key={plan.id} className="w-full shrink-0 snap-start px-1 pt-4">
              <PlanCard plan={plan} billingCycle={cycle} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {plans.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para plano ${i + 1}`}
              className="flex size-11 items-center justify-center rounded-full"
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  i === active
                    ? "h-2 w-6 bg-primary"
                    : "size-2 bg-muted-foreground/45"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* sm+: grid */}
      <div className="hidden items-stretch sm:grid sm:grid-cols-2 sm:gap-6 sm:pt-4 xl:grid-cols-4 xl:gap-5">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingCycle={cycle} />
        ))}
      </div>
    </div>
  )
}
