import {
  ArrowUpRight,
  Check,
  Minus,
  MoveHorizontal,
  ScanLine,
} from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import {
  COMPARISON_COLUMNS,
  COMPARISON_COPY,
  COMPARISON_ROWS,
  LINKS,
} from "@/lib/landing-data"
import { cn } from "@/lib/utils"

function MatrixCell({
  value,
  highlight,
}: {
  value: boolean
  highlight: boolean
}) {
  return (
    <span
      className={cn(
        "comparison-cell",
        value ? "is-available" : "is-unavailable",
        highlight && "is-highlighted"
      )}
    >
      {value ? <Check aria-hidden="true" /> : <Minus aria-hidden="true" />}
      <span>
        {value
          ? COMPARISON_COPY.availableLabel
          : COMPARISON_COPY.unavailableLabel}
      </span>
    </span>
  )
}

export function ComparisonSection() {
  return (
    <section className="comparison-stage" aria-labelledby="comparison-title">
      <div className="comparison-stage-line" aria-hidden="true" />
      <div className="container-landing comparison-shell">
        <ScrollReveal
          stagger
          className="comparison-intro lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <span className="comparison-eyebrow">
              <ScanLine aria-hidden="true" />
              {COMPARISON_COPY.eyebrow}
            </span>
            <h2 id="comparison-title" className="comparison-heading">
              <span>{COMPARISON_COPY.titleLine1}</span>
              <strong>{COMPARISON_COPY.titleLine2}</strong>
            </h2>
          </div>
          <p className="lg:col-span-4">{COMPARISON_COPY.description}</p>
        </ScrollReveal>

        <ScrollReveal className="comparison-matrix">
          <div className="comparison-matrix-bar">
            <span>{COMPARISON_COPY.tableLabel}</span>
            <strong>
              {String(COMPARISON_ROWS.length).padStart(2, "0")} /{" "}
              {String(COMPARISON_ROWS.length).padStart(2, "0")}
            </strong>
          </div>

          <p id="comparison-scroll-hint" className="comparison-scroll-hint">
            <MoveHorizontal aria-hidden="true" />
            {COMPARISON_COPY.scrollHint}
          </p>

          <div
            className="comparison-table-scroll"
            role="region"
            aria-label={COMPARISON_COPY.scrollRegionLabel}
            aria-describedby="comparison-scroll-hint"
            tabIndex={0}
          >
            <table>
              <caption className="sr-only">
                {COMPARISON_COPY.tableLabel}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{COMPARISON_COPY.resourceLabel}</th>
                  {COMPARISON_COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={
                        column.key === "sigapp" ? "is-sigapp" : undefined
                      }
                    >
                      <span>{column.label}</span>
                      <small>{column.note}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, index) => (
                  <tr key={row.label}>
                    <th scope="row">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {row.label}
                    </th>
                    {COMPARISON_COLUMNS.map((column) => (
                      <td
                        key={column.key}
                        className={
                          column.key === "sigapp" ? "is-sigapp" : undefined
                        }
                      >
                        <MatrixCell
                          value={row[column.key]}
                          highlight={column.key === "sigapp"}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal className="comparison-footer">
          <p>{COMPARISON_COPY.ctaNote}</p>
          <a
            href={LINKS.sales}
            className="comparison-action"
            data-analytics-event="sales_contact_click"
            data-analytics-location="comparison"
          >
            {COMPARISON_COPY.cta}
            <span>
              <ArrowUpRight aria-hidden="true" />
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
