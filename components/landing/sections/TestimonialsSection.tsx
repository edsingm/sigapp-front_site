import { TESTIMONIALS, TESTIMONIALS_COPY } from "@/lib/landing-data"
import { TestimonialCard } from "@/components/landing/ui/TestimonialCard"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { TestimonialsCarousel } from "@/components/landing/client/TestimonialsCarousel"

export function TestimonialsSection() {
  const large = TESTIMONIALS.find((t) => t.size === "lg")
  const smalls = TESTIMONIALS.filter((t) => t.size === "sm")

  return (
    <section className="relative overflow-hidden bg-(--color-brand-navy) py-16 text-white sm:py-20 md:py-32">
      <div className="grain-overlay opacity-[0.06]" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -top-48 left-1/3 size-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-14 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex flex-col gap-4 lg:col-span-5">
            <SectionLabel className="text-secondary">
              {TESTIMONIALS_COPY.eyebrow}
            </SectionLabel>
            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-balance text-white md:text-4xl lg:text-5xl">
              {TESTIMONIALS_COPY.title}
            </h2>
          </div>
          <p className="max-w-[52ch] text-sm leading-relaxed text-white/62 md:text-base lg:col-span-7 lg:justify-self-end">
            {TESTIMONIALS_COPY.description}
          </p>
        </ScrollReveal>

        <div className="lg:hidden">
          <TestimonialsCarousel testimonials={TESTIMONIALS} variant="dark" />
        </div>

        <ScrollReveal
          stagger
          className="hidden lg:grid lg:grid-cols-12 lg:gap-12"
        >
          {large && (
            <div className="lg:col-span-6">
              <TestimonialCard
                testimonial={large}
                variant="dark"
                className="h-full text-lg"
              />
            </div>
          )}
          <div className="flex flex-col gap-12 lg:col-span-6">
            {smalls.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} variant="dark" />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
