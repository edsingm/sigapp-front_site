import { Check, ChevronDown, Minus, SlidersHorizontal } from "lucide-react"

import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import {
  PLAN_MATRIX_ROWS,
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
    <span className="inline-flex items-center gap-2 text-primary">
      <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
        <Check className="size-3" strokeWidth={2.5} />
      </span>
      <span className="font-medium text-foreground">Incluído</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 text-muted-foreground/65">
      <span className="flex size-5 items-center justify-center rounded-full bg-muted">
        <Minus className="size-3" />
      </span>
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

type PricingFeatureMatrixProps = {
  plans: PlanConfig[]
}

export function PricingFeatureMatrix({ plans }: PricingFeatureMatrixProps) {
  return (
    <div className="mt-18 sm:mt-24">
      <div className="hidden sm:block">
        <div className="mb-6 grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-3 lg:col-span-5">
            <SectionLabel>{PRICING_MATRIX_COPY.eyebrow}</SectionLabel>
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {PRICING_MATRIX_COPY.title}
            </h3>
          </div>
          <p className="max-w-[58ch] text-sm text-muted-foreground md:text-base lg:col-span-7 lg:justify-self-end">
            {PRICING_MATRIX_COPY.description}
          </p>
        </div>

        <div className="card-bezel shadow-float">
          <div className="card-bezel__core overflow-hidden">
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
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className={cn(
                          "px-5 py-5 text-left align-bottom",
                          plan.highlighted && "bg-(--color-brand-navy)"
                        )}
                      >
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "text-sm font-semibold text-foreground",
                                plan.highlighted && "text-white"
                              )}
                            >
                              {plan.name}
                            </span>
                            {plan.highlighted ? (
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground uppercase">
                                Recomendado
                              </span>
                            ) : null}
                          </div>
                          <span
                            className={cn(
                              "text-xs text-muted-foreground",
                              plan.highlighted && "text-white/55"
                            )}
                          >
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
                      className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/25"
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
                      {plans.map((plan) => (
                        <td
                          key={`${row.id}-${plan.id}`}
                          className={cn(
                            "px-5 py-4 align-top",
                            plan.highlighted &&
                              "border-x border-primary/10 bg-primary/[0.045]"
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
      </div>

      <details className="group overflow-hidden rounded-2xl border border-border bg-card shadow-panel sm:hidden">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <SlidersHorizontal className="size-4" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">
                {PRICING_MATRIX_COPY.mobileSummary}
              </span>
              <span className="text-xs text-muted-foreground">
                Abra para comparar item por item
              </span>
            </div>
          </div>
          <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
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
                  {plans.map((plan) => (
                    <div
                      key={`${row.id}-${plan.id}`}
                      className={cn(
                        "rounded-xl border p-3",
                        plan.highlighted
                          ? "border-primary/30 bg-primary/8 shadow-sm"
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
