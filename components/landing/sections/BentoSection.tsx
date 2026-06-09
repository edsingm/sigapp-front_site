import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Zap, FileDown, Bell, Map } from "lucide-react"

function MiniDRE() {
  const rows = [
    { label: "Receita Bruta", value: "R$ 28,4M", type: "revenue" },
    { label: "Custo de Obra", value: "(R$ 14,9M)", type: "cost" },
    { label: "Marketing", value: "(R$ 1,1M)", type: "cost" },
    { label: "Lucro Líquido", value: "R$ 4,9M", type: "profit" },
    { label: "TIR", value: "18,4%", type: "kpi" },
    { label: "ROI", value: "17,5%", type: "kpi" },
    { label: "Payback", value: "28 meses", type: "kpi" },
  ]
  return (
    <div className="mt-4 space-y-1.5">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between text-xs">
          <span className="text-muted-foreground">{row.label}</span>
          <span
            className={`font-mono font-medium ${
              row.type === "profit" || row.type === "kpi"
                ? "text-primary"
                : row.type === "cost"
                ? "text-destructive/70"
                : "text-foreground"
            }`}
          >
            {row.value}
          </span>
        </div>
      ))}
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
    <div className="relative mt-3 h-32 w-full overflow-hidden rounded-lg border border-border bg-muted/30">
      {/* Grid lines */}
      {[20, 40, 60, 80].map((v) => (
        <div key={`h${v}`} className="absolute left-0 right-0 border-t border-border/30" style={{ top: `${v}%` }} />
      ))}
      {[25, 50, 75].map((v) => (
        <div key={`v${v}`} className="absolute bottom-0 top-0 border-l border-border/30" style={{ left: `${v}%` }} />
      ))}
      {pins.map((pin, i) => (
        <div
          key={i}
          className={`absolute flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
            pin.active ? "bg-primary shadow-sm" : "bg-muted-foreground/30"
          }`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <div className={`size-1.5 rounded-full ${pin.active ? "bg-primary-foreground" : "bg-background"}`} />
        </div>
      ))}
      <div className="absolute bottom-2 right-2 text-[9px] text-muted-foreground">
        47 terrenos · 12 regiões
      </div>
    </div>
  )
}

const BENTO_ITEMS = [
  {
    id: "dre",
    col: "lg:col-span-8",
    row: "lg:row-span-2",
    icon: Zap,
    eyebrow: "Motor DRE",
    title: "Demonstração de resultado gerada automaticamente",
    description: "Insira os parâmetros e o sistema calcula toda a DRE, fluxo de caixa e indicadores de retorno.",
    content: <MiniDRE />,
  },
  {
    id: "export",
    col: "lg:col-span-4",
    row: "",
    icon: FileDown,
    eyebrow: "Exportações",
    title: "PDF e Excel com um clique",
    description: "Relatórios formatados de viabilidade e terrenos prontos para enviar ao comitê ou ao cliente.",
    content: (
      <div className="mt-3 flex flex-col gap-2">
        {["Viabilidade_Paulista_v3.pdf", "Terrenos_Q2_2026.xlsx", "Parecer_Comite_Jun.pdf"].map((f) => (
          <div key={f} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <FileDown className="size-3.5 text-primary" />
            <span className="truncate text-xs text-muted-foreground">{f}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "alerts",
    col: "lg:col-span-4",
    row: "",
    icon: Bell,
    eyebrow: "Alertas",
    title: "Notificações de prazo e aprovação",
    description: "Receba alertas quando viabilidades ficam pendentes ou prazos de legalização se aproximam.",
    content: (
      <div className="mt-3 space-y-2">
        {[
          { msg: "Viabilidade pendente há 3 dias", type: "warn" },
          { msg: "Comitê aprovado: Av. Paulista", type: "ok" },
          { msg: "Prazo de legalização em 5 dias", type: "warn" },
        ].map((a, i) => (
          <div key={i} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
            a.type === "ok" ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-400" : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-400"
          }`}>
            <div className={`size-1.5 rounded-full ${a.type === "ok" ? "bg-green-500" : "bg-amber-500"}`} />
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
    icon: Map,
    eyebrow: "Visualização",
    title: "Mapa de terrenos prospectados",
    description: "Visualize todos os terrenos georreferenciados com status e métricas por região.",
    content: <MapPins />,
  },
]

export function BentoSection() {
  return (
    <section className="bg-muted/20 py-16 md:py-24">
      <div className="container-landing">
        <div className="mb-12 text-center">
          <SectionLabel className="text-center">Capacidades</SectionLabel>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Mais do que uma planilha. Muito mais.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {BENTO_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.col} ${item.row}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {item.eyebrow}
                    </p>
                    <h3 className="font-heading mt-0.5 text-base font-semibold text-foreground">
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
        </div>
      </div>
    </section>
  )
}
