import {
  ArrowUpRight,
  Check,
  MapPinned,
  Package,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react"

import { PRICING_CARD_COPY, type PlanConfig } from "@/lib/landing-data"
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
  const visibleFeatures = plan.features.slice(0, 2)
  const hiddenFeatures = Math.max(
    0,
    plan.features.length - visibleFeatures.length
  )

  const mainLimits = [
    {
      id: "users",
      label: PRICING_CARD_COPY.usersLabel,
      icon: UsersRound,
      value: plan.users,
    },
    {
      id: "land",
      label: PRICING_CARD_COPY.landLabel,
      icon: MapPinned,
      value: plan.terrenos,
    },
    {
      id: "products",
      label: PRICING_CARD_COPY.productsLabel,
      icon: Package,
      value: plan.products,
    },
  ]

  return (
    <article
      className={cn("plan-card-compact", highlighted && "is-highlighted")}
    >
      <header className="plan-card-compact-bar">
        <span>
          {PRICING_CARD_COPY.planLabel} / {plan.id}
        </span>
        {highlighted ? (
          <strong>
            <Sparkles aria-hidden="true" />
            {PRICING_CARD_COPY.recommended}
          </strong>
        ) : null}
      </header>

      <div className="plan-card-compact-main">
        <div className="plan-card-compact-title">
          <h3>{plan.name}</h3>
          <p>{plan.tagline}</p>
        </div>

        <div className="plan-card-compact-price">
          <div>
            <span>{PRICING_CARD_COPY.currency}</span>
            <strong>{price.toLocaleString("pt-BR")}</strong>
            <em>{PRICING_CARD_COPY.monthlySuffix}</em>
          </div>
          {billingCycle === "annual" ? (
            <p>
              {PRICING_CARD_COPY.annualSavingsPrefix} R${" "}
              {annualSavings.toLocaleString("pt-BR")}
            </p>
          ) : (
            <p>{PRICING_CARD_COPY.monthlyNote}</p>
          )}
        </div>

        <dl className="plan-card-compact-limits">
          {mainLimits.map(({ id, label, icon: Icon, value }) => (
            <div key={id}>
              <dt>
                <Icon aria-hidden="true" />
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="plan-card-compact-features">
          <p>{PRICING_CARD_COPY.featuresLabel}</p>
          <ul>
            {visibleFeatures.map((feature) => (
              <li key={feature}>
                <Check aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {hiddenFeatures > 0 ? (
            <span>
              +{hiddenFeatures} {PRICING_CARD_COPY.additionalFeatures}
            </span>
          ) : null}
        </div>
      </div>

      <footer className="plan-card-compact-footer">
        <a
          href={plan.ctaHref}
          data-analytics-event={
            plan.id === "pro" ? "sales_contact_click" : "trial_signup_click"
          }
          data-analytics-location="pricing"
          data-analytics-plan={plan.id}
        >
          {plan.cta}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <p>
          <ShieldCheck aria-hidden="true" />
          {PRICING_CARD_COPY.trust}
        </p>
      </footer>
    </article>
  )
}
