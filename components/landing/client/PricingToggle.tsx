"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { PLANS } from "@/lib/landing-data"
import { PlanCard } from "@/components/landing/ui/PlanCard"

export function PricingToggle() {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly")
  const [active, setActive] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  function goTo(i: number) {
    setActive(i)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: i * carouselRef.current.clientWidth, behavior: "smooth" })
    }
  }

  function onCarouselScroll() {
    if (!carouselRef.current) return
    const idx = Math.round(carouselRef.current.scrollLeft / carouselRef.current.clientWidth)
    setActive(idx)
  }

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="inline-flex items-center gap-0 rounded-full border border-border bg-muted p-1">
          <button
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              cycle === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Mensal
          </button>
          <button
            onClick={() => setCycle("annual")}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              cycle === "annual"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Anual
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
              −20%
            </span>
          </button>
        </div>
      </div>

      {/* Mobile: carousel */}
      <div className="sm:hidden">
        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PLANS.map((plan) => (
            <div key={plan.id} className="w-full shrink-0 snap-start pt-4">
              <PlanCard plan={plan} billingCycle={cycle} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {PLANS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para plano ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* sm+: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingCycle={cycle} />
        ))}
      </div>
    </div>
  )
}
