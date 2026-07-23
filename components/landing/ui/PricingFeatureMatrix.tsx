import {
  Check,
  ChevronDown,
  Minus,
  Rows3,
  SlidersHorizontal,
} from "lucide-react"

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
  return (
    <span
      className={cn(
        "pricing-matrix-boolean",
        value ? "is-included" : "is-empty"
      )}
    >
      {value ? <Check aria-hidden="true" /> : <Minus aria-hidden="true" />}
      <span>
        {value
          ? PRICING_MATRIX_COPY.includedLabel
          : PRICING_MATRIX_COPY.notIncludedLabel}
      </span>
    </span>
  )
}

function MatrixCell({ plan, row }: { plan: PlanConfig; row: PlanMatrixRow }) {
  const value = getMatrixValue(plan, row)

  if (row.kind === "boolean") {
    return <BooleanValue value={Boolean(value)} />
  }

  return <span className="pricing-matrix-text">{String(value)}</span>
}

type PricingFeatureMatrixProps = {
  plans: PlanConfig[]
}

export function PricingFeatureMatrix({ plans }: PricingFeatureMatrixProps) {
  return (
    <div className="pricing-matrix">
      <div className="pricing-matrix-intro lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <span className="pricing-matrix-eyebrow">
            <Rows3 aria-hidden="true" />
            {PRICING_MATRIX_COPY.eyebrow}
          </span>
          <h3>{PRICING_MATRIX_COPY.title}</h3>
        </div>
        <p className="lg:col-span-6">{PRICING_MATRIX_COPY.description}</p>
      </div>

      <div className="pricing-matrix-panel hidden sm:block">
        <div className="pricing-matrix-panel-bar">
          <span>{PRICING_MATRIX_COPY.tableDescription}</span>
          <strong>
            {String(PLAN_MATRIX_ROWS.length).padStart(2, "0")} ·{" "}
            {PRICING_MATRIX_COPY.criteriaLabel}
          </strong>
        </div>

        <div className="pricing-matrix-scroll">
          <table>
            <caption className="sr-only">{PRICING_MATRIX_COPY.title}</caption>
            <thead>
              <tr>
                <th scope="col">{PRICING_MATRIX_COPY.resourceLabel}</th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={plan.highlighted ? "is-highlighted" : undefined}
                  >
                    <span>{plan.name}</span>
                    <small>{plan.tagline}</small>
                    {plan.highlighted ? (
                      <em>{PRICING_MATRIX_COPY.recommended}</em>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_MATRIX_ROWS.map((row, index) => (
                <tr key={row.id}>
                  <th scope="row">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{row.label}</strong>
                      {row.helper ? <small>{row.helper}</small> : null}
                    </div>
                  </th>
                  {plans.map((plan) => (
                    <td
                      key={`${row.id}-${plan.id}`}
                      className={
                        plan.highlighted ? "is-highlighted" : undefined
                      }
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

      <details className="pricing-matrix-mobile group sm:hidden">
        <summary>
          <span>
            <SlidersHorizontal aria-hidden="true" />
          </span>
          <div>
            <strong>{PRICING_MATRIX_COPY.mobileSummary}</strong>
            <small>{PRICING_MATRIX_COPY.mobileHint}</small>
          </div>
          <ChevronDown aria-hidden="true" />
        </summary>

        <div className="pricing-mobile-matrix-rows">
          {PLAN_MATRIX_ROWS.map((row, index) => (
            <article key={row.id}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{row.label}</strong>
                  {row.helper ? <small>{row.helper}</small> : null}
                </div>
              </header>
              <dl>
                {plans.map((plan) => (
                  <div
                    key={`${row.id}-${plan.id}`}
                    className={plan.highlighted ? "is-highlighted" : undefined}
                  >
                    <dt>{plan.name}</dt>
                    <dd>
                      <MatrixCell plan={plan} row={row} />
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </details>
    </div>
  )
}
