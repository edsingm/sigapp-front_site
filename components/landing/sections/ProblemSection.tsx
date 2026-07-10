import { PAIN_POINTS, PROBLEM_COPY } from "@/lib/landing-data"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"

export function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-32">
      <div className="pointer-events-none absolute -top-24 right-0 size-[28rem] rounded-full bg-primary/5 blur-3xl" />
      <div className="container-landing relative">
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

          <ScrollReveal stagger className="lg:col-span-7">
            <ol className="grid gap-3">
              {PAIN_POINTS.map((point, i) => (
                <li
                  key={point.title}
                  className="group grid gap-4 rounded-2xl border border-border bg-card/80 p-5 shadow-raise transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-panel sm:grid-cols-[4.5rem_1fr] sm:gap-7 sm:p-6"
                >
                  <span className="data-mono flex size-10 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
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
