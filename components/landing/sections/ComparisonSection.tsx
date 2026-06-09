import { COMPARISON_ROWS } from "@/lib/landing-data"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import { Check, X } from "lucide-react"

const COLUMNS = [
  { key: "sigapp" as const, label: "SIGAPP", highlight: true },
  { key: "planilha" as const, label: "Planilha manual", highlight: false },
  { key: "erp" as const, label: "ERP genérico", highlight: false },
]

function Cell({ value, highlight }: { value: boolean; highlight: boolean }) {
  if (value) {
    return (
      <span
        className={`mx-auto flex size-7 items-center justify-center rounded-full ${
          highlight
            ? "bg-primary text-primary-foreground"
            : "bg-[var(--color-data-green)]/12 text-[var(--color-data-green)]"
        }`}
      >
        <Check className="size-4" strokeWidth={2.5} />
      </span>
    )
  }
  return (
    <span className="mx-auto flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
      <X className="size-4" strokeWidth={2.5} />
    </span>
  )
}

export function ComparisonSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-landing">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
          <EyebrowBadge variant="brand">Por que SIGAPP</EyebrowBadge>
          <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            Tudo que a planilha e o ERP não fazem
          </h2>
          <p className="text-pretty text-muted-foreground md:text-lg">
            Uma plataforma desenhada do zero para incorporação — não um genérico
            adaptado às pressas.
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          {/* Cabeçalho */}
          <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] border-b border-border bg-muted/40">
            <div className="px-3 py-4 text-xs font-medium text-muted-foreground sm:px-5 sm:py-5 sm:text-sm">
              Recurso
            </div>
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className={`px-2 py-4 text-center text-xs font-bold sm:py-5 sm:text-sm ${
                  col.highlight
                    ? "bg-primary/5 text-primary"
                    : "text-foreground"
                }`}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Linhas */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.6fr_repeat(3,1fr)] items-center ${
                i < COMPARISON_ROWS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="px-3 py-3 text-xs font-medium text-foreground sm:px-5 sm:py-4 sm:text-sm">
                {row.label}
              </div>
              {COLUMNS.map((col) => (
                <div
                  key={col.key}
                  className={`px-2 py-3 sm:py-4 ${col.highlight ? "bg-primary/5" : ""}`}
                >
                  <Cell value={row[col.key]} highlight={col.highlight} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
