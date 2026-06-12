import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LayoutGrid, Star } from "lucide-react"
import { HeroRotatingText } from "@/components/landing/client/HeroRotatingText"
import { HeroShowcase } from "@/components/landing/client/HeroShowcase"
import { LINKS } from "@/lib/landing-data"

const TRUST_AVATARS = ["TG", "HB", "ML", "VS", "PN"]

export function HeroSection() {
  return (
    <section id="hero" className="relative -mt-16 overflow-hidden">
      {/* Imagem de fundo — vista aérea de loteamento com dados georreferenciados */}
      <div className="absolute inset-0">
        <Image
          src="/image8.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/35" />

      {/* Blur suave e amplo para aumentar contraste sem criar efeito de card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full bg-black/38 md:inset-y-0 md:left-0 md:right-auto md:w-[72%] md:bg-linear-to-r md:from-black/40 md:via-black/30 md:to-transparent md:backdrop-blur-[3px] md:backdrop-brightness-70 md:mask-[linear-gradient(to_right,black_0%,black_58%,transparent_100%)]"
      />

      {/* Vitrine flutuante do produto (lg+) */}
      <HeroShowcase />

      {/* Conteúdo */}
      <div className="container-landing relative flex min-h-dvh flex-col justify-center py-24 sm:py-28 md:py-32">
        <div className="flex max-w-2xl flex-col gap-8 sm:gap-10 lg:max-w-132 xl:max-w-2xl">
          <span className="inline-flex w-fit max-w-full items-center gap-3 rounded-full border border-white/16 bg-white/12 px-3 py-1 text-[11px] leading-tight font-medium text-white shadow-sm shadow-black/10 md:backdrop-blur-md sm:text-xs">
            <span className="size-1.5 rounded-full bg-(--color-data-green)" />
            Plataforma imobiliária B2B · Trial 7 dias grátis
          </span>

          <h1 className="font-heading text-[2.35rem] leading-[0.96] font-black tracking-tighter text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-6xl xl:text-7xl">
            Prospecte terrenos.{" "}
            <br className="hidden sm:block" />
            Calcule viabilidade.{" "}
            <br className="hidden sm:block" />
            <HeroRotatingText />
          </h1>

          <p className="max-w-[34ch] text-base leading-relaxed text-white/92 sm:max-w-[52ch] sm:text-lg">
            Da prospecção à legalização em uma única plataforma. DRE, TIR e fluxo
            de caixa em segundos — e aprovação no comitê em uma rodada, não quatro.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 w-full gap-2 rounded-full bg-white px-6 text-base font-semibold text-primary shadow-lg shadow-black/20 hover:bg-white/90 active:scale-[0.98] sm:w-auto"
              nativeButton={false}
              render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="hero" />}
            >
              Começar trial gratuito
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="ghost-white"
              size="lg"
              className="h-12 w-full rounded-full gap-2 border border-white/14 bg-white/10 px-6 text-base md:backdrop-blur-sm sm:w-auto"
              nativeButton={false}
              render={<Link href="/#funcionalidades" data-analytics-event="features_view_click" data-analytics-location="hero" />}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10">
                <LayoutGrid className="size-3.5 text-white" />
              </span>
              Conhecer funcionalidades
            </Button>
          </div>

          {/* Prova social — avatares + avaliação */}
          <div className="flex items-center gap-3.5">
            <div className="flex -space-x-2.5">
              {TRUST_AVATARS.map((initials) => (
                <span
                  key={initials}
                  className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/14 text-[11px] font-bold text-white md:backdrop-blur-md"
                >
                  {initials}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-secondary text-secondary"
                  />
                ))}
                <span className="ml-1 text-xs font-semibold text-white">4,9</span>
              </div>
              <p className="text-sm leading-tight text-white/80">
                <span className="font-medium text-secondary">340+ incorporadoras</span>{" "}
                confiam no SIGAPP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
