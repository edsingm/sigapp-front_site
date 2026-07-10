import {
  ArrowRight,
  Brain,
  Check,
  HardDrive,
  MapPinned,
  Package,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PlanConfig } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

type PlanCardProps = {
  plan: PlanConfig
  billingCycle: "monthly" | "annual"
}

export function PlanCard({ plan, billingCycle }: PlanCardProps) {
  const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice
  const highlighted = Boolean(plan.highlighted)
  const annualSavings = Math.max(
    0,
    plan.monthlyPrice * 12 - plan.annualPrice * 12
  )

  const mainLimits = [
    { id: "users", label: "Usuários", icon: UsersRound, value: plan.users },
    {
      id: "land",
      label: "Terrenos",
      icon: MapPinned,
      value: plan.terrenos,
    },
    {
      id: "products",
      label: "Produtos",
      icon: Package,
      value: plan.products,
    },
  ]

  const extraLimits = [
    {
      id: "storage",
      label: "Armazenamento",
      icon: HardDrive,
      value: plan.storage,
    },
    {
      id: "ai-budget",
      label: "Orçamento SIG_IA",
      icon: Brain,
      value: plan.aiBudget,
    },
  ]

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-5 transition-[transform,border-color,box-shadow] duration-300 sm:p-6",
        highlighted
          ? "border-secondary/40 bg-[linear-gradient(155deg,var(--color-brand-navy)_0%,color-mix(in_oklch,var(--color-brand-navy)_86%,var(--primary))_100%)] text-white shadow-[0_32px_90px_-38px_rgba(11,30,57,0.8)] ring-1 ring-secondary/25 xl:-translate-y-5"
          : "border-border/85 bg-card/96 text-foreground shadow-panel hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-float"
      )}
    >
      {highlighted ? (
        <>
          <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-primary/28 blur-3xl" />
          <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <p
          className={cn(
            "coord pt-1",
            highlighted ? "text-secondary" : "text-primary"
          )}
        >
          SIGAPP / {plan.id}
        </p>
        {highlighted ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-[0.09em] text-secondary-foreground uppercase shadow-sm">
            <Sparkles className="size-3" />
            Recomendado
          </span>
        ) : null}
      </div>

      <div className="relative mt-5">
        <h3
          className={cn(
            "font-heading text-2xl font-bold tracking-tight",
            highlighted ? "text-white" : "text-foreground"
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            "mt-2 min-h-12 text-sm leading-relaxed",
            highlighted ? "text-white/62" : "text-muted-foreground"
          )}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap items-end gap-x-1.5 gap-y-2 border-t border-current/10 pt-5">
        <span
          className={cn(
            "mb-1.5 text-sm font-semibold",
            highlighted ? "text-white/65" : "text-muted-foreground"
          )}
        >
          R$
        </span>
        <span
          className={cn(
            "font-mono text-[3.2rem] leading-none font-bold tracking-[-0.065em] tabular-nums",
            highlighted ? "text-white" : "text-foreground"
          )}
        >
          {price.toLocaleString("pt-BR")}
        </span>
        <span
          className={cn(
            "mb-1.5 text-sm",
            highlighted ? "text-white/55" : "text-muted-foreground"
          )}
        >
          /mês
        </span>

        <div className="mt-2 basis-full">
          {billingCycle === "annual" ? (
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold",
                highlighted
                  ? "bg-(--color-data-green)/16 text-(--color-data-green)"
                  : "bg-(--color-data-green)/10 text-(--color-data-green)"
              )}
            >
              Economize R$ {annualSavings.toLocaleString("pt-BR")} por ano
            </span>
          ) : (
            <span
              className={cn(
                "text-xs",
                highlighted ? "text-white/48" : "text-muted-foreground"
              )}
            >
              Cobrança mensal · sem fidelidade
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "relative my-6 grid grid-cols-3 overflow-hidden rounded-2xl border",
          highlighted
            ? "border-white/10 bg-white/[0.055]"
            : "border-border bg-muted/45"
        )}
      >
        {mainLimits.map(({ id, label, icon: Icon, value }) => (
          <div
            key={id}
            className={cn(
              "flex min-w-0 flex-col border-r p-3 last:border-0",
              highlighted ? "border-white/10" : "border-border"
            )}
          >
            <Icon
              className={cn(
                "mb-3 size-4",
                highlighted ? "text-secondary" : "text-primary"
              )}
              strokeWidth={1.75}
            />
            <span
              className={cn(
                "text-[10px] tracking-[0.08em] uppercase",
                highlighted ? "text-white/42" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
            <span className="mt-1 text-xs leading-tight font-bold">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="relative space-y-2">
        {extraLimits.map(({ id, label, icon: Icon, value }) => (
          <div
            key={id}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5",
              highlighted
                ? "border-white/9 bg-white/[0.04]"
                : "border-border/75 bg-background/70"
            )}
          >
            <span
              className={cn(
                "flex min-w-0 items-center gap-2 text-xs",
                highlighted ? "text-white/58" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-3.5 shrink-0",
                  highlighted ? "text-secondary" : "text-primary"
                )}
              />
              {label}
            </span>
            <span className="text-right text-xs font-semibold">{value}</span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "relative my-6 h-px",
          highlighted ? "bg-white/10" : "bg-border"
        )}
      />

      <div className="relative mb-6 flex-1">
        <p
          className={cn(
            "coord mb-4",
            highlighted ? "text-white/48" : "text-muted-foreground"
          )}
        >
          Inclui neste plano
        </p>
        <ul className="space-y-3 text-sm">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  highlighted
                    ? "bg-secondary/16 text-secondary"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <span
                className={highlighted ? "text-white/82" : "text-foreground/82"}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={highlighted ? "brand" : "outline"}
        size="lg"
        className={cn(
          "relative h-12 w-full rounded-xl font-semibold",
          highlighted
            ? "border border-white/10 shadow-lg shadow-black/20"
            : "group-hover:border-primary/30"
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
        <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
      </Button>

      <div
        className={cn(
          "relative mt-3 flex items-center justify-center gap-1.5 text-[11px]",
          highlighted ? "text-white/48" : "text-muted-foreground"
        )}
      >
        <ShieldCheck
          className={cn(
            "size-3.5 shrink-0",
            highlighted ? "text-secondary" : "text-primary"
          )}
        />
        <span>Dados exportáveis · pagamento seguro</span>
      </div>
    </article>
  )
}
