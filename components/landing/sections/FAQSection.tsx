import { FAQ_ITEMS, LINKS } from "@/lib/landing-data"
import { FAQAccordion } from "@/components/landing/client/FAQAccordion"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

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
    <section id="faq" className="py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-landing">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left */}
          <div className="flex flex-col gap-5 lg:col-span-4 lg:pr-4">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl lg:text-5xl">
              Tire suas dúvidas antes de avançar
            </h2>
            <p className="text-muted-foreground">
              Segurança, LGPD, migração de planilhas, multiusuário e onboarding
              explicados de forma objetiva antes da avaliação.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-2 gap-2 self-start"
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

          {/* Right — duas colunas independentes em lg+ */}
          <div className="lg:col-span-8">
            <div className="grid items-start gap-x-10 lg:grid-cols-2">
              <FAQAccordion
                items={FAQ_ITEMS.slice(0, Math.ceil(FAQ_ITEMS.length / 2))}
                defaultOpenIndex={0}
              />
              <div className="border-t border-border lg:border-t-0">
                <FAQAccordion
                  items={FAQ_ITEMS.slice(Math.ceil(FAQ_ITEMS.length / 2))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
