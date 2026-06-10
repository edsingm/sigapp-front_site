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
        {/* Label */}
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-primary/12" />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary/75">
            Usado por incorporadoras em todo o Brasil
          </span>
          <div className="h-px flex-1 bg-primary/12" />
        </div>

        {/* Logos marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="mx-6 flex shrink-0 items-center justify-center sm:mx-8"
              >
                <span className="font-heading whitespace-nowrap text-sm font-extrabold tracking-tight text-muted-foreground/70 sm:text-base">
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
