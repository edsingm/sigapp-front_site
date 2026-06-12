import { METRICS } from "@/lib/landing-data"

const LOGOS = [
  "Terraplan",
  "Grupo Habitare",
  "Incorp. Leste Sul",
  "Construtora Meridian",
  "Grupo Imobiliare",
  "Incorp. Vitória",
  "Construtora Nobre",
  "Grupo Panorama",
]

export function SocialProofBar() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="container-landing py-8 sm:py-9">
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-primary/12" />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/88">
            Usado por incorporadoras em todo o Brasil
          </span>
          <div className="h-px flex-1 bg-primary/12" />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-border bg-background/80 px-4 py-3 shadow-sm"
            >
              <p className="font-heading text-xl font-black tracking-tight text-foreground sm:text-2xl">
                {metric.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="mx-6 flex shrink-0 items-center justify-center sm:mx-8"
              >
                <span className="font-heading whitespace-nowrap text-sm font-extrabold tracking-tight text-foreground/88 sm:text-base">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
