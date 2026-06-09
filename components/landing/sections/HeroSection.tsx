import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import { HeroRotatingText } from "@/components/landing/client/HeroRotatingText"
import { LINKS } from "@/lib/landing-data"

export function HeroSection() {
  return (
    <section className="relative -mt-16 overflow-hidden">
      {/* Imagem de fundo — cidade noturna com dados georreferenciados */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>



      {/* Reforço à esquerda — cobertura total da coluna de texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.03_262.9)]/50 via-[oklch(0.08_0.03_262.9)]/90 via-[0%] to-transparent" />

      {/* Conteúdo */}
      <div className="container-landing relative flex min-h-[100dvh] flex-col justify-center py-32">
        <div className="flex max-w-2xl flex-col gap-10">
          <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[var(--color-data-green)]" />
            Plataforma imobiliária B2B · Trial 7 dias grátis
          </span>

          <h1 className="font-heading text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Prospecte terrenos.{" "}
            <br className="hidden sm:block" />
            Calcule viabilidade.{" "}
            <br className="hidden sm:block" />
            <HeroRotatingText />
          </h1>

          <p className="max-w-[52ch] text-lg leading-relaxed text-white">
            Da prospecção à legalização em uma única plataforma. DRE, TIR e fluxo
            de caixa em segundos — e aprovação no comitê em uma rodada, não quatro.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 gap-2 bg-white px-6 text-base font-semibold text-primary shadow-lg shadow-black/20 hover:bg-white/90 active:scale-[0.98]"
              nativeButton={false}
              render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="hero" />}
            >
              Começar trial gratuito
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="ghost-white"
              size="lg"
              className="h-12 gap-2 px-6 text-base"
              nativeButton={false}
              render={<Link href="/#funcionalidades" />}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10">
                <Play className="size-3 translate-x-px fill-white text-white" />
              </span>
              Ver demonstração
            </Button>
          </div>

          <p className="text-sm text-white/80">
            <span className="font-medium text-white">340+ incorporadoras</span> usam o SIGAPP hoje ·
            Sem cartão de crédito
          </p>
        </div>
      </div>
    </section>
  )
}
