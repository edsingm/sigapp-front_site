"use client"

import { useRef, useState } from "react"
import { TestimonialCard } from "@/components/landing/ui/TestimonialCard"
import type { Testimonial } from "@/lib/landing-data"

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  function goTo(i: number) {
    setActive(i)
    if (ref.current) {
      ref.current.scrollTo({
        left: i * ref.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  function onScroll() {
    if (!ref.current) return
    const idx = Math.round(ref.current.scrollLeft / ref.current.clientWidth)
    setActive(idx)
  }

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory scrollbar-none overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <div key={t.id} className="w-full shrink-0 snap-start px-1">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para depoimento ${i + 1}`}
            className="flex size-11 items-center justify-center rounded-full"
          >
            <span
              className={`block rounded-full transition-all duration-200 ${
                i === active
                  ? "h-2 w-6 bg-secondary"
                  : "size-2 bg-muted-foreground/45"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
