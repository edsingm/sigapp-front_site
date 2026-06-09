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
                className="mx-8 flex shrink-0 items-center justify-center"
              >
                <span className="font-heading whitespace-nowrap text-base font-extrabold tracking-tight text-muted-foreground/60">
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
