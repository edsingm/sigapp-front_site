import { cn } from "@/lib/utils"
import {
  ArrowRight,
  Check,
  HardDrive,
  Headphones,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PlanConfig } from "@/lib/landing-data"

type PlanCardProps = {
  plan: PlanConfig
  billingCycle: "monthly" | "annual"
}

export function PlanCard({ plan, billingCycle }: PlanCardProps) {
  const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice
  const highlighted = Boolean(plan.highlighted)
  const limits = [
    { id: "users", icon: UsersRound, value: plan.users },
    { id: "land", icon: MapPinned, value: plan.terrenos },
    {
      id: "storage",
      icon: HardDrive,
      value:
        plan.storage === "—"
          ? "Sem armazenamento extra"
          : `${plan.storage} armazenamento`,
    },
    {
      id: "support",
      icon: Headphones,
      value: `Suporte ${plan.support.toLowerCase()}`,
    },
  ]

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-5 transition-[transform,border-color,box-shadow] duration-300 sm:p-6",
        highlighted
          ? "border-primary/60 bg-[var(--color-brand-navy)] text-white shadow-[0_28px_70px_-28px_rgba(46,107,255,0.8)] ring-1 ring-primary/35 xl:-translate-y-4"
          : "border-border bg-card shadow-[0_16px_45px_-36px_rgba(11,30,57,0.65)] hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_55px_-34px_rgba(11,30,57,0.55)]"
      )}
    >
      {highlighted ? (
        <>
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />
          <div className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-primary/30 blur-3xl" />
        </>
      ) : null}

      <div className="relative mb-5 flex min-h-7 items-start justify-between gap-3">
        <p
          className={cn(
            "pt-1 text-[11px] font-bold tracking-[0.16em] uppercase",
            highlighted ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {plan.tagline}
        </p>
        {highlighted ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-secondary-foreground uppercase shadow-sm">
            <Sparkles className="size-3" />
            Mais escolhido
          </span>
        ) : null}
      </div>

      <h3
        className={cn(
          "relative font-heading text-2xl font-semibold tracking-tight",
          highlighted ? "text-white" : "text-foreground"
        )}
      >
        {plan.name}
      </h3>

      <div className="relative mt-5 flex items-end gap-1.5">
        <span
          className={cn(
            "mb-1.5 text-sm font-semibold",
            highlighted ? "text-white/70" : "text-muted-foreground"
          )}
        >
          R$
        </span>
        <span
          className={cn(
            "font-mono text-[2.75rem] leading-none font-bold tracking-[-0.05em] tabular-nums",
            highlighted ? "text-white" : "text-foreground"
          )}
        >
          {price.toLocaleString("pt-BR")}
        </span>
        <span
          className={cn(
            "mb-1 text-sm",
            highlighted ? "text-white/60" : "text-muted-foreground"
          )}
        >
          /mês
        </span>
      </div>

      <p
        className={cn(
          "relative mt-2 min-h-5 text-xs",
          highlighted ? "text-white/60" : "text-muted-foreground"
        )}
      >
        {billingCycle === "annual"
          ? "Valor mensal no plano anual"
          : "Cobrança mensal, sem fidelidade"}
      </p>

      <div className="relative my-6 grid grid-cols-2 gap-2">
        {limits.map(({ id, icon: Icon, value }) => (
          <div
            key={id}
            className={cn(
              "flex min-h-14 items-center gap-2 rounded-xl border px-2.5 py-2 text-xs leading-tight font-medium",
              highlighted
                ? "border-white/10 bg-white/[0.07] text-white/85"
                : "border-border/80 bg-muted/45 text-foreground/80"
            )}
          >
            <Icon
              className={cn(
                "size-3.5 shrink-0",
                highlighted ? "text-secondary" : "text-primary"
              )}
            />
            <span>{value}</span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "relative mb-4 h-px",
          highlighted ? "bg-white/10" : "bg-border"
        )}
      />
      <p
        className={cn(
          "relative mb-3 text-xs font-bold tracking-[0.14em] uppercase",
          highlighted ? "text-white/55" : "text-muted-foreground"
        )}
      >
        O que você recebe
      </p>

      <ul className="relative mb-6 flex-1 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                highlighted
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary"
              )}
            >
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            <span
              className={highlighted ? "text-white/85" : "text-foreground/85"}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "brand" : "outline"}
        size="lg"
        className={cn(
          "relative h-12 w-full rounded-xl",
          highlighted && "shadow-lg shadow-primary/25"
        )}
        nativeButton={false}
        render={
          <a
            href={plan.ctaHref}
            data-analytics-event={
              plan.id === "pro" ? "sales_contact_click" : "trial_signup_click"
            }
            data-analytics-location="pricing"
            data-analytics-plan={plan.id}
          />
        }
      >
        {plan.cta}
        <ArrowRight className="ml-1 size-4 transition-transform group-hover/button:translate-x-0.5" />
      </Button>

      <div
        className={cn(
          "relative mt-3 flex items-center justify-center gap-1.5 text-[11px]",
          highlighted ? "text-white/55" : "text-muted-foreground"
        )}
      >
        <ShieldCheck
          className={cn(
            "size-3.5 shrink-0",
            highlighted ? "text-secondary" : "text-primary"
          )}
        />
        <span>7 dias grátis · Pagamento seguro</span>
      </div>
    </div>
  )
}
