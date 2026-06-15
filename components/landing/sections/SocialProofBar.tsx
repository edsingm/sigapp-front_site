import { METRICS, CLIENT_LOGOS } from "@/lib/landing-data"

export function SocialProofBar() {
  return (
    <section className="border-y border-border bg-background">
      <div className="container-landing py-8 sm:py-10">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Usado por incorporadoras em todo o Brasil
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="relative overflow-hidden rounded-xl border border-border bg-card px-5 py-4"
            >
              <div className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
              <p className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="marquee-mask overflow-hidden" aria-label="Clientes que usam o SIGAPP">
          <div className="animate-marquee" aria-hidden="true">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="mx-6 flex shrink-0 items-center gap-6 sm:mx-8"
              >
                <span className="font-heading whitespace-nowrap text-sm font-extrabold tracking-tight text-foreground/70 sm:text-base">
                  {logo}
                </span>
                <span className="size-1 shrink-0 rounded-full bg-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
