import { ArrowUpRight, CircleHelp, MessageCircleMore } from "lucide-react"

import { FAQAccordion } from "@/components/landing/client/FAQAccordion"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { FAQ_COPY, FAQ_ITEMS, LINKS } from "@/lib/landing-data"

export function FAQSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section id="faq" className="faq-stage" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="faq-stage-grid" aria-hidden="true" />
      <div className="container-landing faq-shell lg:grid-cols-12">
        <ScrollReveal className="faq-intro lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <span className="faq-eyebrow">
            <CircleHelp aria-hidden="true" />
            {FAQ_COPY.eyebrow}
          </span>
          <h2 id="faq-title" className="faq-heading">
            <span>{FAQ_COPY.titleLine1}</span>
            <strong>{FAQ_COPY.titleLine2}</strong>
          </h2>
          <p>{FAQ_COPY.description}</p>

          <div className="faq-contact">
            <p>{FAQ_COPY.ctaNote}</p>
            <a
              href={LINKS.sales}
              data-analytics-event="sales_contact_click"
              data-analytics-location="faq"
            >
              <MessageCircleMore aria-hidden="true" />
              {FAQ_COPY.cta}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal className="faq-panel lg:col-span-7">
          <div className="faq-panel-bar">
            <span>{FAQ_COPY.panelLabel}</span>
            <strong>{FAQ_COPY.panelCount}</strong>
          </div>
          <FAQAccordion items={FAQ_ITEMS} defaultOpenIndex={0} />
        </ScrollReveal>
      </div>
    </section>
  )
}
