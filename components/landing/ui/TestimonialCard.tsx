import { cn } from "@/lib/utils"
import type { Testimonial } from "@/lib/landing-data"

type TestimonialCardProps = {
  testimonial: Testimonial
  className?: string
  variant?: "default" | "dark"
}

export function TestimonialCard({
  testimonial,
  className,
  variant = "default",
}: TestimonialCardProps) {
  const dark = variant === "dark"

  return (
    <figure
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-3xl border p-6 md:p-8",
        dark
          ? "border-white/10 bg-white/[0.055] text-white shadow-panel"
          : "border-border bg-card text-foreground shadow-raise",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-4 right-6 font-heading text-5xl leading-none",
          dark ? "text-secondary/35" : "text-primary/15"
        )}
      >
        “
      </span>
      <p className={cn("coord", dark ? "text-secondary" : "text-primary")}>
        {testimonial.highlight}
      </p>
      <blockquote
        className={cn(
          "flex-1 text-base leading-relaxed md:text-[1.05rem]",
          dark ? "text-white/84" : "text-foreground/85"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption
        className={cn(
          "flex flex-col gap-0.5 border-t pt-4",
          dark ? "border-white/10" : "border-border"
        )}
      >
        <p className={cn("text-sm font-semibold", dark && "text-white")}>
          {testimonial.author}
        </p>
        <p
          className={cn(
            "text-xs leading-relaxed",
            dark ? "text-white/58" : "text-muted-foreground"
          )}
        >
          {testimonial.role}
          {testimonial.company ? ` · ${testimonial.company}` : ""}
        </p>
        <p
          className={cn(
            "coord mt-1",
            dark ? "text-white/38" : "text-muted-foreground/70"
          )}
        >
          {testimonial.city}
        </p>
      </figcaption>
    </figure>
  )
}
