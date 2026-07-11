import { DOMAIN_STRIP, METRICS } from "@/lib/landing-data"

export function SocialProofBar() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container-landing py-10 sm:py-12">
        <div className="mb-6 flex items-center gap-4">
          <span className="coord shrink-0 text-muted-foreground">
            Legenda operacional
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="legend-strip">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 px-5 py-5 sm:px-6 sm:py-6"
            >
              <p className="data-mono font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {metric.value}
              </p>
              <p className="coord text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <div
          className="marquee-mask mt-8 overflow-hidden border-t border-border pt-6"
          aria-label="Capacidades do domínio de incorporação"
        >
          <div className="animate-marquee" aria-hidden="true">
            {[...DOMAIN_STRIP, ...DOMAIN_STRIP].map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="mx-5 flex shrink-0 items-center gap-5 sm:mx-7"
              >
                <span className="font-heading text-sm font-semibold tracking-tight whitespace-nowrap text-foreground/45 sm:text-base">
                  {item}
                </span>
                <span className="size-1 shrink-0 rounded-full bg-foreground/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
