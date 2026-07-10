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
  const mobilePlans = [...plans].sort(
    (a, b) => Number(Boolean(b.highlighted)) - Number(Boolean(a.highlighted))
  )

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
        <div className="inline-flex w-full max-w-sm items-center gap-1 rounded-2xl border border-white/14 bg-white/8 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl sm:w-auto sm:max-w-none">
          <button
            onClick={() => setCycle("monthly")}
            aria-pressed={cycle === "monthly"}
            className={cn(
              "flex min-h-11 flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-7",
              cycle === "monthly"
                ? "bg-white text-(--color-brand-navy) shadow-md"
                : "text-white/58 hover:bg-white/8 hover:text-white"
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
                ? "bg-white text-(--color-brand-navy) shadow-md"
                : "text-white/58 hover:bg-white/8 hover:text-white"
            )}
          >
            Anual
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                cycle === "annual"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-secondary/14 text-secondary"
              )}
            >
              −20%
            </span>
          </button>
        </div>
        <p className="text-xs text-white/50">
          No anual, você economiza 20% durante todo o período.
        </p>
      </div>

      {/* Mobile: carousel */}
      <div className="sm:hidden">
        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          className="-mx-4 flex snap-x snap-mandatory scrollbar-none overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
        >
          {mobilePlans.map((plan) => (
            <div key={plan.id} className="w-full shrink-0 snap-start px-1 pt-5">
              <PlanCard plan={plan} billingCycle={cycle} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="coord mr-2 text-muted-foreground">Deslize</span>
          {mobilePlans.map((_, i) => (
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
      <div className="hidden items-stretch sm:grid sm:grid-cols-2 sm:gap-6 sm:pt-5 xl:grid-cols-4 xl:gap-4 xl:pt-9">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingCycle={cycle} />
        ))}
      </div>
    </div>
  )
}
