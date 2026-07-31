const ROLES = [
  {
    role: "Owner",
    user: "Rafael Torres",
    modules: [
      "prospection",
      "viabilities",
      "committee",
      "negotiation",
      "legalization",
      "settings",
    ],
    color: "bg-primary/10 text-primary",
  },
  {
    role: "Diretor",
    user: "Carla Mendes",
    modules: ["prospection", "viabilities", "committee", "negotiation"],
    color:
      "bg-[color-mix(in_oklch,var(--color-data-amber)_16%,transparent)] text-foreground",
  },
  {
    role: "Gerente",
    user: "Bruno Alves",
    modules: ["prospection", "viabilities", "legalization"],
    color: "bg-foreground/8 text-foreground dark:bg-white/10 dark:text-white",
  },
  {
    role: "Supervisor",
    user: "Luciana Faria",
    modules: ["prospection"],
    color: "bg-muted text-muted-foreground",
  },
]

const ALL_MODULES = [
  "prospection",
  "viabilities",
  "committee",
  "negotiation",
  "legalization",
  "settings",
]
const MODULE_LABELS: Record<string, string> = {
  prospection: "Prospecção",
  viabilities: "Viabilidade",
  committee: "Comitê",
  negotiation: "Negociação",
  legalization: "Legalização",
  settings: "Configurações",
}

const MODULE_SHORT_LABELS: Record<string, string> = {
  prospection: "Pro",
  viabilities: "Via",
  committee: "Com",
  negotiation: "Neg",
  legalization: "Leg",
  settings: "Con",
}

export function PermissionsMock() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl select-none"
    >
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
          Controle de Acesso
        </p>
        <p className="text-xs font-semibold text-foreground">
          4 usuários · Permissões por módulo
        </p>
      </div>

      {/* Permission matrix */}
      <div className="p-4">
        {/* Module headers */}
        <div className="mb-2 grid grid-cols-[72px_repeat(4,1fr)] gap-1 text-center md:grid-cols-[120px_repeat(6,1fr)]">
          <div />
          {ALL_MODULES.map((m, i) => (
            <div
              key={m}
              className={`text-[7px] font-semibold tracking-wide text-muted-foreground uppercase ${i >= 4 ? "hidden md:block" : ""}`}
            >
              <span className="sm:hidden" aria-hidden="true">
                {MODULE_SHORT_LABELS[m]}
              </span>
              <span className="hidden sm:inline">{MODULE_LABELS[m]}</span>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {ROLES.map((r) => (
            <div
              key={r.role}
              className="perm-row grid grid-cols-[72px_repeat(4,1fr)] items-center gap-1 md:grid-cols-[120px_repeat(6,1fr)]"
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className={`w-fit rounded px-1.5 py-0.5 text-[8px] font-semibold ${r.color}`}
                >
                  {r.role}
                </span>
                <span className="text-[8px] text-muted-foreground">
                  {r.user}
                </span>
              </div>
              {ALL_MODULES.map((m, i) => {
                const has = r.modules.includes(m)
                return (
                  <div
                    key={m}
                    className={`flex justify-center ${i >= 4 ? "hidden md:flex" : ""}`}
                  >
                    {has ? (
                      <svg
                        className="size-3 text-primary"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="5.5"
                          className="stroke-primary/30"
                          strokeWidth="1"
                        />
                        <path
                          d="M3.5 6l2 2 3-3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div className="size-3 rounded-full bg-muted-foreground/15" />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-muted/20 px-4 py-2">
        <p className="text-[9px] text-muted-foreground">
          Banco de dados isolado por tenant · Audit log ativado
        </p>
      </div>
    </div>
  )
}
