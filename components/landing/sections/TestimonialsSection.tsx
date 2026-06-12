import { TESTIMONIALS } from "@/lib/landing-data"
import { TestimonialCard } from "@/components/landing/ui/TestimonialCard"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { TestimonialsCarousel } from "@/components/landing/client/TestimonialsCarousel"

export function TestimonialsSection() {
  const large = TESTIMONIALS.find((t) => t.size === "lg")
  const smalls = TESTIMONIALS.filter((t) => t.size === "sm")

  return (
    <section className="bg-muted/20 py-20 md:py-28">
      <div className="container-landing">
        <ScrollReveal stagger className="mb-16 flex flex-col items-center gap-3 text-center md:mb-20">
          <SectionLabel className="text-center">Depoimentos</SectionLabel>
          <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground text-balance md:text-4xl">
            Incorporadoras que deixaram as planilhas para trás
          </h2>
          <p className="max-w-[56ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            Resultados concretos em prospecção, comitê e migração operacional, com identidade visual
            ligada à empresa e à cidade de cada operação.
          </p>
        </ScrollReveal>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>

        {/* Desktop: grid */}
        <ScrollReveal stagger className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {large && (
            <div className="lg:col-span-7">
              <TestimonialCard
                testimonial={large}
                className="h-full p-8 text-base"
              />
            </div>
          )}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {smalls.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
