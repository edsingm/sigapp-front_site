import { FEATURE_CARDS } from "@/lib/landing-data"
import { FeatureIcon } from "@/components/landing/ui/FeatureIcon"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import {
  MapPin,
  Calculator,
  Sparkles,
  Users,
  Handshake,
  Scale,
} from "lucide-react"

const ICON_MAP = {
  MapPin,
  Calculator,
  Sparkles,
  Users,
  Handshake,
  Scale,
}

export function FeatureGridSection() {
  return (
    <section id="beneficios" className="py-16 md:py-24">
      <div className="container-landing">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
          <EyebrowBadge variant="brand" className="self-center">Tudo em um só lugar</EyebrowBadge>
          <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            Tudo que você precisa para fechar terrenos
          </h2>
          <p className="text-pretty text-muted-foreground md:text-lg">
            Da prospecção à legalização, sem pular etapas e sem trocar de
            ferramenta. Configure e comece a analisar em minutos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map((card) => {
            const Icon = ICON_MAP[card.icon as keyof typeof ICON_MAP]
            return (
              <div
                key={card.title}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <FeatureIcon icon={Icon} size="lg" className="rounded-2xl" />
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
