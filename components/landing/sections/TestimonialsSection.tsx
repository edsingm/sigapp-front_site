import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { TestimonialsCarousel } from "@/components/landing/client/TestimonialsCarousel"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { TESTIMONIALS, TESTIMONIALS_COPY } from "@/lib/landing-data"

export function TestimonialsSection() {
  const [lead, ...rest] = TESTIMONIALS

  return (
    <section className="relative overflow-hidden bg-(--color-brand-navy) py-16 text-white sm:py-20 md:py-28">
      <div className="grain-overlay opacity-[0.055]" />
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-22" />

      <div className="container-landing relative">
        <ScrollReveal
          stagger
          className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-12 lg:items-end"
        >
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <SectionLabel className="text-secondary">
              {TESTIMONIALS_COPY.eyebrow}
            </SectionLabel>
            <h2 className="section-display text-white">
              {TESTIMONIALS_COPY.title}
            </h2>
          </div>
          <p className="max-w-[48ch] text-sm leading-relaxed text-white/60 md:text-base lg:col-span-7 lg:justify-self-end">
            {TESTIMONIALS_COPY.description}
          </p>
        </ScrollReveal>

        <div className="lg:hidden">
          <TestimonialsCarousel testimonials={TESTIMONIALS} variant="dark" />
        </div>

        <ScrollReveal className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
          {lead ? (
            <figure className="flex min-w-0 flex-col justify-between border-l border-secondary/40 pl-8 lg:col-span-7">
              <p className="coord text-secondary">{lead.highlight}</p>
              <blockquote className="mt-6 font-heading text-2xl leading-[1.25] font-medium tracking-tight text-white xl:text-3xl">
                {lead.quote}
              </blockquote>
              <figcaption className="mt-10 border-t border-white/12 pt-5">
                <p className="text-sm font-semibold text-white">{lead.author}</p>
                <p className="mt-1 text-xs text-white/55">
                  {lead.role}
                  {lead.company ? ` · ${lead.company}` : ""}
                </p>
                <p className="coord mt-2 text-white/35">{lead.city}</p>
              </figcaption>
            </figure>
          ) : null}

          <div className="flex min-w-0 flex-col gap-8 border-t border-white/10 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {rest.map((t) => (
              <figure key={t.id} className="min-w-0">
                <p className="coord text-secondary/80">{t.highlight}</p>
                <blockquote className="mt-3 text-base leading-relaxed text-white/82">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="mt-0.5 text-xs text-white/50">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
