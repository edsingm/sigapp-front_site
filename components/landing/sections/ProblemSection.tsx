import { PAIN_POINTS } from "@/lib/landing-data"
import { FileSpreadsheet, FolderX, BotOff } from "lucide-react"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"

const ICON_MAP = {
  FileSpreadsheet,
  FolderX,
  BotOff,
}

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-landing">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Esquerda — manchete (4–5 colunas) */}
          <ScrollReveal
            stagger
            className="flex flex-col justify-center gap-6 lg:col-span-5"
          >
            <SectionLabel>O problema</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Incorporar terreno ainda parece uma sequência de planilhas
              perdidas?
            </h2>
            <p className="text-pretty text-muted-foreground md:text-lg">
              O mercado imobiliário brasileiro evoluiu. As ferramentas que a
              maioria usa, não.
            </p>
          </ScrollReveal>

          {/* Direita — dores (7–8 colunas) */}
          <ScrollReveal stagger className="flex flex-col gap-4 lg:col-span-7">
            {PAIN_POINTS.map((point, i) => {
              const Icon = ICON_MAP[point.icon as keyof typeof ICON_MAP]
              return (
                <div
                  key={point.title}
                  className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:border-destructive/25 hover:shadow-panel"
                >
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <span className="coord text-muted-foreground/50">
                      0{i + 1}
                    </span>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      {Icon && <Icon className="size-5" strokeWidth={1.5} />}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
