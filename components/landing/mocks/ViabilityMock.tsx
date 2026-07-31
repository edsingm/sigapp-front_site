const DRE_ROWS = [
  { label: "VGV Bruto", value: "R$ 28.400.000", type: "revenue", indent: 0 },
  {
    label: "Deduções (ITBI + Reg.)",
    value: "(R$ 568.000)",
    type: "deduction",
    indent: 1,
  },
  {
    label: "Receita Líquida",
    value: "R$ 27.832.000",
    type: "subtotal",
    indent: 0,
  },
  {
    label: "Custo do Terreno",
    value: "(R$ 4.200.000)",
    type: "cost",
    indent: 1,
  },
  { label: "Custo de Obra", value: "(R$ 14.900.000)", type: "cost", indent: 1 },
  {
    label: "Marketing e Vendas (4%)",
    value: "(R$ 1.113.280)",
    type: "cost",
    indent: 1,
  },
  { label: "Despesas Gerais", value: "(R$ 840.000)", type: "cost", indent: 1 },
  {
    label: "Resultado Bruto",
    value: "R$ 6.778.720",
    type: "subtotal",
    indent: 0,
  },
  {
    label: "Impostos (Simples 6,5%)",
    value: "(R$ 1.809.080)",
    type: "cost",
    indent: 1,
  },
  { label: "Lucro Líquido", value: "R$ 4.969.640", type: "profit", indent: 0 },
]

const KPIS = [
  { label: "TIR", value: "18,4%", positive: true },
  { label: "ROI", value: "17,5%", positive: true },
  { label: "Margem", value: "17,8%", positive: true },
  { label: "Payback", value: "28 meses", positive: null },
]

export function ViabilityMock() {
  return (
    <div className="pointer-events-none w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            Viabilidade · v3
          </p>
          <p className="text-sm font-semibold text-foreground">
            Terreno Av. Paulista, 1840
          </p>
        </div>
        <span className="badge-pop rounded-full bg-[color-mix(in_oklch,var(--color-data-green)_14%,transparent)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-data-green)]">
          Aprovada
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-px border-b border-border bg-border">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col items-center gap-0.5 bg-card px-3 py-3"
          >
            <span className="text-[9px] text-muted-foreground">
              {kpi.label}
            </span>
            <span
              className={`font-mono text-sm font-bold ${
                kpi.positive === true
                  ? "text-[var(--color-data-green)]"
                  : kpi.positive === false
                    ? "text-[var(--color-data-red)]"
                    : "text-foreground"
              }`}
            >
              {kpi.value}
            </span>
          </div>
        ))}
      </div>

      {/* DRE Table */}
      <div className="px-4 py-3">
        <p className="mb-2 text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">
          DRE Consolidado
        </p>
        <div className="space-y-0.5">
          {DRE_ROWS.map((row, i) => (
            <div
              key={i}
              className={`dre-row flex items-center justify-between py-1 text-[10px] ${
                row.type === "subtotal" || row.type === "profit"
                  ? "border-t border-border font-semibold text-foreground"
                  : row.type === "revenue"
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
              }`}
              style={{ paddingLeft: row.indent > 0 ? "12px" : "0" }}
            >
              <span>{row.label}</span>
              <span
                className={`font-mono ${
                  row.type === "profit"
                    ? "text-[var(--color-data-green)]"
                    : row.type === "deduction" || row.type === "cost"
                      ? "text-[var(--color-data-red)]"
                      : ""
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
