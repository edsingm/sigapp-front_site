import {
  ArrowUpRight,
  Clock3,
  FileChartColumnIncreasing,
  MapPinned,
  Radar,
  UsersRound,
} from "lucide-react"
import Link from "next/link"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { CTA_FINAL_COPY, DEMO_PAGE, LINKS } from "@/lib/landing-data"

const DEMO_ICONS = [MapPinned, UsersRound, FileChartColumnIncreasing]

export function CTAFinalSection() {
  return (
    <section
      id="cta-final"
      className="final-cta-stage"
      aria-labelledby="final-cta-title"
    >
      <div className="final-cta-orbit" aria-hidden="true" />
      <div className="container-landing final-cta-shell">
        <div className="final-cta-grid lg:grid-cols-12 lg:items-center">
          <ScrollReveal stagger className="final-cta-copy lg:col-span-7">
            <span className="final-cta-eyebrow">
              <Radar aria-hidden="true" />
              {CTA_FINAL_COPY.eyebrow}
            </span>
            <h2 id="final-cta-title" className="final-cta-heading">
              <span>{CTA_FINAL_COPY.titleLine1}</span>
              <strong>{CTA_FINAL_COPY.titleLine2}</strong>
            </h2>
            <p>{CTA_FINAL_COPY.description}</p>

            <div className="final-cta-actions">
              <Link
                href={LINKS.demo}
                data-analytics-event="demo_request"
                data-analytics-location="cta-final"
              >
                {CTA_FINAL_COPY.primaryCta}
                <span>
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </Link>
              <a
                href={LINKS.sales}
                data-analytics-event="sales_contact_click"
                data-analytics-location="cta-final"
              >
                {CTA_FINAL_COPY.secondaryCta}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className="final-cta-console lg:col-span-5">
            <div className="final-cta-console-bar">
              <span>{CTA_FINAL_COPY.panelEyebrow}</span>
              <strong>{CTA_FINAL_COPY.panelProgress}</strong>
            </div>
            <div className="final-cta-console-head">
              <h3>{CTA_FINAL_COPY.panelTitle}</h3>
              <span>
                <Clock3 aria-hidden="true" />
                {CTA_FINAL_COPY.panelDuration}
              </span>
            </div>
            <ol>
              {DEMO_PAGE.sidePoints.map((point, index) => {
                const Icon = DEMO_ICONS[index]

                return (
                  <li key={point.title}>
                    <span className="final-cta-step-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="final-cta-step-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <strong>{point.title}</strong>
                      <p>{point.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </ScrollReveal>
        </div>

        <ScrollReveal className="final-cta-trust">
          {CTA_FINAL_COPY.trust.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
