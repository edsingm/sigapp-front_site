import Link from "next/link"
import { ArrowRight, LayoutGrid, MapPinned, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CadastralMapBackdrop } from "@/components/landing/ui/CadastralMapBackdrop"
import { LINKS } from "@/lib/landing-data"

const PROOF_ITEMS = [
  "Analise em contexto",
  "Governanca por etapa",
  "Dados na sua nuvem",
]

const HERO_METRICS = [
  { value: "340+", label: "incorporadoras ativas" },
  { value: "R$ 2,4B", label: "em terrenos analisados" },
  { value: "12.800+", label: "viabilidades calculadas" },
]

function TerritoryPanel() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-primary/8 blur-3xl dark:bg-primary/12" />
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_28px_80px_-42px_rgba(11,30,57,0.45)]">
        <div className="flex items-center justify-between border-b border-border bg-muted/35 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPinned className="size-4" strokeWidth={1.7} />
            </span>
            <div>
              <p className="coord text-muted-foreground">Leitura territorial</p>
              <p className="text-sm font-semibold text-foreground">
                Setor Anhanguera
              </p>
            </div>
          </div>
          <p className="data-mono hidden text-xs text-muted-foreground sm:block">
            -23.5012, -46.8421
          </p>
        </div>

        <div className="relative h-[23rem] overflow-hidden bg-background sm:h-[27rem]">
          <div className="hero-panel-grid absolute inset-0" />
          <svg
            viewBox="0 0 640 420"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M70 142 176 112 318 106 510 132 570 254 520 342 320 320 112 340Z"
              className="fill-muted/50 stroke-border"
              strokeWidth="1.5"
            />
            <path
              d="M176 112 214 258 112 340M318 106 342 316M510 132 418 304M86 218 544 188M116 296 520 258"
              className="stroke-border"
              strokeWidth="1.5"
            />
            <path
              d="M244 174 414 194 448 292 274 274Z"
              className="fill-primary/10 stroke-primary"
              strokeWidth="2.5"
            />
            <path
              d="M86 170C162 206 226 204 306 244 392 288 480 298 572 282"
              className="stroke-primary"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d="M362 238 250 346"
              className="stroke-muted-foreground/35"
              strokeDasharray="4 8"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle cx="86" cy="170" r="5" className="fill-foreground" />
            <circle cx="362" cy="238" r="7" className="fill-primary" />
            <circle cx="572" cy="282" r="5" className="fill-foreground" />
            <path
              d="M336 200c-12-10-22-18-22-33a22 22 0 0 1 44 0c0 15-10 23-22 33Z"
              className="fill-primary"
            />
            <circle
              cx="336"
              cy="166"
              r="7"
              className="fill-primary-foreground"
            />
          </svg>

          <div className="absolute top-8 right-6 rounded-2xl border border-border bg-card/94 p-4 shadow-[0_18px_42px_-28px_rgba(11,30,57,0.45)] backdrop-blur-sm sm:right-10">
            <p className="coord text-muted-foreground">Potencial</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="font-heading text-3xl font-bold text-foreground">
                Alto
              </p>
              <p className="data-mono pb-1 text-sm font-bold text-(--color-data-green)">
                82%
              </p>
            </div>
            <div className="mt-3 h-1.5 w-36 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
          </div>

          <div className="absolute bottom-8 left-5 rounded-2xl border border-border bg-card/94 p-4 shadow-[0_18px_42px_-28px_rgba(11,30,57,0.45)] backdrop-blur-sm sm:left-10">
            <p className="coord text-muted-foreground">Área aproveitável</p>
            <p className="data-mono mt-1 text-2xl font-bold text-foreground">
              12.480 m²
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border bg-background pt-28 pb-16 text-foreground sm:pt-32 md:pb-20 lg:pt-36"
    >
      <CadastralMapBackdrop className="opacity-35 dark:opacity-25" />
      <div className="hero-panel-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background to-transparent" />

      <div className="container-landing relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div className="flex max-w-2xl flex-col gap-7">
            <span className="eyebrow text-primary">
              Gestão territorial inteligente
            </span>

            <div className="space-y-5">
              <h1 className="font-heading text-[2.75rem] leading-[0.98] font-bold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
                Decisões que ganham{" "}
                <span className="text-primary">território.</span>
              </h1>
              <p className="max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
                Conecte mapas, dados, processos e inteligência numa única fonte
                de decisão. Da oportunidade ao parecer do comitê, com critério e
                rastreabilidade.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group/cta h-13 w-full gap-2 rounded-xl pr-2 pl-6 text-base font-semibold shadow-[0_16px_34px_-18px_rgba(46,107,255,0.8)] sm:w-auto"
                nativeButton={false}
                render={
                  <a
                    href={LINKS.demo}
                    data-analytics-event="demo_request"
                    data-analytics-location="hero"
                  />
                }
              >
                Solicitar demonstracao
                <span className="flex size-9 items-center justify-center rounded-lg bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px">
                  <ArrowRight className="size-4" />
                </span>
              </Button>
              <Button
                variant="brand-outline"
                size="lg"
                className="h-13 w-full gap-2.5 rounded-xl bg-background/70 px-6 text-base sm:w-auto"
                nativeButton={false}
                render={
                  <Link
                    href="/#funcionalidades"
                    data-analytics-event="features_view_click"
                    data-analytics-location="hero"
                  />
                }
              >
                <LayoutGrid className="size-4" />
                Ver analise territorial
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {PROOF_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">
                    {item.split(" ").slice(0, -1).join(" ")}{" "}
                    <strong className="font-semibold text-foreground">
                      {item.split(" ").at(-1)}
                    </strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <TerritoryPanel />
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
          {HERO_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between gap-4 bg-card px-5 py-5 sm:px-7"
            >
              <div>
                <p className="data-mono font-heading text-3xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </p>
                <p className="coord mt-1 text-muted-foreground">
                  {metric.label}
                </p>
              </div>
              <ShieldCheck
                className="size-5 shrink-0 text-primary"
                strokeWidth={1.7}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
