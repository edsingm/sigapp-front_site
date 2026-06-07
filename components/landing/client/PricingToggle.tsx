"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { PLANS } from "@/lib/landing-data"
import { PlanCard } from "@/components/landing/ui/PlanCard"

export function PricingToggle() {
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly")

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingCycle={cycle} />
        ))}
      </div>
    </div>
  )
}
