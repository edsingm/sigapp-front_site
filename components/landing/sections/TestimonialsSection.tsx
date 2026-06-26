import { TESTIMONIALS } from "@/lib/landing-data"
import { TestimonialCard } from "@/components/landing/ui/TestimonialCard"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { TestimonialsCarousel } from "@/components/landing/client/TestimonialsCarousel"

export function TestimonialsSection() {
  const large = TESTIMONIALS.find((t) => t.size === "lg")
  const smalls = TESTIMONIALS.filter((t) => t.size === "sm")

  return (
    <section className="bg-muted/20 py-24 md:py-32">
      <div className="container-landing">
        <ScrollReveal
          stagger
          className="mb-16 grid gap-6 md:mb-20 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SectionLabel>Depoimentos</SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-foreground md:text-4xl">
              Incorporadoras que deram contexto à decisão
            </h2>
          </div>
          <p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground md:text-base lg:col-span-7 lg:justify-self-end">
            Provas de uso real em prospecção, comitê e migração operacional, com
            ganhos percebidos no ritmo da análise e na clareza entre áreas.
          </p>
        </ScrollReveal>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>

        {/* Desktop: grid */}
        <ScrollReveal
          stagger
          className="hidden lg:grid lg:grid-cols-12 lg:gap-6"
        >
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
