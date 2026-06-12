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
    <section id="faq" className="py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-landing">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left */}
          <div className="flex flex-col gap-5 lg:col-span-4 lg:pr-4">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl">
              Tire suas dúvidas antes de começar
            </h2>
            <p className="text-muted-foreground">
              Segurança, LGPD, migração de planilhas, multiusuário e onboarding explicados de
              forma objetiva antes do trial.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-2 gap-2 self-start"
              nativeButton={false}
              render={<a href={LINKS.sales} data-analytics-event="sales_contact_click" data-analytics-location="faq" />}
            >
              <MessageCircle className="size-4" />
              Falar com vendas
            </Button>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  )
}
