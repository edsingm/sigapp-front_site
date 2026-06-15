import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LayoutGrid } from "lucide-react"
import { HeroShowcase } from "@/components/landing/client/HeroShowcase"
import { LINKS } from "@/lib/landing-data"

export function HeroSection() {
  return (
    <section id="hero" className="relative -mt-16 overflow-hidden bg-[#0B1E39]">
      <div className="absolute inset-0 left-[32%] opacity-55">
        <Image
          src="/image8.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center saturate-75"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-[#0B1E39] via-[#0B1E39]/96 to-[#0B1E39]/58" />
      <div className="bg-blueprint-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#0B1E39] to-transparent" />

      {/* Vitrine flutuante do produto (lg+) */}
      <HeroShowcase />

      {/* Conteúdo */}
      <div className="container-landing relative flex min-h-dvh flex-col justify-center py-24 sm:py-28 md:py-32">
        <div className="flex max-w-2xl flex-col gap-7 sm:gap-9 lg:max-w-132 xl:max-w-2xl">
          <span className="inline-flex w-fit max-w-full items-center gap-3 border-l-2 border-secondary pl-3 text-[11px] font-bold leading-tight tracking-[0.16em] text-secondary uppercase sm:text-xs">
            Do terreno ao retorno
          </span>

          <h1 className="font-heading text-[2.35rem] leading-[0.98] font-semibold tracking-[-0.035em] text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-6xl xl:text-7xl">
            Prospecte terrenos.{" "}
            <br className="hidden sm:block" />
            Calcule viabilidade.{" "}
            <br className="hidden sm:block" />
            <span className="text-secondary">Decida com clareza.</span>
          </h1>

          <p className="max-w-[34ch] text-base leading-relaxed text-white/92 sm:max-w-[52ch] sm:text-lg">
            Da prospecção à legalização em uma única plataforma. DRE, TIR e fluxo
            de caixa em segundos — e aprovação no comitê em uma rodada, não quatro.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 w-full gap-2 rounded-md bg-primary px-6 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
              nativeButton={false}
              render={<a href={LINKS.signup} data-analytics-event="trial_signup_click" data-analytics-location="hero" />}
            >
              Começar trial gratuito
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="ghost-white"
              size="lg"
              className="h-12 w-full gap-2 rounded-md border border-white/16 bg-white/6 px-6 text-base md:backdrop-blur-sm sm:w-auto"
              nativeButton={false}
              render={<Link href="/#funcionalidades" data-analytics-event="features_view_click" data-analytics-location="hero" />}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/8">
                <LayoutGrid className="size-3.5 text-white" />
              </span>
              Conhecer funcionalidades
            </Button>
          </div>

          <div className="grid max-w-lg grid-cols-2 gap-6 border-t border-white/14 pt-6">
            <div>
              <p className="font-heading text-2xl font-semibold text-white">340+</p>
              <p className="mt-1 text-xs leading-relaxed text-white/58">
                incorporadoras ativas
              </p>
            </div>
            <div className="border-l border-white/14 pl-6">
              <p className="font-heading text-2xl font-semibold text-white">R$ 2,4B</p>
              <p className="mt-1 text-xs leading-relaxed text-white/58">
                em terrenos analisados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
