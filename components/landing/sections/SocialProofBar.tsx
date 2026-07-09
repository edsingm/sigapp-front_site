import { DOMAIN_STRIP, METRICS } from "@/lib/landing-data"

export function SocialProofBar() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-landing py-12 sm:py-16">
        {/* Métricas operacionais — prova de produto, não contagem de clientes */}
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

        <div className="mt-10 flex items-center gap-5">
          <span className="coord shrink-0 text-muted-foreground/70">
            Desenhado para o ofício de incorporar
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div
          className="marquee-mask mt-5 overflow-hidden"
          aria-label="Capacidades do domínio de incorporação"
        >
          <div className="animate-marquee" aria-hidden="true">
            {[...DOMAIN_STRIP, ...DOMAIN_STRIP].map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="mx-5 flex shrink-0 items-center gap-5 sm:mx-7"
              >
                <span className="whitespace-nowrap font-heading text-sm font-semibold tracking-tight text-foreground/50 sm:text-base">
                  {item}
                </span>
                <span className="size-1 shrink-0 rounded-full bg-foreground/15" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
