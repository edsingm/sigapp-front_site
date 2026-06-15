import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { Zap, FileDown, Bell, Map } from "lucide-react"

function MiniDRE() {
  const receitas = [
    { label: "Receita Bruta (VGV)", value: "R$ 28,4M" },
    { label: "(-) Deduções e impostos", value: "(R$ 1,7M)" },
  ]
  const custos = [
    { label: "Custo de Obra (CUB)", value: "(R$ 14,9M)" },
    { label: "Marketing e Corretagem", value: "(R$ 1,1M)" },
    { label: "Despesas Operacionais", value: "(R$ 5,8M)" },
  ]
  const kpis = [
    { label: "TIR", value: "18,4%" },
    { label: "ROI", value: "17,5%" },
    { label: "Payback", value: "28 meses" },
    { label: "VPL", value: "R$ 2,1M" },
  ]

  return (
    <div className="mt-5 space-y-3 text-xs">
      <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2.5">
        <div>
          <p className="text-[10px] text-muted-foreground">Projeto em análise</p>
          <p className="font-semibold text-foreground">Residencial Av. Paulista · 120 un.</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Viável
        </span>
      </div>

      <div>
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
          Receitas
        </p>
        <div className="space-y-1.5">
          {receitas.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-mono font-semibold text-foreground">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-border/60" />

      <div>
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
          Custos
        </p>
        <div className="space-y-1.5">
          {custos.map((c) => (
            <div key={c.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{c.label}</span>
              <span className="font-mono font-semibold text-destructive/70">{c.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="flex items-center justify-between rounded-lg bg-primary/8 px-3 py-2.5">
        <span className="font-semibold text-foreground">Lucro Líquido</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm font-black text-primary">R$ 4,9M</span>
          <span className="rounded-full bg-primary/15 px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
            17,3%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-border/60 bg-muted/40 px-2 py-2 text-center"
          >
            <p className="font-mono text-xs font-black text-secondary">{kpi.value}</p>
            <p className="mt-0.5 text-[9px] text-muted-foreground">{kpi.label}</p>
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
    <div className="relative mt-3 h-36 w-full overflow-hidden rounded-lg border border-border bg-muted/20">
      {[25, 50, 75].map((v) => (
        <div
          key={`h${v}`}
          className="absolute left-0 right-0 border-t border-border/20"
          style={{ top: `${v}%` }}
        />
      ))}
      {[25, 50, 75].map((v) => (
        <div
          key={`v${v}`}
          className="absolute bottom-0 top-0 border-l border-border/20"
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
      <div className="absolute bottom-2 left-2 flex items-center gap-3 text-[9px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block size-2 rounded-full bg-primary" />
          Ativo
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block size-2 rounded-full bg-muted-foreground/30" />
          Prospectado
        </span>
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] text-muted-foreground">
        47 terrenos · 12 regiões
      </div>
    </div>
  )
}

const EXPORT_FILES = [
  { name: "Viabilidade_Paulista_v3.pdf", ext: "pdf" },
  { name: "Terrenos_Q2_2026.xlsx", ext: "xlsx" },
  { name: "Parecer_Comite_Jun.pdf", ext: "pdf" },
]

const ALERT_ITEMS = [
  { msg: "Viabilidade pendente há 3 dias", type: "warn" as const },
  { msg: "Comitê aprovado: Av. Paulista", type: "ok" as const },
  { msg: "Prazo de legalização em 5 dias", type: "warn" as const },
]

const BENTO_ITEMS = [
  {
    id: "dre",
    col: "lg:col-span-8",
    row: "lg:row-span-2",
    featured: true,
    icon: Zap,
    eyebrow: "Motor DRE",
    title: "Demonstração de resultado gerada automaticamente",
    description:
      "Insira os parâmetros e o sistema calcula toda a DRE, fluxo de caixa e indicadores de retorno.",
    content: <MiniDRE />,
  },
  {
    id: "export",
    col: "lg:col-span-4",
    row: "",
    featured: false,
    icon: FileDown,
    eyebrow: "Exportações",
    title: "PDF e Excel com um clique",
    description: "Relatórios formatados prontos para enviar ao comitê ou ao cliente.",
    content: (
      <div className="mt-3 flex flex-col gap-2">
        {EXPORT_FILES.map((f) => (
          <div
            key={f.name}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2"
          >
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                f.ext === "pdf"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
              }`}
            >
              {f.ext}
            </span>
            <span className="truncate text-xs text-muted-foreground">{f.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "alerts",
    col: "lg:col-span-4",
    row: "",
    featured: false,
    icon: Bell,
    eyebrow: "Alertas",
    title: "Notificações de prazo e aprovação",
    description:
      "Receba alertas quando viabilidades ficam pendentes ou prazos de legalização se aproximam.",
    content: (
      <div className="mt-3 space-y-2">
        {ALERT_ITEMS.map((a, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
              a.type === "ok"
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-400"
                : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-400"
            }`}
          >
            <div
              className={`size-1.5 shrink-0 rounded-full ${a.type === "ok" ? "bg-green-500" : "bg-amber-500"}`}
            />
            {a.msg}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "map",
    col: "lg:col-span-12",
    row: "",
    featured: false,
    icon: Map,
    eyebrow: "Visualização",
    title: "Mapa de terrenos prospectados",
    description:
      "Visualize todos os terrenos georreferenciados com status e métricas por região.",
    content: <MapPins />,
  },
]

export function BentoSection() {
  return (
    <section className="bg-muted/20 py-20 md:py-28">
      <div className="container-landing">
        <ScrollReveal stagger className="mb-16 flex flex-col items-center gap-2 text-center md:mb-20">
          <SectionLabel className="text-center">Capacidades</SectionLabel>
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-4xl">
            Mais do que uma planilha. Muito mais.
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {BENTO_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`group rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 ${
                  item.featured
                    ? "border-primary/20 bg-gradient-to-br from-card to-primary/[0.04] hover:shadow-lg"
                    : "border-border bg-card hover:shadow-md"
                } ${item.col} ${item.row}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                      item.featured ? "bg-primary/15 text-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
                      {item.eyebrow}
                    </p>
                    <h3 className="font-heading mt-0.5 text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                {item.content}
              </div>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
