import { MessageSquareQuote, RadioTower } from "lucide-react"

import { ScrollReveal } from "@/components/landing/client/ScrollReveal"
import { TESTIMONIALS, TESTIMONIALS_COPY } from "@/lib/landing-data"

export function TestimonialsSection() {
  return (
    <section
      className="testimonials-stage"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-signal" aria-hidden="true" />
      <div className="container-landing testimonials-shell">
        <ScrollReveal
          stagger
          className="testimonials-intro lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <span className="testimonials-eyebrow">
              <RadioTower aria-hidden="true" />
              {TESTIMONIALS_COPY.eyebrow}
            </span>
            <h2 id="testimonials-title" className="testimonials-heading">
              <span>{TESTIMONIALS_COPY.titleLine1}</span>
              <strong>{TESTIMONIALS_COPY.titleLine2}</strong>
            </h2>
          </div>
          <div className="testimonials-intro-note lg:col-span-5">
            <p>{TESTIMONIALS_COPY.description}</p>
            <span>
              <i />
              {TESTIMONIALS_COPY.status}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="testimonials-records lg:grid-cols-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure
              key={testimonial.id}
              className={
                testimonial.size === "lg"
                  ? "testimonial-record is-lead lg:col-span-7 lg:row-span-2"
                  : "testimonial-record lg:col-span-5"
              }
            >
              <header>
                <span>
                  {TESTIMONIALS_COPY.recordLabel} /{" "}
                  {testimonial.id.padStart(2, "0")}
                </span>
                <MessageSquareQuote aria-hidden="true" />
              </header>

              <div className="testimonial-record-context">
                <span>{TESTIMONIALS_COPY.contextLabel}</span>
                <strong>{testimonial.highlight}</strong>
              </div>

              <blockquote>{testimonial.quote}</blockquote>

              <figcaption>
                <div>
                  <strong>{testimonial.author}</strong>
                  <span>
                    {testimonial.role} · {testimonial.company}
                  </span>
                </div>
                <em>
                  {String(index + 1).padStart(2, "0")} · {testimonial.city}
                </em>
              </figcaption>
            </figure>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
