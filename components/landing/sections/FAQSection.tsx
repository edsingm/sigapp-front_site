import { FAQ_ITEMS } from "@/lib/landing-data"
import { FAQAccordion } from "@/components/landing/client/FAQAccordion"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container-landing">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <SectionLabel>Perguntas frequentes</SectionLabel>
            <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl">
              Tire suas dúvidas antes de começar
            </h2>
            <p className="text-muted-foreground">
              Não encontrou o que procura? Fale diretamente com nossa equipe.
            </p>
            <Button variant="outline" size="lg" className="mt-2 gap-2 self-start">
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
