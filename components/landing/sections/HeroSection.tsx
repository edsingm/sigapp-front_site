import Link from "next/link"
import { ArrowDown, ArrowRight, ScanLine } from "lucide-react"

import { HeroBackgroundVideo } from "@/components/landing/client/HeroBackgroundVideo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HERO_COPY, HERO_PROOF_ITEMS, LINKS } from "@/lib/landing-data"

function TerrainMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-l border-white/12 pl-3 first:border-0 first:pl-0">
      <p className="coord text-white/42">{label}</p>
      <p className="data-mono mt-1 truncate text-sm font-bold text-white">
        {value}
      </p>
    </div>
  )
}

function TerrainReadout({ className }: { className?: string }) {
  const { panel } = HERO_COPY

  return (
    <aside
      aria-label="Leitura territorial de exemplo"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/14 bg-(--color-brand-navy)/62 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-5",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="relative inline-flex size-2 rounded-full bg-(--color-data-green)" />
            </span>
            <p className="coord text-white/55">Leitura territorial ativa</p>
          </div>
          <p className="mt-3 max-w-[18rem] font-heading text-base leading-snug font-semibold text-white sm:text-lg">
            {panel.sectorName}
          </p>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-secondary">
          <ScanLine className="size-4" />
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-white/12 pt-3">
        <span className="data-mono text-[10px] text-white/48">
          {panel.coords}
        </span>
        <span className="rounded-full bg-(--color-data-green)/14 px-2.5 py-1 text-[10px] font-bold text-(--color-data-green)">
          {panel.status}
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-3 border-t border-white/12 pt-4">
        <TerrainMetric label="TIR" value={panel.tir} />
        <TerrainMetric label="Área" value={panel.area} />
        <TerrainMetric label="VGV" value={panel.vgv} />
      </div>
    </aside>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-(--color-brand-navy) text-white"
    >
      <HeroBackgroundVideo />

      <div className="absolute inset-0 bg-linear-to-r from-(--color-brand-navy)/96 via-(--color-brand-navy)/68 to-(--color-brand-navy)/18" />
      <div className="absolute inset-0 bg-linear-to-t from-(--color-brand-navy)/88 via-transparent to-(--color-brand-navy)/48" />
      <div className="grain-overlay opacity-[0.07]" />

      {/* Spatial diagram — parcel language, not decoration */}
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
      >
        <path
          d="M730 198 930 154 1085 238 1038 447 856 498 684 406Z"
          className="fill-primary/12 stroke-secondary/75"
          strokeWidth="1.5"
        />
        <path
          d="M730 198 824 352 684 406M930 154 902 470M1085 238 910 338 1038 447"
          className="stroke-white/18"
          strokeWidth="1"
        />
        <circle cx="866" cy="344" r="5" className="fill-white" />
        <circle
          cx="866"
          cy="344"
          r="18"
          className="fill-none stroke-white/25"
          strokeWidth="1"
        />
        <path
          d="M604 528C742 470 840 534 970 474 1048 438 1114 432 1190 454"
          className="hero-route-line stroke-secondary/65"
          strokeWidth="1.5"
          strokeDasharray="6 12"
          strokeLinecap="round"
        />
      </svg>

      <div className="container-landing relative z-10 flex min-h-[100svh] flex-col pt-24 pb-6 sm:pt-28 sm:pb-8 lg:pt-28">
        <div className="flex flex-1 items-center">
          <div className="max-w-[42rem] min-w-0 pb-8 lg:pb-12">
            <p className="eyebrow text-secondary">{HERO_COPY.eyebrow}</p>

            <h1 className="mt-5 font-heading text-[2.65rem] leading-[0.96] font-bold tracking-[-0.05em] text-balance text-white sm:text-6xl lg:text-7xl xl:text-[5rem]">
              <span className="block">{HERO_COPY.titleLine1}</span>
              <span className="mt-1.5 block text-white/92">
                {HERO_COPY.titleLine2}
              </span>
            </h1>

            <p className="mt-6 max-w-[38rem] text-base leading-relaxed text-white/70 sm:text-lg">
              {HERO_COPY.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Button
                size="lg"
                className="group/cta h-13 w-full gap-2 rounded-full bg-primary pr-2 pl-6 text-base font-semibold text-white shadow-cta hover:bg-primary/90 sm:w-auto"
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
                <span className="flex size-9 items-center justify-center rounded-full bg-white/18 transition-transform duration-300 group-hover/cta:translate-x-0.5">
                  <ArrowRight className="size-4" />
                </span>
              </Button>

              <Link
                href="/#como-funciona"
                data-analytics-event="features_view_click"
                data-analytics-location="hero"
                className="cta-link justify-center text-white/78 hover:text-white sm:justify-start"
              >
                {HERO_COPY.secondaryCta}
                <ArrowDown className="size-3.5 opacity-70" />
              </Link>
            </div>

            <dl className="mt-9 grid grid-cols-3 gap-0 border-t border-white/12 pt-5">
              {HERO_PROOF_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    "min-w-0 pr-3",
                    i > 0 && "border-l border-white/12 pl-3 sm:pl-4"
                  )}
                >
                  <dt className="coord text-white/40">{item.label}</dt>
                  <dd className="mt-1 text-xs leading-snug font-semibold text-white/88 sm:text-sm">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <TerrainReadout className="mb-5 lg:absolute lg:top-1/2 lg:right-10 lg:mb-0 lg:w-[19.5rem] lg:-translate-y-1/2 xl:right-14 xl:w-[20.5rem]" />

        <div className="hidden items-center justify-between border-t border-white/12 pt-4 lg:flex">
          <div className="flex items-center gap-3">
            <span className="coord text-white/40">Parcela · camada 01</span>
            <span className="h-px w-12 bg-white/14" />
            <span className="data-mono text-[10px] text-white/38">
              {HERO_COPY.panel.coords}
            </span>
          </div>
          <Link
            href="/#como-funciona"
            className="group/scroll flex items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white"
          >
            Percorrer o dossiê
            <span className="flex size-8 items-center justify-center rounded-full border border-white/14 bg-white/6">
              <ArrowDown className="size-3.5 transition-transform group-hover/scroll:translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
