import { PAIN_POINTS, PROBLEM_COPY } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <div className="container-landing relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal
            stagger
            className="flex flex-col gap-5 lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            <SectionLabel>{PROBLEM_COPY.eyebrow}</SectionLabel>
            <h2 className="section-display text-foreground">
              {PROBLEM_COPY.title}
            </h2>
            <p className="max-w-[40ch] text-pretty text-muted-foreground md:text-lg">
              {PROBLEM_COPY.description}
            </p>
            <p className="coord mt-2 text-muted-foreground/70">
              Camadas de atrito · 0{PAIN_POINTS.length} estratos
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="lg:col-span-7">
            <ol className="relative flex flex-col">
              <div
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-border sm:left-[1.35rem]"
              />
              {PAIN_POINTS.map((point, i) => (
                <li
                  key={point.title}
                  className="group relative grid gap-4 py-5 sm:grid-cols-[3.25rem_1fr] sm:gap-6 sm:py-6"
                >
                  <span className="relative z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background data-mono text-[11px] font-bold text-muted-foreground shadow-sm transition-colors group-hover:border-primary/25 group-hover:text-primary sm:size-11 sm:text-xs">
                    0{i + 1}
                  </span>
                  <div className="min-w-0 border-b border-border pb-5 group-last:border-0 group-last:pb-0 sm:pb-6">
                    <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
