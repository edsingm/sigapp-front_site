import { cn } from "@/lib/utils"
import { Check, X, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PlanConfig } from "@/lib/landing-data"

type PlanCardProps = {
  plan: PlanConfig
  billingCycle: "monthly" | "annual"
}

export function PlanCard({ plan, billingCycle }: PlanCardProps) {
  const price =
    billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-5 transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-lg sm:p-6",
        plan.highlighted
          ? "border-primary/50 shadow-md ring-1 ring-primary/20"
          : "border-border"
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-foreground">
            <Sparkles className="size-3" />
            Mais popular
          </span>
        </div>
      )}

      <div className="mb-4 sm:mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {plan.tagline}
        </p>
        <h3 className="mt-1 font-heading text-xl font-black text-foreground">
          {plan.name}
        </h3>
      </div>

      <div className="mb-4 flex items-end gap-1 sm:mb-5">
        <span className="font-mono text-[2rem] font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
          R${" "}
          {price.toLocaleString("pt-BR")}
        </span>
        <span className="mb-1 text-sm text-muted-foreground">/mês</span>
      </div>
      {billingCycle === "annual" && (
        <p className="-mt-4 mb-5 text-xs font-medium text-secondary">
          Economize 20% no plano anual
        </p>
      )}

      <div className="mb-6 space-y-1.5 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">{plan.users}</span>
        </p>
        <p>
          <span className="font-medium text-foreground">{plan.terrenos}</span>
        </p>
        <p>Armazenamento: {plan.storage}</p>
        <p>Suporte: {plan.support}</p>
      </div>

      <ul className="mb-5 flex-1 space-y-2.5 text-sm sm:mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
        <li className="flex items-center gap-2">
          {plan.hasAI ? (
            <>
              <Check className="size-4 shrink-0 text-primary" />
              <span>SIG_IA conversacional</span>
            </>
          ) : (
            <>
              <X className="size-4 shrink-0 text-muted-foreground/50" />
              <span className="text-muted-foreground/60">SIG_IA</span>
            </>
          )}
        </li>
        <li className="flex items-center gap-2">
          {plan.hasCommittee ? (
            <>
              <Check className="size-4 shrink-0 text-primary" />
              <span>Comitê de revisão</span>
            </>
          ) : (
            <>
              <X className="size-4 shrink-0 text-muted-foreground/50" />
              <span className="text-muted-foreground/60">Comitê de revisão</span>
            </>
          )}
        </li>
      </ul>

      <Button
        variant={plan.highlighted ? "brand" : "outline"}
        size="lg"
        className="h-12 w-full"
        nativeButton={false}
        render={
          <a
            href={plan.ctaHref}
            data-analytics-event={plan.id === "pro" ? "sales_contact_click" : "trial_signup_click"}
            data-analytics-location="pricing"
            data-analytics-plan={plan.id}
          />
        }
      >
        {plan.cta}
      </Button>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 shrink-0 text-secondary" />
        <span>
          Pagamento seguro via{" "}
          <span className="font-semibold text-secondary">Stripe</span>
        </span>
      </div>
    </div>
  )
}
