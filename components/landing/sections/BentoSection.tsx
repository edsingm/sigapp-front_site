import Link from "next/link"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Zap, FileDown, Bell, Map, ArrowUpRight } from "lucide-react"
import { BENTO_ALERTS, BENTO_DRE, BENTO_EXPORT_FILES } from "@/lib/landing-data"

function MiniDRE() {
  const { project, receitas, custos, lucro, kpis } = BENTO_DRE

  return (
    <div className="mt-5 space-y-3 text-xs">
      <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
        <div>
          <p className="coord text-muted-foreground">{project.label}</p>
          <p className="mt-0.5 font-semibold text-foreground">{project.name}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          {project.status}
        </span>
      </div>

      <div>
        <p className="coord mb-1.5 text-muted-foreground/60">Receitas</p>
        <div className="space-y-1.5">
          {receitas.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="data-mono font-semibold text-foreground">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-border/60" />

      <div>
        <p className="coord mb-1.5 text-muted-foreground/60">Custos</p>
        <div className="space-y-1.5">
          {custos.map((c) => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{c.label}</span>
              <span className="data-mono font-semibold text-destructive/70">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="flex items-center justify-between rounded-xl bg-primary/8 px-3 py-2.5">
        <span className="font-semibold text-foreground">{lucro.label}</span>
        <div className="flex items-baseline gap-2">
          <span className="data-mono text-sm font-black text-primary">
            {lucro.value}
          </span>
          <span className="data-mono rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
            {lucro.margin}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-border/60 bg-muted/40 px-2 py-2 text-center"
          >
            <p className="data-mono text-xs font-black text-secondary">
              {kpi.value}
            </p>
            <p className="coord mt-0.5 text-muted-foreground">{kpi.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MapPins() {
  const pins = [
    { x: 18, y: 30, active: true },
    { x: 40, y: 55, active: false },
    { x: 62, y: 25, active: true },
    { x: 75, y: 65, active: false },
    { x: 85, y: 40, active: true },
    { x: 30, y: 75, active: false },
    { x: 55, y: 80, active: true },
  ]
  return (
    <div className="relative mt-4 h-40 w-full overflow-hidden rounded-xl border border-border bg-muted/20">
      {[25, 50, 75].map((v) => (
        <div
          key={`h${v}`}
          className="absolute right-0 left-0 border-t border-border/20"
          style={{ top: `${v}%` }}
        />
      ))}
      {[25, 50, 75].map((v) => (
        <div
          key={`v${v}`}
          className="absolute top-0 bottom-0 border-l border-border/20"
          style={{ left: `${v}%` }}
        />
      ))}
      {pins.map((pin, i) => (
        <div
          key={i}
          className={`absolute flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-sm ${
            pin.active ? "bg-primary" : "bg-muted-foreground/25"
          }`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <div
            className={`size-1.5 rounded-full ${pin.active ? "bg-primary-foreground" : "bg-background"}`}
          />
        </div>
      ))}
      <div className="coord absolute bottom-2 left-2 flex items-center gap-3 text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block size-2 rounded-full bg-primary" />
          Ativo
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block size-2 rounded-full bg-muted-foreground/30" />
          Prospectado
        </span>
      </div>
      <div className="coord absolute right-2 bottom-2 text-muted-foreground">
        47 terrenos · 12 regiões
      </div>
    </div>
  )
}

function CardHead({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: typeof Zap
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4.5" strokeWidth={1.5} />
      </div>
      <div>
        <p className="coord text-secondary">{eyebrow}</p>
        <h3 className="mt-1 font-heading text-base font-bold text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export function BentoSection() {
  return (
    <section className="bg-muted/30 py-24 md:py-32">
      <div className="container-landing">
        <ScrollReveal
          stagger
          className="mb-16 grid gap-6 md:mb-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SectionLabel>Capacidades</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Cada terreno, um dossiê vivo de decisão
            </h2>
          </div>
          <p className="max-w-[58ch] text-muted-foreground md:text-lg lg:col-span-7 lg:justify-self-end">
            Indicadores, documentos, alertas e contexto territorial ficam no
            mesmo lugar para a equipe decidir sem repasse manual.
          </p>
        </ScrollReveal>

        <ScrollReveal
          stagger
          className="grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          {/* Âncora marinho — promessa de marca */}
          <div className="card-bezel card-bezel--navy lg:col-span-4 lg:row-span-2">
            <div className="card-bezel__core relative flex h-full flex-col justify-between gap-8 overflow-hidden p-7 text-white">
              <div className="grain-overlay" />
              <div className="flex flex-col gap-4">
                <p className="coord text-secondary">Decisão segura</p>
                <h3 className="font-heading text-2xl leading-tight font-bold tracking-tight text-balance">
                  Da oportunidade ao parecer, sobre o mesmo território.
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  Menos incerteza. Mais critério. Uma fonte de verdade para todo
                  o time.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-end justify-between border-t border-white/12 pt-5">
                  <div>
                    <p className="data-mono text-4xl font-bold">82%</p>
                    <p className="coord mt-1 text-white/55">
                      confiança média · viabilidade
                    </p>
                  </div>
                  <span className="data-mono rounded-full bg-(--color-data-green)/20 px-2.5 py-1 text-[10px] font-bold text-(--color-data-green)">
                    Potencial alto
                  </span>
                </div>
                <Link
                  href="/#funcionalidades"
                  className="group/link inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-(--color-brand-navy) transition-colors hover:bg-white/90"
                >
                  Conhecer funcionalidades
                  <span className="flex size-6 items-center justify-center rounded-full bg-(--color-brand-navy)/8 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/link:translate-x-0.5">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* DRE — prova principal */}
          <div className="card-bezel lg:col-span-8 lg:row-span-2">
            <div className="card-bezel__core p-7">
              <CardHead
                icon={Zap}
                eyebrow="Motor DRE"
                title="Demonstração de resultado gerada automaticamente"
                description="Insira os parâmetros e o sistema calcula toda a DRE, fluxo de caixa e indicadores de retorno."
              />
              <MiniDRE />
            </div>
          </div>

          {/* Mapa */}
          <div className="card-bezel lg:col-span-5">
            <div className="card-bezel__core p-7">
              <CardHead
                icon={Map}
                eyebrow="Visualização"
                title="Mapa de terrenos prospectados"
                description="Todos os terrenos georreferenciados com status e métricas por região."
              />
              <MapPins />
            </div>
          </div>

          {/* Exportações */}
          <div className="card-bezel lg:col-span-4">
            <div className="card-bezel__core p-7">
              <CardHead
                icon={FileDown}
                eyebrow="Exportações"
                title="PDF e Excel com um clique"
                description="Relatórios formatados prontos para o comitê ou o cliente."
              />
              <div className="mt-4 flex flex-col gap-2">
                {BENTO_EXPORT_FILES.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2"
                  >
                    <span
                      className={`data-mono shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                        f.ext === "pdf"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-(--color-data-green)/12 text-(--color-data-green)"
                      }`}
                    >
                      {f.ext}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="card-bezel lg:col-span-3">
            <div className="card-bezel__core p-7">
              <CardHead
                icon={Bell}
                eyebrow="Alertas"
                title="Prazos e aprovações"
                description="Avisos quando viabilidades ficam pendentes ou prazos se aproximam."
              />
              <div className="mt-4 space-y-2">
                {BENTO_ALERTS.map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${
                      a.type === "ok"
                        ? "border-(--color-data-green)/25 bg-(--color-data-green)/8 text-(--color-data-green)"
                        : "border-(--color-data-amber)/30 bg-(--color-data-amber)/10 text-(--color-data-amber)"
                    }`}
                  >
                    <div
                      className={`size-1.5 shrink-0 rounded-full ${
                        a.type === "ok"
                          ? "bg-(--color-data-green)"
                          : "bg-(--color-data-amber)"
                      }`}
                    />
                    {a.msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
