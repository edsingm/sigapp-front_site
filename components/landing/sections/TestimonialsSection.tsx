import { TESTIMONIALS } from "@/lib/landing-data"
import { TestimonialCard } from "@/components/landing/ui/TestimonialCard"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { TestimonialsCarousel } from "@/components/landing/client/TestimonialsCarousel"

export function TestimonialsSection() {
  const large = TESTIMONIALS.find((t) => t.size === "lg")
  const smalls = TESTIMONIALS.filter((t) => t.size === "sm")

  return (
    <section className="bg-muted/20 py-16 md:py-24">
      <div className="container-landing">
        <div className="mb-12 text-center">
          <SectionLabel className="text-center">Depoimentos</SectionLabel>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Incorporadoras que deixaram as planilhas para trás
          </h2>
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
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
        </div>
      </div>
    </section>
  )
}
