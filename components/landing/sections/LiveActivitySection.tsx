import { LIVE_ACTIVITY } from "@/lib/landing-data"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import { MapPin } from "lucide-react"

function ActivityPill({ action, location }: { action: string; location: string }) {
  return (
    <div className="mx-3 flex shrink-0 items-center gap-3 rounded-full border border-border bg-card py-2.5 pl-3 pr-5 shadow-sm">
      <span className="relative flex size-2.5 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-data-green)] opacity-60" />
        <span className="relative inline-flex size-2.5 rounded-full bg-[var(--color-data-green)]" />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-foreground">
        {action}
      </span>
      <span className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground">
        <MapPin className="size-3" />
        {location}
      </span>
    </div>
  )
}

export function LiveActivitySection() {
  return (
    <section className="py-14 md:py-20">
      <div className="container-landing mb-8 flex flex-col items-center gap-4 text-center md:mb-10">
        <EyebrowBadge variant="brand">Ao vivo na plataforma</EyebrowBadge>
        <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl">
          Enquanto você decide, o mercado se move
        </h2>
        <p className="max-w-xl text-muted-foreground md:text-lg">
          Incorporadoras de todo o Brasil analisam, aprovam e fecham negócios no
          SIGAPP a cada minuto.
        </p>
      </div>

      {/* Faixa de feed com fade nas laterais */}
      <div className="relative overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee">
          {[...LIVE_ACTIVITY, ...LIVE_ACTIVITY].map((item, i) => (
            <ActivityPill key={`${item.action}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
