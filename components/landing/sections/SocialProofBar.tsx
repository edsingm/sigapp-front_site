import { Activity } from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { DOMAIN_STRIP, METRICS, SOCIAL_PROOF_COPY } from "@/lib/landing-data"

export function SocialProofBar() {
  return (
    <section
      className="social-proof-section"
      aria-labelledby="social-proof-title"
    >
      <div className="social-proof-surface">
        <div className="container-landing py-14 sm:py-16 lg:py-20">
          <ScrollReveal
            stagger
            className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16"
          >
            <div className="social-proof-copy">
              <p className="social-proof-eyebrow">
                <Activity aria-hidden="true" />
                {SOCIAL_PROOF_COPY.eyebrow}
              </p>
              <h2 id="social-proof-title">{SOCIAL_PROOF_COPY.title}</h2>
              <p>{SOCIAL_PROOF_COPY.description}</p>
            </div>

            <dl
              className="social-proof-metrics grid grid-cols-2 lg:grid-cols-4"
              aria-label={SOCIAL_PROOF_COPY.metricsLabel}
            >
              {METRICS.map((metric, index) => (
                <div key={metric.label}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <dd>{metric.value}</dd>
                  <dt>{metric.label}</dt>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>

      <div className="social-proof-domain">
        <div className="container-landing flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-center sm:gap-6">
          <p className="social-proof-domain-label">
            <span aria-hidden="true" />
            {SOCIAL_PROOF_COPY.tickerLabel}
          </p>

          <div className="social-proof-domain-track">
            <ul
              className="sr-only"
              aria-label={SOCIAL_PROOF_COPY.tickerAriaLabel}
            >
              {DOMAIN_STRIP.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="animate-marquee" aria-hidden="true">
              {[...DOMAIN_STRIP, ...DOMAIN_STRIP].map((item, index) => (
                <div key={`${item}-${index}`}>
                  <span>{item}</span>
                  <i />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
