import { cn } from "@/lib/utils"
import type { Testimonial } from "@/lib/landing-data"

type TestimonialCardProps = {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-5 border-l-2 border-foreground/12 pl-6",
        className
      )}
    >
      <p className="coord text-muted-foreground">{testimonial.highlight}</p>
      <blockquote className="flex-1 text-base leading-relaxed text-foreground/85 md:text-[1.05rem]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex flex-col gap-0.5 border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">
          {testimonial.author}
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {testimonial.role}
          {testimonial.company ? ` · ${testimonial.company}` : ""}
        </p>
        <p className="coord mt-1 text-muted-foreground/70">
          {testimonial.city}
        </p>
      </figcaption>
    </figure>
  )
}
