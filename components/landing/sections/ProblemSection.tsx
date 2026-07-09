import { PAIN_POINTS, PROBLEM_COPY } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-landing">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal
            stagger
            className="flex flex-col justify-center gap-6 lg:col-span-5"
          >
            <SectionLabel>{PROBLEM_COPY.eyebrow}</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              {PROBLEM_COPY.title}
            </h2>
            <p className="max-w-[40ch] text-pretty text-muted-foreground md:text-lg">
              {PROBLEM_COPY.description}
            </p>
          </ScrollReveal>

          {/* Lista editorial — sem cards iguais de template */}
          <ScrollReveal stagger className="lg:col-span-7">
            <ol className="divide-y divide-border border-y border-border">
              {PAIN_POINTS.map((point, i) => (
                <li
                  key={point.title}
                  className="grid gap-4 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
                >
                  <span className="data-mono text-sm font-semibold text-muted-foreground/60">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {point.title}
                    </h3>
                    <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground md:text-base">
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
