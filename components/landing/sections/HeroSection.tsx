import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import { DashboardPreviewMock } from "@/components/landing/mocks/DashboardPreviewMock"
import { Play, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Glow azul radial no topo */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[60vh] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-accent),transparent_70%)]" />

      {/* Mapa de São Paulo — neutralizado e tingido de azul */}
      <div className="absolute inset-0">
        <Image
          src="/map-saopaulo.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
          style={{ filter: "grayscale(100%) brightness(1.15) contrast(0.95)", opacity: 0.16 }}
        />
        {/* Tinta azul sobre o mapa */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply dark:mix-blend-screen" />
        {/* Fade lateral: esquerda sólida (legibilidade do texto) → direita transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-background from-[28%] via-background/75 to-background/15" />
        {/* Fade vertical: suaviza topo e rodapé */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/95" />
      </div>

      {/* Background dot pattern — sobreposto ao mapa com menos opacidade */}
      <div className="bg-dot-pattern absolute inset-0 opacity-40" />

      <div className="container-landing relative flex min-h-[100dvh] flex-col items-center justify-center py-24 lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:flex-1 lg:max-w-[52%]">
          <EyebrowBadge variant="brand">
            Plataforma imobiliária B2B · Trial 7 dias grátis
          </EyebrowBadge>

          <h1 className="font-heading text-5xl font-black tracking-tighter text-foreground md:text-6xl lg:text-7xl">
            Prospecte terrenos.{" "}
            <br className="hidden sm:block" />
            Calcule viabilidade.{" "}
            <br className="hidden sm:block" />
            <span className="text-primary">Feche negócios.</span>
          </h1>

          <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            Motor financeiro com 50+ parâmetros, IA conversacional especializada e
            workflow end-to-end para incorporadoras e imobiliárias.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="brand" size="lg" className="h-12 gap-2 px-6 text-base font-semibold">
              Começar trial gratuito
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="ghost" size="lg" className="h-12 gap-2 px-6 text-base">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                <Play className="size-3 translate-x-px fill-foreground text-foreground" />
              </span>
              Ver demonstração
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">340+ incorporadoras</span> usam o SIGAPP hoje ·
            Sem cartão de crédito
          </p>
        </div>

        {/* Right column — dashboard mock */}
        <div className="relative mt-12 w-full lg:mt-0 lg:flex-1 lg:max-w-[48%]">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent" />
          <DashboardPreviewMock />
        </div>
      </div>
    </section>
  )
}
