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
      <div className="container-landing py-8">
        {/* Label */}
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">Usado por incorporadoras em todo o Brasil</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Logos marquee */}
        <div className="overflow-hidden">
          <div className="animate-marquee">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="mx-6 flex shrink-0 items-center justify-center"
              >
                <span className="whitespace-nowrap rounded-lg border border-border/60 bg-background px-4 py-2 text-xs font-semibold text-muted-foreground">
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
