import { Fragment } from "react"
import {
  Check,
  ChevronDown,
  Minus,
  MoveHorizontal,
  Rows3,
  SlidersHorizontal,
} from "lucide-react"

import {
  PLAN_MATRIX_GROUPS,
  PLAN_MATRIX_ROWS,
  PRICING_MATRIX_COPY,
  type PlanConfig,
  type PlanMatrixRow,
} from "@/lib/landing-data"
import { cn } from "@/lib/utils"

const EMPTY_VALUES = new Set(["Não incluso", "não incluso", ""])

function getMatrixValue(plan: PlanConfig, row: PlanMatrixRow) {
  return plan[row.field]
}

function isEmptyValue(value: PlanConfig[PlanMatrixRow["field"]]) {
  if (typeof value === "boolean") return !value
  return EMPTY_VALUES.has(String(value).trim())
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

  const text = String(value)
  const empty = isEmptyValue(value)

  return (
    <span className={cn("pricing-matrix-text", empty && "is-empty")}>
      {text}
    </span>
  )
}

function MatrixRowLabel({
  row,
  index,
}: {
  row: PlanMatrixRow
  index: number
}) {
  return (
    <>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>{row.label}</strong>
        {row.helper ? <small>{row.helper}</small> : null}
      </div>
    </>
  )
}

type PricingFeatureMatrixProps = {
  plans: PlanConfig[]
}

/** Índice global do critério (01…N) a partir do id da linha. */
function criterionNumber(rowId: string) {
  return PLAN_MATRIX_ROWS.findIndex((row) => row.id === rowId) + 1
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

        <p
          id="pricing-matrix-scroll-hint"
          className="pricing-matrix-scroll-hint"
        >
          <MoveHorizontal aria-hidden="true" />
          {PRICING_MATRIX_COPY.scrollHint}
        </p>

        <div
          className="pricing-matrix-scroll"
          role="region"
          aria-label={PRICING_MATRIX_COPY.scrollRegionLabel}
          aria-describedby="pricing-matrix-scroll-hint"
          tabIndex={0}
        >
          <table>
            <caption className="sr-only">{PRICING_MATRIX_COPY.title}</caption>
            <colgroup>
              <col className="pricing-matrix-col-feature" />
              {plans.map((plan) => (
                <col
                  key={plan.id}
                  className={cn(
                    "pricing-matrix-col-plan",
                    plan.highlighted && "is-highlighted"
                  )}
                />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{PRICING_MATRIX_COPY.resourceLabel}</th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={plan.highlighted ? "is-highlighted" : undefined}
                  >
                    <span>{plan.shortName || plan.name}</span>
                    <small>{plan.highlight}</small>
                    {plan.highlighted ? (
                      <em>{PRICING_MATRIX_COPY.recommended}</em>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_MATRIX_GROUPS.map((group) => (
                <Fragment key={group.id}>
                  <tr className="pricing-matrix-group-row">
                    <th scope="colgroup" colSpan={plans.length + 1}>
                      {group.label}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.id}>
                      <th scope="row">
                        <MatrixRowLabel
                          row={row}
                          index={criterionNumber(row.id) - 1}
                        />
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
                </Fragment>
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
          {PLAN_MATRIX_GROUPS.map((group) => (
            <section
              key={group.id}
              className="pricing-mobile-matrix-group"
              aria-label={group.label}
            >
              <h4 className="pricing-mobile-matrix-group-label">
                {group.label}
              </h4>
              {group.rows.map((row) => (
                <article key={row.id}>
                  <header>
                    <span>
                      {String(criterionNumber(row.id)).padStart(2, "0")}
                    </span>
                    <div>
                      <strong>{row.label}</strong>
                      {row.helper ? <small>{row.helper}</small> : null}
                    </div>
                  </header>
                  <dl>
                    {plans.map((plan) => (
                      <div
                        key={`${row.id}-${plan.id}`}
                        className={
                          plan.highlighted ? "is-highlighted" : undefined
                        }
                      >
                        <dt>{plan.shortName || plan.name}</dt>
                        <dd>
                          <MatrixCell plan={plan} row={row} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </section>
          ))}
        </div>
      </details>
    </div>
  )
}
