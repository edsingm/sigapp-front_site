import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HERO_COPY, HERO_PROOF_ITEMS, LINKS } from "@/lib/landing-data"

function HeroMapPanel() {
  const { panel } = HERO_COPY

  return (
    <div className="relative h-full min-h-[22rem] w-full overflow-hidden sm:min-h-[28rem] lg:min-h-0 lg:rounded-none">
      <Image
        src="/images/hero-territorio.jpg"
        alt={panel.photoAlt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 52vw"
        className="object-cover object-center"
      />

      {/* Gradiente de leitura — navy da marca, não filtro genérico */}
      <div className="absolute inset-0 bg-linear-to-t from-(--color-brand-navy)/88 via-(--color-brand-navy)/25 to-(--color-brand-navy)/10" />
      <div className="absolute inset-0 bg-linear-to-r from-(--color-brand-navy)/20 via-transparent to-transparent lg:from-transparent" />

      {/* Camada cartográfica */}
      <svg
        viewBox="0 0 800 640"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M120 180 280 140 420 160 560 120 680 200 640 360 480 400 260 380 140 300Z"
          className="stroke-white/20"
          strokeWidth="1"
        />
        <path
          d="M280 140 310 310 140 300M420 160 400 390M560 120 500 360"
          className="stroke-white/12"
          strokeWidth="1"
        />
        <path
          d="M340 220 490 250 520 360 360 340Z"
          className="fill-primary/25 stroke-primary"
          strokeWidth="2"
        />
        <circle cx="420" cy="290" r="4" className="fill-white" />
        <path
          d="M160 240C260 280 340 270 430 320 530 380 620 390 720 360"
          className="stroke-secondary/80"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />
      </svg>

      {/* Cabeçalho de campo */}
      <div className="absolute top-0 right-0 left-0 flex items-start justify-between gap-4 p-5 sm:p-6 lg:p-7">
        <div>
          <p className="coord text-white/50">{panel.sector}</p>
          <p className="mt-1 font-heading text-sm font-semibold text-white sm:text-base">
            {panel.sectorName}
          </p>
        </div>
        <p className="data-mono shrink-0 text-[11px] text-white/55 sm:text-xs">
          {panel.coords}
        </p>
      </div>

      {/* Legenda operacional — uma faixa, sem card de dashboard genérico */}
      <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/12 bg-white/10 backdrop-blur-md sm:grid-cols-4">
          <LegendCell label="Status" value={panel.status} accent />
          <LegendCell label="TIR" value={panel.tir} />
          <LegendCell label="Área" value={panel.area} />
          <LegendCell label="VGV" value={panel.vgv} />
        </div>
      </div>
    </div>
  )
}

function LegendCell({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 bg-(--color-brand-navy)/75 px-3.5 py-3 sm:px-4 sm:py-3.5">
      <p className="coord text-white/45">{label}</p>
      <p
        className={`data-mono text-sm font-bold sm:text-base ${
          accent ? "text-(--color-data-green)" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div className="lg:grid lg:min-h-[min(92dvh,56rem)] lg:grid-cols-12">
        {/* Discurso — 5 colunas */}
        <div className="container-landing flex flex-col justify-center py-28 sm:py-32 lg:col-span-5 lg:max-w-none lg:px-0 lg:py-0 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+4rem))] lg:pr-10 xl:pr-14">
          <div className="flex max-w-xl flex-col gap-8 lg:max-w-none">
            <span className="eyebrow text-(--color-brand-navy) dark:text-secondary">
              {HERO_COPY.eyebrow}
            </span>

            <div className="space-y-5">
              <h1 className="font-heading text-[2.5rem] leading-[1.02] font-bold tracking-[-0.03em] text-balance text-foreground sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                <span className="block">{HERO_COPY.titleLine1}</span>
                <span className="mt-1 block text-foreground/90">
                  {HERO_COPY.titleLine2}
                </span>
              </h1>
              <p className="max-w-[40ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                {HERO_COPY.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="group/cta h-12 w-full gap-2 rounded-full pr-1.5 pl-6 text-base font-semibold shadow-cta sm:w-auto"
                nativeButton={false}
                render={
                  <Link
                    href={LINKS.demo}
                    data-analytics-event="demo_request"
                    data-analytics-location="hero"
                  />
                }
              >
                {HERO_COPY.primaryCta}
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </Button>
              <Link
                href="/#como-funciona"
                data-analytics-event="features_view_click"
                data-analytics-location="hero"
                className="inline-flex h-12 items-center justify-center px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:justify-start"
              >
                {HERO_COPY.secondaryCta}
                <span className="ml-1.5 text-foreground/40">→</span>
              </Link>
            </div>

            <dl className="grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
              {HERO_PROOF_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 sm:px-4 first:sm:pl-0 last:sm:pr-0"
                >
                  <dt className="coord text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-semibold tracking-tight text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Evidência — 7 colunas, bleed à direita no desktop */}
        <div className="relative lg:col-span-7">
          <div className="px-4 pb-8 sm:px-6 lg:absolute lg:inset-0 lg:px-0 lg:pb-0">
            <div className="h-full overflow-hidden rounded-2xl border border-border shadow-float lg:rounded-none lg:border-0 lg:border-l lg:border-border lg:shadow-none">
              <HeroMapPanel />
            </div>
          </div>
          {/* Altura de referência no desktop (painel é absolute) */}
          <div className="hidden lg:block lg:min-h-[min(92dvh,56rem)]" />
        </div>
      </div>
    </section>
  )
}
