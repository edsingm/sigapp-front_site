const COLUMNS = [
  {
    label: "Prospecção",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    dot: "bg-blue-500",
    cards: [
      { name: "Av. das Nações, 540", area: "3.200 m²", owner: "Corretor Lima" },
      { name: "Fazenda Alvorada", area: "18.000 m²", owner: "Ana Costa" },
    ],
  },
  {
    label: "Viabilidade",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    dot: "bg-amber-500",
    cards: [
      { name: "Lote Setor Oeste", area: "2.100 m²", owner: "Marcos V." },
    ],
  },
  {
    label: "Comitê",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    dot: "bg-purple-500",
    cards: [
      { name: "Av. Paulista, 1840", area: "2.400 m²", owner: "Dir. Menezes" },
    ],
  },
  {
    label: "Negociação",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    dot: "bg-orange-500",
    cards: [
      { name: "Terreno Batel", area: "1.200 m²", owner: "Fernanda C." },
    ],
  },
  {
    label: "Legalização",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    dot: "bg-green-500",
    cards: [
      { name: "Gleba Centro-Sul", area: "4.800 m²", owner: "Caio D." },
    ],
  },
]

export function WorkflowMock() {
  return (
    <div className="pointer-events-none w-full select-none overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Pipeline de Terrenos
        </p>
        <p className="text-xs font-semibold text-foreground">6 terrenos ativos · 3 etapas em andamento</p>
      </div>

      {/* Kanban */}
      <div className="flex gap-2 overflow-x-auto p-3">
        {COLUMNS.map((col, i) => (
          <div key={col.label} className={`shrink-0 flex-col gap-2 w-24 md:w-36 ${i >= 3 ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${col.dot}`} />
              <span className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                {col.label}
              </span>
              <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">
                {col.cards.length}
              </span>
            </div>
            {col.cards.map((card, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-background p-2 shadow-sm"
              >
                <p className="truncate text-[9px] font-medium text-foreground">{card.name}</p>
                <p className="text-[8px] text-muted-foreground">{card.area}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[7px] font-medium ${col.color}`}
                  >
                    {col.label}
                  </span>
                  <span className="text-[7px] text-muted-foreground">{card.owner}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
