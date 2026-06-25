import { Check, Minus } from "lucide-react"

import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import {
  PLAN_MATRIX_ROWS,
  PLANS,
  PRICING_MATRIX_COPY,
  type PlanConfig,
  type PlanMatrixRow,
} from "@/lib/landing-data"
import { cn } from "@/lib/utils"

function getMatrixValue(plan: PlanConfig, row: PlanMatrixRow) {
  return plan[row.field]
}

function BooleanValue({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center gap-1 text-primary">
      <Check className="size-4" />
      <span className="font-medium text-foreground">Incluído</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-muted-foreground/70">
      <Minus className="size-4" />
      <span>Não incluso</span>
    </span>
  )
}

function MatrixCell({ plan, row }: { plan: PlanConfig; row: PlanMatrixRow }) {
  const value = getMatrixValue(plan, row)

  if (row.kind === "boolean") {
    return <BooleanValue value={Boolean(value)} />
  }

  return (
    <span
      className={cn(
        "font-medium text-foreground",
        value === "—" && "text-muted-foreground"
      )}
    >
      {String(value)}
    </span>
  )
}

export function PricingFeatureMatrix() {
  return (
    <div className="mt-10 sm:mt-14">
      <div className="hidden sm:block">
        <div className="mb-6 flex flex-col gap-3 text-center">
          <SectionLabel className="text-center">
            {PRICING_MATRIX_COPY.eyebrow}
          </SectionLabel>
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {PRICING_MATRIX_COPY.title}
          </h3>
          <p className="mx-auto max-w-[58ch] text-sm text-muted-foreground md:text-base">
            {PRICING_MATRIX_COPY.description}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/35">
                  <th className="w-[30%] px-6 py-5 text-left align-bottom">
                    <p className="text-sm font-semibold text-foreground">
                      Recurso
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Comparação completa entre os quatro planos
                    </p>
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      className={cn(
                        "px-5 py-5 text-left align-bottom",
                        plan.highlighted && "bg-primary/[0.06]"
                      )}
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {plan.name}
                          </span>
                          {plan.highlighted ? (
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase">
                              Recomendado
                            </span>
                          ) : null}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {plan.tagline}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_MATRIX_ROWS.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">
                          {row.label}
                        </span>
                        {row.helper ? (
                          <span className="text-xs leading-relaxed text-muted-foreground">
                            {row.helper}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    {PLANS.map((plan) => (
                      <td
                        key={`${row.id}-${plan.id}`}
                        className={cn(
                          "px-5 py-4 align-top",
                          plan.highlighted && "bg-primary/[0.04]"
                        )}
                      >
                        <MatrixCell plan={plan} row={row} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <details className="group rounded-2xl border border-border bg-card shadow-sm sm:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">
              {PRICING_MATRIX_COPY.mobileSummary}
            </span>
            <span className="text-xs text-muted-foreground">
              {PRICING_MATRIX_COPY.description}
            </span>
          </div>
          <span className="text-xs font-medium text-primary transition-transform group-open:rotate-180">
            ↓
          </span>
        </summary>

        <div className="border-t border-border px-4 py-4">
          <div className="flex flex-col gap-3">
            {PLAN_MATRIX_ROWS.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-border bg-background/80 p-4"
              >
                <div className="mb-3 flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">
                    {row.label}
                  </span>
                  {row.helper ? (
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {row.helper}
                    </span>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {PLANS.map((plan) => (
                    <div
                      key={`${row.id}-${plan.id}`}
                      className={cn(
                        "rounded-xl border p-3",
                        plan.highlighted
                          ? "border-primary/30 bg-primary/5"
                          : "border-border bg-card"
                      )}
                    >
                      <div className="mb-2 flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-foreground">
                          {plan.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {plan.tagline}
                        </span>
                      </div>
                      <div className="text-xs">
                        <MatrixCell plan={plan} row={row} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
