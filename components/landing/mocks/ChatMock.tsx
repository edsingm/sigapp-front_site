const MESSAGES = [
  {
    role: "user",
    content:
      "Qual é a TIR do terreno Av. Paulista e ela está dentro da meta do plano master?",
  },
  {
    role: "ai",
    content:
      "O terreno Av. Paulista, 1840 tem TIR de **18,4%** na viabilidade v3 (aprovada). Sua meta configurada no plano Master é 15,0%. A TIR está **3,4 p.p. acima da meta** — terreno recomendado para avanço ao comitê.",
  },
  {
    role: "user",
    content: "Compara com os outros terrenos aprovados no mês.",
  },
]

export function ChatMock() {
  return (
    <div className="pointer-events-none w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary">
            <span className="text-[9px] font-black text-primary-foreground">
              IA
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">SIG_IA</p>
            <p className="text-[9px] text-muted-foreground">
              25+ ferramentas imobiliárias
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-data-green)]" />
          <span className="text-[9px] text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-4">
        {MESSAGES.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="mr-2 flex size-5 shrink-0 items-center justify-center rounded bg-primary">
                <span className="text-[7px] font-black text-primary-foreground">
                  IA
                </span>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-[10px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-muted text-foreground"
              }`}
            >
              {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        <div className="chat-msg flex items-center gap-2">
          <div className="flex size-5 shrink-0 items-center justify-center rounded bg-primary">
            <span className="text-[7px] font-black text-primary-foreground">
              IA
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-border bg-muted px-3 py-2">
            <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
          <span className="flex-1 text-[10px] text-muted-foreground/60">
            Pergunte sobre terrenos, viabilidade, TIR...
          </span>
          <div className="flex size-5 items-center justify-center rounded-md bg-primary">
            <svg
              className="size-3 text-primary-foreground"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 1l7 7-7 7V9H1V7h7V1z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
