import { MessageCircle } from "lucide-react"

import { FAQAccordion } from "@/components/landing/client/FAQAccordion"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { FAQ_ITEMS, LINKS } from "@/lib/landing-data"

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

  const mid = Math.ceil(FAQ_ITEMS.length / 2)

  return (
    <section id="faq" className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-landing relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="section-display text-foreground">
              Tire suas dúvidas antes de avançar
            </h2>
            <p className="text-muted-foreground">
              Segurança, LGPD, migração de planilhas, multiusuário e onboarding
              explicados de forma objetiva antes da avaliação.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-1 gap-2 self-start whitespace-nowrap"
              nativeButton={false}
              render={
                <a
                  href={LINKS.sales}
                  data-analytics-event="sales_contact_click"
                  data-analytics-location="faq"
                />
              }
            >
              <MessageCircle className="size-4" />
              Falar com vendas
            </Button>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="grid items-start gap-0 border-t border-border lg:grid-cols-2 lg:gap-x-10">
              <FAQAccordion
                items={FAQ_ITEMS.slice(0, mid)}
                defaultOpenIndex={0}
              />
              <div className="border-t border-border lg:border-t-0">
                <FAQAccordion items={FAQ_ITEMS.slice(mid)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
