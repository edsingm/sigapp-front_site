import { PAIN_POINTS } from "@/lib/landing-data"
import { FileSpreadsheet, FolderX, BotOff } from "lucide-react"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"

const ICON_MAP = {
  FileSpreadsheet,
  FolderX,
  BotOff,
}

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-landing">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — headline */}
          <div className="flex flex-col justify-center gap-4 lg:col-span-5">
            <SectionLabel>O problema</SectionLabel>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Incorporar terreno ainda parece uma sequência de planilhas perdidas?
            </h2>
            <p className="text-muted-foreground md:text-lg">
              O mercado imobiliário brasileiro evoluiu. As ferramentas que a maioria usa, não.
            </p>
          </div>

          {/* Right — pain points */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {PAIN_POINTS.map((point) => {
              const Icon = ICON_MAP[point.icon as keyof typeof ICON_MAP]
              return (
                <div
                  key={point.title}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    {Icon && <Icon className="size-5" strokeWidth={1.75} />}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
