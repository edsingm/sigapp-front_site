import { COMPARISON_ROWS, LINKS } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight } from "lucide-react"

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
            ? "bg-primary/12 text-primary"
            : "bg-(--color-data-green)/12 text-(--color-data-green)"
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
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-32">
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-primary/5 blur-3xl" />
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-16 grid gap-6 md:mb-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-5 lg:col-span-5">
            <SectionLabel>Por que SIGAPP</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Tudo que a planilha e o ERP não fazem
            </h2>
          </div>
          <p className="max-w-[58ch] text-pretty text-muted-foreground md:text-lg lg:col-span-7 lg:justify-self-end">
            Um sistema desenhado para incorporação, com contexto territorial,
            trilha de decisão e governança operacional desde a primeira análise.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mx-auto max-w-4xl">
          <div className="card-bezel shadow-float">
            <div className="card-bezel__core overflow-hidden">
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
                        ? "bg-(--color-brand-navy) text-white"
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
                  className={`grid grid-cols-[1.6fr_repeat(3,1fr)] ${
                    i < COMPARISON_ROWS.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="px-3 py-3 text-xs font-medium text-foreground sm:px-5 sm:py-4 sm:text-sm">
                    {row.label}
                  </div>
                  {COLUMNS.map((col) => (
                    <div
                      key={col.key}
                      className={`flex items-center justify-center px-2 py-3 sm:py-4 ${col.highlight ? "bg-primary/8 ring-1 ring-primary/10 ring-inset" : ""}`}
                    >
                      <Cell value={row[col.key]} highlight={col.highlight} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA intermediário — ponto de maior persuasão antes do pricing */}
        <div className="mx-auto mt-14 flex max-w-4xl flex-col items-start gap-3 md:mt-16">
          <Button
            variant="brand"
            size="lg"
            className="group/cta h-13 gap-2 rounded-full pr-2 pl-6 text-base font-semibold"
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
            <span className="flex size-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <p className="text-sm text-muted-foreground">
            Compare o fluxo atual da sua equipe com uma operação territorial
            centralizada no SIGAPP.
          </p>
        </div>
      </div>
    </section>
  )
}
