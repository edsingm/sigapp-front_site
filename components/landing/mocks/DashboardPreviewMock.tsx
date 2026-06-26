import Image from "next/image"

const STATUS_COLORS: Record<string, string> = {
  "Em Análise": "bg-primary/10 text-primary",
  "Aguardando Viab.":
    "bg-secondary/20 text-accent-foreground dark:text-secondary",
  Aprovado: "bg-[color:rgba(30,138,91,0.12)] text-[var(--color-data-green)]",
  "Em Negociação": "bg-foreground/8 text-foreground",
  Rascunho: "bg-muted text-muted-foreground",
}

const TERRENOS = [
  {
    nome: "Terreno Av. Paulista, 1840",
    cidade: "São Paulo, SP",
    area: "2.400 m²",
    tir: "18,4%",
    status: "Aprovado",
  },
  {
    nome: "Lote Industrial Betim",
    cidade: "Betim, MG",
    area: "5.800 m²",
    tir: "14,2%",
    status: "Em Análise",
  },
  {
    nome: "Área Residencial Batel",
    cidade: "Curitiba, PR",
    area: "1.200 m²",
    tir: "22,1%",
    status: "Aguardando Viab.",
  },
  {
    nome: "Terreno Setor Bueno",
    cidade: "Goiânia, GO",
    area: "3.100 m²",
    tir: "16,7%",
    status: "Em Negociação",
  },
  {
    nome: "Gleba Sul Caxias",
    cidade: "Caxias do Sul, RS",
    area: "8.400 m²",
    tir: "—",
    status: "Rascunho",
  },
]

const SPARKLINE_POINTS = [30, 45, 38, 55, 60, 52, 68, 72, 65, 80, 75, 88]

function Sparkline() {
  const w = 120
  const h = 36
  const max = Math.max(...SPARKLINE_POINTS)
  const min = Math.min(...SPARKLINE_POINTS)
  const range = max - min || 1
  const pts = SPARKLINE_POINTS.map((v, i) => {
    const x = (i / (SPARKLINE_POINTS.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(" ")

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="overflow-visible"
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <circle
        cx={((SPARKLINE_POINTS.length - 1) / (SPARKLINE_POINTS.length - 1)) * w}
        cy={
          h -
          ((SPARKLINE_POINTS[SPARKLINE_POINTS.length - 1] - min) / range) *
            (h - 4) -
          2
        }
        r="2.5"
        className="fill-primary"
      />
    </svg>
  )
}

export function DashboardPreviewMock() {
  return (
    <div className="pointer-events-none w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl select-none">
      {/* Mock Navbar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex size-5 items-center justify-center text-primary">
            <Image src="/icon.svg" alt="" width={16} height={16} />
          </div>
          <span className="text-xs font-semibold text-foreground">SIGAPP</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-16 rounded bg-muted-foreground/20" />
          <div className="h-2 w-12 rounded bg-muted-foreground/20" />
          <div className="size-5 rounded-full bg-primary/20" />
        </div>
      </div>

      <div className="flex h-[340px]">
        {/* Sidebar */}
        <div className="flex w-32 shrink-0 flex-col gap-1 border-r border-border bg-muted/20 px-2 py-3">
          {["Terrenos", "Viabilidade", "SIG_IA", "Comitê", "Legalização"].map(
            (item, i) => (
              <div
                key={item}
                className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 ${i === 0 ? "bg-accent" : ""}`}
              >
                <div
                  className={`size-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
                <span
                  className={`text-[10px] font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`}
                >
                  {item}
                </span>
              </div>
            )
          )}
        </div>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-px border-b border-border">
            {[
              { label: "Total de Terrenos", value: "47", sub: "+3 este mês" },
              { label: "VGV Pipeline", value: "R$ 284M", sub: "12 terrenos" },
              { label: "TIR Média", value: "17,8%", sub: "aprovados" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-0.5 px-3 py-2.5"
              >
                <span className="text-[9px] text-muted-foreground">
                  {stat.label}
                </span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-[9px] text-primary">{stat.sub}</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr_1fr] border-b border-border bg-muted/20 px-3 py-1.5 text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">
              <span>Terreno</span>
              <span>Cidade</span>
              <span>Área</span>
              <span>TIR</span>
              <span>Status</span>
            </div>
            {TERRENOS.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr_1fr] items-center border-b border-border/50 px-3 py-1.5 text-[9px]"
              >
                <span className="truncate font-medium text-foreground">
                  {t.nome}
                </span>
                <span className="text-muted-foreground">{t.cidade}</span>
                <span className="font-mono text-muted-foreground">
                  {t.area}
                </span>
                <span className="font-mono font-medium text-foreground">
                  {t.tir}
                </span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-1.5 py-0.5 text-[8px] font-medium ${STATUS_COLORS[t.status]}`}
                  >
                    {t.status}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Bottom: sparkline + AI preview */}
          <div className="flex items-end justify-between border-t border-border bg-muted/10 px-3 py-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-muted-foreground">
                VGV acumulado
              </span>
              <Sparkline />
            </div>
            <div className="flex max-w-[160px] flex-col gap-1 rounded-lg border border-border bg-card p-2">
              <div className="flex items-center gap-1">
                <div className="flex size-3 items-center justify-center rounded-sm bg-primary">
                  <span className="text-[6px] font-black text-primary-foreground">
                    IA
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-primary">
                  SIG_IA
                </span>
                <span className="ml-auto size-1.5 animate-pulse rounded-full bg-[var(--color-data-green)]" />
              </div>
              <p className="text-[8px] leading-tight text-muted-foreground">
                Terreno Av. Paulista tem TIR 18,4% — acima da meta. Recomendo
                aprovação no comitê.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
