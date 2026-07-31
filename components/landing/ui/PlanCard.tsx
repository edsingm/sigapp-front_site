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
  const visibleFeatures = plan.features.slice(0, 4)
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
      className={cn("plan-card", highlighted && "is-highlighted")}
      data-plan={plan.id}
    >
      <header className="plan-card-header">
        <div className="plan-card-meta">
          <span className="plan-card-code">
            {PRICING_CARD_COPY.planLabel} · {plan.id}
          </span>
          {highlighted ? (
            <span className="plan-card-badge">
              <Sparkles aria-hidden="true" />
              {PRICING_CARD_COPY.recommended}
            </span>
          ) : null}
        </div>
        <h3 className="plan-card-name">{plan.name}</h3>
        <p className="plan-card-tagline">{plan.tagline}</p>
      </header>

      <div className="plan-card-price">
        <div className="plan-card-price-row" aria-label={`${PRICING_CARD_COPY.currency} ${price.toLocaleString("pt-BR")} ${PRICING_CARD_COPY.monthlySuffix}`}>
          <span className="plan-card-currency">{PRICING_CARD_COPY.currency}</span>
          <strong className="plan-card-amount">
            {price.toLocaleString("pt-BR")}
          </strong>
          <span className="plan-card-period">{PRICING_CARD_COPY.monthlySuffix}</span>
        </div>
        <p className="plan-card-price-note">
          {billingCycle === "annual" ? (
            <>
              {PRICING_CARD_COPY.annualSavingsPrefix} R${" "}
              {annualSavings.toLocaleString("pt-BR")}
            </>
          ) : (
            PRICING_CARD_COPY.monthlyNote
          )}
        </p>
      </div>

      <dl className="plan-card-limits">
        {mainLimits.map(({ id, label, icon: Icon, value }) => (
          <div key={id} className="plan-card-limit">
            <dt>
              <span className="plan-card-limit-icon" aria-hidden="true">
                <Icon />
              </span>
              <span>{label}</span>
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="plan-card-features">
        <p className="plan-card-features-label">
          {PRICING_CARD_COPY.featuresLabel}
        </p>
        <ul>
          {visibleFeatures.map((feature) => (
            <li key={feature}>
              <span className="plan-card-check" aria-hidden="true">
                <Check />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {hiddenFeatures > 0 ? (
          <p className="plan-card-features-more">
            +{hiddenFeatures} {PRICING_CARD_COPY.additionalFeatures}
          </p>
        ) : null}
      </div>

      <footer className="plan-card-footer">
        <a
          href={plan.ctaHref}
          className="plan-card-cta"
          data-analytics-event={
            plan.id === "pro" ? "sales_contact_click" : "trial_signup_click"
          }
          data-analytics-location="pricing"
          data-analytics-plan={plan.id}
        >
          <span>{plan.cta}</span>
          <span className="plan-card-cta-icon" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </a>
        <p className="plan-card-trust">
          <ShieldCheck aria-hidden="true" />
          <span>{PRICING_CARD_COPY.trust}</span>
        </p>
      </footer>
    </article>
  )
}
