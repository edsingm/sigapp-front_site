import { Button } from "@/components/ui/button"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
import { DashboardPreviewMock } from "@/components/landing/mocks/DashboardPreviewMock"
import { Play, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Background dot pattern */}
      <div className="bg-dot-pattern absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container-landing relative flex min-h-[100dvh] flex-col items-center justify-center py-24 lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:flex-1 lg:max-w-[52%]">
          <EyebrowBadge variant="amber">
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
            <Button variant="amber" size="lg" className="h-12 gap-2 px-6 text-base font-semibold">
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
