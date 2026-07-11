import { ArrowRight, Check, X } from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { COMPARISON_ROWS, LINKS } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

const COLUMNS = [
  { key: "sigapp" as const, label: "SIGAPP", highlight: true },
  { key: "planilha" as const, label: "Planilha", highlight: false },
  { key: "erp" as const, label: "ERP genérico", highlight: false },
]

function Cell({ value, highlight }: { value: boolean; highlight: boolean }) {
  if (value) {
    return (
      <span
        className={cn(
          "mx-auto flex size-7 items-center justify-center rounded-full",
          highlight
            ? "bg-primary/12 text-primary"
            : "bg-(--color-data-green)/12 text-(--color-data-green)"
        )}
      >
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
    )
  }
  return (
    <span className="mx-auto flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground/45">
      <X className="size-3.5" strokeWidth={2.5} />
    </span>
  )
}

export function ComparisonSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-12 grid gap-5 md:mb-14 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <SectionLabel>Por que SIGAPP</SectionLabel>
            <h2 className="section-display text-foreground">
              Tudo que a planilha e o ERP não fazem
            </h2>
          </div>
          <p className="max-w-[52ch] text-pretty text-muted-foreground md:text-lg lg:col-span-7 lg:justify-self-end">
            Um sistema desenhado para incorporação, com contexto territorial,
            trilha de decisão e governança operacional desde a primeira análise.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-raise">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th
                    scope="col"
                    className="px-4 py-4 text-xs font-medium text-muted-foreground sm:px-5 sm:text-sm"
                  >
                    Recurso
                  </th>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={cn(
                        "px-2 py-4 text-center text-xs font-bold sm:text-sm",
                        col.highlight
                          ? "bg-(--color-brand-navy) text-white"
                          : "text-foreground"
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      i < COMPARISON_ROWS.length - 1 && "border-b border-border"
                    )}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3.5 text-xs font-medium text-foreground sm:px-5 sm:text-sm"
                    >
                      {row.label}
                    </th>
                    {COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-2 py-3.5 text-center",
                          col.highlight && "bg-primary/6"
                        )}
                      >
                        <Cell
                          value={row[col.key]}
                          highlight={col.highlight}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex flex-col items-start gap-2 md:mt-12">
          <Button
            variant="brand"
            size="lg"
            className="group/cta h-12 gap-2 rounded-full pr-2 pl-5 text-sm font-semibold sm:h-13 sm:pl-6 sm:text-base"
            nativeButton={false}
            render={
              <a
                href={LINKS.sales}
                data-analytics-event="sales_contact_click"
                data-analytics-location="comparison"
              />
            }
          >
            Construir o caso de negócio
            <span className="flex size-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5 sm:size-9">
              <ArrowRight className="size-3.5 sm:size-4" />
            </span>
          </Button>
          <p className="max-w-[48ch] text-sm text-muted-foreground">
            Compare o fluxo atual da sua equipe com uma operação territorial
            centralizada no SIGAPP.
          </p>
        </div>
      </div>
    </section>
  )
}
