import { METRICS, CLIENT_LOGOS } from "@/lib/landing-data"

export function SocialProofBar() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-landing py-12 sm:py-16">
        {/* Métricas — campo editorial, separadas por hairlines */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 bg-card px-5 py-6 sm:px-7 sm:py-8"
            >
              <p className="data-mono font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {metric.value}
              </p>
              <p className="coord text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Logos — usado por incorporadoras em todo o Brasil */}
        <div className="mt-10 flex items-center gap-5">
          <span className="coord shrink-0 text-muted-foreground/70">
            Usado por incorporadoras em todo o Brasil
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div
          className="marquee-mask mt-5 overflow-hidden"
          aria-label="Clientes que usam o SIGAPP"
        >
          <div className="animate-marquee" aria-hidden="true">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="mx-6 flex shrink-0 items-center gap-6 sm:mx-8"
              >
                <span className="font-heading text-sm font-bold whitespace-nowrap text-foreground/55 sm:text-base">
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
